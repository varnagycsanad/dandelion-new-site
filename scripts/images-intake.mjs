#!/usr/bin/env node
// [CHANGE 2026-04-27 00:00] images:intake MVP parancs hozzáadása WordPress source candidate felvételhez.
// [CHANGE 2026-04-27 00:00] WP media metadata lookup hozzáadása images:intake parancshoz.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { accommodationSourceImages } from "../src/data/images/accommodation-source-images.ts";
import { accommodationImages } from "../src/data/images/accommodation-images.ts";

const SOURCE_FILE_URL = new URL("../src/data/images/accommodation-source-images.ts", import.meta.url);
const SOURCE_FILE_PATH = fileURLToPath(SOURCE_FILE_URL);
const PUBLIC_ACCOMMODATIONS_ROOT_URL = new URL("../public/images/accommodations/", import.meta.url);

const args = process.argv.slice(2);
const options = parseOptions(args);
const dryRun = args.includes("--dry-run");

const apartmentKey = options.apartment?.trim();
const wpId = Number(options.wpId);
const role = options.role?.trim();
const theme = options.theme?.trim();
const room = options.room?.trim();
const wpBaseUrlInput = options.wpBaseUrl?.trim() || "https://dandelionhouse.hu";
const sortOrderOption = options.sortOrder;
const sortOrder =
  typeof sortOrderOption === "string" && sortOrderOption.trim() !== ""
    ? Number(sortOrderOption)
    : undefined;

const supportedRoles = new Set(["hero_desktop", "hero_mobile", "card", "gallery", "thumbnail"]);
const validationErrors = [];

if (!apartmentKey) {
  validationErrors.push("Missing required argument: --apartment=<key>");
}

if (!Number.isInteger(wpId) || wpId <= 0) {
  validationErrors.push("Missing or invalid --wpId. Expected a positive integer.");
}

if (!role || !supportedRoles.has(role)) {
  validationErrors.push(
    "Missing or invalid --role. Supported values: hero_desktop, hero_mobile, card, gallery, thumbnail.",
  );
}

if (sortOrder !== undefined && (!Number.isFinite(sortOrder) || sortOrder < 0)) {
  validationErrors.push("Invalid --sortOrder. Expected a non-negative number.");
}

let wpBaseUrl = "";
try {
  const parsedWpBaseUrl = new URL(wpBaseUrlInput);
  wpBaseUrl = parsedWpBaseUrl.toString().replace(/\/+$/, "");
} catch {
  validationErrors.push("Invalid --wpBaseUrl. Expected a valid absolute URL.");
}

if (validationErrors.length > 0) {
  console.error("images:intake validation failed:");
  for (const error of validationErrors) {
    console.error(`- ${error}`);
  }
  console.error("");
  console.error(
    "Usage: npm run images:intake -- --apartment=d2 --wpId=123 --role=gallery [--theme=\"nappali\"] [--room=\"földszint\"] [--sortOrder=1] [--wpBaseUrl=https://dandelionhouse.hu] [--dry-run]",
  );
  process.exit(1);
}

const existingCandidates = accommodationSourceImages[apartmentKey] || [];
const normalizedTheme = normalizeOptional(theme);
const duplicateCandidate = existingCandidates.find(
  (candidate) =>
    candidate.source?.type === "wordpress" &&
    candidate.source?.wpId === wpId &&
    candidate.apartmentKey === apartmentKey &&
    normalizeOptional(candidate.theme) === normalizedTheme &&
    Array.isArray(candidate.intendedRoles) &&
    candidate.intendedRoles.includes(role),
);

if (duplicateCandidate) {
  console.error("Duplicate source candidate detected. No file changes were made.");
  console.error(`existing source id: ${duplicateCandidate.id}`);
  process.exit(1);
}

const wpMediaMetadata = await fetchWordPressMediaMetadata({ wpBaseUrl, wpId });
const occupiedTargets = await getOccupiedTargetData({
  apartment: apartmentKey,
  roleName: role,
  candidates: existingCandidates,
  registryImages: accommodationImages[apartmentKey],
});
const sequence = getNextSequence({
  apartment: apartmentKey,
  roleName: role,
  candidates: existingCandidates,
  occupiedSequences: occupiedTargets.sequences,
});
const sequenceLabel = String(sequence).padStart(2, "0");
const baseSlug = resolveBaseSlug(apartmentKey, existingCandidates);
const now = new Date().toISOString();

const candidate = createSourceCandidate({
  apartmentKey,
  wpId,
  role,
  theme,
  room,
  sortOrder,
  normalizedTheme,
  sequence,
  sequenceLabel,
  baseSlug,
  wpMediaMetadata,
  now,
});

const collidingTarget = candidate.targetPlans
  .flatMap((plan) => [plan.targetPath, plan.thumbPath])
  .filter(Boolean)
  .find((targetPath) => occupiedTargets.paths.has(targetPath));

if (collidingTarget) {
  console.error("Target path collision detected. No file changes were made.");
  console.error(`colliding target: ${collidingTarget}`);
  process.exit(1);
}

const sourceFileContent = await readFile(SOURCE_FILE_PATH, "utf8");
const nextSourceFileContent = upsertCandidateForApartment(sourceFileContent, apartmentKey, candidate);

if (nextSourceFileContent === sourceFileContent) {
  console.error("No changes written: failed to inject source candidate.");
  process.exit(1);
}

if (!dryRun) {
  await writeFile(SOURCE_FILE_PATH, nextSourceFileContent, "utf8");
}

console.log(dryRun ? "DRY RUN - no file written" : "Source inventory updated");
console.log(`apartment: ${apartmentKey}`);
console.log(`source id: ${candidate.id}`);
console.log(`role: ${role}`);
console.log(`wpId: ${wpId}`);
console.log(`target plans: ${(candidate.targetPlans || []).length}`);
console.log(`source.originalUrl: ${candidate.source.originalUrl}`);
console.log(`source mime_type: ${wpMediaMetadata.mimeType}`);
if (dryRun) {
  console.log("candidate preview:");
  console.log(JSON.stringify(candidate, null, 2));
}
console.log(dryRun ? `preview file: ${SOURCE_FILE_PATH}` : `written file: ${SOURCE_FILE_PATH}`);

function parseOptions(inputArgs) {
  const parsed = {};

  for (const arg of inputArgs) {
    if (!arg.startsWith("--") || !arg.includes("=")) {
      continue;
    }

    const [rawKey, ...rawValueParts] = arg.slice(2).split("=");
    parsed[rawKey] = rawValueParts.join("=");
  }

  return parsed;
}

function resolveBaseSlug(apartment, candidates) {
  for (const candidate of candidates) {
    for (const plan of candidate.targetPlans || []) {
      const outputPath = plan.targetPath || plan.thumbPath;
      if (!outputPath) {
        continue;
      }

      const fileName = outputPath.split("/").pop() || "";
      const withoutExt = fileName.replace(/\.webp$/i, "");
      const base = withoutExt.replace(/-(hero-desktop|hero-mobile|card|gallery|thumb|thumbnail)-\d+$/i, "");

      if (base) {
        return base;
      }
    }
  }

  return `dandelion-${apartment}`;
}

async function getOccupiedTargetData({ apartment, roleName, candidates, registryImages }) {
  const occupiedPaths = new Set();
  const occupiedSequences = new Set();

  if (roleName !== "gallery" && roleName !== "thumbnail") {
    return { paths: occupiedPaths, sequences: occupiedSequences };
  }

  for (const candidate of candidates) {
    for (const plan of candidate.targetPlans || []) {
      collectTargetPath(occupiedPaths, occupiedSequences, apartment, plan.targetPath);
      collectTargetPath(occupiedPaths, occupiedSequences, apartment, plan.thumbPath);
    }
  }

  for (const image of registryImages?.gallery || []) {
    collectTargetPath(occupiedPaths, occupiedSequences, apartment, image.src);
    collectTargetPath(occupiedPaths, occupiedSequences, apartment, image.thumb);
  }

  const galleryDirectoryUrl = new URL(`${apartment}/gallery/`, PUBLIC_ACCOMMODATIONS_ROOT_URL);
  const thumbDirectoryUrl = new URL(`${apartment}/thumbs/`, PUBLIC_ACCOMMODATIONS_ROOT_URL);
  const [galleryFiles, thumbFiles] = await Promise.all([
    safeReadDir(fileURLToPath(galleryDirectoryUrl)),
    safeReadDir(fileURLToPath(thumbDirectoryUrl)),
  ]);

  for (const fileName of galleryFiles) {
    const targetPath = `/images/accommodations/${apartment}/gallery/${fileName}`;
    collectTargetPath(occupiedPaths, occupiedSequences, apartment, targetPath);
  }

  for (const fileName of thumbFiles) {
    const targetPath = `/images/accommodations/${apartment}/thumbs/${fileName}`;
    collectTargetPath(occupiedPaths, occupiedSequences, apartment, targetPath);
  }

  return { paths: occupiedPaths, sequences: occupiedSequences };
}

function getNextSequence({ candidates, apartment, roleName, occupiedSequences }) {
  const roleIdTokenByRole = {
    hero_desktop: "hero-desktop",
    hero_mobile: "hero-mobile",
    card: "card",
    gallery: "gallery",
    thumbnail: "thumb",
  };

  if (roleName === "gallery" || roleName === "thumbnail") {
    let maxValue = 0;

    for (const currentValue of occupiedSequences) {
      if (Number.isInteger(currentValue) && currentValue > maxValue) {
        maxValue = currentValue;
      }
    }

    return maxValue + 1;
  }

  const roleToken = roleIdTokenByRole[roleName];
  const sequencePattern = new RegExp(`^${escapeRegex(apartment)}-source-${escapeRegex(roleToken)}-(\\d+)$`);
  let maxValue = 0;

  for (const candidate of candidates) {
    const match = sequencePattern.exec(candidate.id || "");
    if (!match) {
      continue;
    }

    const currentValue = Number(match[1]);
    if (Number.isInteger(currentValue) && currentValue > maxValue) {
      maxValue = currentValue;
    }
  }

  return maxValue + 1;
}

async function safeReadDir(directoryPath) {
  try {
    return await readdir(directoryPath);
  } catch {
    return [];
  }
}

function collectTargetPath(pathSet, sequenceSet, apartment, targetPath) {
  if (typeof targetPath !== "string" || targetPath.trim() === "") {
    return;
  }

  pathSet.add(targetPath);

  const fileName = targetPath.split("/").pop() || "";
  const match = /-(gallery|thumb)-(\d+)\.webp$/i.exec(fileName);
  if (!match) {
    return;
  }

  if (!targetPath.includes(`/images/accommodations/${apartment}/`)) {
    return;
  }

  const currentValue = Number(match[2]);
  if (Number.isInteger(currentValue) && currentValue > 0) {
    sequenceSet.add(currentValue);
  }
}

function createSourceCandidate({
  apartmentKey: apartment,
  wpId: wpMediaId,
  role: roleName,
  theme: themeName,
  normalizedTheme: normalizedThemeValue,
  room: roomName,
  sortOrder: sortOrderValue,
  sequence: sequenceNumber,
  sequenceLabel: sequenceText,
  baseSlug: apartmentBaseSlug,
  wpMediaMetadata,
  now: nowIso,
}) {
  const roleIdTokenByRole = {
    hero_desktop: "hero-desktop",
    hero_mobile: "hero-mobile",
    card: "card",
    gallery: "gallery",
    thumbnail: "thumb",
  };

  const roleTargetByRole = {
    hero_desktop: {
      folder: "hero",
      fileToken: "hero-desktop",
      width: 1920,
      cropMode: "cover",
      focusPoint: "center center",
    },
    hero_mobile: {
      folder: "hero",
      fileToken: "hero-mobile",
      width: 1080,
      height: 810,
      cropMode: "manual",
      focusPoint: "center center",
    },
    card: {
      folder: "card",
      fileToken: "card",
      width: 900,
      cropMode: "cover",
      focusPoint: "center center",
    },
    gallery: {
      folder: "gallery",
      fileToken: "gallery",
      width: 1600,
      cropMode: "contain",
      focusPoint: "center center",
    },
    thumbnail: {
      folder: "thumbs",
      fileToken: "thumb",
      width: 600,
      cropMode: "cover",
      focusPoint: "center center",
    },
  };

  const idToken = roleIdTokenByRole[roleName];
  const target = roleTargetByRole[roleName];
  const sourceId = `${apartment}-wp-${wpMediaId}-${idToken}${normalizedThemeValue ? `-${toIdToken(normalizedThemeValue)}` : ""}`;
  const plannedSortOrder =
    sortOrderValue !== undefined ? sortOrderValue : roleName === "gallery" || roleName === "thumbnail" ? sequenceNumber : 0;
  const intendedRoles = roleName === "gallery" ? ["gallery", "thumbnail"] : [roleName];

  const targetPlans =
    roleName === "gallery"
      ? [
          {
            role: "gallery",
            targetPath: `/images/accommodations/${apartment}/gallery/${apartmentBaseSlug}-gallery-${sequenceText}.webp`,
            width: 1600,
            cropMode: "contain",
            focusPoint: "center center",
          },
          {
            role: "thumbnail",
            targetPath: `/images/accommodations/${apartment}/thumbs/${apartmentBaseSlug}-thumb-${sequenceText}.webp`,
            width: 600,
            cropMode: "cover",
            focusPoint: "center center",
          },
        ]
      : [
          {
            role: roleName,
            targetPath: `/images/accommodations/${apartment}/${target.folder}/${apartmentBaseSlug}-${target.fileToken}-${sequenceText}.webp`,
            width: target.width,
            ...(target.height ? { height: target.height } : {}),
            cropMode: target.cropMode,
            focusPoint: target.focusPoint,
          },
        ];

  return {
    id: sourceId,
    apartmentKey: apartment,
    source: {
      type: "wordpress",
      wpId: wpMediaId,
      originalUrl: wpMediaMetadata.sourceUrl,
      originalFilename: wpMediaMetadata.fileName,
    },
    currentUrl: wpMediaMetadata.sourceUrl,
    currentFilename: wpMediaMetadata.fileName,
    ...(typeof wpMediaMetadata.width === "number" ? { width: wpMediaMetadata.width } : {}),
    ...(typeof wpMediaMetadata.height === "number" ? { height: wpMediaMetadata.height } : {}),
    ...(wpMediaMetadata.aspectRatio ? { aspectRatio: wpMediaMetadata.aspectRatio } : {}),
    intendedRoles,
    ...(roomName ? { room: roomName } : {}),
    ...(normalizedThemeValue ? { theme: normalizedThemeValue } : {}),
    ...(plannedSortOrder > 0 ? { sortOrder: plannedSortOrder } : {}),
    status: "source_found",
    seoDraft: {
      approved: false,
    },
    targetPlans,
    notes: `WP intake metadata loaded (mime: ${wpMediaMetadata.mimeType}).`,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

function upsertCandidateForApartment(fileContent, apartment, sourceCandidate) {
  const candidateBlock = indentBlock(toTsObjectLiteral(sourceCandidate), 4);
  const apartmentArrayRange = findApartmentArrayRange(fileContent, apartment);

  if (apartmentArrayRange) {
    const { start, end } = apartmentArrayRange;
    const rawArrayContent = fileContent.slice(start + 1, end);
    const arrayContent = rawArrayContent.trim();
    const hasContent = arrayContent.length > 0;
    const needsLeadingComma = hasContent && !rawArrayContent.trimEnd().endsWith(",");
    const insertionPrefix = hasContent ? `${needsLeadingComma ? "," : ""}\n` : "\n";
    const insertionSuffix = arrayContent.length > 0 ? "" : "\n";
    const nextArrayContent =
      fileContent.slice(0, end) + `${insertionPrefix}${candidateBlock}${insertionSuffix}` + fileContent.slice(end);

    return nextArrayContent;
  }

  const exportObjectEnd = fileContent.lastIndexOf("};");
  if (exportObjectEnd === -1) {
    throw new Error("Could not find accommodationSourceImages export object end.");
  }

  const newApartmentBlock = `  ${apartment}: [\n${candidateBlock}\n  ],\n`;
  return fileContent.slice(0, exportObjectEnd) + newApartmentBlock + fileContent.slice(exportObjectEnd);
}

function findApartmentArrayRange(fileContent, apartment) {
  const marker = `${apartment}: [`;
  const markerIndex = fileContent.indexOf(marker);
  if (markerIndex === -1) {
    return null;
  }

  const start = fileContent.indexOf("[", markerIndex);
  if (start === -1) {
    return null;
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < fileContent.length; i += 1) {
    const char = fileContent[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return { start, end: i };
      }
    }
  }

  return null;
}

function indentBlock(text, spaces) {
  const prefix = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeOptional(value) {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.trim();
  return normalized;
}

function toIdToken(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTsObjectLiteral(value, indentLevel = 0) {
  const indent = " ".repeat(indentLevel);
  const childIndent = " ".repeat(indentLevel + 2);

  if (Array.isArray(value)) {
    if (!value.length) {
      return "[]";
    }

    const items = value.map((item) => `${childIndent}${toTsObjectLiteral(item, indentLevel + 2)}`);
    return `[\n${items.join(",\n")}\n${indent}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) {
      return "{}";
    }

    const properties = entries.map(([key, entryValue]) => {
      return `${childIndent}${key}: ${toTsObjectLiteral(entryValue, indentLevel + 2)}`;
    });

    return `{\n${properties.join(",\n")}\n${indent}}`;
  }

  return JSON.stringify(value);
}

async function fetchWordPressMediaMetadata({ wpBaseUrl, wpId }) {
  const endpoint = `${wpBaseUrl}/wp-json/wp/v2/media/${wpId}`;

  let response;
  try {
    response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.error(`WordPress media lookup failed: ${endpoint}`);
    console.error(error instanceof Error ? error.message : "Unknown network error.");
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`WordPress media lookup failed with HTTP ${response.status}: ${endpoint}`);
    process.exit(1);
  }

  const payload = await response.json();
  const sourceUrl = typeof payload?.source_url === "string" ? payload.source_url.trim() : "";
  const mimeType = typeof payload?.mime_type === "string" ? payload.mime_type.trim() : "";
  const width = Number(payload?.media_details?.width);
  const height = Number(payload?.media_details?.height);

  if (!sourceUrl) {
    console.error("WordPress media lookup failed: source_url is missing.");
    process.exit(1);
  }

  if (!mimeType.startsWith("image/")) {
    console.error(`WordPress media lookup failed: mime_type is not image/* (${mimeType || "missing"}).`);
    process.exit(1);
  }

  const fileNameFromUrl = sourceUrl.split("/").pop() || `wp-${wpId}`;
  const hasWidth = Number.isFinite(width) && width > 0;
  const hasHeight = Number.isFinite(height) && height > 0;
  const aspectRatio = hasWidth && hasHeight ? `${Math.round(width)}:${Math.round(height)}` : undefined;

  return {
    sourceUrl,
    mimeType,
    fileName: fileNameFromUrl,
    width: hasWidth ? Math.round(width) : undefined,
    height: hasHeight ? Math.round(height) : undefined,
    aspectRatio,
  };
}

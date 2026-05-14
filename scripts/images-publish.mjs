#!/usr/bin/env node
// [CHANGE 2026-04-27 00:00] images:publish MVP parancs hozzáadása feldolgozott source candidate frontend registry publikálásához.

import { access, readFile, writeFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { fileURLToPath } from "node:url";
import { accommodationSourceImages } from "../src/admin-disabled/data/images/accommodation-source-images.ts";
import { accommodationImages } from "../src/data/images/accommodation-images.ts";

const REGISTRY_FILE_URL = new URL("../src/data/images/accommodation-images.ts", import.meta.url);
const REGISTRY_FILE_PATH = fileURLToPath(REGISTRY_FILE_URL);
const REPO_ROOT_URL = new URL("../", import.meta.url);
const REPO_ROOT_PATH = fileURLToPath(REPO_ROOT_URL);

const args = process.argv.slice(2);
const options = parseOptions(args);
const dryRun = args.includes("--dry-run");

const apartmentKey = options.apartment?.trim();
const sourceId = options.source?.trim();
const validationErrors = [];

if (!apartmentKey) {
  validationErrors.push("Missing required argument: --apartment=<key>");
}

if (!sourceId) {
  validationErrors.push("Missing required argument: --source=<candidateId>");
}

if (validationErrors.length > 0) {
  console.error("images:publish validation failed:");
  for (const error of validationErrors) {
    console.error(`- ${error}`);
  }
  console.error("");
  console.error(
    "Usage: npm run images:publish -- --apartment=d2 --source=d2-wp-7872-gallery-terasz [--dry-run]",
  );
  process.exit(1);
}

const apartmentCandidates = accommodationSourceImages[apartmentKey] || [];
const candidate = apartmentCandidates.find((item) => item.id === sourceId);

if (!candidate) {
  console.error(`Unknown source candidate for apartment ${apartmentKey}: ${sourceId}`);
  process.exit(1);
}

if (candidate.status !== "selected") {
  console.error(`Source candidate is not publishable. Current status: ${candidate.status}`);
  process.exit(1);
}

if (!Array.isArray(candidate.intendedRoles) || !candidate.intendedRoles.includes("gallery")) {
  console.error("Only gallery candidates are supported by images:publish MVP.");
  process.exit(1);
}

const galleryPlan = (candidate.targetPlans || []).find((plan) => plan.role === "gallery");
const thumbPlan = (candidate.targetPlans || []).find((plan) => plan.role === "thumbnail");

if (!galleryPlan?.targetPath) {
  console.error(`Missing gallery targetPlan for source candidate: ${sourceId}`);
  process.exit(1);
}

if (!thumbPlan?.targetPath) {
  console.error(`Missing thumbnail targetPlan for source candidate: ${sourceId}`);
  process.exit(1);
}

const galleryFilePath = toAbsoluteRepoPath(galleryPlan.targetPath);
const thumbFilePath = toAbsoluteRepoPath(thumbPlan.targetPath);

await ensureFileExists(galleryFilePath, "gallery");
await ensureFileExists(thumbFilePath, "thumbnail");

const existingGallery = accommodationImages[apartmentKey]?.gallery || [];
const duplicateEntry = existingGallery.find(
  (item) =>
    item.src === galleryPlan.targetPath ||
    item.thumb === thumbPlan.targetPath,
);

if (duplicateEntry) {
  console.log("NO CHANGE - gallery registry entry is already published.");
  console.log(`apartment: ${apartmentKey}`);
  console.log(`source id: ${sourceId}`);
  console.log(`existing registry id: ${duplicateEntry.id}`);
  process.exit(0);
}

const registryEntry = createGalleryRegistryEntry({
  apartmentKey,
  sourceCandidate: candidate,
  existingGallery,
  gallerySrc: galleryPlan.targetPath,
  thumbSrc: thumbPlan.targetPath,
});

const registryFileContent = await readFile(REGISTRY_FILE_PATH, "utf8");
const nextRegistryFileContent = appendGalleryEntryForApartment(registryFileContent, apartmentKey, registryEntry);

if (nextRegistryFileContent === registryFileContent) {
  console.error("No changes written: failed to inject gallery registry entry.");
  process.exit(1);
}

if (!dryRun) {
  await writeFile(REGISTRY_FILE_PATH, nextRegistryFileContent, "utf8");
}

console.log(dryRun ? "DRY RUN - no file written" : "Gallery registry updated");
console.log(`apartment: ${apartmentKey}`);
console.log(`source id: ${sourceId}`);
console.log(`registry id: ${registryEntry.id}`);
console.log(`gallery src: ${registryEntry.src}`);
console.log(`thumb src: ${registryEntry.thumb}`);
console.log(`alt.hu: ${registryEntry.alt.hu}`);
console.log(`alt.en: ${registryEntry.alt.en}`);
if (dryRun) {
  console.log("registry entry preview:");
  console.log(JSON.stringify(registryEntry, null, 2));
}
console.log(dryRun ? `preview file: ${REGISTRY_FILE_PATH}` : `written file: ${REGISTRY_FILE_PATH}`);

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

function createGalleryRegistryEntry({ apartmentKey: apartment, sourceCandidate, existingGallery, gallerySrc, thumbSrc }) {
  const nextSortOrder =
    typeof sourceCandidate.sortOrder === "number" && Number.isFinite(sourceCandidate.sortOrder)
      ? sourceCandidate.sortOrder
      : existingGallery.length + 1;
  const galleryId = `${apartment}-gallery-${String(nextSortOrder).padStart(2, "0")}`;
  const createdDate = new Date().toISOString().slice(0, 10);

  return {
    id: galleryId,
    apartmentKey: apartment,
    role: "gallery",
    src: gallerySrc,
    thumb: thumbSrc,
    width: 1600,
    height: 1200,
    aspectRatio: "4:3",
    alt: {
      hu: "Dandelion D2 vendégház terasza Kisapátiban",
      en: "Terrace of Dandelion D2 guesthouse in Kisapáti",
    },
    title: {
      hu: "D2 terasz",
      en: "D2 terrace",
    },
    caption: {
      hu: "A Dandelion D2 vendégház terasza Kisapátiban.",
      en: "Terrace of the Dandelion D2 guesthouse in Kisapáti.",
    },
    focusPoint: resolveFocusPoint(sourceCandidate),
    sortOrder: nextSortOrder,
    status: "active",
    source: {
      type: sourceCandidate.source.type,
      ...(typeof sourceCandidate.source.wpId === "number" ? { wpId: sourceCandidate.source.wpId } : {}),
      originalUrl: sourceCandidate.source.originalUrl,
      originalFilename: sourceCandidate.source.originalFilename,
    },
    createdAt: createdDate,
    updatedAt: createdDate,
  };
}

function resolveFocusPoint(sourceCandidate) {
  const galleryPlan = (sourceCandidate.targetPlans || []).find((plan) => plan.role === "gallery");
  return galleryPlan?.focusPoint || "center center";
}

function appendGalleryEntryForApartment(fileContent, apartment, registryEntry) {
  const galleryArrayRange = findGalleryArrayRange(fileContent, apartment);
  if (!galleryArrayRange) {
    throw new Error(`Could not find gallery array for apartment: ${apartment}`);
  }

  const entryBlock = indentBlock(toTsObjectLiteral(registryEntry), 6);
  const { start, end } = galleryArrayRange;
  const rawArrayContent = fileContent.slice(start + 1, end);
  const arrayContent = rawArrayContent.trim();
  const hasContent = arrayContent.length > 0;
  const needsLeadingComma = hasContent && !rawArrayContent.trimEnd().endsWith(",");
  const insertionPrefix = hasContent ? `${needsLeadingComma ? "," : ""}\n` : "\n";
  const insertionSuffix = arrayContent.length > 0 ? "\n    " : "\n";

  return fileContent.slice(0, end) + `${insertionPrefix}${entryBlock}${insertionSuffix}` + fileContent.slice(end);
}

function findGalleryArrayRange(fileContent, apartment) {
  const apartmentMarker = `${apartment}: {`;
  const apartmentMarkerIndex = fileContent.indexOf(apartmentMarker);
  if (apartmentMarkerIndex === -1) {
    return null;
  }

  const galleryMarkerIndex = fileContent.indexOf("gallery: [", apartmentMarkerIndex);
  if (galleryMarkerIndex === -1) {
    return null;
  }

  const start = fileContent.indexOf("[", galleryMarkerIndex);
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

function toAbsoluteRepoPath(publicPath) {
  const trimmed = publicPath.replace(/^\/+/, "");
  return fileURLToPath(new URL(`public/${trimmed}`, REPO_ROOT_URL));
}

async function ensureFileExists(filePath, label) {
  try {
    await access(filePath, fsConstants.F_OK);
  } catch {
    console.error(`Missing processed ${label} file: ${filePath}`);
    process.exit(1);
  }
}

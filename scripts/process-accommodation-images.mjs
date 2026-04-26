#!/usr/bin/env node
// [CHANGE 2026-04-26 00:00] Dry-run image processing script váz létrehozása source inventory listázáshoz.
// [CHANGE 2026-04-26 00:00] Plan export mód hozzáadása image processing dry-run scripthhez.
// [CHANGE 2026-04-26 00:00] Plan export fájlnevek szétválasztása selected és all módra.
// [CHANGE 2026-04-26 00:00] Korlátozott local write mód hozzáadása egyetlen mobil hero WebP feldolgozásához.
// [CHANGE 2026-04-26 00:00] Korlátozott remote WP source write mód hozzáadása egyetlen D2 galériaképhez.

import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { accommodationSourceImages } from "../src/data/images/accommodation-source-images.ts";

const args = process.argv.slice(2);
const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));

const allowedStandaloneArgs = new Set([
  "--include-needs-review",
  "--export-plan",
  "--write",
  "--allow-remote",
]);
const unknownArgs = args.filter(
  (arg) =>
    !arg.startsWith("--apartment=") &&
    !arg.startsWith("--source=") &&
    !allowedStandaloneArgs.has(arg),
);

if (unknownArgs.length > 0) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  console.error("Supported usage:");
  console.error("  node scripts/process-accommodation-images.mjs --apartment=d2");
  console.error(
    "  node scripts/process-accommodation-images.mjs --apartment=d2 --include-needs-review",
  );
  process.exit(1);
}

const apartmentKey = readOption("apartment");
const sourceId = readOption("source");
const includeNeedsReview = args.includes("--include-needs-review");
const exportPlan = args.includes("--export-plan");
const writeMode = args.includes("--write");
const allowRemote = args.includes("--allow-remote");

if (!apartmentKey) {
  console.error("Missing required argument: --apartment=<apartmentKey>");
  console.error("Example: node scripts/process-accommodation-images.mjs --apartment=d2");
  process.exit(1);
}

if (writeMode && !sourceId) {
  console.error("WRITE MODE requires --source=<sourceId>.");
  process.exit(1);
}

const candidates = accommodationSourceImages[apartmentKey];

if (!candidates) {
  const availableKeys = Object.keys(accommodationSourceImages);

  console.error(`Unknown apartmentKey: ${apartmentKey}`);
  console.error(
    `Available apartmentKey values: ${availableKeys.length ? availableKeys.join(", ") : "(none)"}`,
  );
  process.exit(1);
}

const allowedStatuses = includeNeedsReview
  ? new Set(["selected", "needs_review"])
  : new Set(["selected"]);

const selectedCandidates = candidates.filter((candidate) => allowedStatuses.has(candidate.status));
const skippedNeedsReview = includeNeedsReview
  ? 0
  : candidates.filter((candidate) => candidate.status === "needs_review").length;

if (writeMode) {
  await processSingleLocalWrite({
    apartmentKey,
    candidates,
    sourceId,
    allowRemote,
  });
  process.exit(0);
}

console.log("DRY RUN - no files written");
console.log("No images will be downloaded, converted, moved, or written.");
console.log("");
console.log(`apartmentKey: ${apartmentKey}`);
console.log(`total source candidates: ${candidates.length}`);
console.log(`source candidates listed for processing: ${selectedCandidates.length}`);
console.log(`needs_review candidates skipped: ${skippedNeedsReview}`);
console.log(`include needs_review: ${includeNeedsReview ? "yes" : "no"}`);
console.log("");

for (const candidate of selectedCandidates) {
  console.log(`- source id: ${candidate.id}`);
  console.log(`  status: ${candidate.status}`);
  console.log(`  intendedRoles: ${candidate.intendedRoles.join(", ")}`);
  console.log(`  currentUrl: ${candidate.currentUrl ?? "(none)"}`);
  console.log(`  currentFilename: ${candidate.currentFilename ?? "(none)"}`);
  console.log("  targetPlans:");

  for (const targetPlan of candidate.targetPlans ?? []) {
    console.log(`    - role: ${targetPlan.role}`);
    console.log(`      path: ${targetPlan.targetPath ?? targetPlan.thumbPath ?? "(none)"}`);
    console.log(`      width: ${targetPlan.width ?? "(not set)"}`);
    console.log(`      cropMode: ${targetPlan.cropMode ?? "(not set)"}`);
    console.log(`      focusPoint: ${targetPlan.focusPoint ?? "(not set)"}`);
  }

  console.log("");
}

if (exportPlan) {
  await exportPlanFiles({
    apartmentKey,
    candidates,
    selectedCandidates,
    skippedNeedsReview,
    includeNeedsReview,
  });
}

function readOption(name) {
  const prefix = `--${name}=`;
  const option = args.find((arg) => arg.startsWith(prefix));

  return option ? option.slice(prefix.length) : undefined;
}

async function exportPlanFiles({
  apartmentKey,
  candidates,
  selectedCandidates,
  skippedNeedsReview,
  includeNeedsReview,
}) {
  const generatedDir = new URL("../project-docs/image-workflow/generated/", import.meta.url);
  const exportModeKey = includeNeedsReview ? "all" : "selected";
  const jsonPlanUrl = new URL(
    `${apartmentKey}-processing-plan-${exportModeKey}.json`,
    generatedDir,
  );
  const markdownPlanUrl = new URL(
    `${apartmentKey}-processing-plan-${exportModeKey}.md`,
    generatedDir,
  );
  const plan = createProcessingPlan({
    apartmentKey,
    candidates,
    selectedCandidates,
    skippedNeedsReview,
    includeNeedsReview,
    exportModeKey,
  });

  await mkdir(generatedDir, { recursive: true });

  if ((await fileExists(jsonPlanUrl)) || (await fileExists(markdownPlanUrl))) {
    console.log("Plan export files already exist; overwriting generated documentation plan files.");
  }

  await writeFile(jsonPlanUrl, `${JSON.stringify(plan, null, 2)}\n`, "utf8");
  await writeFile(markdownPlanUrl, createMarkdownPlan(plan), "utf8");

  console.log("Plan export written:");
  console.log(
    `- project-docs/image-workflow/generated/${apartmentKey}-processing-plan-${exportModeKey}.json`,
  );
  console.log(
    `- project-docs/image-workflow/generated/${apartmentKey}-processing-plan-${exportModeKey}.md`,
  );
  console.log("DRY RUN - no image files written and public/images was not modified.");
}

function createProcessingPlan({
  apartmentKey,
  candidates,
  selectedCandidates,
  skippedNeedsReview,
  includeNeedsReview,
  exportModeKey,
}) {
  return {
    apartmentKey,
    exportMode: exportModeKey,
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    selectedCount: selectedCandidates.filter((candidate) => candidate.status === "selected").length,
    plannedCandidateCount: selectedCandidates.length,
    needsReviewSkippedCount: skippedNeedsReview,
    includedNeedsReview: includeNeedsReview,
    totalSourceCandidateCount: candidates.length,
    candidates: selectedCandidates.map((candidate) => ({
      sourceId: candidate.id,
      status: candidate.status,
      intendedRoles: candidate.intendedRoles,
      currentUrl: candidate.currentUrl,
      currentFilename: candidate.currentFilename,
      source: {
        type: candidate.source.type,
        wpId: candidate.source.wpId,
      },
      targetPlans: candidate.targetPlans ?? [],
      plannedOutputs: (candidate.targetPlans ?? []).map((targetPlan) => ({
        role: targetPlan.role,
        outputPath: targetPlan.targetPath ?? targetPlan.thumbPath,
        width: targetPlan.width,
        cropMode: targetPlan.cropMode,
        focusPoint: targetPlan.focusPoint,
      })),
    })),
  };
}

function createMarkdownPlan(plan) {
  const sections = [
    ["hero", ["hero_desktop", "hero_mobile"]],
    ["card", ["card"]],
    ["gallery", ["gallery"]],
    ["thumbnails", ["thumbnail"]],
  ];
  const lines = [
    "[CHANGE 2026-04-26 00:00] Generated D2 image processing plan export.",
    "",
    `# ${plan.apartmentKey.toUpperCase()} image processing plan`,
    "",
    "This is a dry-run documentation export. It is not image conversion.",
    "",
    "- No images were downloaded.",
    "- No images were converted.",
    "- No files were written under `public/images`.",
    "- Frontend, source inventory, and image registry files were not modified by this export.",
    "",
    "## Summary",
    "",
    `- apartmentKey: ${plan.apartmentKey}`,
    `- exportMode: ${plan.exportMode}`,
    `- generatedAt: ${plan.generatedAt}`,
    `- mode: ${plan.mode}`,
    `- selectedCount: ${plan.selectedCount}`,
    `- plannedCandidateCount: ${plan.plannedCandidateCount}`,
    `- needsReviewSkippedCount: ${plan.needsReviewSkippedCount}`,
    `- includedNeedsReview: ${plan.includedNeedsReview}`,
    `- totalSourceCandidateCount: ${plan.totalSourceCandidateCount}`,
    "",
  ];

  for (const [sectionTitle, roles] of sections) {
    lines.push(`## ${sectionTitle}`);
    lines.push("");
    lines.push("| Source ID | Status | Current filename | Output role | Output path | Width | Crop | Focus |");
    lines.push("|---|---|---|---|---|---:|---|---|");

    const rows = collectMarkdownRows(plan.candidates, roles);

    if (rows.length === 0) {
      lines.push("| - | - | - | - | - | - | - | - |");
    } else {
      for (const row of rows) {
        lines.push(
          `| ${escapeMarkdownCell(row.sourceId)} | ${escapeMarkdownCell(row.status)} | ${escapeMarkdownCell(
            row.currentFilename,
          )} | ${escapeMarkdownCell(row.role)} | ${escapeMarkdownCell(row.outputPath)} | ${
            row.width ?? "-"
          } | ${escapeMarkdownCell(row.cropMode)} | ${escapeMarkdownCell(row.focusPoint)} |`,
        );
      }
    }

    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function collectMarkdownRows(candidates, roles) {
  return candidates.flatMap((candidate) =>
    candidate.plannedOutputs
      .filter((output) => roles.includes(output.role))
      .map((output) => ({
        sourceId: candidate.sourceId,
        status: candidate.status,
        currentFilename: candidate.currentFilename ?? "-",
        role: output.role,
        outputPath: output.outputPath ?? "-",
        width: output.width,
        cropMode: output.cropMode ?? "-",
        focusPoint: output.focusPoint ?? "-",
      })),
  );
}

function escapeMarkdownCell(value) {
  return String(value ?? "-").replaceAll("|", "\\|");
}

async function fileExists(fileUrl) {
  try {
    await access(fileUrl);
    return true;
  } catch {
    return false;
  }
}

async function processSingleLocalWrite({ apartmentKey, candidates, sourceId, allowRemote }) {
  const candidate = candidates.find((entry) => entry.id === sourceId);

  if (!candidate) {
    console.error(`Unknown source id for apartment ${apartmentKey}: ${sourceId}`);
    process.exit(1);
  }

  if (candidate.status !== "selected") {
    console.error(`WRITE MODE requires status "selected". Received: ${candidate.status}`);
    process.exit(1);
  }

  if (!candidate.targetPlans?.length) {
    console.error("WRITE MODE requires at least one target plan.");
    process.exit(1);
  }

  for (const targetPlan of candidate.targetPlans) {
    const outputPath = targetPlan.targetPath ?? targetPlan.thumbPath;

    if (!outputPath?.startsWith("/images/")) {
      console.error(`Unsupported targetPath: ${outputPath ?? "(missing)"}`);
      process.exit(1);
    }
  }

  let inputDescriptor = "";
  let sharpInput;

  if (candidate.source.type === "local") {
    if (!candidate.currentUrl?.startsWith("/images/")) {
      console.error(`Unsupported local currentUrl: ${candidate.currentUrl ?? "(missing)"}`);
      process.exit(1);
    }

    const sourceFilePath = resolvePublicImagePath(candidate.currentUrl);

    if (!(await fileExists(sourceFilePath))) {
      console.error(`Source file not found: ${sourceFilePath}`);
      process.exit(1);
    }

    inputDescriptor = sourceFilePath;
    sharpInput = sourceFilePath;
  } else if (candidate.source.type === "wordpress") {
    if (!allowRemote) {
      console.error("Remote source processing requires explicit --allow-remote.");
      process.exit(1);
    }

    if (!candidate.currentUrl?.startsWith("http")) {
      console.error(`Unsupported remote currentUrl: ${candidate.currentUrl ?? "(missing)"}`);
      process.exit(1);
    }

    console.log("Downloading remote source once for this write test.");
    const response = await fetch(candidate.currentUrl);

    if (!response.ok) {
      console.error(`Remote source request failed with HTTP ${response.status}.`);
      process.exit(1);
    }

    const sourceBuffer = Buffer.from(await response.arrayBuffer());

    inputDescriptor = candidate.currentUrl;
    sharpInput = sourceBuffer;
  } else {
    console.error(`WRITE MODE does not support source type: ${candidate.source.type}`);
    process.exit(1);
  }

  const targetFiles = candidate.targetPlans.map((targetPlan) =>
    resolvePublicImagePath(targetPlan.targetPath ?? targetPlan.thumbPath),
  );

  for (const targetFilePath of targetFiles) {
    if (await fileExists(targetFilePath)) {
      console.error(`Target file already exists: ${targetFilePath}`);
      process.exit(1);
    }
  }

  for (const targetFilePath of targetFiles) {
    await mkdir(path.dirname(targetFilePath), { recursive: true });
  }

  console.log("WRITE MODE - one source only.");
  console.log(`source id: ${candidate.id}`);
  console.log(`source type: ${candidate.source.type}`);
  console.log(`source path: ${inputDescriptor}`);

  const outputMetadataByRole = [];

  for (const targetPlan of candidate.targetPlans) {
    const outputPath = targetPlan.targetPath ?? targetPlan.thumbPath;
    const targetFilePath = resolvePublicImagePath(outputPath);
    const resizeOptions = {
      width: targetPlan.width ?? candidate.width,
      height: targetPlan.height,
      fit: targetPlan.cropMode === "contain" ? "contain" : targetPlan.cropMode === "cover" ? "cover" : "fill",
      withoutEnlargement: false,
    };
    const quality = targetPlan.role === "thumbnail" ? 76 : candidate.source.type === "local" ? 85 : 82;

    console.log(`target path (${targetPlan.role}): ${targetFilePath}`);

    await sharp(sharpInput)
      .resize(resizeOptions)
      .webp({
        quality,
      })
      .toFile(targetFilePath);

    const outputMetadata = await sharp(targetFilePath).metadata();
    outputMetadataByRole.push({
      role: targetPlan.role,
      format: outputMetadata.format ?? "(unknown)",
      width: outputMetadata.width ?? "(unknown)",
      height: outputMetadata.height ?? "(unknown)",
    });
  }

  console.log("output metadata:");

  for (const entry of outputMetadataByRole) {
    console.log(`- role: ${entry.role}`);
    console.log(`  format: ${entry.format}`);
    console.log(`  width: ${entry.width}`);
    console.log(`  height: ${entry.height}`);
  }
}

function resolvePublicImagePath(publicUrlPath) {
  const relativePath = publicUrlPath.replace(/^\/images\//, "");
  return path.join(workspaceRoot, "public", "images", relativePath);
}

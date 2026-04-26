#!/usr/bin/env node
// [CHANGE 2026-04-26 00:00] Dry-run image processing script váz létrehozása source inventory listázáshoz.
// [CHANGE 2026-04-26 00:00] Plan export mód hozzáadása image processing dry-run scripthhez.
// [CHANGE 2026-04-26 00:00] Plan export fájlnevek szétválasztása selected és all módra.

import { access, mkdir, writeFile } from "node:fs/promises";
import { accommodationSourceImages } from "../src/data/images/accommodation-source-images.ts";

const args = process.argv.slice(2);

const allowedStandaloneArgs = new Set(["--include-needs-review", "--export-plan"]);
const unknownArgs = args.filter(
  (arg) => !arg.startsWith("--apartment=") && !allowedStandaloneArgs.has(arg),
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
const includeNeedsReview = args.includes("--include-needs-review");
const exportPlan = args.includes("--export-plan");

if (!apartmentKey) {
  console.error("Missing required argument: --apartment=<apartmentKey>");
  console.error("Example: node scripts/process-accommodation-images.mjs --apartment=d2");
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

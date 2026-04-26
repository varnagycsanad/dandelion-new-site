#!/usr/bin/env node
// [CHANGE 2026-04-26 00:00] Dry-run image processing script váz létrehozása source inventory listázáshoz.

import { accommodationSourceImages } from "../src/data/images/accommodation-source-images.ts";

const args = process.argv.slice(2);

const allowedStandaloneArgs = new Set(["--include-needs-review"]);
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

function readOption(name) {
  const prefix = `--${name}=`;
  const option = args.find((arg) => arg.startsWith(prefix));

  return option ? option.slice(prefix.length) : undefined;
}

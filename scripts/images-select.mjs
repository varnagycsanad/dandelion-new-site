#!/usr/bin/env node
// [CHANGE 2026-04-27 00:00] images:select MVP parancs hozzáadása source_found -> selected státuszváltáshoz.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SOURCE_FILE_URL = new URL("../src/data/images/accommodation-source-images.ts", import.meta.url);
const SOURCE_FILE_PATH = fileURLToPath(SOURCE_FILE_URL);

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
  console.error("images:select validation failed:");
  for (const error of validationErrors) {
    console.error(`- ${error}`);
  }
  console.error("");
  console.error(
    "Usage: npm run images:select -- --apartment=d2 --source=d2-wp-7872-gallery-terasz [--dry-run]",
  );
  process.exit(1);
}

const sourceFileContent = await readFile(SOURCE_FILE_PATH, "utf8");
const apartmentArrayRange = findApartmentArrayRange(sourceFileContent, apartmentKey);

if (!apartmentArrayRange) {
  console.error(`Unknown apartmentKey in source inventory: ${apartmentKey}`);
  process.exit(1);
}

const apartmentContent = sourceFileContent.slice(apartmentArrayRange.start, apartmentArrayRange.end + 1);
const candidateRange = findCandidateRange(apartmentContent, sourceId);

if (!candidateRange) {
  console.error(`Unknown source candidate for apartment ${apartmentKey}: ${sourceId}`);
  process.exit(1);
}

const absoluteCandidateStart = apartmentArrayRange.start + candidateRange.start;
const absoluteCandidateEnd = apartmentArrayRange.start + candidateRange.end;
const candidateBlock = sourceFileContent.slice(absoluteCandidateStart, absoluteCandidateEnd + 1);
const statusMatch = candidateBlock.match(/status:\s*"([^"]+)"/);

if (!statusMatch) {
  console.error(`Could not find status field for source candidate: ${sourceId}`);
  process.exit(1);
}

const currentStatus = statusMatch[1];

if (currentStatus === "selected") {
  console.log("NO CHANGE - candidate is already selected.");
  console.log(`apartment: ${apartmentKey}`);
  console.log(`source id: ${sourceId}`);
  console.log(`status: ${currentStatus}`);
  process.exit(0);
}

if (currentStatus !== "source_found") {
  console.error(`Status transition not allowed. Current status: ${currentStatus}`);
  process.exit(1);
}

const nextCandidateBlock = candidateBlock.replace('status: "source_found"', 'status: "selected"');
const nextSourceFileContent =
  sourceFileContent.slice(0, absoluteCandidateStart) +
  nextCandidateBlock +
  sourceFileContent.slice(absoluteCandidateEnd + 1);

if (!dryRun) {
  await writeFile(SOURCE_FILE_PATH, nextSourceFileContent, "utf8");
}

console.log(dryRun ? "DRY RUN - no file written" : "Source candidate updated");
console.log(`apartment: ${apartmentKey}`);
console.log(`source id: ${sourceId}`);
console.log(`status: ${currentStatus} -> selected`);
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

function findCandidateRange(apartmentContent, sourceIdValue) {
  const idMarker = `id: "${sourceIdValue}"`;
  const idIndex = apartmentContent.indexOf(idMarker);
  if (idIndex === -1) {
    return null;
  }

  const start = apartmentContent.lastIndexOf("{", idIndex);
  if (start === -1) {
    return null;
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < apartmentContent.length; i += 1) {
    const char = apartmentContent[i];

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

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return { start, end: i };
      }
    }
  }

  return null;
}

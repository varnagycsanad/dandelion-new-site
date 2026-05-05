#!/usr/bin/env node

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));
const sourceRoot = path.join(workspaceRoot, "source-images", "accommodations");
const outputRoot = path.join(workspaceRoot, "public", "images", "accommodations");

const galleryWidth = 1600;
const galleryQuality = 82;
const thumbWidth = 500;
const thumbQuality = 75;
const apartmentFolderMap = {
  "royal-homes": "royal_homes",
  szepvolgyi: "szepvolgyi",
  szololiget: "szololiget",
  vintage: "vintage",
  zsalya: "zsalya",
  koveskal: "koveskal",
};

const apartmentDirs = await listApartmentDirs(sourceRoot);
const processApartmentDirs = apartmentDirs.filter((apartmentKey) => apartmentKey in apartmentFolderMap);
const summary = {
  processed: 0,
  galleryCreated: 0,
  thumbsCreated: 0,
  skippedExisting: [],
  errors: [],
};

for (const apartmentKey of processApartmentDirs) {
  const sourceDir = path.join(sourceRoot, apartmentKey);
  const outputApartmentKey = apartmentFolderMap[apartmentKey] ?? apartmentKey;
  const files = await readdir(sourceDir, { withFileTypes: true });
  const jpgFiles = files
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter(isJpgFile)
    .sort((a, b) => a.localeCompare(b));

  for (const fileName of jpgFiles) {
    const sourcePath = path.join(sourceDir, fileName);
    const outputBaseName = `${path.parse(fileName).name}.webp`;
    const galleryDir = path.join(outputRoot, outputApartmentKey, "gallery");
    const thumbDir = path.join(outputRoot, outputApartmentKey, "thumbs");
    const galleryPath = path.join(galleryDir, outputBaseName);
    const thumbPath = path.join(thumbDir, outputBaseName);

    try {
      await mkdir(galleryDir, { recursive: true });
      await mkdir(thumbDir, { recursive: true });

      const outputsExist = (await exists(galleryPath)) || (await exists(thumbPath));
      if (outputsExist) {
        summary.skippedExisting.push({
          apartmentKey: outputApartmentKey,
          source: fileName,
          galleryPath,
          thumbPath,
        });
        continue;
      }

      await sharp(sourcePath)
        .resize({ width: galleryWidth, fit: "inside", withoutEnlargement: true })
        .webp({ quality: galleryQuality })
        .toFile(galleryPath);

      await sharp(sourcePath)
        .resize({ width: thumbWidth, fit: "inside", withoutEnlargement: true })
        .webp({ quality: thumbQuality })
        .toFile(thumbPath);

      summary.processed += 1;
      summary.galleryCreated += 1;
      summary.thumbsCreated += 1;
    } catch (error) {
      summary.errors.push({
        apartmentKey,
        source: fileName,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

console.log("Image processing completed.");
console.log(`Processed JPG files: ${summary.processed}`);
console.log(`Gallery files created: ${summary.galleryCreated}`);
console.log(`Thumbnail files created: ${summary.thumbsCreated}`);
console.log(`Skipped existing outputs: ${summary.skippedExisting.length}`);

if (summary.skippedExisting.length > 0) {
  console.log("Skipped files:");
  for (const item of summary.skippedExisting) {
    console.log(`- ${item.apartmentKey}: ${item.source}`);
  }
}

if (summary.errors.length > 0) {
  console.error(`Errors: ${summary.errors.length}`);
  for (const item of summary.errors) {
    console.error(`- ${item.apartmentKey}: ${item.source} -> ${item.message}`);
  }
  process.exitCode = 1;
}

async function listApartmentDirs(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function isJpgFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg";
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

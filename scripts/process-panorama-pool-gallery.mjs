#!/usr/bin/env node
// [CHANGE 2026-06-28 00:00] Panorama Pool 2026-06-28 gallery WebP pipeline added with desktop, mobile and thumb outputs.

import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));
const sourceDir = String.raw`P:\pCloud Drive\Marketing\Képek a környékről\2026\Medence\06-28\Képek`;
const panoramaPoolRoot = path.join(workspaceRoot, "public", "images", "panorama-pool");
const galleryDir = path.join(panoramaPoolRoot, "gallery");
const mobileDir = path.join(panoramaPoolRoot, "mobile");
const thumbsDir = path.join(panoramaPoolRoot, "thumbs");

const selectedImages = [
  {
    sourceName: "2026-06-27 11-04-01.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-01",
  },
  {
    sourceName: "2026-06-27 11-04-21.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-02",
  },
  {
    sourceName: "2026-06-27 11-04-24.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-03",
  },
  {
    sourceName: "2026-06-27 11-04-28.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-04",
  },
  {
    sourceName: "2026-06-27 11-04-31.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-05",
  },
  {
    sourceName: "2026-06-27 11-04-34.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-06",
  },
  {
    sourceName: "2026-06-27 11-04-40.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-07",
  },
  {
    sourceName: "2026-06-27 11-04-55.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-08",
  },
  {
    sourceName: "2026-06-27 11-04-56.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-09",
  },
  {
    sourceName: "2026-06-27 11-05-04.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-10",
  },
  {
    sourceName: "2026-06-27 11-06-47.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-11",
  },
  {
    sourceName: "2026-06-27 11-06-50.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-12",
  },
  {
    sourceName: "2026-06-27 11-06-55.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-13",
  },
  {
    sourceName: "2026-06-27 11-06-57.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-14",
  },
  {
    sourceName: "2026-06-27 11-07-01.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-15",
  },
  {
    sourceName: "2026-06-27 11-07-08.jpeg",
    stem: "panorama-pool-gallery-2026-06-28-16",
  },
];

const outputVariants = [
  {
    folder: galleryDir,
    suffix: ".webp",
    width: 1800,
    height: 1350,
    quality: 82,
  },
  {
    folder: mobileDir,
    suffix: "-mobile.webp",
    width: 960,
    height: 720,
    quality: 76,
  },
  {
    folder: thumbsDir,
    suffix: "-thumb.webp",
    width: 600,
    height: 450,
    quality: 74,
  },
];

await ensureDirectories();
await removeLegacyPanoramaPoolGalleryFiles();

let processedCount = 0;

for (const image of selectedImages) {
  const sourcePath = path.join(sourceDir, image.sourceName);
  const baseImage = sharp(sourcePath).rotate();

  for (const variant of outputVariants) {
    const outputPath = path.join(variant.folder, `${image.stem}${variant.suffix}`);
    await baseImage
      .clone()
      .resize(variant.width, variant.height, {
        fit: "cover",
        position: "attention",
      })
      .webp({ quality: variant.quality })
      .toFile(outputPath);
  }

  processedCount += 1;
}

console.log(`Panorama Pool gallery images processed: ${processedCount}`);
console.log(`Outputs written to: ${panoramaPoolRoot}`);

async function ensureDirectories() {
  await mkdir(galleryDir, { recursive: true });
  await mkdir(mobileDir, { recursive: true });
  await mkdir(thumbsDir, { recursive: true });
}

async function removeLegacyPanoramaPoolGalleryFiles() {
  const cleanupPlans = [
    {
      folder: galleryDir,
      pattern:
        /^(dandelion-panorama-pool-20260608-\d{2}|panorama-pool-gallery-desktop-2026-06-28|panorama-pool-gallery-2026-06-28-\d{2})\.webp$/i,
    },
    {
      folder: mobileDir,
      pattern:
        /^(dandelion-panorama-pool-20260608-mobile-\d{2}|panorama-pool-gallery-mobile-2026-06-28|panorama-pool-gallery-2026-06-28-\d{2}-mobile)\.webp$/i,
    },
    {
      folder: thumbsDir,
      pattern:
        /^(dandelion-panorama-pool-20260608-thumb-\d{2}|panorama-pool-thumb-2026-06-28|panorama-pool-gallery-2026-06-28-\d{2}-thumb)\.webp$/i,
    },
  ];

  for (const plan of cleanupPlans) {
    const entries = await readdir(plan.folder, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !plan.pattern.test(entry.name)) {
        continue;
      }
      await rm(path.join(plan.folder, entry.name), { force: true });
    }
  }
}

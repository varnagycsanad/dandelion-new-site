#!/usr/bin/env node

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = path.join(workspaceRoot, "public", "images", "accommodations");
const outputPath = path.join(
  workspaceRoot,
  "src",
  "data",
  "images",
  "accommodation-images.generated.json",
);

const apartmentKeys = ["d1", "d2", "koveskal", "fugehaz"];
const generated = {};
const missingThumbPairs = [];

for (const apartmentKey of apartmentKeys) {
  const galleryDir = path.join(publicRoot, apartmentKey, "gallery");
  const thumbsDir = path.join(publicRoot, apartmentKey, "thumbs");
  const galleryFiles = (await readdir(galleryDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith(".webp"))
    .filter((name) => name.startsWith(`dandelion-${apartmentKey}-source-`))
    .sort((a, b) => a.localeCompare(b));
  const thumbFiles = new Set(
    (await readdir(thumbsDir, { withFileTypes: true }))
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => name.endsWith(".webp")),
  );

  generated[apartmentKey] = {
    apartmentKey,
    gallery: [],
  };

  let index = 1;
  for (const fileName of galleryFiles) {
    const thumbName = fileName;
    if (!thumbFiles.has(thumbName)) {
      missingThumbPairs.push({
        apartmentKey,
        gallery: fileName,
        expectedThumb: thumbName,
      });
      continue;
    }

    const id = `${apartmentKey}-${String(index).padStart(3, "0")}`;
    generated[apartmentKey].gallery.push({
      id,
      src: `/images/accommodations/${apartmentKey}/gallery/${fileName}`,
      thumb: `/images/accommodations/${apartmentKey}/thumbs/${thumbName}`,
      sortOrder: index * 10,
      seoDraft: {
        approved: false,
        altHu: "",
        titleHu: "",
        captionHu: "",
        altEn: "",
        titleEn: "",
        captionEn: "",
      },
    });
    index += 1;
  }
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(generated, null, 2)}\n`, "utf8");

console.log("Registry draft generated.");
console.log(`Output: ${outputPath}`);
for (const apartmentKey of apartmentKeys) {
  console.log(`${apartmentKey}: ${generated[apartmentKey].gallery.length} items`);
}
console.log(`Missing thumb pairs: ${missingThumbPairs.length}`);

if (missingThumbPairs.length > 0) {
  for (const item of missingThumbPairs) {
    console.log(
      `- ${item.apartmentKey}: gallery=${item.gallery} expectedThumb=${item.expectedThumb}`,
    );
  }
}

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import {
  homepageImageSlots,
  type HomepageImageSlotKey
} from "../data/homepage-image-slots";
import homepageImageMappingData from "../data/homepage-image-mapping.json";

export interface HomepageImageSelection {
  id: number;
  title: string;
  altText: string;
  sourceUrl: string;
  thumbnailUrl: string;
}

export type HomepageImageMapping = Record<
  HomepageImageSlotKey,
  HomepageImageSelection | null
>;

const mappingFileUrl = new URL("../data/homepage-image-mapping.json", import.meta.url);

function createEmptyMapping(): HomepageImageMapping {
  return Object.fromEntries(
    homepageImageSlots.map((slot) => [slot.key, null])
  ) as HomepageImageMapping;
}

function sanitizeSelection(value: unknown): HomepageImageSelection | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  if (
    typeof candidate.id !== "number" ||
    typeof candidate.title !== "string" ||
    typeof candidate.altText !== "string" ||
    typeof candidate.sourceUrl !== "string" ||
    typeof candidate.thumbnailUrl !== "string"
  ) {
    return null;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    altText: candidate.altText,
    sourceUrl: candidate.sourceUrl,
    thumbnailUrl: candidate.thumbnailUrl
  };
}

export async function readHomepageImageMapping(): Promise<HomepageImageMapping> {
  const parsed = homepageImageMappingData as Record<string, unknown>;
  const fallback = createEmptyMapping();

  for (const slot of homepageImageSlots) {
    fallback[slot.key] = sanitizeSelection(parsed[slot.key]);
  }

  return fallback;
}

export async function writeHomepageImageMapping(
  input: HomepageImageMapping
): Promise<void> {
  const sanitized = createEmptyMapping();

  for (const slot of homepageImageSlots) {
    sanitized[slot.key] = sanitizeSelection(input[slot.key]);
  }

  const outputPath = fileURLToPath(mappingFileUrl);
  await writeFile(outputPath, `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
}

export function parseHomepageImageMapping(raw: string): HomepageImageMapping {
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const mapping = createEmptyMapping();

  for (const slot of homepageImageSlots) {
    mapping[slot.key] = sanitizeSelection(parsed[slot.key]);
  }

  return mapping;
}

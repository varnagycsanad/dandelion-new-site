import type { ImageMetadata } from "astro";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import {
  homepageImageSlots,
  type HomepageImageSlotKey
} from "../data/homepage-image-slots";
import { accommodationImages } from "../data/images/accommodation-images";
import homepageImageMappingData from "../data/homepage-image-mapping.json";

export interface HomepageImageSelection {
  id: number;
  title: string;
  altText: string;
  sourceUrl: string;
  thumbnailUrl: string;
  astroSrc?: ImageMetadata;
  width?: number;
  height?: number;
}

export type HomepageImageMapping = Record<
  HomepageImageSlotKey,
  HomepageImageSelection | null
>;

const mappingFileUrl = new URL("../data/homepage-image-mapping.json", import.meta.url);

const slotAccommodationKeyMap: Partial<Record<HomepageImageSlotKey, string>> = {
  d1_card_image: "d1",
  d2_card_image: "d2",
  fugehaz_card_image: "fugehaz",
  koveskal_card_image: "koveskal",
  zsalya_card_image: "zsalya",
  szololiget_card_image: "szololiget",
  szepvolgyi_card_image: "szepvolgyi",
  royal_homes_card_image: "royal_homes",
  vintage_card_image: "vintage"
};

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
    thumbnailUrl: candidate.thumbnailUrl,
    width: typeof candidate.width === "number" ? candidate.width : undefined,
    height: typeof candidate.height === "number" ? candidate.height : undefined
  };
}

function attachLocalAccommodationSelection(
  slotKey: HomepageImageSlotKey,
  selection: HomepageImageSelection | null
): HomepageImageSelection | null {
  const accommodationKey = slotAccommodationKeyMap[slotKey];

  if (!accommodationKey) {
    return selection;
  }

  const localImageSet = accommodationImages[accommodationKey];
  const localImage =
    localImageSet?.card ||
    localImageSet?.gallery[0] ||
    localImageSet?.hero.desktop ||
    localImageSet?.hero.mobile ||
    null;

  if (!localImage?.astroSrc) {
    return selection;
  }

  return {
    id: selection?.id ?? localImage.source.wpId ?? 0,
    title: selection?.title || localImage.title.hu || localImage.alt.hu,
    altText: selection?.altText || localImage.alt.hu,
    sourceUrl: localImage.astroSrc.src,
    thumbnailUrl: localImage.thumbAstroSrc?.src || localImage.astroSrc.src,
    astroSrc: localImage.astroSrc,
    width: localImage.width,
    height: localImage.height
  };
}

export async function readHomepageImageMapping(): Promise<HomepageImageMapping> {
  const parsed = homepageImageMappingData as Record<string, unknown>;
  const fallback = createEmptyMapping();

  for (const slot of homepageImageSlots) {
    fallback[slot.key] = attachLocalAccommodationSelection(
      slot.key,
      sanitizeSelection(parsed[slot.key])
    );
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
    mapping[slot.key] = attachLocalAccommodationSelection(
      slot.key,
      sanitizeSelection(parsed[slot.key])
    );
  }

  return mapping;
}

import type { ImageMetadata } from "astro";

const accommodationAssetModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/accommodations/**/*.{avif,gif,jpeg,jpg,png,webp}",
  { eager: true }
);
const accommodationAssetEntries = Object.values(accommodationAssetModules).map((module) => module.default);

export function getAccommodationLocalAsset(
  apartmentKey: string,
  folder: "gallery" | "thumbs" | "hero" | "card",
  filename: string
): ImageMetadata | undefined {
  return accommodationAssetModules[`/src/assets/accommodations/${apartmentKey}/${folder}/${filename}`]?.default;
}

export function getAccommodationLocalAssetFromPublicPath(
  imagePath: string
): ImageMetadata | undefined {
  const match = imagePath.match(
    /^\/images\/accommodations\/([^/]+)\/(gallery|thumbs|hero|card)\/([^/]+)$/
  );

  if (!match) {
    return undefined;
  }

  const [, apartmentKey, folder, filename] = match;
  return getAccommodationLocalAsset(
    apartmentKey,
    folder as "gallery" | "thumbs" | "hero" | "card",
    filename
  );
}

export function getAccommodationLocalAssetFromAstroPath(
  imagePath: string
): ImageMetadata | undefined {
  return accommodationAssetEntries.find((asset) => asset.src === imagePath);
}

export function getAccommodationLocalAssetFromAnyPath(
  imagePath: string
): ImageMetadata | undefined {
  return (
    getAccommodationLocalAssetFromPublicPath(imagePath) ||
    getAccommodationLocalAssetFromAstroPath(imagePath)
  );
}

export function requireAccommodationLocalAssetFromPublicPath(
  imagePath: string,
  contextLabel: string
): ImageMetadata {
  const asset = getAccommodationLocalAssetFromAnyPath(imagePath);

  if (!asset) {
    throw new Error(`Missing Astro accommodation asset for ${contextLabel}: ${imagePath}`);
  }

  return asset;
}

export function requireAccommodationLocalAssetByKey(
  apartmentKey: string,
  folder: "gallery" | "thumbs" | "hero" | "card",
  filename: string,
  contextLabel: string
): ImageMetadata {
  const asset = getAccommodationLocalAsset(apartmentKey, folder, filename);

  if (!asset) {
    throw new Error(
      `Missing Astro accommodation asset for ${contextLabel}: ${apartmentKey}/${folder}/${filename}`
    );
  }

  return asset;
}

export function requireAccommodationLocalAssetPath(
  apartmentKey: string,
  folder: "gallery" | "thumbs" | "hero" | "card",
  filename: string,
  contextLabel: string
): string {
  return requireAccommodationLocalAssetByKey(apartmentKey, folder, filename, contextLabel).src;
}

export const d2LocalAstroAssets = {
  heroDesktop: getAccommodationLocalAsset(
    "d2",
    "hero",
    "dandelion-d2-kisapati-hero-desktop-01.webp"
  ),
  heroMobile: getAccommodationLocalAsset(
    "d2",
    "hero",
    "dandelion-d2-kisapati-hero-mobile-01.webp"
  ),
  card: getAccommodationLocalAsset("d2", "card", "dandelion-d2-kisapati-card-01.webp")
} as const;

import type { ImageMetadata } from "astro";

const accommodationAssetModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/accommodations/**/*.{avif,gif,jpeg,jpg,png,webp}",
  { eager: true }
);

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

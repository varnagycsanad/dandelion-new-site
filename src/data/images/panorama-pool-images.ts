// [CHANGE 2026-06-28 00:00] Panorama Pool photo usages unified to the new 2026-06-28 desktop and mobile WebP assets.

export type PanoramaPoolImageUsageHint = "hero" | "teaser" | "gallery";

export interface PanoramaPoolImageDraft {
  id: string;
  src: string;
  mobileSrc?: string;
  thumb: string;
  altHu: string;
  titleHu: string;
  captionHu: string;
  altEn: string;
  titleEn: string;
  captionEn: string;
  altDe: string;
  titleDe: string;
  captionDe: string;
  altCs: string;
  titleCs: string;
  captionCs: string;
  altSk: string;
  titleSk: string;
  captionSk: string;
  usageHint: PanoramaPoolImageUsageHint;
  sortOrder: number;
  approved: false;
}

const panoramaPoolSharedDesktopImage = "/images/panorama-pool/gallery/panorama-pool-gallery-desktop-2026-06-28.webp";
const panoramaPoolSharedMobileImage = "/images/panorama-pool/mobile/panorama-pool-gallery-mobile-2026-06-28.webp";
const panoramaPoolSharedThumbImage = "/images/panorama-pool/thumbs/panorama-pool-thumb-2026-06-28.webp";

const panoramaPoolLocalizedCopy = {
  hu: {
    alt: "Panorama Pool medence Kisapátiban napozóterasszal és domboldali környezettel.",
    title: "Panorama Pool medence",
    caption: "A Panorama Pool a kisapáti domboldalon várja a Dandelion vendégeit."
  },
  en: {
    alt: "Panorama Pool in Kisapáti with a sun terrace and hillside surroundings.",
    title: "Panorama Pool",
    caption: "Panorama Pool welcomes Dandelion guests on the hillside in Kisapáti."
  },
  de: {
    alt: "Panorama Pool in Kisapáti mit Sonnenterrasse und Hanglage.",
    title: "Panorama Pool",
    caption: "Der Panorama Pool empfängt Dandelion Gäste am Hang in Kisapáti."
  },
  cs: {
    alt: "Panorama Pool v Kisapáti se sluneční terasou a okolními svahy.",
    title: "Panorama Pool",
    caption: "Panorama Pool vítá hosty Dandelion na svahu v Kisapáti."
  },
  sk: {
    alt: "Panorama Pool v Kisapáti so slnečnou terasou a svahovitým okolím.",
    title: "Panorama Pool",
    caption: "Panorama Pool víta hostí Dandelion na svahu v Kisapáti."
  }
} as const;

const panoramaPoolImageBlueprints: Array<{
  id: string;
  usageHint: PanoramaPoolImageUsageHint;
  sortOrder: number;
}> = [
  { id: "panorama-pool-20260608-01", usageHint: "gallery", sortOrder: 10 },
  { id: "panorama-pool-20260608-02", usageHint: "gallery", sortOrder: 20 },
  { id: "panorama-pool-20260608-03", usageHint: "teaser", sortOrder: 30 },
  { id: "panorama-pool-20260608-04", usageHint: "gallery", sortOrder: 40 },
  { id: "panorama-pool-20260608-05", usageHint: "gallery", sortOrder: 50 },
  { id: "panorama-pool-20260608-06", usageHint: "gallery", sortOrder: 60 },
  { id: "panorama-pool-20260608-07", usageHint: "gallery", sortOrder: 70 },
  { id: "panorama-pool-20260608-08", usageHint: "teaser", sortOrder: 80 },
  { id: "panorama-pool-20260608-09", usageHint: "gallery", sortOrder: 90 },
  { id: "panorama-pool-20260608-10", usageHint: "gallery", sortOrder: 100 },
  { id: "panorama-pool-20260608-11", usageHint: "gallery", sortOrder: 110 },
  { id: "panorama-pool-20260608-12", usageHint: "gallery", sortOrder: 120 },
  { id: "panorama-pool-20260608-13", usageHint: "gallery", sortOrder: 130 },
  { id: "panorama-pool-20260608-14", usageHint: "gallery", sortOrder: 140 },
  { id: "panorama-pool-20260608-15", usageHint: "gallery", sortOrder: 150 },
  { id: "panorama-pool-20260608-16", usageHint: "gallery", sortOrder: 160 },
  { id: "panorama-pool-20260608-17", usageHint: "gallery", sortOrder: 170 },
  { id: "panorama-pool-20260608-18", usageHint: "gallery", sortOrder: 180 },
  { id: "panorama-pool-20260608-19", usageHint: "gallery", sortOrder: 190 },
  { id: "panorama-pool-20260608-20", usageHint: "gallery", sortOrder: 200 },
  { id: "panorama-pool-20260608-21", usageHint: "gallery", sortOrder: 210 },
  { id: "panorama-pool-20260608-22", usageHint: "hero", sortOrder: 220 },
  { id: "panorama-pool-20260608-23", usageHint: "gallery", sortOrder: 230 },
  { id: "panorama-pool-20260608-24", usageHint: "gallery", sortOrder: 240 },
  { id: "panorama-pool-20260608-25", usageHint: "teaser", sortOrder: 250 },
  { id: "panorama-pool-20260608-26", usageHint: "gallery", sortOrder: 260 },
  { id: "panorama-pool-20260608-27", usageHint: "gallery", sortOrder: 270 },
  { id: "panorama-pool-20260608-28", usageHint: "gallery", sortOrder: 280 },
  { id: "panorama-pool-20260608-29", usageHint: "teaser", sortOrder: 290 }
];

export const panoramaPoolHero = {
  desktop: "/images/panorama-pool/hero/panorama-pool-hero-desktop-2026-06-28.webp",
  mobile: "/images/panorama-pool/hero/panorama-pool-hero-mobile-2026-06-28.webp"
};

export const panoramaPoolImages: PanoramaPoolImageDraft[] = panoramaPoolImageBlueprints.map((image) => ({
  id: image.id,
  src: panoramaPoolSharedDesktopImage,
  mobileSrc: panoramaPoolSharedMobileImage,
  thumb: panoramaPoolSharedThumbImage,
  altHu: panoramaPoolLocalizedCopy.hu.alt,
  titleHu: panoramaPoolLocalizedCopy.hu.title,
  captionHu: panoramaPoolLocalizedCopy.hu.caption,
  altEn: panoramaPoolLocalizedCopy.en.alt,
  titleEn: panoramaPoolLocalizedCopy.en.title,
  captionEn: panoramaPoolLocalizedCopy.en.caption,
  altDe: panoramaPoolLocalizedCopy.de.alt,
  titleDe: panoramaPoolLocalizedCopy.de.title,
  captionDe: panoramaPoolLocalizedCopy.de.caption,
  altCs: panoramaPoolLocalizedCopy.cs.alt,
  titleCs: panoramaPoolLocalizedCopy.cs.title,
  captionCs: panoramaPoolLocalizedCopy.cs.caption,
  altSk: panoramaPoolLocalizedCopy.sk.alt,
  titleSk: panoramaPoolLocalizedCopy.sk.title,
  captionSk: panoramaPoolLocalizedCopy.sk.caption,
  usageHint: image.usageHint,
  sortOrder: image.sortOrder,
  approved: false
}));

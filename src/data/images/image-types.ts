// [CHANGE 2026-04-26 00:00] Projekt szintű image registry típusok létrehozása.
// [CHANGE 2026-04-26 00:00] Source/import image inventory típusok hozzáadása a feldolgozás előtti képekhez.
import type { ImageMetadata } from "astro";

export type LocalizedText = {
  hu: string;
  en: string;
  de?: string;
  cs?: string;
};

export type ImageRole =
  | "hero_desktop"
  | "hero_mobile"
  | "card"
  | "gallery"
  | "thumbnail"
  | "poster"
  | "region_story"
  | "experience"
  | "blog"
  | "seo";

export type ImageStatus =
  | "source_found"
  | "selected"
  | "processed"
  | "active"
  | "hidden"
  | "archived"
  | "delete_candidate"
  | "deleted";

export type ImageSourceStatus =
  | "source_found"
  | "selected"
  | "rejected"
  | "needs_review"
  | "ready_for_processing"
  | "processed"
  | "archived"
  | "delete_candidate";

export interface ImageSource {
  type: "pcloud" | "wordpress" | "local" | "external";
  wpId?: number;
  originalUrl?: string;
  originalFilename?: string;
  pcloudNote?: string;
}

export interface ImageSeoDraft {
  alt?: Partial<LocalizedText>;
  title?: Partial<LocalizedText>;
  caption?: Partial<LocalizedText>;
  approved?: boolean;
}

export interface ImageTargetPlan {
  role: ImageRole;
  targetPath?: string;
  thumbPath?: string;
  width?: number;
  height?: number;
  quality?: number;
  cropMode?: "cover" | "contain" | "manual";
  focusPoint?: string;
}

export interface ImageSourceCandidate {
  id: string;
  apartmentKey?: string;
  pageKey?: string;
  source: ImageSource;
  currentUrl?: string;
  currentFilename?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  fileSize?: number;
  intendedRoles: ImageRole[];
  room?: string;
  theme?: string;
  sortOrder?: number;
  status: ImageSourceStatus;
  seoDraft?: ImageSeoDraft;
  targetPlans?: ImageTargetPlan[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageAsset {
  id: string;
  apartmentKey?: string;
  pageKey?: string;
  role: ImageRole;
  room?: string;
  theme?: string;
  src: string;
  astroSrc?: ImageMetadata;
  thumb?: string;
  thumbAstroSrc?: ImageMetadata;
  width: number;
  height: number;
  aspectRatio: string;
  fileSize?: number;
  alt: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
  focusPoint: string;
  sortOrder: number;
  status: ImageStatus;
  source: ImageSource;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage extends ImageAsset {
  role: "gallery";
  thumb: string;
}

export interface AccommodationImageSet {
  apartmentKey: string;
  hero: {
    desktop: ImageAsset | null;
    mobile: ImageAsset | null;
  };
  card: ImageAsset | null;
  gallery: GalleryImage[];
  thumbnail?: ImageAsset | null;
}

export interface HomeImageSet {
  hero: {
    desktop: ImageAsset | null;
    mobile: ImageAsset | null;
    poster?: ImageAsset | null;
  };
  regionStories: ImageAsset[];
  experiences: ImageAsset[];
  stays: Record<string, ImageAsset | null>;
}

export interface BlogImageEntry {
  slug: string;
  hero: ImageAsset | null;
  images: ImageAsset[];
}

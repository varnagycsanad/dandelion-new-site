import type { ImageMetadata } from "astro";
import type { AccommodationPageRelatedStay, AccommodationPageReview } from "../data/accommodation-pages/types";
import { requireAccommodationLocalAssetFromPublicPath } from "../data/images/astro-local-assets";
import type { ImageAsset, GalleryImage, LocalizedText } from "../data/images/image-types";
import type { HomepageImageMapping } from "./homepage-image-mapping";

export type AccommodationPageLocale = "hu" | "en";

export interface AccommodationHeroImage {
  src: string;
  alt: string;
  astroSrc?: ImageMetadata;
  width: number;
  height: number;
}

export interface AccommodationDisplayGalleryImage {
  id: number | string;
  src: string;
  thumb: string;
  alt: string;
  astroSrc?: ImageMetadata;
  thumbAstroSrc?: ImageMetadata;
  width: number;
  height: number;
  title?: string;
  caption?: string;
  sortOrder?: number;
}

export interface AccommodationReviewDisplayItem extends AccommodationPageReview {
  logoSrc: string;
  logoAlt: string;
}

export interface AccommodationReviewBrandAssets {
  Google: {
    logoSrc: string;
    logoAlt: string;
  };
  "Booking.com": {
    logoSrc: string;
    logoAlt: string;
  };
}

export interface AccommodationRelatedStayDisplayItem {
  name: string;
  meta: string;
  href: string;
  image:
    | {
        sourceUrl: string;
        altText: string;
        astroSrc?: ImageMetadata;
        width?: number;
        height?: number;
      }
    | null;
}

export function resolveBaseHref(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

function resolveLocalizedText(value: LocalizedText, locale: AccommodationPageLocale): string {
  return value[locale] || value.hu || value.en || "";
}

function requireAccommodationDisplayAsset(
  imagePath: string | undefined,
  contextLabel: string
): ImageMetadata {
  if (!imagePath) {
    throw new Error(`Missing accommodation image path for ${contextLabel}`);
  }

  return requireAccommodationLocalAssetFromPublicPath(imagePath, contextLabel);
}

export function resolveStayHref(baseHref: string, href: string): string {
  return href.startsWith("/") ? `${baseHref}${href.replace(/^\/+/, "")}` : href;
}

export function buildReviewDisplayData(input: {
  reviews: AccommodationPageReview[];
  baseHref: string;
  googleLogoAlt: string;
  bookingLogoAlt: string;
}): {
  reviewBrandAssets: AccommodationReviewBrandAssets;
  reviews: AccommodationReviewDisplayItem[];
  mobileGoogleReviews: AccommodationReviewDisplayItem[];
  mobileBookingReviews: AccommodationReviewDisplayItem[];
} {
  const reviewBrandAssets = {
    Google: {
      logoSrc: `${input.baseHref}images/brand/google-logo-compact-optimized-v2.png`,
      logoAlt: input.googleLogoAlt
    },
    "Booking.com": {
      logoSrc: `${input.baseHref}images/brand/booking-logo.svg`,
      logoAlt: input.bookingLogoAlt
    }
  } as const;

  const reviews = input.reviews.map((review) => ({
    ...review,
    ...reviewBrandAssets[review.source]
  }));

  return {
    reviewBrandAssets,
    reviews,
    mobileGoogleReviews: reviews.filter((review) => review.source === "Google").slice(0, 2),
    mobileBookingReviews: reviews.filter((review) => review.source === "Booking.com").slice(0, 2)
  };
}

export function buildGalleryImages(input: {
  gallery: GalleryImage[];
  baseHref: string;
  locale?: AccommodationPageLocale;
}): AccommodationDisplayGalleryImage[] {
  const locale = input.locale ?? "hu";

  return input.gallery
    .slice()
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((image) => {
      const astroSrc =
        image.astroSrc ||
        requireAccommodationDisplayAsset(image.src, `${image.apartmentKey ?? "unknown"} gallery`);
      const thumbAstroSrc =
        image.thumbAstroSrc ||
        requireAccommodationDisplayAsset(image.thumb, `${image.apartmentKey ?? "unknown"} thumbnail`);

      return {
        id: typeof image.source.wpId === "number" ? image.source.wpId : image.sortOrder,
        src: astroSrc.src,
        thumb: thumbAstroSrc.src,
        alt: resolveLocalizedText(image.alt, locale),
        astroSrc,
        thumbAstroSrc,
        width: image.width,
        height: image.height,
        title: resolveLocalizedText(image.title, locale),
        caption: resolveLocalizedText(image.caption, locale),
        sortOrder: image.sortOrder
      };
    });
}

export function buildGalleryPreviewState(input: {
  images: AccommodationDisplayGalleryImage[];
  previewCount: number;
  emptyMessage: string;
}): {
  galleryImages: AccommodationDisplayGalleryImage[];
  galleryWarning: string;
  galleryPreviewImages: AccommodationDisplayGalleryImage[];
  galleryHasMore: boolean;
  galleryMoreCount: number;
} {
  const galleryImages = input.images;
  const galleryPreviewImages = galleryImages.slice(0, input.previewCount);
  const galleryHasMore = galleryImages.length > galleryPreviewImages.length;

  return {
    galleryImages,
    galleryWarning: galleryImages.length ? "" : input.emptyMessage,
    galleryPreviewImages,
    galleryHasMore,
    galleryMoreCount: Math.max(galleryImages.length - galleryPreviewImages.length, 0)
  };
}

export function buildHeroImages(input: {
  desktopHero: ImageAsset | null;
  mobileHero: ImageAsset | null;
  mobileImagePath: string;
  galleryImages: AccommodationDisplayGalleryImage[];
  fallbackAlt: string;
  locale?: AccommodationPageLocale;
}): {
  mobileHeroImage: string;
  desktopHeroImage: string;
  desktopHeroAlt: string;
  localHeroFallback: AccommodationHeroImage;
  heroFallback: AccommodationHeroImage;
  initialHeroImage: AccommodationHeroImage;
} {
  const mobileHeroAstroSrc =
    input.mobileHero?.astroSrc ||
    requireAccommodationDisplayAsset(
      input.mobileImagePath,
      `${input.mobileHero?.apartmentKey ?? "unknown"} mobile hero`
    );
  const mobileHeroImage = mobileHeroAstroSrc.src;
  const desktopHeroAstroSrc =
    input.desktopHero?.astroSrc ||
    (input.desktopHero?.src
      ? requireAccommodationDisplayAsset(
          input.desktopHero.src,
          `${input.desktopHero.apartmentKey ?? "unknown"} desktop hero`
        )
      : undefined);
  const desktopHeroImage = desktopHeroAstroSrc?.src || "";
  const locale = input.locale ?? "hu";
  const desktopHeroAlt = input.desktopHero ? resolveLocalizedText(input.desktopHero.alt, locale) : input.fallbackAlt;
  const mobileHeroWidth = input.mobileHero?.width || 1200;
  const mobileHeroHeight = input.mobileHero?.height || 1600;
  const localHeroFallback = {
    src: mobileHeroImage,
    alt: input.fallbackAlt,
    astroSrc: mobileHeroAstroSrc,
    width: mobileHeroWidth,
    height: mobileHeroHeight
  };
  const heroFallback = input.galleryImages[0] || localHeroFallback;

  return {
    mobileHeroImage,
    desktopHeroImage,
    desktopHeroAlt,
    localHeroFallback,
    heroFallback,
    initialHeroImage: {
      src: desktopHeroImage || heroFallback.src,
      alt: desktopHeroAlt || heroFallback.alt,
      astroSrc: desktopHeroAstroSrc || heroFallback.astroSrc,
      width: input.desktopHero?.width || heroFallback.width,
      height: input.desktopHero?.height || heroFallback.height
    }
  };
}

export function buildRelatedStays(input: {
  stays: AccommodationPageRelatedStay[];
  imageMapping: HomepageImageMapping;
  baseHref: string;
}): AccommodationRelatedStayDisplayItem[] {
  return input.stays.map((stay) => ({
    name: stay.name,
    meta: stay.meta,
    href: resolveStayHref(input.baseHref, stay.href),
    image: (() => {
      if (stay.image.type === "mapping") {
        const mappedImage = input.imageMapping[stay.image.slot];

        return mappedImage && stay.image.alt
          ? {
              ...mappedImage,
              altText: stay.image.alt
            }
          : mappedImage;
      }

      const astroSrc = requireAccommodationDisplayAsset(stay.image.src, `related stay ${stay.href}`);

      return {
        sourceUrl: astroSrc.src,
        altText: stay.image.alt,
        astroSrc,
        width: astroSrc.width,
        height: astroSrc.height
      };
    })()
  }));
}

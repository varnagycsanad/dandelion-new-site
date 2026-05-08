import type { AccommodationPageRelatedStay, AccommodationPageReview } from "../data/accommodation-pages/types";
import type { ImageAsset, GalleryImage } from "../data/images/image-types";
import type { HomepageImageMapping } from "./homepage-image-mapping";

export interface AccommodationHeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AccommodationDisplayGalleryImage {
  id: number | string;
  src: string;
  thumb: string;
  alt: string;
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
        width?: number;
        height?: number;
      }
    | null;
}

export function resolveBaseHref(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

export function resolveRegistryImagePath(baseHref: string, imagePath: string): string {
  return imagePath.startsWith("/") ? `${baseHref}${imagePath.replace(/^\/+/, "")}` : imagePath;
}

function normalizeAccommodationGalleryPath(
  image: Pick<ImageAsset, "apartmentKey" | "source">,
  imagePath: string | undefined,
  folder: "gallery" | "thumbs",
  baseHref: string
): string {
  if (!imagePath) {
    return "";
  }

  if (/^(?:https?:)?\/\//.test(imagePath)) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return resolveRegistryImagePath(baseHref, imagePath);
  }

  if (!image.apartmentKey) {
    return imagePath;
  }

  return resolveRegistryImagePath(
    baseHref,
    `/images/accommodations/${image.apartmentKey}/${folder}/${imagePath}`
  );
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
      logoSrc: `${input.baseHref}images/brand/google-logo-compact.png`,
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
}): AccommodationDisplayGalleryImage[] {
  return input.gallery
    .slice()
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((image) => ({
      id: typeof image.source.wpId === "number" ? image.source.wpId : image.sortOrder,
      src: normalizeAccommodationGalleryPath(image, image.src, "gallery", input.baseHref),
      thumb: normalizeAccommodationGalleryPath(image, image.thumb, "thumbs", input.baseHref),
      alt: image.alt.hu,
      width: image.width,
      height: image.height,
      title: image.title.hu,
      caption: image.caption.hu,
      sortOrder: image.sortOrder
    }));
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
  baseHref: string;
}): {
  mobileHeroImage: string;
  desktopHeroImage: string;
  desktopHeroAlt: string;
  localHeroFallback: AccommodationHeroImage;
  heroFallback: AccommodationHeroImage;
  initialHeroImage: AccommodationHeroImage;
} {
  const mobileHeroImage = resolveRegistryImagePath(input.baseHref, input.mobileImagePath);
  const desktopHeroImage = input.desktopHero?.src
    ? resolveRegistryImagePath(input.baseHref, input.desktopHero.src)
    : "";
  const desktopHeroAlt = input.desktopHero?.alt.hu || input.fallbackAlt;
  const mobileHeroWidth = input.mobileHero?.width || 1200;
  const mobileHeroHeight = input.mobileHero?.height || 1600;
  const localHeroFallback = {
    src: mobileHeroImage,
    alt: input.fallbackAlt,
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
    image:
      stay.image.type === "mapping"
        ? input.imageMapping[stay.image.slot]
        : {
            sourceUrl: resolveRegistryImagePath(input.baseHref, stay.image.src),
            altText: stay.image.alt
          }
  }));
}

import type { HomepageImageSlotKey } from "../homepage-image-slots";

export type AccommodationReviewSource = "Google" | "Booking.com";

export interface AccommodationPageReview {
  source: AccommodationReviewSource;
  quote: string;
  meta: string;
}

export interface AccommodationPageFactGroup {
  title: string;
  items: [string, string][];
}

export interface AccommodationPageFeatureHighlight {
  label: string;
  icon: string;
}

export interface AccommodationPageIconCard {
  iconKey: string;
  title: string;
  text?: string;
}

export interface AccommodationPageFeaturedExperience {
  title: string;
  label?: string;
  text?: string;
  note?: string;
  iconKey?: string;
  imageKey?: string;
}

export interface AccommodationPageLocationBenefit {
  label: string;
  icon: string;
}

export interface AccommodationPagePoolHighlight {
  enabled: boolean;
  label: string;
  text?: string;
  href: string;
  ctaLabel?: string;
  variant?: "default" | "strong";
}

export type AccommodationPageRelatedStayImage =
  | {
      type: "mapping";
      slot: HomepageImageSlotKey;
    }
  | {
      type: "direct";
      src: string;
      alt: string;
    };

export interface AccommodationPageRelatedStay {
  name: string;
  meta: string;
  href: string;
  image: AccommodationPageRelatedStayImage;
}

export interface AccommodationPageData {
  seo: {
    title: string;
    description: string;
  };
  bookingLink: string;
  // [CHANGE 2026-05-16 12:45] Opcionális supporting link mezők a shared szállásoldali hero és details blokkokhoz.
  hero: {
    mobileImagePath: string;
    fallbackAlt: string;
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    lead: string;
    supportingLink?: {
      label: string;
      href: string;
    };
    poolHighlight?: AccommodationPagePoolHighlight;
    video?: {
      desktop: string;
      mobile: string;
    };
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  reviews: {
    kicker: string;
    title: string;
    intro: string;
    mobileSummaryLabel: string;
    mobileHighlightedAriaLabel: string;
    mobileMoreGoogleAriaLabel: string;
    mobileBookingAriaLabel: string;
    items: AccommodationPageReview[];
  };
  intro: {
    kicker: string;
    title: string;
    lead: string;
  };
  details: {
    kicker: string;
    title: string;
    shortDescription: string;
    supportingLink?: {
      label: string;
      href: string;
    };
    longDescription: string[];
    moreLabel: string;
    ctaLabel: string;
  };
  facts: {
    groups: AccommodationPageFactGroup[];
  };
  features: {
    title: string;
    highlights: AccommodationPageFeatureHighlight[];
  };
  decisionPanel?: {
    overviewTitle?: string;
    overviewFacts?: AccommodationPageIconCard[];
    featuredExperience?: AccommodationPageFeaturedExperience;
    reasonsTitle?: string;
    reasons?: AccommodationPageIconCard[];
  };
  amenities?: AccommodationPageIconCard[];
  gallery: {
    kicker: string;
    title: string;
    moreHint: string;
    defaultHint: string;
    emptyMessage: string;
    previewCount: number;
  };
  map: {
    kicker: string;
    title: string;
    body: string;
    benefitsAriaLabel: string;
    benefits: AccommodationPageLocationBenefit[];
    embedSrc: string;
    embedTitle: string;
  };
  lightbox: {
    galleryAriaLabel: string;
    closeAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
  };
  labels: {
    googleLogoAlt: string;
    bookingLogoAlt: string;
    galleryOpenAriaLabel: string;
    galleryHoverLabel: string;
  };
  relatedStays: {
    kicker: string;
    title: string;
    intro: string;
    items: AccommodationPageRelatedStay[];
  };
}

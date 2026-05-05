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
  hero: {
    mobileImagePath: string;
    fallbackAlt: string;
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    lead: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  reviews: {
    kicker: string;
    title: string;
    intro: string;
    mobileSummaryLabel: string;
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
    embedSrc: string;
    embedTitle: string;
  };
  relatedStays: {
    kicker: string;
    title: string;
    intro: string;
    items: AccommodationPageRelatedStay[];
  };
}

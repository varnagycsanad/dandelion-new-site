import type { Accommodation } from "../accommodations";
import type { AccommodationPageData } from "../accommodation-pages/types";
import type { AccommodationImageSet, GalleryImage, ImageAsset } from "../images/image-types";

export type AutumnCampaignOfferId =
  | "fugehaz_oszi_kettesben_2026"
  | "d2_oszi_csaladi_pihenes_2026";

export type AutumnCampaignPropertyKey = "fugehaz" | "d2";

export type AutumnCampaignAudience = "pair" | "family";

export type AutumnCampaignClaimStatus =
  | "approved_business_decision"
  | "seasonal"
  | "qa_required";

export type AutumnCampaignFeatureIconKey =
  | "pool"
  | "fireplace"
  | "wine"
  | "firepit"
  | "bike"
  | "romance"
  | "family"
  | "grill"
  | "wifi"
  | "parking";

export interface AutumnCampaignOfferMedia {
  heroDesktop: ImageAsset | null;
  heroMobile: ImageAsset | null;
  card: ImageAsset | null;
  galleryPreview: GalleryImage[];
}

export interface AutumnCampaignRenderableMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AutumnCampaignVideoAsset {
  src: string;
  type: "video/mp4";
  width: number;
  height: number;
}

export interface AutumnCampaignHeroVideo {
  kind: "video";
  desktop: AutumnCampaignVideoAsset;
  mobile?: AutumnCampaignVideoAsset;
  poster: AutumnCampaignRenderableMedia;
  posterMobile?: AutumnCampaignRenderableMedia;
}

export interface AutumnCampaignResponsiveMedia {
  desktop: AutumnCampaignRenderableMedia;
  mobile?: AutumnCampaignRenderableMedia;
}

export interface AutumnCampaignTheme {
  accent: string;
  accentSoft: string;
  accentStrong: string;
  badgeBackground: string;
  badgeText: string;
  cardTint: string;
  directSurface: string;
}

export interface AutumnCampaignOfferSectionIntro {
  eyebrow: string;
  title: string;
  lead: string;
}

export interface AutumnCampaignOfferListSection {
  title: string;
  items: string[];
  note?: string;
}

export interface AutumnCampaignOfferProgramGroup {
  title: string;
  items: string[];
}

export interface AutumnCampaignOfferClaim {
  text: string;
  status: AutumnCampaignClaimStatus;
  note?: string;
}

export interface AutumnCampaignHeroBlock {
  kicker: string;
  titleLines: string[];
  supportLine?: string;
  descriptionLines: string[];
  ctaNote: string;
  media: AutumnCampaignResponsiveMedia;
  video?: AutumnCampaignHeroVideo;
}

export interface AutumnCampaignFeatureItem {
  icon: AutumnCampaignFeatureIconKey;
  title: string;
  details: string[];
  note?: string;
}

export interface AutumnCampaignStoryTile {
  titleLines: string[];
  media: AutumnCampaignResponsiveMedia;
}

export interface AutumnCampaignProgramCard {
  title: string;
  href: string;
  description: string;
  media: AutumnCampaignResponsiveMedia;
}

export interface AutumnCampaignProgramsSection {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: AutumnCampaignProgramCard[];
}

export interface AutumnCampaignOfferDirectBookingBlock {
  eyebrow: string;
  title: string;
  primaryMessage: string;
  claims: AutumnCampaignOfferClaim[];
  qaFollowUp: string;
  titleLines: string[];
  highlightValue: string;
  highlightLines: string[];
  benefits: string[];
  media?: AutumnCampaignResponsiveMedia;
}

export interface AutumnCampaignOfferPracticalAmenities {
  eyebrow: string;
  title: string;
  items: string[];
  supportLabel?: string;
  supportItems?: string[];
}

export interface AutumnCampaignOfferCtas {
  primary: string;
  secondary: string;
  homeCard: string;
}

export interface AutumnCampaignOfferHomepageCard {
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
}

export interface AutumnCampaignOfferSourceRefs {
  accommodation: Accommodation;
  pageData: AccommodationPageData;
  imageSet: AccommodationImageSet;
}

export interface AutumnCampaignOfferTracking {
  offerId: AutumnCampaignOfferId;
  property: AutumnCampaignPropertyKey;
  audience: AutumnCampaignAudience;
  campaign: "autumn_2026";
}

export interface AutumnCampaignOffer {
  id: AutumnCampaignOfferId;
  slug: string;
  propertyKey: AutumnCampaignPropertyKey;
  audience: AutumnCampaignAudience;
  status: "ready_for_template";
  routePath: string;
  fallbackAccommodationPath: string;
  bookingUrl: string;
  seo: {
    title: string;
    description: string;
  };
  sourceRefs: AutumnCampaignOfferSourceRefs;
  media: AutumnCampaignOfferMedia;
  theme: AutumnCampaignTheme;
  mediaReplacementLabel: string;
  hero: AutumnCampaignOfferSectionIntro;
  positioning: AutumnCampaignOfferSectionIntro;
  services: AutumnCampaignOfferListSection;
  communication: AutumnCampaignOfferListSection;
  babyAmenities: AutumnCampaignOfferListSection;
  programs: AutumnCampaignOfferProgramGroup[];
  directBooking: AutumnCampaignOfferDirectBookingBlock;
  campaignHero: AutumnCampaignHeroBlock;
  experienceItems: AutumnCampaignFeatureItem[];
  storyTiles: AutumnCampaignStoryTile[];
  programsSection: AutumnCampaignProgramsSection;
  practicalAmenities: AutumnCampaignOfferPracticalAmenities;
  ctas: AutumnCampaignOfferCtas;
  homepageCard: AutumnCampaignOfferHomepageCard;
  tracking: AutumnCampaignOfferTracking;
}

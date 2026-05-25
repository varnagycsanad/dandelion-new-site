import type { HomepageImageSlotKey } from "../homepage-image-slots";
import type { AccommodationPageData } from "./types";

type CzechAccommodationProfile = {
  title: string;
  titleAccent: string;
  route: string;
  location: string;
  region: string;
  guests: string;
  character: string;
  shortDescription: string;
  lead: string;
  longDescription: string[];
  facts: [string, string][];
  experienceFacts: [string, string][];
  highlights: string[];
  reasons: { title: string; text: string; iconKey: string }[];
  amenities: string[];
  mapBody: string;
  mapBenefits: { label: string; icon: string }[];
};

const defaultReviews = [
  {
    source: "Google" as const,
    quote: "Velmi prijemne a klidne misto, jednoducha domluva a pratelsti hostitele.",
    meta: "Host - Google - 5/5"
  },
  {
    source: "Google" as const,
    quote: "Dum byl cisty, dobre vybaveny a idealni pro nekolik odpocinkovych dni u Balatonu.",
    meta: "Host - Google - 5/5"
  },
  {
    source: "Booking.com" as const,
    quote: "Rychla komunikace, hezke okoli a ubytovani, kde se da opravdu vypnout.",
    meta: "Host - Booking.com - 9/10"
  }
];

const relatedStays = [
  { name: "Dandelion D1", meta: "6-8 hostu - zahrada - rodinny cas", href: "/cs/dandelion-d1/", slot: "d1_card_image" as const },
  { name: "Dandelion D2", meta: "4-6 hostu - terasa - Panorama Pool", href: "/cs/dandelion-d2/", slot: "d2_card_image" as const },
  { name: "Dandelion Fugehaz", meta: "4-6 hostu - panorama - klidna poloha", href: "/cs/dandelion-fugehaz/", slot: "fugehaz_card_image" as const },
  { name: "Dandelion Zsalya", meta: "2-4 hoste - terasa - priroda", href: "/cs/dandelion-zsalya/", slot: "zsalya_card_image" as const },
  { name: "Dandelion Szololiget", meta: "2-4 hoste - vinice - vyhled", href: "/cs/szololiget/", slot: "szololiget_card_image" as const },
  { name: "Dandelion Szepvolgyi", meta: "az 8 hostu - panorama Balatonu", href: "/cs/szepvolgyi/", slot: "szepvolgyi_card_image" as const },
  { name: "Dandelion Royal Homes", meta: "Keszthely - apartman - Balaton", href: "/cs/royal/", slot: "royal_homes_card_image" as const },
  { name: "Dandelion Vintage", meta: "Nemesgulacs - dvur - klidne dny", href: "/cs/dandelion-vintage/", slot: "vintage_card_image" as const },
  { name: "Dandelion Koveskal", meta: "oblast Kali - vesnicka atmosféra", href: "/cs/dandelion-koveskal/", slot: "koveskal_card_image" as const }
];

export function createCzechAccommodationPage(
  baseData: AccommodationPageData,
  profile: CzechAccommodationProfile
): AccommodationPageData {
  return {
    seo: {
      title: `${profile.title} | Dandelion ubytovani u Balatonu`,
      description: profile.shortDescription
    },
    bookingLink: "/cs/kontakt/",
    hero: {
      mobileImagePath: baseData.hero.mobileImagePath,
      fallbackAlt: `${profile.title} ubytovani v oblasti ${profile.location}`,
      kicker: profile.region,
      title: profile.title,
      titleAccent: profile.titleAccent,
      subtitle: profile.character,
      lead: profile.lead,
      supportingLink: {
        label: "Zpet na prehled ubytovani",
        href: "/cs/ubytovani/"
      },
      poolHighlight: baseData.hero.poolHighlight
        ? {
            enabled: true,
            label: "Spolecny Panorama Pool",
            text: "U D1, D2 a Fugehaz je spolecny Panorama Pool soucasti pobytu.",
            href: "/cs/ubytovani/",
            ctaLabel: "Porovnat ubytovani",
            variant: "strong"
          }
        : undefined,
      primaryCtaLabel: "Poslat dotaz",
      secondaryCtaLabel: "Zobrazit fotografie"
    },
    reviews: {
      kicker: "Hodnoceni hostu",
      title: "Co rikaji hoste",
      intro: "Zpetna vazba z Google a Booking.com",
      mobileSummaryLabel: "Dalsi hodnoceni",
      mobileHighlightedAriaLabel: "Vybrane hodnoceni Google",
      mobileMoreGoogleAriaLabel: "Dalsi hodnoceni Google",
      mobileBookingAriaLabel: "Hodnoceni Booking.com",
      items: defaultReviews
    },
    intro: {
      kicker: profile.character,
      title: profile.shortDescription,
      lead: profile.lead
    },
    details: {
      kicker: profile.title,
      title: `${profile.title} v oblasti ${profile.location}`,
      shortDescription: profile.shortDescription,
      supportingLink: {
        label: "Zpet na cesky prehled ubytovani.",
        href: "/cs/ubytovani/"
      },
      longDescription: profile.longDescription,
      moreLabel: `Vice o ${profile.title}`,
      ctaLabel: "Zeptat se na dostupnost"
    },
    facts: {
      groups: [
        { title: "Dulezite detaily", items: profile.facts },
        { title: "Zazitky v okoli", items: profile.experienceFacts }
      ]
    },
    features: {
      title: "Vybaveni",
      highlights: profile.highlights.map((label) => ({ label, icon: "home" }))
    },
    decisionPanel: {
      overviewTitle: "Rychly prehled",
      overviewFacts: [
        { iconKey: "guests", title: profile.guests, text: "Kapacita" },
        ...profile.facts.slice(1, 5).map(([title, text]) => ({ iconKey: "home", title, text }))
      ],
      featuredExperience: {
        label: "Charakter pobytu",
        title: profile.character,
        text: profile.shortDescription,
        iconKey: "leaf"
      },
      reasonsTitle: "Proc se vam tu bude libit",
      reasons: profile.reasons
    },
    amenities: profile.amenities.map((title) => ({ iconKey: "home", title })),
    gallery: {
      kicker: "Galerie",
      title: `Nahled do ${profile.title}`,
      moreHint: "Kliknutim na fotografii otevreme dalsi snimky",
      defaultHint: "Fotografie v galerii lze otevrit",
      emptyMessage: `Galerie ${profile.title} momentalne nema dostupne fotografie.`,
      previewCount: baseData.gallery.previewCount
    },
    map: {
      kicker: profile.region,
      title: `Okoli ${profile.title}`,
      body: profile.mapBody,
      benefitsAriaLabel: "Vyhody polohy",
      benefits: profile.mapBenefits,
      embedSrc: baseData.map.embedSrc,
      embedTitle: `Mapa okoli ${profile.title}`
    },
    lightbox: {
      galleryAriaLabel: `${profile.title} galerie`,
      closeAriaLabel: "Zavrit galerii",
      previousAriaLabel: "Predchozi fotografie",
      nextAriaLabel: "Dalsi fotografie"
    },
    labels: {
      googleLogoAlt: "Hodnoceni Google",
      bookingLogoAlt: "Hodnoceni Booking.com",
      galleryOpenAriaLabel: "Otevrit fotografii v galerii",
      galleryHoverLabel: "Zobrazit fotografii"
    },
    relatedStays: {
      kicker: "Dalsi ubytovani",
      title: "Dalsi Dandelion ubytovani",
      intro: "Porovnejte dalsi domy a oblasti kolem Balatonu.",
      items: relatedStays
        .filter((stay) => stay.href !== profile.route)
        .slice(0, 5)
        .map((stay) => ({
          name: stay.name,
          meta: stay.meta,
          href: stay.href,
          image: {
            type: "mapping" as const,
            slot: stay.slot as HomepageImageSlotKey,
            alt: `${stay.name} ubytovani Dandelion`
          }
        }))
    }
  };
}

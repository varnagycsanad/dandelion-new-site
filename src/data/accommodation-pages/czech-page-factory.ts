import type { HomepageImageSlotKey } from "../homepage-image-slots";
import type { AccommodationPageData, AccommodationPageGeoDecision } from "./types";

const englishSharedBookingLink = "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendégházak?p=3970b30e1042d58f&lang=En";
const resolveCzechBookingLink = (baseData: AccommodationPageData) =>
  baseData.bookingLink.includes("ibe.sabeeapp.com") ? baseData.bookingLink : englishSharedBookingLink;

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
  geoDecision?: AccommodationPageGeoDecision;
  mapBody: string;
  mapBenefits: { label: string; icon: string }[];
};

function buildCzechSeoTitle(profile: CzechAccommodationProfile) {
  const stayName = `${profile.title} ${profile.titleAccent}`.replace(/\s+/g, " ").trim();
  const primaryLocation = profile.location.split("/")[0]?.trim() || profile.location;
  const locationPhrase = primaryLocation.includes("Szent György-hegy")
    ? `u ${primaryLocation}`
    : `v ${primaryLocation}`;
  return `${stayName} ${locationPhrase} | Dandelion ubytování`;
}

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
    quote: "Rychlá komunikace, hezké okolí a ubytování, kde se dá opravdu vypnout.",
    meta: "Host - Booking.com - 9/10"
  }
];

const relatedStays = [
  { name: "Dandelion D1", meta: "6-8 hostů - zahrada - rodinný čas", href: "/cs/dandelion-d1/", slot: "d1_card_image" as const },
  { name: "Dandelion D2", meta: "4-6 hostů - terasa - Panorama Pool", href: "/cs/dandelion-d2/", slot: "d2_card_image" as const },
  { name: "Dandelion Fügeház", meta: "4-6 hostů - panorama - klidná poloha", href: "/cs/dandelion-fugehaz/", slot: "fugehaz_card_image" as const },
  { name: "Dandelion Zsálya", meta: "2-4 hosté - terasa - příroda", href: "/cs/dandelion-zsalya/", slot: "zsalya_card_image" as const },
  { name: "Dandelion Szőlőliget", meta: "2-4 hosté - vinice - výhled", href: "/cs/szololiget/", slot: "szololiget_card_image" as const },
  { name: "Dandelion Szépvölgyi", meta: "až 8 hostů - panorama Balatonu", href: "/cs/szepvolgyi/", slot: "szepvolgyi_card_image" as const },
  { name: "Dandelion Royal Homes", meta: "Keszthely - apartman - Balaton", href: "/cs/royal/", slot: "royal_homes_card_image" as const },
  { name: "Dandelion Vintage", meta: "Nemesgulacs - dvur - klidne dny", href: "/cs/dandelion-vintage/", slot: "vintage_card_image" as const },
  { name: "Dandelion Köveskál", meta: "oblast Káli - vesnická atmosféra", href: "/cs/dandelion-koveskal/", slot: "koveskal_card_image" as const }
];

export function createCzechAccommodationPage(
  baseData: AccommodationPageData,
  profile: CzechAccommodationProfile
): AccommodationPageData {
  return {
    seo: {
      title: buildCzechSeoTitle(profile),
      description: profile.shortDescription
    },
    bookingLink: resolveCzechBookingLink(baseData),
    hero: {
      mobileImagePath: baseData.hero.mobileImagePath,
      fallbackAlt: `${profile.title} ubytování v oblasti ${profile.location}`,
      kicker: profile.region,
      title: profile.title,
      titleAccent: profile.titleAccent,
      subtitle: profile.character,
      lead: profile.lead,
      supportingLink: {
        label: "Zpět na přehled ubytování",
        href: "/cs/ubytovani/"
      },
      poolHighlight: baseData.hero.poolHighlight
        ? {
            enabled: true,
            label: "Spolecny Panorama Pool",
            text: "U D1, D2 a Fügeház je společný Panorama Pool součástí pobytu.",
            href: "/cs/panorama-pool/",
            ctaLabel: "Zobrazit Panorama Pool",
            variant: "strong"
          }
        : undefined,
      primaryCtaLabel: "Ověřit dostupnost",
      secondaryCtaLabel: "Zobrazit fotografie"
    },
    reviews: {
      kicker: "Hodnocení hostů",
      title: "Co říkají hosté",
      intro: "Zpětná vazba z Google a Booking.com",
      mobileSummaryLabel: "Další hodnocení",
      mobileHighlightedAriaLabel: "Vybrané hodnocení Google",
      mobileMoreGoogleAriaLabel: "Další hodnocení Google",
      mobileBookingAriaLabel: "Hodnocení Booking.com",
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
        label: "Zpět na český přehled ubytování.",
        href: "/cs/ubytovani/"
      },
      longDescription: profile.longDescription,
      moreLabel: `Více o ${profile.title}`,
      ctaLabel: "Ověřit dostupnost"
    },
    facts: {
      groups: [
        { title: "Důležité detaily", items: profile.facts },
        { title: "Zážitky v okolí", items: profile.experienceFacts }
      ]
    },
    features: {
      title: "Vybavení",
      highlights: profile.highlights.map((label) => ({ label, icon: "home" }))
    },
    decisionPanel: {
      overviewTitle: "Rychlý přehled",
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
      reasonsTitle: "Proč se vám tu bude líbit",
      reasons: profile.reasons
    },
    geoDecision: profile.geoDecision,
    amenities: profile.amenities.map((title) => ({ iconKey: "home", title })),
    gallery: {
      kicker: "Galerie",
      title: `Náhled do ${profile.title}`,
      moreHint: "Kliknutím na fotografii otevřeme další snímky",
      defaultHint: "Fotografie v galerii lze otevrit",
      emptyMessage: `Galerie ${profile.title} momentálně nemá dostupné fotografie.`,
      previewCount: baseData.gallery.previewCount
    },
    map: {
      kicker: profile.region,
      title: `Okolí ${profile.title}`,
      body: profile.mapBody,
      benefitsAriaLabel: "Výhody polohy",
      benefits: profile.mapBenefits,
      embedSrc: baseData.map.embedSrc,
      embedTitle: `Mapa okolí ${profile.title}`
    },
    lightbox: {
      galleryAriaLabel: `${profile.title} galerie`,
      closeAriaLabel: "Zavřít galerii",
      previousAriaLabel: "Předchozí fotografie",
      nextAriaLabel: "Další fotografie"
    },
    labels: {
      googleLogoAlt: "Hodnocení Google",
      bookingLogoAlt: "Hodnocení Booking.com",
      galleryOpenAriaLabel: "Otevřít fotografii v galerii",
      galleryHoverLabel: "Zobrazit fotografii"
    },
    relatedStays: {
      kicker: "Další ubytování",
      title: "Další Dandelion ubytování",
      intro: "Porovnejte další domy a oblasti kolem Balatonu.",
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
            alt: `${stay.name} ubytování Dandelion`
          }
        }))
    }
  };
}

import type { HomepageImageSlotKey } from "../homepage-image-slots";
import type { AccommodationPageData, AccommodationPageGeoDecision } from "./types";

const englishSharedBookingLink = "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendégházak?p=3970b30e1042d58f&lang=En";
const resolveSlovakBookingLink = (baseData: AccommodationPageData) =>
  baseData.bookingLink.includes("ibe.sabeeapp.com") ? englishSharedBookingLink : englishSharedBookingLink;

type SlovakAccommodationProfile = {
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

function buildSlovakSeoTitle(profile: SlovakAccommodationProfile) {
  const stayName = `${profile.title} ${profile.titleAccent}`.replace(/\s+/g, " ").trim();
  return `${stayName} - ${profile.location} | Dandelion ubytovanie`;
}

const defaultReviews = [
  {
    source: "Google" as const,
    quote: "Veľmi príjemné a pokojné miesto, jednoduchá komunikácia a milí hostitelia.",
    meta: "Hosť - Google - 5/5"
  },
  {
    source: "Google" as const,
    quote: "Dom bol čistý, dobre vybavený a ideálny na niekoľko oddychových dní pri Balatone.",
    meta: "Hosť - Google - 5/5"
  },
  {
    source: "Booking.com" as const,
    quote: "Rýchla komunikácia, pekné okolie a ubytovanie, kde sa dá naozaj vypnúť.",
    meta: "Hosť - Booking.com - 9/10"
  }
];

const relatedStays = [
  { name: "Dandelion D1", meta: "6-8 hostí - záhrada - rodinný čas", href: "/sk/dandelion-d1/", slot: "d1_card_image" as const },
  { name: "Dandelion D2", meta: "4-6 hostí - terasa - Panorama Pool", href: "/sk/dandelion-d2/", slot: "d2_card_image" as const },
  { name: "Dandelion Fügeház", meta: "4-6 hostí - panoráma - pokojná poloha", href: "/sk/dandelion-fugehaz/", slot: "fugehaz_card_image" as const },
  { name: "Dandelion Zsálya", meta: "4 hostia - terasa - príroda", href: "/sk/dandelion-zsalya/", slot: "zsalya_card_image" as const },
  { name: "Dandelion Szőlőliget", meta: "4 hostia + prístelka - vinice - výhľad", href: "/sk/szololiget/", slot: "szololiget_card_image" as const },
  { name: "Dandelion Szépvölgyi", meta: "až 8 hostí - panoráma Balatonu", href: "/sk/szepvolgyi/", slot: "szepvolgyi_card_image" as const },
  { name: "Dandelion Royal Homes", meta: "Keszthely - apartmán - Balaton", href: "/sk/royal/", slot: "royal_homes_card_image" as const },
  { name: "Dandelion Vintage", meta: "Nemesgulács - dvor - pokojné dni", href: "/sk/dandelion-vintage/", slot: "vintage_card_image" as const },
  { name: "Dandelion Köveskál", meta: "oblasť Káli - dedinská atmosféra", href: "/sk/dandelion-koveskal/", slot: "koveskal_card_image" as const }
];

const relatedStayImageAltBySlot: Record<HomepageImageSlotKey, string> = {
  d1_card_image: "Dandelion D1 ubytovanie so záhradou v Kisapáti",
  d2_card_image: "Dandelion D2 ubytovanie s terasou a záhradou v Kisapáti",
  fugehaz_card_image: "Dandelion Fügeház ubytovanie s terasou v Balatonskej vrchovine",
  zsalya_card_image: "Dandelion Zsálya ubytovanie s krytou terasou",
  szololiget_card_image: "Dandelion Szőlőliget ubytovanie medzi vinicami",
  szepvolgyi_card_image: "Dandelion Szépvölgyi ubytovanie so záhradou",
  royal_homes_card_image: "Dandelion Royal Homes apartmánový dom v Keszthely",
  vintage_card_image: "Dandelion Vintage ubytovanie s pokojným dvorom",
  koveskal_card_image: "Dandelion Köveskál ubytovanie v oblasti Káli"
};

export function createSlovakAccommodationPage(
  baseData: AccommodationPageData,
  profile: SlovakAccommodationProfile
): AccommodationPageData {
  return {
    seo: {
      title: buildSlovakSeoTitle(profile),
      description: profile.shortDescription
    },
    bookingLink: resolveSlovakBookingLink(baseData),
    hero: {
      mobileImagePath: baseData.hero.mobileImagePath,
      fallbackAlt: `${profile.title} ubytovanie v oblasti ${profile.location}`,
      kicker: profile.region,
      title: profile.title,
      titleAccent: profile.titleAccent,
      subtitle: profile.character,
      lead: profile.lead,
      supportingLink: {
        label: "Späť na prehľad ubytovania",
        href: "/sk/ubytovanie/"
      },
      poolHighlight: baseData.hero.poolHighlight
        ? {
            enabled: true,
            label: "Panorama Pool",
            text: "Pri pobytoch D1, D2 a Fügeház je Panorama Pool súčasťou letnej ponuky.",
            href: "/sk/panorama-pool/",
            ctaLabel: "Zobraziť Panorama Pool",
            variant: "strong"
          }
        : undefined,
      primaryCtaLabel: "Overiť dostupnosť",
      secondaryCtaLabel: "Zobraziť fotografie"
    },
    reviews: {
      kicker: "Hodnotenia hostí",
      title: "Čo hovoria hostia",
      intro: "Spätná väzba z Google a Booking.com",
      mobileSummaryLabel: "Ďalšie hodnotenia",
      mobileHighlightedAriaLabel: "Vybrané hodnotenie Google",
      mobileMoreGoogleAriaLabel: "Ďalšie hodnotenia Google",
      mobileBookingAriaLabel: "Hodnotenia Booking.com",
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
        label: "Späť na slovenský prehľad ubytovania.",
        href: "/sk/ubytovanie/"
      },
      longDescription: profile.longDescription,
      moreLabel: `Viac o ${profile.title}`,
      ctaLabel: "Overiť dostupnosť"
    },
    facts: {
      groups: [
        { title: "Dôležité detaily", items: profile.facts },
        { title: "Zážitky v okolí", items: profile.experienceFacts }
      ]
    },
    features: {
      title: "Vybavenie",
      highlights: profile.highlights.map((label) => ({ label, icon: "home" }))
    },
    decisionPanel: {
      overviewTitle: "Rýchly prehľad",
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
      reasonsTitle: "Prečo sa vám tu bude páčiť",
      reasons: profile.reasons
    },
    geoDecision: profile.geoDecision,
    amenities: profile.amenities.map((title) => ({ iconKey: "home", title })),
    gallery: {
      kicker: "Galéria",
      title: `Pohľad do ${profile.title}`,
      moreHint: "Kliknutím na fotografiu otvoríte ďalšie zábery",
      defaultHint: "Fotografie v galérii sa dajú otvoriť",
      emptyMessage: `Galéria ${profile.title} momentálne nemá dostupné fotografie.`,
      previewCount: baseData.gallery.previewCount
    },
    map: {
      kicker: profile.region,
      title: `Okolie ${profile.title}`,
      body: profile.mapBody,
      benefitsAriaLabel: "Výhody polohy",
      benefits: profile.mapBenefits,
      embedSrc: baseData.map.embedSrc,
      embedTitle: `Mapa okolia ${profile.title}`
    },
    lightbox: {
      galleryAriaLabel: `${profile.title} galéria`,
      closeAriaLabel: "Zavrieť galériu",
      previousAriaLabel: "Predchádzajúca fotografia",
      nextAriaLabel: "Ďalšia fotografia"
    },
    labels: {
      googleLogoAlt: "Hodnotenie Google",
      bookingLogoAlt: "Hodnotenie Booking.com",
      galleryOpenAriaLabel: "Otvoriť fotografiu v galérii",
      galleryHoverLabel: "Zobraziť fotografiu"
    },
    relatedStays: {
      kicker: "Ďalšie ubytovanie",
      title: "Ďalšie Dandelion ubytovanie",
      intro: "Porovnajte ďalšie domy a oblasti okolo Balatonu.",
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
            alt: relatedStayImageAltBySlot[stay.slot]
          }
        }))
    }
  };
}

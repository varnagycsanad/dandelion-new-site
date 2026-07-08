import type { HomepageImageSlotKey } from "../homepage-image-slots";
import type { AccommodationPageData, AccommodationPageGeoDecision } from "./types";

const englishSharedBookingLink = "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendégházak?p=3970b30e1042d58f&lang=En";
const resolveGermanBookingLink = (baseData: AccommodationPageData) =>
  baseData.bookingLink.includes("ibe.sabeeapp.com") ? baseData.bookingLink : englishSharedBookingLink;

type GermanAccommodationProfile = {
  title: string;
  titleAccent: string;
  route: string;
  listingAnchor: string;
  location: string;
  region: string;
  guests: string;
  character: string;
  shortDescription: string;
  detailTitle?: string;
  detailHighlights?: string[];
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
  relatedSlot: HomepageImageSlotKey;
};

function buildGermanSeoTitle(profile: GermanAccommodationProfile) {
  const stayName = `${profile.title} ${profile.titleAccent}`.replace(/\s+/g, " ").trim();
  const primaryLocation = profile.location.split("/")[0]?.trim() || profile.location;
  const locationPhrase = primaryLocation.includes("Szent György-hegy")
    ? `bei ${primaryLocation}`
    : `in ${primaryLocation}`;
  return `${stayName} ${locationPhrase} | Dandelion`;
}

const defaultReviews = [
  {
    source: "Google" as const,
    quote: "Ein sehr angenehmer, ruhiger Ort mit unkomplizierter Anreise und freundlichen Gastgebern.",
    meta: "Gast - Google - 5/5"
  },
  {
    source: "Google" as const,
    quote: "Das Haus war sauber, gut ausgestattet und ideal für ein paar entspannte Tage im Balaton-Oberland.",
    meta: "Gast - Google - 5/5"
  },
  {
    source: "Booking.com" as const,
    quote: "Schnelle Kommunikation, schöne Umgebung und eine Unterkunft, in der man gut abschalten kann.",
    meta: "Gast - Booking.com - 9/10"
  }
];

const relatedStays = [
  {
    name: "Dandelion D1",
    meta: "6-8 Gäste - Garten - Familienzeit",
    href: "/de/dandelion-d1/",
    slot: "d1_card_image" as const
  },
  {
    name: "Dandelion D2",
    meta: "4-6 Gäste - Terrasse - Panorama Pool",
    href: "/de/dandelion-d2/",
    slot: "d2_card_image" as const
  },
  {
    name: "Dandelion Fügeház",
    meta: "4-6 Gäste - Panorama - ruhige Lage",
    href: "/de/dandelion-fugehaz/",
    slot: "fugehaz_card_image" as const
  },
  {
    name: "Dandelion Zsálya",
    meta: "2-4 Gäste - Terrasse - naturnah",
    href: "/de/dandelion-zsalya/",
    slot: "zsalya_card_image" as const
  },
  {
    name: "Dandelion Szőlőliget",
    meta: "2-4 Gäste - Weinberge - Ausblick",
    href: "/de/szololiget/",
    slot: "szololiget_card_image" as const
  },
  {
    name: "Dandelion Szépvölgyi",
    meta: "bis 8 Gäste - Balaton-Panorama",
    href: "/de/szepvolgyi/",
    slot: "szepvolgyi_card_image" as const
  },
  {
    name: "Dandelion Royal Homes",
    meta: "Keszthely - Apartment - Balaton",
    href: "/de/royal/",
    slot: "royal_homes_card_image" as const
  },
  {
    name: "Dandelion Vintage",
    meta: "Nemesgulács - Hof - ruhige Tage",
    href: "/de/dandelion-vintage/",
    slot: "vintage_card_image" as const
  },
  {
    name: "Dandelion Köveskál",
    meta: "Káli-Becken - Dorfstimmung - Auszeit",
    href: "/de/dandelion-koveskal/",
    slot: "koveskal_card_image" as const
  }
];

const relatedStayImageAltBySlot: Record<HomepageImageSlotKey, string> = {
  d1_card_image: "Dandelion D1 Gästehaus mit Garten in Kisapáti",
  d2_card_image: "Dandelion D2 Gästehaus mit Terrasse und Garten in Kisapáti",
  fugehaz_card_image: "Dandelion Fügeház Gästehaus mit Terrasse im Balaton-Oberland",
  zsalya_card_image: "Dandelion Zsálya Gästehaus mit überdachter Terrasse",
  szololiget_card_image: "Dandelion Szőlőliget Gästehaus zwischen Weinbergen",
  szepvolgyi_card_image: "Dandelion Szépvölgyi Gästehaus mit Garten",
  royal_homes_card_image: "Dandelion Royal Homes Apartmenthaus in Keszthely",
  vintage_card_image: "Dandelion Vintage Gästehaus mit ruhigem Hof",
  koveskal_card_image: "Dandelion Köveskál Gästehaus im Káli-Becken"
};

export function createGermanAccommodationPage(
  baseData: AccommodationPageData,
  profile: GermanAccommodationProfile
): AccommodationPageData {
  return {
    seo: {
      title: buildGermanSeoTitle(profile),
      description: profile.shortDescription
    },
    bookingLink: resolveGermanBookingLink(baseData),
    hero: {
      mobileImagePath: baseData.hero.mobileImagePath,
      fallbackAlt: `${profile.title} Unterkunft in ${profile.location}`,
      kicker: profile.region,
      title: profile.title,
      titleAccent: profile.titleAccent,
      subtitle: profile.character,
      lead: profile.lead,
      supportingLink: {
        label: "Zur Unterkunftsübersicht",
        href: "/de/unterkuenfte/"
      },
      poolHighlight: baseData.hero.poolHighlight
        ? {
            enabled: true,
            label: "Panorama Pool",
            text: "Bei D1, D2 und Fügeház ist der Panorama Pool in der Saison Teil des Aufenthalts.",
            href: "/de/panorama-pool/",
            ctaLabel: "Panorama Pool ansehen",
            variant: "strong"
          }
        : undefined,
      primaryCtaLabel: "Verfügbarkeit prüfen",
      secondaryCtaLabel: "Fotos ansehen"
    },
    reviews: {
      kicker: "Gästebewertungen",
      title: "Was Gäste sagen",
      intro: "Rückmeldungen von Google und Booking.com",
      mobileSummaryLabel: "Weitere Bewertungen",
      mobileHighlightedAriaLabel: "Hervorgehobene Google-Bewertung",
      mobileMoreGoogleAriaLabel: "Weitere Google-Bewertungen",
      mobileBookingAriaLabel: "Booking.com Bewertungen",
      items: defaultReviews
    },
    intro: {
      kicker: profile.character,
      title: profile.shortDescription,
      lead: profile.lead
    },
    details: {
      kicker: profile.title,
      title: profile.detailTitle ?? `${profile.title} in ${profile.location}`,
      shortDescription: profile.shortDescription,
      highlights: profile.detailHighlights ?? profile.highlights.slice(0, 5),
      supportingLink: {
        label: "Zur deutschen Unterkunftsübersicht.",
        href: "/de/unterkuenfte/"
      },
      longDescription: profile.longDescription,
      moreLabel: `Mehr über ${profile.title}`,
      ctaLabel: "Verfügbarkeit prüfen"
    },
    facts: {
      groups: [
        {
          title: "Wichtige Details",
          items: profile.facts
        },
        {
          title: "Erlebnisse",
          items: profile.experienceFacts
        }
      ]
    },
    features: {
      title: "Ausstattung",
      highlights: profile.highlights.map((label) => ({ label, icon: "home" }))
    },
    decisionPanel: {
      overviewTitle: "Kurzüberblick",
      overviewFacts: [
        { iconKey: "guests", title: profile.guests, text: "Kapazität" },
        ...profile.facts.slice(1, 5).map(([title, text]) => ({ iconKey: "home", title, text }))
      ],
      featuredExperience: {
        label: "Besonderes Erlebnis",
        title: profile.character,
        text: profile.shortDescription,
        iconKey: "leaf"
      },
      reasonsTitle: "Warum Sie es lieben werden",
      reasons: profile.reasons
    },
    geoDecision: profile.geoDecision,
    amenities: profile.amenities.map((title) => ({ iconKey: "home", title })),
    gallery: {
      kicker: "Galerie",
      title: `Ein Blick in ${profile.title}`,
      moreHint: "Klicken Sie auf ein Foto für mehr Bilder",
      defaultHint: "Galeriebilder können geöffnet werden",
      emptyMessage: `Die Galerie von ${profile.title} hat derzeit keine verfügbaren Bilder.`,
      previewCount: baseData.gallery.previewCount
    },
    map: {
      kicker: profile.region,
      title: `Die Umgebung von ${profile.title}`,
      body: profile.mapBody,
      benefitsAriaLabel: "Vorteile der Lage",
      benefits: profile.mapBenefits,
      embedSrc: baseData.map.embedSrc,
      embedTitle: `Karte der Umgebung von ${profile.title}`
    },
    lightbox: {
      galleryAriaLabel: `${profile.title} Galerie`,
      closeAriaLabel: "Galerie schließen",
      previousAriaLabel: "Vorheriges Bild",
      nextAriaLabel: "Nächstes Bild"
    },
    labels: {
      googleLogoAlt: "Google Bewertung",
      bookingLogoAlt: "Booking.com Bewertung",
      galleryOpenAriaLabel: "Galeriebild öffnen",
      galleryHoverLabel: "Foto ansehen"
    },
    relatedStays: {
      kicker: "Weitere Unterkünfte",
      title: "Weitere Dandelion Unterkünfte",
      intro: "Vergleichen Sie weitere Häuser und Regionen rund um den Balaton.",
      items: relatedStays
        .filter((stay) => stay.href !== profile.route)
        .slice(0, 5)
        .map((stay) => ({
          name: stay.name,
          meta: stay.meta,
          href: stay.href,
          image: {
            type: "mapping" as const,
            slot: stay.slot,
            alt: relatedStayImageAltBySlot[stay.slot]
          }
        }))
    }
  };
}

import type { HomepageImageSlotKey } from "../homepage-image-slots";
import type { AccommodationPageData } from "./types";

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
  lead: string;
  longDescription: string[];
  facts: [string, string][];
  experienceFacts: [string, string][];
  highlights: string[];
  reasons: { title: string; text: string; iconKey: string }[];
  amenities: string[];
  mapBody: string;
  mapBenefits: { label: string; icon: string }[];
  relatedSlot: HomepageImageSlotKey;
};

const defaultReviews = [
  {
    source: "Google" as const,
    quote: "Ein sehr angenehmer, ruhiger Ort mit unkomplizierter Anreise und freundlichen Gastgebern.",
    meta: "Gast - Google - 5/5"
  },
  {
    source: "Google" as const,
    quote: "Das Haus war sauber, gut ausgestattet und ideal fuer ein paar entspannte Tage im Balaton-Oberland.",
    meta: "Gast - Google - 5/5"
  },
  {
    source: "Booking.com" as const,
    quote: "Schnelle Kommunikation, schoene Umgebung und eine Unterkunft, in der man gut abschalten kann.",
    meta: "Gast - Booking.com - 9/10"
  }
];

const relatedStays = [
  {
    name: "Dandelion D1",
    meta: "6-8 Gaeste - Garten - Familienzeit",
    href: "/de/dandelion-d1/",
    slot: "d1_card_image" as const
  },
  {
    name: "Dandelion D2",
    meta: "4-6 Gaeste - Terrasse - Panorama Pool",
    href: "/de/dandelion-d2/",
    slot: "d2_card_image" as const
  },
  {
    name: "Dandelion Fugehaz",
    meta: "4-6 Gaeste - Panorama - ruhige Lage",
    href: "/de/dandelion-fugehaz/",
    slot: "fugehaz_card_image" as const
  },
  {
    name: "Dandelion Zsalya",
    meta: "2-4 Gaeste - Terrasse - naturnah",
    href: "/de/dandelion-zsalya/",
    slot: "zsalya_card_image" as const
  },
  {
    name: "Dandelion Szololiget",
    meta: "2-4 Gaeste - Weinberge - Ausblick",
    href: "/de/szololiget/",
    slot: "szololiget_card_image" as const
  },
  {
    name: "Dandelion Szepvolgyi",
    meta: "bis 8 Gaeste - Balaton-Panorama",
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
    meta: "Nemesgulacs - Hof - ruhige Tage",
    href: "/de/dandelion-vintage/",
    slot: "vintage_card_image" as const
  },
  {
    name: "Dandelion Koveskal",
    meta: "Kali-Becken - Dorfstimmung - Auszeit",
    href: "/de/dandelion-koveskal/",
    slot: "koveskal_card_image" as const
  }
];

export function createGermanAccommodationPage(
  baseData: AccommodationPageData,
  profile: GermanAccommodationProfile
): AccommodationPageData {
  return {
    seo: {
      title: `${profile.title} | Dandelion Unterkuenfte am Balaton`,
      description: profile.shortDescription
    },
    bookingLink: "/de/kontakt/",
    hero: {
      mobileImagePath: baseData.hero.mobileImagePath,
      fallbackAlt: `${profile.title} Unterkunft in ${profile.location}`,
      kicker: profile.region,
      title: profile.title,
      titleAccent: profile.titleAccent,
      subtitle: profile.character,
      lead: profile.lead,
      supportingLink: {
        label: "Zur Unterkunftsuebersicht",
        href: "/de/unterkuenfte/"
      },
      poolHighlight: baseData.hero.poolHighlight
        ? {
            enabled: true,
            label: "Gemeinsamer Panorama Pool",
            text: "Bei D1, D2 und Fugehaz ist der gemeinsame Panorama Pool Teil des Aufenthalts.",
            href: "/de/unterkuenfte/",
            ctaLabel: "Unterkuenfte vergleichen",
            variant: "strong"
          }
        : undefined,
      primaryCtaLabel: "Anfrage senden",
      secondaryCtaLabel: "Fotos ansehen"
    },
    reviews: {
      kicker: "Gaestebewertungen",
      title: "Was Gaeste sagen",
      intro: "Rueckmeldungen von Google und Booking.com",
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
      title: `${profile.title} in ${profile.location}`,
      shortDescription: profile.shortDescription,
      supportingLink: {
        label: "Zur deutschen Unterkunftsuebersicht.",
        href: "/de/unterkuenfte/"
      },
      longDescription: profile.longDescription,
      moreLabel: `Mehr ueber ${profile.title}`,
      ctaLabel: "Verfuegbarkeit anfragen"
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
      overviewTitle: "Kurzueberblick",
      overviewFacts: [
        { iconKey: "guests", title: profile.guests, text: "Kapazitaet" },
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
    amenities: profile.amenities.map((title) => ({ iconKey: "home", title })),
    gallery: {
      kicker: "Galerie",
      title: `Ein Blick in ${profile.title}`,
      moreHint: "Klicken Sie auf ein Foto fuer mehr Bilder",
      defaultHint: "Galeriebilder koennen geoeffnet werden",
      emptyMessage: `Die Galerie von ${profile.title} hat derzeit keine verfuegbaren Bilder.`,
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
      closeAriaLabel: "Galerie schliessen",
      previousAriaLabel: "Vorheriges Bild",
      nextAriaLabel: "Naechstes Bild"
    },
    labels: {
      googleLogoAlt: "Google Bewertung",
      bookingLogoAlt: "Booking.com Bewertung",
      galleryOpenAriaLabel: "Galeriebild oeffnen",
      galleryHoverLabel: "Foto ansehen"
    },
    relatedStays: {
      kicker: "Weitere Unterkuenfte",
      title: "Weitere Dandelion Unterkuenfte",
      intro: "Vergleichen Sie weitere Haeuser und Regionen rund um den Balaton.",
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
            alt: `${stay.name} Dandelion Unterkunft`
          }
        }))
    }
  };
}

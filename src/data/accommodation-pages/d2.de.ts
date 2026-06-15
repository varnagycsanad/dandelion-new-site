import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

const d2PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d2GermanPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 bei Szent György-hegy | Familienfreundliches Ferienhaus",
    description:
      "Dandelion D2 ist eine ruhige, familienfreundliche Unterkunft im Balaton-Oberland mit Garten, Terrasse und Zugang zum Panorama Pool."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c64244f6153c3ca1&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-mobile-hero-video-poster-20260615.webp",
      "d2 German mobile hero"
    ),
    fallbackAlt: "Dandelion D2 überdachte Terrasse mit gelben Stühlen und großem Garten in Kisapáti",
    kicker: "Balaton-Oberland - Szent György-hegy",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "FAMILIENFREUNDLICHE UNTERKUNFT MIT GARTEN UND TERRASSE",
    lead: "Ein helles, ruhiges Ferienhaus nahe Szent György-hegy, mit großem Garten, überdachter Terrasse und guter Lage für Balaton-Tage.",
    poolHighlight: {
      enabled: true,
      label: "Panorama Pool in der Nähe von Dandelion D2",
      text: "Der Panorama Pool ist in der Saison für Gäste von D1, D2 und Fügeház verfügbar.",
      href: "/de/unterkuenfte/",
      ctaLabel: "Unterkünfte ansehen",
      variant: "strong"
    },
    video: {
      mobile: "/videos/accommodations/d2/dandelion-d2-mobile-hero-20260615.mp4?v=20260615",
      posterImagePath: requireAccommodationLocalAssetPath(
        "d2",
        "hero",
        "dandelion-d2-mobile-hero-video-poster-20260615.webp",
        "d2 German mobile hero video poster"
      ),
      uploadDate: "2026-06-15T00:00:00+02:00"
    },
    primaryCtaLabel: "Verfügbarkeit prüfen",
    secondaryCtaLabel: "Fotos ansehen"
  },
  reviews: {
    kicker: "Gästebewertungen",
    title: "Was Gäste sagen",
    intro: "Echte Rückmeldungen von Google und Booking.com",
    mobileSummaryLabel: "Weitere Bewertungen",
    mobileHighlightedAriaLabel: "Hervorgehobene Google-Bewertung",
    mobileMoreGoogleAriaLabel: "Weitere Google-Bewertungen",
    mobileBookingAriaLabel: "Booking.com Bewertungen",
    items: [
      {
        source: "Google",
        quote: "Idyllische Umgebung, freundliche Gastgeber, viel Platz für Kinder und eine ruhige, sehr angenehme Atmosphäre.",
        meta: "Vanessa L. - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Das Haus hat alles, was man braucht. Ich empfehle es gern für ein paar ruhige Tage zum Abschalten.",
        meta: "Ildiko Barna - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Ein schöner, gepflegter Ort mit ruhiger Umgebung und unkomplizierter Anreise. Besonders gut zum Entspannen.",
        meta: "Eszter K. - Google - 5/5"
      },
      {
        source: "Booking.com",
        quote: "Eine rundum positive Erfahrung, mit schnellen Antworten und sehr hilfsbereiten Gastgebern.",
        meta: "Bernadett - Booking.com - 10/10"
      },
      {
        source: "Booking.com",
        quote: "Perfekt für erholsame Tage: ein ruhiger Ort, freundliche Gastgeber und eine komfortable Unterkunft.",
        meta: "Angelika - Booking.com - 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Langsamer Rhythmus - großer Garten - überdachte Terrasse",
    title: "Terrasse, Garten und entspannte Räume für Familien",
    lead: "Dandelion D2 ist eine gute Wahl für Familien, die im Balaton-Oberland Garten, Terrasse und unkomplizierten Komfort suchen. Hügel, Strände und Weingüter sind von hier aus in kurzer Fahrt erreichbar."
  },
  details: {
    kicker: "Dandelion D2",
    title: "Familienfreundliche Unterkunft bei Szent György-hegy",
    shortDescription:
      "Ein ruhiger Ausgangspunkt mit hellen Innenräumen, großem Garten, Tieren rund um das Haus und dem Balaton in guter Reichweite.",
    supportingLink: {
      label: "Zur deutschen Unterkunftsübersicht.",
      href: "/de/unterkuenfte/"
    },
    longDescription: [
      "Der galerieartige Wohnraum gibt dem Haus einen offenen, unkomplizierten Rhythmus. Die renovierte Küche macht auch längere Aufenthalte angenehm. Der Morgen kann auf der Terrasse beginnen, tagsüber geht es in die Hügel oder an den Balaton, und abends wird es im Garten wieder ruhig.",
      "Die überdachte Terrasse und die Sitzplätze im Freien sind auch nützlich, wenn das Wetter wechselt. Der große Garten gibt Kindern und Erwachsenen Raum zum Spielen, Sitzen, Grillen oder einfach zum Ausruhen.",
      "Der Panorama Pool ist in der Saison für Gäste von D1, D2 und Fügeház verfügbar. Er ist kein privater Pool nur für D2, sondern Teil des nahe gelegenen Poolbereichs von D1, D2 und Fügeház ab 15. Juni 2026.",
      "Rund um das Haus gibt es Tiere, was viele Kinder als kleines Landerlebnis erleben. Das gibt dem Aufenthalt eine warme, dorfliche Stimmung, ohne den Komfort des Hauses zu schmälern.",
      "Der Balaton, die Wanderwege des Szent György-hegy und die Weingüter der Umgebung sind mit kurzer Fahrt erreichbar. Dandelion D2 eignet sich deshalb gut als Ausgangspunkt für unterschiedliche Tage im Balaton-Oberland."
    ],
    moreLabel: "Mehr über Dandelion D2",
    ctaLabel: "Verfügbarkeit prüfen"
  },
  facts: {
    groups: [
      {
        title: "Wichtige Details",
        items: [
          ["Gäste", "4-6 Gäste"],
          ["Außenbereich", "überdachte Terrasse und Sitzplätze im Garten"],
          ["Garten", "großer, gut nutzbarer Garten"],
          ["Küche", "2026 renoviert und gut ausgestattet"]
        ]
      },
      {
        title: "Erlebnisse",
        items: [
          ["Panorama Pool", "für D1, D2 und Fügeház Gäste ab 15. Juni 2026"],
          ["Draußen kochen", "Grillmöglichkeit im Garten"],
          ["Für Kinder", "Tiere und großer Garten rund um das Haus"],
          ["In der Nähe", "Balaton, Wanderwege und Weingüter"]
        ]
      }
    ]
  },
  features: {
    title: "Ausstattung",
    highlights: [
      { label: "Küche 2026 renoviert", icon: "utensils" },
      { label: "Galerieartiger Wohnraum", icon: "home" },
      { label: "Zugang zum Panorama Pool", icon: "pool" },
      { label: "überdachte Terrasse und Gartenbereich", icon: "leaf" },
      { label: "Grillmöglichkeit im Freien", icon: "grapes" },
      { label: "Tiere rund um das Haus", icon: "users" },
      { label: "Guter Ausgangspunkt für Wanderungen an den Zeugenbergen", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Kurzüberblick",
    overviewFacts: [
      { iconKey: "guests", title: "4-6 Gäste", text: "Kapazität" },
      { iconKey: "terrace", title: "überdachte Terrasse", text: "und Sitzplätze im Garten" },
      { iconKey: "garden", title: "Großer Garten", text: "mit Raum zum Entspannen" },
      { iconKey: "kitchen", title: "Renovierte Küche" },
      { iconKey: "home", title: "Galerieartiger Wohnraum" },
      { iconKey: "animals", title: "Tiere rund um das Haus" }
    ],
    featuredExperience: {
      label: "Besonderes Erlebnis",
      title: "Panorama Pool",
      text: "Bei Dandelion D2 ist der Zugang zum Panorama Pool ab Sommer im Aufenthalt enthalten.",
      note: "ab 15. Juni 2026",
      iconKey: "pool",
      image: d2PanoramaPoolHeroImage
        ? {
            src: d2PanoramaPoolHeroImage.src,
            alt: "Panorama Pool im Balaton-Oberland mit Blick auf die Hügel",
            width: 1800,
            height: 1350
          }
        : undefined
    },
    reasonsTitle: "Warum Sie es lieben werden",
    reasons: [
      {
        iconKey: "terrace",
        title: "Überdachte Terrasse",
        text: "Großer Garten"
      },
      {
        iconKey: "users",
        title: "Kinderfreundlicher Garten",
        text: "Garten, Tiere"
      },
      {
        iconKey: "balaton",
        title: "Balaton und Hügel",
        text: "Strand, Touren"
      },
      {
        iconKey: "home",
        title: "Familienbasis",
        text: "Geräumige Zimmer"
      }
    ]
  },
  geoDecision: {
    kicker: "D2 schnelle Antworten",
    title: "Dandelion D2 ist eine gute Wahl, wenn Sie ein familienfreundliches Haus mit Garten in Kisapáti suchen",
    lead: "D2 ist bequem für 4-6 Gäste, mit großem Garten, überdachter Terrasse, renovierter Küche und Zugang zum Panorama Pool ab 15. Juni 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Hat Dandelion D2 Zugang zum Pool?",
        answer: "Ja. Ab 15. Juni 2026 können D2-Gäste den Panorama Pool zusammen mit den Gästen von D1 und Fügeház nutzen."
      },
      {
        iconKey: "family",
        question: "Für wen ist Dandelion D2 eine gute Wahl?",
        answer: "D2 eignet sich vor allem für Familien und kleinere Freundesgruppen, die einen großen Garten, eine überdachte Terrasse und einen ruhigen Ausgangspunkt im Balaton-Oberland suchen."
      },
      {
        iconKey: "guests",
        question: "Für wie viele Gäste ist Dandelion D2 bequem?",
        answer: "D2 ist bequem für 4-6 Gäste, mit galerieartigem Wohnraum, Doppelbett, zwei Einzelbetten und Schlafsofa."
      },
      {
        iconKey: "garden",
        question: "Ist D2 mit Kindern eine gute Wahl?",
        answer: "Ja. Der große Garten, die Sitzplätze im Freien und die Tiere rund um das Haus machen D2 besonders praktisch für Familien mit Kindern."
      },
      {
        iconKey: "kitchen",
        question: "Welche Ausstattung gibt es in D2?",
        answer: "D2 hat eine renovierte, gut ausgestattete Küche, Geschirrspüler, Klimaanlage, Gigabit Internet, Kamin, Badewanne, überdachte Terrasse und Sitzplätze im Garten."
      },
      {
        iconKey: "mountain",
        question: "Für welche Ausflüge ist D2 ein guter Ausgangspunkt?",
        answer: "D2 ist ein guter Ausgangspunkt für den Szent György-hegy, den Balaton, die Zeugenberge, Weingüter in der Umgebung und das Tapolca-Becken."
      }
    ],
    amenitiesTitle: "Was in D2 wichtig ist"
  },
  amenities: [
    { iconKey: "wifi", title: "Gigabit Internet" },
    { iconKey: "utensils", title: "Geschirrspüler" },
    { iconKey: "sun", title: "Klimaanlage" },
    { iconKey: "home", title: "Heizung" },
    { iconKey: "home", title: "Kamin" },
    { iconKey: "bathroom", title: "Badewanne" },
    { iconKey: "sun", title: "Ventilator" },
    { iconKey: "leaf", title: "Sitzplätze im Garten" }
  ],
  gallery: {
    kicker: "Galerie",
    title: "Ein Blick in Dandelion D2",
    moreHint: "Klicken Sie auf ein Foto für mehr Bilder",
    defaultHint: "Galeriebilder können geöffnet werden",
    emptyMessage: "Die Dandelion D2 Galerie hat derzeit keine verfügbaren Bilder.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY-HEGY - KISAPÁTI",
    title: "Die Umgebung von Dandelion D2",
    body: "Dandelion D2 liegt günstig, um das Tapolca-Becken, den Balaton und die umliegende Weinregion von einem ruhigen Ausgangspunkt aus zu erkunden. Die Lage eignet sich für nahe Wanderungen ebenso wie für entspannte Balaton-Tage.",
    benefitsAriaLabel: "Vorteile der Lage",
    benefits: [
      { label: "Wanderwege in der Nähe", icon: "trail" },
      { label: "Weinregion und Weinberge", icon: "grapes" },
      { label: "Balaton mit kurzer Fahrt erreichbar", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps/d/u/0/embed?mid=1YRCy3UzpGcrJ6YJ4ihdVcluhJWtisVk&ehbc=2E312F",
    embedTitle: "Karte der Umgebung von Dandelion D2"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion D2 Galerie",
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
    intro: "Wenn Ihnen die Dandelion Atmosphäre gefällt, können Sie hier weitere Häuser und Regionen vergleichen.",
    items: [
      {
        name: "Fügeház",
        meta: "4-6 Gäste - Panorama - Familienurlaub",
        href: "/de/unterkuenfte/#fugehaz",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház Ferienhaus mit Terrasse nahe Szent György-hegy"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6-8 Gäste - großer Garten - für Familien",
        href: "/de/unterkuenfte/#dandelion-d1",
        image: {
          type: "mapping",
          slot: "d1_card_image",
          alt: "Dandelion D1 Ferienhaus für Familien in Kisapáti"
        }
      },
      {
        name: "Dandelion Zsálya",
        meta: "ruhig, naturnah, entspannte Auszeit",
        href: "/de/unterkuenfte/#zsalya-vendeghaz",
        image: {
          type: "mapping",
          slot: "zsalya_card_image",
          alt: "Dandelion Zsálya Unterkunft nahe Szent György-hegy"
        }
      },
      {
        name: "Dandelion Szőlőliget",
        meta: "langsamer Aufenthalt zwischen Weinbergen",
        href: "/de/unterkuenfte/#szololiget-vendeghaz",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Dandelion Szőlőliget Unterkunft zwischen Weinbergen"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "Káli-Becken - ruhige Dorfstimmung",
        href: "/de/unterkuenfte/#dandelion-koveskal",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "D2 German related Köveskál"
          ),
          alt: "Außenansicht des Dandelion Köveskál Ferienhauses"
        }
      }
    ]
  }
};

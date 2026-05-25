import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

const d2PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d2GermanPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 bei Szent György-hegy | Familienfreundliches Ferienhaus",
    description:
      "Dandelion D2 ist eine ruhige, familienfreundliche Unterkunft im Balaton-Oberland mit Garten, Terrasse und Zugang zum gemeinsamen Panorama Pool."
  },
  bookingLink: "/de/kontakt/",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-kisapati-hero-mobile-01.webp",
      "d2 German mobile hero"
    ),
    fallbackAlt: "Dandelion D2 überdachte Terrasse mit gelben Stühlen und großem Garten in Kisapati",
    kicker: "Balaton-Oberland - Szent György-hegy",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "FAMILIENFREUNDLICHE UNTERKUNFT MIT GARTEN UND TERRASSE",
    lead: "Ein helles, ruhiges Ferienhaus nahe Szent György-hegy, mit großem Garten, überdachter Terrasse und guter Lage für Balaton-Tage.",
    poolHighlight: {
      enabled: true,
      label: "Gemeinsamer Panorama Pool in der Nähe von Dandelion D2",
      text: "Der Pool wird von den Gästen von D1, D2 und Fügeház gemeinsam genutzt.",
      href: "/de/unterkuenfte/",
      ctaLabel: "Unterkünfte ansehen",
      variant: "strong"
    },
    primaryCtaLabel: "Anfrage senden",
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
    lead: "Dandelion D2 passt gut zu ruhiger Familienzeit im Balaton-Oberland. Die überdachte Terrasse, der große Garten und die praktische Küche machen den Aufenthalt leicht, während Hügel, Strände und Weingüter in kurzer Fahrt erreichbar sind."
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
      "Der Panorama Pool wird von den Gästen von D1, D2 und Fügeház gemeinsam genutzt. Er ist kein privater Pool nur für D2, sondern Teil des nahe gelegenen D1-D2-Fügeház Poolbereichs ab 1. Juni 2026.",
      "Rund um das Haus gibt es Tiere, was viele Kinder als kleines Landerlebnis erleben. Das gibt dem Aufenthalt eine warme, dorfliche Stimmung, ohne den Komfort des Hauses zu schmälern.",
      "Der Balaton, die Wanderwege des Szent György-hegy und die Weingüter der Umgebung sind mit kurzer Fahrt erreichbar. Dandelion D2 eignet sich deshalb gut als ruhige Basis für verschiedene Tage im Balaton-Oberland."
    ],
    moreLabel: "Mehr über Dandelion D2",
    ctaLabel: "Verfügbarkeit anfragen"
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
          ["Gemeinsamer Panorama Pool", "für D1, D2 und Fügeház Gäste ab 1. Juni 2026"],
          ["Draussen kochen", "Grillmöglichkeit im Garten"],
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
      { label: "Zugang zum gemeinsamen Panorama Pool", icon: "pool" },
      { label: "überdachte Terrasse und Gartenbereich", icon: "leaf" },
      { label: "Grillmöglichkeit im Freien", icon: "grapes" },
      { label: "Tiere rund um das Haus", icon: "users" },
      { label: "Gute Basis für Wanderungen an den Zeugenbergen", icon: "trail" }
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
      text: "Bei Dandelion D2 ist der Zugang zum gemeinsamen Panorama Pool ab Sommer im Aufenthalt enthalten.",
      note: "ab 1. Juni 2026",
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
        title: "Morgen im Freien",
        text: "Terrasse und Garten"
      },
      {
        iconKey: "users",
        title: "Einfach mit Kindern",
        text: "Platz, Garten, Tiere"
      },
      {
        iconKey: "balaton",
        title: "Balaton in der Nähe",
        text: "See, Wanderungen, Wein"
      },
      {
        iconKey: "home",
        title: "Ruhige Familienbasis",
        text: "Gut nutzbare Räume"
      }
    ]
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
    kicker: "SZENT GYORGY-HEGY - KISAPATI",
    title: "Die Umgebung von Dandelion D2",
    body: "Dandelion D2 liegt günstig, um das Tapolca-Becken, den Balaton und die umliegende Weinregion von einer ruhigen Basis aus zu erkunden. Es passt zu nahen Wanderungen ebenso wie zu langsameren Balaton-Tagen.",
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
          alt: "Dandelion D1 Ferienhaus für Familien in Kisapati"
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
          alt: "Aussenansicht des Dandelion Köveskál Ferienhauses"
        }
      }
    ]
  }
};

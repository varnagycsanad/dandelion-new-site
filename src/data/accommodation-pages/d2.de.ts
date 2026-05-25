import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

const d2PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d2GermanPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 bei Szent Gyorgy-hegy | Familienfreundliches Ferienhaus",
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
    fallbackAlt: "Dandelion D2 ueberdachte Terrasse mit gelben Stuehlen und grossem Garten in Kisapati",
    kicker: "Balaton-Oberland - Szent Gyorgy-hegy",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "FAMILIENFREUNDLICHE UNTERKUNFT MIT GARTEN UND TERRASSE",
    lead: "Ein helles, ruhiges Ferienhaus nahe Szent Gyorgy-hegy, mit grossem Garten, ueberdachter Terrasse und guter Lage fuer Balaton-Tage.",
    poolHighlight: {
      enabled: true,
      label: "Gemeinsamer Panorama Pool in der Naehe von Dandelion D2",
      text: "Der Pool wird von den Gaesten von D1, D2 und Fugehaz gemeinsam genutzt.",
      href: "/de/unterkuenfte/",
      ctaLabel: "Unterkuenfte ansehen",
      variant: "strong"
    },
    primaryCtaLabel: "Anfrage senden",
    secondaryCtaLabel: "Fotos ansehen"
  },
  reviews: {
    kicker: "Gaestebewertungen",
    title: "Was Gaeste sagen",
    intro: "Echte Rueckmeldungen von Google und Booking.com",
    mobileSummaryLabel: "Weitere Bewertungen",
    mobileHighlightedAriaLabel: "Hervorgehobene Google-Bewertung",
    mobileMoreGoogleAriaLabel: "Weitere Google-Bewertungen",
    mobileBookingAriaLabel: "Booking.com Bewertungen",
    items: [
      {
        source: "Google",
        quote: "Idyllische Umgebung, freundliche Gastgeber, viel Platz fuer Kinder und eine ruhige, sehr angenehme Atmosphaere.",
        meta: "Vanessa L. - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Das Haus hat alles, was man braucht. Ich empfehle es gern fuer ein paar ruhige Tage zum Abschalten.",
        meta: "Ildiko Barna - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Ein schoener, gepflegter Ort mit ruhiger Umgebung und unkomplizierter Anreise. Besonders gut zum Entspannen.",
        meta: "Eszter K. - Google - 5/5"
      },
      {
        source: "Booking.com",
        quote: "Eine rundum positive Erfahrung, mit schnellen Antworten und sehr hilfsbereiten Gastgebern.",
        meta: "Bernadett - Booking.com - 10/10"
      },
      {
        source: "Booking.com",
        quote: "Perfekt fuer erholsame Tage: ein ruhiger Ort, freundliche Gastgeber und eine komfortable Unterkunft.",
        meta: "Angelika - Booking.com - 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Langsamer Rhythmus - grosser Garten - ueberdachte Terrasse",
    title: "Terrasse, Garten und entspannte Raeume fuer Familien",
    lead: "Dandelion D2 passt gut zu ruhiger Familienzeit im Balaton-Oberland. Die ueberdachte Terrasse, der grosse Garten und die praktische Kueche machen den Aufenthalt leicht, waehrend Huegel, Straende und Weingueter in kurzer Fahrt erreichbar sind."
  },
  details: {
    kicker: "Dandelion D2",
    title: "Familienfreundliche Unterkunft bei Szent Gyorgy-hegy",
    shortDescription:
      "Ein ruhiger Ausgangspunkt mit hellen Innenraeumen, grossem Garten, Tieren rund um das Haus und dem Balaton in guter Reichweite.",
    supportingLink: {
      label: "Zur deutschen Unterkunftsuebersicht.",
      href: "/de/unterkuenfte/"
    },
    longDescription: [
      "Der galerieartige Wohnraum gibt dem Haus einen offenen, unkomplizierten Rhythmus. Die renovierte Kueche macht auch laengere Aufenthalte angenehm. Der Morgen kann auf der Terrasse beginnen, tagsueber geht es in die Huegel oder an den Balaton, und abends wird es im Garten wieder ruhig.",
      "Die ueberdachte Terrasse und die Sitzplaetze im Freien sind auch nuetzlich, wenn das Wetter wechselt. Der grosse Garten gibt Kindern und Erwachsenen Raum zum Spielen, Sitzen, Grillen oder einfach zum Ausruhen.",
      "Der Panorama Pool wird von den Gaesten von D1, D2 und Fugehaz gemeinsam genutzt. Er ist kein privater Pool nur fuer D2, sondern Teil des nahe gelegenen D1-D2-Fugehaz Poolbereichs ab 1. Juni 2026.",
      "Rund um das Haus gibt es Tiere, was viele Kinder als kleines Landerlebnis erleben. Das gibt dem Aufenthalt eine warme, dorfliche Stimmung, ohne den Komfort des Hauses zu schmaelern.",
      "Der Balaton, die Wanderwege des Szent Gyorgy-hegy und die Weingueter der Umgebung sind mit kurzer Fahrt erreichbar. Dandelion D2 eignet sich deshalb gut als ruhige Basis fuer verschiedene Tage im Balaton-Oberland."
    ],
    moreLabel: "Mehr ueber Dandelion D2",
    ctaLabel: "Verfuegbarkeit anfragen"
  },
  facts: {
    groups: [
      {
        title: "Wichtige Details",
        items: [
          ["Gaeste", "4-6 Gaeste"],
          ["Aussenbereich", "ueberdachte Terrasse und Sitzplaetze im Garten"],
          ["Garten", "grosser, gut nutzbarer Garten"],
          ["Kueche", "2026 renoviert und gut ausgestattet"]
        ]
      },
      {
        title: "Erlebnisse",
        items: [
          ["Gemeinsamer Panorama Pool", "fuer D1, D2 und Fugehaz Gaeste ab 1. Juni 2026"],
          ["Draussen kochen", "Grillmoeglichkeit im Garten"],
          ["Fuer Kinder", "Tiere und grosser Garten rund um das Haus"],
          ["In der Naehe", "Balaton, Wanderwege und Weingueter"]
        ]
      }
    ]
  },
  features: {
    title: "Ausstattung",
    highlights: [
      { label: "Kueche 2026 renoviert", icon: "utensils" },
      { label: "Galerieartiger Wohnraum", icon: "home" },
      { label: "Zugang zum gemeinsamen Panorama Pool", icon: "pool" },
      { label: "Ueberdachte Terrasse und Gartenbereich", icon: "leaf" },
      { label: "Grillmoeglichkeit im Freien", icon: "grapes" },
      { label: "Tiere rund um das Haus", icon: "users" },
      { label: "Gute Basis fuer Wanderungen an den Zeugenbergen", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Kurzueberblick",
    overviewFacts: [
      { iconKey: "guests", title: "4-6 Gaeste", text: "Kapazitaet" },
      { iconKey: "terrace", title: "Ueberdachte Terrasse", text: "und Sitzplaetze im Garten" },
      { iconKey: "garden", title: "Grosser Garten", text: "mit Raum zum Entspannen" },
      { iconKey: "kitchen", title: "Renovierte Kueche" },
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
            alt: "Panorama Pool im Balaton-Oberland mit Blick auf die Huegel",
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
        title: "Balaton in der Naehe",
        text: "See, Wanderungen, Wein"
      },
      {
        iconKey: "home",
        title: "Ruhige Familienbasis",
        text: "Gut nutzbare Raeume"
      }
    ]
  },
  amenities: [
    { iconKey: "wifi", title: "Gigabit Internet" },
    { iconKey: "utensils", title: "Geschirrspueler" },
    { iconKey: "sun", title: "Klimaanlage" },
    { iconKey: "home", title: "Heizung" },
    { iconKey: "home", title: "Kamin" },
    { iconKey: "bathroom", title: "Badewanne" },
    { iconKey: "sun", title: "Ventilator" },
    { iconKey: "leaf", title: "Sitzplaetze im Garten" }
  ],
  gallery: {
    kicker: "Galerie",
    title: "Ein Blick in Dandelion D2",
    moreHint: "Klicken Sie auf ein Foto fuer mehr Bilder",
    defaultHint: "Galeriebilder koennen geoeffnet werden",
    emptyMessage: "Die Dandelion D2 Galerie hat derzeit keine verfuegbaren Bilder.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYORGY-HEGY - KISAPATI",
    title: "Die Umgebung von Dandelion D2",
    body: "Dandelion D2 liegt guenstig, um das Tapolca-Becken, den Balaton und die umliegende Weinregion von einer ruhigen Basis aus zu erkunden. Es passt zu nahen Wanderungen ebenso wie zu langsameren Balaton-Tagen.",
    benefitsAriaLabel: "Vorteile der Lage",
    benefits: [
      { label: "Wanderwege in der Naehe", icon: "trail" },
      { label: "Weinregion und Weinberge", icon: "grapes" },
      { label: "Balaton mit kurzer Fahrt erreichbar", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps/d/u/0/embed?mid=1YRCy3UzpGcrJ6YJ4ihdVcluhJWtisVk&ehbc=2E312F",
    embedTitle: "Karte der Umgebung von Dandelion D2"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion D2 Galerie",
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
    intro: "Wenn Ihnen die Dandelion Atmosphaere gefaellt, koennen Sie hier weitere Haeuser und Regionen vergleichen.",
    items: [
      {
        name: "Fugehaz",
        meta: "4-6 Gaeste - Panorama - Familienurlaub",
        href: "/de/unterkuenfte/#fugehaz",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fugehaz Ferienhaus mit Terrasse nahe Szent Gyorgy-hegy"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6-8 Gaeste - grosser Garten - fuer Familien",
        href: "/de/unterkuenfte/#dandelion-d1",
        image: {
          type: "mapping",
          slot: "d1_card_image",
          alt: "Dandelion D1 Ferienhaus fuer Familien in Kisapati"
        }
      },
      {
        name: "Dandelion Zsalya",
        meta: "ruhig, naturnah, entspannte Auszeit",
        href: "/de/unterkuenfte/#zsalya-vendeghaz",
        image: {
          type: "mapping",
          slot: "zsalya_card_image",
          alt: "Dandelion Zsalya Unterkunft nahe Szent Gyorgy-hegy"
        }
      },
      {
        name: "Dandelion Szololiget",
        meta: "langsamer Aufenthalt zwischen Weinbergen",
        href: "/de/unterkuenfte/#szololiget-vendeghaz",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Dandelion Szololiget Unterkunft zwischen Weinbergen"
        }
      },
      {
        name: "Dandelion Koveskal",
        meta: "Kali-Becken - ruhige Dorfstimmung",
        href: "/de/unterkuenfte/#dandelion-koveskal",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "D2 German related Koveskal"
          ),
          alt: "Aussenansicht des Dandelion Koveskal Ferienhauses"
        }
      }
    ]
  }
};

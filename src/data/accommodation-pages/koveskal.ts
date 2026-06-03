import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-06 20:00] Köveskál SEO title, meta, headings and intro copy refined for production baseline.
// [CHANGE 2026-05-16 18:35] Köveskál megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const koveskalPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Köveskál | Nyugodt vendégház a Káli-medencében",
    description:
      "Nyugodt vendégház Köveskálon, természetközeli pihenéssel, falusi hangulattal és jó kiindulóponttal a Káli-medence felfedezéséhez."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendégházak?p=3970b30e1042d58f&lang=Hu",
  positioning: {
    shortCharacter: "Nagy kerttel és terasszal rendelkező ház a Káli-medence hangulatához.",
    goodFor: ["családoknak", "baráti társaságoknak", "elvonulós pihenéshez", "Káli-medencei programokhoz"],
    strengths: ["nagy kert", "nagy terasz", "2 fürdőszoba", "wifi", "ingyenes parkolás"],
    keyFacts: [
      "férőhely: 6 fő",
      "fürdőszoba: 2",
      "ágyelrendezés: 2 franciaágy + 2 szimpla ágy",
      "kisállat: nem engedélyezett",
      "wifi: van",
      "parkolás: ingyenes",
      "légkondi: van",
      "medence: nincs",
      "booking státusz: külön döntés kell"
    ],
    betterAlternativeNote: "ha azonnali online foglalást szeretnétek, Köveskálnál külön döntés kell."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "koveskal",
      "gallery",
      "dandelion-koveskal-source-001.webp",
      "koveskal mobile hero"
    ),
    fallbackAlt: "Dandelion Köveskál vendégház a Káli-medence csendes részén",
    kicker: "Káli-medence · Köveskál",
    title: "Dandelion",
    titleAccent: "Köveskál",
    subtitle: "CSENDES PIHENÉS A KÁLI-MEDENCÉBEN",
    lead:
      "Nyugodt vendégház azoknak, akik a Káli-medence lassabb ritmusát, a falusi hangulatot és a természetközeli pihenést keresik.",
    video: {
      desktop: "/videos/accommodations/koveskal/dandelion-koveskal-hero-desktop.mp4?v=20260603-lite",
      mobile: "/videos/accommodations/koveskal/dandelion-koveskal-hero-mobile.mp4?v=20260603-lite"
    },
    primaryCtaLabel: "Érdeklődés",
    secondaryCtaLabel: "Képek megtekintése"
  },
  reviews: {
    kicker: "Vendégértékelések",
    title: "Vendégeink szerint",
    intro: "Nyugodt, kényelmes vendégház Köveskál csendes részén, tágas terekkel és igazi Káli-medence hangulattal.",
    mobileSummaryLabel: "További vélemények",
    mobileHighlightedAriaLabel: "Kiemelt Google értékelés",
    mobileMoreGoogleAriaLabel: "További Google értékelések",
    mobileBookingAriaLabel: "Booking.com értékelések",
    items: [
      {
        source: "Google",
        quote: "Nyugodt hely, lassabb ritmus és jó kiindulópont a Káli-medence felfedezéséhez.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Barátságos, természetközeli hangulat, ami rövid pihenéshez és hosszabb kikapcsolódáshoz is jó.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A környék csendje és a visszafogott vidéki hangulat különösen szerethetővé teszi.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kellemes, rendezett szállás, jó bázis kirándulásokhoz és nyugodt estékhez.",
        meta: "Vendég · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Letisztult, kényelmes pihenés a Káli-medencében, túlzsúfolt hangulat nélkül.",
        meta: "Vendég · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Falusi nyugalom · Káli-medence",
    title: "Csendes pihenés a Káli-medencében",
    lead:
      "A Dandelion Köveskál visszafogott, természetközeli bázist ad Köveskálon, ahonnan könnyen elérhetők a Káli-medence falvai, túraútvonalai és boros megállói."
  },
  details: {
    kicker: "Dandelion Köveskál",
    title: "Falusi nyugalom, természetközeli ritmus és lassabb napok",
    shortDescription:
      "A Dandelion Köveskál azoknak jó választás, akik a Káli-medence karakteres, csendes oldalát keresik, és a programok mellett a nyugalmat is fontosnak tartják.",
    longDescription: [
      "Köveskál a Káli-medence egyik legnyugodtabb pontja, ahol a kövek, a szőlők, a kis utcakarakter és a lassabb napi ritmus adja az élmény alapját.",
      "A vendégház jó kiindulópont sétákhoz, környékbeli pincesorokhoz és olyan balatoni-felvidéki programokhoz, ahol a csend és a táj is a pihenés része marad.",
      "Ha a Dandelion szállások közül a visszafogott, vidéki hangulat áll hozzád közelebb, a Köveskál oldala természetes folytatása lehet ennek a keresési szándéknak."
    ],
    moreLabel: "Bővebben a Köveskálról",
    ctaLabel: "Érdeklődés"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszín", "Köveskál"],
          ["Régió", "Káli-medence"],
          ["Jelleg", "vidéki, nyugodt pihenés"],
          ["Kinek ajánljuk?", "csendes pihenést kereső pároknak, családoknak és baráti társaságoknak"]
        ]
      },
      {
        title: "Hangulat",
        items: [
          ["Fókusz", "lassabb kikapcsolódás"],
          ["Környék", "falusi és természetközeli"],
          ["Program", "kirándulás, pihenés"],
          ["Tempó", "csendesebb, visszafogott"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Természetközeli hangulat", icon: "leaf" },
      { label: "Kirándulásokhoz jó bázis", icon: "trail" },
      { label: "Vidéki nyugalom", icon: "users" },
      { label: "Káli-medencei környezet", icon: "route" },
      { label: "Borvidék a közelben", icon: "grapes" },
      { label: "Áttekinthető képgaléria", icon: "wifi" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "balaton", title: "Köveskál", text: "Helyszín" },
      { iconKey: "route", title: "Káli-medence", text: "Régió" },
      { iconKey: "leaf", title: "Falusi nyugalom", text: "Jelleg" },
      { iconKey: "spark", title: "Lassabb kikapcsolódás", text: "Hangulat" },
      { iconKey: "trail", title: "Túrák és borászatok", text: "Programok" },
      { iconKey: "leaf", title: "Csendes ritmus", text: "Pihenés" }
    ],
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "leaf",
        title: "Lassan telő napok",
        text: "Nyugodt falusi közeg"
      },
      {
        iconKey: "trail",
        title: "Jó bázis felfedezéshez",
        text: "Káli-medence a közelben"
      },
      {
        iconKey: "spark",
        title: "Visszafogott hangulat",
        text: "Nem zsúfolt, természetes"
      },
      {
        iconKey: "grill",
        title: "Borvidéki környezet",
        text: "Pincék és megállók"
      }
    ]
  },
  amenities: [
    {
      iconKey: "leaf",
      title: "Természetközeli hangulat"
    },
    {
      iconKey: "trail",
      title: "Kirándulásokhoz jó bázis"
    },
    {
      iconKey: "family",
      title: "Vidékies nyugalom"
    },
    {
      iconKey: "route",
      title: "Káli-medencei környezet"
    },
    {
      iconKey: "grill",
      title: "Borvidék a közelben"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat Köveskál hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Köveskál galériához jelenleg nincs feloldható kép.",
    previewCount: 8
  },
  map: {
    kicker: "KÖVESKÁL · KÁLI-MEDENCE",
    title: "Környék és táj",
    body:
      "Köveskál a Káli-medence nyugodt, karakteres települései közé tartozik. A környék jó választás lassabb napokhoz, sétákhoz és távolabbi kirándulásokhoz is.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Káli-medencei hangulat", icon: "grapes" },
      { label: "Kirándulások a közelben", icon: "trail" },
      { label: "Nyugodt falusi ritmus", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=K%C3%B6vesk%C3%A1l&z=13&output=embed",
    embedTitle: "Dandelion Köveskál környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Köveskál galéria",
    closeAriaLabel: "Galéria bezárása",
    previousAriaLabel: "Előző kép",
    nextAriaLabel: "Következő kép"
  },
  labels: {
    googleLogoAlt: "Google értékelés",
    bookingLogoAlt: "Booking.com értékelés",
    galleryOpenAriaLabel: "Galériakép megnyitása",
    galleryHoverLabel: "Kép megtekintése"
  },
  relatedStays: {
    kicker: "További szállások",
    title: "További Dandelion szállások",
    intro:
      "Ha a Káli-medence nyugalma mellett más Balaton-felvidéki vagy Balaton közeli vendégházat is néznél, fedezd fel a többi Dandelion szállást is.",
    items: [
      {
        name: "Fügeház",
        meta: "2-4 fő · panoráma · dézsa",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion D2",
        meta: "4-6 fő · kert · családbarát",
        href: "/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image"
        }
      },
      {
        name: "Zsálya Vendégház",
        meta: "csendes, természetközeli pihenés",
        href: "/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image"
        }
      },
      {
        name: "Szőlőliget Vendégház",
        meta: "elvonulás a szőlők között",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
        }
      },
      {
        name: "Dandelion Royal Homes",
        meta: "Balaton közeli, kényelmes kikapcsolódás",
        href: "/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "koveskal related royal homes"
          ),
          alt: "Dandelion Royal Homes külső kép"
        }
      }
    ]
  }
};

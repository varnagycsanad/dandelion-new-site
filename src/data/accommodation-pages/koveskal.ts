import type { AccommodationPageData } from "./types";

// [CHANGE 2026-05-06 20:00] Koveskal SEO title, meta, headings and intro copy refined for production baseline.
export const koveskalPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Koveskal | Nyugodt vendeghaz a Kali-medenceben",
    description: "Nyugodt vendeghaz Koveskalon, termeszetkozeli pihenessel, falusi hangulattal es jo kiinduloponttal a Kali-medence felfedezesehez."
  },
  bookingLink: "https://dandelionhouse.hu/koveskal/",
  hero: {
    mobileImagePath: "/images/accommodations/koveskal/gallery/dandelion-koveskal-source-001.webp",
    fallbackAlt: "Dandelion Koveskal vendeghaz a Kali-medence csendes reszen",
    kicker: "Kali-medence ?? Koveskal",
    title: "Dandelion",
    titleAccent: "Koveskal",
    subtitle: "CSENDES PIHENES A KALI-MEDENCEBEN",
    lead: "Nyugodt vendeghaz azoknak, akik a Kali-medence lassabb ritmusat, a falusi hangulatot es a termeszetkozeli pihenest keresik.",
    primaryCtaLabel: "Reszletek es kapcsolat",
    secondaryCtaLabel: "Kepek megtekintese"
  },
  reviews: {
    kicker: "Vendegertekelesek",
    title: "Vendégeink szerint",
    intro: "Elso koros, szerkesztheto review blokk a shared sablon technikai bekoteséhez.",
    mobileSummaryLabel: "Tovabbi velemenyek",
    mobileHighlightedAriaLabel: "Kiemelt Google ertekeles",
    mobileMoreGoogleAriaLabel: "Tovabbi Google ertekelesek",
    mobileBookingAriaLabel: "Booking.com ertekelesek",
    items: [
      {
        source: "Google",
        quote: "Nyugodt hely, lassabb ritmus es jo kiindulopont a Kali-medence felfedezesehez.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Baratsagos, termeszetkozeli hangulat, ami rovid piheneshez es hosszabb kikapcsolodashoz is jo.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A kornyek csendje es a visszafogott videki hangulat kulonosen szerethetove teszi.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kellemes, rendezett szallas, jo bázis kirandulasokhoz es nyugodt estekhez.",
        meta: "Vendeg · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Letisztult, kenyelmes pihenes a Kali-medenceben, tulzsufolt hangulat nelkul.",
        meta: "Vendeg · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Falusi nyugalom ?? Kali-medence",
    title: "Csendes pihenes a Kali-medenceben",
    lead: "A Dandelion Koveskal visszafogott, termeszetkozeli bazist ad Koveskalon, ahonnan konnyen elerhetok a Kali-medence falvai, turautvonalai es boros megalloi."
  },
  details: {
    kicker: "Dandelion Koveskal",
    title: "Falusi nyugalom, termeszetkozeli ritmus es lassabb napok",
    shortDescription:
      "A Dandelion Koveskal azoknak jo valasztas, akik a Kali-medence karakteres, csendes oldalat keresik, es a programok mellett a nyugalmat is fontosnak tartjak.",
    longDescription: [
      "Koveskal a Kali-medence egyik legnyugodtabb pontja, ahol a kovek, a szolok, a kis utcakarakter es a lassabb napi ritmus adja az elmeny alapjat.",
      "A vendeghaz jo kiindulopont setakhoz, kornyekbeli pincesorokhoz es olyan balatoni-felvideki programokhoz, ahol a csend es a taj is a pihenes resze marad.",
      "Ha a Dandelion szallasok kozul a visszafogott, videki hangulat all hozzad kozelebb, a Koveskal oldala termeszetes folytatasa lehet ennek a keresesi szandeknak."
    ],
    moreLabel: "Bovebben a Koveskal oldalrol",
    ctaLabel: "Kapcsolat es reszletek"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszin", "Koveskal"],
          ["Regio", "Kali-medence"],
          ["Jelleg", "videki, nyugodt pihenes"],
          ["Oldalallapot", "elso koros template-bekotes"]
        ]
      },
      {
        title: "Hangulat",
        items: [
          ["Fokusz", "lassabb kikapcsolodas"],
          ["Kornyek", "falusi es termeszetkozeli"],
          ["Program", "kirandulas, pihenes"],
          ["Tempo", "csendesebb, visszafogott"]
        ]
      }
    ]
  },
  features: {
    title: "Miért lehet jo valasztas",
    highlights: [
      { label: "Termeszetkozeli hangulat", icon: "leaf" },
      { label: "Kirandulasokhoz jo bázis", icon: "trail" },
      { label: "Videki nyugalom", icon: "users" },
      { label: "Kali-medencei kornyezet", icon: "route" },
      { label: "Borvidek a kozelben", icon: "grapes" },
      { label: "Attekintheto kepgaleria", icon: "wifi" }
    ]
  },
  gallery: {
    kicker: "Galeria",
    title: "Nyolc pillanat Koveskal hangulatabol",
    moreHint: "Tovabbi kepekert kattints",
    defaultHint: "A galeria kepei kattinthatok",
    emptyMessage: "A Koveskal galeriahoz jelenleg nincs feloldhato kep.",
    previewCount: 8
  },
  map: {
    kicker: "KOVESKAL · KALI-MEDENCE",
    title: "Kornyek es taj",
    body: "Koveskal a Kali-medence nyugodt, karakteres telepulesei koze tartozik. A kornyek jo valasztas lassabb napokhoz, setakhoz es tavolabbi kirandulasokhoz is.",
    benefitsAriaLabel: "Kornyek elonyei",
    benefits: [
      { label: "Kali-medencei hangulat", icon: "grapes" },
      { label: "Kirandulasok a kozelben", icon: "trail" },
      { label: "Nyugodt falusi ritmus", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=K%C3%B6vesk%C3%A1l&z=13&output=embed",
    embedTitle: "Dandelion Koveskal kornyeke terkep"
  },
  lightbox: {
    galleryAriaLabel: "Koveskal galeria",
    closeAriaLabel: "Galeria bezarasa",
    previousAriaLabel: "Elozo kep",
    nextAriaLabel: "Kovetkezo kep"
  },
  labels: {
    googleLogoAlt: "Google ertekeles",
    bookingLogoAlt: "Booking.com ertekeles",
    galleryOpenAriaLabel: "Galeriakep megnyitasa",
    galleryHoverLabel: "Kep megtekintese"
  },
  relatedStays: {
    kicker: "Tovabbi szallasok",
    title: "Tovabbi Dandelion szallasok",
    intro: "Ha a Kali-medence nyugalma mellett mas Balaton-felvideki vagy Balaton kozeli vendeghazat is neznel, fedezd fel a tobbi Dandelion szallast is.",
    items: [
      {
        name: "Fugehaz",
        meta: "2-4 fo · panorama · dezsa",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion D2",
        meta: "4-6 fo · kert · csaladbarat",
        href: "/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image"
        }
      },
      {
        name: "Zsalya Vendeghaz",
        meta: "csendes, termeszetkozeli pihenes",
        href: "/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image"
        }
      },
      {
        name: "Szololiget Vendeghaz",
        meta: "elvonulas a szolok kozott",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
        }
      },
      {
        name: "Dandelion Royal Homes",
        meta: "Balaton kozeli, kenyelmes kikapcsolodas",
        href: "/royal/",
        image: {
          type: "direct",
          src: "/images/accommodations/royal_homes/gallery/dandelion-royal-homes-source-001.webp",
          alt: "Dandelion Royal Homes kulso kep"
        }
      }
    ]
  }
};

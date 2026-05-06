import type { AccommodationPageData } from "./types";

// [CHANGE 2026-05-06 20:00] Szololiget SEO title, meta, headings and intro copy refined for production baseline.
export const szololigetPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Szololiget | Csendes vendeghaz a Balaton-felvideken",
    description: "Csendes vendeghaz a Balaton-felvideken, szolok kozott, termeszetkozeli pihenessel, lassabb ritmussal es nyugodt kornyezettel."
  },
  bookingLink: "/szololiget/",
  hero: {
    mobileImagePath: "/images/accommodations/szololiget/gallery/dandelion-szololiget-source-001.webp",
    fallbackAlt: "Dandelion Szololiget vendeghaz szolok kozott a Balaton-felvideken",
    kicker: "Balaton-felvidek ?? szolok kozott",
    title: "Dandelion",
    titleAccent: "Szololiget",
    subtitle: "ELVONULAS A SZOLOK KOZOTT",
    lead: "Csendes vendeghaz azoknak, akik a Balaton-felvidek nyugodtabb oldalat, a szolok kozotti hangulatot es a lassabb pihenest keresik.",
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
        quote: "Nyugodt hely, jo valasztas, ha a termeszethez kozel, lassabb ritmusban szeretnel pihenni.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Visszafogott, csendes hangulat, ami rovidebb kikapcsolodashoz es hosszabb piheneshez is jol mukodik.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A szolok kozotti kornyezet kulonosen jo hatasu, ha nem zsufolt nyaralos elmenyt keresel.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kellemes, csendes szallas, jo kiindulopont a kornyek bejarasahoz es esti piheneshez.",
        meta: "Vendeg · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Baratsagos, termeszetkozeli hely, ahol egyszeru kikapcsolni a napi temposabb ritmusbol.",
        meta: "Vendeg · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Csend ?? termeszetkozeli pihenes",
    title: "Elvonulas a szolok kozott",
    lead: "A Dandelion Szololiget a Balaton-felvidek csendesebb ritmusat hozza kozel, ahol a termeszet, a setak es a nyugodt estek ugyanolyan fontosak, mint maga a szallas."
  },
  details: {
    kicker: "Dandelion Szololiget",
    title: "Csendes vendeghaz a Balaton-felvidek nyugodt oldalan",
    shortDescription:
      "A Dandelion Szololiget jo valasztas, ha olyan vendeghazat keresel, ahol a szolok kozotti kornyezet, a visszafogott ritmus es a termeszetkozeli pihenes egyszerre van jelen.",
    longDescription: [
      "A Szololiget oldala a csendesebb, termeszetkozeli pihenesrol szol, ahol a taj, a szolosorok es a lassabb napi ritmus az elmeny termeszetes resze.",
      "Jo bazis lehet, ha a Balaton-felvideken setak, kisebb kirandulasok es nyugodt estek koze szervezned a pihenest, tavolabb a zsufoltabb nyari helyektol.",
      "A Dandelion vendeghazak kozott ez az egyik legvisszafogottabb, leginkabb elvonulasra hangolt valasztas, termeszetes kapcsolattal a tobbi kornyekbeli szallashoz."
    ],
    moreLabel: "Bovebben a Szololiget oldalrol",
    ctaLabel: "Reszletek es kapcsolat"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszin", "Balaton-felvidek"],
          ["Jelleg", "csendes, termeszetkozeli pihenes"],
          ["Hangulat", "szolok kozotti elvonulas"],
          ["Oldalallapot", "elso koros template-bekotes"]
        ]
      },
      {
        title: "Kikapcsolodas",
        items: [
          ["Fokusz", "lassabb napok es feltoltodes"],
          ["Kornyek", "setakhoz es kirandulasokhoz jo bazis"],
          ["Ritmus", "visszafogott es nyugodt"],
          ["Elmeny", "videki, termeszetkozeli jelenlet"]
        ]
      }
    ]
  },
  features: {
    title: "Miért lehet jo valasztas",
    highlights: [
      { label: "Termeszetkozeli hangulat", icon: "leaf" },
      { label: "Kirandulasokhoz jo bazis", icon: "trail" },
      { label: "Nyugodt ritmus", icon: "users" },
      { label: "Szolok kozotti kornyezet", icon: "grapes" },
      { label: "Balaton-felvideki elhelyezkedes", icon: "route" },
      { label: "Attekintheto szallasoldal", icon: "wifi" }
    ]
  },
  gallery: {
    kicker: "Galeria",
    title: "Nyolc pillanat a Szololiget hangulatabol",
    moreHint: "Tovabbi kepekert kattints",
    defaultHint: "A galeria kepei kattinthatok",
    emptyMessage: "A Szololiget galeriahoz jelenleg nincs feloldhato kep a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "BALATON-FELVIDEK · SZOLOK KOZOTT",
    title: "Kornyek es taj",
    body: "A Szololiget a Balaton-felvidek csendesebb oldalahoz kapcsolodik. Jo valasztas, ha a termeszetkozeli hangulat, a setak es a lassabb jelenlet fontosabb, mint a zsufoltabb nyaralasi ritmus.",
    benefitsAriaLabel: "Kornyek elonyei",
    benefits: [
      { label: "Szolok kozotti hangulat", icon: "grapes" },
      { label: "Kirandulasok a kozelben", icon: "trail" },
      { label: "Nyugodt videki ritmus", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Balaton-felvid%C3%A9k&z=11&output=embed",
    embedTitle: "Dandelion Szololiget kornyeke terkep"
  },
  lightbox: {
    galleryAriaLabel: "Szololiget galeria",
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
    intro: "Ha a szolok kozotti csend mellett mas Balaton-felvideki vagy Balaton kozeli vendeghazat is felfedeznel, nezd meg a tobbi Dandelion szallast is.",
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
        name: "Dandelion Koveskal",
        meta: "Kali-medence · nyugodt falusi hangulat",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: "/images/accommodations/koveskal/gallery/dandelion-koveskal-source-001.webp",
          alt: "Dandelion Koveskal kulso kep"
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

import type { AccommodationPageData } from "./types";

// [CHANGE 2026-05-06 20:00] Royal Homes SEO title, meta, headings and intro copy refined for production baseline.
export const royalHomesPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Royal Homes | Kenyelmes szallas Keszthelyen, a Balaton kozeleben",
    description: "Kenyelmes szallas Keszthelyen, a Balaton kozeleben, modern terekkel, nyugodt pihenessel es konnyu eleressel a part es a programok fele."
  },
  bookingLink: "/royal/",
  hero: {
    mobileImagePath: "/images/accommodations/royal_homes/gallery/dandelion-royal-homes-source-001.webp",
    fallbackAlt: "Dandelion Royal Homes kenyelmes szallas Keszthelyen, a Balaton kozeleben",
    kicker: "Keszthely ?? Balaton-part",
    title: "Dandelion",
    titleAccent: "Royal Homes",
    subtitle: "KENYELMES KIKAPCSOLODAS A BALATON KOZELEBEN",
    lead: "Kenyelmes, modern szallas azoknak, akik a Balaton kozeleben szeretnenek pihenni, es fontos nekik a letisztult, nyugodt kornyezet.",
    primaryCtaLabel: "Reszletek es kapcsolat",
    secondaryCtaLabel: "Kepek megtekintese"
  },
  reviews: {
    kicker: "Vendegertekelesek",
    title: "Vendegeink szerint",
    intro: "Elso koros, szerkesztheto review blokk a shared sablon technikai bekotesehez.",
    mobileSummaryLabel: "Tovabbi velemenyek",
    mobileHighlightedAriaLabel: "Kiemelt Google ertekeles",
    mobileMoreGoogleAriaLabel: "Tovabbi Google ertekelesek",
    mobileBookingAriaLabel: "Booking.com ertekelesek",
    items: [
      {
        source: "Google",
        quote: "Kenyelmes, rendezett hely, jo valasztas balatoni piheneshez es lassabb feltoltodeshez.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Modern, tiszta kornyezet, ami rovidebb kikapcsolodashoz es hosszabb piheneshez is jol mukodik.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A Balaton kozelsege es a kenyelmes terek egyutt nagyon jo alapot adnak a piheneshez.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kellemes, igenyes szallas, jo bazis a kornyek felfedezesehez es esti piheneshez.",
        meta: "Vendeg · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Nyugodt, atgondolt hely, ahol egyszeru kicsit kiszakadni a napi ritmusbol.",
        meta: "Vendeg · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Balaton kozeli jelenlet ?? kenyelmes pihenes",
    title: "Balaton kozeli pihenes Keszthelyen",
    lead: "A Dandelion Royal Homes letisztult, kenyelmes bazist ad Keszthelyen, ha a part kozelseget, a nyugodt esteket es a konnyen szervezheto balatoni programokat keresed."
  },
  details: {
    kicker: "Dandelion Royal Homes",
    title: "Modern, kenyelmes szallas a Balaton-part kozeleben",
    shortDescription:
      "A Royal Homes jo valasztas, ha Keszthelyen keresel rendezett, kenyelmes szallast, ahonnan a Balaton-part, a setanyok es a kornyek programjai is konnyen elerhetok.",
    longDescription: [
      "A Royal Homes a Balaton kozeli, kenyelmesebb kikapcsolodashoz kapcsolodik, ahol a vizparti programok es a nyugodt pihenes egyensulyban maradnak.",
      "Keszthely jo kiindulopont strandhoz, setahoz, vacsorahoz vagy nyari kiruccanasokhoz, mikozben este egy csendesebb, atgondolt szallasra erhetsz vissza.",
      "A Dandelion vendeghazak kozott ez az oldal a Balaton melletti, modernebb hangulatot kepviseli, termeszetes kapcsolattal a tobbi balatoni-felvideki szallashoz."
    ],
    moreLabel: "Bovebben a Royal Homes oldalrol",
    ctaLabel: "Reszletek es kapcsolat"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszin", "Keszthely"],
          ["Jelleg", "kenyelmes, Balaton kozeli pihenes"],
          ["Hangulat", "letisztult es nyugodt"],
          ["Oldalallapot", "elso koros template-bekotes"]
        ]
      },
      {
        title: "Kikapcsolodas",
        items: [
          ["Fokusz", "lazabb napok es feltoltodes"],
          ["Kornyek", "Balaton-part kozeli bazis"],
          ["Ritmus", "kenyelmesebb es visszafogott"],
          ["Elmeny", "modern, rendezett jelenlet"]
        ]
      }
    ]
  },
  features: {
    title: "Miert lehet jo valasztas",
    highlights: [
      { label: "Balaton kozeli elhelyezkedes", icon: "route" },
      { label: "Kenyelmes pihenes", icon: "users" },
      { label: "Atgondolt, rendezett terek", icon: "wifi" },
      { label: "Lazabb nyaralasi ritmus", icon: "leaf" },
      { label: "Kirandulasokhoz jo bazis", icon: "trail" },
      { label: "Balaton-parti hangulat", icon: "mountain" }
    ]
  },
  gallery: {
    kicker: "Galeria",
    title: "Nyolc pillanat a Royal Homes hangulatabol",
    moreHint: "Tovabbi kepekert kattints",
    defaultHint: "A galeria kepei kattinthatok",
    emptyMessage: "A Royal Homes galeriahoz jelenleg nincs feloldhato kep a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "KESZTHELY · BALATON-KOZELI PIHENES",
    title: "Kornyek es taj",
    body: "A Royal Homes Keszthelyhez es a Balaton-part kozeli, kenyelmesebb kikapcsolodashoz kapcsolodik. Jo valasztas, ha a viz kozelsege es a nyugodtabb pihenes egyszerre fontos.",
    benefitsAriaLabel: "Kornyek elonyei",
    benefits: [
      { label: "Balaton-part kozeli hangulat", icon: "route" },
      { label: "Varosi es kirandulos programok", icon: "trail" },
      { label: "Kenyelmesebb, lazabb ritmus", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Keszthely&z=13&output=embed",
    embedTitle: "Dandelion Royal Homes kornyeke terkep"
  },
  lightbox: {
    galleryAriaLabel: "Royal Homes galeria",
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
    intro: "Ha a Balaton melletti pihenes utan a Balaton-felvidek csendesebb vendeghazai is erdekelnek, nezd meg a tobbi Dandelion szallast is.",
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
        name: "Szololiget Vendeghaz",
        meta: "elvonulas a szolok kozott",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
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
      }
    ]
  }
};

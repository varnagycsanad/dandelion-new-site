// [CHANGE 2026-05-06 00:00] Dandelion Vintage shared accommodation page data added.
import type { AccommodationPageData } from "./types";

export const vintagePageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Vintage | Dandelion Vendeghazak",
    description: "Dandelion Vintage kulon oldal a Tapolcai-medencehez es a nyugodt, termeszetkozeli piheneshez kotott shared template bekotesekent."
  },
  bookingLink: "/dandelion-vintage/",
  hero: {
    mobileImagePath: "/images/accommodations/vintage/gallery/dandelion-vintage-source-001.webp",
    fallbackAlt: "Dandelion Vintage",
    kicker: "Tapolcai-medence - Balaton-felvidek",
    title: "Dandelion",
    titleAccent: "Vintage",
    subtitle: "OTTHONOS PIHENES A TAPOLCAI-MEDENCEBEN",
    lead: "Visszafogott, otthonos szallas azoknak, akik termeszetkozeli nyugalmat, lassabb napokat es balatoni-felvideki hangulatot keresnek.",
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
        quote: "Otthonos, nyugodt hely, jo valasztas, ha a Tapolcai-medence lassabb ritmusat keresed.",
        meta: "Vendeg - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Kellemes, visszafogott hangulat, ahol konnyu lelassulni es feltoltodni.",
        meta: "Vendeg - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Termeszetkozeli piheneshez es kirandulos napokhoz is jo bazisnak tunt.",
        meta: "Vendeg - Google - 5/5"
      },
      {
        source: "Booking.com",
        quote: "Baratsagos, kenyelmes szallas, jo kiindulopont a kornyek felfedezesehez.",
        meta: "Vendeg - Booking.com - 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Nyugodt, otthonos hely, ahova jo visszaerni egy kirandulos nap utan.",
        meta: "Vendeg - Booking.com - 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Tapolcai-medence - termeszetkozeli jelenlet",
    title: "Otthonos ritmus, visszafogott balatoni-felvideki hangulat",
    lead: "A Dandelion Vintage elso korben a shared accommodation sablonra kotott oldal, kulon adatfajllal es a meglevo vintage image registry bekotesevel."
  },
  details: {
    kicker: "Dandelion Vintage",
    title: "Elso koros, shared sablonra kotott szallasoldal",
    shortDescription:
      "Ez a verzio elsosorban technikai bekotes: a kozos accommodation sablonra ulteti ra a Vintage oldalt, semleges, kesobb pontosithato tartalommal.",
    longDescription: [
      "A Dandelion Vintage hangulata az otthonos, termeszetkozeli piheneshez kapcsolodik, ahol a Tapolcai-medence csendesebb ritmusa es a balatoni-felvideki kornyezet egyszerre fontos.",
      "Az oldal ezen a koren meg nem vegleges marketing szoveggel fut, hanem szerkesztheto, visszafogott copyval, hogy a shared template bekotese stabil maradjon.",
      "A kovetkezo korben a pontos felszereltseg, a valodi vendegertekelesek es a helyspecifikusabb szovegek finomithatok ugyanebben a rendszerben."
    ],
    moreLabel: "Bovebben a Vintage oldalrol",
    ctaLabel: "Reszletek es kapcsolat"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Regio", "Tapolcai-medence"],
          ["Jelleg", "otthonos, termeszetkozeli pihenes"],
          ["Hangulat", "vintage es visszafogott"],
          ["Oldalallapot", "elso koros template-bekotes"]
        ]
      },
      {
        title: "Kikapcsolodas",
        items: [
          ["Fokusz", "lassabb napok es feltoltodes"],
          ["Kornyek", "Balaton-felvidek es kirandulasok"],
          ["Ritmus", "nyugodt, otthonos bazis"],
          ["Elmeny", "videki pihenes"]
        ]
      }
    ]
  },
  features: {
    title: "Miert lehet jo valasztas",
    highlights: [
      { label: "Tapolcai-medencei kornyezet", icon: "route" },
      { label: "Otthonos hangulat", icon: "users" },
      { label: "Termeszetkozeli pihenes", icon: "leaf" },
      { label: "Kirandulasokhoz jo bazis", icon: "trail" },
      { label: "Balaton-felvideki jelenlet", icon: "mountain" },
      { label: "Attekintheto szallasoldal", icon: "wifi" }
    ]
  },
  gallery: {
    kicker: "Galeria",
    title: "Nyolc pillanat a Vintage hangulatabol",
    moreHint: "Tovabbi kepekert kattints",
    defaultHint: "A galeria kepei kattinthatok",
    emptyMessage: "A Vintage galeriahoz jelenleg nincs feloldhato kep a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "TAPOLCAI-MEDENCE - BALATON-FELVIDEK",
    title: "Kornyek es taj",
    body: "A Dandelion Vintage a Tapolcai-medence termeszetkozeli, lassabb ritmusahoz kapcsolodik. Jo valasztas, ha a kirandulasok, a videki nyugalom es a Balaton-felvideki jelenlet egyszerre fontos.",
    benefitsAriaLabel: "Kornyek elonyei",
    benefits: [
      { label: "Tapolcai-medencei hangulat", icon: "route" },
      { label: "Kirandulos programok a kozelben", icon: "trail" },
      { label: "Nyugodt videki pihenes", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Tapolcai-medence&z=11&output=embed",
    embedTitle: "Dandelion Vintage kornyeke terkep"
  },
  lightbox: {
    galleryAriaLabel: "Vintage galeria",
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
    intro: "Ha mas hangulatot keresel, nezd meg a tobbi vendeghazunkat is.",
    items: [
      {
        name: "Dandelion D2",
        meta: "4-6 fo - kert - csaladbarat",
        href: "/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image"
        }
      },
      {
        name: "Fugehaz",
        meta: "2-4 fo - panorama - dezsa",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion Szololiget",
        meta: "elvonulas a szolok kozott",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
        }
      },
      {
        name: "Dandelion Zsalya",
        meta: "csendes, termeszetkozeli pihenes",
        href: "/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image"
        }
      },
      {
        name: "Dandelion Koveskal",
        meta: "Kali-medence - nyugodt falusi hangulat",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: "/images/accommodations/koveskal/gallery/dandelion-koveskal-source-001.webp",
          alt: "Dandelion Koveskal kulso kep"
        }
      }
    ]
  }
};

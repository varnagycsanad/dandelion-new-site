// [CHANGE 2026-05-06 00:00] Szepvolgyi Vendeghaz shared accommodation page data added.
import type { AccommodationPageData } from "./types";

export const szepvolgyiPageData: AccommodationPageData = {
  seo: {
    title: "Szepvolgyi Vendeghaz | Dandelion Vendeghazak",
    description: "Szepvolgyi Vendeghaz kulon oldal a Badacsonyorshoz es a Balaton kozeli, nyugodt piheneshez kotott shared template bekotesekent."
  },
  bookingLink: "/szepvolgyi/",
  hero: {
    mobileImagePath: "/images/accommodations/szepvolgyi/gallery/dandelion-szepvolgyi-source-001.webp",
    fallbackAlt: "Szepvolgyi Vendeghaz",
    kicker: "Badacsonyors - Balaton kozeleben",
    title: "Szepvolgyi",
    titleAccent: "Vendeghaz",
    subtitle: "NYUGODT PIHENES BADACSONYORS KOZELEBEN",
    lead: "Tagas, nyugodt vendeghaz azoknak, akik Balaton kozeli bazist, nagyobb tereket es visszafogott pihenest keresnek.",
    primaryCtaLabel: "Arak es foglalas",
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
        quote: "Nyugodt, tagas hely, jo valasztas balatoni piheneshez es kirandulos napokhoz.",
        meta: "Vendeg - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Kellemes balatoni-felvideki hangulat, ahol egyszeru lelassulni es feltoltodni.",
        meta: "Vendeg - Google - 5/5"
      },
      {
        source: "Google",
        quote: "A nagyobb terek es a csendesebb kornyezet jol mukodnek csaladi vagy barati piheneshez.",
        meta: "Vendeg - Google - 5/5"
      },
      {
        source: "Booking.com",
        quote: "Jo kiindulopont a Balaton es Badacsony kornyeken, nyugodt esti pihenessel.",
        meta: "Vendeg - Booking.com - 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Baratsagos, kenyelmes szallas, ahol a balatoni programok utan jo visszaterni.",
        meta: "Vendeg - Booking.com - 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Balaton kozel - nagyobb terek",
    title: "Nyugodt bazis Badacsonyorson",
    lead: "A Szepvolgyi Vendeghaz elso korben a shared accommodation sablonra kotott oldal, visszafogott tartalommal es kesobbi finomitasra alkalmas szerkezettel."
  },
  details: {
    kicker: "Szepvolgyi Vendeghaz",
    title: "Elso koros, shared sablonra kotott szallasoldal",
    shortDescription:
      "Ez a verzio elsosorban technikai bekotes: a kozos accommodation sablonra ulteti ra a Szepvolgyi oldalt, semleges, kesobb pontosithato tartalommal.",
    longDescription: [
      "A Szepvolgyi Vendeghaz Badacsonyorshoz es a Balaton kozeli piheneshez kapcsolodik, ahol a nagyobb terek es a nyugodtabb ritmus egyutt adnak kenyelmes alapot.",
      "Az oldal ezen a koren meg nem vegleges marketing szoveggel fut, hanem szerkesztheto, visszafogott copyval, hogy a shared template bekotese stabil maradjon.",
      "A kovetkezo korben a pontos felszereltseg, a valodi vendegertekelesek es a helyspecifikusabb szovegek finomithatok ugyanebben a rendszerben."
    ],
    moreLabel: "Bovebben a Szepvolgyi oldalrol",
    ctaLabel: "Arak es foglalas"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszin", "Badacsonyors"],
          ["Jelleg", "Balaton kozeli vendeghaz"],
          ["Hangulat", "tagas es nyugodt"],
          ["Oldalallapot", "elso koros template-bekotes"]
        ]
      },
      {
        title: "Kikapcsolodas",
        items: [
          ["Fokusz", "csaladi es barati pihenes"],
          ["Kornyek", "Balaton es Badacsony kozeleben"],
          ["Ritmus", "nyugodt, kenyelmes bazis"],
          ["Elmeny", "nagyobb terek es kertkozeli hangulat"]
        ]
      }
    ]
  },
  features: {
    title: "Miert lehet jo valasztas",
    highlights: [
      { label: "Balaton kozeli elhelyezkedes", icon: "route" },
      { label: "Badacsonyors kornyeke", icon: "mountain" },
      { label: "Nagyobb terek", icon: "users" },
      { label: "Nyugodt pihenes", icon: "leaf" },
      { label: "Kirandulasokhoz jo bazis", icon: "trail" },
      { label: "Attekintheto szallasoldal", icon: "wifi" }
    ]
  },
  gallery: {
    kicker: "Galeria",
    title: "Nyolc pillanat a Szepvolgyi hangulatabol",
    moreHint: "Tovabbi kepekert kattints",
    defaultHint: "A galeria kepei kattinthatok",
    emptyMessage: "A Szepvolgyi galeriahoz jelenleg nincs feloldhato kep a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "BADACSONYORS - BALATON KOZELEBEN",
    title: "Kornyek es taj",
    body: "A Szepvolgyi Vendeghaz Badacsonyorshoz es a Balaton kozeli piheneshez kapcsolodik. Jo valasztas, ha a strand, Badacsony es a Tapolcai-medence programjai is fontosak.",
    benefitsAriaLabel: "Kornyek elonyei",
    benefits: [
      { label: "Balaton kozeli hangulat", icon: "route" },
      { label: "Badacsony es kirandulasok", icon: "trail" },
      { label: "Nyugodtabb videki bazis", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Badacsony%C3%B6rs&z=13&output=embed",
    embedTitle: "Szepvolgyi Vendeghaz kornyeke terkep"
  },
  lightbox: {
    galleryAriaLabel: "Szepvolgyi galeria",
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
        name: "Dandelion Koveskal",
        meta: "Kali-medence - nyugodt falusi hangulat",
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

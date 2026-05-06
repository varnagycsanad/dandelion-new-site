// [CHANGE 2026-05-06 00:00] Szepvolgyi Vendeghaz shared accommodation page data added.
import type { AccommodationPageData } from "./types";

// [CHANGE 2026-05-06 20:00] Szepvolgyi SEO title, meta, headings and intro copy refined for production baseline.
export const szepvolgyiPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Szepvolgyi | Tagas vendeghaz Badacsonyorson",
    description: "Tagas vendeghaz Badacsonyorson, a Balaton kozeleben, nyugodt pihenessel, nagyobb terekkel es konnyu eleressel Badacsony fele."
  },
  bookingLink: "/szepvolgyi/",
  hero: {
    mobileImagePath: "/images/accommodations/szepvolgyi/gallery/dandelion-szepvolgyi-source-001.webp",
    fallbackAlt: "Dandelion Szepvolgyi vendeghaz Badacsonyorson, a Balaton kozeleben",
    kicker: "Badacsonyors - Balaton kozeleben",
    title: "Dandelion",
    titleAccent: "Szepvolgyi",
    subtitle: "NYUGODT PIHENES BADACSONYORS KOZELEBEN",
    lead: "Tagas vendeghaz azoknak, akik Badacsonyorson, a Balaton kozeleben keresnek nyugodt bazist csaladi vagy barati piheneshez.",
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
    title: "Tagas pihenes Badacsonyorson",
    lead: "A Dandelion Szepvolgyi kenyelmes, nagyobb terekkel varja azokat, akik a Balaton kozelseget, Badacsony programjait es a nyugodt esti visszaerkezest egyszerre keresik."
  },
  details: {
    kicker: "Szepvolgyi Vendeghaz",
    title: "Balaton kozeli vendeghaz csaladi es barati napokhoz",
    shortDescription:
      "A Dandelion Szepvolgyi jo valasztas, ha Badacsonyorson keresel tagas vendeghazat, ahonnan a Balaton-part, Badacsony es a Tapolcai-medence is konnyen elerheto.",
    longDescription: [
      "A Szepvolgyi Badacsonyorshoz es a Balaton kozeli piheneshez kapcsolodik, ahol a nagyobb terek es a nyugodtabb ritmus egyutt adnak kenyelmes alapot.",
      "Jo bazis lehet strandhoz, badacsonyi kiruccanashoz vagy ahhoz is, hogy napkozben a Tapolcai-medence programjait jarjatok vegig, estere pedig visszaterjetek egy csendes vendeghazba.",
      "A Dandelion szallasok kozott ez a haz a tagasabb, csaladi vagy barati jelenletre hangolt valasztas, termeszetes kapcsolattal a tobbi Balaton-felvideki helyszinhez."
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
    intro: "Ha Badacsonyors utan a Balaton-felvidek mas vendeghazait is felfedezned, nezd meg a tobbi Dandelion szallast is.",
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

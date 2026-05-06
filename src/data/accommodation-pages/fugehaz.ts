import type { AccommodationPageData } from "./types";

// [CHANGE 2026-05-06 20:00] Fugehaz SEO title, meta, headings and intro copy refined for production baseline.
export const fugehazPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Fugehaz | Panoramas vendeghaz a Balaton-felvideken",
    description: "Panoramas vendeghaz a Balaton-felvideken, terasszal, nyugodt kornyezettel es termeszetkozeli pihenessel a tanuhegyek kozeleben."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f",
  hero: {
    mobileImagePath: "/images/accommodations/fugehaz/gallery/dandelion-fugehaz-source-001.webp",
    fallbackAlt: "Dandelion Fugehaz panoramas vendeghaz a Balaton-felvideken",
    kicker: "Balaton-felvidek ?? panoramas nyugalom",
    title: "Dandelion",
    titleAccent: "Fugehaz",
    subtitle: "PANORAMAS PIHENES A TANUHEGYEK KOZELEBEN",
    lead: "Panoramas vendeghaz azoknak, akik a Balaton-felvidek csendesebb oldalat, a teraszt es a lassabb, termeszetkozeli pihenest keresik.",
    primaryCtaLabel: "Arak es foglalas",
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
        quote: "Nyugodt, atgondolt hely azoknak, akik panoramaval es lassabb napokkal szeretnenek kikapcsolodni.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Hangulatos terasz, visszafogott videki ritmus es kenyelmes pihenes a Balaton-felvideken.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Jo valasztas, ha termeszetkozelben szeretnel megszallni, tulzsufolt nyaralos hangulat nelkul.",
        meta: "Vendeg · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kellemes, csendes szallas, jo kiindulopont a kornyek bejarasahoz es esti piheneshez.",
        meta: "Vendeg · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Baratsagos, nyugodt hangulat, kenyelmes napokhoz es lassabb balatoni-felvideki programokhoz.",
        meta: "Vendeg · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Panorama ?? nyugalom",
    title: "Panoramas pihenes a tanuhegyek kozeleben",
    lead: "A Dandelion Fugehaz terasszal, nyugodt ritmussal es termeszetkozeli hangulattal ad bazist a Balaton-felvideki setakhoz, borozasokhoz es lassabb napokhoz."
  },
  details: {
    kicker: "Fugehaz",
    title: "Nyugodt vendeghaz terasszal es Balaton-felvideki panoramaval",
    shortDescription:
      "A Dandelion Fugehaz olyan vendeghaz, ahol a kilatas, a csendes terasz es a termeszetkozeli kornyezet ugyanolyan fontos, mint maga a pihenes.",
    longDescription: [
      "A Fugehaz a Balaton-felvidek nyugodtabb, panoramas pihenesehez kapcsolodik, ahol a termeszet es a lassabb napi ritmus az elmeny szerves resze.",
      "Jo valasztas, ha olyan vendeghazat keresel, ahonnan konnyen elerheted a tanuhegyeket, a kilatopontokat es a kornyek boraszatait, mikozben estere visszaterhetsz a csendes teraszra.",
      "A Dandelion szallasok kozott a Fugehaz a visszafogott, termeszetre hangolt pihenes oldalat kepviseli, es jol kapcsolhato a kozeli Balaton-felvideki programokhoz is."
    ],
    moreLabel: "Bovebben a Fugehaz oldalrol",
    ctaLabel: "Arak es foglalas"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszin", "Balaton-felvidek"],
          ["Jelleg", "panoramas, nyugodt pihenes"],
          ["Hangulat", "termeszetkozeli es visszafogott"],
          ["Oldalallapot", "elso koros template-bekotes"]
        ]
      },
      {
        title: "Kikapcsolodas",
        items: [
          ["Fokusz", "lassabb napok es feltoltodes"],
          ["Kornyek", "kirandulasokhoz jo bazis"],
          ["Pihenes", "teraszos, panoramas hangulat"],
          ["Tempo", "csendesebb, nyugodt"]
        ]
      }
    ]
  },
  features: {
    title: "Miért lehet jo valasztas",
    highlights: [
      { label: "Panoramas hangulat", icon: "mountain" },
      { label: "Termeszetkozeli pihenes", icon: "leaf" },
      { label: "Kirandulasokhoz jo bazis", icon: "trail" },
      { label: "Nyugodt ritmus", icon: "users" },
      { label: "Balaton-felvideki kornyezet", icon: "route" },
      { label: "Attekintheto szallasoldal", icon: "wifi" }
    ]
  },
  gallery: {
    kicker: "Galeria",
    title: "Nyolc pillanat a Fugehaz hangulatabol",
    moreHint: "Tovabbi kepekert kattints",
    defaultHint: "A galeria kepei kattinthatok",
    emptyMessage: "A Fugehaz galeriahoz jelenleg nincs feloldhato kep a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "BALATON-FELVIDEK · PANORAMAS PIHENES",
    title: "Kornyek es taj",
    body: "A Fugehaz a Balaton-felvidek nyugodtabb, termeszetkozeli hangulatahoz kapcsolodik. A kornyek jo valasztas lassabb piheneshez, setakhoz es kilatopontos kirandulasokhoz.",
    benefitsAriaLabel: "Kornyek elonyei",
    benefits: [
      { label: "Panoramas kornyezet", icon: "mountain" },
      { label: "Kirandulasok a kozelben", icon: "trail" },
      { label: "Nyugodt balatoni-felvideki ritmus", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Fugehaz kornyeke terkep"
  },
  lightbox: {
    galleryAriaLabel: "Fugehaz galeria",
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
    intro: "Ha a panoramas Balaton-felvideki pihenes mellett mas Dandelion hangulat is erdekel, nezd meg a tobbi vendeghazunkat is.",
    items: [
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

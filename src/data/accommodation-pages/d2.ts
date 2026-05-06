import type { AccommodationPageData } from "./types";

// [CHANGE 2026-05-06 20:00] D2 SEO title, meta, headings and intro copy refined for production baseline.
export const d2PageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 | Vendeghaz Kisapatiban, a Szent Gyorgy-hegy labanal",
    description: "Csaladbarat vendeghaz Kisapatiban, a Szent Gyorgy-hegy labanal, terasszal, kerttel es nyugodt Balaton-felvideki hangulattal."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f",
  hero: {
    mobileImagePath: "/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-mobile-01.webp",
    fallbackAlt: "Dandelion D2 vendeghaz kerttel a Szent Gyorgy-hegy labanal",
    kicker: "Balaton-felvidek ?? Szent Gyorgy-hegy",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "KERTES HAZ A SZENT GYORGY-HEGY LABANAL",
    lead: "Csaladbarat vendeghaz 4-6 fonak Kisapatiban, sajat kerttel, terasszal es nyugodt Balaton-felvideki kornyezettel.",
    primaryCtaLabel: "Arak es foglalas",
    secondaryCtaLabel: "Kepek megtekintese"
  },
  reviews: {
    kicker: "Vendégértékelések",
    title: "Vendégeink szerint",
    intro: "Valódi vendégértékelések Google és Booking.com forrásból",
    mobileSummaryLabel: "További vélemények",
    mobileHighlightedAriaLabel: "Kiemelt Google értékelés",
    mobileMoreGoogleAriaLabel: "További Google értékelések",
    mobileBookingAriaLabel: "Booking.com értékelések",
    items: [
      {
        source: "Google",
        quote: "„Idilli környezet, kedves házigazdák, sok hely a gyerekeknek és nyugodt, szerethető hangulat.”",
        meta: "Vanessa L. · Google · 5/5"
      },
      {
        source: "Google",
        quote: "„A ház minden igényt kielégít, és jó szívvel ajánlom annak, aki pár napra elvonulna.”",
        meta: "Ildikó Barna · Google · 5/5"
      },
      {
        source: "Google",
        quote: "„Szép, rendezett hely, csendes környezet és gördülékeny érkezés. Kifejezetten jó pihenéshez.”",
        meta: "Eszter K. · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "„Abszolút pozitív élmény, gyors válaszokkal és nagyon segítőkész házigazdákkal.”",
        meta: "Bernadett · Booking.com · 10/10"
      },
      {
        source: "Booking.com",
        quote: "„Tökéletes pihentető napokhoz: csendes hely, barátságos házigazdák és kényelmes szállás.”",
        meta: "Angelika · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Nyugalom ?? csaladbarat pihenes",
    title: "Csaladbarat pihenes a Balaton-felvideken",
    lead: "A Dandelion D2 vilagos, kenyelmes terekkel, sajat kerttel es terasszal ad nyugodt bazist a Szent Gyorgy-hegy, Badacsony es a Balaton-felvidek felfedezesehez."
  },
  details: {
    kicker: "Dandelion D2",
    title: "Tagas vendeghaz kerttel es kenyelmes csaladi elrendezessel",
    shortDescription:
      "A Dandelion D2 Kisapatiban, a Szent Gyorgy-hegy labanal var csaladokat es kisebb barati tarsasagokat. A sajat kert, a terasz es a praktikus belso terek lassabb, kenyelmes pihenest adnak.",
    longDescription: [
      "A D2 Kisapatiban, a Szent Gyorgy-hegy labanal ad nyugodt, jol szervezheto bazist a Balaton-felvideki napokhoz, turakhoz es csaladi kikapcsolodashoz.",
      "A haz 4 fonek kenyelmes, a kihuzhato kanapeval pedig akar 6 fonek is jo valasztas. A nappali, a konyha es az etkezo egy vilagos, otthonos terben kapcsolodik ossze.",
      "A terasz es a kertkapcsolat kulonosen jo lassu reggelekhez, esti beszelgetesekhez es ahhoz a termeszetkozeli ritmushoz, ami miatt sokan a Balaton-felvideket keresik.",
      "Badacsony, a Balaton partja es a kornyek vendeghazai is konnyen elerhetok, igy a Dandelion D2 onallo piheneshez es tobb hazat osszekoto csaladi nyaralashoz is jo bazis lehet."
    ],
    moreLabel: "Bovebben a D2-rol",
    ctaLabel: "Arak es foglalas"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Férőhely", "4–6 fő"],
          ["Méret", "65 m²"],
          ["Ágyak", "1 franciaágy, 2 szimpla ágy, 1 kihúzható kanapé"],
          ["Parkolás", "ingyenes udvari parkolás"]
        ]
      },
      {
        title: "Kényelem",
        items: [
          ["Wifi", "Gigabites Wi-Fi"],
          ["Konyha", "jól felszerelt"],
          ["Fürdő", "kényelmes, családbarát"],
          ["Jelleg", "családbarát pihenés"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Gigabites Wi-Fi", icon: "wifi" },
      { label: "Jól felszerelt konyha", icon: "utensils" },
      { label: "Kényelmes fürdő", icon: "shower" },
      { label: "Saját parkolás", icon: "car" },
      { label: "Családbarát elrendezés", icon: "users" },
      { label: "Nyugodt kertkapcsolat", icon: "leaf" }
    ]
  },
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat a D2 hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A D2 galériához jelenleg nincs feloldható kép.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY-HEGY · KISAPÁTI",
    title: "D2 környéke",
    body: "A Dandelion D2 a Szent György-hegy lábánál, Kisapátiban van. Onnan könnyen elérhető a Tapolcai-medence, Badacsony és a Balaton-felvidék csendesebb része.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Túrák a közelben", icon: "trail" },
      { label: "Borvidék és szőlőhegyek", icon: "grapes" },
      { label: "Balaton rövid autózással", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps/d/u/0/embed?mid=1YRCy3UzpGcrJ6YJ4ihdVcluhJWtisVk&ehbc=2E312F",
    embedTitle: "Dandelion D2 környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "D2 galéria",
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
    intro: "Ha a Szent Gyorgy-hegy kornyeke utan mas Balaton-felvideki hangulatot is felfedeznel, nezd meg a tobbi Dandelion vendeghazat is.",
    items: [
      {
        name: "Fügeház",
        meta: "2–4 fő · panoráma · dézsa",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6–8 fő · nagy kert · családoknak",
        href: "https://dandelionhouse.hu/dandelion-d1/",
        image: {
          type: "mapping",
          slot: "d1_card_image"
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
        name: "Dandelion Köveskál",
        meta: "Káli-medence · nyugodt falusi hangulat",
        href: "https://dandelionhouse.hu/koveskal/",
        image: {
          type: "direct",
          src: "/images/accommodations/koveskal/gallery/dandelion-koveskal-source-001.webp",
          alt: "Dandelion Köveskál vendégház külső képe"
        }
      }
    ]
  }
};

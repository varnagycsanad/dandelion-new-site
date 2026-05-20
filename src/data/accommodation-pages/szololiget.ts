import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-06 22:20] Szololiget page copy rebuilt with natural Hungarian accommodation content and shared template structure preserved.
// [CHANGE 2026-05-16 18:35] Szőlőliget megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const szololigetPageData: AccommodationPageData = {
  seo: {
    title: "Szőlőliget Vendégház Kisapáti | Panorámás pihenés",
    description:
      "Csendes, különálló vendégház Kisapátiban 4 főre, nagy terasszal, 180 fokos tanúhegy panorámával és napfelkeltével, csendes hegyoldali környezetben."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=e30c4b62d7324b3f&lang=Hu",
  positioning: {
    shortCharacter: "Teraszos, természetközeli ház csendesebb pihenéshez.",
    goodFor: ["családoknak", "pároknak", "elvonulós pihenéshez", "Balaton-felvidéki kirándulásokhoz"],
    strengths: ["nagy terasz", "wifi", "légkondi", "ingyenes parkolás", "önálló ház jelleg"],
    keyFacts: [
      "férőhely: 4 fő",
      "fürdőszoba: 1",
      "ágyelrendezés: 1 franciaágy + 1 kihúzható kanapé",
      "kisállat: nem engedélyezett",
      "wifi: van",
      "parkolás: ingyenes",
      "légkondi: van",
      "medence: nincs",
      "booking státusz: online foglalási link van"
    ],
    betterAlternativeNote: "ha több fürdőszobás elrendezést kerestek."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "szololiget",
      "gallery",
      "dandelion-szololiget-source-001.webp",
      "szololiget mobile hero"
    ),
    fallbackAlt: "Szőlőliget Vendégház a Szent György-hegy keleti oldalán, panorámás környezetben",
    kicker: "Kisapáti - Szent György-hegy keleti oldala",
    title: "Szőlőliget",
    titleAccent: "Vendégház",
    subtitle: "CSENDES, KÜLÖNÁLLÓ HÁZ PANORÁMÁVAL",
    lead: "Különálló, csendes ház a Szent György-hegy keleti oldalán, nagy terasszal és erős panorámával a teljes elvonuláshoz.",
    primaryCtaLabel: "Részletek és kapcsolat",
    secondaryCtaLabel: "Képek megtekintése"
  },
  reviews: {
    kicker: "Vendégértékelések",
    title: "Vendégeink szerint",
    intro: "Első körös, szerkeszthető review blokk a shared sablon technikai bekötéséhez.",
    mobileSummaryLabel: "További vélemények",
    mobileHighlightedAriaLabel: "Kiemelt Google értékelés",
    mobileMoreGoogleAriaLabel: "További Google értékelések",
    mobileBookingAriaLabel: "Booking.com értékelések",
    items: [
      {
        source: "Google",
        quote: "Kivételesen csendes hely, gyönyörű panorámával és olyan reggelekkel, amelyekhez tényleg jó lassan felébredni.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A terasz és a környező hegyek látványa különösen emlékezetes, a ház hangulata pedig nyugodt és szerethető.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Jó választás, ha valaki elvonulna kicsit a zajtól, mégis közel maradna a Balaton-felvidék programjaihoz.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kényelmes, különálló ház, szép kilátással és jó kiindulóponttal túrákhoz, borászatokhoz és balatoni napokhoz.",
        meta: "Vendég · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "A csend, a terasz és a napfelkelte együtt nagyon erős élményt ad, különösen azoknak, akik lassabb pihenést keresnek.",
        meta: "Vendég · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Napfelkelte - panoráma - csend",
    title: "Elvonulás a hegyoldalban, távol a zajtól",
    lead: "A Szőlőliget azoknak jó választás, akik nem csak megszállni szeretnének, hanem tényleg kiszakadni a zajból néhány napra."
  },
  details: {
    kicker: "Szőlőliget Vendégház",
    title: "Kétszintes kis ház hatalmas terasszal és 180°-os panorámával",
    shortDescription:
      "2022-ben felújított, kétszintes ház 4 főre, nagy körbejárható terasszal és 180°-os tanúhegy panorámával.",
    longDescription: [
      "A Szőlőliget egyik legerősebb élménye a reggel: az ágyból látható napfelkelte és a ház körüli csend rögtön belassítja az itt töltött napokat.",
      "A házat 2022-ben újítottuk fel, és vadonatúj bútorokkal rendeztük be. A kétszintes, szintenként körülbelül 20 m²-es kis ház 4 fő részére kényelmes, egy pótággyal pedig tovább bővíthető. Ideális választás családoknak, kirándulóknak, bortúrára érkezőknek vagy balatoni nyaraláshoz is.",
      "Az alsó szinthez hatalmas, körbejárható terasz kapcsolódik, ahonnan 180°-os panoráma nyílik a környező tanúhegyekre. A Csobánc, a Tóti-hegy és a Gulács innen különösen szép arcát mutatja, a kilátás pedig minden napszakban más hangulatot ad a háznak.",
      "A Szőlőliget egyik legnagyobb értéke a csend és a tér. Nincs zsúfolt környezet, nincs városi nyüzsgés: csak a hegyoldal, a szőlők, a nagy terasz és a panoráma. Reggeli kávéhoz, lassú délutánokhoz és csillagos estékhez is erős helyszín.",
      "A háztól a Szent György-hegy túraútvonalai könnyen elérhetők. A Bazaltorgonák felé vezető út nagyjából félórás túrával megközelíthető, a környék pedig bőven ad programot: kirándulás, borászatok, tanúhegyek, Badacsony, Szigliget és balatoni programok is rövid autóúttal elérhetők."
    ],
    moreLabel: "Bővebben a Szőlőligetről",
    ctaLabel: "Részletek és kapcsolat"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Férőhely", "4 fő + 1 pótágy"],
          ["Jelleg", "különálló, kétszintes ház"],
          ["Felújítás", "2022-ben megújítva, új bútorokkal"],
          ["Elhelyezkedés", "Szent György-hegy keleti oldala"]
        ]
      },
      {
        title: "Kiemelt élmények",
        items: [
          ["Panoráma", "180°-os kilátás a tanúhegyekre"],
          ["Terasz", "nagy, körbejárható terasz"],
          ["Reggel", "napfelkelte az ágyból"],
          ["Programok", "Bazaltorgonák, bortúrák, Balaton rövid úttal"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Különálló vendégház", icon: "home" },
      { label: "4 fő + pótágy", icon: "users" },
      { label: "180°-os tanúhegy panoráma", icon: "mountain" },
      { label: "Nagy, körbejárható terasz", icon: "leaf" },
      { label: "Napfelkelte az ágyból", icon: "sun" },
      { label: "Kirándulásokhoz és bortúrához ideális", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "guests", title: "4 fő + 1 pótágy", text: "Férőhely" },
      { iconKey: "home", title: "Kétszintes ház", text: "Elrendezés" },
      { iconKey: "sun", title: "2022-ben felújítva", text: "Állapot" },
      { iconKey: "terrace", title: "Körbejárható terasz", text: "Kültér" },
      { iconKey: "mountain", title: "180°-os panoráma", text: "Kilátás" },
      { iconKey: "balaton", title: "Szent György-hegy keleti oldala", text: "Elhelyezkedés" }
    ],
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "leaf",
        title: "Csendes elvonulás",
        text: "Hegyoldali nyugalom"
      },
      {
        iconKey: "sun",
        title: "Különleges reggelek",
        text: "Napfelkelte az ágyból"
      },
      {
        iconKey: "terrace",
        title: "Teraszos pihenés",
        text: "Panoráma és levegő"
      },
      {
        iconKey: "trail",
        title: "Jó bázis programokhoz",
        text: "Bor, Balaton, túrák"
      }
    ]
  },
  amenities: [
    {
      iconKey: "terrace",
      title: "Körbejárható terasz"
    },
    {
      iconKey: "mountain",
      title: "180°-os panoráma"
    },
    {
      iconKey: "sun",
      title: "2022-ben felújított ház"
    },
    {
      iconKey: "home",
      title: "Kétszintes elrendezés"
    },
    {
      iconKey: "home",
      title: "Új bútorok"
    },
    {
      iconKey: "home",
      title: "Különálló ház"
    },
    {
      iconKey: "guests",
      title: "Pótágy lehetőség"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat a Szőlőliget hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Szőlőliget galériához jelenleg nincs feloldható kép a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY-HEGY - KISAPÁTI KÖRNYÉKE",
    title: "Környék és táj",
    body: "A Szőlőliget Vendégház a Szent György-hegy keleti oldalán fekszik, ahonnan könnyen elérhetők a hegy túraútvonalai, a Bazaltorgonák, a környék borászatai és a Balaton-felvidék legismertebb kirándulóhelyei.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Bazaltorgonák kb. félórás túrával", icon: "trail" },
      { label: "Borászatok és tanúhegyek a közelben", icon: "grapes" },
      { label: "Balaton-közeli pihenés", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Szőlőliget Vendégház környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Szőlőliget galéria",
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
    intro: "Ha a hegyoldali csend után más Balaton-felvidéki vagy Balaton közeli hangulatot is felfedeznél, nézd meg a többi Dandelion vendégházat is.",
    items: [
      {
        name: "Fügeház",
        meta: "4-6 fő · panoráma · családi pihenés",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion D2",
        meta: "4-6 fő · nagy udvar · családbarát",
        href: "/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "Káli-medence · nyugodt falusi hangulat",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "szololiget related koveskal"
          ),
          alt: "Dandelion Köveskál külső kép"
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
        name: "Dandelion Royal Homes",
        meta: "Balaton közeli, kényelmes kikapcsolódás",
        href: "/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "szololiget related royal homes"
          ),
          alt: "Dandelion Royal Homes külső kép"
        }
      }
    ]
  }
};

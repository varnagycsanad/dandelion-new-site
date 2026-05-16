import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-16 18:35] Szépvölgyi megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const szepvolgyiPageData: AccommodationPageData = {
  seo: {
    title: "Szépvölgyi Vendégház Badacsonyörs | Panorámás nyaraló",
    description:
      "Tágas, balatoni panorámás nyaraló Badacsonyörsön 4 hálószobával, 2 fürdőszobával, zárt kerttel és kényelmes pihenéssel akár 8 főre, a Balaton közelében."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=7d46f283f2f5792f",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "szepvolgyi",
      "gallery",
      "dandelion-szepvolgyi-source-001.webp",
      "szepvolgyi mobile hero"
    ),
    fallbackAlt: "Szépvölgyi Vendégház Badacsonyörsön, balatoni panorámás terasszal",
    kicker: "Badacsonyörs - Szépvölgyi út",
    title: "Szépvölgyi",
    titleAccent: "Vendégház",
    subtitle: "BALATONI PANORÁMÁS, TÁGAS CSALÁDI NYARALÓ",
    lead: "Balatoni panorámás, tágas családi nyaraló Badacsonyörsön, a Szépvölgyi úton. A Szépvölgyi Vendégház 4 hálószobával, 2 fürdőszobával, zárt kerttel, teraszbútorokkal és grillezési lehetőséggel várja a vendégeket, akár 8 fő részére.",
    primaryCtaLabel: "Árak és foglalás",
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
        quote: "Tágas, kényelmes ház, nagyon szép balatoni kilátással és kellemes, nyugodt környezettel.",
        meta: "Vendég - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Családi nyaraláshoz remek választás, a terasz és a kert különösen sokat adott az itt töltött napokhoz.",
        meta: "Vendég - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Jó elhelyezkedés, közel a strandhoz és a környék programjaihoz, estére pedig nagyon jó visszaérni ide.",
        meta: "Vendég - Google - 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kényelmes, nagyobb társaságnak is jól használható ház, szép panorámával és nyugodt hangulattal.",
        meta: "Vendég - Booking.com - 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "A környék programjai és a balatoni közelség mellett a zárt kert és a terasz tette igazán szerethetővé a szállást.",
        meta: "Vendég - Booking.com - 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Panoráma - tér - balatoni nyaralás",
    title: "Nagyobb családi ház a Balaton közelében",
    lead: "A Szépvölgyi Vendégház Badacsonyörsön, a Szépvölgyi úton található, balatoni panorámás, tágas családi nyaraló. A ház egyik legnagyobb értéke a teraszról nyíló kilátás: a Balaton minden napszakban más arcát mutatja, reggel nyugodt és tiszta, estére pedig különösen hangulatos hátteret ad a pihenéshez."
  },
  details: {
    kicker: "Szépvölgyi Vendégház",
    title: "4 hálószobás, panorámás nyaraló 8 fő részére Badacsonyörsön",
    shortDescription:
      "A Szépvölgyi Vendégház 4 hálószobával és 2 fürdőszobával rendelkező, tágas családi nyaraló Badacsonyörsön. Balatoni panorámás terasszal, zárt kerttel, két autó számára parkolással és grillezési lehetőséggel várja a vendégeket, akár 8 fő részére.",
    longDescription: [
      "A Szépvölgyi Vendégház Badacsonyörsön, a Szépvölgyi úton található, balatoni panorámás, tágas családi nyaraló. A ház egyik legnagyobb értéke a teraszról nyíló kilátás: a Balaton minden napszakban más arcát mutatja, reggel nyugodt és tiszta, estére pedig különösen hangulatos hátteret ad a pihenéshez.",
      "A vendégház 4 hálószobával és 2 fürdőszobával rendelkezik, így akár 8 fő számára is kényelmes elhelyezést biztosít. Jó választás családoknak és baráti társaságoknak, akik tágas, jól felszerelt házat keresnek a Balaton közelében, nyugodtabb környezetben.",
      "A ház mindennel felszerelt, ami egy kényelmes balatoni nyaraláshoz szükséges. A zárt kertben két autó számára van parkolási lehetőség, a kinti pihenést pedig teraszbútorok és grillező teszik kényelmessé. Itt könnyű belassulni: reggeli a teraszon, napközben strand vagy kirándulás, este grillezés és balatoni panoráma.",
      "A környék tavasztól őszig rengeteg programot ad. A kerékpárút, a kikötő és a strand könnyen elérhető, a Folly Arborétum, a Szigligeti vár, a badacsonyi bortúrák, gasztroprogramok és fesztiválok pedig mind jó választások egy tartalmas balatoni pihenéshez.",
      "A Szépvölgyi Vendégház azoknak ideális, akik szeretik a Balaton közelségét, de nem egy zsúfolt apartmanban, hanem saját kerttel, nagyobb terekkel és panorámás terasszal rendelkező nyaralóban szeretnének megszállni."
    ],
    moreLabel: "Bővebben a Szépvölgyi Vendégházról",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszín", "Badacsonyörs, Szépvölgyi út"],
          ["Férőhely", "akár 8 fő"],
          ["Elrendezés", "4 hálószoba, 2 fürdőszoba"],
          ["Jelleg", "tágas, balatoni panorámás családi nyaraló"]
        ]
      },
      {
        title: "Kiemelt élmények",
        items: [
          ["Panoráma", "balatoni panoráma a teraszról"],
          ["Kert", "zárt kert, parkolás két autónak"],
          ["Kintlét", "teraszbútorok és grillező"],
          ["Programok", "strand, kikötő, kerékpárút és bortúrák a közelben"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Badacsonyörs, Szépvölgyi út", icon: "route" },
      { label: "Balatoni panorámás terasz", icon: "mountain" },
      { label: "4 hálószoba, 2 fürdőszoba", icon: "users" },
      { label: "Akár 8 fő részére", icon: "home" },
      { label: "Zárt kert és grillezés", icon: "leaf" },
      { label: "Kerékpárút, kikötő és strand a közelben", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "guests", title: "8 fő", text: "Férőhely" },
      { iconKey: "home", title: "4 hálószoba", text: "Elrendezés" },
      { iconKey: "bathroom", title: "2 fürdőszoba", text: "Komfort" },
      { iconKey: "garden", title: "Zárt kert", text: "Kültér" },
      { iconKey: "mountain", title: "Balatoni panoráma", text: "Kilátás" },
      { iconKey: "balaton", title: "Badacsonyörs", text: "Elhelyezkedés" }
    ],
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "family",
        title: "Nagyobb társaságnak is kényelmes",
        text: "4 háló és 2 fürdő"
      },
      {
        iconKey: "terrace",
        title: "Balatoni teraszos reggelek",
        text: "Kilátás a vízre"
      },
      {
        iconKey: "grill",
        title: "Kerti együttlétek",
        text: "Grill és pihenés"
      },
      {
        iconKey: "trail",
        title: "Balaton közeli bázis",
        text: "Strand, kikötő, bor"
      }
    ]
  },
  amenities: [
    {
      iconKey: "home",
      title: "4 hálószoba"
    },
    {
      iconKey: "bathroom",
      title: "2 fürdőszoba"
    },
    {
      iconKey: "garden",
      title: "Zárt kert"
    },
    {
      iconKey: "terrace",
      title: "Teraszbútorok"
    },
    {
      iconKey: "grill",
      title: "Grillező"
    },
    {
      iconKey: "parking",
      title: "Két autós parkolás"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat a Szépvölgyi Vendégház hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Szépvölgyi galériához jelenleg nincs feloldható kép a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "BADACSONYÖRS - SZÉPVÖLGYI ÚT",
    title: "Környék és programok",
    body: "A Szépvölgyi Vendégház Badacsonyörsön található, ahonnan könnyen elérhető a strand, a kikötő, a kerékpárút és a környék számos balatoni programja. A Folly Arborétum, a Szigligeti vár, a bortúrák, a gasztroprogramok és a fesztiválok tavasztól őszig változatos lehetőségeket adnak a pihenés mellé.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Strand, kikötő és kerékpárút a közelben", icon: "route" },
      { label: "Folly Arborétum és Szigligeti vár", icon: "trail" },
      { label: "Bortúrák, gasztroprogramok és fesztiválok", icon: "grapes" }
    ],
    embedSrc: "https://www.google.com/maps?q=Badacsony%C3%B6rs%20Sz%C3%A9pv%C3%B6lgyi%20%C3%BAt&z=14&output=embed",
    embedTitle: "Szépvölgyi Vendégház környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Szépvölgyi galéria",
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
    intro: "Ha Badacsonyörs után a Balaton-felvidék más hangulatait is felfedeznéd, nézd meg a többi szállásunkat is.",
    items: [
      {
        name: "Szőlőliget Vendégház",
        meta: "4 fő + pótágy - panoráma - csendes elvonulás",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
        }
      },
      {
        name: "Zsálya Vendégház",
        meta: "4 fő - természetközeli pihenés - terasz",
        href: "/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image"
        }
      },
      {
        name: "Fügeház",
        meta: "4-6 fő - panorámás terasz - családi pihenés",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion Royal Homes Apartman",
        meta: "Keszthely - prémium apartman - nagy terasz",
        href: "/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "szepvolgyi related royal homes"
          ),
          alt: "Dandelion Royal Homes Apartman külső kép"
        }
      }
    ]
  }
};

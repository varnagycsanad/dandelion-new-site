import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-16 18:35] Vintage megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const vintagePageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Vintage Nemesgulács | Vendégház a Balatonnál",
    description:
      "Vintage hangulatú vendégház Nemesgulácson saját udvarral, grillezéssel, klímával és gyors internettel, 7 km-re a Balatontól."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=0c9e5eaae0545ee3&lang=Hu",
  positioning: {
    shortCharacter: "Otthonos, udvaros ház kisebb családoknak és pároknak.",
    goodFor: ["kisebb családoknak", "pároknak", "babával érkezőknek", "Balaton-felvidéki kirándulásokhoz"],
    strengths: ["saját udvar", "grillezési lehetőség", "családbarát", "wifi", "légkondi"],
    keyFacts: [
      "férőhely: 4 fő",
      "fürdőszoba: 1",
      "ágyelrendezés: 1 franciaágy + 2 szimpla ágy",
      "kisállat: nem engedélyezett",
      "wifi: van",
      "parkolás: ingyenes",
      "légkondi: van",
      "medence: nincs",
      "booking státusz: online foglalási link van"
    ],
    betterAlternativeNote: "ha kutyával jönnétek, D1, D2 vagy Fügeház lehet jobb irány."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "vintage",
      "gallery",
      "dandelion-vintage-source-001.webp",
      "vintage mobile hero"
    ),
    fallbackAlt: "Dandelion Vintage Vendégház Nemesgulácson, saját udvarral és nyugodt vidéki hangulattal",
    kicker: "Nemesgulács · Balaton-felvidék",
    title: "Dandelion",
    titleAccent: "Vintage",
    subtitle: "VIDÉKI PIHENÉS SAJÁT UDVARBAN, A BALATON KÖZELÉBEN",
    lead: "Barátságos, vidéki vendégház Nemesgulácson saját udvarral és nyugodt, balatoni közeli pihenéshez.",
    primaryCtaLabel: "Árak és foglalás",
    secondaryCtaLabel: "Képek megtekintése"
  },
  reviews: {
    kicker: "Vendégértékelések",
    title: "Vendégeink szerint",
    intro: "Valódi vendégértékelések Google és Booking.com forrásból.",
    mobileSummaryLabel: "További vélemények",
    mobileHighlightedAriaLabel: "Kiemelt Google értékelés",
    mobileMoreGoogleAriaLabel: "További Google értékelések",
    mobileBookingAriaLabel: "Booking.com értékelések",
    items: [
      {
        source: "Google",
        quote: "Nagyon szerethető ház, ahol a saját udvar és a nyugodt környezet tényleg segít lelassulni.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Családdal érkeztünk, és külön jó volt, hogy a ház kényelmes, jól használható és kisgyerekkel is praktikus.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A vintage hangulat barátságos, a grill és a kert pedig sokat hozzáad az esti pihenéshez.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Jó elhelyezkedés, csendes ház és stabil internet, így pihenéshez és nyugodt munkához is kényelmes volt.",
        meta: "Vendég · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "A Balaton közel van, mégis sokkal nyugodtabb itt megszállni, mint a forgalmasabb üdülőhelyeken.",
        meta: "Vendég · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Vidéki nyugalom · saját udvar · családbarát pihenés",
    title: "Kényelmes vendégház Nemesgulácson, vintage hangulattal",
    lead: "A Vintage azoknak működik jól, akik szeretik, ha a Balaton közel marad, de a nap végén egy nyugodtabb, saját udvaros házba érkezhetnek vissza."
  },
  details: {
    kicker: "Dandelion Vintage Vendégház",
    title: "Saját udvar, klímás komfort és nyugodt balatoni közelség",
    shortDescription:
      "2 hálószobás + nappalis ház saját udvarral, klímával és erős internettel, családoknak és pároknak is kényelmes választás.",
    longDescription: [
      "A Vintage egyik legjobb része a saját udvar és a nyugodt napi ritmus: reggeli a szabadban, napközben balatoni vagy környékbeli program, este pedig grillezés és csend.",
      "A ház jól felszerelt, klímás, és erős, gigabites internetkapcsolattal rendelkezik, így pihenéshez, elvonuláshoz vagy akár némi nyugodt munkához is kényelmes választás. A Balaton mindössze 7 km-re van, ezért a vízpart közel marad, miközben a szállás nem a nyüzsgés közepén helyezkedik el.",
      "A vendégház 2 hálószobás + nappalis elrendezésű. A fő hálóban 180 cm széles franciaágy található, a második hálóban 2 darab 90 cm-es külön ágy, a nappaliban pedig kihúzható kanapé biztosít további alvási lehetőséget. Emellett külön konyha és fürdőszoba is rendelkezésre áll.",
      "A ház „minden megvan, ami kell” módon felszerelt: jól használható konyha, klíma, stabil internet, saját udvar és grillező teszi kényelmessé az itt töltött napokat. A bababarát felszerelés miatt kisgyerekkel érkező családok számára is jó választás.",
      "A Vintage ideális családoknak, akár babával is, barátoknak, akik együtt töltenének pár nyugodt napot, pároknak, akik vidéki hangulatban kapcsolódnának ki, és mindenkinek, aki szereti, ha közel van a Balaton, de nem a nyüzsgésben alszik."
    ],
    moreLabel: "Bővebben a Vintage Vendégházról",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszín", "Nemesgulács"],
          ["Elrendezés", "2 hálószoba + nappali"],
          ["Alvási lehetőség", "180 cm-es franciaágy, 2 külön ágy, kihúzható kanapé"],
          ["Távolság", "Balaton 7 km"]
        ]
      },
      {
        title: "Kényelem és hangulat",
        items: [
          ["Komfort", "klíma és erős, gigabites stabil internet"],
          ["Kültér", "saját udvar és grillezési lehetőség"],
          ["Felszereltség", "külön konyha és fürdőszoba"],
          ["Családoknak", "bababarát felszerelés"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "2 hálószoba + nappali", icon: "home" },
      { label: "Saját udvar", icon: "leaf" },
      { label: "Grillezési lehetőség", icon: "utensils" },
      { label: "Klíma", icon: "wifi" },
      { label: "Erős internet", icon: "route" },
      { label: "Bababarát", icon: "users" },
      { label: "Balaton 7 km", icon: "mountain" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "balaton", title: "Nemesgulács", text: "Elhelyezkedés" },
      { iconKey: "home", title: "2 hálószoba + nappali", text: "Elrendezés" },
      { iconKey: "garden", title: "Saját udvar", text: "Kültér" },
      { iconKey: "route", title: "Balaton 7 km", text: "Távolság" },
      { iconKey: "sun", title: "Klímás komfort", text: "Komfort" },
      { iconKey: "family", title: "Családbarát", text: "Pihenés" }
    ],
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "leaf",
        title: "Nyugodt vidéki ritmus",
        text: "Csendes ház, lassabb napok"
      },
      {
        iconKey: "grill",
        title: "Kerti estékhez ideális",
        text: "Udvar és grillezés"
      },
      {
        iconKey: "balaton",
        title: "Balaton közel, nyüzsgés nélkül",
        text: "Kényelmes távolság"
      },
      {
        iconKey: "family",
        title: "Családoknak is jó választás",
        text: "Otthonos, praktikus ház"
      }
    ]
  },
  geoDecision: {
    kicker: "Vintage gyors válaszok",
    title: "A Dandelion Vintage akkor jó választás, ha nyugodt, saját udvaros vendégházat kerestek Nemesgulácson, közel a Balatonhoz és Badacsonyhoz",
    lead:
      "A Vintage 4 főnek kényelmes, 2 hálószobás + nappalis ház saját udvarral, grillezési lehetőséggel, klímával, erős internettel és csendes falusi hangulattal.",
    questions: [
      {
        question: "Kinek jó választás a Dandelion Vintage?",
        answer:
          "Kisebb családoknak, pároknak és barátoknak, akik saját udvaros, otthonos vendégházat keresnek Nemesgulácson, balatoni programokhoz és Balaton-felvidéki kirándulásokhoz."
      },
      {
        question: "Hány főnek kényelmes a Vintage?",
        answer:
          "A ház 4 főnek kényelmes. Két hálószobája van: az egyikben franciaágy, a másikban két külön ágy található, a nappali pedig közös térként működik."
      },
      {
        question: "Milyen a Vintage udvara?",
        answer:
          "A saját udvar a ház egyik fontos előnye: jó reggelihez, esti beszélgetéshez, grillezéshez és lassabb vidéki napokhoz."
      },
      {
        question: "Milyen programokhoz jó bázis Nemesgulácson?",
        answer:
          "Jó kiindulópont Badacsonyhoz, Szigligethez, a tanúhegyekhez, balatoni strandoláshoz, borászatokhoz és rövid környékbeli kirándulásokhoz."
      },
      {
        question: "Lehet innen nyugodtan dolgozni is?",
        answer:
          "Igen, a házban erős, gigabites internet és klíma van, ezért pihenés mellett nyugodtabb munkához vagy hosszabb elvonuláshoz is praktikus."
      },
      {
        question: "Mi adja a Vintage hangulatát?",
        answer:
          "A vintage stílusú, otthonos belső tér, a külön konyha, a saját udvar és a csendes nemesgulácsi környezet együtt adják a ház lassú, vidéki ritmusát."
      }
    ],
    amenitiesTitle: "Ami a Vintage-ben fontos"
  },
  amenities: [
    {
      iconKey: "home",
      title: "2 hálószoba + nappali"
    },
    {
      iconKey: "garden",
      title: "Saját udvar"
    },
    {
      iconKey: "grill",
      title: "Grillezési lehetőség"
    },
    {
      iconKey: "sun",
      title: "Klíma"
    },
    {
      iconKey: "wifi",
      title: "Erős internet"
    },
    {
      iconKey: "utensils",
      title: "Külön konyha"
    },
    {
      iconKey: "bathroom",
      title: "Fürdőszoba"
    },
    {
      iconKey: "family",
      title: "Bababarát felszerelés"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Pillanatok a Vintage hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Vintage galériához jelenleg nincs feloldható kép.",
    previewCount: 8
  },
  map: {
    kicker: "NEMESGULÁCS · BALATON-FELVIDÉK",
    title: "Környék és pihenés",
    body: "A Dandelion Vintage Vendégház Nemesgulácson található, nyugodt vidéki környezetben. Innen könnyen elérhetők a Balaton-part programjai, a környék kirándulóhelyei, a tanúhegyek és a Balaton-felvidék borászatai is, miközben a szállás maga csendesebb ritmust kínál.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Balaton 7 km", icon: "route" },
      { label: "Vidéki nyugalom", icon: "leaf" },
      { label: "Kirándulások és borászatok a közelben", icon: "trail" }
    ],
    embedSrc: "https://www.google.com/maps?q=Nemesgul%C3%A1cs&z=12&output=embed",
    embedTitle: "Dandelion Vintage Vendégház környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Vintage galéria",
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
    intro: "Ha más Dandelion hangulatokat is megnéznél a Balaton-felvidéken és a Balaton közelében, fedezd fel a többi szállásunkat is.",
    items: [
      {
        name: "Dandelion Royal Homes",
        meta: "modern apartman · kényelmes városi pihenés",
        href: "/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "vintage related royal homes"
          ),
          alt: "Dandelion Royal Homes külső kép"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "falusi hangulat · nyugodt kikapcsolódás",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "vintage related koveskal"
          ),
          alt: "Dandelion Köveskál külső kép"
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
        name: "Fügeház",
        meta: "2-4 fő · panorámás terasz · nyugodt pihenés",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Szőlőliget Vendégház",
        meta: "csendes ház · nagy terasz · panoráma",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
        }
      }
    ]
  }
};

import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-16 18:35] Royal Homes megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const royalHomesPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Royal Homes Keszthely | Prémium apartman",
    description:
      "Prémium apartman Keszthelyen, a Balaton közelében, saját parti mólóval, nagy terasszal, tetőteraszos jakuzzival és 2 hálószobás elrendezéssel."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c4b8753ec9ad4dc9&lang=Hu",
  positioning: {
    shortCharacter: "Kényelmes városi apartman családi pihenéshez.",
    goodFor: ["családoknak", "modern apartmant keresőknek", "Keszthely környéki programokhoz", "Balaton-part közeli pihenéshez"],
    strengths: ["jakuzzi", "nagy terasz", "családbarát", "wifi", "légkondi"],
    keyFacts: [
      "férőhely: 6 fő",
      "fürdőszoba: 1",
      "ágyelrendezés: 1 franciaágy + 2 kihúzható kanapé",
      "kisállat: nem engedélyezett",
      "wifi: van",
      "parkolás: ingyenes",
      "légkondi: van",
      "medence: nincs",
      "booking státusz: online foglalási link van"
    ],
    betterAlternativeNote: "ha inkább önálló vendégházat kerestek."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "royal_homes",
      "gallery",
      "dandelion-royal-homes-source-001.webp",
      "royal homes mobile hero"
    ),
    fallbackAlt: "Dandelion Royal Homes Apartman Keszthelyen, prémium balatoni környezetben",
    kicker: "Keszthely · Balaton-parti üdülőövezet",
    title: "Dandelion",
    titleAccent: "Royal Homes",
    subtitle: "PRÉMIUM APARTMAN A BALATON KÖZELÉBEN",
    lead: "Prémium apartman Keszthelyen, ahol a balatoni közelség és a városi kényelem magas minőségű, nyugodt környezetben találkozik.",
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
        quote: "Nagyon szerethető apartman, igényes belső terekkel és kényelmes, nyugodt balatoni hangulattal.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A lakópark elhelyezkedése különösen jó, mert a part, a sétány és a városi programok is könnyen elérhetők.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Prémium érzetű, átgondolt apartman, ahol a nagy terasz és a minőségi berendezés sokat hozzáad a pihenéshez.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Modern, kényelmes szállás, jó kiindulópont Keszthelyhez és a Balaton közeli kikapcsolódáshoz.",
        meta: "Vendég · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Tiszta, magas színvonalú apartman, ahol rövidebb és hosszabb tartózkodás alatt is könnyű otthonosan érezni magunkat.",
        meta: "Vendég · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Prémium apartmanhangulat · balatoni közelség · városi kényelem",
    title: "Új építésű, magas minőségű apartman Keszthelyen",
    lead: "A Royal Homes akkor jó választás, ha modern, igényes apartmanban pihennél, közel a parthoz és a városi programokhoz, mégis nyugodt közegben."
  },
  details: {
    kicker: "Dandelion Royal Homes Apartman",
    title: "Saját parti móló, nagy terasz és prémium belső terek egy helyen",
    shortDescription:
      "2 hálószobás, nagy teraszos prémium apartman saját parti mólóval és a lakópark tetőteraszán elérhető jakuzzival.",
    longDescription: [
      "A lakópark saját parti mólója, napozóterasza és közös tetőteraszos jacuzzija már érkezéskor megadja azt a prémium balatoni környezetet, amire ez a szállás épül.",
      "A társasház saját parti mólóval, napozóterasszal és tetőteraszon található jakuzzival rendelkezik. A kerékpárút, a vitorlás kikötő és a parti sétány közvetlenül a lakópark mellett található, a városközpont és Keszthely főbb látnivalói pedig körülbelül 10 perces sétával elérhetők.",
      "Az apartman üvegfalú lifttel közelíthető meg. Belépve az előszobából egy tágas, világos, amerikai konyhás nappaliba érkezünk, ahonnan közvetlenül a hatalmas teraszra lehet kilépni. A lakás külső felületén végig széles erkély fut, így a kinti tér az apartman egyik legerősebb része.",
      "A Dandelion Royal Homes minden helyiségében egyedi tervezésű, magas minőségű, díszfényekkel megvilágított bútorok kerültek beépítésre. Az épület vitorla formát idéző alaprajza, az ívelt külső és belső falak, valamint a gondosan összehangolt anyagok, színek és formák elegáns, modern összhatást adnak.",
      "A fűtést hőszivattyús rendszer, padlófűtés és szobánként elhelyezett, külön szabályozható hűtő-fűtő klímák biztosítják. A berendezés és felszereltség magas színvonalú, tudatos tervezés eredménye, amely első osztályú kényelmet nyújt rövidebb és hosszabb tartózkodáshoz is.",
      "Az apartman 2 hálószobás + nappalis elrendezésű. Az egyik hálóban 180 cm-es franciaágy található, a másik hálóban kihúzható kanapé kapott helyet. A lakásban fürdőszoba található káddal és WC-vel, emellett különálló WC is rendelkezésre áll. A teraszon kényelmes teraszbútorok teszik teljessé a pihenést.",
      "A Royal Homes azoknak ideális, akik prémium, modern apartmant keresnek Keszthelyen, közel a Balatonhoz, a parti sétányhoz, a kikötőhöz és a városi programokhoz, mégis kényelmes, nyugodt, magas minőségű környezetben szeretnének megszállni."
    ],
    moreLabel: "Bővebben a Royal Homes Apartmanról",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Helyszín", "Keszthely"],
          ["Környezet", "Balaton-parti üdülőövezet"],
          ["Elrendezés", "2 hálószoba + nappali"],
          ["Épület", "új építésű lakópark üvegfalú lifttel"]
        ]
      },
      {
        title: "Prémium kényelmi elemek",
        items: [
          ["Kültér", "saját parti móló, napozóterasz, nagy terasz és széles erkély"],
          ["Tetőszint", "tetőteraszos jakuzzi"],
          ["Komfort", "padlófűtés és szobánként szabályozható hűtő-fűtő klíma"],
          ["Berendezés", "egyedi bútorok, díszfények és magas színvonalú felszereltség"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Keszthely", icon: "route" },
      { label: "Balaton-parti üdülőövezet", icon: "mountain" },
      { label: "Saját parti móló", icon: "leaf" },
      { label: "Tetőteraszos jakuzzi", icon: "home" },
      { label: "2 hálószoba + nappali", icon: "users" },
      { label: "Nagy terasz és széles erkély", icon: "trail" },
      { label: "Padlófűtés", icon: "utensils" },
      { label: "Hűtő-fűtő klíma", icon: "wifi" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "balaton", title: "Keszthely", text: "Elhelyezkedés" },
      { iconKey: "home", title: "2 hálószoba + nappali", text: "Elrendezés" },
      { iconKey: "route", title: "Balaton-parti lakópark", text: "Környezet" },
      { iconKey: "terrace", title: "Nagy terasz", text: "Kültér" },
      { iconKey: "spark", title: "Tetőteraszos jakuzzi", text: "Kiemelés" },
      { iconKey: "sun", title: "Padlófűtés és klíma", text: "Komfort" }
    ],
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "balaton",
        title: "Part és város együtt",
        text: "Kikötő, sétány, központ"
      },
      {
        iconKey: "spark",
        title: "Prémium apartmanhangulat",
        text: "Igényes belső terek"
      },
      {
        iconKey: "terrace",
        title: "Kinti pihenésre is erős",
        text: "Terasz és napozótér"
      },
      {
        iconKey: "home",
        title: "Kényelmes hosszabb időre is",
        text: "Átgondolt elrendezés"
      }
    ]
  },
  geoDecision: {
    kicker: "Royal Homes gyors válaszok",
    title: "A Dandelion Royal Homes akkor jó választás, ha modern keszthelyi apartmant kerestek Balaton-közeli, városi programokhoz is kényelmes helyen",
    lead:
      "A Royal Homes 2 hálószobás + nappalis prémium apartman Keszthely Balaton-parti üdülőövezetében, nagy terasszal, széles erkéllyel, saját parti mólóval és közös tetőteraszos jakuzzival.",
    questions: [
      {
        question: "Kinek jó választás a Dandelion Royal Homes?",
        answer:
          "Családoknak, pároknak és barátoknak, akik modern, igényes apartmant keresnek Keszthelyen, közel a Balatonhoz, a parti sétányhoz, a kikötőhöz és a városi programokhoz."
      },
      {
        question: "Mennyire van közel a Balatonhoz?",
        answer:
          "A Royal Homes Balaton-parti üdülőövezetben található. A parti sétány, a vitorlás kikötő és a kerékpárút könnyen elérhető, a lakóparkhoz pedig saját parti móló és napozóterasz tartozik."
      },
      {
        question: "Hány főnek kényelmes a Royal Homes?",
        answer:
          "Az apartman 2 hálószobás + nappalis elrendezésű, legfeljebb 6 főnek ad kényelmes balatoni bázist. Az egyik hálóban franciaágy, a másikban kihúzható kanapé található."
      },
      {
        question: "Van jakuzzi a Royal Homesnál?",
        answer:
          "Igen, a lakópark közös tetőteraszos jakuzzival rendelkezik. Ez nem privát apartmanon belüli jakuzzi, hanem a társasház közös prémium kényelmi eleme."
      },
      {
        question: "Milyen a kinti pihenőtér?",
        answer:
          "Az apartman egyik legerősebb része a nagy terasz és a széles erkély. A lakópark napozóterasza és parti mólója tovább erősíti a balatoni pihenés hangulatát."
      },
      {
        question: "Milyen programokhoz jó bázis Keszthelyen?",
        answer:
          "Jó választás balatoni strandoláshoz, sétányhoz, kikötőhöz, kerékpározáshoz, keszthelyi városi programokhoz és a nyugat-balatoni kirándulásokhoz. A városközpont körülbelül 10 perc sétával elérhető."
      }
    ],
    amenitiesTitle: "Ami a Royal Homesban fontos"
  },
  amenities: [
    {
      iconKey: "leaf",
      title: "Saját parti móló"
    },
    {
      iconKey: "sun",
      title: "Napozóterasz"
    },
    {
      iconKey: "spark",
      title: "Tetőteraszos jakuzzi"
    },
    {
      iconKey: "terrace",
      title: "Nagy terasz"
    },
    {
      iconKey: "utensils",
      title: "Padlófűtés"
    },
    {
      iconKey: "wifi",
      title: "Hűtő-fűtő klíma"
    },
    {
      iconKey: "home",
      title: "Külön WC"
    },
    {
      iconKey: "home",
      title: "Üvegfalú lift"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Pillanatok a Royal Homes hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Royal Homes galériához jelenleg nincs feloldható kép.",
    previewCount: 8
  },
  map: {
    kicker: "KESZTHELY · BALATON KÖZELI PRÉMIUM PIHENÉS",
    title: "Környék és elhelyezkedés",
    body: "A Dandelion Royal Homes Apartman Keszthely Balaton-parti üdülőövezetében található, ahol a parti sétány, a vitorlás kikötő, a kerékpárút és a városi programok is könnyen elérhetők. Ez a környezet egyszerre ad balatoni jelenlétet és kényelmes városi közelséget.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Parti sétány és kikötő a közelben", icon: "route" },
      { label: "Kerékpárút közvetlenül a lakópark mellett", icon: "trail" },
      { label: "Városközpont kb. 10 perc sétára", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Keszthely&z=13&output=embed",
    embedTitle: "Dandelion Royal Homes környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Royal Homes galéria",
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
    intro: "Ha a keszthelyi prémium apartman után más Dandelion hangulatokat is felfedeznél, nézd meg a többi szállásunkat is a Balaton közelében és a Balaton-felvidéken.",
    items: [
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
        meta: "falusi hangulat · nyugodt kikapcsolódás",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "royal homes related koveskal"
          ),
          alt: "Dandelion Köveskál külső kép"
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
      },
      {
        name: "Zsálya Vendégház",
        meta: "csendes kis ház · természetközeli pihenés",
        href: "/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image"
        }
      }
    ]
  }
};

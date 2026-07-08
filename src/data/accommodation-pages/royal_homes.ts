import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-16 18:35] Royal Homes megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const royalHomesPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Royal Homes Keszthely | Balaton közeli apartman jacuzzival",
    description:
      "Balaton közeli apartman Keszthelyen 4-6 főre, nagy terasszal, saját parti mólóval és közös tetőteraszos jacuzzival. Ideális családoknak, pároknak és város + part pihenéshez."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c4b8753ec9ad4dc9&lang=Hu",
  positioning: {
    shortCharacter: "Modern apartman Keszthelyen, nem önálló vendégház.",
    goodFor: ["családoknak", "pároknak", "modern apartmant keresőknek", "Balaton-part közeli pihenéshez", "Keszthely városi programjaihoz"],
    strengths: ["Balaton-közeli elhelyezkedés", "tetőteraszos jakuzzi", "nagy terasz", "családbarát elrendezés", "légkondi"],
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
    betterAlternativeNote: "ha inkább önálló vendégházat, nagyobb kertet vagy dombvidéki nyugalmat kerestek."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "royal_homes",
      "gallery",
      "dandelion-royal-homes-source-001.webp",
      "royal homes mobile hero"
    ),
    fallbackAlt: "Dandelion Royal Homes balaton közeli apartman Keszthelyen",
    kicker: "Keszthely · Balatonhoz közeli apartman",
    title: "Dandelion",
    titleAccent: "Royal Homes",
    subtitle: "KESZTHELYI APARTMAN A BALATON KÖZELÉBEN",
    lead: "A Royal Homes egy modern, 2 hálószobás apartman Keszthelyen, nem önálló vendégház: azoknak jó, akik a Balaton közelében, nagy terasszal és közös tetőteraszos jacuzzival szeretnének megszállni.",
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
    kicker: "apartman, nem vendégház · Balaton-közelség · keszthelyi bázis",
    title: "Keszthelyi apartman 4-6 főre, ha a part és a város is számít",
    lead: "A Royal Homes akkor jó választás, ha nem egy eldugott vendégházat, hanem kényelmes, jól felszerelt apartmant keresel Keszthelyen, ahonnan a Balaton-part, a kikötő és a városi programok is gyorsan elérhetők."
  },
  details: {
    kicker: "Dandelion Royal Homes Apartman",
    title: "Apartman Keszthelyen saját parti mólóval, nagy terasszal és közös jacuzzival",
    shortDescription:
      "2 hálószobás apartman 4-6 főre Keszthelyen, nagy terasszal, saját parti mólóval és a lakópark közös tetőteraszos jacuzzijával.",
    highlights: [
      "Apartman, nem önálló vendégház: modern lakóparkos elhelyezkedés Keszthelyen.",
      "Balaton-közeli szállás: a part, a sétány és a kikötő gyalog is gyorsan elérhető, a lakóparknak saját parti mólója van.",
      "Pároknak és családoknak is jó: 2 hálószoba + nappali, legfeljebb 6 főre.",
      "Akkor erős választás, ha a vízparti programok, éttermek és városi kényelem fontosabb, mint az elvonult, kertes házélmény."
    ],
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
    featuredExperience: {
      label: "Miért válaszd Keszthelyt?",
      title: "Keszthely akkor jó választás, ha a Balaton-partot és a városi kényelmet együtt szeretnétek",
      text: "Strand, sétány, kikötő, éttermek és programok egy helyen, így nem kell választani a vízparti hangulat és a kényelmes városi bázis között.",
      note: "A Royal Homes ezt a keszthelyi előnyt adja hozzá modern apartmanos környezetben.",
      iconKey: "balaton",
      imageKey: "hero-desktop"
    },
    experienceCta: {
      eyebrow: "Royal Homes vagy más Dandelion szállás?",
      title: "A Royal Homes a balatoni apartmanos opció",
      text: "Ezt válaszd, ha Keszthelyen, a parthoz közel maradnátok. Más Dandelion ház jobb lehet, ha önálló vendégházat, nagy kertet vagy szőlőhegyi nyugalmat kerestek.",
      href: "/szallasok/",
      ctaLabel: "Összes Dandelion szállás összevetése",
      image: {
        src: "/images/home/region-stories/dandelion-home-balaton-story-01.webp",
        alt: "Balaton-parti hangulat Keszthely környékén",
        width: 1800,
        height: 1350
      }
    },
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "balaton",
        title: "Part és város együtt",
        text: "strand, kikötő, éttermek, központ"
      },
      {
        iconKey: "spark",
        title: "Jacuzzi + terasz",
        text: "nem csak alvóhely, hanem pihenős bázis"
      },
      {
        iconKey: "terrace",
        title: "Tiszta apartmanpozíció",
        text: "modern lakópark, nem vendégház"
      },
      {
        iconKey: "home",
        title: "Jó pároknak és családoknak",
        text: "2 hálószoba + nappali, 4-6 főre"
      }
    ]
  },
  geoDecision: {
    kicker: "Royal Homes gyors válaszok",
    title: "A Dandelion Royal Homes egy Balaton-közeli keszthelyi apartman, nem önálló vendégház",
    lead:
      "A Royal Homes 2 hálószobás + nappalis apartman Keszthely Balaton-parti üdülőövezetében, nagy terasszal, saját parti mólóval és közös tetőteraszos jacuzzival. Kifejezetten jó választás, ha a part, a kikötő és a városi programok közelsége fontos.",
    questions: [
      {
        question: "Apartman vagy vendégház a Royal Homes?",
        answer:
          "A Royal Homes apartman, nem önálló vendégház. Egy modern lakóparkban található keszthelyi szállás, ezért annak jó, aki kényelmes városi-balatoni bázist keres, nem pedig külön kertesház élményt."
      },
      {
        question: "Balatonhoz közeli szállás Keszthelyen?",
        answer:
          "Igen. A Royal Homes Keszthely Balaton-parti üdülőövezetében van, a sétány, a kikötő és a kerékpárút közelében, ráadásul a lakóparkhoz saját parti móló és napozóterasz is tartozik."
      },
      {
        question: "Van jacuzzis szállás Keszthelyen?",
        answer:
          "Igen, a Royal Homesnál van közös tetőteraszos jacuzzi a lakóparkban. Fontos, hogy ez nem privát, apartmanon belüli jacuzzi, hanem az épület közös prémium kényelmi eleme."
      },
      {
        question: "Pároknak vagy családoknak jobb?",
        answer:
          "Mindkettőnek jó lehet. Pároknak azért erős, mert kényelmes, modern és közel van a parthoz; családoknak pedig a 2 hálószoba + nappali, a nagy terasz és a 4-6 fős elrendezés miatt."
      },
      {
        question: "Mennyi idő a part?",
        answer:
          "A vízparti hangulat gyakorlatilag azonnal jelen van: a lakópark saját parti mólóval rendelkezik, a sétány és a kikötő pedig gyalog is gyorsan elérhető."
      },
      {
        question: "Miért jobb ez Keszthelyen, mint más Dandelion opciók?",
        answer:
          "A Royal Homes akkor jobb választás, ha a Balaton-part közelsége, a városi programok, az éttermek és a könnyű elérhetőség fontosabb, mint a különálló ház, a nagy kert vagy a szőlőhegyi elvonulás."
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

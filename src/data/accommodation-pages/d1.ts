import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-06 22:00] D1 accommodation data added for shared AccommodationPage template with panoramic pool messaging.
// [CHANGE 2026-05-16 15:40] D1 hero kapott adatvezérelt panoráma medence kiemelést a shared template-hez.
// [CHANGE 2026-05-16 18:10] D1 megkapta a D2-szintű decisionPanel és amenities adatmodellt a medencés házak egységesítéséhez.
const d1PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d1PageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D1 Kisapáti | Panorámás vendégház medencével",
    description:
      "Tágas, családbarát vendégház Kisapátiban akár 8 főre, panorámás terasszal, grillezéssel és szezonális Panorama Pool használattal."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=2be20f0b68a1114a&lang=Hu",
  positioning: {
    shortCharacter: "Tágas ház nagyobb családoknak és baráti társaságoknak.",
    goodFor: ["családoknak", "baráti társaságoknak", "kutyával érkezőknek", "Balaton-felvidéki kirándulásokhoz"],
    strengths: ["kert", "terasz", "2 fürdőszoba", "nyári medencehasználat", "ingyenes parkolás"],
    keyFacts: [
      "férőhely: 8 fő",
      "fürdőszoba: 2",
      "ágyelrendezés: 6 szimpla ágy + 1 kihúzható kanapé",
      "kisállat: engedélyezett",
      "wifi: van",
      "parkolás: ingyenes",
      "légkondi: van",
      "medencehasználat: van",
      "booking státusz: online foglalási link van"
    ],
    betterAlternativeNote: "ha franciaágyas elrendezésű házat kerestek."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d1",
      "gallery",
      "dandelion-d1-source-001.webp",
      "d1 mobile hero"
    ),
    fallbackAlt: "Dandelion D1 tágas vendégház Kisapátin, panorámás terasszal és családi pihenéshez",
    kicker: "Kisapáti - Szent György-hegy",
    title: "Dandelion",
    titleAccent: "D1",
    subtitle: "PANORÁMÁS, TÁGAS VENDÉGHÁZ NAGYOBB CSALÁDOKNAK",
    lead: "Tágas vendégház Kisapátin nagyobb családoknak és baráti társaságoknak, panorámás pihenéshez a Szent György-hegy közelében.",
    poolHighlight: {
      enabled: true,
      label: "Panoráma medence a ház melletti dombon",
      text: "A D1 vendégei is használhatják a közeli panoráma medencét.",
      href: "/panorama-pool/",
      ctaLabel: "Medence oldal megnyitása",
      variant: "strong"
    },
    primaryCtaLabel: "Árak és foglalás",
    secondaryCtaLabel: "Képek megtekintése"
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
        quote: "Tágas, kényelmes ház, ahol nagyobb családdal is könnyű együtt pihenni, mégis mindenkinek jut saját tere.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A terasz és a környező hegyek látványa különösen jó hangulatot ad az esti közös vacsorákhoz.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Jó bázis kirándulásokhoz, nyugodt napokhoz és nagyobb családi vagy baráti együttlétekhez is.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kényelmes, jól használható ház több hálószobával és sok közös térrel, ami nagyobb társaságnak is jól működik.",
        meta: "Vendég · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Nyugodt, természetközeli környezet, tágas elrendezés és jó elhelyezkedés a Balaton-felvidéki programokhoz.",
        meta: "Vendég · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Tágas terek - panoráma - családi pihenés",
    title: "Az egyik legtágasabb Dandelion vendégház Kisapátin",
    lead: "A D1 akkor működik igazán jól, ha fontos, hogy együtt lehessetek, de közben mindenkinek jusson saját tér és kényelmes közös idő is."
  },
  details: {
    kicker: "Dandelion D1",
    title: "Panorámás terasz, nagy közösségi terek és Panorama Pool élmény egy helyen",
    shortDescription:
      "A D1 a Dandelion Vendégházak legtágasabb, klimatizált háza, akár 8 fő részére. 3 hálóval, nappalival, kényelmes terasszal, grillezési lehetőséggel és gyönyörű kilátással vár a Csobánc, a Tóti-hegy, a Gulács és a Badacsony felé.\n\nA főképen látható Panorama Pool medencét a Dandelion D1, D2 és Fügeház vendégei használhatják.",
    longDescription: [
      "A D1 a Dandelion Vendégházak legtágasabb, klimatizált háza, kényelmes választás nagyobb családoknak vagy baráti társaságoknak. A házban 3 hálószoba és nappali található, így nagyobb létszám esetén is jól használható, kényelmes szállás.",
      "A nappali a ház központi része, amelyhez nagy méretű, mindennel felszerelt konyha és étkező kapcsolódik. Innen nyílik a terasz, ahol jó időben a reggeli kávé, a közös vacsora vagy az esti beszélgetés is külön hangulatot kap. A teraszról a Csobánc, a Tóti-hegy, a Gulács és a Badacsony látványa tárul elétek. Kültéri étkezőszett és grillezési lehetőség is rendelkezésre áll.",
      "A ház tágas elrendezése, a 3 külön hálószoba, a nappali, a két zuhanyzós fürdőrész és a külön WC kényelmessé teszi a pihenést többfős társaságok számára is.",
      "A D1 jó választás azoknak, akik tágas, kényelmes házat keresnek a Balaton-felvidék felfedezéséhez, és közben szeretnének kiszakadni a hétköznapokból is. Innen rövid autóúttal elérhető a Balaton, a Szent György-hegy, Badacsony, Szigliget, a Csobánc és a környék borászatai. A D1 vendégei a Panorama Pool medencét is használhatják, amely a D1, D2 és Fügeház vendégei számára elérhető."
    ],
    moreLabel: "Bővebben a D1-ről",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Férőhely", "akár 8 fő"],
          ["Elrendezés", "3 hálószoba + nappali"],
          ["Kiemelés", "panorámás terasz és nagy közösségi terek"],
          ["Elhelyezkedés", "Kisapáti, a Szent György-hegy közelében"]
        ]
      },
      {
        title: "Kikapcsolódás",
        items: [
          ["Medence", "Panorama Pool élmény"],
          ["Kültér", "kültéri étkező és grillezési lehetőség"],
          ["Fürdők", "több zuhanyzós fürdőszoba és külön WC"],
          ["Panoráma", "Csobánc, Tóti-hegy, Gulács és Badacsony"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Akár 8 fő részére", icon: "users" },
      { label: "3 kétfős hálószoba", icon: "home" },
      { label: "Panorama Pool használat", icon: "pool" },
      { label: "Panorámás terasz", icon: "mountain" },
      { label: "Grillezési lehetőség", icon: "leaf" },
      { label: "Kirándulásokhoz jó bázis", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "guests", title: "8 fő", text: "Férőhely" },
      { iconKey: "home", title: "3 hálószoba + nappali", text: "Elrendezés" },
      { iconKey: "family", title: "Nagy családi ház", text: "Tér" },
      { iconKey: "terrace", title: "Kert és terasz", text: "Kültér" },
      { iconKey: "kitchen", title: "Felújított konyha", text: "Konyha" },
      { iconKey: "family", title: "Családbarát", text: "Pihenés" }
    ],
    featuredExperience: {
      label: "KIEMELT ÉLMÉNY",
      title: "Panorama Pool",
      text: "Foglald le a Dandelion D1-et, és nyártól a panorámás medencehasználat is benne van az árban.",
      note: "nyári szezonban",
      iconKey: "pool",
      image: d1PanoramaPoolHeroImage
        ? {
            src: d1PanoramaPoolHeroImage.src,
            mobileSrc: d1PanoramaPoolHeroImage.mobileSrc,
            alt: d1PanoramaPoolHeroImage.altHu,
            width: 1800,
            height: 1350
          }
        : undefined
    },
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "family",
        title: "Tágas családi ház",
        text: "8 fő, külön hálók"
      },
      {
        iconKey: "garden",
        title: "Kert és terasz",
        text: "Kinti étkezések"
      },
      {
        iconKey: "sun",
        title: "Nyári pihenés",
        text: "Medencehasználat"
      },
      {
        iconKey: "balaton",
        title: "Hegyi bázis",
        text: "Túrák, borászatok"
      }
    ]
  },
  geoDecision: {
    kicker: "D1 gyors válaszok",
    title: "A Dandelion D1 akkor jó választás, ha tágas kisapáti házat kerestek medencehasználattal",
    lead: "A D1 nagyobb családoknak és baráti társaságoknak készült: akár 8 fő, panorámás terasz, több közös tér és Panorama Pool használattal.",
    questions: [
      {
        iconKey: "pool",
        question: "Van medence a Dandelion D1-hez?",
        answer: "Igen. A D1 vendégei használhatják a Panorama Pool medencét."
      },
      {
        iconKey: "pool",
        question: "Privát medencéje van a D1-nek?",
        answer: "Nem külön privát medence tartozik a házhoz; a Panorama Pool a D1, D2 és Fügeház vendégeinek szezonális medenceélménye."
      },
      {
        iconKey: "guests",
        question: "Hány főnek kényelmes a Dandelion D1?",
        answer: "Akár 8 főnek kényelmes, 3 hálószobával, nappalival és több fürdőszobával."
      },
      {
        iconKey: "mountain",
        question: "Milyen programokhoz jó bázis?",
        answer: "Kisapátiból a Szent György-hegy, Badacsony, Szigliget, Csobánc, a Balaton-part és a borászatok rövid autóúttal elérhetők."
      },
      {
        iconKey: "kitchen",
        question: "Milyen felszereltség van a D1-ben?",
        answer: "A D1-ben jól felszerelt konyha, mosogatógép, mosógép, klíma, kényelmes nappali, panorámás terasz és grillezési lehetőség is van."
      },
      {
        iconKey: "wifi",
        question: "Van gyors internet a Dandelion D1-ben?",
        answer: "Igen. A Dandelion D1-ben gigabites internet érhető el, ezért hosszabb tartózkodáshoz és nyugodtabb online munkához is praktikus."
      }
    ],
    amenitiesTitle: "Ami a házban fontos"
  },
  amenities: [
    {
      iconKey: "home",
      title: "3 hálószoba"
    },
    {
      iconKey: "home",
      title: "Kényelmes nappali"
    },
    {
      iconKey: "utensils",
      title: "Jól felszerelt konyha"
    },
    {
      iconKey: "terrace",
      title: "Panorámás terasz"
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
      iconKey: "home",
      title: "Mosógép"
    },
    {
      iconKey: "utensils",
      title: "Mosogatógép"
    },
    {
      iconKey: "wifi",
      title: "Gigabites internet"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat a D1 hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A D1 galériához jelenleg nincs feloldható kép.",
    previewCount: 8
  },
  map: {
    kicker: "KISAPÁTI · TAPOLCAI-MEDENCE",
    title: "Környék és táj",
    body: "A Dandelion D1 Kisapátin, a Szent György-hegy közelében található. Innen rövid autóúttal elérhető a Balaton, Badacsony, Szigliget, a Csobánc és a Balaton-felvidék kedvelt kirándulóhelyei és borászatai.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Tanúhegyes panoráma", icon: "mountain" },
      { label: "Túrák és kirándulások a közelben", icon: "trail" },
      { label: "Balaton és borvidék rövid úttal", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Dandelion D1 környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "D1 galéria",
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
    intro: "Ha a tágas kisapáti ház után más Dandelion hangulatok is érdekelnek, nézd meg a többi Balaton-felvidéki és Balaton közeli szállásunkat is.",
    items: [
      {
        name: "Dandelion D2",
        meta: "4-6 fő · családbarát apartman · nagy udvar",
        href: "/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image"
        }
      },
      {
        name: "Fügeház",
        meta: "4-6 fő · panoráma · Panorama Pool",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "Káli-medence · csendes falusi hangulat",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "d1 related koveskal"
          ),
          alt: "Dandelion Köveskál külső kép"
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
            "d1 related royal homes"
          ),
          alt: "Dandelion Royal Homes külső kép"
        }
      },
      {
        name: "Dandelion Szőlőliget",
        meta: "elvonulás a szőlők között",
        href: "/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image"
        }
      }
    ]
  }
};

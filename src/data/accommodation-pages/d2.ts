import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-06 22:55] D2 copy updated with panoramic pool focus, family-friendly tone and clean Hungarian text.
// [CHANGE 2026-05-16 12:45] D2 hero, intro, fact és gallery copy rövidítve; Panorama Pool kommunikáció és finom belső linkelés hozzáadva.
// [CHANGE 2026-05-16 15:05] D2 hero lead a kért új szövegre cserélve, változatlan hero szerkezettel.
// [CHANGE 2026-05-16 15:40] D2 panoráma medence kiemelés átemelve adatvezérelt hero poolHighlight blokkba.
// [CHANGE 2026-05-16 15:58] D2 hero fallback alt az új fedett teraszos fotó SEO szövegéhez igazítva.
// [CHANGE 2026-05-16 17:05] D2 decision panel újrahierarchizálva: tiszta overview, opcionális pool card és külön amenity lista.
const d2PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d2PageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 Kisapáti | Családbarát apartman kerttel",
    description:
      "Galériás apartman nagy udvarral, fedett terasszal és 2026. június 15-től elérhető Panorama Pool használattal a Balaton-felvidéken."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c64244f6153c3ca1&lang=Hu",
  positioning: {
    shortCharacter: "Kertközeli, családias ház nyugodtabb balatoni pihenéshez.",
    goodFor: ["családoknak", "kisebb baráti társaságoknak", "kutyával érkezőknek", "Szent György-hegy környéki programokhoz"],
    strengths: ["kert", "terasz", "nyári medencehasználat", "wifi", "légkondi"],
    keyFacts: [
      "férőhely: 6 fő",
      "fürdőszoba: 1",
      "ágyelrendezés: 1 franciaágy + 2 szimpla ágy + 1 kihúzható kanapé",
      "kisállat: engedélyezett",
      "wifi: van",
      "parkolás: ingyenes",
      "légkondi: van",
      "medencehasználat: van",
      "booking státusz: online foglalási link van"
    ],
    betterAlternativeNote: "ha több fürdőszobás elrendezést kerestek."
  },
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-mobile-hero-video-poster-20260615.webp",
      "d2 mobile hero"
    ),
    fallbackAlt: "Dandelion D2 fedett terasza sárga székekkel és nagy kerttel Kisapátiban",
    kicker: "Balaton-felvidék - Szent György-hegy",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "GALÉRIÁS APARTMAN NAGY UDVARRAL ÉS FEDETT TERASSZAL",
    lead: "Világos, kényelmes vendégház nagy kerttel és fedett terasszal, nyugodt balatoni-felvidéki napokhoz.",
    poolHighlight: {
      enabled: true,
      label: "Panoráma medence a ház melletti dombon",
      text: "2026. június 15-től a D2 vendégei is használhatják a közeli panoráma medencét.",
      href: "/panorama-pool/",
      ctaLabel: "Medence oldal megnyitása",
      variant: "strong"
    },
    video: {
      mobile: "/videos/accommodations/d2/dandelion-d2-mobile-hero-20260615.mp4?v=20260615",
      posterImagePath: requireAccommodationLocalAssetPath(
        "d2",
        "hero",
        "dandelion-d2-mobile-hero-video-poster-20260615.webp",
        "d2 mobile hero video poster"
      ),
      uploadDate: "2026-06-15T00:00:00+02:00"
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
        quote: "Idilli környezet, kedves házigazdák, sok hely a gyerekeknek és nyugodt, szerethető hangulat.",
        meta: "Vanessa L. · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A ház minden igényt kielégít, és jó szívvel ajánlom annak, aki pár napra elvonulna.",
        meta: "Ildikó Barna · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Szép, rendezett hely, csendes környezet és gördülékeny érkezés. Kifejezetten jó pihenéshez.",
        meta: "Eszter K. · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Abszolút pozitív élmény, gyors válaszokkal és nagyon segítőkész házigazdákkal.",
        meta: "Bernadett · Booking.com · 10/10"
      },
      {
        source: "Booking.com",
        quote: "Tökéletes pihentető napokhoz: csendes hely, barátságos házigazdák és kényelmes szállás.",
        meta: "Angelika · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Nyugodt ritmus - nagy udvar - fedett terasz",
    title: "Fedett terasz, nagy kert, családi terek",
    lead: "Pihentető családi idő a Balaton-felvidék szívében. Fedett terasz, nagy kert és felújított konyha vár, közben a legjobb programok karnyújtásnyira."
  },
  details: {
    kicker: "Dandelion D2",
    title: "Fedett terasz, nagy kert, családi terek",
    shortDescription:
      "Tágas terek, állatok a háznál, közel strandokhoz, túrákhoz és hangulatos borászatokhoz.",
    supportingLink: {
      label: "Programötletek és balatoni tippek az Élmények oldalon.",
      href: "/elmenyek/"
    },
    longDescription: [
      "A galériás nappali világos és jól használható közös tér, a felújított konyha pedig kényelmessé teszi a hosszabb itt tartózkodást is. A ház ritmusa egyszerű: reggeli a teraszon, napközben kirándulás vagy balatoni program, este nyugodt visszaérkezés a kertbe.",
      "A fedett terasz és a kerti ülőhelyek rosszabb időben is használhatók, a nagy udvar pedig sokat ad hozzá a pihenéshez. Itt van hely játszani, üldögélni, grillezni vagy csak élvezni a csendet.",
      "A D2 vendégei 2026. június 15-től a Panorama Pool medencét is használhatják. A medence a ház melletti dombon kapott helyet, így a fürdés mellé tanúhegyes panoráma és nyári balatoni-felvidéki hangulat is jár.",
      "A háznál állatok is vannak, amit sok gyerek külön élményként él meg. Ez ad a kertnek egy lazább, falusiasabb hangulatot, anélkül hogy a ház kényelméből bármit elvenne.",
      "A Balaton, a tanúhegyek túraútvonalai és a környék borászatai rövid autóúttal elérhetők, így a D2 jó bázis akkor is, ha többféle programot szeretnétek egy helyről bejárni."
    ],
    moreLabel: "Bővebben a D2-ről",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Férőhely", "4-6 fő"],
          ["Kültéri rész", "fedett terasz és kerti ülőhelyek"],
          ["Udvar", "tágas, jól használható kert"],
          ["Konyha", "2026-ban felújított, jól felszerelt"]
        ]
      },
      {
        title: "Élmények",
        items: [
          ["Panorama Pool", "a ház melletti dombon, 2026. június 15-től"],
          ["Rostonsütés", "kültéri grillezési lehetőség"],
          ["Gyerekeknek", "állatok és nagy udvar a háznál"],
          ["Programok", "Balaton, túrák és borászatok a közelben"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "2026-ban felújított konyha", icon: "utensils" },
      { label: "Galériás nappali", icon: "home" },
      { label: "Panorama Pool hozzáférés", icon: "pool" },
      { label: "Fedett terasz és kerti rész", icon: "leaf" },
      { label: "Kültéri grillezés", icon: "grapes" },
      { label: "Állatok a háznál", icon: "users" },
      { label: "Kirándulós bázis a tanúhegyekhez", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "guests", title: "4-6 fő", text: "Férőhely" },
      { iconKey: "terrace", title: "Fedett terasz", text: "és kerti ülőhelyek" },
      { iconKey: "garden", title: "Nagy udvar", text: "és kert" },
      { iconKey: "kitchen", title: "Felújított konyha" },
      { iconKey: "home", title: "Galériás nappali" },
      { iconKey: "animals", title: "Állatok a háznál" }
    ],
    featuredExperience: {
      label: "Kiemelt élmény",
      title: "Panorama Pool",
      text: "Foglald le a Dandelion D2-t, és nyártól a panorámás medencehasználat is benne van az árban.",
      note: "2026. június 15-től",
      iconKey: "pool",
      image: d2PanoramaPoolHeroImage
        ? {
            src: d2PanoramaPoolHeroImage.src,
            alt: d2PanoramaPoolHeroImage.altHu,
            width: 1800,
            height: 1350
          }
        : undefined
    },
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "terrace",
        title: "Fedett terasz",
        text: "Nagy udvar"
      },
      {
        iconKey: "users",
        title: "Gyerekbarát kert",
        text: "Kert, állatok"
      },
      {
        iconKey: "balaton",
        title: "Balaton és hegyek",
        text: "Strand, túra"
      },
      {
        iconKey: "home",
        title: "Családi bázis",
        text: "Tágas terek"
      }
    ]
  },
  geoDecision: {
    kicker: "D2 gyors válaszok",
    title: "A Dandelion D2 akkor jó választás, ha kertközeli, családbarát házat kerestek Kisapátiban",
    lead: "A D2 4-6 főnek kényelmes, nagy udvarral, fedett terasszal, felújított konyhával és 2026. június 15-től Panorama Pool használattal.",
    questions: [
      {
        iconKey: "pool",
        question: "Van medence a Dandelion D2-höz?",
        answer: "Igen. 2026. június 15-től a D2 vendégei használhatják a Panorama Pool medencét a D1 és a Fügeház vendégeivel együtt."
      },
      {
        iconKey: "family",
        question: "Kinek jó választás a Dandelion D2?",
        answer: "A D2 főleg családoknak és kisebb baráti társaságoknak jó választás, akik nagy kertet, fedett teraszt és nyugodt balatoni-felvidéki bázist keresnek."
      },
      {
        iconKey: "guests",
        question: "Hány főnek kényelmes a Dandelion D2?",
        answer: "A D2 4-6 főnek kényelmes, galériás nappalival, franciaággyal, két szimpla ággyal és kihúzható kanapéval."
      },
      {
        iconKey: "garden",
        question: "Gyerekekkel jó választás a D2?",
        answer: "Igen. A nagy udvar, a kerti ülőhelyek és a háznál lévő állatok miatt a D2 különösen jól működik gyerekes családoknak."
      },
      {
        iconKey: "kitchen",
        question: "Milyen felszereltség van a D2-ben?",
        answer: "A D2-ben felújított, jól felszerelt konyha, mosogatógép, klíma, gigabites internet, kandalló, kád, fedett terasz és kerti ülőhelyek vannak."
      },
      {
        iconKey: "mountain",
        question: "Milyen programokhoz jó bázis a D2?",
        answer: "A D2 jó kiindulópont a Szent György-hegy, a Balaton, a tanúhegyek, a környék borászatai és a Tapolcai-medence felfedezéséhez."
      }
    ],
    amenitiesTitle: "Ami a D2-ben fontos"
  },
  amenities: [
    {
      iconKey: "wifi",
      title: "Gigabites internet"
    },
    {
      iconKey: "utensils",
      title: "Mosogatógép"
    },
    {
      iconKey: "sun",
      title: "Klíma"
    },
    {
      iconKey: "home",
      title: "Fűtés"
    },
    {
      iconKey: "home",
      title: "Kandalló"
    },
    {
      iconKey: "bathroom",
      title: "Kád"
    },
    {
      iconKey: "sun",
      title: "Ventilátor"
    },
    {
      iconKey: "leaf",
      title: "Kerti ülőhelyek"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Nézz körbe a Dandelion D2-ben",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A D2 galériához jelenleg nincs feloldható kép.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY-HEGY · KISAPÁTI",
    title: "D2 környéke",
    body: "A D2 jó helyen van ahhoz, hogy egyetlen bázisról lehessen bejárni a Tapolcai-medencét, a Balaton partját és a környék borvidékeit. A közelebbi túrákhoz és a lassabb balatoni napokhoz is kényelmes kiindulópont.",
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
    title: "További szállásaink",
    intro: "Ha maradnál a Dandelion hangulatnál, innen indulva másik környéket vagy másik háztípust is könnyen választhatsz.",
    items: [
      {
        name: "Fügeház",
        meta: "2-4 fő · panoráma · családi pihenés",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6-8 fő · nagy kert · családoknak",
        href: "/dandelion-d1/",
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
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "d2 related koveskal"
          ),
          alt: "Dandelion Köveskál vendégház külső képe"
        }
      }
    ]
  }
};

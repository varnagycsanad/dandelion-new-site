import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-16 18:35] Zsálya megkapta az egységes decisionPanel és amenities adatstruktúrát a shared accommodation blokklogikához.
export const zsalyaPageData: AccommodationPageData = {
  seo: {
    title: "Zsálya Vendégház Kisapáti | Csendes pihenés panorámával",
    description:
      "Csendes, különálló Zsálya vendégház Kisapátiban, 4 főre, fedett terasszal, tanúhegyi panorámával és klímával."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=cf20da88f046211e&lang=Hu",
  positioning: {
    shortCharacter: "Csendesebb, elvonulós ház pároknak vagy kisebb családoknak.",
    goodFor: ["pároknak", "kisebb családoknak", "barátoknak", "nyugodt pihenéshez"],
    strengths: ["2 fürdőszoba", "2 franciaágy", "terasz", "wifi", "légkondi"],
    keyFacts: [
      "férőhely: 4 fő",
      "fürdőszoba: 2",
      "ágyelrendezés: 2 franciaágy",
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
      "zsalya",
      "gallery",
      "dandelion-zsalya-source-001.webp",
      "zsalya mobile hero"
    ),
    fallbackAlt: "Zsálya Vendégház a Szent György-hegy keleti oldalán",
    kicker: "Szent György-hegy keleti oldala",
    title: "Dandelion",
    titleAccent: "Zsálya",
    subtitle: "CSENDES VENDÉGHÁZ TERMÉSZETKÖZELI PIHENÉSHEZ",
    lead: "Csendes, különálló kis ház a hegyoldalban, napfelkeltével és tanúhegy panorámával a lassabb pihenéshez.",
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
        quote: "Csendes, nyugodt hely, ahonnan könnyű elindulni túrázni, este pedig nagyon jó visszaérni.",
        meta: "Vendég - Google - 5/5"
      },
      {
        source: "Google",
        quote: "A terasz és a környezet hangulata különösen sokat ad a pihenéshez, tényleg lassabb ritmust lehet itt felvenni.",
        meta: "Vendég - Google - 5/5"
      },
      {
        source: "Google",
        quote: "Kis méretű, de átgondolt és kényelmes ház, jó választás, ha valaki természetközelben szeretne pihenni.",
        meta: "Vendég - Google - 5/5"
      },
      {
        source: "Booking.com",
        quote: "Barátságos, kényelmes szállás, nagyon jó kiindulópont a Szent György-hegy felfedezéséhez.",
        meta: "Vendég - Booking.com - 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Nyugodt, csendes hely, ahol rosszabb időben is kellemes a fedett teraszon ülni.",
        meta: "Vendég - Booking.com - 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Csend - természetközeli pihenés",
    title: "Különálló kis ház a hegyoldal nyugalmában",
    lead: "A Zsálya azoknak való, akik kis léptékű, nyugodt házat keresnek, ahol a terasz, a reggeli fények és a környék csendje együtt adják a hangulatot."
  },
  details: {
    kicker: "Zsálya Vendégház",
    title: "Napfelkelte, tanúhegy panoráma és nyugodt, két szintes pihenés",
    shortDescription:
      "Kétszintes, 4 fős vendégház részben fedett terasszal, megújult belsővel és nyugodt, természetközeli hangulattal.",
    longDescription: [
      "A Zsályán a reggel külön élmény: a napfelkelte, a hegyoldal fényei és a teraszról nyíló kilátás már önmagukban megadják a lassabb pihenés ritmusát.",
      "A ház egyik legszebb élménye a reggel: a napfelkelte és a hegyoldal fényei különleges hangulatot adnak az itt töltött napoknak. A környezet csendes, levegős és természetközeli, így a Zsálya jó választás pároknak, kisebb családoknak és nyugodt kikapcsolódást kereső barátoknak is.",
      "2026-ban a ház megújult: a terasz részben beépült, így rosszabb időben is jobban használható. A részben fedett teraszról szép kilátás nyílik a Csobánc, a Gulács és a Tóti-hegy irányába, így egy reggeli kávé, egy esti pohár bor vagy egy csendes délután is külön élményt kap.",
      "Az alsó szinten található a főzősarok, a zuhanyzós fürdőszoba és a külön WC. A főzősarok jól felszerelt, hűtőszekrénnyel, beépített fagyasztóval és a mindennapi étkezésekhez szükséges eszközökkel, ezért rövidebb és hosszabb tartózkodásra is kényelmesen használható.",
      "A nappali világos, barátságos közösségi tér, ahol kanapé, sok ablak és közvetlen teraszkijárat teszi kellemesebbé az itt töltött időt. Ez a rész rosszabb időben is jól használható, mégis megmarad a ház nyitott, természetközeli hangulata.",
      "A felső szinten franciaágy található, valamint mosdó és fürdőkád is a vendégek rendelkezésére áll. A ház elrendezése egyszerre otthonos és praktikus, így a Zsálya könnyen használható pihenéshez, túrázós hétvégéhez vagy hosszabb Balaton-felvidéki kikapcsolódáshoz is.",
      "Mindkét szint klímával felszerelt, így nyáron hűthető, hűvösebb időben pedig fűthető is a ház. A részben fedett terasz és a környező csend lehetőséget ad arra, hogy a vendégek valóban lelassuljanak.",
      "A környék egyik nagy előnye, hogy a Szent György-hegy túraútvonala szinte a kapuból elérhető. Itt a pihenés egyszerűen működik: nappal kirándulás, este nyugalom, reggel fények."
    ],
    moreLabel: "Bővebben a Zsályáról",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Férőhely", "4 fő"],
          ["Jelleg", "különálló, két szintes kis ház"],
          ["Elhelyezkedés", "Szent György-hegy keleti oldala"],
          ["Megújulás", "2026-ban megújult, részben beépült terasszal"]
        ]
      },
      {
        title: "Kiemelt élmények",
        items: [
          ["Panoráma", "Csobánc, Gulács és Tóti-hegy a teraszról"],
          ["Reggel", "gyönyörű napfelkelte"],
          ["Komfort", "klíma mindkét szinten"],
          ["Programok", "túraútvonal szinte a kapuból"]
        ]
      }
    ]
  },
  features: {
    title: "Felszereltség",
    highlights: [
      { label: "Különálló vendégház", icon: "home" },
      { label: "4 fő részére kényelmes", icon: "users" },
      { label: "Két szint", icon: "route" },
      { label: "Részben fedett, részben beépült terasz", icon: "leaf" },
      { label: "Tanúhegy panoráma", icon: "mountain" },
      { label: "Klíma mindkét szinten", icon: "wifi" },
      { label: "Felszerelt teakonyha", icon: "utensils" },
      { label: "Túraútvonal a közelben", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Gyors áttekintés",
    overviewFacts: [
      { iconKey: "guests", title: "4 fő", text: "Férőhely" },
      { iconKey: "home", title: "Két szint", text: "Elrendezés" },
      { iconKey: "terrace", title: "Részben fedett terasz", text: "Kültér" },
      { iconKey: "mountain", title: "Tanúhegy panoráma", text: "Kilátás" },
      { iconKey: "sun", title: "Klíma mindkét szinten", text: "Komfort" },
      { iconKey: "balaton", title: "Szent György-hegy keleti oldala", text: "Elhelyezkedés" }
    ],
    reasonsTitle: "Amiért szeretni fogod",
    reasons: [
      {
        iconKey: "mountain",
        title: "Tanúhegy panoráma",
        text: "Csobánc, Gulács"
      },
      {
        iconKey: "terrace",
        title: "Fedett üvegterasz",
        text: "Kilátással"
      },
      {
        iconKey: "leaf",
        title: "Nagy saját terület",
        text: "Csend, tér"
      },
      {
        iconKey: "trail",
        title: "Túrázós bázis",
        text: "Utak közel"
      }
    ]
  },
  geoDecision: {
    kicker: "Zsálya gyors válaszok",
    title: "A Dandelion Zsálya csendes, különálló hegyoldali ház 4 főre, teljesen fedett terasszal és tanúhegy panorámával",
    lead: "A Zsálya nagy üvegfelületekkel, nagy saját területtel, két szinttel, klímával mindkét szinten és túraútvonalak közelségével ad nyugodt Balaton-felvidéki bázist.",
    questions: [
      {
        iconKey: "family",
        question: "Kinek jó választás a Zsálya?",
        answer: "Pároknak, kisebb családoknak és nyugodt pihenést kereső vendégeknek, akik különálló házat, nagy saját területet és szép kilátást szeretnének."
      },
      {
        iconKey: "mountain",
        question: "Milyen a kilátás?",
        answer: "A teraszról és a nagy üvegfelületeken át a tanúhegyek felé nyílik panoráma, többek között Csobánc, Gulács és Tóti-hegy irányába."
      },
      {
        iconKey: "terrace",
        question: "Miért különleges a terasz?",
        answer: "Teljesen fedett, nagy üvegfelületekkel kapcsolódik a tájhoz, ezért reggel, este és rosszabb időben is jól használható."
      },
      {
        iconKey: "guests",
        question: "Hány főnek kényelmes?",
        answer: "A Zsálya 4 főnek kényelmes, két szinten kialakított vendégház."
      },
      {
        iconKey: "bathroom",
        question: "Mi van a házban?",
        answer: "Klíma mindkét szinten, felszerelt teakonyha, két fürdőszoba, fürdőkád, külön WC és nappali teraszkijárattal."
      },
      {
        iconKey: "trail",
        question: "Milyen programokhoz jó?",
        answer: "Túrázáshoz, tanúhegyes kirándulásokhoz, balatoni programokhoz és csendes Balaton-felvidéki napokhoz, mert turistaútvonalak több irányban is elérhetők."
      }
    ],
    amenitiesTitle: "Ami a Zsályában fontos"
  },
  amenities: [
    {
      iconKey: "terrace",
      title: "Teljesen fedett terasz"
    },
    {
      iconKey: "terrace",
      title: "Nagy üvegfelületek"
    },
    {
      iconKey: "mountain",
      title: "Tanúhegy panoráma"
    },
    {
      iconKey: "leaf",
      title: "Nagy saját terület"
    },
    {
      iconKey: "sun",
      title: "Klíma mindkét szinten"
    },
    {
      iconKey: "utensils",
      title: "Felszerelt teakonyha"
    },
    {
      iconKey: "bathroom",
      title: "Két fürdőszoba"
    },
    {
      iconKey: "trail",
      title: "Túraútvonalak közel"
    }
  ],
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat a Zsálya hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Zsálya galériához jelenleg nincs feloldható kép a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY-HEGY - KELETI OLDAL",
    title: "Környék és táj",
    body: "A Zsálya Vendégház a Szent György-hegy keleti oldalán fekszik, ahol a túraútvonal szinte a kapuból elérhető. Innen könnyen megközelíthetők a hegy részei, a tanúhegyek látványos pontjai és a Balaton-felvidék csendesebb, természetközeli programjai.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Túraútvonal a közelben", icon: "trail" },
      { label: "Csendes hegyoldali környezet", icon: "leaf" },
      { label: "Tanúhegyek látványa", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Zsálya Vendégház környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Zsálya galéria",
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
    intro: "Ha más Balaton-felvidéki vagy Balaton közeli hangulatot is felfedeznél, nézd meg a többi vendégházunkat is.",
    items: [
      {
        name: "Fügeház",
        meta: "2-4 fő - panoráma - családi pihenés",
        href: "/fuge/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image"
        }
      },
      {
        name: "Dandelion D2",
        meta: "4-6 fő - nagy udvar - családbarát",
        href: "/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "Káli-medence - nyugodt falusi hangulat",
        href: "/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "zsalya related koveskal"
          ),
          alt: "Dandelion Köveskál külső kép"
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
        name: "Dandelion Royal Homes",
        meta: "Balaton közeli, kényelmes kikapcsolódás",
        href: "/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "zsalya related royal homes"
          ),
          alt: "Dandelion Royal Homes külső kép"
        }
      }
    ]
  }
};

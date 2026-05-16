import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-06 22:55] D2 copy updated with panoramic pool focus, family-friendly tone and clean Hungarian text.
// [CHANGE 2026-05-16 12:45] D2 hero, intro, fact és gallery copy rövidítve; Panorama Pool kommunikáció és finom belső linkelés hozzáadva.
export const d2PageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 Kisapáti | Családbarát apartman kerttel",
    description:
      "Galériás apartman nagy udvarral, fedett terasszal és 2026. június 1-től elérhető Panorama Pool használattal a Balaton-felvidéken."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c64244f6153c3ca1",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-kisapati-hero-mobile-01.webp",
      "d2 mobile hero"
    ),
    fallbackAlt: "Dandelion D2 apartman kerttel a Szent György-hegy lábánál",
    kicker: "Balaton-felvidék - Szent György-hegy",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "GALÉRIÁS APARTMAN NAGY UDVARRAL ÉS FEDETT TERASSZAL",
    lead: "Világos, könnyen használható vendégház nyugodt kerti környezettel, fedett terasszal és jól felszerelt konyhával. Jó kiindulópont balatoni napokhoz, túrákhoz és lassabb estékhez.",
    supportingLink: {
      label: "Panorama Pool is elérhető a ház melletti dombon. Nézd meg a medence külön oldalát.",
      href: "/panorama-pool/"
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
    title: "Kényelmes napok a kert és a hegyek között",
    lead: "A D2-ben a galériás nappali, a fedett terasz és a tágas udvar adja a pihenés ritmusát. A ház egyszerűen használható családi bázis, ahonnan könnyű elindulni kirándulni, este pedig jó visszaérni a csendes kertbe."
  },
  details: {
    kicker: "Dandelion D2",
    title: "Fedett terasz, nagy udvar és könnyen használható családi terek",
    shortDescription:
      "A D2 azoknak jó választás, akik szeretnek nappal kint lenni, este pedig kényelmes, átgondolt terekbe visszaérni. Fedett terasz, nagy udvar, felújított konyha és közeli programlehetőségek adják a ház erősségét.",
    supportingLink: {
      label: "Programötletek és balatoni tippek az Élmények oldalon.",
      href: "/elmenyek/"
    },
    longDescription: [
      "A galériás nappali világos és jól használható közös tér, a felújított konyha pedig kényelmessé teszi a hosszabb itt tartózkodást is. A ház ritmusa egyszerű: reggeli a teraszon, napközben kirándulás vagy balatoni program, este nyugodt visszaérkezés a kertbe.",
      "A fedett terasz és a kerti ülőhelyek rosszabb időben is használhatók, a nagy udvar pedig sokat ad hozzá a pihenéshez. Itt van hely játszani, üldögélni, grillezni vagy csak élvezni a csendet.",
      "A D2 vendégei 2026. június 1-től a közös Panorama Poolt is használhatják. A medence a ház melletti dombon kapott helyet, így a fürdés mellé tanúhegyes panoráma és nyári balatoni-felvidéki hangulat is jár.",
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
          ["Panorama Pool", "a ház melletti dombon, 2026. június 1-től"],
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

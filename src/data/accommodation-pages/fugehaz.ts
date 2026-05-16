import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-06 22:10] Fugehaz page copy refined with premium Hungarian positioning and shared panoramic pool message.
// [CHANGE 2026-05-16 15:40] Fügeház hero kapott adatvezérelt panoráma medence kiemelést a shared template-hez.
export const fugehazPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Fügeház | Panorámás vendégház a Balaton-felvidéken",
    description:
      "Panorámás családi vendégház teraszokkal és 2026. június 1-től közös medencével a Balaton-felvidéken, a Szent György-hegy közelében."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=af2fdb8ed2ebb145",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "fugehaz",
      "gallery",
      "dandelion-fugehaz-source-001.webp",
      "fugehaz mobile hero"
    ),
    fallbackAlt: "Dandelion Fügeház panorámás vendégház a Balaton-felvidéken",
    kicker: "Balaton-felvidék - panorámás nyugalom",
    title: "Dandelion",
    titleAccent: "Fügeház",
    subtitle: "PANORÁMÁS PIHENÉS A TANÚHEGYEK KÖZELÉBEN",
    lead: "Panorámás családi vendégház a Szent György-hegy közelében, teraszokkal, grillezési lehetőséggel és 2026. június 1-től közös panorámás medencével. A Fügeház 4 főnek kényelmes, pótággyal akár 6 fő számára is alkalmas.",
    poolHighlight: {
      enabled: true,
      label: "Panoráma medence a ház melletti dombon",
      text: "2026. június 1-től a Fügeház vendégei is használhatják a közeli panoráma medencét.",
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
    intro: "Első körös, szerkeszthető review blokk a shared sablon technikai bekötéséhez.",
    mobileSummaryLabel: "További vélemények",
    mobileHighlightedAriaLabel: "Kiemelt Google értékelés",
    mobileMoreGoogleAriaLabel: "További Google értékelések",
    mobileBookingAriaLabel: "Booking.com értékelések",
    items: [
      {
        source: "Google",
        quote: "Nyugodt, átgondolt hely azoknak, akik panorámával és lassabb napokkal szeretnének kikapcsolódni.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Hangulatos terasz, visszafogott vidéki ritmus és kényelmes pihenés a Balaton-felvidéken.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Jó választás, ha természetközelben szeretnél megszállni, túlzsúfolt nyaralós hangulat nélkül.",
        meta: "Vendég · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Kellemes, csendes szállás, jó kiindulópont a környék bejárásához és esti pihenéshez.",
        meta: "Vendég · Booking.com · 9,0/10"
      },
      {
        source: "Booking.com",
        quote: "Barátságos, nyugodt hangulat, kényelmes napokhoz és lassabb balatoni-felvidéki programokhoz.",
        meta: "Vendég · Booking.com · 9,0/10"
      }
    ]
  },
  intro: {
    kicker: "Panoráma - nyugalom",
    title: "Panorámás pihenés a tanúhegyek közelében",
    lead: "A Fügeház egy csendes, panorámás vendégház a Szent György-hegy közelében, ahol a nyugodt reggelek, a hosszú teraszos esték és a hegyek látványa adják a pihenés ritmusát."
  },
  details: {
    kicker: "Fügeház",
    title: "Családi pihenés teraszokkal és panorámás medencével",
    shortDescription:
      "Panorámás családi vendégház a Szent György-hegy közelében, teraszokkal, grillezési lehetőséggel és június 1-től közös panorámás medencével. A Fügeház 4 főnek kényelmes, pótággyal akár 6 fő számára is alkalmas.",
    longDescription: [
      "A Fügeház egy csendes, panorámás vendégház a Szent György-hegy közelében, ahol a nyugodt reggelek, a hosszú teraszos esték és a hegyek látványa adják a pihenés ritmusát. A ház elsősorban családok számára ideális, de kisebb baráti társaságoknak is kényelmes választás.",
      "A vendégház 4 fő részére kényelmes, pótággyal akár 6 fő elszállásolására is alkalmas. Az étkezőből nyíló panorámás teraszról a Csobánc, a Tóti-hegy, a Gulács és a Badacsony látványában gyönyörködhetünk, a ház másik oldalán pedig kerti étkező és nyugodt pihenősarok várja a vendégeket, rálátással a Szent György-hegyre.",
      "2026. június 1-től a Fügeház, a D1 és a D2 vendégei számára közös panorámás medence is elérhető. A dombon kialakított medence és pihenőtér különleges nyári élményt ad: napközben fürdés és játék a gyerekeknek, este pedig hegyek, csend és balatoni nyárhangulat.",
      "A kintlétet teraszok, kerti bútorok és grillezési lehetőség teszik kényelmessé. A ház melletti dombról 360 fokos panoráma nyílik a környező tanúhegyekre, így a naplementék és a csillagos esték is külön élményt jelentenek.",
      "A ház két szinten biztosít kényelmes elhelyezést. Az alsó szinten jól felszerelt konyha, zuhanyzós fürdőszoba, nappali-hálótér és étkező található. Az emeleten egy légterű hálórész kapott helyet franciaággyal és ágyazható kanapéval."
    ],
    moreLabel: "Bővebben a Fügeházról",
    ctaLabel: "Árak és foglalás"
  },
  facts: {
    groups: [
      {
        title: "Alapadatok",
        items: [
          ["Férőhely", "4 fő, pótággyal akár 6 fő"],
          ["Elhelyezkedés", "Szent György-hegy közelében"],
          ["Hangulat", "panorámás, csendes, családbarát"],
          ["Kiemelés", "közös panorámás medence 2026. június 1-től"]
        ]
      },
      {
        title: "Kikapcsolódás",
        items: [
          ["Medence", "a dombon, tanúhegyes panorámával"],
          ["Kültér", "teraszos pihenés és grillezés"],
          ["Kilátás", "Csobánc, Tóti-hegy, Gulács, Badacsony"],
          ["Családoknak", "nyári fürdéshez és játékhoz is ideális"]
        ]
      }
    ]
  },
  features: {
    title: "Miért lehet jó választás",
    highlights: [
      { label: "Közös panorámás medence", icon: "pool" },
      { label: "Családbarát elhelyezés", icon: "users" },
      { label: "Panorámás teraszok", icon: "mountain" },
      { label: "Grillezési lehetőség", icon: "leaf" },
      { label: "Tanúhegyek közeli bázis", icon: "trail" },
      { label: "Nyugodt balatoni ritmus", icon: "route" }
    ]
  },
  gallery: {
    kicker: "Galéria",
    title: "Nyolc pillanat a Fügeház hangulatából",
    moreHint: "További képekért kattints",
    defaultHint: "A galéria képei kattinthatók",
    emptyMessage: "A Fügeház galériához jelenleg nincs feloldható kép a live registryben.",
    previewCount: 8
  },
  map: {
    kicker: "BALATON-FELVIDÉK · PANORÁMÁS PIHENÉS",
    title: "Környék és táj",
    body: "A Fügeház a Balaton-felvidék nyugodtabb, természetközeli hangulatához kapcsolódik. A környék jó választás lassabb pihenéshez, sétákhoz és kilátópontos kirándulásokhoz.",
    benefitsAriaLabel: "Környék előnyei",
    benefits: [
      { label: "Panorámás környezet", icon: "mountain" },
      { label: "Kirándulások a közelben", icon: "trail" },
      { label: "Nyugodt balatoni-felvidéki ritmus", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Fügeház környéke térkép"
  },
  lightbox: {
    galleryAriaLabel: "Fügeház galéria",
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
    intro: "Ha a panorámás Balaton-felvidéki pihenés mellett más Dandelion hangulat is érdekel, nézd meg a többi vendégházunkat is.",
    items: [
      {
        name: "Dandelion D2",
        meta: "4-6 fő · kert · családbarát",
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
            "fugehaz related koveskal"
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
            "fugehaz related royal homes"
          ),
          alt: "Dandelion Royal Homes külső kép"
        }
      }
    ]
  }
};

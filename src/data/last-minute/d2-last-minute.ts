// [CHANGE 2026-07-11 00:00] D2 last minute ajánlat konfiguráció külön adatfájlba szervezve a landing és kampányelőkészítés számára.
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

export const d2LastMinuteOffer = {
  campaignId: "d2_last_minute_2026_07_19",
  googleAdsCampaignName: "D2_LastMinute_2026-07-19",
  metaCampaignName: "D2_LastMinute_2026-07-19",
  utmCampaignName: "d2_last_minute_2026_07_19",
  propertyKey: "d2",
  propertyName: "Dandelion D2",
  discountLabel: "15% kedvezmény",
  promoCode: "D2Lastm",
  minimumNights: 4,
  validUntilLabel: "2026. július 19.",
  validUntilIso: "2026-07-19T23:59:59+02:00",
  offerStatus: "active",
  bookingUrl:
    "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c64244f6153c3ca1&lang=Hu",
  fallbackUrl: "/dandelion-d2/",
  canonicalPath: "/last-minute-d2/",
  heroImage: {
    desktop: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-kisapati-hero-desktop-01.webp",
      "d2 last minute hero desktop"
    ),
    mobile: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-kisapati-hero-mobile-01.webp",
      "d2 last minute hero mobile"
    ),
    alt: "Dandelion D2 fedett terasza és kertje Kisapátiban"
  },
  ogImage: requireAccommodationLocalAssetPath(
    "d2",
    "hero",
    "dandelion-d2-kisapati-hero-desktop-01.webp",
    "d2 last minute og image"
  ),
  poolImage: {
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-02.webp",
    alt: "Panorama Pool medence és terasz napernyőkkel a domboldali kilátás felé."
  },
  teaserImages: [
    {
      src: requireAccommodationLocalAssetPath(
        "d2",
        "gallery",
        "dandelion-d2-kisapati-gallery-01.webp",
        "d2 last minute teaser 1"
      ),
      alt: "Dandelion D2 fedett terasza sárga kerti bútorokkal"
    },
    {
      src: requireAccommodationLocalAssetPath(
        "d2",
        "gallery",
        "dandelion-d2-kisapati-gallery-04.webp",
        "d2 last minute teaser 2"
      ),
      alt: "Dandelion D2 nappalija nagy üvegajtóval és kertkapcsolattal"
    },
    {
      src: requireAccommodationLocalAssetPath(
        "d2",
        "gallery",
        "dandelion-d2-kisapati-gallery-07.webp",
        "d2 last minute teaser 3"
      ),
      alt: "Dandelion D2 egyik hálószobája világos textilekkel"
    }
  ],
  seo: {
    title: "D2 last minute - 15% kedvezmény 4 éjszakára | Dandelion House",
    description:
      "Last minute pihenés a Dandelion D2-ben: 15% kedvezmény 4 éjszakás foglalásra 2026. július 19-ig, D2Lastm kóddal."
  },
  hero: {
    eyebrow: "Dandelion D2 - Kisapáti - Balaton-felvidék",
    title: "Last minute 15% kedvezmény a Dandelion D2-ben",
    lead:
      "Foglalj legalább 4 éjszakára, használd a D2Lastm kódot, és a D2 nyugodt kertje, fedett terasza és Panorama Pool élménye mellé 15% kedvezményt is kapsz.",
    periodLabel: "4 éjszakás pihenéshez",
    validityLabel: "A kód 2026. július 19-ig érvényes."
  },
  offerDetails: {
    headline: "Mit tartalmaz az ajánlat?",
    items: [
      "15% kedvezmény, ha legalább 4 éjszakára foglalsz",
      "D2Lastm promóciós kód",
      "Dandelion D2, 4-6 főre",
      "Panorama Pool élmény a szezonban",
      "Fedett terasz, nagy kert, saját parkoló, klíma, Wi-Fi"
    ],
    note:
      "A foglalási felületen az aktuális ár látható. Ez az oldal nem jelenít meg becsült vagy mintaárat."
  },
  stayHighlights: [
    "4-6 fő részére kényelmes",
    "csendes kisapáti elhelyezkedés",
    "panoráma a környék tanúhegyire",
    "saját udvar és fedett terasz",
    "saját parkoló, klíma és Wi-Fi",
    "felszerelt konyha",
    "családoknak és pároknak is jó választás",
    "Panorama Pool élmény a szezonban"
  ],
  ideas: [
    "strandolás és balatoni napok rövid autóúttal",
    "kirándulás a tanúhegyeken",
    "Badacsony és a Káli-medence felfedezése",
    "borozás a környék pincészeteinél",
    "pihenés a Panorama Pool mellett",
    "nyugodt esték Kisapátiban"
  ],
  ctaLabels: {
    hero: "Megnézem a szabad időpontot",
    offer: "Lefoglalom a 4 éjszakát",
    footer: "Foglalás közvetlenül",
    sticky: "D2 last minute foglalás"
  },
  tracking: {
    property: "d2",
    campaign: "d2_last_minute_2026_07_19"
  }
} as const;

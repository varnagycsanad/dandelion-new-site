// [CHANGE 2026-05-21 00:00] Panorama Pool image registry refreshed from the 05-21 PC and mobile source photo set.

export type PanoramaPoolImageUsageHint = "hero" | "teaser" | "gallery";

export interface PanoramaPoolImageDraft {
  id: string;
  src: string;
  mobileSrc?: string;
  thumb: string;
  altHu: string;
  titleHu: string;
  captionHu: string;
  altEn: string;
  titleEn: string;
  captionEn: string;
  usageHint: PanoramaPoolImageUsageHint;
  sortOrder: number;
  approved: false;
}

export const panoramaPoolHero = {
  desktop: "/images/panorama-pool/hero/dandelion-panorama-pool-hero-desktop-20260610.webp",
  mobile: "/images/panorama-pool/hero/dandelion-panorama-pool-hero-mobile-20260610.webp"
};

export const panoramaPoolImages: PanoramaPoolImageDraft[] = [
  {
    id: "panorama-pool-001",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-001.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-001.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-001.webp",
    altHu: "Panorámás medence Kisapátiban fedett medencerésszel, napos terasszal és domboldali háttérrel.",
    titleHu: "Panorama Pool fedett medencerésszel",
    captionHu: "A Panorama Pool domboldali környezete, fedhető medencével és nyitott nyári terasszal.",
    altEn: "Panoramic pool in Kisapáti with a covered pool section, sunny terrace and hillside backdrop.",
    titleEn: "Panorama Pool with covered section",
    captionEn: "The hillside setting of Panorama Pool with a retractable cover and open summer terrace.",
    usageHint: "gallery",
    sortOrder: 10,
    approved: false,
  },
  {
    id: "panorama-pool-002",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-002.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-002.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-002.webp",
    altHu: "Közeli vízfelszín a Panorama Pool medencében, tükröződő felhőkkel és fedett medencerésszel.",
    titleHu: "Tükröződő vízfelszín",
    captionHu: "Közeli részlet a medence vízéről, ahol a felhők és a fedett medencerész is látszik.",
    altEn: "Close view of the Panorama Pool water surface with reflected clouds and the covered pool section.",
    titleEn: "Reflecting pool water",
    captionEn: "A close detail of the pool water with clouds and the covered section reflected on the surface.",
    usageHint: "gallery",
    sortOrder: 20,
    approved: false,
  },
  {
    id: "panorama-pool-003",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-003.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-003.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-003.webp",
    altHu: "Panorama Pool medence napozóágyakkal, terasszal és tanúhegyi kilátással Kisapátiban.",
    titleHu: "Medence tanúhegyi kilátással",
    captionHu: "A medence mellett napozóágyak és tágas terasz kapcsolódik a Szent György-hegy környéki panorámához.",
    altEn: "Panorama Pool with sun loungers, terrace and witness hill views in Kisapáti.",
    titleEn: "Pool with witness hill view",
    captionEn: "Sun loungers and a spacious terrace frame the pool with views toward the hills around Szent György Hill.",
    usageHint: "teaser",
    sortOrder: 30,
    approved: false,
  },
  {
    id: "panorama-pool-004",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-004.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-004.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-004.webp",
    altHu: "Hosszanti nézet a Panorama Pool medencére, napozóterasszal és falusi panorámával.",
    titleHu: "Hosszanti medencenézet",
    captionHu: "A hosszanti medencenézet a vízfelületet, a teraszt és a Kisapáti fölötti panorámát mutatja.",
    altEn: "Long view along Panorama Pool with sun terrace and village panorama.",
    titleEn: "Long pool view",
    captionEn: "This long pool view shows the water, the terrace and the panorama above Kisapáti.",
    usageHint: "teaser",
    sortOrder: 40,
    approved: false,
  },
  {
    id: "panorama-pool-005",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-005.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-005.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-005.webp",
    altHu: "Kék vizű Panorama Pool medence fedéssel, világos burkolattal és napozóágyakkal.",
    titleHu: "Medence világos terasszal",
    captionHu: "A világos burkolat, a kék víz és a napozóágyak együtt adják a medencetér nyári hangulatát.",
    altEn: "Blue Panorama Pool with pool cover, light terrace paving and sun loungers.",
    titleEn: "Pool with bright terrace",
    captionEn: "Light paving, blue water and sun loungers define the summer mood of the pool area.",
    usageHint: "gallery",
    sortOrder: 50,
    approved: false,
  },
  {
    id: "panorama-pool-006",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-006.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-006.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-006.webp",
    altHu: "Panorama Pool oldalnézetből, vízfelülettel, pihenőterasszal és Szent György-hegy környéki háttérrel.",
    titleHu: "Oldalnézet a medencére",
    captionHu: "Oldalnézetből a medence, a pihenőterasz és a környező domboldal is jól látszik.",
    altEn: "Side view of Panorama Pool with water surface, terrace and the hills around Szent György Hill.",
    titleEn: "Side view of the pool",
    captionEn: "The side view shows the pool, the terrace and the surrounding hillside setting.",
    usageHint: "gallery",
    sortOrder: 60,
    approved: false,
  },
  {
    id: "panorama-pool-007",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-007.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-007.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-007.webp",
    altHu: "Panorama Pool medence napozóágyakkal, kék törölközőkkel és távoli tanúhegyekkel.",
    titleHu: "Napozóágyak a medence mellett",
    captionHu: "A medence mellett elhelyezett napozóágyak mögött a Balaton-felvidéki dombok látszanak.",
    altEn: "Panorama Pool with sun loungers, blue towels and distant witness hills.",
    titleEn: "Sun loungers by the pool",
    captionEn: "Sun loungers beside the pool sit against the backdrop of the Balaton Uplands hills.",
    usageHint: "gallery",
    sortOrder: 70,
    approved: false,
  },
  {
    id: "panorama-pool-008",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-008.webp",
    mobileSrc: "/images/panorama-pool/mobile/dandelion-panorama-pool-mobile-008.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-008.webp",
    altHu: "Panorama Pool medence és napozóterasz Kisapáti háztetőivel és tanúhegyi háttérrel.",
    titleHu: "Medence Kisapáti panorámájával",
    captionHu: "A medencetérből Kisapáti háztetői és a környező tanúhegyek is láthatók.",
    altEn: "Panorama Pool and sun terrace with Kisapáti rooftops and witness hills in the background.",
    titleEn: "Pool with Kisapáti panorama",
    captionEn: "From the pool area, the rooftops of Kisapáti and the surrounding witness hills are visible.",
    usageHint: "gallery",
    sortOrder: 80,
    approved: false,
  },
  {
    id: "panorama-pool-009",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-009.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-009.webp",
    altHu: "Panorama Pool a domboldalon, kék vízzel, napozóágyakkal és széles balatoni-felvidéki panorámával.",
    titleHu: "Széles panoráma a medencénél",
    captionHu: "Széles nézet a medencéről, a pihenőteraszról és a Balaton-felvidék dombjairól.",
    altEn: "Panorama Pool on the hillside with blue water, sun loungers and a wide Balaton Uplands panorama.",
    titleEn: "Wide panorama by the pool",
    captionEn: "A wide view of the pool, the terrace and the hills of the Balaton Uplands.",
    usageHint: "hero",
    sortOrder: 90,
    approved: false,
  },
  {
    id: "panorama-pool-010",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-010.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-010.webp",
    altHu: "Panorama Pool medence és pihenőterasz, háttérben Kisapáti házaival és a Szent György-hegy vonulatával.",
    titleHu: "Panorámás medencetér Kisapátiban",
    captionHu: "A medence, a világos pihenőterasz és a Szent György-hegy környéki panoráma együtt jelenik meg.",
    altEn: "Panorama Pool and terrace with Kisapáti houses and the Szent György Hill ridge in the background.",
    titleEn: "Panoramic pool area in Kisapáti",
    captionEn: "The pool, bright terrace and the panorama around Szent György Hill appear together in this view.",
    usageHint: "teaser",
    sortOrder: 100,
    approved: false,
  },
];

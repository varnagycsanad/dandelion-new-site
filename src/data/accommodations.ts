import type { HomepageImageSlotKey } from "./homepage-image-slots";

export type AccommodationChipType = "default" | "accent" | "blue" | "green" | "purple";

export interface AccommodationChip {
  label: string;
  type?: AccommodationChipType;
}

export interface Accommodation {
  name: string;
  slug: string;
  url: string;
  location: string;
  description: string;
  hoverText: string;
  imageSlot: HomepageImageSlotKey;
  chips: AccommodationChip[];
  badge?: string;
  section: "upland" | "shore";
}

export const accommodationSections = [
  {
    key: "upland",
    eyebrow: "Kisapáti · Szent György-hegy · Tapolcai-medence",
    title: "Tanúhegyek ölelésében",
    subtitle:
      "Szőlősorok, tanúhegyek, csendes utcák és lassú reggelek adják ennek a tájnak a ritmusát. Itt a pihenés nem elszakadás, hanem megérkezés: panoráma, természetközeli nyugalom és a Balaton közelsége egy helyen.",
    gridClass: "dnd-grid--3"
  },
  {
    key: "shore",
    eyebrow: "Keszthely · Badacsonyörs · vízparti kikapcsolódás",
    title: "Balaton-parti könnyedség",
    subtitle:
      "Itt a Balaton közelsége adja a ritmust: strandolás, naplementék, könnyebb nyári napok és kényelmes, jól megközelíthető szállások. A vízparti élmény itt modernebb, lazább és közvetlenebb formában érkezik.",
    gridClass: "dnd-grid--2"
  }
] as const;

export const accommodations: Accommodation[] = [
  {
    name: "Dandelion D2",
    slug: "dandelion-d2",
    url: "https://dandelionhouse.hu/d2/",
    location: "Kisapáti / Balaton-felvidék",
    description: "Családbarát pihenés a hegyek közelében, kerttel és nyugodt vidéki hangulattal.",
    hoverText: "Családbarát pihenés a hegy lábánál, állatsimogatóval és dézsával.",
    imageSlot: "d2_card_image",
    section: "upland",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "Klíma", type: "blue" },
      { label: "Dézsa", type: "blue" },
      { label: "Állatsimogató (kecskék)", type: "purple" },
      { label: "Kandalló" },
      { label: "2 háló + nappali" },
      { label: "Családbarát", type: "purple" }
    ]
  },
  {
    name: "Fügeház",
    slug: "fugehaz",
    url: "https://dandelionhouse.hu/fuge/",
    location: "Balaton-felvidék",
    description: "Meghitt, könnyen belakható vendégház csendes napokhoz és lassú reggelekhez.",
    hoverText: "Hangulatos kuckó pároknak, panorámával és állatsimogatóval.",
    imageSlot: "fugehaz_card_image",
    section: "upland",
    chips: [
      { label: "2-4 fő", type: "accent" },
      { label: "Klíma", type: "blue" },
      { label: "Dézsa", type: "blue" },
      { label: "Állatsimogató (kecskék)", type: "purple" },
      { label: "Kandalló" },
      { label: "2 szint / 2 szoba" },
      { label: "Panoráma", type: "green" }
    ]
  },
  {
    name: "Dandelion D1",
    slug: "dandelion-d1",
    url: "https://dandelionhouse.hu/dandelion-d1/",
    location: "Kisapáti / Balaton-felvidék",
    description: "Tágas vendégház közös pihenéshez, balatoni hétvégékhez és nyugodt estékhez.",
    hoverText: "A nagy társaságok kedvence: hatalmas terek, kandalló, közös főzések.",
    imageSlot: "d1_card_image",
    section: "upland",
    chips: [
      { label: "6-8 fő", type: "accent" },
      { label: "Klíma", type: "blue" },
      { label: "3 szoba + nappali" },
      { label: "2 fürdő" },
      { label: "Zárt parkoló" },
      { label: "Kandalló" },
      { label: "Nagycsaládosoknak", type: "purple" },
      { label: "Nagy telek", type: "green" }
    ]
  },
  {
    name: "Dandelion Szőlőliget",
    slug: "szololiget-vendeghaz",
    url: "/szololiget/",
    location: "Balaton-felvidék",
    description: "Vidéki hangulatú ház szőlők, tanúhegyek és nyári esték közé hangolva.",
    hoverText: "Szőlőlugasok ölelésében, távol a város zajától.",
    imageSlot: "szololiget_card_image",
    section: "upland",
    chips: [
      { label: "2-4 fő", type: "accent" },
      { label: "Klíma", type: "blue" },
      { label: "1 háló + nappali" },
      { label: "Csendes", type: "purple" },
      { label: "Természetközeli", type: "green" },
      { label: "Kilátás a Csobáncra", type: "green" }
    ]
  },
  {
    name: "Dandelion Zsálya",
    slug: "zsalya-vendeghaz",
    url: "/dandelion-zsalya/",
    location: "Balaton-felvidék",
    description: "Letisztult szállás azoknak, akik természetközeli, nyugodt kikapcsolódásra vágynak.",
    hoverText: "Természetközeli hangulat, hatalmas tér a kikapcsolódáshoz.",
    imageSlot: "zsalya_card_image",
    section: "upland",
    chips: [
      { label: "2-4 fő", type: "accent" },
      { label: "Klíma", type: "blue" },
      { label: "2 háló + nappali" },
      { label: "Hatalmas telek", type: "green" },
      { label: "Nyugalom", type: "purple" },
      { label: "Családbarát", type: "purple" }
    ]
  },
  {
    name: "Dandelion Vintage",
    slug: "vintage-vendeghaz",
    url: "/dandelion-vintage/",
    location: "Balaton-felvidék",
    description: "Otthonos vendégház klasszikus vidéki hangulattal és kényelmes elrendezéssel.",
    hoverText: "Otthonos, vintage hangulatú pihenés a Balaton-felvidék csendesebb oldalán.",
    imageSlot: "vintage_card_image",
    section: "upland",
    chips: [
      { label: "Vendégház", type: "accent" },
      { label: "Csendes", type: "purple" },
      { label: "Természetközeli", type: "green" },
      { label: "Vintage hangulat" }
    ]
  },
  {
    name: "Dandelion Royal Homes",
    slug: "royal-homes",
    url: "/royal/",
    location: "Balaton-part",
    description: "Kényelmes, igényes szálláshely páros vagy családi pihenéshez.",
    hoverText: "Luxus kivitel a Balaton mellett, pezsgőfürdős kényeztetéssel.",
    imageSlot: "royal_homes_card_image",
    section: "shore",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "Közvetlen vízpart", type: "blue" },
      { label: "Jakuzzi a tetőteraszon", type: "blue" },
      { label: "Hatalmas erkély", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Padlófűtés" },
      { label: "Ultramodern", type: "purple" },
      { label: "Keszthely" }
    ]
  },
  {
    name: "Dandelion Szépvölgyi",
    slug: "szepvolgyi-vendeghaz",
    url: "/szepvolgyi/",
    location: "Balaton-part",
    description: "Nyugodt kiindulópont a Tapolcai-medence és a Balaton-felvidék felfedezéséhez.",
    hoverText: "Nagyvonalú terek Badacsonyörsön, pár percre a strandtól.",
    imageSlot: "szepvolgyi_card_image",
    section: "shore",
    chips: [
      { label: "8 fő", type: "accent" },
      { label: "Klíma", type: "blue" },
      { label: "Strand 5p autó", type: "blue" },
      { label: "4 háló + nappali" },
      { label: "2 fürdő" },
      { label: "Nagy udvar", type: "green" },
      { label: "Badacsonyörs" }
    ]
  }
];

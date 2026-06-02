import type { HomepageImageSlotKey } from "./homepage-image-slots";

export type AccommodationChipType = "default" | "accent" | "blue" | "green" | "purple";

export interface AccommodationChip {
  label: string;
  type?: AccommodationChipType;
}

export interface AccommodationSection {
  key: "upland" | "shore" | "kali";
  eyebrow: string;
  title: string;
  subtitle: string;
  gridClass: "dnd-grid--3" | "dnd-grid--2" | "dnd-grid--1";
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
  section: AccommodationSection["key"];
}

export const accommodationSections: AccommodationSection[] = [
  {
    key: "upland",
    eyebrow: "Szent György-hegy · Tapolcai-medence · Kisapáti · Nemesgulács",
    title: "Tanúhegyek ölelésében",
    subtitle:
      "Túraútvonalak, borászatok és többféle háztípus ugyanabban a térségben. Akkor jó választás, ha a Balaton-felvidék klasszikus oldalát keresed.",
    gridClass: "dnd-grid--2"
  },
  {
    key: "shore",
    eyebrow: "Keszthely · Badacsonyörs · vízparti kikapcsolódás",
    title: "Balaton-parti könnyedség",
    subtitle:
      "Közelebb a strandokhoz, a kikötőkhöz és a balatoni programokhoz. Akkor jó választás, ha a vízpart és a kényelmes elérés is fontos.",
    gridClass: "dnd-grid--2"
  },
  {
    key: "kali",
    eyebrow: "Köveskál · Káli-medence · elvonulós pihenés",
    title: "A Káli-medence csendjében",
    subtitle:
      "Köveskál és a Káli-medence nyugodtabb, falusias oldala. Akkor jó választás, ha kevésbé programközpontú, visszafogott pihenést keresel.",
    gridClass: "dnd-grid--1"
  }
];

export const accommodations: Accommodation[] = [
  {
    name: "Dandelion D1",
    slug: "dandelion-d1",
    url: "/dandelion-d1/",
    location: "Kisapáti / Balaton-felvidék",
    description: "Tágas vendégház 6-8 főre, három hálóval, panorámás terasszal és nagyobb társaságoknak is kényelmes elrendezéssel.",
    hoverText: "6-8 főre, 3 hálóval és panorámás terasszal.",
    imageSlot: "d1_card_image",
    section: "upland",
    chips: [
      { label: "6-8 fő", type: "accent" },
      { label: "3 szoba + nappali" },
      { label: "Panorámás medence", type: "blue" },
      { label: "Panorámás terasz", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "2 fürdő" },
      { label: "Zárt parkoló" },
      { label: "Kandalló" },
      { label: "Nagycsaládosoknak", type: "purple" }
    ]
  },
  {
    name: "Dandelion D2",
    slug: "dandelion-d2",
    url: "/dandelion-d2/",
    location: "Kisapáti / Balaton-felvidék",
    description: "Modern, családbarát apartman 4-6 főre nagy udvarral, panorámás medencehasználattal és közeli kirándulóhelyekkel.",
    hoverText: "4-6 főre, panorámás medencehasználattal és állatsimogatóval.",
    imageSlot: "d2_card_image",
    section: "upland",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "2 háló + nappali" },
      { label: "Panorámás medence", type: "blue" },
      { label: "Klíma", type: "blue" },
      { label: "Állatsimogató", type: "purple" },
      { label: "Kandalló" },
      { label: "Családbarát", type: "purple" }
    ]
  },
  {
    name: "Fügeház",
    slug: "fugehaz",
    url: "/fuge/",
    location: "Szent György-hegy közelében",
    description: "Panorámás vendégház 4-6 főre teraszokkal, panorámás medencehasználattal és családi pihenéshez jó elrendezéssel.",
    hoverText: "4-6 főre, panorámával és panorámás medencehasználattal.",
    imageSlot: "fugehaz_card_image",
    section: "upland",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "2 szint / 2 szoba" },
      { label: "Panoráma", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Panorámás medence", type: "blue" },
      { label: "Kandalló" },
      { label: "Állatsimogató", type: "purple" }
    ]
  },
  {
    name: "Dandelion Zsálya",
    slug: "zsalya-vendeghaz",
    url: "/dandelion-zsalya/",
    location: "Szent György-hegy keleti oldala / Kisapáti",
    description: "Különálló vendégház 4 főre fedett terasszal, panorámával és nyugodt hegyoldali környezettel.",
    hoverText: "4 főre, fedett terasszal és tanúhegy panorámával.",
    imageSlot: "zsalya_card_image",
    section: "upland",
    chips: [
      { label: "2-4 fő", type: "accent" },
      { label: "2 háló + nappali" },
      { label: "Panoráma", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Fedett terasz", type: "green" },
      { label: "Családbarát", type: "purple" }
    ]
  },
  {
    name: "Dandelion Szőlőliget",
    slug: "szololiget-vendeghaz",
    url: "/szololiget/",
    location: "Kisapáti / Szent György-hegy keleti oldala",
    description: "Különálló ház 4 főre nagy terasszal és tanúhegy panorámával, ha nyugodtabb hegyoldali bázist keresel.",
    hoverText: "4 főre, nagy terasszal és panorámával.",
    imageSlot: "szololiget_card_image",
    section: "upland",
    chips: [
      { label: "2-4 fő", type: "accent" },
      { label: "1 háló + nappali" },
      { label: "Panoráma", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Csendes", type: "purple" },
      { label: "Kilátás a Csobáncra", type: "green" }
    ]
  },
  {
    name: "Dandelion Vintage",
    slug: "vintage-vendeghaz",
    url: "/dandelion-vintage/",
    location: "Nemesgulács / Balaton-felvidék",
    description: "Kényelmes vendégház Nemesgulácson 2 hálóval, saját udvarral és balatoni programokhoz is jó kiindulóponttal.",
    hoverText: "Nemesgulácson, 2 hálóval és saját udvarral.",
    imageSlot: "vintage_card_image",
    section: "upland",
    chips: [
      { label: "Vendégház", type: "accent" },
      { label: "2 háló + nappali" },
      { label: "Saját udvar", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Nemesgulács" },
      { label: "Vintage hangulat" }
    ]
  },
  {
    name: "Dandelion Royal Homes",
    slug: "royal-homes",
    url: "/royal/",
    location: "Keszthely / Balaton-part",
    description: "Prémium apartman 4-6 főre saját parti mólóval, nagy terasszal és tetőteraszos jakuzzival.",
    hoverText: "4-6 főre, saját mólóval és tetőteraszos jakuzzival.",
    imageSlot: "royal_homes_card_image",
    section: "shore",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "Közvetlen vízpart", type: "blue" },
      { label: "2 háló + nappali" },
      { label: "Jakuzzi a tetőteraszon", type: "blue" },
      { label: "Klíma", type: "blue" },
      { label: "Nagy terasz", type: "green" },
      { label: "Padlófűtés" },
      { label: "Keszthely" }
    ]
  },
  {
    name: "Dandelion Szépvölgyi",
    slug: "szepvolgyi-vendeghaz",
    url: "/szepvolgyi/",
    location: "Badacsonyörs / Szépvölgyi út",
    description: "Tágas nyaraló 8 főre, 4 hálóval, balatoni panorámával és strandközeli elhelyezkedéssel.",
    hoverText: "8 főre, 4 hálóval és balatoni panorámával.",
    imageSlot: "szepvolgyi_card_image",
    section: "shore",
    chips: [
      { label: "8 fő", type: "accent" },
      { label: "4 háló + nappali" },
      { label: "Balatoni panoráma", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Strand 5p autó", type: "blue" },
      { label: "2 fürdő" },
      { label: "Nagy udvar", type: "green" },
      { label: "Badacsonyörs" }
    ]
  },
  {
    name: "Dandelion Köveskál",
    slug: "dandelion-koveskal",
    url: "/dandelion-koveskal/",
    location: "Köveskál / Káli-medence",
    description: "Nyugodt vendégház Köveskálon, jó kiindulóponttal a Káli-medence falvaihoz, túráihoz és boros megállóihoz.",
    hoverText: "Köveskálon, visszafogott pihenéshez.",
    imageSlot: "koveskal_card_image",
    section: "kali",
    chips: [
      { label: "Vendégház", type: "accent" },
      { label: "Köveskál" },
      { label: "Káli-medence", type: "green" },
      { label: "Természetközeli", type: "green" },
      { label: "Elvonuláshoz ideális", type: "purple" },
      { label: "Nyugodt falu", type: "purple" }
    ]
  }
];

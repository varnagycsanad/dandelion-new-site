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
      "Kisapáti, Nemesgulács és a Szent György-hegy környéke azoknak való, akik hegyoldali házat, panorámát, kertet és könnyen elérhető kirándulásokat keresnek.",
    gridClass: "dnd-grid--2"
  },
  {
    key: "shore",
    eyebrow: "Keszthely · Badacsonyörs · vízparti kikapcsolódás",
    title: "Balaton-parti könnyedség",
    subtitle:
      "Keszthely és Badacsonyörs akkor jó irány, ha a Balaton közelsége, a strandok és a kényelmes vízparti programok fontosabbak, mint a hegyoldali elvonulás.",
    gridClass: "dnd-grid--2"
  },
  {
    key: "kali",
    eyebrow: "Köveskál · Káli-medence · elvonulós pihenés",
    title: "A Káli-medence csendjében",
    subtitle:
      "Köveskál lassabb, csendesebb választás: falusi környezet, Káli-medencei séták, borászatok és visszafogottabb pihenés.",
    gridClass: "dnd-grid--1"
  }
];

export const accommodations: Accommodation[] = [
  {
    name: "Dandelion D1",
    slug: "dandelion-d1",
    url: "/dandelion-d1/",
    location: "Kisapáti / Balaton-felvidék",
    description: "Tágas kisapáti vendégház nagyobb családoknak vagy baráti társaságoknak, három hálóval, két fürdővel, terasszal és nyári közös medencehasználattal.",
    hoverText: "6-8 főre, 3 hálóval és panorámás terasszal.",
    imageSlot: "d1_card_image",
    section: "upland",
    chips: [
      { label: "6-8 fő", type: "accent" },
      { label: "3 szoba + nappali" },
      { label: "Közös Panorama Pool", type: "blue" },
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
    description: "Családbarát kisapáti apartman nagy kerttel, fedett terasszal, kandallóval és nyári közös medencehasználattal.",
    hoverText: "4-6 főre, kerttel, terasszal és közös Panorama Pool hozzáféréssel.",
    imageSlot: "d2_card_image",
    section: "upland",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "2 háló + nappali" },
      { label: "Közös Panorama Pool", type: "blue" },
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
    description: "Hegyhez közeli vendégház teraszokkal, panorámával és nyugodt kinti terekkel, kisebb családoknak vagy baráti pihenéshez.",
    hoverText: "4-6 főre, teraszokkal, panorámával és közös Panorama Pool hozzáféréssel.",
    imageSlot: "fugehaz_card_image",
    section: "upland",
    chips: [
      { label: "4-6 fő", type: "accent" },
      { label: "2 szint / 2 szoba" },
      { label: "Panoráma", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Közös Panorama Pool", type: "blue" },
      { label: "Kandalló" },
      { label: "Állatsimogató", type: "purple" }
    ]
  },
  {
    name: "Dandelion Zsálya",
    slug: "zsalya-vendeghaz",
    url: "/dandelion-zsalya/",
    location: "Szent György-hegy keleti oldala / Kisapáti",
    description: "Különálló kisapáti vendégház fedett terasszal és tanúhegyes panorámával, ha csendesebb, intimebb házat keresel.",
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
    description: "Különálló ház nagy terasszal és Csobáncra néző kilátással, lassabb hegyoldali napokhoz.",
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
    description: "Nemesgulácsi vendégház saját udvarral és két hálóval, kényelmes választás balatoni programok és nyugodtabb esték mellé.",
    hoverText: "Nemesgulácson, 2 hálóval és saját udvarral.",
    imageSlot: "vintage_card_image",
    section: "upland",
    chips: [
      { label: "Vendégház", type: "accent" },
      { label: "2 háló + nappali" },
      { label: "Saját udvar", type: "green" },
      { label: "Klíma", type: "blue" },
      { label: "Nemesgulács" },
      { label: "Nyugodt esték" }
    ]
  },
  {
    name: "Dandelion Royal Homes",
    slug: "royal-homes",
    url: "/royal/",
    location: "Keszthely / Balaton-part",
    description: "Modern keszthelyi apartman 4-6 főre, nagy terasszal, tetőteraszos jakuzzival és közvetlen vízparti környezettel.",
    hoverText: "4-6 főre, Balaton-parti környezetben és tetőteraszos jakuzzival.",
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
    description: "Nagyobb társaságoknak való badacsonyörsi ház négy hálóval, balatoni panorámával és pár perces autós strandtávolsággal.",
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
    description: "Csendes köveskáli vendégház a Káli-medence falvaihoz, sétáihoz és borászataihoz közel.",
    hoverText: "Köveskálon, lassabb Káli-medencei napokhoz.",
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

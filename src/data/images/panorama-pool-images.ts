// [CHANGE 2026-05-10 00:00] Panorama Pool WebP gallery draft SEO adatfájl létrehozása.

export type PanoramaPoolImageUsageHint = "hero" | "teaser" | "gallery";

export interface PanoramaPoolImageDraft {
  id: string;
  src: string;
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

export const panoramaPoolImages: PanoramaPoolImageDraft[] = [
  {
    id: "panorama-pool-001",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-001.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-001.webp",
    altHu: "Panorámás medence Kisapátiban, a fedhető medence mögött tanúhegyi kilátással.",
    titleHu: "Panoráma medence tanúhegyi kilátással",
    captionHu: "Készülő panorama pool Kisapátiban, fedhető medencével és Balaton-felvidéki háttérrel.",
    altEn: "Panoramic pool in Kisapáti with covered pool structure and witness hills in the background.",
    titleEn: "Panoramic pool with witness hill views",
    captionEn: "Coming-soon panorama pool in Kisapáti with a retractable cover and Balaton Uplands scenery.",
    usageHint: "hero",
    sortOrder: 10,
    approved: false,
  },
  {
    id: "panorama-pool-002",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-002.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-002.webp",
    altHu: "Fedhető medence és domboldali panoráma Kisapátiban, félkész környezettel.",
    titleHu: "Fedhető medence domboldali panorámával",
    captionHu: "Teaser kép a készülő medencekörnyezetről, panorámás kilátással a környező dombokra.",
    altEn: "Covered pool and hillside panorama in Kisapáti with the surroundings still under development.",
    titleEn: "Covered pool with hillside panorama",
    captionEn: "Teaser view of the developing pool area with panoramic hills in the background.",
    usageHint: "teaser",
    sortOrder: 20,
    approved: false,
  },
  {
    id: "panorama-pool-003",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-003.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-003.webp",
    altHu: "Kisapáti látképe és a Balaton-felvidéki tanúhegyek a fedhető medence fölött.",
    titleHu: "Tanúhegyi panoráma a medence felett",
    captionHu: "Panorámakép a készülő medence mellől, a környező faluképpel és hegyekkel.",
    altEn: "Village view of Kisapáti and the Balaton Uplands witness hills above the covered pool.",
    titleEn: "Witness hill panorama above the pool",
    captionEn: "Panoramic view from the pool area showing the village and the surrounding hills.",
    usageHint: "teaser",
    sortOrder: 30,
    approved: false,
  },
  {
    id: "panorama-pool-004",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-004.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-004.webp",
    altHu: "Medence a hegyoldal alatt Kisapátiban, napfényes égbolttal és félkész parttal.",
    titleHu: "Medence hegyoldali háttérrel",
    captionHu: "A fedhető medence és a domboldali környezet a kivitelezés köztes állapotában.",
    altEn: "Pool below the hillside in Kisapáti with bright sky and unfinished poolside surroundings.",
    titleEn: "Pool with hillside backdrop",
    captionEn: "The covered pool and hillside setting shown in an in-progress phase of the project.",
    usageHint: "gallery",
    sortOrder: 40,
    approved: false,
  },
  {
    id: "panorama-pool-005",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-005.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-005.webp",
    altHu: "Kisapáti panorámás medencéje hintaággyal és tanúhegyi háttérrel.",
    titleHu: "Panorámás medence hintaággyal",
    captionHu: "A medence és a pihenőrészlet együtt jelenik meg a Balaton-felvidéki panorámával.",
    altEn: "Panoramic pool in Kisapáti with a swing seat and witness hills in the background.",
    titleEn: "Panoramic pool with swing seat",
    captionEn: "The pool and a relaxing corner are shown together with the Balaton Uplands panorama.",
    usageHint: "gallery",
    sortOrder: 50,
    approved: false,
  },
  {
    id: "panorama-pool-006",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-006.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-006.webp",
    altHu: "Fedhető medence Kisapátiban, előtérben vízfelülettel és háttérben hintaággyal.",
    titleHu: "Fedhető medence pihenősarokkal",
    captionHu: "A készülő medencekörnyezet részlete, amely a vízfelületet és a környező panorámát is mutatja.",
    altEn: "Covered pool in Kisapáti with the water in the foreground and a swing seat in the background.",
    titleEn: "Covered pool with relaxation corner",
    captionEn: "A detail from the developing pool area showing the water surface and the panoramic setting.",
    usageHint: "gallery",
    sortOrder: 60,
    approved: false,
  },
  {
    id: "panorama-pool-007",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-007.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-007.webp",
    altHu: "Medencefedés és panoráma a tanúhegyek felé Kisapátiban.",
    titleHu: "Medencefedés panorámás háttérrel",
    captionHu: "Teaser nézet a fedhető medencéről és a Balaton-felvidéki látványról.",
    altEn: "Pool cover and panoramic view toward the witness hills in Kisapáti.",
    titleEn: "Pool cover with panoramic backdrop",
    captionEn: "Teaser view of the covered pool and the Balaton Uplands landscape.",
    usageHint: "gallery",
    sortOrder: 70,
    approved: false,
  },
  {
    id: "panorama-pool-008",
    src: "/images/panorama-pool/gallery/dandelion-panorama-pool-008.webp",
    thumb: "/images/panorama-pool/thumbs/dandelion-panorama-pool-008.webp",
    altHu: "Készülő medencekörnyezet Kisapátiban földmunkával és részben elkészült fallal.",
    titleHu: "Készülő medencekörnyezet panorámával",
    captionHu: "A medenceprojekt aktuális állapota, ahol a panoráma és a kivitelezés részletei együtt látszanak.",
    altEn: "Developing pool area in Kisapáti with earthworks and a partially finished retaining wall.",
    titleEn: "Developing pool area with panorama",
    captionEn: "Current stage of the pool project, showing both the panorama and the construction details.",
    usageHint: "teaser",
    sortOrder: 80,
    approved: false,
  },
];

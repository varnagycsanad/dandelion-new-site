export const apartments = {
  d2: {
    key: "d2",
    slug: "dandelion-d2",
    title: "Dandelion D2",
  },
  d1: {
    key: "d1",
    slug: "dandelion-d1",
    title: "Dandelion D1",
  },
  fugehaz: {
    key: "fugehaz",
    slug: "dandelion-fugehaz",
    title: "Dandelion Fügeház",
  },
  zsalya: {
    key: "zsalya",
    slug: "dandelion-zsalya",
    title: "Dandelion Zsálya Vendégház",
  },
  szololiget: {
    key: "szololiget",
    slug: "dandelion-szololiget",
    title: "Dandelion Szőlőliget Vendégház",
  },
  szepvolgyi: {
    key: "szepvolgyi",
    slug: "dandelion-szepvolgyi-vendeghaz",
    title: "Dandelion Szépvölgyi Vendégház",
  },
  keszthely: {
    key: "keszthely",
    slug: "dandelion-keszthely",
    title: "Dandelion Royal Homes Keszthely",
  },
  vintage: {
    key: "vintage",
    slug: "dandelion-vintage-vendeghaz",
    title: "Dandelion Vintage Vendégház",
  },
  koveskal: {
    key: "koveskal",
    slug: "dandelion-koveskal",
    title: "Dandelion Köveskál",
  },
} as const;

export type ApartmentKey = keyof typeof apartments;

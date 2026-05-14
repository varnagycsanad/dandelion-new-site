// [CHANGE 2026-04-26 00:00] Ăśres accommodation image registry vĂˇz lĂ©trehozĂˇsa.
// [CHANGE 2026-04-26 00:00] LakĂˇskulcs-alapĂş ĂĽres accommodation image registry inicializĂˇlĂˇsa.
// [CHANGE 2026-04-26 00:00] D2 gallery ImageAsset registry kitĂ¶ltĂ©se lokĂˇlis WebP Ă©s thumb kĂ©pekkel.
// [CHANGE 2026-04-26 00:00] D2 hero ImageAsset registry kitĂ¶ltĂ©se lokĂˇlis desktop Ă©s mobil WebP kĂ©pekkel.
// [CHANGE 2026-04-26 00:00] D2 card ImageAsset registry kitĂ¶ltĂ©se lokĂˇlis WebP kĂ©ppel.
import {
  d2LocalAstroAssets,
  requireAccommodationLocalAssetByKey
} from "./astro-local-assets";
import type { AccommodationImageSet } from "./image-types";

function buildAstroGalleryRefs(apartmentKey: string, filename: string) {
  const astroSrc = requireAccommodationLocalAssetByKey(
    apartmentKey,
    "gallery",
    filename,
    `${apartmentKey} gallery`
  );
  const thumbAstroSrc = requireAccommodationLocalAssetByKey(
    apartmentKey,
    "thumbs",
    filename,
    `${apartmentKey} thumbnail`
  );

  return {
    src: astroSrc.src,
    thumb: thumbAstroSrc.src,
    astroSrc,
    thumbAstroSrc,
    sourceOriginalUrl: `/src/assets/accommodations/${apartmentKey}/gallery/${filename}`
  };
}

const d1SourceFilenames = [
  "2024-06-23 15-33-24.jpeg",
  "2024-06-23 15-34-06.jpeg",
  "2024-06-23 15-36-08.jpeg",
  "2024-06-23 15-36-28.jpeg",
  "2024-06-23 15-41-04.jpeg",
  "2024-06-23 15-41-39.jpeg",
  "2024-06-23 15-42-26.jpeg",
  "2024-06-23 15-43-28.jpeg",
  "2024-06-23 15-43-42.jpeg",
  "2024-06-23 15-45-15.jpeg",
  "2024-06-23 15-45-32.jpeg",
  "2024-06-23 15-45-53.jpeg",
  "2024-06-23 15-46-04.jpeg",
  "2024-06-23 15-46-15.jpeg",
  "2024-06-23 15-47-30.jpeg",
  "2024-06-23 15-48-29.jpeg",
  "2024-06-23 15-48-48.jpeg",
  "2024-06-29 09-53-49.jpeg",
];

function buildD1GalleryEntries() {
  return d1SourceFilenames.map((sourceFilename, index) => {
    const sequence = String(index + 1).padStart(3, "0");
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-d1-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("d1", filename);

    return {
      id: `d1-${sequence}`,
      apartmentKey: "d1",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Dandelion D1 gallery ${sequence}`,
        en: `Dandelion D1 gallery ${sequence}`,
      },
      title: {
        hu: `Dandelion D1 ${sequence}`,
        en: `Dandelion D1 ${sequence}`,
      },
      caption: {
        hu: `Dandelion D1 gallery image ${sequence}.`,
        en: `Dandelion D1 gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-06",
      updatedAt: "2026-05-06",
    };
  });
}

function buildFugehazGalleryEntries() {
  return Array.from({ length: 13 }, (_, index) => {
    const sequence = String(index + 1).padStart(3, "0");
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-fugehaz-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("fugehaz", filename);

    return {
      id: `fugehaz-${sequence}`,
      apartmentKey: "fugehaz",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Fugehaz gallery ${sequence}`,
        en: `Fugehaz gallery ${sequence}`,
      },
      title: {
        hu: `Fugehaz ${sequence}`,
        en: `Fugehaz ${sequence}`,
      },
      caption: {
        hu: `Fugehaz gallery image ${sequence}.`,
        en: `Fugehaz gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-05",
      updatedAt: "2026-05-05",
    };
  });
}

function buildSzololigetGalleryEntries() {
  return Array.from({ length: 21 }, (_, index) => {
    const sequence = String(index + 1).padStart(3, "0");
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-szololiget-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("szololiget", filename);

    return {
      id: `szololiget-${sequence}`,
      apartmentKey: "szololiget",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Szololiget gallery ${sequence}`,
        en: `Szololiget gallery ${sequence}`,
      },
      title: {
        hu: `Szololiget ${sequence}`,
        en: `Szololiget ${sequence}`,
      },
      caption: {
        hu: `Szololiget gallery image ${sequence}.`,
        en: `Szololiget gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-05",
      updatedAt: "2026-05-05",
    };
  });
}

function buildZsalyaGalleryEntries() {
  return Array.from({ length: 11 }, (_, index) => {
    const sequence = String(index + 1).padStart(3, "0");
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-zsalya-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("zsalya", filename);

    return {
      id: `zsalya-${sequence}`,
      apartmentKey: "zsalya",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Zsalya gallery ${sequence}`,
        en: `Zsalya gallery ${sequence}`,
      },
      title: {
        hu: `Zsalya ${sequence}`,
        en: `Zsalya ${sequence}`,
      },
      caption: {
        hu: `Zsalya gallery image ${sequence}.`,
        en: `Zsalya gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-05",
      updatedAt: "2026-05-05",
    };
  });
}

const royalHomesGalleryOrder = [
  "022",
  "007",
  "029",
  "010",
  "015",
  "001",
  "031",
  "004",
  "005",
  "006",
  "008",
  "019",
  "011",
  "009",
  "017",
  "012",
  "013",
  "002",
  "014",
  "003",
  "016",
  "018",
  "023",
  "026",
  "020",
  "021",
  "024",
  "025",
  "027",
  "028",
  "030",
  "032",
  "033",
];

function buildRoyalHomesGalleryEntries() {
  return royalHomesGalleryOrder.map((sequence, index) => {
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-royal-homes-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("royal_homes", filename);

    return {
      id: `royal-homes-${sequence}`,
      apartmentKey: "royal_homes",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Royal Homes gallery ${sequence}`,
        en: `Royal Homes gallery ${sequence}`,
      },
      title: {
        hu: `Royal Homes ${sequence}`,
        en: `Royal Homes ${sequence}`,
      },
      caption: {
        hu: `Royal Homes gallery image ${sequence}.`,
        en: `Royal Homes gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-05",
      updatedAt: "2026-05-05",
    };
  });
}

function buildKoveskalGalleryEntries() {
  return Array.from({ length: 21 }, (_, index) => {
    const sequence = String(index + 1).padStart(3, "0");
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-koveskal-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("koveskal", filename);

    return {
      id: `koveskal-${sequence}`,
      apartmentKey: "koveskal",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Dandelion Koveskal gallery ${sequence}`,
        en: `Dandelion Koveskal gallery ${sequence}`,
      },
      title: {
        hu: `Dandelion Koveskal ${sequence}`,
        en: `Dandelion Koveskal ${sequence}`,
      },
      caption: {
        hu: `Dandelion Koveskal gallery image ${sequence}.`,
        en: `Dandelion Koveskal gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-05",
      updatedAt: "2026-05-05",
    };
  });
}

function buildSzepvolgyiGalleryEntries() {
  return Array.from({ length: 22 }, (_, index) => {
    const sequence = String(index + 1).padStart(3, "0");
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-szepvolgyi-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("szepvolgyi", filename);

    return {
      id: `szepvolgyi-${sequence}`,
      apartmentKey: "szepvolgyi",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Szepvolgyi gallery ${sequence}`,
        en: `Szepvolgyi gallery ${sequence}`,
      },
      title: {
        hu: `Szepvolgyi ${sequence}`,
        en: `Szepvolgyi ${sequence}`,
      },
      caption: {
        hu: `Szepvolgyi gallery image ${sequence}.`,
        en: `Szepvolgyi gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-06",
      updatedAt: "2026-05-06",
    };
  });
}

function buildVintageGalleryEntries() {
  const orderedSequences = [
    "006",
    "003",
    "008",
    "002",
    "007",
    "012",
    "004",
    "009",
    "001",
    "010",
    "005",
    "011",
    "013",
    "014",
    "015",
    "016",
    "017",
    "018",
  ];

  return orderedSequences.map((sequence, index) => {
    const sortOrder = (index + 1) * 10;
    const filename = `dandelion-vintage-source-${sequence}.webp`;
    const { src, thumb, astroSrc, thumbAstroSrc, sourceOriginalUrl } = buildAstroGalleryRefs("vintage", filename);

    return {
      id: `vintage-${sequence}`,
      apartmentKey: "vintage",
      role: "gallery",
      src,
      thumb,
      astroSrc,
      thumbAstroSrc,
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      alt: {
        hu: `Vintage gallery ${sequence}`,
        en: `Vintage gallery ${sequence}`,
      },
      title: {
        hu: `Vintage ${sequence}`,
        en: `Vintage ${sequence}`,
      },
      caption: {
        hu: `Vintage gallery image ${sequence}.`,
        en: `Vintage gallery image ${sequence}.`,
      },
      focusPoint: "center center",
      sortOrder,
      status: "active",
      source: {
        type: "local",
        originalUrl: sourceOriginalUrl,
        originalFilename: filename,
      },
      createdAt: "2026-05-06",
      updatedAt: "2026-05-06",
    };
  });
}

function attachLocalGalleryAstroAssets<
  T extends {
    src: string;
    thumb?: string;
    astroSrc?: { src: string };
    thumbAstroSrc?: { src: string };
    source?: { originalFilename?: string };
  }
>(
  apartmentKey: string,
  images: T[]
): T[] {
  return images.map((image) => {
    if (image.astroSrc?.src && image.thumbAstroSrc?.src) {
      return image;
    }

    const originalFilename = image.source?.originalFilename;
    const srcFilename = originalFilename || image.src.split("/").pop();
    const thumbFilename = originalFilename || image.thumb.split("/").pop();
    const astroSrc = srcFilename
      ? requireAccommodationLocalAssetByKey(apartmentKey, "gallery", srcFilename, `${apartmentKey} gallery`)
      : undefined;
    const thumbAstroSrc = thumbFilename
      ? requireAccommodationLocalAssetByKey(apartmentKey, "thumbs", thumbFilename, `${apartmentKey} thumbnail`)
      : undefined;

    return {
      ...image,
      src: astroSrc?.src || image.src,
      thumb: thumbAstroSrc?.src || image.thumb,
      astroSrc,
      thumbAstroSrc
    };
  });
}

export const accommodationImages: Record<string, AccommodationImageSet> = {
  d2: {
    apartmentKey: "d2",
    hero: {
      desktop: {
        id: "d2-hero-desktop-01",
        apartmentKey: "d2",
        role: "hero_desktop",
        room: "külső",
        theme: "vendégház / terasz",
        src: d2LocalAstroAssets.heroDesktop.src,
        astroSrc: d2LocalAstroAssets.heroDesktop,
        width: 1920,
        height: 1440,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 kertes vendégház fedett terasszal Kisapátiban",
          en: "Dandelion D2 garden guesthouse with covered terrace in Kisapáti",
        },
        title: {
          hu: "D2 kertes vendégház",
          en: "D2 garden guesthouse",
        },
        caption: {
          hu: "A Dandelion D2 vendégház kívülről, fedett terasszal és kerttel.",
          en: "Exterior view of Dandelion D2 with covered terrace and garden.",
        },
        focusPoint: "center center",
        sortOrder: 1,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp",
          originalFilename: "dandelion-d2-kisapati-hero-desktop-01.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-04-26",
      },
      mobile: {
        id: "d2-hero-mobile-01",
        apartmentKey: "d2",
        role: "hero_mobile",
        room: "külső",
        theme: "fedett terasz / kert",
        src: d2LocalAstroAssets.heroMobile.src,
        astroSrc: d2LocalAstroAssets.heroMobile,
        width: 1080,
        height: 810,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 vendégház fedett terasza és kertje Kisapátiban",
          en: "Covered terrace and garden of the Dandelion D2 guesthouse in Kisapáti",
        },
        title: {
          hu: "D2 fedett terasz és kert",
          en: "D2 covered terrace and garden",
        },
        caption: {
          hu: "A Dandelion D2 vendégház fedett terasza és zárt kertje.",
          en: "The covered terrace and enclosed garden of the Dandelion D2 guesthouse.",
        },
        focusPoint: "center center",
        sortOrder: 1,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/hero/dandelion-d2-kisapati-hero-mobile-01.webp",
          originalFilename: "dandelion-d2-kisapati-hero-mobile-01.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-04-26",
      },
    },
    card: {
      id: "d2-card-01",
      apartmentKey: "d2",
      role: "card",
      room: "külső",
      theme: "vendégház / kert",
      src: d2LocalAstroAssets.card.src,
      astroSrc: d2LocalAstroAssets.card,
      width: 900,
      height: 675,
      aspectRatio: "4:3",
      alt: {
        hu: "Dandelion D2 vendégház kerttel és fedett terasszal",
        en: "Dandelion D2 guesthouse with garden and covered terrace",
      },
      title: {
        hu: "D2 vendégház kerttel",
        en: "D2 guesthouse with garden",
      },
      caption: {
        hu: "Kertes, önálló vendégház fedett terasszal.",
        en: "A private garden guesthouse with a covered terrace.",
      },
      focusPoint: "center center",
      sortOrder: 1,
      status: "active",
      source: {
        type: "local",
        originalUrl: "/src/assets/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp",
        originalFilename: "dandelion-d2-kisapati-card-01.webp",
      },
      createdAt: "2026-04-26",
      updatedAt: "2026-04-26",
    },
    gallery: attachLocalGalleryAstroAssets("d2", [
{
        id: "d2-gallery-05",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-005.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-005.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Gyerek színes takarón ül a Dandelion D2 kertjében egy kosárral és játékkal",
          en: "Child sitting on colorful blanket in Dandelion D2 garden with basket and toys",
        },
        title: {
          hu: "Dandelion D2 kert pihenés gyerekkel",
          en: "Dandelion D2 garden rest with child",
        },
        caption: {
          hu: "Egy gyerek egy színes takarón ül a Dandelion D2 kertjében egy kosárral és játékkal.",
          en: "A child sits on a colorful blanket in the garden of Dandelion D2 with a basket and toys.",
        },
        focusPoint: "center center",
        sortOrder: 10,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-005.webp",
          originalFilename: "dandelion-d2-source-005.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-01",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-001.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-001.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 fedett terasz sárga székekkel és asztallal",
          en: "Dandelion D2 covered terrace with yellow chairs and table",
        },
        title: {
          hu: "Dandelion D2 terasz székekkel",
          en: "Dandelion D2 terrace with chairs",
        },
        caption: {
          hu: "A Dandelion D2 teraszán sárga székek és egy asztal áll, közel a házhoz.",
          en: "The terrace of Dandelion D2 has yellow chairs and a table near the house.",
        },
        focusPoint: "center center",
        sortOrder: 20,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-001.webp",
          originalFilename: "dandelion-d2-source-001.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-02",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-002.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-002.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 kerti asztal sárga székekkel és terasz napozóágyakkal",
          en: "Dandelion D2 garden table with yellow chairs and terrace with lounge chairs",
        },
        title: {
          hu: "Dandelion D2 kerti asztal és terasz",
          en: "Dandelion D2 garden table and terrace",
        },
        caption: {
          hu: "A kerti asztalon tányérok és italok vannak, a teraszon napozóágyak állnak.",
          en: "The garden table has plates and drinks, and the terrace has lounge chairs.",
        },
        focusPoint: "center center",
        sortOrder: 30,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-002.webp",
          originalFilename: "dandelion-d2-source-002.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-09",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-009.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-009.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Nappali és konyha Dandelion D2 apartmanban",
          en: "Living room and kitchen in Dandelion D2 apartment",
        },
        title: {
          hu: "Nappali és konyha Dandelion D2-ben",
          en: "Living room and kitchen in Dandelion D2",
        },
        caption: {
          hu: "A kép a szállás egyik részletét mutatja.",
          en: "The comfortable living room has a kitchen and dining area.",
        },
        focusPoint: "center center",
        sortOrder: 40,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-009.webp",
          originalFilename: "dandelion-d2-source-009.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-07",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-007.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-007.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 hálószoba fehér ággyal és díszpárnákkal",
          en: "Dandelion D2 bedroom with white bed and decorative pillows",
        },
        title: {
          hu: "Dandelion D2 hálószoba ágyneművel",
          en: "Dandelion D2 bedroom with bedding",
        },
        caption: {
          hu: "A hálószobában két egymás mellé tolható ágy van kék csíkos takaróval és párnákkal.",
          en: "The bedroom has two beds pushed together with blue striped blankets and pillows.",
        },
        focusPoint: "center center",
        sortOrder: 50,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-007.webp",
          originalFilename: "dandelion-d2-source-007.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-10",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-010.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-010.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Nappali kandallóval és étkezősarokkal",
          en: "Living room with fireplace and dining area",
        },
        title: {
          hu: "Nappali a kandallóval",
          en: "Living room with fireplace",
        },
        caption: {
          hu: "A nappali meleg hangulatú, étkezővel és kandallóval.",
          en: "The living room is cozy with a dining area and fireplace.",
        },
        focusPoint: "center center",
        sortOrder: 60,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-010.webp",
          originalFilename: "dandelion-d2-source-010.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-13",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-013.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-013.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "konyha és étkező sárga székekkel",
          en: "kitchen with yellow chairs",
        },
        title: {
          hu: "konyha az apartmanban",
          en: "apartment kitchen",
        },
        caption: {
          hu: "A konyha praktikus és világos, étkezőasztal sárga székekkel.",
          en: "The kitchen is practical and bright with a dining table and yellow chairs.",
        },
        focusPoint: "center center",
        sortOrder: 70,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-013.webp",
          originalFilename: "dandelion-d2-source-013.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-15",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-015.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-015.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Nappali és konyha világos mennyezettel és kanapéval",
          en: "Living room and kitchen with bright ceiling and sofa",
        },
        title: {
          hu: "Nappali és konyha Dandelion D2-ben",
          en: "Living room and kitchen in Dandelion D2",
        },
        caption: {
          hu: "A kép a szállás egyik részletét mutatja.",
          en: "The living room has a comfortable sofa and a fully equipped kitchen.",
        },
        focusPoint: "center center",
        sortOrder: 80,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-015.webp",
          originalFilename: "dandelion-d2-source-015.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-11",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-011.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-011.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 nappali szürke kanapéval és nyitott ablakokkal",
          en: "Dandelion D2 living room with gray sofa and open windows",
        },
        title: {
          hu: "Dandelion D2 nappali kanapéval",
          en: "Dandelion D2 living room sofa",
        },
        caption: {
          hu: "A nappaliban egy szürke kanapé, egy dohányzóasztal és nyitott ablakok vannak.",
          en: "The living room has a gray sofa, a small table, and open windows.",
        },
        focusPoint: "center center",
        sortOrder: 90,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-011.webp",
          originalFilename: "dandelion-d2-source-011.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-03",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-003.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-003.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Erkély étkezőasztallal és sárga székekkel",
          en: "Balcony dining table with yellow chairs",
        },
        title: {
          hu: "Kültéri étkező sárga székekkel",
          en: "Outdoor dining with yellow chairs",
        },
        caption: {
          hu: "A kép a szállás egyik részletét mutatja.",
          en: "The image shows one detail of the accommodation.",
        },
        focusPoint: "center center",
        sortOrder: 100,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-003.webp",
          originalFilename: "dandelion-d2-source-003.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-04",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-004.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-004.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 terasza sárga székekkel és hintaszékkel",
          en: "Dandelion D2 terrace with yellow chairs and hanging chair",
        },
        title: {
          hu: "Dandelion D2 terasz sárga székekkel",
          en: "Dandelion D2 terrace with yellow chairs",
        },
        caption: {
          hu: "A teraszon sárga székek és egy fehér hintaszék állnak asztal mellett.",
          en: "The terrace has yellow chairs and a hanging chair by the table.",
        },
        focusPoint: "center center",
        sortOrder: 110,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-004.webp",
          originalFilename: "dandelion-d2-source-004.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-06",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-006.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-006.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Kényelmes ágy és szekrény a Dandelion D2 hálószobájában",
          en: "Comfortable bed and wardrobe in the Dandelion D2 bedroom",
        },
        title: {
          hu: "Dandelion D2 hálószoba",
          en: "Dandelion D2 Bedroom",
        },
        caption: {
          hu: "A kép a szállás egyik részletét mutatja.",
          en: "The bedroom has a comfortable bed and simple furniture.",
        },
        focusPoint: "center center",
        sortOrder: 120,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-006.webp",
          originalFilename: "dandelion-d2-source-006.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-16",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-016.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-016.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Fürdőszoba kád, mosdó és wc",
          en: "Bathroom with bathtub, sink and toilet",
        },
        title: {
          hu: "Fürdőszoba Dandelion D2-ben",
          en: "Bathroom in Dandelion D2",
        },
        caption: {
          hu: "A kép a szállás egyik részletét mutatja.",
          en: "The bathroom has a bathtub, sink, and toilet.",
        },
        focusPoint: "center center",
        sortOrder: 130,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-016.webp",
          originalFilename: "dandelion-d2-source-016.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-08",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-008.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-008.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Dandelion D2 konyha és nappali rész világos fa padlóval és szürke kanapéval",
          en: "Dandelion D2 kitchen and living area with light wood floor and gray sofa",
        },
        title: {
          hu: "Dandelion D2 konyha és nappali",
          en: "Dandelion D2 kitchen and living area",
        },
        caption: {
          hu: "A Dandelion D2 konyhája világos szekrényekkel és egy szürke kanapé van a nappaliban.",
          en: "The Dandelion D2 has a kitchen with light cabinets and a gray sofa in the living area.",
        },
        focusPoint: "center center",
        sortOrder: 140,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-008.webp",
          originalFilename: "dandelion-d2-source-008.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-12",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-012.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-012.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Nappali kandallóval és nyitott teraszajtóval",
          en: "Living room with fireplace and open terrace door",
        },
        title: {
          hu: "Nappali kandallóval és terasszal",
          en: "Living room with fireplace and terrace",
        },
        caption: {
          hu: "A nappaliban kandalló és kényelmes ülőhelyek vannak, nyitott teraszajtóval.",
          en: "The living room has a fireplace and comfortable seating with an open terrace door.",
        },
        focusPoint: "center center",
        sortOrder: 150,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-012.webp",
          originalFilename: "dandelion-d2-source-012.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-14",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-014.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-014.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Nappali kandallóval és ventilátorral a Dandelion D2-ben",
          en: "Living room with wood stove and ceiling fan at Dandelion D2",
        },
        title: {
          hu: "Nappali kandallóval és ventilátorral",
          en: "Living room with stove and fan",
        },
        caption: {
          hu: "A nappali kandallóval és nagy ablakokkal világos és kényelmes.",
          en: "The living room is cozy with a wood stove and large windows.",
        },
        focusPoint: "center center",
        sortOrder: 160,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-014.webp",
          originalFilename: "dandelion-d2-source-014.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      },
{
        id: "d2-gallery-17",
        apartmentKey: "d2",
        role: "gallery",
        src: requireAccommodationLocalAssetByKey("d2", "gallery", "dandelion-d2-source-017.webp", "d2 gallery").src,
        thumb: requireAccommodationLocalAssetByKey("d2", "thumbs", "dandelion-d2-source-017.webp", "d2 thumbnail").src,
        width: 1600,
        height: 1200,
        aspectRatio: "4:3",
        alt: {
          hu: "Fürdőszoba kád és mosdó",
          en: "Bathroom with bathtub and sink",
        },
        title: {
          hu: "Fürdőszoba Dandelion D2",
          en: "Bathroom Dandelion D2",
        },
        caption: {
          hu: "A kép a szállás egyik részletét mutatja.",
          en: "The bathroom has a bathtub and a sink, it is bright and tidy.",
        },
        focusPoint: "center center",
        sortOrder: 170,
        status: "active",
        source: {
          type: "local",
          originalUrl: "/src/assets/accommodations/d2/gallery/dandelion-d2-source-017.webp",
          originalFilename: "dandelion-d2-source-017.webp",
        },
        createdAt: "2026-04-26",
        updatedAt: "2026-05-03",
      }
    ]),
    thumbnail: null,
  },
  d1: {
    apartmentKey: "d1",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("d1", buildD1GalleryEntries()),
    thumbnail: null,
  },
  fugehaz: {
    apartmentKey: "fugehaz",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("fugehaz", buildFugehazGalleryEntries()),
    thumbnail: null,
  },
  zsalya: {
    apartmentKey: "zsalya",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("zsalya", buildZsalyaGalleryEntries()),
    thumbnail: null,
  },
  szololiget: {
    apartmentKey: "szololiget",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("szololiget", buildSzololigetGalleryEntries()),
    thumbnail: null,
  },
  szepvolgyi: {
    apartmentKey: "szepvolgyi",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("szepvolgyi", buildSzepvolgyiGalleryEntries()),
    thumbnail: null,
  },
  royal_homes: {
    apartmentKey: "royal_homes",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("royal_homes", buildRoyalHomesGalleryEntries()),
    thumbnail: null,
  },
  koveskal: {
    apartmentKey: "koveskal",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("koveskal", buildKoveskalGalleryEntries()),
    thumbnail: null,
  },
  vintage: {
    apartmentKey: "vintage",
    hero: {
      desktop: null,
      mobile: null,
    },
    card: null,
    gallery: attachLocalGalleryAstroAssets("vintage", buildVintageGalleryEntries()),
    thumbnail: null,
  },
};


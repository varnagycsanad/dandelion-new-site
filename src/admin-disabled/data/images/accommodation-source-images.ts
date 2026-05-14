// [CHANGE 2026-04-26 00:00] Accommodation source image inventory váz létrehozása.
// [CHANGE 2026-04-26 00:00] D2 source image inventory felvétele source_found státusszal.
// [CHANGE 2026-04-26 00:00] D2 source inventory selection státuszok frissítése review döntés alapján.
// [CHANGE 2026-04-26 00:00] D2 selected galéria targetPlan nevek normalizálása 01–10 aktív sorrendre.

import type { ImageSourceCandidate } from "./image-types";

const d2InventoryTimestamp = "2026-04-26T00:00:00.000Z";

const d2GallerySourceFiles: Array<{
  wpId: number;
  filename: string;
  status: "selected" | "needs_review";
}> = [
  { wpId: 7872, filename: "2025-09-29-10-19-03.webp", status: "selected" },
  { wpId: 7851, filename: "2025-09-29-10-36-45.jpeg", status: "needs_review" },
  { wpId: 7857, filename: "2025-09-29-10-39-12.jpeg", status: "needs_review" },
  { wpId: 7871, filename: "2025-09-29-10-26-50.webp", status: "selected" },
  { wpId: 7875, filename: "IMG_9347.webp", status: "selected" },
  { wpId: 7866, filename: "2025-09-29-10-19-03-1.webp", status: "needs_review" },
  { wpId: 7846, filename: "2025-09-29-10-34-41.jpeg", status: "selected" },
  { wpId: 7864, filename: "2025-09-29-10-26-50-1.webp", status: "needs_review" },
  { wpId: 7853, filename: "2025-09-29-10-38-00.jpeg", status: "selected" },
  { wpId: 7855, filename: "2025-09-29-10-38-30.jpeg", status: "selected" },
  { wpId: 7860, filename: "2025-09-29-10-39-48.jpeg", status: "selected" },
  { wpId: 7862, filename: "2025-09-29-10-27-54-1.webp", status: "needs_review" },
  { wpId: 7865, filename: "2025-09-29-10-23-57.webp", status: "selected" },
  { wpId: 7868, filename: "2025-09-29-10-28-14.webp", status: "selected" },
  { wpId: 7870, filename: "2025-09-29-10-27-39.webp", status: "needs_review" },
  { wpId: 7873, filename: "IMG_9346.jpg", status: "selected" },
];

const d2SelectedGallerySequenceBySourceId: Record<string, string> = {
  "d2-source-gallery-01": "01",
  "d2-source-gallery-04": "02",
  "d2-source-gallery-05": "03",
  "d2-source-gallery-07": "04",
  "d2-source-gallery-09": "05",
  "d2-source-gallery-10": "06",
  "d2-source-gallery-11": "07",
  "d2-source-gallery-13": "08",
  "d2-source-gallery-14": "09",
  "d2-source-gallery-16": "10",
};

const d2GallerySourceImages: ImageSourceCandidate[] = d2GallerySourceFiles.map(
  ({ wpId, filename, status }, index) => {
    const order = index + 1;
    const sourceId = `d2-source-gallery-${String(order).padStart(2, "0")}`;
    const normalizedSelectedSequence = d2SelectedGallerySequenceBySourceId[sourceId];
    const targetSequence = normalizedSelectedSequence ?? String(order).padStart(2, "0");
    const currentUrl = `https://dandelionhouse.hu/wp-content/uploads/2025/09/${filename}`;

    return {
      id: sourceId,
      apartmentKey: "d2",
      source: {
        type: "wordpress",
        wpId,
        originalUrl: currentUrl,
        originalFilename: filename,
      },
      currentUrl,
      currentFilename: filename,
      width: 1440,
      height: 1080,
      aspectRatio: "4:3",
      intendedRoles: ["gallery", "thumbnail"],
      theme: "gallery",
      sortOrder: status === "selected" && normalizedSelectedSequence ? Number(normalizedSelectedSequence) : order,
      status,
      seoDraft: {
        approved: false,
      },
      targetPlans: [
        {
          role: "gallery",
          targetPath: `/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-${targetSequence}.webp`,
          width: 1600,
          cropMode: "contain",
          focusPoint: "center center",
        },
        {
          role: "thumbnail",
          targetPath: `/images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-${targetSequence}.webp`,
          width: 600,
          cropMode: "cover",
          focusPoint: "center center",
        },
      ],
      createdAt: d2InventoryTimestamp,
      updatedAt: d2InventoryTimestamp,
    };
  },
);

export const accommodationSourceImages: Record<string, ImageSourceCandidate[]> = {
  d2: [
    {
      id: "d2-source-hero-mobile-01",
      apartmentKey: "d2",
      source: {
        type: "local",
        originalUrl: "/images/d2-hero-mobile.webp",
        originalFilename: "d2-hero-mobile.webp",
      },
      currentUrl: "/images/d2-hero-mobile.webp",
      currentFilename: "d2-hero-mobile.webp",
      width: 1080,
      height: 810,
      aspectRatio: "4:3",
      fileSize: 184004,
      intendedRoles: ["hero_mobile"],
      theme: "hero",
      status: "selected",
      seoDraft: {
        approved: false,
      },
      targetPlans: [
        {
          role: "hero_mobile",
          targetPath: "/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-mobile-01.webp",
          width: 1080,
          height: 810,
          cropMode: "manual",
          focusPoint: "52% center",
        },
      ],
      createdAt: d2InventoryTimestamp,
      updatedAt: d2InventoryTimestamp,
    },
    {
      id: "d2-source-hero-desktop-01",
      apartmentKey: "d2",
      source: {
        type: "wordpress",
        wpId: 7870,
        originalUrl: "https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-39.webp",
        originalFilename: "2025-09-29-10-27-39.webp",
      },
      currentUrl: "https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-39.webp",
      currentFilename: "2025-09-29-10-27-39.webp",
      width: 1440,
      height: 1080,
      aspectRatio: "4:3",
      intendedRoles: ["hero_desktop"],
      theme: "hero",
      status: "selected",
      seoDraft: {
        approved: false,
      },
      targetPlans: [
        {
          role: "hero_desktop",
          targetPath: "/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp",
          width: 1920,
          cropMode: "cover",
          focusPoint: "center center",
        },
      ],
      createdAt: d2InventoryTimestamp,
      updatedAt: d2InventoryTimestamp,
    },
    {
      id: "d2-source-card-01",
      apartmentKey: "d2",
      source: {
        type: "wordpress",
        originalUrl: "https://dandelionhouse.hu/wp-content/uploads/2024/11/2024-06-14-15-27-24-scaled.jpeg.webp",
        originalFilename: "2024-06-14-15-27-24-scaled.jpeg.webp",
      },
      currentUrl: "https://dandelionhouse.hu/wp-content/uploads/2024/11/2024-06-14-15-27-24-scaled.jpeg.webp",
      currentFilename: "2024-06-14-15-27-24-scaled.jpeg.webp",
      intendedRoles: ["card"],
      theme: "card",
      status: "selected",
      seoDraft: {
        approved: false,
      },
      targetPlans: [
        {
          role: "card",
          targetPath: "/images/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp",
          width: 900,
          cropMode: "cover",
          focusPoint: "center center",
        },
      ],
      createdAt: d2InventoryTimestamp,
      updatedAt: d2InventoryTimestamp,
    },
    ...d2GallerySourceImages,
    {
      id: "d2-wp-7872-gallery-terasz",
      apartmentKey: "d2",
      source: {
        type: "wordpress",
        wpId: 7872,
        originalUrl: "https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-19-03.webp",
        originalFilename: "2025-09-29-10-19-03.webp",
      },
      currentUrl: "https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-19-03.webp",
      currentFilename: "2025-09-29-10-19-03.webp",
      width: 1440,
      height: 1080,
      aspectRatio: "1440:1080",
      intendedRoles: ["gallery", "thumbnail"],
      room: "terasz",
      theme: "terasz",
      sortOrder: 11,
      status: "selected",
      seoDraft: {
        approved: false,
      },
      targetPlans: [
        {
          role: "gallery",
          targetPath: "/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-17.webp",
          width: 1600,
          cropMode: "contain",
          focusPoint: "center center",
        },
        {
          role: "thumbnail",
          targetPath: "/images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-17.webp",
          width: 600,
          cropMode: "cover",
          focusPoint: "center center",
        },
      ],
      notes: "WP intake metadata loaded (mime: image/webp).",
      createdAt: "2026-04-26T22:21:50.248Z",
      updatedAt: "2026-04-26T22:21:50.248Z",
    },
  
    {
      id: "d2-wp-9955-gallery-masodik-teszt",
      apartmentKey: "d2",
      source: {
        type: "wordpress",
        wpId: 9955,
        originalUrl: "https://dandelionhouse.hu/wp-content/uploads/2026/04/dandelion-d2-galerias-haloszoba-tetoablakkal.webp",
        originalFilename: "dandelion-d2-galerias-haloszoba-tetoablakkal.webp"
      },
      currentUrl: "https://dandelionhouse.hu/wp-content/uploads/2026/04/dandelion-d2-galerias-haloszoba-tetoablakkal.webp",
      currentFilename: "dandelion-d2-galerias-haloszoba-tetoablakkal.webp",
      width: 1440,
      height: 1080,
      aspectRatio: "1440:1080",
      intendedRoles: [
        "gallery",
        "thumbnail"
      ],
      room: "galériás hálószoba",
      theme: "masodik-teszt",
      sortOrder: 12,
      status: "selected",
      seoDraft: {
        approved: false
      },
      targetPlans: [
        {
          role: "gallery",
          targetPath: "/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-18.webp",
          width: 1600,
          cropMode: "contain",
          focusPoint: "center center"
        },
        {
          role: "thumbnail",
          targetPath: "/images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-18.webp",
          width: 600,
          cropMode: "cover",
          focusPoint: "center center"
        }
      ],
      notes: "WP intake metadata loaded (mime: image/webp).",
      createdAt: "2026-04-26T22:52:33.447Z",
      updatedAt: "2026-04-26T22:52:33.447Z"
    },
    {
      id: "d2-wp-9954-gallery-dandelion-d2-emeleti-haloszoba-kilatas-badacsony-hegy",
      apartmentKey: "d2",
      source: {
        type: "wordpress",
        wpId: 9954,
        originalUrl: "https://dandelionhouse.hu/wp-content/uploads/2026/04/dandelion-d2-emeleti-haloszoba-kilatas-szent-gyorgy-hegy.webp",
        originalFilename: "dandelion-d2-emeleti-haloszoba-kilatas-szent-gyorgy-hegy.webp"
      },
      currentUrl: "https://dandelionhouse.hu/wp-content/uploads/2026/04/dandelion-d2-emeleti-haloszoba-kilatas-szent-gyorgy-hegy.webp",
      currentFilename: "dandelion-d2-emeleti-haloszoba-kilatas-szent-gyorgy-hegy.webp",
      width: 1440,
      height: 1080,
      aspectRatio: "1440:1080",
      intendedRoles: [
        "gallery",
        "thumbnail"
      ],
      theme: "dandelion-d2-emeleti-haloszoba-kilatas-badacsony-hegy",
      sortOrder: 19,
      status: "selected",
      seoDraft: {
        approved: false
      },
      targetPlans: [
        {
          role: "gallery",
          targetPath: "/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-19.webp",
          width: 1600,
          cropMode: "contain",
          focusPoint: "center center"
        },
        {
          role: "thumbnail",
          targetPath: "/images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-19.webp",
          width: 600,
          cropMode: "cover",
          focusPoint: "center center"
        }
      ],
      notes: "WP intake metadata loaded (mime: image/webp).",
      createdAt: "2026-04-27T00:21:10.511Z",
      updatedAt: "2026-04-27T00:21:10.511Z"
    }],
};

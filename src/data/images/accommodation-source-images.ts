// [CHANGE 2026-04-26 00:00] Accommodation source image inventory váz létrehozása.
// [CHANGE 2026-04-26 00:00] D2 source image inventory felvétele source_found státusszal.

import type { ImageSourceCandidate } from "./image-types";

const d2InventoryTimestamp = "2026-04-26T00:00:00.000Z";

const d2GallerySourceFiles: Array<{
  wpId: number;
  filename: string;
}> = [
  { wpId: 7872, filename: "2025-09-29-10-19-03.webp" },
  { wpId: 7851, filename: "2025-09-29-10-36-45.jpeg" },
  { wpId: 7857, filename: "2025-09-29-10-39-12.jpeg" },
  { wpId: 7871, filename: "2025-09-29-10-26-50.webp" },
  { wpId: 7875, filename: "IMG_9347.webp" },
  { wpId: 7866, filename: "2025-09-29-10-19-03-1.webp" },
  { wpId: 7846, filename: "2025-09-29-10-34-41.jpeg" },
  { wpId: 7864, filename: "2025-09-29-10-26-50-1.webp" },
  { wpId: 7853, filename: "2025-09-29-10-38-00.jpeg" },
  { wpId: 7855, filename: "2025-09-29-10-38-30.jpeg" },
  { wpId: 7860, filename: "2025-09-29-10-39-48.jpeg" },
  { wpId: 7862, filename: "2025-09-29-10-27-54-1.webp" },
  { wpId: 7865, filename: "2025-09-29-10-23-57.webp" },
  { wpId: 7868, filename: "2025-09-29-10-28-14.webp" },
  { wpId: 7870, filename: "2025-09-29-10-27-39.webp" },
  { wpId: 7873, filename: "IMG_9346.jpg" },
];

const d2GallerySourceImages: ImageSourceCandidate[] = d2GallerySourceFiles.map(
  ({ wpId, filename }, index) => {
    const order = index + 1;
    const sequence = String(order).padStart(2, "0");
    const currentUrl = `https://dandelionhouse.hu/wp-content/uploads/2025/09/${filename}`;

    return {
      id: `d2-source-gallery-${sequence}`,
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
      sortOrder: order,
      status: "source_found",
      seoDraft: {
        approved: false,
      },
      targetPlans: [
        {
          role: "gallery",
          targetPath: `/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-${sequence}.webp`,
          width: 1600,
          cropMode: "contain",
          focusPoint: "center center",
        },
        {
          role: "thumbnail",
          targetPath: `/images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-${sequence}.webp`,
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
      status: "source_found",
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
      status: "source_found",
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
      status: "source_found",
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
  ],
};

import type { ApartmentGalleryImage } from "./apartment-image-assignments";

interface MediaImage {
  id: number;
  sourceUrl?: string;
  altText?: string;
  title?: string;
}

interface OrderedApartmentGalleryImage {
  src: string;
  alt: string;
}

// [CHANGE 2026-04-24 11:35] Keep legacy apartment assignments as the gallery source and apply admin gallery sortOrder only as ordering metadata.
export function orderApartmentGalleryImages(
  assignedIds: number[],
  galleryAssignments: ApartmentGalleryImage[],
  mediaItems: MediaImage[],
  apartmentKey: string
): OrderedApartmentGalleryImage[] {
  const mediaById = new Map(mediaItems.map((item) => [item.id, item]));
  const sortOrderById = new Map(galleryAssignments.map((item) => [item.id, item.sortOrder]));

  return assignedIds
    .map((id, originalIndex) => {
      const item = mediaById.get(id);

      if (!item || !item.sourceUrl) {
        return null;
      }

      const sortOrder = sortOrderById.get(id);

      return {
        src: item.sourceUrl,
        alt: item.altText || item.title || `Dandelion ${apartmentKey.toUpperCase()} gallery image ${id}`,
        originalIndex,
        sortOrder
      };
    })
    .filter(
      (
        item
      ): item is OrderedApartmentGalleryImage & { originalIndex: number; sortOrder: number | undefined } =>
        Boolean(item)
    )
    .sort((left, right) => {
      const leftHasSortOrder = typeof left.sortOrder === "number";
      const rightHasSortOrder = typeof right.sortOrder === "number";

      if (leftHasSortOrder && rightHasSortOrder && left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }

      if (leftHasSortOrder !== rightHasSortOrder) {
        return leftHasSortOrder ? -1 : 1;
      }

      return left.originalIndex - right.originalIndex;
    })
    .map(({ src, alt }) => ({ src, alt }));
}

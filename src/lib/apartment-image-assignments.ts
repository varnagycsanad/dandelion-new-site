import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export const apartmentImageAssignmentKeys = [
  "d2",
  "d1",
  "fugehaz",
  "zsalya",
  "szololiget",
  "szepvolgyi",
  "royal_homes",
  "vintage"
] as const;

export type ApartmentImageAssignmentKey = (typeof apartmentImageAssignmentKeys)[number];

export interface ApartmentHeroImages {
  desktop: number | null;
  mobile: number | null;
}

export interface ApartmentGalleryImage {
  id: number;
  sortOrder: number;
}

export interface ApartmentImageConfig {
  hero: ApartmentHeroImages;
  gallery: ApartmentGalleryImage[];
}

export type ApartmentImageAssignments = Record<ApartmentImageAssignmentKey, ApartmentImageConfig>;

const apartmentImageAssignmentsFilePath = resolve(
  process.cwd(),
  "src",
  "data",
  "apartment-image-assignments.json"
);

function createEmptyApartmentHeroImages(): ApartmentHeroImages {
  return {
    desktop: null,
    mobile: null
  };
}

function createEmptyApartmentImageConfig(): ApartmentImageConfig {
  return {
    hero: createEmptyApartmentHeroImages(),
    gallery: []
  };
}

function createEmptyApartmentImageAssignments(): ApartmentImageAssignments {
  return Object.fromEntries(
    apartmentImageAssignmentKeys.map((key) => [key, createEmptyApartmentImageConfig()])
  ) as ApartmentImageAssignments;
}

function sanitizeImageId(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value > 0 ? value : null;
}

function sanitizeSortOrder(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeApartmentHeroImages(value: unknown): ApartmentHeroImages {
  if (!value || typeof value !== "object") {
    return createEmptyApartmentHeroImages();
  }

  const candidate = value as Record<string, unknown>;

  return {
    desktop: sanitizeImageId(candidate.desktop),
    mobile: sanitizeImageId(candidate.mobile)
  };
}

function normalizeApartmentGallery(value: unknown): ApartmentGalleryImage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const id = sanitizeImageId(candidate.id);
      const sortOrder = sanitizeSortOrder(candidate.sortOrder);

      if (id === null || sortOrder === null) {
        return null;
      }

      return { id, sortOrder };
    })
    .filter((item): item is ApartmentGalleryImage => Boolean(item))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function normalizeApartmentImageConfig(value: unknown): ApartmentImageConfig {
  if (!value || typeof value !== "object") {
    return createEmptyApartmentImageConfig();
  }

  const candidate = value as Record<string, unknown>;

  return {
    hero: normalizeApartmentHeroImages(candidate.hero),
    gallery: normalizeApartmentGallery(candidate.gallery)
  };
}

export function normalizeApartmentImageAssignments(
  value: unknown
): ApartmentImageAssignments {
  const normalized = createEmptyApartmentImageAssignments();
  const source =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  for (const key of apartmentImageAssignmentKeys) {
    normalized[key] = normalizeApartmentImageConfig(source[key]);
  }

  return normalized;
}

export async function readApartmentImageAssignments(): Promise<ApartmentImageAssignments> {
  try {
    const raw = await readFile(apartmentImageAssignmentsFilePath, "utf8");
    return normalizeApartmentImageAssignments(JSON.parse(raw));
  } catch {
    return createEmptyApartmentImageAssignments();
  }
}

export async function writeApartmentImageAssignments(
  assignments: ApartmentImageAssignments
): Promise<void> {
  const normalized = normalizeApartmentImageAssignments(assignments);

  await writeFile(
    apartmentImageAssignmentsFilePath,
    `${JSON.stringify(normalized, null, 2)}\n`,
    "utf8"
  );
}

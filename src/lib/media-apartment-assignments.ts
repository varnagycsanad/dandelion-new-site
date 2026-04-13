import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const apartmentOptions = [
  { key: "all", label: "Osszes" },
  { key: "d1", label: "D1" },
  { key: "d2", label: "D2" },
  { key: "fugehaz", label: "Fugehaz" },
  { key: "zsalya", label: "Zsalya" },
  { key: "szololiget", label: "Szololiget" },
  { key: "szepvolgyi", label: "Szepvolgyi" },
  { key: "royal_homes", label: "Royal Homes" },
  { key: "vintage", label: "Vintage" }
] as const;

export type ApartmentAssignmentKey = (typeof apartmentOptions)[number]["key"];
export type ApartmentFilterKey = ApartmentAssignmentKey;
export type MediaApartmentAssignments = Record<string, Exclude<ApartmentAssignmentKey, "all"> | null>;

const assignmentsFileUrl = new URL("../data/media-apartment-assignments.json", import.meta.url);
const allowedAssignmentKeys = new Set(
  apartmentOptions.filter((option) => option.key !== "all").map((option) => option.key)
);

function sanitizeAssignment(value: unknown): Exclude<ApartmentAssignmentKey, "all"> | null {
  if (typeof value !== "string") {
    return null;
  }

  return allowedAssignmentKeys.has(value as Exclude<ApartmentAssignmentKey, "all">)
    ? (value as Exclude<ApartmentAssignmentKey, "all">)
    : null;
}

export async function readMediaApartmentAssignments(): Promise<MediaApartmentAssignments> {
  try {
    const raw = await readFile(assignmentsFileUrl, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: MediaApartmentAssignments = {};

    for (const [key, value] of Object.entries(parsed)) {
      result[key] = sanitizeAssignment(value);
    }

    return result;
  } catch {
    return {};
  }
}

export async function writeMediaApartmentAssignments(
  assignments: MediaApartmentAssignments
): Promise<void> {
  const sanitized: MediaApartmentAssignments = {};

  for (const [key, value] of Object.entries(assignments)) {
    const nextValue = sanitizeAssignment(value);

    if (nextValue) {
      sanitized[key] = nextValue;
    }
  }

  await writeFile(
    fileURLToPath(assignmentsFileUrl),
    `${JSON.stringify(sanitized, null, 2)}\n`,
    "utf8"
  );
}

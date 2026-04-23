import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export const apartmentOptions = [
  { key: "all", label: "Összes" },
  { key: "d1", label: "D1" },
  { key: "d2", label: "D2" },
  { key: "fugehaz", label: "Fügeház" },
  { key: "zsalya", label: "Zsálya" },
  { key: "szololiget", label: "Szőlőliget" },
  { key: "szepvolgyi", label: "Szépvölgyi" },
  { key: "royal_homes", label: "Royal Homes" },
  { key: "vintage", label: "Vintage" }
] as const;

export type ApartmentAssignmentKey = (typeof apartmentOptions)[number]["key"];
export type ApartmentFilterKey = ApartmentAssignmentKey;
export type MediaApartmentAssignments = Record<string, Exclude<ApartmentAssignmentKey, "all"> | null>;

const assignmentsFilePath = resolve(process.cwd(), "src", "data", "media-apartment-assignments.json");
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
    const raw = await readFile(assignmentsFilePath, "utf8");
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
    assignmentsFilePath,
    `${JSON.stringify(sanitized, null, 2)}\n`,
    "utf8"
  );
}

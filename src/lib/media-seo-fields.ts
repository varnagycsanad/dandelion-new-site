import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const themeRoomOptions = [
  { key: "", label: "Nincs megadva" },
  { key: "kulso", label: "Külső" },
  { key: "terasz", label: "Terasz" },
  { key: "nappali", label: "Nappali" },
  { key: "halo", label: "Háló" },
  { key: "konyha", label: "Konyha" },
  { key: "furdo", label: "Fürdő" },
  { key: "etkezo", label: "Étkező" },
  { key: "kert", label: "Kert" },
  { key: "panorama", label: "Panoráma" },
  { key: "reszlet", label: "Részlet" },
  { key: "kornyek", label: "Környék" }
] as const;

export type ThemeRoomKey = (typeof themeRoomOptions)[number]["key"];

export interface MediaSeoFieldsEntry {
  themeRoom: ThemeRoomKey;
  featureFocus: string;
  altText: string;
  title: string;
}

export type MediaSeoFieldsMap = Record<string, MediaSeoFieldsEntry>;

const seoFieldsFileUrl = new URL("../data/media-seo-fields.json", import.meta.url);
const allowedThemeRoomKeys = new Set(themeRoomOptions.map((option) => option.key));

function sanitizeThemeRoom(value: unknown): ThemeRoomKey {
  if (typeof value !== "string") {
    return "";
  }

  return allowedThemeRoomKeys.has(value as ThemeRoomKey) ? (value as ThemeRoomKey) : "";
}

function sanitizeFeatureFocus(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeEntry(value: unknown): MediaSeoFieldsEntry {
  if (!value || typeof value !== "object") {
    return {
      themeRoom: "",
      featureFocus: "",
      altText: "",
      title: ""
    };
  }

  const candidate = value as Record<string, unknown>;

  return {
    themeRoom: sanitizeThemeRoom(candidate.themeRoom),
    featureFocus: sanitizeFeatureFocus(candidate.featureFocus),
    altText: sanitizeFeatureFocus(candidate.altText),
    title: sanitizeFeatureFocus(candidate.title)
  };
}

export async function readMediaSeoFields(): Promise<MediaSeoFieldsMap> {
  try {
    const raw = await readFile(seoFieldsFileUrl, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: MediaSeoFieldsMap = {};

    for (const [key, value] of Object.entries(parsed)) {
      const entry = sanitizeEntry(value);

      if (entry.themeRoom || entry.featureFocus || entry.altText || entry.title) {
        result[key] = entry;
      }
    }

    return result;
  } catch {
    return {};
  }
}

export async function writeMediaSeoFields(fields: MediaSeoFieldsMap): Promise<void> {
  const sanitized: MediaSeoFieldsMap = {};

  for (const [key, value] of Object.entries(fields)) {
    const entry = sanitizeEntry(value);

    if (entry.themeRoom || entry.featureFocus || entry.altText || entry.title) {
      sanitized[key] = entry;
    }
  }

  await writeFile(
    fileURLToPath(seoFieldsFileUrl),
    `${JSON.stringify(sanitized, null, 2)}\n`,
    "utf8"
  );
}

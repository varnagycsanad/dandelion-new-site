import type { APIRoute } from "astro";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

import { accommodationImages } from "../../../data/images/accommodation-images.ts";

export const prerender = false;

const ACCOMMODATION_IMAGES_PATH = fileURLToPath(
  new URL("../../../data/images/accommodation-images.ts", import.meta.url),
);

interface SaveGalleryOrderPayload {
  apartment?: string;
  orderedIds?: string[];
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as SaveGalleryOrderPayload;
    const apartment = typeof payload.apartment === "string" ? payload.apartment.trim() : "";
    const orderedIds = Array.isArray(payload.orderedIds) ? payload.orderedIds : null;

    if (!apartment) {
      throw new Error("Az apartment mező kötelező.");
    }

    if (!orderedIds) {
      throw new Error("Az orderedIds mezőnek tömbnek kell lennie.");
    }

    const apartmentRegistry = accommodationImages[apartment];
    const currentGallery = apartmentRegistry?.gallery || null;

    if (!apartmentRegistry || !currentGallery) {
      throw new Error(`Ismeretlen apartment kulcs: ${apartment}`);
    }

    const currentIds = currentGallery.map((item) => item.id);
    const normalizedIds = orderedIds.map((id) => (typeof id === "string" ? id.trim() : ""));

    if (normalizedIds.some((id) => !id)) {
      throw new Error("Az orderedIds minden elemének nem ures stringnek kell lennie.");
    }

    if (new Set(normalizedIds).size !== normalizedIds.length) {
      throw new Error("Duplikalt id talalhato az orderedIds tombben.");
    }

    if (normalizedIds.length !== currentIds.length) {
      throw new Error("Hianyzo vagy tobblet id az orderedIds tombben.");
    }

    const unknownIds = normalizedIds.filter((id) => !currentIds.includes(id));
    const missingIds = currentIds.filter((id) => !normalizedIds.includes(id));

    if (unknownIds.length > 0) {
      throw new Error(`Ismeretlen id(k): ${unknownIds.join(", ")}`);
    }

    if (missingIds.length > 0) {
      throw new Error(`Hianyzo id(k): ${missingIds.join(", ")}`);
    }

    const sourceText = await readFile(ACCOMMODATION_IMAGES_PATH, "utf8");
    const updatedText = reorderApartmentGalleryArray(sourceText, apartment, normalizedIds);

    if (updatedText !== sourceText) {
      await writeFile(ACCOMMODATION_IMAGES_PATH, updatedText, "utf8");
    }

    // Keep dev-memory registry aligned immediately after file write.
    const byId = new Map(currentGallery.map((item) => [item.id, item]));
    apartmentRegistry.gallery = normalizedIds.map((id, index) => {
      const original = byId.get(id);

      if (!original) {
        throw new Error(`Hianyzo gallery elem memoriafrissiteskor: ${id}`);
      }

      return {
        ...original,
        sortOrder:
          typeof original.sortOrder === "number"
            ? index + 1
            : original.sortOrder,
      };
    });

    return jsonResponse({
      ok: true,
      message: "Gallery order saved.",
      count: normalizedIds.length,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Ismeretlen hiba.",
      },
      400,
    );
  }
};

function reorderApartmentGalleryArray(sourceText: string, apartment: string, orderedIds: string[]) {
  const apartmentMatch = new RegExp(`(^|\\n)([ \\t]*)${escapeRegExp(apartment)}:\\s*\\{`, "m").exec(sourceText);

  if (!apartmentMatch) {
    throw new Error(`Nem talalhato apartment blokk: ${apartment}`);
  }

  const apartmentObjectOpen = sourceText.indexOf("{", apartmentMatch.index + apartmentMatch[0].length - 1);
  const apartmentObjectClose = findMatchingBracket(sourceText, apartmentObjectOpen, "{", "}");
  const apartmentBlock = sourceText.slice(apartmentObjectOpen, apartmentObjectClose + 1);
  const galleryMatch = /gallery:\s*\[/.exec(apartmentBlock);

  if (!galleryMatch) {
    throw new Error(`Nem talalhato gallery tomb az apartment blokkban: ${apartment}`);
  }

  const galleryArrayOpen = apartmentObjectOpen + galleryMatch.index + galleryMatch[0].lastIndexOf("[");
  const galleryArrayClose = findMatchingBracket(sourceText, galleryArrayOpen, "[", "]");
  const galleryInner = sourceText.slice(galleryArrayOpen + 1, galleryArrayClose);
  const galleryObjects = extractTopLevelObjects(galleryInner);

  if (galleryObjects.length !== orderedIds.length) {
    throw new Error("A gallery tomb elemeinek szama es az orderedIds hossza nem egyezik.");
  }

  const objectById = new Map<string, string>();

  for (const block of galleryObjects) {
    const idMatch = /\bid:\s*"([^"]+)"/.exec(block);

    if (!idMatch) {
      throw new Error("Hianyzo id mező egy gallery elemben.");
    }

    objectById.set(idMatch[1], block);
  }

  const apartmentIndent = apartmentMatch[2] || "";
  const itemIndent = `${apartmentIndent}    `;
  const closingIndent = `${apartmentIndent}  `;
  const reorderedInner = orderedIds
    .map((id, index) => {
      const rawBlock = objectById.get(id);

      if (!rawBlock) {
        throw new Error(`Nem talalhato gallery objektum az id-hoz: ${id}`);
      }

      const withSortOrder = rawBlock.includes("sortOrder:")
        ? rawBlock.replace(/\bsortOrder\s*:\s*\d+/, `sortOrder: ${index + 1}`)
        : rawBlock;
      const trimmed = withSortOrder.trim();
      const lines = trimmed.split("\n");
      const firstLine = `${itemIndent}${lines[0]}`;
      const rest = lines.slice(1);
      const rebuiltLines = [firstLine, ...rest];

      return rebuiltLines.join("\n");
    })
    .join(",\n");

  const nextGalleryInner = `\n${reorderedInner}\n${closingIndent}`;

  return `${sourceText.slice(0, galleryArrayOpen + 1)}${nextGalleryInner}${sourceText.slice(galleryArrayClose)}`;
}

function extractTopLevelObjects(text: string) {
  const result: string[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let quote = "";

  for (let index = 0; index < text.length; index += 1) {
    const current = text[index];
    const previous = index > 0 ? text[index - 1] : "";

    if (inString) {
      if (current === quote && previous !== "\\") {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (current === '"' || current === "'" || current === "`") {
      inString = true;
      quote = current;
      continue;
    }

    if (current === "{") {
      if (depth === 0) {
        start = index;
      }
      depth += 1;
      continue;
    }

    if (current === "}") {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        result.push(text.slice(start, index + 1));
        start = -1;
      }
    }
  }

  return result;
}

function findMatchingBracket(text: string, start: number, openChar: string, closeChar: string) {
  let depth = 0;
  let inString = false;
  let quote = "";

  for (let index = start; index < text.length; index += 1) {
    const current = text[index];
    const previous = index > 0 ? text[index - 1] : "";

    if (inString) {
      if (current === quote && previous !== "\\") {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (current === '"' || current === "'" || current === "`") {
      inString = true;
      quote = current;
      continue;
    }

    if (current === openChar) {
      depth += 1;
    } else if (current === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  throw new Error(`Nem talalhato parosito zarojel (${openChar}${closeChar}).`);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

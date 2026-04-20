import type { APIRoute } from "astro";

import {
  readMediaSeoFields,
  writeMediaSeoFields,
  type ThemeRoomKey
} from "../../../lib/media-seo-fields";

export const prerender = false;

interface SaveSeoFieldsPayload {
  id: number;
  themeRoom: ThemeRoomKey;
  featureFocus: string;
  altText?: string;
  title?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as Partial<SaveSeoFieldsPayload>;

    if (typeof payload.id !== "number") {
      throw new Error("Hiányzik vagy hibás média azonosító.");
    }

    const seoFields = await readMediaSeoFields();
    const previousEntry = seoFields[String(payload.id)] || {
      themeRoom: "",
      featureFocus: "",
      altText: "",
      title: ""
    };
    const themeRoom =
      typeof payload.themeRoom === "string" ? payload.themeRoom : previousEntry.themeRoom;
    const featureFocus =
      typeof payload.featureFocus === "string"
        ? payload.featureFocus.trim()
        : previousEntry.featureFocus;
    const altText =
      typeof payload.altText === "string" ? payload.altText.trim() : previousEntry.altText;
    const title = typeof payload.title === "string" ? payload.title.trim() : previousEntry.title;

    if (themeRoom || featureFocus || altText || title) {
      seoFields[String(payload.id)] = {
        themeRoom,
        featureFocus,
        altText,
        title
      };
    } else {
      delete seoFields[String(payload.id)];
    }

    await writeMediaSeoFields(seoFields);

    return new Response(
      JSON.stringify({
        ok: true,
        id: payload.id,
        themeRoom,
        featureFocus,
        altText,
        title
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: error instanceof Error ? error.message : "A SEO mezők mentése nem sikerült."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

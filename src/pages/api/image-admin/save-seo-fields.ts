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
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as Partial<SaveSeoFieldsPayload>;

    if (typeof payload.id !== "number") {
      throw new Error("Hianyzik vagy hibas media azonosito.");
    }

    const themeRoom = typeof payload.themeRoom === "string" ? payload.themeRoom : "";
    const featureFocus = typeof payload.featureFocus === "string" ? payload.featureFocus.trim() : "";

    const seoFields = await readMediaSeoFields();

    if (themeRoom || featureFocus) {
      seoFields[String(payload.id)] = {
        themeRoom,
        featureFocus
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
        featureFocus
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
        message: error instanceof Error ? error.message : "A SEO mezok mentese nem sikerult."
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

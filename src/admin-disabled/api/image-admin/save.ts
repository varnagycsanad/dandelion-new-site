import type { APIRoute } from "astro";

import {
  parseHomepageImageMapping,
  writeHomepageImageMapping
} from "@lib/homepage-image-mapping";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const raw = await request.text();
    const mapping = parseHomepageImageMapping(raw);

    await writeHomepageImageMapping(mapping);

    return new Response(
      JSON.stringify({
        ok: true
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
        message: error instanceof Error ? error.message : "A mentés nem sikerült."
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

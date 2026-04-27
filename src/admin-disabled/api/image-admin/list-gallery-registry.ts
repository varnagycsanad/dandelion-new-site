import type { APIRoute } from "astro";

import { accommodationImages } from "../../../data/images/accommodation-images.ts";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const apartment = url.searchParams.get("apartment")?.trim() || "";

  if (!apartment) {
    return jsonResponse(
      {
        ok: false,
        error: "Hianyzik az apartment query parameter.",
      },
      400,
    );
  }

  const apartmentRegistry = accommodationImages[apartment];

  if (!apartmentRegistry) {
    return jsonResponse(
      {
        ok: false,
        error: `Ismeretlen apartment kulcs: ${apartment}`,
      },
      404,
    );
  }

  const gallery = (apartmentRegistry.gallery || []).map((item) => ({
    id: item.id,
    src: item.src,
    thumb: item.thumb || "",
    sortOrder: typeof item.sortOrder === "number" ? item.sortOrder : null,
    altHu: item.alt?.hu || "",
    titleHu: item.title?.hu || "",
  }));

  return jsonResponse({
    ok: true,
    apartment,
    gallery,
  });
};

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

import type { APIRoute } from "astro";

import {
  readMediaApartmentAssignments,
  writeMediaApartmentAssignments,
  type ApartmentAssignmentKey
} from "@lib/media-apartment-assignments";
import {
  readApartmentImageAssignments,
  writeApartmentImageAssignments
} from "@lib/apartment-image-assignments";

export const prerender = false;

interface SaveApartmentPayload {
  id?: number;
  apartmentKey: ApartmentAssignmentKey | null;
  role?: "none" | "hero-desktop" | "hero-mobile" | "gallery";
  sortOrder?: number | string | null;
  galleryIds?: number[];
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as Partial<SaveApartmentPayload>;

    const apartmentKey =
      typeof payload.apartmentKey === "string" && payload.apartmentKey !== "all"
        ? payload.apartmentKey
        : null;
    const galleryIds = Array.isArray(payload.galleryIds)
      ? payload.galleryIds.filter((id) => typeof id === "number" && Number.isInteger(id) && id > 0)
      : null;

    if (galleryIds) {
      if (!apartmentKey) {
        throw new Error("Hianyzik vagy hibas lakas kulcs.");
      }

      const apartmentImageAssignments = await readApartmentImageAssignments();
      const apartmentConfig = apartmentImageAssignments[apartmentKey];

      apartmentConfig.gallery = galleryIds.map((id, index) => ({
        id,
        sortOrder: (index + 1) * 10
      }));

      await writeApartmentImageAssignments(apartmentImageAssignments);

      return new Response(
        JSON.stringify({
          ok: true,
          apartmentKey,
          gallery: apartmentConfig.gallery
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (typeof payload.id !== "number") {
      throw new Error("Hianyzik vagy hibas media azonosito.");
    }

    const role =
      payload.role === "hero-desktop" ||
      payload.role === "hero-mobile" ||
      payload.role === "gallery"
        ? payload.role
        : "none";
    const sortOrder =
      typeof payload.sortOrder === "number"
        ? payload.sortOrder
        : typeof payload.sortOrder === "string" && payload.sortOrder.trim() !== ""
          ? Number(payload.sortOrder)
          : 0;

    const assignments = await readMediaApartmentAssignments();

    if (apartmentKey) {
      assignments[String(payload.id)] = apartmentKey;
    } else {
      delete assignments[String(payload.id)];
    }

    await writeMediaApartmentAssignments(assignments);

    if (apartmentKey) {
      const apartmentImageAssignments = await readApartmentImageAssignments();
      const apartmentConfig = apartmentImageAssignments[apartmentKey];

      if (apartmentConfig.hero.desktop === payload.id) {
        apartmentConfig.hero.desktop = null;
      }

      if (apartmentConfig.hero.mobile === payload.id) {
        apartmentConfig.hero.mobile = null;
      }

      apartmentConfig.gallery = apartmentConfig.gallery.filter((item) => item.id !== payload.id);

      if (role === "hero-desktop") {
        apartmentConfig.hero.desktop = payload.id;
      } else if (role === "hero-mobile") {
        apartmentConfig.hero.mobile = payload.id;
      } else if (role === "gallery") {
        apartmentConfig.gallery = [
          ...apartmentConfig.gallery,
          {
            id: payload.id,
            sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0
          }
        ].sort((a, b) => a.sortOrder - b.sortOrder);
      }

      await writeApartmentImageAssignments(apartmentImageAssignments);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        id: payload.id,
        apartmentKey,
        role,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0
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
        message: error instanceof Error ? error.message : "A lakas hozzarendeles mentese nem sikerult."
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

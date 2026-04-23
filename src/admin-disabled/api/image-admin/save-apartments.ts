import type { APIRoute } from "astro";

import {
  readMediaApartmentAssignments,
  writeMediaApartmentAssignments,
  type ApartmentAssignmentKey
} from "@lib/media-apartment-assignments";

export const prerender = false;

interface SaveApartmentsPayload {
  ids: number[];
  apartmentKey: ApartmentAssignmentKey | null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as Partial<SaveApartmentsPayload>;

    if (!Array.isArray(payload.ids) || payload.ids.length === 0) {
      throw new Error("Nincs kivalasztott kep a tobbes menteshez.");
    }

    const ids = payload.ids.filter((id): id is number => typeof id === "number");

    if (ids.length === 0) {
      throw new Error("Hibas media azonosito lista.");
    }

    const apartmentKey =
      typeof payload.apartmentKey === "string" && payload.apartmentKey !== "all"
        ? payload.apartmentKey
        : null;

    const assignments = await readMediaApartmentAssignments();

    for (const id of ids) {
      if (apartmentKey) {
        assignments[String(id)] = apartmentKey;
      } else {
        delete assignments[String(id)];
      }
    }

    await writeMediaApartmentAssignments(assignments);

    return new Response(
      JSON.stringify({
        ok: true,
        ids,
        apartmentKey
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
        message:
          error instanceof Error ? error.message : "A tobbes lakas hozzarendeles nem sikerult."
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

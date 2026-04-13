import type { APIRoute } from "astro";

import {
  readMediaApartmentAssignments,
  writeMediaApartmentAssignments,
  type ApartmentAssignmentKey
} from "../../../lib/media-apartment-assignments";

export const prerender = false;

interface SaveApartmentPayload {
  id: number;
  apartmentKey: ApartmentAssignmentKey | null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as Partial<SaveApartmentPayload>;

    if (typeof payload.id !== "number") {
      throw new Error("Hianyzik vagy hibas media azonosito.");
    }

    const apartmentKey =
      typeof payload.apartmentKey === "string" && payload.apartmentKey !== "all"
        ? payload.apartmentKey
        : null;

    const assignments = await readMediaApartmentAssignments();

    if (apartmentKey) {
      assignments[String(payload.id)] = apartmentKey;
    } else {
      delete assignments[String(payload.id)];
    }

    await writeMediaApartmentAssignments(assignments);

    return new Response(
      JSON.stringify({
        ok: true,
        id: payload.id,
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

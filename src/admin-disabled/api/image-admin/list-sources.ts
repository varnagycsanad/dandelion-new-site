import type { APIRoute } from "astro";

import { accommodationSourceImages } from "../../../data/images/accommodation-source-images.ts";

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

  const candidates = accommodationSourceImages[apartment];

  if (!Array.isArray(candidates)) {
    return jsonResponse(
      {
        ok: false,
        error: `Ismeretlen apartment kulcs: ${apartment}`,
      },
      404,
    );
  }

  return jsonResponse({
    ok: true,
    apartment,
    candidates: candidates.map((candidate) => {
      const galleryPlan = candidate.targetPlans?.find((plan) => plan.role === "gallery");
      const thumbPlan = candidate.targetPlans?.find(
        (plan) => plan.role === "thumbnail" || plan.role === "thumb",
      );

      return {
        id: candidate.id,
        status: candidate.status,
        role:
          candidate.intendedRoles?.[0] ||
          candidate.targetPlans?.[0]?.role ||
          "",
        intendedRoles: candidate.intendedRoles || [],
        theme: candidate.theme || "",
        room: candidate.room || "",
        sortOrder: candidate.sortOrder ?? null,
        wpId: candidate.source?.wpId ?? null,
        originalUrl: candidate.source?.originalUrl || "",
        galleryTargetPath: galleryPlan?.targetPath || "",
        thumbTargetPath: thumbPlan?.targetPath || thumbPlan?.thumbPath || "",
      };
    }),
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

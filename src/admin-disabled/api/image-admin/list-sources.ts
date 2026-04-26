import type { APIRoute } from "astro";
import { access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { accommodationSourceImages } from "../../../data/images/accommodation-source-images.ts";
import { accommodationImages } from "../../../data/images/accommodation-images.ts";

export const prerender = false;

const WORKSPACE_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const PUBLIC_ROOT = path.join(WORKSPACE_ROOT, "public");

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
  const apartmentRegistry = accommodationImages[apartment];
  const registryGallery = accommodationImages[apartment]?.gallery || [];

  if (!Array.isArray(candidates)) {
    return jsonResponse(
      {
        ok: false,
        error: `Ismeretlen apartment kulcs: ${apartment}`,
      },
      404,
    );
  }

  const serializedCandidates = await Promise.all(
    candidates.map(async (candidate) => {
      const role =
        candidate.intendedRoles?.[0] ||
        candidate.targetPlans?.[0]?.role ||
        "";
      const galleryPlan = candidate.targetPlans?.find((plan) => plan.role === "gallery");
      const thumbPlan = candidate.targetPlans?.find(
        (plan) => plan.role === "thumbnail" || plan.role === "thumb",
      );
      const rolePlan =
        candidate.targetPlans?.find((plan) => plan.role === role) ||
        galleryPlan ||
        thumbPlan ||
        candidate.targetPlans?.[0];
      const galleryTargetPath = galleryPlan?.targetPath || "";
      const thumbTargetPath = thumbPlan?.targetPath || thumbPlan?.thumbPath || "";
      const roleTargetPath = rolePlan?.targetPath || rolePlan?.thumbPath || "";
      const galleryExists = await fileExists(resolvePublicPath(galleryTargetPath));
      const thumbExists = await fileExists(resolvePublicPath(thumbTargetPath));
      const roleTargetExists = await fileExists(resolvePublicPath(roleTargetPath));
      const registryMatch =
        registryGallery.find(
          (entry) =>
            (galleryTargetPath && entry.src === galleryTargetPath) ||
            (thumbTargetPath && entry.thumb === thumbTargetPath),
        ) || null;
      const heroDesktopRegistry = apartmentRegistry?.hero?.desktop;
      const heroMobileRegistry = apartmentRegistry?.hero?.mobile;
      const cardRegistry = apartmentRegistry?.card;

      let processed = galleryExists && thumbExists;
      let published = Boolean(registryMatch);
      let registryId = registryMatch?.id || "";
      let registrySrc = registryMatch?.src || "";
      let registryThumb = registryMatch?.thumb || "";

      if (role === "hero_mobile" || role === "hero_desktop" || role === "card") {
        processed = roleTargetExists;
      }

      if (role === "hero_desktop" && heroDesktopRegistry?.src === roleTargetPath) {
        published = true;
        registryId = heroDesktopRegistry.id || "";
        registrySrc = heroDesktopRegistry.src || "";
        registryThumb = "";
      } else if (role === "hero_mobile" && heroMobileRegistry?.src === roleTargetPath) {
        published = true;
        registryId = heroMobileRegistry.id || "";
        registrySrc = heroMobileRegistry.src || "";
        registryThumb = "";
      } else if (role === "card" && cardRegistry?.src === roleTargetPath) {
        published = true;
        registryId = cardRegistry.id || "";
        registrySrc = cardRegistry.src || "";
        registryThumb = "";
      }

      return {
        id: candidate.id,
        status: candidate.status,
        role,
        intendedRoles: candidate.intendedRoles || [],
        theme: candidate.theme || "",
        room: candidate.room || "",
        sortOrder: candidate.sortOrder ?? null,
        wpId: candidate.source?.wpId ?? null,
        originalUrl: candidate.source?.originalUrl || "",
        galleryTargetPath,
        thumbTargetPath,
        galleryExists,
        thumbExists,
        roleTargetPath,
        roleTargetExists,
        processed,
        published,
        registryId,
        registrySrc,
        registryThumb,
      };
    }),
  );

  return jsonResponse({
    ok: true,
    apartment,
    candidates: serializedCandidates,
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

function resolvePublicPath(targetPath: string) {
  if (!targetPath || !targetPath.startsWith("/")) {
    return "";
  }

  return path.join(PUBLIC_ROOT, targetPath.replace(/^\/+/, "").replace(/\//g, path.sep));
}

async function fileExists(filePath: string) {
  if (!filePath) {
    return false;
  }

  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

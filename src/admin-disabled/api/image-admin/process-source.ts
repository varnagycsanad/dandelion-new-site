import type { APIRoute } from "astro";
import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { accommodationSourceImages } from "../../data/images/accommodation-source-images.ts";

export const prerender = false;

const execFileAsync = promisify(execFile);
const WORKSPACE_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const PUBLIC_ROOT = path.join(WORKSPACE_ROOT, "public");
const PROCESS_SCRIPT_PATH = fileURLToPath(new URL("../../../../scripts/process-accommodation-images.mjs", import.meta.url));

interface ProcessPayload {
  apartment?: string;
  source?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ProcessPayload;

  try {
    payload = (await request.json()) as ProcessPayload;
  } catch {
    return jsonResponse(
      {
        ok: false,
        step: "images:process",
        error: "Hibás JSON kérés.",
        stdout: "",
        stderr: "",
      },
      400,
    );
  }

  const apartment = typeof payload.apartment === "string" ? payload.apartment.trim() : "";
  const source = typeof payload.source === "string" ? payload.source.trim() : "";

  if (!apartment || !source) {
    return jsonResponse(
      {
        ok: false,
        step: "images:process",
        error: "Az apartment és source mező kötelező.",
        stdout: "",
        stderr: "",
      },
      400,
    );
  }

  const candidates = accommodationSourceImages[apartment];
  const candidate = Array.isArray(candidates)
    ? candidates.find((item) => item.id === source)
    : null;

  if (!candidate) {
    return jsonResponse(
      {
        ok: false,
        step: "images:process",
        error: `Nem található source candidate: ${source}`,
        stdout: "",
        stderr: "",
      },
      404,
    );
  }

  const galleryPlan = candidate.targetPlans?.find((plan) => plan.role === "gallery");
  const thumbPlan = candidate.targetPlans?.find(
    (plan) => plan.role === "thumbnail" || plan.role === "thumb",
  );
  const galleryExists = await fileExists(resolvePublicPath(galleryPlan?.targetPath || ""));
  const thumbExists = await fileExists(resolvePublicPath(thumbPlan?.targetPath || thumbPlan?.thumbPath || ""));

  if (galleryExists && thumbExists) {
    return jsonResponse({
      ok: true,
      stdout: "NO CHANGE - WebP outputs already exist.",
      stderr: "",
    });
  }

  try {
    const result = await execFileAsync(
      process.execPath,
      [
        PROCESS_SCRIPT_PATH,
        `--apartment=${apartment}`,
        `--source=${source}`,
        "--write",
        "--allow-remote",
      ],
      {
        cwd: WORKSPACE_ROOT,
        env: process.env,
        windowsHide: true,
        maxBuffer: 1024 * 1024,
      },
    );

    return jsonResponse({
      ok: true,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
    });
  } catch (error) {
    const stdout = typeof error === "object" && error && "stdout" in error ? String(error.stdout ?? "") : "";
    const stderr = typeof error === "object" && error && "stderr" in error ? String(error.stderr ?? "") : "";
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Az images:process futtatasa nem sikerult.";

    return jsonResponse(
      {
        ok: false,
        step: "images:process",
        error: message,
        stdout,
        stderr,
      },
      400,
    );
  }
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

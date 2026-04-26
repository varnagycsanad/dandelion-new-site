import type { APIRoute } from "astro";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

export const prerender = false;

const execFileAsync = promisify(execFile);
const WORKSPACE_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const INTAKE_SCRIPT_PATH = fileURLToPath(new URL("../../../../scripts/images-intake.mjs", import.meta.url));

interface IntakePayload {
  apartment?: string;
  wpId?: number | string;
  role?: string;
  theme?: string;
  room?: string;
  sortOrder?: number | string;
  dryRun?: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: IntakePayload;

  try {
    payload = (await request.json()) as IntakePayload;
  } catch {
    return jsonResponse(
      {
        ok: false,
        step: "images:intake",
        error: "Hibás JSON kérés.",
        stdout: "",
        stderr: "",
      },
      400,
    );
  }

  const apartment = typeof payload.apartment === "string" ? payload.apartment.trim() : "";
  const wpId = typeof payload.wpId === "number" ? String(payload.wpId) : typeof payload.wpId === "string" ? payload.wpId.trim() : "";
  const role = typeof payload.role === "string" ? payload.role.trim() : "";
  const theme = typeof payload.theme === "string" ? payload.theme.trim() : "";
  const room = typeof payload.room === "string" ? payload.room.trim() : "";
  const sortOrder =
    typeof payload.sortOrder === "number"
      ? String(payload.sortOrder)
      : typeof payload.sortOrder === "string"
        ? payload.sortOrder.trim()
        : "";
  const dryRun = payload.dryRun === true;

  const validationErrors = [];

  if (!apartment) {
    validationErrors.push("Hianyzik az apartment mező.");
  }

  if (!wpId || !/^\d+$/.test(wpId)) {
    validationErrors.push("Hianyzik vagy hibas a wpId mező.");
  }

  if (!role) {
    validationErrors.push("Hianyzik a role mező.");
  }

  if (validationErrors.length > 0) {
    return jsonResponse(
      {
        ok: false,
        step: "images:intake",
        error: validationErrors.join(" "),
        stdout: "",
        stderr: "",
      },
      400,
    );
  }

  const args = [
    `--apartment=${apartment}`,
    `--wpId=${wpId}`,
    `--role=${role}`,
  ];

  if (theme) {
    args.push(`--theme=${theme}`);
  }

  if (room) {
    args.push(`--room=${room}`);
  }

  if (sortOrder) {
    args.push(`--sortOrder=${sortOrder}`);
  }

  if (dryRun) {
    args.push("--dry-run");
  }

  try {
    const result = await execFileAsync(process.execPath, [INTAKE_SCRIPT_PATH, ...args], {
      cwd: WORKSPACE_ROOT,
      env: process.env,
      windowsHide: true,
      maxBuffer: 1024 * 1024,
    });

    return jsonResponse({
      ok: true,
      dryRun,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
    });
  } catch (error) {
    const stdout = typeof error === "object" && error && "stdout" in error ? String(error.stdout ?? "") : "";
    const stderr = typeof error === "object" && error && "stderr" in error ? String(error.stderr ?? "") : "";
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Az images:intake futtatasa nem sikerult.";

    return jsonResponse(
      {
        ok: false,
        step: "images:intake",
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

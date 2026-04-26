import type { APIRoute } from "astro";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

export const prerender = false;

const execFileAsync = promisify(execFile);
const WORKSPACE_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const SELECT_SCRIPT_PATH = fileURLToPath(new URL("../../../../scripts/images-select.mjs", import.meta.url));

interface SelectPayload {
  apartment?: string;
  source?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: SelectPayload;

  try {
    payload = (await request.json()) as SelectPayload;
  } catch {
    return jsonResponse(
      {
        ok: false,
        step: "images:select",
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
        step: "images:select",
        error: "Az apartment és source mező kötelező.",
        stdout: "",
        stderr: "",
      },
      400,
    );
  }

  try {
    const result = await execFileAsync(
      process.execPath,
      [SELECT_SCRIPT_PATH, `--apartment=${apartment}`, `--source=${source}`],
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
        : "Az images:select futtatasa nem sikerult.";

    return jsonResponse(
      {
        ok: false,
        step: "images:select",
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

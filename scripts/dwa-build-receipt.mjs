// [CHANGE 2026-07-25 22:45] Persist a gitignored build receipt so preflight can verify build freshness.
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

async function runGit(args) {
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd: process.cwd(),
      windowsHide: true
    });

    return stdout.trim();
  } catch {
    return "UNKNOWN";
  }
}

async function getLatestMtimeMs(directoryPath) {
  let latestMtimeMs = NaN;
  const entries = await readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const nestedMtimeMs = await getLatestMtimeMs(entryPath);

      if (Number.isFinite(nestedMtimeMs)) {
        latestMtimeMs = Math.max(latestMtimeMs, nestedMtimeMs);
      }

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const entryStats = await stat(entryPath);
    latestMtimeMs = Math.max(latestMtimeMs, entryStats.mtimeMs);
  }

  return latestMtimeMs;
}

const projectRoot = process.cwd();
const reportDirectoryPath = path.join(projectRoot, "reports", "dwa-preflight");
const receiptPath = path.join(reportDirectoryPath, "build-receipt.json");
const distPath = path.join(projectRoot, "dist");

await mkdir(reportDirectoryPath, { recursive: true });

let distLatestMtimeMs = NaN;

try {
  distLatestMtimeMs = await getLatestMtimeMs(distPath);
} catch {
  distLatestMtimeMs = NaN;
}

const generatedAt = new Date().toISOString();
const receipt = {
  schema_version: "dwa-build-receipt/v1",
  generated_at: generatedAt,
  repo_path: projectRoot,
  git_branch: await runGit(["rev-parse", "--abbrev-ref", "HEAD"]),
  git_commit: await runGit(["rev-parse", "HEAD"]),
  build_command: "npm run build",
  dist_latest_mtime: Number.isFinite(distLatestMtimeMs)
    ? new Date(distLatestMtimeMs).toISOString()
    : null
};

await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");

console.log(`[build-receipt] Wrote ${path.relative(projectRoot, receiptPath)}`);

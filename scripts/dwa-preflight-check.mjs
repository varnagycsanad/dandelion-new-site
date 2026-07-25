// [CHANGE 2026-07-25 22:45] Generate DWA preflight JSON and Markdown evidence without touching deploy or secrets.
import { exec, execFile } from "node:child_process";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  DWA_PREFLIGHT_STATUSES,
  classifyPath,
  evaluateDwaPreflight,
  renderDwaPreflightMarkdown
} from "./dwa-preflight-lib.mjs";

const execFileAsync = promisify(execFile);
const execAsync = promisify(exec);
const projectRoot = process.cwd();
const reportDirectoryPath = path.join(projectRoot, "reports", "dwa-preflight");
const jsonReportPath = path.join(reportDirectoryPath, "latest.json");
const markdownReportPath = path.join(reportDirectoryPath, "latest.md");
const buildReceiptPath = path.join(reportDirectoryPath, "build-receipt.json");

function parseArgs(argv) {
  return {
    runBuild: argv.includes("--run-build"),
    runCheck: argv.includes("--run-check")
  };
}

async function runGit(args, { allowFailure = false } = {}) {
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd: projectRoot,
      windowsHide: true
    });

    return stdout;
  } catch (error) {
    if (allowFailure) {
      return "";
    }

    throw error;
  }
}

function parseNameStatusZ(rawText) {
  const tokens = rawText.split("\0").filter(Boolean);
  const results = [];

  for (let index = 0; index < tokens.length; ) {
    const statusToken = tokens[index];
    index += 1;

    if (!statusToken) {
      continue;
    }

    const code = statusToken[0];

    if (code === "R" || code === "C") {
      const oldPath = tokens[index];
      const newPath = tokens[index + 1];
      index += 2;
      results.push({
        status: code,
        path: newPath ?? oldPath
      });
      continue;
    }

    const filePath = tokens[index];
    index += 1;

    if (!filePath) {
      continue;
    }

    results.push({
      status: code,
      path: filePath
    });
  }

  return results;
}

async function getChangedFilesFromGit() {
  const trackedRaw = await runGit(["diff", "--name-status", "-z", "HEAD"], {
    allowFailure: true
  });
  const untrackedRaw = await runGit(["ls-files", "--others", "--exclude-standard", "-z"], {
    allowFailure: true
  });
  const trackedEntries = parseNameStatusZ(trackedRaw);
  const untrackedEntries = untrackedRaw
    .split("\0")
    .filter(Boolean)
    .map((filePath) => ({
      status: "?",
      path: filePath
    }));
  const seenPaths = new Set();
  const changedFiles = [];

  for (const entry of [...trackedEntries, ...untrackedEntries]) {
    const normalizedPath = entry.path.replace(/\\/g, "/");

    if (seenPaths.has(normalizedPath)) {
      continue;
    }

    seenPaths.add(normalizedPath);
    changedFiles.push({
      status: entry.status,
      path: normalizedPath
    });
  }

  return changedFiles.sort((left, right) => left.path.localeCompare(right.path, "en"));
}

async function safeReadFileContent(relativePath) {
  const classification = classifyPath(relativePath);

  if (classification.category === "secret") {
    return undefined;
  }

  const absolutePath = path.join(projectRoot, relativePath);
  const extension = path.extname(relativePath).toLowerCase();
  const isTextLike = [
    ".astro",
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".mjs",
    ".ts",
    ".tsx",
    ".txt",
    ".yaml",
    ".yml"
  ].includes(extension);

  if (!isTextLike) {
    return undefined;
  }

  try {
    const fileStats = await stat(absolutePath);

    if (fileStats.size > 250_000) {
      return undefined;
    }

    return await readFile(absolutePath, "utf8");
  } catch {
    return undefined;
  }
}

async function getLatestSourceMtimeMs(changedFiles) {
  let latestMtimeMs = NaN;

  for (const file of changedFiles) {
    const classification = classifyPath(file.path);

    if (classification.scope === "forbidden" || file.status === "D") {
      continue;
    }

    try {
      const fileStats = await stat(path.join(projectRoot, file.path));
      latestMtimeMs = Math.max(latestMtimeMs, fileStats.mtimeMs);
    } catch {
      continue;
    }
  }

  return latestMtimeMs;
}

async function getLatestDistMtimeMs(directoryPath) {
  let latestMtimeMs = NaN;
  const entries = await readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const nestedMtimeMs = await getLatestDistMtimeMs(entryPath);

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

async function loadBuildReceipt() {
  try {
    const receiptText = await readFile(buildReceiptPath, "utf8");
    return JSON.parse(receiptText);
  } catch {
    return null;
  }
}

async function execNpmScript(scriptName) {
  try {
    await execAsync(`npm run ${scriptName}`, {
      cwd: projectRoot,
      windowsHide: true,
      maxBuffer: 20 * 1024 * 1024
    });

    return {
      attempted: true,
      success: true
    };
  } catch (error) {
    return {
      attempted: true,
      success: false,
      exit_code: error.code ?? 1,
      stderr: error.stderr ?? "",
      stdout: error.stdout ?? ""
    };
  }
}

async function writeReports(report) {
  await mkdir(reportDirectoryPath, { recursive: true });
  await writeFile(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(markdownReportPath, `${renderDwaPreflightMarkdown(report)}\n`, "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const changedFilesFromGit = await getChangedFilesFromGit();
  const changedFiles = [];

  for (const file of changedFilesFromGit) {
    changedFiles.push({
      ...file,
      content: await safeReadFileContent(file.path)
    });
  }

  const gitBranch = (await runGit(["rev-parse", "--abbrev-ref", "HEAD"])).trim() || "UNKNOWN";
  const gitCommit = (await runGit(["rev-parse", "HEAD"])).trim() || "UNKNOWN";
  const workingTreeRawStatus = (await runGit(["status", "--short", "--branch"], {
    allowFailure: true
  })).trim();

  let buildExecution = null;
  let checkExecution = null;
  let buildReceipt = await loadBuildReceipt();
  let latestSourceMtimeMs = await getLatestSourceMtimeMs(changedFiles);
  let distLatestMtimeMs = NaN;

  try {
    distLatestMtimeMs = await getLatestDistMtimeMs(path.join(projectRoot, "dist"));
  } catch {
    distLatestMtimeMs = NaN;
  }

  let report = evaluateDwaPreflight({
    generatedAt: new Date().toISOString(),
    repoPath: projectRoot,
    gitBranch,
    gitCommit,
    workingTreeRawStatus,
    changedFiles,
    buildReceipt,
    buildExecution,
    checkExecution,
    latestSafeSourceMtime: latestSourceMtimeMs,
    distLatestMtime: distLatestMtimeMs
  });

  if (args.runBuild && report.build_required && report.forbidden_scope_findings.length === 0) {
    buildExecution = await execNpmScript("build");
    buildReceipt = await loadBuildReceipt();
    latestSourceMtimeMs = await getLatestSourceMtimeMs(changedFiles);

    try {
      distLatestMtimeMs = await getLatestDistMtimeMs(path.join(projectRoot, "dist"));
    } catch {
      distLatestMtimeMs = NaN;
    }

    report = evaluateDwaPreflight({
      generatedAt: new Date().toISOString(),
      repoPath: projectRoot,
      gitBranch,
      gitCommit,
      workingTreeRawStatus,
      changedFiles,
      buildReceipt,
      buildExecution,
      checkExecution,
      latestSafeSourceMtime: latestSourceMtimeMs,
      distLatestMtime: distLatestMtimeMs
    });
  }

  if (args.runCheck) {
    checkExecution = await execNpmScript("check");
    report = evaluateDwaPreflight({
      generatedAt: new Date().toISOString(),
      repoPath: projectRoot,
      gitBranch,
      gitCommit,
      workingTreeRawStatus,
      changedFiles,
      buildReceipt,
      buildExecution,
      checkExecution,
      latestSafeSourceMtime: latestSourceMtimeMs,
      distLatestMtime: distLatestMtimeMs
    });
  }

  await writeReports(report);

  console.log(`[dwa:preflight] Status: ${report.status}`);
  console.log(`[dwa:preflight] JSON report: ${jsonReportPath}`);
  console.log(`[dwa:preflight] Markdown report: ${markdownReportPath}`);

  if (!DWA_PREFLIGHT_STATUSES.includes(report.status)) {
    process.exit(1);
  }

  if (
    report.status === "BLOCKED_NO_DEFENSIBLE_RELEASE" ||
    report.build_status === "FAILED" ||
    report.check_status === "FAILED"
  ) {
    process.exit(1);
  }
}

const invokedDirectly =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  await main();
}

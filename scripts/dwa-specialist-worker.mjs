import { createHash } from "node:crypto";
import { exec } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execAsync = promisify(exec);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const specialist = "DWA";
const defaultBridgeBaseUrl = "http://127.0.0.1:4321";

function bridgeBaseUrl() {
  return (process.env.DCA_SPECIALIST_BRIDGE_URL || defaultBridgeBaseUrl).replace(/\/$/u, "");
}

async function bridgeToken() {
  if (process.env.DCA_SPECIALIST_DISPATCH_TOKEN?.trim()) return process.env.DCA_SPECIALIST_DISPATCH_TOKEN.trim();
  const configPath = process.env.DCA_SPECIALIST_BRIDGE_CONFIG || "C:\\Users\\cvarn\\Desktop\\Dandelion Control Center\\config\\specialist-bridge.local.json";
  try {
    const config = JSON.parse(await readFile(configPath, "utf8"));
    return String(config.token || "").trim();
  } catch {
    return "";
  }
}

async function bridgeJson(pathname, options = {}) {
  const token = await bridgeToken();
  if (!token) throw new Error("A DCA bridge token nincs beállítva.");
  const response = await fetch(`${bridgeBaseUrl()}${pathname}`, {
    ...options,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`DCA bridge HTTP ${response.status}: ${body?.message || "ismeretlen hiba"}`);
  return body;
}

function safeProjectPath(candidate) {
  const resolved = path.resolve(candidate);
  const relative = path.relative(projectRoot, resolved);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("A DWA artifact útvonala nem maradhat a DWA projekten kívül.");
  }
  return resolved;
}

async function runPreflight() {
  try {
    const result = await execAsync("npm run dwa:preflight", {
      cwd: projectRoot,
      windowsHide: true,
      maxBuffer: 20 * 1024 * 1024
    });
    return { exitCode: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    return { exitCode: Number(error.code || 1), stdout: error.stdout || "", stderr: error.stderr || String(error) };
  }
}

async function readPreflightReport() {
  const reportPath = path.join(projectRoot, "reports", "dwa-preflight", "latest.json");
  try {
    return JSON.parse(await readFile(reportPath, "utf8"));
  } catch {
    return null;
  }
}

function renderArtifact(task, execution, report) {
  const status = report?.status || (execution.exitCode === 0 ? "UNKNOWN" : "BLOCKED_WORKER_EXECUTION");
  return [
    `# ${task.request.requestId} — DWA specialist artifact`,
    "",
    `- Task ID: \`${task.taskId}\``,
    `- Thread ID: \`${task.threadId}\``,
    `- Státusz: **${status}**`,
    "- Mód: `READ_ONLY`",
    "- Evidence kind: `DWA_PREFLIGHT`",
    `- Forrásprojekt: \`${projectRoot}\``,
    `- Ellenőrzés: \`npm run dwa:preflight\``,
    "",
    "## DWA eredmény",
    "",
    report ? "A DWA preflight jelentés elkészült; a DCA ezt az artifactot tudja ellenőrizni." : "A preflight nem adott olvasható JSON jelentést; a task nem tekinthető deploy-késznek.",
    "",
    "## Futtatási kimenet",
    "",
    `- Exit code: \`${execution.exitCode}\``,
    execution.stderr ? `- stderr: ${execution.stderr.trim().slice(0, 2000)}` : "- stderr: nincs.",
    "",
    "## DCA döntési korlát",
    "",
    "Deploy, publikálás vagy forráskód-módosítás nem történt. Bármilyen éles deploy külön approvalt igényel.",
    "",
    "## Preflight JSON",
    "",
    "```json",
    JSON.stringify(report || { status: "BLOCKED_WORKER_EXECUTION" }, null, 2),
    "```",
    ""
  ].join("\n");
}

async function processTask(task, workerId) {
  await bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/claim`, {
    method: "POST",
    body: JSON.stringify({ workerId, targetSpecialist: specialist })
  });
  const heartbeat = setInterval(() => {
    void bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/heartbeat`, {
      method: "POST",
      body: JSON.stringify({ workerId })
    }).catch(() => undefined);
  }, 30_000);
  try {
    const execution = await runPreflight();
    const report = await readPreflightReport();
    const artifactPath = safeProjectPath(task.request.expectedArtifactPath);
    const receiptPath = `${artifactPath}.receipt.json`;
    await mkdir(path.dirname(artifactPath), { recursive: true });
    await writeFile(artifactPath, renderArtifact(task, execution, report), "utf8");
    const artifactContent = await readFile(artifactPath);
    const receipt = {
      taskId: task.taskId,
      artifactPath,
      sourceProjectPath: projectRoot,
      receivedAt: new Date().toISOString(),
      noLiveWriteConfirmed: true,
      validatorVersion: "dca-artifact-semantics/v1",
      artifactSha256: createHash("sha256").update(artifactContent).digest("hex"),
      artifactBytes: artifactContent.byteLength,
      artifactStatus: report?.status || (execution.exitCode === 0 ? "BLOCKED_WORKER_EXECUTION" : "BLOCKED_WORKER_EXECUTION"),
      evidenceKind: "DWA_PREFLIGHT",
      summary: `DWA read-only preflight artifact elkészült: ${report?.status || "BLOCKED_WORKER_EXECUTION"}.`
    };
    await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    await bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/artifact`, {
      method: "POST",
      body: JSON.stringify(receipt)
    });
    return { taskId: task.taskId, artifactPath, status: report?.status || "BLOCKED_WORKER_EXECUTION" };
  } finally {
    clearInterval(heartbeat);
  }
}

export async function runDwaWorker({ once = true, pollMs = 5000, workerId = `dwa-worker-${process.pid}` } = {}) {
  const results = [];
  do {
    let queued;
    let running;
    try {
      queued = await bridgeJson(`/specialist-tasks?targetSpecialist=${specialist}&status=QUEUED`);
      running = await bridgeJson(`/specialist-tasks?targetSpecialist=${specialist}&status=RUNNING`);
    } catch (error) {
      if (once) throw error;
      await new Promise((resolve) => setTimeout(resolve, pollMs));
      continue;
    }
    const tasks = [...queued, ...running.filter((task) => task.claimedBy === workerId || (task.claimedAt && Date.now() - Date.parse(task.claimedAt) >= 30_000))];
    for (const task of tasks) {
      try {
        results.push(await processTask(task, workerId));
      } catch (error) {
        results.push({ taskId: task.taskId, error: error instanceof Error ? error.message : String(error) });
      }
    }
    if (once) break;
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  } while (true);
  return results;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const once = process.argv.includes("--once");
  const results = await runDwaWorker({ once, workerId: process.env.DCA_WORKER_ID || "dwa-worker" });
  console.log(JSON.stringify({ specialist, projectRoot, results }, null, 2));
  if (results.some((item) => item.error)) process.exitCode = 1;
}

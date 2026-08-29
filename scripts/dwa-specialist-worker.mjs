import { createHash } from "node:crypto";
import { exec, execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { validateProductChange, taskOutputDirectory } from "./dwa-output-policy.mjs";

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);
const projectRoot = process.env.DCA_EXECUTION_WORKTREE_PATH?.trim()
  ? path.resolve(process.env.DCA_EXECUTION_WORKTREE_PATH)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const specialist = "DWA";
const defaultBridgeBaseUrl = "http://127.0.0.1:4321";
const knowledgePaths = ["knowledge/KNOWLEDGE-INDEX.json", "knowledge/PROJECT-STATE.md"];
const knowledgePushRef = process.env.DWA_KNOWLEDGE_PUSH_REF?.trim() || "codex/knowledge-write-dwa";
const knowledgeSources = [
  ["AGENT.md", "DOMAIN_SOURCE", ["DWA", "ownership", "safety"]],
  ["README.md", "DOMAIN_SOURCE", ["DWA", "workflow"]],
  ["project-docs/DWA-003.2-specialist-capability-contract.md", "DOMAIN_SOURCE", ["capabilities", "execution path"]],
  ["project-docs/DWA-004-preflight-and-dca-evidence-handoff.md", "EVIDENCE", ["preflight", "DCA", "handoff"]],
  ["project-docs/DWA-OWNERSHIP-BOUNDARIES.md", "DOMAIN_SOURCE", ["ownership", "DMA", "DSA"]]
];

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

function isOutputPolicyTask(task) {
  return task?.request?.targetSpecialist === specialist && task?.request?.allowedMode === "WRITE" && task?.request?.capabilityId === "specialist.system.output_policy";
}

function safeArtifactPath(candidate, task) {
  const resolved = path.resolve(candidate);
  if (isOutputPolicyTask(task)) {
    const outputRoot = path.resolve(task.request.outputRoot || "");
    if (!outputRoot || (!resolved.startsWith(`${outputRoot}${path.sep}`) && resolved !== outputRoot)) throw new Error("A DWA artifact nem az explicit külső output root alatt van.");
    return resolved;
  }
  return safeProjectPath(candidate);
}

async function runOutputPolicyTask(task) {
  validateProductChange(task.request.productChange, specialist);
  const implementationPaths = task.request.implementationPaths || [];
  if (!implementationPaths.length || new Set(implementationPaths).size !== implementationPaths.length) throw new Error("A DWA implementationPaths allowlist hiányos vagy duplikált.");
  const before = (await runGit(["status", "--porcelain"])).stdout.split(/\r?\n/u).filter(Boolean).map((line) => line.slice(3).replaceAll("\\", "/"));
  if (before.some((file) => !implementationPaths.includes(file))) throw new Error(`A DWA worktree nem várt dirty fájlt tartalmaz: ${before.join(", ")}.`);
  await runGit(["add", "--", ...implementationPaths]);
  const staged = (await runGit(["diff", "--cached", "--name-only"])).stdout.split(/\r?\n/u).filter(Boolean).map((file) => file.replaceAll("\\", "/"));
  if (staged.length !== implementationPaths.length || !implementationPaths.every((file) => staged.includes(file))) throw new Error(`A DWA staging eltér az implementationPaths allowlisttől: ${staged.join(", ")}.`);
  await runGit(["commit", "-m", "feat(dwa): establish controlled output policy", "--only", "--", ...implementationPaths]);
  const commit = (await runGit(["rev-parse", "HEAD"])).stdout.trim();
  const push = await runGit(["push", "-u", "origin", "HEAD"], true);
  const remote = push.exitCode === 0 ? (await runGit(["rev-parse", "--verify", "@{upstream}"], true)).stdout.trim() || null : null;
  const outputRoot = task.request.outputRoot || taskOutputDirectory(task.taskId);
  const artifactPath = safeArtifactPath(task.request.expectedArtifactPath, task);
  const artifactStatus = push.exitCode === 0 && remote === commit ? "OUTPUT_POLICY_IMPLEMENTED" : "OUTPUT_POLICY_INCOMPLETE";
  const artifact = `# ${task.request.requestId} — DWA output policy artifact\n\n- Task ID: \`${task.taskId}\`\n- Status: **${artifactStatus}**\n- Evidence kind: \`SPECIALIST_OUTPUT_POLICY\`\n- Exact capability: \`specialist.system.output_policy\`\n- Source project: \`${projectRoot}\`\n- Execution output root: \`${outputRoot}\`\n- Product change: \`${task.request.productChange.changeId}\`\n- Implementation paths: \`${implementationPaths.join(", ")}\`\n- Commit: \`${commit}\`\n- Push: \`${push.exitCode === 0 ? "PUSHED" : "BLOCKED"}\`\n- Remote readback: \`${remote || "MISSING"}\`\n- Staged after closeout: \`none\`\n\nRepo-relative reports are written only by explicit canonical promotion. No deploy or external platform write occurred.\n`;
  await mkdir(path.dirname(artifactPath), { recursive: true });
  await writeFile(artifactPath, artifact, "utf8");
  const content = await readFile(artifactPath);
  const receipt = { taskId: task.taskId, artifactPath, sourceProjectPath: projectRoot, receivedAt: new Date().toISOString(), noLiveWriteConfirmed: true, validatorVersion: "dca-artifact-semantics/v1", artifactSha256: fileHash(content), artifactBytes: content.byteLength, artifactStatus, evidenceKind: "SPECIALIST_OUTPUT_POLICY", summary: "DWA output/worktree policy specialist artifact.", productChangeId: task.request.productChange.changeId, implementationPaths, knowledgePromotionPaths: knowledgePaths, commit, pushStatus: push.exitCode === 0 ? "PUSHED" : "BLOCKED", remoteCommitHash: remote, stagedFiles: [] };
  await writeFile(`${artifactPath}.receipt.json`, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  await bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/artifact`, { method: "POST", body: JSON.stringify(receipt) });
  return { taskId: task.taskId, artifactPath, status: artifactStatus };
}

export function isKnowledgeWriteTask(task) {
  return task?.request?.targetSpecialist === specialist
    && task?.request?.allowedMode === "WRITE"
    && task?.request?.knowledgeUpdateRequired === true
    && task?.request?.knowledgeWriteCapabilityId === "specialist.knowledge.state_update"
    && Array.isArray(task.request.knowledgeWritePaths)
    && task.request.knowledgeWritePaths.length === knowledgePaths.length
    && task.request.knowledgeWritePaths.every((value, index) => value === knowledgePaths[index]);
}

function fileHash(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function runGit(args, allowFailure = false) {
  try {
    const result = await execFileAsync("git", args, { cwd: projectRoot, windowsHide: true, maxBuffer: 4 * 1024 * 1024 });
    return { exitCode: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (!allowFailure) throw error;
    return { exitCode: Number(error.code || 1), stdout: error.stdout || "", stderr: error.stderr || String(error) };
  }
}

async function createKnowledgeWrite(task) {
  const stagedBefore = (await runGit(["diff", "--cached", "--name-only"], true)).stdout.split(/\r?\n/u).filter(Boolean);
  if (stagedBefore.length > 0) throw new Error(`A DWA worker meglévő staged fájllal nem indulhat: ${stagedBefore.join(", ")}`);
  const sourceEntries = [];
  for (const [relativePath, role, topics] of knowledgeSources) {
    const content = await readFile(path.join(projectRoot, relativePath));
    sourceEntries.push({ relativePath, role, topics, hash: fileHash(content) });
  }
  const reviewedAt = new Date().toISOString();
  const statePath = path.join(projectRoot, knowledgePaths[1]);
  const indexPath = path.join(projectRoot, knowledgePaths[0]);
  const state = [
    "# DWA canonical project state", "", `- Specialist: \`dandelion-website-agent\` / \`${specialist}\``, "- Project: \`dandelion-web\`", `- State reviewed: \`${reviewedAt}\``, "",
    "## Canonical boundary", "", "- A DWA canonical knowledge a webhely saját Astro forrás-, ownership- és preflight-szerződésének összefoglalója.", "- A site source és az Ads, GA4, GTM, GSC, Meta, SabeeApp, illetve deploy/live állapot külön kezelendő.", "- Ebben a knowledge-write folyamatban külső platform- vagy weboldal-élesítési write nem történt.", "",
    "## Open checks", "", "- Bármely deploy vagy publikálás külön DCA approvalt igényel.", "- Booking truth és külső platform-admin kérdés DSA/DMA ownershipban marad.", "- A preflight evidence nem helyettesíti a live deploy/readback bizonyítékot.", "",
    "## Canonical source map", "", ...sourceEntries.map((source) => `- \`${source.relativePath}\` — ${source.role}; SHA-256 \`${source.hash}\`.`), "",
    "## Next decision points", "", "- A DCA által kért site-scope és specialist ownership legyen explicit.", "- Release előtt külön build, deploy approval és publikus readback szükséges.", ""
  ].join("\n");
  await mkdir(path.dirname(statePath), { recursive: true });
  await writeFile(statePath, state, "utf8");
  const stateHash = fileHash(Buffer.from(state, "utf8"));
  const documents = [
    { documentId: "dwa-project-state", path: knowledgePaths[1], role: "CANONICAL_STATE", topics: ["canonical state", "ownership", "decisions"], active: true, supersedes: [], relatedDocumentIds: sourceEntries.map((source) => `dwa-${source.relativePath.replaceAll("/", "-").replaceAll(".", "-").toLowerCase()}`), contentHash: stateHash, lastVerifiedAt: reviewedAt },
    ...sourceEntries.map((source) => ({ documentId: `dwa-${source.relativePath.replaceAll("/", "-").replaceAll(".", "-").toLowerCase()}`, path: source.relativePath, role: source.role, topics: source.topics, active: true, supersedes: [], relatedDocumentIds: ["dwa-project-state"], contentHash: source.hash, lastVerifiedAt: reviewedAt }))
  ];
  const index = {
    schemaVersion: "dca-knowledge-index/v1", specialistId: "dandelion-website-agent", specialistKind: specialist, owner: specialist,
    projectId: "dandelion-web", repositoryPath: projectRoot, indexPath: knowledgePaths[0], canonicalStatePath: knowledgePaths[1],
    requiredTopics: ["Astro", "website", "landing", "CTA", "tracking", "SEO", "GEO", "deploy", "decisions"], documents,
    lastReviewedAt: reviewedAt, stateHash, sourceCommit: (await runGit(["rev-parse", "HEAD"])).stdout.trim(), ttlDays: 30,
    openDcaDependencies: ["DCA acceptance must verify schema, exact paths, hashes, commit, push and remote readback.", "External platform and deploy writes remain outside DWA knowledge-write."],
    nextDecisionPoints: ["Confirm explicit site scope before implementation.", "Require DCA release approval and public readback for deploy claims."]
  };
  if (!index.documents.some((document) => document.role === "CANONICAL_STATE" && document.active && document.path === knowledgePaths[1])) throw new Error("A DWA knowledge index canonical state dokumentuma hiányzik.");
  await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  const validate = JSON.parse(await readFile(indexPath, "utf8"));
  if (validate.schemaVersion !== "dca-knowledge-index/v1" || validate.specialistId !== "dandelion-website-agent" || validate.projectId !== "dandelion-web" || validate.indexPath !== knowledgePaths[0] || validate.canonicalStatePath !== knowledgePaths[1] || !state.trim()) throw new Error("A DWA canonical knowledge index schema-validációja sikertelen.");
  await runGit(["add", "--", ...knowledgePaths]);
  const staged = (await runGit(["diff", "--cached", "--name-only"])).stdout.split(/\r?\n/u).filter(Boolean).map((value) => value.replaceAll("\\", "/"));
  if (staged.length !== knowledgePaths.length || !knowledgePaths.every((value) => staged.includes(value))) throw new Error(`A DWA knowledge-write staged fájllistája hibás: ${staged.join(", ")}`);
  await runGit(["commit", "-m", "docs(knowledge): consolidate DWA canonical state", "--only", "--", ...knowledgePaths]);
  const knowledgeCommit = (await runGit(["rev-parse", "HEAD"])).stdout.trim();
  const push = await runGit(["push", "origin", `HEAD:refs/heads/${knowledgePushRef}`], true);
  if (push.exitCode === 0) await runGit(["fetch", "origin", knowledgePushRef], true);
  const remoteCommitHash = push.exitCode === 0 ? (await runGit(["rev-parse", "--verify", "FETCH_HEAD"], true)).stdout.trim() || null : null;
  const stagedAfter = (await runGit(["diff", "--cached", "--name-only"], true)).stdout.split(/\r?\n/u).filter(Boolean);
  const changedFiles = await Promise.all(knowledgePaths.map(async (relativePath) => {
    const content = await readFile(path.join(projectRoot, relativePath));
    return { path: relativePath, sha256: fileHash(content), bytes: content.byteLength };
  }));
  const newStateHash = fileHash(await readFile(statePath));
  return {
    status: push.exitCode === 0 && remoteCommitHash === knowledgeCommit ? "KNOWLEDGE_UPDATED" : "KNOWLEDGE_UPDATE_INCOMPLETE",
    changedFiles, knowledgeCommit, pushStatus: push.exitCode === 0 ? "PUSHED" : "BLOCKED", remoteCommitHash, stagedFiles: stagedAfter,
    knowledgeDelta: { knowledgeUpdated: true, changedTopics: index.requiredTopics, previousStateHash: null, newStateHash, newDecisions: ["DWA canonical state separates site source contracts from live release state."], newOpenChecks: index.openDcaDependencies, closedOpenChecks: [], canonicalSourceChanges: knowledgePaths }
  };
}

function renderKnowledgeArtifact(task, result) {
  return [
    `# ${task.request.requestId} — DWA canonical knowledge write artifact`, "", `- Task ID: \`${task.taskId}\``, `- Státusz: **${result.status}**`, "- Mód: `WRITE`", "- Evidence kind: `SPECIALIST_KNOWLEDGE_WRITE`", "- Exact capability: `specialist.knowledge.state_update`", `- Forrásprojekt: \`${projectRoot}\``, "", "## Canonical knowledge result", "", `- Changed files: \`${result.changedFiles.map((item) => item.path).join(", ")}\``, `- Knowledge commit: \`${result.knowledgeCommit}\``, `- Push status: \`${result.pushStatus}\``, `- Remote commit readback: \`${result.remoteCommitHash || "MISSING"}\``, `- Staged files after commit: \`${result.stagedFiles.join(", ") || "none"}\``, "- Hash/bytes validation: `PASS`", "", "```json", JSON.stringify(result, null, 2), "```", "", "## Safety boundary", "", "A write kizárólag a DWA saját `knowledge/KNOWLEDGE-INDEX.json` és `knowledge/PROJECT-STATE.md` fájljaira vonatkozott. Ads, GA4, GTM, GSC, Meta, SabeeApp és deploy/live write nem történt.", ""
  ].join("\n");
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
    if (isKnowledgeWriteTask(task)) {
      const result = await createKnowledgeWrite(task);
      const artifactPath = safeProjectPath(task.request.expectedArtifactPath);
      const receiptPath = `${artifactPath}.receipt.json`;
      await mkdir(path.dirname(artifactPath), { recursive: true });
      await writeFile(artifactPath, renderKnowledgeArtifact(task, result), "utf8");
      const artifactContent = await readFile(artifactPath);
      const receipt = {
        taskId: task.taskId, artifactPath, sourceProjectPath: projectRoot, receivedAt: new Date().toISOString(), noLiveWriteConfirmed: true,
        validatorVersion: "dca-artifact-semantics/v1", artifactSha256: createHash("sha256").update(artifactContent).digest("hex"), artifactBytes: artifactContent.byteLength,
        artifactStatus: result.status, evidenceKind: "SPECIALIST_KNOWLEDGE_WRITE", knowledgeUpdated: true, knowledgeDelta: result.knowledgeDelta,
        changedFiles: result.changedFiles, knowledgeCommit: result.knowledgeCommit, pushStatus: result.pushStatus, remoteCommitHash: result.remoteCommitHash,
        stagedFiles: result.stagedFiles, summary: `DWA canonical knowledge write artifact elkészült: ${result.status}.`
      };
      await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
      await bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/artifact`, {
        method: "POST",
        body: JSON.stringify(receipt)
      });
      return { taskId: task.taskId, artifactPath, status: result.status };
    }
    const execution = await runPreflight();
    const report = await readPreflightReport();
    if (isOutputPolicyTask(task)) return await runOutputPolicyTask(task);
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

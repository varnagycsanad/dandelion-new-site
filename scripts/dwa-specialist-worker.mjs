import { createHash } from "node:crypto";
import { exec, execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const specialist = "DWA";
const defaultBridgeBaseUrl = "http://127.0.0.1:4321";
const knowledgePaths = ["knowledge/KNOWLEDGE-INDEX.json", "knowledge/PROJECT-STATE.md"];
const maxRetryAttempts = 2;
const retryDelayMs = 500;
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

export function isKnowledgeWriteTask(task) {
  return task?.request?.targetSpecialist === specialist
    && task?.request?.allowedMode === "WRITE"
    && task?.request?.knowledgeUpdateRequired === true
    && task?.request?.knowledgeWriteCapabilityId === "specialist.knowledge.state_update"
    && Array.isArray(task.request.knowledgeWritePaths)
    && task.request.knowledgeWritePaths.length === knowledgePaths.length
    && task.request.knowledgeWritePaths.every((value, index) => value === knowledgePaths[index]);
}

export function isApprovedSourceWriteTask(task) {
  const capability = task?.request?.requestedCapabilityId || "";
  return task?.request?.targetSpecialist === specialist
    && task?.request?.allowedMode === "WRITE"
    && capability.startsWith("web.write.")
    && task?.request?.postReadRequired === true
    && typeof task?.request?.executionManifestPath === "string"
    && !isKnowledgeWriteTask(task);
}

export function isVisualQaTask(task) {
  return task?.request?.targetSpecialist === specialist
    && task?.request?.allowedMode === "READ_ONLY"
    && task?.request?.requestedCapabilityId === "visual.qa.website";
}

export function classifyCommandFailure(execution) {
  if ((execution?.exitCode ?? 1) === 0) return "SUCCESS";
  const text = `${execution?.stdout || ""}\n${execution?.stderr || ""}`;
  if (/(?:401|403|credential|permission|forbidden|unauthori[sz]ed|approval|invalid|missing|not found)/iu.test(text)) return "BLOCKED_INPUT_OR_PERMISSION";
  if (/(?:429|500|502|503|504|timeout|timed out|ETIMEDOUT|ECONNRESET|EAI_AGAIN|temporar|rate.?limit|quota)/iu.test(text)) return "TRANSIENT";
  return "FAILED";
}

export function recoveryForExecution(execution, attempts, mode) {
  const classification = classifyCommandFailure(execution);
  if (classification === "SUCCESS") return {
    attempts,
    diagnosis: attempts > 1 ? "Az első futás átmeneti hibával leállt; a korlátozott újrapróbálás sikeres lett." : "A futás első próbálkozásra sikeres lett.",
    repair: attempts > 1 ? "Rollback után egyetlen korlátozott újrapróbálás történt." : "Javítás nem volt szükséges.",
    nextAction: "A DCA a receipt és az artifact alapján folytathatja az elfogadást.",
    outcome: attempts > 1 ? "RETRY_COMPLETED" : "COMPLETED",
  };
  if (classification === "TRANSIENT") return {
    attempts,
    diagnosis: `${mode} futás átmeneti hibával zárult a korlátozott újrapróbálások után.`,
    repair: "A worker elvégezte a megengedett újrapróbálásokat; további automatikus próbálkozás nem indul.",
    nextAction: "Ellenőrizd a szolgáltatás elérhetőségét, majd célzottan indítsd újra a taskot.",
    outcome: "BLOCKED",
  };
  if (classification === "BLOCKED_INPUT_OR_PERMISSION") return {
    attempts,
    diagnosis: `${mode} futás jogosultsági, approval- vagy bemeneti kapun állt meg.`,
    repair: "A worker nem kerülte meg a tartósan blokkoló kaput és nem indított vak újrapróbálást.",
    nextAction: "A hiányzó jogosultságot, approvalt vagy pontos célbemenetet kell biztosítani.",
    outcome: "BLOCKED",
  };
  return {
    attempts,
    diagnosis: `${mode} futás nem besorolt hibával zárult.`,
    repair: "A worker nem hajtott végre kockázatos automatikus javítást.",
    nextAction: "A hiba kimenetét célzottan meg kell vizsgálni, majd javítás után újrafuttatni.",
    outcome: "FAILED",
  };
}

function recoveryForUnhandledError(error, mode) {
  const message = error instanceof Error ? error.message : String(error);
  const classification = classifyCommandFailure({ exitCode: 1, stderr: message });
  return {
    attempts: 1,
    diagnosis: classification === "BLOCKED_INPUT_OR_PERMISSION" ? `${mode} jogosultsági, approval- vagy bemeneti kapun állt meg.` : `${mode} váratlan hibával állt meg.`,
    repair: "A worker külön failure artifactot készített; vak újrapróbálás nem indult.",
    nextAction: classification === "BLOCKED_INPUT_OR_PERMISSION" ? "A hiányzó bemenetet vagy engedélyt kell pótolni, majd a task újraindítható." : "A hiba környezetét célzottan meg kell vizsgálni, majd a task újraindítható.",
    outcome: "BLOCKED",
  };
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function currentGitHead() {
  return (await runGit(["rev-parse", "HEAD"], true)).stdout.trim() || null;
}

async function currentKnowledgePushRef() {
  const configured = process.env.DWA_KNOWLEDGE_PUSH_REF?.trim();
  if (configured) return configured;
  const upstream = (await runGit(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"], true)).stdout.trim();
  if (upstream.startsWith("origin/")) return upstream.slice("origin/".length);
  const branch = (await runGit(["branch", "--show-current"], true)).stdout.trim();
  return branch || "main";
}

async function rollbackSourcePatch(patchPath) {
  const rollback = await runGit(["apply", "--reverse", "--whitespace=nowarn", patchPath], true);
  const remaining = (await runGit(["status", "--porcelain"], true)).stdout.trim();
  if (rollback.exitCode !== 0 || remaining) throw new Error(`A DWA source patch rollback nem igazolható: ${rollback.stderr || remaining || "ismeretlen hiba"}`);
}

async function runApprovedSourceWriteOnce(task) {
  const manifestPath = safeProjectPath(path.join(projectRoot, task.request.executionManifestPath));
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (manifest.schemaVersion !== "dca-source-write-manifest/v1" || manifest.approvalId !== task.request.approvalId) throw new Error("A DWA source-write manifest schema vagy approval egyezése hibás.");
  if (!Array.isArray(manifest.allowedPaths) || manifest.allowedPaths.length === 0 || typeof manifest.patchPath !== "string") throw new Error("A DWA source-write manifest patchPath/allowedPaths mezője hiányzik.");
  const patchPath = safeProjectPath(path.join(projectRoot, manifest.patchPath));
  const statusBefore = (await runGit(["status", "--porcelain"], true)).stdout.split(/\r?\n/u).filter(Boolean);
  if (statusBefore.length > 0) throw new Error(`A DWA source-write worker nem indulhat nem tiszta munkafával: ${statusBefore.join(", ")}`);
  await runGit(["apply", "--check", "--whitespace=nowarn", patchPath]);
  await runGit(["apply", "--whitespace=nowarn", patchPath]);
  const after = (await runGit(["diff", "--name-only"], true)).stdout.split(/\r?\n/u).filter(Boolean);
  const allowed = new Set(manifest.allowedPaths.map((value) => String(value).replaceAll("\\", "/")));
  const changedFiles = after.map((value) => value.replaceAll("\\", "/"));
  if (changedFiles.length === 0 || changedFiles.some((value) => !allowed.has(value) || value.startsWith("dist/") || value.includes(".env"))) throw new Error("A DWA patch módosított fájljai eltérnek a manifest allowlistjétől.");
  const build = await execAsync("npm run build", { cwd: projectRoot, windowsHide: true, maxBuffer: 40 * 1024 * 1024 });
  return { status: "DWA_SOURCE_WRITE_BUILT", changedFiles, buildStdout: build.stdout, buildStderr: build.stderr, rollbackVerified: true };
}

async function runApprovedSourceWrite(task) {
  const manifestPath = safeProjectPath(path.join(projectRoot, task.request.executionManifestPath));
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const patchPath = safeProjectPath(path.join(projectRoot, manifest.patchPath));
  const statusBefore = (await runGit(["status", "--porcelain"], true)).stdout.trim();
  if (statusBefore) return { status: "DWA_SOURCE_WRITE_BLOCKED", changedFiles: [], rollbackVerified: false, recovery: { attempts: 1, diagnosis: "A DWA source-write task nem tiszta munkafán indult.", repair: "A worker megőrizte a meglévő munkafa-változásokat és nem alkalmazta a patch-et.", nextAction: "A taskot tiszta, változatlan baseline-ról kell újrafuttatni.", outcome: "BLOCKED" } };
  let execution = null;
  let attempts = 0;
  do {
    attempts += 1;
    try {
      execution = await runApprovedSourceWriteOnce(task);
      return { ...execution, recovery: recoveryForExecution({ exitCode: 0 }, attempts, "DWA approved source write") };
    } catch (error) {
      execution = { exitCode: Number(error?.code || 1), stdout: error?.stdout || "", stderr: error instanceof Error ? error.message : String(error) };
      try {
        const status = (await runGit(["status", "--porcelain"], true)).stdout.trim();
        if (status) await rollbackSourcePatch(patchPath);
      } catch (rollbackError) {
        return { ...execution, status: "DWA_SOURCE_WRITE_BLOCKED", changedFiles: [], rollbackVerified: false, recovery: { ...recoveryForUnhandledError(rollbackError, "DWA approved source write"), attempts, diagnosis: "A source patch alkalmazása után a rollback nem volt igazolható.", nextAction: "A DWA munkafáját kézzel kell ellenőrizni; automatikus újrapróbálás nem indul." } };
      }
      if (classifyCommandFailure(execution) !== "TRANSIENT" || attempts >= maxRetryAttempts) break;
      await delay(retryDelayMs);
    }
  } while (attempts < maxRetryAttempts);
  return { ...execution, status: "DWA_SOURCE_WRITE_BLOCKED", changedFiles: [], rollbackVerified: true, recovery: recoveryForExecution(execution, attempts, "DWA approved source write") };
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

async function createKnowledgeWriteOnce(task) {
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
  const pushRef = await currentKnowledgePushRef();
  const push = await runGit(["push", "origin", `HEAD:refs/heads/${pushRef}`], true);
  if (push.exitCode === 0) await runGit(["fetch", "origin", pushRef], true);
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
    pushRef,
    knowledgeDelta: { knowledgeUpdated: true, changedTopics: index.requiredTopics, previousStateHash: null, newStateHash, newDecisions: ["DWA canonical state separates site source contracts from live release state."], newOpenChecks: index.openDcaDependencies, closedOpenChecks: [], canonicalSourceChanges: knowledgePaths }
  };
}

async function snapshotKnowledgeFiles() {
  return Promise.all(knowledgePaths.map(async (relativePath) => {
    const absolutePath = path.join(projectRoot, relativePath);
    try {
      return { relativePath, exists: true, content: await readFile(absolutePath) };
    } catch {
      return { relativePath, exists: false, content: null };
    }
  }));
}

async function restoreKnowledgeFiles(snapshot) {
  for (const item of snapshot) {
    const absolutePath = path.join(projectRoot, item.relativePath);
    if (item.exists) await writeFile(absolutePath, item.content);
  }
  await runGit(["restore", "--staged", "--", ...knowledgePaths], true);
  const status = (await runGit(["status", "--porcelain"], true)).stdout.trim();
  if (status) throw new Error(`A DWA knowledge rollback után maradt munkafa-változás: ${status}`);
}

async function createKnowledgeWrite(task) {
  const baselineHead = await currentGitHead();
  const snapshot = await snapshotKnowledgeFiles();
  let execution = null;
  let attempts = 0;
  do {
    attempts += 1;
    try {
      execution = await createKnowledgeWriteOnce(task);
      return { ...execution, recovery: recoveryForExecution({ exitCode: 0 }, attempts, "DWA knowledge-write") };
    } catch (error) {
      execution = { exitCode: Number(error?.code || 1), stdout: error?.stdout || "", stderr: error instanceof Error ? error.message : String(error) };
      const headAfterFailure = await currentGitHead();
      if (baselineHead && headAfterFailure && headAfterFailure !== baselineHead) {
        return { ...execution, status: "KNOWLEDGE_UPDATE_INCOMPLETE", changedFiles: [], knowledgeCommit: headAfterFailure, pushStatus: "BLOCKED", remoteCommitHash: null, stagedFiles: [], knowledgeDelta: { knowledgeUpdated: false, changedTopics: [], previousStateHash: null, newStateHash: null, newDecisions: [], newOpenChecks: ["A knowledge commit létrejött, de a push/closeout nem igazolt."], closedOpenChecks: [], canonicalSourceChanges: [] }, recovery: { ...recoveryForUnhandledError(error, "DWA knowledge-write"), attempts, diagnosis: "A knowledge commit létrejött, de a távoli push nem volt igazolható; automatikus rollback nem biztonságos.", nextAction: "A commit és a távoli ág állapotát célzottan kell ellenőrizni; új task csak ezután indítható." } };
      }
      try {
        await restoreKnowledgeFiles(snapshot);
      } catch (rollbackError) {
        return { ...execution, status: "KNOWLEDGE_UPDATE_INCOMPLETE", changedFiles: [], knowledgeCommit: null, pushStatus: "BLOCKED", remoteCommitHash: null, stagedFiles: [], knowledgeDelta: { knowledgeUpdated: false, changedTopics: [], previousStateHash: null, newStateHash: null, newDecisions: [], newOpenChecks: ["A knowledge rollback nem volt igazolható."], closedOpenChecks: [], canonicalSourceChanges: [] }, recovery: { ...recoveryForUnhandledError(rollbackError, "DWA knowledge-write"), attempts, diagnosis: "A knowledge-write hibával állt meg, és a saját knowledge fájlok visszaállítása nem sikerült.", nextAction: "A knowledge/KNOWLEDGE-INDEX.json és knowledge/PROJECT-STATE.md fájlokat kézzel kell összevetni a futás előtti állapottal." } };
      }
      if (classifyCommandFailure(execution) !== "TRANSIENT" || attempts >= maxRetryAttempts) break;
      await delay(retryDelayMs);
    }
  } while (attempts < maxRetryAttempts);
  return { ...execution, status: "KNOWLEDGE_UPDATE_INCOMPLETE", changedFiles: [], knowledgeCommit: null, pushStatus: "BLOCKED", remoteCommitHash: null, stagedFiles: [], knowledgeDelta: { knowledgeUpdated: false, changedTopics: [], previousStateHash: null, newStateHash: null, newDecisions: [], newOpenChecks: [], closedOpenChecks: [], canonicalSourceChanges: [] }, recovery: recoveryForExecution(execution, attempts, "DWA knowledge-write") };
}

function renderKnowledgeArtifact(task, result) {
  return [
    `# ${task.request.requestId} — DWA canonical knowledge write artifact`, "", `- Task ID: \`${task.taskId}\``, `- Státusz: **${result.status}**`, "- Mód: `WRITE`", "- Evidence kind: `SPECIALIST_KNOWLEDGE_WRITE`", "- Exact capability: `specialist.knowledge.state_update`", `- Forrásprojekt: \`${projectRoot}\``, "", "## Canonical knowledge result", "", `- Changed files: \`${result.changedFiles.map((item) => item.path).join(", ")}\``, `- Knowledge commit: \`${result.knowledgeCommit}\``, `- Push status: \`${result.pushStatus}\``, `- Remote commit readback: \`${result.remoteCommitHash || "MISSING"}\``, `- Staged files after commit: \`${result.stagedFiles.join(", ") || "none"}\``, "- Hash/bytes validation: `PASS`", "", "```json", JSON.stringify(result, null, 2), "```", "", "## Safety boundary", "", "A write kizárólag a DWA saját `knowledge/KNOWLEDGE-INDEX.json` és `knowledge/PROJECT-STATE.md` fájljaira vonatkozott. Ads, GA4, GTM, GSC, Meta, SabeeApp és deploy/live write nem történt.", ""
  ].join("\n");
}

function visualQaRoute(task) {
  if (typeof task?.request?.route === "string" && task.request.route.trim()) return task.request.route.trim();
  const prompt = String(task?.request?.taskPrompt || "");
  const url = prompt.match(/https?:\/\/[^\s)]+/iu)?.[0];
  if (url) {
    try { return new URL(url).pathname || "/"; } catch { /* use the route fallback below */ }
  }
  return prompt.match(/(?:route|útvonal)\s*[:=]\s*(\/[^\s)]+)/iu)?.[1] || "/";
}

function blockedVisualQaArtifact(task, reason) {
  const viewports = [
    { id: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
    { id: "mobile", width: 390, height: 844, deviceScaleFactor: 1 },
  ];
  const dimensions = ["visual-hierarchy", "typography", "color-contrast", "spacing", "imagery", "cta", "responsive-layout", "brand-consistency"];
  return {
    schemaVersion: "dca-visual-qa-artifact/v1",
    artifactType: "WEBSITE_VISUAL_QA",
    capabilityId: "visual.qa.website",
    specialistId: "dandelion-website-agent",
    projectId: "dandelion-web",
    route: visualQaRoute(task),
    assessedAt: new Date().toISOString(),
    status: "BLOCKED",
    viewports,
    screenshots: [],
    layoutIssues: [],
    accessibility: {
      status: "BLOCKED",
      findings: [{ findingId: "DWA-VQA-NO-RENDERER", severity: "P1", summary: reason, recommendation: "A DCA által biztosított screenshot-képes browser runtime vagy előállított visual QA input szükséges." }],
    },
    designSuggestions: [],
    designRubric: {
      schemaVersion: "dandelion-design-rubric/v1",
      source: "DANDELION_RULES.md",
      overallScore: 0,
      dimensions: dimensions.map((dimension) => ({ dimension, status: "BLOCKED", score: 0, summary: "Nem értékelhető screenshot-képes runtime nélkül.", ruleIds: ["DWA-VQA-NO-RENDERER"] })),
    },
    confidence: { level: "LOW", score: 0, basis: [reason, "A worker nem minősítette a screenshot nélküli futást PASS vagy WARNING állapotnak."] },
  };
}

async function runVisualQa(task) {
  const inputPath = task.request.visualQaInputPath || process.env.DWA_VISUAL_QA_INPUT_PATH?.trim();
  if (!inputPath) return { artifact: blockedVisualQaArtifact(task, "A DWA worker számára nincs screenshot-képes visual QA runtime vagy előállított input megadva."), recovery: { attempts: 1, diagnosis: "A visual.qa.website task elindult, de a DWA lokális runtime-ban nincs screenshot-bemenet.", repair: "A worker strukturált BLOCKED artifactot és pontos következő lépést adott; nem jelentett hamis vizuális sikert.", nextAction: "A taskot screenshot-képes runtime-mal vagy DWA_VISUAL_QA_INPUT_PATH inputtal kell újrafuttatni.", outcome: "BLOCKED" } };
  const resolvedInput = safeProjectPath(path.join(projectRoot, inputPath));
  const artifact = JSON.parse(await readFile(resolvedInput, "utf8"));
  if (artifact.schemaVersion !== "dca-visual-qa-artifact/v1" || artifact.artifactType !== "WEBSITE_VISUAL_QA") throw new Error("A DWA visual QA input schema-ja hibás.");
  return { artifact, recovery: { attempts: 1, diagnosis: "A DWA visual QA input strukturált artifactként rendelkezésre állt.", repair: "A worker az inputot a DCA szemantikai validációjához továbbította.", nextAction: "A DCA a screenshotokat, viewportokat és receiptet ellenőrizze.", outcome: "COMPLETED" } };
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

async function postArtifact(task, artifact, fields = {}) {
  const artifactPath = safeProjectPath(task.request.expectedArtifactPath);
  const receiptPath = `${artifactPath}.receipt.json`;
  await mkdir(path.dirname(artifactPath), { recursive: true });
  await writeFile(artifactPath, artifact, "utf8");
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
    ...fields,
  };
  await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  await bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/artifact`, { method: "POST", body: JSON.stringify(receipt) });
  return { taskId: task.taskId, artifactPath, status: receipt.artifactStatus };
}

async function postUnhandledFailureArtifact(task, error) {
  let artifactPath;
  try { artifactPath = safeProjectPath(task.request.expectedArtifactPath); } catch { return; }
  const visual = isVisualQaTask(task);
  const knowledge = isKnowledgeWriteTask(task);
  const sourceWrite = isApprovedSourceWriteTask(task);
  const artifactStatus = visual ? "VISUAL_QA_BLOCKED" : knowledge ? "KNOWLEDGE_UPDATE_INCOMPLETE" : sourceWrite ? "DWA_SOURCE_WRITE_BLOCKED" : "READ_ONLY_INCOMPLETE";
  const evidenceKind = visual ? "DWA_VISUAL_QA" : knowledge ? "SPECIALIST_KNOWLEDGE_WRITE" : sourceWrite ? "DWA_SOURCE_WRITE_BUILD" : "DWA_PREFLIGHT";
  const recovery = recoveryForUnhandledError(error, visual ? "DWA visual QA" : knowledge ? "DWA knowledge-write" : sourceWrite ? "DWA approved source write" : "DWA read-only task");
  const artifact = visual
    ? JSON.stringify(blockedVisualQaArtifact(task, error instanceof Error ? error.message : String(error)), null, 2) + "\n"
    : [`# ${task.request.requestId} — DWA failure artifact`, "", `- Task ID: \`${task.taskId}\``, `- Státusz: **${artifactStatus}**`, `- Evidence kind: \`${evidenceKind}\``, `- Forrásprojekt: \`${projectRoot}\``, "", "## Helyreállítási napló", "", "```json", JSON.stringify(recovery, null, 2), "```", "", "A worker a hibát külön artifactban rögzítette; vak újrapróbálás és külső live write nem történt.", ""].join("\n");
  const receipt = {
    taskId: task.taskId, artifactPath, sourceProjectPath: projectRoot, receivedAt: new Date().toISOString(), noLiveWriteConfirmed: true,
    ...(sourceWrite ? { liveWriteStatus: "BLOCKED", postReadVerified: false } : {}),
    validatorVersion: "dca-artifact-semantics/v1", artifactSha256: createHash("sha256").update(artifact).digest("hex"), artifactBytes: Buffer.byteLength(artifact),
    artifactStatus, evidenceKind, recovery, ...(knowledge ? { knowledgeUpdated: false } : {}),
    summary: `DWA task hibásan zárult; actionable recovery artifact készült: ${artifactStatus}.`,
  };
  try {
    await mkdir(path.dirname(artifactPath), { recursive: true });
    await writeFile(artifactPath, artifact, "utf8");
    await writeFile(`${artifactPath}.receipt.json`, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    await bridgeJson(`/specialist-tasks/${encodeURIComponent(task.taskId)}/artifact`, { method: "POST", body: JSON.stringify(receipt) });
  } catch { /* the original worker error remains authoritative */ }
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
      return await postArtifact(task, renderKnowledgeArtifact(task, result), {
        artifactStatus: result.status, evidenceKind: "SPECIALIST_KNOWLEDGE_WRITE", knowledgeUpdated: result.knowledgeDelta?.knowledgeUpdated === true, knowledgeDelta: result.knowledgeDelta,
        changedFiles: result.changedFiles, knowledgeCommit: result.knowledgeCommit, pushStatus: result.pushStatus, remoteCommitHash: result.remoteCommitHash, stagedFiles: result.stagedFiles, recovery: result.recovery,
        summary: `DWA canonical knowledge write artifact elkészült: ${result.status}.`
      });
    }
    if (isVisualQaTask(task)) {
      const execution = await runVisualQa(task);
      return await postArtifact(task, `${JSON.stringify(execution.artifact, null, 2)}\n`, {
        artifactStatus: execution.artifact.status === "BLOCKED" ? "VISUAL_QA_BLOCKED" : "VISUAL_QA_COMPLETED", evidenceKind: "DWA_VISUAL_QA", recovery: execution.recovery,
        summary: `DWA visual QA artifact elkészült: ${execution.artifact.status}.`
      });
    }
    if (isApprovedSourceWriteTask(task)) {
      const execution = await runApprovedSourceWrite(task);
      const knowledge = execution.status === "DWA_SOURCE_WRITE_BUILT" && task.request.gitCloseoutMode !== "DEFERRED"
        ? await createKnowledgeWrite(task)
        : null;
      const artifact = [`# ${task.request.requestId} — DWA source implementation artifact`, "", `- Task ID: \`${task.taskId}\``, `- Státusz: **${execution.status}**`, "- Mód: `WRITE`", "- Evidence kind: `DWA_SOURCE_WRITE_BUILD`", `- Exact capability: \`${task.request.requestedCapabilityId}\``, `- Approval ID: \`${task.request.approvalId}\``, `- Forrásprojekt: \`${projectRoot}\``, "", `- Changed source files: \`${execution.changedFiles?.join(", ") || "nincs"}\``, `- Build: \`${execution.status === "DWA_SOURCE_WRITE_BUILT" ? "PASS" : "BLOCKED"}\``, `- Post-read/rollback: \`${execution.rollbackVerified === false ? "NOT_VERIFIED" : "VERIFIED"}\``, "- Deploy/live write: nem történt", "", "## Helyreállítási napló", "", "```json", JSON.stringify(execution.recovery || knowledge?.recovery || {}, null, 2), "```", "", "## Kötelező knowledge delta", "", JSON.stringify(knowledge || { status: "not_started" }, null, 2), ""].join("\n");
      return await postArtifact(task, artifact, {
        liveWriteStatus: "NOT_EXECUTED", postReadVerified: execution.rollbackVerified !== false, artifactStatus: execution.status, evidenceKind: "DWA_SOURCE_WRITE_BUILD", recovery: execution.recovery || knowledge?.recovery,
        knowledgeUpdated: knowledge?.knowledgeDelta?.knowledgeUpdated === true, knowledgeDelta: knowledge?.knowledgeDelta, changedFiles: knowledge?.changedFiles || [], knowledgeCommit: knowledge?.knowledgeCommit, pushStatus: knowledge?.pushStatus, remoteCommitHash: knowledge?.remoteCommitHash, stagedFiles: knowledge?.stagedFiles || [],
        summary: `DWA jóváhagyott source write és build futása: ${execution.status}.`
      });
    }
    const execution = await runPreflightWithRecovery();
    const report = await readPreflightReport();
    return await postArtifact(task, renderArtifact(task, execution, report), {
      artifactStatus: report?.status || (execution.exitCode === 0 ? "BLOCKED_WORKER_EXECUTION" : "BLOCKED_WORKER_EXECUTION"),
      evidenceKind: "DWA_PREFLIGHT", recovery: execution.recovery,
      summary: `DWA read-only preflight artifact elkészült: ${report?.status || "BLOCKED_WORKER_EXECUTION"}.`
    });
  } catch (error) {
    await postUnhandledFailureArtifact(task, error);
    throw error;
  } finally {
    clearInterval(heartbeat);
  }
}

async function runPreflightWithRecovery() {
  let execution = null;
  let attempts = 0;
  do {
    attempts += 1;
    execution = await runPreflight();
    if (execution.exitCode === 0 || classifyCommandFailure(execution) !== "TRANSIENT" || attempts >= maxRetryAttempts) break;
    await delay(retryDelayMs);
  } while (attempts < maxRetryAttempts);
  return { ...execution, recovery: recoveryForExecution(execution, attempts, "DWA read-only preflight") };
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

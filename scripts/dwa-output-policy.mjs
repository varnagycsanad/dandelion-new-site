import os from "node:os";
import path from "node:path";

export const OUTPUT_POLICY_VERSION = "specialist-output-policy/v1";
export const CANONICAL_KNOWLEDGE_PATHS = ["knowledge/KNOWLEDGE-INDEX.json", "knowledge/PROJECT-STATE.md"];

export function resolveTaskOutputRoot(env = process.env) {
  return path.resolve(env.OUTPUT_ROOT?.trim() || env.REPORT_ROOT?.trim() || path.join(os.tmpdir(), "dandelion", "tasks"));
}

export function taskOutputDirectory(taskId, env = process.env) {
  if (!/^[-a-zA-Z0-9_.]+$/.test(taskId)) throw new Error("A task ID nem biztonságos output könyvtárnév.");
  return path.join(resolveTaskOutputRoot(env), taskId);
}

export function assertCanonicalPromotionPath(projectRoot, candidatePath, allowlistedPaths = CANONICAL_KNOWLEDGE_PATHS) {
  const relative = path.relative(path.resolve(projectRoot), path.resolve(candidatePath)).replaceAll("\\", "/");
  if (!allowlistedPaths.includes(relative)) throw new Error(`Nem allowlistelt canonical promotion: ${relative || "<root>"}.`);
}

export function validateProductChange(change, specialist = "DWA") {
  if (!change || !/^pc-[a-z0-9][a-z0-9-]{5,100}$/.test(change.changeId) || !/^[a-f0-9]{7,64}$/.test(change.sourceCommit)) throw new Error("Hibás product-change azonosító vagy source commit.");
  if (!Array.isArray(change.changedPaths) || !change.changedPaths.length || new Set(change.changedPaths).size !== change.changedPaths.length) throw new Error("A product-change changedPaths mezője hibás vagy duplikált.");
  if (!Array.isArray(change.affectedSpecialists) || !change.affectedSpecialists.includes(specialist)) throw new Error(`A product-change nem célozza a ${specialist} specialistát.`);
  if (change.decision !== "KNOWLEDGE_UPDATE_REQUIRED" || change.accepted !== true || !Array.isArray(change.evidenceIds) || !change.evidenceIds.length) throw new Error("A product-change nem elfogadott knowledge-update döntés.");
  return change;
}

export function assertNoUnpromotedRepoOutput(changedFiles, canonicalPaths = CANONICAL_KNOWLEDGE_PATHS) {
  const unexpected = changedFiles.map((value) => value.replaceAll("\\", "/")).filter((value) => !canonicalPaths.includes(value));
  if (unexpected.length) throw new Error(`Nem promótált repo output: ${unexpected.join(", ")}.`);
}

export function closeoutReady({ baselineClean, testsPassed, promotedFiles, stagedFiles, unexpectedRepoFiles, receiptPresent }) {
  return baselineClean && testsPassed && receiptPresent && promotedFiles.length > 0 && promotedFiles.every((file) => CANONICAL_KNOWLEDGE_PATHS.includes(file)) && stagedFiles.length === 0 && unexpectedRepoFiles.length === 0;
}

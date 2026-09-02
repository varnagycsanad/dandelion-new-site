import assert from "node:assert/strict";
import test from "node:test";
import { classifyCommandFailure, isApprovedSourceWriteTask, isKnowledgeWriteTask, isVisualQaTask, recoveryForExecution } from "./dwa-specialist-worker.mjs";

const base = {
  request: {
    targetSpecialist: "DWA",
    allowedMode: "WRITE",
    knowledgeUpdateRequired: true,
    knowledgeWriteCapabilityId: "specialist.knowledge.state_update",
    knowledgeWritePaths: ["knowledge/KNOWLEDGE-INDEX.json", "knowledge/PROJECT-STATE.md"]
  }
};

test("DWA knowledge-write worker accepts only the exact contract", () => {
  assert.equal(isKnowledgeWriteTask(base), true);
  assert.equal(isKnowledgeWriteTask({ request: { ...base.request, targetSpecialist: "DMA" } }), false);
  assert.equal(isKnowledgeWriteTask({ request: { ...base.request, allowedMode: "READ_ONLY" } }), false);
  assert.equal(isKnowledgeWriteTask({ request: { ...base.request, knowledgeWritePaths: ["README.md", "knowledge/PROJECT-STATE.md"] } }), false);
});

test("DWA approved source-write worker requires approval, manifest and post-read", () => {
  const approved = {
    request: {
      targetSpecialist: "DWA",
      allowedMode: "WRITE",
      requestedCapabilityId: "web.write.landing_page_source",
      approvalId: "APPROVAL-1234",
      approvalScopeHash: "a".repeat(64),
      approvalExpiresAt: "2026-08-30T00:00:00.000Z",
      executionManifestPath: "manifests/approved.json",
      postReadRequired: true
    }
  };
  assert.equal(isApprovedSourceWriteTask(approved), true);
  assert.equal(isApprovedSourceWriteTask({ request: { ...approved.request, postReadRequired: false } }), false);
  assert.equal(isApprovedSourceWriteTask({ request: { ...approved.request, requestedCapabilityId: "web.read.source" } }), false);
});

test("DWA classifies failures and bounds recovery decisions", () => {
  assert.equal(classifyCommandFailure({ exitCode: 0 }), "SUCCESS");
  assert.equal(classifyCommandFailure({ exitCode: 1, stderr: "ETIMEDOUT" }), "TRANSIENT");
  assert.equal(classifyCommandFailure({ exitCode: 1, stderr: "permission denied" }), "BLOCKED_INPUT_OR_PERMISSION");
  assert.equal(recoveryForExecution({ exitCode: 1, stderr: "build failed" }, 2, "DWA source write").outcome, "FAILED");
});

test("DWA routes visual QA separately from preflight", () => {
  const visual = { request: { targetSpecialist: "DWA", allowedMode: "READ_ONLY", requestedCapabilityId: "visual.qa.website" } };
  assert.equal(isVisualQaTask(visual), true);
  assert.equal(isVisualQaTask({ request: { ...visual.request, allowedMode: "WRITE" } }), false);
  assert.equal(isVisualQaTask({ request: { ...visual.request, requestedCapabilityId: "web.read.source" } }), false);
});

import assert from "node:assert/strict";
import test from "node:test";
import { isApprovedSourceWriteTask, isKnowledgeWriteTask } from "./dwa-specialist-worker.mjs";

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

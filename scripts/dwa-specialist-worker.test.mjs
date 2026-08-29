import assert from "node:assert/strict";
import test from "node:test";
import { isKnowledgeWriteTask } from "./dwa-specialist-worker.mjs";

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

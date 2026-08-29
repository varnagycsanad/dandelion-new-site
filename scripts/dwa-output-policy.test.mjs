import test from "node:test";
import assert from "node:assert/strict";
import { assertCanonicalPromotionPath, taskOutputDirectory, validateProductChange } from "./dwa-output-policy.mjs";

const change = { changeId: "pc-output-policy-20260829", sourceCommit: "9ab1ab666650f031981536616b5de2fef3ff1785", changedPaths: ["policy", "product-change"], affectedSpecialists: ["DWA"], summary: "controlled output policy", decision: "KNOWLEDGE_UPDATE_REQUIRED", evidenceIds: ["DCA-016", "DCA-017"], accepted: true };

test("DWA validates accepted product changes and task roots", () => {
  assert.equal(validateProductChange(change, "DWA").affectedSpecialists[0], "DWA");
  assert.match(taskOutputDirectory("dca-host-task-123", { OUTPUT_ROOT: "C:/temp/dandelion" }), /dca-host-task-123$/u);
});

test("DWA fails closed for duplicate changes and noncanonical paths", () => {
  assert.throws(() => validateProductChange({ ...change, changedPaths: ["policy", "policy"] }, "DWA"));
  assert.throws(() => assertCanonicalPromotionPath("C:/repo", "C:/repo/reports/run.md"));
});

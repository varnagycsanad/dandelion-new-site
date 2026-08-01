// [CHANGE 2026-07-25 22:45] Cover DWA preflight decision states with fixture-backed dry-run cases.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { evaluateDwaPreflight } from "./dwa-preflight-lib.mjs";

const fixturesDirectoryPath = path.join(
  process.cwd(),
  "scripts",
  "fixtures",
  "dwa-preflight"
);

const fixtureFileNames = [
  "ready-dwa-only.json",
  "blocked-dist.json",
  "hold-dsa-booking-cta.json",
  "hold-dma-campaign-measurement.json",
  "hold-build-missing.json",
  "blocked-build-fail.json",
  "blocked-secret-env.json"
];

for (const fixtureFileName of fixtureFileNames) {
  test(`DWA preflight fixture ${fixtureFileName}`, async () => {
    const fixtureText = await readFile(path.join(fixturesDirectoryPath, fixtureFileName), "utf8");
    const fixture = JSON.parse(fixtureText);
    const report = evaluateDwaPreflight(fixture.input);

    assert.equal(report.status, fixture.expected.status);
    assert.equal(report.build_required, fixture.expected.build_required);
    assert.equal(report.build_status, fixture.expected.build_status);
    assert.equal(report.dma_validation_required, fixture.expected.dma_validation_required);
    assert.equal(report.dsa_validation_required, fixture.expected.dsa_validation_required);

    for (const rule of fixture.expected.required_forbidden_rules ?? []) {
      assert.ok(
        report.forbidden_scope_findings.some((finding) => finding.rule === rule),
        `expected forbidden rule ${rule}`
      );
    }

    for (const warningSnippet of fixture.expected.required_warning_snippets ?? []) {
      assert.ok(
        report.warnings.some((warning) => warning.includes(warningSnippet)),
        `expected warning containing ${warningSnippet}`
      );
    }
  });
}

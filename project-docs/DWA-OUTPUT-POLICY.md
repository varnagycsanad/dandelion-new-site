# DWA output/worktree and product-change policy

Raw crawl/API data, logs, cache, snapshots and temporary audit output use an
external task-ID `OUTPUT_ROOT`/`REPORT_ROOT`. `reports/` is not a scratch
directory. Canonical evidence is promoted explicitly and idempotently.

An accepted product change is required before automatic product-knowledge
promotion. Its stable ID, source commit, changed paths, affected agents,
decision and evidence IDs are recorded. Canonical promotion is limited to
`knowledge/KNOWLEDGE-INDEX.json` and `knowledge/PROJECT-STATE.md`.

The worker requires exact staging, targeted tests, receipt, commit, push and
remote readback. Deploy, `dist` editing and external platform writes remain
outside this capability.

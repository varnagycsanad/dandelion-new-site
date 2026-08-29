# DWA specialist knowledge capability

- Owner: `DWA` / `dandelion-website-agent`
- Project: `dandelion-web`
- Exact write capability: `specialist.knowledge.state_update`
- Execution path: DCA host task bridge → DWA-local worker
- Mode: `WRITE`, only after DCA registry, target-project and receipt gates
- Exact writable paths: `knowledge/KNOWLEDGE-INDEX.json`, `knowledge/PROJECT-STATE.md`
- Read-only audit remains separate: `specialist.knowledge.health_audit` with `READ_ONLY` mode

The DWA worker validates canonical metadata, creates a non-empty project state,
checks hash/byte evidence, stages only the two allowlisted files and commits them
with `--only`. Ads, GA4, GTM, GSC, Meta, SabeeApp and deploy/live writes remain
outside this capability.
# System output capability

`specialist.system.output_policy` is a separate clean-worktree capability.
Raw output is external and canonical knowledge promotion is explicit and
allowlisted; deploy and remote platform writes remain forbidden.

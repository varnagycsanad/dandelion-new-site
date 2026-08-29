# DWA canonical project state

- Specialist: `dandelion-website-agent` / `DWA`
- Project: `dandelion-web`
- State reviewed: `2026-08-29T14:47:59.637Z`

## Canonical boundary

- A DWA canonical knowledge a webhely saját Astro forrás-, ownership- és preflight-szerződésének összefoglalója.
- A site source és az Ads, GA4, GTM, GSC, Meta, SabeeApp, illetve deploy/live állapot külön kezelendő.
- Ebben a knowledge-write folyamatban külső platform- vagy weboldal-élesítési write nem történt.

## Open checks

- Bármely deploy vagy publikálás külön DCA approvalt igényel.
- Booking truth és külső platform-admin kérdés DSA/DMA ownershipban marad.
- A preflight evidence nem helyettesíti a live deploy/readback bizonyítékot.

## Canonical source map

- `AGENT.md` — DOMAIN_SOURCE; SHA-256 `33e4f788ce502af1480e47387a883c45ce47b76ad82539f7b3c00bc935f220f0`.
- `README.md` — DOMAIN_SOURCE; SHA-256 `8e5f72753b378cc1053d301f3d8dbf36b164eeabdb7dc6677fd1617351056172`.
- `project-docs/DWA-003.2-specialist-capability-contract.md` — DOMAIN_SOURCE; SHA-256 `0602279f20d4b1c625e78bf4fcd062bc88f878475b176e7ece0f3a2243392280`.
- `project-docs/DWA-004-preflight-and-dca-evidence-handoff.md` — EVIDENCE; SHA-256 `491fb427122a56df71431b8a15cc820142f32e14c305da588512805ded6fff52`.
- `project-docs/DWA-OWNERSHIP-BOUNDARIES.md` — DOMAIN_SOURCE; SHA-256 `526ea2b1eef18d16a5266cab47596dfb079b822527ba4bd5d0fef4bfc772c1b1`.

## Next decision points

- A DCA által kért site-scope és specialist ownership legyen explicit.
- Release előtt külön build, deploy approval és publikus readback szükséges.

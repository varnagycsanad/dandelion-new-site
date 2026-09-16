# DWA canonical project state

- Specialist: `dandelion-website-agent` / `DWA`
- Project: `dandelion-web`
- State reviewed: `2026-09-16` (Lenovo manual development source; live deploy evidence unchanged)

## Canonical boundary

- A DWA canonical knowledge a webhely saját Astro forrás-, ownership- és preflight-szerződésének összefoglalója.
- A teljes kézi fejlesztési source of truth a Lenovo `dandelion-new-site` repositoryja: `src/`, `public/`, konfiguráció, build, SEO/QA, trackinghez tartozó fájlok és dokumentáció.
- A site source és az Ads, GA4, GTM, GSC, Meta, SabeeApp, illetve deploy/live állapot külön kezelendő.
- Ebben a knowledge-write folyamatban külső platform- vagy weboldal-élesítési write nem történt.

## Open checks

- Bármely deploy vagy publikálás külön DCA approvalt igényel.
- Booking truth és külső platform-admin kérdés DSA/DMA ownershipban marad.
- A preflight evidence nem helyettesíti a live deploy/readback bizonyítékot.

## Canonical source map

- `AGENT.md` — DOMAIN_SOURCE; SHA-256 `287efc54f4887d7adba635b062ecdaefe5de8aa7917e88a1969782c75a6c7b59`.
- `README.md` — DOMAIN_SOURCE; SHA-256 `ef4fdfcaea49c0b323c7993c1a7811211614a87a449699113b8d2fa01536f92d`.
- `project-docs/DWA-003.2-specialist-capability-contract.md` — DOMAIN_SOURCE; SHA-256 `a98dcf9b7cc2fb888578bad91830ff307872409bb0964acd5edf286559c98499`.
- `project-docs/DWA-004-preflight-and-dca-evidence-handoff.md` — EVIDENCE; SHA-256 `9ea8be6715bf9b6a4778d2f43a183f1b0ba9fa6a4b0458ff6afd61e16dc4d3c0`.
- `project-docs/DWA-OWNERSHIP-BOUNDARIES.md` — DOMAIN_SOURCE; SHA-256 `ef0d8adb80c6c339ce4c64a851e93d577bdfa47064dac6a82cc2db365d70532a`.

## Next decision points

- A DCA által kért site-scope és specialist ownership legyen explicit.
- Release előtt külön build, deploy approval és publikus readback szükséges.

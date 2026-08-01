# DWA-004 - Preflight and DCA evidence handoff

Statusz: AKTUALIS
Datum: 2026-07-25
Repo: `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`
Mod: implementacios / preflight-evidence / no-deploy

## Cel

Ez a dokumentum a DWA futtathato preflight es evidence handoff reteget rogizti ugy, hogy a DCA strukturalt, vedheto riportot kapjon a DWA repo-allapotrol anelkul, hogy a DWA uj landing page-et epítene vagy a DCA repo-t modositana.

## 1. Jelenlegi biztonsagos build es check lehetosegek

### Biztonsagosan hasznalhato parancsok

- `npm run dwa:preflight`
  - helyi repo-elemzes, JSON es Markdown riport generalas
- `node scripts/dwa-preflight-check.mjs --run-build`
  - preflight + helyi build evidence
- `node scripts/dwa-preflight-check.mjs --run-build --run-check`
  - preflight + build + root deploy check
- `npm run build`
  - teljes helyi Astro build, `dist/` ujrageneralassal
- `npm run check`
  - read-only root deploy ellenorzes a publikus URL-eken

### Mit csinal a build es a check

- A `build`:
  - torli a korabbi `dist/` outputot,
  - lefuttatja az Astro buildet,
  - visszamasolja a szukseges statikus fajlokat,
  - build receiptet ir a gitignore alatti `reports/dwa-preflight/build-receipt.json` fajlba.
- A `check`:
  - nem deployol,
  - nem ir Ads, Meta, GA4, GTM, GSC vagy SabeeApp rendszerekbe,
  - a publikus root route-okat, asseteket es nehany critical redirectet olvasva ellenoriz.

## 2. Mi szamit DWA source scope-nak

### DWA source scope

- `src/`
- `public/`
- `scripts/` azon resze, amely helyi build, preflight vagy site-oldali segedlogikat kezel
- `astro.config.mjs`
- `package.json`
- `.agents/skills/dandelion-website-agent/SKILL.md`
- `project-docs/`
- `AGENT.md`
- `DANDELION_RULES.md`
- `DANDELION_CHATGPT_RULES.md`

### Tiltott scope

- `dist/` es minden build output
- `.env`, `.env.local`, `.secrets/` es minden token / credential / private key path
- Ads, Meta, GA4, GTM, GSC remote admin vagy publish script/ownership
- SabeeApp business truth, pricing, availability, package, coupon, room mapping
- briefen tuli redesign, refaktor vagy release dontes

## 3. Mikor kell handoff

### DMA kell

- UTM vagy kampanymeres erintett
- landing oldali tracking contract vagy marketing ownership kerdes nyilik
- Ads, Meta, GTM, GA4 vagy GSC publish/admin igeny jelenik meg

### DSA kell

- booking CTA vagy Sabee link irany bizonytalan
- rate plan, coupon, package, availability vagy pricing allitas erintett
- a landing oldal booking truthot allitana

### Explicit DCA approval kell

- release-jelentos frontend vagy build-pipeline valtozasnal
- warningos vagy holdos preflight kimenetnel
- specialistak kozi ownership konfliktusnal
- kampanyhoz kotott, indexelheto vagy operatori tovabbengedesre varo valtozasnal

## 4. A negy preflight statusz jelentese

### `READY`

- a scope vedheto DWA-hatoskoru
- nincs tiltott terulet
- ha build kellett, a build evidence friss es `PASSED`
- nincs nyitott DMA/DSA blocker

### `READY_WITH_WARNINGS`

- a DWA site-oldali resze tovabbadhato
- maradt nem blokkoló warning vagy kezi review pont

### `HOLD_REVALIDATION_REQUIRED`

- tovabblepeshez build, check vagy DMA/DSA ujraellenorzes kell
- a DWA nem adhat meg vedheto vegso release-allitas

### `BLOCKED_NO_DEFENSIBLE_RELEASE`

- tiltott scope, `dist` edit, secret-erintes, remote platform write vagy build-fail all fenn
- a feladat jelen allapotban nem engedheto tovabb

## 5. Riport contract a DCA fele

### JSON riport

Helye:

- `reports/dwa-preflight/latest.json`

Kotelezo mezoi:

- `schema_version`
- `generated_at`
- `repo_path`
- `git_branch`
- `git_commit`
- `working_tree_status`
- `status`
- `affected_files`
- `affected_routes`
- `forbidden_scope_findings`
- `build_required`
- `build_command`
- `build_status`
- `dma_validation_required`
- `dsa_validation_required`
- `dca_approval_required`
- `handoff_notes`
- `operator_next_steps`

### Markdown riport

Helye:

- `reports/dwa-preflight/latest.md`

Celja:

- gyors emberi atadhatosag
- statusz, build/check allapot, tiltott findingok es kovetkezo operatori lepések rovid listazasa

### Evidence source type-ok

A handoff note-ok a kovetkezo DCA-kompatibilis source type-okat hasznaljak:

- `DWA_VERIFIED_REPO`
- `DWA_BUILD_VERIFIED`
- `DWA_DOCUMENTED_CONTRACT`
- `DWA_NEEDS_SPECIALIST_VERIFICATION`
- `DWA_BLOCKED_BY_SCOPE`

## 6. Mit nem csinalhat a DWA

- nem modosit `dist/` outputot kezzel
- nem nyit vagy mozgat secretet
- nem deployol
- nem vegez live Ads, Meta, GA4, GTM, GSC vagy SabeeApp muveletet
- nem allit booking truthot DSA nelkul
- nem ad marketing ownership dontest DMA nelkul
- nem ad vegso release approvalt DCA helyett

## 7. Teszteles es dry-run fixture-ek

A fixture-alapu decision tesztek helye:

- `scripts/dwa-preflight-check.test.mjs`
- `scripts/fixtures/dwa-preflight/*.json`

Lefedett minimum esetek:

- tiszta DWA-only landing scope
- `dist/` modositas -> `BLOCKED_NO_DEFENSIBLE_RELEASE`
- Sabee CTA -> `HOLD_REVALIDATION_REQUIRED` + DSA
- campaign landing meres / UTM -> `HOLD_REVALIDATION_REQUIRED` + DMA
- build hiany -> `HOLD_REVALIDATION_REQUIRED`
- build fail -> `BLOCKED_NO_DEFENSIBLE_RELEASE`
- secret / env erintes -> `BLOCKED_NO_DEFENSIBLE_RELEASE`

## 8. Operativ megjegyzes

- A runtime riportok gitignore alatt maradnak, nem commitolandok.
- A build receipt csak preflight evidence, nem release approval.
- A `READY` statusz sem jelent automatikus deploy vagy kampanyinditasi jovahagyast.

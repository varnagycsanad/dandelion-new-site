# Dandelion Project Docs Index

Status: AKTUALIS
Last checked: 2026-06-03
Use for: dokumentacio navigacio, source-of-truth gyors eligazodas, regi auditok ertelmezese

## Cel

Ez a fajl a `project-docs/` belepesi pontja.

A projektben sok Markdown dokumentum van, de nem mindegyik aktualis szabaly vagy napi munkaforras. Sok fajl torteneti audit, terv, export vagy munkalap. Ezek hasznosak, de nem szabad oket automatikusan aktualis repoallapotnak tekinteni.

## Statusz-leltar

2026-06-03-i ellenorzes szerint minden Markdown fajl kapott egységes statuszblokkot:

- Osszes MD fajl: 66
- Statusz nelkuli MD fajl: 0

Statusz szerinti bontas:

- `AKTUALIS`: 10
- `RESZBEN AKTUALIS`: 20
- `RESZBEN TELJESULT`: 9
- `TORTENETI`: 24
- `ARCHIV`: 3

## Statuszok jelentese

- `AKTUALIS`: napi munkaban hasznalhato, jelenleg elso korben megbizhato forras.
- `RESZBEN AKTUALIS`: meg hasznos, de csak friss repo/build ellenorzessel vagy ujabb audit mellett.
- `RESZBEN TELJESULT`: terv vagy audit, amelynek egy resze mar megvalosult; nem kezelheto teljes hianylistakent.
- `TORTENETI`: kontextusnak jo, de nem mai allapotforras.
- `ARCHIV`: export, regi munkalap vagy mar nem normativ forras; csak visszakeresesi celra.

## Napi source of truth

Ezeket kell elsokent nezni, ha honlapos vagy dokumentacios task indul:

1. `AGENT.md`
   - execution, scope, build, git, STOP szabalyok

2. `DANDELION_RULES.md`
   - design, layout, strukturak, kepkezeles, lakasoldali szabalyok

3. `DANDELION_CHATGPT_RULES.md`
   - ChatGPT/Codex munkamod, SEO draft es AI workflow

4. `project-docs/INDEX.md`
   - dokumentacios navigacio es aktualis prioritas

5. `project-docs/ACTIVE_BACKLOG.md`
   - egyetlen elo feladatlista; a regi auditok feladatai csak akkor aktivak, ha itt is szerepelnek

6. `project-docs/md-file-audit-2026-06-02.md`
   - legfrissebb MD audit, elavult doksik es frissitendo pontok

7. `project-docs/DANDELION_TRANSLATION_RULES.md`
   - forditasi, lokalizacios es nyelvi szabalyok

8. `project-docs/12-astro-only-kepkezelesi-javitasi-terv.md`
   - kepkezeles celarchitektura, de csak a 2026-06-02-es statuszfrissitessel egyutt olvasva

## Aktualis auditok es allapotfajlok

Ezek friss vagy meg hasznalhato allapotjelentesek, de mindig ellenorizni kell a datumot:

- `project-docs/md-file-audit-2026-06-02.md`
- `project-docs/ACTIVE_BACKLOG.md`
- `project-docs/archive-decision-list-2026-06-03.md`
- `project-docs/server-wp-audit-latest.md`
- `project-docs/wp-uploads-replacement-audit.md`
- `project-docs/translation-page-parity-audit-2026-05-25.md`
- `project-docs/current-sitemap-audit-2026-05-24.md`
- `project-docs/character-encoding-audit-and-rules-2026-05-25.md`
- `project-docs/archive/localization/german-umlaut-audit-2026-05-25.md`
- `project-docs/typography-size-audit-2026-05-18.md`

Fontos: ha egy audit elejen `Statuszfrissites` vagy `Status update` van, az felulirja a regebbi megallapitasokat.

## Alap / torteneti projekttervek

Ezek a projekt indulasi es strukturatervei. Hasznosak kontextusnak, de nem mind aktualis allapot:

- `project-docs/00-projekt-alap.md`
- `project-docs/01-oldalterkep.md`
- `project-docs/02-oldaltipusok-es-blokk-matrix.md`
- `project-docs/03-tartalommodell.md`
- `project-docs/04-navigacios-logika.md`
- `project-docs/05-seo-struktura.md`
- `project-docs/06-foglalasi-cta-logika.md`
- `project-docs/07-design-rendszer.md`
- `project-docs/08-ai-codex-workflow.md`
- `project-docs/09-repo-indulas.md`

Javasolt statusz: `TORTENETI` vagy `RESZBEN AKTUALIS`, egyedi ellenorzessel.

## Lokalizacio es nyelvi workflow

Elsodleges:

- `project-docs/DANDELION_TRANSLATION_RULES.md`
- `dandelion_tobbnyelvu_forditasi_workflow.md`

Torteneti / reszben teljesult:

- `project-docs/13-nemet-lokalizacios-megvalositasi-terv.md`
- `project-docs/14-cseh-lokalizacios-audit-es-menetterv.md`
- `project-docs/translation-page-parity-audit-2026-05-25.md`

Megjegyzes: a cseh kiindulo audit mar nem aktualis kiindulasi allapot, mert a cseh oldalak, jogi oldalak es `/cs/panorama-pool/` mar leteznek.

## Kepkezeles es image workflow

Elsodleges celirany:

- `project-docs/12-astro-only-kepkezelesi-javitasi-terv.md`
- `project-docs/10-astro-image-migracios-terv.md`

Script es workflow tervek:

- `project-docs/image-workflow/webp-processing-script-plan.md`
- `project-docs/image-workflow/file-based-image-pipeline-plan.md`
- `project-docs/image-workflow/cli-image-import-mvp-workflow.md`
- `project-docs/archive/image-workflow/source-image-rename-map.md`
- `project-docs/gallery-order-tool/README.md`

D2 es generalt munkalapok:

- `project-docs/archive/image-workflow/d2-image-pilot-closing-report.md`
- `project-docs/archive/image-workflow/d2-gallery-selection-review.md`
- `project-docs/archive/image-workflow/d2-runtime-image-admin-bridge-note.md`
- `project-docs/image-workflow/d2-image-seo-review.md`
- `project-docs/archive/image-workflow/generated/d2-processing-plan-selected.md`
- `project-docs/archive/image-workflow/generated/d2-processing-plan-all.md`

Megjegyzes: sok image workflow fajl export vagy terv. A `sharp` mar telepitve van, es a jelenlegi image scriptek a `package.json` alapjan ellenorzendok.

## Google AI Readiness

Projektkoveto es kapcsolodo munkalapok:

- `project-docs/GOOGLE_AI_READINESS.md`
- `project-docs/GOOGLE_AI_READINESS_EXECUTION_PLAN.md`
- `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md`
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_AUDIT.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_SOURCE_AUDIT.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_POSITIONING_MATRIX.md`
- `project-docs/GOOGLE_AI_READINESS_OWNER_INPUT.md`
- `project-docs/archive/google-ai-readiness/GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md`
- `project-docs/GOOGLE_AI_READINESS_IMPLEMENTATION_PACKAGE_1.md`

Ezeket csak Google AI Readiness tasknal kell elsodlegesen olvasni.

## Egyeb specialis doksik

- `project-docs/11-szallasok-oldal-audit-es-megvalositasi-terv.md`
- `project-docs/QR_GUIDE_SYSTEM.md`
- `project-docs/GA4_CODEX_ANALYTICS.md`
- `project-docs/GUIDE_FUGEHAZ_DEZSA_CONTENT.md`
- `project-docs/DANDELION_MASTER_RULES.md`
- `project-docs/archive/image-admin-v2-audit-2026-04-30.md`
- `project-docs/archive/image-alt/image-alt-seo-audit-2026-05-25.md`
- `project-docs/archive/image-alt/image-alt-seo-source-and-localization-audit-2026-05-25.md`
- `project-docs/archive/image-alt/image-alt-localization-review-de-cs-2026-05-25.md`
- `project-docs/archive/image-alt/image-alt-de-draft-batch-1-2026-05-25.md`
- `project-docs/archive/image-alt/image-alt-cs-draft-batch-1-2026-05-25.md`

## Olvasasi szabaly

Ha ket dokumentum ellentmond:

1. frissebb `Statuszfrissites` / `Status update`
2. frissebb audit
3. jelenlegi repoallapot
4. sikeres build output
5. regi tervdokumentum

ebben a sorrendben kell donteni.

## Javasolt kovetkezo lepes

Az elso rendrakasi kor kesz: minden MD fajl statuszolt, van kozponti index, es letrejott az elo feladatlista.

Kovetkezo biztonsagos lepes: a `project-docs/ACTIVE_BACKLOG.md` alapjan egyetlen P0 vagy P1 feladat kivalasztasa, majd annak friss repoellenorzessel es szuk keresztmetszetu implementacioval torteno lezárasa.

Archiválást csak akkor erdemes folytatni, ha mar nem zavarja az elo feladatok koveteset.

- fajlmozgatás elott hivatkozaskereses kell
- csak alacsony kockazatu export / torteneti image workflow fajlokkal szabad kezdeni
- mozgatás utan az `INDEX.md` es minden erintett hivatkozas frissitendo

Eddigi pilotok:

- Pilot 1: 4 D2 processing / image workflow dokumentum archive ala mozgatva.
- Pilot 2: 5 image workflow / image alt / image admin dokumentum archive ala mozgatva.
- Pilot 3: 5 image-alt / localization / Google AI draft dokumentum archive ala mozgatva.

Jelenlegi archive MD fajlok szama: 14.

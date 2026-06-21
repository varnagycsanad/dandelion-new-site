# MD File Audit - 2026-06-02

Status: AKTUALIS
Last checked: 2026-06-03
Use for: MD allapot, elavult dokumentumok es kovetkezo dokumentacios rendrakasi lepesek
Do not use for: frontend implementacios vagy design source-of-truth helyettesitesere

## Cel

Az audit celja annak ellenorzese volt, hogy a sokasodo Markdown dokumentacio egyezik-e a jelenlegi honlap-, build- es csomagallapottal.

Ellenorzott teruletek:

- Markdown dokumentumok: 66 db osszesen, ebbol 61 db a `project-docs/` alatt.
- Honlap forras: `src/`, `public/`, `scripts/`, WordPress plugin mappak.
- Telepitett programok/csomagok: `package.json`, `package-lock.json`, lokalis Node/npm, npm registry.
- Build: `npm run build`.

## Mai technikai allapot

- Build: sikeres.
- Buildelt Astro oldalak szama: 93.
- Buildelt `index.html` fajlok szama: 94.
- Lokalis `dist/sitemap.xml` URL-ek szama: 84.
- Astro optimalizalt kepkimenetek szama build kozben: 119.
- Lokalis Node: `v24.14.1`.
- Lokalis npm: `11.11.0`.

## Csomagallapot

`package.json`:

- `astro`: `^6.1.5`
- `sharp`: `^0.34.5`
- `lighthouse`: `^13.3.0`

`package-lock.json` szerint telepitett fo csomagverziok:

- `astro`: `6.1.5`
- `sharp`: `0.34.5`
- `lighthouse`: `13.3.0`

Npm registry ellenorzes 2026-06-02-en:

- `astro` aktualis npm verzio: `6.4.3`
- `sharp` aktualis npm verzio: `0.34.5`
- `lighthouse` aktualis npm verzio: `13.3.0`

Kovetkeztetes:

- `astro` frissitheto: `6.1.5` -> `6.4.3`.
- `sharp` es `lighthouse` jelenleg aktualis.
- MD frissites szempontbol fontos: azok a dokumentumok, amelyek szerint a `sharp` meg nincs telepitve, vagy a `package.json` csak `astro` csomagot tartalmaz, elavultak.

## Honlapallapot a doksikhoz kepest

### Lokalizacio

Mar nem aktualis az a korabbi allapot, hogy nincs cseh oldalstruktura.

Megvan:

- `src/pages/cs/`
- `src/data/accommodation-pages/*.cs.ts`
- cseh jogi oldalak
- `/cs/panorama-pool/`
- cseh sitemap es hreflang route-parok a `src/data/site-seo.ts` fajlban

Erintett elavult dokumentumok:

- `project-docs/14-cseh-lokalizacios-audit-es-menetterv.md`
- `project-docs/translation-page-parity-audit-2026-05-25.md`

### Keprendszer

Mar nem aktualis az a korabbi allitas, hogy nincs tenyleges `astro:assets` hasznalat a publikus oldalaknal.

Megvan:

- `astro:assets` hasznalat tobb publikus template-ben es oldalon
- `src/assets/accommodations/...`
- `src/assets/home/...`
- `src/data/images/astro-local-assets.ts`
- Astro build kozben 119 optimalizalt asset

Meg tovabbra is kevert / atmeneti allapot:

- `src/admin-disabled/...` alatt meg vannak WordPress eredetu forras- es adminadatok
- a regi audit/export dokumentumokban sok `/images/accommodations/...` es `wp-content/uploads` hivatkozas maradt
- az admin-disabled mappa archivalt/seged jellegu, de nem torolt

Erintett elavult vagy pontositando dokumentumok:

- `project-docs/10-astro-image-migracios-terv.md`
- `project-docs/12-astro-only-kepkezelesi-javitasi-terv.md`
- `project-docs/image-workflow/webp-processing-script-plan.md`
- `project-docs/archive/image-workflow/generated/*.md`
- `project-docs/image-workflow/d2-image-seo-review.md`

### Image workflow scriptek

Aktualis `package.json` image scriptek:

- `images:dry-run`
- `images:intake`
- `images:select`
- `images:process`
- `images:publish`

Nem aktualis parancs a regi tervben:

- `npm run images:plan -- --apartment=d2`

## Frissitendo MD fajlok prioritas szerint

### P0 - felrevezeto, azonnal jelolendo

1. `project-docs/14-cseh-lokalizacios-audit-es-menetterv.md`
   - A dokumentum kiindulo allapota elavult: ma mar van `src/pages/cs/`, van cseh adatfajl, van cseh sitemap/hreflang, es a build 93 oldalt epit.

2. `project-docs/translation-page-parity-audit-2026-05-25.md`
   - A cseh jogi oldalak es a cseh Panorama Pool oldal mar leteznek, tehat a legfontosabb hianylista reszben teljesult.

3. `project-docs/image-workflow/webp-processing-script-plan.md`
   - A `sharp` mar telepitve van.
   - A `package.json` mar nem csak `astro` dependencyt tartalmaz.
   - Az `images:plan` script nincs a jelenlegi `package.json`-ban.

4. `project-docs/10-astro-image-migracios-terv.md`
   - Mar van `astro:assets` hasznalat, es a build optimalizalt asseteket general.

### P1 - megtarthato, de statuszjeloles kell

1. `project-docs/12-astro-only-kepkezelesi-javitasi-terv.md`
   - Tovabbra is hasznos celarchitektura, de a jelenlegi allapot reszben mar megvalosult, reszben meg atmeneti.

2. `project-docs/current-sitemap-audit-2026-05-24.md`
   - A korabbi 42 URL-es sitemap allapot mar nem aktualis; a mai lokalis buildben 84 sitemap URL van.

3. `project-docs/09-repo-indulas.md`
   - Indulasi/torteneti dokumentumkent rendben van, de nem hasznalhato aktualis top-level struktura leirasakent.

### P2 - archiv / export jellegu, nem kell atirni

- `project-docs/image-workflow/generated/*.md`
- `project-docs/image-workflow/d2-image-seo-review.md`
- regi batch review es draft dokumentumok

Ezeket nem erdemes tartalmilag ujrairni, mert munkalap/export jelleguek. Ha zavarjak a napi munkat, kulon `project-docs/archive/` strukturaba mozgatas javasolt.

## Elvegzett MD frissites ebben a korben

Rovid statuszmegjegyzes kerult a kovetkezo fajlok elejere:

- `project-docs/14-cseh-lokalizacios-audit-es-menetterv.md`
- `project-docs/translation-page-parity-audit-2026-05-25.md`
- `project-docs/image-workflow/webp-processing-script-plan.md`
- `project-docs/10-astro-image-migracios-terv.md`
- `project-docs/12-astro-only-kepkezelesi-javitasi-terv.md`

## Kovetkezo javasolt takaritas

1. Kulon archiv mappa a generalt es torteneti auditoknak.
2. Egyetlen aktualis `project-docs/current-project-state.md` fenntartasa.
3. A regi tervfajlok elejen kotelezo statusz:
   - `AKTUALIS`
   - `RESZBEN TELJESULT`
   - `TORTENETI`
   - `ARCHIV`
4. Csomagfrissites kulon taskban:
   - `astro` frissites `6.1.5` -> `6.4.3`
   - `npm run build`
   - vizualis ellenorzes

## 2026-06-03 frissites

- Letrejott a kozponti dokumentacios belepesi pont: `project-docs/INDEX.md`.
- Letrejott az elo feladatlista: `project-docs/ELO_FELADATLISTA.md`.
- Letrejott az archiválási dontesi lista: `project-docs/archive-decision-list-2026-06-03.md`.
- Minden MD fajl kapott egységes `Status`, `Last checked`, `Use for`, `Do not use for` blokkot.
- Aktualis MD darabszam: 66.
- Statusz nelkuli MD fajl: 0.
- Elso archiválási pilot lefutott 4 image-workflow fajllal:
  - `project-docs/archive/image-workflow/generated/d2-processing-plan-selected.md`
  - `project-docs/archive/image-workflow/generated/d2-processing-plan-all.md`
  - `project-docs/archive/image-workflow/source-image-rename-map.md`
  - `project-docs/archive/image-workflow/d2-runtime-image-admin-bridge-note.md`
- Masodik archiválási pilot lefutott 5 legacy image dokumentummal:
  - `project-docs/archive/image-workflow/d2-gallery-selection-review.md`
  - `project-docs/archive/image-workflow/d2-image-pilot-closing-report.md`
  - `project-docs/archive/image-admin-v2-audit-2026-04-30.md`
  - `project-docs/archive/image-alt/image-alt-cs-draft-batch-1-2026-05-25.md`
  - `project-docs/archive/image-alt/image-alt-de-draft-batch-1-2026-05-25.md`
- Harmadik archiválási pilot lefutott 5 image-alt / lokalizacios / Google AI draft dokumentummal:
  - `project-docs/archive/image-alt/image-alt-seo-audit-2026-05-25.md`
  - `project-docs/archive/image-alt/image-alt-seo-source-and-localization-audit-2026-05-25.md`
  - `project-docs/archive/image-alt/image-alt-localization-review-de-cs-2026-05-25.md`
  - `project-docs/archive/localization/german-umlaut-audit-2026-05-25.md`
  - `project-docs/archive/google-ai-readiness/GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md`
- Szallasok regio-struktura task archiválva:
  - `project-docs/archive/accommodations/11-szallasok-oldal-audit-es-megvalositasi-terv.md`
- Jelenlegi archive MD fajlok szama: 15.

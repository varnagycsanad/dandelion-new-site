# DWA-MASTER-001 - dandelion-new-site átalakítása Website Agentté

Statusz: terv
Dátum: 2026-07-25
Repo: `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`

## Cél

A `dandelion-new-site` projektből olyan Dandelion Website Agent (DWA) legyen, amely a működő Astro honlapot biztonságosan tudja fejleszteni, landing page-eket tud előállítani, és a DCA kontrollja alatt együtt tud működni a DMA marketing ügynökkel és a DSA SabeeApp ügynökkel.

Fontos alapelv: a honlap nem omolhat össze. Ezért a DWA átalakítása nem új projektmásolatot, nem új deploy-forrást és nem nagy fájlmozgatást jelent, hanem a jelenlegi honlap repo szerepeinek, határainak és safety gate-jeinek tisztázását.

## Kiinduló állapot

- A jelenlegi source of truth továbbra is ez a mappa: `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`.
- A publikus honlap forrása az Astro projekt: `src/`, `public/`, `data/`, komponensek, oldalak, konfiguráció és dokumentáció.
- A `dist/` csak build output, nem szerkesztési forrás.
- A jelenlegi deploy-modellt nem szabad DWA átalakítási feladatban átírni.
- A marketing és mérési eszközök történetileg részben ebben a repo-ban vannak, mert a honlap korábban önállóan vitte a Google Ads, GA4, GTM és Meta integrációs feladatok egy részét.

## DWA felelősségi köre

A DWA a honlap specialistája. Ide tartozik:

- Astro oldalak, template-ek és komponensek fejlesztése.
- Landing page-ek létrehozása DMA vagy DCA brief alapján.
- Szállásoldalak, kampányoldalak, tartalmi oldalak és CTA blokkok honlap oldali megvalósítása.
- Webes képworkflow: `src/assets`, image registry, WebP, alt/title/caption draftok, galéria szerepek.
- Site-side SEO/GEO struktúra: schema, canonical, sitemap, internal linking, lokalizált tartalom, oldalstruktúra.
- Site-side tracking contract: milyen eseményeket bocsát ki a honlap, milyen CTA-k és UTM-ek vannak.
- Build és deploy előtti honlap preflight: `npm run build`, szükség szerint `npm run check`.

A DWA nem végezhet önálló marketing platform műveletet. Nem indít kampányt, nem állít költségkeretet, nem publikál Meta hirdetést, és nem módosít Ads/Meta/GTM remote állapotot külön DMA/DCA kontroll nélkül.

## DMA felelősségi köre

A DMA legyen a marketing platform specialistája. Ide tartozik:

- Google Ads kampányok, hirdetéscsoportok, kulcsszavak, költségkeretek és riportok.
- Meta Ads kampányok, ad setek, adok, kreatívok, státuszok és budget műveletek.
- Meta Page posztolás és Meta platform jogosultságok kezelése.
- GA4/GTM/GSC platform oldali ellenőrzések, ha remote admin vagy publish műveletet igényelnek.
- Marketing approval gate-ek, validate-only futások, drift checkek, post-read ellenőrzések.
- Kampánybrief készítése DWA számára: célcsoport, ajánlat, üzenet, CTA, landing követelmények, UTM, tracking elvárás.

## DCA felelősségi köre

A DCA nem váltja ki a DWA-t vagy DMA-t, hanem kontrollálja őket:

- A user üzleti célját run intake formájában fogadja.
- Eldönti, DSA, DMA, DWA vagy több ügynök kell-e.
- Preflight után dönti el, hogy a specialisták készek-e.
- Konfliktus esetén nem erőltet fő ajánlást.
- Approval-gated vagy live write műveletnél emberi jóváhagyást kér.
- A végső executive outputban magyarul, érthetően adja vissza a döntést, kockázatot és következő lépést.

## Marketing elemek kivezetési terve

### 1. lépés - inventory és ownership map

Először csak olvasási/inventory feladat fusson:

- `package.json` marketing scriptek listázása.
- `scripts/remote-platform/meta/**` és Meta dokumentumok feltárása.
- Google Ads, GA4, GTM, GSC és GEO scriptek külön csoportosítása.
- Annak jelölése, hogy melyik elem DWA, DMA vagy shared ownership.
- Titkok és `.env` változók mozgatása nélkül csak névszintű dependency map készüljön.

Kimenet: `project-docs/DWA-001.1-capability-inventory-and-extraction-map.md`.

### 2. lépés - Meta ownership átadás DMA-ba

Elsődleges jelölt a Meta vonal:

- `scripts/remote-platform/meta/**`
- `package.json` `meta:*` parancsok
- `project-docs/META_ADS_CODEX_INTEGRATION.md`
- `project-docs/META_PAGE_POSTING_CODEX_INTEGRATION.md`
- Meta env változók dokumentált ownershipje

Ezt nem szabad sima törléssel kezdeni. Előbb DMA oldalon legyen fogadó struktúra, tesztelt parancs, read-only smoke check és dokumentált rollback terv.

### 3. lépés - Google Ads ownership átadás DMA-ba

Második jelölt a Google Ads vonal:

- `scripts/remote-platform/google/google-ads-report.mjs`
- `scripts/remote-platform/google/google-ads-keyword-workbench.mjs`
- `package.json` `ads:*` parancsok
- `project-docs/GOOGLE_ADS_CODEX_INTEGRATION.md`
- `project-docs/GOOGLE_STACK_DAILY_OPERATIONS.md` Ads-részei

Itt külön figyelni kell, mert a honlap tracking és landing oldal kapcsolódhat a kampányokhoz. A DWA-nál maradjon a landing oldal és site event contract, a DMA-hoz menjen a kampány és platform művelet.

### 4. lépés - GA4/GTM/GSC/GEO határ meghúzása

Ez a legkényesebb rész, ezért nem az első migrációs lépés:

- A honlap oldali event kibocsátás, CTA azonosító, schema és SEO/GEO tartalom DWA.
- A GA4/GTM remote admin, tag publish, container státusz és platform riport DMA vagy shared DMA/DCA.
- A Google Search Console és AI-readiness/GEO auditok lehetnek shared terület, de explicit ownership kell.

## DWA landing page workflow

Javasolt végrehajtási lánc:

1. DCA fogadja az üzleti célt.
2. DMA készít marketing briefet: csatorna, célközönség, ajánlat, üzenet, UTM, pixel/measurement elvárás.
3. DSA ellenőrzi, hogy a foglalási vagy SabeeApp követelmény védhető-e.
4. DWA létrehozza vagy módosítja a landing page-et a honlap repo-ban.
5. DWA lefuttatja a honlap preflightot: build, routing, CTA, tracking contract.
6. DCA összeveti a specialist outputokat és csak akkor engedi tovább, ha nincs hard stop.

## Safety gate-ek

DWA feladat előtt kötelező:

- `git status --short`
- `AGENT.md` és `DANDELION_RULES.md` figyelembe vétele
- scope ellenőrzés: frontend, dokumentáció, image workflow vagy tracking contract?
- nincs `dist/` szerkesztés
- nincs live Ads, Meta, GA4, GTM vagy GSC write művelet DWA taskban

Publikus frontend változásnál kötelező:

- `npm run build`
- ha deploy/check érintett: `npm run check`
- csak célzott fájl stage-elése
- nincs `git add .`

Marketing kivezetési feladatnál kötelező:

- előbb DMA fogadó oldal
- read-only smoke check
- rollback terv
- env/secret mozgatása csak külön jóváhagyással
- honlap build változatlan maradjon

## Mit nem szabad most törölni vagy mozgatni

Az első körben nem szabad mozgatni:

- `src/`
- `public/`
- `data/`
- `astro.config.mjs`
- `package-lock.json`
- `scripts/clean-build-output.mjs`
- `scripts/postbuild-copy-static-files.mjs`
- image workflow scriptek
- `.env`, `.env.local`, `.secrets/`
- `dist/`

A marketing scripteket sem szabad azonnal törölni. Előbb legyen DMA oldali működő megfelelőjük.

## A külön DWA projekt sorsa

Ha a külön létrehozott `DND Honlap Agent DWA` Codex projektben még nem történt érdemi munka, nem keletkezett önálló kód, dokumentum vagy task history, akkor törölhető.

A DWA valódi munkaterülete ne új mappa legyen, hanem a már működő honlap repo:

`C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`

Ez azért biztonságosabb, mert innen megy a jelenlegi honlapfejlesztés és build/deploy folyamat. Egy új másolat könnyen elválna az éles forrástól, és később összekeveredne, melyik az igaz forrás.

## Javasolt következő feladat

`DWA-001.1 - Capability inventory és marketing extraction map`

Feladat:

- Ne mozgass fájlt.
- Ne törölj semmit.
- Ne módosítsd a honlap működését.
- Térképezd fel, mely jelenlegi scriptek, docsok és package parancsok tartoznak DWA, DMA vagy shared ownership alá.
- Külön jelöld a Meta, Google Ads, GA4, GTM, GSC, GEO, newsletter, image workflow és landing page elemeket.
- Adj minimális, sorrendezett migrációs tervet a marketing elemek DMA-ba viteléhez.

Elfogadási feltétel:

- A honlap repo tiszta vagy csak a tervdokumentum változott.
- Nincs build/deploy kockázat.
- Nincs secret mozgatva.
- Nincs live platform művelet.
- A következő tényleges migrációs lépés pontosan kiadható Codexnek.

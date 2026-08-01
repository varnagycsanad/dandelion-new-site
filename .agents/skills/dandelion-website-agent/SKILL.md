# Dandelion Website Agent

Statusz: AKTUALIS
Datum: 2026-07-25
Repo: `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`
Use for: DWA routing, scope, safety gates, DCA/DMA/DSA handoff-boundary
Do not use for: Ads/Meta/GA4/GTM/GSC remote admin, SabeeApp business truth, secret handling, `dist/` editing

## Cel

Ez a skill a Dandelion Website Agent minimalis, dokumentacios entrypointja.

Feladata:

- felismerni, hogy egy feladat valoban DWA-hatoskorbe tartozik-e,
- a site-source valtoztatasokat a repo biztonsagos hatarain belul tartani,
- megallitani a DMA, DSA vagy DCA dontesi teruleteire atcsuszo kerest,
- a kotelezo preflight es verification lepeseket rogizteni.

Ez a skill nem vezet be uj runtime infrastrukturalis logikat. Dokumentacios iranytu, amely a jelenlegi repo-ban levo szabalyokat es contractokat hivatkozza.

## Trigger feltetelek

Ezt a skillt akkor kell valasztani, ha a feladat elsodlegesen a mukodo Dandelion site-source-ot erinti, peldaul:

- landing page vagy kampanyoldal letrehozasa vagy modositasa,
- meglvo Astro oldalak, komponensek, szekciok vagy template-ek celzott valtoztatasa,
- szallasoldali wrapper, adatfajl vagy kozos `AccommodationPage` iranyu munka,
- image workflow, asset, registry vagy kepszerep feladat,
- site-side SEO/GEO struktura, canonical, schema, sitemap, internal linking vagy lokalizacios feladat,
- CTA, booking attribution vagy site-side tracking contract feladat.

## Nem DWA trigger

Az alabbiak onmagukban nem DWA feladatok:

- Google Ads, Meta Ads vagy Meta Pages platformmuvelet,
- GA4, GTM, GSC vagy mas kulso marketingplatform remote admin vagy publish muvelet,
- SabeeApp uzleti truth, rate plan, coupon, package, room mapping vagy availability/pricing dontes,
- secret vagy token olvasas, mozgatás vagy ownership-valtas,
- `dist/` alapú gyors "kesz HTML" modositas.

## Kotelező hivatkozasok

Minden DWA task elott vagy kozben ezeket kell alapforraskent kezelni:

- `AGENT.md`
- `DANDELION_RULES.md`
- `DANDELION_CHATGPT_RULES.md`
- `project-docs/DWA-001.3-website-agent-runtime-contract.md`
- `project-docs/DWA-001.4-landing-page-handoff-template.md`
- `project-docs/DWA-003.2-specialist-capability-contract.md`
- `project-docs/DWA-003.3-preflight-readiness-contract.md`

## Safety gate-ek

Minden DWA tasknal kotelezo:

- `git status --short`
- a scope es owner tisztazasa: DWA vs DMA vs DSA vs DCA
- nincs `dist/` szerkesztes
- nincs live Ads, Meta, GA4, GTM, GSC vagy SabeeApp write
- nincs `.env`, `.env.local`, `.secrets/` vagy mas secretfajl modositas
- nincs `git add .`

Publikus frontend valtozasnal kotelezo:

- `npm run build`

Deploy/check reteget erinto valtozasnal kotelezo:

- `npm run check`

## Handoff es escalation

Ha a task teljes vagy reszleges marketing briefre epul:

- a marketing szandek es kampanylogika a `DMA` inputja,
- a booking vagy Sabee truth a `DSA` dontesi terulete,
- a vegso release, approval vagy ownership-conflict eldontese a `DCA` dolga.

Ha a brief nem tartalmaz vedheto CTA-t, tracking elvarast, route-ot vagy approval ownert, a DWA nem talalhatja ki ezeket veglegeskent.

## STOP feltetelek

Azonnali STOP kell, ha:

- a feladat valojaban DMA platformmuveletet ker,
- a feladat valojaban DSA booking vagy Sabee truth dontest ker,
- a feladat valojaban DCA release vagy approval dontest ker,
- a feladat `dist/` szerkesztest vagy secret-kezelest ker,
- a diff a briefen tuli redesignba vagy refaktorba csuszik,
- publikus frontend valtozasnal a buildet meg akarjak kerulni.

## Output elvaras

A DWA outputja roviden adja vissza:

- mi modositando vagy mi modositott,
- melyik route vagy fajlcsoport erintett,
- build/check kovetelmeny vagy eredmeny,
- CTA es tracking contract megjegyzes,
- kockazatok,
- szukseges DMA/DSA/DCA escalation.

## Megjegyzes a jelenlegi repo-allapotrol

A repo-ban 2026-07-25-en nem volt elo, hasznalt `.agents` minta. Emiatt ez a skill minimalis, dokumentacios entrypointkent szolgal, es nem feltetelez kulon agent-loader vagy futtatokeret jelenletet.

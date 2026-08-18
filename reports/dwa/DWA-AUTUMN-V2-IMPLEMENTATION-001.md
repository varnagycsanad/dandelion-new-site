# DWA-AUTUMN-V2-IMPLEMENTATION-001

Statusz: ELKÉSZÜLT – DCA-elfogadásra váró, külön V2 előnézet
Dátum: 2026-08-01
Projekt: `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`
Branch: `codex/autumn-v2-development`

## Eredmény

Az őszi páros és őszi családi ajánlathoz elkészült egy új, elkülönített V2 sablon és V2 preview route-réteg. A meglévő aktuális/V1 route-surface nem állt át automatikusan az új sablonra.

A jóváhagyott Panoráma videó most csak e két V2 hero-ban jelenik meg. A forrásból két optimalizált, lokális MP4 készült: desktop 1920×1080, mobil valódi 9:16 crop 720×1280; hangcsatorna nincs. A poster és mobil fallback szintén lokális, `src/assets` alatti WebP.

Preview route-ok:

- `/ajanlatok-v2/oszi-kettesben/`
- `/ajanlatok-v2/oszi-csaladi-pihenes/`

Mindkét preview `noindex` állapotú, és csak későbbi DCA-elfogadás után váltható be a jelenlegi route-ok helyére.

## Módosított fájlok

- `src/templates/AutumnCampaignOfferPageV2Approved.astro` – új referencia-alapú V2 landing sablon.
- `src/components/campaign/AutumnCampaignV2Icon.astro` – új, elkülönített V2 élmény/program ikonkomponens.
- `src/components/campaign/CampaignHeroVideo.astro` – V2-only, muted/autoplay/loop/inline hero video renderer poster/fallback kezeléssel.
- `src/pages/ajanlatok-v2/[slug].astro` – külön preview route a két őszi offer adatra.
- `src/data/offers/autumn-2026.ts` – V2-only offer override; a V1 export változatlan maradt.
- `src/data/offers/types.ts` – a hero video és poster/fallback típusai.
- `src/data/videos/autumn-campaign.ts` – lokális Panoráma video registry.
- `src/assets/campaign/autumn-2026/panorama-hero-desktop.mp4` – 1920×1080, 1 847 777 B, SHA-256 `CB267E33963BE4BA84A4B2BE15CEA7A3C2ACAF0C8D65536F260BEA2535DD8282`.
- `src/assets/campaign/autumn-2026/panorama-hero-mobile.mp4` – 720×1280, 619 488 B, 9:16 crop, SHA-256 `AE008D42E60075CFCE7862EE449DDDE1E37B42751105CA1AA247E3F1CE840B8C`.
- `src/assets/campaign/autumn-2026/panorama-hero-poster.webp` – 1920×1080, 139 120 B, SHA-256 `97E6714EC9064384A878E3A23D4C291EC05FC1B68DDE8E1DBAFB900F00277A3C`.
- `src/assets/campaign/autumn-2026/panorama-hero-poster-mobile.webp` – 720×1280, 53 334 B, mobile fallback, SHA-256 `53044FEA772AF14FC10EC3B5DEFFDAEF1E904181365DA2D6A0E5CF548CDAC2A8`.
- `reports/dwa/DWA-AUTUMN-V2-IMPLEMENTATION-001.md` – ez a handoff artifact.

Érintetlen maradt a meglévő kampánysablon és route:

- `src/templates/AutumnCampaignOfferPageV2.astro`
- `src/pages/ajanlatok/[slug].astro`

## Megőrzött V1 és Matiné állapot

- A jelenlegi `/ajanlatok/oszi-kettesben/` és `/ajanlatok/oszi-csaladi-pihenes/` route-okhoz nem történt átállítás vagy törlés.
- A meglévő V1/current kampányforrás visszaállítási lehetőségként megmaradt.
- A Matiné oldalhoz nem nyúltam: `src/pages/szent-gyorgy-hegy-matine-szallas.astro` változatlan.
- A Matiné buildelt route-ja továbbra is elkészült: `/szent-gyorgy-hegy-matine-szallas/`.
- D1 nem került be az őszi offer scope-ba.

## Kötelező referencia és képi összevetés

Elsődleges és kizárólagos vizuális referencia:

`C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site\docs\references\autumn-campaign-approved.png`

Ellenőrzött helyi fájl:

- Méret: `1024 × 1536 px`
- SHA-256: `1E5EBA5E919BFAD6869639FCA93A1875E4AEDFD18A3FB847995A5F7AE0FA88B6`

A desktop és mobil előnézetet a referencia ritmusához vetettem össze:

| Referenciaelem | V2 megvalósítás | QA-eredmény |
|---|---|---|
| Teljes szélességű, sötétített hero és átlátszó fejléc | Hero média + transparent BaseLayout header | Megfelel |
| Balra zárt Playfair display headline és arany CTA | Hero H1, arany CTA, közvetlen foglalási proof sor | Megfelel |
| Hat elemes élménysáv | Hat offer feature, desktopon 6 oszlopban | Megfelel |
| Két képes blokk + teljes szélességű kiemelt blokk | Két story tile + egy wide story tile | Megfelel |
| Négy környékprogram-kártya | Négy adatvezérelt programkártya | Megfelel |
| Sötét közvetlenfoglalási záróblokk, 5% kiemeléssel | Kiemelt kedvezmény, előnylista, booking/contact/WhatsApp CTA | Megfelel |
| Mobilon magas hero és egymás alá rendezett képi ritmus | 390 px ellenőrzés, 2 oszlopos feature/program grid, egyoszlopos story | Megfelel; vízszintes túlcsordulás nincs |

A referencia PNG képeit nem másoltam be frontend médiaként. A V2 megtartotta a referencia teljes szélességű, sötétített hero-struktúráját, Playfair headline/CTA ritmusát, feature/story/program/direct-booking sorrendjét és copyját; a hero vizuális tartalma kizárólag a megadott Panoráma MP4-ből készült lokális variáns.

## Desktop/mobile QA

Helyi preview ellenőrzés:

- Desktop: default `1281 × 900` viewport, mindkét route; hero height `700px`, video `1920 × 1080`, `readyState=4`, `paused=false`.
- Mobil: explicit `390 × 844` viewport, mindkét route; hero height kb. `680px`, video `720 × 1280`, `readyState=4`, `paused=false`.
- A böngésző a desktop route-on az Astro-hashed MP4-et, mobilon a külön `(max-width: 767px)` MP4 source-t választotta.
- Mindkét route-on a poster lokális `/assets/*.webp`; a video `muted`, `autoplay`, `loop`, `playsinline`, `preload="metadata"` állapotban volt.
- A desktop és mobil screenshoton a hero copy, CTA, transparent header és következő V2 szakasz vizuálisan renderelődött; a mobil crop nem a desktop képarányú lejátszás volt.
- Buildelt route-scope proof: V1 `/ajanlatok/...` HTML-ekben `0` video, V2 `/ajanlatok-v2/...` HTML-ekben `1` video és mobil source.
- A V2 preview meta robots állapota `noindex`.
- A vizuális ellenőrzés szerint a hero, feature rail, story ritmus, programkártyák és direct booking záróblokk a referencia szerkezetét követi.

## CTA és tracking ellenőrzés

- A hero és direct-booking SabeeApp CTA-k megtartják a meglévő offer booking URL-eket.
- A CTA-kon megmaradt/átadódik: `data-dnd-property`, `data-dnd-campaign`, `data-dnd-offer`, `data-dnd-placement`.
- A contact és WhatsApp CTA-k külön `data-dnd-cta-type` értéket kapnak.
- Browser QA során route-onként 2 explicit booking CTA és contact/WhatsApp link volt azonosítható; a páros offer `fugehaz_oszi_kettesben_2026`/`fugehaz`, a családi offer `d2_oszi_csaladi_pihenes_2026`/`d2` értékeit tartotta.
- A `npm run test:tracking` 3/3 teszte sikeres; a központi dataLayer/attribution fájlok nem változtak.
- A központi `public/scripts/dnd-booking-attribution.js` és `public/scripts/dnd-ads-events.js` fájlokat nem módosítottam.

## Build és ismert figyelmeztetés

- `npm run build`: sikeres.
- `npm run check`: sikeres; root deploy check, CTA marker, asset/link ellenőrzés zöld.
- `npm run test:tracking`: sikeres, 3/3.
- Static build eredménye: `150 page(s) built`.
- A két új preview HTML is elkészült a `dist/ajanlatok-v2/.../` útvonalakon.
- A build két meglévő, scope-on kívüli guide-route konfliktusra figyelmeztetett (`/guide/d1/medence`, `/guide/d1/aszf`); build failure nem történt.
- Az aktuális checkoutban nincs `npm run dwa:preflight`, `scripts/dwa-preflight-check.mjs` vagy `scripts/dwa-specialist-worker.mjs`; a meglévő `reports/dwa-preflight/latest.*` 2026-07-31-i, más branch/commit állapotból származó stale evidence, ezért nem tekintettem ezt a futás bizonyítékának.

## Route-switch státusz

`ROUTE_SWITCH: NOT_EXECUTED`

Az új V2 csak a külön `/ajanlatok-v2/` preview útvonalon érhető el. A meglévő `/ajanlatok/` route-ok nem lettek átirányítva, átnevezve vagy lecserélve. Éles route-váltás kizárólag későbbi DCA-elfogadás után végezhető.

## Commit, push, deploy és live-write státusz

- Commit: `NOT_EXECUTED` – a felhasználói kérés szerint.
- Push: `NOT_EXECUTED` – a felhasználói kérés szerint.
- Külső/éles deploy: `NOT_EXECUTED` – a felhasználói kérés szerint.
- Külső platform- vagy live write: `NOT_EXECUTED`.
- Explicit garancia: ez a munka kizárólag a DWA helyi projektforrásában készült; DCA projektet nem módosítottam.

## Handoff

Következő döntés: DCA ellenőrizze a két `/ajanlatok-v2/` preview route desktop/mobile megjelenését és fogadja el vagy utasítsa el a későbbi route-switch-t. Addig a jelenlegi route-ok és a Matiné változatlanok.

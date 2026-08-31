# DWA specialist handoff – főoldali őszi ajánlatkártyák

**Dátum:** 2026-08-01  
**Mód:** helyi forrásmódosítás, no-live-write  
**Checkout:** `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`

## Eredmény

- A főoldali sorrend forrásban és buildelt HTML-ben: `Hero → AutumnCampaignOffers → PanoramaPoolHighlight → d2-reviews → további főoldali blokkok`.
- A kártyák fölötti vendég-facing intro kizárólag az `Őszi ajánlatok` előcímből és az `Őszi kikapcsolódás kettesben vagy családdal` címből áll; technikai kampány/offer/landing magyarázat és intro-bekezdés nincs.
- A „Pároknak” és „Családoknak” kártyák 720 px felett egymás mellett, a terv szerinti kétoszlopos gridben jelennek meg; 720 px alatt olvashatósági okból egymás alá, teljes rácsszélességre törnek.
- Telefonon `max-width: 720px` mellett egy `minmax(0, 1fr)` oszlop, 22 px gap, `max-width: 420px` mellett 18 px gap működik. A kártyák `height: 100%`, a grid `align-items: stretch`, a kép aránya mobilon `0.92`, 420 px alatt `0.86`.
- A két kártya címe és tartalma szándékosan megkülönböztetett: `Nyugodt pihenés kettesben` — kandallós esték, közeli borászatok, lassú reggelek; `Aktív családi pihenés` — őszi kirándulások, kerékpáros kalandok, közös felfedezések.
- A kártyákból kikerült minden külön leíró bekezdés. Mindkettőben rövid, nem interaktív, egyszerű szöveges lista marad.
- A highlightok nem gombszerű chipek és nincs köztük függőleges elválasztóvonal: nincs nested link/button, pill-háttér vagy listaelem-szegély; legfeljebb egy finom vízszintes felső vonal van közvetlenül a footerben a `Bővebben` előtt.
- A két `Bővebben` CTA azonos mobil/desktop `min-height` szabályt kapott, és a flex footer mindkettőt a kártya aljára zárja.
- A főoldali kártyák renderéből nincs `Panorama Pool`, `medence` vagy `medencés` utalás.

## Módosított és megőrzött fájlok

- [src/pages/index.astro](C:/Users/cvarn/Desktop/NEW%20HONLAP/Adatok/dandelion-new-site/src/pages/index.astro)
  - az `AutumnCampaignOffers` közvetlenül a `Hero` után került; a későbbi főoldali blokkok sorrendje és a különálló pool-komponens hívása változatlan.
- [src/sections/AutumnCampaignOffers.astro](C:/Users/cvarn/Desktop/NEW%20HONLAP/Adatok/dandelion-new-site/src/sections/AutumnCampaignOffers.astro)
  - 720 px feletti kétoszlopos, alatta olvashatósági alapú egyoszlopos CSS, azonos arányú kártyamédia, overflow-védelem;
  - meglévő saját páros boros/szőlőhegyi kép és meglévő saját családi panoráma WebP-k használata;
  - a két kártya megkülönböztetett címe és rövid lista-copyja;
  - külön leíró bekezdések eltávolítása;
  - rövid, nem interaktív háromelemű lista desktopon és mobilon;
  - CTA-href, `data-dnd-*` tracking, fókuszállapot és szemantikus `section`/`article`/`h2`/`h3`/`ul` struktúra megőrzése.
- [src/sections/PanoramaPoolHighlight.astro](C:/Users/cvarn/Desktop/NEW%20HONLAP/Adatok/dandelion-new-site/src/sections/PanoramaPoolHighlight.astro) — **nem módosult**.
- A korábbi eredeti scope két optimalizált WebP assetje változatlanul megmaradt:
  - `src/assets/home/campaign/dandelion-home-campaign-family-panorama-desktop.webp` — 1200×800 px, 144 898 bájt.
  - `src/assets/home/campaign/dandelion-home-campaign-family-panorama-mobile.webp` — 900×675 px, 82 532 bájt.
- A páros kártya saját képe: `src/assets/home/experiences/dandelion-home-experience-wine-gastro-01-optimized.webp`.
- A QA ellenőrizte, hogy mindhárom forrásfájl helyi projektasset, WebP/Riff fejléccel; generált vagy külső kép nem került használatba.
- A nyers felhasználói JPG nem került a projektbe. A `<picture>` mobil source, `alt`, `title`, `figcaption`, `loading="lazy"`, `decoding="async"` és méretattribútumok buildelt HTML-ben jelen vannak.

## Média-, SEO- és szemantikai QA

- A panorámakép projekt-szabály szerinti WebP desktop/mobil változatban maradt, külön mobil vágással és buildelt `.webp` source-okkal.
- Alt: `Balaton-felvidéki panoráma szőlősorokkal és tanúhegyekkel.`
- Cím: `Balaton-felvidéki családi őszi panoráma`.
- Caption: `Tágas balatoni panoráma a családi őszi pihenés hangulatához.`
- A blokk egy `h2`-t, két kártyánként egy `h3`-at és rövid, nem interaktív `ul` listát használ; a listaelemek nem kapnak link- vagy gombszemantikát.
- A `/` route buildelt HTML-je továbbra is `index,follow`, title, meta description, canonical és főoldali H1 meta/route követelményei megmaradtak.
- A V2 preview route-ok buildelt outputja megmaradt, canonical és szándékos `noindex,follow` preview-döntéssel: `/ajanlatok-v2/oszi-kettesben/`, `/ajanlatok-v2/oszi-csaladi-pihenes/`.
- A Matiné route buildelt outputja megmaradt és indexelhető: `/szent-gyorgy-hegy-matine-szallas/`.
- A globális főoldali meta description és a különálló Panorama Pool szekció nem módosult; a kártyák pool-szövegének eltávolítása izolált maradt.

## Lefuttatott ellenőrzések

1. `npm run build` — **PASS**; 150 oldal készült, a build a `dist`-et regenerálta, kézzel nem szerkesztettem.
   - Meglévő, ettől a tasktól független warning: `/guide/d1/[slug]` ütközik a magasabb prioritású `/guide/d1/medence` és `/guide/d1/aszf` route-okkal.
2. `npm run check` — **PASS**; root deploy check, stabil route-kérések, asset/link, JS, CTA és admin-route ellenőrzések zöldek.
3. Buildelt HTML/CSS statikus QA — **PASS**:
   - forrás- és buildelt sorrend: Hero után közvetlenül őszi blokk, utána pool, majd review;
   - a vendég-facing intro pontosan ellenőrizve, tiltott technikai megfogalmazás nélkül;
   - két kártya, kártyánként három listaelem, külön leíró `<p>` nélkül;
   - mobil cím/lista/footer igazítás, két azonos CTA-minimum magasság és egyetlen footer-felső elválasztó;
   - listaelemek között nincs függőleges border vagy interaktív elem;
   - desktop/tablet kétoszlopos grid 720 px felett, telefonon 720 px alatt egy teljes szélességű oszlop, 420 px-es szűkebb ritmus és overflow-védelmi szabályok;
   - egységes mobil kép-aspect ratio, `min-width: 0`, `box-sizing`, `overflow-wrap`;
   - highlightok nem nested span/chip elemek, kártyánként egyetlen trackingelt CTA;
   - két responsive WebP source, alt/title/figcaption;
   - kártyablokkban nincs medence/pool szöveg, a páros kandalló/borászat/lassú reggel, a családos kirándulás/kerékpár/felfedezés tartalom megvan;
   - mindhárom használt képforrás saját projektasset és helyi WebP, külső vagy generált kép nélkül;
   - főoldal SEO, V2 preview output és Matiné output ellenőrizve.
4. Forrásvédelem — **PASS**; `PanoramaPoolHighlight.astro` diffje üres, V2/Matiné forráshoz nem nyúltam.

### Böngészős QA warning

Interaktív Playwright/Puppeteer/in-app browser viewport- és screenshot-QA környezetileg nem elérhető, ezért 390/360 px és desktop interakciós/screenshot ellenőrzés **nem PASS**, hanem dokumentált warning. Ez nem blokkolja a forrásjavítást a koordinátori tisztázás szerint; a helyi buildelt HTML/CSS preview-forrás ellenőrzése sikeres.

## Védelmi és no-live státusz

- DCA checkouthoz nem nyúltam.
- Nem történt route-switch, commit, push, deploy, külső platform- vagy élő módosítás.
- V2 preview és Matiné korábbi állapota megőrzve.
- A különálló általános Panorama Pool komponens érintetlen.

**Handoff státusz:** `LOCAL_SOURCE_CHANGE_COMPLETE_WITH_STATIC_QA_BROWSER_WARNING`  
**Live státusz:** `NO_LIVE_WRITE / NO_DEPLOY / NO_COMMIT / NO_PUSH`

[CHANGE 2026-04-26 00:00] D2 runtime image-admin bridge állapotának dokumentálása.

# D2 runtime image-admin bridge – állapotjegyzet

Status: TORTENETI
Last checked: 2026-06-02
Use for: D2 runtime image-admin bridge torteneti kontextus
Do not use for: publikus frontendbe visszahozando runtime/admin logika igazolasara


## 1. Mi maradt bent?

A D2 oldalon bent maradt a runtime `apartment-image-config/d2` olvasási ág:

- szerveroldali fetch: `fetchRuntimeHeroImages()` a `src/pages/dandelion-d2.astro` fájlban
- kliensoldali fetch: `fetch(d2RuntimeGalleryEndpoint)` ugyanebben a fájlban
- kliensoldali runtime sorrendkezelés: `applyRuntimeGalleryOrder(...)`
- runtime hero adatok olvasása: `fetchRuntimeHeroImages(...)`

## 2. Miért nem töröljük most?

Most azért nem töröljük, mert a réteg még kapcsolódik:

- a WordPress plugin REST endpointjához (`apartment-image-config`)
- az image-admin bridge működéséhez
- a runtime galéria sorrend felülírás lehetőségéhez

Ennek vak eltávolítása vizuális vagy üzleti eltérést okozhat (pl. futásidejű sorrend változás megszűnése).

## 3. Mi már nem függ tőle elsődlegesen?

A D2 fő képrendszer elsődleges forrásai már registry/lokális WebP alapúak:

- desktop hero: registry + lokális WebP
- mobil hero: lokális WebP
- galéria alapforrás: registry + lokális WebP
- thumbnailok: lokális WebP
- card: registry + lokális WebP
- location kép: registry/lokális kép

## 4. Későbbi döntési lehetőségek

- A runtime bridge maradhat admin override rétegként.
- Vagy feature flaggel kikapcsolható D2-n.
- Vagy később teljesen kivehető a D2 oldalból.
- Az admin/plugin réteget nem kell egyben bántani a frontend cleanuppal.

## 5. Következő javasolt lépés

- A D2 pilot most működési oldalról lezárható.
- Következő lakásnál ismételhető a registry/local workflow.
- Alternatíva: külön taskban D2 runtime bridge feature flag audit és teszt.


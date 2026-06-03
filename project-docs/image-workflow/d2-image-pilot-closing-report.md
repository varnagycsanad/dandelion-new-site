[CHANGE 2026-04-26 00:00] D2 képkezelési pilot lezáró állapotdokumentum létrehozása.

# D2 képkezelési pilot – lezáró állapot

Status: TORTENETI
Last checked: 2026-06-02
Use for: D2 image pilot zarojelentes kontextus
Do not use for: aktualis image pipeline allapot forrasakent


## 1. Cél

A D2 lakáson végigfutott a teljes képkezelési pilot workflow: a forrás (local/WP) képekből lokális WebP-k készültek, az adatok image registryben lettek rendezve, és a frontend fő D2 képei már registry/local alapon mennek.  
A cél ezzel egy ismételhető, kontrollált folyamat kialakítása volt a többi lakás számára.

## 2. Elkészült D2 képrendszer

- Desktop hero: elkészült, registryből megy, lokális WebP-re mutat.
- Mobil hero: elkészült, lokális WebP-re mutat.
- Galéria: 10 aktív kép, lokális WebP forrásokkal.
- Thumbnailok: 10 db lokális WebP thumb.
- Card kép: elkészült, registryben aktív, lokális WebP.
- Location kép: D2 registry/local képre kötve.
- Pexels aktív használat: kiváltva.

## 3. Aktív frontend források

- D2 desktop hero: `accommodationImages.d2.hero.desktop.src` → `/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp`
- D2 mobil hero: `/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-mobile-01.webp`
- D2 galéria: `accommodationImages.d2.gallery` (10 elem, lokális WebP)
- D2 thumbok: `accommodationImages.d2.gallery[].thumb` (lokális WebP)
- Szállások oldal D2 card: `accommodationImages.d2.card.src` (legacy fallback mellett)
- D2 location kép: registry galériaelemre kötve (sortOrder 9 prioritással)

## 4. Új igazságforrások

- `src/data/images/accommodation-images.ts`
- `src/admin-disabled/data/images/accommodation-source-images.ts`
- `public/images/accommodations/d2/...`
- `scripts/process-accommodation-images.mjs`
- review dokumentumok:
  - `project-docs/image-workflow/d2-image-seo-review.md`
  - `project-docs/image-workflow/d2-gallery-selection-review.md`
  - `project-docs/archive/image-workflow/generated/d2-processing-plan-selected.md`

## 5. Feldolgozott képek

- 1 db desktop hero WebP
- 1 db mobile hero WebP
- 1 db card WebP
- 10 db gallery WebP
- 10 db thumb WebP

## 6. Legacy maradványok

- `apartment-image-config` alapú WP REST fallback ág még jelen van.
- `fetchWordPressMedia` alapú ágak még jelen vannak.
- Régi assignment-alapú D2 adatok (`media-apartment-assignments`, `apartment-image-assignments`) még jelen vannak.
- `homepage-image-mapping` D2 fallback még jelen van.
- Ezek már nem a D2 fő képrendszer aktív elsődleges forrásai.

## 7. Mit nem szabad elrontani

- A D2 frontend fő képrendszere már registry + lokális WebP alapú.
- Ne kerüljön vissza aktív képforrásként nyers WP URL.
- A `public/images/accommodations/d2` képfájlokat ne töröljük.
- WebP fájlokat ne írjuk felül véletlenül azonos néven.
- Admin/plugin réteghez ne nyúljunk egy lépésben a frontend cleanuppal.

## 8. Következő ajánlott cleanup

1. D2 WP legacy fallback ágak célzott, read-only auditja.
2. Nem használt D2 WP fetch ágak eltávolítása kis, ellenőrizhető lépésekben.
3. `homepage-image-mapping` D2 fallback legacy jelölése.
4. Csak stabil D2 cleanup után induljon a következő lakás pilotja.

## 9. Ismételhető workflow más lakásokhoz

1. Source inventory feltöltés.
2. SEO review (hu/en + focus/crop).
3. Selection review (aktív vs tartalék).
4. WebP + thumb gyártás kontrollált write módban.
5. ImageAsset registry kitöltés.
6. Frontend átkötés kis scope-ban.
7. Záró audit és dokumentáció.

# WordPress Uploads Replacement Audit

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: maradek wp-content/uploads replacement audit kontextus
Do not use for: aktualis kepforras allapot friss keresese nelkul


Datum: 2026-05-08

## Scope

Ez az audit csak a maradek publikus/renderelt `wp-content/uploads` kep- es videohivatkozasokra vonatkozik.

Nem tortent:

- `src/` modositasa
- `public/images` vagy `public/videos` modositasa
- automatikus csere
- build
- commit vagy push

## Osszegzes

- Forrasszintu publikus/renderelt elofordulasok szama: 22
- Egyedi WP media URL-ek szama: 14
- Logikai audit-elemek szama: 14
- Legbiztosabb helyi megfelelesek: a `homepage-image-mapping.json` maradek slotjai kozul 6-7 esetben van eros, azonos accommodationhoz tartozo helyi jelolt
- Leggyengebb pontok:
  - header logo: nincs helyi wordmark/header-logo asset
  - homepage hero video: nincs site-szintu helyi video
  - `Experiences > HEGYEK`: nincs egyertelmu tajkep-only helyi kep
  - `szallasok` listing hero: nincs egyertelmu, tobb szallast kepviselo szeles hero asset

## Modszertan

Az audit a kovetkezoket hasonlitotta ossze:

- aktualis publikus/renderelt WP URL-ek a `src/` fajlokban
- helyi assetek a `public/images/` es `public/videos/` alatt
- a mar meglevo accommodation registry mintak a `src/data/images/accommodation-images.ts` es `src/admin-disabled/data/images/accommodation-images.generated.json` fajlokban

Szabaly:

- ahol a helyi kep ugyanahhoz az accommodationhoz tartozik, azt elorebb soroltam
- ahol a site-funkcio regio- vagy elmeny-szintu, ott csak valoszinu jelolteket adtam
- ahol nincs egyertelmu helyi megfelelo, a statusz `kezi dontes kell`

## Dolesi lista

| Elem | Hol hasznalja a site | Regi WP fajl | Helyi jeloltek | Ajanlott valasztas | Bizonyossag | Megjegyzes |
|---|---|---|---|---|---|---|
| Header logo | `src/layouts/BaseLayout.astro` desktop + mobile header | `DND-Vendeghaz-logo-fejslec-2.png` | `../public/favicon.svg`, `../public/favicon.ico` | nincs automatikus csere javasolva | kezi dontes kell | Nincs helyi wordmark/logo, csak favicon-szintu jelolt. |
| Homepage hero video | `src/sections/Hero.astro` | `202507-V1.mp4` | `../public/videos/accommodations/koveskal/dandelion-koveskal-hero-desktop.mp4`, `../public/videos/accommodations/koveskal/dandelion-koveskal-hero-mobile.mp4` | nincs automatikus csere javasolva | kezi dontes kell | Van helyi video, de csak egyetlen accommodationhoz kotodik, nem site-szintu hero. |
| RegionStories 1 | `src/sections/RegionStories.astro` - "Tanúhegyek ölelésében" | `DJI_20260407175709_0028_D.jpg.webp` | `/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp`, `/images/accommodations/d1/gallery/dandelion-d1-source-002.webp`, `/images/accommodations/fugehaz/gallery/dandelion-fugehaz-source-001.webp` | D2 hero desktop | valoszinu | Szeles, kulso, Kisapati/Tapolcai-medence karakteru kep. |
| RegionStories sticky band | `src/sections/RegionStories.astro` - hatter | `dandelion_szololiget_202508-5.jpg.webp` | `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-001.webp`, `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-002.webp`, `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-003.webp` | nincs eros automatikus csere javasolva | kezi dontes kell | A fajlnev Szololigetre utal, de a helyi keszletben nincs egyertelmu hasonlo, szeles kulso/panorama kep. |
| RegionStories 3 | `src/sections/RegionStories.astro` - "A Káli-medence csendjében" | `2026-04-17-11-49-24.jpeg.webp` | `/images/accommodations/koveskal/gallery/dandelion-koveskal-source-001.webp`, `/images/accommodations/vintage/gallery/dandelion-vintage-source-003.webp`, `/images/accommodations/vintage/gallery/dandelion-vintage-source-006.webp` | Koveskal source-001 | valoszinu | A legkozelebbi helyi Káli-medencei jelolt a Köveskál keszletbol jon. |
| Experiences / HEGYEK | `src/sections/Experiences.astro` | `variant-1.jpg.webp` | `/images/accommodations/zsalya/gallery/dandelion-zsalya-source-010.webp`, `/images/accommodations/d1/gallery/dandelion-d1-source-002.webp`, `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-002.webp` | nincs eros automatikus csere javasolva | kezi dontes kell | Minden helyi jelolt csak kozvetve tajkepes; nincs tiszta "hegyek" hangulatkep. |
| Szallasok listing hero | `src/pages/szallasok.astro` | `2026-02-28-12-59-35.jpeg.webp` | `/images/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp`, `/images/accommodations/d1/gallery/dandelion-d1-source-002.webp`, `/images/accommodations/royal_homes/gallery/dandelion-royal-homes-source-029.webp` | nincs eros automatikus csere javasolva | kezi dontes kell | A page tobb szallast fog ossze; nincs biztos, brand-szintu hero asset. |
| Homepage card: `d1` | `src/data/homepage-image-mapping.json` -> listing cards | `2025-09-30-07-15-39.jpeg.webp` | `/images/accommodations/d1/gallery/dandelion-d1-source-001.webp`, `/images/accommodations/d1/gallery/dandelion-d1-source-002.webp`, `/images/accommodations/d1/gallery/dandelion-d1-source-003.webp` | `d1-source-001.webp` | valoszinu | Ugyanazon accommodation helyi kulso kepkeszletebol. |
| Homepage card: `fugehaz` | `src/data/homepage-image-mapping.json` -> listing cards | `IMG_8525-scaled.jpg.webp` | `/images/accommodations/fugehaz/gallery/dandelion-fugehaz-source-001.webp`, `/images/accommodations/fugehaz/gallery/dandelion-fugehaz-source-002.webp`, `/images/accommodations/fugehaz/gallery/dandelion-fugehaz-source-003.webp` | `fugehaz-source-001.webp` | valoszinu | Kulso kep, figefas framing, eros card-jelolt. |
| Homepage card: `zsalya` | `src/data/homepage-image-mapping.json` -> listing cards | `ZSalya-e1737915101923.jpg.webp` | `/images/accommodations/zsalya/gallery/dandelion-zsalya-source-010.webp`, `/images/accommodations/zsalya/gallery/dandelion-zsalya-source-011.webp`, `/images/accommodations/zsalya/gallery/dandelion-zsalya-source-001.webp` | `zsalya-source-010.webp` | valoszinu | A 010-es es 011-es helyi kulso kepek jobban hozzak a card-szerepet, mint az elso interior frame. |
| Homepage card: `szololiget` | `src/data/homepage-image-mapping.json` -> listing cards | `202507_dandelion-16-scaled.jpg.webp` | `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-001.webp`, `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-002.webp`, `/images/accommodations/szololiget/gallery/dandelion-szololiget-source-003.webp` | `szololiget-source-001.webp` csak ha gyors csere kell | kezi dontes kell | Van helyi asset, de nincs egyertelmu kulso hero/card kep a keszlet elejen. |
| Homepage card: `szepvolgyi` | `src/data/homepage-image-mapping.json` -> listing cards | `2023-04-27-12-17-16-scaled.jpeg.webp` | `/images/accommodations/szepvolgyi/gallery/dandelion-szepvolgyi-source-001.webp`, `/images/accommodations/szepvolgyi/gallery/dandelion-szepvolgyi-source-002.webp`, `/images/accommodations/szepvolgyi/gallery/dandelion-szepvolgyi-source-003.webp` | `szepvolgyi-source-001.webp` | valoszinu | A teraszos kulso kep jol mukodik listing cardon. |
| Homepage card: `royal_homes` | `src/data/homepage-image-mapping.json` -> listing cards | `2023-10-17-17-10-02.jpeg.webp` | `/images/accommodations/royal_homes/gallery/dandelion-royal-homes-source-029.webp`, `/images/accommodations/royal_homes/gallery/dandelion-royal-homes-source-022.webp`, `/images/accommodations/royal_homes/gallery/dandelion-royal-homes-source-007.webp` | `royal-homes-source-029.webp` | valoszinu | A 029-es kulso epulettomeg a legtisztabb card-jelolt. |
| Homepage card: `vintage` | `src/data/homepage-image-mapping.json` -> listing cards | `IMG_3520-Copy.jpg.webp` | `/images/accommodations/vintage/gallery/dandelion-vintage-source-008.webp`, `/images/accommodations/vintage/gallery/dandelion-vintage-source-003.webp`, `/images/accommodations/vintage/gallery/dandelion-vintage-source-006.webp` | `vintage-source-008.webp` | valoszinu | A 008-as kulso kep kozelebb all egy klasszikus listing cardhoz. |

## Kulon megfigyelesek

1. A `homepage-image-mapping.json` jelenlegi `altText` mezoi kozott mojibake is latszik. Ez most szandekosan valtozatlan maradt, mert a feladat csak audit.
2. A `src/data/images/accommodation-images.ts` fajlban jelenleg csak a `d2` rendelkezik kulon `hero` es `card` mezovel. A tobbi accommodationnel csak `gallery` all rendelkezesre.
3. Emiatt a card-cserek nagy resze technikailag mar megteheto lenne, de a "melyik kep a legjobb card" kerdes meg mindig editorialis dontes.

## Legjobb kovetkezo lepes

1. Csanad valasszon:
   - kulon helyi header logo assetet, vagy
   - ideiglenesen favicon-alapu logohelyettesitest
2. Dobjon vegleges dontest a kovetkezo 4 bizonytalan blokkra:
   - homepage hero video
   - RegionStories sticky background
   - Experiences / HEGYEK
   - `szallasok` listing hero
3. Ha ez megvan, a `homepage-image-mapping.json` maradek 7 slotja kozul legalabb 6 nagy valoszinuseggel biztonsagosan cserelheto a helyi gallery assetekre.

# Astro Image Migracios Terv

Status: RESZBEN TELJESULT
Last checked: 2026-06-02
Use for: kepmigracio hattere, hatralevo image optimalizalasi iranyok
Do not use for: jelenlegi `astro:assets` hasznalat vagy telepitett csomagallapot megallapitasara

Statuszfrissites 2026-06-02: ez a terv reszben megvalosult. A publikus oldalak es template-ek mar hasznalnak `astro:assets` importot, a repo-ban van `src/assets/accommodations/...` es `src/assets/home/...`, es a 2026-06-02-i build 119 optimalizalt kepassetet generalt. A dokumentum tovabbra is hasznos migracios hatter, de a "nincs tenyleges `astro:assets` hasznalat" allitas mar nem aktualis.

## Cel

A jelenlegi, jellemzoen string alapu `<img>` hasznalatot fokozatosan at kell vezetni Astro `Image` vagy ahol indokolt `Picture` komponensre. A cel nem pusztan a szintaktikai csere, hanem a valodi kepoptimalizalas:

- jobb CLS,
- jobb LCP,
- konzisztens meretkezeles,
- responsive kepkiszolgalas,
- a helyi assetek build-time optimalizalasa.

## Jelenlegi helyzet

A projektben jelenleg nincs tenyleges `astro:assets` hasznalat a publikus oldalaknal. A publikus kepmegjelenitesek nagy resze sima `<img>` alapu.

Kulon fontos, hogy a kepek forrasa vegyes:

1. lokalis kepfajlok `public/` alatt,
2. remote WordPress `wp-content/uploads` URL-ek,
3. remote `Unsplash` URL-ek,
4. strukturalt szallas kepregiszter `src/data/images/accommodation-images.ts` alatt, de string `src` mezokkel.

## Fo technikai megallapitas

Az Astro `Image` komponens akkor adja a legnagyobb gyakorlati hasznot, ha a kepek `src/` alol importalhato assetkent vannak jelen. Emiatt a migracio elso fazisa nem template-csere, hanem adatmodell- es fajlstruktura-rendezes.

## Prioritasi sorrend

1. Szallas oldalak hero kepei
2. Szallas listing kartyakepek
3. Szallas galeria preview kepek
4. Fooldali kiemelt blokk kepek
5. `Unsplash` kepek kivaltasa lokalis sajat kepekre
6. Marado remote WordPress kepek felulvizsgalata

## Erintett fo fajlok

- `src/templates/AccommodationPage.astro`
- `src/pages/szallasok.astro`
- `src/pages/index.astro`
- `src/pages/elmenyek.astro`
- `src/sections/Experiences.astro`
- `src/sections/RegionStories.astro`
- `src/sections/StaysGrid.astro`
- `src/lib/accommodation-page-adapters.ts`
- `src/lib/homepage-image-mapping.ts`
- `src/data/images/accommodation-images.ts`
- `src/data/images/image-types.ts`
- `src/data/homepage-image-mapping.json`

## Implementacios fazisok

### 1. fazis - Audit es csoportositas

Feladatok:

1. Minden publikus kep forrast soroljunk be:
   - `src/`-be migralhato lokalis kep,
   - `public/`-bol kiszolgalando lokalis kep,
   - remote WordPress kep,
   - remote `Unsplash` kep.
2. Kiemelt oldalak es blokkok kijelolese:
   - accommodation hero,
   - accommodation gallery preview,
   - `szallasok` listing,
   - fooldali vizualis blokkok.

Elvart eredmeny:

- egyertelmu lista arrol, melyik kepcsoport miben es hogyan hasznalodik,
- priorizalt migracios sorrend.

### 2. fazis - Asset struktura kialakitasa

Feladatok:

1. Uj asset konyvtar letrehozasa a `src/` alatt.
2. Javasolt struktura:
   - `src/assets/accommodations/<slug>/hero/`
   - `src/assets/accommodations/<slug>/card/`
   - `src/assets/accommodations/<slug>/gallery/`
   - `src/assets/accommodations/<slug>/thumbs/`
3. Elso korben a legfontosabb kepek athelyezese:
   - hero,
   - card,
   - elso nehany preview galeria kep.

Elvart eredmeny:

- Astro-kompatibilis, importalhato lokalis kephalmaz.

### 3. fazis - Adatmodell bovites

Feladatok:

1. Az `ImageAsset` modell bovitese Astro asset referenciaval.
2. Javasolt irany:
   - `src: string` mellett vagy helyett `astroSrc` jellegu mezot bevezetni.
3. Az adapterek frissitese:
   - `buildHeroImages()`
   - `buildGalleryImages()`
   - `buildRelatedStays()`
4. A homepage mapping rovid tavon maradhat string alapu, de a kesobbi migraciohoz TS-alapu asset mapping javasolt.

Elvart eredmeny:

- a template szint mar kepes legyen kulon kezelni a lokalis Astro assetet es a remote URL-t.

### 4. fazis - Accommodation hero migracio

Feladatok:

1. A `src/templates/AccommodationPage.astro` hero reszet allitsuk at Astro `Image` vagy `Picture` komponensre.
2. A jelenlegi hero fallback logikat tartsuk meg, de Astro asset inputtal.
3. Desktop es mobile hero kepek breakpoint alapu kiszolgalasanak ujragondolasa.

Elvart eredmeny:

- valodi responsive hero kepkiszolgalas,
- stabil meretek,
- jobb LCP alapok.

### 5. fazis - Szallas kartya migracio

Feladatok:

1. A `src/pages/szallasok.astro` kartyakepeinek atallitasa Astro `Image` komponensre.
2. A D2 kartya legyen elso pilot, mert mar most is reszben lokalis kepregiszterrol jon.
3. A homepage mapping alapjan erkezo remote kepekhez kulon dontes kell:
   - maradnak remote-kent,
   - vagy lokalizaljuk oket.

Elvart eredmeny:

- jobb listing teljesitmeny,
- egyseges kepkezeles a kartyakon.

### 6. fazis - Galeria preview migracio

Feladatok:

1. A galeria preview elemeket Astro `Image`-re valtani.
2. A lightbox teljes meretu kepei maradhatnak eredeti vagy kulon kezelt assetek.
3. A preview es full-size kep szerepet kulon kezeljuk.

Elvart eredmeny:

- kisebb kezdo betoltes,
- stabilabb preview grid.

### 7. fazis - Fooldali blokkok es marketing oldalak

Feladatok:

1. `StaysGrid`, `Experiences`, `RegionStories`, `elmenyek` oldal kepanyag felulvizsgalata.
2. A remote `Unsplash` kepek kivaltasa sajat lokalis assetekre.
3. A lokalis assette valt elemek migralasa Astro `Image`-re.

Elvart eredmeny:

- kevesebb kulso fuggoseg,
- valodi build-time kepoptimalizalas a homepage fontos blokkjain.

### 8. fazis - Remote kepek szabalyzasa

Feladatok:

1. A marado WordPress remote kepeket kulon kezelni.
2. Döntes:
   - maradjanak sima `<img>`-k,
   - vagy menjenek Astro `Image` API ala egységesebb kezelés miatt.
3. A remote kepstrategiat domain- es uzemeltetesi szempontbol dokumentalni.

Elvart eredmeny:

- tudatos kulonbseg a lokalisan optimalizalt es remote media kozott.

## Konkret munkacsomagok

1. `M1` Asset konyvtarstruktura letrehozasa
2. `M2` `ImageAsset` tipus bovites
3. `M3` accommodation hero pilot migracio
4. `M4` `szallasok` kartya migracio
5. `M5` galeria preview migracio
6. `M6` `Unsplash` audit es kivaltas
7. `M7` fooldali blokk migracio
8. `M8` `elmenyek` oldal migracio
9. `M9` vegso QA es teljesitmeny ellenorzes

## Ellenorzes

Minden fazis utan:

1. `npm run build`
2. manuális desktop es mobil nezet ellenorzes
3. ujraellenorzes:
   - maradt-e kritikus `<img>` meret nelkul,
   - maradt-e felesleges remote `Unsplash` kep,
   - javult-e a loading es a layout stabilitas.

## Kockazatok

1. A `public/` alapu stringes kepregiszter miatt a migracio nem pusztan presentacios csere.
2. A remote WordPress kepeknel az Astro `Image` hasznalata nem feltetlen jelent valodi build-time optimalizalast.
3. A `Unsplash` kepek valodi lecserelesehez sajat kepanyag vagy uj asset-forras kell.

## Javasolt elso konkret lepés

Elso implementacios korben ezt erdemes megcsinalni:

1. D2 es 1 tovabbi szallas hero kepenek atviteleet `src/assets` ala,
2. `AccommodationPage` hero blokk Astro `Picture` pilot,
3. `szallasok` oldal D2 kartyakep Astro `Image` pilot,
4. build + vizualis QA.

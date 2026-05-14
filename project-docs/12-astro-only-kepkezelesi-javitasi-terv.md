# Astro-Only Képkezelési Javítási Terv

## Cél

A jelenlegi vegyes képkezelési rendszer megszüntetése, és egyetlen egységes, modern Astro-native képfolyamat meghagyása.

A végállapot:

- minden megjelenített kép lokális repo assetből jön
- a forrásképek kanonikus helye a `src/assets/` alatt van
- a runtime oldalon csak Astro által generált `/assets/...` képek jelennek meg
- a WordPress-alapú régi képútvonalak és a `public/images/accommodations/...` használata megszűnik
- a Kép admin később ehhez az Astro-only modellhez lesz igazítva

## Miért kell váltani

A jelenlegi rendszer egyszerre több képutat használ:

- WordPress média logika
- `public/images/accommodations/...`
- `src/assets/...`
- buildelt, hash-elt Astro `/assets/...`

Ez több hibaforrást okoz:

- egy kép lokálisan létezik, de élesben mégis törött
- a registry más fájlra mutat, mint a buildelt oldal
- deploy drift miatt egyes fájlok fenn maradnak vagy hiányoznak
- a mobilos nézetben a törött kép nagy üres blokkot hagy maga után
- az átnevezés több rendszerben egyszerre kéne, hogy átvezessen

## Végleges architektúra

### 1. Egyetlen kanonikus képforrás

Minden használt kép a repo-ban él:

- `src/assets/accommodations/...`
- `src/assets/home/...`

Nem marad runtime forrásként:

- WordPress media URL
- `public/images/accommodations/...`
- `source-images/...`

A `source-images` mappa legfeljebb nyers import staging lehet, de nem runtime vagy registry alap.

### 2. Egységes könyvtárstruktúra

Minden szállás ugyanazt a struktúrát használja:

```text
src/assets/accommodations/<slug>/hero/
src/assets/accommodations/<slug>/gallery/
src/assets/accommodations/<slug>/thumbs/
src/assets/accommodations/<slug>/card/
```

Főoldali és egyéb szerkesztett blokkok:

```text
src/assets/home/<section>/
```

### 3. Egységes fájlnévképzés

Egyetlen szabály maradjon:

```text
dandelion-<slug>-hero-desktop-01.webp
dandelion-<slug>-hero-mobile-01.webp
dandelion-<slug>-gallery-001.webp
dandelion-<slug>-thumb-001.webp
dandelion-<slug>-card-01.webp
```

Ez kiváltja a mostani vegyes mintákat:

- `source-001`
- `kisapati-gallery-01`
- egyedi, kézzel elnevezett kivételek

### 4. Egységes WebP-konverziós szabály

Az új rendszerben minden publikusan használt kép optimalizált webes assetként készül.

Kötelező:

- a publikált képek végső formátuma `webp`
- a galériaképekhez külön `gallery` és külön `thumb` változat készül
- a hero képeknél külön `desktop` és külön `mobile` változat készül
- a nyers forráskép nem kerül közvetlenül a frontendbe
- a build és a runtime csak már feldolgozott assettel dolgozik

Elv:

- a thumbnail nem lehet ugyanaz a nagy fájl lekicsinyítve runtime-ban
- a mobil hero nem lehet automatikus desktop crop ellenőrzés nélkül
- minden fontos képhez tudatos képarány és fókuszpont-kezelés kell

### 5. Egységes képi SEO szabály

Az új Astro-only rendszerben minden frontendben használt tartalmi képhez strukturált SEO-adat tartozik.

Kötelező mezők:

- `alt`
- `title`
- `caption`
- magyar és angol nyelvi változat, ahol a kép registry-szinten kezelt

Kötelező elvek:

- az `alt` a képen ténylegesen látható tartalmat írja le
- a `title` rövid, tiszta belső / megjeleníthető képnév
- a `caption` természetesebb, emberibb leírás lehet
- kulcsszóhalmozás nem megengedett
- olyan állítás nem kerülhet bele, ami a képen nem látható

AI szabály:

- AI készíthet SEO draftot
- az AI draft mindig csak előkészítő állapot
- jóváhagyás nélkül nem kerül végleges SEO adatba
- meglévő jóváhagyott SEO mező nem írható felül automatikusan

## Kivezetendő elemek

### 1. WordPress-alapú képkezelés

Ki kell vezetni:

- WP media hivatkozások a képregistryből
- WP media eredetű runtime fallbackek
- olyan admin szövegek és logikák, amelyek azt feltételezik, hogy a képek a WP-ből jönnek

### 2. `public/images/accommodations/...`

Ki kell vezetni:

- szállásoldali galéria képek
- galéria thumbok
- hero képek
- card képek
- kapcsolódó szállások képei

Megjegyzés:

Más statikus képek a `public/images/` alatt maradhatnak, ha nem szállás-képrendszer részei, de az accommodation pipeline-ból ki kell kerülniük.

### 3. Vegyes fallback logika

Meg kell szüntetni az olyan adapter-logikát, amely:

- először Astro assetet próbál
- utána `public/images` fallbackre megy
- végül külső vagy WP útvonalat is elfogad

A cél az, hogy hiányzó kép esetén a hiba buildidőben derüljön ki.

## Érintett fő területek

### Registry

Fő cél:

- a `src/data/images/accommodation-images.ts` csak lokális Astro assetekre mutasson
- ne maradjon benne WP source útvonal
- ne maradjon benne `public/images/accommodations/...` runtime függés
- a képi SEO mezők ugyanitt vagy a hozzá kapcsolt Astro-only registry rétegben éljenek
- a registry tudja a szerepet: `hero_desktop`, `hero_mobile`, `gallery`, `thumb`, `card`
- a registryből egyértelműen kiderüljön, melyik asset a publikált WebP végpont

Kapcsolódó fájlok:

- `src/data/images/accommodation-images.ts`
- `src/data/images/astro-local-assets.ts`
- `src/data/images/accommodation-source-images.ts`

### Adapterek és template-ek

Fő cél:

- az oldalak csak Astro assetekből épüljenek
- a galéria grid Astro `Image` logikával menjen
- a lightbox adatmodell is ugyanebből a registryből készüljön

Kapcsolódó fájlok:

- `src/lib/accommodation-page-adapters.ts`
- `src/templates/AccommodationPage.astro`
- `src/sections/RegionStories.astro`

### Script réteg

Fő cél:

- a képfeldolgozó és átnevező script az új névkonvencióra dolgozzon
- a script ne WP runtime logikára, hanem lokális asset-pipeline-ra épüljön
- a script állítsa elő a végleges WebP és thumb fájlokat
- a script készítsen vagy frissítsen SEO draft mezőket
- a script validálja a hiányzó hero / gallery / thumb / card elemeket

Kapcsolódó fájlok:

- `scripts/process-accommodation-images.mjs`
- `scripts/images-intake.mjs`
- `scripts/images-process.mjs`
- `scripts/images-publish.mjs`
- `scripts/images-generate-registry-draft.mjs`

### Deploy

Fő cél:

- az accommodation képek külön `public/images` deployja megszűnjön
- a deploy fókusza a buildelt `dist/assets` feltöltésére és validálására kerüljön

Kapcsolódó fájl:

- `.github/workflows/deploy-ujsite.yml`

### Kép admin

Most még nem ez az elsődleges feladat, de később ezt kell hozzáigazítani:

- ne WP media admin legyen
- Astro asset registry manager legyen
- lokális assetállapotot, sorrendet, SEO mezőket és hiányosságokat mutasson
- mutassa a WebP-konverziós állapotot
- mutassa a hiányzó vagy jóvá nem hagyott SEO mezőket
- tudja ellenőrizni a névkonvenció sérüléseit

Kapcsolódó fájl:

- `src/admin-disabled/image-admin.astro`

## Megvalósítási sorrend

### 1. Astro-only szabály véglegesítése

Feladat:

- jóváhagyni, hogy csak `src/assets` marad
- rögzíteni a könyvtár- és fájlnévszabályt

Kimenet:

- jóváhagyott szabályrendszer

### 2. Asset-ek átnevezése és egységesítése

Feladat:

- minden szállás képállományának átnevezése az új konvencióra
- gallery/thumb/hero/card készlet egységesítése
- a meglévő nyers képekből a végleges WebP és thumb készlet előállítása

Kimenet:

- egységes lokális fájlstruktúra

### 3. Registry tisztítása

Feladat:

- a teljes accommodation image registry átállítása Astro-local assetekre
- WP és `public/images` útvonalak eltávolítása
- a SEO mezők Astro-only registry logikához igazítása

Kimenet:

- egyetlen igazságforrású registry

### 4. Adapterek egyszerűsítése

Feladat:

- a vegyes útvonal-feloldások kivétele
- buildidős hibatűrés helyett buildidős hibajelzés

Kimenet:

- egyszerűbb és stabilabb képlogika

### 5. Template-ek átállítása

Feladat:

- galéria, hero, kapcsolódó szállások, homepage blokkok átnézése
- ahol szükséges, Astro `Image`-re és egységes asset adatra átállítás

Kimenet:

- minden megjelenített kép ugyanabból a rendszerből jön

### 6. Deploy egyszerűsítése

Feladat:

- accommodation képek külön deployágának kivezetése
- `dist/assets` ellenőrzés és validáció megtartása

Kimenet:

- kisebb driftkockázat

### 7. Kép admin újratervezése

Feladat:

- a Kép adminot az Astro-only rendszerhez igazítani
- assetellenőrzés, sorrendkezelés, SEO mezők, hiányjelzés
- WebP-konverziós állapot és thumb-ellenőrzés
- jóváhagyott / draft SEO állapot kezelése

Kimenet:

- megbízható admin felület az új modellhez

## Fontos technikai elv

Az új rendszerben a hibák ne élesben derüljenek ki, hanem már build közben.

Ez azt jelenti:

- ha egy registry-bejegyzéshez nincs lokális asset, az legyen hiba
- ne maradjon csendes fallback régi útvonalakra
- a hibák legyenek determinisztikusak, ne “random” jellegűek

## Mi maradjon meg az új rendszerben

- Astro `Image`
- lokális `src/assets` alapú assetkezelés
- egységes registry
- buildelt `/assets/...` runtime képutak
- deploy utáni asset health-check
- tudatos WebP-konverzió
- strukturált képi SEO adat

## Mi szűnjön meg

- WordPress runtime képforrás
- `public/images/accommodations/...` mint élő képrendszer
- vegyes Astro/WP/public fallback
- többféle fájlnévszabály
- olyan adminlogika, amely a régi rendszert tekinti elsődlegesnek

## Következő lépés

E dokumentum alapján a következő munkafázis a konkrét átállítás megkezdése:

1. névkonvenció rögzítése
2. WebP / thumb / hero-mobile szabály véglegesítése
3. assetek átnevezése
4. registry refaktor
5. adapter és template tisztítás
6. deploy egyszerűsítés
7. Kép admin Astro-only újratervezése

Ezután lehet a Kép admint az új Astro-only rendszerhez igazítani.

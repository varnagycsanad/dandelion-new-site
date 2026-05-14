[CHANGE 2026-05-02 00:00] File-based Astro image pipeline véglegesítése: WordPress media, image-admin, REST és runtime képforrás kivezetése.
[CHANGE 2026-04-26 00:00] Projekt szintű képkezelési szabályrendszer hozzáadva: nyers JPG → WebP workflow, központi image registry, SEO képadatok, fókuszpont, responsive képek, cache/verziózás és lakásoldali képalapelvek frissítése.
[CHANGE 2026-05-03 00:00] AI alapú SEO draft és lakásoldali sablonrendszer szabályok hozzáadva: képi SEO draft csak jóváhagyással élesíthető, a lakásoldalak pedig közös AccommodationPage sablonból, apartmentKey-alapú adatfájlokkal épülhetnek.

# DANDELION – DESIGN & STRUCTURE RULES

## 1. ALAPELV

A Dandelion egy prémium, természetközeli vendégház márka.

A weboldal célja:
- bizalomépítés
- hangulat átadás
- foglalás ösztönzés

Nem cél:
- klasszikus szálláslista
- túlzott UI design
- modern tech kinézet

---

## 2. OLDAL STRUKTÚRA (KÖTELEZŐ)

A főoldal fix sorrendje:

1. Hero  
2. RegionStories (Szállások)  
3. Experiences (Élmények)  
4. Map  
5. Why  
6. Booking  
7. Blog  
8. Closing CTA  
9. Footer  

---

## TILOS

- új szekció hozzáadása
- sorrend módosítása
- blokk törlése

---

## 3. HERO

### Cél:
érzelmi belépési pont

### Tartalom:
- videó háttér
- overlay szöveg
- CTA

### Szöveg:
- REGGEL HEGYEKKEL  
- ESTE CSILLAGOKKAL  

### CTA:
→ #stays

---

## HERO TIPOGRÁFIA

- serif font
- uppercase
- nagy letter-spacing
- elegáns

---

## TILOS

- sans-serif hero
- kisbetűs hero
- túl vastag betű

---

## 4. SZÁLLÁS BLOKK (REGIONSTORIES)

### ID:
#stays

### LOGIKA

NEM:
- lista
- grid
- kártyás felsorolás

HANEM:
- 3 régió történet

---

### Régiók:

1. Tapolcai-medence  
2. Balaton mellett  
3. Káli-medence  

---

### Tartalom:

- nagy kép
- overlay szöveg
- rövid leírás
- CTA

---

## TILOS

- accommodation grid
- automatikus lista render
- túl sok kártya

---

## 5. ÉLMÉNYEK

### ID:
#elmenyek

### Tartalom:
- túra
- bor
- Balaton
- természet

### Forma:
- kép + cím + rövid szöveg

---

## 6. TÉRKÉP

- Google Maps alapú
- kulcspontok:
  - Kisapáti
  - Badacsony
  - Keszthely
  - Köveskál

### Layout:
- desktop: 2 oszlop
- mobil: stacked

---

## 7. WHY BLOKK

- természetközeli
- csend
- minőség
- családbarát

---

## 8. FOGLALÁS BLOKK

- SabeeApp integráció
- dátum választás
- CTA: foglalás / ár ellenőrzés

---

## 9. BLOG

- kirándulás
- környék
- SEO tartalom

---

## 10. ZÁRÓ CTA

- foglalás ösztönzés
- bizalom

---

## 11. FOOTER

- kapcsolat
- email
- telefon
- jogi

---

## 12. NAVIGÁCIÓ

- Szállások → #stays
- Élmények → #elmenyek

---

## TILOS

- más anchor
- JS scroll hack

---

## 13. TYPOGRAPHY

---

### BODY / UI FONT

Poppins

---

### HERO FONT

Playfair Display

---

### FONT SZABÁLY

| Elem | Font |
|------|------|
| Hero | Playfair |
| Minden más | Poppins |

---

## TILOS

- több mint 2 font
- random font használat

---

## HERO BEÁLLÍTÁS

- letter-spacing: 0.15–0.25em
- line-height: ~1.1
- weight: 500–600

---

## Poppins súlyok

- body: 400  
- menu: 600  
- heading: 700  

---

## 14. SZÍNEK

---

### PRIMARY

#D99E2B

---

### TEXT

#000000

---

### BACKGROUND

#FDFBF7

---

## HASZNÁLAT

### #D99E2B
- CTA
- hover
- kiemelés

---

## TILOS

- kék UI
- neon színek
- gradient

---

## 15. UI SZABÁLYOK

---

### Border radius

5px vagy 8px

---

### Gomb

- vékony keret
- letisztult
- elegáns

---

### Árnyék

- minimális vagy nincs

---

## TILOS

- material design
- glassmorphism
- erős shadow

---

## 16. HEADER

---

### Desktop

- HERO felett: transparent
- scroll után: színes

---

### Tablet

- nincs hamburger

---

### Mobil

- hamburger OK

---

### LOGÓ

- fix
- nem animál

---

## TILOS

- header redesign
- logó animáció

---

## 17. UX ELV

---

- nagy képek
- kevés szöveg
- tiszta struktúra
- storytelling

---

## TILOS

- zsúfolt layout
- túl sok információ
- tech UI

---

## 18. KÉPKEZELÉS / IMAGE WORKFLOW

---

### AKTUÁLIS MŰKÖDÉSI MÓD

A Dandelion képkezelés jelenlegi forrása az Astro projekt.

A pipeline:
1. `source-images/accommodations/...` JPG forrásképek
2. script alapú fájlnév-normalizálás
3. WebP + thumbnail generálás
4. AI SEO draft generálás
5. kézi review
6. központi registry
7. Astro build

Jelenleg nem használunk:
- WordPress médiatárat
- image-admin felületet
- REST endpointot
- runtime képforrást
- `public/images/accommodations/...` alapú végleges frontend képrendszert

---

Ez a fejezet a Dandelion teljes honlapjának képkezelési alapszabálya. Nem D2-specifikus, hanem minden oldalra, minden lakásra, minden hero/kártya/galéria/blog képre vonatkozik.

A Dandelion honlapon a képek nem kezelhetők véletlenszerű WordPress média URL-ekkel, hardcoded külső linkekkel vagy kézi másolgatással.

A képrendszer célja:
- gyors oldalbetöltés
- kontrollált WebP képek
- egységes SEO képadatok
- lakásonként rendezett galéria
- mobil és desktop képek külön kezelése
- hosszú távon karbantartható képstruktúra

A szabály hatálya:
- főoldali hero / videó poster / képek
- RegionStories képek
- Experiences képek
- szálláskártya képek
- lakásoldali hero képek
- lakásoldali mobil hero képek
- galériák
- thumbnail képek
- blogképek
- SEO képek
- file-based registry képek
- source-images alapú képfeldolgozás

---

### ALAPELV

A WordPress médiatár jelenleg nem része a képkezelési pipeline-nak.

Nem használható képforrásként, fallbackként vagy SEO-adat forrásként.

Az image-admin jelenleg legacy/elhagyott irány.

A végleges SEO képadat az Astro projekt image registryjében készül és ott kezelendő.

A végleges frontend képek forrása:

- optimalizált WebP fájl
- `src/assets/...`
- `src/data/images/...`
- lakáskulcs / apartmentKey alapú hozzárendelés

A frontend végső igazságforrása kizárólag `src/assets/...` és `src/data/images/...`.

A publikus oldalon a runtime képek Astro által generált `/assets/...` útvonalon jelennek meg.

---

### NYERS KÉPEK

A nyers, eredeti képek külön archívumban maradnak.

Jelenlegi döntés:
- az eredeti fotók pCloudon vannak kezelve
- a telefon JPG formátumban ment
- HEIC feldolgozással nem kell számolni
- az eredeti JPG képeket nem kell végleg törölni

A nyers kép nem kerül közvetlenül az éles oldalra.

---

### KÉPFELDOLGOZÁSI FOLYAMAT

Kötelező elv:

1. JPG forrás bemásolása `source-images/accommodations/{apartmentKey}/`
2. fájlnév-normalizálás
3. WebP + thumbnail generálás
4. registry draft létrehozás/frissítés
5. AI SEO draft generálás `approved: false` értékkel
6. kézi review / javítás
7. jóváhagyott registry használata Astro oldalon
8. build után a `dist` feltöltése

Kötelező kimenetek:

- minden publikált tartalmi kép `webp`
- külön `gallery` és külön `thumb`
- hero esetén külön `desktop` és külön `mobile`
- a nyers JPG nem lehet közvetlen frontend forrás

---

### KÉPVERZIÓK

Egy nyers képből több webes verzió készülhet.

Példa:

```txt
eredeti:
d2-kert-01-original.jpg

webes verziók:
dandelion-d2-kisapati-kert-terasz-hero-desktop.webp
dandelion-d2-kisapati-kert-terasz-hero-mobile.webp
dandelion-d2-kisapati-kert-terasz-card.webp
dandelion-d2-kisapati-kert-terasz-gallery.webp
dandelion-d2-kisapati-kert-terasz-thumb.webp
```

Az Astro-only egységes végcél névkonvenció:

```txt
dandelion-<slug>-hero-desktop-01.webp
dandelion-<slug>-hero-mobile-01.webp
dandelion-<slug>-gallery-001.webp
dandelion-<slug>-thumb-001.webp
dandelion-<slug>-card-01.webp
```

Vegyes régi minták nem maradhatnak végleges szabályként:

- `source-001`
- egyedi, lakásonként eltérő manuális nevek

---

### AJÁNLOTT MÉRETEK

Hero desktop:
- kb. 1920 px széles
- széles, panorámás vágás

Hero mobile:
- kb. 900–1100 px széles/magas kontextustól függően
- mobilra külön komponált kép
- nem automatikusan a desktop kép levágása

Card:
- kb. 700–900 px széles
- egységes kártya arány

Gallery:
- kb. 1400–1800 px széles
- jó minőségű, de nem eredeti méretű kép

Thumbnail:
- kb. 400–600 px széles
- gyors előnézethez

---

### KÉPARÁNY ÉS VÁGÁS

A képfeldolgozás nem csak átméretezés.

Minden fontos képhez figyelni kell:
- képarány
- fókuszpont
- mobil vágás
- desktop vágás
- kártya vágás

Ajánlott szerepek:

Hero desktop:
- 16:9 vagy szélesebb
- hangulati, nagy tér

Hero mobile:
- állóbb / szűkebb kompozíció
- fontos rész középen vagy megadott fókuszponton

Card:
- 4:3 vagy 3:2
- tiszta, jól felismerhető fő téma

Gallery:
- eredeti arányhoz közelebb
- ne legyen túl agresszíven vágva

Thumbnail:
- egységes arány
- gyors vizuális azonosítás

---

### FÓKUSZPONT

Hero és card képeknél kötelező fókuszpontot kezelni.

Példák:

```txt
center center
52% center
left center
45% 40%
```

Mobil hero esetén különösen fontos, hogy a kép ne vágja le:
- házat
- teraszt
- ágyat
- medencét
- panorámát
- fontos belső részletet

---

### FÁJLNÉV SZABÁLY

A webes képfájl neve legyen:
- kisbetűs
- ékezet nélküli
- szóköz nélküli
- kötőjeles
- rövid, de leíró
- SEO szempontból értelmes
- kulcsszóhalmozás nélküli

Ajánlott minta:

```txt
dandelion-<slug>-hero-desktop-01.webp
dandelion-<slug>-hero-mobile-01.webp
dandelion-<slug>-gallery-001.webp
dandelion-<slug>-thumb-001.webp
dandelion-<slug>-card-01.webp
```

Példák:

```txt
dandelion-d2-hero-desktop-01.webp
dandelion-d2-hero-mobile-01.webp
dandelion-d2-gallery-001.webp
dandelion-d2-thumb-001.webp
dandelion-d2-card-01.webp
```

TILOS:

```txt
IMG_1234.webp
ujkep.webp
d2-1.webp
szep-kep.webp
dandelion-szallas-balaton-kisapati-vendeghaz-legjobb-olcso-csaladi.webp
```

---

### SEO KÉPADATOK

Minden frontendben használt képhez legyen strukturált SEO adat.

Minimum mezők:

- id
- apartmentKey
- role
- room / téma
- src
- width
- height
- alt.hu
- alt.en
- title.hu
- title.en
- caption.hu
- caption.en
- sortOrder
- focusPoint
- sourceOriginal
- status

Később bővíthető:
- alt.de
- title.de
- caption.de
- sourceFile
- license
- fileSize
- dominantColor

---

### AI ALAPÚ SEO DRAFTOK

Az AI használható képi SEO adatok előkészítésére, de csak draftként.

Az AI nem végleges igazságforrás.

Cél:
- gyorsabb alt/title/caption előkészítés
- magyar és angol képleírások vázlata
- képek tartalmi rendszerezése
- emberi review támogatása
- SEO mezők előzetes kitöltése a kézi ellenőrzéshez

Az AI által generált szöveg nem végleges frontend adat.

Minden AI draftnál kötelező:
- `approved: false`
- emberi ellenőrzés
- képen ténylegesen látható tartalomhoz kötött leírás
- kulcsszóhalmozás kerülése
- magyar és angol mezők előkészítése
- meglévő jóváhagyott SEO adat megőrzése

Elfogadott draft jelölés:

```ts
seoDraft: {
  approved: false,
  altHu: "...",
  titleHu: "...",
  captionHu: "...",
  altEn: "...",
  titleEn: "...",
  captionEn: "..."
}
```

A `seoDraft` nem azonos a végleges SEO adattal.

Végleges adat külön jóváhagyási döntés alapján kerülhet éles mezőbe.

Az `approved: false` draft státusz, nem hiba és nem blokkoló állapot.

TILOS:
- AI által generált alt szöveget automatikusan élesíteni
- `approved: true` értéket automatikusan beállítani
- képen nem látható elemet beleírni
- túlmarketingelt vagy kulcsszóhalmozott alt szöveget használni
- AI drafttal meglévő jóváhagyott adatot felülírni
- AI draft miatt képstruktúrát vagy registry formátumot önállóan áttervezni
- AI draftot emberi review nélkül publikálni

---

### ALT SZÖVEG

Az alt szöveg ne fájlnév legyen.

Az alt:
- természetes mondat legyen
- írja le, ami ténylegesen látható
- ne legyen kulcsszólista
- ne állítson olyat, ami nincs a képen
- magyar és angol mezővel készüljön

Jó példa:

```txt
Dandelion D2 vendégház kertje fedett terasszal Kisapátiban
```

Rossz példa:

```txt
szállás Kisapáti vendégház Balaton-felvidék családi szállás Dandelion D2 olcsó szállás
```

---

### TITLE ÉS CAPTION

A title rövid belső / megjeleníthető képnév.

Példa:

```txt
D2 kert és fedett terasz
```

A caption hosszabb, emberibb képaláírás lehet.

Példa:

```txt
Fedett terasz a D2 vendégház kertjében, közvetlen kijárattal a nappaliból.
```

Nem minden képen kötelező megjeleníteni a captiont, de az adatmodellben legyen helye.

---

### NYELVI SZABÁLY

A fájlnév lehet magyar alapú, de ékezet nélkül.

Példa:

```txt
dandelion-d2-kisapati-kert-terasz-gallery-01.webp
```

Az alt/title/caption viszont nyelvenként kezelendő:

```txt
alt.hu
alt.en
caption.hu
caption.en
```

Később német mező is hozzáadható:

```txt
alt.de
caption.de
```

---

### EXIF ÉS METAADAT

Webre kerülő képeknél törölni kell:
- GPS adat
- kamera EXIF
- felesleges metaadat
- telefonos privát adatok

A webes WebP kép ne tartalmazzon szükségtelen privát vagy technikai információt.

---

### SZÍN ÉS MINŐSÉG

A webes képeknél egységes cél:
- sRGB színprofil
- WebP formátum
- jó vizuális minőség
- kontrollált fájlméret

Irányadó WebP quality:
- hero: kb. 80–85
- gallery: kb. 78–85
- card: kb. 75–82
- thumbnail: kb. 70–78

A pontos érték képenként módosítható, ha vizuálisan indokolt.

---

### PERFORMANCE SZABÁLY

Nem minden kép lehet eager.

Kötelező logika:

Hero / LCP kép:
- preload engedélyezett
- eager engedélyezett
- fetchpriority="high" engedélyezett

Galéria:
- lazy loading
- nagy kép csak szükség esetén
- thumbnail külön kezelhető

Kártyaképek:
- alapból lazy
- csak indokolt esetben lehet eager

Lightbox:
- ne töltse be előre feleslegesen az összes nagy képet

---

### RESPONSIVE IMAGE SZABÁLY

Fontos képeknél törekedni kell:
- picture elemre
- srcset használatra
- sizes használatra
- külön mobil / desktop forrásra

Különösen:
- hero képek
- kártyaképek
- nagy galériaképek

CSS background-image csak dekoratív képnél használható.

Fontos SEO / tartalmi kép lehetőleg ne csak CSS háttérként jelenjen meg.

---

### KÖZPONTI IMAGE REGISTRY

A frontend képek végső forrása központi image registry legyen az Astro projektben.

Jelenlegi registry irány:

```txt
src/data/images/...
```

Átmeneti draft/test JSON is használható, például:

```txt
src/admin-disabled/data/images/accommodation-images.seo-test.json
```

A végleges adatforrás később TS vagy JSON lehet, de továbbra is az Astro projektben marad.

A registry lakásonként kezelje:

- hero.desktop
- hero.mobile
- card
- gallery[]
- thumbnail
- alt/title/caption mezők
- fókuszpont
- sorrend
- státusz

A registry legyen az igazságforrás a frontend számára.

Nem lakásoldali képeknél is központi, strukturált image registry / képadat modell szerint kell gondolkodni:
- főoldali hero
- videó poster
- RegionStories
- Experiences
- szálláskártyák
- blog / SEO képek

---

### KÉP STÁTUSZOK

Képek törlése nem történhet azonnal véglegesen.

Ajánlott státuszok:

```txt
active
hidden
archived
deleted
```

Jelentés:

active:
- megjelenik az oldalon

hidden:
- nem jelenik meg, de még használható később

archived:
- régi / lecserélt kép, nem aktív

deleted:
- törlésre jelölt vagy véglegesen eltávolított

---

### CACHE ÉS VERZIÓZÁS

Képcsere esetén kerülni kell, hogy a böngésző régi képet mutasson.

Elfogadott megoldás:
- új fájlnév
- verziózott fájlnév
- hash alapú fájlnév

Példa:

```txt
dandelion-d2-kisapati-kert-terasz-gallery-01-v2.webp
```

Azonos fájlnévre új képet menteni csak tudatos cache-kezeléssel szabad.

---

### KÜLSŐ KÉPEK

Külső képek használata csak átmeneti lehet.

Jelölni kell, ha a kép forrása:
- saját
- Unsplash
- Pexels
- egyéb

Hosszú távú cél:
- saját Dandelion képek használata
- külső placeholder képek kivezetése

---

### TILOS

- nyers telefonos JPG közvetlen használata éles oldalon
- random WordPress média URL hardcode-olása komponensbe
- WordPress media URL használata
- image-admin visszakötése
- REST alapú képbetöltés
- runtime képforrás
- SEO-adatok WordPressből olvasása
- `IMG_1234` jellegű fájlnév használata
- alt szöveg nélküli tartalmi kép
- kulcsszóhalmozott alt szöveg
- desktop hero kép automatikus mobilra vágása ellenőrzés nélkül
- minden kép eager betöltése
- fontos SEO kép kizárólag CSS background-image-ként
- eredeti képek végleges törlése archívum nélkül
- képek kézi, lakásonként eltérő logikával történő bekötése

---

## 19. LAKÁSOLDALAK / APARTMENT PAGES

---

### ALAPELV

A lakásoldalak fejlesztése nem történhet kézi másolgatással minden új lakásnál.

A lakásoldalak kötelező fejlesztési iránya:
- közös sablon
- adatvezérelt működés
- apartmentKey-alapú logika
- központi image registry
- D2-vel azonos vizuális és strukturális működés

A D2 oldal a vizuális prototípus.

A cél nem új design.
A cél nem új oldalépítés.
A cél a D2 kinézet és működés reprodukálása közös sablonból.

---

### KÖTELEZŐ ARCHITEKTÚRA

Közös lakásoldali sablon:

```txt
src/templates/AccommodationPage.astro
```

Lakásoldali adatfájlok:

```txt
src/data/accommodations/*.ts
```

Javasolt fájlstruktúra:

```txt
src/
  templates/
    AccommodationPage.astro

  data/
    accommodations/
      index.ts
      accommodation-types.ts
      d2.ts
      fugehaz.ts
      d1.ts
      zsalya.ts
      szololiget.ts
      szepvolgyi.ts
      royal-homes.ts
      vintage.ts

    images/
      accommodation-images.ts
```

Lakásoldali page fájlok:

```txt
src/pages/dandelion-d2.astro
src/pages/dandelion-fugehaz.astro
src/pages/dandelion-zsalya.astro
src/pages/dandelion-d1.astro
...
```

A page fájlok csak vékony wrapperként működhetnek.

Feladatuk:
- apartmentKey kiválasztása
- megfelelő adat betöltése
- közös `AccommodationPage.astro` sablon meghívása

Nem tartalmazhatnak:
- saját layoutot
- saját hero implementációt
- saját galéria implementációt
- saját fact ikon logikát
- saját mobil tördelést
- saját CSS rendszert
- D2-ből bemásolt egyedi HTML-struktúrát

---

### SZÉTVÁLASZTÁS: SABLON VS ADAT

A lakásoldali rendszerben szigorúan el kell választani:

1. sablon / layout
2. lakásonkénti adat

A sablon felel minden közös vizuális és működési logikáért.

Az adatfájl felel minden lakásonként változó tartalomért.

---

### SABLON FELELŐSSÉGE

A közös `AccommodationPage.astro` sablon felelőssége:

- hero layout
- desktop hero viselkedés
- mobil hero viselkedés
- fact bar / gyors adatok megjelenítése
- fact ikonok hozzárendelése
- intro blokk
- galéria preview
- lightbox működés
- fő leírás blokk
- terek / szobák blokk
- felszereltség blokk
- kinek ajánljuk blokk
- környék blokk
- foglalási CTA blokk
- vissza / kapcsolódó blokk
- mobil / desktop tördelés
- section sorrend
- spacing
- tipográfiai struktúra

A sablon nem lehet lakásonként eltérő.

---

### ADAT FELELŐSSÉGE

Lakásonként kizárólag adat térhet el.

Adatként kezelendő:
- apartmentKey
- slug
- név
- rövid név
- település
- régió
- lokációs leírás
- hero kicker
- hero title
- hero subtitle
- CTA szövegek
- fact értékek
- férőhely
- hálószobák száma
- ágyak száma
- fürdők száma
- felszereltség
- kiemelések
- terek / szobák leírása
- kinek ajánljuk lista
- környék / nearby lista
- SabeeApp tokenek vagy fallback URL
- SEO title
- meta description
- canonical path
- képek apartmentKey alapján a központi image registryből

Az adatfájl nem tartalmazhat layout döntést.

---

### JAVASOLT ADATMODELL

A lakásoldali adatmodell iránya:

```ts
type AccommodationData = {
  key: string;
  slug: string;
  name: string;
  shortName: string;

  location: {
    settlement: string;
    region: string;
    areaLabel: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };

  hero: {
    kicker?: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel?: string;
  };

  facts: AccommodationFact[];

  intro: {
    eyebrow?: string;
    title: string;
    lead: string;
    paragraphs: string[];
  };

  highlights?: {
    title: string;
    items: AccommodationHighlight[];
  };

  spaces?: {
    title: string;
    items: AccommodationSpace[];
  };

  amenities: {
    title: string;
    groups: AccommodationAmenityGroup[];
  };

  idealFor?: {
    title: string;
    items: string[];
  };

  locationBlock?: {
    title: string;
    text: string;
    nearby: string[];
  };

  booking: {
    title: string;
    text: string;
    ctaLabel: string;
    sabee?: {
      openBeA?: string;
      openBeB?: string;
      roomId?: string;
    };
    fallbackUrl?: string;
  };

  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};
```

A pontos típus később módosítható, de az elv nem változhat:
- layout nem adatfájlban van
- adat nem page fájlban van
- kép nem random URL-ből jön
- képi SEO adat nem WordPressből jön
- runtime képforrás nincs

---

### FIX BLOKKSORREND

A lakásoldali sablon blokksorrendje D2 alapján fix.

Tervezett sorrend:

1. Hero
2. Fact bar / gyors adatok
3. Intro / hangulati bevezető
4. Galéria preview
5. Fő leírás / ház bemutatása
6. Terek / szobák / használat
7. Felszereltség
8. Kinek ajánljuk
9. Környék / lokáció
10. Foglalási CTA
11. Kapcsolódó / vissza a szállásokhoz blokk

A sorrend nem változhat lakásonként.

Ha egy lakásnál valamelyik blokkhoz kevesebb adat van:
- a sablon kezelje kulturáltan
- ne készüljön külön layout
- ne készüljön külön oldalváltozat

---

### HERO SZABÁLY

A hero képek forrása kizárólag a központi image registry lehet.

Elvárt logika:

```txt
accommodationImages[apartmentKey].hero.desktop
accommodationImages[apartmentKey].hero.mobile
```

Kötelező:
- külön desktop hero kép
- külön mobil hero kép
- WebP forrás
- fókuszpont figyelembevétele
- LCP / performance figyelembevétele
- csak az oldal fő hero képe lehet preload / eager / fetchpriority high
- D2-vel azonos hero-struktúra és tördelés

TILOS:
- lakásonként külön hero komponens
- lakásonként külön hero CSS
- D2 hero logika kézi másolása
- WordPress media URL
- runtime API képforrás
- fallbackként WP média használata

---

### GALÉRIA SZABÁLY

A galéria forrása kizárólag apartmentKey-alapú image registry lehet.

Elvárt logika:

```txt
accommodationImages[apartmentKey].gallery
```

Kötelező:
- preview grid
- lightbox
- lazy loading
- sortOrder használata
- thumbnail és nagy kép külön kezelése
- alt/title/caption mezők figyelembevétele
- D2-vel azonos vizuális működés

TILOS:
- lakásonként külön galéria implementáció
- D2 galéria kódjának másolása más oldalba
- runtime REST galéria
- WordPress media fallback
- minden nagy galériakép eager betöltése

---

### FACT / IKON LOGIKA

A fact elemek nem lehetnek lakásonként kézzel szerkesztett vizuális blokkok.

Kötelező:
- iconKey-alapú rendszer
- közös ikon mapping
- sablonon belüli ikon hozzárendelés

Példák:

```txt
guests
bedrooms
beds
bathrooms
kitchen
garden
terrace
airConditioning
wifi
parking
family
petFriendly
fireplace
pool
balaton
mountain
```

A lakás adatfájl csak ezt adhatja meg:
- iconKey
- label
- value

Példa:

```ts
{
  iconKey: "guests",
  label: "Vendégek",
  value: "6 fő"
}
```

A sablon dönti el, hogy az iconKey milyen ikont kap.

TILOS:
- ikonok kézi HTML másolása lakásonként
- eltérő fact layout lakásonként
- Fügeház vagy más lakás egyedi ikonrendszere

---

### MOBIL / DESKTOP SZABÁLY

A mobil és desktop viselkedés közös sablonfelelősség.

Desktop:
- széles hero
- D2-vel azonos vizuális ritmus
- fact bar vízszintesen vagy D2 szerinti töréssel
- galéria D2 szerinti rácsban
- felszereltség többoszlopos, ha a D2 struktúra ezt használja
- CTA jól látható, de nem agresszív

Mobil:
- magas hero
- külön mobil kép
- CTA ne nyomja agyon a felületet
- következő blokk ne lógjon be túl korán
- fact elemek kompakt, D2-vel azonos logikában
- galéria mobilon D2-vel azonos logikában
- nem készülhet lakásonként külön mobil layout

TILOS:
- Fügeház mobil nézetét külön javítani sablon nélkül
- D2 mobil CSS másolása új fájlba
- lakásonként eltérő breakpoint logika

---

### SABEEAPP / FOGLALÁSI CTA SZABÁLY

A lakásoldali sablonban a foglalási CTA közös logikával működjön.

Lakásonként adatként kezelendő:
- CTA szöveg
- SabeeApp azonosítók / tokenek
- fallback URL
- esetleges roomId

A sablon felelőssége:
- CTA blokk megjelenítése
- gombstruktúra
- foglalási esemény meghívása
- fallback link kezelése

TILOS:
- lakásonként külön foglalási gomb logika
- SabeeApp működés szétszórása több oldalba
- D2-ből másolt inline foglalási logika
- SabeeApp logika módosítása design task közben

---

### SEO SZABÁLY LAKÁSOLDALAKHOZ

Minden lakás adatfájlban legyen SEO blokk.

Minimum:

```ts
seo: {
  title: "...",
  description: "...",
  canonicalPath: "..."
}
```

A SEO szöveg:
- legyen lakásspecifikus
- legyen természetes
- ne legyen kulcsszóhalmozott
- ne állítson olyat, ami nem igaz
- ne használja automatikusan az AI draftot jóváhagyás nélkül

A képek SEO adatai továbbra is az image registryben kezelendők.

TILOS:
- SEO mező nélkül új lakásoldalt létrehozni
- D2 SEO szövegét más lakásra másolni
- AI SEO draftot automatikusan véglegesként használni

---

### D2 → SABLON MIGRÁCIÓS SZABÁLY

A D2 sablonosítása csak kontrollált lépésekben történhet.

Első lépés:
- D2 audit
- fájlmódosítás nélkül

Vizsgálni kell:
- jelenlegi blokkok sorrendje
- D2-specifikus szövegek
- D2-specifikus adatok
- class struktúra
- galéria működés
- hero működés
- mobil / desktop eltérések
- képforrások
- SabeeApp CTA működés
- mit kell sablonba tenni
- mit kell adatfájlba tenni

Második lépés:
- adatmodell véglegesítése

Harmadik lépés:
- `AccommodationPage.astro` létrehozása vagy kialakítása

Negyedik lépés:
- D2 visszakötése wrapperként

Elfogadási feltétel:
- D2 kinézete nem változik
- desktop azonos
- mobil azonos
- hero működik
- galéria működik
- CTA működik
- build sikeres

---

### FÜGEHÁZ ÉS TÖBBI LAKÁS MIGRÁCIÓS SZABÁLY

Fügeház csak akkor migrálható, ha D2 már közös sablonból működik.

Fügeház nem kaphat külön layoutot.

Fügeház esetén csak ezek készülhetnek:
- `src/data/accommodations/fugehaz.ts`
- image registry kapcsolat apartmentKey alapján
- wrapper page
- szükséges adatfeltöltés

TILOS:
- Fügeház külön oldal javítása sablon nélkül
- Fügeház D2-től eltérő komponensstruktúrája
- új design döntés
- külön galéria
- külön hero
- külön fact ikon rendszer

A többi lakás is ugyanezen a rendszeren keresztül kerülhet be:
- D1
- Zsálya
- Szőlőliget
- Szépvölgyi
- Royal Homes
- Vintage
- további későbbi lakások

---

### KÖTELEZŐ STOP FELTÉTELEK

STOP, ha a task közben bármelyik történne:

- új lakásoldal D2 másolással készülne
- Fügeház külön design javítást kapna
- layout kerülne page fájlba
- hero logika kerülne page fájlba
- galéria logika kerülne page fájlba
- D2-specifikus kód másik lakásba másolódna
- REST vagy runtime képforrás kerülne lakásoldalra
- WordPress media fallback kerülne vissza
- sablon nélküli oldalépítés indulna
- egy taskban több lakás teljes migrációja történne
- SEO mezők D2-ből másolódnának más lakásra
- AI draft automatikusan éles SEO adatként kerülne be

Ilyenkor:

→ STOP  
→ ACCOMMODATION TEMPLATE VIOLATION

---

### VÉGREHAJTÁSI ELV

Lakásoldali fejlesztésnél nem új rendszert kell tervezni.

A helyes irány:

```txt
1 közös sablon
N adatfájl
1 központi image registry
apartmentKey alapú működés
```

A fejlesztés célja:
- meglévő D2 struktúra kontrollált kiemelése
- adat és layout szétválasztása
- minimális diff
- build ellenőrzés
- D2 vizuális működésének megőrzése

Nem cél:
- új design
- új UX
- új galéria rendszer
- új képpipeline
- új foglalási logika
- teljes oldalcsoport egyszerre történő refaktorálása

---

## 20. VÉGSŐ SZABÁLY

---

A design nem változtatható.

A Codex:
- nem tervez
- nem optimalizál UX-et
- nem talál ki új megoldást

Csak:
→ a meglévő rendszert építi tovább

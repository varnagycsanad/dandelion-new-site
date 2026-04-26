[CHANGE 2026-04-26 00:00] Projekt szintű képkezelési szabályrendszer hozzáadva: nyers JPG → WebP workflow, WordPress media import, központi image registry, SEO képadatok, fókuszpont, responsive képek, cache/verziózás és lakásoldali képalapelvek frissítése.

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

Ez a fejezet a Dandelion teljes honlapjának képkezelési alapszabálya. Nem D2-specifikus, hanem minden oldalra, minden lakásra, minden hero/kártya/galéria/blog képre és minden későbbi image-admin fejlesztésre vonatkozik.

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
- WordPress médiából importált képek
- image-admin későbbi fejlesztés

---

### ALAPELV

A WordPress médiatár nem a végleges képtár.

A WordPress médiatárban lévő kép csak forrásanyag lehet.

A WordPress media alt/title/caption mezői nem tekinthetők megbízható SEO forrásnak:
- lehetnek üresek
- lehetnek hiányosak
- lehetnek technikai vagy régi adatok
- lehetnek SEO szempontból rosszak

Ha a WordPress media alt/title/caption mezői üresek vagy hiányoznak, a Codex nem töltheti ki automatikusan éles adatként külön jóváhagyás nélkül.

A végleges SEO képadat az image registryben készül és ott kezelendő.

A végleges frontend képek forrása:

- optimalizált WebP fájl
- központi image registry
- lakáskulcs / apartmentKey alapú hozzárendelés

A WordPress médiatár vagy image-admin később használható:
- feltöltési segédfelületként
- válogatási felületként
- forrásként
- admin rétegként

De a frontend végső igazságforrása nem lehet szétszórt WordPress média URL.

A frontend nem használhatja végleges képként a nyers WordPress JPG URL-t.

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

1. Telefonos JPG elkészül
2. Eredeti kép pCloud archívumban megmarad
3. Kép kiválasztása adott lakáshoz
4. Szerep meghatározása:
   - hero desktop
   - hero mobile
   - card
   - gallery
   - thumbnail
5. WebP verziók legyártása
6. SEO adatok megadása
7. Központi image registry frissítése
8. Astro frontend csak a kész, optimalizált képeket használja

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
dandelion-{apartmentKey}-{telepules}-{tema}-{role}-{sorszam}.webp
```

Példák:

```txt
dandelion-d2-kisapati-kert-terasz-gallery-01.webp
dandelion-d2-kisapati-emeleti-haloszoba-gallery-02.webp
dandelion-zsalya-szent-gyorgy-hegy-panoramas-terasz-hero-desktop.webp
dandelion-fugehaz-kisapati-kert-card.webp
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
- sourceWpId
- license
- fileSize
- dominantColor

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

A frontend képek végső forrása központi image registry legyen.

Lakásképeknél javasolt fájl:

```txt
src/data/accommodation-images.ts
```

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
- WordPress
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

A lakásoldalak fejlesztése nem történhet kézi másolgatással minden új lakásnál.

Kötelező elv:
- minden lakásoldal apartmentKey-alapú legyen
- a közös logika újrahasznosítható legyen
- a Hero desktop / Hero mobile kép a központi image registryből jöjjön
- a galéria képei apartmentKey alapján jöjjenek
- a kártyakép, hero kép, galéria és SEO képadatok egységes képrendszerből származzanak
- a WordPress image-admin / REST config csak admin vagy forrás segédréteg lehet, nem végleges frontend igazságforrás
- lakásonként csak az apartmentKey, szöveg, adatok és fallback képek térhetnek el

Példa:

dandelion-d2.astro → apartmentKey: "d2"  
dandelion-d1.astro → apartmentKey: "d1"  
dandelion-figehaz.astro → apartmentKey: "figehaz"  
dandelion-zsalya.astro → apartmentKey: "zsalya"  

A későbbi admin / REST hívás kulcs alapján történhet:

/wp-json/dandelion/v1/apartment-image-config/{apartmentKey}

Ez azonban csak szerkesztési vagy adatforrás réteg lehet.

A frontend build végső képei és SEO adatai a központi image registryből jöjjenek.

---

## TILOS

- minden lakásoldalhoz külön hero logikát írni
- fixen d2-re kötött logikát más oldalakra másolni
- új REST endpointot létrehozni lakásonként
- gallery vagy hero logikát lakásonként külön szétágaztatni
- 9 új lakásoldalt kézzel, sablonosítás nélkül lemásolni

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

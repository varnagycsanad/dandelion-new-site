[CHANGE 2026-04-26 00:00] Projekt szintű képkezelési végrehajtási szabályok hozzáadva: WebP, image registry, file-based Astro image pipeline, SEO képadatok, fókuszpont, performance és scope korlátok.
[CHANGE 2026-05-03 00:00] AI / SEO draft végrehajtási szabály hozzáadva: AI csak előkészítő draftot készíthet, jóváhagyás nélkül nem kerülhet éles SEO adatba.
[CHANGE 2026-05-03 00:00] Lakásoldal sablonosítás végrehajtási szabály hozzáadva: lakásoldal nem épülhet egyedi oldalként, csak közös AccommodationPage sablonból és apartmentKey-alapú adatból.

## MASTER META-SZABÁLY (NORMATÍV HELYEK)

Ebben a master fájlban egy témának csak egy normatív helye lehet.
Duplikált szabályblokk nem maradhat.
Frissítéskor a meglévő blokkot kell módosítani, nem új ismétlést beszúrni.

---

# DANDELION – AGENT RULES (LEAN)

## ALAPELV

Cél: stabil, gyors, kontrollált végrehajtás

Nem cél:
- refaktor
- újratervezés
- architektúra csere
- scope bővítés
- “ha már itt vagyok” módosítás

Minden módosítás:
- kicsi
- célzott
- visszakövethető

Kötelező:
[CHANGE YYYY-MM-DD HH:MM] rövid leírás

---

## EXECUTION MODE

A Codex végrehajtó.

Feladata:
- a kapott task végrehajtása
- a kijelölt fájl módosítása
- scope nem bővíthető

TILOS:
- alügynök
- task bontás
- extra javítás
- önálló redesign a prompton túl

---

## WORKSPACE

Kizárólag ebben a mappában dolgozhat:

C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site

Csak ez a projekt a forrás.
Nem dolgozhat a szerveren.
Nem dolgozhat FTP/VPN mappában.
Nem a `dist` a szerkesztési forrás.

---

## SOURCE OF TRUTH

A projekt mesterverziója a helyi Astro projektmappa.

Ez a forrás:
- `src/`
- `public/`
- config fájlok
- komponensek
- oldalak
- tartalom

A `dist/` nem forráskód.
A `dist/` csak build output.

TILOS:
- a `dist` fájlokat szerkeszteni forrásként
- a szerveren kézzel javítgatni a publikus HTML/CSS/JS fájlokat
- a VPN/FTP másolatot tekinteni elsődleges projektnek

---

## DEPLOY MODEL

A projekt publikus része static buildként készül.

Workflow:
1. Codex a helyi projektmappában dolgozik
2. helyi build fut
3. a kész `dist/` tartalma kerül feltöltésre a szerverre
4. böngészős ellenőrzés az almappás teszt URL-en

Jelenlegi teszt publish cél:
- szerveren: `/ujsite/`
- publikus teszt URL: `https://dandelionhouse.hu/ujsite/`

FONTOS:
- a szerverre nem a teljes projekt kerül fel
- nem a `src/`
- nem a `node_modules/`
- nem a repo gyökere
- kizárólag a `dist` BELSEJE

Elvárt szerverstruktúra:
- `/ujsite/index.html`
- `/ujsite/_astro/...`
- `/ujsite/favicon.ico`
- `/ujsite/favicon.svg`

NEM jó:
- `/ujsite/dist/index.html`

---

## PUBLIC SITE VS ADMIN SPLIT

A projekt jelenleg két logikai részre válik:

1. publikus honlap
2. admin / szerveroldali tooling

Az első publikus release célja:
- csak a publikus site
- static-only build
- szerverre feltölthető `dist`

Az admin rész jelenleg nem része a publikus static buildnek.

Admin / disabled területek:
- `image-admin` (nem használt, csak legacy)
- `wp-media-test`
- korábbi `src/pages/api/image-admin/*`

Fontos:
- a képkezelés NEM használ WordPress admin felületet
- a képkezelés NEM használ REST endpointokat
- minden kép fájlalapú pipeline-on keresztül kerül be

A Codex funkcionális publikus tasknál ne próbálja ezeket visszakötni.
Ha a feladat az adminra vonatkozik, az külön task.

---

## FILE RULE

1 task = 1 logikai módosítás  
alapból 1 fő fájl

Ha több kell:
- csak akkor engedett, ha közvetlenül ugyanahhoz az egy hibához szükséges
- ha a diff túl nagy lenne: STOP

Ha a task frontend publikus megjelenést érint, a build kötelező.

---

## PRE-CHECK

Task előtt:
1. legkisebb érintett fájl
2. scope ok?
3. encoding ok?
4. nem admin/public keveredés-e?

---

## ENCODING (KRITIKUS)

Elvárt: UTF-8

### NEM hiba:
- magyar ékezet
- Unicode karakter
- editor highlight
- nem ASCII karakter önmagában

### HIBA:
- torz szöveg
- mojibake (`Ã¡`, `Ăł`, `â€`, stb.)
- `�`

### SZABÁLY

Ha az ÉRINTETT sor hibás:
→ STOP  
→ ENCODING ERROR DETECTED

Ha máshol hibás:
→ report only

---

## AGENT / DOC EXCEPTION

Az `AGENT.md`, `AGENTS.md`, `README.md`, `project-docs/` és más dokumentációs fájlok
encoding szempontból nem okozhatnak STOP-ot, kivéve ha a task kifejezetten ezek módosítása.

Dokumentációs példákban szereplő hibás karakterlánc nem számít projektfájl-hibának.

---

## ENCODING TILALOM

Tilos:
- encoding átírás
- teljes fájl tisztítás
- string újraírás mellékesen
- komment javítás mellékesen
- BOM/CRLF/LF konverzió
- teljes text normalization

Kivéve külön encoding task.

---

## DIFF RULE

Tilos:
- teljes fájl újraírás
- automatikus formázás
- whitespace takarítás
- nem érintett blokk módosítása
- unrelated fájlakhoz nyúlni

Ha a diff nagy lenne:
→ DIFF TOO LARGE – STOP

---

## SCOPE RULE

Csak a megadott vagy legszűkebb szükséges fájl.

Ha más is kéne:
→ STOP

Ha a task publikus oldalra szól:
- ne nyúljon adminhoz
- ne nyúljon disabled route-okhoz
- ne próbáljon szerveres mentési logikát visszahozni

Ha a task adminra szól:
- ne nyúljon publikus UI-hoz indokolatlanul

---

## STATIC DEPLOY RULE

Publikus tasknál a Codexnek mindig figyelembe kell vennie, hogy a site jelenleg almappába deployolódik:

Base deploy target:
`/ujsite/`

Ennek következménye:
- asset útvonalaknak működniük kell almappában
- static buildnek `dist` kimenetet kell adnia
- a publikus site nem támaszkodhat SSR-re
- a publikus site nem támaszkodhat Astro API route-ra runtime-ban

Ha a publikus build azért törik el, mert root pathra épül almappa helyett:
- ezt config szinten, minimális diff-fel kell javítani

---

## HOSTING-SAFE ASSET RULE

Publikus static buildnél a generált asset fájlneveknek hosting-safe formát kell követni.

TILOS olyan asset fájlnév, amely tartalmaz:
- `@`
- egyéb problémás speciális karaktert, amit shared hosting / Apache / security layer blokkolhat

Elvárt asset fájlnév-karakterkészlet:
- kis- és nagybetűk
- számok
- kötőjel (`-`)
- aláhúzás (`_`)
- pont (`.`)

KÖTELEZŐ:
- ha buildelt asset név tartalmaz `@` karaktert → configban kell javítani
- NEM dist-ben
- NEM szerveren

---

## IMAGE WORKFLOW RULE

### AKTUÁLIS MŰKÖDÉSI MÓD (KÖTELEZŐ)

A projekt jelenlegi képkezelése:

- teljesen fájlalapú
- nincs WordPress media használat
- nincs image-admin használat
- nincs runtime API

Pipeline:

1. source-images (JPG)
2. script → WebP + thumbnail
3. SEO draft generálás
4. kézi review
5. registry (TS/JSON)
6. Astro build → publikus oldal

A frontend kizárólag:
- `public/images/...`
- `src/data/images/...`

forrásból dolgozik.

---

Ez a szabály nem csak D2-re vonatkozik.

Minden képes taskra érvényes:
- főoldal
- RegionStories
- Experiences
- szálláskártyák
- lakásoldalak
- hero képek
- mobil hero képek
- galériák
- thumbnail képek
- blog / SEO képek
- fájlalapú pipeline-ból érkező képek
- korábbi image-admin csak legacy, nem fejlesztési irány

Képes feladatoknál a Codex nem kezelheti a képeket véletlenszerű assetként.

KÖTELEZŐ:
- a `DANDELION_RULES.md` képkezelési fejezetét be kell olvasni
- a frontendben használt kép végső forrása optimalizált WebP legyen
- a kép hozzárendelése apartmentKey / image registry alapú legyen, ahol lakáshoz kapcsolódik
- nem lakásoldali képnél is központi, strukturált image registry / képadat modell szerint kell gondolkodni
- fontos tartalmi képhez legyen alt adat
- hero és card képeknél figyelni kell a mobil/desktop vágásra és fókuszpontra
- képes módosításnál ellenőrizni kell a PageSpeed/LCP kockázatot

Nyers képek:
- az eredeti JPG-k pCloud archívumban maradnak
- a nyers telefonos JPG nem frontend asset
- HEIC feldolgozással jelenleg nem kell számolni
- eredeti képet nem szabad törölni vagy lecserélni

WordPress média:
- JELENLEG NEM HASZNÁLT
- nem része a pipeline-nak
- nem használható sem forrásként, sem fallbackként
- minden kép a file-based pipeline-ból jön

Frontend képek:
- a publikus oldalon ne használjon nyers JPG-t közvetlenül
- ne hardcode-oljon random WordPress média URL-t komponensbe
- ne használjon `IMG_1234` jellegű fájlnevet
- ne hozzon létre új képlogikát oldalonként vagy lakásonként
- ne másoljon D2-specifikus képkezelést más lakásokra

Elvárt képforrás:
- optimalizált WebP
- `public/images/...` vagy később központi image registry által megadott útvonal
- lakásképeknél lakáskulcs alapján rendezett struktúra
- általános oldalképeknél szintén rendezett, szerep-alapú struktúra

SEO képadatok:
- alt szöveg nem lehet kulcsszóhalmozás
- alt szöveg csak azt írhatja le, ami ténylegesen látható
- magyar és angol mezők előkészítése kötelező, ha image registryt érint a task
- caption/title mezők csak akkor módosíthatók, ha a task erre szól

Performance:
- csak az oldal fő LCP/hero képe lehet preload + eager + fetchpriority high
- galéria képei alapból lazy
- thumbnail és nagy galéria kép ne ugyanaz a túlméretes fájl legyen
- nem szabad minden képet eagerre állítani
- CSS background-image fontos SEO képnél kerülendő

TILOS:
- WordPress médiatárat végleges frontend igazságforrásként kezelni
- image-admin / REST réteget önállóan visszakötni publikus taskban
- WordPress vagy image-admin visszakötése
- REST alapú képbetöltés
- runtime képforrás használata
- WP media URL használata bármilyen formában
- képeket tömegesen átnevezni külön task nélkül
- meglévő képstruktúrát refaktorálni külön engedély nélkül
- eredeti JPG-ket törölni
- külső Unsplash/Pexels képeket végleges megoldásként beépíteni
- képoptimalizálási pipeline-t önállóan kitalálni

Ha a képfeladat túlmutat egy fájl vagy egy konkrét kép cseréjén:
→ STOP
→ IMAGE WORKFLOW SCOPE TOO LARGE

---

## AI / SEO DRAFT RULE

Az AI csak előkészítő eszköz, nem végleges igazságforrás.

Használható:
- képek alt/title/caption vázlatainak generálására
- SEO draft készítésére
- szövegvariációk előkészítésére
- adatmezők javaslatára
- képi tartalom előzetes rendszerezésére
- magyar és angol SEO mezők előkészítésére

Nem használható:
- jóváhagyás nélküli éles SEO adatként
- automatikus publikálásra
- képtartalom biztos állítására emberi ellenőrzés nélkül
- olyan alt szöveghez, ami olyat állít, ami a képen nem látható
- meglévő jóváhagyott SEO adat automatikus felülírására
- `approved: true` érték automatikus beállítására

Kötelező logika:
- minden AI által generált képi SEO adat draft státuszú legyen
- alapértelmezett állapot: `approved: false`
- frontend éles SEO mezőbe csak jóváhagyott adat kerülhet
- Codex nem írhatja felül automatikusan a meglévő jóváhagyott SEO adatokat
- AI draft generálás után emberi review szükséges
- AI draft csak akkor használható frontendben, ha külön jóváhagyási logika engedi
- az AI által írt alt szövegnek a képen ténylegesen látható tartalomhoz kell kötődnie
- az AI által írt szöveg nem lehet kulcsszóhalmozott
- magyar és angol mezők előkészítése megengedett, de ezek is draft státuszúak

Elfogadott adatjelölés:

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

Végleges adat csak külön jóváhagyás után kerülhet ilyen vagy ehhez hasonló éles mezőkbe:

```ts
seo: {
  altHu: "...",
  titleHu: "...",
  captionHu: "...",
  altEn: "...",
  titleEn: "...",
  captionEn: "..."
}
```

TILOS:
- AI draftot végleges adatként kezelni
- `approved: true` értéket automatikusan beállítani
- tömeges SEO mezőfelülírás külön task nélkül
- kép alapján nem igazolható állításokat írni
- AI által generált szöveget emberi review nélkül publikálni
- meglévő, jóváhagyott SEO mezőket AI drafttal felülírni
- AI draft generálása miatt képstruktúrát vagy registry formátumot önállóan áttervezni

Ha az AI / SEO draft feladat túlmutat a kijelölt képeken vagy adatmezőkön:
→ STOP
→ AI SEO DRAFT SCOPE TOO LARGE

---

## ACCOMMODATION TEMPLATE EXECUTION RULE

### ALAPELV

Lakásoldali fejlesztésnél a Codex nem hozhat létre egyedi, kézzel összerakott lakásoldalakat.

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

A közös lakásoldali sablon tervezett helye:

```txt
src/templates/AccommodationPage.astro
```

A lakásoldali adatok tervezett helye:

```txt
src/data/accommodations/*.ts
```

A lakásoldali page fájlok tervezett szerepe:

```txt
src/pages/dandelion-d2.astro
src/pages/dandelion-fugehaz.astro
src/pages/dandelion-zsalya.astro
src/pages/dandelion-d1.astro
...
```

Ezek a page fájlok csak vékony wrapperként működhetnek.

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

Ilyenkor:

→ STOP  
→ ACCOMMODATION TEMPLATE VIOLATION

---

### VÉGREHAJTÁSI ELV

Lakásoldali fejlesztésnél a Codex nem tervez új rendszert.

A helyes irány:

```txt
1 közös sablon
N adatfájl
1 központi image registry
apartmentKey alapú működés
```

A Codex feladata:
- meglévő D2 struktúra kontrollált kiemelése
- adat és layout szétválasztása
- minimális diff
- build ellenőrzés
- D2 vizuális működésének megőrzése

Nem feladata:
- új design
- új UX
- új galéria rendszer
- új képpipeline
- új foglalási logika
- teljes oldalcsoport egyszerre történő refaktorálása

---

## BUILD RULE

Publikus site esetén a cél:
- `npm run build`
- sikeres static build
- használható `dist/`

---

## BUILD STEP (KÖTELEZŐ)

1. npm run build  
2. ellenőrizd: sikeres-e  
3. ha hiba: csak azt javítsd  
4. dist-hez nem nyúlunk

---

## GIT RULE

- csak target fájl stage-elhető
- ellenőrzés: `git diff --cached --name-only`
- ha más is benne van → STOP

---

## STOP RULE

STOP ha:
- nem egyértelmű task
- túl nagy diff
- encoding hiba
- scope keveredik
- redesign indul

---

## CHECK

- nincs encoding hiba
- diff kicsi
- build ok
- almappa működik

---

## OUTPUT

RESULT
- Status:
- Modified files:
- Summary:
- Risk:
- Build:

---

## MANUAL PUBLISH CONTEXT

- user tölti fel
- Codex nem deployol
- dist-nek önmagában működnie kell

---

## DANDELION PROJECT RULE FILE

A projekt tartalmaz egy külön szabályfájlt:

`DANDELION_RULES.md`

KÖTELEZŐ:
- minden honlapos task előtt be kell olvasni
- a benne lévő design és struktúra szabályok kötelezőek

Szerepek:
- AGENT.md → működés, scope, build, git, képkezelési végrehajtási korlátok
- DANDELION_RULES.md → design, layout, struktúra, projekt szintű képkezelési alapelvek

Ha UI-t érint a task:
→ DANDELION_RULES az elsődleges

[CHANGE 2026-05-02 00:00] File-based Astro image pipeline véglegesítése: WordPress media, image-admin, REST és runtime képforrás kivezetése.
[CHANGE 2026-04-26 00:00] Projekt szintű képkezelési szabályrendszer hozzáadva: nyers JPG → WebP workflow, központi image registry, SEO képadatok, fókuszpont, responsive képek, cache/verziózás és lakásoldali képalapelvek frissítése.

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
- `public/images/...`
- `src/data/images/...`
- lakáskulcs / apartmentKey alapú hozzárendelés

A frontend végső igazságforrása kizárólag `public/images/...` és `src/data/images/...`.

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

Végleges adat csak kézi jóváhagyás után kerülhet éles mezőbe.

A végleges frontend csak jóváhagyott SEO adatot használhat.

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

# DANDELION – CHATGPT RULES

Ez a fájl a ChatGPT-oldali projektalap a Dandelion honlap fejlesztéséhez. Célja ugyanaz, mint a Codexnél az AGENT / RULES fájloké: új beszélgetésben se kelljen újra elmagyarázni az alapokat.

Ez a fájl ChatGPT-nek szól.

Nem helyettesíti:
- `AGENT.md`
- `DANDELION_RULES.md`
- repo szabályokat
- Codex végrehajtási utasításokat

Szerepe:
- projektmemória
- döntési háttér
- Codex-taskok helyes megfogalmazása
- korábbi félreértések elkerülése
- Dandelion honlap fejlesztési irányának stabilan tartása

---

## 1. Projekt

- Projekt neve: Dandelion honlap / NEW DANDELION HONLAP
- Fő cél: gyors, modern, keresőoptimalizált Dandelion Vendégházak weboldal
- Éles WordPress oldal: `dandelionhouse.hu`
- Astro új oldal útvonal: `/ujsite/`
- Lokális munkamappa:

```text
C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site
```

- Fő repo:

```text
varnagycsanad/dandelion-new-site
```

Fontos:
- a WordPress oldal marad a domain gyökerén
- az Astro oldal statikus buildként a `/ujsite/` alatt fut
- a WordPress nem kerül kidobásra
- az új Astro oldal jelenleg teszt / új site irány
- a szerverre nem a teljes repo kerül, hanem a buildelt `dist` tartalma

---

## 2. Technikai alapok

- Astro statikus site
- Saját tárhelyes deploy, nem Netlify
- Build után a `dist/` tartalma kerül fel a szerver `/ujsite/` mappájába
- Astro base: `/ujsite/`
- Node minimum: `22.12.0`
- Fejlesztési irány: statikus, gyors, kontrollált frontend

Fontos technikai állapot:
- publikus oldal static-only
- nincs SSR
- nincs runtime Astro API használat a publikus site működéséhez
- `/ujsite/` almappás működés miatt az asset útvonalak kritikusak
- `dist/` nem forrás, csak build output

---

## 3. Szerepek

### ChatGPT szerepe

ChatGPT nem elsődleges kódvégrehajtó.

ChatGPT szerepe:

- architekt
- kontroll
- Codex feladatok megírása
- hibák értelmezése
- döntések előkészítése
- scope őrzése
- szabályok értelmezése
- Dandelion projektmemória megtartása
- válaszok rövid, gyakorlati, végrehajtható formába rendezése

ChatGPT ne találjon ki felesleges új rendszereket.

ChatGPT feladata:
- megmondani, mit kell Codexnek pontosan csinálnia
- megmondani, mit NEM szabad csinálni
- megakadályozni a vak refaktort
- megakadályozni a D2 kézi másolását
- megakadályozni a WordPress media / REST / image-admin visszahozását publikus képrendszerbe

### Codex szerepe

Codex szerepe:

- végrehajtó
- kis, pontos taskokat kapjon
- 1 task = 1 logikai módosítás
- minimal diff
- ne refaktoráljon engedély nélkül
- ne tervezzen új architektúrát önállóan
- ne redesignoljon
- ne javítson mellékesen mást

Codexnek mindig pontosan meg kell mondani:
- melyik fájlt olvassa
- melyik fájlt módosíthatja
- mit tilos módosítania
- kell-e build
- kell-e commit/push
- milyen RESULT blokkot adjon vissza

---

## 4. Codex kredit- és modellhasználati szabály

A modellválasztás számít, mert a drágább modellek gyorsabban fogyasztják a kreditet.

### GPT-5.5

Csak komolyabb feladatokra:

- architektúra
- nehéz hibakeresés
- build/deploy probléma
- bonyolult mobil/header/hero viselkedés
- kényes sablonosítási döntések
- amikor olcsóbb modell már többször elakadt

Ne legyen alapmodell egyszerű módosításokra.

### GPT-5.3-Codex vagy GPT-5.4

Alapértelmezett normál honlapfejlesztéshez:

- Astro komponens módosítás
- CSS finomítás
- képbekötés
- mobil nézet javítás
- kisebb strukturális módosítás
- build ellenőrzés
- D2 audit
- adatfájl előkészítés
- kisebb sablonosítási lépések

### GPT-5.4-Mini

Apró, mechanikus feladatokra:

- szövegcsere
- class/id átnevezés
- kisebb CSS értékmódosítás
- git státusz ellenőrzés
- egyszerű fájllista / diff ellenőrzés
- README / dokumentáció apró javítás
- RESULT értelmezés

### Kreditkímélő munkamód

- Codexnek rövid, pontos taskot kell adni.
- Kérni kell, hogy ne magyarázzon hosszan.
- RESULT blokkot kérünk.
- Build csak akkor, ha indokolt.
- Fast mode ne legyen alapból bekapcsolva.
- Automatikus kódellenőrzés csak szükség esetén, főleg a `dandelion-new-site` repón.
- Mellék / régi repóknál automatikus ellenőrzés kikapcsolva.
- Nem kérünk általános review-t minden task után.
- Nem kérünk több fájlos refaktort kis probléma esetén.

---

## 5. Codex feladatok kötelező formája

Minden Codex feladatban szerepeljen:

```text
WORKSPACE LOCK:
C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site
```

Mindig meg kell adni:

- pontos cél
- pontos scope
- mely fájlokat érintheti
- mit tilos módosítani
- build kell-e vagy nem
- commit/push kell-e vagy nem
- eredményblokk formátuma

Alap RESULT blokk:

```text
RESULT
- Status: kész / stop / hiba
- Branch:
- Módosított fájlok:
- Build: futott / nem futott / sikeres / hibás
- Commit: igen / nem
- Push: igen / nem
- Rövid összefoglaló:
- Kockázat:
```

Ha csak audit a feladat:

```text
RESULT
- Status:
- Olvasott fájlok:
- Megállapítások:
- Kockázatok:
- Javasolt következő lépés:
- Módosítás történt-e: nem
```

---

## 6. Dandelion design alapok

Stílus:

- természetközeli
- vidéki prémium
- nem ultramodern
- nagy képek / videók
- letisztult, de meleg hangulat
- nem tech UI
- nem sablonos booking-oldal érzés
- nem kártyaerdő
- nem harsány színek

Font:

- Poppins globálisan
- H1-H2: 700
- menü: 600
- body: 400
- hero esetén lehet Playfair Display, ha a Rules ezt írja

Színek:

- kiemelő: `#D99E2B`
- szöveg: `#000000`
- háttér: `#FDFBF7`

Lekerekítés:

- képek és gombok: 5px vagy 8px

Tilos:
- kék UI
- neon / gradient
- material design
- glassmorphism
- túl erős árnyék
- random font
- design önálló újragondolása Codex által

---

## 7. Header szabályok

Desktop:

- sticky header
- hero felett transparent
- scroll után színes / stabil háttér
- logó stabil, animáció nélkül
- CTA legyen jól látható, de ne túl agresszív

Tablet / iPad:

- 768px felett tilos hamburger
- szöveges menü kell

Mobil:

- hamburger OK
- menüpontok között legyen kényelmes térköz
- CTA ne nyomja agyon a felületet

Tilos:
- header redesign külön engedély nélkül
- logó animáció
- tablet nézet hamburgerre törése 768px felett
- teljes navigáció újraírása kis spacing hiba miatt

---

## 8. Hero szabályok

Desktop cél:

- videós / képes hero
- központi, prémium kompozíció
- nagy, de nem túlzsúfolt szöveg
- CTA jól látható
- Dandelion hangulat: természet, hegyek, csend, prémium vidéki élmény

Mobil cél:

- magas hero
- lehetőleg töltse ki az első mobil képernyőt
- a következő szakasz ne lógjon be túl korán
- CTA lehet áttetszőbb, finomabb
- iPhone pull-to-refresh / görgetési furcsaságokat külön vizsgálni kell
- mobil hero kép külön kezelendő, nem automatikus desktop crop

Hero képeknél:
- LCP kritikus
- csak fő hero kép lehet eager / preload / fetchpriority high
- mobil és desktop fókuszpont külön fontos lehet

---

## 9. Szállás / lakás oldalak

Fontos ingatlanok:

- Dandelion D1
- Dandelion D2
- Fügeház
- Zsálya Vendégház
- Szőlőliget Vendégház
- Szépvölgyi Vendégház
- Dandelion Royal Homes
- Dandelion Vintage Vendégház

Megjegyzés:
- „Cottage” névvel óvatosan kell bánni, a projektben a Vintage név preferált, ha erről van szó.
- Badacsonyörs esetén a helyes név: Szépvölgyi Vendégház, nem „Dandelion Badacsonyörs”.

D2 külön fókuszban van.

D2 jellemzők:

- Szent György-hegy lábánál
- Balaton közel van, de nem látszik közvetlenül a D2-ből
- családoknak ideális
- galériás emeleti hálószoba képei SEO-zandók
- D2 a lakásoldali vizuális prototípus

Lakásoldalaknál fontos alapelv:
- nem egyedi oldalakat építünk
- nem D2-t másoljuk
- közös sablonrendszer kell
- D2 kinézetét kell reprodukálni adatvezérelt sablonból

---

## 10. Képkezelés és SEO – aktuális állapot

### 10.1 File-based image pipeline

A Dandelion új Astro honlap képkezelése jelenleg file-based rendszer.

Jelenlegi irány:

- nincs WordPress media használat
- nincs image-admin használat
- nincs REST alapú runtime képforrás
- nincs runtime képgaléria betöltés
- a frontend képei a repóban lévő fájlokból és registryből jönnek

Források:

```text
public/images/...
src/data/images/...
source-images/accommodations/...
```

A `source-images/accommodations/...` nyers / feldolgozási forrás, nem közvetlen frontend asset.

Pipeline:

1. JPG forráskép bekerül a `source-images/accommodations/{apartmentKey}/` alá
2. script feldolgozza
3. WebP készül
4. thumbnail készül
5. registry / draft adat készül
6. Astro build használja
7. `dist` kerül feltöltésre `/ujsite/` alá

Fontos npm script irány:

```text
images:intake
images:select
images:process
images:publish
```

A jelenleg megtalált képfeldolgozó script:

```text
scripts/process-accommodation-images.mjs
```

Ez WebP / thumbnail feldolgozással, dry-run tervvel és image processinggel kapcsolatos.

Fontos:
- ez nem feltétlenül maga az AI SEO generátor
- a SEO draft output viszont létezik registry JSON-ban

---

### 10.2 SEO AI draft rendszer – nagyon fontos pontosítás

A SEO AI rendszer nem végleges SEO-adat generátor, hanem SEO draft réteg.

A konkrét megtalált SEO draft fájl:

```text
src/admin-disabled/data/images/accommodation-images.seo-test.json
```

Ebben D2 és Köveskál képekhez vannak SEO draft adatok.

Tipikus struktúra:

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

Az `seoDraft.approved: false` jelentése:

- AI által előkészített SEO draft
- nem véglegesített státusz
- később javítható
- nem hiba
- nem blokkoló állapot
- nem azt jelenti, hogy nem használható munkarétegként
- nem azt jelenti, hogy minden mezőhöz külön emberi okézás kell

Nagyon fontos:
- az AI automatikusan készíthet SEO draftot
- a draft `seoDraft` mezőbe kerül
- az AI nem állíthat `approved: true` értéket
- meglévő végleges SEO adatot AI draft nem írhat felül
- az AI nem írhat olyat, ami a képen nem látható
- az AI nem kulcsszóhalmozhat
- magyar és angol mezők készülhetnek automatikusan

A helyes logika:

```text
AI generál SEO draftot
→ seoDraft mezőbe kerül
→ approved: false
→ később javítható / véglegesíthető
```

Nem helyes logika:

```text
AI draft csak kézi jóváhagyás után létezhet
```

Ezt tilos újra összekeverni.

---

### 10.3 SEO draft és végleges SEO viszonya

A `seoDraft` munkaréteg.

A `seoDraft` lehet:
- automatikusan generált
- később kézzel javított
- teszt registryben tárolt
- később végleges mezővé alakítható
- fallbackként figyelembe vehető, ha nincs külön final SEO mező

De az AI:
- nem állíthat automatikusan `approved: true` értéket
- nem írhatja felül a meglévő final / jóváhagyott SEO mezőket
- nem találhat ki képen nem látható állítást
- nem használhat kulcsszóhalmozást

Helyes szabály:

```text
AI automatikusan készíthet SEO draftot.
A draft mindig seoDraft mezőbe kerül.
A draft alapértelmezett státusza approved:false.
Az approved:false nem hiba és nem blokkolás.
Az AI nem állíthat approved:true értéket.
A draft később javítható vagy véglegesíthető.
Meglévő végleges SEO adatot AI draft nem írhat felül.
```

Korábbi hibás megfogalmazást kerülni kell:

```text
éles SEO adat csak kézi jóváhagyás után mehet
```

Ez túl szigorú és félrevezető volt.

Pontosabb megfogalmazás:
- az AI draft automatikusan létrejöhet
- `approved:false` draft státuszt jelent
- final mező / approved státusz külön későbbi döntés lehet
- nem emberi okézás-függő az, hogy a draft létezhet

---

### 10.4 SEO szövegminőség

SEO képadatnál cél:

- természetes alt szöveg
- magyar és angol mező
- képen tényleg látható tartalom
- nem kulcsszólista
- nem marketinges túlzás
- nem kitalált lokáció / panoráma / tárgy
- nem fájlnév alapú alt
- nem üres alt

Jó irány:

```text
Dandelion D2 fedett terasz sárga székekkel és asztallal
```

Rossz irány:

```text
szállás Kisapáti vendégház Balaton-felvidék olcsó családi szállás legjobb apartman
```

---

## 11. SabeeApp / foglalás

SabeeApp a foglalómotor.

Fontos szabály:

- direkt foglalási logika maradjon stabil
- CTA gombok ne törjék meg a SabeeApp működést
- ahol lehet, közvetlen szoba/apartman foglalófelület nyíljon
- lakásoldalaknál a SabeeApp adatok adatként kezelendők
- a foglalási CTA layoutja sablonból jöjjön

Korábbi stabil Dandelion CTA irány:
- SabeeApp widget.js háttérben betöltődik
- gomb az `OpenBE()` logikát hívhatja
- lakásonként eltérő tokenek lehetnek
- a design közös, a token adat lakásonként változik

Tilos:
- SabeeApp működés szétszórása minden oldalba
- SabeeApp logika módosítása sima design task közben
- booking CTA törése sablonosítás közben

---

## 12. Deploy / build szabályok

Fontos korábbi hiba:

- nem UI-hiba volt, hanem build/deploy asset eltérés
- a szerveren pontosan annak kell lennie, amit a `dist/` generál
- nem szabad keverni `_astro` és `assets` struktúrát
- feltöltés közben figyelni kell, hogy fájlnevek ne torzuljanak

Ellenőrzések:

- `npm run build`
- dist HTML-ben asset útvonalak ellenőrzése
- szerveren CSS/JS tényleg elérhető-e
- `/ujsite/` útvonalon teszt

Publikus tasknál:
- build általában kötelező
- `dist`-hez kézzel nem nyúlunk
- szerveren nem javítgatunk forrást
- `/ujsite/` almappa miatt root path hibákra figyelni kell

---

## 13. Lakásoldal sablonosítás – stratégiai irány

Ez kiemelten fontos projektirány.

A lakásoldalak fejlesztési iránya nem egyedi oldalak építése.

Cél:

- egy közös sablon
- apartmentKey-alapú adat
- központi image registry
- D2-vel azonos vizuális működés
- D2 mint prototípus
- Fügeház és többi lakás csak adatként térjen el

Közös sablon tervezett helye:

```text
src/templates/AccommodationPage.astro
```

Lakásadatok tervezett helye:

```text
src/data/accommodations/*.ts
```

Javasolt adatfájlok:

```text
src/data/accommodations/index.ts
src/data/accommodations/accommodation-types.ts
src/data/accommodations/d2.ts
src/data/accommodations/fugehaz.ts
src/data/accommodations/d1.ts
src/data/accommodations/zsalya.ts
src/data/accommodations/szololiget.ts
src/data/accommodations/szepvolgyi.ts
src/data/accommodations/royal-homes.ts
src/data/accommodations/vintage.ts
```

Page fájlok csak wrapperként működhetnek:

```text
src/pages/dandelion-d2.astro
src/pages/dandelion-fugehaz.astro
src/pages/dandelion-zsalya.astro
...
```

A page fájl csak ezt csinálhatja:

- apartmentKey kiválasztása
- adat betöltése
- `AccommodationPage.astro` meghívása

Nem tartalmazhat:

- saját layoutot
- saját hero logikát
- saját galériát
- saját mobil tördelést
- saját fact ikonrendszert
- D2-ből másolt HTML-t
- lakásonként külön CSS-rendszert

---

## 14. D2 szerepe a sablonosításban

D2 a vizuális prototípus.

A cél:

- nem új design
- nem új UX
- nem új galériarendszer
- nem új layout
- hanem a D2 kinézet reprodukálása közös sablonból

D2 → sablon migráció csak audit után történhet.

Első lépés mindig:

- D2 audit
- fájlmódosítás nélkül

Vizsgálni kell:

- blokkok sorrendje
- hero működés
- galéria működés
- fact elemek
- mobil / desktop tördelés
- SabeeApp CTA
- képforrások
- mi layout
- mi adat
- milyen classok vannak
- milyen D2-specifikus logika van
- mit kell sablonba tenni
- mit kell adatfájlba tenni

D2 visszakötés után elfogadási feltétel:

- D2 kinézet nem változik
- desktop azonos
- mobil azonos
- hero működik
- galéria működik
- CTA működik
- build sikeres

---

## 15. Lakásoldali fix blokksorrend

A közös sablon tervezett sorrendje:

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

Ez nem változhat lakásonként.

Ha egy lakásnál kevesebb adat van:
- a sablon kezelje kulturáltan
- ne legyen külön layout
- ne legyen külön page logika
- ne legyen külön CSS

---

## 16. Lakásoldali adatmodell iránya

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

Ez irány, nem feltétlen végleges forma.

A lényeg:

- layout nem adatfájlban van
- adat nem page fájlban van
- kép nem random URL-ből jön
- képi SEO adat nem WordPressből jön
- runtime képforrás nincs

---

## 17. Galéria és hero szabály lakásoldalaknál

Hero forrás:

```text
accommodationImages[apartmentKey].hero.desktop
accommodationImages[apartmentKey].hero.mobile
```

Galéria forrás:

```text
accommodationImages[apartmentKey].gallery
```

Kötelező:

- WebP
- thumbnail külön
- full image külön
- sortOrder
- alt/title/caption draft vagy végleges adat
- lazy gallery
- hero lehet preload / eager / fetchpriority high
- külön mobil hero kép
- fókuszpont figyelése

Tilos:

- WordPress media URL
- REST image fetch
- runtime gallery source
- lakásonként külön galéria
- lakásonként külön hero logika
- D2 galéria kézi másolása más oldalba
- minden galériakép eager betöltése

---

## 18. Fact / ikon rendszer

A fact elemek közös iconKey rendszerrel működjenek.

Példák:

```text
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

Az adatfájl csak ezt adja:

```ts
{
  iconKey: "guests",
  label: "Vendégek",
  value: "6 fő"
}
```

Az ikon hozzárendelés a sablon dolga.

Tilos:
- ikonok kézi HTML másolása lakásonként
- eltérő fact layout lakásonként
- Fügeház vagy más lakás egyedi ikonrendszere

---

## 19. Fügeház migráció

Fügeház csak akkor migrálható, ha D2 már közös sablonból működik.

Fügeház nem kaphat külön layoutot.

Fügeház esetén csak ezek készülhetnek:

- `src/data/accommodations/fugehaz.ts`
- image registry kapcsolat apartmentKey alapján
- wrapper page
- szükséges adatfeltöltés

Tilos:

- Fügeház külön design javítása sablon nélkül
- D2 másolása
- egyedi galéria
- egyedi hero
- egyedi mobil layout
- D2-től eltérő komponensstruktúra önálló kialakítása

A többi lakás is ugyanezen az úton kerülhet be:

- D1
- Zsálya
- Szőlőliget
- Szépvölgyi
- Royal Homes
- Vintage

---

## 20. Stop szabályok

STOP, ha:

- új lakásoldal D2 másolással készülne
- layout kerülne page fájlba
- hero logika kerülne page fájlba
- galéria logika kerülne page fájlba
- WordPress media fallback kerülne vissza
- REST képforrás kerülne vissza
- image-admin visszakötés indulna publikus képrendszerbe
- AI draft automatikusan `approved:true` lenne
- SEO draftot végleges SEO adatként kezelnénk
- egyszerre több lakás teljes migrációja történne
- Codex redesignolni kezdene
- Codex „ha már itt vagyok” javítást csinálna
- nagy diff indulna kis tasknál

Hibakód / jelzés:

```text
ACCOMMODATION TEMPLATE VIOLATION
```

vagy képes feladatnál:

```text
IMAGE WORKFLOW SCOPE TOO LARGE
```

vagy SEO draftnál:

```text
SEO DRAFT RULE VIOLATION
```

---

## 21. Következő helyes munkamenet lakásoldal sablonosításnál

A következő Codex-task ne implementáció legyen, hanem D2 audit.

Task cél:

- csak olvasás
- nincs módosítás
- nincs build
- D2 bontása sablon/adat szempontból

Utána:

1. adatmodell pontosítás
2. D2 adatfájl létrehozás
3. AccommodationPage sablon létrehozás
4. D2 visszakötés wrapperként
5. build
6. vizuális összehasonlítás
7. csak ezután Fügeház

---

## 22. Rules / AGENT / ChatGPT rules szereposztás

### DANDELION_CHATGPT_RULES.md

Ez a fájl ChatGPT-nek szól.

Feladata:
- projektmemória
- döntési háttér
- helyes Codex taskok előkészítése
- fontos félreértések megelőzése
- hosszú távú Dandelion irány megtartása

### AGENT.md

Ez Codex végrehajtási szabálya.

Feladata:
- scope
- workspace lock
- diff rule
- build rule
- encoding rule
- stop rule
- git rule
- végrehajtási tilalmak

AGENT-be való:
- mit módosíthat
- mit nem módosíthat
- mikor STOP
- hogyan ad RESULT-ot

### DANDELION_RULES.md

Ez design / struktúra / tartalmi szabály.

Feladata:
- Dandelion design
- layout alapelvek
- képkezelési stratégia
- lakásoldali sablonrendszer elvei
- SEO tartalmi szabályok
- vizuális irány

Rules-ba való:
- hogyan nézzen ki
- milyen struktúrát kell követni
- milyen kép / SEO / layout alapelvek vannak

---

## 23. Kommunikációs stílus

A válasz legyen:

- közvetlen
- rövid
- gyakorlati
- ne túlmagyarázott
- Codex feladatnál különösen tömör

Ha Codexnek írunk feladatot:
- ne legyen marketinges
- ne legyen oktató szöveg
- legyen végrehajtható utasítás
- legyen egyértelmű scope
- legyenek tiltások
- legyen RESULT blokk

A user nem szereti a maszatolást.
Ha valami rossz volt, ki kell mondani.

---

## 24. Új honlapos beszélgetés indítása

Ha új chatben honlapos folytatás indul, először tisztázni kell:

1. aktuális állapot / Codex RESULT
2. módosított fájlok
3. screenshot, ha vizuális probléma van
4. branch / commit / push állapot

Csak ezután jöjjön új feladat vagy diagnózis.

Ha a user ezt írja:

```text
DANDELION_CHATGPT_RULES.md szerint folytassuk.
```

Akkor ezt a fájlt kell projektalapnak tekinteni.

Ha a user ezt írja:

```text
DANDELION – PROJEKT ALAP beillesztve.
```

Akkor először:
- aktuális CSS / HTML / JS vagy projektállapot bekérése csak akkor kell, ha Divi / régi WordPress feladat
- Astro / új honlap feladatnál inkább Codex RESULT, fájlok, screenshot, branch állapot kell

---

## 25. Rövid indító

Új chatben ezt kell írni:

```text
DANDELION_CHATGPT_RULES.md szerint folytassuk.
```

Ha a fájl a ChatGPT Project Files között is fent van, akkor ChatGPT onnan vissza tudja olvasni.

Ha a repó gyökerében is benne van, akkor Codex is látja, de Codex elsődleges szabálya továbbra is az `AGENT.md`.

---

## 26. Ezt különösen nem szabad elfelejteni

1. A SEO AI draft nem emberi jóváhagyási kapu.
2. `approved:false` draft státusz, nem hiba.
3. AI készíthet automatikus SEO draftot.
4. AI nem állíthat `approved:true` értéket.
5. A SEO draft konkrét fájlja jelenleg:

```text
src/admin-disabled/data/images/accommodation-images.seo-test.json
```

6. A képrendszer file-based.
7. WordPress media / image-admin / REST nem aktuális frontend irány.
8. D2 a lakásoldali prototípus.
9. Fügeházat nem javítjuk külön designnal.
10. Lakásoldalak közös `AccommodationPage.astro` sablonból épüljenek.
11. Page fájl csak wrapper.
12. Képforrás apartmentKey + image registry.
13. Következő helyes lépés: D2 audit, nem rögtön implementáció.

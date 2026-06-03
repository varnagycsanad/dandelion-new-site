# 11 - Szallasok oldal audit es megvalositasi terv

Status: TORTENETI
Last checked: 2026-06-03
Use for: lezart szallasok regio-struktura audit torteneti hattere
Do not use for: aktualis szallaslista vagy nyitott task forrasakent

# Statuszfrissites - 2026-06-03

Ez a task archiválva lett. A fo regio-struktura megvalosult es az `ACTIVE_BACKLOG.md` szerint lezart.

Kesobbi uj auditban ujranyithato tema:

- nemet szallasoldali kartyaszintu anchor linkek
- teljes mobil/desktop vizualis QA
- link-helper / relativ URL egységesites


# Statusz: JAVASOLT
# Letrehozva: 2026-05-12

## Cel

A `Szallasok` oldal jelenlegi szerepenek, UX-logikajanak es navigacios helyenek auditja, valamint egy konkret megvalositasi terv rogzitese ahhoz, hogy a felhasznalo konzisztens modon tudjon:

- eloszor regiot valasztani
- utana konkret szallast valasztani
- majd tovabblepni a szallasoldalra es a foglalasra

---

## 1. Kiindulasi helyzet

A fooldal jelenleg jo iranyt mutat:

- eloszor teruletet / regiot mutat be
- utana tereli a latogatot a szallasok fele

Viszont a `Szallasok` oldal ezt a logikat nem viszi tovabb teljesen kovetkezetesen. Emiatt a felhasznalo a valasztasi folyamat kozepen ujra egy altalanos listat kap, ahelyett hogy a korabban megkezdett dontest fejezhetne be.

---

## 2. Audit megallapitasok

### 2.1. A fooldal es a Szallasok oldal kozott megtorik a user flow

A fooldalon a kommunikacio 3 kulon vilagot iger:

- Tanuhegyek
- Balaton mellett
- Kali-medence

Ehhez kepest a `Szallasok` oldalon a regiologika mar nem ugyanilyen tiszta tovabblepeskent jelenik meg.

Kovetkezmeny:

- a felhasznalo mar meghozott regio-dontese nem kap konkret folytatast
- a `Szallasok` oldal reszben ujrakezdi a valasztasi folyamatot

---

### 2.2. Az adatmodell jelenleg nem fedi le a kommunikalt 3 regio logikat

A kodban a `Szallasok` adatmodellje jelenleg csak 2 szekcioval dolgozik:

- `upland`
- `shore`

Ez nem koveti le a fooldal 3 reszes kommunikaciojat.

Kulon problema:

- a Kali-medence kulon regio nincs tenylegesen lekepezve
- a `Dandelion Koveskal` nincs benne a fo `accommodations` tombben

Kovetkezmeny:

- a tartalmi igeret es a tenyleges valasztofelulet szerkezete elvalik egymastol
- a `Szallasok` oldal nem lehet teljesen pontos addig, amig a 3 regio nincs adatmodellben is rogzitve

---

### 2.3. A fooldali regio CTA-k nem eleg iranyitottak

A fooldali regioblokkok jelenleg ugyanarra a `Szallasok` oldalra visznek, regio-specifikus tovabblepes nelkul.

Ez azt jelenti, hogy:

- a felhasznalo kivalaszt egy hangulatot / terseget
- majd egy altalanos oldalra erkezik
- ott ujra vegig kell neznije a teljes kinalatot

Ez felesleges kognitiv terheles.

---

### 2.4. Mobilon a konkret valasztast segito informacio tulzottan leegyszerusodik

Mobilnezetben a kartyak:

- ket oszlopba rendezodnek
- alacsonyak
- a chip-informaciok eltunnek

Igy a felhasznalo mobilon sokkal kevesebb valodi dontesi informaciot lat, pont azon az oldalon, ahol a konkret szallas kivalasztasa tortenik.

Kovetkezmeny:

- mobilon a kartyak inkabb kepes csempenek hatnak
- gyengul az osszehasonlithatosag

---

### 2.5. A belso navigacio nem teljesen egységes

Jelenleg tobbfele minta van egyszerre:

- headerben direkt szallas almenu
- fooldalon regio -> `Szallasok`
- footerben reszleges szallaslista
- tobb helyen `/#stays` hivatkozas

Ez nem tragikus, de nem eleg tiszta.

Kovetkezmeny:

- nincs egyetlen egyertelmu "kanonikus" szallasvalaszto oldal
- a latogato kulonbozo helyekrol kulonbozo logikaval jut tovabb

---

### 2.6. URL-kezelés es belso adatkapcsolatok sem teljesen egységesek

Az adatokban jelenleg keveredik:

- abszolut URL
- relativ URL

Ez technikailag kezelheto, de hosszu tavon hibalehetoseget es kovetkezetlenseget okozhat.

---

## 3. Fobb UX-kovetkeztetes

A `Szallasok` oldalnak nem egyszeru listing oldalnak kell lennie, hanem a fo konverzios utvonal kozepso, dontest tamogato allomasanak:

`Fooldal -> regio -> konkret szallas -> foglalas`

Vagyis a `Szallasok` oldal fo feladata:

- ne csak felsoroljon
- hanem segitsen valasztani

---

## 4. Javasolt vegleges szerep a Szallasok oldalnak

A `Szallasok` oldal legyen a **kanonikus szallasvalaszto oldal**.

Ez azt jelenti, hogy:

- a fooldal itt folytatodik logikusan
- a felhasznalo itt tud regiot pontositani vagy megerositeni
- itt valaszt konkret hazat vagy apartmant
- innen megy tovabb az egyedi szallasoldalra

---

## 5. Javasolt informacios architektura

### 5.1. Oldalfej / hero

Rovid bevezeto:

- Dandelion vendeghazak a Balaton-felvideken
- valaszd ki eloszor a hozzad illo terseget, utana a konkret szallast

Cel:

- ne csak hangulatot adjon
- hanem magyarazza el, mit kell itt csinalni

---

### 5.2. Gyors regio-valaszto blokk

A hero alatt legyen egy gyors valaszto:

- Tanuhegyek
- Balaton mellett
- Kali-medence

Mindharom opcio:

- rovid 1 mondatos pozicionalassal
- anchor linkkel a megfelelo blokkra

Ha a felhasznalo a fooldali regio CTA-bol jon, akkor erkezzen egybol a megfelelo regioblokkhoz.

Peldak:

- `/szallasok#tanuhegyek`
- `/szallasok#balaton-mellett`
- `/szallasok#kali-medence`

---

### 5.3. Regioblokkok

Minden regio kapjon kulon szekciot:

- regio nev
- 1 rovid hangulati leiras
- 1 rovid segito mondat, hogy milyen tipusnak jo
- alatta az oda tartozo konkret szallasok

Javasolt regiok:

1. Tanuhegyek oleleseben
2. Balaton-parti konnyedseg
3. A Kali-medence csendjeben

---

### 5.4. Konkret szallaskartyak

A kartyak celja nem csak a vizualis jelenlet, hanem az osszehasonlithatosag.

Ezert minden kartyan mindig latszodjon legalabb:

- szallas neve
- ferohely
- haloszobak / elrendezes
- 1-2 kiemelt extra
- helyszin
- CTA: `Reszletek` vagy `Megnezem`

Opcionálisan:

- `Csaladbarat`
- `Pároknak`
- `Panorama`
- `Kozvetlen vizpart`

---

### 5.5. Oldalzaro segito blokk

A mostani "Nem tudod melyik szallast valaszd?" blokk jo alap, de erositheto.

Javasolt cel:

- azoknak segiteni, akik meg bizonytalanok
- vagy a foglalasi motorba atvinni oket, ha mar csak datum szerint keresnek

Ket lehetseges CTA:

- `Szabad idopontok megtekintese`
- `Segitseget kerek a valasztashoz`

---

## 6. Javasolt navigacios elv

### 6.1. Fooldal

A fooldali regioblokkok ne altalanosan a `/szallasok` oldalra vigyenek, hanem a megfelelo regioblokkra.

Javaslat:

- Tanuhegyek -> `/szallasok#tanuhegyek`
- Balaton mellett -> `/szallasok#balaton-mellett`
- Kali-medence -> `/szallasok#kali-medence`

---

### 6.2. Header

A header fo `Szallasok` linkje menjen a kanonikus oldalra:

- `/szallasok`

Az almenu maradhat direkt konkret szallas linkes, mert az gyors elerest ad a visszatero latogatoknak.

---

### 6.3. Footer

A footerben erdemes kulonvalasztani:

- `Szallasok` fo link -> `/szallasok`
- `Konkret hazak` lista -> teljes es aktualis legyen

Most a footer lista hianyos a teljes kinalathoz kepest, ezt egységesiteni kell.

---

## 7. Mobil UX-javaslat

Mobilon a `Szallasok` oldalnak nem szabad elveszitenie a dontesi funkciojat.

Ezert:

- a regiovalaszto legyen vizualisan egyszeru es gyorsan koppinthato
- a szallaskartyak inkabb 1 oszloposak legyenek, vagy legalabb tobb informaciot mutassanak
- minimum 2-3 kulcschip maradjon lathato
- a CTA mindig legyen egyertelmu

Cel:

- mobilon is lehessen ertelmesen osszehasonlitani a szallasokat

---

## 8. Technikai megvalositasi terv

### 1. Adatmodell rendbetetele

Teendok:

- az `accommodationSections` bovitese 3 regioba
- a regio kulcsok egyertelmu atnevezese, ha szukseges
- a `Dandelion Koveskal` felvetele a fo `accommodations` listaba
- minden szallashoz egyertelmu regio-hozzarendeles

Elvart eredmeny:

- a tartalommodell vegre ugyanazt mondja, mint a fooldali kommunikacio

---

### 2. Linkstruktura egységesitese

Teendok:

- belso linkek atnezese
- abszolut es relativ szallas URL-ek egységesitese
- regio anchorok bevezetese a `Szallasok` oldalon

Elvart eredmeny:

- stabilabb belso navigacio
- konnyebben karbantarthato kod

---

### 3. `Szallasok` oldal ujrastrukturalasa

Teendok:

- hero pontositasa
- regio valaszto blokk bevezetese
- regioblokkok letrehozasa anchorokkal
- kartyak atalakítása jobb osszehasonlithatosagra

Elvart eredmeny:

- a `Szallasok` oldal valodi valasztooldalla valik

---

### 4. Fooldali regio CTA-k frissitese

Teendok:

- a `RegionStories` CTA-k regio-anchorokra mutassanak
- a fooldalrol erkezo latogato egybol a megfelelo regioblokkhoz jusson

Elvart eredmeny:

- folytonosabb user flow
- kisebb lemorzsolodas a regio- es hazvalasztas kozott

---

### 5. Mobil optimalizalas

Teendok:

- kartyamagassag es elrendezes ujragondolasa
- tobb dontesi informacio megjelenitese mobilon
- regio valaszto egyszerusitese mobil use case-re

Elvart eredmeny:

- mobilon sem csak "szep kepek", hanem hasznalhato valasztasi felulet

---

### 6. QA es tartalmi ellenorzes

Teendok:

- minden regio alatt megfelelo szallasok jelennek-e meg
- minden szallas kattinthato-e
- van-e regio, amely kommunikacioban szerepel, de oldalon nincs lefedve
- mobilon es desktopon is ertheto-e a valasztasi logika

Elvart eredmeny:

- konzisztens, konverziot tamogato oldal

---

## 9. Javasolt megvalositasi sorrend

1. adatmodell javitasa
2. regio anchor-struktura kialakitasa
3. `Szallasok` oldal uj blokkstrukturanak megirasa
4. fooldali regio CTA-k atkotese
5. footer es egyeb navigacios pontok egységesitese
6. mobil finomhangolas
7. vegso QA

---

## 10. Döntesi javaslat

A legjobb irany nem egy ujabb sima listing oldal keszitese, hanem az, hogy a `Szallasok` oldal egy regiokra bontott, konkret valasztast segito kozponti oldal legyen.

Ez azert a legerosebb megoldas, mert:

- illeszkedik a jelenlegi fooldali kommunikaciohoz
- csokkenti a felhasznalo bizonytalansagat
- jobban tamogatja a `Fooldal -> Szallas -> Foglalas` konverzios utvonalat
- technikailag is tisztabban karbantarthato lesz

---

## 11. Kovetkezo lepes

Kovetkezo fejlesztesi korben ezt erdemes megcsinalni:

- a `Szallasok` oldal konkret wireframe-szintu szerkezetenek kialakitasa
- majd az oldal tenyleges Astro atalakítása a fenti modell szerint


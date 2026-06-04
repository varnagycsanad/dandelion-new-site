# DANDELION GEO riport - 2026-06-04

Status: ELSŐ VALÓS RAW ADATOS GEO RIPORT
Készítette: Codex, raw JSON feldolgozás alapján

## 1. Riport adatai és vezetői összefoglaló

- Riport dátuma: 2026-06-04
- Vizsgált időszak: A raw JSON fájlokban nincs külön `startDate` / `endDate` mező, de az adatlekérés ismert időszaka: 2026-05-07 – 2026-06-03.
- Adatforrások:
  - Search Console query adatok: `data/geo/raw/gsc_queries_2026-06-04.json`
  - Search Console page adatok: `data/geo/raw/gsc_pages_2026-06-04.json`
  - GA4 page adatok: `data/geo/raw/ga4_pages_2026-06-04.json`
  - GA4 event adatok: `data/geo/raw/ga4_events_2026-06-04.json`
- Nem használt adatforrás: Google Ads API, új API fetch, új token, GEO Agent, automatikus e-mail riport.

Adatmennyiség:

| Adatforrás | Sorok száma | Összes kattintás | Összes megjelenés | Megjegyzés |
|---|---:|---:|---:|---|
| GSC queries | 100 | 25 | 855 | `responseAggregationType`: `byProperty` |
| GSC pages | 80 | 105 | 3084 | `responseAggregationType`: `byPage` |
| GA4 pages | 19 | n/a | n/a | 130 aktív felhasználó, 163 session, 218 page view, 627 event count a sorokból összesítve |
| GA4 events | 5 | n/a | n/a | 5 event név, összesen 627 event |

Legfontosabb tanulságok:

1. A Dandelion jelenleg főleg brand és lokációs szállás szándékokra látszik: `dandelion vendégház`, `kisapáti szállás`, `royal homes keszthely`, `tapolca apartman`, `balaton vendégház`.
2. Az első GEO-lehetőségek nem általános SEO kulcsszavak, hanem vendégkérdések: hol érdemes megszállni Kisapátiban, Keszthelyen, Tapolca környékén vagy a Balaton-felvidéken.
3. Több erős megjelenésű lekérdezés első adatpontként 0 kattintást mutat. Különösen fontos: `kisapáti szállás` 179 megjelenés, 0 kattintás, átlagpozíció 3,03; `royal homes keszthely` 100 megjelenés, 0 kattintás, átlagpozíció 8,01.
4. A GSC-ben látható és a GA4-ben aktív oldalak között részleges az átfedés. A kezdőlap mindkét oldalon erős, de a GA4-ben a `/dandelion-d2/`, `/dandelion-koveskal/` és `/panorama-pool/` is érdemi aktivitást kap.
5. A mostani GA4 event export túl rövid ahhoz, hogy a Dandelion-specifikus konverziós eseményeket ellenőrizni lehessen. Ez külön feldolgozást igényel.

## 2. Search Console query elemzés

### 2.1 Legláthatóbb lekérdezések

| Lekérdezés | Kattintás | Megjelenés | CTR | Átlagpozíció | GEO értelmezés |
|---|---:|---:|---:|---:|---|
| `dandelion` | 0 | 201 | 0,00% | 8,06 | Brand-jel, de a mostani exportban nincs kattintás. A találati kép külön ellenőrzést igényel. |
| `kisapáti szállás` | 0 | 179 | 0,00% | 3,03 | Nagyon erős lokációs szállás szándék, kiemelt GEO-lehetőség. |
| `royal homes keszthely` | 0 | 100 | 0,00% | 8,01 | Konkrét szállás/brand-lokáció szándék Keszthely témában. |
| `dandelion vendégház` | 19 | 35 | 54,29% | 1,06 | Erős brand + vendégház jel, jelenleg a legbiztosabb kattintási minta. |
| `balaton vendégház` | 0 | 26 | 0,00% | 38,77 | Szélesebb, versenyzőbb szállástéma, inkább hosszabb távú tartalmi lehetőség. |
| `hotel tapolca` | 0 | 20 | 0,00% | 21,15 | Tapolca környéki szállásigényt jelez, de nem biztos, hogy vendégházra optimális forma. |
| `tapolca apartman` | 0 | 17 | 0,00% | 8,82 | Valós vendégszándék, apartman/szállás keresési forma. |
| `fahrradverleih in der nähe` | 0 | 12 | 0,00% | 11,00 | Német nyelvű élmény/szolgáltatás szándék, kerékpár téma. |

### 2.2 Valódi vendégszándékra utaló minták

A valós vendégszándékot azok a lekérdezések mutatják, amelyekben lokáció, szállástípus, ár, foglalás vagy konkrét ház/brand jelenik meg. A legerősebb minták:

| Lekérdezés | Kattintás | Megjelenés | Átlagpozíció | Megjegyzés |
|---|---:|---:|---:|---|
| `kisapáti szállás` | 0 | 179 | 3,03 | Top pozíció közeli, de a mostani adatban nincs kattintás. Tartalmi/snippet ellenőrzés javasolt. |
| `royal homes keszthely` | 0 | 100 | 8,01 | Keszthelyi szállásoldal és Royal Homes pozicionálás pontosítása javasolt. |
| `dandelion vendégház` | 19 | 35 | 1,06 | Működő brand + vendégház találat. |
| `tapolca apartman` | 0 | 17 | 8,82 | Releváns szállás szándék, FAQ/guide alapú bővítésre jó. |
| `royal homes keszthely árak` | 0 | 10 | 8,40 | Konkrét ár/foglalási szándék, AI-válaszban is értékes. |
| `folly arboretum szallas` | 0 | 8 | 11,75 | Élmény + szállás kombináció, jó GEO kérdés alap. |

### 2.3 Lokációs keresési minták

Lokációk, amelyek a raw query adatokban megjelennek:

- Kisapáti: `kisapáti szállás`, `kisapati szallas`, `kisapáti`
- Keszthely: `royal homes keszthely`, `keszthely royal homes`, `royal home keszthely`, `luxury apartments keszthely`
- Tapolca: `hotel tapolca`, `tapolca apartman`, `tapolca szállás`, `szállás tapolca környékén`, `tapolca vendégház`
- Balaton / Balaton-felvidék: `balaton vendégház`, `vendégház balaton`, `balaton felvidék szállás`, `balatoni vendégházak`
- Szent György-hegy / Badacsony: `szent györgy hegy szállás`, `eszter ház szent györgy hegy`, `badacsony wine tasting`, `weingut badacsonytomaj`
- Köveskál / Káli-medence: `köveskál vendégház`, `szállás köveskál`, `kali basin`

GEO következtetés: a Dandeliont nem egyetlen desztinációként érdemes bemutatni, hanem több lokációs vendégkérdésre kell válaszolni: Kisapáti, Szent György-hegy, Tapolca, Keszthely, Köveskál, Balaton-felvidék.

### 2.4 Szállás / apartman / vendégház jellegű keresési minták

A szállás-szándék egyértelmű. Visszatérő formák:

- `szállás`, `szallas`, `szállások`, `vendégház`, `vendeghaz`, `vendégházak`
- `apartman`, `apartment`, `hotel`
- `booking`, `árak`
- konkrét ház- vagy márkaelemek: `royal homes`, `szepvolgyi`, `zsalya`, `dandelion house`

Fontos: a `kisapati szallas` és a `kisapáti szállás` külön sorban szerepel. Az ékezet nélküli változat 1 kattintást hozott 15 megjelenésből, az ékezetes változat 179 megjelenés mellett 0 kattintást. Ez arra utalhat, hogy a találati snippet, title/meta vagy a céloldal kifejezett "Kisapáti szállás" válasza nem elég konkrét vagy nem elég kattintható. Ezt külön ellenőrizni kell.

### 2.5 Kirándulás / élmény / környék jellegű minták

Ezek nem mindig hoznak kattintást, de GEO szempontból értékesek, mert AI-válaszok gyakran útiterv, ajánló vagy "mit érdemes csinálni" kérdésre épülnek.

| Téma | Query példák | GEO-lehetőség |
|---|---|---|
| Kerékpár | `bike rental balaton`, `balaton bike rental`, `fahrradverleih in der nähe`, `fahrradverleih balaton` | "Hol lehet biciklit bérelni a Balatonnál / Dandelion vendégházak közelében?" |
| Bor / borászat | `weingut badacsonytomaj`, `badacsony wine tasting`, `badacsony weinberg`, `weinurlaub` | "Melyik Dandelion szállás jó boros hétvégére?" |
| Balaton strand | `balaton beaches`, `balaton strände` | "Melyik Dandelion szállást válasszam strandoláshoz?" |
| Folly Arboretum | `folly arboretum szallas`, `folly arborétum` | "Hol érdemes megszállni a Folly Arborétum közelében?" |
| Tanúhegyek | `tanuhegyek`, `zeugenberge`, `szent györgy hegy szállás` | "Melyik vendégház jó Szent György-hegy túrához?" |

### 2.6 GEO kérdés-adatbázis alapjai

Első körben ezekből érdemes vendégkérdéseket képezni:

1. Hol érdemes megszállni Kisapátiban?
2. Melyik Dandelion vendégház van közel a Szent György-hegyhez?
3. Van-e jó vendégház Tapolca környékén egy éjszakára vagy hétvégére?
4. Milyen apartman vagy vendégház érhető el Keszthelyen Royal Homes néven?
5. Mennyibe kerül a Royal Homes Keszthely, és hol lehet foglalni?
6. Hol érdemes megszállni a Folly Arborétum közelében?
7. Melyik Dandelion szállás jó boros hétvégére Badacsony környékén?
8. Melyik Dandelion ház jó Balaton-felvidéki biciklis programhoz?
9. Melyik szállás jó családnak vagy baráti társaságnak a Balaton-felvidéken?
10. Melyik Dandelion oldalon találok árakat és foglalási feltételeket?

## 3. Search Console page elemzés

### 3.1 Legfontosabb látható oldalak

| Oldal | Kattintás | Megjelenés | CTR | Átlagpozíció | Értelmezés |
|---|---:|---:|---:|---:|---|
| `https://www.dandelionhouse.hu/` | 4 | 569 | 0,70% | 5,54 | Sok megjelenés, alacsony CTR. Domain/snippet/kanonikus ellenőrzés javasolt. |
| `https://dandelionhouse.hu/` | 59 | 513 | 11,50% | 11,39 | A legtöbb kattintást hozza, valószínűleg brand-szándékból. |
| `http://www.dandelionhouse.hu/` | 5 | 404 | 1,24% | 6,89 | HTTP/www variáns is látszik, technikai ellenőrzést igényel. |
| `https://dandelionhouse.hu/royal/` | 5 | 324 | 1,54% | 8,71 | Nagy láthatóság, alacsony CTR. Keszthely/Royal Homes GEO-forrásnak fontos. |
| `https://dandelionhouse.hu/dandelion-d1/` | 2 | 146 | 1,37% | 6,47 | Jó pozíció, kevés kattintás. Tartalmi pontosítás javasolt. |
| `https://dandelionhouse.hu/szololiget/` | 6 | 125 | 4,80% | 3,19 | Szállásoldalként jól teljesít, AI-forrásnak alkalmas. |
| `https://dandelionhouse.hu/szepvolgyi/` | 4 | 114 | 3,51% | 4,48 | GSC és GA4 oldalon is látható/aktív oldal. |
| `https://dandelionhouse.hu/fuge/` | 2 | 110 | 1,82% | 4,18 | Jó pozíció, alacsony CTR, FAQ bővítés javasolt. |
| `https://dandelionhouse.hu/de/fahrradverleih/` | 0 | 57 | 0,00% | 9,56 | Német kerékpár téma, a mostani exportban kattintás nélkül. |

### 3.2 Kattintást kapó oldalak

A kattintást kapó oldalak közül a kezdőlap messze a legerősebb: 59 kattintás a `https://dandelionhouse.hu/` URL-en. Szállásoldalak közül a `szololiget`, `szepvolgyi`, `royal`, `fuge`, `dandelion-d1`, `dandelion-d2`, `dandelion-zsalya` és `zsalya` kapnak kattintást. Ez azt jelzi, hogy a vendégek nem csak általános Dandelion-információt keresnek, hanem konkrét házakra is nyitottak.

### 3.3 Sok megjelenés, kevés kattintás

| Oldal | Megjelenés | Kattintás | CTR | Javasolt GEO-irány |
|---|---:|---:|---:|---|
| `https://www.dandelionhouse.hu/` | 569 | 4 | 0,70% | Domain/snippet tisztítás, egyértelmű "Balaton-felvidéki vendégházak" pozicionálás. |
| `http://www.dandelionhouse.hu/` | 404 | 5 | 1,24% | HTTP/www variánsok, kanonikus jelzés és redirect külön ellenőrzése. |
| `https://dandelionhouse.hu/royal/` | 324 | 5 | 1,54% | Royal Homes Keszthely FAQ: árak, foglalás, lokáció, parkolás, távolságok. |
| `https://dandelionhouse.hu/dandelion-d1/` | 146 | 2 | 1,37% | D1-hez konkrét vendégkérdések: kinek jó, hol van, hány fő, milyen programokhoz. |
| `https://dandelionhouse.hu/fuge/` | 110 | 2 | 1,82% | Fügeháznál konkrétabb lokáció, vendégház-típus, programkapcsolás. |
| `https://dandelionhouse.hu/de/fahrradverleih/` | 57 | 0 | 0,00% | Német FAQ a kerékpárbérlésről és a Dandelion vendégek gyakorlati lehetőségeiről. |

### 3.4 AI-válasz forrásnak alkalmas oldalak

- Kezdőlap: Dandelion entitás, lokációk, házak rövid összefoglalója.
- `/szallasok/`: "melyik házat válasszam" típusú kérdésekhez.
- `/royal/`: Keszthely / Royal Homes / árak / foglalás kérdésekhez.
- `/szepvolgyi/`, `/szololiget/`, `/fuge/`, `/dandelion-d1/`, `/dandelion-d2/`, `/dandelion-zsalya/`, `/zsalya/`: konkrét házválaszokhoz.
- `/elmenyek/bor-es-panorama/`, `/de/weingueter/`, `/en/wineries/`: boros és panorámás élménykérdésekhez.
- `/de/fahrradverleih/`, `/en/bike-rental/`, `/cs/pujcovna-kol/`: kerékpáros kérdésekhez.

### 3.5 Tartalmi pontosítás vagy FAQ bővítés igénye

1. `/royal/`: Royal Homes Keszthely keresések sok megjelenést adnak, de kevés kattintást. FAQ javasolt árakról, foglalásról, pontos helyről, parkolásról és Balaton-távolságról.
2. `/dandelion-d1/`: magas megjelenés, alacsony CTR. Kell egy rövid "D1 válaszblokk" és vendégeknek szóló összefoglaló.
3. `/fuge/`: jó pozíció, alacsony CTR. Lokáció + program + kinek ajánlott FAQ javasolt.
4. `/de/fahrradverleih/` és `/en/bike-rental/`: kerékpáros témában láthatóság van, kattintás a mostani exportban nem látszik. Gyakorlatias, keresztlinkelt információ kell.
5. Kezdőlap domain variánsok: a sok URL-variáns miatt érdemes kanonikus/redirect állapotot külön ellenőrizni.

## 4. GA4 page elemzés

### 4.1 Aktív oldalak

| Oldal | Aktív felhasználó | Session | Page view | Event count | Értelmezés |
|---|---:|---:|---:|---:|---|
| `/` | 68 | 86 | 114 | 348 | A vendégútvonal fő belépési és tájékozódási pontja. |
| `/szepvolgyi/` | 11 | 12 | 14 | 42 | GSC-ben is kattintást kap, aktív szállásoldal. |
| `/dandelion-d2/` | 10 | 12 | 15 | 35 | GA4-ben erős első adatpont, GSC-ben csak 1 kattintás látszik. |
| `/szallasok/` | 8 | 9 | 11 | 30 | Összehasonlító/felfedező szerep, GEO szempontból kulcsoldal. |
| `/dandelion-koveskal/` | 6 | 6 | 13 | 30 | GA4-ben aktív, GSC-ben a magyar oldalon nem látszik kattintás. |
| `/fuge/` | 4 | 5 | 6 | 18 | GSC-ben látható, de alacsony kattintású oldal. |
| `/szololiget/` | 4 | 5 | 5 | 17 | GSC-ben erős oldal, GA4-ben mérsékelten aktív. |
| `/royal/` | 3 | 5 | 7 | 25 | GSC-ben nagy láthatóság, GA4-ben kisebb aktivitás. |
| `/panorama-pool/` | 2 | 4 | 11 | 25 | Oldalmegtekintés/aktivitás aránya érdekes, külön ellenőrzést igényelhet. |

### 4.2 GSC és GA4 eltérések

- A kezdőlap mindkét rendszerben domináns.
- A `/royal/` GSC-ben 324 megjelenést és 5 kattintást kap, GA4-ben viszont csak 3 aktív felhasználó szerepel. Ez alacsony organikus átterelést vagy időszak/szűrési eltérést is jelezhet; a jelenlegi adatból nem dönthető el.
- A `/dandelion-d2/` GA4-ben 10 aktív felhasználóval a harmadik legerősebb oldal, GSC-ben viszont csak 1 kattintás és 35 megjelenés látszik. Ez arra utalhat, hogy belső navigációból vagy más csatornából fontos.
- A `/dandelion-koveskal/` GA4-ben 6 aktív felhasználót kap, de a GSC magyar oldal 0 kattintás / 8 megjelenés. Köveskál témában külön tartalmi és keresőláthatósági ellenőrzés javasolt.
- A kerékpár és borászat oldalak GSC-ben több nyelven látszanak, GA4-ben csak kisebb aktivitást mutatnak. Ezek inkább GEO-forrásként lehetnek érdekesek, nem feltétlenül közvetlen forgalmi oldalként.

### 4.3 Fontos vendégútvonal oldalak

1. `/` - "Mi az a Dandelion, hol vannak a vendégházak?"
2. `/szallasok/` - "Melyik Dandelion házat válasszam?"
3. Konkrét házoldalak - "Ez a ház jó nekem, hány fő, hol van, mit tud?"
4. `/arak-es-foglalasi-feltetelek/` - "Mennyibe kerül és hogyan foglalok?"
5. `/kapcsolat/` - "Hogyan tudok kérdezni vagy kapcsolatba lépni?"
6. Élményoldalak - "Mit lehet csinálni a környéken?"

## 5. GA4 event elemzés

### 5.1 Mért események

| Event név | Event count | Megjegyzés |
|---|---:|---|
| `page_view` | 218 | Oldalmegtekintések. |
| `user_engagement` | 172 | Általános engagement jel. |
| `session_start` | 132 | Session indulása. |
| `first_visit` | 98 | Új látogatói jel. |
| `ads_conversion_El_fizet_s_1` | 7 | Konverziós nevű esemény, de a neve alapján nem egyértelmű, hogy foglalás, fizetés vagy más művelet. |

### 5.2 Booking / contact / phone / email jelek

A mostani GA4 event raw fájlban nem látszik külön `dnd_booking_click`, `dnd_phone_click`, `dnd_email_click` vagy `dnd_contact_click` esemény. Ez nem bizonyítja, hogy ezek a mérések nem működnek, csak azt, hogy a jelenlegi, 5 soros event export nem elég részletes a konverziós események ellenőrzésére.

A `ads_conversion_El_fizet_s_1` 7 darabos esemény lehet fontos konverziós jel, de további definíció nélkül nem nevezhető felelősen booking vagy contact akciónak.

### 5.3 Mérési javaslat

A következő feldolgozó scriptben érdemes külön lekérni / kiemelni a Dandelion-specifikus eseményeket:

- `dnd_booking_click`
- `dnd_phone_click`
- `dnd_email_click`
- `dnd_contact_click`
- `dnd_pool_cta_click`

GEO riportoláshoz ezek segítenék annak ellenőrzését, hogy a válaszjellegű tartalmakból érkező vendégek eljutnak-e foglalási, telefonos, e-mailes vagy kapcsolatfelvételi szándékig. A jelenlegi adatból ez nem dönthető el.

## 6. GEO lehetőségek

### 6.1 Természetes vendégkérdések, amelyekre tartalmat lehet építeni

| Kérdés | Forrásjel | Kapcsolódó oldal | Javasolt forma |
|---|---|---|---|
| Hol érdemes megszállni Kisapátiban? | `kisapáti szállás`, `kisapati szallas` | `/dandelion-d1/`, `/dandelion-d2/`, `/szallasok/` | FAQ + guide blokk |
| Melyik Dandelion vendégház jó Szent György-hegy túrához? | `szent györgy hegy szállás`, `tanuhegyek` | D1/D2/Zsálya/Szőlőliget oldalak | Guide oldal |
| Milyen szállás van Keszthelyen Royal Homes néven? | `royal homes keszthely` | `/royal/` | FAQ + konkrét property összefoglaló |
| Mennyibe kerül a Royal Homes Keszthely? | `royal homes keszthely árak` | `/royal/`, `/arak-es-foglalasi-feltetelek/` | FAQ + ár/foglalás link |
| Hol van szállás a Folly Arborétum közelében? | `folly arboretum szallas` | `/szallasok/`, releváns házoldalak | Blog/guide |
| Melyik vendégház jó boros hétvégére Badacsony környékén? | `badacsony wine tasting`, `weingut badacsonytomaj`, `weinurlaub` | `/elmenyek/bor-es-panorama/`, `/de/weingueter/`, `/en/wineries/` | Guide + többnyelvű FAQ |
| Hol lehet biciklit bérelni a Balatonnál? | `bike rental balaton`, `fahrradverleih in der nähe` | `/de/fahrradverleih/`, `/en/bike-rental/`, `/cs/pujcovna-kol/` | Gyakorlati FAQ |
| Melyik Dandelion házat válasszam családnak vagy baráti társaságnak? | GA4: `/szallasok/`, házoldalak aktivitása | `/szallasok/` | Összehasonlító guide |

### 6.2 Oldalak, amelyek alkalmasak AI-válasz forrásnak

- `/szallasok/`: összefoglaló oldal a "melyik házat válasszam" kérdéshez.
- `/royal/`: Keszthely és Royal Homes témában sok GSC megjelenés miatt fontos.
- `/dandelion-d2/`: GA4 aktivitása erős első adatpont, GSC-ben még alulexponált.
- `/szepvolgyi/`: GSC és GA4 oldalról is stabil jel.
- `/szololiget/`: jó GSC pozíció és kattintás, AI-válasz forrásnak jó alap.
- `/fuge/`: jó GSC pozíció, de alacsony CTR miatt FAQ és snippet javítás javasolt.
- `/elmenyek/bor-es-panorama/`, `/de/weingueter/`, `/en/wineries/`: boros és többnyelvű élménykérdésekhez.
- `/de/fahrradverleih/`, `/en/bike-rental/`: kerékpáros kérdésekhez.

### 6.3 FAQ, blog és guide prioritások

FAQ kell:

- Royal Homes Keszthely: árak, foglalás, parkolás, elhelyezkedés, Balaton-távolság, hány fő.
- Kisapáti szállás: mely házak vannak Kisapáti/Szent György-hegy környékén, kinek melyik jó.
- D1, D2, Fügeház, Zsálya, Szőlőliget: hány fő, kinek ajánlott, fő élmények, legközelebbi programok.
- Kerékpárbérlés: nyelvek szerint is, különösen németül és angolul.

Blogcikk kell:

- "Hol szállj meg a Folly Arborétum közelében?"
- "Boros hétvége Badacsony és Szent György-hegy környékén"
- "Tapolca környéki vendégházak: mikor érdemes Dandelion házat választani?"

Guide oldal kell:

- "Dandelion szállásválasztó: melyik vendégház kinek való?"
- "Balaton-felvidéki vendégházak lokáció szerint: Kisapáti, Köveskál, Keszthely, Tapolca környéke"
- "Szent György-hegy programok és szállások"

## 7. Első konkrét javaslatlista

1. `kisapáti szállás` témára készüljön rövid, konkrét válaszblokk a releváns házoldalakon és a `/szallasok/` oldalon. Indok: 179 megjelenés, 0 kattintás, átlagpozíció 3,03.
2. A `/royal/` oldalon legyen Royal Homes Keszthely FAQ: árak, foglalás, parkolás, Balaton-távolság, hány fő. Indok: `royal homes keszthely` 100 megjelenés, 0 kattintás.
3. Ellenőrizni kell a kezdőlap URL-variánsokat: `https://dandelionhouse.hu/`, `https://www.dandelionhouse.hu/`, `http://www.dandelionhouse.hu/`. Indok: a GSC-ben külön látszanak.
4. A `/dandelion-d2/` oldalt GEO szempontból erősíteni kell. Indok: GA4-ben 10 aktív felhasználó és 15 page view, GSC-ben csak 1 kattintás.
5. A `/dandelion-koveskal/` oldalra Köveskál/Káli-medence kérdésekhez konkrét válasz kell. Indok: GA4-ben aktív, GSC-ben még gyenge első adatpont.
6. A kerékpáros oldalakra gyakorlati FAQ kell németül és angolul. Indok: `fahrradverleih in der nähe` 12 megjelenés, `/de/fahrradverleih/` 57 megjelenés, 0 kattintás.
7. A boros/élmény témákból készüljön vendégkérdés-alapú guide. Indok: `weingut badacsonytomaj`, `badacsony wine tasting`, `weinurlaub`, `de/weingueter`, `en/wineries` jelek látszanak.
8. A következő feldolgozó script külön emelje ki a Dandelion-specifikus eseményeket: `dnd_booking_click`, `dnd_phone_click`, `dnd_email_click`, `dnd_contact_click`, `dnd_pool_cta_click`.
9. A `/szallasok/` oldal legyen valódi szállásválasztó oldal: lokáció, létszám, ajánlott vendégtípus, programkapcsolat. Indok: GA4-ben 8 aktív felhasználó, és GEO kérdésekre ez lehet a legjobb összefoglaló forrás.
10. Az első GEO kérdés-adatbázisba 10-20 konkrét vendégkérdés kerüljön a fenti querykből. Az adat kevés, de a minták elég jók az első kontrollált vázlathoz.

## 8. Következő kontrollált lépés

Javasolt következő lépés: raw JSON -> egyszerű processed összesítő script.

Cél:

- a 4 raw fájlból készüljön determinisztikus összesítő;
- számolja ki automatikusan a rekordmennyiségeket, összes kattintást/megjelenést, top queryket, top page-eket, magas megjelenés/alacsony kattintás listákat;
- jelölje meg a GEO kérdés-adatbázis jelöltjeit: lokációs szállás, ár/foglalás, élmény, kerékpár, borászat, strand, konkrét ház;
- külön kérje le vagy emelje ki a Dandelion-specifikus eventeket;
- a következő riport már ne kézi másolásból, hanem ellenőrizhető összesítőből induljon.

Második kontrollált opció: az első 10-20 vendégkérdés kiválasztása ebből a riportból, és ezek hozzárendelése konkrét Dandelion oldalakhoz.

## 9. Adathiányok és óvatos következtetések

- A raw JSON fájlok nem tartalmaznak explicit dátumtartományt, de az adatlekérés ismert időszaka: 2026-05-07 – 2026-06-03. Ezért a riport ezt az időszakot használja, azzal a megjegyzéssel, hogy maga a dátumtartomány nem a raw fájlokon belüli mezőből, hanem az ismert API fetch futásból származik.
- A GSC query adatoknál nincs query -> page párosítás, csak property szintű query és page szintű oldallista. Emiatt az "érintett oldal" hozzárendelés szakmai következtetés, nem direkt raw mezőből származik.
- A GA4 page raw csak `pagePath` bontást ad, forrás/medium nélkül. A jelenlegi adatból nem dönthető el biztosan, mely oldalak organikus keresőből érkeztek.
- A mostani GA4 event raw fájlban nem látszanak külön Dandelion-specifikus click eventek; ez nem bizonyít mérési hibát, csak részletesebb exportot igényel.
- A `ads_conversion_El_fizet_s_1` event jelentése további definíció nélkül nem egyértelmű.
- Az adat első adatpontként kezelendő. Trendhez, növekedéshez vagy csökkenéshez még összehasonlító idősor kell.

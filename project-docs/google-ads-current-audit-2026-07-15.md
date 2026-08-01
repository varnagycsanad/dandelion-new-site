# Google Ads audit - aktualis allapot

Status: FRISSITVE 2026-07-15  
Ownership update 2026-07-25: this document is historical platform audit context. Current Ads and GA4 platform ownership belongs to DMA. DWA only owns site-side implementation details, CTA surfaces, SEO/GEO source, schema and build evidence.

Do not treat this file as approval to perform platform writes from the DWA repo.

Forrasok:

- `tmp/google-stack-snapshots/ads-performance-30d.json`
- `tmp/google-stack-snapshots/ads-campaigns.json`
- `tmp/google-stack-snapshots/ads-conversions.json`
- `tmp/google-stack-snapshots/healthcheck.json`
- `project-docs/google-ads-search-audit-2026-07-10.md`
- `project-docs/google-ads-ga4-audit-living.md`
- `public/scripts/dnd-ads-events.js`

## 1. Vezetoi osszegzes

A mostani Google Ads setup **hasznalhato, de nem eleg feszes**. A meresi lanc ma mar jobb allapotban van, mint a korabbi auditok alapjan latszott: a `dnd_booking_click` es a `dnd_booking_confirmation` is latszik a GTM/GA4/Ads lancban. Ettol fuggetlenul az aktiv fo optimalizalasi jel tovabbra is a `dnd_booking_click`, nem a vegso foglalasi megerosites.

Az aktualis kampanymixben a legnagyobb problema tovabbra is a generikus `Balaton-felvidek` keresesi kampany: ez hozza a legtobb koltest, de minosegben es hatekonysagban gyengebb, mint a brand vagy a szukebb Kisapati kampany. A frissen engedelyezett `Dandelion - Medences szállás - HU` kampany mar latszik az accountban, de ebben a snapshotban meg nincs kimutathato teljesitmenyadata.

## 2. Aktualis kampanyallapot 2026-07-15

Aktiv kampanyok:

- `Dandelion - Brand - HU`
- `Dandelion - Szállás Balaton-felvidék - HU`
- `Dandelion - Kisapáti Szent György-hegy - HU`
- `Dandelion - Medencés szállás - HU`

Eltavolitott kampany:

- `Őszi kampány`

Megfigyeles:

- a `Medencés szállás` kampany mar `ENABLED`,
- de a mostani teljesitmeny-snapshotban meg nem szerepel koltessel vagy kattintassal,
- ez tipikusan azt jelenti, hogy nagyon friss, vagy a riport meg nem fogta be.

## 3. Friss teljesitmeny kep

Az elerheto snapshotban szereplo osszesitett kampanyteljesitmeny:

| Kampany | Impr. | Click | CTR | Avg CPC | Koltes | Konv. | CPA | Konv. ertek / koltes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Dandelion - Szállás Balaton-felvidék - HU | 2565 | 135 | 5.26% | 129.67 HUF | 17505.33 HUF | 11 | 1591.39 HUF | 0.18 |
| Dandelion - Kisapáti Szent György-hegy - HU | 341 | 38 | 11.14% | 140.88 HUF | 5353.57 HUF | 5 | 1070.71 HUF | 0.29 |
| Dandelion - Brand - HU | 58 | 21 | 36.21% | 87.12 HUF | 1829.54 HUF | 3 | 609.85 HUF | 0.51 |

Osszesen a snapshotban:

- megjelenes: `2964`
- kattintas: `194`
- CTR: `6.55%`
- koltes: `24688.44 HUF`
- konverzio: `19`
- atlag CPC: `127.26 HUF`
- atlagos CPA: `1299.39 HUF`

Fontos:

- a brand kampany hatekony a kis mintaja ellenere,
- a Kisapati kampany jobb minosegu forgalmat hoz, mint a generikus Balaton-felvidek kampany,
- a legnagyobb koltes a legtagabb kampanyban marad.

## 4. Mi mukodik jol

### 4.1 A brand kampany egeszseges

A `Dandelion - Brand - HU` hozza a legerosebb minosegi mutatokat:

- kiemelkedo CTR,
- alacsonyabb CPC,
- a legjobb CPA a lathato kampanyok kozul.

Ez alapjan a brand vedelmi reteget erdemes megtartani es stabilan futtatni.

### 4.2 A Kisapati kampany jobb uzleti alap, mint a generic kampany

A `Dandelion - Kisapáti Szent György-hegy - HU`:

- jobb CTR-t hoz,
- jobb CPA-t hoz,
- erosebb helyi szandekre epul.

Ez azt tamasztja ala, hogy a szukebb, lokacio-kozeli kulcsszostruktura jobban illik a Dandelion ajanlathoz.

### 4.3 A meresi lanc mar nem vakfolt

A mostani healthcheck es a GTM/GA4 audit szerint:

- van GTM trigger a `dnd_booking_click` esemenyre,
- van GTM trigger a `dnd_booking_confirmation` esemenyre,
- mindket esemeny megjelenik GA4 oldalon,
- az Ads accountban is latszik importalt GA4 konverziokent.

Ez nagy elorelepes: a rendszer mar nem csak kattintast, hanem foglalasi vegpontot is ismer.

## 5. Fo problemak

### 5.1 A legtobb penzt tovabbra is a tul tag generic kampany egeti el

A `Dandelion - Szállás Balaton-felvidék - HU` kampany:

- koltesben messze a legnagyobb,
- CTR-ben es CPA-ban gyengebb,
- a korabbi search term audit szerint sok irrelevans vagy gyenge szandeku keresest enged be.

Korabban visszajottek peldaul ilyen mintak:

- `balatonfüred szállás`
- `siófok szállás 1 éjszakára`
- `hotel azúr árak`
- `közvetlen vízparti szállás balaton`
- `aqua villa siófok`

Ez most is a fo koltesi kockazat.

### 5.2 A fo optimalizalasi jel meg mindig nem a legerosebb uzleti cel

Az Ads conversion action listaban:

- `Dandelion - GA4 (web) dnd_booking_click` -> `ENABLED`, `primary`, benne van a conversions mutatoban
- `Dandelion - GA4 (web) dnd_booking_confirmation` -> letezik, de jelen snapshot alapjan nem ez a fo optimalizalasi pont

Ez azt jelenti, hogy a rendszer ma is inkabb booking szandekra optimalizal, nem bizonyitott foglalasra.

### 5.3 A medences kampany egyelore meg nincs validalva adattal

Pozitivum, hogy a `Dandelion - Medencés szállás - HU` mar aktiv. Viszont:

- a jelenlegi teljesitmeny snapshotban meg nincs kulon adat ra,
- igy egyelore nem tudjuk, hogy tenyleg jobban fog-e teljesiteni, mint a generic kampany,
- a kampanyinditast az elso napokban kulon search term es landing oldali kontrollal kell kovetni.

## 6. Audit itelet kampanyonkent

### Dandelion - Brand - HU

Minosites: **JO**

Indok:

- erosen relevans,
- olcso,
- jo minosegu forgalmat hoz.

Teendo:

- maradjon aktiv,
- ne legyen tulszukitva negativ listaval,
- erdemes figyelni, nem eszik-e bele feleslegesen mas kampany.

### Dandelion - Kisapáti Szent György-hegy - HU

Minosites: **JO ALAP**

Indok:

- lokaciosan relevans,
- jobb hatekonysagu, mint a generic kampany,
- jo alap szukebb terjeszkedeshez.

Teendo:

- pontositott kulcsszostruktura,
- search term tisztitas,
- RSA-kban medence / panorama / nyugodt pihenes uzenetek erosithetoek.

### Dandelion - Szállás Balaton-felvidék - HU

Minosites: **TUL TAG**

Indok:

- ez hozza a legnagyobb koltest,
- a historical search term kep alapjan sok benne az irrelevans kattintas,
- nem eleg jo a minoseg ahhoz kepest, mennyi penzt visz el.

Teendo:

- broad visszavagasa,
- negativ lista erosites,
- a generic keresletbol ami ertekes, azt kulon ad groupba vagy kulon kampanyba szervezni.

### Dandelion - Medencés szállás - HU

Minosites: **IGERETES, DE MEG NEM BIZONYITOTT**

Indok:

- jo iranyba mozdul a strukturaban,
- jobban illeszkedik a tenyleges termekigerethez,
- de meg nincs eleg adat a megiteleshez.

Teendo:

- 7-14 napos kulon monitoring,
- search term audit,
- landing oldali booking click vs booking confirmation kulon nezes,
- szuk exact + phrase logikaval tartani.

## 7. P0 akciok

1. A `Balaton-felvidek` kampany broad kulcsszavait vissza kell vagni vagy pausolni.
2. A nem brand kampanyokra kulon negativ kulcsszolista kell:
   - `hotel`
   - `kemping`
   - `olcsó`
   - `1 éjszakára`
   - `vízparti`
   - `jacuzzi`
   - `siófok`
   - `balatonfüred`
3. A `dnd_booking_confirmation` szerepet fel kell emelni a tenyleges optimalizalasi dontesekben.
4. A `Medencés szállás` kampanyt az elso 1-2 hetben kulon kell ellenorizni, nehogy ugyanabba a generic hibaba csusszon bele.

## 8. P1 akciok

1. A jobb kampanyokbol kulon tematika legyen:
   - Kisapati
   - medences szallas
   - panorama / family pool
2. A landing oldalaknal a `/kisapati-medences-szallas/` es a kapcsolodo property oldalak kapjanak elsobbbseget.
3. Heti search term audit menjen, nem csak havi visszanezes.

## 9. Vegso kovetkeztetes

A mostani Google Ads allapot **nem rossz, de meg nem eleg fegyelmezett**. A jo hir, hogy a meres mar sokkal megbizhatobb, mint korabban, es a brand + Kisapati irany bizonyitottan jobb minoseget ad. A fo problema az, hogy a legnagyobb koltes meg mindig a tul tag generic kampanyban ragad.

Ha csak egy dolgot kell most megtenni, az ez: **a generic koltest szukiteni, es a medences + lokacios szandekre atterelni a hangsulyt**.

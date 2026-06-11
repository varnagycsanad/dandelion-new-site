# Dandelion nyelvi copy audit - 2026-06-11

Állapot: JAVÍTVA / ELLENŐRIZVE
Scope: publikus többnyelvű szövegek a `src/pages`, `src/data`, `src/components`, `src/sections` fájlokban
Fókusz: értelmetlen vagy félrefordított szöveg, túl AI-s hangzás, lokalizációs hibák, ékezetek/diakritikák, márka- és névkonzisztencia

## Javítási státusz - 2026-06-11

A fő auditpontok alapján javítás történt:

- cseh diakritikai hibák javítva a szállásadatokban, factory alapreview-kban és több képi alt/title/caption szövegben
- német `Kisapati`, `SZENT GYORGY`, `Aussen`, `Draussen`, `Panorama Pool Bereich` típusú hibák javítva
- német `Basis` / `passt` ismétlések több szállásoldalon természetesebb megfogalmazást kaptak
- angol D1, D2, Fügeház, Vintage, Zsálya, főoldal és szálláslista több AI-s/generikus fordulata konkrétabb copyra lett cserélve
- `npm run build` sikeresen lefutott, 116 oldal generálódott

Nyitva maradó minőségi javaslat: cseh és szlovák anyanyelvi review továbbra is ajánlott a magyar helynevek ragozására és a teljes tone finomítására. Ez nem build- vagy publikálási blocker, inkább végső lokalizációs csiszolás.

## Vezetői összefoglaló

A többnyelvű oldal alapvetően használható, de a fordítások minősége az audit idején nem volt egyenletes. A legfontosabb, biztosan javítható hibák a fenti státusz szerint javítva lettek.

A legnagyobb kockázat a cseh nyelv: több látható szövegben még ASCII-s, ékezet nélküli cseh szerepel. Ez akkor is félkész, gépi fordításos hatást kelt, ha a mondat jelentése érthető.

A szlovák technikailag jobb, mint a cseh, mert kevesebb a konkrét diakritikai hiba, viszont sok helyen nagyon hasonló szerkezetben követi a cseh szöveget. Nem hibás, de sablonos.

A német érthető, de egyenetlen. Vannak természetes részek, máshol viszont hiányzó ékezetek, nem igazán németes szerkezetek és ismétlődő sablonmondatok jelennek meg.

Az angol többnyire tiszta és publikálható, de túl sok benne a generikus, AI-s ritmusú szó: `peaceful`, `calm`, `slow`, `base`, `experience`, `ideal`, `countryside`, `rhythm`. Ettől több szállásoldal inkább fordított/generált szövegnek érződik, nem kézzel írt prémium vendégház-copyként.

## 1. prioritás - Látható cseh ékezet- és diakritikai hibák javítása

Ezek a legsürgősebbek, mert konkrét minőségi hibák.

### Cseh szállásadatok

Fájl: `src/data/accommodation-pages/d2.cs.ts`

Példák:

- `Neni to soukromy bazén pouze pro D2.` -> `Není to soukromý bazén pouze pro D2.`
- `Velka zahrada` -> `Velká zahrada`
- `Grilovani venku` -> `Grilování venku`
- `Zahradni posezení` -> `Zahradní posezení`
- `Turisticke trasy poblíž` -> `Turistické trasy poblíž`
- `Kisapati` valószínűleg legyen `Kisapáti`, ha látható vendégoldali szövegben szerepel

Fájl: `src/data/accommodation-pages/czech-page-factory.ts`

Példák:

- `Velmi prijemne a klidne misto...` -> `Velmi příjemné a klidné místo...`
- `Dum byl cisty, dobre vybaveny a idealni...` -> `Dům byl čistý, dobře vybavený a ideální...`
- `Nemesgulacs - dvur - klidne dny` -> `Nemesgulács - dvůr - klidné dny`

Fájl: `src/data/images/accommodation-images.ts`

Példa:

- `Kryta terasa se zlutymi zidlemi...` -> `Krytá terasa se žlutými židlemi...`

Hatás: ezek nem stílusbeli apróságok, hanem látható hibák. A fordítási szabályzat szerint a cél nyelv valódi betűit kell használni.

## 2. prioritás - Német ASCII és természetellenes német javítása

### Hiányzó ékezetek és német karakterek

Érintett fájlok:

- `src/data/accommodation-pages/d1.de.ts`
- `src/data/accommodation-pages/d2.de.ts`
- `src/data/accommodation-pages/zsalya.de.ts`
- `src/data/accommodation-pages/szololiget.de.ts`

Példák:

- `Kisapati` -> `Kisapáti`
- `SZENT GYORGY-HEGY - KISAPATI` -> `SZENT GYÖRGY-HEGY - KISAPÁTI`
- `Aussenansicht` -> `Außenansicht`
- `Draussen kochen` -> `Draußen kochen`

### Németül fordításízű szerkezetek

Példák:

- `Dandelion D2 passt, wenn Sie...` érthető, de túl sok oldalon ismétlődik.

Természetesebb alternatívák:

- `Dandelion D2 ist geeignet für...`
- `Dandelion D2 ist eine gute Wahl für...`
- `Dandelion D2 eignet sich besonders für...`

Sokszor ismétlődik:

- `ruhige Basis`
- `gute Basis`
- `passt`
- `ruhig`
- `Panorama Pool`

Javasolt váltások:

- `Basis` helyett néha: `Ausgangspunkt`, `Rückzugsort`, `Ferienhaus`, `Unterkunft`
- `Panorama Pool Bereich` helyett: `Poolbereich mit Panorama` vagy `Panorama-Poolbereich`

## 3. prioritás - Angol AI-s ismétlődés csökkentése

Az angol szöveg nem rossz, de sok helyen felismerhetően generált ritmusú.

Gyakran ismétlődő szavak:

- `peaceful`
- `calm`
- `slow`
- `base`
- `experience`
- `ideal`
- `countryside`
- `rhythm`

### Példák

Fájl: `src/data/accommodation-pages/d2.en.ts`

Sűrűn ismétlődő fordulatok:

- `peaceful family-friendly accommodation`
- `A bright, peaceful countryside stay`
- `calm family time`
- `A peaceful base`
- `calm base`
- `good base`
- `peaceful base`
- `slower Balaton days`

Fájl: `src/data/accommodation-pages/fugehaz.en.ts`

Példák:

- `peaceful countryside guesthouse`
- `slow evenings`
- `calm guesthouse`
- `quiet evenings`
- `terrace mornings`
- `outdoor rhythm`
- `part of the experience`

Fájl: `src/data/accommodation-pages/vintage.en.ts`

Példák:

- `peaceful countryside guesthouse`
- `relaxed stay`
- `peaceful countryside atmosphere`
- `slow down`
- `calm daily rhythm`
- `quiet village pace`

Javasolt irány:

- Egy szakaszban elég egy hangulati pozicionáló mondat.
- Utána több konkrétum kell: kert, terasz, hálószobaszám, Balaton-távolság, medencehasználat, környékbeli útvonalak.
- Az `experience` szót csak akkor érdemes használni, ha valódi programot vagy szekciót nevez meg.

Példa kevésbé AI-s átírásra:

Jelenlegi:

`Dandelion D2 is made for calm family time in the Balaton Uplands. The covered terrace, large garden and practical kitchen keep the stay easy, while nearby hills, beaches and wineries give every day a different route.`

Természetesebb:

`Dandelion D2 works well for families who want outdoor space without giving up comfort. The covered terrace is useful throughout the day, the garden gives children room to play, and the kitchen is practical for longer stays. From Kisapáti, beaches, hill walks and wineries are all short drives away.`

## 4. prioritás - Cseh és szlovák sablonosság csökkentése

A cseh és szlovák szállásoldalak gyakran ugyanazt a mondatszerkezetet használják. Ez nem feltétlenül hiba, de sablonos hatást kelt.

Gyakori minták:

- `dobrá základna` / `dobrá základňa`
- `pomalé dny` / `pomalé dni`
- `klidný` / `pokojný`
- `Dandelion X je dobrá volba...`

Javasolt irány:

- A szerkezet maradhat, de ingatlanonként más lead kellene.
- Több konkrét vendégoldali ige kell: `strávit`, `vyrazit`, `vrátit se`, `odpočívat`, `posedět`, `naplánovat`.
- Szlovákban érdemes anyanyelvi ellenőrzést kérni a magyar helynevek ragozására:
  - `pri Badacsonyi`
  - `pri Balatone`
  - `v Kisapáti`
  - `do Tapolcai-medence`

## 5. prioritás - Márka- és névkonzisztencia

Ami jó:

- A háznevek nagyrészt nincsenek lefordítva.
- `Fügeház`, `Zsálya`, `Szőlőliget`, `Szépvölgyi`, `Köveskál` többnyire megmaradnak.
- Angolban nem jelent meg rossz irány, például `Fig House`, `Sage Guesthouse`, `Vintage Cottage`.

Amire figyelni kell:

- Német és cseh látható szövegben még előfordulnak ASCII-s helynevek.
- Az `/en/szallasok/` slug magyar maradt, de a látható label angol. Ez elfogadható, ha tudatos URL-stratégia.
- A `Panorama Pool` minden nyelven márka/szolgáltatásnévként szerepel. Ez rendben van, de egyszer kell jól elmagyarázni, utána nem érdemes minden második mondatban ismételni.

## 6. Jogi oldalak

A jogi oldalak kevésbé marketingesek, ezért kevesebb rajtuk az AI-s hangzás.

Megjegyzés:

- Publikus véglegesítés előtt a jogi fordításokat érdemes anyanyelvi vagy jogi fordítóval ellenőriztetni.
- Az angol jogi szöveg érthető, de egyszerűsített. Ez használhatóság szempontból jó lehet, de nem helyettesít jogi review-t.

## Javasolt javítási sorrend

1. Cseh és német diakritikai hibák javítása látható szövegekben.
2. Cseh factory alapértelmezett review-szövegek javítása, mert több generált oldalon ismétlődnek.
3. Cseh képi alt szövegek átnézése.
4. Angol tone pass a szállásoldalakon: először D2, Fügeház, Vintage, Zsálya.
5. Német idiomatikus simítás: `Basis`, `passt`, `ruhig`, `Panorama Pool Bereich`.
6. Cseh/szlovák anyanyelvi review a magyar helynevek ragozására.

## Gyors verdikt nyelvenként

Angol: érthető és publikálható, de túl ismétlődő és több helyen AI-sima.

Német: érthető, de ékezetjavítás és természetesebb német ritmus kell.

Cseh: jelen állapotban nem végleges publikus copy, amíg az ékezet- és factory-hibák nincsenek javítva.

Szlovák: technikailag jobb, mint a cseh, de sablonos; anyanyelvi tone review ajánlott.

Magyar: nem ez volt az audit fő fókusza; a minták alapján természetesebb, mint a fordítások.

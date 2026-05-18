[CHANGE 2026-05-16 14:05] DANDELION_RULES karcsúsítva és legacy media/admin/runtime nyelvezetre egységesítve.
[CHANGE 2026-05-18 13:20] Tipográfiai source of truth pontosítva: Poppins globális sans, Playfair Display csak display/headline szerepre.
[CHANGE 2026-05-18 15:05] Betűméret-rendszer és mobil olvashatósági guardrail rögzítve.

# DANDELION – DESIGN & STRUCTURE RULES

Ez a fájl a Dandelion új Astro-alapú honlapjának normatív design-, struktúra-, képkezelési és lakásoldali szabályfájlja.

Elsődleges végrehajtási szabályok: `AGENT.md`.
ChatGPT / Codex munkamód: `DANDELION_CHATGPT_RULES.md`.

---

## 1. Alapelv

A Dandelion egy prémium, természetközeli vendégház márka.

A weboldal célja:
- bizalomépítés
- hangulat átadás
- foglalás ösztönzés
- gyors, letisztult, SEO-barát működés

Nem cél:
- klasszikus szálláslista
- tech UI
- túlzott kártyaerdő
- önálló redesign kis taskok közben

---

## 2. Főoldali struktúra

A főoldal alap sorrendje:

1. Hero
2. RegionStories / Szállások
3. Experiences / Élmények
4. Map
5. Why
6. Booking
7. Blog
8. Closing CTA
9. Footer

Tilos:
- blokkot törölni külön döntés nélkül
- sorrendet átírni külön döntés nélkül
- új fő szekciót hozzáadni kis javítási taskban

---

## 3. Design alapok

Stílus:
- természetközeli
- vidéki prémium
- meleg, letisztult
- nagy képek / videók
- nem ultramodern

Font:
- Elsődleges globális font: Poppins
- Display / editorial headline font: Playfair Display
- Hero és fő headline kaphat Playfair Display-t
- body, menü, CTA, label, meta, űrlap, jogi szöveg: mindig Poppins
- Georgia / Times New Roman nem design decision, csak fallback lehet Playfair mögött
- új komponens nem vezethet be új fontot vagy új fallback-stratégiát
- body: 400
- menü: 600
- heading:
  - Poppins heading: 600-700
  - Playfair heading: 400-600

Betűméret:
- body alapszöveg: `1rem`
- hosszabb folyószöveg: `1rem`, line-height `1.6-1.75`
- lead / bevezető szöveg: `1rem-1.08rem`
- kártyaszöveg és rövid leírás: `0.88rem-0.98rem`, tokennel legalább `14px`
- CTA / gomb / menü: minimum `0.82rem`, tokennel legalább `14px`
- label / kicker / meta: `0.72rem-0.78rem`, tokennel legalább `12px-13px`
- mobilon olvasható szöveg minimum: `0.82rem`
- mobilon label / meta minimum: `12px`
- 12px alatti szöveg csak dekoratív, nem információhordozó elemnél engedett
- 10px és 11px mobilon nem használható új tartalmi vagy navigációs elemre
- mobil H1: `1.9rem-2.8rem`
- mobil H2 / section heading: `1.45rem-2.1rem`
- desktop H1: `3rem-4.8rem`, csak valódi hero/display helyzetben lehet nagyobb
- desktop H2 / section heading: `1.65rem-3.2rem`
- kompakt panelen, kártyán, listában tilos hero-méretű headline-t használni
- új font-size értéket csak akkor szabad bevezetni, ha a fenti skálába illeszkedik
- viewport-alapú `vw` betűméret új komponensben nem vezethető be külön döntés nélkül
- negatív `letter-spacing` csak display headline esetén, kizárólag `--dnd-tracking-display-*` tokennel használható; új ad hoc negatív érték nem vezethető be

Színek:
- kiemelő: `#D99E2B`
- szöveg: `#000000`
- háttér: `#FDFBF7`

UI:
- border radius: 5px vagy 8px
- gomb: elegáns, letisztult
- árnyék: minimális vagy nincs

Tilos:
- kék UI
- neon színek
- gradient alapú új design
- material design
- glassmorphism
- erős shadow
- random font

---

## 4. Header szabályok

Desktop:
- hero felett lehet transparent
- scroll után stabil háttér
- logó stabil, animáció nélkül

Tablet:
- 768px felett ne törjön hamburgerre
- szöveges menü maradjon

Mobil:
- hamburger OK
- CTA ne nyomja agyon a felületet

Tilos:
- header redesign külön task nélkül
- logó animáció
- tablet nézet hamburgerre törése 768px felett

---

## 5. Hero szabályok

Hero cél:
- érzelmi belépési pont
- erős Dandelion hangulat
- nagy kép vagy videó
- tiszta, nem túlzsúfolt szöveg

Mobil hero:
- magas hero
- külön mobil kép / vágás előnyben
- következő szakasz ne lógjon be túl korán

Performance:
- csak az oldal fő hero / LCP képe lehet eager vagy preload
- galéria és alacsonyabb képek alapból lazy

---

## 6. Képkezelés / image workflow

A Dandelion képkezelés file-based Astro irányú.

Elvárt irány:
- saját, optimalizált WebP képek
- központi image registry
- apartmentKey-alapú lakásképek
- külön hero / mobile hero / gallery / thumbnail szerepek
- strukturált SEO képadatok
- buildelt statikus frontend

Nem használunk frontend igazságforrásként:
- legacy médiatárat
- legacy admin felületet
- legacy REST/API képforrást
- runtime képbetöltést
- véletlenszerű külső vagy régi média URL-eket

A frontend képek hosszú távú igazságforrása:

```text
src/assets/...
src/data/images/...
```

Átmeneti / meglévő projektállapot miatt előfordulhat `public/images/...`, de új fejlesztési irányként nem szabad lakásonként szétszórt, kézi képkezelést építeni.

Nyers képek:
- nem kerülnek közvetlenül éles frontendbe
- a webes verzió WebP legyen
- eredeti képet nem törlünk archívum nélkül

Kötelező képszerepek lakásoldalnál:
- hero.desktop
- hero.mobile
- gallery[]
- thumbnail / thumb
- alt/title/caption adatok
- sortOrder
- focusPoint, ahol indokolt

Tilos:
- nyers telefonos JPG közvetlen használata éles oldalon
- legacy media URL hardcode-olása komponensbe
- legacy admin visszakötése
- runtime vagy REST/API képforrás visszahozása
- SEO-adatok legacy CMS/admin rendszerből olvasása
- `IMG_1234` jellegű fájlnév
- minden kép eager betöltése
- fontos SEO kép kizárólag CSS background-image-ként
- képek kézi, lakásonként eltérő logikával történő bekötése

---

## 7. SEO képadatok és AI draft

Minden frontendben használt tartalmi képhez legyen értelmes SEO adat.

Cél:
- természetes alt szöveg
- magyar és angol mezők, ha a registry ezt kezeli
- képen ténylegesen látható tartalom leírása
- kulcsszóhalmozás kerülése

AI használható:
- alt/title/caption draft előkészítésére
- képek tartalmi rendszerezésére
- magyar és angol SEO mezők vázlatára

AI draft szabály:
- az AI draft `seoDraft` mezőbe kerülhet
- alapállapot: `approved: false`
- `approved: false` draft státusz, nem hiba
- AI nem állíthat automatikusan `approved: true` értéket
- AI draft nem írhat felül meglévő final / jóváhagyott SEO adatot
- AI nem írhat olyat, ami a képen nem látható

Tilos:
- AI draftot automatikusan végleges SEO adatként kezelni
- kulcsszóhalmozott alt szöveg
- képen nem igazolható állítás
- tömeges SEO mezőfelülírás külön task nélkül

---

## 8. Lakásoldalak / accommodation pages

A lakásoldalak nem készülhetnek kézi másolással.

Kötelező irány:

```text
1 közös sablon
N adatfájl
1 központi image registry
apartmentKey-alapú működés
```

Közös sablon:

```text
src/templates/AccommodationPage.astro
```

Lakásadatok:

```text
src/data/accommodations/*.ts
```

Képek:

```text
src/data/images/...
```

A page fájlok csak vékony wrapperként működhetnek:
- apartmentKey kiválasztása
- adat betöltése
- közös sablon meghívása

Nem tartalmazhatnak:
- saját layoutot
- saját hero implementációt
- saját galéria implementációt
- saját fact ikon logikát
- saját mobil tördelést
- saját CSS rendszert
- D2-ből bemásolt egyedi HTML-struktúrát

---

## 9. Lakásoldali fix blokksorrend

A közös lakásoldali sablon D2 alapján fix sorrendet kövessen:

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

Ez lakásonként nem változhat.

Ha egy lakásnál kevesebb adat van:
- a sablon kezelje kulturáltan
- ne készüljön külön layout
- ne készüljön külön oldalváltozat

---

## 10. Fact / ikon logika

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

A lakás adatfájl csak adatot ad:

```ts
{
  iconKey: "guests",
  label: "Vendégek",
  value: "6 fő"
}
```

Az ikon hozzárendelése a sablon dolga.

Tilos:
- ikonok kézi HTML másolása lakásonként
- eltérő fact layout lakásonként
- egyedi ikonrendszer lakásonként

---

## 11. SabeeApp / foglalási CTA

A foglalási CTA közös sablonlogikával működjön.

Lakásonként adatként kezelendő:
- CTA szöveg
- SabeeApp azonosítók / tokenek
- fallback URL
- roomId, ha van

Tilos:
- lakásonként külön foglalási gomb logika
- SabeeApp működés szétszórása több oldalba
- D2-ből másolt inline foglalási logika
- SabeeApp logika módosítása design task közben

---

## 12. D2 sablonosítási szabály

D2 a vizuális prototípus.

Cél:
- nem új design
- nem új UX
- nem új galériarendszer
- D2 kinézetének és működésének megőrzése közös sablonból

Helyes sorrend:
1. D2 audit, módosítás nélkül
2. adatmodell pontosítás
3. AccommodationPage sablon kialakítása
4. D2 wrapper visszakötése
5. build
6. vizuális összevetés
7. csak ezután további lakások

Elfogadási feltétel:
- D2 desktop azonos
- D2 mobil azonos
- hero működik
- galéria működik
- CTA működik
- build sikeres

---

## 13. Fügeház és további lakások

Fügeház csak akkor migrálható, ha D2 már közös sablonból működik.

Fügeház nem kaphat külön layoutot.

További lakások is ugyanezen az úton jöhetnek:
- D1
- Zsálya
- Szőlőliget
- Szépvölgyi
- Royal Homes
- Vintage

Tilos:
- Fügeház külön design javítása sablon nélkül
- új lakásoldal D2 kézi másolással
- külön galéria
- külön hero
- külön fact ikon rendszer

---

## 14. Kötelező STOP feltételek

STOP, ha:
- új lakásoldal D2 másolással készülne
- layout kerülne page fájlba
- hero logika kerülne page fájlba
- galéria logika kerülne page fájlba
- D2-specifikus kód másik lakásba másolódna
- legacy media/admin/runtime képforrás kerülne vissza
- sablon nélküli oldalépítés indulna
- egy taskban több lakás teljes migrációja történne
- SEO mezők D2-ből másolódnának más lakásra
- AI draft automatikusan éles SEO adatként kerülne be
- Codex redesignolni kezdene

Jelzés:

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

## 15. Végső szabály

A design nem változtatható kis taskban.

A Codex:
- nem tervez új rendszert
- nem optimalizál UX-et önállóan
- nem talál ki új megoldást
- nem javít mellékesen

Csak a meglévő rendszert építi tovább, kis, kontrollált lépésekkel.

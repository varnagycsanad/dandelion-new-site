# Dandelion honlap – Többnyelvű fordítási és lokalizációs workflow

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: uj nyelvi workflow, forditasi ellenorzesi logika, sitemap/hreflang gondolkodas
Do not use for: jelenlegi cseh/nemet allapot megallapitas frissebb repoellenorzes nelkul

Ez a dokumentum a Dandelion új Astro honlap többnyelvű fordításának teljes munkamenete. Célja, hogy új nyelv hozzáadásakor ne ad hoc fordítás történjen, hanem kontrollált, SEO‑biztos, buildelhető és visszaellenőrizhető folyamat.

---

## 1. Alapelv

A honlap többnyelvűsítésénél nem egyszerű szövegfordítás történik, hanem teljes lokalizáció.

**Forrásigazság:**

- Magyar oldal = elsődleges tartalmi forrás.
- Angol oldal = első kész lokalizált minta.
- Új nyelvek = a magyar végleges tartalomból, az angol struktúra és tapasztalat alapján készülnek.

**Minden új nyelvnél kötelező kezelni:**

1. route-ok
2. oldal- és adatfájlok
3. header
4. footer
5. language switcher
6. sitemap
7. canonical
8. hreflang
9. schema / JSON-LD
10. SEO title
11. meta description
12. contact oldal
13. szálláslista
14. szállás detail oldalak
15. kapcsolódó szállások / more stays linkek
16. élményoldalak
17. SabeeApp nyelvi paraméter
18. build
19. dist ellenőrzés
20. commit + push

Egy nyelv nem tekinthető késznek, amíg ezek nincsenek rendben.

---

## 2. Ajánlott nyelvi sorrend

A javasolt sorrend:

1. **HU** – forrásnyelv, jelenlegi alap
2. **EN** – első nemzetközi nyelv, már elkészült alapverzió
3. **DE** – következő fő cél, német vendégkör miatt
4. **PL / CZ / SK / IT** – csak akkor, ha üzletileg indokolt

Új nyelvnél mindig először audit kell, nem azonnali fordítás.

---

## 3. Route stratégia

A Dandelion oldalon a nyelvi route-ok legyenek egyértelműek, vendégbarátok és SEO‑szempontból tiszták.

### Magyar

```text
/
/szallasok/
/dandelion-d2/
/dandelion-fugehaz/
/elmenyek/
/elmenyek/kerekpar/
/kapcsolat/
```

### Angol

```text
/en/
/en/szallasok/
/en/dandelion-d2/
/en/dandelion-fugehaz/
/en/experiences/
/en/bike-rental/
/en/contact/
```

### Német javasolt irány

```text
/de/
/de/unterkuenfte/
/de/dandelion-d2/
/de/dandelion-fugehaz/
/de/erlebnisse/
/de/fahrradverleih/
/de/kontakt/
```

A németnél érdemes fordított, természetes slugokat használni, például:

```text
/de/unterkuenfte/
/de/erlebnisse/
/de/fahrradverleih/
/de/weingueter/
/de/balaton/
/de/zeugenberge/
```

A szállásnevek slugjai maradhatnak márkanév jellegűek:

```text
/de/dandelion-d1/
/de/dandelion-d2/
/de/dandelion-fugehaz/
/de/dandelion-zsalya/
/de/szololiget/
/de/szepvolgyi/
/de/royal/
/de/dandelion-vintage/
/de/dandelion-koveskal/
```

---

## 4. Fordítási sorrend új nyelvnél

Új nyelvet nem egyben kell megcsinálni. A helyes sorrend:

### 0. Lokalizációs audit

Csak olvasás, fájlmódosítás nélkül.

Cél:

- milyen magyar oldalak vannak
- milyen angol minta már létezik
- milyen route-okat kell létrehozni
- milyen adatfájlokat kell másolni / fordítani
- hol van a sitemap
- hol van a localized route / hreflang logika
- hol van a language switcher route map
- hol van a header/footer
- hol vannak a SabeeApp linkek
- milyen nyelvi paramétert támogat a SabeeApp

### 1. Alap nyelvi váz

Első implementációs kör:

```text
/de/
/de/unterkuenfte/
/de/kontakt/
```

Ezzel együtt:

- header alap linkek
- footer alap linkek
- language switcher
- sitemap
- canonical
- hreflang
- WebSite schema nyelve
- contact linkek

Build, commit, push.

### 2. Szállásoldalak

Második implementációs kör:

```text
/de/dandelion-d1/
/de/dandelion-d2/
/de/dandelion-fugehaz/
/de/dandelion-zsalya/
/de/szololiget/
/de/szepvolgyi/
/de/royal/
/de/dandelion-vintage/
/de/dandelion-koveskal/
```

Ellenőrizendő:

- szálláslista linkek
- szállás detail oldalak
- kapcsolódó szállások linkjei
- booking CTA-k
- schema / LodgingBusiness
- title/meta
- képek
- lightbox
- SabeeApp nyelv

Build, commit, push.

### 3. Élményoldalak

Harmadik implementációs kör:

```text
/de/erlebnisse/
/de/fahrradverleih/
/de/weingueter/
/de/balaton/
/de/zeugenberge/
```

Ellenőrizendő:

- élmény gyűjtőoldal
- kártyalinkek
- nincs coming soon
- nincs magyar vagy angol route rossz helyen
- nincs kitalált ár, partnerígéret, nyitvatartás
- sitemap/hreflang/localized route párok

Build, commit, push.

### 4. P0 audit

Minden nagy nyelvi csomag után kötelező.

Keresendő:

```text
coming soon
TODO
placeholder
template
review blokk
első körös
Oldalállapot
src=""
href=""
```

Ellenőrizendő:

- rossz magyar route az új nyelvű oldalon
- rossz angol route az új nyelvű oldalon
- nem létező link
- rossz canonical
- rossz hreflang
- rossz sitemap
- language switcher hibák
- contact linkek
- booking linkek
- related / more stays linkek

### 5. P0 javítás

Csak az auditban talált P0 hibák javítása.

P0 hibának számít:

- törött link
- nem létező route
- rossz nyelvű tartalmi link
- rossz canonical
- rossz hreflang
- sitemap hiba
- vendégoldalon látszó template/TODO/placeholder szöveg
- üres href/src
- build hiba

Build, commit, push.

### 6. P1 audit

P1 = fontos minőségi és nyelvi hibák.

Vizsgálandó:

- schema nyelve
- WebSite description
- LodgingBusiness description
- breadcrumb label
- SabeeApp nyelvi paraméter
- footer teljessége
- header teljessége
- gyenge vagy félkész szövegek
- title/meta hossz
- duplikált title/meta
- gallery altok nyelve
- CTA szövegek

### 7. P1 javítás

Csak a valóban fontos hibákat kell javítani.

Példák:

- schema rossz nyelve
- booking link rossz nyelve
- footerből hiányzó fő linkek
- több oldalon látszó általános template szöveg
- félrevezető CTA

Build, commit, push.

### 8. P2 finomítás

Ez már nem blocker.

P2 példák:

- természetesebb képi alt szövegek
- title/meta rövidítése
- footer gazdagítása
- belső linkelés bővítése
- CTA szövegek finomítása
- hosszabb élményszövegek
- stílusjavítás

Ezeket nem kell az indulási alapverzióhoz kötelezően lezárni.

---

## 5. Adatfájl-stratégia

A szállásoldalaknál a nyelvi adatfájlok legyenek külön kezelve.

Javasolt minta:

```text
src/data/accommodation-pages/d2.ts       magyar
src/data/accommodation-pages/d2.en.ts    angol
src/data/accommodation-pages/d2.de.ts    német
```

Ugyanez minden szállásnál.

A page fájl csak wrapper legyen, ne tartalmazzon nagy saját layoutot.

Jó irány:

```text
src/pages/dandelion-d2.astro
src/pages/en/dandelion-d2.astro
src/pages/de/dandelion-d2.astro
```

A page fájl feladata:

- megfelelő nyelvi adat betöltése
- közös template meghívása
- SEO/canonical/hreflang átadása, ha a rendszer így működik

Tilos:

- D2 HTML kézi másolása minden nyelvre
- külön galéria logika nyelvenként
- külön hero logika nyelvenként
- külön mobil layout nyelvenként

---

## 6. Sitemap, canonical, hreflang

Minden új nyelvnél kötelező.

Példa HU–EN–DE route pár:

```text
/szallasok/
/en/szallasok/
/de/unterkuenfte/
```

```text
/elmenyek/bor-es-panorama/
/en/wineries/
/de/weingueter/
```

Ellenőrizendő:

- minden indexelhető oldal benne van-e a sitemapben
- nincs-e nem létező oldal a sitemapben
- canonical saját nyelvi URL-re mutat-e
- hreflang minden nyelvi párt tartalmaz-e
- x-default logika rendben van-e, ha a projekt használja
- nincs-e fontos oldalon véletlen noindex

A `dist/sitemap.xml` fájlt nem szabad kézzel módosítani. Mindig a forrásadatot kell módosítani.

---

## 7. Language switcher szabály

Minden fontos oldalon a nyelvváltó a megfelelő párra vigyen.

Példa:

```text
HU: /elmenyek/balaton/
EN: /en/lake-balaton/
DE: /de/balaton/
```

Nem jó:

```text
/de/balaton/ → /en/experiences/
/de/balaton/ → /
/de/balaton/ → /elmenyek/
```

Ha nincs megfelelő nyelvi pár, akkor azt külön dönteni kell:

- vagy nem jelenik meg az adott nyelvváltó
- vagy a legközelebbi kategóriaoldalra visz
- de ezt explicit kell kezelni, nem véletlen fallbackként

---

## 8. Header és footer szabály

Minden új nyelvnél ellenőrizni kell:

### Header

- főoldal link
- szállások link
- szállás dropdown
- élmények link
- kapcsolat link
- booking CTA
- language switcher

### Footer

- szállások link
- teljes vagy logikus szálláslista
- élmények link
- kapcsolat link
- jogi linkek, ha vannak
- CTA linkek

Új nyelvű oldalon ne maradjon más nyelvű fő tartalmi link.

Megengedett kivétel:

- language switcher link másik nyelvre
- jogi oldal, ha nincs lokalizált pár és ez tudatos

---

## 9. SabeeApp nyelvi szabály

A SabeeApp linkeknél a nyelvet külön kezelni kell.

Jelenlegi ismert állapot:

```text
HU: lang=Hu
EN: lang=En
```

Új nyelvnél nem szabad találgatni.

Németnél külön audit kell:

```text
SabeeApp DE nyelvi paraméter audit – fájlmódosítás nélkül
```

Csak akkor szabad használni, ha bizonyított:

```text
DE: lang=De
```

vagy amit a SabeeApp ténylegesen használ.

Tilos:

- tokenek módosítása
- room ID-k módosítása
- OpenBE() logika átírása
- booking működés refaktorálása fordítás közben

A brand slug, például `Dandelion-Vendégházak`, önmagában nem javítandó, ha az SabeeApp PMS / booking engine slug.

---

## 10. Fordítási minőség szabályai

A fordítás nem lehet tükörfordítás.

A Dandelion hangulat maradjon:

```text
természetközeli
vendégbarát
nyugodt
prémium vidéki
nem túl marketinges
nem hotel-lánc jellegű
```

Tilos:

```text
kitalált távolság
kitalált ár
kitalált nyitvatartás
kitalált partnerkapcsolat
kitalált szolgáltatás
luxury túlzás
best / perfect / hidden gem túlhasználat
AI-szagú marketing
```

Különösen figyelni kell:

- férőhely
- szobaszám
- ágyak
- fürdők
- medence
- június 1. dátum
- klíma
- állatbarát / családbarát állítás
- Balaton látható vagy csak közel van
- vízi programok
- kerékpár árak
- SabeeApp booking szövegek

---

## 11. Kötelező keresések új nyelv build után

A buildelt `dist/{lang}` alatt keresni kell:

```text
coming soon
English page coming soon
TODO
placeholder
template
review blokk
első körös
Oldalállapot
szerkeszthető
technikai bekötés
src=""
href=""
```

Nyelvi route hibák keresése:

Példa németnél:

```text
/szallasok/
/elmenyek/
/kapcsolat/
/en/
/en/szallasok/
/en/experiences/
```

Fontos:

- language switcherben más nyelvi link nem hiba
- CSS-ben a `grid-template-*` nem hiba
- saját nevekben a magyar ékezet nem hiba

---

## 12. Build és commit szabály

Minden implementációs task végén:

```text
npm run build
```

Ha sikeres és nincs scope-on kívüli diff:

```text
git stage
git commit
git push
```

A commit legyen kicsi és érthető.

Jó commitok:

```text
Német alap route-ok és navigáció
Német szállásoldalak első csomag
Német élményoldalak első csomag
Német P0 linkhibák javítása
Német P1 nyelvi és SEO javítások
```

Rossz commit:

```text
Teljes német oldal kész
```

Az túl nagy és nehezen visszakereshető.

---

## 13. Codex munkaszabály

Minden Codex task elején:

```text
WORKSPACE LOCK:
C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site
```

Minden task első lépése:

```text
git status
```

Ha nem clean:

```text
STOP
```

és írja le a dirty fájlokat.

Codexnek mindig meg kell adni:

- pontos cél
- pontos scope
- mely fájlokat érintheti
- mit tilos módosítani
- kell-e build
- kell-e commit/push
- milyen RESULT blokkot adjon vissza

Egy task = egy logikai módosítás.

Tilos:

- nagy refaktor
- unrelated cleanup
- design redesign fordítás közben
- SabeeApp módosítás mellékesen
- kép SEO átírás mellékesen
- több nyelv egyszerre

---

## 14. Új nyelv kész állapot definíciója

Egy nyelv akkor tekinthető kész alapverziónak, ha:

1. van főoldal
2. van szálláslista
3. minden fontos szállás detail oldal létezik
4. van élmény gyűjtőoldal
5. vannak alap élmény aloldalak
6. van contact oldal
7. header jó
8. footer jó
9. language switcher jó
10. sitemap jó
11. canonical jó
12. hreflang jó
13. schema nyelve jó
14. booking CTA nyelve jó
15. nincs rossz nyelvű tartalmi link
16. nincs coming soon / TODO / template
17. nincs üres href/src
18. build sikeres
19. commit + push kész
20. repo clean

Ha ezek közül bármelyik hiányzik, a nyelv még nem kész, csak részben kész.

---

## 15. Német lokalizáció javasolt konkrét munkamenete

### 1. DE lokalizációs audit

Csak audit, nincs módosítás.

Kimenet:

- HU oldalak listája
- EN mintaoldalak listája
- javasolt DE route-ok
- létrehozandó fájlok
- módosítandó központi fájlok
- SabeeApp DE paraméter helyzete
- kockázatok
- első implementációs task javaslat

### 2. DE alap route-ok

```text
/de/
/de/unterkuenfte/
/de/kontakt/
```

Plusz:

- header
- footer
- sitemap
- hreflang
- canonical
- language switcher
- schema

### 3. DE szállásoldalak

```text
/de/dandelion-d1/
/de/dandelion-d2/
/de/dandelion-fugehaz/
/de/dandelion-zsalya/
/de/szololiget/
/de/szepvolgyi/
/de/royal/
/de/dandelion-vintage/
/de/dandelion-koveskal/
```

### 4. DE élményoldalak

```text
/de/erlebnisse/
/de/fahrradverleih/
/de/weingueter/
/de/balaton/
/de/zeugenberge/
```

### 5. DE P0 audit

Kötelező.

### 6. DE P0 javítás

Csak kritikus hibák.

### 7. DE P1 audit

Schema, SabeeApp, footer, title/meta, gyenge szövegek.

### 8. DE P1 javítás

Csak valóban fontos hibák.

### 9. DE P2 finomítás

Képi altok, belső linkek, stílus, hosszabb tartalom.

---

## 16. Fordítási munkamenet rövid verziója

Ha csak gyorsan kell emlékezni:

```text
1. Audit, nincs módosítás
2. Alap route-ok + header/footer + contact
3. Szállásoldalak
4. Élményoldalak
5. Sitemap / canonical / hreflang / language switcher
6. SabeeApp nyelv
7. Build
8. P0 audit
9. P0 javítás
10. P1 audit
11. P1 javítás
12. P2 később
13. Commit + push minden tiszta kör végén
```

---

## 17. Végső szabály

A fordítási projektben nem az a cél, hogy „legyen valami az adott nyelven”.

A cél:

```text
minden nyelv külön vendégoldalként működjön,
helyes linkekkel,
helyes SEO-val,
helyes booking nyelvvel,
és ne látszódjon rajta, hogy utólag lett összerakva.
```

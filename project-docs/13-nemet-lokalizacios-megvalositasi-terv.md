# 13 - Nemet lokalizacios megvalositasi terv

Statusz: JAVASOLT
Letrehozva: 2026-05-25

## Cel

Ez a dokumentum a Dandelion Astro honlap nemet nyelvu lokalizaciojanak biztonsagos megvalositasi terve.

A cel nem egyszeru szovegforditas, hanem teljes DE vendegoldal:

- sajat nemet route-okkal
- helyes canonical es hreflang logikaval
- sitemapbe kotott indexelheto oldalakkal
- nemet headerrel es footerrel
- helyes language switcher parokkal
- ellenorzott SabeeApp nyelvi parameterrel
- buildelheto, auditolhato allapottal

## Olvasott forrasok

Audit soran atnezett dokumentacio:

- osszes repobeli `.md` fajl, `node_modules` nelkul: 51 db
- `.mdf` fajl: nem talalhato

Legfontosabb forrasok:

- `dandelion_tobbnyelvu_forditasi_workflow.md`
- `project-docs/DANDELION_TRANSLATION_RULES.md`
- `project-docs/current-sitemap-audit-2026-05-24.md`
- `project-docs/05-seo-struktura.md`
- `project-docs/06-foglalasi-cta-logika.md`
- `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_AUDIT.md`
- `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`

## Kiindulasi allapot

### Repo allapot auditkor

Auditkor a repo nem volt teljesen clean, de csak untracked log / report fajlok latszottak:

```text
.codex-devserver.err.log
.codex-devserver.log
tmp/lighthouse-desktop-report.html
tmp/lighthouse-desktop-report.json
tmp/lighthouse-report.html
tmp/lighthouse-report.json
```

Ezekhez a nemet lokalizacios audit nem nyult.

### Jelenlegi DE allapot

Letezik egy nemet placeholder oldal:

```text
src/pages/de.astro
```

Publikus route:

```text
/de/
```

Jelenlegi viselkedes:

- `noindex={true}`
- `canonicalPath="/"`
- nem szerepel a sitemapben
- nem teljes nemet fooldal
- a CTA magyar `/kapcsolat/` oldalra mutat
- a header/footer nem nemet lokalizacio szerint mukodik

Kovetkeztetes: a nemet oldal jelenleg csak elokeszitett placeholder, nem kesz lokalizacio.

## Technikai audit

### SEO es sitemap

Erintett fo fajl:

```text
src/data/site-seo.ts
```

Jelenlegi allapot:

- `LOCALIZED_ROUTE_PAIRS` csak HU/EN parokat tartalmaz
- `SITEMAP_PATHS` csak HU/EN indexelheto oldalakat tartalmaz
- `getLocalizedRouteAlternates()` csak `hu`, `en`, `x-default` alternates listat ad
- DE route parok nincsenek bekotve

Teendo:

- route par modell DE-vel bovites
- sitemapbe csak kesz, indexelheto DE oldalak kerulhetnek
- canonical minden DE oldalon sajat DE URL-re mutasson
- hreflang tartalmazza a HU/EN/DE parokat
- `x-default` tovabbra is tudatosan a magyar vagy kijelolt alap oldalra mutasson

### BaseLayout

Erintett fo fajl:

```text
src/layouts/BaseLayout.astro
```

Jelenlegi allapot:

- `lang` tipus mar tartalmazza a `de` erteket
- `ogLocale` es schema language szinten van `de_DE` es `de-DE`
- header szovegek csak HU/EN agra vannak keszitve
- booking nyelv csak HU/EN:

```text
HU: lang=Hu
EN: lang=En
```

- language switcher map csak HU/EN route parokra epul
- DE gomb jelenleg pending jellegu

Teendo:

- DE header szovegek
- DE navigacios linkek
- DE szallas dropdown
- DE language switcher route parok
- DE booking nyelvi parameter csak audit utan
- DE transparent header path lista bovites

### Footer

Erintett fo fajl:

```text
src/components/SiteFooter.astro
```

Jelenlegi allapot:

- footer csak HU/EN logikat kezel
- booking link csak HU/EN nyelvet hasznal
- jogi es hasznos linkek csak HU/EN valtozatban vannak

Teendo:

- DE footer copy
- DE szallas linkek
- DE hasznos linkek
- DE language/legal logika
- ha nincs kesz DE jogi oldal, akkor explicit dontes kell: ne linkelje, vagy tudatos fallback

### Szallasoldali adatmodell

Erintett fo fajlok:

```text
src/data/accommodation-pages/*.ts
src/templates/AccommodationPage.astro
src/lib/accommodation-page-adapters.ts
```

Jelenlegi allapot:

- HU es EN adatfajlok leteznek
- DE adatfajlok nem leteznek
- `AccommodationPageLocale` jelenleg csak:

```text
"hu" | "en"
```

Teendo:

- `AccommodationPageLocale` bovites `de` ertekkel
- `AccommodationPage.astro` DE template szovegek
- `*.de.ts` adatfajlok
- DE wrapper oldalak
- related stay linkek DE routeokra
- gallery alt/title/caption fallback ellenorzes

### SabeeApp

Jelenlegi ismert allapot:

```text
HU: lang=Hu
EN: lang=En
```

DE parameter nincs bizonyitva.

Szabaly:

- nem szabad talalgatni
- nem szabad tokeneket, room ID-kat, `OpenBE()` logikat vagy booking engine slugot modositani
- DE booking linkhez kulon audit kell

Audit kerdes:

```text
SabeeApp DE nyelvi parameter valoban lang=De?
```

Amig nincs bizonyitva, a DE booking linkeknel ket biztonsagos opcio van:

- ideiglenesen contact/inquiry CTA
- vagy SabeeApp link valtozatlan technikai parameterekkel, de csak jovahagyott DE `lang` ertekkel

## Javasolt DE route terkep

### Alap oldalak

```text
/de/
/de/unterkuenfte/
/de/kontakt/
```

### Szallasoldalak

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

### Elmenyoldalak

```text
/de/erlebnisse/
/de/fahrradverleih/
/de/weingueter/
/de/balaton/
/de/zeugenberge/
```

### Kesobbi vagy kulon dontest igenylo oldalak

```text
/de/panorama-pool/
/de/agb/
/de/datenschutzerklaerung/
/de/impressum/
```

A jogi oldalak DE verzioja kulon jogi/nyelvi review-t igenyel, ezert nem javasolt automatikusan az elso implementacios csomagba tenni.

## Biztonsagos megvalositasi lepesek

### 1. DE technikai alap

Cel:

- `de` locale teljes bekotese a kozponti helper es layout retegekbe
- meg nem teljes DE oldalrendszer

Erintheto fajlok:

```text
src/data/site-seo.ts
src/layouts/BaseLayout.astro
src/components/SiteFooter.astro
src/lib/accommodation-page-adapters.ts
src/templates/AccommodationPage.astro
```

Kimenet:

- DE locale tipusok kezelve
- DE header/footer szoveghelyek elokeszitve
- DE route par modell elokeszitve
- build sikeres

### 2. DE alap oldalak

Cel:

```text
/de/
/de/unterkuenfte/
/de/kontakt/
```

Erintheto fajlok:

```text
src/pages/de/index.astro
src/pages/de/unterkuenfte.astro
src/pages/de/kontakt.astro
src/pages/de.astro
src/data/site-seo.ts
```

Megjegyzes:

- a mostani `src/pages/de.astro` placeholdert vagy at kell helyezni `src/pages/de/index.astro` formara, vagy tudatosan cserelni kell
- a kesz DE fooldal ne legyen noindex
- canonical legyen `/de/`

Kimenet:

- alap DE oldalak mukodnek
- sitemap/canonical/hreflang csak ezekre bovul
- header/footer DE alap linkekkel mukodik
- build sikeres

### 3. Header, footer, language switcher P0 bekotes

Cel:

- DE oldalon ne maradjon magyar vagy angol fo tartalmi navigacio
- nyelvvalto minden kesz oldalnal megfelelo parra vigyen

Ellenorizendo route parok:

```text
HU: /
EN: /en/
DE: /de/

HU: /szallasok/
EN: /en/szallasok/
DE: /de/unterkuenfte/

HU: /kapcsolat/
EN: /en/contact/
DE: /de/kontakt/
```

Kimenet:

- DE nyelvvato aktiv csak kesz parokon
- nincs veletlen fallback
- build sikeres

### 4. DE szallasadat fajlok

Cel:

- nemet adatfajlok letrehozasa minden fo szallasoldalhoz

Letrehozando fajlok:

```text
src/data/accommodation-pages/d1.de.ts
src/data/accommodation-pages/d2.de.ts
src/data/accommodation-pages/fugehaz.de.ts
src/data/accommodation-pages/zsalya.de.ts
src/data/accommodation-pages/szololiget.de.ts
src/data/accommodation-pages/szepvolgyi.de.ts
src/data/accommodation-pages/royal_homes.de.ts
src/data/accommodation-pages/vintage.de.ts
src/data/accommodation-pages/koveskal.de.ts
```

Szabalyok:

- hazneveket nem szabad leforditani
- helyneveket nem szabad agresszivan atnevezni
- nem lehet kitalalt ar, tavolsag, szolgaltatas, partnerigeret
- Koveskal booking/CTA kulon kezelt, mert nincs SabeeApp booking link
- DE SabeeApp `lang` parameter csak bizonyitas utan kerulhet be

Kimenet:

- adatfajlok keszek
- build meg nem feltetlenul publikalja oket, ha wrapper nincs

### 5. DE szallas wrapper oldalak

Cel:

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

Letrehozando fajlok:

```text
src/pages/de/dandelion-d1.astro
src/pages/de/dandelion-d2.astro
src/pages/de/dandelion-fugehaz.astro
src/pages/de/dandelion-zsalya.astro
src/pages/de/szololiget.astro
src/pages/de/szepvolgyi.astro
src/pages/de/royal.astro
src/pages/de/dandelion-vintage.astro
src/pages/de/dandelion-koveskal.astro
```

Kimenet:

- DE szallasoldalak leteznek
- canonical sajat DE URL
- hreflang HU/EN/DE
- related stay linkek DE oldalakra mutatnak
- build sikeres

### 6. DE elmenyoldalak

Cel:

```text
/de/erlebnisse/
/de/fahrradverleih/
/de/weingueter/
/de/balaton/
/de/zeugenberge/
```

Szabalyok:

- nincs coming soon
- nincs magyar vagy angol route rossz helyen
- nincs kitalalt ar, nyitvatartas vagy partnerigeret
- elmenyoldali CTA-k nemetul jelenjenek meg

Kimenet:

- DE elmenyoldalak elerhetok
- sitemap/hreflang bovul
- build sikeres

### 7. SabeeApp DE audit es CTA veglegesites

Cel:

- bizonyitani, hogy a nemet SabeeApp parameter mi

Lehetseges eredmenyek:

```text
DE: lang=De
```

vagy mas SabeeApp altal tenylegesen hasznalt ertek.

Tiltott modositas:

- token csere
- room ID csere
- PMS slug csere
- `OpenBE()` refaktor
- booking mukodes atirasa forditasi task kozben

Kimenet:

- DE booking CTA-k jovahagyott technikai format hasznalnak
- Koveskal tovabbra is kulon inquiry/contact agat kap

### 8. DE P0 audit

Build utan kotelezo keresni:

```text
coming soon
English page coming soon
TODO
placeholder
template
review blokk
elso koros
Oldalallapot
szerkesztheto
technikai bekotes
src=""
href=""
```

DE route hibak:

```text
/szallasok/
/elmenyek/
/kapcsolat/
/en/
/en/szallasok/
/en/experiences/
```

Fontos:

- language switcherben mas nyelvi link nem hiba
- markanevben vagy helynevben magyar ekezet nem hiba
- CSS `grid-template-*` nem hiba

Kimenet:

- P0 hibak listaja
- csak kritikus hibak javitasa kovetkezhet

### 9. DE P1 audit es javitas

Vizsgalando:

- schema `inLanguage`
- WebSite description
- LodgingBusiness description
- breadcrumb label
- SabeeApp nyelvi parameter
- footer teljeessege
- header teljeessege
- title/meta hosszak
- duplikalt title/meta
- gallery altok nyelve
- CTA szovegek

Kimenet:

- fontos minosegi hibak javitva
- build sikeres
- repo clean, ha commit/push is tortenik

## Javasolt commit csomagolas

Nem javasolt egyetlen nagy commit:

```text
Teljes nemet oldal kesz
```

Javasolt kisebb commitok:

```text
Nemet lokalizacios alap es SEO route modell
Nemet alap oldalak es navigacio
Nemet szallasadatok elso csomag
Nemet szallasoldalak bekotese
Nemet elmenyoldalak bekotese
Nemet P0 linkhibak javitasa
Nemet P1 SEO es nyelvi javitasok
```

## Kesz allapot definicio

A nemet alapverzio akkor tekintheto kesznek, ha:

1. van `/de/` fooldal
2. van `/de/unterkuenfte/` szallaslista
3. van `/de/kontakt/` kapcsolat oldal
4. minden fo szallas detail oldal letezik
5. van `/de/erlebnisse/` elmeny gyujtooldal
6. vannak alap DE elmeny aloldalak
7. header nemetul mukodik
8. footer nemetul mukodik
9. language switcher helyes HU/EN/DE parokra visz
10. sitemap tartalmazza az indexelheto DE oldalakat
11. canonical sajat DE URL-re mutat
12. hreflang tartalmazza a HU/EN/DE parokat
13. schema nyelve `de-DE`
14. booking CTA nyelve audit alapjan helyes
15. nincs rossz nyelvu tartalmi link
16. nincs coming soon / TODO / template szoveg
17. nincs ures href/src
18. `npm run build` sikeres
19. commit/push kesz, ha ez volt a task scope-ja
20. repo clean

## Elso javasolt implementacios task

```text
WORKSPACE LOCK:
C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site

Cel:
Nemet lokalizacio technikai alapjanak es elso harom oldalanak bekotese:
/de/
/de/unterkuenfte/
/de/kontakt/

Scope:
- csak DE alap oldalak
- BaseLayout DE header szovegek es linkek
- SiteFooter DE alap footer
- site-seo DE route parok az elso harom oldalra
- sitemap/canonical/hreflang csak letezo DE oldalakra

Tilos:
- szallas detail oldalak teljes forditasa
- elmenyoldalak teljes forditasa
- SabeeApp token, room ID, OpenBE logika modositasa
- design redesign
- image registry modositas
- jogi oldalak automatikus nemet forditasa

Build:
npm run build

Result:
- modositott fajlok listaja
- DE route-ok listaja
- sitemap/hreflang ellenorzes
- P0 keresesi eredmeny
```

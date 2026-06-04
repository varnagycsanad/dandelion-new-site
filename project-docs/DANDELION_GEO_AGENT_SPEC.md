# DANDELION GEO AGENT SPEC

## 1. Cél

A GEO Agent célja, hogy hetente automatikusan figyelje a Dandelion Vendégházak online keresési és AI-keresési lehetőségeit, és rövid, érthető e-mail jelentést készítsen.

Az agent:

- figyel,
- adatot gyűjt,
- összegez,
- javasol.

Az agent NEM:

- ír át automatikusan honlapot,
- indít vagy módosít Google Ads kampányt,
- módosít GA4/GTM/Search Console beállításokat,
- publikál tartalmat jóváhagyás nélkül.

## 2. Kiinduló állapot

Rögzített kiinduló állapot:

- A Dandelion honlap új Astro alapú rendszerben épül.
- GA4 mérés működik.
- GTM eseménylánc működik.
- Fő konverziós esemény: `dnd_booking_click`.
- Google Ads fiók aktív, fizetés beállítva.
- Régi Smart/PMax jellegű kampányok nem indulnak újra automatikusan.
- Search Console adat jelenleg kevés és főleg brand keresésekből áll.
- A GEO irány ezért nem csak saját Search Console adatra épül, hanem piaci kérdéskutatásra is.

## 3. Figyelendő adatforrások

### 3.1 Google Search Console

Figyelje:

- új lekérdezések,
- megjelenések,
- kattintások,
- CTR,
- átlagos pozíció,
- érintett URL-ek.

Külön jelölje:

- brand keresések,
- nem-brand keresések,
- növekvő kérdések,
- olyan lekérdezések, ahol sok a megjelenés, de kevés a kattintás.

### 3.2 GA4

Figyelje:

- oldalmegtekintések,
- aktív felhasználók,
- forgalmi források,
- `dnd_booking_click` események,
- mely oldalak után történik foglalási kattintás.

### 3.3 Google Ads

Figyelje:

- aktív kampányok státusza,
- költés,
- kattintások,
- konverziók,
- keresési kifejezések, ha van Search Terms adat,
- irreleváns keresések,
- potenciális új kulcsszólehetőségek.

### 3.4 Google Trends / piaci trendek

Figyelendő témák:

- Balaton-felvidék szállás
- Badacsony szállás
- Szent György-hegy szállás
- Kisapáti szállás
- medencés szállás Balaton
- medencés szállás Badacsony környékén
- családbarát szállás Balaton-felvidék
- kutyabarát szállás Balaton-felvidék
- vendégház Balaton-felvidék
- balatoni nyaralás családdal

### 3.5 AI kereső / GEO monitor

Későbbi fázisban figyelje:

- Google AI Overview / AI Mode válaszokban megjelenik-e Dandelion,
- Gemini válaszokban megjelenik-e Dandelion,
- ChatGPT webes válaszokban megjelenik-e Dandelion,
- Perplexity válaszokban megjelenik-e Dandelion.

Tesztkérdések például:

- Hol érdemes megszállni a Balaton-felvidéken családdal?
- Van medencés szállás Badacsony környékén?
- Hol szálljunk meg a Szent György-hegy közelében?
- Melyik szállás jó Kisapátiban kiránduláshoz?
- Kutyabarát szállás Balaton-felvidéken?
- Csendes vendégház Balaton közelében?

## 4. Dandelion GEO kérdés-adatbázis

Az agent későbbi célja egy kérdés-adatbázis karbantartása.

Minden kérdéshez rögzítendő:

- kérdés / keresési kifejezés,
- forrás,
- téma,
- keresési szándék,
- becsült érték,
- kapcsolódó Dandelion ház vagy oldal,
- van-e rá jelenleg tartalom,
- tartalom erőssége,
- javasolt teendő.

Témacsoportok:

- családos nyaralás,
- medencés szállás,
- kutyabarát szállás,
- Szent György-hegy,
- Badacsony környéke,
- Balaton-felvidék,
- borvidék / pincék,
- túrázás,
- csendes pihenés,
- vendégházak összehasonlítása.

## 5. Heti e-mail riport

Az agent minden hétfő reggel küldjön rövid riportot.

Riport szerkezete:

```md
# Dandelion GEO heti jelentés

## Rövid összkép

3-5 mondatban.

## Fontos változások

- Search Console változások
- GA4 változások
- Ads változások
- trendváltozások

## Új lehetőségek

Sorolja fel a legfontosabb 5-10 új kérdést vagy témát.

## GEO hiányok

Milyen kérdésekre nincs még jó válasz a honlapon?

## Javasolt heti teendők

Maximum 3 konkrét javaslat.

## Figyelmeztetések

Például:

- sok megjelenés, kevés kattintás,
- romló pozíció,
- irreleváns Ads keresési kifejezés,
- növekvő trend, amelyre nincs tartalom.
```

## 6. Havi riport

Havi egyszer részletesebb riport:

- Top új kérdések
- Top növekvő témák
- D2 GEO állapot
- Fügeház GEO állapot
- D1 GEO állapot
- Zsálya GEO állapot
- Panorama Pool GEO állapot
- javasolt új blogok
- javasolt FAQ bővítések
- javasolt oldalfrissítések

## 7. Fontos Dandelion szabályok

Rögzített szabályok:

- Ne használja a "közös medencehasználat" kifejezést.
- A Panorama Pool kommunikációban legyen pozitív előny, nem magyarázkodás.
- Ne javasoljon automatikus tartalompublikálást.
- Ne javasoljon Smart / Performance Max kampányt induló alapként.
- Fő konverziós cél: `dnd_booking_click`.
- A WhatsApp/telefon/e-mail események másodlagos jelek.
- A GEO tartalom célja nem kulcsszóhalmozás, hanem valódi vendégkérdések megválaszolása.

## 8. Fázisok

### Fázis 1 - Specifikáció

Ez a dokumentum.

### Fázis 2 - Kézi riport sablon

Egy kézzel kitölthető heti riport sablon.

### Fázis 3 - Félautomata adatgyűjtés

CSV exportok / API exportok feldolgozása.

### Fázis 4 - Automata heti e-mail

Script vagy agent küldi a heti riportot.

### Fázis 5 - AI monitor

Kiválasztott AI keresők válaszainak rendszeres tesztelése.

## 9. Kimeneti elvárás

A dokumentum legyen rendezett, magyar nyelvű, továbbfejleszthető, Codex számára később végrehajtható technikai specifikációként használható.

Későbbi implementációs feladatoknál fontos:

- az agent építését csak külön jóváhagyott feladatban szabad elkezdeni,
- a honlapoldalak, komponensek, adatfájlok és route-ok módosítását ez a specifikáció nem engedélyezi,
- minden tartalomjavaslat emberi jóváhagyást igényel,
- minden fizetett hirdetési vagy mérési beállítást csak riportolni szabad, automatikusan módosítani nem.

## 10. Riport címzés és küldési szabályok

- Heti riport küldése: minden hétfő reggel 07:00.
- Havi riport küldése: minden hónap első hétfőjén.
- Címzett: később konfigurációból.
- E-mail tárgy heti riportnál: "Dandelion GEO heti jelentés – YYYY-MM-DD"
- E-mail tárgy havi riportnál: "Dandelion GEO havi jelentés – YYYY-MM"
- Az agent ne küldjön napi zajos értesítéseket, csak valódi riasztás esetén.

## 11. GEO kérdésérték pontozás

Minden kérdés kapjon 0-100 közötti GEO értékpontot.

Pontozási szempontok:

- keresési / piaci érdeklődés: 0-25 pont
- foglalási vagy üzleti szándék: 0-25 pont
- Dandelionhoz való illeszkedés: 0-20 pont
- jelenlegi tartalomhiány: 0-15 pont
- szezonális vagy növekvő trend: 0-15 pont

Értelmezés:

- 80-100: kiemelt GEO lehetőség
- 60-79: jó lehetőség
- 40-59: figyelendő
- 0-39: alacsony prioritás

## 12. Brand / nem-brand besorolás

Brand keresés példák:

- dandelion
- dandelionhouse
- dandelion vendégház
- dandelion vendégházak
- dandelion d2
- dandelion fügeház
- dandelion zsálya
- royal homes keszthely

Nem-brand keresés példák:

- szállás Balaton-felvidék
- medencés szállás Badacsony környékén
- családbarát szállás Balaton
- kutyabarát szállás Balaton-felvidék
- Szent György-hegy szállás
- Kisapáti szállás
- vendégház Badacsony környékén

Szabály:

- A brand keresések fontosak márkaegészség miatt, de a GEO növekedés fő mutatója a nem-brand kérdések és keresések megjelenése.

## 13. Első implementációs fázis adatforrásai

Első működő verzióban csak ezek legyenek kötelezők:

- Search Console export vagy API
- GA4 export vagy API
- Google Ads Search Terms export vagy API, ha már van aktív keresési kampány
- kézzel vagy CSV-ből beadott Google Trends / kérdéslista

Későbbi fázis:

- teljes Trends API
- AI kereső monitor
- automatizált competitor figyelés

## 14. Riport döntési kategóriák

Az agent minden fontos megállapítást soroljon be:

- NINCS TEENDŐ
- FIGYELNI KELL
- TARTALOMHIÁNY
- OLDALFRISSÍTÉS JAVASOLT
- ÚJ BLOG JAVASOLT
- FAQ BŐVÍTÉS JAVASOLT
- ADS NEGATÍV KULCSSZÓ JAVASOLT
- MÉRÉSI HIBA GYANÚ
- KIEMELT LEHETŐSÉG

## 15. Fix riport output formátum

A heti riport minden esetben tartalmazza:

- dátum
- vizsgált időszak
- adatforrások státusza
- rövid összkép
- top 5 lehetőség
- top 5 probléma vagy hiány
- maximum 3 javasolt teendő
- következő ellenőrzés dátuma

## 16. Minimum riasztási feltételek

Riasztás csak akkor legyen, ha:

- Google Ads költés van, de nincs mérhető konverziós esemény,
- hirtelen eltűnik a `dnd_booking_click` mérés,
- Search Console megjelenés erősen visszaesik,
- aktív kampány irreleváns kereséseket hoz,
- kiemelt, 80+ GEO pontú kérdés jelenik meg, amire nincs tartalom.

## 17. Dandelion GEO Score

Az agent minden kiemelt oldalra számoljon 0-100 közötti GEO Score értéket.

Kiemelt oldalak:

- Dandelion D2
- Dandelion D1
- Fügeház
- Zsálya Vendégház
- Szőlőliget Vendégház
- Szépvölgyi Vendégház
- Dandelion Royal Homes
- Dandelion Vintage
- Dandelion Köveskál
- Panorama Pool

Pontozási bontás:

- keresési lefedettség: 0-25 pont
- kérdéslefedettség: 0-25 pont
- AI / GEO láthatóság: 0-20 pont
- tartalomfrissesség: 0-15 pont
- konverziós relevancia: 0-15 pont

Értelmezés:

- 85-100: erős GEO állapot
- 70-84: jó, de fejleszthető
- 50-69: közepes, célzott javítás kell
- 0-49: gyenge, külön tartalommunka szükséges

A riportban minden oldalnál szerepeljen:

- aktuális GEO Score
- előző havi GEO Score
- változás
- legerősebb témák
- legfontosabb hiányok
- javasolt következő lépés

A GEO Score nem hivatalos Google-mutató, hanem belső Dandelion döntéstámogató pontszám.

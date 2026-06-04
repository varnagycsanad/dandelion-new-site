# DANDELION GEO DATA INPUT SPEC

Status: AKTUALIS
Last checked: 2026-06-04
Use for: GEO heti riport és későbbi GEO Agent adatbemeneteinek meghatározása.
Do not use for: automatikus API implementáció önálló jóváhagyás nélkül.

## 1. Cél

Ez a dokumentum meghatározza, milyen adatforrásokból, milyen mezőkkel és milyen gyakorisággal kell adatot gyűjteni a GEO heti riporthoz és a későbbi GEO Agenthez.

## 2. Adatforrások

### 2.1 Google Search Console

Szükséges mezők:
- dátum
- lekérdezés
- oldal / URL
- kattintások
- megjelenések
- CTR
- átlagos pozíció
- ország
- eszköz

Használat:
- brand / nem-brand elemzés
- új lekérdezések felismerése
- sok megjelenés, kevés kattintás azonosítása
- GEO tartalomhiány felismerése

Export gyakoriság:
- heti

## 2.2 GA4

Szükséges mezők:
- dátum
- landing page
- sessionök
- aktív felhasználók
- oldalmegtekintések
- forgalmi forrás / médium
- dnd_booking_click események
- eseményarány oldalanként

Használat:
- mely oldalak hoznak foglalási szándékot
- mely GEO oldalak gyengék konverzióban
- mely források hoznak értékes látogatót

Export gyakoriság:
- heti

## 2.3 Google Ads

Szükséges mezők:
- kampány
- hirdetéscsoport
- keresési kifejezés
- kulcsszó
- kattintás
- megjelenés
- CTR
- költés
- konverzió
- konverziós esemény
- CPC

Használat:
- fizetett keresési adatból valódi keresési szándékok azonosítása
- irreleváns keresések kiszűrése
- negatív kulcsszó-javaslatok
- értékes GEO kérdések felismerése

Export gyakoriság:
- ha van aktív kampány, heti

## 2.4 Google Trends / kérdéslista

Szükséges mezők:
- kérdés / keresési kifejezés
- forrás
- téma
- régió
- trend iránya
- szezonális jelleg
- megjegyzés

Használat:
- piaci érdeklődés figyelése
- új GEO kérdések gyűjtése
- szezonális lehetőségek felismerése

Export / frissítés gyakoriság:
- kézi, heti vagy havi

## 3. Közös normalizált mezők

Minden kérdés / keresési kifejezés végül ilyen mezőkre legyen átalakítva:

- id
- dátum
- forrás
- kérdés_vagy_kifejezés
- brand_vagy_nem_brand
- téma
- keresési_szándék
- kapcsolódó_oldal
- geo_pont
- javasolt_teendő
- státusz

## 4. Brand / nem-brand szabály

Brand példák:
- dandelion
- dandelionhouse
- dandelion vendégház
- dandelion d2
- dandelion fügeház
- royal homes keszthely

Nem-brand példák:
- szállás Balaton-felvidék
- medencés szállás Badacsony környékén
- családbarát szállás Balaton
- Szent György-hegy szállás
- Kisapáti szállás

## 5. GEO pont számítás bemeneti igénye

A GEO pontozáshoz szükséges:
- keresési / piaci érdeklődés
- foglalási vagy üzleti szándék
- Dandelionhoz való illeszkedés
- jelenlegi tartalomhiány
- szezonális vagy növekvő trend

## 6. Kimenet

A feldolgozott adatok célformátuma később lehet:
- CSV
- JSON
- Markdown heti riport
- e-mail riport

## 7. Első kézi működés

Első körben nem kell API.

Elég:
- Search Console export
- GA4 export
- Google Ads export, ha van aktív kampány
- kézi kérdéslista

Ezekből kézzel vagy félautomata script segítségével tölthető a heti riport sablon.

## 8. Későbbi automatizálás

Később:
- Search Console API
- GA4 Data API
- Google Ads API
- Trends API vagy alternatív trendforrás
- automatikus e-mail küldés

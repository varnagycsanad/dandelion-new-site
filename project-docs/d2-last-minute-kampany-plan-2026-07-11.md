[CHANGE 2026-07-11 00:00] D2 last minute landing és hirdetési előkészítés összefoglaló tervfájl létrehozása.

# D2 last minute landing és kampányterv

Status: AKTUALIS  
Last checked: 2026-07-13  
Use for: D2 last minute landing és a kapcsolódó Google Ads / Meta kampány előkészítésének gyors áttekintése

## Kiinduló feltételezés

A legfrissebb user-input alapján a fix dátumos július 13-17. ajánlat helyett az aktív ajánlat ez:

- `10% kedvezmény`
- minimum `4 éjszaka`
- promóciós kód: `D2Lastm`
- lejárat: `2026. július 19.`

Ez a feltételezés azért került be, mert a későbbi utasítás ezt pontosította, és nem volt biztonságos a korábbi fix dátumot továbbvinni változtatás nélkül.

## Elkészült elemek

- új landing oldal: `/last-minute-d2/`
- külön ajánlat-konfiguráció: `src/data/last-minute/d2-last-minute.ts`
- CTA tracking bővítés: `public/scripts/dnd-ads-events.js`
- kombinált kampányterv: `project-docs/d2-last-minute-kampany-plan-2026-07-11.json`

## Landing logika

- magyar nyelvű, mobilra optimalizált last minute oldal
- `noindex, follow`
- canonical beállítás a landing saját URL-jére
- OG kép a meglévő D2 hero képből
- legalább 3 fő CTA + mobil sticky CTA
- lejárati logika:
  - aktív ajánlat megjelenítése `2026-07-19T23:59:59+02:00` időpontig
  - lejárat után rövid záróüzenet + visszalink a normál D2 oldalra

## Analitika

A landing a meglévő `dnd_booking_click` eseményt használja tovább.

Új attribútumok, amelyeket a CTA-k át tudnak adni:

- `property`
- `campaign`
- opcionálisan a jövőben:
  - `placement`
  - `check_in`
  - `check_out`

Most ténylegesen átadott mezők:

- `property: d2`
- `campaign: d2_last_minute_2026_07_19`

Megjegyzés: a fix check-in / check-out mezőket nem kötöttük rá erre a landingre, mert a friss user-input már nem egy konkrét 2026-07-13 - 2026-07-17 ajánlatot adott meg, hanem egy 4 éjszakás promóciót.

## Google Ads állapot

Technikai ellenőrzés eredménye:

- Google Ads OAuth és developer token használható
- elérhető közvetlen fiók: `Dandelion Vendégházak`
- customer ID: `8709363152`

Látható aktív kampányok:

- `Dandelion - Brand - HU`
- `Dandelion - Szállás Balaton-felvidék - HU`
- `Dandelion - Kisapáti Szent György-hegy - HU`
- `Dandelion - Medencés szállás - HU`

Mostani döntés:

- új kampány nem jött létre
- ok: hiányzó végleges költségkeret
- javasolt név: `D2_LastMinute_2026-07-19`
- javasolt állapot későbbi létrehozásnál: `PAUSED`

## Meta Ads állapot

Technikai ellenőrzés eredménye:

- Meta token működik
- felhasználó: `Ilona Várnagy`
- látható Dandelion hirdetési fiók: `act_169467498360546`
- kampánylista lekérdezhető
- a projekt `.env` erre a Dandelion fiókra mutat
- látható aktív kampány: `D2_LastMinute_2026-07-19`

Mostani döntés:

- a Meta hozzáférés és fiókoldali jogosultság rendben van
- a D2 last minute kampány már látszik aktív kampányként
- a GTM / Pixel oldali bekötés és validáció elkészült
- a használt Pixel: `489282852211205`
- a GTM container: `GTM-P75FHKLJ`
- a repo `meta_*` eseményeihez a hiányzó Meta tag-ek felkerültek és élő GTM verzióba publikálva vannak

## Nyitott pontok

- végleges Google Ads költségkeret
- opcionális Meta Events Manager / böngészős smoke teszt: a Pixel események valóban beérkeznek-e egy valós user-journey alatt
- ha kell tényleges kampánylétrehozás, melyik célzás legyen az elsődleges
- ha kell, a promóciós kód SabeeApp oldali működésének külön manuális ellenőrzése

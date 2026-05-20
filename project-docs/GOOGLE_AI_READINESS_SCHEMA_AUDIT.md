[CHANGE 2026-05-20 00:00] Szallasoldali schema audit es bovitesi terv rogzitve.

# Google AI Readiness schema audit

Cel: a jelenlegi szallasoldali JSON-LD allapot pontos rogzitese es a kesobbi, biztonsagos schema bovites technikai terve. Ez nem implementacio.

## Olvasott forrasok

- `src/templates/AccommodationPage.astro`
- `src/layouts/BaseLayout.astro`
- `src/data/site-seo.ts`
- `src/data/accommodation-pages/*.ts`
- `src/data/accommodations.ts`
- `src/lib/accommodation-page-adapters.ts`
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md`
- `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`

## Jelenlegi schema tipusok

### Globalis schema

Forras: `src/layouts/BaseLayout.astro`

Minden oldal kap:

- `Organization`
- `WebSite`

A `BaseLayout` a kapott `structuredData` propot hozzaadja a globalis schema listahoz, majd minden elemet kulon `<script type="application/ld+json">` blokkban renderel.

### Szallasoldali schema

Forras: `src/templates/AccommodationPage.astro`

Minden kozos szallassablonos oldal kap:

- `LodgingBusiness`
- `BreadcrumbList`

A HU es EN oldalak ugyanazt a kozos sablonlogikat hasznaljak. A kulonbseg az adatokbol es a `lang` propbol jon.

## Jelenlegi schema mezok

### Organization

Jelenlegi mezok:

- `@context`
- `@type`: `Organization`
- `@id`: root URL + `#organization`
- `name`: `SITE_NAME`
- `url`: root URL
- `logo`: header logo abszolut URL-je
- `telephone`: `+36207730807`

Megjegyzes: brand szintu schema, nem szallasonkenti.

### WebSite

Jelenlegi mezok:

- `@context`
- `@type`: `WebSite`
- `@id`: root URL + `#website`
- `name`: `SITE_NAME`
- `url`: root URL
- `inLanguage`: `hu-HU` vagy `en-US`
- `description`: HU/EN default site description
- `publisher`: Organization `@id`

Megjegyzes: az `inLanguage` az aktualis oldal nyelve szerint valtozik.

### LodgingBusiness

Jelenlegi mezok:

- `@context`
- `@type`: `LodgingBusiness`
- `@id`: canonical URL + `#lodging`
- `name`: `pageData.seo.title` elso resze `|` elott, fallbackkent hero title + accent
- `url`: canonical URL
- `description`: `pageData.seo.description`
- `image`: hero kep abszolut URL-je
- `telephone`: `+36207730807`

Megjegyzes:

- Nincs `address`.
- Nincs `geo`.
- Nincs `amenityFeature`.
- Nincs `petsAllowed`.
- Nincs `makesOffer` / `potentialAction`.
- Nincs check-in/check-out.
- Nincs explicit kapacitas, haloszoba, furdoszoba, agyelrendezes.

### BreadcrumbList

Jelenlegi mezok:

- `@context`
- `@type`: `BreadcrumbList`
- `itemListElement`
- 1. elem: home label es home URL
- 2. elem: szallas neve es canonical URL

HU oldalon a home label `Fooldal`, EN oldalon `English home`. A masodik elem neve a LodgingBusiness nevvel egyezik.

## HU/EN elteresek

- A schema tipusok azonosak: `Organization`, `WebSite`, `LodgingBusiness`, `BreadcrumbList`.
- A `WebSite.inLanguage` HU/EN szerint valtozik.
- A `BreadcrumbList` home label es home URL HU/EN szerint valtozik.
- A `LodgingBusiness.description` es `name` a HU/EN pageData-bol jon.
- A `LodgingBusiness.url` a canonicalPath alapjan HU/EN konkret oldal URL.
- A `LodgingBusiness.image` ugyanazon hero/gallery rendszerbol jon, de a kep URL oldalankent valtozhat.

## Biztonsagosan bovitheto mezok

### 1. `LodgingBusiness.image` finomitasa

Jelenlegi allapot: egy hero kep URL szerepel.

Biztonsagos bovites:

- maradhat egy URL, vagy kesobb lehet tobb kep URL lista.
- Forras: `heroSchemaImage`, `galleryImages`.

Kockazat: alacsony, ha csak letezo, renderelt kep URL-ek kerulnek be.

### 2. `LodgingBusiness.makesOffer` vagy booking link mezo elokeszitese

Biztonsagos forras:

- SabeeApp szallasoknal `pageData.bookingLink`, mert mar lathato `<a href>` CTA.
- Koveskal HU: `/kapcsolat/`, erdeklodesi CTA.
- Koveskal EN: `/en/contact/`, inquiry CTA.

Javasolt ovatos elv:

- SabeeApp szallasoknal lehet `Offer` vagy `ReserveAction` tervet kesziteni a bookingLink alapjan.
- Koveskalnal csak erdeklodesi / contact URL szerepelhet, nem SabeeApp es nem kozvetlen booking motor.

Kockazat: kozepes. A schema.org booking/reservation mezoket nagyon pontosan kell megvalasztani, mert a SabeeApp es Google booking kapcsolat meg nincs tisztazva.

### 3. `amenityFeature` kesobbi minimal verzio

Lehetseges lathato adatforrasok:

- `pageData.amenities`
- `decisionPanel.overviewFacts`
- `pageData.facts.groups`
- tulajdonosi megerositett adatok a gap dokumentumban

Biztonsagos jeloltek:

- wifi
- legkondi
- ingyenes parkolas
- medencehasznalat / nincs medence
- kert / terasz
- kisallat engedelyezett / nem engedelyezett

Kockazat: kozepes, mert a jelenlegi adatok nem egyseges, gepileg direkt amenity mezok. Szovegbol/ikonbol automatikusan kovetkeztetni nem idealis.

### 4. `description` es `name` audit szintu megerositese

Jelenleg biztonsagosan mukodik, mert pageData-bol jon.

Javaslat: nincs surgos modositas, de egy kesobbi taskban ellenorizheto, hogy a `name` minden EN/HU oldalon pontos, rovid es nem tartalmaz marketing toldalekot.

## Kockazatos / kesobbre hagyando mezok

### `address`

Allapot: kesobbre hagyando.

Indok:

- A repoban telepules es regio tobb helyen megvan, de teljes, publikalhato cim nincs minden szallasnal.
- Az `address` mezot csak pontos, tulajdonos altal jovahagyott, publikusan vallalhato cimmel szabad kitolteni.

### `geo`

Allapot: kesobbre hagyando.

Indok:

- Nincs biztos szallasonkenti koordinata.
- Pontatlan koordinata rosszabb, mint a hianyzo koordinata.

### `petsAllowed`

Allapot: elvileg adat van, de implementacio elott mezovalasztas kell.

Indok:

- Tulajdonosi adat szerint D1, D2 es Fugehaz kisallatbarat, mas hazak nem.
- Schema.org oldalon a pontos, LodgingBusiness alatti modellezest ovatosan kell valasztani.
- Nem minden oldalon feltetlenul ugyanugy lathato, ezert elobb a lathato tartalmi paritast kell ellenorizni.

### `amenityFeature` teljes lista

Allapot: kesobbre hagyando.

Indok:

- A jelenlegi `amenities` mezok szoveges kartyak, nem normalizalt boolean adatok.
- Nem szabad ikon vagy szabad szoveg alapjan tul sok allitast automatikusan schema-ba emelni.

### Kapacitas / haloszoba / furdoszoba / agyelrendezes

Allapot: reszben kesobbre hagyando.

Indok:

- Kapacitas, furdok, agyelrendezes sok haznal tulajdonosi megerositest kapott.
- Haloszoba bontas tobb haznal ELLENORIZENDO.
- Schema.org mezoket kulon meg kell valasztani, hogy ne legyen felrevezeto.

### `FAQPage`

Allapot: nem implementalhato most.

Indok:

- Nincs valodi, lathato GYIK blokk.
- SEO celbol generalt, nem lathato FAQ schema tilos.

### `ImageObject`

Allapot: kesobbre hagyando.

Indok:

- A registryben van alt/title/caption struktura.
- Sok galeria adat generikus.
- Caption megjelenes nem egyertelmu, ezert kep SEO javitas utan erdemes visszaterni ra.

## Koveskal schema megjegyzes

- Koveskalnal nincs SabeeApp booking link.
- HU CTA: `/kapcsolat/`
- EN CTA: `/en/contact/`
- Schema-ban nem jelenhet meg ugy, mintha Koveskal kozvetlen SabeeApp foglalasi motorral foglalhato lenne.
- Ha booking vagy reservation jellegu schema keszul, Koveskal kulon agat igenyel:
  - SabeeAppos hazak: booking URL a SabeeApp selectedRooms linkbol.
  - Koveskal: contact/inquiry URL, nem direct booking engine.

## VacationRental statusz

Statusz: NEM IMPLEMENTALHATO MOST / KESOBBI VIZSGALAT.

Feltetelek a kesobbi vizsgalathoz:

- SabeeApp support valasza Google Free Booking Links / Vacation Rental kapcsolatrol.
- Tisztazas, hogy minden haz kulon propertykent kezelheto-e.
- Elo ar es elerhetoseg atadas tisztazasa.
- Google Hotel Center szukseges-e.
- Publikus address/geo/adatparitas tisztazasa.
- Lathato oldaltartalom es schema teljes egyezese.

## Javasolt implementacios terv

### Erintett fajlok kesobb

- `src/templates/AccommodationPage.astro`
- opcionalisan `src/data/accommodation-pages/types.ts`, ha normalizalt schema mezok kerulnek be.
- opcionalisan `src/data/accommodation-pages/*.ts`, ha amenity/booking/schema mezoket explicit adatkent kell felvenni.
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md`
- `project-docs/GOOGLE_AI_READINESS.md`

### Elso biztonsagos schema implementacios task

Kis scope:

1. Ne vezessen be uj schema tipust.
2. Maradjon `LodgingBusiness`.
3. Adjon hozza egy ovatos `makesOffer` vagy hasonlo booking URL mezot csak ott, ahol a CTA href mar lathato.
4. SabeeAppos hazaknal a `pageData.bookingLink` legyen a forras.
5. Koveskalnal csak contact/inquiry URL szerepeljen, nem SabeeApp.
6. Ne adjon hozza `address`, `geo`, `amenityFeature`, `FAQPage`, `VacationRental` mezot.
7. Build es Rich Results Test kovetkezo lepeskent kotelezo.

Megjegyzes: a pontos schema.org mezot (`makesOffer`, `potentialAction`, `ReserveAction`) implementacio elott kulon, rovid technikai dontesben kell kivalasztani.

### Masodik schema task

Normalizalt amenity mezok elokeszitese adatmodellben, nem szovegbol kovetkeztetve.

### Harmadik schema task

`amenityFeature` bevezetese csak a normalizalt es lathato amenity adatokbol.

## Nem tortent

- Nem tortent schema implementacio.
- Nem tortent Astro template modositas.
- Nem tortent adatfajl modositas.
- Nem tortent booking link modositas.
- Nem tortent build futtatas.

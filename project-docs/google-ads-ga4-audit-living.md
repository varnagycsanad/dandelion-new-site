# Dandelion Google Ads + Konverziomeres Living Audit

Status: ELO AUDIT, KEZZEL FRISSITHETO
Last updated: 2026-07-10
Tulajdonos: Codex + Dandelion csapat
Cél: egy folyamatosan bovitheto, javithato allapotkep a Google Ads, GA4, konverziomeres, kulcsszavak es landing oldalak jelenlegi helyzeterol.

## 1. Mire tamaszkodik ez a dokumentum

Ez az audit kizarolag a repositoryban elerheto helyi forrasokra es a most futtathato helyi ellenorzesekre epul.

Felhasznalt forrasok:

- GTM es consent betoltes: `src/layouts/BaseLayout.astro`
- Consent Mode v2 bridge: `public/scripts/consent-init.js`
- CTA es konverzios dataLayer esemenyek: `public/scripts/dnd-ads-events.js`
- Booking attribucio es `gclid`/UTM parameter atvitel: `public/scripts/dnd-booking-attribution.js`
- Google Ads helper workflow: `scripts/google-ads-report.mjs`
- Google Ads helyi integracios jegyzet: `project-docs/GOOGLE_ADS_CODEX_INTEGRATION.md`
- Legfrissebb helyi GSC query export: `data/geo/raw/gsc_queries_2026-07-08.json`
- Legfrissebb helyi GSC page export: `data/geo/raw/gsc_pages_2026-07-08.json`
- Legutolso helyi GA4 page export: `data/geo/raw/ga4_pages_2026-06-04.json`
- Legutolso helyi GA4 event export: `data/geo/raw/ga4_events_2026-06-04.json`
- Elozo belso jegyzetek: `project-docs/geo-reports/DANDELION_GEO_REPORT_2026-06-04.md`, `project-docs/GA4_CODEX_ANALYTICS.md`
- 2026-07-10-en lefuttatott helyi Ads API ellenorzesek: `ads:check`, `ads:customers`, `ads:campaigns`, `ads:performance`, `ads:conversions`

Fontos korlat:

- A GTM container valos belso tag-, trigger- es conversion linker beallitasai nem latszanak a repositoryban.
- A Google Ads API kapcsolat most mar elerheto ebben a workspace-ben, de a repo tovabbra sem tartalmaz GTM exportot, search terms riportot vagy teljes kulcsszo-szintu historikus exportot.
- Emiatt a Google Ads oldalt mar nem vakon, hanem kampany- es conversion-szinten lehet auditálni, de a teljes melyseghez tovabbi feluleti exportok is kellenek.

## 2. Vezetoi osszkep

A weboldal oldalarol nezve a Google/GTM meresi alapok reszben rendben vannak: a GTM container betolt, a Consent Mode v2 default `denied` allapotban indul, a foglalasi linkek megorzik a `gclid` es UTM parametereket, es a site kulon dataLayer esemenyeket kuld a booking, telefon, email, WhatsApp es kapcsolat jellegu kattintasokrol.

A fo problema nem az, hogy nincs meresi gondolkodas, hanem az, hogy jelenleg nincs bizonyitottan stabil, friss es teljes adatvisszaolvasas. A GA4 friss lekerese most nem mukodott: az OAuth token hibara futott, a service account pedig 403 jogosultsagi hibat adott. Ez azt jelenti, hogy a meres technikailag reszben elo van keszitve, de az ellenorzeshez es riportolashoz szukseges hozzaferesi lanc jelenleg nincs rendben.

Google Ads oldalrol a helyzet jobb lett: a helyi Ads API workflow mukodik, a customer lista, a kampanyok, a kampanyteljesitmeny es a conversion actionok is lekerdezhetok. Ettol fuggetlenul tovabbra sincs helyi search terms export, teljes kulcsszo-szintu riport vagy GTM-bol kozvetlen bizonyitek az osszes tag-hozzarendelesrol. Ezert a Google Ads oldal mar reszben bizonyithato, de meg nem teljesen zarhato le.

## 3. Mi latszik biztosan a jelenlegi meresi beallitasokbol

### 3.1 GTM betoltes es consent alapok

Biztosan latszik:

- A site betolti a Google Tag Manager kontenert: `GTM-P75FHKLJ`.
- A default consent indulaskor `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` mind `denied`.
- `ads_data_redaction` be van kapcsolva.
- A consent update logika kulon kezeli az analytics es marketing hozzajarulast.

Ez jo alap GDPR/consent oldalrol, es modern Google meresi szempontbol helyes irany.

Forras:

- `src/layouts/BaseLayout.astro`
- `public/scripts/consent-init.js`

### 3.2 Weboldali konverzios esemenyek

A site kuld sajat dataLayer esemenyeket az alabbi interakciokra:

- `dnd_booking_click`
- `dnd_phone_click`
- `dnd_email_click`
- `dnd_whatsapp_click`
- `dnd_pool_cta_click`
- `dnd_contact_click`

Emellett Meta oldali esemeny-elokeszites is van, de ez most masodlagos.

Ez eros pozitivum: a site oldalrol a legfontosabb mikro- es mezo-konverziok fogalma mar le van fedve.

Forras:

- `public/scripts/dnd-ads-events.js`

### 3.3 Foglalasi attribucio

Kiemelten jo megoldas, hogy a booking linkekre a rendszer atviszi es eltarolja a fo hirdetesi parametereket:

- `gclid`
- `gbraid`
- `wbraid`
- `gad_source`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Ez azt jelenti, hogy a Google Ads -> Sabee booking atadas logikaja technikailag el van kezdve, ami kulcsfontossagu a kattintas utani attribuciohoz.

Forras:

- `public/scripts/dnd-booking-attribution.js`

## 4. Mi mukodik most valoszinuleg

### 4.1 Mukodo vagy jo allapotu elemek

| Terulet | Allapot | Megjegyzes |
|---|---|---|
| GTM betoltes | Valoszinuleg OK | A container kod a layoutban bent van. |
| Consent Mode v2 default | OK | Default denied es ads data redaction latszik. |
| Sajat CTA event logika | Valoszinuleg OK | A JS fajl ertelmesen definialt esemenyeket pushol. |
| Booking parameter atvitel | Valoszinuleg OK | `gclid` es UTM dekoracio be van epitve. |
| GSC adatforras | Reszben OK | 2026-07-08-as raw export elerheto. |

### 4.2 Ami uzletileg biztato

Az organikus keresesi mintak alapjan mar most latszik valos vendegszandek ezekre a temakra:

- Kisapati szallas
- Royal Homes Keszthely
- Dandelion vendeghaz brand keresések
- Káli-medence szallas
- biciklis es boros kornyekkeresesek

Ez azert fontos, mert ha Google Ads indul vagy fut, jo esely van ra, hogy ezekre a temakra erdemes epiteni a search kampanyokat.

## 5. Mi nem igazolt vagy nem mukodik rendesen

### 5.1 Friss GA4 adatvisszaolvasas jelenleg hibas

A mostani ellenorzes soran:

- a GA4 OAuth token frissites `400 Bad Request` hibara futott,
- a service account fallback `403 insufficient permissions` hibat adott.

Kovetkezmeny:

- a jelenlegi GA4 riport workflow nem stabil,
- nincs friss, bizonyithato, 2026-07-10 koruli GA4 snapshot,
- a living riport jelenleg a 2026-06-04-es GA4 raw fajlra kenytelen tamaszkodni.

Ez jelenleg P1-es meresi problema.

### 5.2 A sajat konverzios esemenyek nincsenek bizonyitva GA4 oldalon

A helyi GA4 event raw fajlban csak ez az 5 esemeny latszik:

- `page_view`
- `user_engagement`
- `session_start`
- `first_visit`
- `ads_conversion_El_fizet_s_1`

Nem latszik benne:

- `dnd_booking_click`
- `dnd_phone_click`
- `dnd_email_click`
- `dnd_contact_click`
- `dnd_pool_cta_click`

Ez nem bizonyitja onmagaban, hogy nem mukodnek, de jelen allapotban nincs ra bizonyitek, hogy tenylegesen beernek GA4-be es konverziokent jol vannak-e kezelve.

### 5.3 Google Ads oldal reszben mar auditálhato, de nem teljes melysegben

Biztosan latszik:

- van Google Ads API script a repo-ban,
- van helyi OAuth + developer token workflow,
- van elerheto customer lista,
- van aktualis kampanylista,
- van kampanyszintu teljesitmeny riport,
- van conversion action lista.

Jelenlegi hianyok:

- nincs kulcsszoexport,
- nincs search terms export,
- nincs bizonyithato `AW-` azonosito a kodban,
- a GTM container tenyleges Google Ads tagjei nem latszanak a repo-bol.

Kovetkezmeny:

- a jelenlegi Google Ads kampanyokrol mar allithato, hogy futnak-e, mennyit koltenek es milyen conversion actionok vannak bekotve,
- de kulcsszo- es search terms-szinten meg nem teljes a lathatosag.

## 6. Jelenlegi Google Ads allapot roviden

### 6.1 Bizonyithato jelenlegi helyzet

| Kerdes | Valasz |
|---|---|
| Latszik GTM/Google meresi elokeszites a site-ban? | Igen |
| Latszik Google Ads specifikus kattintas-attribucio? | Igen, `gclid` es UTM megörzes szintjen |
| Latszik jelenlegi Google Ads kampanylista a helyi API-bol? | Igen |
| Latszik jelenlegi Google Ads kulcsszolista a repo-bol vagy API-bol? | Jelenleg nem |
| Latszik bizonyitott Google Ads konverziobeallitas a feluletrol vagy API-bol? | Igen, reszben |
| Latszik bizonyitott GA4 oldali sajat konverzio? | Jelenleg nem |

### 6.2 Jelenlegi kovetkeztetes

A weboldal technikailag el van kezdve ugy felepulni, hogy Google Ads es GA4 kampanymeresre alkalmas legyen. A Google Ads oldal mar nem teljesen vak: vannak bizonyitottan futtathato API-lekerdezesek, latszanak aktiv kampanyok es latszik legalabb egy aktiv `dnd_booking_click` alapu conversion action is. A teljesen zarodo meresi lanc viszont tovabbra sincs teljesen igazolva, foleg a GA4 es GTM ellenorzesek hianya miatt.

## 7. Search Console alapjan lathato keresleti kep

Ez nem Google Ads export, de jelenleg ez a legjobb helyi jel arra, milyen keresleti iranyokra erdemes kampanyt, hirdetesszoveget es landinget epiteni.

### 7.1 Legfontosabb query-k 2026-07-08 snapshot alapjan

| Kereses | Kattintas | Megjelenes | CTR | Atlagpozicio | Ertelmezes |
|---|---:|---:|---:|---:|---|
| `dandelion vendégház` | 30 | 49 | 61,22% | 1,00 | Eros brand kereslet, a brand jol mukodik. |
| `kisapáti szállás` | 2 | 179 | 1,12% | 4,38 | Nagy kereslet, gyenge CTR. Erős Ads tema. |
| `royal homes keszthely` | 1 | 144 | 0,69% | 8,33 | Erdemi lokacios-brand szandek, de nagyon alacsony atkattintas. |
| `dandelion` | 1 | 92 | 1,09% | 7,62 | Brand eros, de nem eleg tiszta/snippetoldali lehet a kep. |
| `balaton vendégház` | 0 | 29 | 0,00% | 36,79 | Magasabb funnel, tartalmi es talan Discovery/Search tesztema. |
| `badacsony weinberg` | 0 | 20 | 0,00% | 11,55 | Nemet elmenytema, inkabb tartalmi vagy tamogato kampany. |
| `dandelion royal` | 1 | 22 | 4,55% | 5,18 | Royal Homes iranyban relevans brand kapcsolodas. |
| `káli medence szállás` | 1 | 10 | 10,00% | 19,80 | Jo strategiai tema, jelenleg meg kicsi adatpont. |

### 7.2 Fobb keresleti csoportok

| Csoport | Peldak | Prioritas |
|---|---|---|
| Brand | `dandelion vendégház`, `dandelion`, `dandelion house` | Nagyon magas |
| Lokacios szallas | `kisapáti szállás`, `káli medence szállás` | Nagyon magas |
| Property-specifikus | `royal homes keszthely`, `dandelion royal` | Magas |
| Elmeny / inspiracios | `badacsony weinberg`, `balaton beaches` | Kozepes |

## 8. Landing oldalak: mi eros, mi gyenge

### 8.1 Legfontosabb oldalak GSC oldalexport alapjan

| Oldal | Kattintas | Megjelenes | CTR | Atlagpozicio | Megjegyzes |
|---|---:|---:|---:|---:|---|
| `https://dandelionhouse.hu/` | 97 | 704 | 13,78% | 13,23 | A legerosebb kattintast hozo oldal, valoszinuleg brand miatt. |
| `https://www.dandelionhouse.hu/` | 12 | 722 | 1,66% | 5,82 | Sokat latszik, alacsony CTR, domain-duplikacios tunet. |
| `https://dandelionhouse.hu/szallasok/` | 4 | 492 | 0,81% | 6,73 | Fontos osszefoglalo oldal, de CTR-ben gyenge. |
| `https://dandelionhouse.hu/de/weingueter/` | 2 | 434 | 0,46% | 9,99 | Eros lathatosag, gyenge atkattintas. |
| `https://dandelionhouse.hu/royal/` | 6 | 345 | 1,74% | 8,52 | Erdemes lenne Ads landingkent is erositeni. |
| `https://dandelionhouse.hu/dandelion-koveskal/` | 13 | 220 | 5,91% | 14,55 | Jo jel, potencial van benne. |
| `https://dandelionhouse.hu/dandelion-d1/` | 6 | 211 | 2,84% | 3,14 | Jo pozicio, kozepes-gyenge CTR. |
| `https://dandelionhouse.hu/szololiget/` | 9 | 209 | 4,31% | 1,50 | Kifejezetten eros oldal. |
| `https://dandelionhouse.hu/de/fahrradverleih/` | 1 | 199 | 0,50% | 8,66 | Jel van, de nem eleg eros. |
| `https://dandelionhouse.hu/en/wineries/` | 0 | 186 | 0,00% | 12,30 | Lathato, de nem huz be kattintast. |

### 8.2 Mi megy jol

- A brand irany eros.
- A fo domain kattintast hoz.
- A `szololiget`, `szepvolgyi`, `fuge`, `dandelion-koveskal` oldalaknak van valos keresleti jele.
- A property oldalak kozott nem egyetlen oldal teljesit, tehát a kinalat differencialasa mukodik.

### 8.3 Mi nem megy jol

- A `www` es `http` variansok meg mindig kulon latszanak a GSC-ben.
- A `szallasok/` oldal sok megjelenest kap, de rossz CTR-rel.
- A `royal/` oldal lathato, de alacsony atkattintas mellett.
- Tobb angol es nemet informacios oldal lathato, de gyenge kattintast hoz.
- A `kapcsolat/` oldal 139 megjelenessel 0 kattintast kap, ami arra utal, hogy nem jo search intent landing.

## 9. GA4 snapshot: mit latunk es mit nem

### 9.1 Elérhető GA4 snapshot

Megjegyzes: ez a resz NEM friss, hanem a 2026-06-04-es utolso helyi raw fajlra epul.

Top oldalak active users alapjan:

| Oldal | Aktiv felhasznalo | Session | Page view | Event count |
|---|---:|---:|---:|---:|
| `/` | 68 | 86 | 114 | 348 |
| `/szepvolgyi/` | 11 | 12 | 14 | 42 |
| `/dandelion-d2/` | 10 | 12 | 15 | 35 |
| `/szallasok/` | 8 | 9 | 11 | 30 |
| `/dandelion-koveskal/` | 6 | 6 | 13 | 30 |
| `/fuge/` | 4 | 5 | 6 | 18 |
| `/szololiget/` | 4 | 5 | 5 | 17 |
| `/royal/` | 3 | 5 | 7 | 25 |

### 9.2 Mit nem latunk

- friss GA4 adatot,
- forras/medium bontast a mostani auditban,
- bizonyitott `dnd_booking_click` beerkezest,
- bizonyitott Google Ads -> GA4 konverzios zarast,
- egyertelmu booking vagy lead konverziot.

### 9.3 Kulon figyelendo esemeny

Az egyetlen konverzio-szeru esemény a raw exportban:

- `ads_conversion_El_fizet_s_1` = 7

Ennek jelentese jelenleg tisztazatlan. Nem nevezheto felelosen bookingnak vagy leadnek addig, amig a GTM/GA4 oldali nev-es hozzarendeles nincs ellenorizve.

## 10. Jelenlegi Google Ads kampanyok

## 10.1 Bizonyithato aktualis kampanylista

Jelen dokumentum keszitesekor:

- a helyi Google Ads API kapcsolat mukodik,
- a `Dandelion Vendégházak` account lekerdezheto,
- a kampanylista es a kampanyszintu teljesitmeny is visszaolvashato.

Jelenleg lathato kampanyok:

| Kampanynev | Statusz | Impressions (30 nap) | Clicks (30 nap) | CTR | Koltes (30 nap) | Konverzio (30 nap) |
|---|---|---:|---:|---:|---:|---:|
| `Dandelion - Szállás Balaton-felvidék - HU` | ENABLED | 1378 | 76 | 5,52% | 9996,46 HUF | 3 |
| `Dandelion - Brand - HU` | ENABLED | 15 | 4 | 26,67% | 324,37 HUF | 1 |
| `Dandelion - Kisapáti Szent György-hegy - HU` | ENABLED | 23 | 2 | 8,70% | 254,18 HUF | 0 |
| `Őszi kampány` | REMOVED | 0 | 0 | - | 0,00 HUF | 0 |

Tenyszeru jelenlegi allapot:

> A workspace-bol mar bizonyithatoan latszanak aktualis Google Ads kampanyok es kampanyszintu teljesitmenyadatok.

## 10.2 Mit kell majd ide betenni, ha megjon az export

| Kampanynev | Tipus | Statusz | Landing | Celfoldrajz | Napi budget | Fobb kulcsszavak | Megjegyzes |
|---|---|---|---|---|---:|---|---|
| | | | | | | | |

## 10.3 Bizonyithato conversion actionok

A helyi Ads API alapjan mar latszik conversion action lista is. Ebbol a legfontosabb jelenlegi jel:

- `Dandelion - GA4 (web) dnd_booking_click`
- statusz: `ENABLED`
- tipus: `GOOGLE_ANALYTICS_4_CUSTOM`
- kategoria: `CONTACT`
- `primary_for_goal = true`
- `include_in_conversions = true`

Ez nem bizonyit teljes booking-zarast onmagaban, de bizonyitja, hogy az Ads oldalon van aktiv, `dnd_booking_click` alapu conversion action.

## 11. Javasolt Google Ads kampanystruktura

Ez NEM a jelenlegi kampanylista, hanem a jelenlegi keresleti jelekre epulo javaslat.

### 11.1 Kampany A - Brand vedelmi kampany

Cel:

- a brand keresések maximalis lefedese,
- konkurens eltereles csokkentese,
- olcso, magas szandeku forgalom.

Kulcsszo otletek:

- `dandelion vendégház`
- `dandelion house`
- `dandelion`
- `dandelion royal`
- `dandelion apartments`

Javasolt landing:

- `https://dandelionhouse.hu/`

### 11.2 Kampany B - Kisapati / Tapolcai-medence szallas

Cel:

- lokacios keresletek leuralasa magas szandek mellett.

Kulcsszo otletek:

- `kisapáti szállás`
- `kisapati szallas`
- `szent gyorgy hegy szallas`
- `tapolca szallas`
- `tapolca apartman`

Javasolt landing:

- `https://dandelionhouse.hu/szallasok/`
- kulon property oldalak: `dandelion-d1`, `dandelion-d2`, `fuge`, `szololiget`, `zsalya`

### 11.3 Kampany C - Royal Homes / Keszthely

Cel:

- property-specifikus es lokacios kereslet felfogasa.

Kulcsszo otletek:

- `royal homes keszthely`
- `royal homes apartment`
- `keszthely apartman`
- `keszthely szallas`

Javasolt landing:

- `https://dandelionhouse.hu/royal/`

### 11.4 Kampany D - Káli-medence / Köveskál

Cel:

- fejlodo, erosen pozicionalhato lokacios tema tesztelese.

Kulcsszo otletek:

- `káli medence szállás`
- `köveskál szállás`
- `kali basin accommodation`

Javasolt landing:

- `https://dandelionhouse.hu/dandelion-koveskal/`

### 11.5 Kampany E - Tamogato elmenytema

Cel:

- top-of-funnel jelenlet,
- remarketing alap felepitese,
- tematikus discovery.

Kulcsszo otletek:

- `badacsony weinberg`
- `balaton beaches`
- `bike rental balaton`
- `fahrradverleih in der nähe`

Megjegyzes:

- ezt csak akkor erdemes erositeni, ha a primer search kampanyok es a konverziomeres mar rendben vannak.

## 12. Kulcsszavak es kulcsszocsoportok

### 12.1 Elsodleges, magas szandeku kulcsszavak

| Kulcsszo | Tipus | Prioritas | Megjegyzes |
|---|---|---|---|
| `dandelion vendégház` | Brand | P1 | Erosen mukodo kereslet |
| `kisapáti szállás` | Lokacios | P1 | Sok megjelenes, gyenge CTR, Ads-re eros jel |
| `royal homes keszthely` | Property + lokacio | P1 | Nagy relevancia, eros kulcsszojelolt |
| `káli medence szállás` | Lokacios | P1 | Stratégiai novekedesi tema |
| `tapolca apartman` | Lokacios | P2 | Jo bovitesi irany |

### 12.2 Masodlagos, tesztelendo kulcsszavak

| Kulcsszo | Tipus | Prioritas | Megjegyzes |
|---|---|---|---|
| `balaton vendégház` | Altalanos | P2 | Tul tag, de erdekes |
| `dandelion royal` | Brand/property | P2 | Eros kiserleti jel |
| `badacsony weinberg` | Elmeny | P3 | Inkabb tamogato tema |
| `balaton beaches` | Elmeny | P3 | Nem primer booking intent |

### 12.3 Elso negativ kulcsszo-gondolkodas

Ezt tenyleges Search Terms export nelkul csak ovatosan lehet javasolni. Első jelölt figyelési csoportok:

- tul altalanos strandos keresések,
- tisztan turisztikai info intent, ha nem visz bookinghoz,
- irrelevans varosi hotel intent, ha vendégház ajánlatra nem illeszkedik.

## 13. Mi megy / mi nem megy

### 13.1 Mi megy

| Terulet | Megallapitas |
|---|---|
| Meresi architektura | Van logika, nem nullarol indul a rendszer. |
| GTM + Consent | Modern, jo alap. |
| Booking attribucio | Kifejezetten eros, hasznos megoldas. |
| Google Ads API lathatosag | Mar mukodik customer, campaign, performance es conversion szinten. |
| Organikus keresleti jelek | Vilagosan latszanak, jo kampanyalapot adnak. |
| Brand kereses | Jelenleg a legerosebb. |

### 13.2 Mi nem megy

| Terulet | Megallapitas |
|---|---|
| Friss GA4 visszaolvasas | Most hibas. |
| GA4 jogosultsagi lanc | Nem stabil. |
| Sajat konverzios esemenyek bizonyitasa | Jelenleg nincs meg. |
| Google Ads kulcsszo- es search terms-atlathatosag | Jelenleg nincs helyi keyword/search terms export. |
| Domain-konszolidacio | `http` es `www` variansok kulon latszanak. |
| Néhány nagy lathatosagu landing CTR-je | Gyenge. |

## 14. P1-P3 javaslatok

### P1 - Azonnali

1. Helyre kell allitani a GA4 friss adatlekero lancot.
   - OAuth token ujraelesitese vagy uj token.
   - service accountnak valos GA4 jogosultsag adasa, ha ez a kivant irany.
2. A GTM-ben ellenorizni kell, hogy a `dnd_booking_click`, `dnd_phone_click`, `dnd_email_click`, `dnd_contact_click` tenylegesen GA4 eventbe vannak-e kotve.
3. A mar lathato Google Ads conversion actionok kozul tisztazni kell, hogy uzletileg melyik szamit fo konverzionak: booking, lead, call vagy mas mikrokonverzio.

### P2 - Kozephosszu

1. A `szallasok/` oldalt kulon kampanylandingge kell erositeni.
2. A `royal/` oldalra kifejezett Keszthely/Royal Homes FAQ blokk kell.
3. A `kisapáti szállás` intentre a fo property oldalakon egyertelmubb promise es jobb hirdetesi landing uzenet kell.
4. A domain variansokat technikailag rendezni kell.

### P3 - Növekedesi

1. Külön kampanycsoportot erdemes tesztelni Káli-medence / Köveskál iranyra.
2. Később jo tamogato tema lehet a boros, biciklis es Balaton-kozeli tematika.
3. Remarketinget csak akkor erdemes erositeni, ha a primer meres mar bizonyitottan jo.

## 15. Mit kell legkozelebb bekerni ehhez a living dochoz

Ahhoz, hogy a kovetkezo verzio mar tenyleg teljes Google Ads audit legyen, ezek kellenek:

1. Google Ads kampanyexport
   - kampany, ad group, keyword, search terms, cost, clicks, conversions
2. Google Ads conversion actions lista uzleti validalasa
   - neve, tipus, primary/secondary statusz, es hogy melyik mit jelent a gyakorlatban
3. GTM export vagy screenshotok
   - GA4 config tag
   - Google Ads conversion tag
   - conversion linker
   - trigger hozzarendelesek
4. Friss GA4 event export
   - kulon szurten a `dnd_*` esemenyekre

## 16. Kovetkezo dokumentumfrissiteshez checklista

- [ ] Friss GA4 fetch sikerult
- [ ] Friss GSC fetch sikerult
- [x] Google Ads kampanylista bekerult
- [x] Conversion actions bekerultek
- [ ] `dnd_booking_click` bizonyitottan latszik GA4-ben
- [x] `dnd_booking_click` bizonyitottan latszik Ads-ben conversion action szinten
- [ ] `szallasok/` landing felulvizsgalva
- [ ] `royal/` landing felulvizsgalva

## 17. Gyors kovetkeztetes

Jelen allapotban nem az a fo problema, hogy nincs mire epiteni, hanem az, hogy a meres es az Ads-athatolhatosag felepitese egyenetlenul keszult el. A site oldali alapok biztatoak, a keresleti jelek jok, es a Google Ads API oldal mar hasznalhato. A fo bizonytalansag most inkabb a GA4/GTM zarasban, valamint a keyword- es search terms-szintu lathatosagban van.

Ezert a helyes sorrend:

1. meresi lanc helyreallitas,
2. GA4/GTM oldali conversion-ellenorzes lezárasa,
3. utana Search kampanystrukturak tudatos ujraepitese a brand + Kisapati + Royal Homes + Káli-medence tengelyen.

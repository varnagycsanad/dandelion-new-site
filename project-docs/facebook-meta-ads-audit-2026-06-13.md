# Facebook / Meta audit - Dandelion Vendeghazak

Status: AKTUALIS
Last checked: 2026-06-13
Use for: Facebook oldal es Meta hirdetesi lehetosegek teljes koru auditja

[CHANGE 2026-06-13 14:00] Elso Facebook / Meta audit letrehozva kozvetlen Meta API, publikus Facebook oldal es weboldali landing struktura alapjan.

## Vezetoi osszefoglalo

A Dandelion Facebook / Meta jelenlete technikailag elerheto es a hirdetesi fiok mukodik, de jelenleg nincs friss, merheto Meta hirdetesi teljesitmeny. A Meta Ads fiokban tobb regi kampany `ACTIVE` statuszban maradt, viszont az elmult 30 es 365 napra nincs insight sor. Ez azt jelenti, hogy most nem teljesitmeny-optimalizalasi audit a fo feladat, hanem rendrakas, mereselokeszites es elso uj kampanyrendszer felepitese.

A Facebook oldal publikus alapadatai rendben vannak: nev, kategoria, cim, telefon, email, weboldal, kovetoszam. A fo gyenge pont a tartalmi es hirdetesi frissesseg: a lathato legfrissebb poszt a Panorama Pool nyitasrol szol, de alacsony lathato reakcioval. A weboldal ezzel szemben mar eros kampanyalap: van kulon szallasvalaszto, medences Kisapati landing, Panorama Pool oldal, konkret hazoldalak es tobbnyelvu struktura.

## Felhasznalt forrasok

- Kozvetlen Meta Marketing API: helyi `scripts/meta/meta-ads.mjs` read-only parancsok.
- Projekt dokumentacio: `project-docs/META_ADS_CODEX_INTEGRATION.md`, `project-docs/ELO_FELADATLISTA.md`.
- Facebook oldal: `https://www.facebook.com/DandelionVendeghaz/`.
- Weboldal es lokalis forras: `src/data/accommodations.ts`, `src/pages/szallasok.astro`, `src/pages/kisapati-medences-szallas.astro`, `src/pages/panorama-pool.astro`.
- Meta hivatalos segedanyagok: kampanycelok, Advantage+ Audience, Lead Ads Instant Form, Pixel es Conversions API.

## Meta technikai allapot

### API es fiokeleres

Ellenorzes eredmenye:

- Meta access token mukodik.
- Felhasznalo: Ilona Varnagy.
- Lathato hirdetesi fiokok:
  - `act_2013849525415667` - Ilona Varnagy
  - `act_169467498360546` - Dandelion Vendeghaz
- Dandelion fiok penzneme: HUF.
- Dandelion fiok statusza: aktiv fiokstatusz.

Kovetkeztetes: a Codexbol kozvetlen Meta Ads read-only audit futtathato. Kampany letrehozasa csak kulon jovahagyassal, `PAUSED` allapotban legyen.

### Kampanylista

A Dandelion hirdetesi fiokban 24 kampany lathato. Ezek nagy resze 2021-2022-es regi kampany.

Aktivnak jelolt regi kampanyok szama: 10.

Aktivnak jelolt kampanyok:

- `POST - Oszi kedvezmeny - 2021.08.` - POST_ENGAGEMENT
- `PPC - Oszi - 2021.07.` - LINK_CLICKS
- `POST - Longcopy - 2021.07.` - POST_ENGAGEMENT
- `PPC - Oldalkedveles - 2021.07.` - PAGE_LIKES
- `POST - Last minute junius - 2021.05.` - POST_ENGAGEMENT
- `PPC - Oldalkedveles - 2021.05.` - PAGE_LIKES
- `POST - Tavasz - 2021.04.` - POST_ENGAGEMENT
- `POST - Last Minute - 2021.04.` - POST_ENGAGEMENT
- `POST - Longcopy - 2021.04.` - POST_ENGAGEMENT
- `PPC - Oldalkedveles - 2021.04.` - PAGE_LIKES

### Insight allapot

Lekerdezett idoszakok:

- utolso 30 nap: nincs sor
- utolso 365 nap: nincs sor

Kovetkeztetes: nincs friss riportolhato koltes, kattintas, konverzio vagy kampanyteljesitmeny. A regi `ACTIVE` kampanyok valoszinuleg nem koltenek, vagy az ad set / budget / delivery allapot miatt nem szallitanak. Ennek ellenere kockazat, hogy regi kampanyok aktiv statuszban vannak.

## Facebook oldal audit

### Publikus oldaladatok

Oldal: Dandelion Vendeghaz | Kisapati

Graph / publikus adatok:

- Page ID: `100105918439273`
- Nev: Dandelion Vendeghaz
- Kategoria: Szallas
- Kovetok: 2161
- Weboldal: `http://www.dandelionhouse.hu/`
- Telefon: `+36 20 773 0807`
- Email: `hello@dandelionhouse.hu`
- Cim: Kossuth utca 78/4., Kisapati, Hungary
- Facebookon lathato ajanlas: 100% ajanlja, 5 velemeny
- Facebookon lathato arkategoria: `$$$`

### Ami rendben van

- A nev es kategoria egyertelmu.
- A telefon, email es weboldal osszhangban van a weboldallal.
- A kovetobazis nem nullarol indul; 2161 koveto helyi szallasmarkanal hasznalhato alap.
- Van aktualis temaju poszt a Panorama Poolrol.
- A weboldal mar tartalmaz profi vizualis es landing alapokat, amelyeket Facebook posztokhoz es hirdetesekhez lehet kotni.

### Gyenge pontok

- A Facebook oldal neve egyes szamban van: `Dandelion Vendeghaz`, mikozben a weboldal markaja `Dandelion Vendeghazak`. Ez zavart okozhat, mert ma mar tobb hazas portfoliorol van szo.
- A lathato legfrissebb poszt alacsony reakcioval fut. A medence eros termekujdonsag, de organikusan nincs eleg terites.
- A Névjegyben szereplo URL `http://` formaban latszik; erdemes `https://dandelionhouse.hu/` formara cserelni.
- A Facebook oldal cime `Kossuth utca 78/4.`, mikozben a weboldali impresszumban a ceg szekhelye `78/5`. Ez lehet teljesen jogos kulonbseg, de erdemes tudatosan ellenorizni.
- A Facebook oldal meg mindig inkabb egyetlen kisapati haz jellegu benyomast adhat, mikozben a weboldal mar portfoliot mutat: Kisapati, Balaton mellett, Kali-medence.

## Weboldali hirdetesi alapok

### Eros landing oldalak

1. `/szallasok/`
   - Teljes szallasvalaszto.
   - Jo hideg forgalomnak, ha a vendeg meg nem tudja, melyik haz kell.
   - Eros regiobontas: Tanuhegyek, Balaton mellett, Kali-medence.

2. `/kisapati-medences-szallas/`
   - Legjobb nyari kampanylanding.
   - D1, D2 es Fugehaz egy temaban: Kisapati + Panorama Pool.
   - Jo Facebook / Instagram traffic es lead kampanyhoz.

3. `/panorama-pool/`
   - Eros vizualis elmenyoldal.
   - Inkabb inspiracios / remarketing landing, mint direkt foglalasi oldal.

4. Konkret hazoldalak
   - `/dandelion-d1/` - nagyobb csalad, barati tarsasag.
   - `/dandelion-d2/` - csaladbarat Kisapati.
   - `/fuge/` - panoramas, csendesebb pihenes.
   - `/royal/` - Keszthely, vizpart, jakuzzi.
   - `/szepvolgyi/` - Badacsonyors, nagyobb tarsasag, balatoni panorama.
   - `/dandelion-koveskal/` - Kali-medence, csend, boraszatok.

### Fo ajanlati temak

- Panorama Pool: D1, D2, Fugehaz, 2026. junius 15-tol.
- Kisapati / Szent Gyorgy-hegy: termeszetkozeli, panoramas, csaladi es barati pihenes.
- Balaton-kozeli hazak: Royal Homes Keszthely, Szepvolgyi Badacsonyors.
- Csendes, falusias pihenes: Koveskal, Szololiget, Zsalya.
- Kozvetlen foglalas: SabeeApp, telefon, email, WhatsApp.
- Valodi vendegbizalom: Google / Booking ertekelesek es Trustindex szerint eros kulso proof.

## Hirdetesi lehetosegek

### 1. Nyari Panorama Pool kampany

Cel: foglalasi erdeklodes es direkt forgalom a medences hazakra.

Landing: `/kisapati-medences-szallas/`.

Kampanycel:

- Elso korben `Leads` vagy `Traffic`.
- Ha meres es konverzioesemenyek rendben vannak, kesobb `Sales`.

Celcsoport:

- Magyarorszag, elsosorban Budapest, Pest megye, Nyugat-Magyarorszag, Balaton-kornyeki erdeklodok.
- Csalados es hetvegi pihenes irany.
- Advantage+ Audience tesztelheto, de kezdetben legyenek kozonsegkontrollok: orszag, nyelv, eletkor, foldrajz.

Kreativ:

- Hero video / rovid Reels a medencerol.
- Carousel: D1, D2, Fugehaz + medence.
- Kep: medence + tanhegyi panorama.

Uzenet:

- "Kisapati szallas medencehasznalattal"
- "D1, D2 es Fugehaz vendegeinek Panorama Pool"
- "Szent Gyorgy-hegy, kert, terasz, nyari pihenes"

### 2. Szallasvalaszto kampany

Cel: hideg kozonseg bevezetese a teljes Dandelion portfolioba.

Landing: `/szallasok/`.

Kampanycel:

- `Traffic` kezdeti tesztre.
- `Leads`, ha erdeklodo urlap vagy gyors ajanlatkeres mukodik.

Kreativ:

- Regio carousel:
  - Tanuhegyek
  - Balaton mellett
  - Kali-medence
- Minden kartya kulon hazcsoportot mutasson.

Uzenet:

- "Nem egy helyszin, harom kulon vilag"
- "Valassz szallast igeny szerint: medence, Balaton, csend"

### 3. Balaton-kozeli / jakuzzis kampany

Cel: Royal Homes es Szepvolgyi kulon pozicionalasa.

Landing:

- `/royal/`
- `/szepvolgyi/`
- vagy `/szallasok/#balaton-mellett`

Kampanycel:

- `Traffic` vagy `Leads`.

Kreativ:

- Royal Homes: vizpart, tetoteraszos jakuzzi, modern apartman.
- Szepvolgyi: 8 fo, balatoni panorama, Badacsonyors.

Uzenet:

- "Balatonhoz kozel, kenyelmes hazban"
- "Keszthely vizpart vagy Badacsonyors panorama"

### 4. Last minute / felszabadult idopont kampany

Cel: rovid tavon ures ejszakak kitoltese.

Landing:

- konkret hazoldal vagy SabeeApp foglalasi link.

Kampanycel:

- `Leads`, Messenger / WhatsApp irannyal.
- Kis budget, rovid futas.

Kreativ:

- Egyszeru datumos kep vagy rovid video.
- "Felszabadult hetvege" tipusu poszt.

Fontos: ezt csak akkor erdemes futtatni, ha a szabad kapacitas gyorsan es pontosan frissitheto.

### 5. Remarketing kampany

Cel: weboldalt latogatok visszahozasa foglalasi donteshez.

Elfeltetel:

- Meta Pixel vagy Conversions API meres tisztazasa.
- Legalabb PageView, ViewContent, lead / booking click es contact click esemenyek.

Landing:

- konkret hazoldal, ha ismert az erdeklodes.
- `/szallasok/`, ha csak altalanos latogato.

Kreativ:

- Vendegertekelesek.
- Hazankenti legerosebb kep.
- "Megnezted, melyik Dandelion haz illik hozzatok?"

## Meresi es technikai javaslatok

### Minimum meres

- Meta Pixel telepitese vagy ellenorzese.
- Események:
  - `PageView`
  - `ViewContent` hazoldalakon
  - `Lead` ajanlatkeres / kapcsolat eseten
  - `Contact` telefon, email, WhatsApp kattintasra
  - `InitiateCheckout` vagy egyedi `BookingClick` SabeeApp kattintasra

### Jobb meres

- Conversions API elokeszitese, ha a foglalasi es erdeklodesi adatok biztonsagosan, jogilag rendben tovabbithatok.
- UTM kovetes minden Meta hirdetesre:
  - `utm_source=meta`
  - `utm_medium=paid_social`
  - `utm_campaign=2026_pool_kisapati`
  - `utm_content=creative_variant`

### Riport

Amig nincs koltes, heti Meta riport nem ertelmes. Elso kampany utan heti riportmezok:

- koltes
- reach
- impressions
- link clicks
- CTR
- CPC
- landing page views
- leads / contact clicks / booking clicks
- CPL vagy cost per booking click
- kreatív szerinti bontas
- landing szerinti bontas

## Kritikus teendok

1. Regi aktiv kampanyok rendezese
   - A 10 aktiv statuszu 2021-es kampanyt Ads Managerben at kell nezni.
   - Ha nem futtatni akarjuk oket, legyenek `PAUSED`.
   - Ez nem teljesitmenykerdes, hanem fiokhigienia.

2. Facebook oldal nev es profilfrissites
   - Javasolt nev: `Dandelion Vendégházak`.
   - Web URL legyen `https://dandelionhouse.hu/`.
   - Borito / rovid bemutatkozas mutassa, hogy tobb hazas portfoliorol van szo.

3. Posztolasi ritmus
   - Heti 2-3 organikus poszt a nyari szezonban.
   - Legalabb heti 1 Reels / rovid video.
   - Temak: medence, szabad idopont, hazbemutato, vendegertekeles, kornyekprogram.

4. Elso uj kampany PAUSED allapotban
   - Kampanyterv utan letrehozhato draft / paused kampany.
   - Inditas csak emberi ellenorzessel.

## 30 napos akcioterv

### 1. het

- Regi aktiv kampanyok auditja Ads Managerben.
- Facebook oldal nev, URL, borito, rovid leiras frissitese.
- Meta Pixel jelenlet ellenorzese.
- UTM szabvany veglegesitese.

### 2. het

- 6-9 kreativ osszerakasa:
  - 3 Panorama Pool
  - 3 hazkartyas carousel
  - 1-2 vendegertekeles
  - 1 last minute sablon
- Facebook organikus posztterv 4 hetre.

### 3. het

- Elso kampanystruktura:
  - Campaign 1: Pool / Kisapati
  - Campaign 2: Szallasvalaszto
  - Campaign 3: remarketing, ha a meres kesz
- Kampanyok `PAUSED` allapotban.

### 4. het

- Inditas kis budgettel, napi kontrollal.
- 3-5 nap utan kreativ es landing bontas elso kiertékelese.
- Gyenge kreativok leallitasa, eros kreativok budget novelese.

## Javasolt elso kampanystruktura

### Campaign A - `2026_POOL_KISAPATI_LEADS`

- Objective: Leads vagy Traffic.
- Landing: `/kisapati-medences-szallas/`.
- Ad set 1: Magyar csaladok / hetvegi pihenes.
- Ad set 2: Budapest + Pest megye + Balaton irant erdeklodok.
- Ad set 3: Advantage+ Audience kontrollokkal.
- Ads:
  - Video: medence panorama.
  - Carousel: D1 / D2 / Fugehaz.
  - Static: medence + "Kisapati szallas medencehasznalattal".

### Campaign B - `2026_STAYS_SELECTOR_TRAFFIC`

- Objective: Traffic.
- Landing: `/szallasok/`.
- Ad set: hideg HU kozonseg.
- Ads:
  - Regio carousel.
  - Hazvalaszto copy.
  - Vendegertekeleses proof.

### Campaign C - `2026_LAST_MINUTE_REMARKETING`

- Objective: Leads / Engagement / Traffic, aktualis cel szerint.
- Landing: konkret hazoldal vagy SabeeApp.
- Futasi ido: 3-7 nap.
- Csak akkor induljon, ha tenyleges szabad idopont van.

## Dontesi javaslat

Most ne a regi kampanyok optimalizalasaval kezdjunk. A fiokban nincs friss teljesitmenyadat, a regi kampanystruktura pedig 2021-es celokbol es poszt boostokbol all. A jo kovetkezo lepes:

1. regi aktiv kampanyok lezarasa vagy tudatos archiv statuszba teve,
2. Facebook oldal portfoliomarka szintu frissitese,
3. elso 2026-os kampanyterv a Panorama Pool + szallasvalaszto tengelyen,
4. meres es UTM rendbetetele,
5. kis budgetes kontrollalt inditas.

# Google Ads Codex Tooling Audit

Status: AKTUALIS 2026-07-13

Cel: annak auditja, hogy a jelenlegi Codex workspace es a kapcsolodo helyi workflow-k mennyire alkalmasak Google Ads kampanyok technikai kezelesere.

Fontos keretezes:

- ez az audit nem a kampanystrategiat vagy a hirdetesszovegeket minositi,
- nem azt vizsgalja, hogy a kampanyok jo eredmenyt hoznak-e,
- hanem azt, hogy a Codex oldalrol megvan-e a megfelelo eszkozkeszlet a kampanyok atlatasahoz, auditjahoz, reszleges modositasahoz es stabil operativ kezeleshez.

## 1. Vezetoi osszegzes

Jelen allapotban a Codex **reszben alkalmas** Google Ads kezelesre, de **nem rendelkezik meg minden szukseges eszkozzel a teljes koru, napi szintu kampanymenedzsmenthez**.

Mi mar bizonyitottan mukodik:

- Google Ads API auth es alap riport workflow,
- customer, campaign, performance, conversion es search terms visszaolvasas,
- kampanyszintu pause/enable mutacio validate-only tamogatassal,
- campaign budget lista es budget update workflow validate-only tamogatassal,
- ad group lista es ad group create/update workflow validate-only tamogatassal,
- RSA hirdetes lista es RSA create/update workflow validate-only tamogatassal,
- kulcsszo-szintu audit,
- szukitett kulcsszo-modositas es negativ kulcsszo mutacio,
- GTM account/container/workspace/version lathatosag,
- GTM tag- es triggerlista lekerdezese,
- GA4 Admin oldalon key event es Google Ads link lathatosag,
- site oldali dataLayer booking esemenyek.

Mi nincs meg teljesen:

- nincs natív Google Ads connector a Codexben,
- nincs teljes kampany-irasi felulet a helyi workflow-ban,
- a Keyword Planner kutatas jelenleg nem stabilan hasznalhato,
- nincs egyseges end-to-end healthcheck a teljes Ads -> GTM -> GA4 -> Ads link lancra,
- nincs bizonyitott, teljes Google Ads conversion tag kezeles GTM oldalon,
- a hasznalhatosag egy resze ma is helyi Node scriptekre epul.

Kovetkeztetes:

- auditra es reszleges optimalizaciora a Codex mar hasznalhato,
- teljes koru operativ kampanykezelesre meg nem eleg eros.

## 2. Mi bizonyitottan mukodik

### 2.1 Google Ads API alapkapcsolat

A repo kulon Ads workflow-t tartalmaz a `package.json` scriptjeiben:

- `ads:auth`
- `ads:check`
- `ads:customers`
- `ads:campaigns`
- `ads:performance`
- `ads:conversions`
- `ads:search-terms`
- `ads:keywords:audit`
- `ads:keywords:apply`

Forras:

- `package.json`
- `scripts/google-ads-report.mjs`
- `scripts/google-ads-keyword-workbench.mjs`

2026-07-13-an eloben lefutott:

- `ads:check`
- `ads:customers`
- `ads:campaigns`
- `ads:performance`
- `ads:conversions`
- `ads:search-terms`
- `ads:keywords:audit`

Ez bizonyitja, hogy:

- az OAuth token hasznalhato,
- a developer token hasznalhato alap riportokra,
- a workspace hozzafer az aktualis Ads fiokokhoz,
- a kampanyok nemcsak elmeletben, hanem tenylegesen visszaolvashatok.

### 2.2 Lathato fiokok es kampanyok

2026-07-13-an bizonyitottan visszaolvashato volt:

- `Dandelion Vendégházak`
- `Dandelion Manager`

Es latszottak aktiv kampanyok is, tobbek kozott:

- `Dandelion - Brand - HU`
- `Dandelion - Szállás Balaton-felvidék - HU`
- `Dandelion - Kisapáti Szent György-hegy - HU`
- `Dandelion - Medencés szállás - HU`

Ez azt jelenti, hogy a Codex jelenleg nem vak az aktualis Google Ads allapotra.

### 2.3 Teljesitmeny, search terms es conversion action lathatosag

A jelenlegi helyi workflow mar ad:

- kampanyszintu teljesitmenyt,
- conversion action listat,
- search terms riportot,
- kulcsszo-szintu auditot.

Ez mar eleg eros alap ahhoz, hogy:

- latszodjon, mely kampanyok futnak,
- latszodjon a koltes,
- latszodjon, milyen keresesi kifejezesek jonnek,
- latszodjon, milyen kulcsszavak aktivak,
- latszodjanak a fo konverzios objektumok.

### 2.4 Szetesen korlatozott, de valos Ads mutacios kepesseg

A `scripts/google-ads-keyword-workbench.mjs` alapjan a Codex jelenleg kepes:

- kulcsszavak pauselasara,
- uj kulcsszavak felvitelere,
- kampanyszintu negativ kulcsszavak torlesere,
- kampanyszintu negativ kulcsszavak hozzaadasara,
- validate-only futasra.

Ez fontos, mert azt jelenti, hogy a rendszer nem csak olvasni tud, hanem mar van korlatozott irasi felulet is.

2026-07-13-i bovitessel a `scripts/google-ads-report.mjs` mar kepes:

- kampanyok pauselasara,
- kampanyok visszaengedelyezesere,
- `--campaign-id` vagy `--campaign` alapu celzasra,
- `--validate-only` biztonsagi ellenorzesre.

Tovabbi 2026-07-13-i bovitessel mar kepes:

- campaign budget lista visszaolvasasara,
- campaign budget ID alapjan modositasra,
- kampanyszuro alapu budget celzasra,
- `--amount` vagy `--amount-micros` alapu update-re,
- `--validate-only` biztonsagi futasra.

Tovabbi 2026-07-13-i bovitessel mar kepes:

- ad group lista visszaolvasasara,
- ad group letrehozasara kampanyszinten,
- ad group nev / statusz / CPC licit modositasara,
- `--ad-group-id` vagy kampanyszuro alapu celzasra,
- `--validate-only` biztonsagi futasra.

Tovabbi 2026-07-13-i bovitessel mar kepes:

- responsive search ad lista visszaolvasasara,
- RSA hirdetes letrehozasara ad group szinten,
- RSA hirdetes statusz- es tartalmi frissitesere,
- final URL, path, headline es description szintu modositasra,
- `--ad-id` alapu egyedi celzasra,
- `--validate-only` biztonsagi futasra.

### 2.5 GTM hozzaferes tenylegesen el

A GTM helper script mar nemcsak dokumentacios szinten letezik, hanem eloben visszaadta:

- accountot,
- containert,
- workspace-t,
- live versiont,
- tageket,
- triggereket.

Bizonyitott elemek:

- account: `Dandelionhouse`
- container public ID: `GTM-P75FHKLJ`
- workspace: `Default Workspace`
- live version: `Codex booking confirmation fix 2026-07-10`

Ez eros bizonyitek arra, hogy a Codex hozzafer a konverziomeresi reteghez is.

### 2.6 GTM-ben latszanak a bookinghez kotott GA4 event tagek

2026-07-13-an latszott tobbek kozott:

- `GA4 - dnd_booking_click`
- `Google Analytics GA4-eseményGA4 - dnd_booking_confirmation`
- `GA4 - dnd_phone_click`
- `GA4 - dnd_email_click`
- `GA4 - dnd_contact_click`

Ez azt jelenti, hogy a bookinghez kapcsolodo esemenyek nem csak a frontenden vannak jelen, hanem GTM-bol is visszaolvashatoak.

### 2.7 GA4 Admin oldalrol latszik az Ads kapcsolat

2026-07-13-an eloben visszajott:

- a Google Ads link lista,
- a key event lista.

Kiemelten fontos jelek:

- `dnd_booking_click` key event latszik,
- `dnd_booking_confirmation` key event latszik,
- van Google Ads link a `8709363152` customer ID-hez.

Ez azt jelenti, hogy a Codex nemcsak az Ads fiokot latja, hanem a GA4 oldali kapcsolodasi pont egy reszet is.

### 2.8 A site oldalon a booking dataLayer esemeny bizonyitott

A frontend oldalon a `public/scripts/dnd-ads-events.js` bizonyitottan kuld:

- `dnd_booking_click`
- tobb egyeb kontakt- es CTA-esemenyt

Ez a meresi lanc egyik legfontosabb technikai alapja.

## 3. Mi nem mukodik eleg jol vagy hianyzik

### 3.1 Nincs natív Google Ads connector a Codexben

A jelenlegi Google Ads kezeles helyi Node scriptekre epul.

Ez onmagaban nem hiba, de jelent kockazatot:

- nagyobb a fenntartasi teher,
- a hasznalat kevesbe egységes,
- a tudaskeszlet szetszorodik doksikban es scriptekben,
- nincs gyari szintu, centralizalt Ads muveleti felulet.

Kovetkezmeny:

- a rendszer mukodik, de inkabb egyedi workflow, mint teljes platformkepesseg.

### 3.2 Nincs teljes Google Ads irasi felulet

A jelenlegi repo-ban nem latszik kesz workflow a kovetkezokre:

- uj kampany letrehozas,
- kampany pause / enable teljes workflow,
- budget modositas,
- bidding strategia modositas,
- ad group letrehozas es szerkesztes,
- RSA hirdetesek letrehozasa vagy szerkesztese,
- asset kezelese,
- location target beallitasok irasa,
- language target beallitasok irasa,
- audience vagy observation kezeles,
- conversion action kezeles Ads oldalon,
- bulk import vagy valtozaskezelo pipeline.

Ez a legfontosabb funkcionalis hiany.

### 3.3 A Keyword Planner workflow jelenleg nem stabil

A korabbi dokumentacio szerint 2026-07-10-en a blokkolas oka:

- `DEVELOPER_TOKEN_NOT_APPROVED`
- Explorer access szintu developer token
- 403 hiba a Keyword Planner vegpontokon

2026-07-13-an ujraellenorizve a workflow mar nem 403-at, hanem:

- `Google Ads API 429: Resource has been exhausted`

hibat adott.

Kovetkeztetes:

- a korabbi blokkolas oka reszben valtozhatott,
- de a gyakorlatban a Keyword Planner ma sem tekintheto stabilan hasznalhatonak,
- emiatt a Codex kulcsszokutatasi kepessege korlatozott marad.

### 3.4 A GTM-ben nincs kulon AW-tag, de a GA4 importos Ads konverzios lanc igazolt

A GTM-ben most visszaolvashatoak:

- Google tag,
- GA4 esemenytagek,
- Meta Pixel tag.

Viszont a mostani ellenorzesben nem latszott kulon, egyertelmu `AW-` alapu Google Ads conversion tag.

Ez nem jelenti automatikusan azt, hogy nincs konverziomeres, mert:

- az Ads oldalon latszik GA4 importalt konverzio,
- a GA4 key eventek es Ads link is latszik.
- 2026-07-13-an az Ads API `conversion_action.tag_snippets` visszaolvasta a `dnd_booking_click` es `dnd_booking_confirmation` esemény-snippeteket is.

Kovetkeztetes:

- a jelenlegi, bizonyitottan mukodo ut a `GTM -> GA4 event -> GA4 key event -> Ads import`,
- vagyis itt nem egy hianyzo meresrol volt szo, hanem egy tul szigoru ellenorzo feltetelrol,
- a healthchecket ennek megfeleloen javitani kellett, hogy a mukodo GA4 importos Ads-konverzios utat is `ok` allapotnak vegye.

### 3.5 Nincs egyseges, egygombos healthcheck

Most kulon darabok vannak:

- Ads auth es riport,
- GTM olvasas,
- GA4 Admin ellenorzes,
- frontend event kod.

De nincs olyan egyetlen parancs, amely egyben ellenorizne:

- tokenek ervenyesseget,
- Ads customer elerest,
- kampanyadatok visszaolvashatosagat,
- conversion action listat,
- GA4 Ads linket,
- key eventeket,
- GTM container / tag / trigger allapotot,
- booking confirmation meresi lancot.

Ez operativ szinten nagy hiany.

### 3.6 A GTM helper reszben kepesebb, mint amennyire kenyelmesen hasznalhato

A `google-tag-manager.mjs` script tud:

- reszletes `tag` lekerdezest,
- reszletes `trigger` lekerdezest,
- trigger hozzaadast,
- version keszitest,
- publish muveletet.

De ezekhez nincs teljes npm shortcut keszlet a `package.json`-ban.

Ez nem technikai blokkolas, de valos hasznalhatosagi hiany.

## 4. Mit jelent ez uzemeltetesi szemmel

### 4.1 Mire alkalmas most a Codex

A jelenlegi allapotban a Codex alkalmas:

- kampanyok technikai auditjara,
- aktiv kampanyok visszaolvasasara,
- teljesitmenyriportok keszitesere,
- search term auditokra,
- kulcsszo-szintu atvilagitasra,
- negativ kulcsszo javaslatok es reszleges alkalmazasuk tamogatasara,
- GTM / GA4 / Ads kapcsolati pontok ellenorzesere,
- dokumentalt, kontrollalt kisebb technikai modositásokra.

### 4.2 Mire nem alkalmas meg teljesen

Jelen allapotban a Codex nem alkalmas meg teljes bizonyossaggal:

- teljes kampanyeletciklus-kezelesre,
- rendszeres kampanyepitesre nullarol,
- teljes hirdetes- es assetmenedzsmentre,
- komplett bidding es budgetkezelesre,
- stabil kulcsszokutatasra Keyword Planner alapon,
- egyben vegigkovetett, automatikus meresi healthcheckre.

## 5. P0 / P1 / P2 akcioterv

### P0 - azonnal szukseges, hogy a rendszer operativan biztonsagosabb legyen

1. Keszuljon egy egyseges `google-stack:healthcheck` script.
2. Keszuljon kulon ellenorzes a teljes booking meresi lancra.
3. Ellenorizni kell, hogy van-e vagy nincs kulon Google Ads conversion tag a GTM-ben.
4. Frissiteni kell a Keyword Planner blokkolo statusz dokumentaciojat a mai valos hibara.
5. A GTM helperhez keruljenek be a hianyzo npm shortcutok:
   - `gtm:tag`
   - `gtm:trigger`
   - opcionálisan `gtm:add-firing-trigger`
   - `gtm:create-version`
   - `gtm:publish-version`

Megvalositas allapot 2026-07-13:

- [x] `google-stack:healthcheck`
- [x] `google-stack:booking-chain`
- [x] GTM shortcutok bovitve
- [x] Keyword Planner mai hibaallapot doksiban frissitve
- [x] GTM direct Ads conversion tag jelenlet ellenorzese healthcheckben

### P1 - szukseges a teljesebb kampanykezeleshez

1. Keszuljon Ads mutacios workflow kampanyszintu enable/pause muveletekre.
2. Keszuljon budget update workflow.
3. Keszuljon ad group create / update workflow.
4. Keszuljon RSA hirdetes audit + create/update workflow.
5. Keszuljon location/language target audit + mutate workflow.
6. Keszuljon strukturalt export/import formatum kampanyvaltozasokhoz.

Megvalositas allapot 2026-07-13:

- [x] kampanyszintu enable/pause workflow
- [x] budget update workflow
- [x] ad group create / update workflow
- [x] RSA hirdetes audit + create/update workflow
- [x] location/language target audit + mutate workflow
- [x] strukturalt export/import formatum kampanyvaltozasokhoz

### P2 - skálázási és kényelmi szint

1. Heti automatikus Ads + GTM + GA4 allapotriport.
2. Standard JSON snapshotok minden kritikus feluletrol.
3. Egyetlen living dashboard vagy gyujtodoksi a napi hasznalathoz.
4. Opcionálisan BigQuery vagy mas riportforras bekotes.

Megvalositas allapot 2026-07-13:

- [x] heti operations riport script
- [x] standard JSON snapshot script
- [x] gyujtodoksi a napi hasznalathoz
- [ ] opcionális BigQuery vagy mas kulso riportforras

## 6. Legfontosabb vegso kovetkeztetes

Ha a kerdes az, hogy:

> megvan-e most minden eszkoz a Codexben ahhoz, hogy a Google Ads kampanyokat teljes koruen kezeljuk?

A valasz:

- **a napi operativ kezeleshez mar majdnem teljes a keszlet; a kulso riportforras csak opcionalis plusz**.

Ha a kerdes az, hogy:

> van-e mar eleg eros technikai alap ahhoz, hogy ne vakon dolgozzunk, hanem auditáljunk, ellenorizzunk es reszben be is avatkozzunk?

A valasz:

- **igen, erre mar egyertelmuen alkalmas**.

Rovid minosites:

- Audit kepesseg: **eros**
- Meresi kapcsolati pontok lathatosaga: **jo**
- Operativ teljes kampanykezeles: **jo / kontrollalt**
- Kutatasi kepesseg Keyword Planner oldalon: **gyenge / instabil**
- Platformszintu keszenlet: **jo**

## 7. Javasolt kovetkezo konkret feladat

Ha a cel az, hogy a Codex tenyleg napi kampanykezelo eszkoz legyen, akkor a legjobb kovetkezo lepes:

1. a heti riport idozitett futtatasa
2. a snapshotok archivuma vagy kulso tarolasa
3. opcionálisan BigQuery vagy mas riportforras bekotese

Ezutan mar nem az alapkeszlet hianyzik, hanem a tovabbi automatizalas es riportskalazas.

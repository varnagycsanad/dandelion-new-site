# Meta Codex kezelhetosegi audit - 2026-07-13

Status: AKTUALIS
Last checked: 2026-07-14
Use for: annak gyors megitelese, hogy a Meta kapcsolat milyen allapotban van, es mi kell meg ahhoz, hogy a Codex tenylegesen, napi szinten kezelni tudja a Meta hirdeteseket

## Vezetoi osszefoglalo

A Meta kapcsolat hasznalhato. Az alap auth, az ads read + dry-run mutacios tooling, a Pixel / GTM validacio, a Facebook-oldal posztolasi workflow, a `pages_manage_posts` jogosultsag, valamint az elso eles Facebook-oldal poszt is kesz.

Ami meg nincs keszen, az mar nem alap-hozzaferesi problema, hanem tooling-melyseg es uzemi biztositek:

- teljes ad set mezoszerkesztes
- teljes creative/media upload workflow nullarol
- teljes kampanymodositas
- Pixel / Events Manager API-s workflow
- teljesen automatizalt token-eletciklus
- vegponttol vegpontig bongeszos smoke teszt

Kovetkeztetes: a Codex mar tud tenyleges Meta oldali munkat vegezni, de teljes napi uzemi hirdeteskezeleshez maradt nehany fontos bovitesi feladat.

## Kesz allapot roviden

- Meta auth es alap jogosultsagok mukodnek
- a Dandelion hirdetesi fiok elerheto
- kampany / ad set / ad / creative lista lekerdezheto
- dry-run kampany / creative / ad set / ad muveletek mukodnek
- ad set budget dry-run mukodik
- Pixel / GTM validacio megvan
- hianyzo `meta_*` GTM tagek letrehozasa megvan
- Facebook-oldal listazas es page token feloldas mukodik
- `pages_manage_posts` megszerzese kesz
- Facebook-oldal API-s posztolas mukodik
- az elso eles Facebook-oldal poszt publish megtortent

## Ellenorzott allapot

### Meta API kapcsolat

Ellenorzott:

- `npm run meta:check`
- `npm run meta:permissions`
- `npm run meta:accounts`
- `npm run meta:campaigns -- --limit 10`
- `npm run meta:adsets -- --limit 10`
- `npm run meta:ads -- --limit 10`
- `npm run meta:creatives -- --limit 10`
- `npm run meta:insights -- --days 30 --limit 10`
- `npm run meta:validate-pixel -- --format json`
- `npm run meta:gtm-events -- --execute --format json`
- `npm run meta:pages:list -- --format json`
- `npm run meta:pages:permissions -- --format json`
- `node scripts/meta/meta-pages.mjs create-post ... --execute --format json`

Rovid eredmeny:

- a token mukodik
- a token felhasznaloja: `Ilona Várnagy`
- a Dandelion hirdetesi fiok be van kotve:
  - `META_AD_ACCOUNT_ID=act_169467498360546`
- a Facebook-oldal latszik:
  - `Dandelion Vendégház`
  - `100105918439273`
- a Pixel azonosithato:
  - `489282852211205`
- a GTM container azonosithato:
  - `GTM-P75FHKLJ`
- a `pages_manage_posts` granted
- a Facebook Login for Business jovahagyas vegigfutott
- a hozzaferes a jelenlegi es jovobeli `Oldalak` es `Vallalkozasok` objektumokra lett megadva

### Kodoldali kepessegek

Meglepvo hiany nincs, de a tooling nem teljes.

Megvan:

- `scripts/meta/meta-ads.mjs`
- `scripts/meta/meta-validate-pixel.mjs`
- `scripts/meta/gtm-meta-events.mjs`
- `scripts/meta/meta-auth.mjs`
- `scripts/meta/meta-pages.mjs`

Hasznalhato npm shortcutok:

- `meta:check`
- `meta:permissions`
- `meta:accounts`
- `meta:campaigns`
- `meta:adsets`
- `meta:ads`
- `meta:creatives`
- `meta:insights`
- `meta:create-campaign`
- `meta:create-creative`
- `meta:create-adset`
- `meta:create-ad`
- `meta:pause-campaigns`
- `meta:enable-campaigns`
- `meta:pause-adsets`
- `meta:enable-adsets`
- `meta:pause-ads`
- `meta:enable-ads`
- `meta:update-budgets`
- `meta:validate-pixel`
- `meta:gtm-events`
- `meta:auth:url`
- `meta:auth:exchange`
- `meta:auth:extend`
- `meta:auth:inspect`
- `meta:auth:save-token`
- `meta:pages:check`
- `meta:pages:permissions`
- `meta:pages:list`
- `meta:pages:create-post`

### Weboldal oldali meresi elokeszites

Megvan:

- consent kezelesben szerepel a `Meta Pixel`
- a marketing hozzajarulas atmegy a consent bridge-en
- a site GTM-kompatibilis Meta esemenyeket allit elo
- a fo `meta_*` esemenyekhez GTM Meta lefedettseg van

## Meg hatralevo feladatok

### P1 - hirdeteskezelesi tooling hianyok

1. Teljes ad set mezoszerkesztes
   - audience
   - geo
   - age
   - placements
   - optimization goal
   - conversion location
   - jelenleg csak sablonalapu klonozas van

2. Teljes creative/media upload workflow
   - kep vagy video feltoltes nullarol
   - asset-hivatkozas kezeles
   - primary text / headline / description teljes workflowban

3. Teljes kampany- es ad-modositas
   - meglevo kampanyok szeles koru szerkesztese
   - kampanyszintu budget modositas
   - ad statusz / creative hozzarendeles teljesebb kezelessel

### P1 - meresi es uzemi bizonyossag

1. Bongeszos smoke teszt
   - valos user journey
   - hozzajarulas utan
   - landing -> booking lanc
   - Pixel / GTM / attribucio ellenorzes

2. Meta Events Manager / domain / asset ellenorzes
   - Pixel melyik domainhez van kotve
   - Facebook Page es ad account kapcsolat
   - Instagram account kapcsolat, ha kell
   - conversion mapping ellenorzese

### P1 - uzembiztos mukodes

1. Token eletciklus automatizalas
   - jelenleg van runbook-jellegu helper
   - nincs teljesen automatikus frissites vagy expiralas-kezeles

2. Melyebb jogosultsag-diagnosztika
   - a sima `permissions` lista megvan
   - asset-szintu irasi diagnosztika meg bovitheto

3. Valtozasnaplo
   - kampany / budget / statusz valtozasokhoz kulon naplozas nincs

## Kockazatok

### P1 - operativ hiany

A Codex tud hasznos Meta oldali munkat vegezni, de a teljes, nullarol induló operativ workflow meg nincs kesz.

### P1 - meresi bizonytalansag

A meresi lanc nagy resze validalt, de a valos, bongeszos end-to-end smoke teszt tovabbra sem futott le.

### P1 - token/jogosultsag atlathatosag

Az alap auth rendben van, de a teljesen automatizalt token-eletciklus es a melyebb asset-szintu irasi diagnosztika meg nincs keszen.

## Vegso statusz

Nem minden van keszen az eredeti audit teljes ertelmeben.

Kesz:

- auth es jogosultsagok
- `pages_manage_posts`
- Facebook-oldal API-s posztolas
- Pixel / GTM validacios alapok
- fo ads read + dry-run workflowk

Nyitott:

- teljes hirdeteskezelesi tooling-melyseg
- teljes media/upload workflow
- asset- es meresi smoke teszt
- token eletciklus automatizalas
- melyebb uzemi diagnosztika es valtozasnaplo

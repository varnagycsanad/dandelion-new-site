# Google Ads Codex Integration

Status: AKTUALIS 2026-07-13

Cel: helyi Google Ads API kapcsolat a Dandelion workspace-ben, hogy kampanyok, teljesitmeny es konverzios muveletek lekerdezhetok legyenek.

Rovid tenyallas 2026-07-13:

- a helyi Ads API workflow mukodik,
- az elerheto customer lista visszaolvashato,
- a kampanylista visszaolvashato,
- a 30 napos kampanyteljesitmeny visszaolvashato,
- a conversion action lista visszaolvashato,
- a search terms riport visszaolvashato,
- a kulcsszo-szintu audit visszaolvashato,
- a `dnd_booking_click` Ads oldalon aktiv fo konverziokent latszik,
- a `dnd_booking_confirmation` Ads oldalon jelenleg hidden / nem primary jel.

## Mi keszult el

Uj helyi helper script:

- `scripts/google-ads-report.mjs`

Elso koros parancsok:

- `npm run ads:auth`
- `npm run ads:check`
- `npm run ads:customers`
- `npm run ads:campaigns`
- `npm run ads:performance`
- `npm run ads:conversions`
- `npm run ads:search-terms`
- `npm run ads:budgets`
- `npm run ads:ad-groups`
- `npm run ads:create-ad-group`
- `npm run ads:update-ad-groups`
- `npm run ads:rsa-ads`
- `npm run ads:create-rsa-ad`
- `npm run ads:update-rsa-ads`
- `npm run ads:targets`
- `npm run ads:lookup-locations`
- `npm run ads:lookup-languages`
- `npm run ads:add-location-targets`
- `npm run ads:remove-location-targets`
- `npm run ads:add-language-targets`
- `npm run ads:remove-language-targets`
- `npm run ads:update-geo-target-type`
- `npm run ads:export-campaign-state`
- `npm run ads:apply-campaign-change-set`
- `npm run ads:pause-campaigns`
- `npm run ads:enable-campaigns`
- `npm run ads:update-budgets`
- `npm run ads:keywords:audit`
- `npm run google-stack:healthcheck`
- `npm run google-stack:booking-chain`
- `npm run google-stack:weekly-report`
- `npm run google-stack:snapshot`

## Miert nem volt eddig

Az elozo allapotban a repo-ban:

- nem volt Google Ads developer token bekotes,
- nem volt Ads OAuth token workflow,
- nem volt Ads riport script,
- ezert a Google Ads oldal csak reszben volt auditálhato.

Most ez a hiany be van foltozva egy minimum, de mar hasznalhato API-workflow-val.

## Szükséges helyi beállítás

A `.env`-be kell:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
GOOGLE_ADS_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GOOGLE_ADS_OAUTH_TOKEN_JSON=.secrets/google-ads-oauth-token.json
```

Megjegyzes:

- a `GOOGLE_ADS_OAUTH_CLIENT_JSON` lehet ugyanaz a desktop OAuth kliensfajl, mint amit a GEO workflow hasznal,
- de kulon Ads tokenfajl javasolt.

## Szükséges Google oldali elemek

### 1. Developer token

Google Ads manager fiok -> API Center -> developer token.

Ez kotelezo minden Ads API hivasnal.

### 2. OAuth kliens

Google Cloud Console-ban kell egy OAuth desktop app kliens.

Scope:

- `https://www.googleapis.com/auth/adwords`

### 3. Hozzaferes a fiokhoz

Annak a Google felhasznalonak, amellyel az OAuth jovahagyas tortenik, latnia kell a megfelelo Google Ads fiokot.

Ha manager fiokon keresztul mentek, kellhet:

- `GOOGLE_ADS_LOGIN_CUSTOMER_ID`

## Elso hasznalat

### 1. Auth token letrehozasa

```bash
npm run ads:auth
```

Ez ad egy bejelentkezesi linket, majd letrehozza a helyi tokenfajlt.

### 2. Hozzaferes ellenorzese

```bash
npm run ads:check
```

Ez listazza az OAuth alapjan kozvetlenul lathato Ads fiokokat.

### 3. Kampanylista

```bash
npm run ads:campaigns -- --customer 1234567890 --login 9988776655
```

### 4. Teljesitmeny

```bash
npm run ads:performance -- --customer 1234567890 --login 9988776655 --days 30
```

### 5. Konverzios muveletek

```bash
npm run ads:conversions -- --customer 1234567890 --login 9988776655
```

## Mit tud a script

### `check-auth`

- OAuth token frissites
- developer token jelenlet ellenorzese
- elerheto fiokok listazasa

### `customers`

- kozvetlenul elerheto Ads fiokok listaja

### `campaigns`

- kampany ID
- kampanynev
- statusz

Megjegyzes:

- a jelenlegi script ebben a korben nem ad vissza csatornat vagy serving statust,
- ha ezek is kellenek, a GAQL lekerdezest boviteni kell.

### `performance`

Az utolso `N` nap kampanyszintu fo mutatoi:

- impressions
- clicks
- ctr
- average cpc
- cost
- conversions
- conversion value

### `conversions`

- conversion action lista
- statusz
- tipus
- kategori
- primary for goal
- benne van-e a conversions metricben

### `search-terms`

- keresesi kifejezes riport
- kampany es ad group bontas
- koltes, kattintas, megjelenes, CTR, atlag CPC
- konverzio es konverzios ertek
- opcionális szures `--campaign` vagy `--campaign-id` alapjan

### `pause-campaigns` es `enable-campaigns`

- kampanyszintu statuszmutacio
- mukodik `--campaign-id` vagy `--campaign` szurovel
- tamogatja a `--validate-only` modot
- kontrollalt, szukitett irasi felulet operativ beavatkozashoz

Peldak:

```bash
npm run ads:pause-campaigns -- --campaign-id 24021120680 --validate-only
npm run ads:enable-campaigns -- --campaign "Dandelion - Medencés szállás - HU" --validate-only
```

### `budgets`

- kampanyhoz kotott budget lista
- latszik a campaign budget ID, budget nev es aktualis osszeg
- szurheto `--campaign-id`, `--campaign` vagy `--campaign-budget-id` alapon

### `update-budgets`

- kampanybudget osszeg modositas
- mukodik `--campaign-budget-id` vagy kampanyszuro alapon
- tamogatja a `--amount` es `--amount-micros` formatumot
- tamogatja a `--validate-only` modot

Peldak:

```bash
npm run ads:budgets -- --campaign "Dandelion - Medencés szállás - HU"
npm run ads:update-budgets -- --campaign-budget-id 15617288769 --amount 3500 --validate-only
```

### `ad-groups`

- hirdetéscsoport lista kampanyon belul
- latszik az ad group ID, nev, statusz, tipus es CPC licit
- szurheto `--campaign-id`, `--campaign`, `--ad-group-id` vagy `--ad-group-name` alapon

### `create-ad-group`

- uj hirdetéscsoport letrehozasa egyetlen kampanyon belul
- kotelezo a celkampany es az `--ad-group-name`
- opcionális `--status`, `--type`, `--cpc-bid`, `--cpc-bid-micros`
- tamogatja a `--validate-only` modot

### `update-ad-groups`

- meglevo hirdetéscsoport frissitese
- tamogatott mezok:
  - uj nev
  - statusz
  - CPC licit
- tamogatja a `--validate-only` modot

Peldak:

```bash
npm run ads:ad-groups -- --campaign "Dandelion - Medencés szállás - HU"
npm run ads:create-ad-group -- --campaign "Dandelion - Medencés szállás - HU" --ad-group-name "Teszt csoport" --validate-only
npm run ads:update-ad-groups -- --ad-group-id 198423090433 --status PAUSED --validate-only
```

### `rsa-ads`

- responsive search hirdetes lista
- latszik a hirdetes ID, statusz, final URL, headline es description darabszam
- szurheto kampany, ad group vagy ad ID alapjan

### `create-rsa-ad`

- uj responsive search hirdetes letrehozasa egyetlen ad groupon belul
- kotelezo:
  - egyedi ad group cel
  - `--final-url`
  - legalabb 3 `--headline`
  - legalabb 2 `--description`
- opcionális:
  - `--path1`
  - `--path2`
  - `--status`
- tamogatja a `--validate-only` modot

### `update-rsa-ads`

- meglevo responsive search hirdetes frissitese
- tamogatott mezok:
  - statusz
  - final URL
  - path1 / path2
  - headline lista
  - description lista
- tartalmi frissites csak egyedi hirdetescelen engedelyezett
- tamogatja a `--validate-only` modot

Peldak:

```bash
npm run ads:rsa-ads -- --ad-group-id 195476876062
npm run ads:create-rsa-ad -- --ad-group-id 195476876062 --final-url https://dandelionhouse.hu/kisapati-medences-szallas/ --headline "Medencés szállás Kisapátiban" --headline "Panorama Pool élmény" --headline "Foglalj közvetlenül" --description "Panorámás medencés pihenés a Balaton-felvidéken." --description "Nézd meg a Dandelion medencés szállásait." --validate-only
npm run ads:update-rsa-ads -- --ad-group-id 195476876062 --ad-id 752236024922 --status PAUSED --validate-only
```

### `targets`

- kampanyszintu location / language criteria lista
- latszik a pozitiv es negativ geo target setting is

### `lookup-locations`

- geo target constant kereso
- mukodik `--location-name` vagy `--location-resource` alapon

### `lookup-languages`

- language constant kereso
- mukodik `--language-name`, `--language-code` vagy `--language-resource` alapon

### `add-location-targets` es `remove-location-targets`

- location target hozzaadasa vagy eltavolitasa egyedi kampanyon
- csak explicit `geoTargetConstants/...` eroforrasokkal dolgozik
- tamogatja a `--validate-only` modot

### `add-language-targets` es `remove-language-targets`

- language target hozzaadasa vagy eltavolitasa egyedi kampanyon
- csak explicit `languageConstants/...` eroforrasokkal dolgozik
- tamogatja a `--validate-only` modot

### `update-geo-target-type`

- kampanyszintu geo target behavior modositas
- tamogatott ertekek:
  - `PRESENCE`
  - `PRESENCE_OR_INTEREST`
  - `SEARCH_INTEREST`
- tamogatja a `--validate-only` modot

### `export-campaign-state`

- strukturalt JSON snapshot egy vagy tobb kampany kampanyszintu allapotarol
- tartalmazza:
  - statusz
  - budget
  - geo target setting
  - location/language criteria
  - ad groupok
  - RSA hirdetesek

### `apply-campaign-change-set`

- strukturalt JSON valtozaslista futtatasa
- jelenleg tamogatott muveletek:
  - kampany pause / enable
  - budget update
  - location target add / remove
  - language target add / remove
  - geo target type update
- tamogatja a `--validate-only` modot

Peldak:

```bash
npm run ads:targets -- --campaign "Dandelion - Medencés szállás - HU"
npm run ads:lookup-locations -- --location-name Budapest
npm run ads:lookup-languages -- --language-name Hungarian
npm run ads:add-location-targets -- --campaign "Dandelion - Medencés szállás - HU" --location-resource geoTargetConstants/1007633 --validate-only
npm run ads:update-geo-target-type -- --campaign "Dandelion - Medencés szállás - HU" --positive-geo-target-type PRESENCE_OR_INTEREST --validate-only
npm run ads:export-campaign-state -- --campaign "Dandelion - Medencés szállás - HU" --output tmp/campaign-state-medences.json
npm run ads:apply-campaign-change-set -- --input tmp/campaign-change-set-test.json --validate-only
```

### `keywords:audit`

- kulcsszo-szintu audit JSON kimenettel
- kampany, ad group, kulcsszo, match type, statusz
- impressions, clicks, CTR, atlag CPC, koltes
- konverziok, konverzios ertek
- kapcsolt search terms lista es kampanyszintu negativ kulcsszavak

## Biztonsag

- A `.secrets/` mappat tovabbra sem szabad commitolni.
- A developer tokent nem szabad dokumentumba vagy commitba masolni.
- Az OAuth tokenfajlt nem szabad commitolni.
- A `refresh_token` es `client_secret` nem kerulhet logba vagy megosztott jegyzetbe.

## Kovetkezo lepesek

Ha ez a minimum workflow mar mukodik, a kovetkezo bovitmenyek eri meg:

1. keresesi kifejezesek riport
2. kulcsszo mutációs terv vagy CSV export
3. asset / ad szintu riport
4. heti automatikus Ads + GA4 osszefoglalo

## Uj healthcheck reteg

2026-07-13-tol van kulon kozos Google stack ellenorzes is:

- `npm run google-stack:healthcheck`
- `npm run google-stack:booking-chain`
- `npm run google-stack:weekly-report`
- `npm run google-stack:snapshot`

Mit nez:

- Ads customer / campaign / conversion lathatosag
- GA4 Ads linkek es key eventek
- GTM account / container / workspace / tag / trigger lathatosag
- booking meresi lanc jelei frontend, GTM, GA4 es Ads oldalon
- heti, olvashato operations osszefoglalot
- szabvanyos JSON snapshotokat a kritikus feluletekrol

Ez nem valtoztat a fiókokon, csak auditjellegu ellenorzes.

## Keyword Planner allapot frissites

Fontos datumpontos megjegyzes:

- 2026-07-10-en a dokumentalt blokkolo ok meg `DEVELOPER_TOKEN_NOT_APPROVED` es Explorer access / 403 volt.
- 2026-07-13-an ujraellenorizve a Keyword Planner workflow mar `429 Resource has been exhausted` hibara futott.

Ez azt jelenti, hogy a Keyword Planner oldal jelenleg tovabbra sem tekintheto stabilan hasznalhatonak, csak a hiba jellege valtozott a korabbi dokumentalt allapothoz kepest.

## Jelenlegi korlatok

- A script mar ad kampany-, conversion-, search terms- es kulcsszo-szintu auditot is.
- A script nem bizonyitja onmagaban, hogy a GTM-ben pontosan milyen Google Ads tag vagy trigger dolgozik.
- A `dnd_booking_click` Ads oldali conversion action mar latszik, es a GA4 oldalon mar a booking click es a booking confirmation is visszaolvashato.
- A teljes booking-zaras technikai bizonyitasahoz viszont tovabbra is GTM vagy kulso booking oldali validalas kell.

## Google Ads conversion tag pontositas

- 2026-07-13-i ujraellenorzes alapjan a jelenlegi setupban nincs kulon, explicit `AW-` alapu GTM Ads conversion tag.
- Ettol meg a Google Ads konverzios meres mukodik, mert a bizonyitott lanc most:
  - GTM GA4 event tag
  - GA4 key event
  - GA4 <-> Google Ads link
  - Ads-ben lathato importalt conversion action
- Emiatt a healthcheck mar nem hibakent kezeli a kulon AW-tag hianyat, ha a teljes GA4 importos Ads-konverzios ut igazolt.

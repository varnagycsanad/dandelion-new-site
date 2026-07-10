# Google Ads Codex Integration

Status: AKTUALIS 2026-07-10

Cel: helyi Google Ads API kapcsolat a Dandelion workspace-ben, hogy kampanyok, teljesitmeny es konverzios muveletek lekerdezhetok legyenek.

Rovid tenyallas 2026-07-10:

- a helyi Ads API workflow mukodik,
- az elerheto customer lista visszaolvashato,
- a kampanylista visszaolvashato,
- a 30 napos kampanyteljesitmeny visszaolvashato,
- a conversion action lista visszaolvashato.

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

## Biztonsag

- A `.secrets/` mappat tovabbra sem szabad commitolni.
- A developer tokent nem szabad dokumentumba vagy commitba masolni.
- Az OAuth tokenfajlt nem szabad commitolni.
- A `refresh_token` es `client_secret` nem kerulhet logba vagy megosztott jegyzetbe.

## Kovetkezo lepesek

Ha ez a minimum workflow mar mukodik, a kovetkezo bovitmenyek eri meg:

1. keresesi kifejezesek riport
2. kulcsszo riport
3. asset / ad szintu riport
4. heti automatikus Ads + GA4 osszefoglalo

## Jelenlegi korlatok

- A script jelenleg kampanyszintu riportot ad, nem ad group, keyword vagy search terms szintet.
- A script nem bizonyitja onmagaban, hogy a GTM-ben pontosan milyen Google Ads tag vagy trigger dolgozik.
- A `dnd_booking_click` Ads oldali conversion action mar latszik, de a teljes booking-zaras ellenorzesehez tovabbi GA4/GTM validalas kell.

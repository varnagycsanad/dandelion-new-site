# GA4 adatok behuzasa Codexbe

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: GA4 riport script hasznalata es analytics workflow
Do not use for: aktualis GA4 credential/property allapot bizonyitasara

Ownership update 2026-07-25: this document is kept for historical platform context. Current GA4 reporting and admin ownership belongs to DMA. DWA only owns site-side implementation details, CTA surfaces, SEO/GEO source, schema and build evidence.

Do not treat this file as approval to perform platform writes from the DWA repo.


Cel: a Google Analytics 4 adatok helyi scriptbol legyenek lekerdezhetok, hogy Codex ugyanebben a munkaterben tudja elemezni oket.

## Beallitas service accounttal

1. Google Cloud projektben engedelyezd a Google Analytics Data API-t.
2. Hozz letre egy service accountot.
3. Toltsd le a service account JSON kulcsot.
4. A service account email cimet add hozza a GA4 propertyhez legalabb Viewer jogosultsaggal.
5. Keresd ki a GA4 Property ID-t. Ez a numerikus azonosito, nem a `G-...` measurement ID.
6. A service account JSON fajlt tedd egy nem commitolt helyre, peldaul:

```text
tmp/ga4-service-account.json
```

7. A `.env` fajlba add hozza:

```text
GA_PROPERTY_ID=123456789
GA_SERVICE_ACCOUNT_JSON=tmp/ga4-service-account.json
```

A `.env` fajl mar gitignore alatt van. A service account kulcsot nem szabad commitolni.

## Beallitas OAuth sajat Google-fiokkal

Ha a GA4 felulet nem engedi service account email hozzaadasat, hasznald ezt az utat.

1. Google Cloud Console -> APIs & Services -> OAuth consent screen.
2. Allitsd be az alkalmazast External modban, es add hozza sajat Google email cimedet test userkent.
3. APIs & Services -> Credentials -> Create credentials -> OAuth client ID.
4. Application type: Desktop app.
5. Toltsd le a JSON fajlt ide:

```text
tmp/ga4-oauth-client.json
```

6. A `.env` fajlba add hozza:

```text
GA_PROPERTY_ID=123456789
GA_OAUTH_CLIENT_JSON=tmp/ga4-oauth-client.json
```

7. Egyszer futtasd az OAuth belepest:

```powershell
node scripts/ga4-report.mjs auth
```

A script ad egy Google belepesi linket. Jelentkezz be azzal a Google fiokkal, amelyik latja a Dandelion GA4 propertyt. A jovahagyas utan letrejon:

```text
tmp/ga4-oauth-token.json
```

Ezt sem szabad commitolni.

## Hasznalat

```powershell
node scripts/ga4-report.mjs overview --days 30
node scripts/ga4-report.mjs pages --days 30 --limit 50
node scripts/ga4-report.mjs landing --days 90
node scripts/ga4-report.mjs sources --days 30
node scripts/ga4-report.mjs devices --days 30
node scripts/ga4-report.mjs countries --days 30
node scripts/ga4-report.mjs events --days 30
```

Kimeneti formatumok:

```powershell
node scripts/ga4-report.mjs pages --days 30 --format md
node scripts/ga4-report.mjs pages --days 30 --format csv
node scripts/ga4-report.mjs pages --days 30 --format json
```

Egyedi datumtartomany:

```powershell
node scripts/ga4-report.mjs sources --start 2026-05-01 --end 2026-05-24
```

## Mit erdemes Codextol kerni?

- Elemezd az elmult 30 nap forgalmat.
- Melyek a legerosebb landing page-ek?
- Melyik oldal kap sok megtekintest, de keves hasznos interakciot?
- Honnan jon a forgalom: organic, direct, referral, social?
- Milyen eszkozrol erkeznek a latogatok?
- Melyik szallasoldal teljesit a legjobban?

## Riportok

- `overview`: napi aktiv felhasznalok, sessionok, oldalmegtekintesek, esemenyek
- `pages`: top oldalak oldalmegtekintes szerint
- `landing`: top landing oldalak session szerint
- `sources`: forgalmi csatornak es source / medium
- `devices`: desktop / mobile / tablet bontas
- `countries`: orszag bontas
- `events`: top GA4 esemenyek

## Forrasok

- GA4 Data API: https://developers.google.com/analytics/devguides/reporting/data/v1
- Property ID: https://developers.google.com/analytics/devguides/reporting/data/v1/property-id
- Dimensions and metrics: https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema

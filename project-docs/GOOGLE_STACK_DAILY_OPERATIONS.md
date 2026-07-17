# Google Stack Daily Operations

Status: AKTUALIS
Last checked: 2026-07-13
Use for: napi Google Ads + GTM + GA4 uzemeltetesi parancsok, gyors ellenorzes, valtozaskezeles

## Cel

Ez a gyujtodoksi a napi hasznalathoz.

Nem auditosszefoglalo, hanem operativ cheat sheet:

- mit kell lefuttatni eloszor,
- milyen parancs mire valo,
- milyen sorrendben erdemes a Google stackben dolgozni,
- melyik parancs csak ellenoriz, es melyik tud modositani.

## Elso 5 parancs

```bash
npm run google-stack:healthcheck
npm run google-stack:booking-chain
npm run google-stack:weekly-report
npm run ads:campaigns
npm run ads:conversions
```

## Napi ellenorzes

### 1. Teljes stack allapot

```bash
npm run google-stack:healthcheck
```

Mit ad:

- Ads customer / campaign / conversion lathatosag
- GA4 Ads linkek es key eventek
- GTM account / container / workspace / tag / trigger lathatosag
- booking meresi lanc allapot

### 2. Booking meresi lanc

```bash
npm run google-stack:booking-chain
```

### 3. Heti jellegu vezetoi osszefoglalo

```bash
npm run google-stack:weekly-report
```

### 4. Standard JSON snapshot

```bash
npm run google-stack:snapshot -- --output-dir tmp/google-stack-snapshots
```

Ez a kovetkezo fajlokat irja ki:

- `healthcheck.json`
- `booking-chain.json`
- `ads-campaigns.json`
- `ads-performance-30d.json`
- `ads-conversions.json`

### 5. BigQuery export

Elso hasznalatkor:

```bash
npm run google-stack:bigquery:setup
```

Napi vagy heti export:

```bash
npm run google-stack:bigquery-export
```

Mit tol fel:

- heti operations riportot
- `healthcheck.json`
- `booking-chain.json`
- `ads-campaigns.json`
- `ads-performance-30d.json`
- `ads-conversions.json`

Mire jo:

- kulso, tartos riporttortenet
- SQL-bol visszakerdezheto snapshotok
- kesobbi dashboard vagy automatikus riport alap

## Kampanykezeles

### Olvasasi parancsok

```bash
npm run ads:campaigns
npm run ads:performance -- --days 30
npm run ads:search-terms -- --days 30
npm run ads:conversions
npm run ads:budgets
npm run ads:ad-groups
npm run ads:rsa-ads -- --ad-group-id 195476876062
```

### Biztonsagos mutaciok

Mindig `--validate-only` moddal erdemes kezdeni.

```bash
npm run ads:pause-campaigns -- --campaign-id 24021120680 --validate-only
npm run ads:enable-campaigns -- --campaign-id 24021120680 --validate-only
npm run ads:update-budgets -- --campaign-budget-id 15714355897 --amount 3500 --validate-only
npm run ads:update-ad-groups -- --ad-group-id 195476876062 --status PAUSED --validate-only
npm run ads:update-rsa-ads -- --ad-group-id 195476876062 --ad-id 816440687180 --status PAUSED --validate-only
```

## Location / language target kezeles

### Audit

```bash
npm run ads:targets -- --campaign "Dandelion - Medencés szállás - HU"
npm run ads:lookup-locations -- --location-name Budapest
npm run ads:lookup-languages -- --language-name Hungarian
```

### Modositas

```bash
npm run ads:add-location-targets -- --campaign "Dandelion - Medencés szállás - HU" --location-resource geoTargetConstants/1007633 --validate-only
npm run ads:remove-location-targets -- --campaign "Dandelion - Medencés szállás - HU" --location-resource geoTargetConstants/2348 --validate-only
npm run ads:add-language-targets -- --campaign "Dandelion - Medencés szállás - HU" --language-resource languageConstants/1024 --validate-only
npm run ads:remove-language-targets -- --campaign "Dandelion - Medencés szállás - HU" --language-resource languageConstants/1024 --validate-only
npm run ads:update-geo-target-type -- --campaign "Dandelion - Medencés szállás - HU" --positive-geo-target-type PRESENCE_OR_INTEREST --validate-only
```

## Strukturalt export / import

### Allapot export

```bash
npm run ads:export-campaign-state -- --campaign "Dandelion - Medencés szállás - HU" --output tmp/campaign-state-medences.json
```

### Valtozaslista alkalmazas

```bash
npm run ads:apply-campaign-change-set -- --input tmp/campaign-change-set-test.json --validate-only
```

Tamogatott muveletek:

- campaign pause / enable
- budget update
- location target add / remove
- language target add / remove
- geo target type update

## Konverzios meres helyes ertelmezese

2026-07-13-i ellenorzes alapjan:

- nincs kulon, explicit `AW-` GTM Ads conversion tag,
- de a konverzios meres mukodik a `GTM -> GA4 -> Ads import` lancban,
- ezt a healthcheck mar helyesen `ok` allapotnak tekinti.

## Ismert korlat

- A Keyword Planner tovabbra sem stabil napi workflow.
- 2026-07-13-an a jelenlegi blokkolo hiba: `429 Resource has been exhausted`.
- Emiatt a kulcsszokutatas tovabbra is korlatozottabb, mint a kampanyaudit es operativ kezeles.

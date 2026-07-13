# Google Stack API Setup

Status: AKTUALIS 2026-07-13

Cel: stabil, kulon kezelt Google API-hozzaferes a Dandelion workspace-ben, hogy a meres, SEO, Ads es tageles egyarant lekerdezheto legyen.

## Mi van mar kesz

### 1. GA4 Data API

Parancsok:

- `npm run ga4:auth`
- `npm run ga4:overview`
- `npm run ga4:pages`
- `npm run ga4:events`

Javasolt env:

```env
GA_PROPERTY_ID=383805366
GA_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GA_OAUTH_TOKEN_JSON=.secrets/ga4-oauth-token.json
GA_SERVICE_ACCOUNT_JSON=.secrets/dandelion-geo-service-account.json
```

Megjegyzes:

- a stabil napi hasznalathoz a `GA_OAUTH_*` par a fo ut,
- a service account csak fallback.

### 2. GA4 Admin API

Parancsok:

- `npm run ga4admin:auth`
- `npm run ga4admin:property`
- `npm run ga4admin:streams`
- `npm run ga4admin:key-events`
- `npm run ga4admin:dimensions`
- `npm run ga4admin:ads-links`

Javasolt env:

```env
GA_ADMIN_OAUTH_TOKEN_JSON=.secrets/ga4-admin-oauth-token.json
```

Megjegyzes:

- readonly audit celra a GA4 Data API token is hasznalhato, ha tartalmazza az `analytics.readonly` scope-ot.

### 3. Search Console API

Parancsok:

- `npm run geo:create-gsc-token`
- `npm run geo:fetch:gsc`

Javasolt env:

```env
GEO_GSC_SITE_URL=sc-domain:dandelionhouse.hu
GEO_GSC_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GEO_GSC_OAUTH_TOKEN_JSON=.secrets/dandelion-geo-gsc-token.json
```

### 4. Google Ads API

Parancsok:

- `npm run ads:auth`
- `npm run ads:check`
- `npm run ads:customers`
- `npm run ads:campaigns`
- `npm run ads:performance`
- `npm run ads:conversions`
- `npm run ads:search-terms`
- `npm run ads:keywords:audit`

Javasolt env:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
GOOGLE_ADS_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GOOGLE_ADS_OAUTH_TOKEN_JSON=.secrets/google-ads-oauth-token.json
```

### 5. Google Tag Manager API

Parancsok:

- `npm run gtm:auth`
- `npm run gtm:accounts`
- `npm run gtm:containers`
- `npm run gtm:workspaces`
- `npm run gtm:tags`
- `npm run gtm:triggers`
- `npm run gtm:variables`
- `npm run gtm:builtins`
- `npm run gtm:latest-version`

Javasolt env:

```env
GTM_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GTM_OAUTH_TOKEN_JSON=.secrets/gtm-oauth-token.json
GTM_ACCOUNT_ID=
GTM_CONTAINER_ID=
GTM_WORKSPACE_ID=
```

Megjegyzes:

- ehhez kulon `tagmanager.readonly` scope-os token kell.

## Mi hianyzik meg a teljes kephez

### P1

1. GTM OAuth token letrehozasa es elso eles lekerdezes
2. GA4 Admin API key event / ads link audit futtatasa
3. Google stack audit doksi osszefesulese a jelenlegi valos allapotra

### P2

1. GTM trigger-tag osszerendelesek celzott auditja `dnd_booking_click` es booking completion oldalra
2. kulcsszo-audit CSV/export es mutacios workflow bovites
3. booking completion meresi lanc vegigellenorzese
   - reszben igazolt 2026-07-13:
   - a site kuldi a `dnd_booking_click` esemenyt,
   - a booking linkek atviszik a `gclid` es UTM parametereket,
   - a GA4-ben latszik `dnd_booking_click` es `dnd_booking_confirmation`,
   - a GA4 property ossze van kotve a Google Ads fiokkal,
   - az Ads-ben a `dnd_booking_click` aktiv fo konverziokent latszik,
   - a `dnd_booking_confirmation` jelenleg csak hidden / masodlagos jel,
   - a pontos forrasoldali bekotes tovabbra sem latszik a repo-bol, ezert GTM vagy kulso booking oldali ellenorzes meg kell.

### P3

1. BigQuery export irany
2. automatikus heti riportok
3. egységes monitorozó script a teljes Google stackhez

## Javasolt hasznalati sorrend

1. GA4 Data API
2. GA4 Admin API
3. Search Console API
4. Google Ads API
5. Google Tag Manager API

Ez a sorrend adja a legjobb esellyel a teljes meresi lanc es a Google oldali allapot egyuttes atlatasat.

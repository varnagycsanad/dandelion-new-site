# DANDELION GEO API SETUP

Status: AKTUALIS
Last checked: 2026-06-04
Use for: GEO Search Console és GA4 OAuth, GA4 service account fallback és későbbi API-előkészítés biztonságos helyi beállítása.
Do not use for: Google Ads API használat, automatikus adatletöltő implementáció vagy secret fájlok commitolása.

## 1. Cél

Ez a dokumentum rögzíti a Dandelion GEO riport későbbi API-alapú adatgyűjtéséhez szükséges helyi hitelesítési döntéseket és fájlokat.

Ez nem teljes GEO fetcher implementáció. A cél most csak az auth-előkészítés és a biztonságos helyi ellenőrzés.

## 2. Google Cloud projekt

Használt Google Cloud projekt:

- `dandelion-ga4-codex`

Engedélyezett API-k:

- Google Analytics API
- Google Analytics Data API
- Google Search Console API
- Google Ads API
- Google Analytics Admin API

## 3. Search Console és GA4 OAuth döntés

A Search Console API-hoz és a GA4 Data API-hoz közös GEO OAuth tokent kell használni.

Döntés oka:

- a Search Console UI nem fogadta el a service account e-mail címet felhasználóként,
- ezért a Search Console hozzáféréshez olyan Google felhasználói OAuth jóváhagyás kell, amely látja a `dandelionhouse.hu` Search Console propertyt.
- a GA4 service account hozzáadása a GA4 UI-ban szintén nem működött, ezért a GA4 Data API teszt is OAuth-first működésre állt át.

Kötelező GEO OAuth scope-ok:

- `https://www.googleapis.com/auth/webmasters.readonly`
- `https://www.googleapis.com/auth/analytics.readonly`

Nem kérünk írási Search Console scope-ot, teljes Analytics scope-ot vagy Ads scope-ot a kombinált GEO tokenkészítő scriptben.

## 4. GA4 hitelesítési döntés

GA4 Data API-hoz elsődlegesen a kombinált GEO OAuth token használata javasolt.

A service account fájl megmarad helyi fallbackként / későbbi lehetőségként, de nem elsődleges GA4 auth mód.

Kötelező GA4 property:

- `383805366`

GA4 service account helyi fájl:

- `.secrets/dandelion-geo-service-account.json`

## 5. Kötelező helyi fájlok

A helyi GEO API előkészítéshez ezek a fájlok szükségesek:

- `.secrets/dandelion-geo-service-account.json`
- `.secrets/dandelion-geo-oauth-client.json`
- `.secrets/dandelion-geo-token.json`
- `.secrets/dandelion-geo-gsc-token.json`

Ezek közül a service account és OAuth client fájlokat kézzel kell letölteni / elhelyezni. A kombinált GEO OAuth token fájlt a helyi OAuth tokenkészítő script hozza létre.

A `.secrets/dandelion-geo-gsc-token.json` régi Search Console-only tokenként megmaradhat kompatibilitási tartaléknak.

## 6. Környezeti változók

Ajánlott `.env` beállítás:

```env
GEO_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GEO_OAUTH_TOKEN_JSON=.secrets/dandelion-geo-token.json
GEO_GSC_SITE_URL=sc-domain:dandelionhouse.hu
GEO_GSC_OAUTH_CLIENT_JSON=.secrets/dandelion-geo-oauth-client.json
GEO_GSC_OAUTH_TOKEN_JSON=.secrets/dandelion-geo-gsc-token.json
GOOGLE_APPLICATION_CREDENTIALS=.secrets/dandelion-geo-service-account.json
GA4_PROPERTY_ID=383805366
```

## 7. Biztonsági szabályok

- A `.secrets/` mappát soha nem szabad commitolni.
- OAuth token fájlokat soha nem szabad commitolni.
- Service account JSON fájlokat soha nem szabad commitolni.
- `client_secret` értéket nem szabad dokumentációba, logba vagy riportba másolni.
- `refresh_token` és `access_token` értékeket nem szabad dokumentációba, logba vagy riportba másolni.

## 8. Google Ads

A Google Ads API engedélyezve van, de a GEO projektben szándékosan későbbi fázisra van halasztva.

Most nem készül Ads API hívás, Ads OAuth token vagy Ads fetcher.

## 9. Helyi ellenőrzés

Auth környezet ellenőrzése:

```bash
npm run geo:check-auth
```

Kombinált Search Console + GA4 OAuth token létrehozása csak akkor induljon, ha a `.env` tartalmazza a GEO változókat és a `.secrets/dandelion-geo-oauth-client.json` már létezik:

```bash
npm run geo:create-token
```

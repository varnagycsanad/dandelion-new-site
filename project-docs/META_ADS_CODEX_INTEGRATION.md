# Meta Ads Codex integracio

Status: AKTUALIS
Last checked: 2026-06-13
Use for: Meta Marketing API bekotese Codex ellenorzeshez es kesobbi kontrollalt kampanyelokesziteshez

Cel: Codex helyi scriptbol tudja ellenorizni a Dandelion Meta/Facebook hirdetesi fiokot, kampanylistat kerjen le, es kesobb kulon jovahagyott sablonbol PAUSED kampanyt hozzon letre.

Fontos jelenlegi allapot: Facebook/Meta hirdetesek meg nincsenek aktivan inditva a Dandelion uj kampanyaihoz, ezert ez a dokumentum nem heti riportolasi workflow. A riportolasi menetet csak akkor kell boviteni, ha mar futnak Meta kampanyok es van ertelmezheto koltes/teljesitmenyadat.

## Mi keszult

- `scripts/meta/meta-ads.mjs`
- npm parancsok:
  - `npm run meta:check`
  - `npm run meta:accounts`
  - `npm run meta:campaigns`
  - `npm run meta:insights`

Az integracio kozvetlenul a Meta Marketing API-t hivja. A Graph API verzio env-bol allithato, alapertelmezetten `v25.0`.

## 2026-06-13 bekotesi teszt

Eredmeny:

- Meta access token mukodik.
- Lathato hirdetesi fiokok:
  - `act_2013849525415667` - Ilona Varnagy
  - `act_169467498360546` - Dandelion Vendeghaz
- A Dandelionhoz javasolt alapertelmezett fiok: `act_169467498360546`.
- A kampanylista lekerheto.
- Az elmult 30 napra nincs insight sor, tehat jelenleg nincs friss riportolando Meta hirdetesi teljesitmeny.

Kovetkeztetes: az API kapcsolat elokeszitve, de kampanyinditas meg nem tortent. A kovetkezo szakmai lepes nem riportolas, hanem elso Facebook kampanyterv, kreativok, celzas es csak utana PAUSED kampany letrehozasa emberi ellenorzesre.

## Szükséges Meta oldali beallitas

1. Meta for Developers alatt hozz letre vagy valassz ki egy appot.
2. Add hozza a Marketing API productot.
3. Business Managerben legyen hozzaferesed a Dandelion hirdetesi fiokhoz.
4. Generalj access tokent legalabb ezekkel a scope-okkal:
   - `ads_read`
   - `read_insights`
   - `ads_management` csak akkor, ha Codex kampanyt is letrehozhat vagy modosithet
   - `business_management` ha a Business Manager asset hozzaferes miatt szukseges
5. Keresd ki az Ad Account ID-t Ads Managerbol. Elfogadott forma: `1234567890` vagy `act_1234567890`.

## .env beallitas

```text
META_GRAPH_VERSION=v25.0
META_ACCESS_TOKEN=...
META_AD_ACCOUNT_ID=act_169467498360546
META_SPECIAL_AD_CATEGORIES=[]
```

A `.env` nincs commitolva. Tokent nem szabad dokumentumba vagy gitbe tenni.

## Hasznalat

Auth es lathato hirdetesi fiokok ellenorzese:

```powershell
npm run meta:check
```

Ad account lista:

```powershell
npm run meta:accounts
```

Kampanylista:

```powershell
npm run meta:campaigns -- --limit 100
```

Kampanyszintu insightok az elmult 30 napra:

```powershell
npm run meta:insights -- --days 30
```

Ad set vagy ad szintu bontas:

```powershell
node scripts/meta/meta-ads.mjs insights --level adset --days 14
node scripts/meta/meta-ads.mjs insights --level ad --days 14 --format csv
```

Egyedi datumtartomany:

```powershell
node scripts/meta/meta-ads.mjs insights --start 2026-06-01 --end 2026-06-13
```

## Kampany letrehozasa

Alapbol csak dry-run:

```powershell
node scripts/meta/meta-ads.mjs create-campaign --name "Dandelion teszt kampany" --objective OUTCOME_LEADS
```

Eles letrehozas csak kulon kapcsoloval tortenik, es a kampany `PAUSED` allapotban jon letre:

```powershell
node scripts/meta/meta-ads.mjs create-campaign --name "Dandelion teszt kampany" --objective OUTCOME_LEADS --execute
```

## Kovetkezo biztonsagos lepesek

1. Eloszor csak `meta:check`, `meta:accounts`, `meta:campaigns`, `meta:insights`.
2. Elso Facebook kampany elott keszuljon kampanyterv: cel, kozonseg, budget, kreativ, landing.
3. Teljes kampanyinditas elott legyen kulon JSON sablon kampany/adset/ad szerkezettel.
4. Uj hirdetes letrehozasa csak `PAUSED` allapotban tortenjen, Ads Managerben emberi ellenorzessel.
5. Meta Ads riportolasi mezoket csak akkor kell dokumentalni, ha mar fut kampany es van adat.

## Forrasok

- Meta Marketing API: https://developers.facebook.com/documentation/ads-commerce/marketing-api
- Meta Ads Insights API: https://developers.facebook.com/documentation/ads-commerce/marketing-api/insights
- Meta Graph API changelog: https://developers.facebook.com/docs/graph-api/changelog/

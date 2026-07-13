# Meta Ads Codex integracio

Status: AKTUALIS
Last checked: 2026-07-13
Use for: Meta Marketing API bekotese Codex ellenorzeshez, kontrollalt mutacios workflow-hoz, valamint Pixel es GTM allapot validalasahoz

Cel: Codex helyi scriptbol tudja ellenorizni a Dandelion Meta/Facebook hirdetesi fiokot, kampany/ad set/ad/creative adatokat lekerdezni, kontrollalt dry-run muveleteket elokesziteni, es a Pixel/GTM oldali allapotot is ellenorizni.

Fontos jelenlegi allapot: a Meta API kapcsolat mukodik, a Dandelion hirdetesi fiok elerheto, a kampany/ad set/ad/creative lekerdezes megy, a Pixel/GTM audit script elkeszult, a hianyzo `meta_*` GTM tag-ek felmentek, es a valtozas eles GTM verzio `9`-kent publikalt allapotban van. A fo nyitott pont mar nem a bekotes, hanem legfeljebb egy kulon elo, bongeszos smoke teszt es a teljes creative/media workflow tovabbi bovitese.

## Mi keszult

- `scripts/meta/meta-ads.mjs`
- `scripts/meta/meta-validate-pixel.mjs`
- `scripts/meta/gtm-meta-events.mjs`
- `scripts/meta/meta-auth.mjs`
- `scripts/meta/meta-pages.mjs`
- npm parancsok:
  - `npm run meta:check`
  - `npm run meta:permissions`
  - `npm run meta:accounts`
  - `npm run meta:campaigns`
  - `npm run meta:adsets`
  - `npm run meta:ads`
  - `npm run meta:creatives`
  - `npm run meta:insights`
  - `npm run meta:create-campaign`
  - `npm run meta:create-creative`
  - `npm run meta:create-adset`
  - `npm run meta:create-ad`
  - `npm run meta:pause-campaigns`
  - `npm run meta:enable-campaigns`
  - `npm run meta:pause-adsets`
  - `npm run meta:enable-adsets`
  - `npm run meta:pause-ads`
  - `npm run meta:enable-ads`
  - `npm run meta:update-budgets`
  - `npm run meta:validate-pixel`
  - `npm run meta:gtm-events`
  - `npm run meta:auth:url`
  - `npm run meta:auth:exchange`
  - `npm run meta:auth:extend`
  - `npm run meta:auth:inspect`
  - `npm run meta:auth:save-token`
  - `npm run meta:pages:check`
  - `npm run meta:pages:permissions`
  - `npm run meta:pages:list`
  - `npm run meta:pages:create-post`

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

## 2026-07-13 allapotfrissites

Eredmeny:

- `npm run meta:check` sikeres.
- `npm run meta:permissions` sikeres.
- A token felhasznaloja: `Ilona Várnagy`.
- Tovabbra is latszik a `Dandelion Vendégház` hirdetesi fiok: `act_169467498360546`.
- Legalabb ezek a fo jogosultsagok granted allapotban latszanak:
  - `ads_management`
  - `ads_read`
  - `business_management`
- A projekt `.env` allomanya erre a fiokra mutat:
  - `META_AD_ACCOUNT_ID=act_169467498360546`
- `npm run meta:campaigns -- --limit 10` sikeres.
- `npm run meta:adsets -- --limit 10` sikeres.
- `npm run meta:ads -- --limit 10` sikeres.
- `npm run meta:creatives -- --limit 10` sikeres.
- creative create dry-run mukodik:
  - `npm run meta:create-creative -- --name "D2_LastMinute_Creative_Test" --from-creative-id 23850220292700627 --link "https://dandelionhouse.hu/last-minute-d2/?utm_source=meta&utm_medium=cpc&utm_campaign=d2_last_minute" --headline "D2 last minute" --message "10% kedvezmeny legalabb 4 ejszakara." --description "D2 ajanlat"`
- kampany statusz dry-run update mukodik:
  - `npm run meta:pause-campaigns -- --campaign-id 120253622390020628`
- ad set statusz dry-run update mukodik:
  - `npm run meta:pause-adsets -- --adset-id 120253622472610628`
  - `npm run meta:enable-adsets -- --adset-id 120253622472610628`
- ad statusz dry-run update mukodik:
  - `npm run meta:pause-ads -- --ad-id 23852933811260627`
  - `npm run meta:enable-ads -- --ad-id 23852933811260627`
- ad set budget dry-run update mukodik:
  - `npm run meta:update-budgets -- --adset-id 120253622472610628 --daily-budget 55`
- sablonalapu ad set create dry-run mukodik:
  - `npm run meta:create-adset -- --campaign-id 120253622390020628 --name "D2_LastMinute_AdSet_HU_TestClone" --from-adset-id 120253622472610628 --daily-budget 60`
- sablonalapu ad create dry-run mukodik:
  - `npm run meta:create-ad -- --adset-id 120253622472610628 --name "D2_LastMinute_Ad_HU_TestClone" --from-ad-id 23852933811260627`
- Aktiv kampany latszik:
  - `D2_LastMinute_2026-07-19`

Weboldal oldali allapot:

- A cookie hozzajarulas kezelesben mar szerepel a `Meta Pixel`.
- A consent bridge kezeli a marketing hozzajarulast.
- A site GTM-kompatibilis Meta esemenyeket keszit elo:
  - `ViewContent`
  - `BookingClick`
  - `InitiateCheckout`
  - `Contact`
  - `Lead`
- GTM account: `6353760449`
- GTM container: `251570065`
- GTM public ID: `GTM-P75FHKLJ`
- Meta Pixel ID: `489282852211205`
- latszik a Facebook-oldal:
  - `Dandelion Vendégház`
  - page ID: `100105918439273`
- a `meta-pages` script dry-run workflowban tud oldalas, kepes posztot elokesziteni
- a `/me/accounts` valasz page tokent ad az oldalhoz
- a jelenlegi Pages API jogosultsagoknal latszik:
  - `pages_show_list`
  - `pages_read_engagement`
- a Meta appban a `Manage Pages` use case mar aktiv
- a `pages_manage_posts` Meta oldalon mar `Ready for testing`
- a jelenlegi tokenben viszont meg nem latszik:
  - `pages_manage_posts`
- `npm run meta:gtm-events -- --execute --format json` sikeresen letrehozta a hianyzo egyedi trigger + Meta tag parokat a repo altal kibocsatott `meta_*` esemenyekhez.
- A GTM valtozas `Codex Meta Pixel event scaffolding 2026-07-13` nevvel `9`-es verziokent publikalt allapotba kerult.
- `npm run meta:validate-pixel -- --format json` alapjan:
  - a Pixel a Meta Business assetek kozott latszik
  - a base tag pixelazonositoja `489282852211205`
  - a base tag trigger esemenye `dnd_marketing_granted`
  - az osszes repo-s `meta_*` esemenyhez van megfelelo GTM Meta tag lefedettseg
  - a Pixel utolso bejovo aktivitasa: `2026-07-12T23:12:23+0200`

Friss kovetkeztetes: a Meta oldali jogosultsag, az API kapcsolat, a kodoldali meresi elokeszites, a GTM tag-kiosztas, a Pixel-azonositas es a Facebook-oldal posztolasi workflow alapja is rendben van. A fo nyitott pont mar az, hogy a friss tokenben is tenylegesen megjelenjen a `pages_manage_posts`, illetve legfeljebb egy kulon elo, bongeszos smoke teszt.

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
META_APP_ID=2809171169448612
META_APP_SECRET=...
META_REDIRECT_URI=...
META_ACCESS_TOKEN=...
META_AD_ACCOUNT_ID=act_169467498360546
META_PAGE_ID=100105918439273
META_SPECIAL_AD_CATEGORIES=[]
```

A `.env` nincs commitolva. Tokent nem szabad dokumentumba vagy gitbe tenni.

## Hasznalat

Auth es lathato hirdetesi fiokok ellenorzese:

```powershell
npm run meta:check
```

Jogosultsagok ellenorzese:

```powershell
npm run meta:permissions
```

Meta token auth URL generalasa:

```powershell
npm run meta:auth:url
```

Meta token ellenorzese:

```powershell
npm run meta:auth:inspect
```

Ad account lista:

```powershell
npm run meta:accounts
```

Kampanylista:

```powershell
npm run meta:campaigns -- --limit 100
```

Ad set lista:

```powershell
npm run meta:adsets -- --limit 100
```

Ad lista:

```powershell
npm run meta:ads -- --limit 100
```

Creative lista:

```powershell
npm run meta:creatives -- --limit 100
```

Creative letrehozas meglevo creative sablon alapjan:

```powershell
npm run meta:create-creative -- --name "Uj creative" --from-creative-id 23850220292700627 --link "https://dandelionhouse.hu/last-minute-d2/" --headline "D2 last minute" --message "10% kedvezmeny legalabb 4 ejszakara."
```

Ad set letrehozas sablon alapjan:

```powershell
npm run meta:create-adset -- --campaign-id 120253622390020628 --name "Uj ad set" --from-adset-id 120253622472610628 --daily-budget 60
```

Ad letrehozas meglevo creative ujrafelhasznalasaval:

```powershell
npm run meta:create-ad -- --adset-id 120253622472610628 --name "Uj hirdetes" --from-ad-id 23852933811260627
```

Ad set es ad statusz ellenorzott dry-run workflow:

```powershell
npm run meta:pause-adsets -- --adset-id 120253622472610628
npm run meta:enable-adsets -- --adset-id 120253622472610628
npm run meta:pause-ads -- --ad-id 23852933811260627
npm run meta:enable-ads -- --ad-id 23852933811260627
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

Kampany statusz modositas alapbol csak dry-run:

```powershell
npm run meta:pause-campaigns -- --campaign-id 120253622390020628
npm run meta:enable-campaigns -- --campaign-id 120253622390020628
```

Ad set budget modositas alapbol csak dry-run:

```powershell
npm run meta:update-budgets -- --adset-id 120253622472610628 --daily-budget 55
```

Pixel es GTM validacio:

```powershell
npm run meta:validate-pixel -- --format md
npm run meta:gtm-events -- --format md
```

## Kovetkezo biztonsagos lepesek

1. Eloszor csak `meta:check`, `meta:accounts`, `meta:campaigns`, `meta:insights`.
2. Elso Facebook kampany elott keszuljon kampanyterv: cel, kozonseg, budget, kreativ, landing.
3. Teljes kampanyinditas elott legyen kulon JSON sablon kampany/adset/ad szerkezettel.
4. Uj hirdetes letrehozasa csak `PAUSED` allapotban tortenjen, Ads Managerben emberi ellenorzessel.
5. Ha kell teljes vegponttol vegpontig bizonyossag, fusson egy kulon bongeszos smoke teszt, ahol hozzajarulas utan valodi oldallatogatasbol is visszaellenorizzuk a Pixel-esemenyeket.

## Forrasok

- Meta Marketing API: https://developers.facebook.com/documentation/ads-commerce/marketing-api
- Meta Ads Insights API: https://developers.facebook.com/documentation/ads-commerce/marketing-api/insights
- Meta Graph API changelog: https://developers.facebook.com/docs/graph-api/changelog/

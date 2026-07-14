# Meta Codex kezelhetosegi audit - 2026-07-13

Status: AKTUALIS
Last checked: 2026-07-13
Use for: annak gyors megitelese, hogy a Meta kapcsolat milyen allapotban van, es mi kell meg ahhoz, hogy a Codex tenylegesen kezelni tudja a Meta hirdeteseket

## Vezetoi osszefoglalo

A Meta kapcsolat technikailag mukodik, es a Codex mar most is kepes:

- hitelesitest ellenorizni
- a fo jogosultsagokat kilistazni
- lathato hirdetesi fiokokat lekerdezni
- kampanylistat lekerdezni
- ad set listat lekerdezni
- ad listat lekerdezni
- creative listat lekerdezni
- insightokat lekerdezni
- lathato Facebook-oldalakat lekerdezni
- uj kampany letrehozasat dry-run modban elokesziteni
- uj creative letrehozasat dry-run modban elokesziteni sabloncreative alapjan
- uj ad set letrehozasat dry-run modban elokesziteni sablonalapu klonozassal
- uj ad letrehozasat dry-run modban elokesziteni creative-ujrafelhasznalassal
- kampany, ad set es ad statuszmodositast dry-run modban elokesziteni
- ad set budget modositast dry-run modban elokesziteni
- a Pixel tulajdonjogat es GTM base tag allapotat validalni
- a repo altal kibocsatott `meta_*` esemenyekhez hianyzo GTM Meta tag-eket automatikusan letrehozni
- kepes Facebook-oldal posztot dry-run modban elokesziteni
- uj kampanyt API-val `PAUSED` allapotban letrehozni, ha a tokennek van megfelelo joga es az `--execute` kapcsolot tenylegesen hasznaljuk

Ugyanakkor a Codex jelen allapotban meg nem tekintheto teljes Meta hirdeteskezelo rendszernek. A legfontosabb hianyok:

- nincs teljes ad set mutacios kezeles tetszoleges mezoszerkesztessel
- nincs teljesen nullarol induló media/upload workflow
- nincs teljes kampanymodositas
- nincs Pixel / Events Manager oldali API-integracio
- nincs megerositett eles Facebook Page post publish a jelenlegi tokennel
- nincs token-eletciklus automatizalva
- ebben a korben nem futott vegig kulon bongeszos, valos user-journey smoke teszt

Kovetkeztetes: a Codex jelenleg eros read/write-elokeszito + meresvalidacios allapotban van. Operativ napi Meta hirdeteskezeleshez mar csak nehany magasabb szintu workflow-bovites es optionalis elo smoke teszt hianyzik.

## Tenyalapu audit eredmeny

### 1. Meta API kapcsolat

Ellenorzott:

- `npm run meta:check`
- `npm run meta:permissions`
- `npm run meta:accounts`
- `npm run meta:campaigns -- --limit 10`
- `npm run meta:adsets -- --limit 10`
- `npm run meta:ads -- --limit 10`
- `npm run meta:creatives -- --limit 10`
- `npm run meta:insights -- --days 30 --limit 10`
- `node scripts/meta/meta-ads.mjs create-campaign --name "Codex audit dry run" --objective OUTCOME_LEADS`
- `node scripts/meta/meta-ads.mjs create-creative --name "D2_LastMinute_Creative_Test" --from-creative-id 23850220292700627 --link "https://dandelionhouse.hu/last-minute-d2/?utm_source=meta&utm_medium=cpc&utm_campaign=d2_last_minute" --headline "D2 last minute" --message "10% kedvezmeny legalabb 4 ejszakara." --description "D2 ajanlat"`
- `node scripts/meta/meta-ads.mjs pause-campaigns --campaign-id 120253622390020628`
- `node scripts/meta/meta-ads.mjs pause-adsets --adset-id 120253622472610628`
- `node scripts/meta/meta-ads.mjs enable-adsets --adset-id 120253622472610628`
- `node scripts/meta/meta-ads.mjs pause-ads --ad-id 23852933811260627`
- `node scripts/meta/meta-ads.mjs enable-ads --ad-id 23852933811260627`
- `node scripts/meta/meta-ads.mjs update-budgets --adset-id 120253622472610628 --daily-budget 55`
- `node scripts/meta/meta-ads.mjs create-adset --campaign-id 120253622390020628 --name "D2_LastMinute_AdSet_HU_TestClone" --from-adset-id 120253622472610628 --daily-budget 60`
- `node scripts/meta/meta-ads.mjs create-ad --adset-id 120253622472610628 --name "D2_LastMinute_Ad_HU_TestClone" --from-ad-id 23852933811260627`
- `npm run meta:validate-pixel -- --format json`
- `npm run meta:gtm-events -- --execute --format json`
- `npm run meta:pages:list -- --format json`
- `npm run meta:pages:create-post -- --message "..." --photo "<kep1>" --photo "<kep2>" --format json`

Eredmeny:

- a token mukodik
- a token felhasznaloja: `Ilona Várnagy`
- a fo jogosultsagok kozul legalabb ezek granted allapotban latszanak:
  - `ads_management`
  - `ads_read`
  - `business_management`
- a projekt a `Dandelion Vendégház` hirdetesi fiokra van allitva:
  - `META_AD_ACCOUNT_ID=act_169467498360546`
- a kampanylista lekerdezheto
- az ad set lista is lekerdezheto
- az ad lista is lekerdezheto
- a creative lista is lekerdezheto
- aktiv kampany latszik:
  - `D2_LastMinute_2026-07-19`
- a 30 napos insight lekerdezes technikailag sikeres volt, de `No rows` eredmenyt adott
- a kampany-letrehozasi dry-run mukodik es helyesen `PAUSED` kampany payloadot general
- a kampany-statusz update dry-run is mukodik
- az ad set statusz update dry-run is mukodik
- az ad statusz update dry-run is mukodik
- az ad set budget update dry-run mukodik
- a sablonalapu creative letrehozas dry-run mukodik
- a sablonalapu ad set letrehozas dry-run mukodik
- a sablonalapu ad letrehozas dry-run mukodik
- a GTM account azonosithato:
  - `6353760449`
- a GTM container azonosithato:
  - `251570065`
- a GTM public ID:
  - `GTM-P75FHKLJ`
- a lathato Facebook-oldal:
  - `Dandelion Vendégház`
  - `100105918439273`
- a hasznalt Meta Pixel:
  - `489282852211205`
- a Pixel a Business assetek kozott latszik
- a base tag trigger esemenye:
  - `dnd_marketing_granted`
- a repo altal kibocsatott 5 `meta_*` esemeny mindegyikehez van GTM Meta tag lefedettseg
- a hianyzo GTM trigger/tag scaffold sikeresen letrejott es publikalva lett
- az eles GTM verzio:
  - `9`
- a Pixel utolso aktivitasa:
  - `2026-07-12T23:12:23+0200`
- a Page token feloldhato a `me/accounts` valaszbol
- a kepes Facebook-oldal poszt dry-run workflow mukodik
- a Meta apphoz a `Manage Pages` use case hozza lett adva
- a `pages_manage_posts` statusza a Meta fejlesztoi feluleten mar `Ready for testing`
- a Facebook Login for Business jovahagyo flow vegigfutott
- a hozzaferes a jelenlegi es jovobeli `Oldalak` es `Vallalkozasok` objektumokra lett megadva
- a projekt .env-beli tokenjere nezve mar latszik `pages_manage_posts`

### 2. Kodoldali kepessegek

Jelenlegi Meta script:

- fajl: `scripts/meta/meta-ads.mjs`
- tamogatott muveletek:
  - `check-auth`
  - `permissions`
  - `accounts`
  - `campaigns`
  - `adsets`
  - `ads`
  - `creatives`
  - `insights`
  - `create-campaign`
  - `create-creative`
  - `create-adset`
  - `create-ad`
  - `pause-campaigns`
  - `enable-campaigns`
  - `pause-adsets`
  - `enable-adsets`
  - `pause-ads`
  - `enable-ads`
  - `update-budgets`

Kornyezeti valtozok:

- `META_GRAPH_VERSION`
- `META_APP_ID`
- `META_APP_SECRET`
- `META_REDIRECT_URI`
- `META_ACCESS_TOKEN`
- `META_AD_ACCOUNT_ID`
- `META_SPECIAL_AD_CATEGORIES`
- `META_PAGE_ID`

NPM shortcutok jelenleg:

- van:
  - `meta:check`
  - `meta:permissions`
  - `meta:accounts`
  - `meta:campaigns`
  - `meta:insights`
  - `meta:adsets`
  - `meta:ads`
  - `meta:creatives`
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
- nincs:
  - teljes nullarol induló media/upload workflow

Ez fontos kulonbseg a Google Ads toolinghoz kepest, ahol mar vannak kulon mutacios shortcutok is.

### 3. Weboldal oldali meresi elokeszites

Mar megvan:

- consent kezelesben szerepel a `Meta Pixel`
- a marketing hozzajarulas atmegy a consent bridge-en
- a site GTM-kompatibilis Meta esemenyeket allit elo

Jelenlegi Meta-kompatibilis esemenyek:

- `meta_view_content`
- `meta_booking_click`
- `meta_initiate_checkout`
- `meta_contact`
- `meta_lead`

Ez jo alap a mereshez, es a korabbi reskockazatot most mar jelentos reszben lefedi a GTM + Pixel validacios tooling: a GTM base tag, a Pixel-azonosito, a repo-esemenyek lefedettsege es a Business asset ownership mind ellenorizheto.

## Mire kepes most a Codex a Meta hirdetesekkel

### Biztonsagosan kepes

- ellenorizni, hogy a token el-e
- ellenorizni, melyik hirdetesi fiokok latszanak
- listazni kampanyokat
- listazni ad seteket
- listazni adokat
- listazni creativeokat
- riport-jellegu insight lekerdezest futtatni
- uj kampany payloadot dry-run modban elokesziteni
- uj creative payloadot dry-run modban elokesziteni egy meglevo creative sablonjabol
- uj ad set payloadot dry-run modban elokesziteni egy meglevo ad set sablonjabol
- uj ad payloadot dry-run modban elokesziteni egy meglevo ad creative-jabol
- kampany statuszvaltoztatas dry-run ellenorzeset elokesziteni
- ad set statuszvaltoztatas dry-run ellenorzeset elokesziteni
- ad statuszvaltoztatas dry-run ellenorzeset elokesziteni
- ad set budget valtoztatas dry-run ellenorzeset elokesziteni
- a fo Meta jogosultsagokat kilistazni
- a Pixel es GTM kapcsolati allapotat validalni
- a repo-esemenyekhez hianyzo GTM Meta trigger/tag scaffoldot elokesziteni vagy letrehozni
- lathato Facebook-oldalakat es page token jelenletet ellenorizni
- kepes Facebook-oldal posztot dry-run modban elokesziteni egy vagy tobb keppel
- uj kampanyt `PAUSED` allapotban letrehozni, ha ezt kulon kerjuk

### Korlatozottan kepes

- kampanyletrehozasra mar van alap, de nincs teljes workflow korulotte
- ad set letrehozasra mar van sablonalapu alap, de nincs teljes audience / placement / creative workflow
- ad letrehozasra mar van creative-ujrafelhasznalasi alap
- creative letrehozasra mar van sablonalapu alap, de nincs teljes media-upload workflow
- Facebook Page posztolashoz mar van workflow, a `pages_manage_posts` app oldalon es a jelenlegi tokenben is rendben van, de az elso eles kozzetetel meg nem bizonyitott

### Nem kepes jelenleg

- meglevo kampanyok szeles koru szerkesztesere
- budget modositasa kampanyszinten
- ad set modositasara teljes koruen
- media vagy copy feltoltesere teljes workflowban nullarol indulva
- Pixel, domain verification vagy Events Manager konfiguracio API-s kezelesere
- biztos, eles Facebook Page post publishra a jelenlegi tokennel
- Instagram account / Page / Pixel / ad account asset-kapcsolatok auditjara scriptelt formaban
- teljesen automatikus token-frissitesre vagy expiralas-kezelesre

## Mi kell meg ahhoz, hogy a Codex tenylegesen kezelni tudja a Meta hirdeteseket

### A. Minimum a kontrollalt kampanykezeleshez

1. Reszletesebb kampanylista
   - objective
   - status
   - effective_status
   - spend
   - utolso activity / updated_time mar most reszben van, de operativ nezet kellene

### B. Minimum a tenyleges hirdetesepiteshez

1. Ad set kezeles
   - audience
   - geo
   - age
   - placements
   - optimization goal
   - conversion location
   - jelenleg csak sablonklonos create-adset van, teljes mezoszerkesztes nincs

2. Ad creative kezeles
   - primary text
   - headline
   - description
   - destination URL
   - UTM parameterek
   - image / video asset hivatkozas
   - jelenleg creative-sablonozas van, de teljes media-upload workflow nincs

3. Ad szintu kezeles
   - draft / paused ad letrehozas
   - creative hozzarendeles
   - status update

### C. Minimum a megbizhato mereshez

1. GTM audit
   - ez mar scriptelve ellenorizheto, es a hianyzo tag-ek fel is mentek
   - optionalis plusz lepes: bongeszos smoke teszt valos kattintasokkal

2. Meta Events Manager validacio
   - API oldalrol a Pixel asset ownership es utolso activity ellenorizve lett
   - kulon elo debug-nezetes smoke teszt tovabbra is hasznos lehet

3. Pixel-azonositas
   - a hasznalt Pixel azonosithato: `489282852211205`
   - a Pixel a megfelelo Business assethez tartozik
   - domain verification tovabbi kulso ellenorzes maradhat, ha szukseges

4. Landing -> booking lanc validacio
   - mi tortenik a D2 landingrol indulva
   - mely pontokon veszhet el a Meta attribucio

### D. Minimum az uzembiztos Codex-mukodeshez

1. Jogosultsag-diagnosztika bovitese
   - a jelenlegi `permissions` lista jo alap, de irasi workflow elott celzottabb ellenorzes kellhet asset-szinten is

2. Token eletciklus kezeles
   - manualis rotacios szabaly
   - vagy hosszabb eletu token beszerzesi runbook
   - 2026-07-13 allapot: van mar kulon auth helper az OAuth URL generalasra, code exchange-re, token hosszabbitasra, inspectre es `.env` mentesre

3. Irasi muveletek vedelme
   - explicit dry-run alapertelmezett mod minden mutacios parancsnal
   - kulon emberi jovahagyas elvart a `--execute` tipusu hivasokhoz

4. Valtozasnaplo
   - mikor milyen kampany, budget vagy statusz lett valtoztatva

## Meta oldalon meg ellenorizendo assetek

Ezekrol a repo onmagaban nem ad eleg bizonyossagot:

- a Pixel melyik domainhez van kotve
- a Facebook Page es az ad account kapcsolata
- az Instagram account kapcsolata, ha Meta kampanyhoz szukseges
- a kampany celjatol fuggo conversion location es event mapping
- a `pages_manage_posts` megszerzese ugyanazon app/token folyamathoz

## Kockazatok

### P1 - operativ hiany

A Codex tud kampanyt, creative-ot, ad setet es adot is dry-run workflowban elokesziteni, de a teljes, nullarol induló media/upload + teljes mezoalapu szerkesztes meg nincs kesz. Emiatt a napi operativ workflow meg nem teljes.

### P1 - meresi bizonytalansag

A meresi lanc nagy resze mar validalt: a GTM base tag, a Pixel ID, a Business ownership es az esemeny-lefedettseg is ellenorizve lett. Ami ebben a korben nem futott le, az a valos bongeszos, hozzajarulastol konverzios kattintasig tarto smoke teszt.

### P1 - token/jogosultsag atlathatosag

A token mukodik, es mar van alap jogosultsag-listazas, de nincs eletciklus-kezeles vagy melyebb asset-szintu diagnosztika. Ettol meg olvasasi muveletek mennek, de irasi workflow hosszu tavon serulekeny lehet.

### P2 - workflow ergonomia

Meta oldalon jelenleg nincs olyan kenyelmes parancskeszlet, mint Google Ads eseteben. Emiatt a Codex kepesseg technikailag megvan bizonyos muveletekre, de nem eleg kiforrott napi operativ kezeleshez.

## Vegso valasz a kerdesre

Igen, kell meg nehany dolog ahhoz, hogy a Codex tenylegesen kezelni tudja a Meta hirdeteseket.

Ha a "kezelni" azt jelenti, hogy:

- latni a fiokot
- kampanyokat lekerdezni
- riportot nezni
- uj kampanyt, creative-ot, ad setet vagy adot elokesziteni dry-run modban
- alap statusz- es budgetmuveleteket dry-run modban ellenorizni
- a Pixel/GTM oldali allapotot validalni
- Facebook-oldal posztot dry-run modban elokesziteni

akkor a valasz: igen, ez nagyreszt mar most is megvan.

Ha a "kezelni" azt jelenti, hogy:

- teljes kampanystruktura epites
- ad set + ad + creative kezeles
- budget es statuszmenedzsment
- teljes media/upload workflow
- biztos Facebook-oldal API-s kozzetetel
- valos, bongeszos vegponttol vegpontig smoke teszt
- uzembiztos, napi operativ workflow

akkor a valasz: meg nem, ehhez tovabbi tooling es nehany Meta oldali ellenorzes kell.

## Javasolt kovetkezo lepes

1. Keszitsunk Meta tooling bovitesi tervet:
   - teljes creative/media upload
   - teljes ad set mezoszerkesztes
   - kampanyszintu budget/status ergonomia
   - pages_manage_posts beszerzesi runbook

2. Futtassunk kulon bongeszos smoke tesztet a GTM + Meta Events Manager meresi lanc vegponttol vegpontig ellenorzesere, ha uzemi bizonyossag kell.

3. Ha a cel valodi Codex-es hirdeteskezeles, epitsunk kulon biztonsagos mutacios workflow-t dry-run + jovahagyas alapon.

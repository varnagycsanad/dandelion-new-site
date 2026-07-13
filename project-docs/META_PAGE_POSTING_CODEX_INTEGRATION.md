# Meta Page Posting Codex integracio

Status: AKTUALIS
Last checked: 2026-07-13
Use for: Facebook-oldal posztolasi workflow dokumentalasa Codexbol, kepekkel egyutt

Cel: Codex helyi scriptbol tudja listazni a lathato Facebook-oldalakat, feloldani a Page tokent, es dry-run vagy kesobb eles modban oldalas posztot kesziteni szoveggel es egy vagy tobb keppel.

## Mi keszult

- `scripts/meta/meta-pages.mjs`
- `scripts/meta/meta-auth.mjs`
- npm parancsok:
  - `npm run meta:auth:url`
  - `npm run meta:auth:exchange`
  - `npm run meta:auth:extend`
  - `npm run meta:auth:inspect`
  - `npm run meta:auth:save-token`
  - `npm run meta:pages:check`
  - `npm run meta:pages:permissions`
  - `npm run meta:pages:list`
  - `npm run meta:pages:create-post`

## 2026-07-13 ellenorzes

Ellenorzott:

- `npm run meta:pages:list -- --format json`
- `npm run meta:pages:permissions -- --format json`
- `npm run meta:pages:create-post -- --message "..." --photo "<kep1>" --photo "<kep2>" --format json`

Eredmeny:

- a Pages API user tokennel elerheto
- latszik a Facebook-oldal:
  - `Dandelion Vendégház`
  - page ID: `100105918439273`
- a `/me/accounts` valasz Page tokent is ad vissza az oldalhoz
- a dry-run create-post workflow mukodik tobb kepre is
- a jelenlegi granted jogosultsagok kozott latszik:
  - `pages_show_list`
  - `pages_read_engagement`
- a Meta appban a `Manage Pages` use case mar hozza van adva
- a `pages_manage_posts` app oldalon mar `Ready for testing` allapotba kerult
- a jelenlegi .env-beli tokenben ettol fuggetlenul meg nem latszik:
  - `pages_manage_posts`

Kovetkeztetes: a posztolasi workflow technikailag elkeszult, az oldal lathato, a Page token feloldhato, a kepes poszt payload eloallitasa kesz. A Meta app oldali elofeltetel mar rendben van, de az eles API-s kozzetetelhez friss user token kell, amelyben tenylegesen benne van a `pages_manage_posts`.

## Pages manage posts statusz - 2026-07-13

- Meta app: `Dandelion Ads Codex`
- app ID: `2809171169448612`
- a `Manage Pages` use case hozza lett adva
- a `pages_manage_posts` statusza a Meta fejlesztoi feluleten: `Ready for testing`
- Graph API Explorerben a permission mar kivalaszthato
- a jovahagyo Facebook popup account-switch lepesig eljutott
- a projekt jelenlegi `META_ACCESS_TOKEN` erteke viszont meg nem lett ujrairva olyan tokenre, amely ezt a scope-ot tenylegesen tartalmazza

## Hasznalat

Auth URL generalasa a Pages scope-okhoz:

```powershell
npm run meta:auth:url
```

Ha az OAuth flow visszaadott egy `code` parametert:

```powershell
npm run meta:auth:exchange -- --code "IDE_A_CODE"
npm run meta:auth:extend -- --access-token "IDE_A_ROVID_TOKEN"
npm run meta:auth:inspect -- --access-token "IDE_A_HOSSZU_TOKEN"
npm run meta:auth:save-token -- --access-token "IDE_A_HOSSZU_TOKEN" --page-id 100105918439273
```

Oldalak listazasa:

```powershell
npm run meta:pages:list
```

Jogosultsagok ellenorzese:

```powershell
npm run meta:pages:permissions
```

Kepes poszt dry-run:

```powershell
npm run meta:pages:create-post -- --page-id 100105918439273 --message "Idén akkorák a fügék, hogy alig hisszük el." --photo "C:\path\kep1.jpg" --photo "C:\path\kep2.jpg"
```

Ha kesobb a jogosultsag megvan, ugyanez elesen:

```powershell
npm run meta:pages:create-post -- --page-id 100105918439273 --message "Idén akkorák a fügék, hogy alig hisszük el." --photo "C:\path\kep1.jpg" --photo "C:\path\kep2.jpg" --execute
```

## .env javaslat

```text
META_GRAPH_VERSION=v25.0
META_APP_ID=2809171169448612
META_APP_SECRET=...
META_REDIRECT_URI=...
META_ACCESS_TOKEN=...
META_PAGE_ID=100105918439273
```

## Nyitott pont

- a tokenben tenylegesen meg kell jelennie a `pages_manage_posts` joganak
- a Facebook jovahagyo popup account-switch lepeset egyszer vegig kell vinni, vagy ugyanennek megfelelo OAuth flow-bol uj token kell
- eles kozzetetelt kulon, tudatos probaval erdemes eloszor kiprobalni

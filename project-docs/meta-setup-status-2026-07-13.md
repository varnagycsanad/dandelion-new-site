# Meta setup status - 2026-07-13

Ownership update 2026-07-25: this document is historical platform status context. Current Meta and GTM platform ownership belongs to DMA. DWA only owns site-side implementation details, CTA surfaces, SEO/GEO source, schema and build evidence.

Do not treat this file as approval to perform platform writes from the DWA repo.

## Allapot

- A Meta hozzaferes aktiv es a projektben hasznalt token mukodik.
- A `Dandelion Vendégház` hirdetesi fiok elerheto a scriptjeinkbol.
- A projekt `.env` allomanya a Dandelion hirdetesi fiokra mutat:
  - `META_AD_ACCOUNT_ID=act_169467498360546`
- Kampanylista lekerdezese sikeres volt.
- Aktiv kampany latszik:
  - `D2_LastMinute_2026-07-19`
- A GTM container azonositva es auditolva lett:
  - account: `6353760449`
  - container: `251570065`
  - public ID: `GTM-P75FHKLJ`
- A hasznalt Meta Pixel azonositva es validalva lett:
  - pixel ID: `489282852211205`
  - pixel nev: `Dandelion Vendégház`
  - utolso activity: `2026-07-12T23:12:23+0200`
- A hianyzo `meta_*` GTM Meta tag-ek letrehozasa es publikálasa megtortent:
  - eles GTM verzio: `9`
  - verzio nev: `Codex Meta Pixel event scaffolding 2026-07-13`

## Mit ellenoriztunk

- `npm run meta:check`
  - sikeres
  - a token felhasznaloja: `Ilona Várnagy`
  - lathato fiokok:
    - `Ilona Várnagy` (`act_2013849525415667`)
    - `Dandelion Vendégház` (`act_169467498360546`)
- `npm run meta:campaigns -- --limit 10`
  - sikeres
  - a Dandelion fiok kampanyai visszajottek az API-bol
- `npm run meta:validate-pixel -- --format json`
  - sikeres
  - a base tag pixelazonositoja `489282852211205`
  - a base tag trigger esemenye `dnd_marketing_granted`
  - a Pixel a Business assetek kozott latszik
  - a repo altal kibocsatott `meta_*` esemenyek GTM lefedettsege teljes
- `npm run meta:gtm-events -- --execute --format json`
  - sikeres
  - a hianyzo Meta event tag-ek es trigger-ek letrejontek a GTM workspace-ben
  - a valtozas publikalt verzio lett

## Weboldal oldali kesz allapot

- A cookie hozzajarulas kezelesben mar szerepel a `Meta Pixel`.
  - fajl: `public/scripts/klaro-config.js`
  - fajl: `public/scripts/klaro-config-cookie-refine.js`
- A consent bridge mar kezeli a marketing hozzajarulast.
  - fajl: `public/scripts/consent-init.js`
  - fajl: `public/scripts/consent-init-cookie-refine.js`
- A site mar kuld Meta-kompatibilis `dataLayer` esemenyeket GTM-hez:
  - `ViewContent`
  - `BookingClick`
  - `InitiateCheckout`
  - `Contact`
  - `Lead`
  - fajl: `public/scripts/dnd-ads-events.js`
- A GTM-ben ezekhez az esemenyekhez most mar megfelelo Meta event tag-ek vannak rendelve.
- A Meta base tag marketing hozzajarulas utan, a `dnd_marketing_granted` esemenyre aktiválódik.

## Kovetkezo teendok

1. Ha uzemi bizonyossag is kell, fusson kulon bongeszos smoke teszt, ahol hozzajarulas utan valos oldallatogatasbol nezunk event beerkezest.
2. Ha kell, kulon dokumentalni a D2 last minute kampany es a landing oldal kozti meresi lancot.
3. Ha tovabbi Meta automatizalas a cel, a creative/media upload workflow legyen a kovetkezo tooling-bovites.

## Megjegyzes

- A technikai oldal most mar alapvetoen keszen all a Meta mereshez.
- A fo nyitott pont mar nem a jogosultsag vagy a GTM bekotes, hanem legfeljebb az elo smoke teszt es a tovabbi workflow-bovites.

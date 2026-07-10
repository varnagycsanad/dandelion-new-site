# Google Tag Gateway Rollout

Status: AKTUALIS 2026-07-10

Cel: a `dandelionhouse.hu` Google Ads / GA4 meresenek eroszitese a Google tag gateway for advertisers bevezetesevel.

Nem cel: vak bekapcsolas ellenorzes nelkul.

## Miert most

- A live oldal 2026-07-10 ellenorzes szerint `Cloudflare` mogott fut.
- A projektben aktiv `GTM` betoltes van: `GTM-P75FHKLJ`.
- A projektben mar van `Consent Mode v2` logika:
  - `src/layouts/BaseLayout.astro`
  - `public/scripts/consent-init-cookie-refine.js`
  - `public/scripts/dnd-ads-events.js`
- A fo uzleti indok: aktiv Google Ads es jobb konverziomeres.

## Jelenlegi helyi allapot

### GTM betoltes

A weboldal jelenleg kozvetlenul a Google hosztrol tolti a GTM scriptet:

- `src/layouts/BaseLayout.astro`
  - `https://www.googletagmanager.com/gtm.js?id=GTM-P75FHKLJ`
  - `https://www.googletagmanager.com/ns.html?id=GTM-P75FHKLJ`

### Consent viselkedes

Az alapertelmezett hozzajarulas jelenleg tiltott:

- `analytics_storage: denied`
- `ad_storage: denied`
- `ad_user_data: denied`
- `ad_personalization: denied`

Ez jo kiindulasi alap a gateway bevezeteshez, de aktivalas utan ujra kell ellenorizni.

### Hirdetesi esemenyek

A projektben mar vannak GTM-kompatibilis `dataLayer` esemenyek:

- `public/scripts/dnd-ads-events.js`

Ez azt jelenti, hogy a gateway bevezetese nem a meresi strategia cserje, hanem a jelenlegi meresi utvonal eroszitese.

## Bevezetesi dontes

Javaslat: `Cloudflare-integracios` bevezetes, nem kezdeti self-service atiras.

Indok:

- A domain mar Cloudflare mogott fut.
- Ez a legkevesebb helyi kodmodositassal jar.
- A Google dokumentacio szerint a GTM oldalarol is beallithato, ha a Cloudflare fiok kompatibilis.

## Rollout lepesek

### 1. Elokeszites

Bekapcsolas elott rogzitendo:

- GTM container azonosito: `GTM-P75FHKLJ`
- erintett domain: `dandelionhouse.hu`
- aktiv Google Ads konverziok listaja
- GA4 fo ellenorzo mutatok az elozo 7 napra:
  - sessions
  - users
  - key events / conversions
  - source / medium

### 2. Gateway aktivatas

Google Tag Manager oldalon:

1. `Admin`
2. `Google tag gateway for advertisers`
3. Cloudflare kapcsolat
4. `dandelionhouse.hu` domain kivalasztasa
5. aktivalas

Megjegyzes:

- Ha a Google/GTM felulet hibazik, a Google dokumentacio szerint ugyanaz a beallitas Cloudflare felol is elvegezheto.

### 3. Azonnali technikai ellenorzes

Aktivalas utan ellenorizni kell:

- a gateway statusza `Active`
- a domain statusza `Active` vagy rovid atfutas utan `Pending` -> `Active`
- a meresi kerelmek mar sajat domaines utvonalon mennek

Eszkoz:

- `Tag Assistant`

Mit kell latni:

- a script vagy a hit-ek mar nem tisztan a korabbi kozvetlen Google utvonalon mennek
- a hits sent reszben a gateway / measurement path megjelenik

### 4. Beleegyezesi viselkedes ellenorzese

Kulon tesztelni kell ket allapotot:

1. elutasitott analytics / marketing
2. elfogadott analytics / marketing

Ellenorzes:

- elutasitasnal ne induljon el nem kivant ads / analytics meres
- elfogadasnal a vart GTM tagek tuzeljenek
- a `dnd_consent_update` es kapcsolodo `dataLayer` esemenyek tovabbra is latszodjanak

### 5. Uzleti validacio

Aktivalas utan 24-72 oran belul ellenorizni:

- Google Ads konverziok bejonnek-e
- GA4 session / users drasztikusan nem esnek-e vissza
- key event / conversion volumen nem torik-e meg

## Dandelion-specifikus kockazatok

### 1. Consent torzs logika

A projektben a hozzajarulas nem csak banner, hanem sajat bridge logika is:

- `public/scripts/consent-init-cookie-refine.js`

Ezert a gateway utan kotelezo az ujrateszteles.

### 2. Noscript iframe

A jelenlegi sablonban van GTM `noscript` iframe is:

- `src/layouts/BaseLayout.astro`

Ezt kulon erdemes ellenorizni Tag Assistanttal es browser networkkel, mert a gateway-validacio szempontjabol elterhet a script-loader es a `noscript` utvonal viselkedese.

### 3. Ads-esemenyek

A booking/CTA alapu `dataLayer` esemenyeket kulon ellenorizni kell:

- booking gomb
- telefon kattintas
- WhatsApp kattintas
- kapcsolat oldal elerese, ha konverzios funnel resze

## Release utan ellenorzo lista

- GTM gateway statusz `Active`
- Tag Assistant mutatja a gateway utvonalat
- consent denied allapotban nem megy nem vart meres
- consent granted allapotban mennek a vart tagek
- Google Ads conversion tag-ek mukodnek
- GA4 realtime lat latogatot es fobb esemenyeket
- 24-72 oran belul nincs szokatlan visszaeses a fo meroszamokban

## Mikor kell rollback

Kapcsoljuk vissza, ha barmelyik teljesul:

- Google Ads konverziok eltunnek
- GTM tagek nem tuzelnek megbizhatoan
- consent-denied allapotban nem megfelelo meres indul
- GA4 meres latvanyosan beesik az aktivalast koveto idoszakban

## Kodszintu megjegyzes

Elso korben nem szukseges helyi kodmodositas, ha a Cloudflare-integracio rendesen aktiv es a gateway a vart utvonalon dolgozik.

Kodmodositas csak akkor kelljen, ha:

- a Cloudflare/GTM integracio nem tudja rendesen atvenni a betoltest
- manualis measurement path atiras valik szuksegesse
- kulon consent vagy tag firing inkompatibilitas derul ki

## Forrasok

- Google Developers: https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide
- Google Tag Manager Help (Cloudflare): https://support.google.com/tagmanager/answer/16061641?hl=en
- Google Tag Help (Cloudflare): https://support.google.com/tagmanager/answer/16061406?hl=en

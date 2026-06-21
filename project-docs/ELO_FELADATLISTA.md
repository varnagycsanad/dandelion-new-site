# Elő feladatlista

Status: AKTUALIS
Last checked: 2026-06-03
Use for: elo feladatlista, nyitott dokumentacios teendok, kovetkezo munka priorizalasa
Do not use for: torteneti auditok teljes hianylistajanak automatikus vegrehajtasara

## Cel

Ez a fajl az egyetlen kozponti hely, ahol a Markdown dokumentumokbol osszegyujtott, meg nyitott feladatokat kovetni kell.

A regi auditok es tervek kontextust adnak, de nem mindegyik feladatuk aktiv. Ha egy teendo nincs ebben a backlogban, akkor nem tekintendő automatikusan nyitott munkanak; eloszor ujra kell ellenorizni a repo jelenlegi allapotaval.

## Hasznalati szabaly

1. Uj munka inditasakor ezt a fajlt kell nezni az elso korben.
2. A forrasdokumentumok csak hatteranyagok.
3. Megvalositas elott mindig kell gyors repo/build ellenorzes, mert tobb regi audit reszben mar teljesult.
4. Teljesult vagy elavult tetelt innen kell torolni vagy `Lezarva` megjegyzessel atvezetni egy kovetkezo auditba.

## P0 - dontes vagy kulso input kell

### P0-1 - Foglalasi linkek es Koveskal CTA dontes

- Statusz: blokkolt
- Forras: `GOOGLE_AI_READINESS_BOOKING_LINKS.md`, `GOOGLE_AI_READINESS_EXECUTION_PLAN.md`
- Mi a gond: Koveskal szallasnal nincs egyertelmu SabeeApp foglalasi link, es a nem-Koveskal szallasok HU/EN szobaszintu SabeeApp URL-jeit ujra jovahagyas nelkul nem szabad tovabbvinni.
- Kovetkezo konkret lepes: tulajdonosi dontes kell arrol, hogy Koveskalnal erdeklodesi CTA, altalanos foglalasi CTA vagy mas foglalasi utvonal legyen.

### P0-2 - Master accommodation table / tulajdonosi adatforras

- Statusz: blokkolt
- Forras: `GOOGLE_AI_READINESS_OWNER_INPUT.md`, `GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`, `GOOGLE_AI_READINESS.md`
- Mi a gond: tobb schema, overviewFacts, pozicionalasi es AI readiness elem csak akkor pontos, ha van jovahagyott master adatforras.
- Kovetkezo konkret lepes: ossze kell allitani vagy megerositeni a master accommodation tablet: cim, geo, kapacitas, haloszobak, strand tavolsag/nevek, amenity adatok.

### P0-3 - Google Business Profile es Google booking tisztazas

- Statusz: blokkolt
- Forras: `GOOGLE_AI_READINESS_EXECUTION_PLAN.md`, `GOOGLE_AI_READINESS_SCHEMA_PLAN.md`
- Mi a gond: GBP audit, Google Free Booking / Vacation Rental es nehany strukturalt adat dontes csak GBP hozzaferessel vagy hivatalos profillinkekkel tisztazhato.
- Kovetkezo konkret lepes: GBP hozzaferes vagy export, jelenlegi profil URL-ek, SabeeApp Google booking tamogatas tisztazasa.

## P1 - megvalositas elott ellenorizendo

### P1-1 - Astro frissites

- Statusz: nyitott
- Forras: `md-file-audit-2026-06-02.md`
- Mi a gond: `astro` telepitett verzio `6.1.5`, az auditkor elerheto npm verzio `6.4.3` volt.
- Kovetkezo konkret lepes: kulon technikai taskban `astro` frissites, `npm install`, `npm run build`, majd vizualis ellenorzes.

### P1-2 - Szallasok oldal regio-struktura

- Statusz: lezarva 2026-06-03
- Forras: `archive/accommodations/11-szallasok-oldal-audit-es-megvalositasi-terv.md`
- Ellenorzes eredmenye: a HU/EN/DE/CS szallasvalaszto oldalak 3 regios modellre epulnek, a Koveskal benne van a Káli-medence szekcioban, vannak regio anchorok, valaszto blokkok, szallaskartyak es mobil egyoszlopos kartyaelrendezes.
- Javitas: a nemet fooldali regio CTA-k rossz anchorokra mutattak; javitva a nemet szallasoldalon letezo `#zeugenberge`, `#balaton-naehe`, `#kali-becken` anchorokra.
- Kovetkezo konkret lepes: nincs; a forras audit archiválva lett. A megmaradt kartyaszintu anchor / vizualis QA / URL-egységesites temat majd kulon uj auditban kell ujranyitni, ha szukseg lesz ra.

### P1-3 - Astro-only kepkezeles befejezese

- Statusz: live registry lezárva 2026-06-03; legacy admin/script dontes kulon P1-5 alatt
- Forras: `12-astro-only-kepkezelesi-javitasi-terv.md`, `10-astro-image-migracios-terv.md`
- Mi a gond: van mar `astro:assets`, de a dokumentumok szerint az accommodation hero/card/gallery/homepage kepvezetek es a regi fallbackek teljes lezárasa ellenorizendo volt.
- 2026-06-03 ellenorzes: a live accommodation galeriak nagy resze mar `src/assets/accommodations/...` alatti lokalis WebP assetre epul, `astro:assets`-en keresztul. A galeria/thumbnail bejegyzesek buildidoben `requireAccommodationLocalAsset...` ellenorzest kapnak.
- 2026-06-03 ellenorzes: D2 eseteben hero desktop, hero mobile es card asset is Astro-local registryben van.
- 2026-06-03 ellenorzes: D2-n kivul 8 szallasnal a registryben meg `hero.desktop: null`, `hero.mobile: null`, `card: null`; 9 szallasnal `thumbnail: null`.
- 2026-06-03 ellenorzes: a live `src/` retegen kivul az `src/admin-disabled` es a kepfeldolgozo scriptek meg tartalmaznak WordPress / `/images/accommodations/...` / `source-images` eredetu legacy workflow-t.
- 2026-06-03 javitas: a D2 thumbnail es a 8 nem-D2 szallas hero desktop, hero mobile, card es thumbnail bejegyzese Astro-local registrybe kerult. A nem-D2 hero/card assetek `src/assets/accommodations/<slug>/hero/` es `src/assets/accommodations/<slug>/card/` alatt explicit lokalis WebP fajlkent elnek; a thumbnail mezok a lokalis `thumbs/` valtozatokra mutatnak.
- 2026-06-03 ellenorzes: `accommodation-images.ts` alatt nem maradt `hero.desktop: null`, `hero.mobile: null`, `card: null` vagy `thumbnail: null`; `npm run build` sikeres, 93 oldal es 120 optimalizalt kepasset keszult. A statikus szerveren a generalt `/assets/...` kepfajlok 200-zal elerhetok.
- Kovetkezo konkret lepes: nincs a live accommodation registryre. A regi `src/admin-disabled` es kepfeldolgozo script workflow sorsa P1-5 alatt kulon dontesi feladat.

### P1-4 - WP media maradek hivatkozasok auditja

- Statusz: ellenorizendo
- Forras: `wp-uploads-replacement-audit.md`, `server-wp-audit-latest.md`
- Mi a gond: regi auditok meg `wp-content/uploads` es WordPress eredetu media hivatkozasokat emlegetnek.
- Kovetkezo konkret lepes: `src/`, `public/`, `scripts/` alatt friss keresest futtatni; csak a live pipeline-ban maradt hivatkozasokat javitani.

### P1-5 - Image admin jovobeli szerepe

- Statusz: nyitott
- Forras: `12-astro-only-kepkezelesi-javitasi-terv.md`, `archive/image-admin-v2-audit-2026-04-30.md`
- Mi a gond: az admin-disabled es regi image admin jegyzetek nem napi forrasok, de el kell donteni, lesz-e Astro asset registry manager.
- 2026-06-03 megjegyzes: a live accommodation registry kep-hianyai rendezve lettek; az admin-disabled es regi `images:*` script workflow ettol fuggetlenul meg legacy dontesi tema.
- Kovetkezo konkret lepes: donteni kell, hogy kell-e uj admin es ha igen, csak a jelenlegi Astro-local asset modellre epuljon.

### P1-6 - Email marketing MVP alap backend

- Statusz: lezarva 2026-06-21
- Forras: `project-docs/email-marketing-mvp-plan.md`
- Mi a helyzet: elkeszult az elso Node.js service scaffold JSON tarolassal.
- Kovetkezo konkret lepes: a vegleges SMTP es uzemi integracio kulon feladat marad.

### P1-7 - Email marketing MVP feliratkozo űrlap

- Statusz: lezarva 2026-06-21
- Forras: `project-docs/email-marketing-mvp-plan.md`, `src/sections/NewsletterSignup.astro`
- Mi a helyzet: a jelenlegi feliratkozo UI mar sajat Astro űrlapot és API bekotest hasznal.
- Kovetkezo konkret lepes: a vegleges publikus endpoint beallitasa kulon feladat.

### P1-8 - Email marketing MVP leiratkozas es hozzajarulas

- Statusz: lezarva 2026-06-21
- Forras: `project-docs/email-marketing-mvp-plan.md`, `src/pages/en/privacy-policy.astro`, `src/pages/cs/ochrana-osobnich-udaju.astro`
- Mi a helyzet: a hozzajarulas, unsubscribe link es statuszkezeles bevezetese megtortent.
- Kovetkezo konkret lepes: a production megfeleltetes es kesobbi audit kulon feladat marad.

### P1-9 - Email marketing MVP admin es kampanykuldes

- Statusz: reszben teljesult
- Forras: `project-docs/email-marketing-mvp-plan.md`
- Mi a helyzet: a lista kezeleshez mar van service, SMTP kuldesi reteg es az `admin/hirlevel` listaoldal is elkészült kereséssel, szűréssel és CSV exporttal.
- Kovetkezo konkret lepes: kampany szerkesztes, tesztkuldes felulet es jogosultsagi vedelem meg epites alatt.

## P2 - minoseg, tartalom, paritas

### P2-0a - Medencehasznalati szabalyzat kesobbi bovites

- Statusz: nyitott
- Forras: tulajdonosi input 2026-06-13
- Mi a gond: a Panorama Pool medencehasznalati szabalyzat kovetkezo tartalmi frissitesenel ket uj szabaly keruljon be, de egyelore ne a publikus hasznalati utasitasokba / ASZF-be, csak teendokent legyen nyilvantartva.
- Javasolt HU szoveg: "Szeles idoben a napernyot le kell engedni." / "Koveket, kavicsokat vagy mas targyakat a vizbe dobni tilos. Kerjuk a szuloket, figyeljenek erre a gyerekek miatt."
- Javasolt EN szoveg: "In windy weather, the parasol must be closed." / "Throwing stones, pebbles or other objects into the water is prohibited. Parents are asked to pay attention to this because of children."
- Javasolt DE szoveg: "Bei windigem Wetter muss der Sonnenschirm geschlossen werden." / "Steine, Kiesel oder andere Gegenstaende duerfen nicht ins Wasser geworfen werden. Eltern werden gebeten, wegen der Kinder besonders darauf zu achten."
- Javasolt CS szoveg: "Za vetrneho pocasi je nutne slunecnik zavrit." / "Do vody je zakazano hazet kameny, oblazky nebo jine predmety. Prosime rodice, aby na to kvuli detem dohlizeli."
- Javasolt SK szoveg: "Vo veternom pocasi je potrebne slnecnik zavriet." / "Do vody je zakazane hadzat kamene, kamienky alebo ine predmety. Prosime rodicov, aby na to kvoli detom dohliadli."
- Kovetkezo konkret lepes: amikor a medencehasznalati szabalyzat kovetkezo publikus frissitese indul, ezeket a pontokat ellenorizni es minden relevans nyelvi valtozatba beilleszteni; az ASZF-be tovabbra se keruljon.

### P2-0 - Meta Ads elso kampany elokeszitese

- Statusz: elokeszitve, kampany meg nem fut
- Forras: `META_ADS_CODEX_INTEGRATION.md`
- Mi a gond: a Meta Marketing API kapcsolat mukodik es a Dandelion Vendeghaz hirdetesi fiok lathato, de uj Facebook kampany meg nincs elinditva. Ezert most nincs mit heti riportolasi mezokkel dokumentalni.
- Kovetkezo konkret lepes: elso Facebook kampanyterv keszitese celzassal, kreativ iranyokkal, budgettel es landing oldalakkal; kampany letrehozasa csak kulon jovahagyas utan, `PAUSED` allapotban.

### P2-1 - Google AI schema kovetkezo kore

- Statusz: nyitott, P0 adatoktol fugg
- Forras: `GOOGLE_AI_READINESS_SCHEMA_PLAN.md`, `GOOGLE_AI_READINESS_SCHEMA_AUDIT.md`
- Mi a gond: minimal ReserveAction mar reszben kesz, de address/geo/amenity es richer structured data csak jovahagyott adatokkal biztonsagos.
- Kovetkezo konkret lepes: P0 master adatok utan schema bovites, Rich Results Test, URL Inspection es sitemap/GSC monitorozas.

### P2-2 - Google AI kep SEO forrasdontes

- Statusz: nyitott
- Forras: `GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`, `GOOGLE_AI_READINESS_IMAGE_SEO_SOURCE_AUDIT.md`, `GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`
- Mi a gond: a regi SEO test export, gallery-order export es live registry kozotti forrasdontes nelkul nem szabad tomeges alt/title/caption atirast csinalni.
- Kovetkezo konkret lepes: kivalasztani a hiteles kepadat-forrast, majd csak ezutan registry alt/title/caption frissites.

### P2-3 - Forditasi oldalparitas

- Statusz: ellenorizendo
- Forras: `translation-page-parity-audit-2026-05-25.md`, `DANDELION_TRANSLATION_RULES.md`
- Mi a gond: a cseh legal/pool hianyok mar nem aktiv blokkolok, de az EN/DE/CS home oldalak es accommodation profilok lehetnek tartalmilag konnyebbek a HU verzional.
- Kovetkezo konkret lepes: oldalankenti paritas audit friss repoallapotbol, majd csak a valodi tartalmi hianyok javitasa.

### P2-4 - Magyar canonical alias / sitemap politika

- Statusz: ellenorizendo
- Forras: `translation-page-parity-audit-2026-05-25.md`, `current-sitemap-audit-2026-05-24.md`
- Mi a gond: a magyar canonical aliasok, sitemap es noindex politika regi auditokban felmerult, de a mai builddel ujra kell merni.
- Kovetkezo konkret lepes: sitemap, canonical, hreflang es noindex ellenorzes a friss build outputbol.

### P2-5 - Nemet stilisztikai / jogi native review

- Statusz: parkolt
- Forras: `13-nemet-lokalizacios-megvalositasi-terv.md`
- Mi a gond: nem technikai blokkolo, de kulso nemet anyanyelvi/jogi visszajelzes eseten lehet utomunka.
- Kovetkezo konkret lepes: csak akkor nyitni, ha erkezik konkret feedback.

## Nem aktiv automatikusan

Az alabbi dokumentumtipusokban levo teendoket nem szabad egy az egyben vegrehajtani:

- regi batch review es draft fajlok
- archivalt image-alt es D2 munkalapok
- `generated/` processing plan exportok
- cseh kiindulo lokalizacios audit elso hianylistaja
- olyan image workflow terv, amely meg `sharp` hianyrol vagy nem letezo `images:plan` scriptrol beszel

Ezekbol csak akkor lesz uj feladat, ha friss repoellenorzes utan bekerulnek ebbe a backlogba.

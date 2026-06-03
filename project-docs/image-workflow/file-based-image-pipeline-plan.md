# Fajlalapu Dandelion kep-workflow terv

Status: RESZBEN TELJESULT
Last checked: 2026-06-03
Use for: file-based image pipeline terv kontextus
Do not use for: aktualis keszultseg megallapitasara friss audit nelkul

[CHANGE 2026-06-03 00:00] Aktualis tooling: a repo Sharp-alapu pipeline-t hasznal, es a gepen kulso konvertalok is elerhetok. Kephez ImageMagick 7.1.2-24, videohoz FFmpeg 8.1.1 es HandBrake 1.10.2 hasznalhato kontrollalt lokalis elokeszitesre.


Ebben a workflowban a forraskep mappa lesz a kezelt JPG kepek bemeneti helye.

## Hova kell bemasolni a JPG kepeket

- A szallasokhoz es megjelenesi celokhoz tartozo JPG kepeket a `source-images/accommodations/` alatti megfelelo almappaba kell bemasolni.
- Pelda:
  - `source-images/accommodations/d1/`
  - `source-images/accommodations/d2/`
  - `source-images/accommodations/fugehaz/`
  - `source-images/accommodations/koveskal/`
  - `source-images/accommodations/marketing/`

## Mi lesz a kovetkezo lepes

1. WebP generalas a bemasolt JPG kepekbol.
2. Thumbnail generalas az admin es a gyors elonezetek szamara.
3. AI vision alapu SEO draft keszitese.
4. Registry generalas, ami egy helyen nyilvantartja a kepek adatait es allapotat.

## Aktualis eszkozok

Repo pipeline:

- `sharp@0.34.5`
- `npm run images:dry-run`
- `npm run images:intake`
- `npm run images:select`
- `npm run images:process`
- `npm run images:publish`

Lokalis kulso programok:

- ImageMagick 7.1.2-24: kepek atmeretezesehez, formatumellenorzeshez, WebP/PNG/JPEG elokesziteshez.
- FFmpeg 8.1.1: MP4/WebM/video transzkodolas, metadata es faststart ellenorzes.
- HandBrake 1.10.2: vizualis videokonvertalasi munkafolyamat, ha GUI-val kell ellenorizni a kimenetet.

Szabaly: a frontendbe tovabbra is csak ellenorzott, optimalizalt, SEO-adattal osszekotott asset kerulhet. A kulso programok nem valtjak ki a registry es build ellenorzest.

## Fontos szabaly

- Az AI altal irt SEO mezok eloszor csak draft allapotba kerulhetnek.
- Az AI altal keszitett SEO adat nem kerulhet automatikusan jovahagyott, eles SEO adatkent hasznalatba.
- A jovahagyas kulon emberi ellenorzes utan tortenjen.

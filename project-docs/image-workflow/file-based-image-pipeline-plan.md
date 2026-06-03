# Fajlalapu Dandelion kep-workflow terv

Status: RESZBEN TELJESULT
Last checked: 2026-06-02
Use for: file-based image pipeline terv kontextus
Do not use for: aktualis keszultseg megallapitasara friss audit nelkul


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

## Fontos szabaly

- Az AI altal irt SEO mezok eloszor csak draft allapotba kerulhetnek.
- Az AI altal keszitett SEO adat nem kerulhet automatikusan jovahagyott, eles SEO adatkent hasznalatba.
- A jovahagyas kulon emberi ellenorzes utan tortenjen.

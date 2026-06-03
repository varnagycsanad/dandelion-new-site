[CHANGE 2026-05-20 00:00] Kep SEO forrasaudit letrehozva; implementacio blokkolva, amig a fo forras nincs kivalasztva.

# Google AI Readiness kep SEO forrasaudit

Status: TORTENETI
Last checked: 2026-06-02
Use for: kep SEO forrasaudit kontextus
Do not use for: aktualis kepforras allapot friss ellenorzes nelkul


Cel: beazonositani a mar letezo kep SEO anyagokat, mielott uj review, vizualis review vagy image registry modositas tortenne.

Ez a dokumentum nem image registry, nem final SEO forras, es nem ir uj alt/title/caption szoveget.

## Audit szabalyok

- Image registry modositas: TILOS ebben a korben.
- Uj alt/title/caption szoveg irasa: TILOS ebben a korben.
- `approved:true` beallitasa: TILOS ebben a korben.
- Visual review HTML inditasa vagy letrehozasa: TILOS ebben a korben.
- Batch 1 review nem final implementacios forras.

## Megtalalt kep SEO forrasok

| Forras | Tipus | Mire valo | Konkret alt/title/caption javaslat | Vizualis sorrend / gallery export | Allapot |
| --- | --- | --- | --- | --- | --- |
| `src/admin-disabled/data/images/accommodation-images.seo-test.json` | korabbi / eredeti SEO draft adatforras | Korabban keszult kep SEO draftok tarolasa admin-disabled teruleten | Igen: 174 kephez `seoDraft`, mind `approved:false` | Nem elsoleg vizualis eszkoz, de kepenkenti adatot tartalmaz | HASZNALHATO, de nem final; fo forras jelolt |
| `src/admin-disabled/data/images/accommodation-images.generated.json` | korabbi generalt kepforras | Gallery-order tool gallery adatforrasa, ures `seoDraft` mezokkel | Nem: a vizsgalt mezok ures draftokat mutatnak | Kozvetett gallery sorrend/adatforras | HASZNALHATO technikai alapnak, de nem SEO szovegforras |
| `project-docs/gallery-order-tool/gallery-order-*.html` | korabbi gallery-order export / review felulet | Szallasonkenti kepnezo es sorrendi export, `seoDraft` preview-val | Igen: a HTML-ekben a draft mezok megjelennek; forrasa az admin-disabled `seo-test.json` lehetett | Igen: szallasonkenti gallery-order export | HASZNALHATO, de nem final; fo review felulet jelolt |
| `project-docs/gallery-order-tool/README.md` | eszkoz dokumentacio | Leirja, hogy a tool a generated JSON-bol es opcionalisan a `seo-test.json`-bol dolgozik | Nem | Igen, eszkozleiras | HASZNALHATO forraslanc tisztazasra |
| `project-docs/image-workflow/d2-image-seo-review.md` | korabbi D2-specifikus review / draft | D2 source kepek SEO es focusPoint review-ja | Igen: D2 hero/card/gallery alt/title/caption draftok `approved: no` jelolessel | Reszben: D2 source es target kepterv | HASZNALHATO D2-hoz, de nem altalanos forras |
| `project-docs/image-workflow/d2-gallery-selection-review.md` | korabbi D2 gallery valogatas | D2 aktiv/rejtett gallery dontesi javaslat | Nem SEO final, inkabb valogatas | Igen: D2 gallery sorrend es elrejtendo kepek | HASZNALHATO D2 sorrendhez |
| `project-docs/image-workflow/d2-image-contact-sheet.html` | D2 vizualis contact sheet | D2 source kepek vizualis ellenorzese | Nem megbizhato final SEO forras | Igen | HASZNALHATO vizualis ellenorzeshez |
| `project-docs/image-workflow/d2-processed-webp-contact-sheet.html` | D2 feldolgozott WebP contact sheet | D2 processed kepkimenetek vizualis ellenorzese | Nem megbizhato final SEO forras | Igen | HASZNALHATO vizualis ellenorzeshez |
| `project-docs/archive/image-workflow/generated/d2-processing-plan-selected.*` | D2 processing terv | Kivalasztott D2 kepek target path / output terv | Nem | Igen, D2 processing sorrendhez | HASZNALHATO technikai D2 forrasnak |
| `project-docs/archive/image-workflow/generated/d2-processing-plan-all.*` | D2 processing terv | Osszes D2 source kep feldolgozasi terve | Nem | Igen, D2 processing sorrendhez | HASZNALHATO technikai D2 forrasnak |
| `project-docs/image-workflow/webp-processing-script-plan.md` | pipeline terv | Feldolgozasi es jovahagyasi szabalyok | Nem | Nem | HASZNALHATO szabalyforrasnak |
| `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md` | uj Google AI audit | Szallasonkenti hianyok es prioritasi sorrend | Nem teljes javaslat; csak gap/prioritas | Nem | HASZNALHATO auditnak, nem final SEO forrasnak |
| `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md` | uj Google AI review / draft munkalap | Elso kor: Royal Homes, Szepvolgyi, Szololiget, Koveskal, D1, Vintage hero-jelolt + elso 6 gallery | Igen, de a meglevo `seoDraft` reszhalmaza; nem final | Reszben: review sorrend, nem teljes gallery export | CSAK REVIEW, nem final implementacios forras |
| `src/data/images/accommodation-images.ts` | live image registry | Jelenlegi frontend kepadatok | Igen, de ez eles registry: D2 konkret, nem-D2 generikus | Igen, renderelt gallery sorrend | NEM MODOSITHATO ebben a korben |
| `src/data/images/image-types.ts` | tipusdefinicio | `ImageSeoDraft` es registry mezok formaja | Nem | Nem | HASZNALHATO technikai referencia |

## Gallery-order es seo-test lefedettseg

Az admin-disabled `seo-test.json` jelenlegi allapota:

| Szallas kulcs | Kepek | `seoDraft` | `approved:true` | `approved:false` |
| --- | ---: | ---: | ---: | ---: |
| `d2` | 17 | 17 | 0 | 17 |
| `koveskal` | 21 | 21 | 0 | 21 |
| `fugehaz` | 13 | 13 | 0 | 13 |
| `d1` | 18 | 18 | 0 | 18 |
| `szololiget` | 21 | 21 | 0 | 21 |
| `zsalya` | 11 | 11 | 0 | 11 |
| `royal_homes` | 33 | 33 | 0 | 33 |
| `vintage` | 18 | 18 | 0 | 18 |
| `szepvolgyi` | 22 | 22 | 0 | 22 |

Osszesen: 174 kephez van korabbi `seoDraft`, mind `approved:false`.

## Dokumentumok besorolasa

### Korabbi / eredeti SEO anyag

- `src/admin-disabled/data/images/accommodation-images.seo-test.json`
- `project-docs/gallery-order-tool/gallery-order-*.html`
- `project-docs/image-workflow/d2-image-seo-review.md`

Ezek tartalmazzak a legtobb konkret kep SEO draftot. Egyik sem final registry forras, mert mindenhol jovahagyas elotti allapot latszik.

### Uj Google AI Readiness dokumentum

- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`
- `project-docs/GOOGLE_AI_READINESS.md`
- `project-docs/GOOGLE_AI_READINESS_EXECUTION_PLAN.md`

Ezek a Google AI Readiness munkafolyamat reszei. A Batch 1 review kulonosen fontos, de csak uj review lap, nem a teljes korabbi kep SEO munka helyettesitese.

### Review / audit / draft

- `GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`: audit es prioritas.
- `GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`: reszhalmazos review munkalap.
- `image-workflow/d2-image-seo-review.md`: D2 draft review.
- `gallery-order-tool/*.html`: vizualis review export SEO draft preview-val.

### Konkret alt/title/caption javaslatot tartalmaz

- `src/admin-disabled/data/images/accommodation-images.seo-test.json`
- `project-docs/gallery-order-tool/gallery-order-*.html`
- `project-docs/image-workflow/d2-image-seo-review.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`

### Vizualis kep sorrendet vagy gallery-order exportot tartalmaz

- `project-docs/gallery-order-tool/gallery-order-*.html`
- `project-docs/gallery-order-tool/index.html`
- `project-docs/gallery-order-tool/README.md`
- `project-docs/image-workflow/d2-gallery-selection-review.md`
- `project-docs/image-workflow/d2-image-contact-sheet.html`
- `project-docs/image-workflow/d2-processed-webp-contact-sheet.html`
- `project-docs/archive/image-workflow/generated/d2-processing-plan-selected.*`
- `project-docs/archive/image-workflow/generated/d2-processing-plan-all.*`

## Osszevetes a Batch 1 review-val

Batch 1 feldolgozott kor:

- Dandelion Royal Homes: hero-jelolt + elso 6 gallery.
- Szepvolgyi Vendeghaz: hero-jelolt + elso 6 gallery.
- Szololiget Vendeghaz: hero-jelolt + elso 6 gallery.
- Dandelion Koveskal: hero-jelolt + elso 6 gallery.
- Dandelion D1: hero-jelolt + elso 6 gallery.
- Dandelion Vintage: hero-jelolt + elso 6 gallery.

A Batch 1 a korabbi teljes draftanyag reszhalmaza. Nem tartalmazza:

- Fugehaz teljes korabbi draftanyagait.
- Zsalya teljes korabbi draftanyagait.
- D2 korabbi D2-specifikus SEO review anyagait.
- A feldolgozott 6 szallas osszes tovabbi gallery kepet.
- A gallery-order export teljes vizualis sorrendi kontextusat.

## Duplikacio / konfliktus

- DUPLIKACIO: a Batch 1-ben szereplo `seoDraft` mezok tobbnyire a korabbi `seo-test.json` / gallery-order export reszhalmazat ismetlik.
- KONFLIKTUSKOCKAZAT: ha Batch 1 lenne final implementacios forras, figyelmen kivul hagyna a teljes 174 kepes korabbi draftanyagot.
- KONFLIKTUSKOCKAZAT: a Batch 1 hero-jelolt sorai nem registry dontesek; a nem-D2 hero desktop/mobile mezok tovabbra is hianyoznak.
- KONFLIKTUSKOCKAZAT: a gallery-order HTML-ekben es a live registryben kulcsnev / azonositasi elteresek lehetnek, peldaul `royal_homes` es `royal-homes` jellegu mapping kerdesek.
- NINCS FINAL JOVAHAGYAS: a megtalalt draftok mind `approved:false` vagy `approved: no` allapothoz kotodnek.

## Fo forrasnak javasolt anyag

Javasolt fo forras a tovabbi munkahoz:

1. `src/admin-disabled/data/images/accommodation-images.seo-test.json` legyen a konkret korabbi SEO draftok elso szamu forrasa.
2. `project-docs/gallery-order-tool/gallery-order-*.html` legyen a vizualis sorrend es review kontextus forrasa.
3. `project-docs/image-workflow/d2-image-seo-review.md` legyen D2 kulon ellenorzesi forrasa, mert D2-nel mar volt sajat pilot es registry implementacio.
4. `GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md` csak kontrollalt review munkalap legyen, nem final implementacios forras.

## Elavult vagy csak masodlagos anyag

- `src/admin-disabled/data/images/accommodation-images.generated.json`: ures `seoDraft` mezok miatt nem SEO szovegforras, inkabb gallery-adat alap.
- `GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`: nem elavult, de audit/prioritas, nem konkret final szovegforras.
- `GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`: nem elavult, de uj reszhalmazos review; nem irhatja felul a korabbi teljes draftanyagot.
- `image-workflow/generated/*.json` es `*.md`: technikai D2 processing forrasok, nem kep SEO final forrasok.

## Javasolt kovetkezo lepes

1. Dontes kell: a tovabbi kep SEO munka fo szovegforrasa az admin-disabled `seo-test.json` + gallery-order export legyen-e.
2. Ha igen, keszuljon egy kulon, nem-registry implementacios elokeszito task, amely csak mappinget ellenoriz a `seo-test.json`, gallery-order export es live registry kozott.
3. A Batch 1 review maradjon jovahagyasi munkalap, de csak a fo forrasbol visszavezetett, ellenorzott reszhalmazkent.
4. Image registry modositas csak a forrasdontes, mapping ellenorzes es emberi jovahagyas utan indulhat.
5. `approved:true` tovabbra sem allithato automatikusan.

## Implementacios kapu

Kep SEO implementacio: BLOKKOLVA, amig a korabbi kep SEO anyag fo forrasa nincs tisztazva.

Batch 1 review: csak uj review, nem final implementacios forras.

Kovetkezo lepes: IMAGE_SEO_SOURCE_AUDIT alapjan dontes a fo forrasrol es a mapping ellenorzesrol.

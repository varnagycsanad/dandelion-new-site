# Kep ALT SEO forras- es lokalizacios audit

Status: TORTENETI
Last checked: 2026-06-02
Use for: image alt forras es lokalizacios audit kontextus
Do not use for: aktualis image pipeline allapot helyettesitesere


Datum: 2026-05-25

## Cel

Folytatas az ALT SEO audit utan: a kepkezelesi MD-kben rogzitett szabalyok alapjan megnezni, milyen forrasbol szabad tovabb dolgozni a nemet es cseh ALT javitasokhoz.

Ez a dokumentum nem image registry modositas, nem final ALT forras, es nem allit be `approved:true` erteket.

## Beolvasott szabalyforrasok

- `project-docs/12-astro-only-kepkezelesi-javitasi-terv.md`
- `project-docs/10-astro-image-migracios-terv.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_SOURCE_AUDIT.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`
- `project-docs/image-workflow/d2-image-seo-review.md`
- `project-docs/image-workflow/webp-processing-script-plan.md`
- `project-docs/image-workflow/file-based-image-pipeline-plan.md`
- `project-docs/gallery-order-tool/README.md`
- `dandelion_tobbnyelvu_forditasi_workflow.md`
- `project-docs/DANDELION_TRANSLATION_RULES.md`

## Fontos belso szabalyok

1. Az `alt` csak azt irhatja le, ami tenylegesen latszik a kepen.
2. Tilos kulcsszohalmozas.
3. Tilos fajlnevbol vagy sorszambol SEO szoveget gyartani.
4. Tilos olyan allitas, ami nincs vizualisan ellenorizve.
5. Az AI keszithet SEO draftot, de csak draft allapotban.
6. Emberi review nelkul semmi nem kerulhet final `alt` / `title` / `caption` mezobe.
7. `approved:true` automatikusan nem allithato.
8. Meglevo jovahagyott SEO mezo nem irhato felul automatikusan.
9. Kep SEO implementacio a Google AI Readiness szabaly szerint blokkolt, amig nincs forrasdontes, mapping ellenorzes es jovahagyas.
10. Forditasi taskban tilos tomeges image registry atiras.

## Megtalalt konkret SEO draft forras

Megvan:

- `src/admin-disabled/data/images/accommodation-images.seo-test.json`
- meret: 135418 byte

Ez tartalmazza a korabbi kepenkenti `seoDraft` mezoket.

Megvan technikai / sorrendi alapnak:

- `src/admin-disabled/data/images/accommodation-images.generated.json`
- meret: 81969 byte

Megvannak a vizualis review exportok:

- `project-docs/gallery-order-tool/gallery-order-d1.html`
- `project-docs/gallery-order-tool/gallery-order-d2.html`
- `project-docs/gallery-order-tool/gallery-order-fugehaz.html`
- `project-docs/gallery-order-tool/gallery-order-koveskal.html`
- `project-docs/gallery-order-tool/gallery-order-royal_homes.html`
- `project-docs/gallery-order-tool/gallery-order-szepvolgyi.html`
- `project-docs/gallery-order-tool/gallery-order-szololiget.html`
- `project-docs/gallery-order-tool/gallery-order-vintage.html`
- `project-docs/gallery-order-tool/gallery-order-zsalya.html`

## Lefedettseg

| Szallas | SEO draft kep | Teljes HU/EN draft | `approved:true` | Generated egyezes | Public asset | Src asset |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| d1 | 18 | 18 | 0 | 18/18 | 18/18 | 18/18 |
| d2 | 17 | 17 | 0 | 1/17 sorrend szerint | 17/17 | 17/17 |
| fugehaz | 13 | 13 | 0 | 13/13 | 13/13 | 13/13 |
| koveskal | 21 | 21 | 0 | 21/21 | 21/21 | 21/21 |
| royal_homes | 33 | 33 | 0 | 33/33 | 33/33 | 33/33 |
| szepvolgyi | 22 | 22 | 0 | 22/22 | 22/22 | 22/22 |
| szololiget | 21 | 21 | 0 | 21/21 | 21/21 | 21/21 |
| vintage | 18 | 18 | 0 | 18/18 | 18/18 | 18/18 |
| zsalya | 11 | 11 | 0 | 11/11 | 11/11 | 11/11 |

Osszesen: 174 kephez van teljes HU/EN SEO draft, mind `approved:false`.

## D2 kulon kezeles

D2-nel a `seo-test.json` es a `generated.json` sorrendje elter. Emiatt D2-nel nem szabad index / pozicio alapjan mapelni.

D2-nel kizarolag ezek alapjan szabad osszekotni:

- `id`
- `src`
- fajlnev
- konkret vizualis ellenorzes

Pelda elteres:

| Pozicio | seo-test | generated |
| ---: | --- | --- |
| 1 | `dandelion-d2-source-005.webp` | `dandelion-d2-source-001.webp` |
| 2 | `dandelion-d2-source-001.webp` | `dandelion-d2-source-002.webp` |
| 3 | `dandelion-d2-source-002.webp` | `dandelion-d2-source-003.webp` |

## Nemet es cseh helyzet

A korabbi SEO draft forras csak HU/EN mezoket tartalmaz:

- `altHu`
- `titleHu`
- `captionHu`
- `altEn`
- `titleEn`
- `captionEn`

Nincs benne:

- `altDe`
- `titleDe`
- `captionDe`
- `altCs`
- `titleCs`
- `captionCs`

Ez azt jelenti, hogy a nemet/cseh ALT javitas nem egyszeru import. A helyes workflow:

1. HU/EN draft + vizualis kep alapjan ellenorizni, hogy a kepi allitas igaz-e.
2. Csak ellenorzott HU/EN draftbol keszulhet nemet/cseh lokalizalt draft.
3. A nemet/cseh draft is `approved:false` allapotnak szamit.
4. Final registry modositas csak emberi jovahagyas utan tortenhet.

## Minta draftok a fo forrasbol

| Szallas | Elso draft kep | HU ALT draft | EN ALT draft |
| --- | --- | --- | --- |
| d1 | `dandelion-d1-source-001.webp` | Dandelion D1 szurke haz feher keritessel es zold kerttel | Dandelion D1 gray house with white fence and green garden |
| d2 | `dandelion-d2-source-005.webp` | Gyerek szines takaron ul a Dandelion D2 kertjeben egy kosarral es jatekkal | Child sitting on colorful blanket in Dandelion D2 garden with basket and toys |
| fugehaz | `dandelion-fugehaz-source-001.webp` | Fugebokor es a Fugehaz haz homlokzata | Fig bush and the facade of Fugehaz house |
| koveskal | `dandelion-koveskal-source-001.webp` | Dandelion Koveskal terasz szekekkel es asztallal | Dandelion Koveskal terrace with chairs and table |
| royal_homes | `dandelion-royal-homes-source-022.webp` | Tetoteraszos jakuzzi a Dandelion Royal Homes kozos pihenoteren | Rooftop hot tub in the shared relaxation area of Dandelion Royal Homes |
| szepvolgyi | `dandelion-szepvolgyi-source-001.webp` | Szepvolgyi Vendeghaz terasz asztallal es szekkel | Szepvolgyi Guesthouse terrace with table and chairs |
| szololiget | `dandelion-szololiget-source-001.webp` | Tetoteri haloszoba franciaaggyal | Attic bedroom with double bed |
| vintage | `dandelion-vintage-source-006.webp` | Haloszoba fa gerendas mennyezettel es kofalakkal | Bedroom with wooden beams and stone walls |
| zsalya | `dandelion-zsalya-source-001.webp` | Zsalya Vendeghaz haloszobaja franciaaggyal es tetoteri ablakkal | Zsalya Vendeghaz bedroom with a double bed and a skylight window |

Megjegyzes: a fenti mintak nem final szovegek, hanem draft forrasok. Ekezetes megjelenites a terminalban/PowerShellben torzulhat, de a JSON forras UTF-8 tartalmat hordoz.

## Javitas elotti kapuk

A nemet/cseh ALT javitas elott ezeket kell lezarnunk:

1. Forrasdontes: a `seo-test.json` + `gallery-order-tool` legyen-e a fo SEO draft forras.
2. Mapping ellenorzes: minden szallasnal id/fajlnev/src alapon parositas, D2-nel kulon ovatosan.
3. Vizualis ellenorzes: a draftban szereplo allitasok latszanak-e a kepen.
4. Lokalizacios draft: nemet/cseh ALT/title/caption csak ellenorzott tartalombol.
5. Emberi jovahagyas: csak ez utan mehet final registrybe.

### Tulajdonosi dontes - cseh es nemet kepi szovegek

2026-05-25: Csanad jelezte, hogy a cseh kepi szovegekhez nem kell kulon tulajdonosi jovahagyasi kor.
2026-05-25: Csanad jelezte, hogy ugyanez a nemet kepi szovegekre is vonatkozik.

Kovetkezmeny:

- a cseh es nemet `alt` / `title` / `caption` draftok keszithetoek jovahagyasi blocker nelkul;
- a vizualis/tartalmi ellenorzes tovabbra is kotelezo, mert nem kerulhet kepbe nem lathato allitas;
- `approved:true` automatikus beallitasa tovabbra sem tortenhet, hacsak nincs kulon technikai dontes a workflow modositasarol;
- ez a dontes a cseh es nemet kepi szovegekre vonatkozik.

## Javasolt kovetkezo munkacsomag

### 1. Review munkalap DE/CS draft elokesziteshez

Kesziteni egy uj review dokumentumot, nem registry modositast:

```text
project-docs/image-alt-localization-review-de-cs-2026-05-25.md
```

Tartalma szallasonkent:

- kep id
- fajlnev
- jelenlegi live ALT
- HU draft
- EN draft
- javasolt DE draft
- javasolt CS draft
- kockazat / ellenorizendo allitas
- statusz: `draft`, `needs visual review`, `approved by owner`

### 2. Prioritas

Elso kor:

1. DE szallasoldalak elso 8 gallery/preview kepei.
2. CS szallasoldalak elso 8 gallery/preview kepei.
3. D2 csak kulon fajlnev alapu mappinggel.
4. Panorama Pool DE/CS kepek kulon, mert mas image registryt hasznalnak.

### 3. Implementacio csak jovahagyas utan

Ha a review lapot Csanad jovahagyja, akkor lehet:

- `src/data/images/accommodation-images.ts` `alt/title/caption` mezok bovitese `de` es `cs` mezokkel;
- vagy kulon lokalizalt overlay registry bevezetese, ha a fo registry tul nagyra none.

Ebben a korben egyik sem tortent meg.

## Vegso allapot

Forras megvan.

Mapping nagyreszt tiszta.

D2 kulon figyelmet ker.

Nemet/cseh final ALT implementacio nem indulhat automatikus forditassal. A szabalyos kovetkezo lepes egy DE/CS review munkalap keszitese a korabbi HU/EN draftokra es vizualis ellenorzesre epulve.

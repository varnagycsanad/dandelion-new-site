# Archive Decision List - 2026-06-03

Status: AKTUALIS
Last checked: 2026-06-03
Use for: dokumentacios archiválási döntések előkészítése fájlmozgatás előtt
Do not use for: automatikus fájlmozgatási parancsként vagy törlési listaként

## Cel

Ez a dokumentum előkészíti a `project-docs/` rendrakás következő körét.

Fontos: ebben a körben nem mozgatunk és nem törlünk fájlokat. A cél csak annak eldöntése, hogy mely dokumentumok:

- maradjanak a jelenlegi helyükön,
- kerülhetnek később `project-docs/archive/` alá,
- igényelnek hivatkozásjavítást mozgatás előtt,
- vagy inkább összevonandók / rövidítendők.

## Kiinduló állapot

2026-06-03-i dokumentációs állapot:

- Osszes MD fajl: 64 volt az archiválási lista előtt.
- Minden MD fájl kapott egységes `Status`, `Last checked`, `Use for`, `Do not use for` blokkot.
- A `project-docs/INDEX.md` a belépési pont.

Archiválási szempontból elsődleges jelöltek:

- `ARCHIV`: 3 fájl
- `TORTENETI`: 24 fájl

## Mozgatási alapelv

Csak olyan fájlt érdemes mozgatni, amely:

- nem napi source-of-truth,
- nem aktív workflow belépési pont,
- nem gyakran hivatkozott döntési forrás,
- és a hivatkozásai frissíthetők vagy nem kritikusak.

Ha egy fájlra több aktív dokumentum hivatkozik, akkor első körben csak a státusz maradjon, ne legyen mozgatás.

## A. Később biztonságosan archiválható jelöltek

Ezek exportok, régi munkalapok vagy egyértelműen történeti D2/image review dokumentumok. Mozgatásuk várhatóan alacsony kockázatú, de hivatkozáskeresés akkor is kell.

- DONE 2026-06-03: `project-docs/archive/image-workflow/generated/d2-processing-plan-selected.md`
- DONE 2026-06-03: `project-docs/archive/image-workflow/generated/d2-processing-plan-all.md`
- DONE 2026-06-03: `project-docs/archive/image-workflow/source-image-rename-map.md`
- DONE 2026-06-03: `project-docs/archive/image-workflow/d2-runtime-image-admin-bridge-note.md`
- DONE 2026-06-03: `project-docs/archive/image-workflow/d2-image-pilot-closing-report.md`
- DONE 2026-06-03: `project-docs/archive/image-workflow/d2-gallery-selection-review.md`
- DONE 2026-06-03: `project-docs/archive/image-admin-v2-audit-2026-04-30.md`
- DONE 2026-06-03: `project-docs/archive/image-alt/image-alt-cs-draft-batch-1-2026-05-25.md`
- DONE 2026-06-03: `project-docs/archive/image-alt/image-alt-de-draft-batch-1-2026-05-25.md`
- DONE 2026-06-03: `project-docs/archive/image-alt/image-alt-localization-review-de-cs-2026-05-25.md`

Javasolt célmappa később:

```text
project-docs/archive/2026-04/
project-docs/archive/2026-05/
project-docs/archive/image-workflow/
```

## B. Archiválható, de hivatkozásjavítást igényel

Ezekre aktívabb dokumentumok is hivatkozhatnak, ezért mozgatás előtt linkfrissítés kell.

- `project-docs/DANDELION_MASTER_RULES.md`
  - Több szabályfájl említi archív / nem normatív forrásként.
  - Ha mozog, a `README.md`, `DANDELION_CHATGPT_RULES.md` és `project-docs/INDEX.md` hivatkozásait frissíteni kell.

- `project-docs/current-sitemap-audit-2026-05-24.md`
  - Régi sitemap audit, de más lokalizációs audit hivatkozza.
  - Mozgatás előtt a cseh/lokalizációs doksik linkjeit ellenőrizni kell.

- `project-docs/image-workflow/d2-image-seo-review.md`
  - Több Google AI Readiness image SEO audit hivatkozza D2 kontextusként.
  - Mozgatás csak akkor ajánlott, ha a hivatkozások megmaradnak vagy frissülnek.

- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_SOURCE_AUDIT.md`
  - Történeti státuszt kapott, de sok Google AI dokumentum hivatkozza forrásdöntési kontextusként.
  - Inkább maradjon helyben, amíg a Google AI image SEO szál nincs lezárva.

- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md`
  - Draft/review munkalap, de aktív Google AI dokumentumok hivatkozzák.
  - Mozgatás csak a Google AI Readiness image SEO lezárása után.

## C. Maradjon helyben történeti alaptervként

Ezek történeti státuszúak, de a projekt alaplogikáját magyarázzák, és sok gondolkodási döntéshez hasznos kontextust adnak. Nem napi source-of-truth, de nem is zavaró exportok.

- `project-docs/00-projekt-alap.md`
- `project-docs/01-oldalterkep.md`
- `project-docs/02-oldaltipusok-es-blokk-matrix.md`
- `project-docs/03-tartalommodell.md`
- `project-docs/04-navigacios-logika.md`
- `project-docs/05-seo-struktura.md`
- `project-docs/08-ai-codex-workflow.md`
- `project-docs/09-repo-indulas.md`

Javaslat:

- Ne mozgassuk őket az első archiválási körben.
- Az `INDEX.md` jelezze, hogy történeti alapdoksik.
- Később esetleg egy `project-docs/foundation/` mappa lehet jobb, mint az `archive/`.

## D. Maradjon helyben egyelőre

Ezek nem feltétlenül napi források, de még lehet élő munkaszál vagy ellenőrzési kontextus.

- `project-docs/06-foglalasi-cta-logika.md`
- `project-docs/archive/accommodations/11-szallasok-oldal-audit-es-megvalositasi-terv.md`
- `project-docs/13-nemet-lokalizacios-megvalositasi-terv.md`
- DONE 2026-06-03: `project-docs/archive/localization/german-umlaut-audit-2026-05-25.md`
- DONE 2026-06-03: `project-docs/archive/google-ai-readiness/GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md`
- DONE 2026-06-03: `project-docs/archive/image-alt/image-alt-seo-audit-2026-05-25.md`
- DONE 2026-06-03: `project-docs/archive/image-alt/image-alt-seo-source-and-localization-audit-2026-05-25.md`

Javaslat:

- Maradjanak helyben, amíg nincs külön német/lokalizációs/image SEO záró audit.

## E. Első valódi mozgatási csomag

2026-06-03-an az első pilot csomag lefutott:

```text
project-docs/archive/image-workflow/generated/d2-processing-plan-selected.md
project-docs/archive/image-workflow/generated/d2-processing-plan-all.md
project-docs/archive/image-workflow/source-image-rename-map.md
project-docs/archive/image-workflow/d2-runtime-image-admin-bridge-note.md
```

Miért ezek voltak a pilot fájlok?

- Mind történeti / archív jellegűek.
- Nem napi belépési pontok.
- A D2 processing/export kontextus jól elkülöníthető.

Pilot előtti hivatkozáskeresés:

```powershell
rg -n "d2-processing-plan-selected|d2-processing-plan-all|source-image-rename-map|d2-runtime-image-admin-bridge-note" project-docs README.md AGENT.md DANDELION_RULES.md DANDELION_CHATGPT_RULES.md
```

Pilot utáni hivatkozáskeresés eredménye:

- Eredmeny 2026-06-03: regi utvonalon nem maradt eles hivatkozas.
- Az `INDEX.md`, a Google AI image SEO forrasaudit es a D2 pilot zarojelentes mar az archive alatti uj utvonalakra mutat.

## Következő lépés

Negyedik archiválási kör előtt:

1. Válasszunk ki legfeljebb 4-6 fájlt.
2. Futtassunk hivatkozáskeresést.
3. Mozgassuk csak ezeket.
4. Frissítsük az `INDEX.md`-t.
5. Ellenőrizzük, hogy minden MD fájl továbbra is kapott státuszt.

# German Umlaut Audit - 2026-05-25

Status: TORTENETI
Last checked: 2026-06-02
Use for: nemet umlaut audit eredmenyek kontextusa
Do not use for: aktualis nemet copy QA helyettesitesere


## Scope

Audit target: the German site branch under `src/pages/de`, German accommodation data under `src/data/accommodation-pages/*.de.ts`, plus shared German text in `src/components/SiteFooter.astro` and `src/templates/AccommodationPage.astro`.

Purpose: find visible German copy where umlauts and sharp-s are written as ASCII transliterations (`ae`, `oe`, `ue`, `ss`) or as plain letters (`u`, `a`) instead of proper German spelling.

## Executive Summary

The issue is systemic, not isolated to the homepage hero. The German branch contains a large number of visible German texts written in ASCII-transliterated form.

Detected volume:

- 771 suspicious umlaut/sharp-s occurrences
- 487 affected source lines
- 32 affected German/shared source files

Important note: URL paths/slugs such as `/de/unterkuenfte/` and `/de/weingueter/` may intentionally stay ASCII for stable routing. The visible labels, titles, meta copy, alt text, aria labels, legal text and structured content should use proper German characters.

## High-Priority Visible Errors

These are directly visible in navigation, hero, page titles, cards, CTA labels or repeated UI:

| Current | Correct |
| --- | --- |
| Unterkuenfte / Unterkunfte | Unterkünfte |
| Dandelion Gastehauser | Dandelion Gästehäuser |
| Gaeste / Gaste | Gäste |
| fuer / fur | für |
| Huegel | Hügel |
| Weingueter | Weingüter |
| Kueche | Küche |
| Ausfluege | Ausflüge |
| Zurueck | Zurück |
| Naehe | Nähe |
| Straende | Strände |
| Raeume / Innenraeume | Räume / Innenräume |
| Ueberdachte / ueberdachte | Überdachte / überdachte |
| waehlen | wählen |
| oeffnen | öffnen |
| gross / Gross / Grosses | groß / Groß / Großes |
| Strassen / Dorfstrassen | Straßen / Dorfstraßen |
| draussen | draußen |

## Most Affected Files

Counts below are affected lines, not total word occurrences.

| Lines | File |
| ---: | --- |
| 65 | `src/data/accommodation-pages/d2.de.ts` |
| 65 | `src/templates/AccommodationPage.astro` |
| 59 | `src/pages/de/datenschutz.astro` |
| 50 | `src/pages/de/agb.astro` |
| 28 | `src/pages/de/index.astro` |
| 16 | `src/data/accommodation-pages/zsalya.de.ts` |
| 15 | `src/data/accommodation-pages/royal_homes.de.ts` |
| 15 | `src/pages/de/fahrradverleih.astro` |
| 15 | `src/data/accommodation-pages/d1.de.ts` |
| 14 | `src/pages/de/balaton.astro` |
| 14 | `src/pages/de/weingueter.astro` |
| 14 | `src/data/accommodation-pages/koveskal.de.ts` |
| 14 | `src/data/accommodation-pages/fugehaz.de.ts` |
| 13 | `src/data/accommodation-pages/vintage.de.ts` |
| 13 | `src/pages/de/zeugenberge.astro` |
| 12 | `src/data/accommodation-pages/szololiget.de.ts` |
| 12 | `src/pages/de/erlebnisse.astro` |
| 12 | `src/data/accommodation-pages/szepvolgyi.de.ts` |
| 11 | `src/pages/de/panorama-pool.astro` |
| 9 | `src/pages/de/impressum.astro` |
| 6 | `src/components/SiteFooter.astro` |
| 4 | `src/pages/de/kontakt.astro` |
| 2 | `src/pages/de/unterkuenfte.astro` |

Single-line route wrapper pages also contain affected URL props or visible imported page content references: `src/pages/de/dandelion-d1.astro`, `dandelion-d2.astro`, `dandelion-fugehaz.astro`, `dandelion-koveskal.astro`, `dandelion-vintage.astro`, `dandelion-zsalya.astro`, `royal.astro`, `szepvolgyi.astro`, `szololiget.astro`.

## Concrete Examples

Homepage:

- `src/pages/de/index.astro:17` - `Dandelion Gastehauser | Unterkuenfte am Balaton` -> `Dandelion Gästehäuser | Unterkünfte am Balaton`
- `src/pages/de/index.astro:115` - `Gastehauser` -> `Gästehäuser`
- `src/pages/de/index.astro:119` - `Unterkuenfte ansehen` -> `Unterkünfte ansehen`
- `src/pages/de/index.astro:183` - `waehlen` -> `wählen`

Footer:

- `src/components/SiteFooter.astro:198` - `Unterkunfte` -> `Unterkünfte`
- `src/components/SiteFooter.astro:281` - `Dandelion Gastehauser Startseite` -> `Dandelion Gästehäuser Startseite`
- `src/components/SiteFooter.astro:282` - `Dandelion Gastehauser` -> `Dandelion Gästehäuser`
- `src/components/SiteFooter.astro:288` - `Unterkunfte` -> `Unterkünfte`

Accommodation listing:

- `src/pages/de/unterkuenfte.astro:85` - `Unterkunfte` -> `Unterkünfte`
- `src/pages/de/unterkuenfte.astro:89` - `fuehrt` -> `führt`

Accommodation template:

- `src/templates/AccommodationPage.astro:72` - `Entscheidungsuebersicht` -> `Entscheidungsübersicht`
- `src/templates/AccommodationPage.astro:73` - `Kurzueberblick` -> `Kurzüberblick`
- `src/templates/AccommodationPage.astro:75` - `Zurueck zu den Unterkuenften.` -> `Zurück zu den Unterkünften.`
- `src/templates/AccommodationPage.astro:408` - `Gaestebewertungen mobile Ansicht` -> `Gästebewertungen mobile Ansicht`

Legal pages:

- `src/pages/de/agb.astro:163` - `Allgemeine Geschaeftsbedingungen | Dandelion Unterkuenfte` -> `Allgemeine Geschäftsbedingungen | Dandelion Unterkünfte`
- `src/pages/de/agb.astro:170` - `Gueltigkeit`, `Gueltig`, `Geaendert` -> `Gültigkeit`, `Gültig`, `Geändert`
- `src/pages/de/datenschutz.astro:191` - `Datenschutzerklaerung | Dandelion Unterkuenfte` -> `Datenschutzerklärung | Dandelion Unterkünfte`
- `src/pages/de/datenschutz.astro:198` - `Abschnitt waehlen` -> `Abschnitt wählen`

Experience pages:

- `src/pages/de/weingueter.astro:8` - `Weingueter` -> `Weingüter`
- `src/pages/de/balaton.astro:8` - `Straende` -> `Strände`
- `src/pages/de/fahrradverleih.astro:12` - `Raedern` -> `Rädern`
- `src/pages/de/zeugenberge.astro:19` - `Panorama ueber...` -> `Panorama über...`
- `src/pages/de/panorama-pool.astro:37` - `D1 oeffnen` -> `D1 öffnen`

Accommodation data:

- `src/data/accommodation-pages/d2.de.ts:39` - `Gaestebewertungen` -> `Gästebewertungen`
- `src/data/accommodation-pages/d2.de.ts:76` - `Raeume fuer Familien` -> `Räume für Familien`
- `src/data/accommodation-pages/d1.de.ts:34` - `Grosser Garten`, `Kueche` -> `Großer Garten`, `Küche`
- `src/data/accommodation-pages/vintage.de.ts:34` - `Gemuetliche Innenraeume`, `Kueche` -> `Gemütliche Innenräume`, `Küche`
- `src/data/accommodation-pages/zsalya.de.ts:34` - `Ueberdachte Terrasse`, `fuer Ausfluege` -> `Überdachte Terrasse`, `für Ausflüge`

## Correction Rules

Use proper German spelling in every user-visible string:

- `ae` -> `ä` where it represents an umlaut: `Gaeste` -> `Gäste`, `Naehe` -> `Nähe`, `waehlen` -> `wählen`
- `oe` -> `ö`: `koennen` -> `können`, `moechten` -> `möchten`, `oeffnen` -> `öffnen`
- `ue` -> `ü`: `fuer` -> `für`, `Kueche` -> `Küche`, `Huegel` -> `Hügel`
- `ss` -> `ß` where German orthography requires it: `gross` -> `groß`, `Strasse` -> `Straße`, `draussen` -> `draußen`
- Plain missing umlaut also needs fixing: `fur` -> `für`, `Gaste` -> `Gäste`, `Unterkunfte` -> `Unterkünfte`, `Uberdachte` -> `Überdachte`

Do not blindly replace all `ue/oe/ae/ss` in code. Some are intentional or technical:

- URL slugs and hrefs: `/de/unterkuenfte/`, `/de/weingueter/`
- variable names and code identifiers: `querySelector`, `withoutQuery`, `mobileDetailsQuery`
- English text in non-German branches: `Guesthouses`, `guests`
- names where the source form is intentional, if any

## Recommended Fix Order

1. Fix shared German chrome first: `src/components/SiteFooter.astro`, `src/templates/AccommodationPage.astro`, SEO/meta defaults.
2. Fix the German homepage and accommodation listing: `src/pages/de/index.astro`, `src/pages/de/unterkuenfte.astro`.
3. Fix German accommodation data: all `src/data/accommodation-pages/*.de.ts`.
4. Fix German experience pages: `balaton`, `erlebnisse`, `fahrradverleih`, `weingueter`, `zeugenberge`, `panorama-pool`.
5. Fix legal pages carefully: `agb.astro`, `datenschutz.astro`, `impressum.astro`; these need a slower review because legal text contains many formal terms.
6. Rebuild and audit `dist/de` to confirm no visible ASCII umlaut forms remain outside intentional URLs.

## Verification Command Used

```powershell
$files = @(Get-ChildItem -File src\pages\de\*.astro) + @(Get-ChildItem -File src\data\accommodation-pages\*.de.ts) + @(Get-Item src\components\SiteFooter.astro) + @(Get-Item src\templates\AccommodationPage.astro)
$pattern='\b[A-Za-z]*(?:ae|oe|ue|Ae|Oe|Ue)[A-Za-z]*\b|\b(?:Gross|gross|Strasse|strasse|Massnahmen|Loeschung|Schlussel|Schluessel|Fuss|fuss)\b'
Select-String -Path $files.FullName -Pattern $pattern -AllMatches
```

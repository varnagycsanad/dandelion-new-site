# Character Encoding Audit and Multilingual Rules

Date: 2026-05-25

Scope: project Markdown rules and public localization text for Hungarian, German, English, Czech, and future Slovak and Polish versions.

## Executive Summary

The project standard must be UTF-8 everywhere: source files, Markdown documentation, Astro pages, TypeScript data files, JSON files, generated HTML, and translation content.

The previous rule was too narrow because it treated Hungarian accents as the main accepted non-ASCII case. The site is now multilingual, so correct language-specific diacritics are required in visible copy, metadata, image ALT text, captions, legal pages, navigation, CTAs, and accommodation data.

## Current Audit Notes

- `AGENT.md` already had a UTF-8 rule, but it mainly mentioned Hungarian accents and generic Unicode.
- The German live-site audit found ASCII transliterations such as `Unterkuenfte`, `Gastehauser`, `fuer`, `Verfugbarkeit prufen`, `Fugehaz`, `Koveskal`, and `Szent Gyorgy-hegy`.
- The Czech localization work introduced the same risk for words such as `ubytovani`, `prirodni`, and `svedecne hory`.
- English pages may still contain Hungarian place names and brand/property names; those names must keep their original accents where the real name has them.

## Global Rule

All text files must be encoded as UTF-8 without content-level mojibake.

Correct Unicode text is not an encoding error. A non-ASCII character is allowed when it is the correct character for the language, place name, person name, brand name, legal text, or typography.

## Language-Specific Character Rules

| Language | Code | Required visible writing system | Examples that must be accepted |
| --- | --- | --- | --- |
| Hungarian | `hu` | Hungarian accents | `á é í ó ö ő ú ü ű`, `Á É Í Ó Ö Ő Ú Ü Ű` |
| German | `de` | German umlauts and Eszett | `ä ö ü Ä Ö Ü ß` |
| English | `en` | English base Latin, plus original names | `Kisapáti`, `Köveskál`, `Szent György-hegy`, `Fügeház` |
| Czech | `cs` | Czech diacritics | `á č ď é ě í ň ó ř š ť ú ů ý ž`, uppercase variants |
| Slovak | `sk` | Slovak diacritics | `á ä č ď é í ĺ ľ ň ó ô ŕ š ť ú ý ž`, uppercase variants |
| Polish | `pl` | Polish diacritics | `ą ć ę ł ń ó ś ź ż`, uppercase variants |

## German Rules

Visible German text must use German characters, not ASCII fallback forms.

Use:

- `Unterkünfte`, not `Unterkuenfte` or `Unterkunfte`
- `Gäste`, not `Gaeste` or `Gaste`
- `Gästehäuser`, not `Gastehauser`
- `für`, not `fuer`
- `Küche`, not `Kueche`
- `Verfügbarkeit prüfen`, not `Verfugbarkeit prufen`
- `Weingüter`, not `Weingueter`
- `öffnen`, not `oeffnen`
- `schließen`, not `schliessen`, unless Swiss German is intentionally chosen

Hungarian property and place names in German text must also keep their original characters:

- `Dandelion Fügeház`
- `Dandelion Zsálya`
- `Dandelion Szőlőliget`
- `Dandelion Szépvölgyi`
- `Dandelion Köveskál`
- `Szent György-hegy`
- `Káli-Becken` or `Káli-medence`, depending on the chosen German wording

## Czech Rules

Visible Czech text must use Czech diacritics.

Use:

- `ubytování`, not `ubytovani`
- `přírodní`, not `prirodni`
- `svědecké hory`, not `svedecne hory`
- `půjčovna kol`, not `pujcovna kol`
- `vinařství`, not `vinarstvi`
- `zážitky`, not `zazitky`

Hungarian property and place names should keep their original local spelling unless a deliberate localized form is approved.

## English Rules

English common words normally use plain English spelling. However, proper names must remain faithful to the original.

Use:

- `Kisapáti`, not `Kisapati`
- `Köveskál`, not `Koveskal`
- `Szent György-hegy`, not `Szent Gyorgy-hegy`
- `Fügeház`, not `Fugehaz`
- `Zsálya`, not `Zsalya`
- `Szőlőliget`, not `Szololiget`
- `Szépvölgyi`, not `Szepvolgyi`

## Future Slovak Rules

When Slovak pages are added, visible Slovak text must use Slovak diacritics. Do not prepare Slovak content by stripping accents for convenience.

Examples:

- `ubytovanie`
- `zážitky`
- `požičovňa bicyklov`
- `vinárstva`
- `jazero Balaton`

Hungarian property and place names remain in their original spelling unless a reviewed Slovak localization rule says otherwise.

## Future Polish Rules

When Polish pages are added, visible Polish text must use Polish diacritics. Do not prepare Polish content by stripping accents for convenience.

Examples:

- `noclegi`
- `atrakcje`
- `wypożyczalnia rowerów`
- `winnice`
- `jezioro Balaton`

Hungarian property and place names remain in their original spelling unless a reviewed Polish localization rule says otherwise.

## Technical Exceptions

The following may remain ASCII-only:

- URL slugs: `/de/unterkuenfte/`, `/cs/ubytovani/`
- file names and import paths
- image asset names
- CSS classes and IDs
- internal object keys
- API parameters
- third-party URLs
- generated hashes

Important distinction: an ASCII URL slug can be acceptable while the visible page title must still be localized correctly. Example: `/de/unterkuenfte/` is acceptable; visible text should be `Unterkünfte`.

## Encoding Error Patterns

These are errors and must be treated as encoding problems:

- replacement character: `�`
- mojibake fragments: `Ã¡`, `Ã©`, `Ã¶`, `Ã¼`, `Ăł`, `Ĺ`, `Ä`, `â€`
- mixed broken strings where a known word becomes unreadable

These are localization quality errors in visible copy:

- German ASCII fallback: `fuer`, `Gaeste`, `Unterkuenfte`
- Czech ASCII fallback: `ubytovani`, `prirodni`, `svedecne`
- stripped Hungarian names: `Koveskal`, `Fugehaz`, `Szololiget`

## Review Checklist

Before finishing a localization task:

1. Confirm all edited files are saved as UTF-8.
2. Search visible copy for known ASCII fallbacks in the target language.
3. Check titles, meta descriptions, navigation, CTAs, cards, image ALT text, captions, legal text, and accommodation data.
4. Keep technical slugs and filenames stable unless the task explicitly asks to change routing or assets.
5. If mojibake appears in an edited line, stop and report `ENCODING ERROR DETECTED`.


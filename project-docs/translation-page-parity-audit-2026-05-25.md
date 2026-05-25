# Translation Page Parity Audit - 2026-05-25

Scope: compare Hungarian source pages against English, German and Czech translated pages after the translation rollout. Checks covered physical Astro routes, `LOCALIZED_ROUTE_PAIRS`, sitemap coverage, footer/legal links, homepage blocks, experience pages and accommodation page data shape.

Build status: `npm run build` passed. Astro built 89 pages successfully.

## Executive Summary

There is no global build failure, but the translated site is not fully content-parity with Hungarian.

Highest priority gaps:

1. Czech legal pages are missing completely.
   - No Czech equivalents for `/aszf/`, `/adatkezelesi-tajekoztato/`, `/impresszum/`.
   - `LOCALIZED_ROUTE_PAIRS` also has no `cs` entries for these routes.
   - Czech footer has no legal block, while HU/EN/DE do.

2. Czech Panorama Pool page is missing.
   - HU, EN and DE have `/panorama-pool/`, `/en/panorama-pool/`, `/de/panorama-pool/`.
   - No `/cs/panorama-pool/` page and no `cs` alternate.

3. Translated homepages are structurally lighter than the Hungarian homepage.
   - HU has `PanoramaPoolHighlight`, guest review block, region guide, `NewsletterSignup`, and `GoogleRegionMap`.
   - EN/DE/CS homepages do not include those blocks.
   - This confirms the example issue: the homepage pool block is missing from translated homepages.

4. German and Czech accommodation pages exist, but are generated through shorter factory profiles.
   - They use default generic review arrays and shared related-stay lists.
   - They do render the shared accommodation template, but copy depth is lower than HU and often lower than EN.
   - For D1/D2/Fugehaz, pool messaging exists via the factory if the English base has `poolHighlight`, but it links to listing pages instead of a dedicated localized pool page.

5. Sitemap/source mismatch for Hungarian canonical aliases.
   - `/dandelion-szepvolgyi-vendeghaz/` and `/dandelion-szololiget/` exist physically but are not in `SITEMAP_PATHS`.
   - These appear to be canonical alias pages, so this may be intentional, but it should be confirmed.

## Route Count

Physical Astro page route counts:

- HU public routes: 23
- EN routes: 21
- DE routes: 21
- CS routes: 17
- Guide/internal routes: 7

Main missing translated routes:

- CS missing `/cs/panorama-pool/`
- CS missing legal pages:
  - terms and conditions equivalent
  - privacy policy equivalent
  - imprint/impressum equivalent

## Localized Route Pair Gaps

In `src/data/site-seo.ts`:

- `/panorama-pool/` has HU/EN/DE only.
- `/aszf/` has HU/EN/DE only.
- `/adatkezelesi-tajekoztato/` has HU/EN/DE only.
- `/impresszum/` has HU/EN/DE only.

Impact:

- Czech pages do not get hreflang alternates for those page families.
- Header language switcher cannot point to Czech legal/pool equivalents because the route pair is absent.
- Sitemap cannot include Czech pages because they do not exist.

## Footer / Legal

HU footer has legal links:

- ASZF
- Adatkezelesi tajekoztato
- Impresszum

EN footer has legal links:

- Terms and Conditions
- Privacy Policy
- Imprint

DE footer has legal links:

- AGB
- Datenschutz
- Impressum

CS footer currently has:

- accommodation links
- useful links
- language links
- no legal section

Recommended fix:

1. Create Czech legal pages.
2. Add Czech legal links to `SiteFooter.astro`.
3. Add Czech route pairs to `LOCALIZED_ROUTE_PAIRS`.
4. Add Czech legal paths to `SITEMAP_PATHS`.

## Homepage Block Parity

Hungarian homepage includes:

- `Hero`
- `PanoramaPoolHighlight`
- guest reviews section (`d2-reviews`)
- region guide section (`d2-region-guide`)
- `RegionStories`
- `Experiences`
- `NewsletterSignup`
- `GoogleRegionMap`

EN/DE/CS homepages include:

- `Hero`
- intro section
- `RegionStories`
- `Experiences`
- gallery section
- booking/contact section

Missing from EN/DE/CS compared to HU:

- `PanoramaPoolHighlight`
- guest review block
- region guide block
- `NewsletterSignup`
- `GoogleRegionMap`

Recommendation:

- First add `PanoramaPoolHighlight` to EN/DE/CS homepages, because it is a live product/amenity gap.
- Then decide whether guest reviews, newsletter and map should be fully localized or intentionally HU-only.

## Accommodation Page Parity

All 9 main accommodation pages exist in EN/DE/CS:

- D1
- D2
- Fugehaz
- Zsalya
- Szololiget
- Szepvolgyi
- Royal Homes
- Vintage
- Koveskal

Findings:

- EN pages are mostly full translated data files and closer to HU.
- DE/CS pages mostly use `createGermanAccommodationPage` and `createCzechAccommodationPage`.
- The factories provide a complete renderable page, but with generic defaults:
  - German default reviews: 3 items shared across pages.
  - Czech default reviews: 3 items shared across pages.
  - Related stays are shared and sliced to 5.
  - Profiles often have shorter `longDescription` and fewer highlights than HU.
- `positioning` data is present in HU but absent in EN/DE/CS. If a future template uses `positioning` directly, translated pages will not match.

Pool-related accommodation notes:

- HU D1, D2 and Fugehaz have `hero.poolHighlight`.
- EN D1, D2 and Fugehaz also have `hero.poolHighlight`.
- DE/CS factory preserves a pool highlight when the base English data has it.
- But DE/CS pool CTA points to accommodation listing pages, not to a dedicated localized pool page. For CS this is because no Czech pool page exists.

Recommendation:

1. Keep the factories if speed matters, but enrich DE/CS profile data with page-specific reviews and longer translated descriptions.
2. Once `/cs/panorama-pool/` exists, update Czech pool CTA hrefs.
3. Consider a localized `positioning` field for EN/DE/CS if it is used for SEO/AI/readiness content.

## Experience Page Parity

EN pages are generally closer to standalone translated pages.

DE/CS experience detail pages often use localized shared templates:

- `GermanExperiencePage`
- `CzechExperiencePage`

This means component signatures differ from HU, but not necessarily broken. Content parity should be judged semantically rather than exact component names.

Notable structural difference:

- Hungarian pages use individual page-specific sections/classes.
- German/Czech use template-driven compact pages.

Recommendation:

- If parity means "same amount of content and same blocks", expand DE/CS experience pages.
- If parity means "translated landing page exists and covers the topic", they pass.

## Sitemap Findings

`SITEMAP_PATHS` includes all major translated pages that physically exist.

Physical pages not in sitemap:

- `/dandelion-szepvolgyi-vendeghaz/`
- `/dandelion-szololiget/`

These are likely canonical alias pages because canonical routes are `/szepvolgyi/` and `/szololiget/`. Confirm intent; if alias pages are `noindex`, no action needed.

## Suggested Fix Order

1. Add Czech legal pages and footer legal links.
2. Add Czech Panorama Pool page and route pair.
3. Add `PanoramaPoolHighlight` to EN/DE/CS homepages.
4. Decide whether to localize HU homepage review/map/newsletter blocks or mark them intentionally HU-only.
5. Enrich DE/CS accommodation profile data where marketing depth matters.
6. Confirm sitemap alias policy for Hungarian duplicate accommodation routes.


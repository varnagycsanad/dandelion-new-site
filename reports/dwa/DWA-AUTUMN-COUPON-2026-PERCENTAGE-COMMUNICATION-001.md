# DWA receipt — 2026 autumn coupon percentage communication

Status: local checkout updated and verified. No commit, push, deploy, live-site write, or external-platform write command was issued by this run.

Boundary exception observed at final readback: the turn started with HEAD `55cdf33`, while the checkout now shows `2dcad92` (`Clarify autumn coupon communication`) and `origin/main` points to the same commit. I did not invoke `git commit`, `git push`, or deploy; `git reflog` records the commit during the delegated work. This externally observed repository-state change is preserved and flagged for follow-up before publication.

## Scope implemented

- The two autumn offer pages are covered in HU/EN/DE/CZ/SK:
  - HU: `/ajanlatok/oszi-kettesben/`, `/ajanlatok/oszi-csaladi-pihenes/`
  - EN: `/en/offers/autumn-for-two/`, `/en/offers/autumn-family-break/`
  - DE: `/de/angebote/herbst-zu-zweit/`, `/de/angebote/herbst-familie/`
  - CZ: `/cs/nabidky/podzim-ve-dvou/`, `/cs/nabidky/podzimni-rodinny-pobyt/`
  - SK: `/sk/ponuky/jesenny-pobyt-vo-dvojici/`, `/sk/ponuky/jesenny-rodinny-pobyt/`
- The seven eligible house routes remain covered in all five locales: D1, D2, Fügeház, Zsálya, Vintage, Royal Homes, and Szépvölgyi (35 generated routes total).
- `/szololiget/` and `/dandelion-koveskal/`, with their EN/DE/CZ/SK equivalents, remain excluded (10 generated routes total).
- An exact route whitelist was added so the noindex legacy alias `/dandelion-szepvolgyi-vendeghaz/` does not inherit the coupon from its booking-room ID.
- The three former percentage-bearing template points are now percentage-free in the rendered offer pages:
  - hero value: neutral `↗` marker and localized direct-booking wording;
  - price dialog stat: neutral direct-booking wording;
  - booking benefit block: neutral direct-booking wording.
- The only visible percentage in the offer-page campaign communication is the standalone 5% coupon block. Coupon titles no longer use additive-sounding “extra 5%” language.
- Coupon code, stay period, redemption deadline, direct-website eligibility, no-minimum-night condition, portal/phone/email exclusions, and retroactive-use exclusion remain in the localized coupon component.
- Booking URLs and booking/tracking attributes were preserved. Coupon redemption is not measured as a booking click.

## Files in scope

- `src/components/campaign/AutumnCouponBlock.astro` — standalone 5% wording in five languages and unchanged campaign terms.
- `src/data/offers/autumn-multihouse-localized.ts` — localized neutral direct-booking fallback applied to both autumn offer copy sets.
- `src/templates/AutumnMultiHouseOfferPage.astro` — neutral markers in the hero, price dialog, and booking-benefit template points.
- `src/templates/AccommodationPage.astro` — exact 35-route coupon whitelist; excludes legacy aliases and the two prohibited houses.
- `src/data/offers/autumn-2026-localized.ts` and `src/data/offers/autumn-2026.ts` were already dirty in the checkout and were preserved; their broader campaign data was not rewritten as part of this percentage-communication refinement.

## Verification

- `npm run check` — PASS. Root deploy check passed.
- `npm run build` — PASS. 154 pages built. Two pre-existing route-conflict warnings remain for `/guide/d1/medence` and `/guide/d1/aszf`; no build failure.
- `npm run test:tracking` — PASS, 3/3 tests.
- `git diff --check` — PASS; only normal LF/CRLF conversion warnings were reported.
- Generated route scan — PASS:
  - 10 autumn offer pages contain `26osz5` and a 5% coupon;
  - all 10 contain no numeric 8% or 13% and no `extra 5` wording;
  - 50 positive generated pages contain the code and the localized 2026/date, deadline, portal-exclusion, and no-minimum-night terms;
  - 35 eligible house routes contain the coupon;
  - 10 excluded routes contain neither the code nor a coupon block;
  - the legacy noindex Szépvölgyi alias is excluded by the exact route whitelist.
- Browser QA — PASS:
  - focused final sample: 6/6 checks, using a fresh tab after build;
  - HU offer desktop/mobile at 1440×900 and 390×844;
  - EN offer desktop/mobile at 1440×900 and 390×844;
  - HU D1 house desktop/mobile at 1440×900 and 390×844;
  - each sample had a visible coupon and 5%, no fixed coupon, no horizontal overflow; offer samples had no 8%/13% and no percentage in the neutral template points;
  - browser console warnings/errors: 0.
- QA note: the first broad browser loop hit `Unknown tab: 1` because of a stale tab handle. It was not a site failure; a fresh tab was used, and the final focused 6/6 QA passed.

## Working-tree boundary

The checkout remains on `main` with existing dirty and untracked files preserved. No commit, push, route switch, deploy, live-site write, or external platform write command was made by this run. Final state readback: HEAD `2dcad92`, `origin/main` `2dcad92`; see the boundary exception above.

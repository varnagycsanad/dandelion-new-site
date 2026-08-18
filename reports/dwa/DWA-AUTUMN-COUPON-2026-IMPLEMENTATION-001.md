# DWA – 2026 autumn 5% coupon implementation

Date: 2026-08-16
Status: local source implementation and verification complete
Coupon: `26osz5`
Scope: HU / EN / DE / CZ / SK, with the user-approved international extension

## Implemented

- Added one shared, localized `AutumnCouponBlock` with the approved conditions and collapsible terms.
- Homepage: one coupon strip above the two autumn cards, with no additional booking CTA and no fixed coupon badge.
- Both autumn offer pages: one block after the hero lead and one block near the direct-booking CTA.
- Seven eligible accommodation pages: one block directly below the hero booking CTA.
- Excluded `Szőlőliget` and `Köveskál` in every locale through the existing selected-room whitelist.
- Preserved the existing 8% direct-booking benefit as a separate message; no 8% + 5% or 13% claim was added.
- Preserved existing booking links, CTA attributes, and tracking contracts. No coupon redemption event was introduced; a booking click remains a booking click, not redemption measurement.

## Files touched for this implementation

- `src/components/campaign/AutumnCouponBlock.astro` – five-language copy, conditions, responsive/static presentation.
- `src/sections/AutumnCampaignOffers.astro` – localized homepage placement.
- `src/templates/AutumnMultiHouseOfferPage.astro` – localized hero and booking-area placements.
- `src/templates/AccommodationPage.astro` – all-locale eligible-room gate and hero-CTA placement.

The checkout already contained unrelated dirty files before this work, including autumn offer data, temporary files, reference files, and prior reports. Those were preserved and not reset, overwritten, committed, pushed, deployed, or route-switched.

## Routes

Each locale has 10 positive routes: homepage, two autumn offers, and seven eligible houses. Total: 50 positive routes.

- HU: `/`; `/ajanlatok/oszi-kettesben/`; `/ajanlatok/oszi-csaladi-pihenes/`; `/dandelion-d1/`; `/dandelion-d2/`; `/fuge/`; `/dandelion-zsalya/`; `/dandelion-vintage/`; `/royal/`; `/szepvolgyi/`.
- EN: `/en/`; `/en/offers/autumn-for-two/`; `/en/offers/autumn-family-break/`; `/en/dandelion-d1/`; `/en/dandelion-d2/`; `/en/dandelion-fugehaz/`; `/en/dandelion-zsalya/`; `/en/dandelion-vintage/`; `/en/royal/`; `/en/szepvolgyi/`.
- DE: `/de/`; `/de/angebote/herbst-zu-zweit/`; `/de/angebote/herbst-familie/`; `/de/dandelion-d1/`; `/de/dandelion-d2/`; `/de/dandelion-fugehaz/`; `/de/dandelion-zsalya/`; `/de/dandelion-vintage/`; `/de/royal/`; `/de/szepvolgyi/`.
- CZ: `/cs/`; `/cs/nabidky/podzim-ve-dvou/`; `/cs/nabidky/podzimni-rodinny-pobyt/`; `/cs/dandelion-d1/`; `/cs/dandelion-d2/`; `/cs/dandelion-fugehaz/`; `/cs/dandelion-zsalya/`; `/cs/dandelion-vintage/`; `/cs/royal/`; `/cs/szepvolgyi/`.
- SK: `/sk/`; `/sk/ponuky/jesenny-pobyt-vo-dvojici/`; `/sk/ponuky/jesenny-rodinny-pobyt/`; `/sk/dandelion-d1/`; `/sk/dandelion-d2/`; `/sk/dandelion-fugehaz/`; `/sk/dandelion-zsalya/`; `/sk/dandelion-vintage/`; `/sk/royal/`; `/sk/szepvolgyi/`.

Excluded in every locale: `/szololiget/`, `/dandelion-koveskal/` and their `/en/`, `/de/`, `/cs/`, and `/sk/` counterparts. Total: 10 excluded routes.

## Verification

- `npm run check` – PASS; root deploy/readiness checks passed.
- `npm run build` – PASS; 154 pages built. The build emitted the pre-existing guide-route conflict warnings for `/guide/d1/medence` and `/guide/d1/aszf`; no build failure occurred.
- `npm run test:tracking` – PASS, 3/3; booking/phone/email attribution tests remained green.
- `git diff --check` – PASS; no whitespace errors.
- Generated `dist` route scan – PASS: 50 positive routes contained the expected code counts (1 homepage, 2 offer-page blocks, 1 house block); all 10 excluded routes contained zero occurrences.
- Generated content scan – PASS on all 50 positive routes: code, stay window, redemption deadline, no minimum-night condition, direct-website-only condition, phone/email/Booking.com/Airbnb/other-portal exclusions, retroactive-use exclusion, and no `13%` / `13 %` claim.
- Local HTTP scan against preview `http://127.0.0.1:4322` – PASS: all 60 affected routes returned HTTP 200; 50 had the code and 10 excluded routes did not.
- Responsive browser QA – PASS on 30 representative route checks (5 locales × homepage/offer/house × desktop 1440×900 and mobile 390×844): coupon blocks were visible in static flow, home strip preceded the mobile cards and desktop autumn cards, offer blocks stayed in hero/booking flow, house blocks followed the hero CTA, no horizontal overflow was detected, and coupon positions were never `fixed`.
- Browser console note: one media `AbortError` appeared while rapidly navigating between local preview routes; no coupon/template runtime error appeared.

## Boundaries and remaining gate

- No live-site write, external platform write, commit, push, deploy, or route switch was performed.
- SabeeApp-side creation/eligibility of `26osz5` was not verified here; this receipt proves source copy, route gating, placement, and local build/QA only. Actual redemption still requires a separate SabeeApp check.


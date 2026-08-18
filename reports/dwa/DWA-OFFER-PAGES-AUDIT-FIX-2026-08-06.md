# DWA offer-page audit fix handoff

Artifact: `DWA-OFFER-PAGES-AUDIT-FIX-2026-08-06`
Status: `READY_WITH_WARNINGS`
Scope: source fix and QA only; no push, deploy, or live route switch.

## Changed source files

- `src/data/offers/autumn-2026.ts`
  - Updated the Hungarian pair and family SEO title and meta description to page-level, eight-house positioning.
- `src/data/offers/autumn-2026-localized.ts`
  - Updated EN/DE/CZ/SK pair and family SEO title and meta description.
  - Corrected the German family H1 source to `Herbstliche Familienauszeit im Balaton-Oberland` and aligned the German family hero copy.
  - Added shared SabeeApp URL sanitization for the 10 active offer routes. It removes the specified test UTM parameters and `TEST-*` gclid values while preserving `selectedRooms` and the approved locale parameter.

Protected scope was not changed: the shared offer template, hero assets, badge, 8% dialog implementation, direct-booking block, eight-house data/card structure, localized house selector, pool wording, and CTA hierarchy.

## Automated checks

- `npm run build` — PASS; 158 pages built.
- `npm run check` — PASS; root deploy check passed.
- `npm run test:tracking` — PASS; 3/3 tests.
- `git diff --check` — PASS.

## Generated HTML SEO and content QA

All 10 routes were checked from `dist/` after the build:

- `robots`: `index,follow` on all 10.
- Canonical: self-canonical on all 10.
- Hreflang: 6 links on all 10 (`hu`, `en`, `de`, `cs`, `sk`, `x-default`).
- House cards: 8 on all 10.
- Localized H1, badge, booking CTA, direct-booking block, and localized content present on all 10.
- German family H1: `Herbstliche Familienauszeit im Balaton-Oberland`.

| Route group | HU | EN | DE | CZ | SK |
|---|---|---|---|---|---|
| Pair title | `Őszi kettesben a Balaton-felvidéken \| Dandelion Vendégházak` | `Autumn for two in the Balaton Uplands \| Dandelion Guesthouses` | `Herbst zu zweit im Balaton-Oberland \| Dandelion Gästehäuser` | `Podzim ve dvou v Balatonské vrchovině \| Dandelion ubytování` | `Jesenný pobyt vo dvojici v Balatonskej vrchovine \| Dandelion ubytovanie` |
| Family title | `Őszi családi pihenés a Balaton-felvidéken \| Dandelion Vendégházak` | `Autumn family break in the Balaton Uplands \| Dandelion Guesthouses` | `Herbstliche Familienauszeit im Balaton-Oberland \| Dandelion Gästehäuser` | `Podzimní rodinný pobyt v Balatonské vrchovině \| Dandelion ubytování` | `Jesenný rodinný pobyt v Balatonskej vrchovine \| Dandelion ubytovanie` |

The pair descriptions use multi-house wording and do not position Fügeház as the exclusive offer. The family descriptions retain the eight-house claim.

## SabeeApp-link QA

Generated HTML for all 10 routes contains no `TEST-`, `matine_activation_test`, `rsa_test`, test `gclid`, or the specified test UTM parameters.

- Pair pages preserve `selectedRooms=af2fdb8ed2ebb145`.
- Family pages preserve `selectedRooms=c64244f6153c3ca1`.
- HU pages use `lang=Hu`.
- EN/DE/CZ/SK pages use `lang=En`.
- Booking link destination and CTA placement remain unchanged.

## Render QA

The 20 render proofs are in `reports/dwa/render-qa/2026-08-06/`:

- 10 desktop renders at the requested 1440×900 viewport override.
- 10 mobile renders at the requested 390×844 viewport override.
- All 20: badge visible, 8 house cards, no horizontal overflow.
- Mobile dialog interaction: open and close passed on all 10 routes.
- The existing template intentionally keeps the details dialog mobile-only; the desktop 8% value CTA remains visible and the direct-booking CTA remains available.

Evidence files:

- Pair: `hu-pair`, `en-pair`, `de-pair`, `cs-pair`, `sk-pair` — each with `-desktop.png` and `-mobile.png`.
- Family: `hu-family`, `en-family`, `de-family`, `cs-family`, `sk-family` — each with `-desktop.png` and `-mobile.png`.
- Machine-readable results: `reports/dwa/render-qa/2026-08-06/results.json`.

## Release boundary

`noLiveWriteConfirmed=true`. No commit, push, deploy, or production route switch was performed.

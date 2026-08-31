# DWA SEO internal crawl fixes — 2026-08-18

Artifact: `DWA-SEO-INTERNAL-CRAWL-2026-08-18`
Status: `READY_FOR_DWA`
Scope: source investigation/fix and QA only; no push, deploy, or live route switch is authorized by this handoff.

## Source evidence

- Screaming Frog export: `C:\Users\cvarn\Desktop\NEW HONLAP\SEO REPORT\internal_all.csv`
- Crawl window in export: `2026-08-18 10:40:48`–`2026-08-18 10:41:02`
- Crawl size: 274 URLs; 124 HTML rows; 3 HTTP 401 responses.

## Task 1 — Resolve the three internal 401 routes

The following internal pages returned `401 Unauthorized` and each had five internal inlinks:

- `https://dandelionhouse.hu/guide/fugehaz/medence/`
- `https://dandelionhouse.hu/guide/d2/medence/`
- `https://dandelionhouse.hu/guide/d1/medence/`

### Required work

- Identify the actual source of the 401 response: route protection, server rule, rewrite/auth configuration, or another deployment-layer cause.
- Treat these as public internal content routes unless the owner confirms that protection is intentional.
- If they are public routes, make them return a normal successful response and render the intended content; do not hide the problem with a blanket redirect to the homepage.
- Preserve the intended route, language behavior, internal links, canonical behavior, and indexability.
- If protection is intentional, document the reason and identify whether the five internal links should remain or be changed.

### Acceptance evidence

- Local/source route checks for all three URLs.
- Expected public-route result: HTTP 200, intended HTML content, no accidental auth challenge.
- `npm run build` — PASS.
- `npm run check` — PASS.
- `git diff --check` — PASS.
- Report any live verification separately; this handoff does not authorize deployment.

## Task 2 — Shorten overlong title and meta description fields

The crawl found four title fields above 60 characters and three above 580px pixel width:

| URL | Characters | Pixel width |
|---|---:|---:|
| `/royal/` | 68 | 628 |
| `/de/royal/` | 71 | 678 |
| `/en/royal/` | 74 | 690 |
| `/de/kisapati-unterkunft-mit-pool/` | 61 | 548 |

The crawl found 24 meta descriptions above 920px pixel width. Twelve of those were also above 160 characters:

- `/szallasok/`
- `/royal/`
- `/de/royal/`
- `/en/royal/`
- `/sk/ubytovanie/`
- `/en/szallasok/`
- `/de/unterkuenfte/`
- `/cs/ubytovani/`
- `/kisapati-medences-szallas/`
- `/sk/kisapati-ubytovanie-s-bazenom/`
- `/de/kisapati-unterkunft-mit-pool/`
- `/cs/kisapati-ubytovani-s-bazenem/`

The full 24-pixel-width set is:

- `/szallasok/`
- `/dandelion-zsalya/`
- `/dandelion-vintage/`
- `/dandelion-d1/`
- `/szepvolgyi/`
- `/royal/`
- `/elmenyek/kerekpar/`
- `/szololiget/`
- `/de/royal/`
- `/de/datenschutz/`
- `/en/dandelion-d1/`
- `/en/dandelion-koveskal/`
- `/en/royal/`
- `/en/privacy-policy/`
- `/sk/ubytovanie/`
- `/en/szallasok/`
- `/de/unterkuenfte/`
- `/cs/ubytovani/`
- `/en/contact/`
- `/kisapati-medences-szallas/`
- `/en/kisapati-pool-stays/`
- `/sk/kisapati-ubytovanie-s-bazenom/`
- `/de/kisapati-unterkunft-mit-pool/`
- `/cs/kisapati-ubytovani-s-bazenem/`

### Required work

- Rewrite the affected title and meta copy at the source/data layer, preserving the language, search intent, house names, and truthful claims.
- Do not blindly truncate text; keep the most important topic and location terms first.
- Keep localized versions independently natural; do not translate by mechanical shortening only.
- Avoid introducing duplicate titles or duplicate meta descriptions.
- Do not change canonical, hreflang, booking CTA, tracking, or unrelated campaign copy as part of this task.

### Acceptance evidence

- Generated HTML inspection for every affected route.
- No missing title/meta/H1/canonical on the affected indexable pages.
- Self-canonical and intended `index,follow` preserved.
- No exact duplicate title/meta introduced.
- `npm run build` — PASS.
- `npm run check` — PASS.
- `git diff --check` — PASS.
- Report any remaining pixel-width exceptions explicitly rather than silently widening scope.

## Protected scope and release boundary

- Do not edit generated `dist/` as source of truth.
- Do not touch secrets, environment files, SabeeApp, Ads, Meta, GA4, GTM, GSC, or other live platforms.
- Do not commit, push, deploy, or switch production routes under this handoff.
- Preserve unrelated pre-existing worktree changes.
- Return the exact changed-file list, checks, remaining warnings, and any approval needed before release.

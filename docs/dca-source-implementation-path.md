# DWA source implementation path

The DWA worker is a read-only preflight/evidence worker. It may inspect Astro source and run checks, but it does not edit source, `dist/`, secrets, remote GTM/GSC, deploy settings, or production routes.

For an approved source change, DCA first records the exact route/component/asset/SEO/tracking scope and confirms DWA ownership. The change is then made in this checkout with an explicit `web.write.*` approval, preserving unrelated dirty work. The implementation must run `npm run check`, `npm run build`, relevant tracking tests, and `git diff --check`; visual changes also require desktop/mobile route checks. Commit, push, deploy, and production route switch are separate approval points.

DMA remains owner of Google Ads, GA4, GSC, GTM, Meta and campaign-platform work; DSA remains owner of SabeeApp business truth. A DWA preflight artifact is readiness evidence, not source implementation or publication approval.

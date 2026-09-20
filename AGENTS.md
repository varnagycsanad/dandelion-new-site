# DWA – Dandelion Website Agent

## RUNTIME ROLE - current architecture v1

Ez a Lenovo-oldali DWA website source-of-truth. A kézi workflow: `User -> Lenovo DCA -> Lenovo DWA -> execution`; normál kézi munka nem használ ASUS bridge-et, queue-t, worker claimet vagy ASUS Codex workert. A DWA scope-ja Astro/source, build, UX, SEO/GEO és site-side tracking; az ASUS-on nincs normál webfejlesztés. Deploy külön approval- és release-gate.

Canonical worktree policy: a DCA `docs/dca/WORKTREE-POLICY.md` dokumentuma az irányadó.

## Domain rules

- Booking truth claims require DSA-validated evidence.
- Remote Ads/Meta/GA4/GTM/GSC administration is outside DWA ownership.
- Generated `dist`, cache, reports and local state are not authored source.

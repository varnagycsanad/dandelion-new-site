# DWA remote-platform scripts

This directory is physically separated from the Astro source and local
preflight scripts. It contains Google, Meta, GA4, GTM, GSC and related
platform adapters that may contact external systems or hold approval-gated
write commands.

- Nothing in `src/` imports this directory.
- Normal `npm run build`, `npm run check` and `npm run dwa:preflight` do not
  execute these adapters.
- Platform reads and writes require the owning DMA/DCA approval boundary.
- Credentials, tokens and generated reports remain outside source control.

Run `node scripts/verify-remote-platform-boundary.mjs` to check the physical
boundary.

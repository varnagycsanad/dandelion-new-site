# Dandelion galéria rendező

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: gallery order tool hasznalata es export workflow
Do not use for: aktualis image registry allapot ellenorzese nelkul


Helyi segédeszköz a szállásoldali galériák sorrendjének rendezéséhez.

## Mit használ?

- Galéria forrás: `src/admin-disabled/data/images/accommodation-images.generated.json`
- SEO előnézet: `src/admin-disabled/data/images/accommodation-images.seo-test.json` ha létezik
- Szállásnév-forrás: `src/data/accommodations.ts`

## Hogyan generálj mindent?

```bash
node scripts/generate-gallery-order-tool.mjs --all
```

Ez legenerálja az összes gallery-vel rendelkező szállás HTML-jét a
`project-docs/gallery-order-tool/` mappába, és frissíti az `index.html`-t is.

## Hogyan generálj csak egy szállást?

```bash
node scripts/generate-gallery-order-tool.mjs --apartment=d2
```

Ez csak az adott apartmentKey HTML-jét frissíti, és közben az indexet is újragenerálja.

## Hogyan nyisd meg?

Dupla kattintással futtasd ezt:

`project-docs/gallery-order-tool/open-gallery-order-tool.bat`

Ez megnyitja a helyi `index.html`-t a böngészőben.

## Hogyan működik?

1. Nyisd meg az adott szállás `gallery-order-*.html` fájlját.
2. Húzd a képeket a kívánt sorrendbe.
3. A sorrend automatikusan újraszámozódik.
4. Másold ki a JSON, a Codex-ready blokk vagy a sima lista exportot.
5. A tool nem írja vissza automatikusan az image registryt.

## Mit kell bemásolni ChatGPT-nek?

A legbiztosabb a `Codex-ready blokk` gombbal másolt blokk.

## Fontos

- A tool helyi használatra készült.
- Nem publikus route.
- Nem módosítja automatikusan a registryt.
- A képek a `public/images` útvonalakról töltődnek be a helyi HTML-ből.

# Gallery Order Tool

Local helper for arranging accommodation gallery order by `apartmentKey`.

## Usage

```bash
node scripts/generate-gallery-order-tool.mjs --apartment=d2
```

This generates:

```text
project-docs/gallery-order-tool/gallery-order-d2.html
```

## Data Source

The tool reads from:

- `src/data/images/accommodation-images.generated.json`

It does not modify the registry automatically.

## What the HTML Does

- shows the selected `apartmentKey`
- renders a draggable image grid
- shows large order numbers
- shows image id, filename, and `sortOrder`
- updates numbering after drag-and-drop
- exports the current order as a JSON array of filenames
- provides a `Sorrend másolása` button

## Notes

- local use only
- not published as a route
- images are loaded from `public/images/...` via relative paths

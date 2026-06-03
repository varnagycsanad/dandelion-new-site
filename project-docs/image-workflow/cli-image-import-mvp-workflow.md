[CHANGE 2026-04-27 00:00] CLI képfeltöltési MVP workflow dokumentálása.

# CLI image import MVP workflow

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: CLI image import MVP workflow kontextus
Do not use for: aktualis package/script allapot ellenorzese nelkul


## 1. Cél

Ez az MVP arra való, hogy egy WordPress media ID-ból parancssoros úton végigvigyünk egy képet a Dandelion image workflow-n.

Ez nem admin UI.
Ez nem közvetlen frontend szerkesztés.
Ez egy kontrollált CLI képút.

## 2. Működő workflow

1. WordPress media ID megszerzése
2. `images:intake`
3. `images:select`
4. `images:process`
5. `images:publish`
6. `npm run build`
7. smoke check

## 3. Parancsok konkrét példával

```bash
npm run images:intake -- --apartment=d2 --wpId=7872 --role=gallery --theme=terasz --room="terasz" --sortOrder=11
```

```bash
npm run images:select -- --apartment=d2 --source=d2-wp-7872-gallery-terasz
```

```bash
npm run images:process -- --apartment=d2 --source=d2-wp-7872-gallery-terasz --write --allow-remote
```

```bash
npm run images:publish -- --apartment=d2 --source=d2-wp-7872-gallery-terasz
```

```bash
npm run build
```

## 4. Státuszlogika

- `source_found`: a source candidate bekerült, de még nem mehet automatikusan feldolgozásra
- `selected`: jóváhagyott source candidate, mehet processbe
- a process script csak `selected` képet dolgoz fel
- a publish csak már feldolgozott képet tegyen be a frontend registrybe

## 5. Fontos biztonsági szabályok

- A WordPress média csak forrásanyag.
- A frontend csak WebP + registry alapú képet használjon.
- `source_found` státuszú candidate nem mehet automatikusan processbe.
- A registry publish külön kapu.
- Az image-admin / runtime bridge nincs piszkálva ebben az MVP-ben.
- A `public/images` alatti feldolgozott képeket nem szabad kézzel törölni vagy felülírni.

## 6. Mostani sikeres teszt

- source candidate: `d2-wp-7872-gallery-terasz`
- registry entry: `d2-gallery-11`
- gallery:
  `/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-17.webp`
- thumb:
  `/images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-17.webp`
- commit: `e7cdb73`

## 7. Smoke check minimum

- `npm run build` sikeres
- a registry tartalmazza az új entryt
- a `dist` tartalmazza a gallery és thumb WebP fájlokat
- a buildelt D2 HTML hivatkozik az új képekre
- a helyi dev szerver HTTP 200-at ad

## 8. Sequence / fájlnévütközés tanulság

A második D2 kép próbánál először azért álltunk meg már a dry-run után, mert az intake ugyanarra a target fájlnévre akart tervezni, mint az első CLI teszt:

- `gallery-17.webp`
- `thumb-17.webp`

Ez azért volt jó STOP pont, mert még valós írás előtt látszott, hogy a következő candidate felülírná a már létező outputot.

Az `e70efcb` commit ezt javította: az `images:intake` már nem csak a régi source mintákból számolja a következő gallery/thumb sorszámot, hanem figyelembe veszi:

- a source inventory target pathjait
- a frontend registry `src` / `thumb` értékeit
- a tényleges `public/images/accommodations/.../gallery` és `thumbs` fájlokat

Így az intake gallery/thumb esetben `max(existing) + 1` logikával dolgozik, nem lyukkereséssel és nem a régi `d2-source-gallery-XX` minta alapján.

Ez azért fontos, mert a valós workflow-ban a target ütközést nem elméleti source ID-k, hanem a már kiosztott output nevek és a ténylegesen létező fájlok alapján kell elkerülni.

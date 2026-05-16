[CHANGE 2026-04-26 00:00] WebP feldolgozó script technikai terv létrehozása Sharp bevezetés előtt.

# WebP feldolgozó script terv

## 1. Jelenlegi állapot

- A `package.json` jelenlegi dependency listája csak az `astro` csomagot tartalmazza.
- Sharp jelenleg nincs telepítve, és nincs képfeldolgozó dependency bevezetve.
- Az image source inventory archivált helyen maradt meg: `src/admin-disabled/data/images/accommodation-source-images.ts`.
- A D2 source inventoryban már vannak `selected` és `needs_review` státuszú képek.
- A végleges `ImageAsset` registry még nincs kitöltve konkrét képekkel.
- A jelenlegi D2 source inventory forrásréteg, nem frontend adatforrás.

## 2. Cél

A későbbi script:

- csak explicit kiválasztott source candidate-ekkel dolgozzon;
- alapból csak `status: "selected"` képeket dolgozzon fel;
- a `needs_review` képeket hagyja ki alapértelmezés szerint;
- WordPress source URL-ből vagy local pathból tudjon olvasni;
- outputot csak `public/images/...` alá írjon;
- ne módosítsa automatikusan a frontendet;
- ne hozzon létre végleges `ImageAsset` adatot jóváhagyott SEO adatok nélkül;
- a `targetPlans` alapján tervezze meg a fájlneveket, méreteket és role-okat.

## 3. Javasolt dependency

Javasolt Node package: `sharp`.

Sharp azért jó választás, mert:

- stabil, széles körben használt Node képfeldolgozó könyvtár;
- tud WebP outputot készíteni;
- támogatja az átméretezést, `cover` és `contain` jellegű transzformációkat;
- alapból nem igényel böngészős vagy frontend runtime-ot;
- alkalmas scriptből futtatott batch feldolgozásra.

Később külön taskban várható `package.json` módosítás:

```json
"dependencies": {
  "astro": "^6.1.5",
  "sharp": "..."
}
```

A pontos verziót a bevezetési taskban kell eldönteni. A telepítés azért legyen külön task, mert dependency változással `package.json` és lockfile módosítás is járhat, amit külön kell ellenőrizni és commitolni.

Most nem történik Sharp telepítés, mert ez a lépés csak terv. Nem fut `npm install`, és nem módosul sem `package.json`, sem lockfile.

## 4. Javasolt script helye

Javasolt script:

```txt
scripts/process-accommodation-images.mjs
```

Indoklás:

- a mostani pilot lakásképekről szól;
- az input természetes kulcsa az `apartmentKey`;
- a D2 után ugyanaz a script később más lakásokra is használható;
- elkerülhető, hogy a script túl korán általános, blog/home/admin képfeldolgozóvá nőjön.

Később, ha home/blog képek is belépnek, lehet közös belső helper vagy általánosabb `scripts/process-images.mjs`, de az első biztonságos pilothoz a lakásképes script tisztább.

## 5. Input logika

A későbbi script inputjai:

- `apartmentKey`, például `d2`;
- opcionális source id;
- opcionális role;
- `dry-run` flag;
- `write` flag.

Példa későbbi parancsokra:

```txt
npm run images:plan -- --apartment=d2
npm run images:process -- --apartment=d2 --dry-run
npm run images:process -- --apartment=d2 --write
```

Ezekhez később `package.json` script bejegyzések kellenek, de ebben a lépésben nem módosul a `package.json`.

Alapértelmezett szűrés:

- `apartmentKey === "d2"` a D2 pilotnál;
- `status === "selected"`;
- opcionálisan role szerint szűkíthető: `hero_mobile`, `hero_desktop`, `card`, `gallery`, `thumbnail`.

## 6. Output logika

D2 esetén javasolt output struktúra:

```txt
public/images/accommodations/d2/hero/
public/images/accommodations/d2/card/
public/images/accommodations/d2/gallery/
public/images/accommodations/d2/thumbs/
```

A script:

- hozza létre a célmappákat, ha hiányoznak;
- ne írjon felül fájlt véletlenül;
- ha célfájl már létezik, álljon meg, vagy csak explicit verziózott névvel menjen tovább;
- a célfájlneveket a source candidate `targetPlans` mezőiből vegye;
- ne írjon `dist/` alá;
- ne használjon WordPress URL-t végleges frontend outputként;
- a `targetPath` webes public path, ezért azt local filesystem pathra kell leképezni.

Példa leképezés:

```txt
/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-01.webp
=> public/images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-01.webp
```

## 7. Képfeldolgozási szabályok

Kimenet:

- WebP output;
- EXIF/metaadat törlése;
- sRGB cél;
- role alapú width;
- quality role szerint.

Irányadó quality:

| Role | Quality |
|---|---:|
| hero | 80-85 |
| gallery | 78-85 |
| card | 75-82 |
| thumbnail | 70-78 |

Crop és resize:

- `contain` gallery képeknél, hogy a galéria ne vágjon túl agresszíven;
- `cover` thumbnail, card és hero esetén;
- `manual` crop később külön fejlesztés, mert emberi fókuszpont vagy crop döntés kellhet.

Méretlogika:

- a script elsőként a `targetPlans.width` és opcionális `height` értékeket használja;
- ha `height` nincs megadva, a képarányt a crop/contain logika szerint számolja;
- thumbnail és nagy gallery fájl ne ugyanaz a túlméretes fájl legyen;
- csak tényleges LCP/hero kép kapjon később preload/eager/fetchpriority high logikát, de ezt nem a processing script dönti el.

## 8. Biztonsági szabályok

A script:

- ne töröljön eredeti képet;
- ne töröljön WordPress médiát;
- ne írjon `dist/` mappába;
- ne deployoljon;
- ne commitoljon;
- ne dolgozzon `needs_review` képekkel alapértelmezés szerint;
- dry-run legyen az alap működés;
- write mód explicit legyen;
- képfájl overwrite tiltott legyen alapból;
- csak a workspace-en belüli `public/images/...` célútvonalra írhat;
- minden tervezett műveletet listázzon feldolgozás előtt;
- hibánál álljon meg részleges, csendes folytatás helyett.

## 9. Registry frissítés később

Első verzióban a script elég, ha csak képeket gyárt és dry-run tervet ad.

Második verzióban készíthet `ImageAsset` registry draftot, de:

- végleges frontend registrybe csak approved SEO adatokkal kerülhet kép;
- a source inventory és a review dokumentum legyen az ellenőrzési alap;
- `ImageSourceCandidate` maradjon import/forrás réteg;
- `ImageAsset` csak frontend-kész, optimalizált WebP képet jelentsen;
- az `accommodationImages` registry kitöltése külön, review utáni task legyen.

## 10. D2 pilot javasolt sorrend

1. Sharp dependency külön task.
2. `process-accommodation-images.mjs` script váz dry-run módban.
3. D2 dry-run selected képekre.
4. Csak mobil hero local feldolgozás próba.
5. Egyetlen galériakép próba.
6. Thumb + gallery output próba.
7. Ellenőrzés: fájlméret, vizuális crop, public path, célmappák.
8. Csak utána batch selected képekre.

## 11. Kockázatok

- WP URL letöltési hiba: a WordPress media URL lehet átmenetileg nem elérhető, átirányított vagy tiltott.
- Fájlnév overwrite: meglévő WebP felülírása cache és audit problémát okozhat.
- Túl nagy WebP: rossz quality vagy méretezés ronthatja PageSpeed/LCP eredményt.
- Rossz crop/focusPoint: hero/card/thumb képnél könnyen levághat fontos részletet.
- SEO még nem approved: képek nem kerülhetnek végleges frontend registrybe jóváhagyott SEO adatok nélkül.
- Windows útvonalak: a scriptnek kezelnie kell a `\` és `/` különbségét.
- Root deploy: a public path és a build/deploy URL viszonyát külön ellenőrizni kell.
- Public path vs local filesystem path: `/images/...` webes path, míg íráskor `public/images/...` lokális path kell.
- Local preview path nem frontend path: project-docs HTML segédanyagok relatív útjai nem használhatók frontend logikának.
- Batch feldolgozás túl korán: a D2 pilot előtt nem szabad minden selected képet egyszerre konvertálni.

# Dandelion Image Admin V2 - Technikai audit

Status: TORTENETI
Last checked: 2026-06-02
Use for: image admin v2 korabbi WordPress/admin audit kontextus
Do not use for: aktualis publikus image workflow forrasakent


Dátum: 2026-04-30

## Rövid összefoglaló

Az Image Admin V2 jelenleg nem egyetlen egységes adatmodellből dolgozik, hanem több, részben egymásra épülő, részben párhuzamos adatforrásból:

- backend WordPress option storage
- WordPress core media REST
- frontend `state`
- több külön localStorage kulcs
- `mediaDetailsCache` és draft/cache rétegek

Ez önmagában még kezelhető lenne, de több helyen ugyanannak a fogalomnak külön életciklusa van:

- lakáslista: backend option + frontend settings/localStorage
- kategória: frontend localStorage és fallback assignment
- SEO téma: külön localStorage, miközben a többi SEO mező WP core REST-be ment
- WebP státusz: részben backend konverziós válasz, részben localStorage cache, részben fájltípus fallback

A fő kockázat nem egyetlen nagy hiba, hanem az, hogy ugyanannak a képnek / lakásnak / státusznak több külön "igazságforrása" van, és a nézetek nem mindig ugyanabból olvasnak.

## Fő adatforrások

### 1. Lakáslista

Frontend:

- `state.adminSettings.apartmentGroups`
- localStorage kulcs: `dandelion-image-admin-v2-settings`
- helper:
  - `getApartmentGroupOptions(state)` in `wordpress-plugin/dandelion-image-admin-v2/assets/admin.js`
  - `getApartmentCategoryValueByName(state, name)`

Backend:

- default lista: `dandelion_image_admin_v2_default_apartments()`
- custom lista: option `dandelion_image_admin_v2_apartments`
- merged lista: `dandelion_image_admin_v2_get_apartments()`
- whitelist: `dandelion_image_admin_v2_allowed_apartment_keys()`

Megfigyelés:

- a frontend settings lista és a backend whitelist külön forrásból indult
- új lakás akkor működik végig stabilan, ha a backend apartment optionbe is bekerül

### 2. Kategórialista

Frontend:

- `state.adminSettings.otherCategories`
- localStorage kulcs: `dandelion-image-admin-v2-settings`
- helper:
  - `getCategoryOptions(state)`
  - `getOtherCategoryValueByName(name)`

Backend:

- nincs külön backend kategória storage vagy kategória endpoint

Megfigyelés:

- az "egyéb kategóriák" teljesen frontend/localStorage alapon élnek
- emiatt a kategória nem backend entitás, csak kliensoldali címkézés

### 3. Kép hozzárendelés / lakásgaléria

Backend option:

- `dandelion_v2_apartment_image_assignments`

Kulcsfüggvények PHP-ban:

- `dandelion_image_admin_v2_handle_apartment_gallery_order(...)`
- `dandelion_image_admin_v2_handle_apartment_gallery_add(...)`
- `dandelion_image_admin_v2_handle_apartment_gallery_remove(...)`
- `dandelion_image_admin_v2_handle_apartment_image_config(...)`

Frontend:

- `selectedApartmentKey`
- `loadSelectedGallery(state)`
- `loadAllAssignments(state)`
- `assignMediaToApartment(state, mediaId, apartmentKey)`

Megfigyelés:

- a gallery és assignment backend oldalon lakáskulcs alapú
- ez elvileg új lakásnál is működik, ha a kulcs átjut a backend whitelist ellenőrzésen

### 4. SEO adatok

Backend / WordPress core:

- ALT: `_wp_attachment_image_alt`
- Title: attachment post title
- Caption: `post_excerpt`
- Description: `post_content`
- SEO approval: option `dandelion_image_admin_v2_seo_approved`

Frontend:

- draft layer: `state.seoDraftsByMediaId`
- persisted topic: `state.seoTopicsByMediaId`
- localStorage kulcs a témához: külön SEO topic storage
- cache: `state.mediaDetailsCache`

Megfigyelés:

- a "Képen látható / téma" mező nem ugyanabba a backendbe megy, mint az ALT/Title/Caption/Description
- ez külön perzisztens lánc, emiatt fokozottan érzékeny arra, hogy a checker és a modal ugyanabból a forrásból olvasson

### 5. WebP adatok

Backend:

- konverziós endpoint: `POST /wp-json/dandelion-image-admin/v2/convert-webp`
- konverzió handler: `dandelion_image_admin_v2_handle_convert_webp(...)`
- output: uploads alatti `dandelion-webp`

Frontend:

- localStorage/state cache: `state.webpPreparationByMediaId`
- kulcs: `dandelion-image-admin-v2-webp-preparation`
- helper:
  - `convertMediaToWebp(state, mediaId)`
  - `prepareWebpSuggestion(...)`
  - `getMediaStatusSummary(...)`

Megfigyelés:

- a WebP státusz nem csak backend adatból áll
- ha van cache-elt WebP preparation state, az felülírja a puszta fájltípusból számolt képet

## Endpoint lista

### WordPress core REST

- `GET /wp/v2/media`
- `GET /wp/v2/media/:id`
- `POST /wp/v2/media/:id`

Felhasználás:

- médiatár betöltés
- SEO mezők mentése
- részletes media adatok cache-elése

### Plugin REST endpointok

`dandelion/v1`

- `/v2-apartments`
- `/v2-apartments-delete`
- `/v2-apartment-gallery-order`
- `/v2-apartment-gallery-add`
- `/v2-apartment-gallery-remove`
- `/v2-media-rename`
- `/v2-media-seo-approve`
- `/apartment-image-config/(?P<apartmentKey>[a-z0-9_-]+)`
- `/v2-apartment-hero-image`

`dandelion-image-admin/v2`

- `/convert-webp`

## State / localStorage kulcsok

### localStorage

- `dandelion-image-admin-v2-settings`
- `dandelion-image-admin-v2-used-image-categories`
- SEO topic storage kulcs a téma mezőhöz
- `dandelion-image-admin-v2-used-images-view-mode`
- `dandelion-image-admin-v2-webp-preparation`

### Frontend state kulcsok

- `selectedApartmentKey`
- `libraryTargetKey`
- `apartments`
- `galleryItems`
- `galleryMeta`
- `apartmentAssignments`
- `apartmentGalleries`
- `usedImageCategoriesByMediaId`
- `mediaItems`
- `mediaDetailsCache`
- `seoDraftsByMediaId`
- `seoTopicsByMediaId`
- `webpPreparationByMediaId`
- `libraryDiagnostic`

## Auditált adatfolyamok

## 1. Lakáslista adatfolyam

### Frontend eredet

`renderSettingsModule(...)` kezeli a `Lakások / csoportok` listát, amit a frontend settings storage tárol.

### Backend eredet

PHP-ban a lakáslista két részből áll:

- beégetett default apartment lista
- `dandelion_image_admin_v2_apartments` option

### Key / slug képzés

Frontend:

- `getApartmentCategoryValueByName(state, name)`
- diakritika és whitespace után kompakt keyt képez
- példa: `Köveskál` -> `koveskal`

Backend:

- `dandelion_image_admin_v2_normalize_apartment_key($key)`
- `remove_accents`
- `sanitize_title`
- `-` -> `_`

Példa:

- `Köveskál` -> `koveskal`
- `Royal Homes` -> backend normalizálás mellett slugosított kulcs, frontendben külön `royal_homes` ág is van

### Whitelist

Nincs hardcoded `if d1/d2` típusú lista a gallery endpointban, de van központi whitelist:

- `dandelion_image_admin_v2_allowed_apartment_keys()`

Ezt több endpoint is használja.

### Kockázat

Ha a frontend settingses apartment lista és a backend apartments option nincs szinkronban, a select látszólag helyes lehet, de a REST hívás `Invalid apartmentKey` hibával elbukik.

## 2. Kategórialista adatfolyam

### Lakás vs egyéb kategória szétválasztás

Kód szerint ez logikailag külön van kezelve:

- lakások: `apartmentGroups`
- egyéb kategóriák: `otherCategories`

Az apartman selecthez a cél helper:

- `getApartmentGroupOptions(state)`

Az általános kategória dropdownhoz:

- `getCategoryOptions(state)`

### Kockázat

Mivel a két lista ugyanabból a settings objektumból, de külön helperből készül, a hiba tipikus helye:

- rossz helper használata
- rossz select ugyanabból a mixed listából töltődik

## 3. Kép hozzárendelés adatfolyam

### Lakáshoz rendelés

Frontend:

- library select -> `targetValue`
- `resolveApartmentKey(state, targetValue)`
- ha apartment kulcs -> backend add endpoint
- ha nem apartment kulcs -> localStorage kategóriacsere

Backend:

- `dandelion_image_admin_v2_handle_apartment_gallery_add(...)`

### Gallery order

Frontend:

- `saveGalleryOrder(state)`

Backend:

- `dandelion_image_admin_v2_handle_apartment_gallery_order(...)`

### Assignment cache

Frontend:

- `loadAllAssignments(state)`
- lakásonként végigkéri az `apartment-image-config` végpontot
- ebből építi:
  - `state.apartmentAssignments`
  - `state.apartmentGalleries`

### Kockázat

Az assignment cache új lakásoknál csak akkor lesz helyes, ha:

1. a lakáskulcs bekerült a backend apartment listába
2. az `apartment-image-config/<kulcs>` végpont átmegy a whitelist ellenőrzésen

## 4. SEO adatfolyam

### Mezők

Backend által mentett mezők:

- ALT
- Title
- Caption
- Description

Frontend külön kezelt mező:

- `Képen látható / téma`

### SEO generálás

Frontend szabályalapú:

- `buildSeoSuggestions(...)`

### SEO elfogadás

Backend:

- plugin endpoint: `v2-media-seo-approve`

### SEO mentés

Frontend:

- `updateMediaSeo(state, mediaId, values)`

Backend:

- WordPress core `POST /wp/v2/media/:id`

### Újranyitáskor render

A modal nem egyetlen helyről olvassa vissza az adatot, hanem több forrást merge-el:

- WP media raw
- `mediaDetailsCache`
- `seoDraftsByMediaId`
- `seoTopicsByMediaId`

### SEO checker

- `getSeoAnalysis(item)`
- a témahiány ellenőrzés `manualTheme` mezőt néz

### Kockázat

Az ALT/Title/Caption/Description backendben él, a `manualTheme` viszont külön storage-ban. Emiatt a checker könnyen mást lát, mint amit a sima WP save visszatölt, ha a merge sorrend vagy cache réteg eltér.

## 5. WebP adatfolyam

### Előkészítés

Frontend:

- `convertMediaToWebp(state, mediaId)`

Backend:

- `dandelion_image_admin_v2_handle_convert_webp(...)`

### Státusz

Közös resolver:

- `getMediaStatusSummary(state, mediaId, fallbackDetails)`

Ez figyeli:

- SEO analysis
- `state.webpPreparationByMediaId`
- `prepareWebpSuggestion(...)`
- current file type

### Kockázat

Ha a modal részletes cache-ből dolgozik, a kártya pedig gyengébb fallback itemet kap, a státusz eltérhet akkor is, ha papíron ugyanaz a resolver fut.

## 6. Kártya vs modal státusz

### Célállapot a kódban

Közös forrás:

- `getMediaStatusSummary(state, mediaId, fallbackDetails)`

### Miért térhet mégis el

Nem csak a helper számít, hanem az inputja:

- modal:
  - `getSeoStatusSourceItem(...)`
  - `mediaDetailsCache`
  - draft/theme merge
- kártya:
  - gyakran csak egy egyszerűbb `item`
  - vagy `fallbackDetails`

### Kockázat

Az eltérés forrása tipikusan nem a badge komponens, hanem:

- más `mediaId`
- szegényebb `fallbackDetails`
- stale `mediaDetailsCache`
- draft és persisted theme eltérő rétegből érkezik

## 7. Dupla plugin / duplikált fájl probléma

Vizsgált példányok:

- `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site\wordpress-plugin\dandelion-image-admin-v2\...`
- `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site\dandelion-image-admin-v2\...`

Hash eredmény:

- `admin.js`: egyezik
- `admin.css`: egyezik
- `dandelion-image-admin-v2.php`: egyezik

Következtetés:

- jelen audit időpontjában a két példány bitre azonos
- jelenleg nem az eltérés okozza a bugokat

Viszont kockázat marad:

- a WordPress aktív plugin forrása nagy valószínűséggel a `wordpress-plugin/...` példány
- ha később csak az egyik példány módosul, könnyen előállhat "máshol javítottunk, mint ami fut" helyzet

## Ismert kockázatos pontok

1. **Lakáslista dupla forrásból él**
   - frontend settings
   - backend apartment option

2. **Kategóriák csak kliensoldali entitások**
   - nincs backend truth source
   - reload és cache függvényes láncban érzékeny

3. **SEO téma külön storage**
   - nem ugyanabba a backend mezőbe mentődik, mint a többi SEO adat

4. **Modal és kártya státusz inputja eltérhet**
   - a helper közös lehet, de a forrásitem nem feltétlenül az

5. **Sok cache-réteg van egyszerre**
   - `mediaItems`
   - `mediaDetailsCache`
   - `seoDraftsByMediaId`
   - `seoTopicsByMediaId`
   - `webpPreparationByMediaId`
   - `usedImageCategoriesByMediaId`

## Konkrét gyanús bugok

### 1. Új lakás látszik, de nem tölt

Gyanú:

- backend apartment whitelist és frontend apartmentGroups nincs szinkronban

Bizonyíték:

- JS select: `selectedApartmentKey`
- endpoint: `loadGalleryForApartment(...)`
- PHP whitelist: `dandelion_image_admin_v2_allowed_apartment_keys()`

### 2. Kategória átvált, de néha régi badge/státusz látszik

Gyanú:

- a badge más itemet kap, mint a modal
- `mediaDetailsCache` és `usedImageCategoriesByMediaId` nem ugyanabban a pillanatban érvényesül

Bizonyíték:

- `getMediaStatusSummary(...)`
- `getSeoStatusSourceItem(...)`
- `getMediaCategory(...)`

### 3. SEO téma mező tartalma elveszhet vagy checker mást lát

Gyanú:

- a theme nem a WP media save része
- külön localStorage-ból merge-eljük vissza

Bizonyíték:

- `setPersistedSeoTopic(...)`
- `getPersistedSeoTopic(...)`
- `getSeoEffectiveMediaItem(...)`
- `getSeoAnalysis(...)`

### 4. WebP állapot eltérés modal és kártya között

Gyanú:

- a modal részletesebb `preparedState`-et lát
- a kártya csak file type vagy hiányos fallback alapján dolgozik

Bizonyíték:

- `getMediaStatusSummary(...)`
- `prepareWebpSuggestion(...)`
- `state.webpPreparationByMediaId`

### 5. Rejtett technikai adósság: debug struktúra még state-ben maradt

Gyanú:

- a vizuális debug blokk már törölve lehet, de `libraryDiagnostic` és `createLibraryDiagnosticSnapshot(...)` még bent van
- ez nem feltétlenül bug, de mutatja, hogy a kód több ideiglenes diagnosztikai réteget őriz

## Bizonyíték / fájl / függvény hivatkozások

### JS

Fájl:

- `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site\wordpress-plugin\dandelion-image-admin-v2\assets\admin.js`

Kulcsfüggvények:

- `getApartmentGroupOptions`
- `getCategoryOptions`
- `getMediaCategory`
- `loadSelectedGallery`
- `loadAllAssignments`
- `assignMediaToApartment`
- `updateMediaSeo`
- `approveMediaSeo`
- `convertMediaToWebp`
- `getSeoEffectiveMediaItem`
- `getSeoStatusSourceItem`
- `getMediaStatusSummary`
- `renderApartmentManager`
- `renderLibraryModule`
- `renderUsedImagesModuleV2`
- `renderSeoModule`
- `renderModal`
- `renderUsedWebpModal`
- `renderUsedPreviewModal`

### PHP

Fájl:

- `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site\wordpress-plugin\dandelion-image-admin-v2\dandelion-image-admin-v2.php`

Kulcsfüggvények:

- `dandelion_image_admin_v2_default_apartments`
- `dandelion_image_admin_v2_normalize_apartment_key`
- `dandelion_image_admin_v2_get_apartments`
- `dandelion_image_admin_v2_allowed_apartment_keys`
- `dandelion_image_admin_v2_handle_apartments_read`
- `dandelion_image_admin_v2_handle_apartments_write`
- `dandelion_image_admin_v2_handle_apartments_delete`
- `dandelion_image_admin_v2_handle_apartment_gallery_order`
- `dandelion_image_admin_v2_handle_apartment_gallery_add`
- `dandelion_image_admin_v2_handle_apartment_gallery_remove`
- `dandelion_image_admin_v2_handle_apartment_image_config`
- `dandelion_image_admin_v2_handle_media_seo_approve`
- `dandelion_image_admin_v2_handle_convert_webp`

## Kézi tesztforgatókönyvek

### 1. Új lakás hozzáadása

1. Beállítások -> Lakások / csoportok -> `Köveskál` hozzáadás
2. Mentés
3. oldal frissítés
4. Apartman kezelés dropdown: `Köveskál` megjelenik-e
5. kiválasztás után:
   - ha nincs kép: `Ehhez a lakáshoz még nincs kép hozzárendelve`
6. Képtárból egy kép hozzárendelése `Köveskál`-hoz
7. vissza Apartman kezelés -> `Köveskál`
8. kép listázódik-e

### 2. Kategória módosítás

1. Használt képek vagy Képtár -> kép kijelölés
2. `Marketing képek` -> `DJI`
3. UI frissül-e
4. oldal frissítés
5. újranyitás után a kategória és badge ugyanaz-e

### 3. SEO téma mező

1. SEO modal nyitás
2. `Képen látható / téma` kitöltés
3. SEO javaslat generálás
4. SEO elfogadás
5. SEO adatok mentése
6. modal bezárás
7. újranyitás
8. téma mező marad-e
9. quality check eltűnik-e

### 4. WebP előkészítés

1. WebP modal nyitás
2. WebP előkészítés
3. státusz frissül-e azonnal
4. modal bezárás
5. kártya badge frissül-e
6. oldal frissítés után megmarad-e

### 5. Modal státusz = kártya státusz

1. válassz egy képet, ahol a modal SEO/WebP OK
2. ugyanazt a képet nézd meg a kártyán
3. a mini badge és modal badge egyezik-e
4. ismételd meg hibás/hiányos képpel is

## Javítási sorrend javaslat

1. **Lakáslista truth source rendezése**
   - először a frontend settings és backend apartments kapcsolat legyen teljesen stabil

2. **Kategória vs lakás teljes szétválasztás audit utáni kis javításokkal**
   - minden select kapjon dedikált helperforrást

3. **Státusz resolver input egységesítése**
   - nem új rendszer kell, hanem a modal és kártya ugyanazt a részletes source itemet kapja

4. **SEO téma mező életciklusának letisztázása**
   - világos döntés: külön storage marad-e vagy backend mezőbe kerül később

5. **WebP státusz fallbackek auditja**
   - cache vs file type vs generated result

## Mit NE javítsunk egyszerre

Ne egy taskban történjen egyszerre:

- lakáslista backend/frontend szinkron
- kategóriamodel egységesítés
- SEO modal és checker átírás
- WebP státuszrendszer finomhangolás
- badge és cache réteg átrendezés

Ennek oka:

- ugyanazokat a state és cache rétegeket több hiba érinti
- ha ezt egyben nyúlunk meg, nehéz lesz megmondani, melyik javítás melyik regressziót okozta

## Záró megjegyzés

A rendszer jelenleg nem "összeomlott", hanem több párhuzamos, részben helyes adatfolyam együttélése miatt lett törékeny. A legjobb következő lépés nem a nagy refaktor, hanem 1-1 jól körülhatárolt lánc stabilizálása:

1. lakáskulcs
2. kategória
3. SEO téma
4. státuszforrás


[CHANGE 2026-04-26 00:00] D2 kép SEO és fókuszpont review dokumentum létrehozása a source inventory alapján.

# D2 kép SEO + fókuszpont review

Ez a dokumentum nem frontend adatforrás.
Ez nem végleges SEO registry.
Célja a D2 source képek emberi review-ja.
A végleges adatok később kerülhetnek vissza a source inventory / image registry megfelelő mezőibe.
WP alt/title/caption nem számít megbízható forrásnak.

## 1. Review szabályok

- Az alt szöveg ne legyen kulcsszóhalmozás.
- Az alt szöveg csak azt írja le, ami ténylegesen látható a képen.
- A title rövid képnév legyen.
- A caption emberibb képaláírás lehet, de nem kötelező minden képre.
- A focusPoint hero és card képnél különösen fontos.
- Magyar és angol mezők is szükségesek.
- A WP title, caption, alt vagy fájlnév nem végleges SEO adat.

## 2. D2 képek áttekintő táblázata

| Source ID | Szerep | WP ID / local | Jelenlegi fájlnév | Jelenlegi URL | Méret | Sorrend | Javasolt target path | Review státusz |
|---|---|---|---|---|---|---|---|---|
| d2-source-hero-mobile-01 | hero_mobile | local | d2-hero-mobile.webp | /images/d2-hero-mobile.webp | 1080x810 | - | /images/accommodations/d2/hero/dandelion-d2-kisapati-hero-mobile-01.webp | TODO |
| d2-source-hero-desktop-01 | hero_desktop | WP 7870 | 2025-09-29-10-27-39.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-39.webp | 1440x1080 | - | /images/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp | TODO |
| d2-source-card-01 | card | WP | 2024-06-14-15-27-24-scaled.jpeg.webp | https://dandelionhouse.hu/wp-content/uploads/2024/11/2024-06-14-15-27-24-scaled.jpeg.webp | TODO | - | /images/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp | TODO |
| d2-source-gallery-01 | gallery, thumbnail | WP 7872 | 2025-09-29-10-19-03.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-19-03.webp | 1440x1080 | 1 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-01.webp | TODO |
| d2-source-gallery-02 | gallery, thumbnail | WP 7851 | 2025-09-29-10-36-45.jpeg | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-36-45.jpeg | 1440x1080 | 2 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-02.webp | TODO |
| d2-source-gallery-03 | gallery, thumbnail | WP 7857 | 2025-09-29-10-39-12.jpeg | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-39-12.jpeg | 1440x1080 | 3 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-03.webp | TODO |
| d2-source-gallery-04 | gallery, thumbnail | WP 7871 | 2025-09-29-10-26-50.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-26-50.webp | 1440x1080 | 4 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-04.webp | TODO |
| d2-source-gallery-05 | gallery, thumbnail | WP 7875 | IMG_9347.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/IMG_9347.webp | 1440x1080 | 5 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-05.webp | TODO |
| d2-source-gallery-06 | gallery, thumbnail | WP 7866 | 2025-09-29-10-19-03-1.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-19-03-1.webp | 1440x1080 | 6 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-06.webp | TODO |
| d2-source-gallery-07 | gallery, thumbnail | WP 7846 | 2025-09-29-10-34-41.jpeg | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-34-41.jpeg | 1440x1080 | 7 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-07.webp | TODO |
| d2-source-gallery-08 | gallery, thumbnail | WP 7864 | 2025-09-29-10-26-50-1.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-26-50-1.webp | 1440x1080 | 8 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-08.webp | TODO |
| d2-source-gallery-09 | gallery, thumbnail | WP 7853 | 2025-09-29-10-38-00.jpeg | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-38-00.jpeg | 1440x1080 | 9 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-09.webp | TODO |
| d2-source-gallery-10 | gallery, thumbnail | WP 7855 | 2025-09-29-10-38-30.jpeg | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-38-30.jpeg | 1440x1080 | 10 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-10.webp | TODO |
| d2-source-gallery-11 | gallery, thumbnail | WP 7860 | 2025-09-29-10-39-48.jpeg | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-39-48.jpeg | 1440x1080 | 11 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-11.webp | TODO |
| d2-source-gallery-12 | gallery, thumbnail | WP 7862 | 2025-09-29-10-27-54-1.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-54-1.webp | 1440x1080 | 12 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-12.webp | TODO |
| d2-source-gallery-13 | gallery, thumbnail | WP 7865 | 2025-09-29-10-23-57.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-23-57.webp | 1440x1080 | 13 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-13.webp | TODO |
| d2-source-gallery-14 | gallery, thumbnail | WP 7868 | 2025-09-29-10-28-14.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-28-14.webp | 1440x1080 | 14 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-14.webp | TODO |
| d2-source-gallery-15 | gallery, thumbnail | WP 7870 | 2025-09-29-10-27-39.webp | https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-39.webp | 1440x1080 | 15 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-15.webp | TODO |
| d2-source-gallery-16 | gallery, thumbnail | WP 7873 | IMG_9346.jpg | https://dandelionhouse.hu/wp-content/uploads/2025/09/IMG_9346.jpg | 1440x1080 | 16 | /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-16.webp | TODO |

## 3. Képenkénti review blokkok

## d2-source-hero-mobile-01

Forrás:
- role: hero_mobile
- wpId / local: local
- currentFilename: d2-hero-mobile.webp
- currentUrl: /images/d2-hero-mobile.webp
- current size: 1080x810
- current sortOrder: -
- target hero path: /images/accommodations/d2/hero/dandelion-d2-kisapati-hero-mobile-01.webp
- target thumb path: -

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-hero-desktop-01

Forrás:
- role: hero_desktop
- wpId / local: WP 7870
- currentFilename: 2025-09-29-10-27-39.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-39.webp
- current size: 1440x1080
- current sortOrder: -
- target hero path: /images/accommodations/d2/hero/dandelion-d2-kisapati-hero-desktop-01.webp
- target thumb path: -

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-card-01

Forrás:
- role: card
- wpId / local: WP
- currentFilename: 2024-06-14-15-27-24-scaled.jpeg.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2024/11/2024-06-14-15-27-24-scaled.jpeg.webp
- current size: TODO
- current sortOrder: -
- target card path: /images/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp
- target thumb path: -

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-01

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7872
- currentFilename: 2025-09-29-10-19-03.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-19-03.webp
- current size: 1440x1080
- current sortOrder: 1
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-01.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-01.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-02

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7851
- currentFilename: 2025-09-29-10-36-45.jpeg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-36-45.jpeg
- current size: 1440x1080
- current sortOrder: 2
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-02.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-02.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-03

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7857
- currentFilename: 2025-09-29-10-39-12.jpeg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-39-12.jpeg
- current size: 1440x1080
- current sortOrder: 3
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-03.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-03.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-04

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7871
- currentFilename: 2025-09-29-10-26-50.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-26-50.webp
- current size: 1440x1080
- current sortOrder: 4
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-04.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-04.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-05

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7875
- currentFilename: IMG_9347.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/IMG_9347.webp
- current size: 1440x1080
- current sortOrder: 5
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-05.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-05.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-06

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7866
- currentFilename: 2025-09-29-10-19-03-1.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-19-03-1.webp
- current size: 1440x1080
- current sortOrder: 6
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-06.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-06.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-07

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7846
- currentFilename: 2025-09-29-10-34-41.jpeg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-34-41.jpeg
- current size: 1440x1080
- current sortOrder: 7
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-07.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-07.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-08

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7864
- currentFilename: 2025-09-29-10-26-50-1.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-26-50-1.webp
- current size: 1440x1080
- current sortOrder: 8
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-08.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-08.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-09

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7853
- currentFilename: 2025-09-29-10-38-00.jpeg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-38-00.jpeg
- current size: 1440x1080
- current sortOrder: 9
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-09.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-09.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-10

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7855
- currentFilename: 2025-09-29-10-38-30.jpeg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-38-30.jpeg
- current size: 1440x1080
- current sortOrder: 10
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-10.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-10.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-11

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7860
- currentFilename: 2025-09-29-10-39-48.jpeg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-39-48.jpeg
- current size: 1440x1080
- current sortOrder: 11
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-11.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-11.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-12

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7862
- currentFilename: 2025-09-29-10-27-54-1.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-54-1.webp
- current size: 1440x1080
- current sortOrder: 12
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-12.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-12.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-13

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7865
- currentFilename: 2025-09-29-10-23-57.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-23-57.webp
- current size: 1440x1080
- current sortOrder: 13
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-13.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-13.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-14

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7868
- currentFilename: 2025-09-29-10-28-14.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-28-14.webp
- current size: 1440x1080
- current sortOrder: 14
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-14.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-14.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-15

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7870
- currentFilename: 2025-09-29-10-27-39.webp
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/2025-09-29-10-27-39.webp
- current size: 1440x1080
- current sortOrder: 15
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-15.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-15.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## d2-source-gallery-16

Forrás:
- role: gallery, thumbnail
- wpId / local: WP 7873
- currentFilename: IMG_9346.jpg
- currentUrl: https://dandelionhouse.hu/wp-content/uploads/2025/09/IMG_9346.jpg
- current size: 1440x1080
- current sortOrder: 16
- target gallery path: /images/accommodations/d2/gallery/dandelion-d2-kisapati-gallery-16.webp
- target thumb path: /images/accommodations/d2/thumbs/dandelion-d2-kisapati-thumb-16.webp

Kitöltendő review mezők:
- room/theme:
- alt.hu:
- alt.en:
- title.hu:
- title.en:
- caption.hu:
- caption.en:
- focusPoint:
- crop note:
- approved: no

Megjegyzés:
- TODO

## 4. Hiányzó döntések listája

- Melyik kép legyen végleges desktop hero.
- A mobil hero marad-e a jelenlegi lokális WebP.
- Melyik kép legyen a végleges card kép.
- A galéria sorrend végleges-e.
- Mely képekhez kell külön crop/focusPoint döntés.
- Mely képeket kell esetleg kihagyni a végleges galériából.
- Kell-e külön thumbnail crop minden galériaképhez.
- Mely képek kapjanak caption mezőt, és melyeknél maradjon üres.

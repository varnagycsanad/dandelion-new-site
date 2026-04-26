[CHANGE 2026-04-26 00:00] D2 kép SEO és fókuszpont review dokumentum létrehozása a source inventory alapján.
[CHANGE 2026-04-26 00:00] D2 SEO és fókuszpont v0 javaslatok beírása review célra.

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
- room/theme: külső / fedett terasz / kert
- alt.hu: Dandelion D2 vendégház fedett terasza és kertje Kisapátiban
- alt.en: Covered terrace and garden of the Dandelion D2 guesthouse in Kisapáti
- title.hu: D2 fedett terasz és kert
- title.en: D2 covered terrace and garden
- caption.hu: A Dandelion D2 vendégház fedett terasza és zárt kertje.
- caption.en: The covered terrace and enclosed garden of the Dandelion D2 guesthouse.
- focusPoint: center center
- crop note: Mobil herohoz jó, a ház és a sárga teraszbútor maradjon középen.
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
- room/theme: külső / vendégház / terasz
- alt.hu: Dandelion D2 kertes vendégház fedett terasszal Kisapátiban
- alt.en: Dandelion D2 garden guesthouse with covered terrace in Kisapáti
- title.hu: D2 kertes vendégház
- title.en: D2 garden guesthouse
- caption.hu: A Dandelion D2 vendégház kívülről, fedett terasszal és kerttel.
- caption.en: Exterior view of Dandelion D2 with covered terrace and garden.
- focusPoint: center center
- crop note: Desktop herohoz jó; a ház és a terasz legyen a fő fókusz.
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
- room/theme: külső / vendégház / kert
- alt.hu: Dandelion D2 vendégház kerttel és fedett terasszal
- alt.en: Dandelion D2 guesthouse with garden and covered terrace
- title.hu: D2 vendégház kerttel
- title.en: D2 guesthouse with garden
- caption.hu: Kertes, önálló vendégház fedett terasszal.
- caption.en: A private garden guesthouse with a covered terrace.
- focusPoint: center center
- crop note: Kártyaképhez jó, de később érdemes kevésbé széles / tisztább vágást választani.
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
- room/theme: nappali / kandalló / teraszkapcsolat
- alt.hu: Nappali kandallóval és teraszkapcsolattal a Dandelion D2 vendégházban
- alt.en: Living room with fireplace and terrace access at Dandelion D2
- title.hu: D2 nappali teraszkapcsolattal
- title.en: D2 living room with terrace access
- caption.hu: Világos nappali kandallóval, közvetlen kijárattal a fedett teraszra.
- caption.en: Bright living room with a fireplace and direct access to the covered terrace.
- focusPoint: center center
- crop note: A kandalló, kanapé és nyitott teraszajtó maradjon látható.
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
- room/theme: nappali / kandalló
- alt.hu: Dandelion D2 nappali kanapéval, kandallóval és nagy üvegajtóval
- alt.en: Dandelion D2 living room with sofa, fireplace and large glass door
- title.hu: D2 nappali kandallóval
- title.en: D2 living room with fireplace
- caption.hu: A nappali kandallós ülősarka természetes fénnyel és teraszkapcsolattal.
- caption.en: The fireplace seating area with natural light and terrace access.
- focusPoint: center center
- crop note: Jó galériakép; ha ritkítunk, gallery-01 vagy gallery-02 közül elég lehet egy.
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
- room/theme: nappali / galéria / belső tér
- alt.hu: Galériás belső tér kandallóval a Dandelion D2 vendégházban
- alt.en: Gallery-style interior with fireplace at the Dandelion D2 guesthouse
- title.hu: D2 galériás belső tér
- title.en: D2 gallery-style interior
- caption.hu: A D2 galériás belső tere, nappalival és fa szerkezetű mennyezettel.
- caption.en: The gallery-style interior of D2 with living area and wooden ceiling structure.
- focusPoint: center center
- crop note: A ferde nézőpont miatt óvatosan; ne legyen fő hero kép.
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
- room/theme: fedett terasz / kert
- alt.hu: Fedett terasz sárga étkezőasztallal a Dandelion D2 kertjében
- alt.en: Covered terrace with yellow dining table in the Dandelion D2 garden
- title.hu: D2 fedett terasz
- title.en: D2 covered terrace
- caption.hu: A fedett terasz kültéri étkezővel és kertkapcsolattal.
- caption.en: Covered outdoor dining terrace connected to the garden.
- focusPoint: center center
- crop note: Jó teraszkép; a sárga asztal legyen fókuszban.
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
- room/theme: fürdőszoba
- alt.hu: Dandelion D2 fürdőszoba káddal, mosdóval és világos ablakkal
- alt.en: Dandelion D2 bathroom with bathtub, sink and bright window
- title.hu: D2 fürdőszoba káddal
- title.en: D2 bathroom with bathtub
- caption.hu: Világos fürdőszoba káddal, mosdóval és praktikus tárolóval.
- caption.en: Bright bathroom with bathtub, sink and practical storage.
- focusPoint: center center
- crop note: Galériába jó, thumbnailnél a mosdó és kád maradjon felismerhető.
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
- room/theme: nappali / kandalló / terasz
- alt.hu: Nappali kandallóval és kertre nyíló teraszajtóval a Dandelion D2-ben
- alt.en: Living room with fireplace and garden-facing terrace door at Dandelion D2
- title.hu: D2 nappali kertkapcsolattal
- title.en: D2 living room with garden access
- caption.hu: A nappaliból közvetlenül elérhető a fedett terasz és a kert.
- caption.en: The living room opens directly to the covered terrace and garden.
- focusPoint: center center
- crop note: Hasonló a gallery-01-hez; végleges galériában lehet, hogy elég az egyik.
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
- room/theme: hálószoba / franciaágy
- alt.hu: Dandelion D2 hálószoba franciaággyal és kék textilekkel
- alt.en: Dandelion D2 bedroom with double bed and blue textiles
- title.hu: D2 franciaágyas hálószoba
- title.en: D2 double bedroom
- caption.hu: Kényelmes hálószoba franciaággyal és természetes hangulatú berendezéssel.
- caption.en: Comfortable bedroom with double bed and a warm natural interior.
- focusPoint: center center
- crop note: Ágy maradjon középen; jó galériakép.
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
- room/theme: fedett terasz / kert
- alt.hu: Dandelion D2 fedett terasza sárga kültéri étkezővel
- alt.en: Dandelion D2 covered terrace with yellow outdoor dining set
- title.hu: D2 terasz kültéri étkezővel
- title.en: D2 terrace with outdoor dining set
- caption.hu: Fedett terasz sárga kültéri bútorokkal, közvetlen kertkapcsolattal.
- caption.en: Covered terrace with yellow outdoor furniture and direct garden access.
- focusPoint: center center
- crop note: Nagyon hasonló a gallery-04-hez; végleges galériában lehet választani kell.
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
- room/theme: konyha / étkező / galéria
- alt.hu: Dandelion D2 konyha sárga étkezőasztallal és galériás térrel
- alt.en: Dandelion D2 kitchen with yellow dining table and gallery-style interior
- title.hu: D2 konyha és étkező
- title.en: D2 kitchen and dining area
- caption.hu: A konyha és étkező a galériás belső térrel együtt.
- caption.en: Kitchen and dining area within the gallery-style interior.
- focusPoint: center center
- crop note: Jó, mert mutatja a konyhát és a galériát is.
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
- room/theme: konyha
- alt.hu: Dandelion D2 felszerelt konyhája fehér konyhabútorral
- alt.en: Equipped kitchen at Dandelion D2 with white cabinetry
- title.hu: D2 felszerelt konyha
- title.en: D2 equipped kitchen
- caption.hu: Praktikus, felszerelt konyha a D2 vendégházban.
- caption.en: Practical equipped kitchen in the Dandelion D2 guesthouse.
- focusPoint: center center
- crop note: A pult és konyhabútor maradjon középen.
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
- room/theme: emeleti galériás hálószoba / két ágy
- alt.hu: Emeleti galériás hálószoba két külön ággyal a Dandelion D2-ben
- alt.en: Upstairs gallery bedroom with two single beds at Dandelion D2
- title.hu: D2 emeleti galériás hálószoba
- title.en: D2 upstairs gallery bedroom
- caption.hu: A galériaszinten kialakított hálórész két külön ággyal.
- caption.en: The upstairs gallery sleeping area with two single beds.
- focusPoint: center center
- crop note: Fontos D2-kép; SEO-ban jó, mert mutatja a galériás hálót.
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
- room/theme: külső / fedett terasz / kert
- alt.hu: Dandelion D2 fedett terasza és kertje kívülről
- alt.en: Exterior view of Dandelion D2 covered terrace and garden
- title.hu: D2 külső terasznézet
- title.en: D2 exterior terrace view
- caption.hu: A ház fedett terasza és kertje kívülről.
- caption.en: Exterior view of the covered terrace and garden.
- focusPoint: center center
- crop note: Hasonló a hero/mobile képekhez; végleges galériában duplikációt ellenőrizni.
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
- room/theme: nappali / kanapé / kilátás
- alt.hu: Dandelion D2 nappali kanapéval és ablakon át látható hegyi kilátással
- alt.en: Dandelion D2 living room with sofa and mountain view through the window
- title.hu: D2 nappali kilátással
- title.en: D2 living room with view
- caption.hu: A nappali ülősarka ablakon át látható hegyi kilátással.
- caption.en: The living room seating area with a mountain view through the window.
- focusPoint: center center
- crop note: A képet csak részben látom a screenshoton; ellenőrizd teljes nézetben.
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
- room/theme: külső / fedett terasz / kert
- alt.hu: Fedett terasz és kert a Dandelion D2 vendégháznál
- alt.en: Covered terrace and garden at the Dandelion D2 guesthouse
- title.hu: D2 kert és fedett terasz
- title.en: D2 garden and covered terrace
- caption.hu: A D2 fedett terasza kültéri étkezővel és zöld kerttel.
- caption.en: D2 covered terrace with outdoor dining area and green garden.
- focusPoint: center center
- crop note: Jó külső kép; hero/mobile képekkel együtt duplikációt ellenőrizni.
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
- room/theme: külső / vendégház / terasz
- alt.hu: Dandelion D2 vendégház külső nézete fedett terasszal
- alt.en: Exterior view of Dandelion D2 guesthouse with covered terrace
- title.hu: D2 külső nézet
- title.en: D2 exterior view
- caption.hu: A D2 vendégház kívülről, fedett terasszal és kerttel.
- caption.en: Exterior view of the D2 guesthouse with covered terrace and garden.
- focusPoint: center center
- crop note: Ez a desktop hero-val azonos/azonosnak tűnik; végleges galériában lehet, hogy ne szerepeljen külön.
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
- room/theme: fürdőszoba
- alt.hu: Dandelion D2 fürdőszoba mosdóval, káddal és WC-vel
- alt.en: Dandelion D2 bathroom with sink, bathtub and toilet
- title.hu: D2 fürdőszoba
- title.en: D2 bathroom
- caption.hu: A D2 fürdőszobája mosdóval, káddal és WC-vel.
- caption.en: The D2 bathroom with sink, bathtub and toilet.
- focusPoint: center center
- crop note: Jó második fürdőszobakép; ha rövidebb galéria kell, gallery-05 vagy 16 közül elég lehet egy.
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

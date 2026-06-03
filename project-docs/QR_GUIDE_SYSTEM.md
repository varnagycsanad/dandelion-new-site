# QR-os vendegutmutato rendszer

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: QR guide rendszer dokumentacios kontextus
Do not use for: aktualis guide route/build ellenorzes nelkul


## Projektalap

A QR-os vendegutmutato rendszer celja QR-koddal megnyithato, mobil-first vendegutmutatok letrehozasa.

Ezek az oldalak nem SEO-, blog- vagy marketingoldalak, hanem vendegsegito hasznalati oldalak. A fo szempont a gyors mobilos eleres, az egyertelmu hasznalat es a hazakhoz, illetve eszkozokhoz kapcsolodo gyakorlati informaciok atadasa.

## Utvonalstruktura

- Fo utvonal: `/guide/`
- Hazankenti fooldal pelda: `/guide/fugehaz/`
- Reszletes eszkozoldal pelda: `/guide/fugehaz/dezsa/`
- Kozos guide pelda: `/guide/shared/panorama-pool/`

## QR-kod logika

A QR-kod mindig a magyar alapoldalra mutat.

Pelda:

- QR celoldal: `/guide/fugehaz/dezsa/`
- Alapnyelv: magyar
- Nyelvvaltas: oldalon beluli nyelvvalasztassal

## Nyelvek

Indulo nyelvek:

- HU
- EN

A DE struktura legyen elokeszitve, de nemet nyelvu valtozat csak akkor jelenjen meg, amikor a forditas kesz es ellenorzott.

## Indexeles

A guide oldalak legyenek:

- `noindex`
- `follow`

Ezek az oldalak nem keresomotoros forgalomszerzesre keszulnek, hanem a helyszinen tartozkodo vendegek gyors tajekoztatasara.

## Elso prototipus

Az elso prototipus:

- Fugehaz dezsafurdo hasznalati utmutato


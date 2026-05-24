# Oldalterkep es Google sitemap ellenorzes

Datum: 2026-05-24

## Forrasok

- Oldalak: `dist/**/*.html`
- Sitemap forras: `src/data/site-seo.ts` -> `SITEMAP_PATHS`
- Sitemap endpoint: `src/pages/sitemap.xml.ts`
- Lokalis build sitemap: `dist/sitemap.xml`
- Google fele publikus sitemap: `https://dandelionhouse.hu/sitemap.xml`
- Robots hivatkozas: `https://dandelionhouse.hu/robots.txt` -> `Sitemap: https://dandelionhouse.hu/sitemap.xml`

## Osszegzes

- Jelenlegi buildben talalt HTML oldalak szama: 53
- Lokalis `dist/sitemap.xml` URL-ek szama: 42
- Publikus `https://dandelionhouse.hu/sitemap.xml` URL-ek szama: 42
- A javitas utan a lokalis sitemap mar a tiszta angol Panorama Pool URL-t tartalmazza: `/en/panorama-pool/`.
- A sitemap nem azonos az osszes epulo oldallal: 11 epulo oldal nincs benne.
- A hianyzo 11 oldal `noindex`, ezert SEO szempontbol rendben van, hogy nem szerepel a sitemapben.
- A publikus sitemap a kovetkezo deploy utan tudja atvenni a lokalis javitast.

## Jelenlegi oldalterkep, a build alapjan

```text
/
/adatkezelesi-tajekoztato/
/aszf/
/dandelion-d1/
/dandelion-d2/
/dandelion-koveskal/
/dandelion-royal-homes/
/dandelion-szepvolgyi-vendeghaz/
/dandelion-szololiget/
/dandelion-vintage/
/dandelion-zsalya/
/de/
/elmenyek/
/elmenyek/balaton/
/elmenyek/bor-es-panorama/
/elmenyek/kerekpar/
/elmenyek/tanuhegyek/
/en/
/en/bike-rental/
/en/contact/
/en/dandelion-d1/
/en/dandelion-d2/
/en/dandelion-fugehaz/
/en/dandelion-koveskal/
/en/dandelion-vintage/
/en/dandelion-zsalya/
/en/experiences/
/en/imprint/
/en/lake-balaton/
/en/panorama-pool/
/en/privacy-policy/
/en/royal/
/en/szallasok/
/en/szepvolgyi/
/en/szololiget/
/en/terms-and-conditions/
/en/wineries/
/en/witness-hills/
/fuge/
/guide/d1/
/guide/d1/medence/
/guide/d2/
/guide/d2/medence/
/guide/fugehaz/
/guide/fugehaz/dezsa/
/guide/fugehaz/medence/
/impresszum/
/kapcsolat/
/panorama-pool/
/royal/
/szallasok/
/szepvolgyi/
/szololiget/
```

## Google fele sitemapben szereplo URL-ek

```text
/
/adatkezelesi-tajekoztato/
/aszf/
/dandelion-d1/
/dandelion-d2/
/dandelion-koveskal/
/dandelion-vintage/
/dandelion-zsalya/
/elmenyek/
/elmenyek/balaton/
/elmenyek/bor-es-panorama/
/elmenyek/kerekpar/
/elmenyek/tanuhegyek/
/en/
/en/bike-rental/
/en/contact/
/en/dandelion-d1/
/en/dandelion-d2/
/en/dandelion-fugehaz/
/en/dandelion-koveskal/
/en/dandelion-vintage/
/en/dandelion-zsalya/
/en/experiences/
/en/imprint/
/en/lake-balaton/
/en/panorama-pool/
/en/privacy-policy/
/en/royal/
/en/szallasok/
/en/szepvolgyi/
/en/szololiget/
/en/terms-and-conditions/
/en/wineries/
/en/witness-hills/
/fuge/
/impresszum/
/kapcsolat/
/panorama-pool/
/royal/
/szallasok/
/szepvolgyi/
/szololiget/
```

## Buildben van, de sitemapben nincs

```text
/dandelion-royal-homes/          noindex, canonical: /royal/
/dandelion-szepvolgyi-vendeghaz/ noindex, canonical: /szepvolgyi/
/dandelion-szololiget/           noindex, canonical: /szololiget/
/de/                             noindex, canonical: /
/guide/d1/                       noindex
/guide/d1/medence/               noindex
/guide/d2/                       noindex
/guide/d2/medence/               noindex
/guide/fugehaz/                  noindex
/guide/fugehaz/dezsa/            noindex
/guide/fugehaz/medence/          noindex
```

## Sitemapben van, de buildben nincs

Nincs ilyen URL.

## Javaslat

1. A `noindex` alias es guide oldalak sitemapen kivul tartasa rendben van.

## Javitas utan

2026-05-24-en a tiszta angol Panorama Pool URL lett az egyetlen kanonikus valtozat:

- Sitemap: `/en/panorama-pool/`
- Canonical: `https://dandelionhouse.hu/en/panorama-pool/`
- A postbuild script mar nem gyart `dist/en/panorama-pool.html` alias fajlt.
- Friss build ellenorzes: `dist/en/panorama-pool.html` nem letezik, es a sitemapben nincs `/en/panorama-pool.html`.

[CHANGE 2026-05-20 00:00] Google AI Readiness schema terv munkalap letrehozva.

# Google AI Readiness schema terv

Status: RESZBEN TELJESULT
Last checked: 2026-06-02
Use for: schema bovitesi terv kontextus
Do not use for: aktualis schema implementacio teljes allapotakent


Cel: mezoterkep a kesobbi schema boviteshez. Ez nem implementacio.

Alapelv: schema csak olyan adatot tartalmazhat, ami lathato oldaltartalomban is szerepel, es repo vagy tulajdonosi ellenorzes alapjan biztos.

## Jelenlegi schema allapot

- `BaseLayout.astro`: `Organization` es `WebSite` schema minden oldalon.
- `AccommodationPage.astro`: `LodgingBusiness` es `BreadcrumbList` schema minden kozos szallassablonos oldalon.
- `LodgingBusiness` jelenlegi mezok: `name`, `url`, `description`, `image`, `telephone`.
- Canonical es hreflang: `BaseLayout.astro` es `src/data/site-seo.ts` alapjan epul.

## Javasolt mezoterkep

| Schema elem / mezo | Szukseges lathato adat | Jelenlegi forras | Statusz |
| --- | --- | --- | --- |
| `LodgingBusiness.name` | szallas neve | pageData seo/hero | MEGVAN |
| `LodgingBusiness.url` | canonical URL | `site-seo.ts`, wrapper canonicalPath | MEGVAN |
| `LodgingBusiness.description` | oldal meta / lathato leiras | pageData.seo.description es details | MEGVAN |
| `LodgingBusiness.image` | hero kep URL es alt | image registry + template | MEGVAN |
| `LodgingBusiness.telephone` | publikus telefon | BaseLayout / template hardcode | MEGVAN |
| `LodgingBusiness.address` | publikalhato cim | nincs teljes publikus cim szallasonkent | HIANYZIK |
| `LodgingBusiness.geo` | publikalhato koordinata | nincs koordinata | HIANYZIK |
| `LodgingBusiness.amenityFeature` | lathato felszereltseg: klima, wifi, parkolas, medence, kert, terasz | pageData.amenities / facts, de nem teljes | ELLENORIZENDO |
| `LodgingBusiness.maximumAttendeeCapacity` vagy kapacitas jellegu adat | ferohely | pageData facts / statusz tabla | ELLENORIZENDO |
| `LodgingBusiness.petsAllowed` jellegu adat | kisallat-szabaly | nincs biztos adat | HIANYZIK |
| `LodgingBusiness.checkinTime` / `checkoutTime` | lathato check-in/check-out | nem talaltam a vizsgalt szallasoldali adatban | HIANYZIK |
| `LodgingBusiness.makesOffer` / booking URL | lathato foglalasi href | bookingLink adat van, de CTA JS-only | ELLENORIZENDO |
| `BreadcrumbList.itemListElement` | kezdolap + szallas neve | template | MEGVAN |
| `ImageObject.contentUrl` | kep URL | image registry | MEGVAN |
| `ImageObject.name` | kep title | image registry title | ELLENORIZENDO |
| `ImageObject.caption` | kep caption lathato oldalon | registry caption van, de oldali megjelenes nem egyertelmu | ELLENORIZENDO |
| `FAQPage` | valodi, lathato GYIK kerdes/valasz blokk | nincs GYIK blokk | HIANYZIK |
| `Organization.logo` | brand logo | BaseLayout | MEGVAN |
| `Organization.telephone` | brand telefon | BaseLayout | MEGVAN |
| `LocalBusiness` brand szinten | publikus brand adatok, cim/terulet | reszben BaseLayout | ELLENORIZENDO |
| `VacationRental` tipus | Google altal elfogadhato vacation rental modell es lathato adatok | meg nincs dontes / SabeeApp tisztazas | ELLENORIZENDO |

## Implementacio elotti feltetelek

1. Szallasadat-hianyok tulajdonosi ellenorzese.
2. Booking link terkep veglegesitese.
3. Lathato gyors dontesi blokk egysegesitese.
4. Koveskal / Kovagoors booking es telepules-nev tisztazasa.
5. ImageObject csak akkor, ha a kepadatok nem generikusak es a caption hasznalata tiszta.
6. FAQPage csak valodi, oldalon is lathato GYIK utan.

## Tiltott schema lepesek

- Nem kerulhet schema-ba nem lathato adat.
- Nem kerulhet schema-ba bizonytalan kisallat, parkolas, wifi, medence vagy agykiosztas.
- Nem szabad `FAQPage`-et letrehozni csak SEO okbol.
- Nem szabad `VacationRental`-t implementalni Google / SabeeApp tisztazas elott.

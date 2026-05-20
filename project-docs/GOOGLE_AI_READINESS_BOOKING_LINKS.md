[CHANGE 2026-05-20 00:00] Google AI Readiness foglalasi link terkep letrehozva.
[CHANGE 2026-05-20 00:00] Dandelion Koveskal booking statusz tulajdonosi megerosites alapjan frissitve.

# Google AI Readiness booking link terkep

Cel: latszodjon, melyik szallasnal milyen foglalasi link van, es hol van crawler / CTA kockazat.

Forras: `src/data/accommodation-pages/*.ts`, `src/templates/AccommodationPage.astro`, `src/layouts/BaseLayout.astro`, HU/EN wrapper oldalak.

## Fo megallapitasok

- A legtobb szallas HU/EN bookingLink mezoben SabeeApp URL-t hasznal, szobaspecifikus `selectedRooms` parameterrel.
- A HU linkek `lang=Hu`, az EN linkek `lang=En` parametert hasznalnak.
- A szallasoldali fo CTA-k jelenleg `button onclick="OpenBE()"` elemek, ezert a szobaspecifikus booking URL nem latszik kozvetlen `<a href>`-kent.
- A header CTA rendes `<a href>`, de property szintu SabeeApp link, nem szobaspecifikus.
- Dandelion Koveskal eseteben tulajdonosi megerosites alapjan nincs SabeeApp booking link; ezt kesobbi booking/CTA donteskent kell kezelni.

## Link tabla

| Szallas | HU oldal URL | EN oldal URL | HU booking link | EN booking link | SabeeApp link-e | Szobaspecifikus-e | JS-only OpenBE van-e | Crawler href latszik-e a szallasoldali fo CTA-n | Problema / kockazat | Javasolt javitas |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dandelion D1 | `/dandelion-d1/` | `/en/dandelion-d1/` | `selectedRooms=2be20f0b68a1114a&lang=Hu` | `selectedRooms=2be20f0b68a1114a&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Dandelion D2 | `/dandelion-d2/` | `/en/dandelion-d2/` | `selectedRooms=c64244f6153c3ca1&lang=Hu` | `selectedRooms=c64244f6153c3ca1&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Fugehaz | `/fuge/` | `/en/dandelion-fugehaz/` | `selectedRooms=af2fdb8ed2ebb145&lang=Hu` | `selectedRooms=af2fdb8ed2ebb145&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Zsalya Vendeghaz | `/dandelion-zsalya/` | `/en/dandelion-zsalya/` | `selectedRooms=cf20da88f046211e&lang=Hu` | `selectedRooms=cf20da88f046211e&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Szololiget Vendeghaz | `/szololiget/` | `/en/szololiget/` | `selectedRooms=e30c4b62d7324b3f&lang=Hu` | `selectedRooms=e30c4b62d7324b3f&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Szepvolgyi Vendeghaz | `/szepvolgyi/` | `/en/szepvolgyi/` | `selectedRooms=7d46f283f2f5792f&lang=Hu` | `selectedRooms=7d46f283f2f5792f&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Dandelion Royal Homes | `/royal/` | `/en/royal/` | `selectedRooms=c4b8753ec9ad4dc9&lang=Hu` | `selectedRooms=c4b8753ec9ad4dc9&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Dandelion Vintage | `/dandelion-vintage/` | `/en/dandelion-vintage/` | `selectedRooms=0c9e5eaae0545ee3&lang=Hu` | `selectedRooms=0c9e5eaae0545ee3&lang=En` | igen | igen | igen | nem | CTA crawlernek nem egyertelmu href | `<a href={bookingLink}>` kompatibilis CTA minta |
| Dandelion Koveskal | `/dandelion-koveskal/` | `/en/dandelion-koveskal/` | nincs SabeeApp booking link | nincs SabeeApp booking link | nem | nem | igen | nem | nincs foglalasi motor link; a korabbi sajat oldalas cel nem tekintheto booking CTA-nak | kesobbi booking/CTA dontes: kulon kapcsolatfelvetel, erdeklodes vagy mas foglalasi ut |

## Header CTA

| Elem | Allapot |
| --- | --- |
| Header desktop CTA | `<a href={bookingHref}>`, crawler szamara lathato |
| Header mobile CTA | `<a href={bookingHref}>`, crawler szamara lathato |
| Header booking URL | `https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&lang=Hu/En` |
| Kockazat | property szintu link, nem egyezik a szallasoldali szobaspecifikus celokkal |
| Javaslat | header maradhat property szintu, de a szallasoldali CTA legyen szobaspecifikus lathato href |

## Kovetkezo booking task

1. Dandelion Koveskal CTA dontes: SabeeApp link nincs, ezert kulon foglalasi/erdeklodesi ut kell.
2. SabeeApp selectedRooms kodok tulajdonosi ellenorzese.
3. Szallasoldali CTA linkesites megtervezese a meglevo OpenBE mukodes megtartasaval.
4. Header, listing es szallasoldali CTA kommunikacio osszehangolasa.

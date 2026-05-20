[CHANGE 2026-05-20 00:00] Google AI Readiness kep SEO hianylista letrehozva.

# Google AI Readiness kep SEO hianylista

Cel: latszodjon, mely szallasoknal generikus vagy gyenge az alt/title/caption adat.

Forras: `src/data/images/accommodation-images.ts`, `src/data/images/image-types.ts`, `src/lib/accommodation-page-adapters.ts`, `src/templates/AccommodationPage.astro`.

## Fo megallapitasok

- Az image registry kezeli az `alt`, `title`, `caption` mezoket HU es EN nyelven.
- A template a hero es gallery kepeknel hasznalja az `alt` adatot.
- A gallery adapter atadja a `title` es `caption` adatot is, de a lathato caption hasznalat tovabbi ellenorzest igenyel.
- D2 kep SEO adatai reszletesebbek.
- A legtobb nem-D2 galeria alt/title/caption generikus, minta alapu.

## Szallasonkenti allapot

| Szallas | Hero kep SEO allapot | Galeria alt allapot | Title/caption allapot | HU/EN allapot | Generikus peldak | Prioritas |
| --- | --- | --- | --- | --- | --- | --- |
| Dandelion D1 | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Dandelion D1 gallery 001`, `Dandelion D1 gallery image 001.` | 1. hero, 2. medence, 3. haloszoba, 6. kert/terasz, 7. kilatas |
| Dandelion D2 | MEGVAN: hero desktop/mobile konkret SEO adatokkal | MEGVAN: reszletesebb galeria adatok | MEGVAN: reszletesebb title/caption | MEGVAN: HU/EN parok vannak | nincs fo generikus minta a D2 blokkban | fenntartasi ellenorzes |
| Fugehaz | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Fugehaz gallery 001`, `Fugehaz gallery image 001.` | 1. hero, 2. medence, 3. haloszoba, 6. kert/terasz, 7. kilatas |
| Zsalya Vendeghaz | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Zsalya gallery 001`, `Zsalya gallery image 001.` | 1. hero, 3. haloszoba, 4. furdo, 6. terasz, 7. kilatas |
| Szololiget Vendeghaz | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Szololiget gallery 001`, `Szololiget gallery image 001.` | 1. hero, 3. haloszoba, 5. konyha/etkezo, 6. terasz, 7. kilatas |
| Szepvolgyi Vendeghaz | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Szepvolgyi gallery 001`, `Szepvolgyi gallery image 001.` | 1. hero, 3. haloszoba, 4. furdo, 6. kert/terasz, 7. Balaton/kornyek |
| Dandelion Royal Homes | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Royal Homes gallery 001`, `Royal Homes gallery image 001.` | 1. hero, 3. haloszoba, 4. furdo, 6. terasz/jakuzzi, 7. Balaton-part |
| Dandelion Vintage | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Vintage gallery 001`, `Vintage gallery image 001.` | 1. hero, 3. haloszoba, 5. konyha/etkezo, 6. udvar, 7. kornyek |
| Dandelion Koveskal / Kovagoors | ELLENORIZENDO: hero registry desktop/mobile null, fallbackAlt es gallery alapjan epul | GYENGE: generikus | GYENGE: generikus | GYENGE: HU/EN azonos mintaszeru | `Dandelion Koveskal gallery 001`, `Dandelion Koveskal gallery image 001.` | 1. hero, 3. haloszoba, 4. furdo, 6. kert/terasz, 7. Kali-medence |

## Javitasi prioritas

1. Hero kepek: minden szallasnal legyen valodi, kephez kotott HU/EN alt/title/caption.
2. Medence kepek: D1, D2, Fugehaz kozos panoramas medence tartalom, csak ha a kepen tenyleg latszik.
3. Haloszoba kepek: agyelrendezeshez illesztheto, de csak vizualis ellenorzes utan.
4. Furdo kepek: csak kepen lathato furdo/felszereltseg alapjan.
5. Konyha / etkezo kepek: felszereltseg allitasokkal osszhangban.
6. Kert / terasz kepek: kinti terek, terasz, udvar, jakuzzi, grill csak lathato tartalom szerint.
7. Kilatas / kornyek kepek: tanuhagyek, Balaton, Kali-medence csak akkor, ha kepen azonosithato.

## Kovetkezo kep SEO task

1. Kepenkenti vizualis atnezes.
2. Generikus alt/title/caption mezok listazasa kepfajl szinten.
3. HU es EN draft keszitese `approved: false` logikaval, ha erre kulon task indul.
4. Veglegesites csak jovahagyott, kepen igazolhato leirasokkal.

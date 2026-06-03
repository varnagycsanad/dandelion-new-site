[CHANGE 2026-05-20 00:00] Kep SEO Batch 1 review munkalap letrehozva image registry modositas nelkul.

# Google AI Readiness kep SEO review - Batch 1

Status: TORTENETI
Last checked: 2026-06-02
Use for: kep SEO batch review munkalap
Do not use for: vegleges jovahagyott SEO adatkent


Cel: jovahagyhato munkalap az elso kep SEO implementacios csomaghoz. Ez a dokumentum nem final SEO adat, nem image registry modositas, es nem allit be `approved:true` erteket.

Forrasok:

- `project-docs/GOOGLE_AI_READINESS.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`
- `project-docs/gallery-order-tool/*.html`
- `src/data/images/accommodation-images.ts`
- `src/data/images/image-types.ts`

Nem letezik: `src/data/images/accommodation-images.seo-test.json`.

## Review szabaly

- A `seoDraft` mezok csak jovahagyas elotti kiindulasi szovegek.
- Ahol a draft lathato tartalmat allit, azt embernek kepen kell ellenoriznie.
- Nem kerulhet at automatikusan semmi final `alt` / `title` / `caption` mezobe.
- Hero-jelolt minden szallasnal az elso gallery kep, mert a registryben nincs nem-D2 `hero.desktop` / `hero.mobile`.
- A hero-jelolt csak javaslat; desktop es mobile vagast kulon kell ellenorizni.
- `approved:true` nem szerepelhet implementacios eredmenykent.

## Osszefoglalo

| Szallas | Batch 1 tetelek | Hero-jelolt | Fo statusz | Kovetkezo muvelet |
| --- | --- | --- | --- | --- |
| Dandelion Royal Homes | hero-jelolt + elso 6 gallery | `royal-homes-022` / `dandelion-royal-homes-source-022.webp` | GYENGE / ELLENORIZENDO | emberi kepellenorzes, majd javitas |
| Szepvolgyi Vendeghaz | hero-jelolt + elso 6 gallery | `szepvolgyi-001` / `dandelion-szepvolgyi-source-001.webp` | GYENGE / ELLENORIZENDO | emberi kepellenorzes, majd javitas |
| Szololiget Vendeghaz | hero-jelolt + elso 6 gallery | `szololiget-001` / `dandelion-szololiget-source-001.webp` | GYENGE / ELLENORIZENDO | emberi kepellenorzes, majd javitas |
| Dandelion Koveskal | hero-jelolt + elso 6 gallery | `koveskal-001` / `dandelion-koveskal-source-001.webp` | GYENGE / ELLENORIZENDO | emberi kepellenorzes, majd javitas |
| Dandelion D1 | hero-jelolt + elso 6 gallery | `d1-001` / `dandelion-d1-source-001.webp` | GYENGE / ELLENORIZENDO | emberi kepellenorzes, majd javitas |
| Dandelion Vintage | hero-jelolt + elso 6 gallery | `vintage-006` / `dandelion-vintage-source-006.webp` | GYENGE / ELLENORIZENDO | emberi kepellenorzes, majd javitas |

## Dandelion Royal Homes

Hero-jelolt: `royal-homes-022` / `dandelion-royal-homes-source-022.webp` / `royal_homes.gallery[]`. Registry hero: HIANYZIK. Desktop/mobile hero szerepre ELLENORIZENDO.

| Tetel | Kepadat es jelenlegi SEO | seoDraft, nem final | Statusz | Javasolt muvelet |
| --- | --- | --- | --- | --- |
| Hero-jelolt | `royal-homes-022` / `dandelion-royal-homes-source-022.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 022`; title: `Royal Homes 022`; caption: `Royal Homes gallery image 022.` | altHu: `Tetoteraszos jakuzzi a Dandelion Royal Homes kozos pihenoteren`; titleHu: `Tetoteraszos jakuzzi a Royal Homesnal`; captionHu: `A kepen a Dandelion Royal Homes tetoteraszan elhelyezett jakuzzi lathato.`; altEn: `Rooftop hot tub in the shared relaxation area of Dandelion Royal Homes`; titleEn: `Rooftop hot tub at Royal Homes`; captionEn: `The image shows the hot tub on the rooftop terrace of Dandelion Royal Homes.` | ELLENORIZENDO | emberi ellenorzes kell |
| Galeria 1 | `royal-homes-022` / `dandelion-royal-homes-source-022.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 022`; title: `Royal Homes 022`; caption: `Royal Homes gallery image 022.` | ugyanaz a draft, mint a hero-jeloltnel | GYENGE | javitas |
| Galeria 2 | `royal-homes-007` / `dandelion-royal-homes-source-007.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 007`; title: `Royal Homes 007`; caption: `Royal Homes gallery image 007.` | altHu: `Amerikai konyhas nappali etkezoasztallal a Dandelion Royal Homes apartmanban`; titleHu: `Amerikai konyhas nappali es etkezo`; captionHu: `A kepen az amerikai konyhas nappali es az etkezoasztal lathato a teraszkapcsolattal.`; altEn: `Open-plan living room with kitchen and dining table at Dandelion Royal Homes`; titleEn: `Open-plan living room and dining area`; captionEn: `The image shows the open-plan kitchen, living room, and dining table with terrace access.` | GYENGE | javitas |
| Galeria 3 | `royal-homes-029` / `dandelion-royal-homes-source-029.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 029`; title: `Royal Homes 029`; caption: `Royal Homes gallery image 029.` | altHu: `Kerek formaju apartmanepulet a Dandelion Royal Homes lakoparkban`; titleHu: `Royal Homes epulet kulso nezetben`; captionHu: `A kepen a Royal Homes egyik ivelt homlokzatu epulete es a kornyezo setany lathato.`; altEn: `Curved apartment building in the Dandelion Royal Homes complex`; titleEn: `Royal Homes building exterior`; captionEn: `The image shows one of the curved Royal Homes buildings and the surrounding walkway.` | GYENGE | javitas |
| Galeria 4 | `royal-homes-010` / `dandelion-royal-homes-source-010.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 010`; title: `Royal Homes 010`; caption: `Royal Homes gallery image 010.` | altHu: `Dandelion Royal Homes terasza nyugaggyal es uvegkorlattal`; titleHu: `Dandelion Royal Homes terasz nyugaggyal`; captionHu: `A teraszon egy no pihen egy nyugagyon olvasassal.`; altEn: `Dandelion Royal Homes terrace with lounge chair and glass railing`; titleEn: `Dandelion Royal Homes terrace lounge`; captionEn: `A woman is relaxing on a lounge chair on the terrace reading a book.` | GYENGE | javitas |
| Galeria 5 | `royal-homes-015` / `dandelion-royal-homes-source-015.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 015`; title: `Royal Homes 015`; caption: `Royal Homes gallery image 015.` | altHu: `Dandelion Royal Homes modern konyha etkezoasztallal es szekekkel`; titleHu: `Dandelion Royal Homes etkezo es konyha`; captionHu: `Az etkezoasztalon szekek, etkeszlet es noveny, a konyhaban fa es sotet szinu konyhaszekrenyek vannak.`; altEn: `Dandelion Royal Homes modern kitchen with dining table and chairs`; titleEn: `Dandelion Royal Homes dining area and kitchen`; captionEn: `The dining table has chairs, tableware, and a plant, and the kitchen features wood and dark cabinets.` | GYENGE | javitas |
| Galeria 6 | `royal-homes-001` / `dandelion-royal-homes-source-001.webp` / `royal_homes.gallery[]`; alt: `Royal Homes gallery 001`; title: `Royal Homes 001`; caption: `Royal Homes gallery image 001.` | altHu: `Dandelion Royal Homes haloszoba agy feher torolkozokkel es laptop`; titleHu: `Dandelion Royal Homes haloszoba agy`; captionHu: `A haloszobaban latszik egy agy narancssarga takaroval, feher torolkozokkel es egy laptopon.`; altEn: `Dandelion Royal Homes bedroom bed with white towels and laptop`; titleEn: `Dandelion Royal Homes bedroom bed`; captionEn: `The bedroom has a bed with an orange cover, white towels, and a laptop on it.` | GYENGE | javitas |

Megjegyzes: a Royal Homes draftok tobb konkret allitast tartalmaznak, peldaul jakuzzi, tetoterasz, teraszkapcsolat, szemely a kepen. Ezek kulon vizualis ellenorzest igenyelnek.

## Szepvolgyi Vendeghaz

Hero-jelolt: `szepvolgyi-001` / `dandelion-szepvolgyi-source-001.webp` / `szepvolgyi.gallery[]`. Registry hero: HIANYZIK. Desktop/mobile hero szerepre ELLENORIZENDO.

| Tetel | Kepadat es jelenlegi SEO | seoDraft, nem final | Statusz | Javasolt muvelet |
| --- | --- | --- | --- | --- |
| Hero-jelolt | `szepvolgyi-001`; alt: `Szepvolgyi gallery 001`; title: `Szepvolgyi 001`; caption: `Szepvolgyi gallery image 001.` | altHu: `Szepvolgyi Vendeghaz terasz asztallal es szekkel`; titleHu: `Szepvolgyi Vendeghaz terasz`; captionHu: `A Szepvolgyi Vendeghaz teraszan kenyelmes ulohelyek vannak egy asztal korul.`; altEn: `Szepvolgyi Guesthouse terrace with table and chairs`; titleEn: `Szepvolgyi Guesthouse terrace`; captionEn: `The terrace of Szepvolgyi Guesthouse has comfortable seating around a table.` | ELLENORIZENDO | emberi ellenorzes kell |
| Galeria 1 | `szepvolgyi-001` / `dandelion-szepvolgyi-source-001.webp` / `szepvolgyi.gallery[]`; alt/title/caption mint fent | ugyanaz a draft, mint a hero-jeloltnel | GYENGE | javitas |
| Galeria 2 | `szepvolgyi-002` / `dandelion-szepvolgyi-source-002.webp` / `szepvolgyi.gallery[]`; alt: `Szepvolgyi gallery 002`; title: `Szepvolgyi 002`; caption: `Szepvolgyi gallery image 002.` | altHu: `Szepvolgyi Vendeghaz udvaranak fuvel boritott kertje fakkal es jatekelemekkel`; titleHu: `Szepvolgyi Vendeghaz udvari kert`; captionHu: `A Szepvolgyi Vendeghaz kertjeben fak es jatekelemek vannak a fuvel boritott teruleten.`; altEn: `Szepvolgyi Vendeghaz garden with grass, trees, and playground elements`; titleEn: `Szepvolgyi Vendeghaz garden`; captionEn: `The Szepvolgyi Vendeghaz garden has grass, trees, and playground equipment.` | GYENGE | javitas |
| Galeria 3 | `szepvolgyi-003` / `dandelion-szepvolgyi-source-003.webp` / `szepvolgyi.gallery[]`; alt: `Szepvolgyi gallery 003`; title: `Szepvolgyi 003`; caption: `Szepvolgyi gallery image 003.` | altHu: `Ketagyas szoba Szepvolgyi Vendeghazban`; titleHu: `Ketagyas szoba`; captionHu: `A szoba ket aggyal es ejjeliszekrenyekkel van berendezve.`; altEn: `Twin bedroom at Szepvolgyi Vendeghaz`; titleEn: `Twin bedroom`; captionEn: `The room has two beds and bedside tables.` | GYENGE | javitas |
| Galeria 4 | `szepvolgyi-004` / `dandelion-szepvolgyi-source-004.webp` / `szepvolgyi.gallery[]`; alt: `Szepvolgyi gallery 004`; title: `Szepvolgyi 004`; caption: `Szepvolgyi gallery image 004.` | altHu: `Ketagyas szoba zold takaroval es feher torolkozokkel`; titleHu: `Konnyu es tiszta ketagyas szoba`; captionHu: `A szoba kenyelmes ketagyassal es lampakkal a kis ejjeliszekrenyeken.`; altEn: `Double room with green blanket and white towels`; titleEn: `Light and clean double room`; captionEn: `The room has a comfortable double bed and lamps on small bedside tables.` | GYENGE | javitas |
| Galeria 5 | `szepvolgyi-005` / `dandelion-szepvolgyi-source-005.webp` / `szepvolgyi.gallery[]`; alt: `Szepvolgyi gallery 005`; title: `Szepvolgyi 005`; caption: `Szepvolgyi gallery image 005.` | altHu: `Tiszta furdoszoba zuhanyzoval es mosdoval`; titleHu: `Furdoszoba zuhanyzoval`; captionHu: `A furdoszoba zuhanyzoval es mosdoval kenyelmes az On szamara.`; altEn: `Clean bathroom with shower and sink`; titleEn: `Bathroom with shower`; captionEn: `The bathroom has a shower and a sink for your comfort.` | GYENGE | javitas |
| Galeria 6 | `szepvolgyi-006` / `dandelion-szepvolgyi-source-006.webp` / `szepvolgyi.gallery[]`; alt: `Szepvolgyi gallery 006`; title: `Szepvolgyi 006`; caption: `Szepvolgyi gallery image 006.` | altHu: `Furdoszoba zuhanyzoval es mosdoval`; titleHu: `Furdoszoba a Szepvolgyi Vendeghazban`; captionHu: `A kep a szallas egyik reszletet mutatja.`; altEn: `Bathroom with shower and sink`; titleEn: `Bathroom in Szepvolgyi Vendeghaz`; captionEn: `The bathroom has a shower and a sink.` | GYENGE | javitas |

Megjegyzes: a 6. kep HU captionje generikus mar a draftban is, ez javitas elott kulon ellenorizendo.

## Szololiget Vendeghaz

Hero-jelolt: `szololiget-001` / `dandelion-szololiget-source-001.webp` / `szololiget.gallery[]`. Registry hero: HIANYZIK. Desktop/mobile hero szerepre ELLENORIZENDO.

| Tetel | Kepadat es jelenlegi SEO | seoDraft, nem final | Statusz | Javasolt muvelet |
| --- | --- | --- | --- | --- |
| Hero-jelolt | `szololiget-001`; alt: `Szololiget gallery 001`; title: `Szololiget 001`; caption: `Szololiget gallery image 001.` | altHu: `Tetoteri haloszoba franciaaggyal`; titleHu: `Tetoteri haloszoba`; captionHu: `A tetoteri haloszoba vilagos, kenyelmes franciaaggyal es nagy ablakokkal.`; altEn: `Attic bedroom with double bed`; titleEn: `Attic bedroom`; captionEn: `The attic bedroom is bright, with a comfortable double bed and large windows.` | ELLENORIZENDO | emberi ellenorzes kell |
| Galeria 1 | `szololiget-001` / `dandelion-szololiget-source-001.webp` / `szololiget.gallery[]`; alt/title/caption mint fent | ugyanaz a draft, mint a hero-jeloltnel | GYENGE | javitas |
| Galeria 2 | `szololiget-002` / `dandelion-szololiget-source-002.webp` / `szololiget.gallery[]`; alt: `Szololiget gallery 002`; title: `Szololiget 002`; caption: `Szololiget gallery image 002.` | altHu: `Szololiget Vendeghaz haloszobaja nagy ablakokkal es franciaaggyal`; titleHu: `Szololiget Vendeghaz haloszoba`; captionHu: `A tetoteri haloszobaban franciaagy, fotel es nagy ablakok vannak.`; altEn: `Szololiget Vendeghaz bedroom with large windows and a double bed`; titleEn: `Szololiget Vendeghaz bedroom`; captionEn: `The attic bedroom has a double bed, an armchair, and large windows.` | GYENGE | javitas |
| Galeria 3 | `szololiget-003` / `dandelion-szololiget-source-003.webp` / `szololiget.gallery[]`; alt: `Szololiget gallery 003`; title: `Szololiget 003`; caption: `Szololiget gallery image 003.` | altHu: `Szololiget Vendeghaz haloszoba nagy ablakokkal es franciaaggyal`; titleHu: `Szololiget Vendeghaz haloszoba`; captionHu: `A haloszobaban franciaagy, kis asztalok es nagy ablakok vannak.`; altEn: `Szololiget Vendeghaz bedroom with large windows and a double bed`; titleEn: `Szololiget Vendeghaz bedroom`; captionEn: `The bedroom has a double bed, small tables, and large windows.` | GYENGE | javitas |
| Galeria 4 | `szololiget-004` / `dandelion-szololiget-source-004.webp` / `szololiget.gallery[]`; alt: `Szololiget gallery 004`; title: `Szololiget 004`; caption: `Szololiget gallery image 004.` | altHu: `Vilagos haloszoba franciaaggyal`; titleHu: `Haloszoba franciaaggyal`; captionHu: `A haloszoba vilagos, kenyelmes franciaaggyal es nagy ablakokkal.`; altEn: `Bright bedroom with a double bed`; titleEn: `Bedroom with double bed`; captionEn: `The bedroom is bright, with a comfortable double bed and large windows.` | GYENGE | javitas |
| Galeria 5 | `szololiget-005` / `dandelion-szololiget-source-005.webp` / `szololiget.gallery[]`; alt: `Szololiget gallery 005`; title: `Szololiget 005`; caption: `Szololiget gallery image 005.` | altHu: `Furdoszoba zuhanyzoval es mosdoval`; titleHu: `Vilagos furdoszoba`; captionHu: `A furdoszoba vilagos, zuhanyzoval, mosdoval es toalettel.`; altEn: `Bathroom with shower and sink`; titleEn: `Bright bathroom`; captionEn: `The bathroom is bright, with a shower, sink and toilet.` | GYENGE | javitas |
| Galeria 6 | `szololiget-006` / `dandelion-szololiget-source-006.webp` / `szololiget.gallery[]`; alt: `Szololiget gallery 006`; title: `Szololiget 006`; caption: `Szololiget gallery image 006.` | altHu: `Szololiget Vendeghaz tetoteri folyosó ablakkal es komoddal`; titleHu: `Szololiget Vendeghaz tetoteri folyosó`; captionHu: `A tetoteri folyoson egy nagy ablak, egy feher komod es egy kosar latszik.`; altEn: `Szololiget Vendeghaz attic hallway with roof window and white chest of drawers`; titleEn: `Szololiget Vendeghaz attic hallway`; captionEn: `The attic hallway has a large roof window, a white chest of drawers and a basket.` | GYENGE | javitas |

Megjegyzes: az elso 4 kep mind haloszoba jellegu draftot kapott; hero szerepre nem biztosan idealis, emberi valasztas kellhet.

## Dandelion Koveskal

Hero-jelolt: `koveskal-001` / `dandelion-koveskal-source-001.webp` / `koveskal.gallery[]`. Registry hero: HIANYZIK. Desktop/mobile hero szerepre ELLENORIZENDO.

| Tetel | Kepadat es jelenlegi SEO | seoDraft, nem final | Statusz | Javasolt muvelet |
| --- | --- | --- | --- | --- |
| Hero-jelolt | `koveskal-001`; alt: `Dandelion Koveskal gallery 001`; title: `Dandelion Koveskal 001`; caption: `Dandelion Koveskal gallery image 001.` | altHu: `Dandelion Koveskal terasz szekekkel es asztallal`; titleHu: `Dandelion Koveskal terasz`; captionHu: `A teraszon szekek es egy asztal allnak a piheneshez.`; altEn: `Dandelion Koveskal terrace with chairs and table`; titleEn: `Dandelion Koveskal terrace`; captionEn: `The terrace has chairs and a table for relaxing outdoors.` | ELLENORIZENDO | emberi ellenorzes kell |
| Galeria 1 | `koveskal-001` / `dandelion-koveskal-source-001.webp` / `koveskal.gallery[]`; alt/title/caption mint fent | ugyanaz a draft, mint a hero-jeloltnel | GYENGE | javitas |
| Galeria 2 | `koveskal-002` / `dandelion-koveskal-source-002.webp` / `koveskal.gallery[]`; alt: `Dandelion Koveskal gallery 002`; title: `Dandelion Koveskal 002`; caption: `Dandelion Koveskal gallery image 002.` | altHu: `Etkezo es bejarati ajto a Dandelion Koveskalban`; titleHu: `Etkezo es bejarati ajto`; captionHu: `A kep a szallas egyik reszletet mutatja.`; altEn: `Dining area and entrance door at Dandelion Koveskal`; titleEn: `Dining area and entrance door`; captionEn: `The dining area has a wooden table and chairs with strong natural light.` | GYENGE | javitas |
| Galeria 3 | `koveskal-003` / `dandelion-koveskal-source-003.webp` / `koveskal.gallery[]`; alt: `Dandelion Koveskal gallery 003`; title: `Dandelion Koveskal 003`; caption: `Dandelion Koveskal gallery image 003.` | altHu: `konyha vilagos berendezessel es sutovel`; titleHu: `Konyha sutovel es mosogatoval`; captionHu: `A konyha jol felszerelt, sutovel es mosogatoval.`; altEn: `kitchen with bright furniture and oven`; titleEn: `Kitchen with oven and sink`; captionEn: `The kitchen is equipped with an oven and sink.` | GYENGE | javitas |
| Galeria 4 | `koveskal-004` / `dandelion-koveskal-source-004.webp` / `koveskal.gallery[]`; alt: `Dandelion Koveskal gallery 004`; title: `Dandelion Koveskal 004`; caption: `Dandelion Koveskal gallery image 004.` | altHu: `Nappali es etkezo fa butorokkal`; titleHu: `Stilusos nappali es etkezo`; captionHu: `A nappali es az etkezo vilagos, kenyelmes butorokkal berendezve.`; altEn: `Living and dining area with wooden furniture`; titleEn: `Stylish living and dining area`; captionEn: `The living and dining area is bright with comfortable furniture.` | GYENGE | javitas |
| Galeria 5 | `koveskal-005` / `dandelion-koveskal-source-005.webp` / `koveskal.gallery[]`; alt: `Dandelion Koveskal gallery 005`; title: `Dandelion Koveskal 005`; caption: `Dandelion Koveskal gallery image 005.` | altHu: `Furdoszoba zuhanyzoval es mosdoval`; titleHu: `Furdoszoba zuhanyzoval`; captionHu: `A furdoszobaban zuhanyzo es mosdo van.`; altEn: `Bathroom with shower and sink`; titleEn: `Bathroom with shower`; captionEn: `The bathroom has a shower and a sink.` | GYENGE | javitas |
| Galeria 6 | `koveskal-006` / `dandelion-koveskal-source-006.webp` / `koveskal.gallery[]`; alt: `Dandelion Koveskal gallery 006`; title: `Dandelion Koveskal 006`; caption: `Dandelion Koveskal gallery image 006.` | altHu: `furdoszoba sarokkaddal es mosdoval`; titleHu: `Furdo sarokkaddal es mosdoval`; captionHu: `A kep a szallas egyik reszletet mutatja.`; altEn: `bathroom with corner bathtub and sink`; titleEn: `Bathroom with corner bathtub and sink`; captionEn: `The bathroom has a corner bathtub and a sink with towels.` | GYENGE | javitas |

Megjegyzes: a 2. es 6. kep HU captionje generikus. A Koveskal helyszin/telepules allitasait final szovegben csak akkor szabad hasznalni, ha a kephez kotott szerep ezt indokolja.

## Dandelion D1

Hero-jelolt: `d1-001` / `dandelion-d1-source-001.webp` / `d1.gallery[]`. Registry hero: HIANYZIK. Desktop/mobile hero szerepre ELLENORIZENDO.

| Tetel | Kepadat es jelenlegi SEO | seoDraft, nem final | Statusz | Javasolt muvelet |
| --- | --- | --- | --- | --- |
| Hero-jelolt | `d1-001`; alt: `Dandelion D1 gallery 001`; title: `Dandelion D1 001`; caption: `Dandelion D1 gallery image 001.` | altHu: `Dandelion D1 szurke haz feher keritessel es zold kerttel`; titleHu: `Dandelion D1 szurke haz kerttel`; captionHu: `A kep a szallas egyik reszletet mutatja.`; altEn: `Dandelion D1 gray house with white fence and green garden`; titleEn: `Dandelion D1 gray house with garden`; captionEn: `The Dandelion D1 has a relaxing area and plants in the garden.` | ELLENORIZENDO | emberi ellenorzes kell |
| Galeria 1 | `d1-001` / `dandelion-d1-source-001.webp` / `d1.gallery[]`; alt/title/caption mint fent | ugyanaz a draft, mint a hero-jeloltnel | GYENGE | javitas |
| Galeria 2 | `d1-002` / `dandelion-d1-source-002.webp` / `d1.gallery[]`; alt: `Dandelion D1 gallery 002`; title: `Dandelion D1 002`; caption: `Dandelion D1 gallery image 002.` | altHu: `Dandelion D1 fedett terasz feher fuggonyokkel es kert reszlete`; titleHu: `Dandelion D1 terasz es kert`; captionHu: `A terasz feher fuggonyokkel es kulonfele novenyekkel van kialakitva a kert mellett.`; altEn: `Dandelion D1 covered terrace with white curtains and part of the garden`; titleEn: `Dandelion D1 terrace and garden`; captionEn: `The terrace has white curtains and plants next to the garden.` | GYENGE | javitas |
| Galeria 3 | `d1-003` / `dandelion-d1-source-003.webp` / `d1.gallery[]`; alt: `Dandelion D1 gallery 003`; title: `Dandelion D1 003`; caption: `Dandelion D1 gallery image 003.` | altHu: `Dandelion D1 fedett terasz padokkal es kerti novenyekkel`; titleHu: `Dandelion D1 terasz padokkal`; captionHu: `A teraszon padok es asztal vannak, mellette kerti noveny no a kerites mellett.`; altEn: `Dandelion D1 covered terrace with benches and garden plants`; titleEn: `Dandelion D1 terrace with benches`; captionEn: `The terrace has benches and a table with garden plants growing along the fence.` | GYENGE | javitas |
| Galeria 4 | `d1-004` / `dandelion-d1-source-004.webp` / `d1.gallery[]`; alt: `Dandelion D1 gallery 004`; title: `Dandelion D1 004`; caption: `Dandelion D1 gallery image 004.` | altHu: `Dandelion D1 fedett terasza paddal, asztallal es kerti novenyekkel`; titleHu: `Dandelion D1 fedett terasz`; captionHu: `A fedett teraszon kerti paddal es asztallal ulhetnek a vendegek.`; altEn: `Dandelion D1 covered terrace with benches, table, and garden plants`; titleEn: `Dandelion D1 Covered Terrace`; captionEn: `The covered terrace has benches and a table with garden plants.` | GYENGE | javitas |
| Galeria 5 | `d1-005` / `dandelion-d1-source-005.webp` / `d1.gallery[]`; alt: `Dandelion D1 gallery 005`; title: `Dandelion D1 005`; caption: `Dandelion D1 gallery image 005.` | altHu: `Dandelion D1 kerti terasz szekekkel es asztallal redonyokkel`; titleHu: `Dandelion D1 terasz szekekkel es asztallal`; captionHu: `A teraszon parnaval ellatott szekek, asztal es feher redonyok vannak.`; altEn: `Dandelion D1 garden terrace with chairs and table with curtains`; titleEn: `Dandelion D1 terrace with chairs and table`; captionEn: `The terrace has cushioned chairs, a table, and white curtains.` | GYENGE | javitas |
| Galeria 6 | `d1-006` / `dandelion-d1-source-006.webp` / `d1.gallery[]`; alt: `Dandelion D1 gallery 006`; title: `Dandelion D1 006`; caption: `Dandelion D1 gallery image 006.` | altHu: `Dandelion D1 terasz parnaval es uvegasztallal`; titleHu: `Dandelion D1 terasz ulobutorokkal`; captionHu: `A teraszon parnas szekek es egy uvegasztal all, feher fuggonyokkel korulveve.`; altEn: `Dandelion D1 terrace with cushioned chairs and glass table`; titleEn: `Dandelion D1 terrace seating`; captionEn: `The terrace has cushioned chairs and a glass table with white curtains around.` | GYENGE | javitas |

Megjegyzes: D1-nel az elso 6 kep mind kulteri/teraszos jellegu draftot kapott; medence vagy panorama allitas ebben a batchben nem irhato be kepellenorzes nelkul.

## Dandelion Vintage

Hero-jelolt: `vintage-006` / `dandelion-vintage-source-006.webp` / `vintage.gallery[]`. Registry hero: HIANYZIK. Desktop/mobile hero szerepre ELLENORIZENDO.

| Tetel | Kepadat es jelenlegi SEO | seoDraft, nem final | Statusz | Javasolt muvelet |
| --- | --- | --- | --- | --- |
| Hero-jelolt | `vintage-006`; alt: `Vintage gallery 006`; title: `Vintage 006`; caption: `Vintage gallery image 006.` | altHu: `Haloszoba fa gerendas mennyezettel es kofalakkal`; titleHu: `Vintage haloszoba fa mennyezettel`; captionHu: `A haloszoba kenyelmes aggyal es ulosarokkal keszult.`; altEn: `Bedroom with wooden beams and stone walls`; titleEn: `Vintage bedroom with wooden ceiling`; captionEn: `The bedroom has a comfortable bed and a seating area.` | ELLENORIZENDO | emberi ellenorzes kell |
| Galeria 1 | `vintage-006` / `dandelion-vintage-source-006.webp` / `vintage.gallery[]`; alt/title/caption mint fent | ugyanaz a draft, mint a hero-jeloltnel | GYENGE | javitas |
| Galeria 2 | `vintage-003` / `dandelion-vintage-source-003.webp` / `vintage.gallery[]`; alt: `Vintage gallery 003`; title: `Vintage 003`; caption: `Vintage gallery image 003.` | altHu: `Dandelion Vintage Vendeghaz udvara`; titleHu: `Dandelion Vintage Vendeghaz udvar`; captionHu: `Az udvarban fa pad es ulobutorok allnak a piheneshez.`; altEn: `Dandelion Vintage Vendeghaz courtyard`; titleEn: `Dandelion Vintage Vendeghaz yard`; captionEn: `The yard has a wooden table and seating for relaxation.` | GYENGE | javitas |
| Galeria 3 | `vintage-008` / `dandelion-vintage-source-008.webp` / `vintage.gallery[]`; alt: `Vintage gallery 008`; title: `Vintage 008`; caption: `Vintage gallery image 008.` | altHu: `Nappali es etkezo etkezoasztallal es feher szekekkel`; titleHu: `Nappali etkezovel es fa mennyezettel`; captionHu: `A nappali etkezoasztallal es feher szekekkel varja a vendegeket.`; altEn: `Living room and dining area with wooden ceiling and white chairs`; titleEn: `Living room with dining table and wooden ceiling`; captionEn: `The living room offers a dining table with white chairs for guests.` | GYENGE | javitas |
| Galeria 4 | `vintage-002` / `dandelion-vintage-source-002.webp` / `vintage.gallery[]`; alt: `Vintage gallery 002`; title: `Vintage 002`; caption: `Vintage gallery image 002.` | altHu: `Dandelion Vintage Vendeghaz regi stilusu epulete es udvara`; titleHu: `Dandelion Vintage Vendeghaz udvarral`; captionHu: `A kep a szallas egyik reszletet mutatja.`; altEn: `Dandelion Vintage guesthouse old style building and yard`; titleEn: `Dandelion Vintage guesthouse with yard`; captionEn: `The image shows one detail of the accommodation.` | GYENGE | javitas |
| Galeria 5 | `vintage-007` / `dandelion-vintage-source-007.webp` / `vintage.gallery[]`; alt: `Vintage gallery 007`; title: `Vintage 007`; caption: `Vintage gallery image 007.` | altHu: `konyha es etkezo vintage stilusban`; titleHu: `Dandelion Vintage Vendeghaz konyha`; captionHu: `A konyha egyszeru berendezesu, etkezoasztallal es szekekkel.`; altEn: `vintage style kitchen and dining area`; titleEn: `Dandelion Vintage Guesthouse kitchen`; captionEn: `The kitchen has a simple setup with a dining table and chairs.` | GYENGE | javitas |
| Galeria 6 | `vintage-012` / `dandelion-vintage-source-012.webp` / `vintage.gallery[]`; alt: `Vintage gallery 012`; title: `Vintage 012`; caption: `Vintage gallery image 012.` | altHu: `nappali kanapekkal es fotellel`; titleHu: `Dandelion Vintage nappali`; captionHu: `A nappaliban kenyelmes kanape es fotel varja a vendegeket.`; altEn: `living room with sofa and armchair`; titleEn: `Dandelion Vintage living room`; captionEn: `The living room has a comfortable sofa and armchair for guests.` | GYENGE | javitas |

Megjegyzes: Vintage-nel a hero-jelolt belteri haloszoba kepnek tuno draftot kapott, ez nem biztos, hogy hero celra a legerosebb; emberi kepvalasztas kell.

## Emberi ellenorzest igenylo pontok

- Minden hero-jelolt: desktop es mobile crop/hero szerep ellenorzese.
- Royal Homes: jakuzzi, tetoterasz, szemely a kepen, teraszkapcsolat, laptop allitasok.
- Szepvolgyi: kert/jatekelemek, szobak agyszama, furdoszoba reszletek.
- Szololiget: tetoter, franciaagy, nagy ablak, folyoson komod/kosar.
- Koveskal: terasz, bejarati ajto, sarokkad, torolkozok.
- D1: kulteri terasz/kert reszletek, fuggony/redony megnevezes.
- Vintage: fa gerenda, kofal, udvar, regi stilusu epulet, vintage stilus.

## Implementacio utani kapu

- Image registry modositas: TODO / jovahagyas utan.
- Hero registry javitas: TODO / jovahagyas utan.
- `approved:true`: TILOS ebben a batch review korben.
- Build: nem szukseges, mert csak dokumentacios munkalap keszult.

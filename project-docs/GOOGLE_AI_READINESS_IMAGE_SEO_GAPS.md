[CHANGE 2026-05-20 00:00] Google AI Readiness kep SEO hianylista letrehozva.
[CHANGE 2026-05-20 00:00] Szallasonkenti kep SEO hianyok pontos prioritasi tervve reszletezve schema es CTA kor utan.
[CHANGE 2026-06-03 00:00] Audit frissites: a live registry mar HU/EN/DE/CS kepmezoket hasznal, a korabbi generikus nem-D2 megallapitasok torteneti kockazatkent kezelendok. A draftforras helye: `src/admin-disabled/data/images/accommodation-images.seo-test.json`.

# Google AI Readiness kep SEO hianylista

Status: RESZBEN AKTUALIS
Last checked: 2026-06-03
Use for: kep SEO hianyok Google AI Readiness kontextusban
Do not use for: aktualis image registry QA helyettesitesere


Cel: pontos, szallasonkenti javitasi terv a generikus vagy gyenge `alt` / `title` / `caption` mezokhoz, implementacio es image registry modositas nelkul.

Forras:

- `src/data/images/accommodation-images.ts`
- `src/data/images/image-types.ts`
- `src/data/accommodation-pages/*.ts`
- `src/templates/AccommodationPage.astro`
- `src/lib/accommodation-page-adapters.ts`
- `project-docs/gallery-order-tool/*.html`
- `src/admin-disabled/data/images/accommodation-images.seo-test.json`

Nem live registry forras: `src/data/images/accommodation-images.seo-test.json`.

## 2026-06-03 aktualis audit

- A live registry technikailag minden accommodation gallery kephez tartalmaz HU/EN/DE/CS `alt`, `title`, `caption` mezot.
- A nyelvi aloldalak build szinten rendben vannak: HU, EN, DE es CS accommodation oldalak hibamentesen epulnek.
- A cseh oldalakon van fallback generator, ha egy kephez nincs `cs` mezo; ez mukodesi vedohalo, de SEO-minosegben gyengebb lehet, mint a kepenkenti cseh szoveg.
- A nemet es cseh kepmezok tovabbra is vizualis/nyelvi review-t igenyelnek a legerosebb SEO minoseghez, foleg hero, card es elso 4-6 gallery kep eseteben.
- A korabbi `approved:false` draftok nem valnak automatikusan final SEO adattá.
- A `public/images/panorama-pool/05-21/` nyers JPEG csomag `.gitignore` alatt van; publikus deployba nem kerulhet, es csak forrasanyagkent kezelheto.

## Jelolesek

- MEGVAN: a registryben vagy a renderelt logikaban konkret, HU/EN paros kepadat talalhato.
- GYENGE: van adat, de generikus, mintaszeru, fajlnev/sorszamszagu vagy nem kephez kotott.
- HIANYZIK: a vizsgalt registry-mezo nincs kitoltve vagy null.
- ELLENORIZENDO: van adat vagy draft, de kepenkenti vizualis ellenorzes nelkul nem szabad veglegesiteni.

## Fo megallapitasok

- A registry szerkezetileg minden gallery kephez tartalmaz HU/EN `alt`, `title`, `caption` mezot.
- Ures gallery `alt` mezot nem talaltam az image registryben.
- HU/EN mezoparok technikailag megvannak, de a nem-D2 szallasoknal a HU es EN mezok jellemzoen azonos, angolos/mintaszeru szovegek.
- D2 hero es card kep SEO adatai MEGVAN allapotban vannak.
- D2 gallery adatok tobbnyire konkretak, de nehany caption meg mindig gyenge: `A kep a szallas egyik reszletet mutatja.` / `The image shows one detail of the accommodation.`
- Minden nem-D2 szallasnal `hero.desktop` es `hero.mobile` null az image registryben. A sablon ilyenkor a `mobileImagePath`, az elso gallery kep es a page-level `fallbackAlt` alapjan renderel hero kepet.
- A template a gallery preview es lightbox kepeknel az `alt` mezot hasznalja. A `title` es `caption` adat atmegy az adapteren, de lathato captionkent jelenleg csak a lightbox kep-szamlalo jelenik meg.
- A `project-docs/gallery-order-tool/*.html` fajlokban van korabbi `seoDraft` minden szallas gallery kepeihez, mindenhol `approved:false`. Ez hasznalhato kiindulasnak, de csak vizualis ellenorzes es tulajdonosi/SEO jovahagyas utan kerulhet registrybe.

## Generikus mintak

- `gallery 001`: minden nem-D2 gallery alt mezoben megjelenik szallasonkenti nevvel.
- `image 001`: minden nem-D2 gallery caption mezoben megjelenik `gallery image 001.` mintaval.
- `Fugehaz gallery...`: a Fugehaz teljes gallery blokkja ilyen mintaszeru.
- Fajlnev-szagu/sorszamszagu title: `Dandelion D1 001`, `Fugehaz 001`, `Szololiget 001`, `Royal Homes 022`, stb.
- Ures alt: registryben nem talaltam; a lightbox statikus HTML-ben indulaskor `alt=""`, de JS nyitaskor a kivalasztott kep `alt` erteket kapja.
- Angol/magyar hianyzo par: hianyzo par nincs, de a nem-D2 HU/EN parok tartalmilag gyengek, mert azonos vagy kozel azonos generikus angol mintak.

## Szallasonkenti allapot es javitasi sorrend

| Szallas | Hero alt/title/caption | Galeria alt/title/caption | Generikus problema | seoDraft | Javitas sorrend |
| --- | --- | --- | --- | --- | --- |
| Dandelion D1 | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 18/18 gallery kep generikus | `Dandelion D1 gallery 001`, `Dandelion D1 001`, `Dandelion D1 gallery image 001.` | MEGVAN a gallery-order toolban, 18 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. terasz/kert/medence jellegu kepek csak ha latszanak; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Dandelion D2 | MEGVAN: hero desktop/mobile konkret HU/EN alt/title/caption | MEGVAN/GYENGE: 17/17 nem sorszamos, de 6 HU caption es 1 EN caption generikus | `A kep a szallas egyik reszletet mutatja.` D2 gallery 09, 15, 03, 06, 16, 17; EN generikus D2 gallery 03 | MEGVAN a gallery-order toolban, 17 db, mind `approved:false`; csak gyenge captionokhoz erdemes osszevetni | 1. gyenge captionok; 2. elso 4-6 gallery ellenorzes; 3. belteri/kulteri allitasok paritasa; hero csak fenntartasi QA |
| Fugehaz | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 13/13 gallery kep generikus | `Fugehaz gallery 001`, `Fugehaz 001`, `Fugehaz gallery image 001.` | MEGVAN a gallery-order toolban, 13 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. medence/terasz/kert csak ha latszik; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Zsalya Vendeghaz | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 11/11 gallery kep generikus | `Zsalya gallery 001`, `Zsalya 001`, `Zsalya gallery image 001.` | MEGVAN a gallery-order toolban, 11 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. terasz/kert/kilatas csak ha latszik; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Szololiget Vendeghaz | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 21/21 gallery kep generikus | `Szololiget gallery 001`, `Szololiget 001`, `Szololiget gallery image 001.` | MEGVAN a gallery-order toolban, 21 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. terasz/kert/kulteri kepek csak ha latszanak; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Szepvolgyi Vendeghaz | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 22/22 gallery kep generikus | `Szepvolgyi gallery 001`, `Szepvolgyi 001`, `Szepvolgyi gallery image 001.` | MEGVAN a gallery-order toolban, 22 db, mind `approved:false`; hasznalhato kiindulasnak, de nehany draft caption is generikus | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. terasz/kert csak ha latszik; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Dandelion Royal Homes | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 33/33 gallery kep generikus | `Royal Homes gallery 022`, `Royal Homes 022`, `Royal Homes gallery image 022.` | MEGVAN a gallery-order toolban, 33 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. terasz/jakuzzi/kulteri kepek csak ha latszanak; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Dandelion Vintage | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 18/18 gallery kep generikus | `Vintage gallery 006`, `Vintage 006`, `Vintage gallery image 006.` | MEGVAN a gallery-order toolban, 18 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. udvar/kert/kulteri kepek csak ha latszanak; 4. haloszoba/furdo/konyha; 5. tobbi gallery |
| Dandelion Koveskal | HIANYZIK registry hero desktop/mobile; ELLENORIZENDO renderelt hero, mert gallery/fallbackAlt alapu | GYENGE: 21/21 gallery kep generikus | `Dandelion Koveskal gallery 001`, `Dandelion Koveskal 001`, `Dandelion Koveskal gallery image 001.` | MEGVAN a gallery-order toolban, 21 db, mind `approved:false`; hasznalhato kiindulasnak vizualis ellenorzes utan | 1. renderelt hero es elso kep; 2. elso 4-6 gallery; 3. kert/terasz/kulteri kepek csak ha latszanak; 4. haloszoba/furdo/konyha; 5. tobbi gallery |

## Leggyengebb szallasok kep SEO szerint

1. Dandelion Royal Homes: 33 generikus gallery kep, nincs registry hero.
2. Szepvolgyi Vendeghaz: 22 generikus gallery kep, nincs registry hero.
3. Szololiget Vendeghaz es Dandelion Koveskal: 21-21 generikus gallery kep, nincs registry hero.
4. Dandelion D1 es Dandelion Vintage: 18-18 generikus gallery kep, nincs registry hero.
5. Fugehaz es Zsalya: kevesebb kep, de ugyanaz a teljes generikus minta.
6. Dandelion D2: nem kritikus, de nehany caption gyenge.

## Hero kep hianyok

- D2: MEGVAN registry hero desktop es mobile alt/title/caption mezokkel.
- Minden mas szallas: HIANYZIK a registry hero desktop/mobile kepadat, ezert a hero kep SEO jelenleg page-level fallback es gallery alapjan all ossze.
- Implementacio elott minden nem-D2 szallasnal eloszor azt kell megerositeni, melyik konkret kep a renderelt hero desktopon es mobilon.
- Uj hero alt/title/caption csak a konkret kep vizualis ellenorzese utan irhato.

## Galeria generikus alt problemak

- Nem-D2 gallery: minden kep altja szallasnev + `gallery` + sorszam.
- Nem-D2 title: minden kep szallasnev + sorszam, ez nem kep SEO erteku.
- Nem-D2 caption: minden kep `gallery image` + sorszam, ez nem tartalmi kepalairas.
- D2 gallery: alt/title tobbnyire kephez kotott, de a generikus captionok javitasa indokolt.
- A `title` es `caption` mezok lathato felhasznalasa ELLENORIZENDO, mert a jelenlegi template a galeria previewban csak az `alt` mezot hasznalja, a lightboxban pedig csak kep-szamlalo caption latszik.

## seoDraft hasznalhatosag

- Registryben nincs `seoDraft` mezos kepadat.
- `src/data/images/accommodation-images.seo-test.json` nincs.
- `project-docs/gallery-order-tool/*.html` alatt minden szallashoz van korabbi gallery `seoDraft`, mind `approved:false`.
- Hasznalhato: igen, kiindulasi munkalapnak.
- Nem hasznalhato: automatikus registry importkent, automatikus final SEO adatkent, vagy `approved:true` allapotkent.
- Kockazat: a draftok kepfelismeresi pontossaga es nehany tul altalanos caption kulon ellenorzest igenyel.

## Javasolt elso kep SEO implementacios csomag

1. Nem-D2 hero kor: D1, Fugehaz, Zsalya, Szololiget, Szepvolgyi, Royal Homes, Vintage, Koveskal renderelt hero kepenek azonositasa desktopon es mobilon; csak ellenorzott kephez keszuljon HU/EN draft.
2. Elso 4-6 gallery kep kor: minden nem-D2 szallasnal a previewban lathato elso 4-6 kep prioritas, mert ezek kapjak a legtobb azonnali figyelmet.
3. Kulteri ertek kepek: medence / terasz / kert / udvar / jakuzzi csak akkor kapjon ilyen szot, ha a kepen biztosan latszik.
4. Belteri dontesi kepek: haloszoba / furdo / konyha / nappali csak vizualis ellenorzes utan, agyelrendezes vagy felszereltseg allitas nelkul, ha nem biztos.
5. D2 cleanup: gyenge captionok javitasa, de a D2 hero nem elso implementacios blokkolo.
6. Minden draft `approved:false` maradjon, amig nincs kulon jovahagyas.

## Implementacios tilalmak

- Ne modosuljon az image registry ebben a tervezesi korben.
- Ne irodjon at alt/title/caption mezo ebben a tervezesi korben.
- Ne keruljon be `approved:true`.
- Ne legyen schema, CTA vagy Astro template modositas.
- Ne keruljon kepbe nem igazolhato panorama, Balaton, medence, helyszin vagy targy.

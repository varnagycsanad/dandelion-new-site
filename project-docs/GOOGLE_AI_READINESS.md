[CHANGE 2026-05-20 00:00] Google AI Readiness projektkoveto letrehozva.
[CHANGE 2026-05-20 00:00] Elso repo-alapu allapotfelmeres rogzitve a Google AI Readiness tervhez.
[CHANGE 2026-05-20 00:00] Google AI Readiness munkadokumentumok letrehozva es a statuszhoz kapcsolva.
[CHANGE 2026-05-20 00:00] Tulajdonosi adatbekero munkalap letrehozva, implementacio elotti kotelezo kitolteskent.
[CHANGE 2026-05-20 00:00] Tulajdonos altal megerositett alap szallasadatok atvezetve a statuszba.
[CHANGE 2026-05-20 00:00] Maradek tulajdonosi adatok rogzitve; kinek nem idealis blokk szovegirasi feladatta minositve.
[CHANGE 2026-05-20 00:00] Kinek ajanljuk / kinek nem idealis ajanlasi szoveg DRAFT munkalap letrehozva.
[CHANGE 2026-05-20 00:00] Elso implementacios csomag elokeszito dokumentuma letrehozva.
[CHANGE 2026-05-20 00:00] Recommendation copy ujrafinomitva vendegbaratabb, kevesbe technikai szovegiranyra.
[CHANGE 2026-05-20 00:00] Recommendation copy levaltva rovid pozicionalasi matrixra.
[CHANGE 2026-05-20 00:00] Pozicionalasi matrix tisztitva tulajdonosi jovahagyas elott.
[CHANGE 2026-05-20 00:00] Pozicionalasi matrix HU szallasoldali blokkent beepitve.
[CHANGE 2026-05-20 00:00] Pozicionalasi blokk HU QA DONE: build, HTML es vizualis ellenorzes rendben.
[CHANGE 2026-05-20 00:00] Pozicionalasi blokk HU UX-suritese DONE: kompaktabb, kevesbe adatlap-szeru megjelenes.

# Google AI Readiness terv

Cel: a Dandelion szallasoldalak legyenek konzisztensen ertelmezhetok Google AI Overviews / AI Mode, organikus kereses, kepkereses es foglalasi dontest tamogato talalatok szamara.

Ez az elo statuszfajl. A reszletes vegrehajtasi terv kulon dokumentum:

- Fajl: `project-docs/GOOGLE_AI_READINESS_EXECUTION_PLAN.md`
- Statusz: DONE
- Commit: `aa1c233`
- Megjegyzes: ez a dokumentum statuszt kovet; a vegrehajtasi terv nem itt el.

Kapcsolodo munkadokumentumok:

- `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md` - szallasonkenti, emberileg kitoltheto adathianylista.
- `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md` - HU/EN booking link terkep es CTA kockazatok.
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md` - schema mezoterkep, implementacio nelkul.
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md` - kep SEO hianylista szallasonkent.
- `project-docs/GOOGLE_AI_READINESS_OWNER_INPUT.md` - Csanad altal kitoltendo adatbekero es dontesi lista.
- `project-docs/GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md` - NEM IMPLEMENTÁLHATÓ: hosszunak bizonyult, pozicionalasi matrix valtja.
- `project-docs/GOOGLE_AI_READINESS_POSITIONING_MATRIX.md` - TISZTÍTVA / TULAJDONOSI JÓVÁHAGYÁSRA VÁR; rovid, tablazatos forras a Package 1 szoveges reszehez.
- `project-docs/GOOGLE_AI_READINESS_IMPLEMENTATION_PACKAGE_1.md` - elso implementacios csomag technikai terve, kodmodositas nelkul.

Feladatinditasi emlekezteto: minden uj Google AI Readiness task elejen ezt a statuszfajlt es a vegrehajtasi tervet kell beolvasni; Codex nem talalhat ki hianyzo szallasadatot, es ami nem biztos, az `HIANYZIK` vagy `ELLENORIZENDO`.

## Statusz jelolesek

- TODO: meg nincs elkezdve.
- IN_PROGRESS: folyamatban van, de nincs kesz.
- DONE: elkeszult es ellenorzott.
- BLOCKED: kulso dontes vagy hianyzo adat blokkolja.
- CHECK: elkeszultnek tunik, kulon ellenorzesre var.
- MEGVAN: repo-adat alapjan megtalalhato.
- HIANYZIK: a vizsgalt repo-adatokban nem talaltam meg.
- ELLENORIZENDO: van utalas, de nem eleg pontos vagy tulajdonosi megerosites kell.

## 0. Elso repo-alapu allapotfelmeres

- Statusz: CHECK
- Utolso frissites: 2026-05-20
- Forras: jelenlegi repo, build futtatas nelkul.
- Modositott kod/adat/schema/image registry: nem.

### Jelenlegi eros pontok

- Minden vizsgalt HU/EN szallasoldal kozos `AccommodationPage.astro` sablonbol epul.
- A `facts`, `decisionPanel.overviewFacts`, `amenities`, `map.body`, `map.benefits` es CTA szovegek lathato HTML tartalomkent jelennek meg.
- Minden vizsgalt szallasoldalnak van HU es EN adatfajlja, valamint vekony wrapper oldala.
- Van `LodgingBusiness` es `BreadcrumbList` schema minden kozos szallassablonos oldalon.
- A canonical / hreflang parok a fo HU/EN szallasoldalakra fel vannak veve.
- A sitemap tartalmazza a fo HU es EN szallas URL-eket.
- A `robots.txt` engedelyezi a crawl-t, es megadja a sitemap URL-t.
- A kepregistry szerkezetileg kezeli az alt/title/caption mezoket HU es EN nyelven.

### Jelenlegi gyenge pontok

- Nincs teljes, ellenorzott szallasadat-mester tabla.
- A gyors dontesi adatok nem minden szallasnal azonos melyseguek, de a kapacitas, furdok, agyelrendezes, kisallat, wifi, parkolas, legkondi es medence alapadatok nagy resze tulajdonosi megerositest kapott.
- A maradek alap tulajdonosi adatok jelentos resze megerkezett; a `kinek nem idealis` blokk mar nem adat-hiany, hanem ovatos szovegirasi feladat.
- A szallasoldali fo CTA-k `button onclick="OpenBE()"` alapuak, nem crawlolhato `<a href>` linkek.
- Dandelion Koveskal eseteben nincs SabeeApp booking link, ez kesobbi booking/CTA dontes.
- A LodgingBusiness schema minimalis, nem tartalmaz reszletes szallasadatokat.
- A legtobb nem-D2 galeriakep alt/title/caption mezoi generikusak.
- A `kinek nem idealis` blokk minden szallasnal enyhe, objektiv korlatokra epulo megfogalmazast igenyel.

## 1. Szallasadat-mester tabla

- Cel: egyetlen attekintheto tabla minden szallas AI-szempontbol fontos adatarol.
- Statusz: IN_PROGRESS
- Teendok: megerositett tulajdonosi adatok alapjan vegleges mester tabla keszitese; HU/EN paritas kesobb.
- Blokkolo adatok: Koveskal CTA dontes, `kinek nem idealis` szovegek, nehany haloszoba bontas es strandlista.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`.

### Szallasonkenti adatallapot

| Szallas | Ferohely | Haloszobak | Furdok | Agyelrendezes | Medence statusz | Parkolas | Legkondi | Wifi | Kisallat | Csaladbarat | Kert / terasz | Telepules | Regio | Kozeli latnivalok | Kozeli strandok | Kinek ajanlott | Kinek nem ajanlott | HU booking link | EN booking link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dandelion D1 | MEGVAN: 8 fo | ELLENORIZENDO: 3 haloszoba + nappali repo alapjan | MEGVAN: 2 furdoszoba | MEGVAN: 6 szimpla agy + 1 kihuzhato kanape; franciaagy nincs | MEGVAN: kozos medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: engedelyezett | MEGVAN: nagy csaladi haz / csaladbarat | MEGVAN: kert es panoramas terasz | MEGVAN: Kisapati | MEGVAN: Szent Gyorgy-hegy / Tapolcai-medence / Balaton-felvidek | MEGVAN: Balaton, Badacsony, Szigliget, Csobanc, boraszatok | ELLENORIZENDO: konkret strandlista | MEGVAN: nagyobb csaladok, barati tarsasagok | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=2be20f0b68a1114a&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=2be20f0b68a1114a&lang=En` |
| Dandelion D2 | MEGVAN: 6 fo | ELLENORIZENDO: 2 halo + nappali repo alapjan | MEGVAN: 1 furdoszoba | MEGVAN: 1 franciaagy + 2 szimpla agy + 1 kihuzhato kanape | MEGVAN: kozos medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: engedelyezett | MEGVAN: csaladi bazis / gyerekekkel kenyelmes | MEGVAN: nagy udvar, kert, fedett terasz | MEGVAN: Kisapati | MEGVAN: Szent Gyorgy-hegy / Balaton-felvidek | MEGVAN: Balaton, turak, boraszatok | ELLENORIZENDO: konkret strandlista | MEGVAN: csaladi pihenes | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=c64244f6153c3ca1&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=c64244f6153c3ca1&lang=En` |
| Fugehaz | MEGVAN: 4 fo | ELLENORIZENDO: ket szint, pontos szobastruktura | MEGVAN: 1 furdoszoba | MEGVAN: 2 franciaagy | MEGVAN: kozos medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: engedelyezett | MEGVAN: csaladbarat haz | MEGVAN: panoramas teraszok, kerti etkezo | MEGVAN: Kisapati | MEGVAN: Balaton-felvidek / Szent Gyorgy-hegy kornyeke | MEGVAN: tanuhagyek, turak, borok, strandok | ELLENORIZENDO: konkret strandlista | MEGVAN: csaladias, nyugodt, teraszos pihenes | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=af2fdb8ed2ebb145&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=af2fdb8ed2ebb145&lang=En` |
| Zsalya Vendeghaz | MEGVAN: 4 fo | ELLENORIZENDO: ket szint, pontos szobastruktura | MEGVAN: 2 furdoszoba | MEGVAN: 2 franciaagy | MEGVAN: nincs medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: nem engedelyezett | MEGVAN: parok, kisebb csaladok, baratok | MEGVAN: reszben fedett terasz | MEGVAN: Kisapati / Szent Gyorgy-hegy keleti oldala | MEGVAN: Balaton-felvidek / Szent Gyorgy-hegy | MEGVAN: turautvonal, tanuhagyek, Csobanc, Gulacs, Toti-hegy | HIANYZIK | MEGVAN: nyugodt pihenest kereso parok, kisebb csaladok, baratok | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=cf20da88f046211e&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=cf20da88f046211e&lang=En` |
| Szololiget Vendeghaz | MEGVAN: 4 fo | ELLENORIZENDO: ketszintes haz, pontos szobastruktura | MEGVAN: 1 furdoszoba | MEGVAN: 1 franciaagy + 1 kihuzhato kanape | MEGVAN: nincs medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: nem engedelyezett | MEGVAN: csaladoknak is idealis | MEGVAN: nagy, korbejarhato terasz | MEGVAN: Kisapati / Szent Gyorgy-hegy keleti oldala | MEGVAN: Balaton-felvidek | MEGVAN: Bazaltorgona, boraszatok, tanuhagyek, Badacsony, Szigliget, Balaton | ELLENORIZENDO: konkret strandlista | MEGVAN: elvonulas, csaladok, kirandulok, bortura, balatoni nyaralas | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=e30c4b62d7324b3f&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=e30c4b62d7324b3f&lang=En` |
| Szepvolgyi Vendeghaz | MEGVAN: 8 fo | MEGVAN: 4 haloszoba | MEGVAN: 2 furdoszoba | MEGVAN: 1 franciaagy + 6 szimpla agy | MEGVAN: nincs medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: nem engedelyezett | MEGVAN: csaladi nyaralashoz / nagyobb tarsasagnak | MEGVAN: zart kert, teraszbuborok | MEGVAN: Badacsonyors | MEGVAN: Balaton kozeli / Badacsonyors | MEGVAN: Folly Arboretum, Szigligeti var, borturak, gasztroprogramok, fesztivalok | MEGVAN: strand kozelben | MEGVAN: nagyobb csalad / tarsasag Balaton kozeleben | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=7d46f283f2f5792f&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=7d46f283f2f5792f&lang=En` |
| Dandelion Royal Homes | MEGVAN: 6 fo | MEGVAN: 2 haloszoba + nappali | MEGVAN: 1 furdoszoba | MEGVAN: 1 franciaagy + 2 kihuzhato kanape | MEGVAN: nincs medence; jakuzzi van | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: nem engedelyezett | MEGVAN: igen | MEGVAN: nagy terasz, szeles erkely, napozoterasz | MEGVAN: Keszthely | MEGVAN: Balaton-parti uduloovezet | MEGVAN: kikoto, setany, varoskozpont kb. 10 perc, kerekparut | MEGVAN: Balaton-part / sajat parti molo | MEGVAN: premium, modern apartmant kereso vendegek | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=c4b8753ec9ad4dc9&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=c4b8753ec9ad4dc9&lang=En` |
| Dandelion Vintage | MEGVAN: 4 fo | MEGVAN: 2 haloszoba + nappali | MEGVAN: 1 furdoszoba | MEGVAN: 1 franciaagy + 2 szimpla agy | MEGVAN: nincs medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: nem engedelyezett | MEGVAN: csaladbarat, bababarat | MEGVAN: sajat udvar, grillezes | MEGVAN: Nemesgulacs | MEGVAN: Balaton-felvidek | MEGVAN: kirandulohelyek, tanuhagyek, boraszatok | MEGVAN: Balaton 7 km | MEGVAN: csaladok, babaval erkezok, baratok, parok | ELLENORIZENDO: enyhe objektiv szovegiras | MEGVAN: SabeeApp `selectedRooms=0c9e5eaae0545ee3&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=0c9e5eaae0545ee3&lang=En` |
| Dandelion Koveskal | MEGVAN: 6 fo | HIANYZIK | MEGVAN: 2 furdoszoba | MEGVAN: 2 franciaagy + 2 szimpla agy | MEGVAN: nincs medence | MEGVAN: ingyenes parkolas | MEGVAN: van | MEGVAN: van | MEGVAN: nem engedelyezett | MEGVAN: paroknak, csaladoknak, barati tarsasagoknak | MEGVAN: kert, nagy kert, nagy terasz | MEGVAN: Koveskal | MEGVAN: Kali-medence | MEGVAN: Kali-medence falvai, turak, boros megallok, pincesorok | ELLENORIZENDO: Revfulop pontos nev; Zanka; Balatonakali; Abrahamhegy | MEGVAN: csendes pihenest keresok | ELLENORIZENDO: enyhe objektiv szovegiras | BLOKKOLT: nincs SabeeApp booking link | BLOKKOLT: nincs SabeeApp booking link |

## 2. Hianylista

- Cel: latszodjon, melyik szallasoldalon melyik dontesi adat hianyzik vagy nem eleg explicit.
- Statusz: IN_PROGRESS
- Teendok: tulajdonosi ellenorzes az `GOOGLE_AI_READINESS_OWNER_INPUT.md` alapjan; biztos adatok potlasa kesobbi adatfajl-taskban.
- Blokkolo adatok: tulajdonosi megerosites a nem publikus komfortadatokra.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`.

### Legfontosabb hianyzo / ellenorizendo adatok

- Minden szallas: `kinek nem idealis` blokk szovegirasi feladat, nem adat-hiany; eros negativ pozicionalas nelkul.
- D1, D2, Fugehaz, Zsalya, Szololiget: haloszoba bontas tovabbra is ELLENORIZENDO, ha kulon publikalando.
- Koveskal: haloszobak szama tovabbra is HIANYZIK.
- Koveskal: Revfulop pontos strandnev tovabbra is ELLENORIZENDO.
- Booking/CTA: Koveskal SabeeApp booking link nincs; kesobbi CTA dontes kell.

## 3. Foglalasi link terkep

- Cel: minden szallashoz egyertelmu, szobaspecifikus foglalasi URL legyen.
- Statusz: IN_PROGRESS
- Teendok: nem-Koveskal SabeeApp linkek ujra jovahagyasa; Koveskal CTA dontes; header/listing/szallasoldali CTA osszehangolasa; szallasoldali CTA-k linkesitese kesobbi kodtaskban.
- Blokkolo adatok: Koveskal foglalasi/erdeklodesi CTA dontes; SabeeApp aktualis szobakodok megerositese.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`.

### Foglalasi link allapot

- Header CTA: MEGVAN, SabeeApp property szintu link, HU/EN nyelv szerint `lang=Hu` vagy `lang=En`.
- Listing CTA-k: MEGVAN, tobb helyen rendes `<a href>` SabeeApp link.
- Szallasoldali CTA-k: ELLENORIZENDO / GYENGE, mert `button onclick="OpenBE()"`, a szobaspecifikus URL csak JS-ben hasznalodik.
- D1: MEGVAN HU/EN SabeeApp selectedRooms.
- D2: MEGVAN HU/EN SabeeApp selectedRooms.
- Fugehaz: MEGVAN HU/EN SabeeApp selectedRooms.
- Zsalya: MEGVAN HU/EN SabeeApp selectedRooms.
- Szololiget: MEGVAN HU/EN SabeeApp selectedRooms.
- Szepvolgyi: MEGVAN HU/EN SabeeApp selectedRooms.
- Royal Homes: MEGVAN HU/EN SabeeApp selectedRooms.
- Vintage: MEGVAN HU/EN SabeeApp selectedRooms.
- Koveskal: BLOKKOLT, tulajdonosi megerosites szerint nincs SabeeApp booking link.

## 4. Gyors dontesi blokk

- Cel: minden szallasoldalon azonos szerkezetu, lathato quick-fact blokk legyen.
- Statusz: CHECK
- Teendok: a meglevo `overviewFacts` mezoket a mester tabla kotelezo mezoivel ossze kell igazitani.
- Blokkolo adatok: szallasadat-mester tabla ellenorzott hianyainak potlasa.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`.

### Allapot

- MEGVAN: lathato gyors attekintes jellegu blokk minden szallasoldalon.
- GYENGE: nem azonos mezokeszlet; a megerositett alapadatokat meg at kell vezetni a lathato HU/EN oldalstrukturaba.

## 5. Kinek ajanljuk / kinek nem blokk

- Cel: AI es emberi donteshez is egyertelmu alkalmassagi jelzesek adasa.
- Statusz: DONE - Positioning matrix HU beepites, QA es UX-surites
- Teendok: EN paritas kulon kovetkezo taskban.
- Blokkolo adatok: EN positioning szovegek jovahagyasa.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_POSITIONING_MATRIX.md`.

### Allapot

- Reszben MEGVAN: tobb oldalon termeszetes szovegben szerepel, kinek valo.
- NEM IMPLEMENTÁLHATÓ: a korabbi `GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md` tul hosszu es tul prozai forrasnak bizonyult.
- TISZTÍTVA / TULAJDONOSI JÓVÁHAGYÁSRA VÁR: `GOOGLE_AI_READINESS_POSITIONING_MATRIX.md`, rovid, tablazatos, kontrollalt mezokkel.
- DONE: a HU szallasoldalak `positioning` mezot kaptak, es a kozos `AccommodationPage.astro` lathato HTML dontesi blokkban rendereli.
- DONE: Pozicionalasi blokk HU QA; `npm run build`, buildelt HTML, tiltott szovegek es kijelolt desktop/mobil viewportok ellenorizve.
- DONE: Pozicionalasi blokk HU UX-surites; a lathato blokk csak a rovid karaktert, a `Kinek jo?` chipeket es a maximum 4 `Fo elonyok` chipet mutatja.
- MEGJEGYZES: a `keyFacts` adatok az adatmodellben megmaradtak, de ebben a vizualis blokkban nem jelennek meg teljes listakent.
- EN paritas: TODO.

## 6. CTA linkesites

- Cel: a szallasoldali foglalasi CTA-k crawler szamara is rendes linkek legyenek.
- Statusz: TODO
- Teendok: kulon kodtaskban valos `<a href>` CTA-k tervezese es OpenBE kompatibilitas megtartasa.
- Blokkolo adatok: foglalasi link terkep, kulonosen Koveskal; szobaspecifikus URL-ek ujrajovahagyasa.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_IMPLEMENTATION_PACKAGE_1.md`.

## 7. Schema bovites

- Cel: a lathato szoveggel egyezo, reszletesebb structured data.
- Statusz: TODO
- Teendok: schema terv csak az ellenorzott mester tabla utan.
- Blokkolo adatok: szallasadat-mester tabla; CTA link terkep.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: jelen statuszfrissites.

### Schema allapot

- MEGVAN: `Organization`, `WebSite`, szallasoldalakon `LodgingBusiness`, `BreadcrumbList`.
- GYENGE: `LodgingBusiness` csak minimalis `name`, `url`, `description`, `image`, `telephone`.
- HIANYZIK: address/geo, amenityFeature, booking URL, reszletes szallasadatok.
- SZABALY: bovites csak lathato, ellenorzott adattal.

## 8. Google Business Profile audit

- Cel: a weboldali szallasadatok es Google Business Profile adatok ne mondjanak ellent egymasnak.
- Statusz: BLOCKED
- Teendok: profilok, kategoriak, szolgaltatasok, kepek, URL-ek, foglalasi linkek ellenorzese.
- Blokkolo adatok: GBP hozzaferes vagy export; aktualis profil URL-ek.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kesobbi kulon audit RESULT.

## 9. SabeeApp Google Free Booking / Vacation Rental tisztazas

- Cel: kideruljon, hasznalhato-e SabeeApp-on keresztul Google Free Booking vagy Vacation Rental megjelenes.
- Statusz: BLOCKED
- Teendok: SabeeApp support megkeresese a vegrehajtasi terv kerdeslistaja alapjan.
- Blokkolo adatok: SabeeApp admin/support informacio; Google integracios statusz.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kesobbi tisztazasi RESULT.

## 10. Kep SEO javitas

- Cel: a galeria kepek alt/title/caption adatai legyenek konkretak es kephez kotottek.
- Statusz: TODO
- Teendok: generikus galeria mezok listazasa; kepenkenti vizualis atnezes; jovahagyott HU/EN mezok keszitese.
- Blokkolo adatok: kepek vizualis atnezese; jovahagyott kep SEO szovegek.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: jelen statuszfrissites.

### Kep SEO allapot

- MEGVAN: image registry alt/title/caption strukturaval, HU/EN mezokkel.
- MEGVAN: a template az `alt` mezot hasznalja a hero, gallery, related stay kepeknel.
- GYENGE: sok galeria alt/title/caption generikus, peldaul `Fugehaz gallery 001`, `Szololiget gallery image 001`.
- ELLENORIZENDO: caption mezok nem jelennek meg tartalmi kepalairaskent a preview/lightbox feluleten.

## 11. Angol oldalak ellenorzese

- Cel: az EN oldalak ugyanazokat a dontesi adatokat tartalmazzak, mint a HU oldalak.
- Statusz: TODO
- Teendok: HU/EN positioning paritas; hianyzo EN allitasok jelolese; canonical/hreflang ujraellenorzes.
- Blokkolo adatok: szallasadat-mester tabla; jovahagyott angol terminologia.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: jelen statuszfrissites.

### HU/EN oldalallapot

- MEGVAN: minden vizsgalt szallashoz van EN wrapper es EN adatfajl.
- MEGVAN: EN oldalak `lang="en"` es explicit `canonicalPath` mezot kapnak.
- MEGVAN: `LOCALIZED_ROUTE_PAIRS` tartalmazza a vizsgalt HU/EN szallasparokat.
- MEGVAN: sitemap tartalmazza a HU es EN szallas URL-eket.
- ELLENORIZENDO: EN tartalmi paritas, mert ahol a HU oldalon is hianyos az adat, ott EN oldalon sem lehet teljes.
- ELLENORIZENDO: Koveskal EN booking utvonal nincs SabeeApp linkkel megoldva.

## 12. Dontest segito landing oldalak

- Cel: tematikus keresesi szandekokra kulon, hasznos oldalak legyenek.
- Statusz: TODO
- Teendok: csak a mester tabla es hianylista ellenorzese utan induljon.
- Blokkolo adatok: adatparitas; tulajdonosi prioritas; belso linkstrategia.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kesobbi tartalomterv RESULT.

## 13. Teszteles es meres

- Cel: a javitasok utan merheto legyen az indexelhetoseg es AI-readiness.
- Statusz: TODO
- Teendok: Rich Results Test; URL Inspection; sitemap ellenorzes; GSC teljesitmeny figyeles; manual AI keresesi prompt tesztek.
- Blokkolo adatok: eles deploy; Google Search Console hozzaferes.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kesobbi teszt RESULT.

## Javasolt kovetkezo vegrehajtasi sorrend

1. `GOOGLE_AI_READINESS_POSITIONING_MATRIX.md`: tulajdonosi jovahagyas.
2. `GOOGLE_AI_READINESS_IMPLEMENTATION_PACKAGE_1.md`: frissitesi dontes, hogy a Package 1 a matrixbol dolgozzon.
3. `GOOGLE_AI_READINESS_BOOKING_LINKS.md`: nem-Koveskal SabeeApp URL-ek ujra jovahagyasa es Koveskal CTA dontes.
4. Elso implementacios kodtask csak jovahagyott pozicionalasi matrix, Package 1 es booking/erdeklodesi URL-ek utan.
5. `GOOGLE_AI_READINESS_SCHEMA_PLAN.md`: schema bovitesi terv frissitese ellenorzott, lathato adatokkal, es csak utana implementacio.
6. `GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`: kep SEO konkretizalas kepenkenti vizualis ellenorzes utan.
7. GBP es SabeeApp / Google Free Booking tisztazas.

## Implementacio elotti kapu

Kovetkezo kodos vagy adatfajlos implementacio csak akkor induljon, ha Csanad jovahagyta a pozicionalasi matrixot es az elso implementacios csomag tervet, valamint a booking linkek es CTA-k tisztazva vannak, kulonosen a Dandelion Koveskal SabeeApp link nelkuli foglalasi utja.

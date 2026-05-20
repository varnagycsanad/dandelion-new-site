[CHANGE 2026-05-20 00:00] Google AI Readiness projektkoveto letrehozva.
[CHANGE 2026-05-20 00:00] Elso repo-alapu allapotfelmeres rogzitve a Google AI Readiness tervhez.
[CHANGE 2026-05-20 00:00] Google AI Readiness munkadokumentumok letrehozva es a statuszhoz kapcsolva.

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
- A gyors dontesi adatok nem minden szallasnal azonos melyseguek.
- Sok negativ allitas hianyzik: peldaul nincs medence, kisallat nem engedett, nincs sajat parkolo.
- A szallasoldali fo CTA-k `button onclick="OpenBE()"` alapuak, nem crawlolhato `<a href>` linkek.
- Koveskal bookingLink sajat oldalra mutat, nem SabeeApp Booking Engine linkre.
- A LodgingBusiness schema minimalis, nem tartalmaz reszletes szallasadatokat.
- A legtobb nem-D2 galeriakep alt/title/caption mezoi generikusak.
- A `kinek nem idealis` blokk minden szallasnal hianyzik.

## 1. Szallasadat-mester tabla

- Cel: egyetlen attekintheto tabla minden szallas AI-szempontbol fontos adatarol.
- Statusz: IN_PROGRESS
- Teendok: a lentebbi elso repo-alapu tablazat tulajdonosi ellenorzese; hianyzo mezok potlasa; HU/EN paritas kesobb.
- Blokkolo adatok: pontos agyelrendezes, kisallat-szabaly, parkolasi reszletek, medence statusz hazankent.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`.

### Szallasonkenti adatallapot

| Szallas | Ferohely | Haloszobak | Furdok | Agyelrendezes | Medence statusz | Parkolas | Legkondi | Wifi | Kisallat | Csaladbarat | Kert / terasz | Telepules | Regio | Kozeli latnivalok | Kozeli strandok | Kinek ajanlott | Kinek nem ajanlott | HU booking link | EN booking link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dandelion D1 | MEGVAN: akar 8 fo / 6-8 fo | MEGVAN: 3 haloszoba + nappali; ELLENORIZENDO: leirasban tobb halo reszlet | ELLENORIZENDO: tobb zuhanyzos furdo + kulon WC / lista szerint 2 furdo | ELLENORIZENDO: ket 90 cm-es agy, kanape, tovabbi agyak reszlete hianyzik | MEGVAN: kozos panoramas medence 2026.06.01-tol | MEGVAN listaadatban: zart parkolo; oldalszovegben ELLENORIZENDO | ELLENORIZENDO: listaadatban klima, oldalon nem eleg explicit | HIANYZIK | HIANYZIK | MEGVAN: nagy csaladi haz / csaladbarat | MEGVAN: kert es panoramas terasz | MEGVAN: Kisapati | MEGVAN: Szent Gyorgy-hegy / Tapolcai-medence / Balaton-felvidek | MEGVAN: Balaton, Badacsony, Szigliget, Csobanc, boraszatok | MEGVAN altalanosan: Balaton rovid autouttal | MEGVAN: nagyobb csaladok, barati tarsasagok | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=2be20f0b68a1114a&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=2be20f0b68a1114a&lang=En` |
| Dandelion D2 | MEGVAN: 4-6 fo | MEGVAN listaadatban: 2 halo + nappali; oldalon ELLENORIZENDO | ELLENORIZENDO: kad szerepel, furdo darabszam hianyzik | HIANYZIK | MEGVAN: Panorama Pool 2026.06.01-tol | HIANYZIK | MEGVAN: klima | MEGVAN: gigabites internet | HIANYZIK: allatok a haznal nem azonos kisallat-szaballyal | MEGVAN: csaladi bazis / gyerekekkel kenyelmes | MEGVAN: nagy udvar, kert, fedett terasz | MEGVAN: Kisapati | MEGVAN: Szent Gyorgy-hegy / Balaton-felvidek | MEGVAN: Balaton, turak, boraszatok | MEGVAN altalanosan: strandok kozelben | MEGVAN: csaladi pihenes | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=c64244f6153c3ca1&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=c64244f6153c3ca1&lang=En` |
| Fugehaz | MEGVAN: 4 fo, potaggyal akar 6 fo | ELLENORIZENDO: ket szint, nappali-haloter es emeleti nyitott haloresz | MEGVAN: zuhanyzos furdo; darabszam ELLENORIZENDO | MEGVAN reszben: franciaagy, agyazhato kanape; teljes kiosztas ELLENORIZENDO | MEGVAN: kozos panoramas medence 2026.06.01-tol | HIANYZIK | ELLENORIZENDO: listaadatban klima, oldalon nem eleg explicit | HIANYZIK | HIANYZIK | MEGVAN: csaladbarat haz | MEGVAN: panoramas teraszok, kerti etkezo | ELLENORIZENDO: Szent Gyorgy-hegy kozeleben, pontos telepules nincs explicit | MEGVAN: Balaton-felvidek / Szent Gyorgy-hegy kornyeke | MEGVAN: tanuhagyek, turak, borok, strandok | MEGVAN altalanosan: strandok | MEGVAN: csaladias, nyugodt, teraszos pihenes | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=af2fdb8ed2ebb145&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=af2fdb8ed2ebb145&lang=En` |
| Zsalya Vendeghaz | MEGVAN: 4 fo | ELLENORIZENDO: ket szint, halo megnevezes nem explicit | MEGVAN: zuhanyzos furdo, furdo-kad, kulon WC; darabszam ELLENORIZENDO | MEGVAN reszben: franciaagy; tovabbi agyak HIANYZIK | HIANYZIK | HIANYZIK | MEGVAN: klima mindket szinten | ELLENORIZENDO: listaadatban ikon teves lehet, szoveges wifi nincs | HIANYZIK | MEGVAN: parok, kisebb csaladok, baratok | MEGVAN: reszben fedett terasz | MEGVAN: Kisapati / Szent Gyorgy-hegy keleti oldala | MEGVAN: Balaton-felvidek / Szent Gyorgy-hegy | MEGVAN: turautvonal, tanuhagyek, Csobanc, Gulacs, Toti-hegy | HIANYZIK | MEGVAN: nyugodt pihenest kereso parok, kisebb csaladok, baratok | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=cf20da88f046211e&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=cf20da88f046211e&lang=En` |
| Szololiget Vendeghaz | MEGVAN: 4 fo + 1 potagy | ELLENORIZENDO: kulonallo ketszintes haz, haloszoba nincs explicit | HIANYZIK | MEGVAN reszben: potagy; tovabbi agyak HIANYZIK | HIANYZIK | HIANYZIK | ELLENORIZENDO: listaadatban klima, oldalon nem eleg explicit | HIANYZIK | HIANYZIK | MEGVAN: csaladoknak is idealis | MEGVAN: nagy, korbejarhato terasz | MEGVAN: Kisapati / Szent Gyorgy-hegy keleti oldala | MEGVAN: Balaton-felvidek | MEGVAN: Bazaltorgona, boraszatok, tanuhagyek, Badacsony, Szigliget, Balaton | MEGVAN altalanosan: Balaton rovid uttal | MEGVAN: elvonulas, csaladok, kirandulok, bortura, balatoni nyaralas | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=e30c4b62d7324b3f&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=e30c4b62d7324b3f&lang=En` |
| Szepvolgyi Vendeghaz | MEGVAN: akar 8 fo | MEGVAN: 4 haloszoba | MEGVAN: 2 furdo | HIANYZIK | HIANYZIK | MEGVAN: zart kert, parkolas ket autonak | ELLENORIZENDO: listaadatban klima, oldalon nem eleg explicit | HIANYZIK | HIANYZIK | MEGVAN: csaladi nyaralashoz / nagyobb tarsasagnak | MEGVAN: zart kert, teraszbuborok | MEGVAN: Badacsonyors | MEGVAN: Balaton kozeli / Badacsonyors | MEGVAN: Folly Arboretum, Szigligeti var, borturak, gasztroprogramok, fesztivalok | MEGVAN: strand kozelben | MEGVAN: nagyobb csalad / tarsasag Balaton kozeleben | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=7d46f283f2f5792f&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=7d46f283f2f5792f&lang=En` |
| Dandelion Royal Homes | MEGVAN listaadatban: 4-6 fo; oldalon ELLENORIZENDO | MEGVAN: 2 haloszoba + nappali | MEGVAN: furdo kad+WC, kulon WC; darabszam ELLENORIZENDO | MEGVAN reszben: 180 cm franciaagy, kihuzhato kanape; tovabbi alvas ELLENORIZENDO | ELLENORIZENDO: medence nincs, de tetoteraszos jakuzzi van | HIANYZIK | MEGVAN: huto-futo klima | HIANYZIK | HIANYZIK | ELLENORIZENDO | MEGVAN: nagy terasz, szeles erkely, napozoterasz | MEGVAN: Keszthely | MEGVAN: Balaton-parti uduloovezet | MEGVAN: kikoto, setany, varoskozpont kb. 10 perc, kerekparut | MEGVAN: Balaton-part / sajat parti molo | MEGVAN: premium, modern apartmant kereso vendegek | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=c4b8753ec9ad4dc9&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=c4b8753ec9ad4dc9&lang=En` |
| Dandelion Vintage / Cottage | ELLENORIZENDO: ferohely nincs explicit a szallasoldalon | MEGVAN: 2 haloszoba + nappali | MEGVAN: furdo; darabszam ELLENORIZENDO | MEGVAN: 180 cm franciaagy, 2 kulon 90 cm agy, kihuzhato kanape | HIANYZIK | HIANYZIK | MEGVAN: klima | MEGVAN: eros / gigabites internet | HIANYZIK | MEGVAN: csaladbarat, bababarat | MEGVAN: sajat udvar, grillezes | MEGVAN: Nemesgulacs | MEGVAN: Balaton-felvidek | MEGVAN: kirandulohelyek, tanuhagyek, boraszatok | MEGVAN: Balaton 7 km | MEGVAN: csaladok, babaval erkezok, baratok, parok | HIANYZIK | MEGVAN: SabeeApp `selectedRooms=0c9e5eaae0545ee3&lang=Hu` | MEGVAN: SabeeApp `selectedRooms=0c9e5eaae0545ee3&lang=En` |
| Koveskal | HIANYZIK | HIANYZIK | HIANYZIK | HIANYZIK | HIANYZIK | HIANYZIK | HIANYZIK | HIANYZIK | HIANYZIK | MEGVAN: paroknak, csaladoknak, barati tarsasagoknak | ELLENORIZENDO: kert/terasz nincs explicit | MEGVAN: Koveskal | MEGVAN: Kali-medence | MEGVAN: Kali-medence falvai, turak, boros megallok, pincesorok | HIANYZIK | MEGVAN: csendes pihenest keresok | HIANYZIK | BLOKKOLT: sajat oldalra mutat `https://dandelionhouse.hu/koveskal/` | BLOKKOLT: sajat oldalra mutat `https://dandelionhouse.hu/koveskal/` |

## 2. Hianylista

- Cel: latszodjon, melyik szallasoldalon melyik dontesi adat hianyzik vagy nem eleg explicit.
- Statusz: IN_PROGRESS
- Teendok: tulajdonosi ellenorzes; biztos adatok potlasa kesobbi adatfajl-taskban.
- Blokkolo adatok: tulajdonosi megerosites a nem publikus komfortadatokra.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`.

### Legfontosabb hianyzo / ellenorizendo adatok

- Minden szallas: `kinek nem idealis` blokk HIANYZIK.
- Minden szallas: kisallat-szabaly HIANYZIK.
- D1: haloszoba/furdo/agykiosztas szovegek kozt ELLENORIZENDO pontossag; wifi HIANYZIK; klima csak listaadatbol ELLENORIZENDO.
- D2: furdo darabszam, agyelrendezes, parkolas, kisallat HIANYZIK vagy ELLENORIZENDO.
- Fugehaz: pontos telepules, parkolas, wifi, kisallat, teljes agykiosztas ELLENORIZENDO/HIANYZIK.
- Zsalya: wifi, parkolas, kisallat, medence statusz HIANYZIK; halo/agykiosztas ELLENORIZENDO.
- Szololiget: furdok, wifi, parkolas, kisallat, medence statusz HIANYZIK; halo/agykiosztas ELLENORIZENDO.
- Szepvolgyi: agyelrendezes, wifi, kisallat, medence statusz HIANYZIK; klima ELLENORIZENDO.
- Royal Homes: parkolas, wifi, kisallat, csaladbarat statusz, medence/jakuzzi megkulonboztetes ELLENORIZENDO.
- Vintage: ferohely, parkolas, kisallat, medence statusz HIANYZIK vagy ELLENORIZENDO.
- Koveskal: a legtobb konkret szallasadat HIANYZIK; booking link BLOKKOLT.

## 3. Foglalasi link terkep

- Cel: minden szallashoz egyertelmu, szobaspecifikus foglalasi URL legyen.
- Statusz: IN_PROGRESS
- Teendok: Koveskal booking cel tisztazasa; header/listing/szallasoldali CTA osszehangolasa; szallasoldali CTA-k linkesitese kesobbi kodtaskban.
- Blokkolo adatok: Koveskal foglalasi cel URL; SabeeApp aktualis szobakodok megerositese.
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
- Koveskal: BLOKKOLT, HU/EN `bookingLink` sajat oldalra mutat, nem SabeeApp foglalasi URL-re.

## 4. Gyors dontesi blokk

- Cel: minden szallasoldalon azonos szerkezetu, lathato quick-fact blokk legyen.
- Statusz: CHECK
- Teendok: a meglevo `overviewFacts` mezoket a mester tabla kotelezo mezoivel ossze kell igazítani.
- Blokkolo adatok: szallasadat-mester tabla ellenorzott hianyainak potlasa.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`.

### Allapot

- MEGVAN: lathato gyors attekintes jellegu blokk minden szallasoldalon.
- GYENGE: nem azonos mezokeszlet; tobb oldalon hianyzik furdo, agyak, parkolas, wifi, kisallat, medence negativ statusz.

## 5. Kinek ajanljuk / kinek nem blokk

- Cel: AI es emberi donteshez is egyertelmu alkalmassagi jelzesek adasa.
- Statusz: TODO
- Teendok: szallasonkenti ajanlott/nem idealis pontok tulajdonosi egyeztetese.
- Blokkolo adatok: tulajdonosi dontes a kizart vagy nem ajanlott esetek kommunikaciojarol.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md`.

### Allapot

- Reszben MEGVAN: tobb oldalon termeszetes szovegben szerepel, kinek valo.
- HIANYZIK: strukturalt `Nem ez a legjobb valasztas, ha...` blokk minden oldalon.

## 6. CTA linkesites

- Cel: a szallasoldali foglalasi CTA-k crawler szamara is rendes linkek legyenek.
- Statusz: TODO
- Teendok: a szallasoldali `button onclick="OpenBE()"` elemeket kesobbi kodtaskban `<a href={bookingLink}>` kompatibilis mintara vinni.
- Blokkolo adatok: foglalasi link terkep, kulonosen Koveskal.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`.

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
- Statusz: IN_PROGRESS
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
- Statusz: CHECK
- Teendok: HU/EN adatparitas tabla; hianyzo EN allitasok jelolese; canonical/hreflang ujraellenorzes.
- Blokkolo adatok: szallasadat-mester tabla; jovahagyott angol terminologia.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: jelen statuszfrissites.

### HU/EN oldalallapot

- MEGVAN: minden vizsgalt szallashoz van EN wrapper es EN adatfajl.
- MEGVAN: EN oldalak `lang="en"` es explicit `canonicalPath` mezot kapnak.
- MEGVAN: `LOCALIZED_ROUTE_PAIRS` tartalmazza a vizsgalt HU/EN szallasparokat.
- MEGVAN: sitemap tartalmazza a HU es EN szallas URL-eket.
- ELLENORIZENDO: EN tartalmi paritas, mert ahol a HU oldalon is hianyos az adat, ott EN oldalon sem lehet teljes.
- ELLENORIZENDO: Koveskal EN booking link ugyanugy sajat oldalra mutat.

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

1. `GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`: Csanad ellenorizze es toltse ki a hianyzo szallasadatokat.
2. `GOOGLE_AI_READINESS_BOOKING_LINKS.md`: Koveskal / Kovagoors booking cel es SabeeApp selectedRooms kodok tisztazasa.
3. Vegleges szallasadat-mester tabla letrehozasa az ellenorzott hianylista alapjan.
4. Gyors dontesi blokk adatainak egysegesitese HU/EN oldalon.
5. `Kinek ajanljuk / kinek nem` blokk tartalmi tervezese.
6. CTA linkesites kodtask a booking link terkep alapjan.
7. `GOOGLE_AI_READINESS_SCHEMA_PLAN.md`: schema bovitesi terv frissitese ellenorzott adatokkal, es csak utana implementacio.
8. `GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`: kep SEO konkretizalas kepenkenti vizualis ellenorzes utan.
9. GBP es SabeeApp / Google Free Booking tisztazas.

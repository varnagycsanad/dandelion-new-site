[CHANGE 2026-05-20 00:00] Google AI Readiness projektkoveto letrehozva.

# Google AI Readiness terv

Cel: a Dandelion szallasoldalak legyenek konzisztensen ertelmezhetok Google AI Overviews / AI Mode, organikus kereses, kepkereses es foglalasi dontest tamogato talalatok szamara.

## Statusz jelolesek

- TODO: meg nincs elkezdve.
- IN_PROGRESS: folyamatban van, de nincs kesz.
- DONE: elkeszult es ellenorzott.
- BLOCKED: kulso dontes vagy hianyzo adat blokkolja.
- CHECK: elkeszultnek tunik, kulon ellenorzesre var.

## 1. Szallasadat-mester tabla

- Cel: egyetlen attekintheto tabla minden szallas AI-szempontbol fontos adatarol.
- Statusz: TODO
- Teendok: szallasok listazasa; ferohely, halok, agyak, furdok, medence, parkolas, klima, wifi, csaladbarat, kisallat, kert/terasz, telepules, regio mezok felvetele.
- Blokkolo adatok: pontos agyelrendezes, kisallat-szabaly, parkolasi reszletek, medence statusz hazankent.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 2. Hianylista

- Cel: latszodjon, melyik szallasoldalon melyik dontesi adat hianyzik vagy nem eleg explicit.
- Statusz: TODO
- Teendok: HU es EN oldalak osszevetese; hianyzo pozitiv es negativ allitasok jelolese; prioritas adasa.
- Blokkolo adatok: tulajdonosi megerosites a nem publikus komfortadatokra.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 3. Foglalasi link terkep

- Cel: minden szallashoz egyertelmu, szobaspecifikus foglalasi URL legyen.
- Statusz: TODO
- Teendok: SabeeApp URL-ek es selectedRooms azonositok osszegyujtese; Koveskal link tisztazasa; HU/EN linkek parositasa.
- Blokkolo adatok: Koveskal foglalasi cel URL; SabeeApp aktualis szobakodok megerositese.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 4. Gyors dontesi blokk

- Cel: minden szallasoldalon azonos szerkezetu, lathato quick-fact blokk legyen.
- Statusz: TODO
- Teendok: kotelezo mezok veglegesitese; hianyzo adatok potlasa; HU/EN szovegek ellenorzese.
- Blokkolo adatok: szallasadat-mester tabla.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kesobbi implementacios RESULT.

## 5. Kinek ajanljuk / kinek nem blokk

- Cel: AI es emberi donteshez is egyertelmu alkalmassagi jelzesek adasa.
- Statusz: TODO
- Teendok: celcsoportok meghatarozasa; "nem idealis" esetek ovatos megfogalmazasa; HU/EN paritas.
- Blokkolo adatok: tulajdonosi dontes a kizart vagy nem ajanlott esetek kommunikaciojarol.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kesobbi implementacios RESULT.

## 6. CTA linkesites

- Cel: a szallasoldali foglalasi CTA-k crawler szamara is rendes linkek legyenek.
- Statusz: TODO
- Teendok: JS-only OpenBE gombok auditja; linkes CTA minta kijelolese; szobaspecifikus href hasznalata.
- Blokkolo adatok: foglalasi link terkep.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 7. Schema bovites

- Cel: a lathato szoveggel egyezo, reszletesebb structured data.
- Statusz: TODO
- Teendok: jelenlegi LodgingBusiness es Breadcrumb schema ellenorzese; bovitesi mezok listazasa; csak lathato adattal egyezo schema tervezese.
- Blokkolo adatok: szallasadat-mester tabla; CTA link terkep.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 8. Google Business Profile audit

- Cel: a weboldali szallasadatok es Google Business Profile adatok ne mondjanak ellent egymasnak.
- Statusz: BLOCKED
- Teendok: profilok, kategoriak, szolgaltatasok, kepek, URL-ek, foglalasi linkek ellenorzese.
- Blokkolo adatok: GBP hozzaferes vagy export; aktualis profil URL-ek.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kulon audit RESULT.

## 9. SabeeApp Google Free Booking / Vacation Rental tisztazas

- Cel: kideruljon, hasznalhato-e SabeeApp-on keresztul Google Free Booking vagy Vacation Rental megjelenes.
- Statusz: BLOCKED
- Teendok: SabeeApp dokumentacio vagy support valasz beszerzese; Dandelion fiok beallitasainak ellenorzese.
- Blokkolo adatok: SabeeApp admin/support informacio; Google integracios statusz.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: kulon tisztazasi RESULT.

## 10. Kep SEO javitas

- Cel: a galeria kepek alt/title/caption adatai legyenek konkretak es kephez kotottek.
- Statusz: TODO
- Teendok: generikus gallery altok listazasa; kepenkenti tartalmi leiras; HU/EN mezok kitoltese; caption hasznalati dontes.
- Blokkolo adatok: kepek vizualis atnezese; jovahagyott kep SEO szovegek.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 11. Angol oldalak ellenorzese

- Cel: az EN oldalak ugyanazokat a dontesi adatokat tartalmazzak, mint a HU oldalak.
- Statusz: TODO
- Teendok: HU/EN paritas tabla; hianyzo EN allitasok jelolese; canonical/hreflang ujraellenorzes.
- Blokkolo adatok: szallasadat-mester tabla; jovahagyott angol terminologia.
- Utolso frissites: 2026-05-20
- Kapcsolodo commit / RESULT helye: audit RESULT ebben a threadben.

## 12. Dontest segito landing oldalak

- Cel: tematikus keresesi szandekokra kulon, hasznos oldalak legyenek.
- Statusz: TODO
- Teendok: temaotletek listazasa; prioritas: csaladbarat, medences, Balaton kozeli, kutyabarat/nem kutyabarat, nagyobb tarsasag, panoramas.
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

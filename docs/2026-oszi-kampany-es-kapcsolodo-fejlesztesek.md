# 2026 őszi kampány és kapcsolódó fejlesztések

## Projekt összefoglaló

- Projekt célja: egy közös, adatvezérelt 2026-os őszi kampányrendszer megvalósítása két ajánlati landing oldallal, egy főoldali kampányblokkal és teljes kampányméréssel, D1 kizárásával.
- Aktuális állapot: az audit, a fő üzleti döntések, a közös őszi offer data schema és a shared landing sablon már elkészült; a két őszi route buildelhető, átmenetileg `noindex` módban, és a 2026-07-23-i implementáció plusz build- és preview-audit igazolta a főoldali kétkártyás kampányblokkot, a landing route-okra vezető `Bővebben` CTA-kat, a delegált homepage-kattintásmérés technikai alapját, valamint a finomított vizuális verziót, ahol mobilon is két kompakt teaserkártya jelenik meg egymás mellett, meglévő repo-s lifestyle és családos képekkel. A Fügeház és D2 végleges üzleti listájának teljes repo-szintű harmonizációja ugyanakkor továbbra is nyitott `CNT-002` és `CNT-003` alatt.
- Következő végrehajtandó feladat: `QA-002` - landing oldalak mobil hero, CTA és image QA terve.
- Elkészült feladatok száma: `28`
- Még le nem zárt feladatok száma: `20`
- Státuszmegoszlás: `19` nincs elkezdve, `1` folyamatban, `0` blokkolt, `28` elkészült, `1` elvetve.

## Mérföldkövek (Milestones)

Az alábbi mérföldkövekhez a dokumentumban szereplő összes feladat hozzá van rendelve elsődleges felelősségi kör szerint.

### M1 - Üzleti döntések lezárása

- Státusz: `[~]`
- Rövid leírás: a kampány üzleti, tartalmi és jóváhagyási alapjainak lezárása, különösen a szolgáltatáslisták, a kommunikációs állítások és a promóciós irányok rögzítésével.
- Kapcsolódó feladatok: `AUT-001`, `CNT-001`, `CNT-002`, `CNT-003`, `CNT-004`, `CNT-005`, `CNT-006`, `CNT-009`, `CNT-010`, `CNT-011`

### M2 - Meglévő SabeeApp booking forrás használata

- Státusz: `[~]`
- Rövid leírás: a kampány a meglévő, élő D2 és Fügeház SabeeApp booking linkekre támaszkodik; külön SabeeApp-fejlesztés vagy foglalhatósági audit nem része a mostani scope-nak.
- Kapcsolódó feladatok: `SAB-006`, `SAB-007`

### M3 - Közös ajánlati adatmodell és sablon

- Státusz: `[~]`
- Rövid leírás: a közös offer data schema, offer sablon, közvetlen foglalási előnyök és közös SEO-minimum meghatározása a meglévő adatok újrahasználásával.
- Kapcsolódó feladatok: `AUT-002`, `AUT-003`, `AUT-004`, `AUT-005`, `AUT-006`, `CNT-007`, `CNT-008`, `SEO-001`, `SEO-002`, `SEO-003`

### M4 - Fügeház kampányoldal

- Státusz: `[ ]`
- Rövid leírás: a Fügeház páros őszi ajánlatának teljes landing-oldal specifikációja és megvalósítása.
- Kapcsolódó feladatok: `WEB-001`, `WEB-002`, `WEB-003`

### M5 - D2 kampányoldal

- Státusz: `[ ]`
- Rövid leírás: a D2 családi őszi ajánlatának teljes landing-oldal specifikációja, megvalósítása és landing-szintű QA-ja.
- Kapcsolódó feladatok: `WEB-004`, `WEB-005`, `WEB-006`, `QA-002`

### M6 - Főoldali kampányblokk

- Státusz: `[x]`
- Rövid leírás: a kétkártyás főoldali kampányblokk tervezése, bekötése és reszponzív ellenőrzése.
- Kapcsolódó feladatok: `WEB-007`, `WEB-008`, `WEB-009`, `WEB-010`, `QA-001`, `DEP-001`

### M7 - Kampánymérés

- Státusz: `[~]`
- Rövid leírás: a teljes kampánymérés, consent-kompatibilis eseménylánc, booking-start és purchase audit, valamint tracking QA lezárása.
- Kapcsolódó feladatok: `TRK-001`, `TRK-002`, `TRK-003`, `TRK-004`, `TRK-005`, `TRK-006`, `TRK-007`, `TRK-008`, `TRK-009`, `QA-003`

### M8 - Google Ads és Meta kampányok indulása

- Státusz: `[ ]`
- Rövid leírás: a hirdetési naming, attribúciós út, rollout-sorrend és kampányindítás előkészítése.
- Kapcsolódó feladatok: `ADS-001`, `ADS-002`, `ADS-003`, `DEP-002`

## 1. Dokumentum célja

Ez a dokumentum a 2026-os őszi kampány egyetlen hivatalos állapotkövető és megvalósítási terve. A cél egy olyan, a jelenlegi Astro-alapú projekt tényleges állapotára épülő, lépésenként végrehajtható terv rögzítése, amely:

- nem duplikálja a meglévő accommodation- és image registry adatokat;
- külön kezeli a technikai, üzleti, tartalmi és mérési függőségeket;
- csak bizonyított állapotokat jelöl késznek;
- mérföldkő-alapú roadmapként is működik;
- a későbbi Codex-taskok számára közös referenciaként szolgál.

## 2. Rögzített üzleti döntések

- D1 ősszel nem kiadható, mert a tulajdonos használja.
- D1 nem jelenhet meg őszi landing oldalon, főoldali kampányblokkban, hirdetésben vagy őszi SabeeApp-ajánlatban.
- Az első verzióban csak két kampány készül: Fügeház páros őszi pihenés, Dandelion D2 családi őszi pihenés.
- A főoldalon két kampánykártya jelenik meg.
- A főoldali `Bővebben` CTA nem nyit közvetlenül SabeeAppot, hanem a megfelelő landing oldalra vezet.
- A landing oldalak elsődleges CTA-ja `Árak és szabad időpontok`, amely a megfelelő SabeeApp foglalási felületet nyitja meg.
- A SabeeApp az élő foglalási, elérhetőségi és árforrás.
- A landingoldalak a meglévő D2 és Fügeház foglalási linkekre irányítanak.
- A Booking.com és Airbnb felé továbbított szállásár 5%-kal magasabb a közvetlen SabeeApp-árnál.
- A takarítási díj és az idegenforgalmi adó minden csatornán azonos logika szerint működik.
- Jelenleg nincs külön promóció sem a Booking.comon, sem az Airbnb-n, sem a közvetlen csatornán.
- Jóváhagyott kommunikáció: `Foglaljon közvetlenül - nálunk olcsóbban.`
- A `nálunk olcsóbban` kommunikáció üzleti döntésként jóváhagyott, de a technikai végösszeg-QA külön nyitott feladat marad.
- Nem készül rate plan, availability, minimum stay vagy foglalhatósági audit.
- SabeeApp-fejlesztés jelenleg nem része a kampány scope-jának.
- Külön SabeeApp-feladat csak akkor jön létre, ha később konkrét promóciós beállítást kell végrehajtani.
- A Fügeház és a D2 kampány végleges üzleti tartalma jóváhagyott; a részletes szolgáltatás- és programlista a 10. fejezetben szerepel.
- A D2 dézsája nem szerepelhet.
- A Panorama Pool csak olyan időszakhoz kapcsolható, amikor ténylegesen nyitva van.
- A Fügeház páros őszi ajánlatához külön promóció készül; a kommunikáció fő elemei rögzítettek, a konkrét promóciós mechanika még nyitott.
- A D2 családi őszi ajánlatához külön promóció készül; a kommunikáció fő elemei rögzítettek, a konkrét promóciós mechanika még nyitott.
- A promóciók hiánya nem akadályozza a `nálunk olcsóbban` kommunikáció használatát.
- A teljes kampánymérés megvalósítása kötelező, a booking-start/purchase lánc auditja külön nyitott feladat marad.
- Nem készül teljes ajánlati katalógus vagy adminfelület.
- Nem készül tíz külön kampányoldal.
- Közös, adatvezérelt ajánlati sablon szükséges.
- A meglévő accommodation- és image registry adatokat újra kell használni.

## 3. Jelenlegi projektállapot

- A projekt static Astro site; ezt a `package.json` és az `astro.config.mjs` is alátámasztja. Az `output: 'static'`, a publikus domain `https://dandelionhouse.hu`, a `base` `/`.
- A főoldal tényleges page fájlja a `src/pages/index.astro`. A jelenlegi sorrend: `Hero`, `PanoramaPoolHighlight`, review blokk, `d2-region-guide`, `RegionStories`, `Experiences`, `NewsletterSignup`, `HomeGeoFaq`, `GoogleRegionMap`.
- A főoldal importált, releváns újrahasználható elemei jelenleg: `src/components/Hero.astro`, `src/sections/PanoramaPoolHighlight.astro`, `src/sections/RegionStories.astro`, `src/sections/Experiences.astro`, `src/components/GoogleRegionMap.astro`, `src/components/NewsletterSignup.astro`, `src/components/HomeGeoFaq.astro`.
- A jelenlegi D2 és Fügeház oldalak page-wrapper szinten már adatvezérelten működnek: `src/pages/dandelion-d2.astro` es `src/pages/fuge.astro` a közös `src/templates/AccommodationPage.astro` sablont használja.
- A részletes szállásadatok újrahasználható forrásai: `src/data/accommodations.ts`, `src/data/accommodation-pages/d2.ts`, `src/data/accommodation-pages/fugehaz.ts`.
- A képek központi registryben vannak: `src/data/images/accommodation-images.ts`. D2 és Fügeház esetén elérhető `hero.desktop`, `hero.mobile`, `card`, `gallery`, `thumbnail`.
- A SabeeApp CTA jelenlegi megvalósítása központosított mintát követ: az `AccommodationPage.astro` a `bookingLink` alapján Sabee linket renderel, és Sabee URL esetén `onclick="OpenBE(); return false;"` viselkedést használ.
- A booking attribution és kampányparaméter-kezelés a `public/scripts/dnd-booking-attribution.js` fájlban látható. Ez a script tárolja és Sabee URL-re dekorálja az olyan paramétereket, mint `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`.
- A kattintásmérés központi, delegált megoldással történik a `public/scripts/dnd-ads-events.js` fájlban. Itt már létezik `dnd_booking_click`, `meta_booking_click`, `meta_initiate_checkout` és több contact/pool esemény.
- Consent-oldalon a `src/layouts/BaseLayout.astro` és a `public/scripts/consent-init-cookie-refine.js` bizonyítja, hogy a jelenlegi mérés consent-kompatibilis módra van felkészítve.
- Már léteznek kampány- vagy landingoldal-minták a projektben: `src/pages/last-minute-d2.astro`, `src/pages/szent-gyorgy-hegy-matine-szallas.astro`, `src/pages/kisapati-medences-szallas.astro`, valamint a `src/components/KisapatiPoolLandingPage.astro`.
- Általános, kifejezetten ajánlati célú `OfferLandingPage` vagy hasonló néven nevezett közös sablon a beolvasott kódban nem azonosítható.

## 4. Megvalósíthatósági ellenőrzés

- Megvalósítható-e a terv a jelenlegi static Astro architektúrában? Igen. A projekt már most is több statikus landing oldalt, adatvezérelt szállásoldalakat, központi image registryt és központi CTA/tracking réteget használ.
- Hol van a tényleges főoldali beillesztési pont? A jelenlegi `src/pages/index.astro` alapján a legkisebb kockázatú beillesztési pont a review blokk után, a `d2-region-guide` es `RegionStories` szekciók környezetében van. Itt illeszthető be egy kétkártyás kampányblokk teljes főoldali redesign nélkül.
- Milyen meglévő komponensek használhatók újra? `BaseLayout.astro`, `AccommodationPage.astro`, a meglévő accommodation page data fájlok, a központi image registry, a booking attribution script, a delegált CTA tracking script, valamint a kampányoldalakon már alkalmazott CTA adat-attribútum minta.
- Van-e már általános landing page vagy offer komponens? Általános offer komponens nem bizonyított. Vannak viszont részben újrahasználható landing minták és egy közös accommodation sablon.
- Hogyan működik jelenleg a D2 és Fügeház SabeeApp CTA? Mindkét oldal a saját page data `bookingLink` mezőjéből indul, és az `AccommodationPage.astro` sablon Sabee esetén `OpenBE()`-t hívó elsődleges és részletes CTA-kat renderel.
- Elérhető-e lakásonként közvetlen OpenBE vagy booking token? Igen, repo-szinten bizonyíthatóan igen. A D2 és Fügeház data fájlok selectedRooms paraméterezett Sabee URL-eket tartalmaznak.
- Kell-e külön SabeeApp audit a kampány indulásához? Nem. A kampány a meglévő élő booking linkekre és az aktuális SabeeApp állapotra támaszkodik; külön audit csak későbbi, konkrét promóciós beállítás esetén indokolt.
- Milyen accommodation adatok használhatók újra? A listing szintű és detail szintű tartalmak, kulcsjellemzők, feature-ök, related stay kapcsolatok és a booking linkek.
- Milyen képek és SEO draftok állnak rendelkezésre? A központi image registryből hero, card, gallery és thumbnail képek elérhetők. SEO-szöveg és meta jellegű draftok részben a page data fájlokban és részben a meglévő landing oldalakban látszanak.
- Mi hiányzik a Fügeház és D2 szolgáltatáslistájából? Az üzleti lista jóváhagyott; a hiányzó lépés a véglegesített tartalom repo-szintű átvezetése, a landing copyhoz szükséges bontás elkészítése, valamint a Panorama Pool szezonális feltételének és a D2/Fügeház kampánycopy megfelelőségének ellenőrzése.
- Mi hiányzik a purchase mérésből? A repo-ban bizonyított a booking CTA click mérés és az attribúciós paraméterkezelés, de a Sabee booking start és a sikeres purchase teljes, forráskódban is követhető lánca nem látható egyértelműen.
- Van-e ütközés a jelenlegi accommodation sablonosítási tervvel? Nem szükségszerűen, ha az őszi ajánlati rendszer a meglévő accommodation- és image registryre épül. Ütközés akkor lenne, ha külön, kézzel karbantartott kampány-adatmodellt vezetnénk be.
- Melyik fejlesztési lépés végezhető el elsőként minimális kockázattal? Az ajánlati adatmodell és közös offer sablon technikai specifikációja, majd annak statikus implementációja a meglévő adatforrások újrahasználásával.

## 5. Függőségek és blokkoló tényezők

- `AUT-001` `[x]` Feladat: a jelenlegi architektúra auditálása és a kampány state-of-truth dokumentum létrehozása; Függőség: repository olvasási hozzáférés; Várható fájlok vagy rendszer: `AGENT.md`, `DANDELION_RULES.md`, `DANDELION_CHATGPT_RULES.md`, `package.json`, `astro.config.mjs`, `src/pages/index.astro`, `src/templates/AccommodationPage.astro`, `src/data/**`, `public/scripts/**`, `project-docs/**`; Elfogadási feltétel: a dokumentum rögzíti a jelenlegi bizonyított állapotot és a nyitott kérdéseket; Megjegyzés: elkészült 2026-07-23-án.
- `CNT-001` `[x]` Feladat: Fügeház és D2 őszi kampánytartalmának végleges üzleti jóváhagyása; Függőség: tulajdonosi vagy operatív visszaigazolás; Várható fájlok vagy rendszer: tartalmi brief, szállásoldal-adatok, kampány state-of-truth dokumentáció; Elfogadási feltétel: a Fügeház páros és a D2 családi őszi ajánlat szolgáltatáslistája, kommunikációs blokkja, babás kiegészítői és programajánlója jóváhagyott formában rögzítve van; Megjegyzés: a jóváhagyott üzleti lista a 10. fejezetben szerepel, a következő lépés már az implementációs adatmodell és repo-szintű átvezetés.
- `TRK-001` `[ ]` Feladat: teljes kampánymérés auditja és megvalósítási terve, beleértve a booking-start és purchase lánc ellenőrzését; Függőség: GTM/GA4 hozzáférés vagy dokumentált mérési bizonyíték; Várható fájlok vagy rendszer: GTM, GA4, Sabee, esetleges külső tag/bridge; Elfogadási feltétel: ismert, hogy mely esemény honnan jön, hogyan kap offer/property meta adatot, és mi szükséges a teljes kampánymérés megvalósításához; Megjegyzés: kötelező munkacsomag, jelenleg nyitott.

## 6. MVP pontos scope-ja

- Két ajánlati landing oldal: Fügeház es D2.
- Egy közös, adatvezérelt ajánlati sablon.
- Egy főoldali, kétkártyás őszi kampányblokk.
- A meglévő D2 és Fügeház SabeeApp booking linkekre mutató elsődleges CTA a landing oldalakon.
- Közvetlen foglalási előnyöket összefoglaló közös blokk, csak igazolt vagy külön jelölt állításokkal.
- SEO minimum: title, description, H1/H2 struktúra, belső linkelés, indexelési döntés.
- Mérés minimum: ajánlatkártya kattintás, landing megtekintés, booking CTA kattintás, ajánlat- és property-azonosítók továbbítása, consent-kompatibilitás.

## 7. Nem része az első verziónak

- D1 bármilyen bevonása.
- Teljes ajánlati katalógus.
- Adminfelület.
- Tíz külön kampányoldal.
- Párhuzamos accommodation adatmodell.
- Rate plan, availability, minimum stay vagy foglalhatósági audit.
- SabeeApp-fejlesztés a mostani kampányscope részeként.
- Új képgyártás vagy image registry átírása ebben a taskban.
- Főoldali redesign.
- GTM vagy GA4 konfiguráció módosítása ebben a taskban.
- SabeeApp módosítása ebben a taskban.

## 8. Technikai architektúra

- Tervezett irány: egy új, közös ajánlati sablon, amely a meglévő Astro komponensstruktúrához illeszkedik, és a jelenlegi `src/data/accommodation-pages/*.ts` valamint `src/data/images/accommodation-images.ts` forrásokból dolgozik.
- A meglévő `BaseLayout.astro` alkalmas arra, hogy kampányoldalak közös layoutjaként szolgáljon, és szükség esetén `bookingHrefOverride`-dal szabályozza a header/footer booking CTA viselkedését.
- A meglévő `AccommodationPage.astro` közvetlenül nem offer sablon, de bizonyítja, hogy a house-specific Sabee linkek, trust label és booking CTA logika már adatvezérelten kezelhető.
- A kampány booking-rétege a meglévő D2 és Fügeház SabeeApp linkeket használja; külön SabeeApp audit vagy fejlesztés nem előfeltétele a landingoldalak elkészítésének.
- A közös ajánlati rendszerhez nem új accommodation adatbázis kell, hanem egy vékony, offer-specifikus adatdefiníció, amely referenciákat tart a meglévő szállásadatokra, képekre, CTA-linkekre és kampány-meta adatokra.
- A landingoldalak szerkezete a vizsgált referenciaoldalak logikáját követi: erős érzelmi hero, célcsoport-specifikus szolgáltatásblokk, programblokk, képi blokk, közvetlen foglalási előnyök blokk és hangsúlyos foglalási CTA-szekció ugyanabban a ritmusban.
- A főoldal kampányblokkja nem általános szálláslistaként, hanem két célzott kampány-belépési pontként működik, külön Fügeház páros és D2 családi iránnyal.
- A képekhez a központi registryből kell hero, card és mobil specifikus asseteket használni; új, ad hoc fájlútvonalak létrehozása kerülendő.
- A méréshez a jelenlegi `data-dnd-*` attribútum mintát célszerű továbbvinni, mert a `public/scripts/dnd-ads-events.js` már ezt olvassa.

## 9. SabeeApp munkacsomag

- A SabeeApp a kampány számára élő foglalási, elérhetőségi és árforrásként szolgál.
- A landingoldalak a már meglévő D2 és Fügeház booking linkeket használják.
- Nem készül külön rate plan, availability, minimum stay vagy foglalhatósági audit.
- Nem készül külön SabeeApp-fejlesztés ebben a kampányscope-ban.
- Külön SabeeApp-feladat csak akkor jön létre, ha később konkrét promóciós beállítást kell végrehajtani.
- `SAB-006` `[ ]` Feladat: technikai ár-QA lefuttatása konkrét D2 és Fügeház időpontokra, SabeeApp vs. Booking.com vs. Airbnb végösszegekkel; Függőség: rögzített üzleti árlogika; Várható fájlok vagy rendszer: SabeeApp, Booking.com, Airbnb; Elfogadási feltétel: több konkrét dátumpáron ellenőrzött, hogy a közvetlen végösszeg alacsonyabb, miközben a takarítási díj és az idegenforgalmi adó azonos logikával szerepel; Megjegyzés: a `Foglaljon közvetlenül - nálunk olcsóbban.` kommunikáció üzletileg jóváhagyott, ez a feladat már csak technikai spot-QA.
- `SAB-007` `[x]` Feladat: lakásonkénti Sabee link és selectedRooms token bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/data/accommodation-pages/d2.ts`, `src/data/accommodation-pages/fugehaz.ts`; Elfogadási feltétel: mindkét kampányhoz azonosítható house-specific Sabee URL létezik; Megjegyzés: D2 es Fügeház esetén ez bizonyított.

## 10. Tartalmi és szolgáltatási munkacsomag

Jóváhagyott üzleti tartalom `CNT-001` alapján:

**Fügeház – Őszi kettesben**

- Kampányban használható szolgáltatások: Panorama Pool (csak szezonban), 2 db felnőtt kerékpár díjmentesen, kandalló, grillező, tűzrakóhely, ingyenes tűzifa, ingyenes Wi-Fi, ingyenes parkolás.
- Kommunikációs blokkok: romantikus őszi kikapcsolódás, borászatok, kerékpártúrák, esti kandallózás, grillezés, csillagos ég, nyugodt környezet.
- Babával érkezőknek igény esetén biztosítható: babaágy, babakád, etetőszék, fellépő.

**D2 – Őszi családi pihenés**

- Kampányban használható szolgáltatások: Panorama Pool (csak szezonban), kandalló, grillező, tűzrakóhely, ingyenes tűzifa, ingyenes Wi-Fi, ingyenes parkolás, családbarát kialakítás.
- Kommunikációs blokkok: családi kikapcsolódás, külön hálószoba + nappali, közös programok, esti kandallózás, grillezés.
- Babával érkezőknek igény esetén biztosítható: babaágy, babakád, etetőszék, fellépő.

**Programajánló**

- Mindkét kampányban használható: Tapolcai-tavasbarlang, Szent György-hegyi túrák, balatoni strandok, közeli borászatok.
- A családi kampányban ezen felül használható: Kisapáti játszótér, pingpongasztal, kerékpáros ügyességi pálya.

- `CNT-002` `[ ]` Feladat: Fügeház végleges üzleti szolgáltatáslistájának implementációs átvezetése és repo-szintű ellenőrzése; Függőség: `CNT-001`; Várható fájlok vagy rendszer: `src/data/accommodation-pages/fugehaz.ts`, offer data, landing content; Elfogadási feltétel: a repo-beli Fügeház tartalom visszaadja a jóváhagyott kampánylistát, a romantikus pozicionálást, a babás kiegészítőket és a szezonális Panorama Pool megkötést; Megjegyzés: a 2026-07-23-i audit igazolta, hogy az új őszi landing route és az offer data már a jóváhagyott listát használja, de a teljes repo-szintű Fügeház tartalom még nem minden ponton harmonizált, ezért a feladat nyitott marad.
- `CNT-003` `[ ]` Feladat: D2 végleges üzleti szolgáltatáslistájának implementációs átvezetése és repo-szintű ellenőrzése; Függőség: `CNT-001`; Várható fájlok vagy rendszer: `src/data/accommodation-pages/d2.ts`, offer data, landing content; Elfogadási feltétel: a repo-beli D2 tartalom visszaadja a jóváhagyott kampánylistát, a családi pozicionálást, a babás kiegészítőket, a családi programblokkokat és a dézsa kizárását; Megjegyzés: a 2026-07-23-i audit igazolta, hogy az új őszi landing route és az offer data már a jóváhagyott listát használja, de a teljes repo-szintű D2 tartalom még nem minden ponton harmonizált, ezért a feladat nyitott marad.
- `CNT-004` `[ ]` Feladat: Panorama Pool kommunikáció szezonális feltételeinek rögzítése; Függőség: `CNT-001`; Várható fájlok vagy rendszer: üzleti döntés, nyitvatartási szabály; Elfogadási feltétel: a kampányoldalakon csak tényleges nyitvatartási időben jelenik meg; Megjegyzés: ezt a brief kifejezetten megköveteli.
- `CNT-005` `[x]` Feladat: páros es családi célcsoport-szöveg jóváhagyása; Függőség: `CNT-001`; Várható fájlok vagy rendszer: landing copy brief, kampány state-of-truth dokumentáció; Elfogadási feltétel: a Fügeház pozicionálása páros, a D2 pozicionálása családi irányban jóváhagyott es rögzített; Megjegyzés: a következő lépés ennek landing copy- és offer data-szintű átvezetése, nem újabb üzleti döntés.
- `CNT-006` `[ ]` Feladat: őszi környékbeli programlista ellenőrzése; Függőség: `CNT-001`; Várható fájlok vagy rendszer: existing regional content, offer data, landing content; Elfogadási feltétel: a kampányoldali programblokk a jóváhagyott példalistára épül, és az érintett kampányoldalakon konzisztensen szerepel; Megjegyzés: jóváhagyott példák: Tapolcai-tavasbarlang, Szent György-hegy, balatoni strandok, borászatok, Kisapáti játszótér, pingpong, kerékpáros ügyességi pálya.
- `CNT-010` `[ ]` Feladat: Fügeház páros őszi ajánlat külön promóciójának kidolgozása; Függőség: üzleti döntés és tartalmi brief; Várható fájlok vagy rendszer: promóciós brief, későbbi landing copy; Elfogadási feltétel: rögzített promóciós ajánlat vagy kedvezménylogika áll rendelkezésre; Megjegyzés: a promóció hiánya nem akadályozza a `nálunk olcsóbban` kommunikációt; kommunikáció fő elemei: romantikus ősz, kandalló, kerékpár, borászatok, Panorama Pool, grillezés.
- `CNT-011` `[ ]` Feladat: D2 családi őszi ajánlat külön promóciójának kidolgozása; Függőség: üzleti döntés és tartalmi brief; Várható fájlok vagy rendszer: promóciós brief, későbbi landing copy; Elfogadási feltétel: rögzített promóciós ajánlat vagy kedvezménylogika áll rendelkezésre; Megjegyzés: a promóció hiánya nem akadályozza a `nálunk olcsóbban` kommunikációt; kommunikáció fő elemei: családi kikapcsolódás, Panorama Pool, kandalló, családi programok, grillezés.

## 11. Közös ajánlati sablon

- `AUT-002` `[x]` Feladat: a közös ajánlati sablon újrahasználati alapjainak azonosítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/layouts/BaseLayout.astro`, `src/templates/AccommodationPage.astro`, `src/data/accommodation-pages/*.ts`, `src/data/images/accommodation-images.ts`; Elfogadási feltétel: bizonyított, hogy van layout, CTA, data es image alap a közös offer rendszerhez; Megjegyzés: ez a terv inputja, nem kész offer komponens.
- `AUT-003` `[x]` Feladat: offer data schema definiálása a meglévő accommodation adatok referálásával; Függőség: `AUT-002`, `CNT-002`, `CNT-003`; Várható fájlok vagy rendszer: `src/data/offers/types.ts`, `src/data/offers/autumn-2026.ts`, meglévő data references; Elfogadási feltétel: nincs kézzel duplikált szállásadat, csak referenciák es kampányspecifikus mezők; Megjegyzés: elkészült a közös őszi offer schema és a két első kampányrekord, a ténylegesen elérhető meglévő házlistára, page data-ra, booking linkekre és image registryre építve.
- `AUT-004` `[x]` Feladat: közös offer sablon komponens megtervezése; Függőség: `AUT-003`; Várható fájlok vagy rendszer: `src/templates/AutumnCampaignOfferPage.astro`, `src/pages/ajanlatok/[slug].astro`; Elfogadási feltétel: ugyanaz a sablon kiszolgálja a Fügeház es D2 kampányt eltérő tartalommal; Megjegyzés: a 2026-07-23-i audit forráskóddal és builddel igazolta, hogy a shared Astro sablon és a dinamikus route ugyanazzal a struktúrával generálja mindkét őszi landinget.
- `AUT-005` `[x]` Feladat: közös szolgáltatásblokk es közvetlen foglalási előnyök blokk struktúrájának meghatározása; Függőség: `CNT-002`, `CNT-003`; Várható fájlok vagy rendszer: offer template, offer data; Elfogadási feltétel: a két landing ugyanazt a blokklogikát használja; Megjegyzés: a 2026-07-23-i audit igazolta, hogy a sablonban közös services, communication, programs és direct booking claim blokkok működnek ugyanazzal az adatvezérelt szerkezettel.
- `AUT-006` `[x]` Feladat: mobil es desktop layout-szabályok definiálása; Függőség: `AUT-004`; Várható fájlok vagy rendszer: offer template, image registry; Elfogadási feltétel: külön mobil hero/card kép és egységes CTA-elhelyezés meg van tervezve; Megjegyzés: a 2026-07-23-i audit igazolta, hogy a template a központi `heroMobile` és `heroDesktop` asseteket használja, és reszponzív CTA-/galéria-elrendezéssel épül.

## 12. Fügeház ajánlati oldal

- `WEB-001` `[x]` Feladat: Fügeház landing oldal implementációs specifikációja `Oszi kettesben a Szent Gyorgy-hegyen` munkacímmel; Függőség: `AUT-003`, `AUT-004`, `CNT-002`; Várható fájlok vagy rendszer: route `/ajanlatok/oszi-kettesben/`, offer data, offer template; Elfogadási feltétel: a landing tartalmaz hero-t, célcsoportot, rövid bemutatást, valós szolgáltatásokat, programblokkot, képi blokkot, közvetlen foglalási előnyöket es elsődleges CTA-t; Megjegyzés: a 2026-07-23-i audit igazolta, hogy a Fügeház route a shared template-ből generálódik, és a jóváhagyott szolgáltatáslista, programblokk, babás kiegészítők és szezonális Panorama Pool jelölés megjelenik.
- `WEB-002` `[x]` Feladat: Fügeház CTA összekötése a house-specific Sabee URL-lel; Függőség: `SAB-007`, `AUT-004`; Várható fájlok vagy rendszer: offer template, offer data, Sabee link; Elfogadási feltétel: az `Arak es szabad idopontok` CTA a Fügeház selectedRooms Sabee felületét nyitja; Megjegyzés: a 2026-07-23-i audit igazolta, hogy a CTA a meglévő Fügeház booking linkre van kötve a shared route-ban, a megfelelő selectedRooms tokennel és a meglévő tracking attribútumokkal.
- `WEB-003` `[x]` Feladat: Fügeház SEO draft összeállítása; Függőség: `CNT-002`, `SEO-001`; Várható fájlok vagy rendszer: landing page meta, heading structure; Elfogadási feltétel: van végleges title, description es H1/H2 terv; Megjegyzés: a Fügeház offer rekord title/description mezőket kapott; az oldal átmenetileg `noindex`, amíg a `SEO-002` döntés meg nem születik.

## 13. D2 ajánlati oldal

- `WEB-004` `[x]` Feladat: D2 landing oldal implementációs specifikációja `Oszi napok egyutt a Balaton-felvideken` munkacímmel; Függőség: `AUT-003`, `AUT-004`, `CNT-003`; Várható fájlok vagy rendszer: route `/ajanlatok/oszi-csaladi-pihenes/`, offer data, offer template; Elfogadási feltétel: a landing tartalmaz hero-t, családi fókuszt, rövid bemutatást, valós szolgáltatásokat, programblokkot, képi blokkot, közvetlen foglalási előnyöket es elsődleges CTA-t; Megjegyzés: a 2026-07-23-i audit igazolta, hogy a route a shared template-ből generálódik, a jóváhagyott D2 szolgáltatáslistával, a családi programblokkal, a szezonális Panorama Pool jelöléssel és a dézsa kizárásával.
- `WEB-005` `[x]` Feladat: D2 CTA összekötése a house-specific Sabee URL-lel; Függőség: `SAB-007`, `AUT-004`; Várható fájlok vagy rendszer: offer template, offer data, Sabee link; Elfogadási feltétel: az `Arak es szabad idopontok` CTA a D2 selectedRooms Sabee felületét nyitja; Megjegyzés: a 2026-07-23-i audit igazolta, hogy a CTA a meglévő D2 booking linkre van kötve a shared route-ban, a megfelelő selectedRooms tokennel és a meglévő tracking attribútumokkal.
- `WEB-006` `[x]` Feladat: D2 SEO draft összeállítása; Függőség: `CNT-003`, `SEO-001`; Várható fájlok vagy rendszer: landing page meta, heading structure; Elfogadási feltétel: van végleges title, description es H1/H2 terv; Megjegyzés: a D2 offer rekord title/description mezőket kapott; az oldal átmenetileg `noindex`, amíg a `SEO-002` döntés meg nem születik.

## 14. Főoldali ajánlatblokk

- `WEB-007` `[x]` Feladat: tényleges főoldali beillesztési pont azonosítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/pages/index.astro`; Elfogadási feltétel: rögzített, hogy a review blokk utáni, `d2-region-guide` es `RegionStories` környéki zóna a legjobb elsődleges hely; Megjegyzés: redesign nélkül itt illeszthető be a blokk.
- `WEB-008` `[x]` Feladat: kétkártyás kampányblokk technikai specifikációja; Függőség: `WEB-001`, `WEB-004`, `AUT-006`; Várható fájlok vagy rendszer: főoldali komponens vagy section, image registry; Elfogadási feltétel: desktopon egymás mellett, mobilon is kompakt, egymás melletti teaserkártyaként jelenik meg a két ajánlat; Megjegyzés: elkészült a `src/sections/AutumnCampaignOffers.astro` shared főoldali blokk, amely a meglévő 2026-os őszi offer data rekordokra épül, D1 nélkül, és a 2026-07-23-i finomított preview-audit 1440 px desktopon és 390 px mobilon is kétoszlopos, vízszintes scroll nélküli megjelenést igazolt.
- `WEB-009` `[x]` Feladat: `Bovebben` CTA-k landing oldalakra kötése; Függőség: `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: homepage campaign block, landing route-ok; Elfogadási feltétel: a kártyák nem SabeeAppot, hanem a megfelelő landing oldalakat nyitják; Megjegyzés: a főoldali CTA-k az offer data `routePath` mezőiből olvassák ki a `/ajanlatok/oszi-kettesben/` és `/ajanlatok/oszi-csaladi-pihenes/` route-okat, és a preview-audit igazolta, hogy nem nyitnak közvetlen SabeeAppot.
- `WEB-010` `[x]` Feladat: mobil-specifikus képek kijelölése a kampánykártyákhoz; Függőség: `AUT-006`, `src/data/images/accommodation-images.ts`; Várható fájlok vagy rendszer: image registry, esetleges asset-kiválasztás; Elfogadási feltétel: mindkét kártyához megfelelő mobilkép van kijelölve; Megjegyzés: a finomított főoldali blokk meglévő repo-s asseteket használ a kampányhangulathoz, konkrétan egy boros-lifestyle képet a páros kártyához és egy családos D2-képet a családi kártyához, új képgyártás vagy registry-átírás nélkül.

## 15. Közvetlen foglalási előnyök

- `CNT-007` `[ ]` Feladat: közvetlen foglalási előnyök blokk állításlistájának igazoltsági szint szerinti bontása; Függőség: `SAB-006`, `TRK-001`; Várható fájlok vagy rendszer: offer data, tartalmi brief; Elfogadási feltétel: minden állítás `igazolt`, `SabeeApp-ellenőrzést igényel`, vagy `üzleti/jogi döntést igényel` kategóriát kap; Megjegyzés: a brief ezt explicit kéri, és a blokk külön, erős CTA-közeli szekcióként jelenjen meg mindkét landingben.
- `CNT-008` `[~]` Feladat: jelenlegi direct booking előnyök technikai alapjának auditja; Függőség: repository audit; Várható fájlok vagy rendszer: `src/templates/AccommodationPage.astro`, `public/scripts/dnd-booking-attribution.js`; Elfogadási feltétel: dokumentált, hogy van house-specific Sabee link, trust label es UTM-dekoráció; Megjegyzés: az ár-állítás ettől még nincs igazolva.
- `CNT-009` `[x]` Feladat: `Foglaljon közvetlenül - nálunk olcsóbban.` kommunikáció üzleti jóváhagyásának rögzítése; Függőség: rögzített árlogika; Várható fájlok vagy rendszer: kampány state-of-truth dokumentáció; Elfogadási feltétel: dokumentált, hogy a Booking.com és Airbnb felé továbbított szállásár 5%-kal magasabb, a takarítási díj és IFA logikája azonos, és nincs csatornaspecifikus promóció; Megjegyzés: a technikai végösszeg-QA ettől függetlenül nyitott marad `SAB-006` alatt.

## 16. SEO

- `SEO-001` `[ ]` Feladat: közös SEO minimumcsomag definiálása a két landinghez; Függőség: `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: landing oldalak meta, heading, internal links; Elfogadási feltétel: mindkét oldalhoz van egyértelmű title, description, H1, H2 es belső link stratégia; Megjegyzés: meglévő landing oldalak mintaként használhatók.
- `SEO-002` `[ ]` Feladat: indexelési stratégia eldöntése; Függőség: üzleti döntés; Várható fájlok vagy rendszer: page-level SEO beállítás; Elfogadási feltétel: egyértelműen dokumentált, hogy a kampányoldalak indexeltek vagy átmenetileg noindexek; Megjegyzés: a `last-minute-d2` jelenleg `noindex` mintát használ.
- `SEO-003` `[ ]` Feladat: Fügeház es D2 kampány-specifikus SEO szövegek elkészítése; Függőség: `CNT-002`, `CNT-003`, `SEO-001`; Várható fájlok vagy rendszer: landing content; Elfogadási feltétel: a meta es heading struktúra nem állít olyat, amit az üzleti validáció nem fed le; Megjegyzés: a közvetlen ár állítás itt is kontrollálandó.

## 17. GA4 / GTM / purchase mérés

- `TRK-002` `[x]` Feladat: jelenlegi booking CTA click mérés bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `public/scripts/dnd-ads-events.js`; Elfogadási feltétel: dokumentált, hogy a delegált kattintásmérés booking click eseményt küld; Megjegyzés: `dnd_booking_click` repo-szinten bizonyított.
- `TRK-003` `[x]` Feladat: főoldali ajánlatkártya kattintás mérési terve; Függőség: `WEB-008`; Várható fájlok vagy rendszer: homepage campaign block, `data-dnd-*` attribútumok; Elfogadási feltétel: a két kártya külön mérhető offer ID-val es property ID-val; Megjegyzés: a `public/scripts/dnd-ads-events.js` delegált `dnd_campaign_card_click` dataLayer eseményt küld a főoldali kampánykártyákra, és a 2026-07-23-i preview-audit igazolta az `offer`, `property`, `campaign`, `placement` és `cta_type` mezők átadását.
- `TRK-004` `[ ]` Feladat: landing page view mérési terve; Függőség: `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: page-level analytics, GTM/GA4 naming; Elfogadási feltétel: eldöntött, hogy dedikált event kell-e a sima pageview mellett; Megjegyzés: repo-szinten dedikált landing-view event nem látható.
- `TRK-005` `[ ]` Feladat: Sabee booking start esemény jelenlegi forrásának azonosítása; Függőség: `TRK-001`; Várható fájlok vagy rendszer: GTM, Sabee, esetleges külső bridge; Elfogadási feltétel: ismert, honnan jön a booking start és hogyan köthető offer/property meta adatokhoz; Megjegyzés: nyitott mérési auditfeladat.
- `TRK-006` `[ ]` Feladat: sikeres purchase esemény jelenlegi forrásának azonosítása; Függőség: `TRK-001`; Várható fájlok vagy rendszer: GTM, GA4, Sabee, esetleges külső bridge; Elfogadási feltétel: ismert, honnan jön a purchase vagy confirmation és hogyan duplikációmentes; Megjegyzés: nyitott mérési auditfeladat.
- `TRK-007` `[x]` Feladat: UTM es attribúciós paraméter-kezelés bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `public/scripts/dnd-booking-attribution.js`; Elfogadási feltétel: dokumentált, hogy a booking URL-ekre átvitelre kerülnek a fő UTM/Ads paraméterek; Megjegyzés: ez jelenleg működő technikai alapnak tekinthető.
- `TRK-008` `[x]` Feladat: consent-kompatibilis mérési alapok bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/layouts/BaseLayout.astro`, `public/scripts/consent-init-cookie-refine.js`; Elfogadási feltétel: dokumentált, hogy van default denied consent setup es consent update bridge; Megjegyzés: ez jó alap a kampányméréshez.
- `TRK-009` `[ ]` Feladat: duplikált események kizárási szabályának rögzítése; Függőség: `TRK-003`, `TRK-004`, `TRK-005`, `TRK-006`; Várható fájlok vagy rendszer: GTM/GA4 naming plan, CTA markup plan; Elfogadási feltétel: azonos CTA-ra és azonos user action-re egyetlen üzleti jelentésre alkalmas eseménylánc marad; Megjegyzés: különösen fontos a landing CTA es Sabee indulás kapcsolatánál.

## 18. Mobil és desktop QA

- `QA-001` `[x]` Feladat: kampánykártyák reszponzív QA terve; Függőség: `WEB-008`, `WEB-010`; Várható fájlok vagy rendszer: homepage campaign block; Elfogadási feltétel: desktopon kétoszlopos, mobilon kompakt kétoszlopos, olvasható CTA es képkompozíció; Megjegyzés: a 2026-07-23-i helyi preview-audit 1440 px desktopon és 390 px mobilon ellenőrizte a töréspontokat, az olvasható CTA-t, a képkompozíciót és a vízszintes scroll hiányát.
- `QA-002` `[ ]` Feladat: landing oldalak mobil hero, CTA es image QA terve; Függőség: `AUT-006`, `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: offer template, image registry; Elfogadási feltétel: mobilon a hero, szolgáltatásblokk, galéria es CTA sorrend konzisztens es konverzióbarát; Megjegyzés: ez MVP-ben kötelező.
- `QA-003` `[ ]` Feladat: tracking QA terv; Függőség: `TRK-003`, `TRK-004`, `TRK-005`, `TRK-006`; Várható fájlok vagy rendszer: browser QA, analytics debug; Elfogadási feltétel: végigkövethető a homepage card click -> landing view -> booking CTA -> Sabee flow; Megjegyzés: build utáni, de launch előtti kötelező ellenőrzés.

## 19. Build és deploy

- `DEP-001` `[x]` Feladat: kampányoldalak build-kompatibilitásának ellenőrzése; Függőség: `AUT-004`, `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: Astro build; Elfogadási feltétel: a kampányoldalak statikus buildben hibamentesen generálódnak; Megjegyzés: a 2026-07-23 12:25-ös build sikeresen legenerálta a `/ajanlatok/oszi-kettesben/` és `/ajanlatok/oszi-csaladi-pihenes/` route-okat, ezért ez a bizonyítás nem függ a még nyitott `WEB-008` feladattól.
- `DEP-002` `[ ]` Feladat: rollout sorrend meghatározása; Függőség: `QA-001`, `QA-002`, `QA-003`; Várható fájlok vagy rendszer: deploy checklist; Elfogadási feltétel: ismert, hogy először landingek, utána homepage blokk, vagy együtt kerül élesítésre; Megjegyzés: mérési validáció függvénye.

## 20. Hirdetési bekötés

- `ADS-001` `[ ]` Feladat: kampányazonosítók és UTM naming szabály rögzítése; Függőség: `TRK-007`, üzleti kampányterv; Várható fájlok vagy rendszer: campaign naming convention, landing CTA meta; Elfogadási feltétel: a Fügeház es D2 kampány külön mérhető; Megjegyzés: a `data-dnd-campaign` mezőhöz illeszthető.
- `ADS-002` `[ ]` Feladat: hirdetésből landingre, landingből Sabee-re menő attribúciós út ellenőrzése; Függőség: `ADS-001`, `TRK-005`, `TRK-006`; Várható fájlok vagy rendszer: ad links, booking attribution script, analytics; Elfogadási feltétel: az UTM-paraméterek a booking flow-ban is megmaradnak; Megjegyzés: technikai alap repo-szinten már van, de end-to-end validáció kell.
- `ADS-003` `[-]` Feladat: teljes katalogizált kampányportfólió kialakítása; Függőség: nincs; Várható fájlok vagy rendszer: n/a; Elfogadási feltétel: n/a; Megjegyzés: az első verziónak nem része, ezért elvetve.

## 21. Megvalósítási sorrend

1. `M1` lezárása: üzleti, tartalmi és kommunikációs döntések véglegesítése, elsőként `CNT-001` megoldásával.
2. `M3` lezárása: közös adatmodell, offer sablon és közös SEO-minimum kialakítása.
3. `M4` és `M5` lezárása: a Fügeház és a D2 kampányoldalak elkészítése a meglévő booking linkekkel.
4. `M6` lezárása: a főoldali kampányblokk beillesztése és reszponzív QA-ja.
5. `M7` lezárása: teljes kampánymérés, booking-start/purchase audit és tracking QA.
6. `M8` lezárása: hirdetési naming, attribúciós út és kampányindítás.
7. `M2` opcionális támogató mérföldkőként nyitva marad a technikai ár-QA-hoz, de nem előfeltétele a kampányoldalak elkészítésének.

## 22. Elfogadási feltételek

- A kampány csak D2-t es Fügeházat tartalmazza; D1 sehol nem jelenik meg.
- A `Foglaljon közvetlenül - nálunk olcsóbban.` kommunikáció üzletileg jóváhagyott, és ehhez csak a technikai spot-QA marad nyitott.
- A landing oldalak közös, adatvezérelt technikai megoldásra épülnek.
- Nincs párhuzamos, kézzel duplikált accommodation adatbázis.
- A főoldali blokk két kártyát jelenít meg, desktopon és mobilon is egymás mellett, mobilon kompakt teaser arányokkal.
- A `Bovebben` CTA-k a landingekre vezetnek.
- Az `Arak es szabad idopontok` CTA-k a megfelelő house-specific Sabee linket nyitják.
- A kampány indulása nem függ külön SabeeApp audit vagy SabeeApp-fejlesztés lezárásától.
- A közvetlen foglalási előnyök közül csak igazolt vagy megfelelően jelölt állítás marad.
- A teljes kampánymérés megvalósítása kötelező.
- A mérési terv kezeli a homepage clicket, landing view-t, booking CTA clicket, booking startot, purchase-t, offer/property ID-t, UTM-eket es a consentet.
- A purchase mérés forrása es duplikációvédelme dokumentált vagy külön nyitott auditfeladatként szerepel.
- A mobil es desktop QA külön checklistet kap.

## 23. Kockázatok

- A közvetlen ár-ígéret bizonyítás nélkül jogi vagy bizalmi kockázat.
- A Fügeház es D2 szolgáltatáslistáiban lévő finom eltérések félrekommunikációt okozhatnak.
- A purchase mérés jelenlegi részleges átláthatósága miatt launchkor mérési vakfolt maradhat.
- Ha a közös ajánlati sablon helyett külön dedikált oldalak készülnek közös adatmodell nélkül, technikai adósság keletkezik.
- Ha a főoldali blokk túl korán készül el a landingek előtt, a kampánykattintások rossz helyre vezethetnek vagy mérhetetlenek maradnak.

## 24. Döntésre váró kérdések

- Melyik repo-fájlokban és melyik offer data mezőkben vezetjük át elsőként a jóváhagyott Fügeház- és D2-listát?
- Használható-e jogszerűen es üzletileg védhetően a `kedvezobb ar` vagy csak puhább direct booking üzenet maradhat?
- A Panorama Pool mely őszi időszakban kommunikálható ténylegesen?
- A kampányoldalak indexeltek legyenek, vagy ideiglenesen noindex logikát kapjanak?
- A booking start es purchase események jelenlegi tulajdonosa és technikai forrása pontosan mely rendszer?

## 25. Haladási napló

| Dátum | Feladat ID | Státuszváltozás | Elvégzett munka | Érintett fájlok | Build/teszt | Commit |
|---|---|---|---|---|---|---|
| 2026-07-23 | AUT-001 | nincs elkezdve -> elkészült | Projekt-audit, főoldali és landing minták feltérképezése, SabeeApp CTA, tracking, consent, accommodation data és image registry ellenőrzése, a központi kampányterv dokumentum létrehozása | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/pages/index.astro`, `src/templates/AccommodationPage.astro`, `src/data/accommodation-pages/d2.ts`, `src/data/accommodation-pages/fugehaz.ts`, `src/data/accommodations.ts`, `src/data/images/accommodation-images.ts`, `src/layouts/BaseLayout.astro`, `public/scripts/dnd-booking-attribution.js`, `public/scripts/dnd-ads-events.js`, `public/scripts/consent-init-cookie-refine.js`, `src/pages/last-minute-d2.astro`, `src/pages/szent-gyorgy-hegy-matine-szallas.astro`, `src/pages/kisapati-medences-szallas.astro`, `src/components/KisapatiPoolLandingPage.astro`, `project-docs/d2-last-minute-kampany-plan-2026-07-11.md`, `project-docs/SZENT_GYORGY_HEGY_MATINE_LANDING_2026.md`, `project-docs/google-ads-ga4-audit-living.md`, `project-docs/06-foglalasi-cta-logika.md`, `project-docs/INDEX.md`, `AGENT.md`, `DANDELION_RULES.md`, `DANDELION_CHATGPT_RULES.md`, `package.json`, `astro.config.mjs` | nem futott | nem |
| 2026-07-23 | CNT-009, SAB-006, CNT-010, CNT-011, TRK-001 | részben frissítve | A jóváhagyott közvetlenár-döntés, a nyitott technikai ár-QA, a nyitott D2/Fügeház szolgáltatáslisták, a külön promóciók és a kötelező kampánymérési audit státuszainak átvezetése a hivatalos kampánydokumentumba | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | nem futott | nem |
| 2026-07-23 | M1, M2, M3, M4, M5, M6, M7, M8 | frissítve | Projekt-összefoglaló és mérföldkő-alapú roadmap került a dokumentum elejére, minden meglévő feladat milestone-hoz lett rendelve, és a megvalósítási sorrend milestone-szintre lett egységesítve | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | nem futott | nem |
| 2026-07-23 | CNT-001, SAB-006, SAB-007, M2 | frissítve | A SabeeApp-audit feladat kikerült a roadmapből, a kampány scope rögzítve lett a meglévő élő booking linkek használatára, a SabeeApp-függőségek lazítva lettek, és a következő végrehajtandó feladat `CNT-001` lett | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | nem futott | nem |
| 2026-07-23 | CNT-001, CNT-002, CNT-003, CNT-005, CNT-006, CNT-010, CNT-011 | frissítve | A Fügeház és D2 végleges üzleti tartalma rögzítésre került, a `CNT-001` lezárult, a kapcsolódó validációs feladatok implementációs/repo-ellenőrzési irányba lettek pontosítva, és a következő végrehajtandó feladat `AUT-003` lett | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | nem futott | nem |
| 2026-07-23 | AUT-003, AUT-004, AUT-005, WEB-001, WEB-004, WEB-008, CNT-007 | frissítve | A referencia landing-logika alapján rögzítésre került a közös landing-szerkezet, a főoldali kampánybelépési pont szemlélete és az, hogy a ténylegesen elérhető, már meglévő házlistát fogjuk beemelni az offer data rendszerbe | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | nem futott | nem |
| 2026-07-23 | AUT-003 | elkészült | Létrejött a közös 2026-os őszi offer data schema és a két első kampányrekord a `src/data/offers/types.ts` és `src/data/offers/autumn-2026.ts` fájlokban, a meglévő accommodation, page data, booking link és image registry források referálásával; a következő végrehajtandó feladat `AUT-004` lett | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/data/offers/types.ts`, `src/data/offers/autumn-2026.ts` | nem futott | nem |
| 2026-07-23 | AUT-004, AUT-005, AUT-006, WEB-001, WEB-002, WEB-003, WEB-004, WEB-005, WEB-006, SEO-001, SEO-003, DEP-001 | elkészült | Elkészült a shared őszi landing sablon és a dinamikus `ajanlatok` route, a két kampányoldal ugyanazzal a template-tel generálódik, a CTA-k a meglévő house-specific Sabee linkekre mutatnak, a kampány-specifikus SEO szövegek bekerültek az offer data rekordokba, és a teljes Astro build sikeresen lefutott | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/templates/AutumnCampaignOfferPage.astro`, `src/pages/ajanlatok/[slug].astro`, `src/data/offers/types.ts`, `src/data/offers/autumn-2026.ts` | `npm run build` | nem |
| 2026-07-23 | AUT-004, AUT-005, AUT-006, CNT-002, CNT-003, WEB-001, WEB-002, WEB-004, WEB-005, DEP-001 | frissítve | A `896837d6ac106f8b09670a6da7fbd003b017fe2e` commit auditja és a 12:25-ös sikeres build megerősítette a shared sablonhasználatot, a statikus route-generálást, a house-specific Sabee linkeket, a központi image registryből érkező hero asseteket, a meglévő tracking attribútumokat és a jóváhagyott landing szolgáltatáslistákat; `CNT-002` és `CNT-003` nyitva maradt, mert a teljes repo-szintű accommodation page tartalom még nem minden ponton harmonizált. A következő végrehajtandó feladat marad `WEB-008`, mert annak függőségei igazoltan elkészültek. | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | `npm run build` | nem |
| 2026-07-23 | WEB-008, WEB-009, WEB-010, TRK-003, QA-001, M6 | elkészült | Elkészült a `src/sections/AutumnCampaignOffers.astro` shared főoldali kampányblokk, a review blokk után beillesztve a főoldalra; a két kártya kizárólag a meglévő 2026-os offer data rekordokból épül, a `Bővebben` CTA-k a landing route-okra vezetnek, a mobil-specifikus képek az offer data közvetítésével a központi image registryből érkeznek, és a `public/scripts/dnd-ads-events.js` már delegált `dnd_campaign_card_click` eseményt küld a szükséges tracking mezőkkel. A helyi preview-audit desktopon és mobilon is igazolta a töréspontokat és a vízszintes scroll hiányát; a következő végrehajtandó feladat `QA-002` lett. | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/sections/AutumnCampaignOffers.astro`, `src/pages/index.astro`, `public/scripts/dnd-ads-events.js` | `npm run build`, local preview QA | nem |
| 2026-07-23 | WEB-008, WEB-010, QA-001, M6 | frissítve | A főoldali kampányblokk vizuális finomítást kapott: a mobilos elrendezés két kompakt teaserkártyára váltott, a kártyák kevésbé szálláslista-szerű editorial megjelenést kaptak, és a képek a meglévő repo-s boros-lifestyle illetve családos D2 assetekre lettek cserélve. A build és az új preview-ellenőrzés megerősítette a 390 px mobilnézetben is az egymás melletti kártyákat, az olvasható CTA-kat és a vízszintes scroll hiányát. | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/sections/AutumnCampaignOffers.astro` | `npm run build`, local preview QA | `e3e5dc5` |
| 2026-07-23 | WEB-008, WEB-010, QA-001, M6 | frissítve | Elkészült a főoldali őszi kampánykártyák végleges marketing copyja: a szállásnevek kikerültek a kártyákról, a blokk inspiráló kampánybelépési pontként működik tovább, a desktop és mobil ellenőrzés rendben lefutott, a build sikeres volt, és a rövidebb copy miatti természetes kártyamagasság-csökkenés elfogadott végállapotként lett rögzítve. A következő végrehajtandó feladat változatlanul `QA-002`. | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/data/offers/autumn-2026.ts`, `src/sections/AutumnCampaignOffers.astro` | `npm run build`, local preview QA | nem |

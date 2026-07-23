# 2026 őszi kampány és kapcsolódó fejlesztések

## 1. Dokumentum célja

Ez a dokumentum a 2026-os őszi kampány egyetlen hivatalos állapotkövető és megvalósítási terve. A cél egy olyan, a jelenlegi Astro-alapú projekt tényleges állapotára épülő, lépésenként végrehajtható terv rögzítése, amely:

- nem duplikálja a meglévő accommodation- és image registry adatokat;
- külön kezeli a technikai, üzleti, tartalmi és mérési függőségeket;
- csak bizonyított állapotokat jelöl késznek;
- a későbbi Codex-taskok számára közös referenciaként szolgál.

## 2. Rögzített üzleti döntések

- D1 ősszel nem kiadható, mert a tulajdonos használja.
- D1 nem jelenhet meg őszi landing oldalon, főoldali kampányblokkban, hirdetésben vagy őszi SabeeApp-ajánlatban.
- Az első verzióban csak két kampány készül: Fügeház páros őszi pihenés, Dandelion D2 családi őszi pihenés.
- A főoldalon két kampánykártya jelenik meg.
- A főoldali `Bővebben` CTA nem nyit közvetlenül SabeeAppot, hanem a megfelelő landing oldalra vezet.
- A landing oldalak elsődleges CTA-ja `Árak és szabad időpontok`, amely a megfelelő SabeeApp foglalási felületet nyitja meg.
- A Booking.com és Airbnb felé továbbított szállásár 5%-kal magasabb a közvetlen SabeeApp-árnál.
- A takarítási díj és az idegenforgalmi adó minden csatornán azonos logika szerint működik.
- Jelenleg nincs külön promóció sem a Booking.comon, sem az Airbnb-n, sem a közvetlen csatornán.
- Jóváhagyott kommunikáció: `Foglaljon közvetlenül - nálunk olcsóbban.`
- A `nálunk olcsóbban` kommunikáció üzleti döntésként jóváhagyott, de a technikai végösszeg-QA külön nyitott feladat marad.
- A D2 kampányban használható végleges szolgáltatáslista még pontosításra vár.
- A Fügeház kampányban használható végleges szolgáltatáslista még pontosításra vár.
- A D2 dézsája nem szerepelhet.
- A Panorama Pool csak olyan időszakhoz kapcsolható, amikor ténylegesen nyitva van.
- A Fügeház páros őszi ajánlatához külön promóció készül, de a tartalma még nincs eldöntve.
- A D2 családi őszi ajánlatához külön promóció készül, de a tartalma még nincs eldöntve.
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
- Milyen accommodation adatok használhatók újra? A listing szintű és detail szintű tartalmak, kulcsjellemzők, feature-ök, related stay kapcsolatok és a booking linkek.
- Milyen képek és SEO draftok állnak rendelkezésre? A központi image registryből hero, card, gallery és thumbnail képek elérhetők. SEO-szöveg és meta jellegű draftok részben a page data fájlokban és részben a meglévő landing oldalakban látszanak.
- Mi hiányzik a Fügeház és D2 szolgáltatáslistájából? A kampányoldali végleges szolgáltatáslista üzleti verifikációja hiányzik. Különösen ellenőrizendő a Panorama Pool szezonális elérhetősége, a közvetlen ár-állítás jogossága, a D2 `saját udvar` es `saját parkoló` állítás, valamint a Fügeház `4 fő, pótággyal legfeljebb 6 fő` kommunikáció pontos formája.
- Mi hiányzik a purchase mérésből? A repo-ban bizonyított a booking CTA click mérés és az attribúciós paraméterkezelés, de a Sabee booking start és a sikeres purchase teljes, forráskódban is követhető lánca nem látható egyértelműen.
- Van-e ütközés a jelenlegi accommodation sablonosítási tervvel? Nem szükségszerűen, ha az őszi ajánlati rendszer a meglévő accommodation- és image registryre épül. Ütközés akkor lenne, ha külön, kézzel karbantartott kampány-adatmodellt vezetnénk be.
- Melyik fejlesztési lépés végezhető el elsőként minimális kockázattal? Az ajánlati adatmodell és közös offer sablon technikai specifikációja, majd annak statikus implementációja a meglévő adatforrások újrahasználásával.

## 5. Függőségek és blokkoló tényezők

- `AUT-001` `[x]` Feladat: a jelenlegi architektúra auditálása és a kampány state-of-truth dokumentum létrehozása; Függőség: repository olvasási hozzáférés; Várható fájlok vagy rendszer: `AGENT.md`, `DANDELION_RULES.md`, `DANDELION_CHATGPT_RULES.md`, `package.json`, `astro.config.mjs`, `src/pages/index.astro`, `src/templates/AccommodationPage.astro`, `src/data/**`, `public/scripts/**`, `project-docs/**`; Elfogadási feltétel: a dokumentum rögzíti a jelenlegi bizonyított állapotot és a nyitott kérdéseket; Megjegyzés: elkészült 2026-07-23-án.
- `SAB-001` `[!]` Feladat: D2 és Fügeház őszi SabeeApp kapacitás, minimum tartózkodás, előleg, lemondási feltétel és rate plan audit; Függőség: SabeeApp admin vagy hiteles üzleti hozzáférés; Várható fájlok vagy rendszer: SabeeApp; Elfogadási feltétel: mindkét kampányhoz rögzített, ellenőrzött foglalási feltételrendszer áll rendelkezésre; Megjegyzés: a repo csak selectedRooms linkeket bizonyít, üzleti paramétereket nem.
- `CNT-001` `[!]` Feladat: Fügeház és D2 szolgáltatáslistájának végleges üzleti jóváhagyása; Függőség: tulajdonosi vagy operatív visszaigazolás; Várható fájlok vagy rendszer: tartalmi brief, szállásoldal-adatok; Elfogadási feltétel: nincs ellentmondás a kampányoldali és a valós szolgáltatáslista között; Megjegyzés: több állítás jelenleg ellenőrzésköteles.
- `TRK-001` `[ ]` Feladat: teljes kampánymérés auditja és megvalósítási terve, beleértve a booking-start és purchase lánc ellenőrzését; Függőség: GTM/GA4 hozzáférés vagy dokumentált mérési bizonyíték; Várható fájlok vagy rendszer: GTM, GA4, Sabee, esetleges külső tag/bridge; Elfogadási feltétel: ismert, hogy mely esemény honnan jön, hogyan kap offer/property meta adatot, és mi szükséges a teljes kampánymérés megvalósításához; Megjegyzés: kötelező munkacsomag, jelenleg nyitott.

## 6. MVP pontos scope-ja

- Két ajánlati landing oldal: Fügeház es D2.
- Egy közös, adatvezérelt ajánlati sablon.
- Egy főoldali, kétkártyás őszi kampányblokk.
- SabeeApp-ra mutató elsődleges CTA a landing oldalakon.
- Közvetlen foglalási előnyöket összefoglaló közös blokk, csak igazolt vagy külön jelölt állításokkal.
- SEO minimum: title, description, H1/H2 struktúra, belső linkelés, indexelési döntés.
- Mérés minimum: ajánlatkártya kattintás, landing megtekintés, booking CTA kattintás, ajánlat- és property-azonosítók továbbítása, consent-kompatibilitás.

## 7. Nem része az első verziónak

- D1 bármilyen bevonása.
- Teljes ajánlati katalógus.
- Adminfelület.
- Tíz külön kampányoldal.
- Párhuzamos accommodation adatmodell.
- Új képgyártás vagy image registry átírása ebben a taskban.
- Főoldali redesign.
- GTM vagy GA4 konfiguráció módosítása ebben a taskban.
- SabeeApp módosítása ebben a taskban.

## 8. Technikai architektúra

- Tervezett irány: egy új, közös ajánlati sablon, amely a meglévő Astro komponensstruktúrához illeszkedik, és a jelenlegi `src/data/accommodation-pages/*.ts` valamint `src/data/images/accommodation-images.ts` forrásokból dolgozik.
- A meglévő `BaseLayout.astro` alkalmas arra, hogy kampányoldalak közös layoutjaként szolgáljon, és szükség esetén `bookingHrefOverride`-dal szabályozza a header/footer booking CTA viselkedését.
- A meglévő `AccommodationPage.astro` közvetlenül nem offer sablon, de bizonyítja, hogy a house-specific Sabee linkek, trust label és booking CTA logika már adatvezérelten kezelhető.
- A közös ajánlati rendszerhez nem új accommodation adatbázis kell, hanem egy vékony, offer-specifikus adatdefiníció, amely referenciákat tart a meglévő szállásadatokra, képekre, CTA-linkekre és kampány-meta adatokra.
- A képekhez a központi registryből kell hero, card és mobil specifikus asseteket használni; új, ad hoc fájlútvonalak létrehozása kerülendő.
- A méréshez a jelenlegi `data-dnd-*` attribútum mintát célszerű továbbvinni, mert a `public/scripts/dnd-ads-events.js` már ezt olvassa.

## 9. SabeeApp munkacsomag

- `SAB-002` `[ ]` Feladat: Fügeház őszi időszak, szabad kapacitás és minimum tartózkodás rögzítése; Függőség: `SAB-001`; Várható fájlok vagy rendszer: SabeeApp, később offer data; Elfogadási feltétel: ismert a kampányban kommunikálható foglalási intervallum és minimum nights; Megjegyzés: a repo önmagában ezt nem tartalmazza.
- `SAB-003` `[ ]` Feladat: D2 őszi időszak, szabad kapacitás és minimum tartózkodás rögzítése; Függőség: `SAB-001`; Várható fájlok vagy rendszer: SabeeApp, később offer data; Elfogadási feltétel: ismert a kampányban kommunikálható foglalási intervallum és minimum nights; Megjegyzés: a repo önmagában ezt nem tartalmazza.
- `SAB-004` `[ ]` Feladat: előleg és lemondási feltételek kampány-kompatibilis rögzítése; Függőség: `SAB-001`; Várható fájlok vagy rendszer: SabeeApp, jogi/üzleti szabály; Elfogadási feltétel: a landing oldalakon szereplő feltételszöveg igazolt; Megjegyzés: jelenleg nincs repo-bizonyíték.
- `SAB-005` `[ ]` Feladat: közvetlen ár vagy külön ajánlati rate plan meghatározása; Függőség: `SAB-001`; Várható fájlok vagy rendszer: SabeeApp, üzleti döntés; Elfogadási feltétel: egyértelmű, hogy a kampány milyen árazási logikára épül; Megjegyzés: ez előfeltétele a közvetlen ár kommunikációjának.
- `SAB-006` `[ ]` Feladat: technikai ár-QA lefuttatása konkrét D2 és Fügeház időpontokra, SabeeApp vs. Booking.com vs. Airbnb végösszegekkel; Függőség: rögzített üzleti árlogika; Várható fájlok vagy rendszer: SabeeApp, Booking.com, Airbnb; Elfogadási feltétel: több konkrét dátumpáron ellenőrzött, hogy a közvetlen végösszeg alacsonyabb, miközben a takarítási díj és az idegenforgalmi adó azonos logikával szerepel; Megjegyzés: a `Foglaljon közvetlenül - nálunk olcsóbban.` kommunikáció üzletileg jóváhagyott, ez a feladat már csak technikai spot-QA.
- `SAB-007` `[x]` Feladat: lakásonkénti Sabee link és selectedRooms token bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/data/accommodation-pages/d2.ts`, `src/data/accommodation-pages/fugehaz.ts`; Elfogadási feltétel: mindkét kampányhoz azonosítható house-specific Sabee URL létezik; Megjegyzés: D2 es Fügeház esetén ez bizonyított.
- `SAB-008` `[ ]` Feladat: tesztfoglalási forgatókönyv meghatározása; Függőség: `SAB-002`, `SAB-003`, `SAB-004`, `TRK-001`; Várható fájlok vagy rendszer: SabeeApp, mérési checklist; Elfogadási feltétel: kampány indulás előtt lefuttatható end-to-end ellenőrzés van; Megjegyzés: különösen fontos a purchase mérés validálása miatt.

## 10. Tartalmi és szolgáltatási munkacsomag

- `CNT-002` `[ ]` Feladat: Fügeház végleges szolgáltatáslista validálása; Függőség: `CNT-001`; Várható fájlok vagy rendszer: `src/data/accommodation-pages/fugehaz.ts`, üzleti jóváhagyás; Elfogadási feltétel: a kampányoldal csak igazolt szolgáltatásokat említ; Megjegyzés: a `4 fő, pótággyal legfeljebb 6 fő` állítást pontosítani kell.
- `CNT-003` `[ ]` Feladat: D2 végleges szolgáltatáslista validálása; Függőség: `CNT-001`; Várható fájlok vagy rendszer: `src/data/accommodation-pages/d2.ts`, üzleti jóváhagyás; Elfogadási feltétel: a kampányoldal csak igazolt szolgáltatásokat említ; Megjegyzés: a `saját udvar` es `saját parkoló` jelenleg nem ilyen formában bizonyított a repo-ban.
- `CNT-004` `[ ]` Feladat: Panorama Pool kommunikáció szezonális feltételeinek rögzítése; Függőség: `CNT-001`; Várható fájlok vagy rendszer: üzleti döntés, nyitvatartási szabály; Elfogadási feltétel: a kampányoldalakon csak tényleges nyitvatartási időben jelenik meg; Megjegyzés: ezt a brief kifejezetten megköveteli.
- `CNT-005` `[ ]` Feladat: páros es családi célcsoport-szöveg jóváhagyása; Függőség: `CNT-002`, `CNT-003`; Várható fájlok vagy rendszer: landing copy brief; Elfogadási feltétel: a Fügeház pozicionálása páros, a D2 pozicionálása családi vonalon koherens es valós; Megjegyzés: ne kerüljön be nem igazolt luxus- vagy árígéret.
- `CNT-006` `[ ]` Feladat: őszi környékbeli programlista ellenőrzése; Függőség: üzleti vagy tartalmi forrás; Várható fájlok vagy rendszer: existing regional content, külső források; Elfogadási feltétel: a kampányoldali programblokk aktuális es releváns; Megjegyzés: ez tartalmi, nem technikai blokk.
- `CNT-010` `[ ]` Feladat: Fügeház páros őszi ajánlat külön promóciójának kidolgozása; Függőség: üzleti döntés és tartalmi brief; Várható fájlok vagy rendszer: promóciós brief, későbbi landing copy; Elfogadási feltétel: rögzített promóciós ajánlat vagy kedvezménylogika áll rendelkezésre; Megjegyzés: a promóció hiánya nem akadályozza a `nálunk olcsóbban` kommunikációt.
- `CNT-011` `[ ]` Feladat: D2 családi őszi ajánlat külön promóciójának kidolgozása; Függőség: üzleti döntés és tartalmi brief; Várható fájlok vagy rendszer: promóciós brief, későbbi landing copy; Elfogadási feltétel: rögzített promóciós ajánlat vagy kedvezménylogika áll rendelkezésre; Megjegyzés: a promóció hiánya nem akadályozza a `nálunk olcsóbban` kommunikációt.

## 11. Közös ajánlati sablon

- `AUT-002` `[x]` Feladat: a közös ajánlati sablon újrahasználati alapjainak azonosítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/layouts/BaseLayout.astro`, `src/templates/AccommodationPage.astro`, `src/data/accommodation-pages/*.ts`, `src/data/images/accommodation-images.ts`; Elfogadási feltétel: bizonyított, hogy van layout, CTA, data es image alap a közös offer rendszerhez; Megjegyzés: ez a terv inputja, nem kész offer komponens.
- `AUT-003` `[ ]` Feladat: offer data schema definiálása a meglévő accommodation adatok referálásával; Függőség: `AUT-002`, `SAB-005`, `CNT-002`, `CNT-003`; Várható fájlok vagy rendszer: új offer data fájl(ok), meglévő data references; Elfogadási feltétel: nincs kézzel duplikált szállásadat, csak referenciák es kampányspecifikus mezők; Megjegyzés: ez a legfontosabb anti-duplication lépés.
- `AUT-004` `[ ]` Feladat: közös offer sablon komponens megtervezése; Függőség: `AUT-003`; Várható fájlok vagy rendszer: várhatóan új Astro komponens vagy page template; Elfogadási feltétel: ugyanaz a sablon kiszolgálja a Fügeház es D2 kampányt eltérő tartalommal; Megjegyzés: jelenleg általános offer komponens nem bizonyított a repóban.
- `AUT-005` `[ ]` Feladat: közös szolgáltatásblokk es közvetlen foglalási előnyök blokk struktúrájának meghatározása; Függőség: `CNT-002`, `CNT-003`, `SAB-005`; Várható fájlok vagy rendszer: offer template, offer data; Elfogadási feltétel: a két landing ugyanazt a blokklogikát használja; Megjegyzés: az állítások igazoltsági szintje külön mezőként kezelendő.
- `AUT-006` `[ ]` Feladat: mobil es desktop layout-szabályok definiálása; Függőség: `AUT-004`; Várható fájlok vagy rendszer: offer template, image registry; Elfogadási feltétel: külön mobil hero/card kép és egységes CTA-elhelyezés meg van tervezve; Megjegyzés: a brief ezt explicit kéri.

## 12. Fügeház ajánlati oldal

- `WEB-001` `[ ]` Feladat: Fügeház landing oldal implementációs specifikációja `Oszi kettesben a Szent Gyorgy-hegyen` munkacímmel; Függőség: `AUT-003`, `AUT-004`, `CNT-002`, `SAB-002`, `SAB-004`, `SAB-005`; Várható fájlok vagy rendszer: tervezett route `/ajanlatok/oszi-kettesben/`, offer data, offer template; Elfogadási feltétel: a landing tartalmaz hero-t, célcsoportot, rövid bemutatást, valós szolgáltatásokat, programblokkot, képi blokkot, közvetlen foglalási előnyöket es elsődleges CTA-t; Megjegyzés: ez még nem létrehozott oldal.
- `WEB-002` `[ ]` Feladat: Fügeház CTA összekötése a house-specific Sabee URL-lel; Függőség: `SAB-007`, `AUT-004`; Várható fájlok vagy rendszer: offer template, offer data, Sabee link; Elfogadási feltétel: az `Arak es szabad idopontok` CTA a Fügeház selectedRooms Sabee felületét nyitja; Megjegyzés: a house-specific link repo-szinten már bizonyított.
- `WEB-003` `[ ]` Feladat: Fügeház SEO draft összeállítása; Függőség: `CNT-002`, `SEO-001`; Várható fájlok vagy rendszer: landing page meta, heading structure; Elfogadási feltétel: van végleges title, description es H1/H2 terv; Megjegyzés: meglévő SEO minták más landing oldalakból átvehetők.

## 13. D2 ajánlati oldal

- `WEB-004` `[ ]` Feladat: D2 landing oldal implementációs specifikációja `Oszi napok egyutt a Balaton-felvideken` munkacímmel; Függőség: `AUT-003`, `AUT-004`, `CNT-003`, `SAB-003`, `SAB-004`, `SAB-005`; Várható fájlok vagy rendszer: tervezett route `/ajanlatok/oszi-csaladi-pihenes/`, offer data, offer template; Elfogadási feltétel: a landing tartalmaz hero-t, családi fókuszt, rövid bemutatást, valós szolgáltatásokat, programblokkot, képi blokkot, közvetlen foglalási előnyöket es elsődleges CTA-t; Megjegyzés: a dézsa nem jelenhet meg.
- `WEB-005` `[ ]` Feladat: D2 CTA összekötése a house-specific Sabee URL-lel; Függőség: `SAB-007`, `AUT-004`; Várható fájlok vagy rendszer: offer template, offer data, Sabee link; Elfogadási feltétel: az `Arak es szabad idopontok` CTA a D2 selectedRooms Sabee felületét nyitja; Megjegyzés: a house-specific link repo-szinten már bizonyított.
- `WEB-006` `[ ]` Feladat: D2 SEO draft összeállítása; Függőség: `CNT-003`, `SEO-001`; Várható fájlok vagy rendszer: landing page meta, heading structure; Elfogadási feltétel: van végleges title, description es H1/H2 terv; Megjegyzés: a családi pozicionálást tényleges szolgáltatásokkal kell alátámasztani.

## 14. Főoldali ajánlatblokk

- `WEB-007` `[x]` Feladat: tényleges főoldali beillesztési pont azonosítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/pages/index.astro`; Elfogadási feltétel: rögzített, hogy a review blokk utáni, `d2-region-guide` es `RegionStories` környéki zóna a legjobb elsődleges hely; Megjegyzés: redesign nélkül itt illeszthető be a blokk.
- `WEB-008` `[ ]` Feladat: kétkártyás kampányblokk technikai specifikációja; Függőség: `WEB-001`, `WEB-004`, `AUT-006`; Várható fájlok vagy rendszer: főoldali komponens vagy section, image registry; Elfogadási feltétel: desktopon egymás mellett, mobilon egymás alatt jelenik meg a két ajánlatkártya; Megjegyzés: D1 kizárása explicit követelmény.
- `WEB-009` `[ ]` Feladat: `Bovebben` CTA-k landing oldalakra kötése; Függőség: `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: homepage campaign block, landing route-ok; Elfogadási feltétel: a kártyák nem SabeeAppot, hanem a megfelelő landing oldalakat nyitják; Megjegyzés: ez rögzített üzleti döntés.
- `WEB-010` `[ ]` Feladat: mobil-specifikus képek kijelölése a kampánykártyákhoz; Függőség: `AUT-006`, `src/data/images/accommodation-images.ts`; Várható fájlok vagy rendszer: image registry, esetleges asset-kiválasztás; Elfogadási feltétel: mindkét kártyához megfelelő mobilkép van kijelölve; Megjegyzés: új képgenerálás nem része ennek a tervnek.

## 15. Közvetlen foglalási előnyök

- `CNT-007` `[ ]` Feladat: közvetlen foglalási előnyök blokk állításlistájának igazoltsági szint szerinti bontása; Függőség: `SAB-005`, `SAB-006`, `TRK-001`; Várható fájlok vagy rendszer: offer data, tartalmi brief; Elfogadási feltétel: minden állítás `igazolt`, `SabeeApp-ellenőrzést igényel`, vagy `üzleti/jogi döntést igényel` kategóriát kap; Megjegyzés: a brief ezt explicit kéri.
- `CNT-008` `[~]` Feladat: jelenlegi direct booking előnyök technikai alapjának auditja; Függőség: repository audit; Várható fájlok vagy rendszer: `src/templates/AccommodationPage.astro`, `public/scripts/dnd-booking-attribution.js`; Elfogadási feltétel: dokumentált, hogy van house-specific Sabee link, trust label es UTM-dekoráció; Megjegyzés: az ár-állítás ettől még nincs igazolva.
- `CNT-009` `[x]` Feladat: `Foglaljon közvetlenül - nálunk olcsóbban.` kommunikáció üzleti jóváhagyásának rögzítése; Függőség: rögzített árlogika; Várható fájlok vagy rendszer: kampány state-of-truth dokumentáció; Elfogadási feltétel: dokumentált, hogy a Booking.com és Airbnb felé továbbított szállásár 5%-kal magasabb, a takarítási díj és IFA logikája azonos, és nincs csatornaspecifikus promóció; Megjegyzés: a technikai végösszeg-QA ettől függetlenül nyitott marad `SAB-006` alatt.

## 16. SEO

- `SEO-001` `[ ]` Feladat: közös SEO minimumcsomag definiálása a két landinghez; Függőség: `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: landing oldalak meta, heading, internal links; Elfogadási feltétel: mindkét oldalhoz van egyértelmű title, description, H1, H2 es belső link stratégia; Megjegyzés: meglévő landing oldalak mintaként használhatók.
- `SEO-002` `[ ]` Feladat: indexelési stratégia eldöntése; Függőség: üzleti döntés; Várható fájlok vagy rendszer: page-level SEO beállítás; Elfogadási feltétel: egyértelműen dokumentált, hogy a kampányoldalak indexeltek vagy átmenetileg noindexek; Megjegyzés: a `last-minute-d2` jelenleg `noindex` mintát használ.
- `SEO-003` `[ ]` Feladat: Fügeház es D2 kampány-specifikus SEO szövegek elkészítése; Függőség: `CNT-002`, `CNT-003`, `SEO-001`; Várható fájlok vagy rendszer: landing content; Elfogadási feltétel: a meta es heading struktúra nem állít olyat, amit az üzleti validáció nem fed le; Megjegyzés: a közvetlen ár állítás itt is kontrollálandó.

## 17. GA4 / GTM / purchase mérés

- `TRK-002` `[x]` Feladat: jelenlegi booking CTA click mérés bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `public/scripts/dnd-ads-events.js`; Elfogadási feltétel: dokumentált, hogy a delegált kattintásmérés booking click eseményt küld; Megjegyzés: `dnd_booking_click` repo-szinten bizonyított.
- `TRK-003` `[ ]` Feladat: főoldali ajánlatkártya kattintás mérési terve; Függőség: `WEB-008`; Várható fájlok vagy rendszer: homepage campaign block, `data-dnd-*` attribútumok; Elfogadási feltétel: a két kártya külön mérhető offer ID-val es property ID-val; Megjegyzés: jelenleg ilyen blokk még nincs.
- `TRK-004` `[ ]` Feladat: landing page view mérési terve; Függőség: `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: page-level analytics, GTM/GA4 naming; Elfogadási feltétel: eldöntött, hogy dedikált event kell-e a sima pageview mellett; Megjegyzés: repo-szinten dedikált landing-view event nem látható.
- `TRK-005` `[ ]` Feladat: Sabee booking start esemény jelenlegi forrásának azonosítása; Függőség: `TRK-001`; Várható fájlok vagy rendszer: GTM, Sabee, esetleges külső bridge; Elfogadási feltétel: ismert, honnan jön a booking start és hogyan köthető offer/property meta adatokhoz; Megjegyzés: nyitott mérési auditfeladat.
- `TRK-006` `[ ]` Feladat: sikeres purchase esemény jelenlegi forrásának azonosítása; Függőség: `TRK-001`; Várható fájlok vagy rendszer: GTM, GA4, Sabee, esetleges külső bridge; Elfogadási feltétel: ismert, honnan jön a purchase vagy confirmation és hogyan duplikációmentes; Megjegyzés: nyitott mérési auditfeladat.
- `TRK-007` `[x]` Feladat: UTM es attribúciós paraméter-kezelés bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `public/scripts/dnd-booking-attribution.js`; Elfogadási feltétel: dokumentált, hogy a booking URL-ekre átvitelre kerülnek a fő UTM/Ads paraméterek; Megjegyzés: ez jelenleg működő technikai alapnak tekinthető.
- `TRK-008` `[x]` Feladat: consent-kompatibilis mérési alapok bizonyítása; Függőség: repository audit; Várható fájlok vagy rendszer: `src/layouts/BaseLayout.astro`, `public/scripts/consent-init-cookie-refine.js`; Elfogadási feltétel: dokumentált, hogy van default denied consent setup es consent update bridge; Megjegyzés: ez jó alap a kampányméréshez.
- `TRK-009` `[ ]` Feladat: duplikált események kizárási szabályának rögzítése; Függőség: `TRK-003`, `TRK-004`, `TRK-005`, `TRK-006`; Várható fájlok vagy rendszer: GTM/GA4 naming plan, CTA markup plan; Elfogadási feltétel: azonos CTA-ra és azonos user action-re egyetlen üzleti jelentésre alkalmas eseménylánc marad; Megjegyzés: különösen fontos a landing CTA es Sabee indulás kapcsolatánál.

## 18. Mobil és desktop QA

- `QA-001` `[ ]` Feladat: kampánykártyák reszponzív QA terve; Függőség: `WEB-008`, `WEB-010`; Várható fájlok vagy rendszer: homepage campaign block; Elfogadási feltétel: desktopon kétoszlopos, mobilon egyoszlopos, olvasható CTA es képkompozíció; Megjegyzés: külön mobilképek szükségesek lehetnek.
- `QA-002` `[ ]` Feladat: landing oldalak mobil hero, CTA es image QA terve; Függőség: `AUT-006`, `WEB-001`, `WEB-004`; Várható fájlok vagy rendszer: offer template, image registry; Elfogadási feltétel: mobilon a hero, szolgáltatásblokk, galéria es CTA sorrend konzisztens es konverzióbarát; Megjegyzés: ez MVP-ben kötelező.
- `QA-003` `[ ]` Feladat: tracking QA terv; Függőség: `TRK-003`, `TRK-004`, `TRK-005`, `TRK-006`; Várható fájlok vagy rendszer: browser QA, analytics debug; Elfogadási feltétel: végigkövethető a homepage card click -> landing view -> booking CTA -> Sabee flow; Megjegyzés: build utáni, de launch előtti kötelező ellenőrzés.

## 19. Build és deploy

- `DEP-001` `[ ]` Feladat: kampányoldalak build-kompatibilitásának ellenőrzése; Függőség: `AUT-004`, `WEB-001`, `WEB-004`, `WEB-008`; Várható fájlok vagy rendszer: Astro build; Elfogadási feltétel: a kampányoldalak statikus buildben hibamentesen generálódnak; Megjegyzés: ebben az audit taskban build nem futott.
- `DEP-002` `[ ]` Feladat: rollout sorrend meghatározása; Függőség: `QA-001`, `QA-002`, `QA-003`; Várható fájlok vagy rendszer: deploy checklist; Elfogadási feltétel: ismert, hogy először landingek, utána homepage blokk, vagy együtt kerül élesítésre; Megjegyzés: mérési validáció függvénye.

## 20. Hirdetési bekötés

- `ADS-001` `[ ]` Feladat: kampányazonosítók és UTM naming szabály rögzítése; Függőség: `TRK-007`, üzleti kampányterv; Várható fájlok vagy rendszer: campaign naming convention, landing CTA meta; Elfogadási feltétel: a Fügeház es D2 kampány külön mérhető; Megjegyzés: a `data-dnd-campaign` mezőhöz illeszthető.
- `ADS-002` `[ ]` Feladat: hirdetésből landingre, landingből Sabee-re menő attribúciós út ellenőrzése; Függőség: `ADS-001`, `TRK-005`, `TRK-006`; Várható fájlok vagy rendszer: ad links, booking attribution script, analytics; Elfogadási feltétel: az UTM-paraméterek a booking flow-ban is megmaradnak; Megjegyzés: technikai alap repo-szinten már van, de end-to-end validáció kell.
- `ADS-003` `[-]` Feladat: teljes katalogizált kampányportfólió kialakítása; Függőség: nincs; Várható fájlok vagy rendszer: n/a; Elfogadási feltétel: n/a; Megjegyzés: az első verziónak nem része, ezért elvetve.

## 21. Megvalósítási sorrend

1. `SAB-001`, `CNT-001`, `TRK-001` lezárása, mert ezek adják az üzleti, foglalási es mérési valóságot.
2. `AUT-003` es `AUT-004` elvégzése, hogy ne külön-külön, duplikált logikával készüljenek a landingek.
3. `CNT-002`, `CNT-003`, `CNT-004`, `CNT-005` lezárása a végleges tartalmi inputhoz.
4. `WEB-001`, `WEB-004`, `SEO-001` alapján a két landing összeállítása.
5. `WEB-008`, `WEB-009`, `WEB-010` alapján a főoldali kampányblokk implementálása.
6. `TRK-003`, `TRK-004`, `TRK-009`, `QA-001`, `QA-002`, `QA-003`, `DEP-001` lezárása.

## 22. Elfogadási feltételek

- A kampány csak D2-t es Fügeházat tartalmazza; D1 sehol nem jelenik meg.
- A `Foglaljon közvetlenül - nálunk olcsóbban.` kommunikáció üzletileg jóváhagyott, és ehhez csak a technikai spot-QA marad nyitott.
- A landing oldalak közös, adatvezérelt technikai megoldásra épülnek.
- Nincs párhuzamos, kézzel duplikált accommodation adatbázis.
- A főoldali blokk két kártyát jelenít meg, desktopon egymás mellett, mobilon egymás alatt.
- A `Bovebben` CTA-k a landingekre vezetnek.
- Az `Arak es szabad idopontok` CTA-k a megfelelő house-specific Sabee linket nyitják.
- A közvetlen foglalási előnyök közül csak igazolt vagy megfelelően jelölt állítás marad.
- A teljes kampánymérés megvalósítása kötelező.
- A mérési terv kezeli a homepage clicket, landing view-t, booking CTA clicket, booking startot, purchase-t, offer/property ID-t, UTM-eket es a consentet.
- A purchase mérés forrása es duplikációvédelme dokumentált vagy külön nyitott auditfeladatként szerepel.
- A mobil es desktop QA külön checklistet kap.

## 23. Kockázatok

- A SabeeApp oldali rate plan, availability vagy minimum stay információ hiánya blokkolhatja a hiteles kampánykommunikációt.
- A közvetlen ár-ígéret bizonyítás nélkül jogi vagy bizalmi kockázat.
- A Fügeház es D2 szolgáltatáslistáiban lévő finom eltérések félrekommunikációt okozhatnak.
- A purchase mérés jelenlegi részleges átláthatósága miatt launchkor mérési vakfolt maradhat.
- Ha a közös ajánlati sablon helyett külön dedikált oldalak készülnek közös adatmodell nélkül, technikai adósság keletkezik.
- Ha a főoldali blokk túl korán készül el a landingek előtt, a kampánykattintások rossz helyre vezethetnek vagy mérhetetlenek maradnak.

## 24. Döntésre váró kérdések

- Ki tudja hitelesen jóváhagyni a Fügeház es D2 végleges őszi szolgáltatáslistáját?
- Van-e külön őszi rate plan, vagy a meglévő közvetlen árra épül a kampány?
- Használható-e jogszerűen es üzletileg védhetően a `kedvezobb ar` vagy csak puhább direct booking üzenet maradhat?
- A Panorama Pool mely őszi időszakban kommunikálható ténylegesen?
- A kampányoldalak indexeltek legyenek, vagy ideiglenesen noindex logikát kapjanak?
- A booking start es purchase események jelenlegi tulajdonosa és technikai forrása pontosan mely rendszer?

## 25. Haladási napló

| Dátum | Feladat ID | Státuszváltozás | Elvégzett munka | Érintett fájlok | Build/teszt | Commit |
|---|---|---|---|---|---|---|
| 2026-07-23 | AUT-001 | nincs elkezdve -> elkészült | Projekt-audit, főoldali és landing minták feltérképezése, SabeeApp CTA, tracking, consent, accommodation data és image registry ellenőrzése, a központi kampányterv dokumentum létrehozása | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md`, `src/pages/index.astro`, `src/templates/AccommodationPage.astro`, `src/data/accommodation-pages/d2.ts`, `src/data/accommodation-pages/fugehaz.ts`, `src/data/accommodations.ts`, `src/data/images/accommodation-images.ts`, `src/layouts/BaseLayout.astro`, `public/scripts/dnd-booking-attribution.js`, `public/scripts/dnd-ads-events.js`, `public/scripts/consent-init-cookie-refine.js`, `src/pages/last-minute-d2.astro`, `src/pages/szent-gyorgy-hegy-matine-szallas.astro`, `src/pages/kisapati-medences-szallas.astro`, `src/components/KisapatiPoolLandingPage.astro`, `project-docs/d2-last-minute-kampany-plan-2026-07-11.md`, `project-docs/SZENT_GYORGY_HEGY_MATINE_LANDING_2026.md`, `project-docs/google-ads-ga4-audit-living.md`, `project-docs/06-foglalasi-cta-logika.md`, `project-docs/INDEX.md`, `AGENT.md`, `DANDELION_RULES.md`, `DANDELION_CHATGPT_RULES.md`, `package.json`, `astro.config.mjs` | nem futott | nem |
| 2026-07-23 | CNT-009, SAB-006, CNT-010, CNT-011, TRK-001 | részben frissítve | A jóváhagyott közvetlenár-döntés, a nyitott technikai ár-QA, a nyitott D2/Fügeház szolgáltatáslisták, a külön promóciók és a kötelező kampánymérési audit státuszainak átvezetése a hivatalos kampánydokumentumba | `docs/2026-oszi-kampany-es-kapcsolodo-fejlesztesek.md` | nem futott | nem |

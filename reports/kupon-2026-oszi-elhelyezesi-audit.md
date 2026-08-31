# 2026-os őszi 5%-os kuponkampány – elhelyezési audit

**Kód:** `26osz5`  
**Audit típusa:** read-only, forrás- és deploymódosítás nélkül  
**Audit dátuma:** 2026. augusztus 16.  
**Live ellenőrzés:** `https://dandelionhouse.hu/`  
**Nézetek:** desktop, kb. 1779×780; mobil, kb. 390×844

## 1. Kampányfeltételek – változtatás nélkül kezelendők

- 5% kedvezmény, kizárólag a honlapon, közvetlenül leadott foglalásra.
- Tartózkodási időszak: 2026. szeptember 1. – november 30.
- A kupon beváltási határideje: 2026. november 23.
- Nincs meghatározott éjszakaszám-feltétel.
- Nem érvényes telefonos, e-mailes, Booking.com-, Airbnb- vagy más portálos foglalásra.
- Már leadott foglalásra utólag nem alkalmazható.
- Nem kommunikálható olyan állítás, hogy „8% + 5% = 13%”.

## 2. Vezetői összefoglaló

### Jelenlegi állapot

Az auditált 12 magyar oldalon a `26osz5` kód jelenleg sehol nem látható. A főoldalon az őszi blokk a hero után kezdődik, desktopon a vizsgált viewport első képernyője alatt; a blokkban két őszi kártya és azok landing linkjei vannak, kuponkommunikáció nincs.

A két őszi landing oldalon a közvetlen foglalás 8%-os portálár-előnye több ponton jelenik meg, de a kupon nincs jelen. A landingek desktopon több booking CTA-t, mobilon pedig egy hero booking jelvényt és egy későbbi booking CTA-t használnak. Ezért a kuponnak külön, egyértelmű kampányblokkban kell megjelennie, az alap 8%-os közvetlen ár-előnytől szövegileg és vizuálisan elválasztva.

### Javasolt scope

1. A kampány alapértelmezett publikációs scope-ja a magyar oldalak legyenek.
2. A főoldalon az őszi blokk legyen az elsődleges kiemelt megjelenés; opcionálisan egy rövid hero-mikroüzenet vezessen oda.
3. Mindkét őszi landingen legyen egy rövid hero-közeli kuponblokk és egy ismétlés közvetlenül a booking CTA előtt/mellett.
4. A hét ténylegesen közvetlen booking CTA-val rendelkező házoldalon a kupon közvetlenül a hero booking CTA alatt jelenjen meg.
5. Szőlőliget és Köveskál esetén a kuponos publikációt Sabee- és CTA-ellenőrzésig blokkolni kell.
6. Mobilon ne legyen új, rögzített kuponbadge: a fejléc és a meglévő booking badge mellett ez túlzsúfolná a képernyőt.

## 3. Oldalankénti audit és elhelyezési javaslat

### Főoldal – kiemelt auditpont

**Jelenlegi állapot**

- A hero fő üzenete nem kampányos, nincs benne kupon.
- A közvetlen foglalási blokk az őszi blokk előtt jelenik meg, de nem tartalmaz 5%-os kupont.
- Az őszi ajánlati blokk két kártyát tartalmaz: páros és családi ajánlat.
- A blokk desktopon a hero után indul; a mobil hero képernyőjén a kupon nem lenne látható, ha csak ide kerülne.
- A főoldali booking CTA globális, nem egy adott őszi ajánlathoz kötött.

**Javasolt elhelyezés**

**Kötelező:** az „Őszi ajánlatok” blokk címfelülete alatt, a két kártya fölött egyetlen kiemelt, kontrasztos kampánycsík:

> **Őszi extra 5% kedvezmény közvetlen foglalás esetén**  
> Használd a **26osz5** kuponkódot a honlapi foglalásnál.

Alatta röviden:

> 2026. szeptember 1. és november 30. közötti tartózkodásokra érvényes.

A két meglévő kártya CTA-ja maradhat a két landingre vezető elsődleges út. A kampánycsíkban legyen egy közös „Őszi ajánlatok megtekintése” irány, amely a két kártyához vagy az őszi blokkhoz vezet; ne legyen harmadik, konkuráló booking CTA.

**Ajánlott:** hero-közeli, egyetlen rövid mikroüzenet, amely az őszi blokkhoz görget vagy a két landing egyikére vezet. Ez csak akkor kerüljön be, ha a kampány kiemelt üzleti cél; a hero teljes értékajánlatát ne írja át.

**Mobil:** a kampánycsík legyen a blokk elején, teljes szélességű, legalább 16 px belső oldalsó térrel és két sorban olvasható. Ne legyen fixed. A meglévő fixed booking badge maradjon az egyetlen rögzített promóciós elem.

**Prioritás:** blokkba helyezés – **kötelező**; hero-mikroüzenet – **ajánlott**.

### Őszi kettesben – `/ajanlatok/oszi-kettesben/`

**Jelenlegi állapot**

- Kuponkód nincs.
- A közvetlen foglalás 8%-os portálár-előnye három szöveges előfordulással jelenik meg.
- Látható booking útvonalak: fejléc, hero booking jelvény, közvetlen foglalási CTA és footer.
- Desktopon a 8% és a booking CTA jól olvasható; mobilon a hero booking jelvény 76×76 px-es, a nagy booking CTA a landing későbbi közvetlenfoglalási blokkjában van.

**Javasolt elhelyezés**

**Kötelező:** a hero leadje után egy külön kuponblokk, az alap 8%-os ár-előny vizuális elemétől elkülönítve. Ugyanez a blokk vagy rövidített változata közvetlenül a „ÁRAK ÉS SZABAD IDŐPONTOK” CTA előtt/mellett ismétlődjön.

Javasolt CTA-közeli változat:

> **Őszi extra 5% kedvezmény**  
> Foglalj közvetlenül a honlapunkon, és használd a **26osz5** kuponkódot!

A „8% ár-előny a portálokhoz képest” maradjon saját, egyértelműen címkézett blokkban. Ne kerüljön mellé százalék-összeadás vagy „összesen 13%” jellegű mondat.

**Mobil:** a hero-közeli kuponblokk legyen normál dokumentumfolyamban; ne legyen fixed és ne legyen a meglévő booking badge része. A CTA-közeli ismétlés maradjon a booking gomb közvetlen környezetében.

**Prioritás:** **kötelező**.

### Őszi családi pihenés – `/ajanlatok/oszi-csaladi-pihenes/`

**Jelenlegi állapot**

- Kuponkód nincs.
- A közvetlen foglalás 8%-os portálár-előnye három szöveges előfordulással jelenik meg.
- Látható booking útvonalak: fejléc, hero booking jelvény, közvetlen foglalási CTA és footer.
- A landing üzenete családi pihenésre épül; a kupon ne váljon az oldal főcímévé.

**Javasolt elhelyezés**

Azonos szerkezet, mint az Őszi kettesben oldalon: hero lead után rövid kuponblokk, majd egy ismétlés közvetlenül a booking CTA előtt/mellett. A kampányszövegben legyen kifejezett a honlapi közvetlen foglalás; a portálos 8%-os ár-előnnyel ne vonjuk össze.

**Mobil:** normál folyamban elhelyezett, jól kontrasztos kuponblokk; fixed elem hozzáadása nem javasolt.

**Prioritás:** **kötelező**.

### Magyar házoldalak

| Oldal | Jelenlegi booking állapot | Javasolt kuponelhelyezés | Sabee / alkalmazhatóság státusza |
|---|---|---|---|
| `/dandelion-d1/` | Hero „Árak és foglalás”; `selectedRooms=2be20f0b68a1114a` | Közvetlenül a hero CTA alatt, egyetlen kompakt blokkban | Sabee-szoba linkje live szinten látható; a kupon tényleges jogosultsága Sabee-ban még ellenőrzendő |
| `/dandelion-d2/` | Hero „Árak és foglalás”; `selectedRooms=c64244f6153c3ca1` | Közvetlenül a hero CTA alatt | Sabee-szoba linkje live szinten látható; kuponjogosultság Sabee-ban ellenőrzendő |
| `/fuge/` | Hero „Árak és foglalás”; `selectedRooms=af2fdb8ed2ebb145` | Közvetlenül a hero CTA alatt | Sabee-szoba linkje live szinten látható; kuponjogosultság Sabee-ban ellenőrzendő |
| `/dandelion-zsalya/` | Hero „Árak és foglalás”; `selectedRooms=cf20da88f046211e` | Közvetlenül a hero CTA alatt | Sabee-szoba linkje live szinten látható; kuponjogosultság Sabee-ban ellenőrzendő |
| `/szololiget/` | A hero CTA jelenleg „Részletek és kapcsolat”; a data linkben `selectedRooms=e30c4b62d7324b3f` szerepel | Csak ellenőrzött direct booking CTA mellé; jelen állapotban ne helyezzünk ki kupont | **Blokkolt:** a link és a látható CTA eltérő viselkedése tisztázandó |
| `/dandelion-vintage/` | Hero „Árak és foglalás”; `selectedRooms=0c9e5eaae0545ee3` | Közvetlenül a hero CTA alatt | Sabee-szoba linkje live szinten látható; kuponjogosultság Sabee-ban ellenőrzendő |
| `/royal/` | Hero „Árak és foglalás”; `selectedRooms=c4b8753ec9ad4dc9` | Közvetlenül a hero CTA alatt | Sabee-szoba linkje live szinten látható; kuponjogosultság Sabee-ban ellenőrzendő |
| `/szepvolgyi/` | Hero „Árak és foglalás”; `selectedRooms=7d46f283f2f5792f` | Közvetlenül a hero CTA alatt | Sabee-szoba linkje live szinten látható; kuponjogosultság Sabee-ban ellenőrzendő |
| `/dandelion-koveskal/` | Hero „Érdeklődés”; általános Sabee link, nincs `selectedRooms` | Ne kerüljön ki direct booking állításként, amíg a booking útvonal nincs tisztázva | **Blokkolt:** a közvetlen online foglalás és a kupon alkalmazhatósága nincs bizonyítva |

**Egységes házoldali szöveg:**

> **Őszi extra 5% kedvezmény**  
> Foglalj közvetlenül a honlapunkon, és használd a **26osz5** kuponkódot!  
> A kedvezmény a 2026. szeptember 1. és november 30. közötti tartózkodásokra érvényes.

A feltételek legyenek „Felhasználási feltételek” lenyitható blokkban vagy linkelt közös feltételoldalon. A rövid blokk ne állítsa, hogy a kedvezmény portálos, telefonos vagy e-mailes foglalásra is jár.

**Házoldali prioritás:** hét ellenőrzött direct booking CTA-val rendelkező oldal – **kötelező**; Szőlőliget és Köveskál – **kötelező ellenőrzési/blocked gate**, majd csak jóváhagyás után publikálható.

## 4. Végleges szövegezési javaslat

### Rövid kampányblokk

> **Őszi extra 5% kedvezmény közvetlen foglalás esetén**  
> Használd a **26osz5** kuponkódot a honlapi foglalásnál.

### Házoldali változat

> **Őszi extra 5% kedvezmény**  
> Foglalj közvetlenül a honlapunkon, és használd a **26osz5** kuponkódot!  
> A kedvezmény a 2026. szeptember 1. és november 30. közötti tartózkodásokra érvényes.

### Feltételek

> A kupon beváltási határideje: 2026. november 23. Nincs meghatározott éjszakaszám-feltétel. A kupon kizárólag a honlapon, közvetlenül leadott foglalásokra érvényes; telefonos, e-mailes, Booking.com-, Airbnb- vagy más portálos foglalásra nem. Már leadott foglalásra utólag nem alkalmazható.

## 5. Desktop, mobil, kontraszt és ismétlődés

- A kampányblokk legyen rövid, jól elkülönített, világos háttérrel és sötét szöveggel vagy a meglévő arany CTA-palettával; a szöveg és a kód ne kerüljön fotó fölé kontrasztsegítség nélkül.
- A kód legyen külön sorban, félkövér vagy monospace jellegű kiemeléssel, hogy könnyen bemásolható és felolvasható legyen.
- A kuponblokk ne legyen azonos vizuális súlyú a hero főcímével.
- Főoldalon egy kampánycsík + legfeljebb a két meglévő őszi kártya CTA elegendő; footerbe külön kuponismétlés nem szükséges.
- Landingenként két megjelenés indokolt: hero-közeli emlékeztető és booking CTA-közeli blokk. Harmadik, fixed mobil kuponbadge nem javasolt.
- Házoldalanként egy kuponblokk elegendő, közvetlenül a direct booking CTA alatt.
- A landingek meglévő 8%-os elemei maradjanak változatlanul, de a kuponblokk legyen külön feliratozva. Tilos az összeadott kedvezményre utalni.

## 6. Nyelvi oldalak

A kampánykiadás ebben az auditban magyar scope-ra korlátozandó. Az EN/DE/CZ/SK őszi landingek jelenleg szintén 8%-os közvetlenfoglalási kommunikációt tartalmaznak, de a `26osz5` kód nincs rajtuk.

Ha a kupon nemzetközi közönségnek is szólna, külön jóváhagyott fordítás, nyelvenkénti feltételszöveg és Sabee booking-language ellenőrzés szükséges. Nem javasolt magyar kuponszöveget közös, minden locale-ra használt template-be behelyezni. A live ellenőrzésben a DE/CZ/SK booking linkek több helyen `lang=En` paraméterrel jelentek meg; ezt a kuponkampány előtt külön CTA-/nyelvi QA-gate-ként kell kezelni.

## 7. Tracking- és mérési következmények

### Jelenlegi technikai alap

- A kampány- és booking CTA-k már használnak `data-dnd-property`, `data-dnd-campaign`, `data-dnd-offer` és `data-dnd-placement` attribútumokat.
- A jelenlegi `dnd_booking_click` esemény booking-kattintást mér; a payloadban nincs külön kuponkód- vagy kuponbeváltási mező.
- A booking attribution script a Sabee linkekre gclid/UTM és kapcsolódó attribúciót őriz/örökít.
- A live linkekben az audit során `gclid=TEST-GCLID-ACTIVATION-2026` és Matiné teszt UTM-paraméterek látszottak. Ezt a kampány kiadása előtt ellenőrizni kell; nem tekinthető automatikusan éles kampánybizonyítéknak.

### Javasolt jövőbeli mérés – csak implementációs jóváhagyás után

1. A kuponos CTA-k kapjanak következetes placement-értéket, például `homepage-autumn-coupon`, `autumn-landing-coupon-hero`, `autumn-landing-coupon-booking` és `house-coupon`.
2. A kampányazonosító maradjon elkülönítve az ajánlatazonosítótól; a kuponkódot csak külön, jóváhagyott `coupon_code` paraméterként érdemes mérni.
3. A kupon megjelenése, CTA-kattintása és tényleges Sabee-beváltása három külön mérési szint. A weboldali booking click önmagában nem bizonyít foglalást, kedvezménybeváltást vagy bevételt.
4. A tényleges felhasználást SabeeApp oldalon kell visszaolvasni, ház, dátum, kód és státusz szerint.

## 8. Kötelező módosítási és jóváhagyási lista

1. **SabeeApp-ellenőrzés:** a `26osz5` kód jogosultsága, érvényességi dátumai, közvetlen booking csatornája és mind a kilenc ház alkalmazhatósága.
2. **Főoldal:** egy kiemelt kuponcsík az őszi blokk tetején, két landing CTA megtartásával.
3. **Két őszi landing:** hero-közeli és booking CTA-közeli, külön 5%-os kuponblokk; az 8%-os ár-előnnyel nem összevonva.
4. **Házoldalak:** egy kuponblokk a hét ellenőrzött direct booking CTA alatt.
5. **Szőlőliget/Köveskál:** booking CTA és Sabee-szoba/jogosultság tisztázása a kupon kihelyezése előtt.
6. **Locale-gate:** magyar szöveg csak HU oldalon; nemzetközi kiterjesztés külön fordítási és booking-language jóváhagyással.
7. **Tracking-gate:** teszt UTM/gclid paraméterek és a kuponmérés véglegesítése.
8. **QA-gate:** minden érintett oldal desktop és mobil nézetben, CTA-közelség, kontraszt, felhasználási feltételek és duplikált megjelenések ellenőrzésével.

## 9. Ellenőrzött források és technikai támpontok

- Főoldali őszi kártyák és meglévő campaign tracking: `src/sections/AutumnCampaignOffers.astro:152-187`
- Őszi landing 8%-os blokk, hero booking badge, CTA-k és mobil szabályok: `src/templates/AutumnMultiHouseOfferPage.astro:120-149`, `259-276`, `371-395`
- Közös házoldali booking CTA-logika: `src/templates/AccommodationPage.astro:652-705`, `1091-1106`, `1377-1397`
- Házankénti Sabee linkek: `src/data/accommodation-pages/*.ts`
- Booking click payload és jelenlegi attribútummezők: `public/scripts/dnd-ads-events.js:130-155`, `292-323`
- Booking attribúció és UTM/gclid örökítés: `public/scripts/dnd-booking-attribution.js`

**Audit döntése:** jelen állapotban módosítás/deploy nem történt. A kampány publikálása a fenti Sabee-, CTA-, locale- és tracking-gates teljesülése után javasolt.

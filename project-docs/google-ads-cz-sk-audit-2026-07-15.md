# Google Ads audit - Cseh es szlovak piacnyitas

Status: FRISSITVE 2026-07-15  
Keszult: helyi Google Ads workflow + site source audit alapjan  
Erintett piacok: Csehorszag, Szlovakia  
Erintett datumok:

- aktualis auditdatum: 2026-07-15
- aktiv kampanyallapot ellenorizve: 2026-07-15
- search term es teljesitmeny mintak: elsosorban 2026-07-09 - 2026-07-15

## 1. Vezetoi osszegzes

A cseh es szlovak Google Ads nyitas **technikai oldalrol megvalosithato**, de a jelenlegi magyar setupot **nem szabad egy az egyben atmasolni**.

A legfontosabb okok:

- a jelenlegi generikus magyar search kampany tul sok irrelevans keresest enged be,
- a fo optimalizalasi pont ma is a `dnd_booking_click`, nem a valos foglalasi visszaigazolas,
- a jelenlegi medences kampany strukturaja jo kiindulopont, de a landing URL-ek most magyar oldalakra mutatnak,
- a szlovak es cseh oldalverziok leteznek, viszont a booking-ut egy resze meg mindig angol nyelvu.

Kovetkeztetes:

- **igen, erdemes nyitni Csehorszag es Szlovakia fele**,  
- **de csak kulon CZ es SK search kampanyokkal, lokalizalt landingekkel, kulon nyelvi celzassal es szigorubb kulcsszo-strukturaval**.

## 2. Mi van mar keszen

### 2.1 Site kesi allapot

A weboldalban mar megvannak a fontos lokalizalt utak:

- `/cs/`
- `/sk/`
- `/cs/ubytovani/`
- `/sk/ubytovanie/`
- `/cs/kisapati-ubytovani-s-bazenem/`
- `/sk/kisapati-ubytovanie-s-bazenom/`
- `/cs/panorama-pool/`
- `/sk/panorama-pool/`

A sitemap es a hreflang parok is le vannak fektetve, tehat SEO-es landing szempontbol a struktura alapvetoen alkalmas a piacnyitasra.

### 2.2 Google Ads technikai kezeles

A helyi Ads workflow bizonyitottan mukodik:

- kampanylista,
- teljesitmeny,
- konverzios muveletek,
- search terms,
- ad group lista,
- RSA lista,
- geo/language targetek.

Ez azt jelenti, hogy a piacnyitas nem csak elmeleti terv marad, hanem a workspace-bol vegig is viheto.

### 2.3 Aktualis aktiv kampanyok 2026-07-15-en

- `Dandelion - Brand - HU`
- `Dandelion - Szállás Balaton-felvidék - HU`
- `Dandelion - Kisapáti Szent György-hegy - HU`
- `Dandelion - Medencés szállás - HU`

## 3. Fo audit megallapitasok

### 3.1 A magyar generic kampany most sem jo minta exporthoz

A `Dandelion - Szállás Balaton-felvidék - HU` kampany search termjei tovabbra is sok irrelevans vagy gyenge szandeku keresest hoznak.

Konkreten latszott tobbek kozott:

- `balaton szállás`
- `balatonfüred szállás`
- `aqua villa siófok`
- `közvetlen vízparti szállás balaton`
- `vonyarc hotel`
- `olcsó szállás balaton északi part`
- `siófok szállás 1 éjszakára`
- `hotel azúr árak`
- `badacsony camping eldorado`

Ez azt jelenti, hogy ha ugyanilyen szerkezettel nyitnank CZ vagy SK fele, akkor jo esellyel ott is gyorsan elfolyna a koltes.

### 3.2 A Kisapati kampany sokkal jobb alap, de nem tiszta

A `Dandelion - Kisapáti Szent György-hegy - HU` kampanyban mar vannak eros, relevans jelek:

- `dandelion house kisapáti`
- `szent györgy hegy szállás`
- `kisapáti szállás`

De mellette ide is beesnek tuleros generic vagy versenytarsi mintak:

- `szállás tapolca környékén`
- `szállodák tapolca területén`
- `olcsó szállás tapolca`
- versenytarsi vendeghaz nevek

Tehat ez jobb alap, de kulon orszagos nyitasra tovabbra is szukitett kulcsszokkal erdemes epiteni.

### 3.3 A medences kampany jo vaz, de jelen allapotban nem exportkesz

A `Dandelion - Medencés szállás - HU` kampanyban mar van ertelmes ad group struktura:

- `Medencés szállás Kisapáti`
- `Panorámás medencés szállás`
- `Medencés szállás Balaton-felvidék`
- `Családi medencés szállás`
- `Medencés szállás Badacsony`
- `Medencés szállás társaságoknak`

Ez jo kiindulopont Csehorszaghoz es Szlovakiahoz is.

Viszont ket problema van:

1. a 90 napos search terms riportban ehhez a kampanyhoz nem jott vissza erdemi keresesi kifejezes,
2. a final URL-ek most magyar oldalakra mutatnak:
   - `https://dandelionhouse.hu/kisapati-medences-szallas/`
   - `https://dandelionhouse.hu/panorama-pool/`
   - `https://dandelionhouse.hu/dandelion-d2/`
   - `https://dandelionhouse.hu/dandelion-d1/`

Tehat a kampany logikaja hasznalhato, de a CZ/SK nyitashoz lokalizalt URL-ekre kell atkotni.

### 3.4 A jelenlegi meres nem a legerosebb uzleti celra optimalizal

Az aktualis Ads conversion action allapot szerint:

- `Dandelion - GA4 (web) dnd_booking_click` -> ENABLED, primary, benne van a conversions mutatoban
- `Dandelion - GA4 (web) dnd_booking_confirmation` -> HIDDEN, nem primary

Ez jelentos kockazat piacnyitasnal, mert uj orszagban meg fontosabb, hogy ne kattintasra, hanem valos foglalasi jelre optimalizaljunk.

### 3.5 A CZ/SK booking-ut nincs teljesen lokalizalva

Fontos site oldali megfigyeles:

- a szlovak homepage es a szlovak page factory angol booking linket hasznal,
- a cseh homepage is angol booking linkre mutat.

Ez nem blokkolo hiba, de rontja a konverziot.

Piacnyitasnal ez kulonosen fontos, mert a felhasznalo:

- cseh vagy szlovak hirdetest lat,
- cseh vagy szlovak landingre erkezik,
- majd angol bookingfolyamatba kerul.

Ez konverzios torest okozhat.

### 3.6 A jelenlegi geo/language celzas teljesen magyar

2026-07-15-i allapotban:

- minden aktiv kampany Magyarorszagra celoz,
- minden aktiv kampany magyar nyelvet hasznal,
- a Brand kampanyban van English is, de geo celzas akkor is Hungary.

Ez fontos, mert nem egy felkesz nemzetkozi setupot kell javitani, hanem egy uj geo-language reteget kell felepiteni.

## 4. Megvalosithatosagi minosites

### 4.1 Technikai megvalosithatosag

**EROS**

Indok:

- vannak CZ es SK landing oldalak,
- van hreflang es sitemap alap,
- van helyi Ads audit- es mutacios workflow,
- van kampany/ad group/RSA kezeles.

### 4.2 Kereskedelmi megvalosithatosag

**JO, de fokozatos**

Indok:

- a termek termeszetesen illik a cseh es szlovak pihenes / autozhato nyari utazas szegmensbe,
- a medence + Balaton-felvidek + nyugodt vendeghazak ajanlat ertheto exportuzenet,
- viszont a generic szallas kulcsszok tul dragak lehetnek, ha nem nagyon szigoruan epulnek fel.

### 4.3 Meresi keszenlet

**KOZEPES**

Indok:

- az Ads-GA4 meresi lanc latszik es mukodik,
- de primer optimalizalasi pontkent jelenleg booking click fut,
- uj geo inditas elott ezt meg kell erositeni.

### 4.4 Nyelvi es UX keszenlet

**KOZEPES**

Indok:

- a lokalizalt oldalak megvannak,
- de a bookingfolyamat nem teljesen lokalizalt,
- emiatt az elso korben erdemes inkabb az eros, egyszeru, pool es quiet stay uzenetekre tamaszkodni.

## 5. Mit javaslok a kampanystruktura helyett

### 5.1 Ne egy nemzetkozi kampany legyen

Ne egyetlen kozos kampany legyen `CZ+SK` vagy `all languages` beallitassal.

Javaslat:

- 1 kulon search kampany Csehorszagra
- 1 kulon search kampany Szlovakiara

Oka:

- kulon kolteskontroll,
- kulon nyelvi uzenet,
- kulon search term audit,
- kulon negatív kulcsszozas,
- kulon landing URL-ek.

### 5.2 Elso korben ne generic, hanem intent-alapu nyitas legyen

Javasolt elso koros kampanytipusok:

1. `CZ - Pool stays - Balaton uplands`
2. `SK - Pool stays - Balaton uplands`
3. opcionálisan kesobb `CZ - Kisapati / Szent Gyorgy-hegy stays`
4. opcionálisan kesobb `SK - Kisapati / Szent Gyorgy-hegy stays`

Nem javasolt elso korben:

- tul tag `balaton accommodation` generic kampany
- olcso / last minute / altalanos hotel szandek

### 5.3 Orszagonkent egy nyelv

Javaslat:

- Csehorszag kampanyok: `Czech`
- Szlovakia kampanyok: `Slovak`

Az angol csak kulon teszt vagy remarketing retegkent jojjon be kesobb, ne az elso korben.

Indok:

- Google hivatalos leirasa szerint a nyelvi targeteles a felhasznalo altal ertett nyelvre epul, es tobbnyelvu emberek mas nyelvu hirdetest is kaphatnak,
- ezert indulaskor a lokalis fo nyelv a legtisztabb megoldas.

### 5.4 Geo beallitas

Javasolt indulasi modell:

- CZ kampanyok -> location: Czech Republic
- SK kampanyok -> location: Slovakia
- positive geo target type: `PRESENCE`
- negative geo target type: `PRESENCE`

Megjegyzes:

- a Google hivatalos anyagai a travel kategoriaban sokszor ajanljak a `Presence or Interest` beallitast,
- de itt nem egy magyar desztinacio erdeklodesi reteget akarunk vegteleniteni, hanem fizikai cseh es szlovak eredetpiacot akarunk elerni,
- emiatt az elso korben a `PRESENCE` biztonsagosabb.

Kesobb lehet tesztelni kulon kampannyal:

- `Presence or Interest`

de csak kontrollalt A/B logikaval.

## 6. Javasolt landing oldalak

### 6.1 Cseh

- fo kampany: `/cs/kisapati-ubytovani-s-bazenem/`
- masodik varians: `/cs/panorama-pool/`
- property-specifikus tesztek:
  - `/cs/dandelion-d2/`
  - `/cs/dandelion-d1/`
  - `/cs/dandelion-fugehaz/`

### 6.2 Szlovak

- fo kampany: `/sk/kisapati-ubytovanie-s-bazenom/`
- masodik varians: `/sk/panorama-pool/`
- property-specifikus tesztek:
  - `/sk/dandelion-d2/`
  - `/sk/dandelion-d1/`
  - `/sk/dandelion-fugehaz/`

## 7. P0 / P1 / P2 akcioterv

### P0 - indulashoz kotelezo

1. A `dnd_booking_confirmation` konverzio szerepet tisztazni kell, es lehetoseg szerint primer jelre emelni.
2. A CZ es SK landingek booking-atmenetet vegig kell nezni.
3. Kulon CZ es SK kampanyokat kell letrehozni, nem a HU kampany klonjakent, hanem lokalizalt final URL-ekkel.
4. A generic HU kampany hibait nem szabad atvinni: csak exact + phrase alapu indulast javaslok.
5. Minden uj kampanyhoz kulon negativ kulcsszolista kell.

### P1 - elso 2 hetes stabilizalas

1. Search terms napi vagy heti audit.
2. Kolteskorlatok kulon orszagonkent.
3. Medence / pool / family stay uzenetek kulon merese.
4. Landing oldalankenti booking click es booking confirmation kulon figyelese.

### P2 - skalazas

1. Angol nyelvu kulon teszt a CZ/SK piacra.
2. Remarketing reteg.
3. D1 / D2 / Fugehaz property-szintu bontas csak akkor, ha az elso koros kampany mar eleg adatot hoz.

## 8. Javasolt indulasi struktura

### 8.1 CZ

Kampanynev:

- `Dandelion - Pool stays - CZ`

Ad groupok:

- `Kisapati pool stay`
- `Balaton uplands pool stay`
- `Quiet pool accommodation`
- `Family pool stay`

Landing:

- alap: `/cs/kisapati-ubytovani-s-bazenem/`

### 8.2 SK

Kampanynev:

- `Dandelion - Pool stays - SK`

Ad groupok:

- `Kisapati pool stay`
- `Balaton uplands pool stay`
- `Quiet pool accommodation`
- `Family pool stay`

Landing:

- alap: `/sk/kisapati-ubytovanie-s-bazenom/`

## 9. Amit most nem javaslok

- ne menjen egyszerre tul sok kampany,
- ne menjen broad indulaskor,
- ne menjen ugyanaz a magyar landing a cseh es szlovak hirdetesek moge,
- ne maradjon az uj piacnyitas csak booking click optimalizalason,
- ne legyen kozos `CZ+SK+EN` kampany az elso korben.

## 10. Vegso dontesi javaslat

### Go / No-Go

**GO, de feltetelesen.**

Feltetelek:

1. lokalizalt final URL-ek,
2. meresi pontok tisztazasa,
3. orszagonkent kulon kampany,
4. szuk kulcsszoinditas,
5. heti search term kontroll.

Ha ez megvan, a cseh es szlovak tesztkampany **megvalosithato es vallalhato**.

Ha ez nincs meg, akkor a legvaloszinubb kimenet:

- draga generic forgalom,
- nyelvi torzs a bookingnal,
- bizonytalan optimalizalas.

## 11. Kifejezetten ajanlott kovetkezo lepes

A legjobb kovetkezo konkret feladat:

1. keszuljon el a `CZ` es `SK` kampany blueprint,
2. mindket orszaghoz 1-1 indulo negativ kulcsszolista,
3. ellenorizzuk a cseh es szlovak booking-atmenetet,
4. utana lehet validate-only modban letrehozni az uj kampanycsomagot.

## 12. Kulfoldi celzasrol fontos hivatalos megjegyzesek

Google Ads hivatalos dokumentacio alapjan:

- a location targeting tobb jelbol dolgozik, es nem garantal 100%-os pontossagot,
- a `Presence or Interest` szelesebb elerest adhat,
- a `Presence` szukebb, fizikai jelenlethez kotottebb beallitas,
- a language targeting nem csak a keresesi nyelvre, hanem a Google altal feltetelezett nyelvertesre is tamaszkodik.

Emiatt a javasolt elso koros modell:

- orszagonkent kulon kampany,
- helyi nyelv,
- `PRESENCE`,
- szukitett kulcsszok,
- lokalizalt landing.

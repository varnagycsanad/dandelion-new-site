[CHANGE 2026-05-20 00:00] Google AI Readiness reszletes vegrehajtasi terv letrehozva.

# Google AI Readiness vegrehajtasi terv

Status: RESZBEN TELJESULT
Last checked: 2026-06-02
Use for: Google AI Readiness vegrehajtasi terv kontextus
Do not use for: aktualis projektallapot onallo forrasakent


Ez a dokumentum a Google AI Readiness projekt reszletes vegrehajtasi terve. Nem statuszkoveto fajl.

Kapcsolodo elo statuszfajl:

```text
project-docs/GOOGLE_AI_READINESS.md
```

## 1. Projektcel

A Dandelion honlap legyen Google AI / AI Overview / AI Mode fele jol ertelmezheto, strukturalt, foglalasra optimalizalt szallasrendszer.

A cel nem AI SEO trukk, hanem gepileg ertheto, vendegkozpontu szallasadat-rendszer. A tartalomnak a vendegek valodi donteseit kell segitenie, es kozben olyan egyertelmu adatstruktura kell, amelyet a Google es mas keresesi rendszerek is konnyen ertelmeznek.

## 2. Vegrehajtasi alapelv

Sorrend:

1. Elobb adat.
2. Utana lathato oldalstruktura.
3. Utana foglalasi utvonal.
4. Utana schema.
5. Utana Google Business / SabeeApp / Google booking kapcsolat.
6. Utana kepek es tartalmi landing oldalak.

Codex nem talalhat ki hianyzo szallasadatot. Ami nincs biztosan a repoban vagy kulon megadva, az `HIANYZIK` vagy `ELLENORIZENDO` statuszt kap.

## 3. 1. szakasz - Szallasadat-mester tabla

Cel: egyetlen ellenorizheto mester tabla keszuljon minden szallasrol. Ez lesz az alapja a hianylistanak, a lathato gyors dontesi blokkoknak, a CTA terkepnek es kesobb a schema bovitesnek.

Szukseges mezok:

- szallas neve
- telepules
- regio
- ferohely
- haloszobak
- furdok
- agyelrendezes
- medence statusz
- legkondi
- wifi
- parkolas
- kisallat
- csaladbarat
- kert / terasz
- kilatas
- Balaton kapcsolat
- kozeli strandok
- kozeli latnivalok
- kozeli boraszatok
- kinek ajanlott
- kinek nem idealis
- HU booking link
- EN booking link
- ellenorizendo adatok

Szallasok:

- Dandelion D1
- Dandelion D2
- Fugehaz
- Zsalya Vendeghaz
- Szololiget Vendeghaz
- Szepvolgyi Vendeghaz
- Dandelion Royal Homes
- Dandelion Vintage
- Koveskal

Vegrehajtas:

- Repo adatforrasok atnezese.
- Meglevo biztos adatok atvezetese a mester tablaba.
- Bizonytalan adatok jelolese `ELLENORIZENDO` statuszkent.
- Hianyzo adatok jelolese `HIANYZIK` statuszkent.
- Nem szabad adatot kovetkeztetesbol veglegesiteni.

## 4. 2. szakasz - Hianylista

Cel: a mester tabla alapjan keszuljon konkret hianylista, amely megmutatja, melyik szallasnal melyik AI-dontesi adat hianyzik.

Szabalyok:

- Ami nincs biztosan a repoban, az `HIANYZIK` vagy `ELLENORIZENDO`.
- Codex nem talalhat ki adatot.
- A hianylista kulon kezelje a HU es EN oldalakat.
- A negativ allitasokat is ellenorizni kell: peldaul nincs medence, nem kisallatbarat, nincs sajat parkolo.

Kimenet:

- szallasonkenti hianylista
- prioritas szerinti lista
- tulajdonosi megerositesre varo adatok listaja

## 5. 3. szakasz - Gyors dontesi blokk

Cel: minden szallasoldalon legyen egységes, lathato blokk, amelybol ember es AI is gyorsan kinyeri a legfontosabb dontesi adatokat.

Kotelezo mezok:

- ferohely
- haloszobak
- furdok
- agyelrendezes
- medence
- legkondi
- wifi
- parkolas
- kisallat
- csaladbarat
- kert / terasz
- regio
- kozeli fo pontok

Vegrehajtas:

- A mester tabla alapjan keszuljon blokkterv.
- Csak ellenorzott adatok kerulhetnek be.
- A blokk legyen azonos logikaju HU es EN oldalon.
- Ha egy adat nem publikalhato vagy bizonytalan, ne keruljon schema-ba es ne legyen vegleges allitas.

## 6. 4. szakasz - Kinek ajanljuk / kinek nem blokk

Cel: minden szallasoldalon legyen oszinte, dontest segito tartalom.

Blokk szerkezet:

- Ezt valaszd, ha...
- Nem ez a legjobb valasztas, ha...

Iranyelv:

- Nem marketing rizsa.
- Konkret vendeghelyzetekre valaszoljon.
- Ne legyen tul negativ, de legyen valodi segitseg.
- Ne talaljon ki korlatozast vagy szolgaltatast.

Peldak a vizsgalando szempontokra:

- nagyobb csalad
- paros elvonulas
- kisgyerekes utazas
- Balaton kozelsege
- medence igeny
- csend igeny
- akadalymentesseg vagy lepcsok
- kisallat kerdes

## 7. 5. szakasz - Foglalasi utvonal

Elvart vegallapot:

- minden fo CTA valodi `<a href>` linkkent is lathato legyen
- OpenBE mukodes megmaradhat
- JS nelkul is legyen foglalasi ut
- HU oldalon magyar booking link
- EN oldalon angol booking link
- Koveskal `bookingLink` ne sajat oldalra mutasson foglalasi CTA-kent
- header CTA es szallasoldali CTA ne mondjon mast

Vegrehajtas:

- Minden szallas HU es EN booking linkjenek osszegyujtese.
- SabeeApp room / selectedRooms parameter ellenorzese.
- Header CTA, listing CTA es szallasoldali CTA osszevetese.
- Koveskal kulon tisztazasa.
- Csak ellenorzott link kerulhet eles CTA-ba.

## 8. 6. szakasz - Google Business Profile / Maps audit

Cel: a weboldali adatok es Google Maps / Google Business Profile adatok legyenek osszhangban.

Ellenorizendo:

- van-e Google Business Profile
- nev
- cim
- telefon
- weboldal link
- foglalasi link
- kategoria
- kepek
- szolgaltatasok
- ertekelesek
- valaszok ertekelesekre
- magyar / angol adatok

Kimenet:

- profilonkenti audit
- ellentmondasok listaja
- hianyzo vagy gyenge GBP adatok listaja
- javasolt javitasok listaja

## 9. 7. szakasz - SabeeApp / Google Free Booking / Vacation Rental tisztazas

Cel: tisztazni, hogy a Dandelion szallasok SabeeApp-on keresztul bekothetoek-e Google foglalasi megjelenesekbe.

Meg kell kerdezni SabeeApp supporttol:

- Dandelion bekotheto-e Google Free Booking Links rendszerbe
- vendeghaz / apartman / vacation rental kategoriaban hogyan kezelik
- minden haz kulon propertykent megjelenhet-e
- elo ar es elerhetoseg atmegy-e
- booking link SabeeApp Booking Engine-re mutat-e
- magyar es angol nyelv kulon kezelheto-e
- kell-e Google Hotel Center

Kimenet:

- SabeeApp valasz osszefoglalasa
- Google Hotel Center igen/nem dontesi pont
- property szintu megjelenes lehetosege
- kovetkezo technikai vagy admin teendok

## 10. 8. szakasz - Schema terv

Cel: csak lathato es ellenorzott adatok utan keszuljon reszletesebb schema terv.

Vizsgalando schema elemek:

- LodgingBusiness bovites
- VacationRental vizsgalat
- ImageObject
- FAQPage csak valodi lathato GYIK eseten
- Organization / LocalBusiness brand szinten
- geo / address, ha publikalhato
- amenities, ha lathato oldaltartalomban is ott vannak

Szabalyok:

- Schema nem tartalmazhat olyat, ami nincs lathato oldaltartalomban.
- Bizonytalan adat nem kerulhet schema-ba.
- A schema ne legyen marketing szoveg, hanem strukturalt tenyadat.
- HU es EN canonical oldalaknal a nyelvi egyezest kulon ellenorizni kell.

## 11. 9. szakasz - Kep SEO terv

Cel: a kepek segitsek az oldal ertelmezhetoseget es a Google kepes talalatait.

Javitando:

- generikus alt szovegek
- hero kepek
- medence kepek
- haloszobak
- furdok
- konyha / etkezo
- kert / terasz
- kilatas / kornyek
- magyar es angol alt/title/caption

Vegrehajtas:

- Generikus alt/title/caption mezok listazasa.
- Kepenkenti vizualis ellenorzes.
- HU es EN SEO szoveg keszitese.
- Csak a kepen tenylegesen lathato elem irhato le.
- AI draft csak jovahagyas utan valhat vegleges SEO adattá.

## 12. 10. szakasz - Angol oldalak ellenorzese

Cel: az angol oldalak ne legyenek gyengebbek, mint a magyar oldalak.

Ellenorizendo EN elemek:

- guests
- bedrooms
- bathrooms
- bed layout
- pool
- parking
- air conditioning
- Wi-Fi
- family-friendly
- pets
- nearby attractions
- direct booking
- SabeeApp `lang=En`

Vegrehajtas:

- HU/EN adatparitas tabla.
- Hianyzo vagy gyengebb EN allitasok listaja.
- Booking linkek nyelvi ellenorzese.
- Canonical es hreflang ujraellenorzese.

## 13. 11. szakasz - Dontest segito landing oldalak

Cel: tematikus, valodi keresesi szandekokra valaszolo landing oldalak keszuljenek, miutan az alapadatok rendben vannak.

Elso javasolt oldalak:

- Melyik Dandelion szallast valaszd?
- Medences szallasok a Szent Gyorgy-hegy kornyeken
- Csaladbarat vendeghazak a Balaton-felvideken
- D1, D2 vagy Fugehaz - melyik valo nektek?
- Szallas Kisapatiban, Badacsony es Szent Gyorgy-hegy kozeleben

Szabalyok:

- Landing oldal csak ellenorzott adatokbol epulhet.
- Ne kannibalizalja a szallasoldalakat.
- Legyen hasznos valasztasi logika, nem ures SEO szoveg.
- Belső linkelese legyen egyertelmu.

## 14. 12. szakasz - Teszteles es meres

Cel: a javitasok utan merheto legyen az indexelhetoseg, a strukturalt adatok minosege, a sebesseg es a foglalasi utvonal.

Ellenorzesek:

- Google Search Console URL Inspection
- Rich Results Test
- sitemap
- robots
- canonical
- hreflang
- PageSpeed / LCP
- mobil nezet
- CTA kattintasmeres
- SabeeApp kimeno link meres
- fontos keresesek kezi figyelese

Kimenet:

- tesztelt URL-ek listaja
- hibak es figyelmeztetesek listaja
- javitas utan ujrateszt eredmenye
- meresi baseline

## 15. Prioritasi sorrend

Elso kor:

- szallasadat-mester tabla
- hianylista
- foglalasi link terkep
- Koveskal bookingLink tisztazas
- SabeeApp Google kapcsolat megkerdezese

Masodik kor:

- gyors dontesi blokk
- kinek ajanljuk / kinek nem blokk
- HU/EN adatparositas
- kozeli latnivalok listak

Harmadik kor:

- CTA linkesites
- schema bovites
- canonical / hreflang / sitemap validalas
- Rich Results Test

Negyedik kor:

- Google Business Profile audit
- Google Maps kepek / linkek / szolgaltatasok
- SabeeApp / Google Free Booking / Vacation Rental dontes

Otodik kor:

- kep SEO javitas
- szallasvalaszto oldal
- medences szallas oldal
- csaladbarat szallas oldal
- D1 vs D2 vs Fugehaz oldal

## 16. Tiltott muveletek ebben a tervfajl-taskban

- kodmodositas
- Astro fajl modositas
- adatfajl modositas
- build futtatas
- schema implementalas
- booking link javitas
- kitalalt szallasadat hozzaadasa

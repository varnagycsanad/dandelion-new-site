# DANDELION - TRANSLATION RULES

Ez a fájl a Dandelion honlap többnyelvű fordítási szabályait rögzíti.

Első implementálandó nyelv:
- `hu`: magyar, forrásnyelv
- `en`: angol, első idegen nyelv

Későbbi nyelvek:
- `de`: német
- `sk`: szlovák
- `pl`: lengyel
- `cs`: cseh

Nem része az első körnek:
- ukrán
- orosz
- cirill betűs lokalizáció

---

## 1. Alapelv

A fordítás nem nevezheti át a Dandelion világát.

A háznevek, márkanevek és fontos helynevek stabilak maradnak. A fordítás célja nem szó szerinti gépi fordítás, hanem természetes, vendégoldali szöveg.

A Dandelion hangnem:
- természetközeli
- vidéki prémium
- nyugodt
- emberi
- nem steril hotel-láncos nyelv

Tilos:
- a márka világának átnevezése
- túl hivatalos, rideg hotelszöveg
- kulcsszóhalmozott SEO-szöveg
- automatikus, kontextus nélküli gépi fordítás

---

## 2. Nem Fordítandó Háznevek

Ezek minden nyelven változatlanul maradjanak:

- Dandelion D1
- Dandelion D2
- Fügeház
- Zsálya Vendégház
- Szőlőliget Vendégház
- Szépvölgyi Vendégház
- Dandelion Royal Homes
- Dandelion Vintage Vendégház

Fontos:
- Vintage marad Vintage.
- Ne legyen Cottage.
- Ne legyen lefordított háznév.
- A hivatalos háznevek latin betűvel maradjanak.

Tilos példák:
- `Dandelion Vintage Cottage`
- `Fig House`
- `Sage Guesthouse`
- `Vineyard Guesthouse`

---

## 3. Nem Agresszívan Fordítandó Helynevek

Ezeket ne nevezzük át erőszakosan:

- Balaton
- Balaton-felvidék
- Szent György-hegy
- Badacsony
- Badacsonyörs
- Kisapáti
- Nemesgulács
- Keszthely
- Köveskál
- Káli-medence
- Tapolcai-medence

Angolban lehet magyarázó fordítás, például:
- Balaton-felvidék -> Balaton Uplands
- Szent György-hegy -> Szent György Hill

A magyar név sokszor maradhat a szövegben, főleg ha márkanévként, helyazonosítóként vagy SEO-szempontból fontos.

Javasolt forma angolban:
- `Balaton-felvidék, the Balaton Uplands`
- `Szent György-hegy near Kisapáti`
- `Káli-medence region`

---

## 4. URL-Stratégia

Első javasolt irány:

Magyar marad prefix nélkül:
- `/`
- `/szallasok/`
- `/dandelion-d2/`

Angol kapjon `/en/` prefixet:
- `/en/`
- `/en/szallasok/`
- `/en/dandelion-d2/`

Későbbi nyelvek:
- `/de/`
- `/sk/`
- `/pl/`
- `/cs/`

Első körben a slugok maradhatnak azonosak minden nyelven, mert ez egyszerűbb és csökkenti a route-duplikációt.

Tilos:
- a magyar útvonalak átnevezése külön döntés nélkül
- teljes route-rendszer kézi duplikálása
- nyelvenként eltérő, ad hoc sluglogika bevezetése

---

## 5. CTA Fordítási Alapok

Rövid, egyértelmű gombfeliratok kellenek.

Magyar -> angol:
- Foglalás -> Book now
- Szabad időpontok -> Check availability
- Megnézem a szállást -> View accommodation
- Ajánlatot kérek -> Send inquiry

Magyar -> német, később:
- Foglalás -> Jetzt buchen
- Szabad időpontok -> Verfügbarkeit prüfen
- Megnézem a szállást -> Unterkunft ansehen
- Ajánlatot kérek -> Anfrage senden

CTA szabály:
- legyen rövid
- legyen természetes
- ne legyen marketingesen túlzó
- ne tartalmazzon felesleges SEO-kulcsszót

---

## 6. SabeeApp Szabály

A fordítás csak a látható gombfeliratot és szöveget érintheti.

Tilos fordítási taskban módosítani:
- SabeeApp tokeneket
- OpenBE logikát
- booking link technikai működését
- roomId vagy selectedRooms paramétereket
- foglalási scriptet

A foglalási logika maradjon adatként kezelve, ne legyen nyelvenként szétszórva.

Helyes irány:
- CTA label locale szerint fordul
- booking link / token változatlan marad
- OpenBE működés közös marad

---

## 7. Képek SEO Szabály

Nem szabad vakon az összes képet lefordítani.

Első implementációban csak azoknak a képeknek legyen angol SEO-ja, amelyek ténylegesen kellenek:
- `/en/`
- `/en/szallasok/`
- `/en/dandelion-d2/`

Tilos:
- magyar `alt/title/caption` mezőkhöz hozzányúlni
- meglévő angol mezőt felülírni
- `approved: true` értéket automatikusan beállítani
- olyat írni, ami a képen nem látható
- kulcsszóhalmozott alt szöveget írni
- fájlnévből SEO szöveget gyártani
- tömeges image registry átírást indítani

Jó alt példa:

```text
Terrace of Dandelion D2 with table and chairs
```

Rossz alt példa:

```text
best accommodation Balaton Hungary booking family guesthouse cheap
```

Ha AI SEO draft készül:
- csak draftként kezelhető
- `seoDraft` mezőbe kerülhet, ha a struktúra ezt használja
- alapállapot: `approved: false`
- emberi review nélkül nem tekinthető végleges SEO adatnak

---

## 8. SEO Szabály

Minden nyelvnek saját title és description kell.

Angol oldalon kötelező:
- saját angol title
- saját angol description
- `html lang="en"`
- angolnak megfelelő `og:locale`
- canonical az angol oldal saját URL-jére

Angol oldalon tilos:
- canonical a magyar főoldalra
- `html lang="hu"`
- `og:locale="hu_HU"`
- magyar meta title vagy description bent hagyása

Később szükséges:
- hreflang / alternate logika
- sitemap többnyelvű bővítése
- canonical és alias kezelés locale-tudatosítása

---

## 9. Technikai Szabály

Ne készüljön kézzel másolt teljes oldalrendszer.

Helyes irány:
- adatvezérelt locale-mezők
- központi translation struktúra, ahol indokolt
- meglévő komponensek locale-paraméterezése
- közös sablonok megtartása

Kötelező:
- a meglévő design nem változhat fordítási task miatt
- a közös `AccommodationPage.astro` sablon irányát meg kell tartani
- a page fájlok maradjanak vékony wrapper jellegűek
- a szállásoldalak ne váljanak újra nagy, kézzel másolt layout fájlokká

Tilos:
- design módosítás fordítási taskban
- layout kézi másolása nyelvenként
- D2 sablonlogika duplikálása
- oldalanként külön i18n megoldás kitalálása

---

## 10. Stop Szabály

STOP, ha:
- háznév fordításra kerülne
- Vintage átnevezésre kerülne
- Cottage megjelenne Vintage helyett
- SabeeApp logika módosulna
- image registry tömegesen átíródna
- magyar SEO mezők átíródnának
- `approved: true` automatikusan bekerülne
- design módosítás történne fordítási taskban
- teljes honlapfordítás indulna egyetlen nagy diffben

STOP jelzés:

```text
TRANSLATION RULE VIOLATION
```

vagy képes SEO tasknál:

```text
IMAGE SEO TRANSLATION SCOPE TOO LARGE
```

---

## 11. Első Implementációs Kör

Első angol kör:
- `/en/`
- `/en/szallasok/`
- `/en/dandelion-d2/`

Első körben nem cél:
- teljes honlapfordítás
- jogi oldalak fordítása
- összes szállásoldal fordítása
- összes kép SEO fordítása
- német, szlovák, lengyel vagy cseh implementáció

Az első kör célja:
- biztonságos locale struktúra
- angol kezdőlap
- angol szállásválasztó oldal
- angol Dandelion D2 oldal
- csak a szükséges képek angol SEO mezőinek előkészítése

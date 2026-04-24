Tessék, ez a frissített verzió. A **18. LAKÁSOLDALAK / APARTMENT PAGES** bekerült, a régi végső szabály pedig **19. VÉGSŐ SZABÁLY** lett.

```md
# DANDELION – DESIGN & STRUCTURE RULES

---

## 1. ALAPELV

A Dandelion egy prémium, természetközeli vendégház márka.

A weboldal célja:
- bizalomépítés
- hangulat átadás
- foglalás ösztönzés

Nem cél:
- klasszikus szálláslista
- túlzott UI design
- modern tech kinézet

---

## 2. OLDAL STRUKTÚRA (KÖTELEZŐ)

A főoldal fix sorrendje:

1. Hero  
2. RegionStories (Szállások)  
3. Experiences (Élmények)  
4. Map  
5. Why  
6. Booking  
7. Blog  
8. Closing CTA  
9. Footer  

---

## TILOS

- új szekció hozzáadása
- sorrend módosítása
- blokk törlése

---

## 3. HERO

### Cél:
érzelmi belépési pont

### Tartalom:
- videó háttér
- overlay szöveg
- CTA

### Szöveg:
- REGGEL HEGYEKKEL  
- ESTE CSILLAGOKKAL  

### CTA:
→ #stays

---

## HERO TIPOGRÁFIA

- serif font
- uppercase
- nagy letter-spacing
- elegáns

---

## TILOS

- sans-serif hero
- kisbetűs hero
- túl vastag betű

---

## 4. SZÁLLÁS BLOKK (REGIONSTORIES)

### ID:
#stays

### LOGIKA

NEM:
- lista
- grid
- kártyás felsorolás

HANEM:
- 3 régió történet

---

### Régiók:

1. Tapolcai-medence  
2. Balaton mellett  
3. Káli-medence  

---

### Tartalom:

- nagy kép
- overlay szöveg
- rövid leírás
- CTA

---

## TILOS

- accommodation grid
- automatikus lista render
- túl sok kártya

---

## 5. ÉLMÉNYEK

### ID:
#elmenyek

### Tartalom:
- túra
- bor
- Balaton
- természet

### Forma:
- kép + cím + rövid szöveg

---

## 6. TÉRKÉP

- Google Maps alapú
- kulcspontok:
  - Kisapáti
  - Badacsony
  - Keszthely
  - Köveskál

### Layout:
- desktop: 2 oszlop
- mobil: stacked

---

## 7. WHY BLOKK

- természetközeli
- csend
- minőség
- családbarát

---

## 8. FOGLALÁS BLOKK

- SabeeApp integráció
- dátum választás
- CTA: foglalás / ár ellenőrzés

---

## 9. BLOG

- kirándulás
- környék
- SEO tartalom

---

## 10. ZÁRÓ CTA

- foglalás ösztönzés
- bizalom

---

## 11. FOOTER

- kapcsolat
- email
- telefon
- jogi

---

## 12. NAVIGÁCIÓ

- Szállások → #stays
- Élmények → #elmenyek

---

## TILOS

- más anchor
- JS scroll hack

---

## 13. TYPOGRAPHY

---

### BODY / UI FONT

Poppins

---

### HERO FONT

Playfair Display

---

### FONT SZABÁLY

| Elem | Font |
|------|------|
| Hero | Playfair |
| Minden más | Poppins |

---

## TILOS

- több mint 2 font
- random font használat

---

## HERO BEÁLLÍTÁS

- letter-spacing: 0.15–0.25em
- line-height: ~1.1
- weight: 500–600

---

## Poppins súlyok

- body: 400  
- menu: 600  
- heading: 700  

---

## 14. SZÍNEK

---

### PRIMARY

#D99E2B

---

### TEXT

#000000

---

### BACKGROUND

#FDFBF7

---

## HASZNÁLAT

### #D99E2B
- CTA
- hover
- kiemelés

---

## TILOS

- kék UI
- neon színek
- gradient

---

## 15. UI SZABÁLYOK

---

### Border radius

5px vagy 8px

---

### Gomb

- vékony keret
- letisztult
- elegáns

---

### Árnyék

- minimális vagy nincs

---

## TILOS

- material design
- glassmorphism
- erős shadow

---

## 16. HEADER

---

### Desktop

- HERO felett: transparent
- scroll után: színes

---

### Tablet

- nincs hamburger

---

### Mobil

- hamburger OK

---

### LOGÓ

- fix
- nem animál

---

## TILOS

- header redesign
- logó animáció

---

## 17. UX ELV

---

- nagy képek
- kevés szöveg
- tiszta struktúra
- storytelling

---

## TILOS

- zsúfolt layout
- túl sok információ
- tech UI

---

## 18. LAKÁSOLDALAK / APARTMENT PAGES

---

A lakásoldalak fejlesztése nem történhet kézi másolgatással minden új lakásnál.

Kötelező elv:
- minden lakásoldal apartmentKey-alapú legyen
- a közös logika újrahasznosítható legyen
- a Hero desktop / Hero mobile kép a WordPress image-admin REST configból jöjjön
- a galéria képei szintén apartmentKey alapján jöjjenek
- lakásonként csak az apartmentKey, szöveg, adatok és fallback képek térhetnek el

Példa:

dandelion-d2.astro → apartmentKey: "d2"  
dandelion-d1.astro → apartmentKey: "d1"  
dandelion-figehaz.astro → apartmentKey: "figehaz"  
dandelion-zsalya.astro → apartmentKey: "zsalya"  

A REST hívás kulcs alapján történjen:

/wp-json/dandelion/v1/apartment-image-config/{apartmentKey}

---

## TILOS

- minden lakásoldalhoz külön hero logikát írni
- fixen d2-re kötött logikát más oldalakra másolni
- új REST endpointot létrehozni lakásonként
- gallery vagy hero logikát lakásonként külön szétágaztatni
- 9 új lakásoldalt kézzel, sablonosítás nélkül lemásolni

---

## 19. VÉGSŐ SZABÁLY

---

A design nem változtatható.

A Codex:
- nem tervez
- nem optimalizál UX-et
- nem talál ki új megoldást

Csak:
→ a meglévő rendszert építi tovább
```

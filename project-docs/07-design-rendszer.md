# 07 – DESIGN RENDSZER

# Státusz: VÉGLEGES
# Utolsó módosítás: 2026-05-18

## Cél
Egységes vizuális és UI szabályrendszer rögzítése.

A cél:
👉 konzisztens megjelenés  
👉 gyors fejlesztés  
👉 AI ne tudja szétverni a dizájnt  

---

## 1. Alapelv

Nem “szép oldal” a cél.

👉 hanem **konzisztens, tiszta, konverzióra optimalizált UI**

---

## 2. Tipográfia

### Betűtípus
- Poppins (globálisan)
- Playfair Display csak display / hero / editorial headline szerepre
- Georgia / Times New Roman csak fallback lehet a Playfair mögött

### Súlyok
- H1, H2 → 700 Poppins esetén
- Playfair headline → 400-600
- Menü → 600
- Szöveg → 400

---

## 3. Színek

### Alapszínek
- Szöveg: #000000
- Háttér: #FDFBF7

### Kiemelő (brand)
- #D99E2B

### Segéd
- vonalak: #EEEEEE

---

## 4. Layout szabályok

### Konténer
- max szélesség: fix (később definiáljuk)
- középre igazított

### Margók
- nagyobb légzés
- nincs zsúfoltság

---

## 5. Gombok

### Elsődleges (Foglalás)
- szín: #D99E2B
- kiemelt (shadow)
- jól látható mindenhol

### Másodlagos
- visszafogottabb
- nem konkurál a foglalással

---

## 6. Képek

### Elv
- nagy, minőségi képek
- élmény alapú vizuál

### Használat
- hero → erős vizuál
- galéria → sok kép
- kártyák → kivonatolt kép

---

## 7. Lekerekítések

- 5px vagy 8px
- egységes mindenhol

---

## 8. Árnyékok

- csak fontos elemeknél
- pl. CTA gomb

---

## 9. Header

### Desktop
- sticky
- logó fix
- nincs animáció

### Tablet
- NINCS hamburger (768px felett)
- szöveges menü

### Mobil
- hamburger menü
- sticky CTA

---

## 10. Mobil prioritás

A design:
👉 mobile-first

Minden elemnél:
- mobil verzió az első
- desktop csak utána

---

## 11. UI komponens elvek

### 11.1. Egyszerűség
- nincs túltervezés
- nincs felesleges animáció

---

### 11.2. Ismételhetőség
- minden UI elem újrahasznosítható

---

### 11.3. Konzisztencia
- ugyanaz a blokk ugyanúgy néz ki mindenhol

---

## 12. Tiltások

❌ többféle gomb stílus  
❌ többféle spacing logika  
❌ túl sok szín  
❌ animációk túlhasználata  
❌ random layout eltérések  

---

## 13. AI szabályok

- nem hozhat létre új stílust
- nem változtathatja meg a színrendszert
- nem módosíthat tipográfiát
- csak meglévő komponenseket használhat

---

## 14. Döntés

A honlap design rendszere a fenti szabályok szerint épül fel.

Ez kötelező minden UI elemre és fejlesztésre.

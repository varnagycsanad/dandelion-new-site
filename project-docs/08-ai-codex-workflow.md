# 08 – AI / CODEX WORKFLOW

# Státusz: VÉGLEGES
# Utolsó módosítás: 2026-04-12

## Cél
Az AI (Codex) használatának szabályozása:
- hogyan adunk feladatot
- mit módosíthat
- hogyan biztosítjuk a stabil fejlesztést

---

## 1. Alapelv

Az AI nem “szabad fejlesztő”.

👉 hanem **szabályok mentén dolgozó eszköz**

---

## 2. Munkamódszer

### 2.1. Egy feladat = egy változtatás

❌ Tilos:
- teljes oldal újraírása
- több logikai módosítás egyszerre

✔️ Kötelező:
- kis, célzott módosítások

---

### 2.2. Egy fájl = egy felelősség

AI csak azt a fájlt módosíthatja:
- ami a feladathoz tartozik

---

### 2.3. Nem nyúlhat mindenhez

AI csak ezekhez nyúlhat:
- pages/
- sections/
- components/
- content/

❌ Nem nyúlhat:
- design alapokhoz
- globális szabályokhoz
- project-docs fájlokhoz (kivéve explicit kérés)

---

## 3. Kötelező input AI felé

Minden feladatnál meg kell adni:

1. cél
2. érintett fájl
3. elvárt eredmény
4. korlátozások

---

### Példa

„Hozz létre egy új szállásoldalt a D3-hoz.
Használd a meglévő szállás template-et.
Ne módosítsd a komponenseket.
Csak a content fájlt és a page fájlt hozd létre.”

---

## 4. Kötelező ellenőrzés

Minden AI output után:

### 4.1. Strukturális ellenőrzés
- megfelel a blokk-mátrixnak?

### 4.2. Design ellenőrzés
- nem tört el a UI?

### 4.3. CTA ellenőrzés
- van foglalási lehetőség?

### 4.4. SEO ellenőrzés
- van title / description?

---

## 5. Verziókezelés

### Kötelező:

- minden módosítás commit
- rövid commit message

---

### Commit példa

- feat: új D3 szállás oldal
- fix: CTA hiány a blog cikk végén
- refactor: hero section optimalizálás

---

## 6. Branch stratégia (egyszerű)

- main → stabil verzió
- dev → fejlesztés

---

## 7. Hibakezelés

### Ha AI elront valamit:

1. nem javítgatjuk össze-vissza
2. visszaállítás (git)
3. új, tiszta feladat

---

## 8. Tiltások

❌ AI-ra bízni a teljes projektet  
❌ egyszerre nagy változtatások  
❌ dokumentáció megkerülése  
❌ “csináld meg jobban” típusú homályos prompt  

---

## 9. Kötelező projekt hivatkozások

AI minden feladatnál figyelembe veszi:

- 01 – Oldaltérkép
- 02 – Blokk-mátrix
- 03 – Tartalommodell
- 04 – Navigáció
- 05 – SEO
- 06 – CTA logika
- 07 – Design rendszer

---

## 10. Döntés

Az AI fejlesztés a fenti workflow szerint történik.

Ez kötelező minden fejlesztési feladatra.
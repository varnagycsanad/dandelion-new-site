# 02 – OLDALTÍPUSOK ÉS BLOKK-MÁTRIX

Status: TORTENETI
Last checked: 2026-06-02
Use for: eredeti oldaltipus- es blokklogika kontextus
Do not use for: aktualis komponens/blokk inventory helyettesitesere


# Státusz: VÉGLEGES

# Utolsó módosítás: 2026-04-12

## Cél

Egységes szabályrendszer rögzítése: melyik oldaltípus milyen blokkokból épül fel.
Ez biztosítja, hogy az AI (Codex) konzisztensen és helyesen építse az oldalakat.

---

## 1. Blokkok (kanonikus lista)

* top_bar (felső kontakt csík)
* header (fő navigáció)
* hero (fő vizuál + üzenet)
* booking_cta (közvetlen foglalás blokk)
* usp (miért jó / kinek való)
* features (felszereltség / jellemzők)
* gallery (képgaléria)
* location (környék / elhelyezkedés)
* reviews (vélemények)
* newsletter (hírlevél)
* blog_grid (cikklista)
* blog_content (cikk tartalom)
* category_filter (kategória szűrő)
* contact_block (kapcsolati blokk)
* legal_text (jogi szöveg)
* footer (lábléc)

---

## 2. Oldaltípusok

1. Főoldal
2. Szállásoldal
3. Szállások gyűjtőoldal
4. Blog főoldal
5. Blog cikkoldal
6. SEO landing oldal
7. Kapcsolat oldal
8. Jogi oldal

---

## 3. Blokk-mátrix

### 3.1. Főoldal

Kötelező:

* top_bar
* header
* hero
* booking_cta
* usp
* features (szálláslista/kártyák formájában)
* reviews
* footer

Opcionális:

* gallery
* newsletter
* location

Tiltott:

* legal_text (nem ide való hosszú jogi tartalom)

---

### 3.2. Szállásoldal

Kötelező:

* top_bar
* header
* hero
* booking_cta
* usp
* features
* gallery
* location
* footer

Erősen ajánlott:

* reviews

Opcionális:

* faq (később külön blokk lehet)

Tiltott:

* newsletter (nem konverzió fókuszú ezen az oldalon)

---

### 3.3. Szállások gyűjtőoldal

Kötelező:

* top_bar
* header
* hero
* features (kártya lista)
* footer

Opcionális:

* booking_cta
* location

---

### 3.4. Blog főoldal

Kötelező:

* header
* hero
* category_filter
* blog_grid
* footer

Opcionális:

* newsletter

Tiltott:

* booking_cta (nem elsődleges cél itt)

---

### 3.5. Blog cikkoldal

Kötelező:

* header
* blog_content
* footer

Erősen ajánlott:

* booking_cta (cikk végén)

Opcionális:

* related_posts (később)

---

### 3.6. SEO landing oldal

Kötelező:

* header
* hero
* usp
* booking_cta
* footer

Erősen ajánlott:

* features
* reviews

Opcionális:

* gallery

Tiltott:

* category_filter

---

### 3.7. Kapcsolat oldal

Kötelező:

* header
* contact_block
* footer

Opcionális:

* booking_cta

---

### 3.8. Jogi oldal

Kötelező:

* header
* legal_text
* footer

Opcionális:

* booking_cta (rövid formában a tetején vagy végén)

---

## 4. Globális szabályok

### 4.1. Header és footer minden oldalon kötelező

Nincs kivétel.

### 4.2. Konverziós logika

* Szállásoldal = mindig van booking_cta
* Blog cikk = a végén van CTA
* Landing oldal = erős CTA fókusz

### 4.3. Blokkok nem keverhetők szabadon

Csak a mátrix szerint használhatók.

### 4.4. Egy blokk = egy felelősség

Nem kombinálunk több funkciót egy blokkban.

---

## 5. Döntés

Az oldalak felépítése a fenti blokk-mátrix szerint történik.
Ez kötelező szabály az AI és manuális fejlesztés számára is.

Eltérés csak külön döntéssel engedélyezett.

# 03 – TARTALOMMODELL

Status: TORTENETI
Last checked: 2026-06-02
Use for: eredeti tartalommodell es mezogondolkodas kontextus
Do not use for: jelenlegi adatfajlok pontos semajakent


# Státusz: VÉGLEGES
# Utolsó módosítás: 2026-04-12

## Cél
Az új honlap tartalmi adatstruktúrájának rögzítése.
Ez határozza meg, hogy az egyes oldaltípusokhoz milyen mezők tartoznak, és milyen adatokat kell tárolni.

---

## 1. Tartalomelv

A tartalom nem a layout része.
A tartalom külön adatként van kezelve, és a frontend ezt rendereli.

Ezért minden fő oldaltípushoz külön tartalommodell tartozik.

---

## 2. Fő tartalomtípusok

1. Szállás
2. Blogcikk
3. SEO landing oldal
4. Globális adatok
5. Jogi oldalak

---

## 3. Szállás tartalommodell

### 3.1. Azonosító mezők
- id
- slug
- status
- name
- short_name

### 3.2. Alap információk
- title
- subtitle
- short_description
- full_description
- accommodation_type
- max_guests
- bedrooms
- bathrooms
- beds

### 3.3. Lokáció
- location_name
- settlement
- region
- country
- coordinates
- map_link
- location_description

### 3.4. Foglalási adatok
- sabeeapp_url
- booking_label
- booking_note
- direct_booking_benefit
- check_in
- check_out
- deposit_policy
- cancellation_policy
- cleaning_fee
- tourist_tax

### 3.5. Kiemelt előnyök
- usp_title
- usp_intro
- usp_items[]

### 3.6. Felszereltség / jellemzők
- feature_groups[]
  - group_name
  - items[]

### 3.7. Galéria
- cover_image
- gallery_images[]
- gallery_alt_prefix

### 3.8. Környék / élmény
- nearby_highlights[]
- location_selling_points[]
- recommended_activities[]

### 3.9. Social proof
- review_highlights[]
- rating_value
- rating_count

### 3.10. SEO
- seo_title
- seo_description
- canonical_url
- og_title
- og_description
- og_image
- focus_keyword
- related_keywords[]

### 3.11. Technikai / publikációs mezők
- published
- updated_at
- language_versions[]
- internal_notes

---

## 4. Blogcikk tartalommodell

### 4.1. Azonosító mezők
- id
- slug
- status
- title

### 4.2. Tartalmi mezők
- excerpt
- intro
- body
- conclusion
- author
- publish_date
- updated_at

### 4.3. Kategorizálás
- category
- tags[]
- related_accommodations[]

### 4.4. Média
- featured_image
- featured_image_alt
- gallery_images[]

### 4.5. CTA
- cta_title
- cta_text
- cta_target
- cta_label

### 4.6. SEO
- seo_title
- seo_description
- canonical_url
- og_title
- og_description
- og_image
- focus_keyword
- related_keywords[]

---

## 5. SEO landing oldal tartalommodell

### 5.1. Azonosító mezők
- id
- slug
- status
- title

### 5.2. Tartalmi mezők
- hero_title
- hero_subtitle
- intro
- body_sections[]
- summary
- faq_items[]

### 5.3. Konverziós mezők
- cta_title
- cta_text
- cta_label
- cta_target
- highlighted_accommodations[]

### 5.4. SEO
- seo_title
- seo_description
- canonical_url
- og_title
- og_description
- og_image
- focus_keyword
- related_keywords[]

---

## 6. Globális adatok modellje

### 6.1. Márka / cég
- brand_name
- company_name
- tax_number
- email
- phone
- whatsapp
- address

### 6.2. Közösségi linkek
- facebook_url
- instagram_url
- youtube_url
- tiktok_url

### 6.3. Foglalási alapadatok
- default_booking_label
- default_deposit_policy
- default_cancellation_policy
- default_check_in
- default_check_out
- default_tourist_tax_note

### 6.4. SEO / sitewide
- site_name
- site_url
- default_seo_title
- default_seo_description
- default_og_image

### 6.5. Jogi linkek
- privacy_url
- terms_url
- booking_terms_url

---

## 7. Jogi oldalak tartalommodellje

### 7.1. Azonosító mezők
- id
- slug
- status
- title

### 7.2. Tartalom
- intro
- body
- updated_at

### 7.3. Opcionális CTA
- cta_title
- cta_text
- cta_label
- cta_target

---

## 8. Kötelező tartalmi elvek

### 8.1. Minden tartalomnak legyen egyedi slugja
Nincs duplikált URL-logika.

### 8.2. Minden fontos oldalnak legyen SEO blokkja
Nincs SEO nélküli publikus főoldal vagy szállásoldal.

### 8.3. A CTA külön mezőcsoport legyen
Nem keménykódolt szöveg a layoutban.

### 8.4. A galéria külön adat, nem beégetett HTML
A képek adatként vannak kezelve.

### 8.5. A szállásoldal a legerősebb tartalomtípus
Ez kapja a leggazdagabb mezőkészletet.

---

## 9. Döntés

Az új honlap tartalmi struktúrája a fenti tartalommodell szerint épül fel.
Ez lesz az alapja a későbbi JSON / Markdown / adatfájloknak és az AI-alapú szerkesztésnek.
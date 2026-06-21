# E-mail lista kezelo es feliratkozo modul - MVP terv

Status: AKTUALIS
Last checked: 2026-06-21
Use for: nyomonkovetheto megvalositas, progress log, MVP scope, dontesi pontok
Do not use for: vegleges architektura-koto rögzítése tovabbi egyeztetes nelkul

## Cel

Ez a dokumentum a Dandelion sajat, szolgaltato-fuggetlen e-mail lista kezelo es feliratkozo moduljanak MVP tervfaja.

A cel nem az, hogy azonnal teljes marketing automatizmus keszuljon, hanem hogy legyen:

- sajat feliratkozo adatgyujtes
- sajat lista tarolas
- sajat leiratkozas
- sajat alap admin felulet
- sajat kampanykuldesi alap

## MVP definicio

Az MVP a legkisebb mukodo verzio, amely mar valos uzleti erteket ad.

Ezen a projekten az MVP azt jelenti, hogy a rendszer mar:

- fogad feliratkozasokat
- tarolja a feliratkozo adatokat
- kezeli a hozzajarulast
- biztosit leiratkozast
- tud egyszeru kampanyt kuldeni egy sajat SMTP kapcsolaton keresztul

Nem kell az MVP-be:

- drag-and-drop szerkeszto
- fejlett automatizmusok
- komplex szegmentacio
- A/B teszt
- nyilt tracking dashboard

## Javasolt irany

- Frontend: a jelenlegi Astro site marad
- Backend: kulon, sajat newsletter service
- Adatbazis: PostgreSQL vagy kompatibilis relacios adatbazis
- Kuldes: sajat SMTP / relay
- Admin: belso, vedett felulet

Megjegyzes:

- A frontend statikus maradhat.
- A lista- es kampanylogika kulon service-be kerul.
- A MailerLite / hasonlo lock-in elkerulheto.

## MVP scope

### 1. Feliratkozo űrlap

- nev mező
- e-mail mező
- hozzajarulasi checkbox
- sikeres / sikertelen visszajelzes
- duplikalt email kezelese

### 2. Subscriber tarolas

- email
- nev
- nyelv
- forras oldal
- feliratkozas ideje
- statusz: `pending`, `active`, `unsubscribed`

### 3. Leiratkozas

- egyedi unsubscribe link minden levelben
- azonnali statuszvaltás
- confirmation oldal

### 4. Admin lista

- feliratkozo lista megjelenitese
- keresés es szures
- CSV export
- manualis statuszkezeles

### 5. Egyszeru kampanykuldes

- kampany targy
- kampany tartalom
- cimzett szegmens
- tesztkuldes
- azonnali vagy idozitett kuldes

## Nem cel az elso korben

- teljes CRM
- fejlett marketing automation
- visual editor
- komplex riporting
- third-party vendor integracio

## Javasolt technikai felosztas

### Frontend

- Astro feliratkozo komponens
- kliens oldali form validacio
- API hivas a sajat backendhez

### Backend

- Node.js API service
- REST vagy egyszeru JSON endpointok
- auth a vedett admin funkciokhoz

### Adatmodell v1

- `subscribers`
- `subscriber_consents`
- `campaigns`
- `campaign_recipients`
- `send_log`
- `unsubscribe_tokens`

## Megvalositas fázisai

### Faza 1 - Alap feliratkozas

Cel:

- form mukodik
- adatbazisba iras mukodik
- alap validacio mukodik

Kimenet:

- feliratkozo adat mentese
- egyszeru API endpoint

### Faza 2 - Jogias es megfelelosegi alapok

Cel:

- consent naplo
- unsubscribe
- audit trail

Kimenet:

- visszakeresheto hozzajarulas
- biztonsagos leiratkozas

### Faza 3 - Admin lista

Cel:

- kezelo felulet
- search/filter/export

Kimenet:

- operatori munka tamogatasa

### Faza 4 - Kampanykuldes

Cel:

- alap kampany letrehozas es kuldes

Kimenet:

- tesztlevel
- celzott kikuldes

### Faza 5 - Stabilizalas

Cel:

- logolas
- hibakezeles
- deliverability alapok

Kimenet:

- megbizhato uzem

## Progress log

| Date | Step | Status | Note |
| --- | --- | --- | --- |
| 2026-06-21 | Plan created | done | Ez a nyomonkovetheto MVP tervfajl letrejott. |
| 2026-06-21 | Phase 1: signup API | done | Elkészült a saját Astro feliratkozo form és a Node.js service scaffold JSON tarolassal. |
| 2026-06-21 | Phase 2: consent + unsubscribe | done | A form hozzajarulast kezel, a service leiratkozas tokeneket es statuszt is kezel. |
| 2026-06-21 | Phase 3: admin list | done | Elkészült az `admin/hirlevel` listaoldal kereséssel, státusz- és nyelvszűrővel, CSV exporttal és másolás gyorsművelettel. |
| 2026-06-21 | Phase 4: campaign send | done | Elkészült az `admin/kampanyok` kampányszerkesztő, a tesztküldés és az éles SMTP kiküldés. |
| 2026-06-21 | Phase 5: CSV import and hardening | in progress | Elkészült a feliratkozó CSV import az admin listán, a védelem és a stabilizálás finomhangolása még nyitott. |
| TBD | Phase 5 follow-up: production QA | pending | Vegigteszteles, naplozas, deliverability rehearsal, uzemi simitas. |

## Definition of done for MVP

Az MVP kesz, ha a rendszer az alabbiakat teljesiti:

- feliratkozast fogad
- az adatokat biztonsagosan tarolja
- leiratkozas mukodik
- adminban lathato a lista
- legalabb egy egyszeru kampany el tud menni sajat SMTP-n keresztul

## Nyitott dontesi pontok

1. Egyetlen sajat service legyen-e, vagy kulon admin es kulon public API?
2. Kell-e az elso verziohoz double opt-in?
3. Mi legyen az ajanlott SMTP megoldas a kesobbi uzemelteteshez?
4. Kell-e rogton nyelvi szegmenszes, vagy eleg a forras oldal alapjan tageles?

## Kapcsolodo doksik

- `project-docs/INDEX.md`
- `project-docs/ELO_FELADATLISTA.md`
- `src/sections/NewsletterSignup.astro`
- `src/pages/en/privacy-policy.astro`
- `src/pages/cs/ochrana-osobnich-udaju.astro`

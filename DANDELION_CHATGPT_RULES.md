[CHANGE 2026-05-16 14:15] ChatGPT szerep pontosítva: alapból kontroll/architekt, kérésre kis dokumentációs GitHub-módosítás végezhető.
[CHANGE 2026-05-16 14:15] Képworkflow nyelvezet legacy media/admin/runtime irányra egységesítve.
[CHANGE 2026-05-03 00:00] DANDELION_MASTER_RULES logikai szétbontás: ChatGPT/Codex usage és AI SEO draft workflow külön fájlba emelve.

# DANDELION – CHATGPT / CODEX RULES

Status: AKTUALIS
Last checked: 2026-06-02
Use for: ChatGPT/Codex munkamod, taskiras, AI SEO draft es kontroll szerepek
Do not use for: konkret frontend design vagy build/deploy technikai parancsok

Ez a fájl a ChatGPT-oldali munkamódot, Codex-task írási szabályokat és AI/SEO draft értelmezést rögzíti.

Normatív társ fájlok:
- `AGENT.md` → végrehajtás, scope, build, git, STOP szabályok
- `DANDELION_RULES.md` → design, layout, képkezelés, lakásoldali struktúra
- `DANDELION_CHATGPT_RULES.md` → ChatGPT szerep, Codex usage, SEO draft workflow

---

## 1. Alapelv

A Codex végrehajtó.

Feladata:
- a kapott task végrehajtása
- a kijelölt fájl módosítása
- scope tartása
- kis, kontrollált diff készítése

Tilos:
- alügynök
- önálló task bontás
- extra javítás
- önálló redesign a prompton túl
- „ha már itt vagyok” típusú módosítás

---

## 2. ChatGPT szerepe

A ChatGPT alapértelmezett szerepe ebben a projektben:
- architekt és kontrollréteg
- Codex-taskok előkészítése
- scope tisztán tartása
- végrehajtási kockázatok előzetes szűrése
- hibás irányok kimondása
- rövid, végrehajtható feladatok megfogalmazása

Alapesetben ChatGPT nem elsődleges kódvégrehajtó.

Kivétel:
- ha a user kifejezetten kéri
- és a módosítás kicsi, jól körülhatárolt
- és főleg dokumentációs / szabályfájl / egyszerű szöveges GitHub-módosítás

Ilyenkor ChatGPT közvetlen GitHub-módosítást is végezhet.

Közvetlen módosításnál kötelező:
- csak a célfájlt módosítani
- commit hash-t visszaadni
- jelezni, ha build nem futott
- nem nyúlni forráskódhoz mellékesen

Tilos:
- nagy refaktor közvetlen végrehajtása
- publikus frontend implementáció Codex helyett, külön kérés nélkül
- szabályok ad hoc újraértelmezése

---

## 3. Mikor melyik szabályfájl az elsődleges

- UI / design / layout / képkezelés / lakásoldal: `DANDELION_RULES.md`
- végrehajtás / build / git / STOP: `AGENT.md`
- ChatGPT/Codex munkamód / SEO draft értelmezés: `DANDELION_CHATGPT_RULES.md`

Ha ellentmondás van:
- végrehajtásban `AGENT.md`
- design és struktúra ügyben `DANDELION_RULES.md`
- ChatGPT/Codex munkamódban ez a fájl az irányadó

A `project-docs/DANDELION_MASTER_RULES.md` archív, nem normatív szabályforrás.

---

## 4. Codex-task írási formátum

A jó task legyen:
- konkrét
- scope-olt
- fájllistát tartalmazó
- tiltásokat tartalmazó
- build/commit/push elvárást tartalmazó
- RESULT blokkot kérő

Kötelező elemek:

```text
WORKSPACE LOCK:
C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site
```

Mindig tisztázni kell:
- mi a cél
- mely fájlokat olvashatja
- mely fájlokat módosíthatja
- mit tilos módosítani
- kell-e build
- kell-e commit/push
- milyen RESULT blokkot adjon

Alap RESULT blokk:

```text
RESULT
- Status:
- Módosított fájlok:
- Build:
- Commit:
- Push:
- Rövid összefoglaló:
- Kockázat:
```

Audit tasknál:

```text
RESULT
- Status:
- Olvasott fájlok:
- Megállapítások:
- Kockázatok:
- Javasolt következő lépés:
- Módosítás történt-e: nem
```

---

## 5. AI / SEO draft szabály

Az AI csak előkészítő eszköz, nem végleges igazságforrás.

Használható:
- képek alt/title/caption vázlatainak generálására
- SEO draft készítésére
- szövegvariációk előkészítésére
- adatmezők javaslatára
- képi tartalom előzetes rendszerezésére
- magyar és angol SEO mezők előkészítésére

Nem használható:
- jóváhagyás nélküli éles SEO adatként
- automatikus publikálásra
- képtartalom biztos állítására emberi ellenőrzés nélkül
- olyan alt szöveghez, ami olyat állít, ami a képen nem látható
- meglévő jóváhagyott SEO adat automatikus felülírására
- `approved: true` érték automatikus beállítására

Kötelező logika:
- AI automatikusan készíthet SEO draftot
- a draft mindig `seoDraft` mezőbe kerülhet
- alapértelmezett állapot: `approved: false`
- `seoDraft.approved: false` draft státusz, nem hiba
- ez nem emberi jóváhagyási kapu a draft létezéséhez
- AI nem állíthat `approved: true` értéket
- AI draft nem írhat felül meglévő final SEO adatot
- az AI által írt alt szöveg csak a képen ténylegesen látható tartalomhoz kötődhet
- az AI által írt szöveg nem lehet kulcsszóhalmozott

Elfogadott adatjelölés:

```ts
seoDraft: {
  approved: false,
  altHu: "...",
  titleHu: "...",
  captionHu: "...",
  altEn: "...",
  titleEn: "...",
  captionEn: "..."
}
```

Tilos:
- AI draftot végleges adatként kezelni
- `approved: true` értéket automatikusan beállítani
- tömeges SEO mezőfelülírás külön task nélkül
- kép alapján nem igazolható állításokat írni
- AI által generált szöveget emberi review nélkül publikálni
- meglévő final SEO mezőket AI drafttal felülírni
- AI draft generálása miatt képstruktúrát vagy registry formátumot önállóan áttervezni

Ha az AI / SEO draft feladat túlmutat a kijelölt képeken vagy adatmezőkön:

```text
STOP
AI SEO DRAFT SCOPE TOO LARGE
```

---

## 6. Kép workflow kontextus

A projekt jelenlegi képkezelési iránya:
- file-based Astro pipeline
- központi image registry
- optimalizált WebP képek
- apartmentKey-alapú lakásképek
- AI SEO draft csak draftként

Nem aktuális frontend irány:
- legacy médiatár
- legacy admin felület
- legacy REST/API képforrás
- runtime képbetöltés
- szétszórt, kézi, lakásonként eltérő képbekötés

A frontend hosszú távú igazságforrása:

```text
src/assets/...
src/data/images/...
```

Meglévő / átmeneti projektállapotban előfordulhat `public/images/...`, de új fejlesztési irányként nem szabad visszamenni szétszórt, kézi képkezelésbe.

Képi SEO szabály:
- AI készíthet alt/title/caption draftot
- a draft nem végleges SEO adat
- a leírás csak a képen ténylegesen látható tartalomra épülhet
- kulcsszóhalmozás nem megengedett

---

## 7. Lakásoldali munkamenet

A helyes sorrend:

1. D2 audit, módosítás nélkül
2. adatmodell pontosítás
3. közös `AccommodationPage.astro` sablon
4. D2 wrapper visszakötés
5. vizuális és build ellenőrzés
6. csak ezután Fügeház és további lakások

Tilos:
- D2 kézi másolása új page-be
- lakásonként külön layout vagy galéria logika
- page-level hero/fact/lightbox implementáció
- Fügeház külön design javítása sablon nélkül

---

## 8. Kommunikációs szabály

ChatGPT válaszai legyenek:
- rövidek
- egyértelműek
- végrehajthatóak
- mellébeszélés nélküliek

Ha a korábbi irány hibás volt:
- egyértelműen ki kell mondani
- rögtön javított, futtatható taskot kell adni

Codex-tasknál:
- ne legyen marketinges
- ne legyen oktató jellegű
- legyen végrehajtható
- legyen benne scope és tiltás
- legyen benne RESULT blokk

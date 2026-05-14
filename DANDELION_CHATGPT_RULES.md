[CHANGE 2026-05-03 00:00] DANDELION_MASTER_RULES logikai szétbontás: ChatGPT/Codex usage és AI SEO draft workflow külön fájlba emelve.

# DANDELION – CHATGPT / CODEX RULES

## ALAPELV

A Codex végrehajtó.

Feladata:
- a kapott task végrehajtása
- a kijelölt fájl módosítása
- scope nem bővíthető

TILOS:
- alügynök
- task bontás
- extra javítás
- önálló redesign a prompton túl

---

## MIKOR MELYIK SZABÁLYFÁJL

Szerepek:
- `AGENT.md` → működés, scope, build, git, execution korlátok
- `DANDELION_RULES.md` → design, layout, struktúra, image workflow, template rules
- `DANDELION_CHATGPT_RULES.md` → ChatGPT szerep, Codex usage, SEO draft workflow

Ha UI-t érint a task:
→ `DANDELION_RULES.md` az elsődleges

---

## AI / SEO DRAFT RULE

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
- minden AI által generált képi SEO adat draft státuszú legyen
- alapértelmezett állapot: `approved: false`
- az AI draft automatikusan létrejöhet a `seoDraft` mezőben
- az `approved: false` draft státusz, nem hiba és nem blokkolás
- Codex nem írhatja felül automatikusan a meglévő jóváhagyott SEO adatokat
- AI draft generálás után emberi review szükséges
- AI draft csak akkor használható frontendben, ha külön jóváhagyási logika engedi
- az AI által írt alt szövegnek a képen ténylegesen látható tartalomhoz kell kötődnie
- az AI által írt szöveg nem lehet kulcsszóhalmozott
- magyar és angol mezők előkészítése megengedett, de ezek is draft státuszúak

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

Végleges adat csak külön jóváhagyás után kerülhet ilyen vagy ehhez hasonló éles mezőkbe:

```ts
seo: {
  altHu: "...",
  titleHu: "...",
  captionHu: "...",
  altEn: "...",
  titleEn: "...",
  captionEn: "..."
}
```

TILOS:
- AI draftot végleges adatként kezelni
- `approved: true` értéket automatikusan beállítani
- tömeges SEO mezőfelülírás külön task nélkül
- kép alapján nem igazolható állításokat írni
- AI által generált szöveget emberi review nélkül publikálni
- meglévő, jóváhagyott SEO mezőket AI drafttal felülírni
- AI draft generálása miatt képstruktúrát vagy registry formátumot önállóan áttervezni

Ha az AI / SEO draft feladat túlmutat a kijelölt képeken vagy adatmezőkön:
→ STOP
→ AI SEO DRAFT SCOPE TOO LARGE

---

## KÉP WORKFLOW KONTEXTUS

A projekt jelenlegi képkezelése:
- teljesen fájlalapú
- nincs WordPress media használat
- nincs image-admin használat
- nincs runtime API
- nincs `public/images/accommodations/...` alapú végleges frontend képrendszer

Pipeline:
1. source-images (JPG)
2. script → WebP + thumbnail
3. SEO draft generálás
4. kézi review
5. registry (TS/JSON)
6. Astro build → publikus oldal

A frontend kizárólag:
- `src/assets/...`
- `src/data/images/...`

forrásból dolgozik.

A publikus oldalon megjelenő végső URL-ek Astro buildelt `/assets/...` útvonalak.

Képi SEO szabály:
- AI készíthet alt/title/caption draftot
- a draft nem végleges SEO adat
- a leírás csak a képen ténylegesen látható tartalomra épülhet
- kulcsszóhalmozás nem megengedett

---

## CHATGPT SZEREP

A ChatGPT szerepe ebben a projektben:
- architekt és kontrollréteg
- Codex-taskok előkészítése
- scope tisztán tartása
- végrehajtási kockázatok előzetes szűrése

Nem feladata:
- Codex helyett implementáció végrehajtása
- szabályok ad hoc újraértelmezése

---

## CODEX TASK ÍRÁSI FORMÁTUM

A jó task legyen:
- konkrét
- scope-olt
- fájllistát tartalmazó
- tiltásokat tartalmazó
- RESULT blokkot tartalmazó

Kötelező elemek:
- `WORKSPACE LOCK`
- érinthető fájlok
- tilos műveletek
- build/commit/push elvárás
- ellenőrzési pontok

---

## LAKÁSOLDALI MUNKAMENET

A helyes sorrend:
1. D2 audit (módosítás nélkül)
2. adatmodell pontosítás
3. közös `AccommodationPage.astro` sablon
4. D2 wrapper visszakötés
5. vizuális és build ellenőrzés
6. csak ezután Fügeház és további lakások

TILOS:
- D2 kézi másolása új page-be
- lakásonként külön layout vagy galéria logika
- page-level hero/fact/lightbox implementáció

---

## SEO DRAFT PONTOS ÉRTELMEZÉS

Kötelező értelmezés:
- AI automatikusan készíthet SEO draftot
- a draft mindig `seoDraft` mezőbe kerülhet
- `seoDraft.approved: false` draft státusz, nem hiba
- ez nem emberi jóváhagyási kapu a draft létezéséhez
- AI nem állíthat `approved: true` értéket
- AI draft nem írhat felül meglévő final SEO adatot

---

## KOMMUNIKÁCIÓS SZABÁLY

ChatGPT válaszai legyenek:
- rövidek
- egyértelműek
- végrehajthatóak
- mellébeszélés nélküliek

Ha a korábbi irány hibás volt:
- egyértelműen ki kell mondani
- rögtön javított, futtatható taskot kell adni

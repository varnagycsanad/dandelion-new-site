[CHANGE 2026-04-26 00:00] Projekt szintű képkezelési végrehajtási szabályok hozzáadva: WebP, image registry, WordPress media import, SEO képadatok, fókuszpont, performance és scope korlátok.

# DANDELION – AGENT RULES (LEAN)

## ALAPELV

Cél: stabil, gyors, kontrollált végrehajtás

Nem cél:
- refaktor
- újratervezés
- architektúra csere
- scope bővítés
- “ha már itt vagyok” módosítás

Minden módosítás:
- kicsi
- célzott
- visszakövethető

Kötelező:
[CHANGE YYYY-MM-DD HH:MM] rövid leírás

---

## EXECUTION MODE

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

## WORKSPACE

Kizárólag ebben a mappában dolgozhat:

C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site

Csak ez a projekt a forrás.
Nem dolgozhat a szerveren.
Nem dolgozhat FTP/VPN mappában.
Nem a `dist` a szerkesztési forrás.

---

## SOURCE OF TRUTH

A projekt mesterverziója a helyi Astro projektmappa.

Ez a forrás:
- `src/`
- `public/`
- config fájlok
- komponensek
- oldalak
- tartalom

A `dist/` nem forráskód.
A `dist/` csak build output.

TILOS:
- a `dist` fájlokat szerkeszteni forrásként
- a szerveren kézzel javítgatni a publikus HTML/CSS/JS fájlokat
- a VPN/FTP másolatot tekinteni elsődleges projektnek

---

## DEPLOY MODEL

A projekt publikus része static buildként készül.

Workflow:
1. Codex a helyi projektmappában dolgozik
2. helyi build fut
3. a kész `dist/` tartalma kerül feltöltésre a szerverre
4. böngészős ellenőrzés az almappás teszt URL-en

Jelenlegi teszt publish cél:
- szerveren: `/ujsite/`
- publikus teszt URL: `https://dandelionhouse.hu/ujsite/`

FONTOS:
- a szerverre nem a teljes projekt kerül fel
- nem a `src/`
- nem a `node_modules/`
- nem a repo gyökere
- kizárólag a `dist` BELSEJE

Elvárt szerverstruktúra:
- `/ujsite/index.html`
- `/ujsite/_astro/...`
- `/ujsite/favicon.ico`
- `/ujsite/favicon.svg`

NEM jó:
- `/ujsite/dist/index.html`

---

## PUBLIC SITE VS ADMIN SPLIT

A projekt jelenleg két logikai részre válik:

1. publikus honlap
2. admin / szerveroldali tooling

Az első publikus release célja:
- csak a publikus site
- static-only build
- szerverre feltölthető `dist`

Az admin rész jelenleg nem része a publikus static buildnek.

Admin / disabled területek:
- `image-admin`
- `wp-media-test`
- korábbi `src/pages/api/image-admin/*`
- minden server-only route vagy admin mentési logika

A Codex funkcionális publikus tasknál ne próbálja ezeket visszakötni.
Ha a feladat az adminra vonatkozik, az külön task.

---

## FILE RULE

1 task = 1 logikai módosítás  
alapból 1 fő fájl

Ha több kell:
- csak akkor engedett, ha közvetlenül ugyanahhoz az egy hibához szükséges
- ha a diff túl nagy lenne: STOP

Ha a task frontend publikus megjelenést érint, a build kötelező.

---

## PRE-CHECK

Task előtt:
1. legkisebb érintett fájl
2. scope ok?
3. encoding ok?
4. nem admin/public keveredés-e?

---

## ENCODING (KRITIKUS)

Elvárt: UTF-8

### NEM hiba:
- magyar ékezet
- Unicode karakter
- editor highlight
- nem ASCII karakter önmagában

### HIBA:
- torz szöveg
- mojibake (`Ã¡`, `Ăł`, `â€`, stb.)
- `�`

### SZABÁLY

Ha az ÉRINTETT sor hibás:
→ STOP  
→ ENCODING ERROR DETECTED

Ha máshol hibás:
→ report only

---

## AGENT / DOC EXCEPTION

Az `AGENT.md`, `AGENTS.md`, `README.md`, `project-docs/` és más dokumentációs fájlok
encoding szempontból nem okozhatnak STOP-ot, kivéve ha a task kifejezetten ezek módosítása.

Dokumentációs példákban szereplő hibás karakterlánc nem számít projektfájl-hibának.

---

## ENCODING TILALOM

Tilos:
- encoding átírás
- teljes fájl tisztítás
- string újraírás mellékesen
- komment javítás mellékesen
- BOM/CRLF/LF konverzió
- teljes text normalization

Kivéve külön encoding task.

---

## DIFF RULE

Tilos:
- teljes fájl újraírás
- automatikus formázás
- whitespace takarítás
- nem érintett blokk módosítása
- unrelated fájlakhoz nyúlni

Ha a diff nagy lenne:
→ DIFF TOO LARGE – STOP

---

## SCOPE RULE

Csak a megadott vagy legszűkebb szükséges fájl.

Ha más is kéne:
→ STOP

Ha a task publikus oldalra szól:
- ne nyúljon adminhoz
- ne nyúljon disabled route-okhoz
- ne próbáljon szerveres mentési logikát visszahozni

Ha a task adminra szól:
- ne nyúljon publikus UI-hoz indokolatlanul

---

## STATIC DEPLOY RULE

Publikus tasknál a Codexnek mindig figyelembe kell vennie, hogy a site jelenleg almappába deployolódik:

Base deploy target:
`/ujsite/`

Ennek következménye:
- asset útvonalaknak működniük kell almappában
- static buildnek `dist` kimenetet kell adnia
- a publikus site nem támaszkodhat SSR-re
- a publikus site nem támaszkodhat Astro API route-ra runtime-ban

Ha a publikus build azért törik el, mert root pathra épül almappa helyett:
- ezt config szinten, minimális diff-fel kell javítani

---

## HOSTING-SAFE ASSET RULE

Publikus static buildnél a generált asset fájlneveknek hosting-safe formát kell követni.

TILOS olyan asset fájlnév, amely tartalmaz:
- `@`
- egyéb problémás speciális karaktert, amit shared hosting / Apache / security layer blokkolhat

Elvárt asset fájlnév-karakterkészlet:
- kis- és nagybetűk
- számok
- kötőjel (`-`)
- aláhúzás (`_`)
- pont (`.`)

KÖTELEZŐ:
- ha buildelt asset név tartalmaz `@` karaktert → configban kell javítani
- NEM dist-ben
- NEM szerveren

---

## IMAGE WORKFLOW RULE

Ez a szabály nem csak D2-re vonatkozik.

Minden képes taskra érvényes:
- főoldal
- RegionStories
- Experiences
- szálláskártyák
- lakásoldalak
- hero képek
- mobil hero képek
- galériák
- thumbnail képek
- blog / SEO képek
- WordPress médiából importált képek
- image-admin későbbi fejlesztés

Képes feladatoknál a Codex nem kezelheti a képeket véletlenszerű assetként.

KÖTELEZŐ:
- a `DANDELION_RULES.md` képkezelési fejezetét be kell olvasni
- a frontendben használt kép végső forrása optimalizált WebP legyen
- a kép hozzárendelése apartmentKey / image registry alapú legyen, ahol lakáshoz kapcsolódik
- nem lakásoldali képnél is központi, strukturált image registry / képadat modell szerint kell gondolkodni
- fontos tartalmi képhez legyen alt adat
- hero és card képeknél figyelni kell a mobil/desktop vágásra és fókuszpontra
- képes módosításnál ellenőrizni kell a PageSpeed/LCP kockázatot

Nyers képek:
- az eredeti JPG-k pCloud archívumban maradnak
- a nyers telefonos JPG nem frontend asset
- HEIC feldolgozással jelenleg nem kell számolni
- eredeti képet nem szabad törölni vagy lecserélni

WordPress média:
- a WordPress médiatárban lévő kép csak forrásanyag lehet
- a WordPress media alt/title/caption mezői nem tekinthetők megbízható SEO forrásnak
- ha a WordPress media alt/title/caption mezői üresek vagy hiányoznak, a Codex nem töltheti ki automatikusan éles adatként külön jóváhagyás nélkül
- a végleges SEO képadat az image registryben kezelendő
- a frontend nem használhatja végleges képként a nyers WordPress JPG URL-t

Frontend képek:
- a publikus oldalon ne használjon nyers JPG-t közvetlenül
- ne hardcode-oljon random WordPress média URL-t komponensbe
- ne használjon `IMG_1234` jellegű fájlnevet
- ne hozzon létre új képlogikát oldalonként vagy lakásonként
- ne másoljon D2-specifikus képkezelést más lakásokra

Elvárt képforrás:
- optimalizált WebP
- `public/images/...` vagy később központi image registry által megadott útvonal
- lakásképeknél lakáskulcs alapján rendezett struktúra
- általános oldalképeknél szintén rendezett, szerep-alapú struktúra

SEO képadatok:
- alt szöveg nem lehet kulcsszóhalmozás
- alt szöveg csak azt írhatja le, ami ténylegesen látható
- magyar és angol mezők előkészítése kötelező, ha image registryt érint a task
- caption/title mezők csak akkor módosíthatók, ha a task erre szól

Performance:
- csak az oldal fő LCP/hero képe lehet preload + eager + fetchpriority high
- galéria képei alapból lazy
- thumbnail és nagy galéria kép ne ugyanaz a túlméretes fájl legyen
- nem szabad minden képet eagerre állítani
- CSS background-image fontos SEO képnél kerülendő

TILOS:
- WordPress médiatárat végleges frontend igazságforrásként kezelni
- image-admin / REST réteget önállóan visszakötni publikus taskban
- képeket tömegesen átnevezni külön task nélkül
- meglévő képstruktúrát refaktorálni külön engedély nélkül
- eredeti JPG-ket törölni
- külső Unsplash/Pexels képeket végleges megoldásként beépíteni
- képoptimalizálási pipeline-t önállóan kitalálni

Ha a képfeladat túlmutat egy fájl vagy egy konkrét kép cseréjén:
→ STOP
→ IMAGE WORKFLOW SCOPE TOO LARGE

---

## BUILD RULE

Publikus site esetén a cél:
- `npm run build`
- sikeres static build
- használható `dist/`

---

## BUILD STEP (KÖTELEZŐ)

1. npm run build  
2. ellenőrizd: sikeres-e  
3. ha hiba: csak azt javítsd  
4. dist-hez nem nyúlunk

---

## GIT RULE

- csak target fájl stage-elhető
- ellenőrzés: `git diff --cached --name-only`
- ha más is benne van → STOP

---

## STOP RULE

STOP ha:
- nem egyértelmű task
- túl nagy diff
- encoding hiba
- scope keveredik
- redesign indul

---

## CHECK

- nincs encoding hiba
- diff kicsi
- build ok
- almappa működik

---

## OUTPUT

RESULT
- Status:
- Modified files:
- Summary:
- Risk:
- Build:

---

## MANUAL PUBLISH CONTEXT

- user tölti fel
- Codex nem deployol
- dist-nek önmagában működnie kell

---

## DANDELION PROJECT RULE FILE

A projekt tartalmaz egy külön szabályfájlt:

`DANDELION_RULES.md`

KÖTELEZŐ:
- minden honlapos task előtt be kell olvasni
- a benne lévő design és struktúra szabályok kötelezőek

Szerepek:
- AGENTS.md → működés, scope, build, git, képkezelési végrehajtási korlátok
- DANDELION_RULES.md → design, layout, struktúra, projekt szintű képkezelési alapelvek

Ha UI-t érint a task:
→ DANDELION_RULES az elsődleges

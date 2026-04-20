# DANDELION – AGENT RULES (LEAN)

---

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

Publikus static buildnél a generált asset fájlneveknek hosting-safe formát kell követniük.

TILOS olyan asset fájlnév, amely tartalmaz:
- `@`
- egyéb problémás speciális karaktert, amit shared hosting / Apache / security layer blokkolhat

Elvárt asset fájlnév-karakterkészlet:
- kis- és nagybetűk
- számok
- kötőjel (`-`)
- aláhúzás (`_`)
- pont (`.`)

Indok:
a publikus tárhelyen már bizonyítottan előfordult, hogy az `@` karakteres buildelt asset URL
(pl. `index@_@astro...css`) 404-et adott, miközben ugyanaz a fájl egyszerű néven elérhető volt.

KÖTELEZŐ SZABÁLY:
- ha publikus buildelt asset fájlnév `@` karaktert tartalmaz, azt forrás/config szinten kell megszüntetni
- ezt build output naming configgal kell javítani
- NEM kézi `dist` átnevezéssel
- NEM szerveren manuális átnevezéssel
- NEM FTP utólagos barkáccsal

A helyes javítás helye:
- `astro.config.mjs`
- vagy az ahhoz kapcsolódó Vite / Rollup output naming beállítás

A `dist/` csak build output, ezért:
- a `dist` fájlneveit kézzel módosítani tilos
- a szerveren a buildelt assetet kézzel átnevezni tilos

Ha a task publikus buildet érint, a Codexnek külön ellenőriznie kell:
1. generálódik-e asset fájlnév `@` karakterrel
2. a buildelt `index.html` milyen asset útvonalra hivatkozik
3. a build output alkalmas-e shared hostingos statikus kiszolgálásra

Ha a publikus build asset neve hosting-szinten kockázatos:
→ minimális config diff  
→ build újrafuttatás  
→ ellenőrzött, tiszta `dist`

---

## BUILD RULE

Publikus site esetén a cél:
- helyi `npm run build`
- sikeres static build
- használható `dist/`

A Codex nem deployol a szerverre.
A Codex nem dolgozik közvetlenül a szerveren.
A Codex feladata csak a helyi projekt rendbetétele.

---

## BUILD STEP (KÖTELEZŐ)

Minden publikus frontend task után kötelező:

1. futtasd:
   npm run build

2. ellenőrizd:
   - a build sikeresen lefutott
   - a `dist/` újragenerálódott
   - nincs build error

3. ha a build hibára fut:
   - csak a buildet törő hibát javítsd
   - ne refaktorálj
   - ne bővíts scope-ot

4. a `dist/` fájlokat kézzel módosítani tilos

---

## GIT RULE

A dirty worktree önmagában nem STOP.

Ami számít:
- a staged lista legyen tiszta
- csak a taskhoz tartozó fájl legyen commitban

Ha commit a feladat:
- csak a célzott fájlokat stage-elje
- ellenőrizze: `git diff --cached --name-only`
- ha staged-ben unrelated fájl is van: STOP

---

## STOP RULE

STOP ha:
- nem egyértelmű a feladat
- túl nagy diff kellene
- több logikai módosítás nyílna meg
- a célfájl érintett sora encoding hibás
- publikus és admin scope összecsúszna
- a task refaktorba fordulna át
- a megoldás csak szerveres kézi hackkel lenne tartható

---

## CHECK

Task végén:
- nincs új encoding hiba
- nincs nyilvánvaló Astro / TS / JS / CSS hiba
- diff kicsi maradt
- csak célzott módosítás történt
- a publikus build logika nem sérült
- ha érintett, almappás (`/ujsite/`) működés ne törjön el
- nincs hosting-szinten problémás asset fájlnév a build outputban

---

## OUTPUT

RESULT
- Status:
- Modified files:
- Summary:
- Risk:
- Build:

Utána röviden:
1. mi változott
2. mi készült el
3. mi nincs még kész / korlát
4. rövid manuális ellenőrzés

Ha kérve van, plusz:
- commit hash
- push eredmény
- staged file lista

---

## MANUAL PUBLISH CONTEXT

A tényleges publikálás kézi.

Ez azt jelenti:
- Codex nem tölti fel a szerverre
- a user tölti fel a friss `dist` tartalmát VPN/FTP-n keresztül
- a tesztelés a szerveren történik

A Codexnek ezért publikus tasknál úgy kell dolgoznia, hogy:
- a buildelt output önmagában feltölthető legyen
- ne igényeljen Netlify-t
- ne igényeljen SSR adaptert
- ne igényeljen futó backend route-okat a publikus oldalhoz

---

## ELV

Gyors > okoskodás  
Kis diff > nagy javítás  
Helyi forrás > szerveres kézi barkács  
Buildelt `dist` > teljes projekt feltöltése  
Te döntesz → agent végrehajt
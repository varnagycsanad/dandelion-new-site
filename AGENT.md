[CHANGE 2026-05-03 00:00] DANDELION_MASTER_RULES logikai szétbontás: AGENT csak execution szabályokat tartalmaz.
[CHANGE 2026-05-16 13:25] WordPress media utalás semlegesítve legacy media tiltássá.
[CHANGE 2026-05-16 14:30] Deploy concurrency szabály rögzítve: futó deploy nem szakítható meg új push miatt.
[CHANGE 2026-05-16 14:45] Régi /ujsite teszt deploy szöveg root deploy szabályra frissítve.
[CHANGE 2026-05-16 20:56] Git push alapértelmezés rögzítve: mindig a main a cél, ha nincs kifejezetten más branch meghatározva.

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

Jelenlegi publish cél:
- szerveren: éles dokumentumgyökér / root target
- publikus URL: `https://dandelionhouse.hu/`
- a régi `/ujsite/` csak legacy tesztútvonal, nem aktuális deploy cél

Workflow:
1. Codex a helyi projektmappában dolgozik
2. helyi build fut
3. a kész `dist/` tartalma kerül feltöltésre az éles root célra
4. böngészős ellenőrzés az éles root URL-en

FONTOS:
- a szerverre nem a teljes projekt kerül fel
- nem a `src/`
- nem a `node_modules/`
- nem a repo gyökere
- kizárólag a `dist` BELSEJE

Elvárt szerverstruktúra:
- `/index.html`
- `/_astro/...` vagy aktuális buildelt asset útvonal
- `/favicon.ico`
- `/favicon.svg`

NEM jó:
- `/dist/index.html`
- `/ujsite/dist/index.html`
- root deploy helyett legacy `/ujsite/` célra feltöltés

---

## DEPLOY CONCURRENCY RULE

A deploy workflow nem szakíthatja meg a már futó deployt újabb push miatt.

Kötelező GitHub Actions beállítás:

```yaml
concurrency:
  group: deploy-root-${{ github.ref }}
  cancel-in-progress: false
```

Cél:
- az aktuális deploy fusson végig
- a következő frissítés várjon mögötte
- ne legyen félbemaradt FTP feltöltés
- ne legyen két párhuzamos deploy ugyanarra a célra

Tilos:
- `cancel-in-progress: true` visszaállítása külön döntés nélkül
- párhuzamos root deploy ugyanarra a branchre

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

Publikus tasknál a Codexnek mindig figyelembe kell vennie, hogy a site jelenleg root célra deployolódik.

Base deploy target:
`/`

Legacy tesztútvonal:
`/ujsite/` csak régi kontextus, nem aktuális publish cél.

Ennek következménye:
- asset útvonalaknak működniük kell root alatt
- static buildnek `dist` kimenetet kell adnia
- a publikus site nem támaszkodhat SSR-re
- a publikus site nem támaszkodhat Astro API route-ra runtime-ban

Ha a publikus build azért törik el, mert legacy almappás célra épül root helyett:
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
- ha commit/push kérést kapsz, alapértelmezett célbranch mindig a `main`
- csak akkor szabad nem a `main` branchre pusholni, ha a user ezt kifejezetten és egyértelműen más branchre kérte
- ha nincs explicit branch megadva, a feltöltés célja a `main`

---

## STOP RULE

STOP ha:
- nem egyértelmű task
- túl nagy diff
- encoding hiba
- scope keveredik
- redesign indul
- publikus frontend képforrásba legacy media / admin / REST / runtime útvonal kerülne vissza
- publikus frontend képforrásba `public/images/accommodations/...` alapú régi képlogika kerülne vissza
- új képes task nem Astro-only `src/assets` + registry irányba menne
- lakásoldal D2 kézi másolással vagy page-level layout logikával készülne
- AI SEO draftnál automatikus `approved:true` beállítás indulna

---

## CHECK

- nincs encoding hiba
- diff kicsi
- build ok
- root URL működik

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
- Codex nem manual FTP deployol
- Codex kezelheti a git push utani CI deploy workflow szabalyait
- dist-nek önmagában működnie kell

---

## DANDELION PROJECT RULE FILE

A projekt tartalmaz egy külön szabályfájlt:

`DANDELION_RULES.md`

KÖTELEZŐ:
- minden honlapos task előtt be kell olvasni
- a benne lévő design és struktúra szabályok kötelezőek

Szerepek:
- AGENT.md → működés, scope, build, git, execution korlátok
- DANDELION_RULES.md → design, layout, struktúra, image workflow, template rules
- DANDELION_CHATGPT_RULES.md → ChatGPT szerep, Codex usage, SEO draft workflow

Ha UI-t érint a task:
→ DANDELION_RULES az elsődleges
[CHANGE 2026-05-16 13:10] FTP deploy gyorsitasi guardrails: kizart assets a root payloadbol, changed-only asset upload, duplikalt feltoltes tilos.

## FTP DEPLOY GYORSITASI SZABALYOK (KOTELEZO)

Cel: a leggyorsabb biztonsagos feltoltes, minimalis fajlmuvelettel.

- Root deploy payloadbol az `assets/` mappa kizarando, ha kulon hashed-asset deploy lepes van.
- Tilos duplikalt feltoltes: ugyanaz az asset nem mehet fel root es asset lepesben is.
- Asset frissitesnel csak valtozott es torolt fajlokra szabad FTP muveletet futtatni.
- Egyetlen kep modositasa eseten kizarolag az erintett hash-elt kep(ek) cserelheto(k), teljes assets ujratoltes nelkul.
- Teljes assets ujratoltes csak explicit force esetben vagy bizonyitott serules-helyreallitasnal engedett.

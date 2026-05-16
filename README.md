[CHANGE 2026-05-16 13:40] Gyári Astro README lecserélve Dandelion projekt README-re.

# Dandelion új honlap

Ez a repo a Dandelion Vendégházak új, Astro-alapú weboldalának forrása.

## Projekt célja

Gyors, modern, keresőoptimalizált, statikus weboldal a Dandelion Vendégházak számára.

Fő irány:
- Astro static build
- fájlalapú képkezelés
- központi image registry
- lakásoldalak közös sablonból
- kontrollált, kis lépésekben végzett fejlesztés

## Source of truth

A forrás mindig a projektmappa tartalma:

```text
src/
public/
project-docs/
config fájlok
```

A `dist/` nem forráskód.
A `dist/` csak build output, kézzel nem szerkeszthető.

## Lokális workspace

```text
C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site
```

Codex / fejlesztési task esetén ez a kötelező workspace lock.

## Fontos szabályfájlok

A projekt működését ezek a fájlok szabályozzák:

```text
AGENT.md
DANDELION_RULES.md
DANDELION_CHATGPT_RULES.md
project-docs/DANDELION_MASTER_RULES.md
```

Szerepük röviden:

- `AGENT.md` → végrehajtás, scope, build, git, STOP szabályok
- `DANDELION_RULES.md` → design, layout, képkezelés, lakásoldali struktúra
- `DANDELION_CHATGPT_RULES.md` → ChatGPT/Codex munkamód, SEO draft értelmezés
- `project-docs/DANDELION_MASTER_RULES.md` → történeti / projekt-szabály összefoglaló, külön auditálandó

## Alap parancsok

```sh
npm install
npm run dev
npm run build
npm run preview
```

Publikus frontend módosítás után általában kötelező:

```sh
npm run build
```

## Deploy elv

A weboldal statikus buildként készül.

Alapelv:

1. forrás módosítása a repo/projektmappában
2. `npm run build`
3. a `dist/` tartalma kerül publikálásra
4. `dist/` fájlt nem javítunk kézzel

## Képkezelési irány

A frontend képkezelés file-based rendszerben működik.

Elvárt irány:
- optimalizált WebP képek
- központi image registry
- apartmentKey-alapú lakásoldali képek
- külön hero / mobile hero / gallery / thumbnail logika
- AI SEO draft csak draftként, `approved: false` állapotban

Tilos visszahozni régi legacy media / admin / REST / runtime képforrás logikát a publikus frontendbe.

## Lakásoldalak

A lakásoldalak nem készülhetnek kézi másolással.

Irány:

```text
src/templates/AccommodationPage.astro
src/data/accommodations/*.ts
src/data/images/...
```

A page fájlok csak vékony wrapperként működhetnek.

## Fejlesztési elv

1 task = 1 logikai módosítás.

Kerülendő:
- nagy refaktor
- design újragondolás
- mellékes javítás
- teljes fájl újraformázás
- több terület összekeverése

Ha a task túl nagy vagy scope-ot váltana: STOP.

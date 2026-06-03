# 09 – REPO INDULÁS

Status: TORTENETI
Last checked: 2026-06-02
Use for: repo indulas es kezdeti struktura kontextus
Do not use for: jelenlegi repo/mappastruktura pontos leirasara


# Státusz: VÉGLEGES

# Utolsó módosítás: 2026-04-12

## Cél

A projekt Git-repo induló struktúrájának rögzítése.

---

## 1. Repo cél

A repo legyen:

* AI-barát
* Git-barát
* static-first szemléletű
* tiszta felelősségi körökre bontott

---

## 2. Induló top-level mappák

```bash
/project-docs
/src
/public
```

---

## 3. Project-docs tartalma

```bash
/project-docs
  00-projekt-alap.md
  01-oldalterkep.md
  02-oldaltipusok-es-blokk-matrix.md
  03-tartalommodell.md
  04-navigacios-logika.md
  05-seo-struktura.md
  06-foglalasi-cta-logika.md
  07-design-rendszer.md
  08-ai-codex-workflow.md
  09-repo-indulas.md
```

---

## 4. Src induló struktúra

```bash
/src
  /pages
  /layouts
  /components
  /sections
  /content
    /accommodations
    /blog
    /landings
    /legal
  /data
  /styles
  /utils
```

---

## 5. Public induló struktúra

```bash
/public
  /images
    /accommodations
    /blog
    /brand
  /fonts
  /icons
```

---

## 6. Mappa szerepek

### /project-docs

A projekt szabályai, döntései és specifikációi.

### /src/pages

Konkrét oldalak.

### /src/layouts

Oldalvázak.

### /src/components

Kis, újrahasznosítható UI elemek.

### /src/sections

Nagyobb tartalmi blokkok.

### /src/content

Tartalmi adatfájlok.

### /src/data

Globális adatok.

### /src/styles

Globális és rendszer szintű stílusok.

### /src/utils

Segédlogika.

### /public

Publikus assetek.

---

## 7. Első kötelező fájlok

```bash
README.md
.gitignore
```

Később:

* package.json
* astro.config.* vagy más framework config
* tsconfig.json (ha kell)

---

## 8. Induló tartalmi fájlok

```bash
/src/content/accommodations/d2.json
/src/content/landings/szallas-kisapati.json
/src/data/site.json
```

---

## 9. Induló oldalak

* főoldal
* D2 szállásoldal
* szállás Kisapáti landing oldal

---

## 10. Szabályok

* nincs ömlesztett egyfájlos rendszer
* nincs tartalom hardcode-olva komponensbe
* nincs random asset elhelyezés
* minden új fájl a megfelelő helyre kerül

---

## 11. Döntés

A repo a fenti struktúrával indul.
Ez lesz az alapja a tényleges fejlesztésnek.

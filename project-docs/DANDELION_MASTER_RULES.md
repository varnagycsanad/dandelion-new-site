[CHANGE 2026-05-16 13:50] DANDELION_MASTER_RULES státusz tisztázva: archív, nem normatív szabályforrás.

# DANDELION_MASTER_RULES – ARCHÍV

Ez a fájl archív / történeti projektösszefoglaló.

**Nem normatív szabályforrás.**

A korábbi master fájl több szabályblokkot duplikált, és részben régi állapotot tartalmazott. Ezért a továbbiakban nem használható elsődleges végrehajtási, design vagy ChatGPT/Codex szabályforrásként.

## Aktuális normatív szabályfájlok

A jelenlegi Dandelion honlapfejlesztésnél ezeket kell elsődlegesnek tekinteni:

```text
AGENT.md
DANDELION_RULES.md
DANDELION_CHATGPT_RULES.md
```

Szerepük:

- `AGENT.md` → végrehajtás, scope, build, git, STOP szabályok
- `DANDELION_RULES.md` → design, layout, képkezelés, lakásoldali struktúra
- `DANDELION_CHATGPT_RULES.md` → ChatGPT/Codex munkamód, SEO draft értelmezés

## Használati szabály

Codex / ChatGPT tasknál:

- ezt a fájlt nem kell normatív szabályként alkalmazni
- ebből nem szabad régi tiltásokat vagy régi deploy logikát visszahozni
- ha ellentmondás van, mindig az aktuális három szabályfájl az irányadó

## Korábbi tartalom

A korábbi teljes master-szöveg a Git historyban visszakereshető.

Ez a fájl szándékosan rövidített archív jelölőfájl lett, hogy ne legyen többé ellentmondásos, duplikált szabálygyűjtemény.

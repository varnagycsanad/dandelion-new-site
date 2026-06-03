# Typography Size Audit - 2026-05-18

Status: RESZBEN AKTUALIS
Last checked: 2026-06-02
Use for: tipografia es mobil meret audit kontextus
Do not use for: vegso tipografia source-of-truthkent DANDELION_RULES.md nelkul


## Cel

A honlap betumeret-hasznalatanak attekintese, kulon figyelemmel a mobil nezeti olvashatosagra es a kesobbi egysegesites szabalyaira.

## Olvasott szabalyfajlok

- `AGENT.md`
- `DANDELION_RULES.md`
- `DANDELION_CHATGPT_RULES.md`
- `README.md`
- `project-docs/07-design-rendszer.md`
- `project-docs/DANDELION_MASTER_RULES.md`

## Aktualis allapot

A publikus `src` alatt jelenleg:

- 312 db `font-size` deklaracio talalhato.
- 101 db `letter-spacing` deklaracio talalhato.
- A leggyakoribb body/normal meretek: `1rem`, `0.95rem`, `0.92rem`, `0.88rem`.
- Sok apro UI/meta ertek van: `0.72rem`, `0.74rem`, `0.76rem`, `12px`, `11px`, `10px`.
- Tobbi kiemelt headline gyakran `clamp(...vw...)` alapu.
- Negativ letter-spacing tobb display/headline helyen is elofordul.

## Fo megallapitasok

1. Nincs meg vegig tokenizalt betumeret-rendszer. A meretek komponensenkent vannak beallitva, ezert ugyanarra a szerepre tobb kozeli ertek is elofordul.
2. A body es lead szovegek tobbnyire olvashatok, de a kartyak, metak es mobil segedszovegek kozott sok az apro ertek.
3. Mobilon tobb helyen 10-11px vagy `0.62rem-0.68rem` meret jelenik meg. Ezek tartalmi szovegre vagy navigacios elemre nem biztonsagosak.
4. A `clamp(...vw...)` alapu headline-ok ad hoc modon skalkoznak. Ez latvanyos, de mobilon es szeles desktopon konnyen szettarto tipografiai ritmust okoz.
5. A negativ letter-spacing display helyzetben jelenleg stiluselemkent elofordul, de uj elemnel nem szabad alapertelmezett mintava valnia.

## Mobil kockazatok

- 360-390px szeles telefonon a 10-11px meretek gyorsan olvashatatlanna valhatnak.
- Nagy betukoz + kis font-size egyutt kulonosen gyenge olvashatosagot ad label/meta elemeknel.
- A `vw`-alapu headline-ok mobilon helyenkent tul nagyra vagy tul kicsire ugorhatnak a kontenerhez kepest.
- A hosszabb magyar szavak miatt a kompakt kartyakban es CTA-kban a 0.8rem alatti meret kulonosen kockazatos.

## Normativ javaslat

A meretrendszer source of truth a `DANDELION_RULES.md` legyen.

Alap skala:

- Body: `1rem`
- Lead: `1rem-1.08rem`
- Kartya / rovid leiras: `0.88rem-0.98rem`
- Menu / CTA: minimum `0.82rem`
- Label / meta: `0.72rem-0.78rem`, tokennel legalabb `12px-13px`
- Mobil tartalmi minimum: `0.82rem`
- Mobil label / meta minimum: `12px` szamolt CSS-ben is
- Mobil H1: `1.9rem-2.8rem`
- Mobil H2: `1.45rem-2.1rem`
- Desktop H1: `3rem-4.8rem`
- Desktop H2: `1.65rem-3.2rem`

Tiltas / guardrail:

- 10px es 11px nem hasznalhato uj tartalmi vagy navigacios elemre.
- 12px alatti meret csak dekorativ, nem informaciohordozo elemnel maradhat.
- Uj `vw`-alapu font-size kulon design dontes nelkul nem vezetheto be.
- Negativ `letter-spacing` csak display headline esetben, kizarolag `--dnd-tracking-display-*` tokennel hasznalhato; uj ad hoc negativ ertek nem vezetheto be.
- Mobil nezetet erinto tasknal kotelezo 360-390px szelessegben ellenorizni az olvashatosagot.

## Javasolt kovetkezo lepes

Kulon implementacios taskban erdemes bevezetni egy `global.css` tipografia token-keszletet, majd eloszor a mobilon kockazatos 10-11px es `0.62rem-0.68rem` mereteket felhozni a fenti skalahoz. Ez vizualis ellenorzest igenyel, ezert nem javasolt egy audit taskkal osszekeverni.

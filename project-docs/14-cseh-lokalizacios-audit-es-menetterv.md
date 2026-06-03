# Cseh lokalizacios audit es menetterv

Status: RESZBEN TELJESULT
Last checked: 2026-06-02
Use for: cseh rollout torteneti kockazatai es munkameneti tanulsagai
Do not use for: jelenlegi cseh oldalstruktura vagy sitemap keszultseg megallapitasara

Datum: 2026-05-25

Statuszfrissites 2026-06-02: ez a dokumentum torteneti kiindulo audit. A jelenlegi repo-ban mar letezik `src/pages/cs/`, leteznek `src/data/accommodation-pages/*.cs.ts` fajlok, a cseh jogi oldalak es a `/cs/panorama-pool/` oldal is buildelnek, a `src/data/site-seo.ts` pedig tartalmaz cseh route-parokat es sitemap elemeket. A 2026-06-02-i `npm run build` sikeres volt, 93 Astro oldalt epitett.

## Cel

A cseh (`cs`) lokalizacio biztonsagos elinditasa a jelenlegi HU/EN/DE allapot mellett, ugy, hogy a nemet fordítás folyamatban levo munkaja ne seruljon, es a cseh valtozat ne keruljon felkesz, torott vagy rossz SEO allapotban publikus/indexelheto allapotba.

## Felhasznalt projekt-dokumentumok

- `dandelion_tobbnyelvu_forditasi_workflow.md`
- `project-docs/DANDELION_TRANSLATION_RULES.md`
- `project-docs/13-nemet-lokalizacios-megvalositasi-terv.md`
- `DANDELION_RULES.md`
- `DANDELION_CHATGPT_RULES.md`
- `AGENT.md`
- `README.md`
- `project-docs/00-projekt-alap.md`
- `project-docs/01-oldalterkep.md`
- `project-docs/02-oldaltipusok-es-blokk-matrix.md`
- `project-docs/03-tartalommodell.md`
- `project-docs/04-navigacios-logika.md`
- `project-docs/05-seo-struktura.md`
- `project-docs/06-foglalasi-cta-logika.md`
- `project-docs/current-sitemap-audit-2026-05-24.md`
- relevans Google AI Readiness es booking/schema dokumentumok

## Jelenlegi technikai allapot

- A git working tree az audit keszitese utan csak ezt az uj audit dokumentumot mutatja modositasnak.
- A nemet lokalizacios fajlok jelenleg tracked allapotban vannak, tehat a cseh munka technikailag indithato kulon branchrol/worktree-bol.
- A build sikeres: `npm run build` lefutott, 63 oldal epult.
- Nincs `src/pages/cs/` konyvtar.
- Nincs `src/data/accommodation-pages/*.cs.ts` adatfajl.
- Nincs `dist/cs/` buildelt konyvtar.
- A `BaseLayout.astro` tipusszinten mar ismeri a `cs` nyelvet: `lang?: "hu" | "en" | "de" | "sk" | "pl" | "cs"`.
- A `BaseLayout.astro` tartalmaz `cs_CZ` og locale es `cs-CZ` schema nyelvi elokeszitest.
- A header/footer logika jelenleg valojaban csak HU/EN/DE agakkal dolgozik.
- Az `AccommodationPageLocale` jelenleg csak `"hu" | "en" | "de"`, tehat a szallasoldali shared template csehhez meg nincs felkeszitve.
- A sitemap es hreflang forrasa a `src/data/site-seo.ts`; jelenleg nincs `cs` route-par es nincs `/cs/` sitemap elem.
- A `src/pages/sitemap.xml.ts` a `SITEMAP_PATHS` listabol general, tehat a `dist/sitemap.xml` nem kezzel modositando.
- A nemet szallasoldalak mar buildelnek es sitemapben vannak, de ez a working tree jelenlegi, meg nem lezart nemet allapotahoz tartozik.

## Kockazati kep

### P0 kockazat: nemet es cseh munka keveredese

A cseh forditast nem szabad ugyanazon logikai munkacsomagban elkezdeni ugy, hogy kozben a nemet lokalizacio is aktivan valtozik ugyanazokban a kozos fajlokban.

Kockazat:
- ugyanazokat a kozos fajlokat kellene szerkeszteni: `BaseLayout.astro`, `SiteFooter.astro`, `site-seo.ts`, `AccommodationPage.astro`, adapterek;
- a cseh es nemet munka egymasra csuszhat;
- kesobb nehez lesz kulon review-zni, visszavonni vagy merge-elni.

Javaslat:
- cseh munkat kulon branch/worktree alatt inditani: `codex/czech-translation`;
- ha a nemet munka ujra modosul, a ket fordítás ne ugyanabban a taskban szerkessze a kozos fajlokat.

### P0 kockazat: `cs` csak felig van elokeszitve

A `BaseLayout` tud `cs` nyelvi meta alapokat, de a valos UI es accommodation template meg nem cseh-kompatibilis.

Blokkolok az elso cseh szallasoldal elott:
- `AccommodationPageLocale` bovites `cs`-re;
- `localizedTemplateText.cs` felvetele;
- header/footer `cs` ag;
- language switcher `cs` route mapping;
- `site-seo.ts` route parok bovitese.

### P0 kockazat: SabeeApp cseh nyelvi parameter ismeretlen

Dokumentalt allapot:
- HU: `lang=Hu`
- EN: `lang=En`
- DE: meg kulon audit targya, a nemet CTA egyelore `/de/kontakt/`

Csehnel tilos talalgatni a `lang=Cs` vagy hasonlo parametert. A cseh CTA induljon kapcsolat oldalra, amig a SabeeApp cseh nyelvi parametere nincs bizonyitva.

### P1 kockazat: slug-strategia

A dokumentacio ket iranyt is enged:
- egyszerubb elso kor: azonos slugok nyelvi prefixszel;
- SEO-baratsagosabb kesobbi irany: lokalizalt slugok.

Csehnel javasolt kompromisszum:
- elso csomagban csak a core route-ok legyenek lokalizaltak, termeszetes cseh formaban;
- szallasnevek slugjai maradjanak brand jelleguek.

Javasolt kezdo route-ok:

```text
/cs/
/cs/ubytovani/
/cs/kontakt/
```

Javasolt szallas route-ok:

```text
/cs/dandelion-d1/
/cs/dandelion-d2/
/cs/dandelion-fugehaz/
/cs/dandelion-zsalya/
/cs/szololiget/
/cs/szepvolgyi/
/cs/royal/
/cs/dandelion-vintage/
/cs/dandelion-koveskal/
```

Javasolt kesobbi elmeny route-ok:

```text
/cs/zazitky/
/cs/pujcovna-kol/
/cs/vinarstvi/
/cs/balaton/
/cs/svedecne-hory/
```

## Cseh munkamenet javasolt sorrendje

### 0. Branch/worktree izolacio

Cel: a nemet folyamatban levo munka ne keveredjen a cseh forditassal.

Kimenet:
- kulon cseh branch vagy kulon worktree;
- tiszta kiindulasi pont vagy egyertelmuen dokumentalt nemet alap.

### 1. Cseh technikai alap, szallasoldalak nelkul

Erintett terulet:
- `src/layouts/BaseLayout.astro`
- `src/components/SiteFooter.astro`
- `src/data/site-seo.ts`
- `src/pages/cs/index.astro`
- `src/pages/cs/ubytovani.astro`
- `src/pages/cs/kontakt.astro`

Kovetelmeny:
- `html lang="cs"`
- `og:locale="cs_CZ"`
- `WebSite.inLanguage="cs-CZ"`
- canonical sajat cseh URL-re mutat
- hreflang HU/EN/DE/CS parok csak letezo oldalaknal
- sitemap csak letezo cseh oldalakkal bovul
- header/footer ne mutasson nem letezo cseh oldalakra
- booking CTA cseh oldalon egyelore `/cs/kontakt/`

Build utan P0 keresesi lista:

```powershell
npm run build
Test-Path dist\cs
Select-String -Path dist\sitemap.xml -Pattern '/cs/'
$files = Get-ChildItem -Path dist\cs -Recurse -Filter *.html
$files | Select-String -Pattern 'href=""','src=""','TODO','placeholder','coming soon' -SimpleMatch
```

### 2. Cseh szallasoldali template-felkeszites

Erintett terulet:
- `src/lib/accommodation-page-adapters.ts`
- `src/templates/AccommodationPage.astro`
- cseh accommodation data fajlok kesobbi fogadasa

Kovetelmeny:
- `AccommodationPageLocale = "hu" | "en" | "de" | "cs"`
- `localizedTemplateText.cs` teljes legyen
- a kepek cseh alt/title/caption hianyaban fallbackelhetnek EN/HU-ra, de ez P1/P2 auditpont
- layout/design nem valtozhat

### 3. Cseh szallasadatok es oldalak

Erintett fajlminta:

```text
src/data/accommodation-pages/d1.cs.ts
src/data/accommodation-pages/d2.cs.ts
src/data/accommodation-pages/fugehaz.cs.ts
src/data/accommodation-pages/zsalya.cs.ts
src/data/accommodation-pages/szololiget.cs.ts
src/data/accommodation-pages/szepvolgyi.cs.ts
src/data/accommodation-pages/royal_homes.cs.ts
src/data/accommodation-pages/vintage.cs.ts
src/data/accommodation-pages/koveskal.cs.ts
```

Page wrapper minta:

```text
src/pages/cs/dandelion-d1.astro
src/pages/cs/dandelion-d2.astro
src/pages/cs/dandelion-fugehaz.astro
src/pages/cs/dandelion-zsalya.astro
src/pages/cs/szololiget.astro
src/pages/cs/szepvolgyi.astro
src/pages/cs/royal.astro
src/pages/cs/dandelion-vintage.astro
src/pages/cs/dandelion-koveskal.astro
```

Szabaly:
- page fajl csak vekony wrapper lehet;
- ne legyen D2 layout masolas;
- haznevek nem fordithatok at;
- booking link ne kapjon talalgatott SabeeApp cseh parametert.

### 4. Cseh elmenyoldalak

Csak a core es szallasoldalak utan induljon.

Javasolt sorrend:
- `/cs/zazitky/`
- `/cs/pujcovna-kol/`
- `/cs/vinarstvi/`
- `/cs/balaton/`
- `/cs/svedecne-hory/`

### 5. P0/P1 audit

P0:
- build hiba;
- torott route;
- nem letezo sitemap URL;
- rossz canonical;
- rossz hreflang;
- ures `href` vagy `src`;
- TODO/placeholder/coming soon a publikus cseh oldalon;
- rossz nyelvu belso link cseh fo tartalomban.

P1:
- schema nyelve;
- breadcrumb label;
- header/footer teljesség;
- title/meta minoseg;
- gallery alt nyelve;
- CTA termeszetessege;
- cseh stilus es lokalizacio minosege.

## Cseh nyelvi iranyelvek

- A cseh nem tukorforditas legyen, hanem vendegoldali lokalizacio.
- A hangnem maradjon termeszetkozeli, nyugodt, premium videki, nem tul hotelszeru.
- Helyneveket nem kell eroszakosan forditani: Balaton, Badacsony, Szent Gyorgy-hegy, Kali-medence, Kisapati stb. maradhatnak magyar/helyi nevkent, rovid magyarazattal.
- Haznevek maradjanak stabilak: Dandelion D1, Dandelion D2, Fugehaz/Zsalya/Szololiget/Szepvolgyi/Vintage brand jelleggel.
- Ne keruljon be kitalalt ar, tavolsag, nyitvatartas, partnerkapcsolat vagy szolgaltatas.

## Aktualis dontesi pontok

1. A cseh route-ok lokalizaltak legyenek-e elso kortol (`/cs/ubytovani/`, `/cs/zazitky/`), vagy egyszeruseg kedveert maradjanak magyar/angol slugok?
2. A cseh elso csomag csak core oldalak legyenek-e, vagy rogton szallaslista is?
3. A nemet folyamatban levo branch milyen allapotbol legyen a cseh alapja: jelenlegi working tree, nemet commit utan, vagy mainrol kulon worktree?
4. SabeeApp cseh nyelvi parameter tamogatott-e? Ha nincs bizonyitek, kontakt fallback kell.

## Javasolt kovetkezo lepes

Ne induljon meg rogton a teljes cseh forditas. A kovetkezo biztonsagos task:

```text
Cseh lokalizacios alap letrehozasa csak core route-okkal:
/cs/
/cs/ubytovani/
/cs/kontakt/

Scope:
- BaseLayout cseh header/text/link alapok
- SiteFooter cseh footer alapok
- site-seo cseh route-parok es sitemap
- 3 cseh oldal
- nincs szallas detail oldal
- nincs SabeeApp parameter talalgatas
- build + P0 audit
```

Ez alacsony kockazatu, jol review-zhato, es nem keveri ossze a cseh szallasforditast a meg futo nemet szallasoldali munkaval.

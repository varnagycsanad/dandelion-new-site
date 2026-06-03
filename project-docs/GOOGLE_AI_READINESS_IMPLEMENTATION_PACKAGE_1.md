[CHANGE 2026-05-20 00:00] Google AI Readiness elso implementacios csomag elokeszito terv letrehozva.

# Google AI Readiness implementation package 1

Status: RESZBEN TELJESULT
Last checked: 2026-06-02
Use for: elso Google AI Readiness implementacios csomag kontextus
Do not use for: aktualis teljes roadmap helyettesitesere


Cel: pontos technikai terv az elso Google AI Readiness implementacios csomaghoz. Ez a dokumentum nem implementacio, csak jovahagyas utani munkaterv.

Statusz: ELOKESZITVE / JOVAHAGYASRA VAR

Forrasok:

- `project-docs/GOOGLE_AI_READINESS.md`
- `project-docs/GOOGLE_AI_READINESS_EXECUTION_PLAN.md`
- `project-docs/GOOGLE_AI_READINESS_OWNER_INPUT.md`
- `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md`
- `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md`
- `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md`
- `project-docs/GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md`
- `src/templates/AccommodationPage.astro`
- `src/data/accommodation-pages/*.ts`
- `src/data/accommodations.ts`
- `src/lib/accommodation-page-adapters.ts`
- `src/layouts/BaseLayout.astro`
- HU/EN accommodation wrapper oldalak

## 1. Beepitendo elso csomag tartalma

Az elso csomag celja: a szallasoldalak lathato, egyseges dontesi adatai legyenek egyertelmuek embernek es Google / AI rendszereknek.

Beepitendo elemek:

- gyors dontesi adatblokk egysegesitese
- `kinek ajanljuk / kinek nem idealis` blokk jovahagyott szoveggel
- lathato, egyseges szallasadatok: ferohely, haloszoba, furdo, agyelrendezes, medence, parkolas, legkondi, wifi, kisallat, csaladbarat, kert / terasz, regio, kozeli fo pontok
- booking CTA linkesites elokeszitese
- Dandelion Koveskal kulon kezelese SabeeApp link nelkul

Nem resze az elso csomagnak:

- schema bovites
- kep SEO atiras
- Google Business Profile audit
- SabeeApp / Google Free Booking integracio
- uj landing oldalak

## 2. Pontos fajlterkep

### Kesobbi implementacioban modositando adatfajlok

HU adatparok:

- `src/data/accommodation-pages/d1.ts`
- `src/data/accommodation-pages/d2.ts`
- `src/data/accommodation-pages/fugehaz.ts`
- `src/data/accommodation-pages/zsalya.ts`
- `src/data/accommodation-pages/szololiget.ts`
- `src/data/accommodation-pages/szepvolgyi.ts`
- `src/data/accommodation-pages/royal_homes.ts`
- `src/data/accommodation-pages/vintage.ts`
- `src/data/accommodation-pages/koveskal.ts`

EN adatparok:

- `src/data/accommodation-pages/d1.en.ts`
- `src/data/accommodation-pages/d2.en.ts`
- `src/data/accommodation-pages/fugehaz.en.ts`
- `src/data/accommodation-pages/zsalya.en.ts`
- `src/data/accommodation-pages/szololiget.en.ts`
- `src/data/accommodation-pages/szepvolgyi.en.ts`
- `src/data/accommodation-pages/royal_homes.en.ts`
- `src/data/accommodation-pages/vintage.en.ts`
- `src/data/accommodation-pages/koveskal.en.ts`

### Kesobbi implementacioban modositando template / type fajlok

- `src/data/accommodation-pages/types.ts`: uj opcionalis mezok felvetele.
- `src/templates/AccommodationPage.astro`: uj lathato blokkok es CTA linkesitesi minta.

### Adapter modositas

Valoszinuleg nem kotelezo az elso korben.

Indok:

- a jelenlegi `AccommodationPage.astro` kozvetlenul `pageData` alapjan renderel
- a `buildGalleryImages`, `buildHeroImages`, `buildRelatedStays` adapterek kep/review/related stay feladatot vegeznek
- az uj dontesi blokkok nem igenyelnek kep- vagy related-stay transzformaciot

Adapter modositas csak akkor kell, ha kesobb:

- normalizalt booking CTA allapotot kell generalni
- kozponti HU/EN defaultokat kell osszefuzni
- iconKey fallbacket vagy statusz alapjan generalt kartyakat kell kezelni

### Type modositas

Kell.

Javasolt hely:

- `src/data/accommodation-pages/types.ts`

Javasolt uj opcionalis mezok:

- `decisionFacts`
- `recommendation`
- `notIdealFor`
- `bookingCta`
- `poolStatus`
- `petPolicy`
- `parking`
- `airConditioning`
- `wifi`

### EN adatpar modositas

Kell.

Szabaly:

- minden HU mezonek legyen EN megfeleloje
- EN oldalon ne maradjon gyengebb vagy kevesbe konkret allitas, ha HU oldalon mar publikus
- SabeeApp linknel nem-Koveskal oldalaknal `lang=En`
- Koveskal eseteben EN oldalon is kulon CTA dontes kell SabeeApp link nelkul

### Wrapper oldalak

Nem javasolt modositani.

Ellenorzott pelda:

- `src/pages/dandelion-d1.astro`
- `src/pages/en/dandelion-d1.astro`
- `src/pages/dandelion-koveskal.astro`
- `src/pages/en/dandelion-koveskal.astro`

A wrapper oldalak jelenleg vekonyak: pageData + imageSet + lang/canonical parametert adnak a kozos template-nek. Ezt meg kell tartani.

### Tilos erinteni az elso implementacios csomagban

- `src/data/images/accommodation-images.ts`
- `src/data/images/image-types.ts`
- image registry es kep SEO mezok
- schema implementacios logika
- `public/robots.txt`
- `src/pages/sitemap.xml.ts`
- `src/data/accommodations.ts`, kiveve ha kulon listing-paritas task indul
- `src/layouts/BaseLayout.astro`, kiveve ha kulon jovahagyott header CTA task indul
- `dist/`
- legacy media / admin / runtime kepforrasok

## 3. Javasolt adatmodell

Az uj adatok a szallasoldali `AccommodationPageData` tipusba keruljenek opcionalis mezokent, hogy a sablon visszafele kompatibilis maradjon.

Javasolt tipusvazlat:

```ts
interface AccommodationDecisionFact {
  key:
    | "guests"
    | "bedrooms"
    | "bathrooms"
    | "beds"
    | "pool"
    | "parking"
    | "airConditioning"
    | "wifi"
    | "pets"
    | "family"
    | "gardenTerrace"
    | "region"
    | "nearby";
  iconKey: string;
  label: string;
  value: string;
  status?: "confirmed" | "check" | "blocked";
}

interface AccommodationRecommendationBlock {
  title?: string;
  position: string;
  chooseIf: string[];
  notIdealFor: string[];
  status?: "draft" | "approved";
}

interface AccommodationBookingCta {
  mode: "sabeeapp" | "inquiry" | "internal" | "blocked";
  href?: string;
  label: string;
  note?: string;
  openBeEnabled?: boolean;
}
```

Javasolt mezok `AccommodationPageData` alatt:

```ts
decisionFacts?: AccommodationDecisionFact[];
recommendation?: AccommodationRecommendationBlock;
bookingCta?: AccommodationBookingCta;
poolStatus?: "shared" | "private" | "none" | "check";
petPolicy?: "allowed" | "notAllowed" | "check";
parking?: "free" | "private" | "yard" | "street" | "none" | "check";
airConditioning?: "yes" | "partial" | "no" | "check";
wifi?: "yes" | "no" | "check";
```

Adatmodell-szabalyok:

- a `decisionFacts` legyen a lathato quick-fact blokk forrasa
- a `decisionPanel.overviewFacts` megtarthato atmenetileg, de hosszabb tavon vagy szinkronizalni kell, vagy ki kell valtani
- a `recommendation.status` kezdetben `draft`, csak tulajdonosi jovahagyas utan lehet `approved`
- schema kesobb csak `approved` es oldalon lathato adatra epulhet
- Koveskal `bookingCta.mode` ne legyen `sabeeapp`, amig nincs SabeeApp link

## 4. Sablonbeepitesi terv

### Gyors dontesi adatblokk helye

Jelenlegi relevans sablonresz:

- `AccommodationPage.astro`: `d2-details` szekcio
- jobb oldali `d2-details__panel`
- jelenlegi `d2-overview` blokk az `overviewFacts` alapjan renderel

Javaslat:

- az elso implementacioban a gyors dontesi adatblokk a jelenlegi `d2-overview` helyen maradjon
- a forras legyen `pageData.decisionFacts ?? decisionPanel.overviewFacts ?? facts.groups fallback`
- igy nem borul a jelenlegi Dandelion / D2 vizualis ritmus
- a blokk lathato HTML szovegkent tartalmazza a tenyleges adatokat, nem csak ikonokat

Lathato mezok:

- ferohely
- haloszobak
- furdok
- agyelrendezes
- medence
- parkolas
- legkondi
- wifi
- kisallat
- csaladbarat
- kert / terasz
- regio
- kozeli fo pontok

Mobil terv:

- 2 oszlopos kompakt grid maradhat
- rovid `label + value` szerkezet
- hosszu mondat ne keruljon fact kartyaba
- bizonytalan adat ne legyen veglegesnek tuno allitas

### Kinek ajanljuk / nem idealis blokk helye

Javasolt hely:

- a `d2-details` szekcion belul vagy kozvetlenul utana
- logikailag a `decisionPanel.reasons` utan, de a `amenities` elott vagy utan

Ajanlott elso megoldas:

- a jobb oldali panelben maradhat egy kompakt `d2-recommendation` blokk
- ket alblokk:
  - `Ezt valaszd, ha...`
  - `Nem ez a legjobb valasztas, ha...`

Indok:

- a fix lakasoldali sorrendben a `Kinek ajanljuk` blokk a felszereltseg elott/korul szerepel
- a dontesi panel mar most is erre a szerepre van hasznalva
- a blokk Google szamara lathato HTML lista legyen

Design-irany:

- Dandelion stilus: Poppins body, Playfair csak headline, meleg hatter, finom arany vonalak
- ne legyen uj landing-page jellegu nagy hero-blokk
- ne legyen kartyakartyaba zart felulet
- a jelenlegi `d2-reasons__card` / `d2-amenities__card` vizualis nyelvet kell folytatni
- mobilon legfeljebb 3-5 `chooseIf` es 1-3 `notIdealFor` pont jelenjen meg

Google / AI szempontbol lathato HTML:

- ne data attribute-ben legyen a lenyeg
- ne csak JS utani tartalom legyen
- listak legyenek statikus Astro renderelt HTML-ben
- ne hasznaljon rejtett, SEO-only szoveget

## 5. Booking CTA terv

### Jelenlegi allapot

`AccommodationPage.astro` jelenleg:

- hero CTA: `<button type="button" ... onclick="OpenBE()">`
- details CTA: `<button type="button" ... onclick="OpenBE()">`
- `OpenBE()` a scriptben `window.open(bookingLink, "_blank", "noopener,noreferrer")`
- a szobaspecifikus `bookingLink` csak JS valtozokent latszik, nem fo CTA `<a href>`-kent

`BaseLayout.astro` jelenleg:

- header desktop/mobile CTA rendes `<a href={bookingHref}>`
- ez property szintu SabeeApp link, nem szobaspecifikus

### Javasolt kesobbi CTA minta

Nem-Koveskal oldalak:

```astro
<a
  href={pageData.bookingCta?.href ?? bookingLink}
  class="dnd-btn dnd-btn--primary"
  target="_blank"
  rel="noopener noreferrer"
  data-open-be
>
  {pageData.bookingCta?.label ?? pageData.details.ctaLabel}
</a>
```

OpenBE megtartasa:

- `OpenBE()` maradhat kompatibilitasi helperkent
- ha a SabeeApp overlay / popup viselkedes kesobb kell, az anchor kattintasra JS progressziv enhancementkent kezelheto
- JS nelkul is mukodjon a link
- tracking kesobb `data-booking-cta` vagy hasonlo attributummal mehet, de ne ez legyen a link egyetlen forrasa

Koveskal:

- `bookingCta.mode` legyen `blocked` vagy `inquiry`, amig nincs dontes
- ne mutasson sajat oldalra foglalasi CTA-kent
- lehetseges jovahagyando opciok:
  - kapcsolatfelveteli CTA
  - erdeklodesi URL
  - email / telefon alapu megoldas
  - kesobbi kulon booking engine link
- schema es booking URL ne tartalmazzon Koveskal foglalasi linket, amig nincs vegleges dontes

## 6. Kockazatok

Design tores:

- a `d2-details__panel` most is suru; tul sok uj fact kartya mobilon hosszu blokkot okozhat
- a `notIdealFor` lista rossz helyen tul negativnak tunhet
- uj CSS csak a jelenlegi `d2-*` rendszerbe illeszkedhet

Adatduplikacio:

- `facts.groups`, `features.highlights`, `decisionPanel.overviewFacts`, `amenities` es az uj `decisionFacts` ugyanazt az adatot ismetelheti
- az elso implementacioban ki kell jelolni, melyik blokk a master forras
- javaslat: `decisionFacts` legyen a gyors dontesi blokk forrasa; `facts.groups` maradhat editorial/reszletes adatra

HU/EN elteres:

- minden HU adatfajlhoz paros EN frissites kell
- EN SabeeApp linkeknel `lang=En`
- Koveskal EN CTA kulon kockazat, mert nincs SabeeApp link

SabeeApp kockazat:

- nem-Koveskal `selectedRooms` kodokat tulajdonosnak ujra jovahagyni kell
- OpenBE atalakitasnal nem veszhet el a jelenlegi mukodes
- header CTA property szintu marad, szallasoldali CTA szobaspecifikus lehet; ezt kommunikacioban nem szabad osszekeverni

Build es vizualis ellenorzes:

- jovahagyott implementacio utan kotelezo `npm run build`
- desktop es mobil ellenorzes legalabb D2, D1, Fugehaz, Royal Homes, Koveskal oldalon
- 360-390px mobil szelesseg kulon ellenorzendo
- CTA href ellenorzes DOM-ban
- JS nelkuli linkut ellenorzese legalabb HTML szinten

## 7. Javasolt implementacios sorrend

Maximum 4 kisebb task:

1. Adatmodell / type elokeszites
   - `types.ts` opcionalis mezok
   - template fallback logika tervezett bekotese, de adatok nelkul

2. HU adatok beirasa
   - HU `accommodation-pages/*.ts`
   - csak tulajdonos altal jovahagyott recommendation copy
   - Koveskal CTA csak dontes utan

3. Template blokk beepitese
   - `AccommodationPage.astro`
   - gyors dontesi blokk forrasvaltas
   - `recommendation` blokk lathato HTML-ben
   - CTA anchor minta csak jovahagyott booking allapottal

4. EN paritas + build + vizualis ellenorzes
   - EN adatfajlok
   - `npm run build`
   - desktop/mobil vizualis ellenorzes
   - CTA href es OpenBE regresszio ellenorzes

## 8. Jelenlegi blokkolok

- `GOOGLE_AI_READINESS_RECOMMENDATION_COPY.md` meg DRAFT / tulajdonosi jovahagyasra var.
- Dandelion Koveskal CTA dontes kell, mert nincs SabeeApp booking link.
- Revfulop pontos strandnev ellenorizendo.
- D1, D2, Fugehaz, Zsalya, Szololiget haloszoba / szobastruktura pontos publikus megfogalmazasa meg ellenorizheto.
- Konkret strandlistak tobb szallasnal meg pontosithatok.
- Nem-Koveskal SabeeApp selectedRooms linkeket CTA-implementacio elott ujra erdemes jovahagyni.

## 9. Jovahagyasi kapu

Az elso implementacios csomag csak akkor induljon, ha:

- Csanad jovahagyta a recommendation copy tartalmat.
- Csanad jovahagyta ezt a Package 1 tervet.
- Koveskal CTA irany eldolt.
- SabeeApp linkek vagy legalabb a nem-Koveskal booking URL-ek jovahagyottak.
- A task kifejezetten engedi a kod- es adatfajl-modositast.

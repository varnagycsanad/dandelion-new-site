# DWA-AUTUMN-MULTIHOUSE-PREVIEW-001

## Átadás

- Checkout: `C:\Users\cvarn\Desktop\NEW HONLAP\Adatok\dandelion-new-site`
- Branch: `dwa/autumn-offers-multihouse-preview`
- Mód: preview/branch implementáció; `main` és az éles oldal nem módosult.
- Érintett route-ok:
  - `/ajanlatok/oszi-kettesben/`
  - `/ajanlatok/oszi-csaladi-pihenes/`

## Módosított fájlok

- `src/pages/ajanlatok/[slug].astro` – a két HU route az új, külön preview template-re került.
- `src/templates/AutumnMultiHouseOfferPage.astro` – megtartott hero és direktfoglalási blokk, új kompakt köztes tartalom, két célcsoport-specifikus házválasztó rács.
- `src/data/offers/autumn-multihouse.ts` – a 8 ház sorrendje, publikus házoldal-linkje, projekt-owned registry-képe és rövid döntéstámogató szövege.

Nem módosult `dist/` forrásként, platformbeállítás, SabeeApp, Google Ads, Meta, GA4, GTM, GSC vagy live route-konfiguráció.

## Megvalósítás

### Megtartott elemek

- A jelenlegi Balaton-felvidéki naplementés hero-videó/poster és a meglévő hero-struktúra.
- A jobb oldali „Közvetlenül éri meg” panel.
- A 8% ár-előny kommunikációja.
- A sötét közvetlen foglalási blokk: „Foglaljatok közvetlenül és élvezzétek az előnyöket!”, 8% ár-előny, „Árak és szabad időpontok”, „Írásban érdeklődöm”, WhatsApp, közvetlen kapcsolat, gyors visszaigazolás és rugalmas ügyintézés.

### Új középső tartalom

- Kompakt háromképes hangulati blokk projekt-owned, meglévő ajánlati assetekből.
- Desktopon bal oldali, ideiglenes választást segítő kérdés–felelet szövegvázlat és jobb oldalon a három meglévő kép függőleges stackben; mobilon egymás alá törő elrendezés.
- Páros oldal:
  - „Reggel másképp indul a nap.” — Panoráma, terasz, csend.
  - „Hideg kint. Meleg bent.” — Kandalló, saját tér, meghitt esték.
  - „Egy pohár bor. Egy hosszú este.” — Borászatok, lassú délutánok, közös beszélgetések.
- Családi oldal:
  - „Közös terek, közös ritmus.”
  - „A rossz idő nem programvége.”
  - „Kert, grillezés, tűzrakás.”

### Mind a 8 ház mindkét oldalon

Minden kártya tartalmaz képet, háznevet, „Akkor válasszátok, ha…” döntéstámogató sort és másodlagos „Megnézem a házat” linket a publikus házoldalra.

- Mindkét oldalon egységes sorrend: Dandelion D2, Fügeház, Dandelion Zsálya, Szőlőliget, Dandelion Vintage, Dandelion Köveskál, Dandelion Royal Homes, Dandelion Szépvölgyi.
- Dandelion D1 szándékosan kikerült ebből az őszi választóból; a D1 saját publikus oldala és más, nem érintett route-ok változatlanok.
- A páros hero és meta copy a hozzátok illő Dandelion-ház kiválasztására, a családi copy a családhoz illő Dandelion-ház kiválasztására irányít; egyik oldal sem nevez meg egyetlen házat értékesítési célpontként.

## CTA és tracking

- A direkt booking CTA az adott meglévő offer rekord `bookingUrl` értékét használja; új SabeeApp-link vagy rate plan nem készült.
- A kapcsolat- és WhatsApp-CTA-k megmaradtak.
- A meglévő `data-dnd-property`, `data-dnd-campaign`, `data-dnd-offer`, `data-dnd-placement` és `data-dnd-cta-type` attribútumok megmaradtak.
- A renderelt két route-on a booking, contact és WhatsApp CTA jelen van; a `CSERÉLNI` jelölés nincs jelen.

## DSA escalation / üzleti korlát

DSA-validáció nem áll rendelkezésre arra, hogy ugyanaz az őszi ajánlat, ár, rate plan, availability vagy room mapping ténylegesen mind a 8 házra érvényes. Ezért a házrács kizárólag választási és publikus házoldal-navigációs réteg; konkrét házszintű ár-, elérhetőség- vagy SabeeApp-állítás nincs benne. A release előtt DSA-ellenőrzés szükséges, ezért a végső státusz `HOLD_REVALIDATION_REQUIRED`.

## DMA / DCA megjegyzések

- DMA: nincs Ads, Meta, GA4, GTM, GSC vagy egyéb marketingplatform-írás; a meglévő tracking contract csak ellenőrzésre került.
- DCA: ez specialist preview handoff; DCA release-jóváhagyás, route switch, deploy és platformművelet külön döntési kapu.

## Ellenőrzés

- `npm run build` — PASS; 158 oldal buildelve. Az Astro két meglévő guide-route prioritási warningot jelzett (`/guide/d1/medence`, `/guide/d1/aszf`), ez nem a preview módosításból ered.
- `npm run check` — PASS; root deploy check `READY`.
- `npm run test:tracking` — PASS; 3/3 teszt.
- Renderelt route ellenőrzés — mindkét oldalon 8 házkártya és 3 hangulati panel; D1 nincs jelen.
- Desktop QA — 1440×900: naplementés hero, jobb oldali direktfoglalási panel, kompakt köztes blokk, házválasztó és sötét booking blokk vizuálisan ellenőrizve.
- Mobil QA — 390×844: hero/panel, egymás alá törő hangulati panelek és házkártyák, booking átmenet ellenőrizve; horizontális túlcsordulás nincs.
- Házoldal-linkek — 8/8 mindkét oldalon publikus Astro route-ra mutat.
- `CSERÉLNI` — 0 találat mindkét renderelt preview route-on.

## No-live és git státusz

- `noLiveWriteConfirmed=true`
- `routeSwitch=false`
- `deploy=false`
- `push=false`
- `commit=false` — nincs commit létrehozva; a branch lokális preview átadásként maradt.

## Végső státusz

`HOLD_REVALIDATION_REQUIRED`

Implementációs és technikai preview-készültség megvan, de DSA 8-házas ajánlati validáció és külön DCA release-jóváhagyás nélkül nem tekinthető élesíthetőnek.

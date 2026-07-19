# Szent György-hegy MATINÉ 2026 landing – implementáció és QA

Status: AKTUALIS  
Last checked: 2026-07-19  
Use for: a 2026-os MATINÉ szállás landing implementációja, mérése és publikálás előtti ellenőrzése

## Implementáció

- Útvonal: `/szent-gyorgy-hegy-matine-szallas/`
- Oldaltípus: magyar, indexelhető, eseményhez kapcsolódó szállásértékesítő landing.
- Meglévő elemek: `BaseLayout`, központi szálláslista, szállásoldali adatfájlok, központi Astro képregiszter, SabeeApp linkek, consent és delegált CTA tracking.
- Szállások: Dandelion 1, Dandelion 2, Fügeház, Zsálya, Szőlőliget és Vintage.
- Foglalási szabály: érkezés 2026. szeptember 4., távozás 2026. szeptember 6., kötelező két éjszaka; szombaton nincs be- vagy kiköltözés.
- Eseményjogi közlés: a Dandelion nem szervező, a szállás nem tartalmaz eseménybelépőt.

## Panorama Pool kommunikáció

- Panorama Pool használattal: Dandelion 1, Dandelion 2, Fügeház.
- A medence 2026. szeptember 5-én működik.
- Medenceígéret nélkül: Zsálya, Szőlőliget, Vintage.
- Az oldal nem állítja, hogy minden Dandelion vendég használhatja a medencét.

## Hero videó és közlekedési opció – 2026. július 19.

- Forrás: a tulajdonos által átadott `Matiné 1.mp4`, amely a Szent György-hegyet, virágzó mezőt, szőlőket és lovast mutat. A videó 11,5 másodperces.
- Két hang nélküli, H.264, 30 fps-es, fast-start változat készült:
  - desktop: 1920 × 1080, 18,18 MB; az eredeti videó bitfolyama újratömörítés nélkül került át, ezért nincs minőségvesztés;
  - mobil: 1280 × 720, 6,31 MB, kb. 4,39 Mbps; a teljes 16:9 képkivágás megmaradt.
- A videóból külön desktop és mobil poster kép készült. A desktop poster az Open Graph kép és a `VideoObject` thumbnail forrása is.
- A hero videón nincs fekete vagy sötét színű overlay, és nincs rajta szövegpanel. A teljes videó külön, takarásmentes 16:9 szakaszban jelenik meg; a cím és a foglalási tartalom alatta kapott helyet desktopon és mobilon is.
- A videó indítható és szüneteltethető. `prefers-reduced-motion` esetén nem indul el automatikusan.
- Közlekedési opcióként bekerült a tiszta `https://badacsonytaxi.hu/` link, Google Ads click ID és kampányparaméterek nélkül. A szöveg nem állít partnerséget vagy garantált elérhetőséget; közvetlen egyeztetésre hívja fel a figyelmet.

## CTA-k és foglalási linkek

- Hero, záró és mobil sticky foglalás: a projektben használt stabil, magyar SabeeApp booking engine link.
- Házkártyák: a meglévő ház-adatfájlok igazolt `selectedRooms` linkje.
- Másodlagos CTA-k: telefon, ajánlatkérési oldal és e-mail.
- A booking linkek az attribúciós segéd meglévő működését használják, így az ismert UTM és click ID paraméterek továbbadhatók.
- Technikai korlátozás: a projektben nincs igazolt SabeeApp check-in/check-out URL-paraméterezés. Nem került be kitalált dátumparaméter; a dátumok az oldalon és tracking paraméterként jelennek meg.
- SabeeApp beállítás nem változott.

## Mérés

Az oldal a `public/scripts/dnd-ads-events.js` meglévő, delegált eseménykezelését használja. Új GTM-, GA4- vagy Ads-konverzió nem készült.

| CTA | dataLayer esemény | Fontos paraméterek |
|---|---|---|
| SabeeApp link | `dnd_booking_click` | `page_path`, `link_url`, `cta_text`, `property_slug`, `property`, `campaign`, `placement`, `check_in`, `check_out` |
| Telefon | `dnd_phone_click` | `page_path`, `link_url`, `event_label` |
| E-mail | `dnd_email_click` | `page_path`, `link_url`, `event_label` |
| Ajánlatkérés / kapcsolat | `dnd_contact_click` | `page_path`, `link_url`, `cta_text` |

Kampánykontextus: `szent-gyorgy-hegy-matine-2026`. A booking click továbbra is mikrokonverzió, nem foglalás és nem bevétel.

Consent működés:

- Alapállapotban a Google Consent Mode `analytics_storage`, `ad_storage`, `ad_user_data` és `ad_personalization` értéke `denied`.
- A CTA esemény a helyi `dataLayer` tömbbe consent nélkül is bekerülhet, de a GTM/GA4/Ads tagek továbbítását a meglévő consent trigger- és taglogika szabályozza.
- Hozzájárulás után a consent bridge `granted` állapotot küld a választott kategóriákra; az oldal ezt a logikát nem kerüli meg.

## SEO

- Title: `Szent György-hegy MATINÉ szállás | Dandelion`
- Meta description: `Szállás a 2026. szeptember 5-i Szent György-hegy MATINÉ hétvégéjére. Érkezés szeptember 4-én, távozás szeptember 6-án, két éjszakára.`
- Canonical: `https://dandelionhouse.hu/szent-gyorgy-hegy-matine-szallas/`
- Robots: `index,follow`.
- Open Graph: egyedi cím/leírás a layoutból és meglévő Dandelion hero kép.
- Strukturált adat: `CollectionPage`, `ItemList` és `BreadcrumbList`; Event schema nincs, ezért a Dandelion nem jelenik meg szervezőként.
- Belső linkek: mind a hat szállásoldal, szállásgyűjtő, Panorama Pool, kapcsolat.
- Sitemap: az új útvonal bekerült a statikus sitemap-forrásba.

## Adatforrás és ismert eltérések

- A kártyák elhelyezkedése és URL-je a `src/data/accommodations.ts` fájlból jön.
- A férőhely, rövid pozicionálás és booking URL a házankénti `src/data/accommodation-pages/*.ts` adatból jön.
- A képek a központi szállásképi registryből jönnek.
- Szőlőligetnél a pozicionálási kulcsadat és SEO leírás 4 főt mond, míg a részletes facts blokk `4 fő + 1 pótágy` értéket is tartalmaz. A landing a konzervatív 4 fős kulcsadatot mutatja.
- Dandelion D1 a központi listában `6–8 fő`, a részletes adatban `8 fő`; a landing a részletes férőhelyadatot mutatja.
- Dandelion D2 a kártyaadatban `4–6 fő`, a kulcsadatban `6 fő`; a landing a részletes férőhelyadatot mutatja.

## QA jegyzőkönyv

Ellenőrizve 2026. július 19-én:

- `npm install`: sikeres, a lockfile szerint minden függőség naprakész. Az npm audit 23, nem e feladathoz kötődő függőségi sérülékenységet jelez (1 low, 19 moderate, 3 high); automatikus `audit fix` nem futott.
- `npm run build`: sikeres, 146 statikus oldal készült, köztük az új landing. A buildben két, már meglévő `/guide/d1/*` route-prioritási figyelmeztetés maradt; a landinghez kötődő hiba nem volt.
- `npm run check`: nincs ilyen script a projektben, ezért ez tooling gapként rögzítve.
- `npm run check:root`: sikeres, minden root-, asset- és CTA-ellenőrzés átment.
- `git diff --check`: sikeres.
- A buildelt HTML-ben ellenőrizve: title, meta description, pontos canonical, `index,follow`, Open Graph, `CollectionPage`, `ItemList`, `BreadcrumbList`, jogi közlés, kampányattribútumok és sitemap-bejegyzés.
- Vizuális QA: 1440 × 900, 390 × 844 és 360 × 800 nézetben; nincs vízszintes túlcsordulás, hiányzó alt vagy hibás kép. A hat házkártya és a mobil sticky CTA megfelelően jelenik meg.
- Linkellenőrzés: 21 egyedi belső URL-ből 21 HTTP 200; a hivatalos eseményoldal, az általános SabeeApp link és mind a hat ház `selectedRooms` linkje HTTP 200.
- Helyi `dataLayer` debug: a hero és házkártya `dnd_booking_click`, továbbá a `dnd_phone_click`, `dnd_email_click` és `dnd_contact_click` esemény a várt útvonal-, kampány-, placement-, ház- és dátumparaméterekkel jelent meg.
- Consent debug: induláskor minden Google storage mező `denied`; tesztelt analitikai hozzájárulás után `analytics_storage: granted`, a hirdetési mezők továbbra is `denied`, és megjelent a `dnd_consent_update` / `dnd_analytics_granted` esemény.
- Lighthouse mobil: Performance 77, Accessibility 100, Best Practices 100, SEO 100; FCP 1,6 s, LCP 5,1 s, TBT 200 ms, CLS 0,055.
- Lighthouse desktop: Performance 95, Accessibility 100, Best Practices 100, SEO 100; FCP 0,8 s, LCP 1,3 s, TBT 10 ms, CLS 0,007.
- A Lighthouse Windows alatt a JSON riport kiírása után átmeneti Chrome-mappa törlési `EPERM` figyelmeztetést adott; a riportok érvényesen elkészültek. A mobil LCP további optimalizálása ajánlott, de nem blokkolja a landing kiadását.

A hero videós frissítés után:

- Desktop böngészős QA: az 1920 × 1080-as, újratömörítés nélküli `Matiné 1` videó töltődött be; sem szövegpanel, sem sötét overlay nem takarja.
- Mobil böngészős QA 390 × 844 nézetben: az 1280 × 720-as mobil forrás töltődött be teljes 16:9 képpel, nincs képkivágás, panelátfedés vagy vízszintes túlcsordulás.
- A Badacsony Taxi link célja, új lapos működése, külső link attribútumai és kampány/placement kontextusa ellenőrizve.
- Mobil Lighthouse teljes futások: Performance 59–77, Best Practices 100, SEO 100; a mérés lokális, throttlingolt futások között jelentős szórást mutatott. A jobb futás LCP-je 4,1 s, CLS-e 0,001 volt.
- Végső, célzott Lighthouse Accessibility ellenőrzés: 100, color contrast audit: sikeres.

## Production publikálás előtt

- Friss SabeeApp availability ellenőrzés mind a hat házra.
- A két éjszakás minimum és a szombati be-/kiköltözési tiltás ellenőrzése a foglalási rendszerben.
- A Panorama Pool szeptember 5-i működésének végső üzemeltetői ellenőrzése.
- A hivatalos eseményoldal dátumának és időpontjának ismételt ellenőrzése.
- GTM Preview / Tag Assistant ellenőrzés valódi konténerrel és mindkét consent állapotban.
- Production URL, canonical és booking flow smoke test publikálás után.

## Esemény utáni oldalkezelés

2026. szeptember 6. után tulajdonosi döntés szükséges. Elsődleges javaslat: tartós Szent György-hegy szállásoldallá alakítás, majd csak hivatalosan megerősített 2027-es eseménydátummal frissítés. Alternatíva: 301 átirányítás egy releváns általános Szent György-hegy szállásoldalra. Az oldal ne maradjon elavult 2026-os ajánlattal és ne kerüljön automatikusan 404-re.

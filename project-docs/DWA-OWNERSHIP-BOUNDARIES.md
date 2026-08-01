# DWA Documentation Ownership Boundaries

Status: AKTUALIS
Last checked: 2026-07-25
Use for: gyors routing DWA, DMA, DSA es DCA ownership szerint
Do not use for: live platform write jovahagyasara vagy business truth felulirasara

## Cel

Ez a dokumentum roviden rogziti, hogy a DWA repo dokumentacioja milyen ownership-hatarokkal olvasando.

## Ownership roviden

### DWA

DWA a kovetkezoket birja:

- website source es oldalszerkezet,
- landingek, onsite CTA feluletek es onsite tracking implementacio,
- SEO, GEO source, schema, sitemap, hreflang,
- build evidence es repoallapothoz kotott technikai forras.

### DMA

DMA a kovetkezoket birja:

- Google Ads, Meta Ads, GA4 reporting/admin,
- GTM publish/admin,
- Search Console property/admin,
- campaign planning, budget, targeting, platform write,
- platform workflowk es platformhoz kotott operational runbookok.

### DSA

DSA a kovetkezoket birja:

- SabeeApp booking truth,
- booking URL, selectedRooms, nyelvi parameter es booking-motor valos allapot,
- rate, offer, availability es CTA uzleti igazsag,
- property/adat truth, amit nem pusztan a site source bizonyit.

### DCA

DCA a kovetkezoket birja:

- dontes, routing, approval,
- release supervision,
- cross-repo ownership konfliktusok feloldasa.

## Olvasasi szabaly

Ha egy dokumentum vegyes ownershipu:

1. DWA csak a site-side implementacios vagy source reszt kezelje truthkent.
2. Platform-admin vagy campaign write reszt DMA ownershipkent kell olvasni.
3. Booking/business truth reszt DSA ownershipkent kell olvasni.
4. Approval, routing vagy release dontes eseten DCA az ervenyes felulet.

## Cleanup szabaly

- Ha bizonytalan a routing, inkabb archive vagy redirect note keszuljon, ne torles.
- A DWA repo platform dokumentumai torteneti referenciakent megmaradhatnak, de nem szabad oket automatikus mai ownershipkent ertelmezni.
- A DWA repo nem tekintheto platform write jovahagyasi feluletnek.

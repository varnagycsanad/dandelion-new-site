# DWA-005 marketing docs ownership cleanup plan

Status: AKTUALIS
Last checked: 2026-07-25
Use for: DWA marketing/platform dokumentumok ownership-rendezese es biztonsagos cleanup sorrendje
Do not use for: live platform write jovahagyasara, DMA/DSA repo helyetti vegleges truthkent

## Cel

Ez a cleanup plan azt rogziti, hogy a `project-docs/` alatti marketing, tracking, GA4, GTM, GSC, Google Stack, GEO es Google AI Readiness dokumentumok kozul:

- mi marad aktiv DWA kontextusban,
- mi DMA-owned platform dokumentacio,
- mi DSA-owned booking/business truth,
- mi csak archival javaslat,
- es mihez kell kesobbi kezi dontes.

Ebben a korben:

- nem tortent honlapkod-modositas,
- nem tortent live Ads / Meta / GA4 / GTM / GSC / SabeeApp muvelet,
- nem tortent `.env`, `.secrets`, token vagy credential fajl modositas,
- es nem tortent tomeges dokumentum-mozgatas.

## DWA-ban marad aktiv dokumentaciokent

Ezek a fajlok a website specialist scope-ban maradnak, mert site-side SEO, CTA, schema, oldalstruktura vagy build/source kontextust adnak.

| Dokumentum | Dontes | Miert marad DWA-ban | Akcio ebben a korben |
| --- | --- | --- | --- |
| `project-docs/00-projekt-alap.md` | DWA-ban marad | torteneti, de website szerkezeti es SEO/landing kiindulopont | nincs valtozas |
| `project-docs/01-oldalterkep.md` | DWA-ban marad | oldalterkep, landing es SEO struktura | nincs valtozas |
| `project-docs/02-oldaltipusok-es-blokk-matrix.md` | DWA-ban marad | oldaltipusok, CTA blokkok, oldalviselkedes | nincs valtozas |
| `project-docs/03-tartalommodell.md` | DWA-ban marad | oldal- es tartalommodell, SEO/CTA mezok | nincs valtozas |
| `project-docs/04-navigacios-logika.md` | DWA-ban marad | site navigation es CTA elhelyezes | nincs valtozas |
| `project-docs/05-seo-struktura.md` | DWA-ban marad | SEO source es oldalstruktura | nincs valtozas |
| `project-docs/06-foglalasi-cta-logika.md` | DWA-ban marad, DSA dependency-vel | DWA a site-side CTA feluletet birja; a SabeeApp/ajanlat truth nem itt dol el | nincs valtozas |
| `project-docs/current-sitemap-audit-2026-05-24.md` | DWA-ban marad | sitemap/source audit a website strukturara vonatkozik | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_SCHEMA_PLAN.md` | DWA-ban marad | schema mezo- es implementacios forras | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_SCHEMA_AUDIT.md` | DWA-ban marad | JSON-LD/source audit a honlap kodjahoz kotve | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_SOURCE_AUDIT.md` | DWA-ban marad | image SEO source audit | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_REVIEW_BATCH_1.md` | DWA-ban marad | kepi SEO review input | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_IMAGE_SEO_GAPS.md` | DWA-ban marad | kepi SEO hianylista a site source-hoz | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_POSITIONING_MATRIX.md` | DWA-ban marad | oldalszintu positioning/copy source | nincs valtozas |

## DMA ownership

Ezeknek a dokumentumoknak a mai fo ownershipje DMA, mert platform-admin, campaign planning, GA4/Ads riportolas, GTM publish/admin, Meta kezeles vagy mas platform-write workflow a fo targyuk.

| Dokumentum | Dontes | Miert DMA | Akcio ebben a korben |
| --- | --- | --- | --- |
| `project-docs/GOOGLE_ADS_CODEX_INTEGRATION.md` | DMA ownership | Ads API, auth, report, mutate workflow | ownership note hozzaadva |
| `project-docs/GOOGLE_STACK_API_SETUP.md` | DMA ownership | GA4/GSC/Ads auth es platform API setup | ownership note hozzaadva |
| `project-docs/GOOGLE_STACK_DAILY_OPERATIONS.md` | DMA ownership | napi Ads/GTM/GA4 uzemeltetesi runbook | ownership note hozzaadva |
| `project-docs/GA4_CODEX_ANALYTICS.md` | DMA ownership | GA4 riport es credential workflow | ownership note hozzaadva |
| `project-docs/META_ADS_CODEX_INTEGRATION.md` | DMA ownership | Meta Ads API es kontrollalt mutacios workflow | ownership note hozzaadva |
| `project-docs/META_PAGE_POSTING_CODEX_INTEGRATION.md` | DMA ownership | Facebook-oldal posztolas es page token workflow | ownership note hozzaadva |
| `project-docs/google-ads-current-audit-2026-07-15.md` | DMA ownership | platform audit es optimalizacios allapot | ownership note hozzaadva |
| `project-docs/google-ads-cz-sk-audit-2026-07-15.md` | DMA ownership | campaign/market opening audit | ownership note hozzaadva |
| `project-docs/google-ads-codex-tooling-audit-2026-07-13.md` | DMA ownership | Ads tooling readiness audit | ownership note hozzaadva |
| `project-docs/google-ads-ga4-audit-living.md` | DMA ownership | Ads + GA4 measurement living audit | ownership note hozzaadva |
| `project-docs/meta-setup-status-2026-07-13.md` | DMA ownership | point-in-time Meta platform state | ownership note hozzaadva |
| `project-docs/meta-codex-kezelhetosegi-audit-2026-07-13.md` | DMA ownership | Meta daily operability audit | ownership note hozzaadva |
| `project-docs/DANDELION_GEO_API_SETUP.md` | DMA ownership, manual follow-upval | GSC/GA4 auth es platform hozzaferes a fo tema | most nem kapott note-ot; kesobbi DMA mirror/redirect utan frissitendo |

## DSA ownership

Ezek a dokumentumok booking, property, offer vagy tulajdonosi truthot hordoznak, ezert nem szabad oket tisztan DWA-s implementacios igazsagkent kezelni.

| Dokumentum | Dontes | Miert DSA | Akcio ebben a korben |
| --- | --- | --- | --- |
| `project-docs/GOOGLE_AI_READINESS_BOOKING_LINKS.md` | DSA ownership, DWA reference ertekkel | booking link, SabeeApp es CTA truth keveredik benne | nincs valtozas; manual review kell |
| `project-docs/GOOGLE_AI_READINESS_PROPERTY_DATA_GAPS.md` | DSA ownership | szallasadat truth es tulajdonosi megerosites | nincs valtozas |
| `project-docs/GOOGLE_AI_READINESS_OWNER_INPUT.md` | DSA ownership | tulajdonosi input es booking/ingatlan truth | nincs valtozas |

## Archive only javaslat

Ezek a dokumentumok erosen torteneti, egyszeri audit vagy rollout jelleguek. Ebben a korben nem lettek mozgatva, mert a biztonsagos archivlashoz kesobbi hivatkozas- es ownership-ellenorzes kell.

| Dokumentum | Javaslat | Indok | Mozgatas most |
| --- | --- | --- | --- |
| `project-docs/google-ads-current-audit-2026-07-15.md` | archive when mirrored in DMA | datumhoz kotott allapotkep | nem |
| `project-docs/google-ads-cz-sk-audit-2026-07-15.md` | archive when mirrored in DMA | egyszeri piacnyitasi audit | nem |
| `project-docs/google-ads-codex-tooling-audit-2026-07-13.md` | archive when mirrored in DMA | egyszeri tooling audit | nem |
| `project-docs/meta-setup-status-2026-07-13.md` | archive when mirrored in DMA | pontszeru setup statusz | nem |
| `project-docs/meta-codex-kezelhetosegi-audit-2026-07-13.md` | archive when mirrored in DMA | pontszeru uzemi audit | nem |
| `project-docs/GOOGLE_TAG_GATEWAY_ROLLOUT_2026-07-10.md` | archive review | rollout dokumentum, vegyes site-side es GTM ownership | nem |

## Review needed

Ezeknel a dokumentumoknal a tartalom nem eleg tisztan egycsapatos ownershipu, vagy a mai szerepuk reszben source, reszben torteneti.

| Dokumentum | Miert review needed | Javasolt kesobbi dontes |
| --- | --- | --- |
| `project-docs/DANDELION_GEO_AGENT_SPEC.md` | GEO source + GA4/GSC/Ads monitoring scope keveredik | bontas DWA GEO source es DMA reporting ownership szerint |
| `project-docs/DANDELION_GEO_DATA_INPUT_SPEC.md` | DWA GEO kerdesforras, de platform adatbemenetekre epul | DMA adatinfra note vagy kulon input spec |
| `project-docs/DANDELION_GEO_API_SETUP.md` | API/auth setup, de GEO workflow kontextusban hasznalt | DMA redirect note + DWA-bol hivatkozott minimal read-only kivonat |
| `project-docs/GOOGLE_AI_READINESS.md` | projektkoveto, site-side es booking truth keveredik | kesobbi bontas tracker + source dokumentumokra |
| `project-docs/GOOGLE_AI_READINESS_EXECUTION_PLAN.md` | reszben site-side, reszben business/booking decision | manual ownership header kesobb |
| `project-docs/GOOGLE_AI_READINESS_IMPLEMENTATION_PACKAGE_1.md` | site-side implementacio es booking truth dependency vegyes | DWA doc maradhat, de DSA dependency note-tal |
| `project-docs/SZENT_GYORGY_HEGY_MATINE_LANDING_2026.md` | marketing brief es landing-site scope keveredik | manual dontes: DWA archive vagy DMA brief reference |
| `project-docs/email-marketing-mvp-plan.md` | marketing ops vs site integration nem egyertelmu | manual routing DMA vagy DCA altal |
| `project-docs/newsletter-production-runbook.md` | site infra, de marketing delivery celhoz kotott | manual dontes: DWA infra vagy DCA operations |

## Mely doksik kapnak DMA redirect note-ot most

Ebben a korben a kovetkezo 12 dokumentum kapott rovid ownership note-ot a fajl elejen:

1. `project-docs/GOOGLE_ADS_CODEX_INTEGRATION.md`
2. `project-docs/GOOGLE_STACK_API_SETUP.md`
3. `project-docs/GOOGLE_STACK_DAILY_OPERATIONS.md`
4. `project-docs/GA4_CODEX_ANALYTICS.md`
5. `project-docs/META_ADS_CODEX_INTEGRATION.md`
6. `project-docs/META_PAGE_POSTING_CODEX_INTEGRATION.md`
7. `project-docs/google-ads-current-audit-2026-07-15.md`
8. `project-docs/google-ads-cz-sk-audit-2026-07-15.md`
9. `project-docs/google-ads-codex-tooling-audit-2026-07-13.md`
10. `project-docs/google-ads-ga4-audit-living.md`
11. `project-docs/meta-setup-status-2026-07-13.md`
12. `project-docs/meta-codex-kezelhetosegi-audit-2026-07-13.md`

## Mit nem szabad torolni

- A `project-docs/00-06` torzsdokumentumokat, mert ezek adjak a DWA oldalstruktura, SEO es CTA alaplogikat.
- Az `INDEX.md`-t, `ELO_FELADATLISTA.md`-t es a jelen cleanup/boundary dokumentumokat.
- A sitemap, schema, image SEO es oldalstruktura forrasdokumentumokat.
- A DMA-owned platform dokumentumokat addig, amig nincs kulon DMA hely, mirror vagy jo indexelt archival redirect.
- A DSA-owned booking/property truth dokumentumokat addig, amig a booking es tulajdonosi igazsag masutt nincs megbizhatoan atvezetve.

## Biztonsagos kovetkezo lepesek

1. A DMA repo-ban vagy DMA dokumentacios helyen letre kell hozni a platform-owned tukorfeluleteket.
2. Utana a datumhoz kotott Ads/Meta auditok fokozatosan `archive/` ala mozgathatok.
3. A vegyes GEO es Google AI Readiness dokumentumokat kulon kell bontani source vs platform vs booking truth reszekre.
4. A DWA repo-ban a jovo beli marketing dokumentumoknal mar a letrehozas pillanataban szerepeljen ownership blokk.

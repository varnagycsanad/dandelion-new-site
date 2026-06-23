import type { GuideContent, GuideLocale, GuideLocaleContent, GuideSection } from "./types";
import { d1AszfGuide } from "./d1-aszf";
import { d1PoolGuide } from "./panorama-pool";

type BaseLocale = GuideLocale;
type SourceLocale = Exclude<GuideLocale, "sk">;
type LocalizedValue = Record<SourceLocale, string>;
type LocalizedCardCopy = {
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  description: LocalizedValue;
};

interface D1GuideCardEntry {
  guide: GuideContent;
  card: LocalizedCardCopy;
}

interface GuideFactoryOptions {
  slug: string;
  titles: LocalizedValue;
  category: LocalizedValue;
  summary: LocalizedValue;
  keyPointSubject: LocalizedValue;
  quickBullets?: Partial<Record<SourceLocale, string[]>>;
  customSections?: Partial<Record<SourceLocale, GuideSection[]>>;
}

const d1GuideLocales: BaseLocale[] = ["hu", "en", "cs", "de", "sk"];

const resolveSlovakFallback = <T>(values: Partial<Record<SourceLocale, T>>): T => values.cs ?? values.en ?? values.de ?? values.hu!;

const createGenericSections = (locale: BaseLocale, title: string, subject: string): GuideSection[] => {
  if (locale === "hu") {
    return [
      {
        id: "helye",
        title: "1. Előkészített tartalmi hely",
        paragraphs: [
          `Ez az oldal a(z) ${title.toLowerCase()} témához lett előkészítve.`,
          "A végleges helyszíni információk, pontos lépések és esetleges fotók későbbi feladatban kerülnek be."
        ]
      },
      {
        id: "mi-kerul-ide",
        title: "2. Tervezett blokkok",
        paragraphs: ["A tartalom később különálló, könnyen frissíthető blokkokban jelenhet meg."],
        bullets: [
          `${subject} rövid, mobilon is gyorsan átfutható összefoglalója.`,
          "Gyakorlati lépések vagy gyors hibaelhárítás külön blokkban.",
          "Kapcsolódó megjegyzések, figyelmeztetések vagy házon belüli szabályok."
        ]
      },
      {
        id: "frissites",
        title: "3. Későbbi bővítés helye",
        paragraphs: [
          "A szerkezet úgy lett előkészítve, hogy a végleges vendégszöveg, képek vagy linkek külön is könnyen beilleszthetők legyenek."
        ],
        steps: [
          "Rövid alapinformációk felvétele.",
          "Szükség esetén lépésről lépésre útmutató hozzáadása.",
          "Kapcsolódó linkek vagy kiegészítő blokkok bekötése."
        ]
      }
    ];
  }

  if (locale === "en") {
    return [
      {
        id: "placeholder",
        title: "1. Prepared content slot",
        paragraphs: [
          `This page has been prepared for the topic "${title}".`,
          "Final on-site details, exact steps and any supporting visuals will be added in a later task."
        ]
      },
      {
        id: "planned-blocks",
        title: "2. Planned blocks",
        paragraphs: ["The final content can later be filled into clearly separated, easy-to-update blocks."],
        bullets: [
          `A short mobile-friendly summary for ${subject}.`,
          "A separate block for practical steps or quick troubleshooting.",
          "Related notes, warnings or house-specific rules."
        ]
      },
      {
        id: "future-update",
        title: "3. Space for later expansion",
        paragraphs: [
          "The structure is prepared so final guest copy, images or links can be inserted later without rebuilding the page."
        ],
        steps: [
          "Add the short must-know information.",
          "Insert a step-by-step guide if needed.",
          "Attach related links or supporting blocks."
        ]
      }
    ];
  }

  if (locale === "cs") {
    return [
      {
        id: "misto",
        title: "1. Připravené místo pro obsah",
        paragraphs: [
          `Tato stránka je připravena pro téma "${title}".`,
          "Finální informace pro hosty, přesné kroky a případné obrázky budou doplněny v pozdějším úkolu."
        ]
      },
      {
        id: "bloky",
        title: "2. Plánované bloky",
        paragraphs: ["Finální obsah lze později doplnit do jasně oddělených a snadno upravitelných bloků."],
        bullets: [
          `Krátké mobilní shrnutí k tématu ${subject}.`,
          "Samostatný blok pro praktické kroky nebo rychlou pomoc.",
          "Související poznámky, upozornění nebo pravidla domu."
        ]
      },
      {
        id: "rozsireni",
        title: "3. Místo pro pozdější doplnění",
        paragraphs: [
          "Struktura je připravena tak, aby šlo později snadno doplnit finální texty, obrázky i odkazy."
        ],
        steps: [
          "Doplnit krátké základní informace.",
          "Přidat návod krok za krokem podle potřeby.",
          "Napojit související odkazy nebo doplňkové bloky."
        ]
      }
    ];
  }

  if (locale === "sk") {
    return [
      {
        id: "miesto",
        title: "1. Pripravené miesto pre obsah",
        paragraphs: [
          `Táto stránka je pripravená pre tému "${title}".`,
          "Finálne informácie pre hostí, presné kroky a prípadné obrázky budú doplnené v neskoršej úlohe."
        ]
      },
      {
        id: "bloky",
        title: "2. Plánované bloky",
        paragraphs: ["Finálny obsah sa neskôr doplní do jasne oddelených a ľahko upraviteľných blokov."],
        bullets: [
          `Krátke mobilné zhrnutie k téme ${subject}.`,
          "Samostatný blok pre praktické kroky alebo rýchlu pomoc.",
          "Súvisiace poznámky, upozornenia alebo pravidlá domu."
        ]
      },
      {
        id: "rozsirenie",
        title: "3. Miesto pre neskoršie doplnenie",
        paragraphs: [
          "Štruktúra je pripravená tak, aby bolo možné neskôr jednoducho doplniť finálne texty, obrázky aj odkazy."
        ],
        steps: [
          "Doplniť krátke základné informácie.",
          "Podľa potreby pridať návod krok za krokom.",
          "Prepojiť súvisiace odkazy alebo doplnkové bloky."
        ]
      }
    ];
  }

  return [
    {
      id: "platzhalter",
      title: "1. Vorbereiteter Inhaltsplatz",
      paragraphs: [
        `Diese Seite wurde für das Thema "${title}" vorbereitet.`,
        "Die endgültigen Vor-Ort-Informationen, genauen Schritte und eventuelle Bilder werden in einer späteren Aufgabe ergänzt."
      ]
    },
    {
      id: "bloecke",
      title: "2. Geplante Blöcke",
      paragraphs: ["Der finale Inhalt kann später in klar getrennte, leicht pflegbare Blöcke eingefügt werden."],
      bullets: [
        `Eine kurze mobilfreundliche Zusammenfassung für ${subject}.`,
        "Ein separater Block für praktische Schritte oder schnelle Hilfe.",
        "Verwandte Hinweise, Warnungen oder hausbezogene Regeln."
      ]
    },
    {
      id: "spaeter",
      title: "3. Platz für spätere Erweiterung",
      paragraphs: [
        "Die Struktur ist so vorbereitet, dass finale Gästetexte, Bilder oder Links später leicht ergänzt werden können."
      ],
      steps: [
        "Kurze Kerninfos ergänzen.",
        "Bei Bedarf eine Schritt-für-Schritt-Anleitung hinzufügen.",
        "Verwandte Links oder Zusatzblöcke anbinden."
      ]
    }
  ];
};

const createGuideContent = (
  locale: BaseLocale,
  options: GuideFactoryOptions
): GuideLocaleContent => {
  const title = locale === "sk" ? resolveSlovakFallback(options.titles) : options.titles[locale];
  const summary = locale === "sk" ? resolveSlovakFallback(options.summary) : options.summary[locale];
  const subject = locale === "sk" ? resolveSlovakFallback(options.keyPointSubject) : options.keyPointSubject[locale];
  const fallbackQuickBullets =
    locale === "sk"
      ? [
          "Na tejto stránke je zatiaľ pripravená len štruktúra.",
          `Finálne informácie k téme ${subject.toLowerCase()} budú doplnené neskôr.`,
          "Rozloženie je pripravené na rýchle mobilné používanie cez QR kód."
        ]
      : null;
  const fallbackSections =
    locale === "sk" ? resolveSlovakFallback(options.customSections ?? {}) : options.customSections?.[locale];

  return {
    title,
    subtitle: title,
    intro: summary,
    keyPoints:
      (locale === "sk" ? resolveSlovakFallback(options.quickBullets ?? {}) : options.quickBullets?.[locale]) ??
      fallbackQuickBullets ??
      (locale === "hu"
        ? [
            "Jelenleg szerkezeti előkészítés látható ezen az oldalon.",
            `A végleges ${subject.toLowerCase()}-információk később kerülnek be.`,
            "A tartalom mobilos, QR-kódról gyorsan használható formára van előkészítve."
          ]
        : locale === "en"
          ? [
              "This page currently contains structural placeholders only.",
              `Final ${subject.toLowerCase()} details will be added later.`,
              "The layout is prepared for quick QR-based mobile use."
            ]
          : locale === "cs"
            ? [
                "Na této stránce je zatím připravena jen struktura.",
                `Finální informace k tématu ${subject.toLowerCase()} budou doplněny později.`,
                "Rozložení je připraveno pro rychlé mobilní použití přes QR kód."
              ]
            : locale === "sk"
              ? [
                  "Na tejto stránke je zatiaľ pripravená len štruktúra.",
                  `Finálne informácie k téme ${subject.toLowerCase()} budú doplnené neskôr.`,
                  "Rozloženie je pripravené na rýchle mobilné používanie cez QR kód."
                ]
            : [
                "Diese Seite enthält derzeit nur die vorbereitete Struktur.",
                `Die endgültigen Informationen zu ${subject.toLowerCase()} werden später ergänzt.`,
                "Das Layout ist für die schnelle mobile Nutzung per QR-Code vorbereitet."
              ]),
    backLabel:
      locale === "hu"
        ? "Vissza a Dandelion D1 útmutatóhoz"
        : locale === "en"
          ? "Back to the Dandelion D1 guide"
          : locale === "cs"
            ? "Zpět na průvodce Dandelion D1"
            : locale === "sk"
              ? "Späť na sprievodcu Dandelion D1"
            : "Zurück zum Dandelion D1 Guide",
    sections: fallbackSections ?? createGenericSections(locale, title, subject)
  };
};

const createGuide = (options: GuideFactoryOptions): GuideContent => ({
  slug: options.slug,
  houseSlug: "d1",
  houseName: "Dandelion D1",
  path: `/guide/d1/${options.slug}/`,
  qrTarget: `https://dandelionhouse.hu/guide/d1/${options.slug}/`,
  dePreparedTitle: options.titles.de,
  content: Object.fromEntries(
    d1GuideLocales.map((locale) => [locale, createGuideContent(locale, options)])
  ) as Partial<Record<GuideLocale, GuideLocaleContent>>
});

const kitchenGuide = createGuide({
  slug: "konyha-es-gepek",
  titles: {
    hu: "Konyha és gépek",
    en: "Kitchen and appliances",
    cs: "Kuchyně a spotřebiče",
    de: "Küche und Geräte"
  },
  category: {
    hu: "A ház használata",
    en: "Using the house",
    cs: "Používání domu",
    de: "Hausnutzung"
  },
  summary: {
    hu: "Előkészített konyhai gyűjtőoldal a főzőlap, sütő, hűtő, mikró és további gépek későbbi vendégútmutatójához.",
    en: "Prepared kitchen hub page for future guest instructions covering the hob, oven, fridge, microwave and other appliances.",
    cs: "Připravená kuchyňská přehledová stránka pro budoucí pokyny k varné desce, troubě, lednici, mikrovlnce a dalším spotřebičům.",
    de: "Vorbereitete Küchenseite für spätere Gästeinfos zu Kochfeld, Ofen, Kühlschrank, Mikrowelle und weiteren Geräten."
  },
  keyPointSubject: {
    hu: "konyhai gépek",
    en: "kitchen appliances",
    cs: "kuchyňské spotřebiče",
    de: "Küchengeräte"
  },
  quickBullets: {
    hu: [
      "Ez a konyhai gyűjtőoldal később több készülék útmutatóját fogja össze.",
      "A mosogatógéphez már külön előkészített aloldal tartozik.",
      "A többi készülék helye blokkos szerkezetben van előkészítve."
    ],
    en: [
      "This kitchen hub will later collect several appliance guides.",
      "The dishwasher already has its own prepared subpage.",
      "The remaining appliance slots are structured in separate blocks."
    ],
    cs: [
      "Tato kuchyňská stránka bude později sdružovat více návodů ke spotřebičům.",
      "Myčka už má připravenou samostatnou podstránku.",
      "Místo pro ostatní spotřebiče je připraveno v oddělených blocích."
    ],
    de: [
      "Diese Küchenseite wird später mehrere Geräteanleitungen bündeln.",
      "Für den Geschirrspüler ist bereits eine eigene Unterseite vorbereitet.",
      "Die Plätze für weitere Geräte sind in getrennten Blöcken vorbereitet."
    ]
  },
  customSections: {
    hu: [
      {
        id: "attekintes",
        title: "1. Konyhai áttekintés",
        paragraphs: [
          "Ez az oldal a D1 konyhai gépeinek gyűjtőpontja lesz.",
          "A cél, hogy a vendég gyorsan megtalálja a számára szükséges készüléket és a rövid használati segítséget."
        ]
      },
      {
        id: "keszulekhelyek",
        title: "2. Előkészített készülékblokkok",
        paragraphs: ["Az alábbi készüléktémákhoz külön tartalmi helyek lettek előkészítve."],
        bullets: [
          "Mosogatógép használata - külön aloldal előkészítve.",
          "Főzőlap / sütő használata - külön tartalmi blokk helye.",
          "Mikrohullámú sütő - külön tartalmi blokk helye.",
          "Hűtő használata - külön tartalmi blokk helye.",
          "Kávéfőző - később opcionálisan bővíthető blokk."
        ],
        important: "A gyári használati útmutatók és végleges kezelési lépések még nem kerültek be."
      },
      {
        id: "szerkezet",
        title: "3. Későbbi tartalmi bővítés",
        steps: [
          "Rövid azonnali használati tudnivalók feltöltése készülékenként.",
          "Szükség esetén fotós vagy ikon alapú segítség beillesztése.",
          "Gyári PDF vagy részletes programmagyarázat bekötése a megfelelő blokkba."
        ],
        paragraphs: [
          "A szerkezet külön készüléklogikára van előkészítve, hogy ne egy hosszú, nehezen használható oldallá váljon."
        ]
      }
    ],
    en: [
      {
        id: "overview",
        title: "1. Kitchen overview",
        paragraphs: [
          "This page will serve as the kitchen appliance hub for D1.",
          "The goal is to help guests find the relevant appliance and a short usage guide quickly."
        ]
      },
      {
        id: "appliance-slots",
        title: "2. Prepared appliance slots",
        paragraphs: ["The following appliance topics already have clearly separated content slots."],
        bullets: [
          "Dishwasher - dedicated subpage prepared.",
          "Hob / oven - separate content block prepared.",
          "Microwave - separate content block prepared.",
          "Fridge - separate content block prepared.",
          "Coffee machine - optional block for later expansion."
        ],
        important: "Factory manuals and final operating steps have not been added yet."
      },
      {
        id: "expansion",
        title: "3. Future content expansion",
        steps: [
          "Add short must-know instructions for each appliance.",
          "Insert visual or icon-based help if needed.",
          "Attach manuals or detailed program explanations to the right block later."
        ],
        paragraphs: [
          "The structure is prepared by appliance so the page does not turn into a long, hard-to-scan wall of text."
        ]
      }
    ],
    cs: [
      {
        id: "prehled",
        title: "1. Přehled kuchyně",
        paragraphs: [
          "Tato stránka bude sloužit jako přehled kuchyňských spotřebičů pro D1.",
          "Cílem je, aby host rychle našel potřebný spotřebič i stručný návod."
        ]
      },
      {
        id: "bloky",
        title: "2. Připravené bloky spotřebičů",
        paragraphs: ["Následující témata spotřebičů už mají připravená oddělená obsahová místa."],
        bullets: [
          "Myčka - připravena samostatná podstránka.",
          "Varná deska / trouba - připravený samostatný blok.",
          "Mikrovlnná trouba - připravený samostatný blok.",
          "Lednice - připravený samostatný blok.",
          "Kávovar - volitelný blok pro pozdější rozšíření."
        ],
        important: "Výrobní návody a finální provozní kroky zatím nejsou doplněny."
      },
      {
        id: "rozsireni",
        title: "3. Pozdější doplnění obsahu",
        steps: [
          "Doplnit krátké základní pokyny ke každému spotřebiči.",
          "V případě potřeby přidat vizuální nebo ikonovou pomoc.",
          "Později připojit manuály nebo podrobný popis programů."
        ],
        paragraphs: [
          "Struktura je připravena podle jednotlivých spotřebičů, aby stránka neztratila přehlednost."
        ]
      }
    ],
    de: [
      {
        id: "ueberblick",
        title: "1. Küchenüberblick",
        paragraphs: [
          "Diese Seite wird als Sammelpunkt für die Küchengeräte von D1 dienen.",
          "Ziel ist, dass Gäste das passende Gerät und die kurze Nutzungshilfe schnell finden."
        ]
      },
      {
        id: "geraete",
        title: "2. Vorbereitete Geräteblöcke",
        paragraphs: ["Für die folgenden Gerätethemen sind bereits getrennte Inhaltsplätze vorbereitet."],
        bullets: [
          "Geschirrspüler - eigene Unterseite vorbereitet.",
          "Kochfeld / Ofen - separater Inhaltsblock vorbereitet.",
          "Mikrowelle - separater Inhaltsblock vorbereitet.",
          "Kühlschrank - separater Inhaltsblock vorbereitet.",
          "Kaffeemaschine - optionaler Block für spätere Erweiterung."
        ],
        important: "Werksanleitungen und endgültige Bedienungsschritte sind noch nicht eingefügt."
      },
      {
        id: "ausbau",
        title: "3. Spätere Inhaltserweiterung",
        steps: [
          "Kurze Kerninfos pro Gerät ergänzen.",
          "Bei Bedarf visuelle oder ikonbasierte Hilfe einfügen.",
          "Später Manuals oder detaillierte Programmerklärungen verknüpfen."
        ],
        paragraphs: [
          "Die Struktur ist nach Geräten vorbereitet, damit die Seite mobil schnell erfassbar bleibt."
        ]
      }
    ]
  }
});

export const d1DishwasherGuide = createGuide({
  slug: "mosogatogep",
  titles: {
    hu: "Mosogatógép használata",
    en: "Dishwasher guide",
    cs: "Návod k myčce",
    de: "Geschirrspüler-Guide"
  },
  category: {
    hu: "A ház használata",
    en: "Using the house",
    cs: "Používání domu",
    de: "Hausnutzung"
  },
  summary: {
    hu: "Előkészített hely a Whirlpool WIO 3O540 PELG beépíthető mosogatógép későbbi gyors vendégútmutatójához.",
    en: "Prepared placeholder for the future quick guest guide of the built-in Whirlpool WIO 3O540 PELG dishwasher.",
    cs: "Připravené místo pro budoucí rychlý návod k vestavné myčce Whirlpool WIO 3O540 PELG.",
    de: "Vorbereiteter Platz für den späteren Kurz-Guide zum Einbau-Geschirrspüler Whirlpool WIO 3O540 PELG."
  },
  keyPointSubject: {
    hu: "mosogatógép",
    en: "dishwasher",
    cs: "myčka",
    de: "Geschirrspüler"
  },
  quickBullets: {
    hu: [
      "Külön route készült a D1 mosogatógépéhez.",
      "A Whirlpool WIO 3O540 PELG tartalmi blokkjai már elő vannak készítve.",
      "A gyári PDF és a képes programtáblázat helye külön szerepel az oldalon."
    ],
    en: [
      "A dedicated route is prepared for the D1 dishwasher.",
      "The Whirlpool WIO 3O540 PELG content blocks are already in place.",
      "The factory PDF and visual program chart have reserved slots on the page."
    ],
    cs: [
      "Pro myčku v D1 je připravena samostatná cesta.",
      "Obsahové bloky pro Whirlpool WIO 3O540 PELG jsou už nachystané.",
      "Na stránce je rezervované místo pro PDF i obrázkovou tabulku programů."
    ],
    de: [
      "Für den Geschirrspüler in D1 ist eine eigene Route vorbereitet.",
      "Die Inhaltsblöcke für den Whirlpool WIO 3O540 PELG stehen bereits bereit.",
      "Für PDF und Bild-Programmtabelle gibt es reservierte Plätze auf der Seite."
    ]
  },
  customSections: {
    hu: [
      {
        id: "gyors-inditas",
        title: "1. Gyors indítás",
        paragraphs: [
          "Ide kerül majd a vendégeknek szóló rövid, 3-5 lépéses indítási útmutató.",
          "A cél a gyors mobilos használhatóság, nem a teljes gyári leírás átmásolása."
        ]
      },
      {
        id: "programok",
        title: "2. Programok",
        paragraphs: [
          "Ez a blokk a legfontosabb programok rövid, vendégbarát magyarázatának helye lesz."
        ]
      },
      {
        id: "kezelopanel",
        title: "3. Kezelőpanel",
        paragraphs: [
          "Itt lehet majd röviden bemutatni a fő gombokat, visszajelzőket és a napi használathoz szükséges alapokat."
        ]
      },
      {
        id: "adalekok",
        title: "4. Tabletta / só / öblítőszer",
        paragraphs: [
          "Ez a rész a szükséges mosogatószer-tudnivalók helye lesz, vendégszintű magyarázattal."
        ]
      },
      {
        id: "mit-ne",
        title: "5. Mit ne tegyenek bele",
        paragraphs: [
          "Ide kerülhetnek a legfontosabb tiltások és kímélendő eszközök rövid listában."
        ]
      },
      {
        id: "hiba",
        title: "6. Hiba esetén",
        paragraphs: [
          "Ez a blokk a gyors ellenőrzési pontok és az esetleges kapcsolatfelvételi irány helye lesz."
        ]
      },
      {
        id: "pdf-helye",
        title: "7. Gyári használati útmutató link helye",
        paragraphs: [
          "A gyári PDF most még nincs beépítve. Ezen a helyen később külön link vagy letöltés jelenhet meg."
        ],
        important: "Most csak a helye van előkészítve."
      },
      {
        id: "programtabla-helye",
        title: "8. Képes programtáblázat helye",
        paragraphs: [
          "A vizuális programtáblázat később külön blokkban vagy képként jelenhet meg ezen a helyen."
        ],
        important: "Most csak a helye van előkészítve."
      }
    ],
    en: [
      {
        id: "quick-start",
        title: "1. Quick start",
        paragraphs: [
          "A short 3-5 step startup flow for guests will be added here later.",
          "The goal is fast mobile use, not a copy of the full factory manual."
        ]
      },
      { id: "programs", title: "2. Programs", paragraphs: ["This block will later explain the main programs in a guest-friendly way."] },
      { id: "panel", title: "3. Control panel", paragraphs: ["This is the planned place for the main buttons, indicators and everyday controls."] },
      { id: "detergent", title: "4. Tablet / salt / rinse aid", paragraphs: ["This section is reserved for the essential detergent and refill notes."] },
      { id: "dont-put", title: "5. What not to put inside", paragraphs: ["This block will later hold the short list of restricted or delicate items."] },
      { id: "error", title: "6. In case of a problem", paragraphs: ["Quick checks and contact directions can be added here later."] },
      {
        id: "manual-slot",
        title: "7. Factory manual link slot",
        paragraphs: ["The factory PDF is not embedded yet. A dedicated link or download can be added here later."],
        important: "Only the placeholder slot is prepared right now."
      },
      {
        id: "chart-slot",
        title: "8. Visual program chart slot",
        paragraphs: ["The visual program chart can later appear here as its own block or image."],
        important: "Only the placeholder slot is prepared right now."
      }
    ],
    cs: [
      {
        id: "rychly-start",
        title: "1. Rychlý start",
        paragraphs: [
          "Sem se později doplní krátký startovací návod pro hosty v 3-5 krocích.",
          "Cílem je rychlé mobilní použití, ne přepis celého výrobního manuálu."
        ]
      },
      { id: "programy", title: "2. Programy", paragraphs: ["Tento blok bude později obsahovat stručné vysvětlení hlavních programů."] },
      { id: "panel", title: "3. Ovládací panel", paragraphs: ["Sem lze později doplnit hlavní tlačítka, kontrolky a základní ovládání."] },
      { id: "doplnky", title: "4. Tableta / sůl / leštidlo", paragraphs: ["Tato část je připravena pro základní informace o mycích prostředcích."] },
      { id: "nevkladat", title: "5. Co dovnitř nedávat", paragraphs: ["Později zde může být krátký seznam nevhodných nebo citlivých předmětů."] },
      { id: "chyba", title: "6. V případě problému", paragraphs: ["Sem lze doplnit rychlé kontroly a směr pro kontakt."] },
      {
        id: "manual-slot",
        title: "7. Místo pro odkaz na výrobní návod",
        paragraphs: ["Výrobní PDF zatím není vloženo. Později zde může být samostatný odkaz nebo stažení."],
        important: "Zatím je připraveno pouze místo."
      },
      {
        id: "chart-slot",
        title: "8. Místo pro obrázkovou tabulku programů",
        paragraphs: ["Obrázková tabulka programů se může později zobrazit zde jako samostatný blok nebo obrázek."],
        important: "Zatím je připraveno pouze místo."
      }
    ],
    de: [
      {
        id: "schnellstart",
        title: "1. Schnellstart",
        paragraphs: [
          "Hier wird später eine kurze 3-5-Schritte-Startanleitung für Gäste ergänzt.",
          "Ziel ist die schnelle mobile Nutzung, nicht das Kopieren der vollständigen Werksanleitung."
        ]
      },
      { id: "programme", title: "2. Programme", paragraphs: ["Dieser Block ist für die spätere kurze Erklärung der wichtigsten Programme vorgesehen."] },
      { id: "panel", title: "3. Bedienfeld", paragraphs: ["Hier können später die wichtigsten Tasten, Anzeigen und Alltagsfunktionen erklärt werden."] },
      { id: "zusatz", title: "4. Tab / Salz / Klarspüler", paragraphs: ["Dieser Bereich ist für die wichtigsten Hinweise zu Reinigungsmitteln reserviert."] },
      { id: "nicht-einlegen", title: "5. Was nicht hineingehört", paragraphs: ["Später kann hier eine kurze Liste empfindlicher oder ungeeigneter Gegenstände ergänzt werden."] },
      { id: "problem", title: "6. Bei Problemen", paragraphs: ["Hier können später Schnellchecks und Kontaktwege ergänzt werden."] },
      {
        id: "manual-slot",
        title: "7. Platz für Werksanleitungs-Link",
        paragraphs: ["Das Werks-PDF ist noch nicht eingebunden. Später kann hier ein eigener Link oder Download erscheinen."],
        important: "Aktuell ist nur der Platz vorbereitet."
      },
      {
        id: "chart-slot",
        title: "8. Platz für Bild-Programmtabelle",
        paragraphs: ["Die visuelle Programmtabelle kann später hier als eigener Block oder als Bild erscheinen."],
        important: "Aktuell ist nur der Platz vorbereitet."
      }
    ]
  }
});

const wifiGuide = createGuide({
  slug: "wifi",
  titles: { hu: "Wi-Fi belépés", en: "Wi-Fi access", cs: "Wi-Fi přístup", de: "WLAN-Zugang" },
  category: { hu: "Gyors segítség", en: "Quick help", cs: "Rychlá pomoc", de: "Schnelle Hilfe" },
  summary: {
    hu: "Hely fenntartva a hálózatnévhez, jelszóhoz és az internetkapcsolat gyors ellenőrzéséhez.",
    en: "Reserved space for the network name, password and quick internet troubleshooting.",
    cs: "Rezervované místo pro název sítě, heslo a rychlou kontrolu internetového připojení.",
    de: "Reservierter Platz für Netzwerkname, Passwort und schnelle Internet-Hilfe."
  },
  keyPointSubject: { hu: "wifi", en: "wifi", cs: "wifi", de: "WLAN" }
});

const arrivalGuide = createGuide({
  slug: "erkezes-parkolas-bejutas",
  titles: {
    hu: "Érkezés, parkolás, bejutás",
    en: "Arrival, parking and entry",
    cs: "Příjezd, parkování a vstup",
    de: "Anreise, Parken und Zugang"
  },
  category: { hu: "Gyors segítség", en: "Quick help", cs: "Rychlá pomoc", de: "Schnelle Hilfe" },
  summary: {
    hu: "Előkészített oldal a cím, parkolás, kulcsátvétel és bejutási információk későbbi feltöltéséhez.",
    en: "Prepared page for the address, parking, key handover and entry information.",
    cs: "Připravená stránka pro adresu, parkování, předání klíčů a vstupní informace.",
    de: "Vorbereitete Seite für Adresse, Parken, Schlüsselübergabe und Zugangsinfos."
  },
  keyPointSubject: { hu: "érkezés", en: "arrival", cs: "příjezd", de: "Anreise" }
});

const boilerGuide = createGuide({
  slug: "melegviz-es-bojler",
  titles: {
    hu: "Melegvíz és bojler",
    en: "Hot water and boiler",
    cs: "Teplá voda a bojler",
    de: "Warmwasser und Boiler"
  },
  category: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
  summary: {
    hu: "Előkészített hely a melegvíz-használat és a 150 literes bojler vendégbarát magyarázatához.",
    en: "Prepared slot for hot water usage details and a guest-friendly explanation of the 150-litre boiler.",
    cs: "Připravené místo pro informace o teplé vodě a přehledné vysvětlení 150litrového bojleru.",
    de: "Vorbereiteter Platz für Warmwasser-Hinweise und eine gästeorientierte Erklärung des 150-Liter-Boilers."
  },
  keyPointSubject: { hu: "melegvíz", en: "hot water", cs: "teplá voda", de: "Warmwasser" }
});

const climateGuide = createGuide({
  slug: "legkondicionalo-es-futes",
  titles: {
    hu: "Légkondicionáló és fűtés",
    en: "Air conditioning and heating",
    cs: "Klimatizace a topení",
    de: "Klimaanlage und Heizung"
  },
  category: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
  summary: {
    hu: "Előkészített oldal a klímahasználat, ajánlott hőfokok és energiatakarékos működés későbbi leírásához.",
    en: "Prepared page for air-conditioning use, recommended temperatures and energy-saving operation.",
    cs: "Připravená stránka pro používání klimatizace, doporučené teploty a úsporný provoz.",
    de: "Vorbereitete Seite für Klimanutzung, empfohlene Temperaturen und energiesparenden Betrieb."
  },
  keyPointSubject: { hu: "klíma és fűtés", en: "air conditioning and heating", cs: "klimatizace a topení", de: "Klimaanlage und Heizung" }
});

const washerGuide = createGuide({
  slug: "mosogep",
  titles: { hu: "Mosógép használata", en: "Washing machine guide", cs: "Návod k pračce", de: "Waschmaschinen-Guide" },
  category: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
  summary: {
    hu: "Előkészített hely az alap mosási tudnivalók és vendégbarát használati szabályok későbbi feltöltéséhez.",
    en: "Prepared space for basic laundry instructions and guest-friendly use rules.",
    cs: "Připravené místo pro základní pokyny k praní a pravidla používání pro hosty.",
    de: "Vorbereiteter Platz für grundlegende Waschhinweise und gästeorientierte Nutzungsregeln."
  },
  keyPointSubject: { hu: "mosógép", en: "washing machine", cs: "pračka", de: "Waschmaschine" }
});

const tvGuide = createGuide({
  slug: "tv",
  titles: { hu: "TV használata", en: "TV guide", cs: "Použití TV", de: "TV-Nutzung" },
  category: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
  summary: {
    hu: "Előkészített oldal a távirányító, csatornák, okosfunkciók és alap hibakeresés későbbi leírásához.",
    en: "Prepared page for the remote control, channels, smart functions and basic troubleshooting.",
    cs: "Připravená stránka pro ovladač, kanály, chytré funkce a základní řešení problémů.",
    de: "Vorbereitete Seite für Fernbedienung, Sender, Smart-Funktionen und einfache Fehlerhilfe."
  },
  keyPointSubject: { hu: "TV", en: "TV", cs: "TV", de: "TV" }
});

const waterGuide = createGuide({
  slug: "ivoviz",
  titles: { hu: "Ivóvíz", en: "Drinking water", cs: "Pitná voda", de: "Trinkwasser" },
  category: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
  summary: {
    hu: "Előkészített oldal a csapvíz fogyaszthatóságáról és a vízhasználathoz kapcsolódó megjegyzésekhez.",
    en: "Prepared page for tap water guidance and related water-use notes.",
    cs: "Připravená stránka pro informace o pitnosti vody z kohoutku a související poznámky.",
    de: "Vorbereitete Seite für Hinweise zur Trinkbarkeit des Leitungswassers und zur Wassernutzung."
  },
  keyPointSubject: { hu: "ivóvíz", en: "drinking water", cs: "pitná voda", de: "Trinkwasser" }
});

const terraceGuide = createGuide({
  slug: "terasz-kert-grill",
  titles: { hu: "Terasz, kert és grill", en: "Terrace, garden and grill", cs: "Terasa, zahrada a gril", de: "Terrasse, Garten und Grill" },
  category: { hu: "Kültér és medence", en: "Outdoor and pool", cs: "Exteriér a bazén", de: "Außenbereich und Pool" },
  summary: {
    hu: "Előkészített hely a kültéri használat, grill, kerti bútorok és esti nyugalom témáihoz.",
    en: "Prepared space for outdoor use, the grill, garden furniture and quiet evening guidelines.",
    cs: "Připravené místo pro venkovní používání, gril, zahradní nábytek a večerní klid.",
    de: "Vorbereiteter Platz für Außennutzung, Grill, Gartenmöbel und Hinweise zur Abendruhe."
  },
  keyPointSubject: { hu: "kültéri használat", en: "outdoor use", cs: "venkovní používání", de: "Außennutzung" }
});

const wasteGuide = createGuide({
  slug: "szemetkezeles",
  titles: { hu: "Szemétkezelés", en: "Waste disposal", cs: "Nakládání s odpadem", de: "Müllentsorgung" },
  category: { hu: "Kültér és medence", en: "Outdoor and pool", cs: "Exteriér a bazén", de: "Außenbereich und Pool" },
  summary: {
    hu: "Előkészített oldal a kommunális és szelektív hulladék, valamint a távozás előtti teendők leírásához.",
    en: "Prepared page for general waste, recycling and departure-related disposal notes.",
    cs: "Připravená stránka pro směsný odpad, třídění a úkoly spojené s odjezdem.",
    de: "Vorbereitete Seite für Restmüll, Recycling und abfahrtsbezogene Entsorgungshinweise."
  },
  keyPointSubject: { hu: "szemétkezelés", en: "waste disposal", cs: "nakládání s odpadem", de: "Müllentsorgung" }
});

const houseRulesGuide = createGuide({
  slug: "alap-hazirend",
  titles: { hu: "Alap házirend", en: "House rules", cs: "Základní domovní pravidla", de: "Grundregeln des Hauses" },
  category: { hu: "Szabályok és távozás", en: "Rules and departure", cs: "Pravidla a odjezd", de: "Regeln und Abreise" },
  summary: {
    hu: "Előkészített oldal a rövid, vendégbarát házirendi összefoglaló későbbi feltöltéséhez.",
    en: "Prepared page for a short guest-friendly summary of the house rules.",
    cs: "Připravená stránka pro krátké a přehledné shrnutí pravidel domu.",
    de: "Vorbereitete Seite für eine kurze, gästeorientierte Zusammenfassung der Hausregeln."
  },
  keyPointSubject: { hu: "házirend", en: "house rules", cs: "pravidla domu", de: "Hausregeln" }
});

const departureGuide = createGuide({
  slug: "tavozas-elott",
  titles: { hu: "Távozás előtti teendők", en: "Before departure", cs: "Co udělat před odjezdem", de: "Vor der Abreise" },
  category: { hu: "Szabályok és távozás", en: "Rules and departure", cs: "Pravidla a odjezd", de: "Regeln und Abreise" },
  summary: {
    hu: "Előkészített ellenőrzőoldal a kulcs, szemét, ablakok, klíma, mosogatógép és kijelentkezés teendőihez.",
    en: "Prepared checklist page for keys, waste, windows, AC, dishwasher and checkout steps.",
    cs: "Připravená kontrolní stránka pro klíče, odpad, okna, klimatizaci, myčku a odhlášení.",
    de: "Vorbereitete Checkliste für Schlüssel, Müll, Fenster, Klima, Geschirrspüler und Check-out."
  },
  keyPointSubject: { hu: "távozás", en: "departure", cs: "odjezd", de: "Abreise" }
});

const contactGuide = createGuide({
  slug: "hiba-eseten-kapcsolat",
  titles: { hu: "Hiba esetén / kapcsolat", en: "Problem help / contact", cs: "Při problému / kontakt", de: "Bei Problemen / Kontakt" },
  category: { hu: "Gyors segítség", en: "Quick help", cs: "Rychlá pomoc", de: "Schnelle Hilfe" },
  summary: {
    hu: "Előkészített oldal ahhoz, mit tegyen a vendég, ha valami nem működik vagy segítségre van szüksége.",
    en: "Prepared page for what guests should do if something does not work or they need help.",
    cs: "Připravená stránka pro situace, kdy něco nefunguje nebo host potřebuje pomoc.",
    de: "Vorbereitete Seite dafür, was Gäste tun sollen, wenn etwas nicht funktioniert oder Hilfe nötig ist."
  },
  keyPointSubject: { hu: "hiba esetén segítség", en: "problem help", cs: "pomoc při problému", de: "Hilfe bei Problemen" }
});

const toCardEntry = (guide: GuideContent, card: LocalizedCardCopy): D1GuideCardEntry => ({ guide, card });

const wifiCardEntry = toCardEntry(wifiGuide, {
    eyebrow: { hu: "Gyors segítség", en: "Quick help", cs: "Rychlá pomoc", de: "Schnelle Hilfe" },
    title: { hu: "Wi-Fi belépés", en: "Wi-Fi access", cs: "Wi-Fi přístup", de: "WLAN-Zugang" },
    description: {
      hu: "Hálózatnév, jelszó és gyors segítség, ha nem működik az internet.",
      en: "Network name, password and quick help if the internet is not working.",
      cs: "Název sítě, heslo a rychlá pomoc, pokud internet nefunguje.",
      de: "Netzwerkname, Passwort und schnelle Hilfe, wenn das Internet nicht funktioniert."
    }
  });
const arrivalCardEntry = toCardEntry(arrivalGuide, {
    eyebrow: { hu: "Gyors segítség", en: "Quick help", cs: "Rychlá pomoc", de: "Schnelle Hilfe" },
    title: {
      hu: "Érkezés, parkolás, bejutás",
      en: "Arrival, parking and entry",
      cs: "Příjezd, parkování a vstup",
      de: "Anreise, Parken und Zugang"
    },
    description: {
      hu: "Cím, parkolás, kulcsátvétel és érkezési tudnivalók.",
      en: "Address, parking, key handover and arrival details.",
      cs: "Adresa, parkování, předání klíčů a informace k příjezdu.",
      de: "Adresse, Parken, Schlüsselübergabe und Hinweise zur Anreise."
    }
  });
const boilerCardEntry = toCardEntry(boilerGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: { hu: "Melegvíz és bojler", en: "Hot water and boiler", cs: "Teplá voda a bojler", de: "Warmwasser und Boiler" },
    description: {
      hu: "150 literes bojler használata és melegvíz-tudnivalók.",
      en: "Using the 150-litre boiler and hot water notes.",
      cs: "Používání 150litrového bojleru a informace o teplé vodě.",
      de: "Nutzung des 150-Liter-Boilers und Warmwasser-Hinweise."
    }
  });
const climateCardEntry = toCardEntry(climateGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: {
      hu: "Légkondicionáló és fűtés",
      en: "Air conditioning and heating",
      cs: "Klimatizace a topení",
      de: "Klimaanlage und Heizung"
    },
    description: {
      hu: "Klímahasználat, ajánlott hőfokok és energiatakarékos működés.",
      en: "AC use, recommended temperatures and energy-saving operation.",
      cs: "Používání klimatizace, doporučené teploty a úsporný provoz.",
      de: "Klimanutzung, empfohlene Temperaturen und energiesparender Betrieb."
    }
  });
const kitchenCardEntry = toCardEntry(kitchenGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: { hu: "Konyha és gépek", en: "Kitchen and appliances", cs: "Kuchyně a spotřebiče", de: "Küche und Geräte" },
    description: {
      hu: "Főzőlap, sütő, hűtő, mikró és konyhai alapfelszerelések.",
      en: "Hob, oven, fridge, microwave and kitchen basics.",
      cs: "Varná deska, trouba, lednice, mikrovlnka a základní kuchyňské vybavení.",
      de: "Kochfeld, Ofen, Kühlschrank, Mikrowelle und Küchengrundausstattung."
    }
  });
const dishwasherCardEntry = toCardEntry(d1DishwasherGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: { hu: "Mosogatógép használata", en: "Dishwasher guide", cs: "Návod k myčce", de: "Geschirrspüler-Guide" },
    description: {
      hu: "Whirlpool WIO 3O540 PELG mosogatógép gyors használati útmutatója.",
      en: "Quick usage guide for the Whirlpool WIO 3O540 PELG dishwasher.",
      cs: "Rychlý návod k myčce Whirlpool WIO 3O540 PELG.",
      de: "Kurzanleitung für den Geschirrspüler Whirlpool WIO 3O540 PELG."
    }
  });
const washerCardEntry = toCardEntry(washerGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: { hu: "Mosógép használata", en: "Washing machine guide", cs: "Návod k pračce", de: "Waschmaschinen-Guide" },
    description: {
      hu: "Alap mosási tudnivalók és vendégbarát használati szabályok.",
      en: "Basic laundry notes and guest-friendly usage rules.",
      cs: "Základní informace o praní a pravidla používání pro hosty.",
      de: "Grundlegende Waschhinweise und gästeorientierte Nutzungsregeln."
    }
  });
const tvCardEntry = toCardEntry(tvGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: { hu: "TV használata", en: "TV guide", cs: "Použití TV", de: "TV-Nutzung" },
    description: {
      hu: "Távirányító, csatornák, okosfunkciók és alap hibakeresés.",
      en: "Remote control, channels, smart functions and basic troubleshooting.",
      cs: "Ovladač, kanály, chytré funkce a základní řešení problémů.",
      de: "Fernbedienung, Sender, Smart-Funktionen und einfache Fehlerhilfe."
    }
  });
const waterCardEntry = toCardEntry(waterGuide, {
    eyebrow: { hu: "A ház használata", en: "Using the house", cs: "Používání domu", de: "Hausnutzung" },
    title: { hu: "Ivóvíz", en: "Drinking water", cs: "Pitná voda", de: "Trinkwasser" },
    description: {
      hu: "Csapvíz fogyaszthatósága és vízhasználati tudnivalók.",
      en: "Tap water guidance and water-use notes.",
      cs: "Informace o pitnosti vody z kohoutku a používání vody.",
      de: "Hinweise zur Trinkbarkeit des Leitungswassers und zur Wassernutzung."
    }
  });
const terraceCardEntry = toCardEntry(terraceGuide, {
    eyebrow: { hu: "Kültér és medence", en: "Outdoor and pool", cs: "Exteriér a bazén", de: "Außenbereich und Pool" },
    title: { hu: "Terasz, kert és grill", en: "Terrace, garden and grill", cs: "Terasa, zahrada a gril", de: "Terrasse, Garten und Grill" },
    description: {
      hu: "Kültéri használat, grill, kerti bútorok és esti nyugalom.",
      en: "Outdoor use, grill, garden furniture and quiet evenings.",
      cs: "Venkovní používání, gril, zahradní nábytek a večerní klid.",
      de: "Außennutzung, Grill, Gartenmöbel und Abendruhe."
    }
  });
const wasteCardEntry = toCardEntry(wasteGuide, {
    eyebrow: { hu: "Kültér és medence", en: "Outdoor and pool", cs: "Exteriér a bazén", de: "Außenbereich und Pool" },
    title: { hu: "Szemétkezelés", en: "Waste disposal", cs: "Nakládání s odpadem", de: "Müllentsorgung" },
    description: {
      hu: "Kommunális és szelektív hulladék, távozás előtti teendők.",
      en: "General waste, recycling and departure notes.",
      cs: "Směsný odpad, třídění a úkoly před odjezdem.",
      de: "Restmüll, Recycling und Hinweise vor der Abreise."
    }
  });
const poolCardEntry = toCardEntry(d1PoolGuide, {
    eyebrow: { hu: "Kültér és medence", en: "Outdoor and pool", cs: "Exteriér a bazén", de: "Außenbereich und Pool" },
    title: { hu: "Medencehasználati útmutató", en: "Pool user guide", cs: "Návod k používání bazénu", de: "Poolnutzungs-Guide" },
    description: {
      hu: "Biztonság, higiénia, gyermekfelügyelet és medencehasználati szabályok.",
      en: "Safety, hygiene, child supervision and pool rules.",
      cs: "Bezpečnost, hygiena, dohled nad dětmi a pravidla bazénu.",
      de: "Sicherheit, Hygiene, Kinderaufsicht und Poolregeln."
    }
  });
const houseRulesCardEntry = toCardEntry(houseRulesGuide, {
    eyebrow: { hu: "Szabályok és távozás", en: "Rules and departure", cs: "Pravidla a odjezd", de: "Regeln und Abreise" },
    title: { hu: "Alap házirend", en: "House rules", cs: "Základní domovní pravidla", de: "Grundregeln des Hauses" },
    description: {
      hu: "Rövid, vendégbarát szabályok a ház használatához.",
      en: "Short guest-friendly rules for using the house.",
      cs: "Krátká a přehledná pravidla pro používání domu.",
      de: "Kurze, gästeorientierte Regeln für die Hausnutzung."
    }
  });
const aszfCardEntry = toCardEntry(d1AszfGuide, {
    eyebrow: { hu: "Szabályok és távozás", en: "Rules and departure", cs: "Pravidla a odjezd", de: "Regeln und Abreise" },
    title: { hu: "ÁSZF és használati szabályok", en: "Terms and house rules", cs: "Obchodní podmínky a pravidla", de: "AGB und Nutzungsregeln" },
    description: {
      hu: "Foglalás, fizetés, érkezés, házirend, kisállat és D1-et érintő használati feltételek.",
      en: "Booking, payment, arrival, house rules, pets and D1 stay conditions.",
      cs: "Rezervace, platba, příjezd, pravidla domu, zvířata a podmínky pobytu D1.",
      de: "Buchung, Zahlung, Anreise, Hausregeln, Haustiere und Bedingungen für D1."
    }
  });
const departureCardEntry = toCardEntry(departureGuide, {
    eyebrow: { hu: "Szabályok és távozás", en: "Rules and departure", cs: "Pravidla a odjezd", de: "Regeln und Abreise" },
    title: { hu: "Távozás előtti teendők", en: "Before departure", cs: "Co udělat před odjezdem", de: "Vor der Abreise" },
    description: {
      hu: "Kulcs, szemét, ablakok, klíma, mosogatógép és kijelentkezés.",
      en: "Keys, waste, windows, AC, dishwasher and checkout.",
      cs: "Klíče, odpad, okna, klimatizace, myčka a odhlášení.",
      de: "Schlüssel, Müll, Fenster, Klima, Geschirrspüler und Check-out."
    }
  });
const contactCardEntry = toCardEntry(contactGuide, {
    eyebrow: { hu: "Gyors segítség", en: "Quick help", cs: "Rychlá pomoc", de: "Schnelle Hilfe" },
    title: { hu: "Hiba esetén / kapcsolat", en: "Problem help / contact", cs: "Při problému / kontakt", de: "Bei Problemen / Kontakt" },
    description: {
      hu: "Mit tegyen a vendég, ha valami nem működik.",
      en: "What guests should do if something is not working.",
      cs: "Co má host udělat, když něco nefunguje.",
      de: "Was Gäste tun sollen, wenn etwas nicht funktioniert."
    }
  });

const d1GuideGuestPriorityEntries = [
  arrivalCardEntry,
  wifiCardEntry,
  climateCardEntry,
  boilerCardEntry,
  dishwasherCardEntry,
  contactCardEntry,
  departureCardEntry
];

const d1GuideAdditionalEntries = [
  kitchenCardEntry,
  washerCardEntry,
  tvCardEntry,
  waterCardEntry,
  terraceCardEntry,
  wasteCardEntry,
  poolCardEntry,
  houseRulesCardEntry,
  aszfCardEntry
];

const mapEntryToIndexItem = (entry: D1GuideCardEntry) => ({
  guide: entry.guide,
  eyebrowHu: entry.card.eyebrow.hu,
  eyebrowEn: entry.card.eyebrow.en,
  eyebrowCs: entry.card.eyebrow.cs,
  eyebrowDe: entry.card.eyebrow.de,
  eyebrowSk: entry.card.eyebrow.cs,
  titleHu: entry.card.title.hu,
  titleEn: entry.card.title.en,
  titleCs: entry.card.title.cs,
  titleDe: entry.card.title.de,
  titleSk: entry.card.title.cs,
  descriptionHu: entry.card.description.hu,
  descriptionEn: entry.card.description.en,
  descriptionCs: entry.card.description.cs,
  descriptionDe: entry.card.description.de,
  descriptionSk: entry.card.description.cs
});

export const d1GuideIndexItems = [...d1GuideGuestPriorityEntries, ...d1GuideAdditionalEntries].map(mapEntryToIndexItem);

export const d1GuideIndexGroups = [
  {
    titleHu: "Gyakran használt útmutatók",
    titleEn: "Frequently used guides",
    titleCs: "Často používané návody",
    titleDe: "Häufig genutzte Anleitungen",
    titleSk: "Často používané návody",
    items: d1GuideGuestPriorityEntries.map(mapEntryToIndexItem)
  },
  {
    titleHu: "További tudnivalók",
    titleEn: "Additional information",
    titleCs: "Další informace",
    titleDe: "Weitere Hinweise",
    titleSk: "Ďalšie informácie",
    items: d1GuideAdditionalEntries.map(mapEntryToIndexItem)
  }
];

export const d1GuideQuickInfoItems = [
  {
    titleHu: "Wi-Fi",
    titleEn: "Wi-Fi",
    titleCs: "Wi-Fi",
    titleDe: "WLAN",
    titleSk: "Wi‑Fi",
    linesHu: ["Hálózat: Dandelion", "Jelszó: [PLACEHOLDER – később kitöltendő]"],
    linesEn: ["Network: Dandelion", "Password: [PLACEHOLDER - to be filled later]"],
    linesCs: ["Síť: Dandelion", "Heslo: [PLACEHOLDER - doplní se později]"],
    linesDe: ["Netzwerk: Dandelion", "Passwort: [PLACEHOLDER - wird später ergänzt]"],
    linesSk: ["Sieť: Dandelion", "Heslo: [PLACEHOLDER - doplní sa neskôr]"]
  },
  {
    titleHu: "Parkolás",
    titleEn: "Parking",
    titleCs: "Parkování",
    titleDe: "Parken",
    titleSk: "Parkovanie",
    linesHu: ["[PLACEHOLDER – parkolási információ később kitöltendő]"],
    linesEn: ["[PLACEHOLDER - parking information will be added later]"],
    linesCs: ["[PLACEHOLDER - informace o parkování budou doplněny později]"],
    linesDe: ["[PLACEHOLDER - Parkhinweis wird später ergänzt]"],
    linesSk: ["[PLACEHOLDER - informácia o parkovaní bude doplnená neskôr]"]
  },
  {
    titleHu: "Ivóvíz",
    titleEn: "Drinking water",
    titleCs: "Pitná voda",
    titleDe: "Trinkwasser",
    titleSk: "Pitná voda",
    linesHu: ["A csapvíz iható."],
    linesEn: ["Tap water is safe to drink."],
    linesCs: ["Voda z kohoutku je pitná."],
    linesDe: ["Leitungswasser ist trinkbar."],
    linesSk: ["Voda z kohútika je pitná."]
  },
  {
    titleHu: "Melegvíz",
    titleEn: "Hot water",
    titleCs: "Teplá voda",
    titleDe: "Warmwasser",
    titleSk: "Teplá voda",
    linesHu: ["150 literes bojler van, nagyobb társaságnál érdemes figyelni a zuhanyzásra."],
    linesEn: ["There is a 150-litre boiler, so larger groups should pay attention to shower timing."],
    linesCs: ["K dispozici je 150litrový bojler, takže u větší skupiny je dobré hlídat sprchování."],
    linesDe: ["Es gibt einen 150-Liter-Boiler, daher sollten größere Gruppen auf die Duschzeiten achten."],
    linesSk: ["K dispozícii je 150-litrový bojler, preto sa pri väčšej skupine oplatí sledovať sprchovanie."]
  },
  {
    titleHu: "Klíma",
    titleEn: "Air conditioning",
    titleCs: "Klimatizace",
    titleDe: "Klimaanlage",
    titleSk: "Klimatizácia",
    linesHu: ["Csukott ajtó és ablak mellett használd.", "Ajánlott hőfok: 24–26 °C."],
    linesEn: ["Use it with doors and windows closed.", "Recommended temperature: 24-26 °C."],
    linesCs: ["Používej při zavřených dveřích a oknech.", "Doporučená teplota: 24-26 °C."],
    linesDe: ["Bitte nur bei geschlossenen Türen und Fenstern verwenden.", "Empfohlene Temperatur: 24-26 °C."],
    linesSk: ["Používaj pri zatvorených dverách a oknách.", "Odporúčaná teplota: 24-26 °C."]
  },
  {
    titleHu: "Segítség",
    titleEn: "Help",
    titleCs: "Pomoc",
    titleDe: "Hilfe",
    titleSk: "Pomoc",
    linesHu: ["Ha valami nem működik, jelezd a szállásadónak."],
    linesEn: ["If something is not working, please contact the host."],
    linesCs: ["Pokud něco nefunguje, dej vědět ubytovateli."],
    linesDe: ["Wenn etwas nicht funktioniert, gib bitte dem Gastgeber Bescheid."],
    linesSk: ["Ak niečo nefunguje, daj vedieť ubytovateľovi."]
  }
];

export const d1GuidesForDynamicRoutes = [
  wifiGuide,
  arrivalGuide,
  boilerGuide,
  climateGuide,
  kitchenGuide,
  d1DishwasherGuide,
  washerGuide,
  tvGuide,
  waterGuide,
  terraceGuide,
  wasteGuide,
  d1PoolGuide,
  houseRulesGuide,
  d1AszfGuide,
  departureGuide,
  contactGuide
];

export const d1GuideBySlug = Object.fromEntries(
  d1GuidesForDynamicRoutes.map((guide) => [guide.slug, guide])
) as Record<string, GuideContent>;

export const d1GuideEnabledLocales: GuideLocale[] = ["hu", "en", "cs", "de", "sk"];

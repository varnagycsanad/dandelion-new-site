import type { AutumnCampaignOffer } from "./types";

export type AutumnCampaignLang = "hu" | "en" | "de" | "cs" | "sk";

const offerPathByLang: Record<AutumnCampaignLang, Record<string, string>> = {
  hu: {
    "oszi-kettesben": "/ajanlatok/oszi-kettesben/",
    "oszi-csaladi-pihenes": "/ajanlatok/oszi-csaladi-pihenes/"
  },
  en: {
    "oszi-kettesben": "/en/offers/autumn-for-two/",
    "oszi-csaladi-pihenes": "/en/offers/autumn-family-break/"
  },
  de: {
    "oszi-kettesben": "/de/angebote/herbst-zu-zweit/",
    "oszi-csaladi-pihenes": "/de/angebote/herbst-familie/"
  },
  cs: {
    "oszi-kettesben": "/cs/nabidky/podzim-ve-dvou/",
    "oszi-csaladi-pihenes": "/cs/nabidky/podzimni-rodinny-pobyt/"
  },
  sk: {
    "oszi-kettesben": "/sk/ponuky/jesenny-pobyt-vo-dvojici/",
    "oszi-csaladi-pihenes": "/sk/ponuky/jesenny-rodinny-pobyt/"
  }
};

export function getAutumnCampaignPath(lang: AutumnCampaignLang, slug: string) {
  return offerPathByLang[lang][slug] ?? offerPathByLang.hu[slug] ?? `/ajanlatok/${slug}/`;
}

const experiencePathByLang: Record<Exclude<AutumnCampaignLang, "hu">, Record<string, string>> = {
  en: {
    "/elmenyek/": "/en/experiences/",
    "/elmenyek/tanuhegyek/": "/en/witness-hills/",
    "/elmenyek/bor-es-panorama/": "/en/wineries/",
    "/elmenyek/balaton/": "/en/lake-balaton/"
  },
  de: {
    "/elmenyek/": "/de/erlebnisse/",
    "/elmenyek/tanuhegyek/": "/de/zeugenberge/",
    "/elmenyek/bor-es-panorama/": "/de/weingueter/",
    "/elmenyek/balaton/": "/de/balaton/"
  },
  cs: {
    "/elmenyek/": "/cs/zazitky/",
    "/elmenyek/tanuhegyek/": "/cs/svedecne-hory/",
    "/elmenyek/bor-es-panorama/": "/cs/vinarstvi/",
    "/elmenyek/balaton/": "/cs/balaton/"
  },
  sk: {
    "/elmenyek/": "/sk/zazitky/",
    "/elmenyek/tanuhegyek/": "/sk/svedecke-vrchy/",
    "/elmenyek/bor-es-panorama/": "/sk/vinarstva/",
    "/elmenyek/balaton/": "/sk/balaton/"
  }
};

function localizeExperiencePath(path: string, lang: AutumnCampaignLang) {
  if (lang === "hu") return path;
  return experiencePathByLang[lang][path] ?? path;
}

type Copy = {
  seo: { title: string; description: string };
  heroTitle: string;
  heroKicker: string;
  heroLead: string;
  campaignHero: {
    kicker: string;
    titleLines: string[];
    supportLine?: string;
    descriptionLines: string[];
    ctaNote: string;
    heroAlt: string;
    heroMobileAlt: string;
  };
  positioningTitle: string;
  experienceItems: Array<{ title: string; details: string[]; note?: string }>;
  storyTiles: Array<{ titleLines: string[]; alt: string }>;
  programs: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    cards: Array<{ title: string; description: string; alt: string }>;
  };
  directBooking: {
    eyebrow: string;
    titleLines: string[];
    primaryMessage: string;
    highlightLines: string[];
    benefits: string[];
    mediaAlt: string;
  };
  practical: { title: string; items: string[]; supportLabel: string; supportItems: string[] };
  primaryCta: string;
};

const copyByLang: Partial<Record<Exclude<AutumnCampaignLang, "hu">, Record<string, Copy>>> = {
  en: {
    "oszi-kettesben": {
      seo: {
        title: "Autumn for two at Fügeház | Dandelion Guesthouses",
        description: "A romantic autumn escape at Fügeház with a fireplace, wineries, panoramic views and direct booking."
      },
      heroTitle: "An autumn escape in the Balaton Uplands",
      heroKicker: "Fügeház · Autumn for two",
      heroLead: "Slow down, switch off and enjoy every autumn moment at Fügeház.",
      campaignHero: {
        kicker: "AUTUMN FOR TWO",
        titleLines: ["An autumn escape", "in the Balaton Uplands"],
        descriptionLines: ["Slow down. Switch off.", "Enjoy every autumn moment at Fügeház."],
        ctaNote: "5% direct booking saving · 8% price advantage vs OTAs",
        heroAlt: "Fügeház guesthouse in the Balaton Uplands",
        heroMobileAlt: "Fügeház guesthouse in the Balaton Uplands"
      },
      positioningTitle: "A romantic autumn escape",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ heated pool", "with breathtaking views"], note: "In season only" },
        { title: "Fireplace", details: ["A warm fire", "for intimate evenings"] },
        { title: "Wine region", details: ["Excellent wineries", "just minutes away"] },
        { title: "Fire pit", details: ["Free firewood", "under a starry sky"] },
        { title: "Bicycles", details: ["2 adult bicycles", "included"] },
        { title: "Romance", details: ["The perfect place", "for two"] }
      ],
      storyTiles: [
        { titleLines: ["Cool outside.", "Warm inside."], alt: "Bright Fügeház interior with dining table" },
        { titleLines: ["Time passes", "differently here."], alt: "View from the Fügeház terrace over the hills" },
        { titleLines: ["A glass of wine.", "A long evening."], alt: "Wine glasses in front of Balaton Uplands vineyards" },
        { titleLines: ["Starry skies.", "Silence all around."], alt: "Sunrise over the hills near Szent György Hill" }
      ],
      programs: {
        eyebrow: "Nearby experiences",
        title: "Explore the surroundings",
        description: "Wineries, Lake Balaton escapes and easy hikes are all within reach of your time together.",
        ctaLabel: "MORE EXPERIENCES & TIPS",
        ctaHref: "/en/experiences/",
        cards: [
          { title: "Szent György Hill", description: "Vineyards, panoramic views and peaceful walks nearby.", alt: "Vineyards on the slopes of Szent György Hill" },
          { title: "Nearby wineries", description: "Tastings, terraces and long conversations close by.", alt: "Wine glasses in front of the Balaton Uplands" },
          { title: "Tapolca", description: "An easy town escape when you feel like heading out for half a day.", alt: "Balaton Uplands landscape with hills and villages" },
          { title: "Lake Balaton beaches", description: "When the weather is kind, the lake is still an easy autumn outing.", alt: "Quiet Lake Balaton shoreline with distant hills" },
          { title: "Hiking trails", description: "Short and longer paths with views, space and quiet.", alt: "Aerial view of the witness hills in the Balaton Uplands" }
        ]
      },
      directBooking: {
        eyebrow: "Direct booking benefit",
        titleLines: ["Book direct", "and enjoy the benefits!"],
        primaryMessage: "Check availability and prices directly through our own booking page.",
        highlightLines: ["discount", "on the accommodation"],
        benefits: ["Direct contact with your host", "Fast confirmation", "Flexible assistance", "Book direct for our best price."],
        mediaAlt: "Warm Fügeház interior with fireplace and autumn atmosphere"
      },
      practical: {
        title: "Everything you need for a comfortable autumn escape",
        items: ["Free Wi-Fi", "Free parking", "Air conditioning", "Non-smoking accommodation", "Pets welcome"],
        supportLabel: "Baby equipment available on request",
        supportItems: ["cot", "baby bath", "high chair", "step stool"]
      },
      primaryCta: "PRICES & AVAILABILITY"
    },
    "oszi-csaladi-pihenes": {
      seo: {
        title: "Autumn family break at D2 | Dandelion Guesthouses",
        description: "A family autumn escape at Dandelion D2 with the Panorama Pool, fireplace, shared experiences and direct booking."
      },
      heroTitle: "An autumn family escape",
      heroKicker: "Dandelion D2 · Autumn family break",
      heroLead: "Quality time, shared experiences and nature-filled days await you at Dandelion D2.",
      campaignHero: {
        kicker: "AUTUMN FAMILY BREAK",
        titleLines: ["An autumn family", "escape"],
        supportLine: "in the Balaton Uplands",
        descriptionLines: ["Quality time. Shared experiences.", "At Dandelion D2, the whole family can truly be together."],
        ctaNote: "5% direct booking saving · 8% price advantage vs OTAs",
        heroAlt: "Dandelion D2 guesthouse in the Balaton Uplands",
        heroMobileAlt: "Dandelion D2 guesthouse in the Balaton Uplands"
      },
      positioningTitle: "A nature-filled autumn break",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ heated pool", "with breathtaking views"], note: "In season only" },
        { title: "Family-friendly", details: ["Child-friendly equipment", "and shared spaces"] },
        { title: "Fireplace", details: ["A warm fire", "for cosy evenings"] },
        { title: "Grill", details: ["Outdoor grilling", "for shared meals"] },
        { title: "Fire pit", details: ["Free firewood", "for evenings together"] },
        { title: "Free Wi-Fi", details: ["Stable connection", "when you need it"] },
        { title: "Free parking", details: ["Easy arrival", "right by the house"] }
      ],
      storyTiles: [
        { titleLines: ["Pool.", "Play. Laughter."], alt: "Panorama Pool with the witness hills behind it" },
        { titleLines: ["There is a plan", "for rainy days too."], alt: "Bright bedroom at Dandelion D2" },
        { titleLines: ["Fire, stories,", "shared moments."], alt: "D2 living room with fireplace and dining area" },
        { titleLines: ["Shared dinners.", "Shared memories."], alt: "D2 terrace with dining table and grill" }
      ],
      programs: {
        eyebrow: "Nearby experiences",
        title: "Explore the surroundings",
        description: "Nearby walks, beaches and easy family stops complete the break.",
        ctaLabel: "MORE EXPERIENCES & TIPS",
        ctaHref: "/en/experiences/",
        cards: [
          { title: "Szent György Hill", description: "A great destination for easy walks and shared viewpoints.", alt: "Aerial view of the witness hills in the Balaton Uplands" },
          { title: "Tapolca Lake Cave", description: "A shared experience nearby, whatever the weather.", alt: "Balaton Uplands landscape with villages and hills" },
          { title: "Lake Balaton beaches", description: "When the weather is good, a spontaneous lakeside detour is easy.", alt: "Lake Balaton panorama with calm water" },
          { title: "Family experiences", description: "Kisapáti and nearby stops for an active afternoon.", alt: "Child sitting on a blanket in the D2 garden" },
          { title: "Wineries", description: "A peaceful panoramic escape for the grown-ups too.", alt: "Wine glasses in front of the Balaton Uplands" }
        ]
      },
      directBooking: {
        eyebrow: "Direct booking benefit",
        titleLines: ["Book direct", "and enjoy the benefits!"],
        primaryMessage: "Check prices and availability directly through our own booking page.",
        highlightLines: ["discount", "on the accommodation"],
        benefits: ["Direct contact with your host", "Fast confirmation", "Flexible assistance", "Book direct for our best price."],
        mediaAlt: "Child relaxing in the D2 garden with the landscape behind"
      },
      practical: {
        title: "Comfortable details for shared time",
        items: ["Free Wi-Fi", "Free parking", "Air conditioning", "Family-friendly", "Non-smoking accommodation", "Pets not allowed"],
        supportLabel: "Baby equipment available on request",
        supportItems: ["cot", "baby bath", "high chair", "step stool"]
      },
      primaryCta: "PRICES & AVAILABILITY"
    }
  },
  de: {
    "oszi-kettesben": {
      seo: { title: "Herbst zu zweit im Fügeház | Dandelion Gästehäuser", description: "Romantische Auszeit im Herbst im Fügeház mit Kamin, Weingütern, Panoramablick und Direktbuchung." },
      heroTitle: "Herbstzeit im Balaton-Oberland",
      heroKicker: "Fügeház · Herbst zu zweit",
      heroLead: "Entschleunigen, abschalten und jeden Herbstmoment im Fügeház genießen.",
      campaignHero: { kicker: "HERBST ZU ZWEIT", titleLines: ["Herbstzeit", "im Balaton-Oberland"], descriptionLines: ["Langsam werden. Abschalten.", "Genießen Sie jeden Herbstmoment im Fügeház."], ctaNote: "5 % Vorteil bei Direktbuchung · 8 % Preisvorteil gegenüber OTAs", heroAlt: "Fügeház Gästehaus im Balaton-Oberland", heroMobileAlt: "Fügeház Gästehaus im Balaton-Oberland" },
      positioningTitle: "Romantische Auszeit im Herbst",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ beheizter Pool", "mit atemberaubender Aussicht"], note: "Nur in der Saison" },
        { title: "Kamin", details: ["Warmes Feuer", "für gemütliche Abende"] },
        { title: "Weinregion", details: ["Hervorragende Weingüter", "nur wenige Minuten entfernt"] },
        { title: "Feuerstelle", details: ["Kostenloses Feuerholz", "unter dem Sternenhimmel"] },
        { title: "Fahrräder", details: ["2 Fahrräder für Erwachsene", "inklusive"] },
        { title: "Romantik", details: ["Der ideale Ort", "für zwei"] }
      ],
      storyTiles: [
        { titleLines: ["Draußen kühl.", "Drinnen warm."], alt: "Helles Fügeház-Interieur mit Esstisch" },
        { titleLines: ["Hier vergeht", "die Zeit anders."], alt: "Blick von der Fügeház-Terrasse auf die Landschaft" },
        { titleLines: ["Ein Glas Wein.", "Ein langer Abend."], alt: "Weingläser vor Weinbergen im Balaton-Oberland" },
        { titleLines: ["Sternenhimmel.", "Stille ringsum."], alt: "Sonnenaufgang über den Hügeln am Szent György-hegy" }
      ],
      programs: {
        eyebrow: "Erlebnisse in der Umgebung", title: "Entdecken Sie die Umgebung", description: "Weingüter, Ausflüge an den Balaton und leichte Wanderungen liegen ganz in der Nähe.", ctaLabel: "MEHR ERLEBNISSE & TIPPS", ctaHref: "/de/erlebnisse/",
        cards: [
          { title: "Szent György-hegy", description: "Weinreihen, Panorama und ruhige Spaziergänge in der Nähe.", alt: "Weinreihen an den Hängen des Szent György-hegy" },
          { title: "Nahe Weingüter", description: "Verkostungen, Terrassen und lange Gespräche ganz in der Nähe.", alt: "Weingläser vor der Landschaft des Balaton-Oberlands" },
          { title: "Tapolca", description: "Ein unkomplizierter Abstecher, wenn Sie einen halben Tag unterwegs sein möchten.", alt: "Landschaft des Balaton-Oberlands mit Hügeln und Dörfern" },
          { title: "Balaton-Strände", description: "Bei gutem Wetter bleibt der See auch im Herbst ein schönes Ziel.", alt: "Ruhiger Uferabschnitt am Balaton mit fernen Hügeln" },
          { title: "Wanderwege", description: "Kurze und lange Wege mit Aussicht und Ruhe.", alt: "Luftaufnahme der Zeugenberge im Balaton-Oberland" }
        ]
      },
      directBooking: { eyebrow: "Vorteil der Direktbuchung", titleLines: ["Direkt buchen", "und Vorteile genießen!"], primaryMessage: "Verfügbarkeit und Preise sehen Sie direkt auf unserer eigenen Buchungsseite.", highlightLines: ["Rabatt", "auf den Unterkunftspreis"], benefits: ["Direkter Kontakt zum Gastgeber", "Schnelle Bestätigung", "Flexible Abwicklung", "Direkt buchen zum besten Preis."], mediaAlt: "Helles Fügeház-Interieur mit Kamin und herbstlicher Atmosphäre" },
      practical: { title: "Alles für eine angenehme Auszeit im Herbst", items: ["Kostenloses WLAN", "Kostenlose Parkplätze", "Klimaanlage", "Nichtraucherunterkunft", "Haustiere willkommen"], supportLabel: "Babyausstattung auf Anfrage", supportItems: ["Kinderbett", "Babybadewanne", "Hochstuhl", "Tritt"] },
      primaryCta: "PREISE & VERFÜGBARKEIT"
    },
    "oszi-csaladi-pihenes": {
      seo: { title: "Herbsturlaub mit der Familie im D2 | Dandelion Gästehäuser", description: "Familienauszeit im Herbst im Dandelion D2 mit Panorama Pool, Kamin, gemeinsamen Erlebnissen und Direktbuchung." },
      heroTitle: "Herbstliche Familienauszeit",
      heroKicker: "Dandelion D2 · Herbsturlaub mit der Familie",
      heroLead: "Gemeinsame Zeit, Erlebnisse und naturnahe Tage erwarten Sie im Dandelion D2.",
      campaignHero: { kicker: "HERBSTURLAUB MIT DER FAMILIE", titleLines: ["Herbstliche Familien", "auszeit"], supportLine: "im Balaton-Oberland", descriptionLines: ["Gemeinsame Zeit. Gemeinsame Erlebnisse.", "Im Dandelion D2 kann die ganze Familie wirklich zusammen sein."], ctaNote: "5 % Vorteil bei Direktbuchung · 8 % Preisvorteil gegenüber OTAs", heroAlt: "Dandelion D2 Gästehaus im Balaton-Oberland", heroMobileAlt: "Dandelion D2 Gästehaus im Balaton-Oberland" },
      positioningTitle: "Naturnahe Auszeit im Herbst",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ beheizter Pool", "mit atemberaubender Aussicht"], note: "Nur in der Saison" },
        { title: "Familienfreundlich", details: ["Kinderfreundliche Ausstattung", "und gemeinsame Räume"] },
        { title: "Kamin", details: ["Warmes Feuer", "für gemütliche Abende"] },
        { title: "Grill", details: ["Grillen im Freien", "für gemeinsame Mahlzeiten"] },
        { title: "Feuerstelle", details: ["Kostenloses Feuerholz", "für gemeinsame Abende"] },
        { title: "Kostenloses WLAN", details: ["Stabile Verbindung", "wenn Sie sie brauchen"] },
        { title: "Kostenlose Parkplätze", details: ["Bequeme Anreise", "direkt am Haus"] }
      ],
      storyTiles: [
        { titleLines: ["Pool.", "Spiel. Lachen."], alt: "Panorama Pool mit den Zeugenbergen im Hintergrund" },
        { titleLines: ["Auch für Regentage", "gibt es einen Plan."], alt: "Helles Schlafzimmer im Dandelion D2" },
        { titleLines: ["Feuer, Geschichten,", "gemeinsame Momente."], alt: "D2-Wohnzimmer mit Kamin und Essbereich" },
        { titleLines: ["Gemeinsame Essen.", "Gemeinsame Erinnerungen."], alt: "D2-Terrasse mit Esstisch und Grill" }
      ],
      programs: {
        eyebrow: "Erlebnisse in der Umgebung", title: "Entdecken Sie die Umgebung", description: "Nahe Spazierwege, Strände und unkomplizierte Familienziele ergänzen die Auszeit.", ctaLabel: "MEHR ERLEBNISSE & TIPPS", ctaHref: "/de/erlebnisse/",
        cards: [
          { title: "Szent György-hegy", description: "Ein schönes Ziel für leichte Spaziergänge und gemeinsame Aussichtspunkte.", alt: "Luftaufnahme der Zeugenberge im Balaton-Oberland" },
          { title: "Höhlensee von Tapolca", description: "Ein gemeinsames Erlebnis ganz in der Nähe, unabhängig vom Wetter.", alt: "Landschaft des Balaton-Oberlands mit Dörfern und Hügeln" },
          { title: "Balaton-Strände", description: "Bei gutem Wetter passt ein spontaner Abstecher ans Wasser immer.", alt: "Balaton-Panorama mit ruhiger Wasserfläche" },
          { title: "Familienerlebnisse", description: "Kisapáti und nahe Ziele für einen aktiveren Nachmittag.", alt: "Kind auf einer Decke im Garten des D2" },
          { title: "Weingüter", description: "Auch Erwachsene finden Ruhe und Panorama.", alt: "Weingläser vor der Landschaft des Balaton-Oberlands" }
        ]
      },
      directBooking: { eyebrow: "Vorteil der Direktbuchung", titleLines: ["Direkt buchen", "und Vorteile genießen!"], primaryMessage: "Preise und Verfügbarkeit sehen Sie direkt auf unserer eigenen Buchungsseite.", highlightLines: ["Rabatt", "auf den Unterkunftspreis"], benefits: ["Direkter Kontakt zum Gastgeber", "Schnelle Bestätigung", "Flexible Abwicklung", "Direkt buchen zum besten Preis."], mediaAlt: "Kind im Garten des D2 mit der Landschaft im Hintergrund" },
      practical: { title: "Komfortable Details für gemeinsame Zeit", items: ["Kostenloses WLAN", "Kostenlose Parkplätze", "Klimaanlage", "Familienfreundlich", "Nichtraucherunterkunft", "Keine Haustiere"], supportLabel: "Babyausstattung auf Anfrage", supportItems: ["Kinderbett", "Babybadewanne", "Hochstuhl", "Tritt"] },
      primaryCta: "PREISE & VERFÜGBARKEIT"
    }
  },
  cs: {
    "oszi-kettesben": {
      seo: { title: "Podzim ve dvou ve Fügeházu | Dandelion ubytování", description: "Romantický podzimní pobyt ve Fügeházu s krbem, vinařstvími, panoramaty a přímou rezervací." },
      heroTitle: "Podzimní odpočinek v Balatonské vrchovině", heroKicker: "Fügeház · Podzim ve dvou", heroLead: "Zpomalte, vypněte a užijte si každý podzimní okamžik ve Fügeházu.",
      campaignHero: { kicker: "PODZIM VE DVOU", titleLines: ["Podzimní odpočinek", "v Balatonské vrchovině"], descriptionLines: ["Zpomalte. Vypněte.", "Užijte si každý podzimní okamžik ve Fügeházu."], ctaNote: "Úspora 5 % při přímé rezervaci · cenová výhoda 8 % oproti OTA", heroAlt: "Penzion Fügeház v Balatonské vrchovině", heroMobileAlt: "Penzion Fügeház v Balatonské vrchovině" },
      positioningTitle: "Romantický podzimní pobyt",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ vyhřívaný bazén", "s úchvatným výhledem"], note: "Pouze v sezoně" }, { title: "Krb", details: ["Teplý oheň", "pro útulné večery"] }, { title: "Vinařská oblast", details: ["Skvělá vinařství", "jen pár minut odtud"] }, { title: "Ohniště", details: ["Dřevo zdarma", "pod hvězdnou oblohou"] }, { title: "Jízdní kola", details: ["2 kola pro dospělé", "v ceně"] }, { title: "Romantika", details: ["Ideální místo", "pro dva"] }
      ],
      storyTiles: [
        { titleLines: ["Venku chladno.", "Uvnitř teplo."], alt: "Světlý interiér Fügeházu s jídelním stolem" }, { titleLines: ["Čas tu plyne", "jinak."], alt: "Výhled z terasy Fügeházu do krajiny" }, { titleLines: ["Sklenka vína.", "Dlouhý večer."], alt: "Sklenky vína před vinicemi Balatonské vrchoviny" }, { titleLines: ["Hvězdná obloha.", "Ticho kolem."], alt: "Východ slunce nad kopci u Szent György-hegy" }
      ],
      programs: { eyebrow: "Zážitky v okolí", title: "Objevte okolí", description: "Vinařství, výlety k Balatonu a nenáročné túry máte na dosah.", ctaLabel: "DALŠÍ ZÁŽITKY A TIPY", ctaHref: "/cs/zazitky/", cards: [
        { title: "Szent György-hegy", description: "Vinice, panoramata a klidné procházky v okolí.", alt: "Vinice na svazích Szent György-hegy" }, { title: "Blízká vinařství", description: "Ochutnávky, terasy a dlouhé rozhovory nedaleko.", alt: "Sklenky vína před krajinou Balatonské vrchoviny" }, { title: "Tapolca", description: "Pohodový výlet do města na půl dne.", alt: "Krajina Balatonské vrchoviny s kopci a vesnicemi" }, { title: "Pláže Balatonu", description: "Za hezkého počasí je jezero snadným podzimním programem.", alt: "Klidné pobřeží Balatonu se vzdálenými kopci" }, { title: "Turistické trasy", description: "Kratší i delší cesty s výhledy a tichem.", alt: "Letecký pohled na svědecké hory Balatonské vrchoviny" }
      ] },
      directBooking: { eyebrow: "Výhoda přímé rezervace", titleLines: ["Rezervujte přímo", "a užijte si výhody!"], primaryMessage: "Dostupné termíny a ceny uvidíte přímo v našem rezervačním systému.", highlightLines: ["sleva", "z ceny ubytování"], benefits: ["Přímý kontakt s hostitelem", "Rychlé potvrzení", "Flexibilní vyřízení", "Přímá rezervace za nejlepší cenu."], mediaAlt: "Světlý interiér Fügeházu s krbem a podzimní atmosférou" },
      practical: { title: "Vše pro pohodový podzimní pobyt", items: ["Wi-Fi zdarma", "Parkování zdarma", "Klimatizace", "Nekuřácké ubytování", "Domácí mazlíčci vítáni"], supportLabel: "Vybavení pro miminka na vyžádání", supportItems: ["dětská postýlka", "vanička", "jídelní židlička", "stupínek"] }, primaryCta: "CENY A DOSTUPNÉ TERMÍNY"
    },
    "oszi-csaladi-pihenes": {
      seo: { title: "Podzimní rodinný pobyt v D2 | Dandelion ubytování", description: "Rodinný podzimní pobyt v Dandelion D2 s Panorama Poolem, krbem, společnými zážitky a přímou rezervací." },
      heroTitle: "Podzimní rodinný odpočinek", heroKicker: "Dandelion D2 · Podzimní rodinný pobyt", heroLead: "Kvalitní čas, společné zážitky a dny v přírodě čekají v Dandelion D2.",
      campaignHero: { kicker: "PODZIMNÍ RODINNÝ POBYT", titleLines: ["Podzimní rodinný", "odpočinek"], supportLine: "v Balatonské vrchovině", descriptionLines: ["Kvalitní čas. Společné zážitky.", "V Dandelion D2 může být celá rodina opravdu spolu."], ctaNote: "Úspora 5 % při přímé rezervaci · cenová výhoda 8 % oproti OTA", heroAlt: "Penzion Dandelion D2 v Balatonské vrchovině", heroMobileAlt: "Penzion Dandelion D2 v Balatonské vrchovině" },
      positioningTitle: "Podzimní pobyt v přírodě",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ vyhřívaný bazén", "s úchvatným výhledem"], note: "Pouze v sezoně" }, { title: "Pro rodiny", details: ["Vybavení pro děti", "a společné prostory"] }, { title: "Krb", details: ["Teplý oheň", "pro útulné večery"] }, { title: "Gril", details: ["Grilování venku", "pro společná jídla"] }, { title: "Ohniště", details: ["Dřevo zdarma", "pro společné večery"] }, { title: "Wi-Fi zdarma", details: ["Stabilní připojení", "když je potřeba"] }, { title: "Parkování zdarma", details: ["Pohodlný příjezd", "přímo u domu"] }
      ],
      storyTiles: [
        { titleLines: ["Bazén.", "Hra. Smích."], alt: "Panorama Pool se svědeckými horami v pozadí" }, { titleLines: ["I na deštivé dny", "máme řešení."], alt: "Světlá ložnice v Dandelion D2" }, { titleLines: ["Oheň, příběhy,", "společné chvíle."], alt: "Obývací pokoj D2 s krbem a jídelnou" }, { titleLines: ["Společné večeře.", "Společné vzpomínky."], alt: "Terasa D2 s jídelním stolem a grilem" }
      ],
      programs: { eyebrow: "Zážitky v okolí", title: "Objevte okolí", description: "Blízké procházky, pláže a snadno dostupná rodinná zastavení doplní váš pobyt.", ctaLabel: "DALŠÍ ZÁŽITKY A TIPY", ctaHref: "/cs/zazitky/", cards: [
        { title: "Szent György-hegy", description: "Skvělý cíl pro nenáročné procházky a společné výhledy.", alt: "Letecký pohled na svědecké hory Balatonské vrchoviny" }, { title: "Jeskyně u Tapolce", description: "Společný program poblíž, nezávislý na počasí.", alt: "Krajina Balatonské vrchoviny s vesnicemi a kopci" }, { title: "Pláže Balatonu", description: "Za hezkého počasí se hodí i spontánní výlet k vodě.", alt: "Panorama Balatonu s klidnou vodní hladinou" }, { title: "Rodinné zážitky", description: "Kisapáti a okolní zastávky pro aktivnější odpoledne.", alt: "Dítě na dece v zahradě D2" }, { title: "Vinařství", description: "I dospělí si užijí klid a panorama.", alt: "Sklenky vína před krajinou Balatonské vrchoviny" }
      ] },
      directBooking: { eyebrow: "Výhoda přímé rezervace", titleLines: ["Rezervujte přímo", "a užijte si výhody!"], primaryMessage: "Ceny a dostupné termíny uvidíte přímo v našem rezervačním systému.", highlightLines: ["sleva", "z ceny ubytování"], benefits: ["Přímý kontakt s hostitelem", "Rychlé potvrzení", "Flexibilní vyřízení", "Přímá rezervace za nejlepší cenu."], mediaAlt: "Dítě odpočívá v zahradě D2 s krajinou v pozadí" },
      practical: { title: "Pohodlné detaily pro společný čas", items: ["Wi-Fi zdarma", "Parkování zdarma", "Klimatizace", "Vhodné pro rodiny", "Nekuřácké ubytování", "Domácí mazlíčci nejsou povoleni"], supportLabel: "Vybavení pro miminka na vyžádání", supportItems: ["dětská postýlka", "vanička", "jídelní židlička", "stupínek"] }, primaryCta: "CENY A DOSTUPNÉ TERMÍNY"
    }
  },
  sk: {
    "oszi-kettesben": {
      seo: { title: "Jesenný pobyt vo dvojici vo Fügeháze | Dandelion ubytovanie", description: "Romantický jesenný oddych vo Fügeháze s krbom, vinárstvami, panorámou a priamou rezerváciou." },
      heroTitle: "Jesenný oddych v Balatonskej vrchovine", heroKicker: "Fügeház · Jesenný pobyt vo dvojici", heroLead: "Spomaľte, vypnite a užite si každý jesenný okamih vo Fügeháze.",
      campaignHero: { kicker: "JESENNÝ POBYT VO DVOJICI", titleLines: ["Jesenný oddych", "v Balatonskej vrchovine"], descriptionLines: ["Spomaľte. Vypnite.", "Užite si každý jesenný okamih vo Fügeháze."], ctaNote: "Úspora 5 % pri priamej rezervácii · cenová výhoda 8 % oproti OTA", heroAlt: "Penzión Fügeház v Balatonskej vrchovine", heroMobileAlt: "Penzión Fügeház v Balatonskej vrchovine" },
      positioningTitle: "Romantický jesenný pobyt",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ vyhrievaný bazén", "s úchvatným výhľadom"], note: "Len počas sezóny" }, { title: "Krb", details: ["Teplý oheň", "na útulné večery"] }, { title: "Vínna oblasť", details: ["Výborné vinárstva", "len pár minút odtiaľ"] }, { title: "Oh­nisko", details: ["Drevo zdarma", "pod hviezdnou oblohou"] }, { title: "Bicykle", details: ["2 bicykle pre dospelých", "v cene"] }, { title: "Romantika", details: ["Ideálne miesto", "pre dvoch"] }
      ],
      storyTiles: [
        { titleLines: ["Vonku chladno.", "Vnútri teplo."], alt: "Svetlý interiér Fügeházu s jedálenským stolom" }, { titleLines: ["Čas tu plynie", "inak."], alt: "Výhľad z terasy Fügeházu do krajiny" }, { titleLines: ["Pohár vína.", "Dlhý večer."], alt: "Poháre vína pred vinicami Balatonskej vrchoviny" }, { titleLines: ["Hviezdna obloha.", "Ticho navôkol."], alt: "Východ slnka nad kopcami pri Szent György-hegy" }
      ],
      programs: { eyebrow: "Zážitky v okolí", title: "Objavte okolie", description: "Vinárstva, výlety k Balatonu a nenáročné túry máte na dosah.", ctaLabel: "ĎALŠIE ZÁŽITKY A TIPY", ctaHref: "/sk/zazitky/", cards: [
        { title: "Szent György-hegy", description: "Vinice, panorámy a pokojné prechádzky v okolí.", alt: "Vinice na svahoch Szent György-hegy" }, { title: "Blízke vinárstva", description: "Ochutnávky, terasy a dlhé rozhovory nablízku.", alt: "Poháre vína pred krajinou Balatonskej vrchoviny" }, { title: "Tapolca", description: "Pohodový výlet do mesta na pol dňa.", alt: "Krajina Balatonskej vrchoviny s kopcami a dedinami" }, { title: "Pláže Balatonu", description: "Za pekného počasia je jazero ľahkým jesenným programom.", alt: "Pokojné pobrežie Balatonu so vzdialenými kopcami" }, { title: "Turistické trasy", description: "Kratšie aj dlhšie chodníky s výhľadmi a tichom.", alt: "Letecký pohľad na svedecké vrchy Balatonskej vrchoviny" }
      ] },
      directBooking: { eyebrow: "Výhoda priamej rezervácie", titleLines: ["Rezervujte priamo", "a užite si výhody!"], primaryMessage: "Dostupné termíny a ceny uvidíte priamo v našom rezervačnom systéme.", highlightLines: ["zľava", "z ceny ubytovania"], benefits: ["Priamy kontakt s hostiteľom", "Rýchle potvrdenie", "Flexibilné vybavenie", "Priama rezervácia za najlepšiu cenu."], mediaAlt: "Svetlý interiér Fügeházu s krbom a jesennou atmosférou" },
      practical: { title: "Všetko pre pohodový jesenný pobyt", items: ["Wi-Fi zdarma", "Parkovanie zdarma", "Klimatizácia", "Nefajčiarske ubytovanie", "Domáce zvieratá vítané"], supportLabel: "Vybavenie pre bábätká na vyžiadanie", supportItems: ["detská postieľka", "vanička", "detská stolička", "stupienok"] }, primaryCta: "CENY A DOSTUPNÉ TERMÍNY"
    },
    "oszi-csaladi-pihenes": {
      seo: { title: "Jesenný rodinný pobyt v D2 | Dandelion ubytovanie", description: "Rodinný jesenný oddych v Dandelion D2 s Panorama Poolom, krbom, spoločnými zážitkami a priamou rezerváciou." },
      heroTitle: "Jesenný rodinný oddych", heroKicker: "Dandelion D2 · Jesenný rodinný pobyt", heroLead: "Kvalitný čas, spoločné zážitky a dni v prírode čakajú v Dandelion D2.",
      campaignHero: { kicker: "JESENNÝ RODINNÝ POBYT", titleLines: ["Jesenný rodinný", "oddych"], supportLine: "v Balatonskej vrchovine", descriptionLines: ["Kvalitný čas. Spoločné zážitky.", "V Dandelion D2 môže byť celá rodina naozaj spolu."], ctaNote: "Úspora 5 % pri priamej rezervácii · cenová výhoda 8 % oproti OTA", heroAlt: "Penzión Dandelion D2 v Balatonskej vrchovine", heroMobileAlt: "Penzión Dandelion D2 v Balatonskej vrchovine" },
      positioningTitle: "Jesenný pobyt v prírode",
      experienceItems: [
        { title: "Panorama Pool", details: ["44 m³ vyhrievaný bazén", "s úchvatným výhľadom"], note: "Len počas sezóny" }, { title: "Pre rodiny", details: ["Vybavenie pre deti", "a spoločné priestory"] }, { title: "Krb", details: ["Teplý oheň", "na útulné večery"] }, { title: "Gril", details: ["Grilovanie vonku", "na spoločné jedlá"] }, { title: "Oh­nisko", details: ["Drevo zdarma", "na spoločné večery"] }, { title: "Wi-Fi zdarma", details: ["Stabilné pripojenie", "keď ho potrebujete"] }, { title: "Parkovanie zdarma", details: ["Pohodlný príchod", "priamo pri dome"] }
      ],
      storyTiles: [
        { titleLines: ["Bazén.", "Hra. Smiech."], alt: "Panorama Pool so svedeckými vrchmi v pozadí" }, { titleLines: ["Aj na daždivé dni", "máme riešenie."], alt: "Svetlá spálňa v Dandelion D2" }, { titleLines: ["Oheň, príbehy,", "spoločné chvíle."], alt: "Obývačka D2 s krbom a jedálenským priestorom" }, { titleLines: ["Spoločné večere.", "Spoločné spomienky."], alt: "Terasa D2 s jedálenským stolom a grilom" }
      ],
      programs: { eyebrow: "Zážitky v okolí", title: "Objavte okolie", description: "Blízke prechádzky, pláže a ľahko dostupné rodinné zastávky doplnia váš pobyt.", ctaLabel: "ĎALŠIE ZÁŽITKY A TIPY", ctaHref: "/sk/zazitky/", cards: [
        { title: "Szent György-hegy", description: "Skvelý cieľ na nenáročné prechádzky a spoločné výhľady.", alt: "Letecký pohľad na svedecké vrchy Balatonskej vrchoviny" }, { title: "Jaskyňa pri Tapolci", description: "Spoločný program nablízku, nezávislý od počasia.", alt: "Krajina Balatonskej vrchoviny s dedinami a kopcami" }, { title: "Pláže Balatonu", description: "Za pekného počasia sa hodí aj spontánny výlet k vode.", alt: "Panoráma Balatonu s pokojnou vodnou hladinou" }, { title: "Rodinné zážitky", description: "Kisapáti a okolité zastávky na aktívnejšie popoludnie.", alt: "Dieťa na deke v záhrade D2" }, { title: "Vinárstva", description: "Aj dospelí si užijú pokoj a panorámu.", alt: "Poháre vína pred krajinou Balatonskej vrchoviny" }
      ] },
      directBooking: { eyebrow: "Výhoda priamej rezervácie", titleLines: ["Rezervujte priamo", "a užite si výhody!"], primaryMessage: "Ceny a dostupné termíny uvidíte priamo v našom rezervačnom systéme.", highlightLines: ["zľava", "z ceny ubytovania"], benefits: ["Priamy kontakt s hostiteľom", "Rýchle potvrdenie", "Flexibilné vybavenie", "Priama rezervácia za najlepšiu cenu."], mediaAlt: "Dieťa oddychuje v záhrade D2 s krajinou v pozadí" },
      practical: { title: "Pohodlné detaily pre spoločný čas", items: ["Wi-Fi zdarma", "Parkovanie zdarma", "Klimatizácia", "Vhodné pre rodiny", "Nefajčiarske ubytovanie", "Domáce zvieratá nie sú povolené"], supportLabel: "Vybavenie pre bábätká na vyžiadanie", supportItems: ["detská postieľka", "vanička", "detská stolička", "stupienok"] }, primaryCta: "CENY A DOSTUPNÉ TERMÍNY"
    }
  }
};

function localizedResponsiveMedia(media: AutumnCampaignOffer["campaignHero"]["media"], desktopAlt: string, mobileAlt: string) {
  return {
    ...media,
    desktop: { ...media.desktop, alt: desktopAlt },
    mobile: media.mobile ? { ...media.mobile, alt: mobileAlt } : undefined
  };
}

export function localizeAutumnOffer(offer: AutumnCampaignOffer, lang: AutumnCampaignLang): AutumnCampaignOffer {
  if (lang === "hu") return offer;

  const copy = copyByLang[lang]?.[offer.slug];
  if (!copy) return offer;

  return {
    ...offer,
    routePath: getAutumnCampaignPath(lang, offer.slug),
    seo: copy.seo,
    hero: { ...offer.hero, eyebrow: copy.heroKicker, title: copy.heroTitle, lead: copy.heroLead },
    campaignHero: {
      ...offer.campaignHero,
      kicker: copy.campaignHero.kicker,
      titleLines: copy.campaignHero.titleLines,
      supportLine: copy.campaignHero.supportLine,
      descriptionLines: copy.campaignHero.descriptionLines,
      ctaNote: copy.campaignHero.ctaNote,
      media: localizedResponsiveMedia(offer.campaignHero.media, copy.campaignHero.heroAlt, copy.campaignHero.heroMobileAlt)
    },
    positioning: { ...offer.positioning, title: copy.positioningTitle },
    experienceItems: offer.experienceItems.map((item, index) => ({
      ...item,
      ...copy.experienceItems[index]
    })),
    storyTiles: offer.storyTiles.map((tile, index) => ({
      ...tile,
      ...copy.storyTiles[index],
      media: localizedResponsiveMedia(tile.media, copy.storyTiles[index].alt, copy.storyTiles[index].alt)
    })),
    programsSection: {
      ...offer.programsSection,
      eyebrow: copy.programs.eyebrow,
      title: copy.programs.title,
      description: copy.programs.description,
      ctaLabel: copy.programs.ctaLabel,
      ctaHref: copy.programs.ctaHref,
      cards: offer.programsSection.cards.map((card, index) => ({
        ...card,
        href: localizeExperiencePath(card.href, lang),
        ...copy.programs.cards[index],
        media: localizedResponsiveMedia(card.media, copy.programs.cards[index].alt, copy.programs.cards[index].alt)
      }))
    },
    directBooking: {
      ...offer.directBooking,
      eyebrow: copy.directBooking.eyebrow,
      titleLines: copy.directBooking.titleLines,
      primaryMessage: copy.directBooking.primaryMessage,
      highlightLines: copy.directBooking.highlightLines,
      benefits: copy.directBooking.benefits,
      media: offer.directBooking.media
        ? localizedResponsiveMedia(offer.directBooking.media, copy.directBooking.mediaAlt, copy.directBooking.mediaAlt)
        : undefined
    },
    practicalAmenities: {
      ...offer.practicalAmenities,
      title: copy.practical.title,
      items: copy.practical.items,
      supportLabel: copy.practical.supportLabel,
      supportItems: copy.practical.supportItems
    },
    ctas: { ...offer.ctas, primary: copy.primaryCta }
  };
}

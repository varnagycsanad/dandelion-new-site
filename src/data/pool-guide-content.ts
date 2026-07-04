export type PoolGuideContent = {
  pageTitle: string;
  description: string;
  canonicalPath: string;
  lang?: string;
  ogLocale?: string;
  numberLocale: string;
  languageSwitchLabel: string;
  languageLinks: { label: string; href: string; isActive?: boolean }[];
  topEyebrow: string;
  photoAlt: string;
  photoTitle: string;
  lead: string;
  temperatureCardLabel: string;
  waterNowLabel: string;
  airLabel: string;
  fallbackText: string;
  usageCardLabel: string;
  everyDayLabel: string;
  hoursValue: string;
  depthLabel: string;
  depthValue: string;
  windEyebrow: string;
  windFallbackTitle: string;
  windFallbackText: string;
  stormEyebrow: string;
  stormFallbackTitle: string;
  stormFallbackText: string;
  radarEyebrow: string;
  radarTitle: string;
  forecastTitle: string;
  forecastLoadingText: string;
  whatsappAlt: string;
  googleAlt: string;
  safetyCardLabel: string;
  safetyValue: string;
  safetyMeta: string;
  summaryEyebrow: string;
  summaryTitle: string;
  summaryText: string;
  quickRules: string[];
  helpEyebrow: string;
  helpTitle: string;
  helpText: string;
  helpSteps: { title: string; text: string }[];
  practicalEyebrow: string;
  practicalTitle: string;
  practicalItems: { title: string; text: string }[];
  weatherWindWarningTitle: string;
  weatherWindWarningText: string;
  weatherWindCautionTitle: string;
  weatherWindCautionText: string;
  weatherWindCalmTitle: string;
  weatherWindCalmText: string;
  weatherStormWarningTitle: string;
  weatherStormWarningText: string;
  weatherStormCautionTitle: string;
  weatherStormCautionText: string;
  weatherStormCalmTitle: string;
  weatherStormCalmText: string;
  weatherWindUnavailableTitle: string;
  weatherWindUnavailableText: string;
  weatherStormUnavailableTitle: string;
  weatherStormUnavailableText: string;
};

const buildLanguageLinks = (active: "hu" | "en" | "de" | "cs" | "sk") => [
  { label: "HU", href: "/medence/", isActive: active === "hu" },
  { label: "EN", href: "/en/medence/", isActive: active === "en" },
  { label: "DE", href: "/de/medence/", isActive: active === "de" },
  { label: "CZ", href: "/cs/medence/", isActive: active === "cs" },
  { label: "SK", href: "/sk/medence/", isActive: active === "sk" }
];

export const poolGuideContentByLocale: Record<"hu" | "en" | "de" | "cs" | "sk", PoolGuideContent> = {
  hu: {
    pageTitle: "Panorama Pool - vendéginformációk | Dandelion",
    description:
      "QR-kóddal megnyitható medenceoldal: aktuális vízhőmérséklet, használati segítségek, rövid szabályok és teljes medencehasználati szabályzat.",
    canonicalPath: "/medence/",
    numberLocale: "hu-HU",
    languageSwitchLabel: "Nyelvválasztó",
    languageLinks: buildLanguageLinks("hu"),
    topEyebrow: "",
    photoAlt: "Panorama Pool medence panorámával és napozóterasszal",
    photoTitle: "Panorama Pool",
    lead: "Nézzétek meg gyorsan, mennyire meleg a víz, biztonságos-e az időjárás, és mire figyeljetek fürdés előtt.",
    temperatureCardLabel: "Aktuális hőmérsékletek",
    waterNowLabel: "Víz most",
    airLabel: "Levegő",
    fallbackText: "Hamarosan",
    usageCardLabel: "Használat ma",
    everyDayLabel: "Minden nap",
    hoursValue: "10:00-21:00",
    depthLabel: "Vízmélység",
    depthValue: "125 cm",
    windEyebrow: "Szél",
    windFallbackTitle: "Szél állapot betöltése...",
    windFallbackText: "Röviden jelezzük, ha a szél miatt teendő van a medencénél.",
    stormEyebrow: "Eső / vihar",
    stormFallbackTitle: "Eső / vihar állapot betöltése...",
    stormFallbackText: "Röviden jelezzük, ha a következő órákban eső vagy vihar közeleg.",
    radarEyebrow: "Radar térkép",
    radarTitle: "Tapolca környéki élő csapadékkép",
    forecastTitle: "Mi várható a következő órákban?",
    forecastLoadingText: "Órás előrejelzés betöltése...",
    whatsappAlt: "Kérdésed van? WhatsApp - írj üzenetet nekünk",
    googleAlt: "Tetszett a medence? Írj Google értékelést",
    safetyCardLabel: "Fontos!",
    safetyValue: "Gyerek csak felnőtt felügyeletével",
    safetyMeta: "Viharban mindenki azonnal jöjjön ki a medencéből.",
    summaryEyebrow: "Rövid szabályok",
    summaryTitle: "A legfontosabb szabályok röviden",
    summaryText: "Ha csak fél percetek van, ezt olvassátok el indulás előtt.",
    quickRules: [
      "Nyitvatartás: minden nap 10:00-21:00.",
      "A medence használata saját felelősségre történik, úszómester nincs.",
      "Gyermek csak felnőtt felügyelete mellett lehet a medencénél.",
      "Zuhanyzás használat előtt kötelező.",
      "Ugrálni, fejest ugrani, futni és lökdösődni tilos.",
      "Üveget, ételt és törékeny tárgyat ne vigyetek a medence közelébe.",
      "Vihar, villámlás vagy erős szél esetén a medencét azonnal hagyjátok el.",
      "Utolsó esti használat után a medencefedést vissza kell húzni."
    ],
    helpEyebrow: "Mire figyeljetek",
    helpTitle: "Mit tegyetek fürdés előtt és után?",
    helpText: "Rövid segítség ahhoz, hogy a medencehasználat kényelmes és biztonságos maradjon.",
    helpSteps: [
      {
        title: "Fürdés előtt",
        text: "Nézzétek meg a vízhőmérsékletet, zuhanyozzatok le, és ellenőrizzétek, hogy az időjárás biztonságos-e."
      },
      {
        title: "Fürdés közben",
        text: "Figyeljetek egymásra, gyereket ne hagyjatok felügyelet nélkül, és kerüljétek a csúszós, rohanós mozgást."
      },
      {
        title: "Ha valami gond van",
        text: "Szennyeződés, sérülés, rosszullét vagy hibás medencefedés esetén azonnal szóljatok a szállásadónak."
      },
      {
        title: "Távozás előtt",
        text: "Vigyétek magatokkal a saját holmikatokat, hagyjatok rendet, és utolsó esti használat után húzzátok vissza a fedést."
      }
    ],
    practicalEyebrow: "Jó tudni még",
    practicalTitle: "Pár hasznos tudnivaló a medencénél",
    practicalItems: [
      {
        title: "Ki használhatja?",
        text: "A Panorama Pool a Dandelion D1, Dandelion D2 és Fügeház vendégei számára elérhető a szezonban."
      },
      {
        title: "Biztonság",
        text: "A medence nem ugrómedence. Gyermekekért mindig a velük érkező felnőtt felel."
      },
      {
        title: "Időjárás",
        text: "Villámlás, vihar vagy erős szél esetén a medencét ne használjátok, a napernyőt pedig csukjátok le."
      },
      {
        title: "Medencefedés",
        text: "Ha a fedés akad vagy nem mozog rendesen, ne erőltessétek, hanem szóljatok a szállásadónak."
      }
    ],
    weatherWindWarningTitle: "Erős szél közeleg",
    weatherWindWarningText: "Húzzátok vissza a medence tetejét, és ne használjátok a medencét.",
    weatherWindCautionTitle: "Szelesebb idő jöhet",
    weatherWindCautionText: "Kérlek húzzátok be a napernyőket.",
    weatherWindCalmTitle: "Szél: rendben",
    weatherWindCalmText: "Nincs teendő.",
    weatherStormWarningTitle: "Vihar közeleg",
    weatherStormWarningText: "Hagyjátok el a medencét, és tegyetek mindent biztonságos helyre.",
    weatherStormCautionTitle: "Eső vagy vihar jöhet",
    weatherStormCautionText: "Készítsétek elő a kinti dolgokat, és figyeljétek az időt.",
    weatherStormCalmTitle: "Eső / vihar: nem várható",
    weatherStormCalmText: "Közelben nincs csapadék.",
    weatherWindUnavailableTitle: "Szél adat nincs",
    weatherWindUnavailableText: "Nézzetek rá külön az időjárásra.",
    weatherStormUnavailableTitle: "Eső / vihar adat nincs",
    weatherStormUnavailableText: "Nézzetek rá külön az időjárásra."
  },
  en: {
    pageTitle: "Panorama Pool guide | Dandelion",
    description: "Mobile-friendly pool guide with live temperature, weather alerts, quick rules and pool-use help for Dandelion guests.",
    canonicalPath: "/en/medence/",
    lang: "en",
    ogLocale: "en_US",
    numberLocale: "en-US",
    languageSwitchLabel: "Language selector",
    languageLinks: buildLanguageLinks("en"),
    topEyebrow: "",
    photoAlt: "Panorama Pool with terrace loungers and a view of the surrounding hills",
    photoTitle: "Panorama Pool",
    lead: "Check in a moment how warm the water is, whether the weather is safe, and what to keep in mind before swimming.",
    temperatureCardLabel: "Current temperatures",
    waterNowLabel: "Water now",
    airLabel: "Air",
    fallbackText: "Soon",
    usageCardLabel: "Today at the pool",
    everyDayLabel: "Every day",
    hoursValue: "10:00 AM - 9:00 PM",
    depthLabel: "Water depth",
    depthValue: "125 cm",
    windEyebrow: "Wind",
    windFallbackTitle: "Loading wind status...",
    windFallbackText: "We will show a short message here if the wind requires attention around the pool.",
    stormEyebrow: "Rain / storm",
    stormFallbackTitle: "Loading rain and storm status...",
    stormFallbackText: "We will show a short message here if rain or storm is expected in the next hours.",
    radarEyebrow: "Radar map",
    radarTitle: "Live rain radar around Tapolca",
    forecastTitle: "What is expected in the next hours?",
    forecastLoadingText: "Loading hourly forecast...",
    whatsappAlt: "Have a question? WhatsApp - send us a message",
    googleAlt: "Enjoyed the pool? Leave a Google review",
    safetyCardLabel: "Important",
    safetyValue: "Children only with adult supervision",
    safetyMeta: "If a storm comes, everyone should leave the pool immediately.",
    summaryEyebrow: "Quick rules",
    summaryTitle: "The most important rules at a glance",
    summaryText: "If you only have half a minute, read this part before going to the pool.",
    quickRules: [
      "Opening hours: every day from 10:00 AM to 9:00 PM.",
      "You use the pool at your own risk. There is no lifeguard on site.",
      "Children may stay by the pool only with adult supervision.",
      "Please use the shower before entering the water.",
      "No jumping, diving, running or pushing.",
      "Do not bring glass, food or breakable items close to the pool.",
      "In case of storm, lightning or strong wind, leave the pool immediately.",
      "After the last evening use, pull the pool cover back into place."
    ],
    helpEyebrow: "What to watch for",
    helpTitle: "What should you do before and after swimming?",
    helpText: "A short guide to keep pool time comfortable and safe for everyone.",
    helpSteps: [
      {
        title: "Before swimming",
        text: "Check the water temperature, use the shower and make sure the weather is safe."
      },
      {
        title: "While using the pool",
        text: "Look after each other, never leave children unattended, and move carefully around the slippery pool area."
      },
      {
        title: "If something is wrong",
        text: "If you notice dirt, damage, someone feeling unwell, or a problem with the cover, contact the host immediately."
      },
      {
        title: "Before leaving",
        text: "Take your belongings, leave the area tidy and after the last evening use pull the cover back."
      }
    ],
    practicalEyebrow: "Good to know",
    practicalTitle: "A few useful things to know at the pool",
    practicalItems: [
      {
        title: "Who can use it?",
        text: "Panorama Pool is available in season for guests of Dandelion D1, Dandelion D2 and Fügeház."
      },
      {
        title: "Safety",
        text: "This is not a diving pool. The accompanying adult is always responsible for children."
      },
      {
        title: "Weather",
        text: "During lightning, storm or strong wind do not use the pool, and close the umbrellas."
      },
      {
        title: "Pool cover",
        text: "If the cover gets stuck or does not move properly, do not force it. Please inform the host."
      }
    ],
    weatherWindWarningTitle: "Strong wind approaching",
    weatherWindWarningText: "Pull the pool cover back and do not use the pool.",
    weatherWindCautionTitle: "Windier weather may come",
    weatherWindCautionText: "Please close the umbrellas.",
    weatherWindCalmTitle: "Wind: all good",
    weatherWindCalmText: "No action needed.",
    weatherStormWarningTitle: "Storm approaching",
    weatherStormWarningText: "Leave the pool area and place everything outside in a safe spot.",
    weatherStormCautionTitle: "Rain or storm may arrive",
    weatherStormCautionText: "Prepare outdoor items and keep an eye on the weather.",
    weatherStormCalmTitle: "Rain / storm: not expected",
    weatherStormCalmText: "No nearby precipitation is visible.",
    weatherWindUnavailableTitle: "No wind data",
    weatherWindUnavailableText: "Please check the weather separately.",
    weatherStormUnavailableTitle: "No rain / storm data",
    weatherStormUnavailableText: "Please check the weather separately."
  },
  de: {
    pageTitle: "Panorama Pool Guide | Dandelion",
    description: "Mobil optimierte Pool-Hilfeseite mit Live-Temperatur, Wetterwarnungen, Kurzregeln und Nutzungshinweisen für Dandelion Gäste.",
    canonicalPath: "/de/medence/",
    lang: "de",
    ogLocale: "de_DE",
    numberLocale: "de-DE",
    languageSwitchLabel: "Sprachauswahl",
    languageLinks: buildLanguageLinks("de"),
    topEyebrow: "",
    photoAlt: "Panorama Pool mit Terrasse, Liegen und Blick auf die Zeugenberge",
    photoTitle: "Panorama Pool",
    lead: "Hier seht ihr schnell, wie warm das Wasser ist, ob das Wetter sicher wirkt und worauf ihr vor dem Baden achten solltet.",
    temperatureCardLabel: "Aktuelle Temperaturen",
    waterNowLabel: "Wasser jetzt",
    airLabel: "Luft",
    fallbackText: "Demnächst",
    usageCardLabel: "Heute am Pool",
    everyDayLabel: "Jeden Tag",
    hoursValue: "10:00-21:00",
    depthLabel: "Wassertiefe",
    depthValue: "125 cm",
    windEyebrow: "Wind",
    windFallbackTitle: "Windstatus wird geladen...",
    windFallbackText: "Hier erscheint kurz, ob es wegen des Winds etwas am Pool zu tun gibt.",
    stormEyebrow: "Regen / Sturm",
    stormFallbackTitle: "Regen- und Sturmstatus wird geladen...",
    stormFallbackText: "Hier erscheint kurz, ob in den nächsten Stunden Regen oder Sturm zu erwarten ist.",
    radarEyebrow: "Radar",
    radarTitle: "Live-Regenradar rund um Tapolca",
    forecastTitle: "Was ist in den nächsten Stunden zu erwarten?",
    forecastLoadingText: "Stündliche Vorschau wird geladen...",
    whatsappAlt: "Frage? WhatsApp - schreibt uns eine Nachricht",
    googleAlt: "Hat euch der Pool gefallen? Hinterlasst eine Google Bewertung",
    safetyCardLabel: "Wichtig",
    safetyValue: "Kinder nur mit Aufsicht eines Erwachsenen",
    safetyMeta: "Bei Sturm sollen sofort alle aus dem Pool kommen.",
    summaryEyebrow: "Kurze Regeln",
    summaryTitle: "Die wichtigsten Regeln auf einen Blick",
    summaryText: "Wenn ihr nur kurz Zeit habt, lest vor dem Baden wenigstens diesen Teil.",
    quickRules: [
      "Öffnungszeiten: täglich von 10:00 bis 21:00 Uhr.",
      "Die Nutzung des Pools erfolgt auf eigene Verantwortung. Es gibt keinen Bademeister.",
      "Kinder dürfen sich nur unter Aufsicht von Erwachsenen am Pool aufhalten.",
      "Bitte vor der Nutzung duschen.",
      "Springen, Kopfsprünge, Rennen und Schubsen sind verboten.",
      "Bitte kein Glas, Essen oder zerbrechliche Gegenstände in Poolnähe mitbringen.",
      "Bei Sturm, Blitz oder starkem Wind den Pool sofort verlassen.",
      "Nach der letzten Nutzung am Abend die Poolabdeckung wieder zurückziehen."
    ],
    helpEyebrow: "Worauf achten",
    helpTitle: "Was solltet ihr vor und nach dem Baden tun?",
    helpText: "Kurze Hinweise, damit die Poolnutzung angenehm und sicher bleibt.",
    helpSteps: [
      {
        title: "Vor dem Baden",
        text: "Wassertemperatur prüfen, duschen und kontrollieren, ob das Wetter sicher ist."
      },
      {
        title: "Während der Nutzung",
        text: "Aufeinander achten, Kinder nie unbeaufsichtigt lassen und hektische Bewegungen auf rutschigem Boden vermeiden."
      },
      {
        title: "Wenn etwas nicht stimmt",
        text: "Bei Schmutz, Schäden, Unwohlsein oder Problemen mit der Abdeckung sofort den Gastgeber informieren."
      },
      {
        title: "Vor dem Gehen",
        text: "Eigene Sachen mitnehmen, Ordnung hinterlassen und nach der letzten Nutzung am Abend die Abdeckung zurückziehen."
      }
    ],
    practicalEyebrow: "Gut zu wissen",
    practicalTitle: "Ein paar nützliche Infos zum Pool",
    practicalItems: [
      {
        title: "Wer darf ihn nutzen?",
        text: "Der Panorama Pool steht in der Saison Gästen von Dandelion D1, Dandelion D2 und Fügeház zur Verfügung."
      },
      {
        title: "Sicherheit",
        text: "Der Pool ist kein Sprungbecken. Für Kinder ist immer die begleitende erwachsene Person verantwortlich."
      },
      {
        title: "Wetter",
        text: "Bei Blitz, Sturm oder starkem Wind den Pool nicht benutzen und die Sonnenschirme schließen."
      },
      {
        title: "Poolabdeckung",
        text: "Wenn die Abdeckung klemmt oder sich nicht richtig bewegt, bitte nicht mit Gewalt drücken, sondern den Gastgeber informieren."
      }
    ],
    weatherWindWarningTitle: "Starker Wind kommt",
    weatherWindWarningText: "Zieht die Poolabdeckung zurück und benutzt den Pool nicht.",
    weatherWindCautionTitle: "Windigeres Wetter möglich",
    weatherWindCautionText: "Bitte die Sonnenschirme schließen.",
    weatherWindCalmTitle: "Wind: in Ordnung",
    weatherWindCalmText: "Keine Aktion nötig.",
    weatherStormWarningTitle: "Sturm nähert sich",
    weatherStormWarningText: "Verlasst den Poolbereich und bringt alles draußen an einen sicheren Ort.",
    weatherStormCautionTitle: "Regen oder Sturm möglich",
    weatherStormCautionText: "Bereitet die Dinge draußen vor und beobachtet das Wetter.",
    weatherStormCalmTitle: "Regen / Sturm: nicht zu erwarten",
    weatherStormCalmText: "In der Nähe ist kein Niederschlag erkennbar.",
    weatherWindUnavailableTitle: "Keine Winddaten",
    weatherWindUnavailableText: "Bitte das Wetter gesondert prüfen.",
    weatherStormUnavailableTitle: "Keine Regen- / Sturmdaten",
    weatherStormUnavailableText: "Bitte das Wetter gesondert prüfen."
  },
  cs: {
    pageTitle: "Panorama Pool průvodce | Dandelion",
    description: "Mobilní stránka s pomocí k bazénu: živá teplota, upozornění na počasí, krátká pravidla a praktické rady pro hosty Dandelion.",
    canonicalPath: "/cs/medence/",
    lang: "cs",
    ogLocale: "cs_CZ",
    numberLocale: "cs-CZ",
    languageSwitchLabel: "Volba jazyka",
    languageLinks: buildLanguageLinks("cs"),
    topEyebrow: "",
    photoAlt: "Panorama Pool s lehátky, terasou a výhledem na svědecké hory",
    photoTitle: "Panorama Pool",
    lead: "Rychle zde uvidíte, jak teplá je voda, jestli je počasí bezpečné a na co myslet před koupáním.",
    temperatureCardLabel: "Aktuální teploty",
    waterNowLabel: "Voda nyní",
    airLabel: "Vzduch",
    fallbackText: "Brzy",
    usageCardLabel: "Dnes u bazénu",
    everyDayLabel: "Každý den",
    hoursValue: "10:00-21:00",
    depthLabel: "Hloubka vody",
    depthValue: "125 cm",
    windEyebrow: "Vítr",
    windFallbackTitle: "Načítá se stav větru...",
    windFallbackText: "Zde se krátce ukáže, zda je kvůli větru potřeba něco udělat u bazénu.",
    stormEyebrow: "Déšť / bouřka",
    stormFallbackTitle: "Načítá se stav deště a bouřky...",
    stormFallbackText: "Zde se krátce ukáže, zda se v příštích hodinách čeká déšť nebo bouřka.",
    radarEyebrow: "Radar mapa",
    radarTitle: "Živý radar srážek v okolí Tapolcy",
    forecastTitle: "Co se čeká v příštích hodinách?",
    forecastLoadingText: "Načítá se hodinová předpověď...",
    whatsappAlt: "Máte otázku? WhatsApp - napište nám zprávu",
    googleAlt: "Líbil se vám bazén? Napište Google hodnocení",
    safetyCardLabel: "Důležité",
    safetyValue: "Děti jen pod dohledem dospělého",
    safetyMeta: "Při bouřce musí všichni ihned opustit bazén.",
    summaryEyebrow: "Krátká pravidla",
    summaryTitle: "Nejdůležitější pravidla na první pohled",
    summaryText: "Pokud máte jen půl minuty, přečtěte si před odchodem k bazénu aspoň tuto část.",
    quickRules: [
      "Otevírací doba: každý den od 10:00 do 21:00.",
      "Bazén používáte na vlastní odpovědnost. Není zde plavčík.",
      "Děti mohou být u bazénu jen pod dohledem dospělých.",
      "Před vstupem do vody se prosím osprchujte.",
      "Skákání, střemhlavé skoky, běhání a strkání jsou zakázány.",
      "Nenoste k bazénu sklo, jídlo ani křehké předměty.",
      "Při bouřce, blescích nebo silném větru bazén ihned opusťte.",
      "Po posledním večerním použití znovu zavřete zastřešení bazénu."
    ],
    helpEyebrow: "Na co si dát pozor",
    helpTitle: "Co udělat před koupáním a po něm?",
    helpText: "Krátká pomoc, aby používání bazénu zůstalo pohodlné a bezpečné.",
    helpSteps: [
      {
        title: "Před koupáním",
        text: "Podívejte se na teplotu vody, osprchujte se a zkontrolujte, zda je počasí bezpečné."
      },
      {
        title: "Během koupání",
        text: "Dávejte na sebe pozor, nenechávejte děti bez dozoru a vyhněte se spěchu na kluzkém povrchu."
      },
      {
        title: "Když je problém",
        text: "Při znečištění, poškození, nevolnosti nebo problému se zastřešením ihned kontaktujte hostitele."
      },
      {
        title: "Před odchodem",
        text: "Vezměte si své věci, zanechte pořádek a po posledním večerním použití vraťte zastřešení zpět."
      }
    ],
    practicalEyebrow: "Dobré vědět",
    practicalTitle: "Ještě pár užitečných informací k bazénu",
    practicalItems: [
      {
        title: "Kdo ho může používat?",
        text: "Panorama Pool je v sezoně k dispozici hostům Dandelion D1, Dandelion D2 a Fügeház."
      },
      {
        title: "Bezpečnost",
        text: "Bazén není skokanský. Za děti je vždy odpovědný dospělý, který s nimi přijel."
      },
      {
        title: "Počasí",
        text: "Při blescích, bouřce nebo silném větru bazén nepoužívejte a zavřete slunečníky."
      },
      {
        title: "Zastřešení bazénu",
        text: "Pokud se zastřešení zasekne nebo nejde správně, netlačte na něj silou a dejte vědět hostiteli."
      }
    ],
    weatherWindWarningTitle: "Blíží se silný vítr",
    weatherWindWarningText: "Zatáhněte zastřešení bazénu a bazén nepoužívejte.",
    weatherWindCautionTitle: "Může přijít silnější vítr",
    weatherWindCautionText: "Prosím zavřete slunečníky.",
    weatherWindCalmTitle: "Vítr: v pořádku",
    weatherWindCalmText: "Není potřeba nic dělat.",
    weatherStormWarningTitle: "Blíží se bouřka",
    weatherStormWarningText: "Opusťte prostor bazénu a uložte venkovní věci na bezpečné místo.",
    weatherStormCautionTitle: "Může přijít déšť nebo bouřka",
    weatherStormCautionText: "Připravte venkovní věci a sledujte počasí.",
    weatherStormCalmTitle: "Déšť / bouřka: neočekává se",
    weatherStormCalmText: "V okolí není vidět žádné srážky.",
    weatherWindUnavailableTitle: "Data o větru nejsou k dispozici",
    weatherWindUnavailableText: "Zkontrolujte prosím počasí zvlášť.",
    weatherStormUnavailableTitle: "Data o dešti / bouřce nejsou k dispozici",
    weatherStormUnavailableText: "Zkontrolujte prosím počasí zvlášť."
  },
  sk: {
    pageTitle: "Panorama Pool sprievodca | Dandelion",
    description: "Mobilná stránka s pomocou k bazénu: živá teplota, upozornenia na počasie, krátke pravidlá a praktické rady pre hostí Dandelion.",
    canonicalPath: "/sk/medence/",
    lang: "sk",
    ogLocale: "sk_SK",
    numberLocale: "sk-SK",
    languageSwitchLabel: "Výber jazyka",
    languageLinks: buildLanguageLinks("sk"),
    topEyebrow: "",
    photoAlt: "Panorama Pool s terasou, ležadlami a výhľadom na svedecké vrchy",
    photoTitle: "Panorama Pool",
    lead: "Rýchlo si tu pozriete, aká teplá je voda, či je počasie bezpečné a na čo myslieť pred kúpaním.",
    temperatureCardLabel: "Aktuálne teploty",
    waterNowLabel: "Voda teraz",
    airLabel: "Vzduch",
    fallbackText: "Čoskoro",
    usageCardLabel: "Dnes pri bazéne",
    everyDayLabel: "Každý deň",
    hoursValue: "10:00-21:00",
    depthLabel: "Hĺbka vody",
    depthValue: "125 cm",
    windEyebrow: "Vietor",
    windFallbackTitle: "Načítava sa stav vetra...",
    windFallbackText: "Tu sa krátko zobrazí, či je kvôli vetru potrebné niečo urobiť pri bazéne.",
    stormEyebrow: "Dážď / búrka",
    stormFallbackTitle: "Načítava sa stav dažďa a búrky...",
    stormFallbackText: "Tu sa krátko zobrazí, či sa v najbližších hodinách očakáva dážď alebo búrka.",
    radarEyebrow: "Radar mapa",
    radarTitle: "Živý zrážkový radar v okolí Tapolcy",
    forecastTitle: "Čo sa čaká v najbližších hodinách?",
    forecastLoadingText: "Načítava sa hodinová predpoveď...",
    whatsappAlt: "Máte otázku? WhatsApp - napíšte nám správu",
    googleAlt: "Páčil sa vám bazén? Napíšte Google hodnotenie",
    safetyCardLabel: "Dôležité",
    safetyValue: "Deti len pod dohľadom dospelej osoby",
    safetyMeta: "Pri búrke musia všetci okamžite vyjsť z bazéna.",
    summaryEyebrow: "Krátke pravidlá",
    summaryTitle: "Najdôležitejšie pravidlá na prvý pohľad",
    summaryText: "Ak máte len pol minúty, pred odchodom k bazénu si prečítajte aspoň túto časť.",
    quickRules: [
      "Otváracie hodiny: každý deň od 10:00 do 21:00.",
      "Bazén používate na vlastnú zodpovednosť. Nie je tu plavčík.",
      "Deti môžu byť pri bazéne len pod dohľadom dospelých.",
      "Pred vstupom do vody sa prosím osprchujte.",
      "Skákanie, skoky do vody, behanie a strkanie sú zakázané.",
      "Nenoste k bazénu sklo, jedlo ani krehké predmety.",
      "Pri búrke, bleskoch alebo silnom vetre bazén ihneď opustite.",
      "Po poslednom večernom použití znovu zatiahnite zastrešenie bazéna."
    ],
    helpEyebrow: "Na čo si dať pozor",
    helpTitle: "Čo urobiť pred kúpaním a po ňom?",
    helpText: "Krátka pomoc, aby používanie bazéna zostalo pohodlné a bezpečné.",
    helpSteps: [
      {
        title: "Pred kúpaním",
        text: "Pozrite si teplotu vody, osprchujte sa a skontrolujte, či je počasie bezpečné."
      },
      {
        title: "Počas kúpania",
        text: "Dávajte si na seba pozor, nenechávajte deti bez dozoru a vyhnite sa rýchlemu pohybu na šmykľavom povrchu."
      },
      {
        title: "Keď je problém",
        text: "Pri znečistení, poškodení, nevoľnosti alebo probléme so zastrešením ihneď kontaktujte hostiteľa."
      },
      {
        title: "Pred odchodom",
        text: "Vezmite si svoje veci, zanechajte poriadok a po poslednom večernom použití zatiahnite zastrešenie späť."
      }
    ],
    practicalEyebrow: "Dobré vedieť",
    practicalTitle: "Ešte pár užitočných informácií k bazénu",
    practicalItems: [
      {
        title: "Kto ho môže používať?",
        text: "Panorama Pool je v sezóne k dispozícii hosťom Dandelion D1, Dandelion D2 a Fügeház."
      },
      {
        title: "Bezpečnosť",
        text: "Bazén nie je skokanský. Za deti vždy zodpovedá dospelá osoba, ktorá s nimi prišla."
      },
      {
        title: "Počasie",
        text: "Pri bleskoch, búrke alebo silnom vetre bazén nepoužívajte a zatvorte slnečníky."
      },
      {
        title: "Zastrešenie bazéna",
        text: "Ak sa zastrešenie zasekne alebo sa nehýbe správne, netlačte naň silou a dajte vedieť hostiteľovi."
      }
    ],
    weatherWindWarningTitle: "Blíži sa silný vietor",
    weatherWindWarningText: "Zatiahnite zastrešenie bazéna a bazén nepoužívajte.",
    weatherWindCautionTitle: "Môže prísť silnejší vietor",
    weatherWindCautionText: "Prosím zatvorte slnečníky.",
    weatherWindCalmTitle: "Vietor: v poriadku",
    weatherWindCalmText: "Nie je potrebné nič robiť.",
    weatherStormWarningTitle: "Blíži sa búrka",
    weatherStormWarningText: "Opustite priestor bazéna a uložte veci vonku na bezpečné miesto.",
    weatherStormCautionTitle: "Môže prísť dážď alebo búrka",
    weatherStormCautionText: "Pripravte vonkajšie veci a sledujte počasie.",
    weatherStormCalmTitle: "Dážď / búrka: neočakáva sa",
    weatherStormCalmText: "V okolí nie sú viditeľné žiadne zrážky.",
    weatherWindUnavailableTitle: "Údaje o vetre nie sú k dispozícii",
    weatherWindUnavailableText: "Skontrolujte si prosím počasie zvlášť.",
    weatherStormUnavailableTitle: "Údaje o daždi / búrke nie sú k dispozícii",
    weatherStormUnavailableText: "Skontrolujte si prosím počasie zvlášť."
  }
};

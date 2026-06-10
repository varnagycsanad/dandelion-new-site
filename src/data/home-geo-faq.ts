// [CHANGE 2026-06-06 00:00] Homepage GEO FAQ copy and FAQPage schema source added for all public languages.
import { toAbsoluteUrl } from "./site-seo";

export type HomeGeoFaqLang = "hu" | "en" | "de" | "cs" | "sk";

export interface HomeGeoFaqItem {
  question: string;
  answer: string;
  href: string;
}

interface HomeGeoFaqCopy {
  path: string;
  inLanguage: string;
  kicker: string;
  title: string;
  lead: string;
  ctaLabel: string;
  items: HomeGeoFaqItem[];
}

export const homeGeoFaqByLang: Record<HomeGeoFaqLang, HomeGeoFaqCopy> = {
  hu: {
    path: "/",
    inLanguage: "hu-HU",
    kicker: "Gyors válaszok",
    title: "Gyakori kérdések a Dandelion pihenéshez",
    lead: "Rövid válaszok, ha még csak azt keresitek, melyik környék vagy ház illik a pihenésetekhez.",
    ctaLabel: "Szállások megnézése",
    items: [
      {
        question: "Melyik környéken vannak a Dandelion házak?",
        answer:
          "Kisapáti és a Szent György-hegy környéke, a Balatonhoz közeli Keszthely és Badacsonyörs, valamint a csendesebb Káli-medence a fő helyszínek.",
        href: "/szallasok/"
      },
      {
        question: "Hol érdemes megszállni Kisapátiban?",
        answer:
          "Kisapátiban a D1, D2, Zsálya és Szőlőliget jó választás. Ezek a házak a Szent György-hegy és a Tapolcai-medence programjaihoz kényelmesek.",
        href: "/szallasok/#tanuhegyek"
      },
      {
        question: "Van Dandelion szállás a Balaton közelében?",
        answer:
          "Igen. A Royal Homes Keszthely és a Szépvölgyi Badacsonyörs jó kiindulópont, ha a Balaton közelsége fontos.",
        href: "/szallasok/#balaton-mellett"
      },
      {
        question: "Melyik ház jó családoknak?",
        answer:
          "Családoknak főleg a D2, a Szőlőliget, a Zsálya és a medencés Panorama Pool környéki pihenés lehet kényelmes választás.",
        href: "/szallasok/"
      },
      {
        question: "Hova menjünk, ha csendesebb pihenést szeretnénk?",
        answer:
          "A Káli-medence, Köveskál és több kisapáti ház is jó, ha nyugodtabb, természetközeli pihenést kerestek.",
        href: "/szallasok/#kali-medence"
      },
      {
        question: "Milyen programok vannak a házak közelében?",
        answer:
          "Bringázás, borászatok, balatoni strandok és tanúhegyes túrák vannak közel. A választásnál érdemes a fő programhoz igazítani a szállást.",
        href: "/elmenyek/"
      }
    ]
  },
  en: {
    path: "/en/",
    inLanguage: "en-US",
    kicker: "Quick answers",
    title: "Common questions before choosing a Dandelion stay",
    lead: "Short answers if you are still deciding which area or house fits your trip best.",
    ctaLabel: "View accommodations",
    items: [
      {
        question: "Where are the Dandelion houses located?",
        answer:
          "The main areas are Kisapáti and Szent György Hill, stays near Lake Balaton in Keszthely and Badacsonyörs, and the quieter Káli Basin.",
        href: "/en/szallasok/"
      },
      {
        question: "Where should I stay in Kisapáti?",
        answer:
          "D1, D2, Zsálya and Szőlőliget are the main Kisapáti choices. They work well for Szent György Hill and Tapolca Basin programmes.",
        href: "/en/szallasok/#balaton-uplands"
      },
      {
        question: "Is there a Dandelion stay near Lake Balaton?",
        answer:
          "Yes. Royal Homes Keszthely and Szépvölgyi in Badacsonyörs are good bases when staying close to Lake Balaton matters.",
        href: "/en/szallasok/#near-lake-balaton"
      },
      {
        question: "Which house is good for families?",
        answer:
          "Families often choose D2, Szőlőliget, Zsálya or a stay connected to the Panorama Pool mood, depending on group size and plans.",
        href: "/en/szallasok/"
      },
      {
        question: "Where should we stay for a quieter trip?",
        answer:
          "The Káli Basin, Köveskál and several Kisapáti houses are good options if you want a calmer countryside stay.",
        href: "/en/szallasok/#kali-medence"
      },
      {
        question: "What can we do near the houses?",
        answer:
          "Cycling, wineries, Lake Balaton beaches and witness hill walks are nearby. It helps to choose the stay around your main plan.",
        href: "/en/experiences/"
      }
    ]
  },
  de: {
    path: "/de/",
    inLanguage: "de-DE",
    kicker: "Schnelle Antworten",
    title: "Häufige Fragen vor der Wahl einer Dandelion Unterkunft",
    lead: "Kurze Antworten, wenn Sie noch entscheiden, welche Region oder welches Haus zu Ihrer Reise passt.",
    ctaLabel: "Unterkünfte ansehen",
    items: [
      {
        question: "Wo liegen die Dandelion Häuser?",
        answer:
          "Die wichtigsten Regionen sind Kisapáti und Szent György-hegy, Unterkünfte nahe dem Balaton in Keszthely und Badacsonyörs sowie das ruhigere Káli-Becken.",
        href: "/de/unterkuenfte/"
      },
      {
        question: "Wo sollte man in Kisapáti übernachten?",
        answer:
          "D1, D2, Zsálya und Szőlőliget sind die wichtigsten Häuser in Kisapáti. Sie passen gut zu Programmen am Szent György-hegy und im Tapolca-Becken.",
        href: "/de/unterkuenfte/#zeugenberge"
      },
      {
        question: "Gibt es eine Dandelion Unterkunft nahe dem Balaton?",
        answer:
          "Ja. Royal Homes Keszthely und Szépvölgyi in Badacsonyörs sind gute Ausgangspunkte, wenn die Nähe zum Balaton wichtig ist.",
        href: "/de/unterkuenfte/#balaton-naehe"
      },
      {
        question: "Welches Haus passt für Familien?",
        answer:
          "Familien wählen oft D2, Szőlőliget, Zsálya oder einen Aufenthalt mit Panorama Pool Stimmung, je nach Gruppengröße und Plänen.",
        href: "/de/unterkuenfte/"
      },
      {
        question: "Wo ist es ruhiger?",
        answer:
          "Das Káli-Becken, Köveskál und mehrere Häuser in Kisapáti passen gut, wenn Sie einen ruhigeren Aufenthalt in der Natur suchen.",
        href: "/de/unterkuenfte/#kali-becken"
      },
      {
        question: "Was kann man in der Nähe unternehmen?",
        answer:
          "Radfahren, Weingüter, Balaton-Strände und Spaziergänge an den Zeugenbergen liegen nahe. Die Unterkunft sollte zum Hauptprogramm passen.",
        href: "/de/erlebnisse/"
      }
    ]
  },
  cs: {
    path: "/cs/",
    inLanguage: "cs-CZ",
    kicker: "Rychlé odpovědi",
    title: "Časté otázky před výběrem ubytování Dandelion",
    lead: "Krátké odpovědi, pokud teprve vybíráte oblast nebo dům pro svůj pobyt.",
    ctaLabel: "Zobrazit ubytování",
    items: [
      {
        question: "Kde se nacházejí domy Dandelion?",
        answer:
          "Hlavní oblasti jsou Kisapáti a Szent György-hegy, ubytování blízko Balatonu v Keszthelyi a Badacsonyörsu a klidnější oblast Káli.",
        href: "/cs/ubytovani/"
      },
      {
        question: "Kde se ubytovat v Kisapáti?",
        answer:
          "D1, D2, Zsálya a Szőlőliget jsou hlavní možnosti v Kisapáti. Hodí se k programům u Szent György-hegy a v Tapolcai pánvi.",
        href: "/cs/ubytovani/#balaton-uplands"
      },
      {
        question: "Je ubytování Dandelion blízko Balatonu?",
        answer:
          "Ano. Royal Homes Keszthely a Szépvölgyi v Badacsonyörsu jsou dobré volby, pokud je pro vás důležitá blízkost Balatonu.",
        href: "/cs/ubytovani/#near-lake-balaton"
      },
      {
        question: "Který dům je vhodný pro rodiny?",
        answer:
          "Rodiny často volí D2, Szőlőliget, Zsálya nebo pobyt spojený s atmosférou Panorama Pool, podle velikosti skupiny a plánů.",
        href: "/cs/ubytovani/"
      },
      {
        question: "Kde je klidnější pobyt?",
        answer:
          "Oblast Káli, Köveskál a několik domů v Kisapáti se hodí, pokud hledáte klidnější pobyt v přírodě.",
        href: "/cs/ubytovani/#kali-medence"
      },
      {
        question: "Co se dá dělat poblíž domů?",
        answer:
          "Blízko jsou cyklistika, vinařství, pláže u Balatonu a výlety na svědecké hory. Ubytování je dobré vybírat podle hlavního programu.",
        href: "/cs/zazitky/"
      }
    ]
  },
  sk: {
    path: "/sk/",
    inLanguage: "sk-SK",
    kicker: "Rýchle odpovede",
    title: "Časté otázky pred výberom ubytovania Dandelion",
    lead: "Krátke odpovede, ak si ešte vyberáte oblasť alebo dom pre svoj pobyt.",
    ctaLabel: "Zobraziť ubytovanie",
    items: [
      {
        question: "Kde sa nachádzajú domy Dandelion?",
        answer:
          "Hlavné oblasti sú Kisapáti a Szent György-hegy, ubytovanie blízko Balatonu v Keszthelyi a Badacsonyörsi a pokojnejšia oblasť Káli.",
        href: "/sk/ubytovanie/"
      },
      {
        question: "Kde sa ubytovať v Kisapáti?",
        answer:
          "D1, D2, Zsálya a Szőlőliget sú hlavné možnosti v Kisapáti. Hodia sa k programom pri Szent György-hegy a v Tapolcai-medence.",
        href: "/sk/ubytovanie/#balaton-uplands"
      },
      {
        question: "Je ubytovanie Dandelion blízko Balatonu?",
        answer:
          "Áno. Royal Homes Keszthely a Szépvölgyi v Badacsonyörsi sú dobré voľby, ak je pre vás dôležitá blízkosť Balatonu.",
        href: "/sk/ubytovanie/#near-lake-balaton"
      },
      {
        question: "Ktorý dom je vhodný pre rodiny?",
        answer:
          "Rodiny často volia D2, Szőlőliget, Zsálya alebo pobyt spojený s atmosférou Panorama Pool, podľa veľkosti skupiny a plánov.",
        href: "/sk/ubytovanie/"
      },
      {
        question: "Kde je pokojnejší pobyt?",
        answer:
          "Oblasť Káli, Köveskál a viacero domov v Kisapáti sa hodí, ak hľadáte pokojnejší pobyt v prírode.",
        href: "/sk/ubytovanie/#kali-medence"
      },
      {
        question: "Čo sa dá robiť v okolí domov?",
        answer:
          "Blízko sú cyklistika, vinárstva, pláže pri Balatone a výlety na svedecké vrchy. Ubytovanie je dobré vyberať podľa hlavného programu.",
        href: "/sk/zazitky/"
      }
    ]
  }
};

export function buildHomeGeoFaqStructuredData(lang: HomeGeoFaqLang) {
  const copy = homeGeoFaqByLang[lang];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${toAbsoluteUrl(copy.path)}#homepage-faq`,
    inLanguage: copy.inLanguage,
    mainEntity: copy.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

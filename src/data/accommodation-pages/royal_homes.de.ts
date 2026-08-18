import { createGermanAccommodationPage } from "./german-page-factory";
import { royalHomesEnglishPageData } from "./royal_homes.en";

// [CHANGE 2026-06-15 00:00] Royal Homes német fő tartalom magyar jacuzzi- és mólóállításaihoz igazítva.
const royalHomesGermanBaseData = createGermanAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/de/royal/",
  listingAnchor: "royal-homes",
  location: "Keszthely",
  region: "Balaton - Keszthely",
  guests: "4-6 Gäste",
  character: "Apartment in Keszthely nahe am Balaton mit Dachterrassen-Jacuzzi",
  shortDescription: "Apartment in Keszthely für 4-6 Gäste, mit großer Terrasse, Ufersteg der Anlage und gemeinsamem Dachterrassen-Jacuzzi.",
  lead:
    "Dandelion Royal Homes ist die Balaton-Apartment-Option in Keszthely: nah am Wasser, praktisch für Stadtprogramme und klar kein freistehendes Gästehaus.",
  longDescription: [
    "Das Apartment eignet sich für Gäste, die den Balaton und Keszthely bequem erreichen möchten, ohne auf eine ruhige, hochwertige Unterkunft zu verzichten.",
    "Die Wohnanlage hat einen eigenen Ufersteg, eine Sonnenterrasse und einen gemeinsamen Jacuzzi auf der Dachterrasse. Diese Elemente geben dem Aufenthalt seinen balatonnahen Premium-Charakter.",
    "Es ist passend für Paare, Familien oder Freunde, die tagsüber viel unterwegs sind und abends einen komfortablen Rückzugsort suchen.",
    "Royal Homes ist besonders praktisch, wenn Wassernähe, Restaurants, Kultur und Balaton-Programme wichtiger sind als Dorf- oder Weinberglage."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Typ", "Apartment"],
    ["Lage", "Keszthely"],
    ["Umgebung", "Balaton und Stadtprogramme"],
    ["Außenbereich", "große Terrasse, breiter Balkon"],
    ["Dachterrasse", "gemeinsamer Jacuzzi"]
  ],
  experienceFacts: [
    ["Balaton", "nah am Wasser"],
    ["Keszthely", "Restaurants, Schloss und Programme"],
    ["Komfort", "Dachterrassen-Jacuzzi und Ufersteg"],
    ["Ausflüge", "West-Balaton und Umgebung"]
  ],
  highlights: ["Balaton-nahe Lage", "Ufersteg der Anlage", "Dachterrassen-Jacuzzi", "Große Terrasse", "Klimaanlage", "Küche"],
  reasons: [
    { iconKey: "balaton", title: "Wassernähe", text: "praktisch für Balaton-Tage" },
    { iconKey: "route", title: "Keszthely", text: "Stadt und Programme nah" },
    { iconKey: "spark", title: "Dachterrassen-Jacuzzi", text: "gemeinsames Premium-Element" },
    { iconKey: "users", title: "Flexibel", text: "für 4-6 Gäste" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Große Terrasse", "Ufersteg der Anlage", "Dachterrassen-Jacuzzi", "Parken"],
  geoDecision: {
    kicker: "Royal Homes schnelle Antworten",
    title: "Dandelion Royal Homes ist ein Apartment in Keszthely nahe am Balaton, kein freistehendes Gästehaus",
    lead:
      "Royal Homes ist ein Apartment mit 2 Schlafzimmern und Wohnzimmer in einer balatonnahen Wohnanlage in Keszthely, mit großer Terrasse, eigenem Ufersteg der Anlage und gemeinsamem Dachterrassen-Jacuzzi. Es passt gut, wenn Wassernähe, Promenade und Stadtkomfort wichtig sind.",
    questions: [
      {
        question: "Apartment oder Gästehaus?",
        answer:
          "Royal Homes ist ein Apartment und kein freistehendes Gästehaus. Es liegt in einer modernen Wohnanlage in Keszthely und passt daher gut zu Gästen, die einen praktischen Balaton-Stadt-Ausgangspunkt suchen."
      },
      {
        question: "Balaton-nahe Unterkunft in Keszthely?",
        answer:
          "Ja. Royal Homes liegt in einer balatonnahen Wohnanlage in Keszthely. Promenade, Hafen und Radweg sind gut erreichbar, außerdem gehören ein eigener Ufersteg und eine Sonnenterrasse zur Anlage."
      },
      {
        question: "Gibt es eine Unterkunft mit Jacuzzi in Keszthely?",
        answer:
          "Ja. Royal Homes bietet Zugang zu einem gemeinsamen Jacuzzi auf der Dachterrasse der Wohnanlage. Es ist kein privater Jacuzzi im Apartment, sondern ein gemeinsames Premium-Komfortelement."
      },
      {
        question: "Eher für Paare oder für Familien?",
        answer:
          "Beides ist möglich. Paare schätzen die moderne Atmosphäre und die Nähe zum Wasser, Familien profitieren vom Grundriss mit 2 Schlafzimmern plus Wohnzimmer und der Belegung für 4-6 Gäste."
      },
      {
        question: "Wie lange braucht man bis zum Ufer?",
        answer:
          "Das Balaton-Gefühl beginnt fast sofort: Die Anlage hat einen eigenen Ufersteg, und Promenade sowie Hafen sind in einem kurzen Fußweg erreichbar."
      },
      {
        question: "Warum dieses Apartment statt einer anderen Dandelion Unterkunft?",
        answer:
          "Royal Homes ist die bessere Wahl, wenn Balaton-Nähe, Restaurants und Stadtprogramme wichtiger sind als ein freistehendes Gästehaus, ein größerer Garten oder ruhige Weinberglage."
      }
    ],
    amenitiesTitle: "Wichtig bei Royal Homes"
  },
  mapBody:
    "Royal Homes liegt in Keszthely, gut für Balaton-Ufer, Schlosspark, Restaurants und Ausflüge am West-Balaton.",
  mapBenefits: [
    { label: "Balaton in der Nähe", icon: "balaton" },
    { label: "Keszthely Programme", icon: "route" },
    { label: "West-Balaton Ausflüge", icon: "trail" }
  ],
  relatedSlot: "royal_homes_card_image"
});

export const royalHomesGermanPageData = {
  ...royalHomesGermanBaseData,
  seo: {
    title: "Royal Homes Keszthely | Apartment am Balaton",
    description:
      "Modernes Apartment in Keszthely am Balaton für 4-6 Gäste, mit großer Terrasse, Ufersteg der Anlage und gemeinsamem Dachterrassen-Jacuzzi."
  },
  hero: {
    ...royalHomesGermanBaseData.hero,
    kicker: "Keszthely · Apartment nahe am Balaton",
    subtitle: "APARTMENT IN KESZTHELY NAHE AM BALATON",
    lead:
      "Royal Homes ist ein modernes Apartment mit 2 Schlafzimmern in Keszthely, kein freistehendes Gästehaus. Es passt zu Gästen, die nahe am Balaton wohnen und gleichzeitig Stadtkomfort nutzen möchten."
  },
  intro: {
    kicker: "Apartment, nicht Gästehaus · Balaton-Nähe · Keszthely als Basis",
    title: "Ein Keszthely-Apartment für Gäste, die Balaton und Stadt zusammen wollen",
    lead:
      "Dandelion Royal Homes ist ideal, wenn Sie ein modernes Apartment in Keszthely statt eines separaten Gästehauses suchen, mit schnellem Zugang zu Ufer, Hafen und Stadtprogrammen."
  },
  details: {
    ...royalHomesGermanBaseData.details,
    title: "Apartment in Keszthely nahe am Balaton, mit Terrasse, Ufersteg und gemeinsamem Jacuzzi",
    shortDescription:
      "Apartment für 4-6 Gäste in Keszthely, mit großer Terrasse, Ufersteg der Anlage und gemeinsamem Dachterrassen-Jacuzzi.",
    highlights: [
      "Apartment, nicht freistehendes Gästehaus: moderner Aufenthalt in einer Wohnanlage in Keszthely.",
      "Balaton-nah: Promenade, Hafen und Radweg sind gut erreichbar, die Anlage hat einen eigenen Ufersteg.",
      "Gut für Paare und Familien: 2 Schlafzimmer plus Wohnzimmer für bis zu 6 Gäste.",
      "Besonders passend, wenn Wassernähe und Stadtkomfort wichtiger sind als ein separates Landhaus."
    ]
  },
  decisionPanel: {
    ...royalHomesGermanBaseData.decisionPanel,
    featuredExperience: {
      label: "Warum Keszthely wählen?",
      title: "Keszthely ist stark, wenn Sie Balaton und Stadtkomfort in einer Reise möchten",
      text:
        "Strandtage, Promenade, Hafen, Restaurants und Stadtprogramme gehören hier leicht zum selben Aufenthalt, ohne dass Sie zwischen Uferstimmung und praktischer Stadtlage wählen müssen.",
      note: "Royal Homes übersetzt diesen Keszthely-Vorteil in einen modernen Apartment-Aufenthalt.",
      iconKey: "balaton",
      imageKey: "hero-desktop"
    },
    experienceCta: {
      eyebrow: "Royal Homes oder eine andere Dandelion Unterkunft?",
      title: "Royal Homes ist die Balaton-Apartment-Option",
      text:
        "Wählen Sie dieses Apartment, wenn Sie in Keszthely nahe am See bleiben möchten. Eine andere Dandelion Unterkunft passt besser, wenn Sie ein freistehendes Gästehaus, mehr Garten oder ruhigere Weinberglage suchen.",
      href: "/de/unterkuenfte/",
      ctaLabel: "Dandelion Unterkünfte vergleichen",
      image: {
        src: "/images/home/region-stories/dandelion-home-balaton-story-01.webp",
        alt: "Balaton-Stimmung bei Keszthely",
        width: 1800,
        height: 1350
      }
    },
    reasons: [
      { iconKey: "balaton", title: "Balaton und Stadt zusammen", text: "Promenade, Hafen, Restaurants, Zentrum" },
      { iconKey: "spark", title: "Jacuzzi plus Terrasse", text: "mehr als nur ein Schlafplatz" },
      { iconKey: "home", title: "Klarer Apartment-Charakter", text: "Wohnanlage, nicht Gästehaus" },
      { iconKey: "users", title: "Gut für Paare und Familien", text: "2 Schlafzimmer plus Wohnzimmer" }
    ]
  }
};

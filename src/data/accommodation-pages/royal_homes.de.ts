import { createGermanAccommodationPage } from "./german-page-factory";
import { royalHomesEnglishPageData } from "./royal_homes.en";

// [CHANGE 2026-06-15 00:00] Royal Homes német fő tartalom magyar jacuzzi- és mólóállításaihoz igazítva.
export const royalHomesGermanPageData = createGermanAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/de/royal/",
  listingAnchor: "royal-homes",
  location: "Keszthely",
  region: "Balaton - Keszthely",
  guests: "4-6 Gäste",
  character: "Premium-Apartment mit Ufersteg und Dachterrassen-Jacuzzi",
  shortDescription: "Premium-Apartment in Keszthely für 4-6 Gäste, mit großer Terrasse, Ufersteg der Anlage und gemeinsamem Dachterrassen-Jacuzzi.",
  lead:
    "Dandelion Royal Homes ist die städtischere Balaton-Option: komfortabel, praktisch und gut gelegen für Keszthely, Strandtage und Ausflüge.",
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
    title: "Dandelion Royal Homes ist eine gute Wahl, wenn Sie ein modernes Apartment in Keszthely suchen, nahe am Balaton und praktisch für Stadtprogramme",
    lead:
      "Royal Homes ist ein hochwertiges Apartment mit 2 Schlafzimmern und Wohnzimmer in einer balatonnahen Wohnanlage in Keszthely, mit großer Terrasse, breitem Balkon, eigenem Ufersteg der Anlage und gemeinsamem Dachterrassen-Jacuzzi.",
    questions: [
      {
        question: "Für wen ist Dandelion Royal Homes eine gute Wahl?",
        answer:
          "Für Familien, Paare und Freunde, die ein modernes, hochwertiges Apartment in Keszthely suchen, nahe am Balaton, der Promenade, dem Hafen und den Stadtprogrammen."
      },
      {
        question: "Wie nah ist Royal Homes am Balaton?",
        answer:
          "Royal Homes liegt in einer balatonnahen Wohnanlage. Promenade, Segelhafen und Radweg sind gut erreichbar; zur Anlage gehören ein eigener Ufersteg und eine Sonnenterrasse."
      },
      {
        question: "Für wie viele Gäste ist Royal Homes bequem?",
        answer:
          "Das Apartment hat 2 Schlafzimmer und ein Wohnzimmer und ist eine komfortable Balaton-Unterkunft für bis zu 6 Gäste. Ein Schlafzimmer hat ein Doppelbett, das andere ein ausziehbares Sofa."
      },
      {
        question: "Gibt es einen Jacuzzi bei Royal Homes?",
        answer:
          "Ja, die Wohnanlage hat einen gemeinsamen Jacuzzi auf der Dachterrasse. Es ist kein privater Jacuzzi im Apartment, sondern ein gemeinsames Premium-Komfortelement des Gebäudes."
      },
      {
        question: "Wie ist der Außenbereich?",
        answer:
          "Eine der stärksten Seiten des Apartments sind die große Terrasse und der breite Balkon. Sonnenterrasse und Ufersteg der Anlage verstärken das Balaton-Urlaubsgefühl."
      },
      {
        question: "Für welche Programme ist Keszthely ein guter Ausgangspunkt?",
        answer:
          "Die Lage eignet sich für Balaton-Strandtage, Promenade, Hafen, Radfahren, Keszthelyer Stadtprogramme und Ausflüge am West-Balaton. Das Stadtzentrum ist ungefähr 10 Gehminuten entfernt."
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

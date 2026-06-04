import { createGermanAccommodationPage } from "./german-page-factory";
import { royalHomesEnglishPageData } from "./royal_homes.en";

export const royalHomesGermanPageData = createGermanAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/de/royal/",
  listingAnchor: "royal-homes",
  location: "Keszthely",
  region: "Balaton - Keszthely",
  guests: "4-6 Gäste",
  character: "Komfortables Apartment nahe am Balaton",
  shortDescription: "Apartment in Keszthely für 4-6 Gäste, nah am Wasser und an Stadtprogrammen.",
  lead:
    "Dandelion Royal Homes ist die städtischere Balaton-Option: komfortabel, praktisch und gut gelegen für Keszthely, Strandtage und Ausflüge.",
  longDescription: [
    "Das Apartment passt zu Gästen, die den Balaton und Keszthely bequem erreichen möchten, ohne auf eine ruhige, gut ausgestattete Unterkunft zu verzichten.",
    "Es eignet sich für Paare, Familien oder Freunde, die tagsüber viel unterwegs sind und abends eine komfortable Basis suchen.",
    "Royal Homes ist besonders praktisch, wenn Wassernähe, Restaurants, Kultur und Balaton-Programme wichtiger sind als Dorf- oder Weinberglage."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Typ", "Apartment"],
    ["Lage", "Keszthely"],
    ["Umgebung", "Balaton und Stadtprogramme"],
    ["Außenbereich", "Terrasse oder Balkon je nach Einheit"]
  ],
  experienceFacts: [
    ["Balaton", "nah am Wasser"],
    ["Keszthely", "Restaurants, Schloss und Programme"],
    ["Komfort", "praktische Ausstattung"],
    ["Ausflüge", "West-Balaton und Umgebung"]
  ],
  highlights: ["Balaton-nahe Lage", "Komfortables Apartment", "Klimaanlage", "Küche", "Praktisch für Keszthely"],
  reasons: [
    { iconKey: "balaton", title: "Wassernähe", text: "praktisch für Balaton-Tage" },
    { iconKey: "route", title: "Keszthely", text: "Stadt und Programme nah" },
    { iconKey: "home", title: "Komfort", text: "gut ausgestattete Basis" },
    { iconKey: "users", title: "Flexibel", text: "für 4-6 Gäste" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse oder Balkon", "Parken"],
  geoDecision: {
    kicker: "Royal Homes schnelle Antworten",
    title: "Dandelion Royal Homes passt, wenn Sie ein modernes Apartment in Keszthely suchen, nahe am Balaton und praktisch für Stadtprogramme",
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
          "Das Apartment hat 2 Schlafzimmer und ein Wohnzimmer und ist eine komfortable Balaton-Basis für bis zu 6 Gäste. Ein Schlafzimmer hat ein Doppelbett, das andere ein ausziehbares Sofa."
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
          "Die Lage passt für Balaton-Strandtage, Promenade, Hafen, Radfahren, Keszthelyer Stadtprogramme und Ausflüge am West-Balaton. Das Stadtzentrum ist ungefähr 10 Gehminuten entfernt."
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

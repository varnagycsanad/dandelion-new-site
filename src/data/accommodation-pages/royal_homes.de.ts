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
  mapBody:
    "Royal Homes liegt in Keszthely, gut für Balaton-Ufer, Schlosspark, Restaurants und Ausflüge am West-Balaton.",
  mapBenefits: [
    { label: "Balaton in der Nähe", icon: "balaton" },
    { label: "Keszthely Programme", icon: "route" },
    { label: "West-Balaton Ausflüge", icon: "trail" }
  ],
  relatedSlot: "royal_homes_card_image"
});

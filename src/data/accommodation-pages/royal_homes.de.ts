import { createGermanAccommodationPage } from "./german-page-factory";
import { royalHomesEnglishPageData } from "./royal_homes.en";

export const royalHomesGermanPageData = createGermanAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/de/royal/",
  listingAnchor: "royal-homes",
  location: "Keszthely",
  region: "Balaton - Keszthely",
  guests: "4-6 Gaeste",
  character: "Komfortables Apartment nahe am Balaton",
  shortDescription: "Apartment in Keszthely fuer 4-6 Gaeste, nah am Wasser und an Stadtprogrammen.",
  lead:
    "Dandelion Royal Homes ist die staedtischere Balaton-Option: komfortabel, praktisch und gut gelegen fuer Keszthely, Strandtage und Ausfluege.",
  longDescription: [
    "Das Apartment passt zu Gaesten, die den Balaton und Keszthely bequem erreichen moechten, ohne auf eine ruhige, gut ausgestattete Unterkunft zu verzichten.",
    "Es eignet sich fuer Paare, Familien oder Freunde, die tagsueber viel unterwegs sind und abends eine komfortable Basis suchen.",
    "Royal Homes ist besonders praktisch, wenn Wassernaehe, Restaurants, Kultur und Balaton-Programme wichtiger sind als Dorf- oder Weinberglage."
  ],
  facts: [
    ["Gaeste", "4-6 Gaeste"],
    ["Typ", "Apartment"],
    ["Lage", "Keszthely"],
    ["Umgebung", "Balaton und Stadtprogramme"],
    ["Aussenbereich", "Terrasse oder Balkon je nach Einheit"]
  ],
  experienceFacts: [
    ["Balaton", "nah am Wasser"],
    ["Keszthely", "Restaurants, Schloss und Programme"],
    ["Komfort", "praktische Ausstattung"],
    ["Ausfluege", "West-Balaton und Umgebung"]
  ],
  highlights: ["Balaton-nahe Lage", "Komfortables Apartment", "Klimaanlage", "Kueche", "Praktisch fuer Keszthely"],
  reasons: [
    { iconKey: "balaton", title: "Wassernaehe", text: "praktisch fuer Balaton-Tage" },
    { iconKey: "route", title: "Keszthely", text: "Stadt und Programme nah" },
    { iconKey: "home", title: "Komfort", text: "gut ausgestattete Basis" },
    { iconKey: "users", title: "Flexibel", text: "fuer 4-6 Gaeste" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Terrasse oder Balkon", "Parken"],
  mapBody:
    "Royal Homes liegt in Keszthely, gut fuer Balaton-Ufer, Schlosspark, Restaurants und Ausfluege am West-Balaton.",
  mapBenefits: [
    { label: "Balaton in der Naehe", icon: "balaton" },
    { label: "Keszthely Programme", icon: "route" },
    { label: "West-Balaton Ausfluege", icon: "trail" }
  ],
  relatedSlot: "royal_homes_card_image"
});

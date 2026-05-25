import { createGermanAccommodationPage } from "./german-page-factory";
import { koveskalEnglishPageData } from "./koveskal.en";

export const koveskalGermanPageData = createGermanAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Koveskal",
  route: "/de/dandelion-koveskal/",
  listingAnchor: "dandelion-koveskal",
  location: "Koveskal",
  region: "Kali-Becken - Koveskal",
  guests: "4-6 Gaeste",
  character: "Ruhiges Haus im Kali-Becken",
  shortDescription: "Ruhige Unterkunft in Koveskal, ideal fuer langsame Tage im Kali-Becken.",
  lead:
    "Dandelion Koveskal ist fuer Gaeste gedacht, die Dorfstimmung, gute Gastronomie, Steinlandschaft und die ruhigere Seite des Balaton-Oberlands suchen.",
  longDescription: [
    "Koveskal hat eine besondere Mischung aus Ruhe, Gastronomie und Landschaft. Die Unterkunft ist eine passende Basis fuer langsame Tage und kleine Ausfluege.",
    "Von hier aus sind das Kali-Becken, Salfold, Hegyestu, Badacsony und mehrere Balaton-Orte gut erreichbar.",
    "Das Haus passt zu Gaesten, die weniger Strandtrubel und mehr Dorf, Natur, Wein und regionale Stimmung suchen."
  ],
  facts: [
    ["Gaeste", "4-6 Gaeste"],
    ["Region", "Kali-Becken"],
    ["Lage", "Koveskal"],
    ["Stimmung", "ruhiges Dorf"],
    ["Umgebung", "Natur, Wein und Gastronomie"]
  ],
  experienceFacts: [
    ["Kali-Becken", "Steinlandschaft und Doerfer"],
    ["Gastronomie", "Koveskal und Umgebung"],
    ["Ausfluege", "Hegyestu, Salfold, Badacsony"],
    ["Balaton", "kurze Fahrt zu mehreren Orten"]
  ],
  highlights: ["Ruhige Dorfstimmung", "Kueche", "Klimaanlage", "Gute Ausflugsbasis", "Kali-Becken"],
  reasons: [
    { iconKey: "leaf", title: "Kali-Becken", text: "Natur und Dorfstimmung" },
    { iconKey: "grapes", title: "Regionale Orte", text: "Wein und Gastronomie" },
    { iconKey: "route", title: "Ausfluege", text: "Hegyestu, Salfold, Balaton" },
    { iconKey: "home", title: "Ruhige Basis", text: "angenehm fuer langsame Tage" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Parken", "Ruhige Umgebung"],
  mapBody:
    "Koveskal liegt im Kali-Becken, mit guter Erreichbarkeit von Salfold, Hegyestu, Badacsony, Balaton-Stranden und regionalen Weinguetern.",
  mapBenefits: [
    { label: "Kali-Becken", icon: "leaf" },
    { label: "Wein und Gastronomie", icon: "grapes" },
    { label: "Balaton-Ausfluege", icon: "route" }
  ],
  relatedSlot: "koveskal_card_image"
});

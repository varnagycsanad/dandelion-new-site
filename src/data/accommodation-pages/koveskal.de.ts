import { createGermanAccommodationPage } from "./german-page-factory";
import { koveskalEnglishPageData } from "./koveskal.en";

export const koveskalGermanPageData = createGermanAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Köveskál",
  route: "/de/dandelion-koveskal/",
  listingAnchor: "dandelion-koveskal",
  location: "Köveskál",
  region: "Káli-Becken - Köveskál",
  guests: "4-6 Gäste",
  character: "Ruhiges Haus im Káli-Becken",
  shortDescription: "Ruhige Unterkunft in Köveskál, ideal für langsame Tage im Káli-Becken.",
  lead:
    "Dandelion Köveskál ist für Gäste gedacht, die Dorfstimmung, gute Gastronomie, Steinlandschaft und die ruhigere Seite des Balaton-Oberlands suchen.",
  longDescription: [
    "Köveskál hat eine besondere Mischung aus Ruhe, Gastronomie und Landschaft. Die Unterkunft ist eine passende Basis für langsame Tage und kleine Ausflüge.",
    "Von hier aus sind das Káli-Becken, Salföld, Hegyestű, Badacsony und mehrere Balaton-Orte gut erreichbar.",
    "Das Haus passt zu Gästen, die weniger Strandtrubel und mehr Dorf, Natur, Wein und regionale Stimmung suchen."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Region", "Káli-Becken"],
    ["Lage", "Köveskál"],
    ["Stimmung", "ruhiges Dorf"],
    ["Umgebung", "Natur, Wein und Gastronomie"]
  ],
  experienceFacts: [
    ["Káli-Becken", "Steinlandschaft und Dörfer"],
    ["Gastronomie", "Köveskál und Umgebung"],
    ["Ausflüge", "Hegyestű, Salföld, Badacsony"],
    ["Balaton", "kurze Fahrt zu mehreren Orten"]
  ],
  highlights: ["Ruhige Dorfstimmung", "Küche", "Klimaanlage", "Gute Ausflugsbasis", "Káli-Becken"],
  reasons: [
    { iconKey: "leaf", title: "Káli-Becken", text: "Natur und Dorfstimmung" },
    { iconKey: "grapes", title: "Regionale Orte", text: "Wein und Gastronomie" },
    { iconKey: "route", title: "Ausflüge", text: "Hegyestű, Salföld, Balaton" },
    { iconKey: "home", title: "Ruhige Basis", text: "angenehm für langsame Tage" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Parken", "Ruhige Umgebung"],
  mapBody:
    "Köveskál liegt im Káli-Becken, mit guter Erreichbarkeit von Salföld, Hegyestű, Badacsony, Balaton-Stränden und regionalen Weingütern.",
  mapBenefits: [
    { label: "Káli-Becken", icon: "leaf" },
    { label: "Wein und Gastronomie", icon: "grapes" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "koveskal_card_image"
});

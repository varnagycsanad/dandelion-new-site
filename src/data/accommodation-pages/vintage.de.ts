import { createGermanAccommodationPage } from "./german-page-factory";
import { vintageEnglishPageData } from "./vintage.en";

export const vintageGermanPageData = createGermanAccommodationPage(vintageEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Vintage",
  route: "/de/dandelion-vintage/",
  listingAnchor: "vintage-vendeghaz",
  location: "Nemesgulacs",
  region: "Balaton-Oberland - Nemesgulacs",
  guests: "4-6 Gaeste",
  character: "Gemutliches Haus mit eigenem Hof",
  shortDescription: "Charaktervolles Ferienhaus in Nemesgulacs mit eigenem Hof und ruhiger Dorfstimmung.",
  lead:
    "Dandelion Vintage ist eine warme, entspannte Unterkunft fuer Gaeste, die Balaton-Naehe und ruhige Dorfatmosphaere verbinden moechten.",
  longDescription: [
    "Das Haus hat eine gemuetliche, persoenliche Stimmung und passt zu Familien, Paaren oder Freunden, die einige ruhige Tage zusammen verbringen moechten.",
    "Der eigene Hof macht den Aufenthalt unkompliziert: draussen sitzen, langsam fruehstuecken und nach Ausfluegen wieder in eine ruhigere Umgebung zurueckkehren.",
    "Nemesgulacs ist guenstig fuer Badacsony, Szigliget, Balaton-Strandtage und die kleineren Orte des Balaton-Oberlands."
  ],
  facts: [
    ["Gaeste", "4-6 Gaeste"],
    ["Charakter", "Vintage-Stimmung"],
    ["Aussenbereich", "eigener Hof"],
    ["Lage", "Nemesgulacs"],
    ["Umgebung", "Balaton-Oberland und Badacsony"]
  ],
  experienceFacts: [
    ["Dorfstimmung", "ruhiger eigener Hof"],
    ["Badacsony", "Wein und Ausfluege"],
    ["Balaton", "Strandtage in Reichweite"],
    ["Gemeinsam reisen", "angenehm fuer Familien und Freunde"]
  ],
  highlights: ["Eigener Hof", "Gemuetliche Innenraeume", "Kueche", "Klimaanlage", "Ruhige Dorfumgebung"],
  reasons: [
    { iconKey: "home", title: "Charakter", text: "waermer als ein Standardapartment" },
    { iconKey: "leaf", title: "Eigener Hof", text: "entspannte Stunden draussen" },
    { iconKey: "grapes", title: "Badacsony", text: "Weinregion nah" },
    { iconKey: "balaton", title: "Balaton", text: "gut erreichbar" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Eigener Hof", "Parken"],
  mapBody:
    "Vintage liegt in Nemesgulacs, ideal fuer Badacsony, Szigliget, Balaton-Strandtage und Ausfluege im Balaton-Oberland.",
  mapBenefits: [
    { label: "Badacsony in Reichweite", icon: "grapes" },
    { label: "Ruhige Dorfumgebung", icon: "leaf" },
    { label: "Balaton-Ausfluege", icon: "route" }
  ],
  relatedSlot: "vintage_card_image"
});

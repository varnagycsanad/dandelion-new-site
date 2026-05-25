import { createGermanAccommodationPage } from "./german-page-factory";
import { vintageEnglishPageData } from "./vintage.en";

export const vintageGermanPageData = createGermanAccommodationPage(vintageEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Vintage",
  route: "/de/dandelion-vintage/",
  listingAnchor: "vintage-vendeghaz",
  location: "Nemesgulács",
  region: "Balaton-Oberland - Nemesgulács",
  guests: "4-6 Gäste",
  character: "Gemütliches Haus mit eigenem Hof",
  shortDescription: "Charaktervolles Ferienhaus in Nemesgulács mit eigenem Hof und ruhiger Dorfstimmung.",
  lead:
    "Dandelion Vintage ist eine warme, entspannte Unterkunft für Gäste, die Balaton-Nähe und ruhige Dorfatmosphäre verbinden möchten.",
  longDescription: [
    "Das Haus hat eine gemütliche, persönliche Stimmung und passt zu Familien, Paaren oder Freunden, die einige ruhige Tage zusammen verbringen möchten.",
    "Der eigene Hof macht den Aufenthalt unkompliziert: draußen sitzen, langsam frühstücken und nach Ausflügen wieder in eine ruhigere Umgebung zurückkehren.",
    "Nemesgulács ist günstig für Badacsony, Szigliget, Balaton-Strandtage und die kleineren Orte des Balaton-Oberlands."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Charakter", "Vintage-Stimmung"],
    ["Außenbereich", "eigener Hof"],
    ["Lage", "Nemesgulács"],
    ["Umgebung", "Balaton-Oberland und Badacsony"]
  ],
  experienceFacts: [
    ["Dorfstimmung", "ruhiger eigener Hof"],
    ["Badacsony", "Wein und Ausflüge"],
    ["Balaton", "Strandtage in Reichweite"],
    ["Gemeinsam reisen", "angenehm für Familien und Freunde"]
  ],
  highlights: ["Eigener Hof", "Gemütliche Innenräume", "Küche", "Klimaanlage", "Ruhige Dorfumgebung"],
  reasons: [
    { iconKey: "home", title: "Charakter", text: "wärmer als ein Standardapartment" },
    { iconKey: "leaf", title: "Eigener Hof", text: "entspannte Stunden draußen" },
    { iconKey: "grapes", title: "Badacsony", text: "Weinregion nah" },
    { iconKey: "balaton", title: "Balaton", text: "gut erreichbar" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Eigener Hof", "Parken"],
  mapBody:
    "Vintage liegt in Nemesgulács, ideal für Badacsony, Szigliget, Balaton-Strandtage und Ausflüge im Balaton-Oberland.",
  mapBenefits: [
    { label: "Badacsony in Reichweite", icon: "grapes" },
    { label: "Ruhige Dorfumgebung", icon: "leaf" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "vintage_card_image"
});

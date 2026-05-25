import { createGermanAccommodationPage } from "./german-page-factory";
import { zsalyaEnglishPageData } from "./zsalya.en";

export const zsalyaGermanPageData = createGermanAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsálya",
  route: "/de/dandelion-zsalya/",
  listingAnchor: "zsalya-vendeghaz",
  location: "Kisapati",
  region: "Balaton-Oberland - Szent György-hegy",
  guests: "2-4 Gäste",
  character: "Ruhiges Haus mit überdachter Terrasse",
  shortDescription: "Kleines, ruhiges Ferienhaus nahe Szent György-hegy mit Terrasse und naturnaher Stimmung.",
  lead:
    "Dandelion Zsálya passt zu Gästen, die eine ruhigere Unterkunft suchen, mit Terrasse, Morgenlicht und kurzer Entfernung zu Wanderwegen und Balaton-Programmen.",
  longDescription: [
    "Zsálya ist überschaubar, ruhig und gut für langsame Tage geeignet. Die Terrasse macht den Außenbereich zu einem wichtigen Teil des Aufenthalts.",
    "Die Umgebung ist naturnah, mit Szent György-hegy, Weinbergen und kleineren Wegen direkt in Reichweite.",
    "Die Unterkunft ist eine gute Wahl für Paare, kleine Familien oder Freundinnen und Freunde, die nicht viel Trubel brauchen."
  ],
  facts: [
    ["Gäste", "2-4 Gäste"],
    ["Schlafbereich", "2 Schlafzimmer"],
    ["Außenbereich", "überdachte Terrasse"],
    ["Stimmung", "ruhig und naturnah"],
    ["Lage", "Kisapati"]
  ],
  experienceFacts: [
    ["Morgen", "Terrasse und ruhiger Start"],
    ["Wandern", "Szent György-hegy in der Nähe"],
    ["Balaton", "mit kurzer Fahrt erreichbar"],
    ["Anfrage", "über deutsche Kontaktseite"]
  ],
  highlights: ["überdachte Terrasse", "Klimaanlage", "Ruhige Lage", "Naturnahe Umgebung", "Gute Basis für Ausflüge"],
  reasons: [
    { iconKey: "terrace", title: "Terrasse", text: "ruhige Stunden draußen" },
    { iconKey: "leaf", title: "Naturnah", text: "Hügel und Wege in der Nähe" },
    { iconKey: "users", title: "Klein und angenehm", text: "für 2-4 Gäste" },
    { iconKey: "route", title: "Gute Lage", text: "Balaton und Weinregion" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  mapBody:
    "Zsálya liegt auf der ruhigeren Seite von Kisapati, mit guter Nähe zu Szent György-hegy, Tapolca und Balaton-Ausflügen.",
  mapBenefits: [
    { label: "Ruhige Hanglage", icon: "trail" },
    { label: "Balaton-Oberland", icon: "route" },
    { label: "Weinberge und Spazierwege", icon: "grapes" }
  ],
  relatedSlot: "zsalya_card_image"
});

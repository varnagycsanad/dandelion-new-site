import { createGermanAccommodationPage } from "./german-page-factory";
import { zsalyaEnglishPageData } from "./zsalya.en";

export const zsalyaGermanPageData = createGermanAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsalya",
  route: "/de/dandelion-zsalya/",
  listingAnchor: "zsalya-vendeghaz",
  location: "Kisapati",
  region: "Balaton-Oberland - Szent Gyorgy-hegy",
  guests: "2-4 Gaeste",
  character: "Ruhiges Haus mit ueberdachter Terrasse",
  shortDescription: "Kleines, ruhiges Ferienhaus nahe Szent Gyorgy-hegy mit Terrasse und naturnaher Stimmung.",
  lead:
    "Dandelion Zsalya passt zu Gaesten, die eine ruhigere Unterkunft suchen, mit Terrasse, Morgenlicht und kurzer Entfernung zu Wanderwegen und Balaton-Programmen.",
  longDescription: [
    "Zsalya ist ueberschaubar, ruhig und gut fuer langsame Tage geeignet. Die Terrasse macht den Aussenbereich zu einem wichtigen Teil des Aufenthalts.",
    "Die Umgebung ist naturnah, mit Szent Gyorgy-hegy, Weinbergen und kleineren Wegen direkt in Reichweite.",
    "Die Unterkunft ist eine gute Wahl fuer Paare, kleine Familien oder Freundinnen und Freunde, die nicht viel Trubel brauchen."
  ],
  facts: [
    ["Gaeste", "2-4 Gaeste"],
    ["Schlafbereich", "2 Schlafzimmer"],
    ["Aussenbereich", "ueberdachte Terrasse"],
    ["Stimmung", "ruhig und naturnah"],
    ["Lage", "Kisapati"]
  ],
  experienceFacts: [
    ["Morgen", "Terrasse und ruhiger Start"],
    ["Wandern", "Szent Gyorgy-hegy in der Naehe"],
    ["Balaton", "mit kurzer Fahrt erreichbar"],
    ["Anfrage", "ueber deutsche Kontaktseite"]
  ],
  highlights: ["Ueberdachte Terrasse", "Klimaanlage", "Ruhige Lage", "Naturnahe Umgebung", "Gute Basis fuer Ausfluege"],
  reasons: [
    { iconKey: "terrace", title: "Terrasse", text: "ruhige Stunden draussen" },
    { iconKey: "leaf", title: "Naturnah", text: "Huegel und Wege in der Naehe" },
    { iconKey: "users", title: "Klein und angenehm", text: "fuer 2-4 Gaeste" },
    { iconKey: "route", title: "Gute Lage", text: "Balaton und Weinregion" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  mapBody:
    "Zsalya liegt auf der ruhigeren Seite von Kisapati, mit guter Naehe zu Szent Gyorgy-hegy, Tapolca und Balaton-Ausfluegen.",
  mapBenefits: [
    { label: "Ruhige Hanglage", icon: "trail" },
    { label: "Balaton-Oberland", icon: "route" },
    { label: "Weinberge und Spazierwege", icon: "grapes" }
  ],
  relatedSlot: "zsalya_card_image"
});

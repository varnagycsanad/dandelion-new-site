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
  geoDecision: {
    kicker: "Köveskál schnelle Antworten",
    title: "Dandelion Köveskál passt, wenn Sie ein ruhiges Gästehaus mit Dorfstimmung im Káli-Becken suchen, für langsamere Tage und kleine Ausflüge",
    lead:
      "Das Köveskál Gästehaus bietet bis zu 6 Gästen eine ruhige Basis im Káli-Becken mit großem Garten, großer Terrasse, 2 Badezimmern, Dorfstimmung und Wein- sowie Gastronomieprogrammen in der Nähe.",
    questions: [
      {
        question: "Für wen ist Dandelion Köveskál eine gute Wahl?",
        answer:
          "Für größere Familien und Freundesgruppen, die keine lebhafte Unterkunft direkt am Balaton suchen, sondern eine ruhigere Dorfatmosphäre im Káli-Becken."
      },
      {
        question: "Für wie viele Gäste ist Köveskál bequem?",
        answer:
          "Das Haus ist für bis zu 6 Gäste bequem. Die Schlafmöglichkeiten bestehen aus 2 Doppelbetten und 2 Einzelbetten; 2 Badezimmer machen den Aufenthalt praktischer."
      },
      {
        question: "Wie sind Garten und Terrasse?",
        answer:
          "Der große Garten und die große Terrasse passen zu langsameren Tagen: Frühstück draußen, Abendgespräche, Lesen und ruhige gemeinsame Zeit."
      },
      {
        question: "Für welche Programme ist Köveskál ein guter Ausgangspunkt?",
        answer:
          "Köveskál ist eine gute Basis für die Dörfer des Káli-Beckens, Spaziergänge, Wein- und Gastronomiestopps, Hegyestű, Salföld, Badacsony und Ausflüge zum Balaton."
      },
      {
        question: "Worin unterscheidet sich Köveskál von Unterkünften direkt am Balaton?",
        answer:
          "Köveskál ist keine Unterkunft direkt am Wasser, sondern eine ruhigere, dörflichere Wahl im Káli-Becken. Es passt, wenn Landschaft, Dorfstimmung, Weinregion und langsameres Tempo wichtiger sind als direkter Strandzugang."
      },
      {
        question: "Wie ist der Hof beim Gästehaus Köveskál?",
        answer:
          "Zum Haus gehört ein schöner, geschlossener Hof. Er eignet sich für Frühstück im Freien, ruhige Abende, Lesen und entspannte Zeit mit der Familie."
      }
    ],
    amenitiesTitle: "Wichtig bei Köveskál"
  },
  mapBody:
    "Köveskál liegt im Káli-Becken, mit guter Erreichbarkeit von Salföld, Hegyestű, Badacsony, Balaton-Stränden und regionalen Weingütern.",
  mapBenefits: [
    { label: "Káli-Becken", icon: "leaf" },
    { label: "Wein und Gastronomie", icon: "grapes" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "koveskal_card_image"
});

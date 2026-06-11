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
    "Das Haus hat eine gemütliche, persönliche Stimmung und eignet sich für Familien, Paare oder Freunde, die einige ruhige Tage zusammen verbringen möchten.",
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
  geoDecision: {
    kicker: "Vintage schnelle Antworten",
    title: "Dandelion Vintage ist eine gute Wahl, wenn Sie ein ruhiges Gästehaus mit eigenem Hof in Nemesgulács suchen, nahe Balaton und Badacsony",
    lead:
      "Vintage ist ein gemütliches Haus für 4 Gäste mit 2 Schlafzimmern, Wohnzimmer, eigenem Hof, Grillmöglichkeit, Klimaanlage, starkem Internet und ruhiger Dorfstimmung.",
    questions: [
      {
        question: "Für wen ist Dandelion Vintage eine gute Wahl?",
        answer:
          "Für kleinere Familien, Paare und Freunde, die ein persönliches Gästehaus mit eigenem Hof in Nemesgulács suchen, nahe Balaton-Programmen und Ausflügen im Balaton-Oberland."
      },
      {
        question: "Für wie viele Gäste ist Vintage bequem?",
        answer:
          "Das Haus ist für 4 Gäste bequem. Es gibt zwei Schlafzimmer: eines mit Doppelbett und eines mit zwei Einzelbetten; das Wohnzimmer bleibt der gemeinsame Aufenthaltsraum."
      },
      {
        question: "Wie ist der Außenbereich bei Vintage?",
        answer:
          "Der eigene Hof ist einer der wichtigsten Vorteile des Hauses: angenehm für Frühstück draußen, ruhige Abende, Grillen und langsamere Urlaubstage."
      },
      {
        question: "Für welche Programme ist Nemesgulács ein guter Ausgangspunkt?",
        answer:
          "Die Lage eignet sich für Badacsony, Szigliget, die Zeugenberge, Balaton-Strandtage, Weingüter und kürzere Ausflüge in der Umgebung."
      },
      {
        question: "Kann man von hier auch ruhig arbeiten?",
        answer:
          "Ja. Das Haus hat starkes Gigabit-Internet und Klimaanlage, deshalb eignet es sich auch für ruhige Arbeit, längere Aufenthalte oder eine Mischung aus Erholung und Arbeit."
      },
      {
        question: "Was macht die Vintage-Stimmung aus?",
        answer:
          "Die warmen Vintage-Details, die separate Küche, der eigene Hof und die ruhige Lage in Nemesgulács ergeben zusammen den langsamen, ländlichen Rhythmus des Hauses."
      }
    ],
    amenitiesTitle: "Wichtig bei Vintage"
  },
  mapBody:
    "Vintage liegt in Nemesgulács, ideal für Badacsony, Szigliget, Balaton-Strandtage und Ausflüge im Balaton-Oberland.",
  mapBenefits: [
    { label: "Badacsony in Reichweite", icon: "grapes" },
    { label: "Ruhige Dorfumgebung", icon: "leaf" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "vintage_card_image"
});

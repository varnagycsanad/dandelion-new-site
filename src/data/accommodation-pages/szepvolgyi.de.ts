import { createGermanAccommodationPage } from "./german-page-factory";
import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";

export const szepvolgyiGermanPageData = createGermanAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szépvölgyi",
  route: "/de/szepvolgyi/",
  listingAnchor: "szepvolgyi-vendeghaz",
  location: "Badacsonyörs",
  region: "Balaton - Badacsonyörs",
  guests: "bis 8 Gäste",
  character: "Großes Ferienhaus mit Balaton-Panorama",
  shortDescription: "Großes Ferienhaus in Badacsonyörs mit Balaton-Panorama und viel Platz.",
  lead:
    "Dandelion Szépvölgyi ist für größere Familien und Freundesgruppen gedacht, die nahe am Balaton wohnen und trotzdem ein eigenes Haus mit Ausblick haben möchten.",
  longDescription: [
    "Das Haus gibt mehreren Gästen genug Raum für gemeinsame Tage, Mahlzeiten und ruhige Pausen. Die Terrasse und der Blick zum Balaton sind zentrale Teile des Aufenthalts.",
    "Badacsonyörs ist gut für Strandtage, Radwege, Ausflüge nach Badacsony und ruhige Abende abseits der dichtesten Sommerorte.",
    "Szépvölgyi eignet sich besonders, wenn viel Platz, mehrere Schlafzimmer und gute Erreichbarkeit des Balaton wichtiger sind als ein kleines Dorfhaus."
  ],
  facts: [
    ["Gäste", "bis 8 Gäste"],
    ["Schlafzimmer", "4 Schlafzimmer"],
    ["Badezimmer", "2 Badezimmer"],
    ["Ausblick", "Balaton-Panorama"],
    ["Lage", "Badacsonyörs"]
  ],
  experienceFacts: [
    ["Balaton", "Strand und Ufer in Reichweite"],
    ["Badacsony", "Wein, Ausflüge und Aussicht"],
    ["Gruppen", "viel Platz für gemeinsame Tage"],
    ["Panorama", "Terrasse mit Blick"]
  ],
  highlights: ["Balaton-Panorama", "4 Schlafzimmer", "2 Badezimmer", "Terrasse", "Gute Lage für Strandtage"],
  reasons: [
    { iconKey: "balaton", title: "Balaton nah", text: "praktisch für Sommertage" },
    { iconKey: "users", title: "Viel Platz", text: "bis 8 Gäste" },
    { iconKey: "terrace", title: "Panorama", text: "Ausblick von der Terrasse" },
    { iconKey: "grapes", title: "Badacsony", text: "Weinregion in der Nähe" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  geoDecision: {
    kicker: "Szépvölgyi schnelle Antworten",
    title: "Szépvölgyi ist eine gute Wahl, wenn eine größere Familie oder Freundesgruppe ein geräumiges Haus mit Balaton-Panorama und eigenem Garten in Badacsonyörs sucht",
    lead:
      "Szépvölgyi ist bis 8 Gäste bequem, mit 4 Schlafzimmern, 2 Badezimmern, geschlossenem Garten, Panorama-Terrasse, Grillmöglichkeit und Balaton-Programmen in der Nähe.",
    questions: [
      {
        question: "Für wen ist Szépvölgyi eine gute Wahl?",
        answer:
          "Für größere Familien und Freundesgruppen, die in Badacsonyörs ein geräumiges Haus mit eigenem Garten und Balaton-Panorama suchen, nahe Strand, Hafen und Badacsony-Programmen."
      },
      {
        question: "Für wie viele Gäste ist Szépvölgyi bequem?",
        answer:
          "Das Haus ist für bis zu 8 Gäste bequem. Es gibt 4 Schlafzimmer und 2 Badezimmer, deshalb funktioniert es gut für mehrere Familienmitglieder oder eine größere Gruppe."
      },
      {
        question: "Wie ist der Blick von der Terrasse?",
        answer:
          "Von der Terrasse öffnet sich ein Balaton-Panorama. Das ist einer der stärksten Punkte des Hauses und gibt Frühstück, Abendgesprächen und gemeinsamer Erholung eine schöne Kulisse."
      },
      {
        question: "Wie sind Garten und Außenbereich?",
        answer:
          "Der geschlossene Garten bietet Parkmöglichkeit für zwei Autos. Terrassenmöbel und Grill machen die Zeit draußen bequem und praktisch."
      },
      {
        question: "Welche Programme gibt es in der Nähe?",
        answer:
          "Strand, Hafen und Radweg sind gut erreichbar. Folly Arboretum, Burg Szigliget, Badacsony-Weinrouten, Gastroprogramme und Festivals sind gute Ziele in der Umgebung."
      },
      {
        question: "Worin unterscheidet es sich von einem Apartment am Balaton?",
        answer:
          "Szépvölgyi bietet eher den Rhythmus eines eigenen Ferienhauses: mehr gemeinsame Räume, eigener Garten und ruhigere Atmosphäre, während der Balaton trotzdem nahe bleibt."
      }
    ],
    amenitiesTitle: "Wichtig bei Szépvölgyi"
  },
  mapBody:
    "Szépvölgyi liegt in Badacsonyörs, mit Zugang zu Balaton-Ufer, Badacsony, Radwegen und regionalen Ausflugszielen.",
  mapBenefits: [
    { label: "Balaton-Panorama", icon: "balaton" },
    { label: "Badacsony und Wein", icon: "grapes" },
    { label: "Strandtage und Radwege", icon: "route" }
  ],
  relatedSlot: "szepvolgyi_card_image"
});

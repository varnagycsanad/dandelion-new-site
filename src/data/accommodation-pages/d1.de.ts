import { createGermanAccommodationPage } from "./german-page-factory";
import { d1EnglishPageData } from "./d1.en";

export const d1GermanPageData = createGermanAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/de/dandelion-d1/",
  listingAnchor: "dandelion-d1",
  location: "Kisapáti",
  region: "Balaton-Oberland - Szent György-hegy",
  guests: "6-8 Gäste",
  character: "Großes Ferienhaus mit Garten und Terrasse",
  shortDescription: "D1 ist das geräumigste, klimatisierte Haus der Dandelion Gästehäuser, für bis zu 8 Gäste. Es erwartet Sie mit 3 Schlafzimmern, Wohnzimmer, bequemer Terrasse, Grillmöglichkeit und schönem Blick Richtung Csobánc, Tóti-hegy, Gulács und Badacsony.\n\nDen auf dem Hauptbild sichtbaren Panorama Pool können Gäste von Dandelion D1, D2 und Fügeház nutzen.",
  lead:
    "Dandelion D1 bietet viel Platz, drei Schlafzimmer, einen großen Garten und eine entspannte Lage für Tage zwischen Balaton, Weinbergen und ruhigen Abenden auf der Terrasse.",
  longDescription: [
    "D1 ist das geräumigste, klimatisierte Haus der Dandelion Gästehäuser und eine bequeme Wahl für größere Familien oder Freundesgruppen. Das Haus hat 3 Schlafzimmer und ein Wohnzimmer und eignet sich dadurch auch für Aufenthalte mit mehreren Gästen.",
    "Das Wohnzimmer ist der zentrale Teil des Hauses. Daran schließen sich eine große, voll ausgestattete Küche und ein Essbereich an. Von hier gelangt man auf die Terrasse, wo der Morgenkaffee, ein gemeinsames Abendessen oder Gespräche am Abend bei gutem Wetter eine besondere Stimmung bekommen. Von der Terrasse öffnet sich der Blick Richtung Csobánc, Tóti-hegy, Gulács und Badacsony. Gartenmöbel zum Essen im Freien und eine Grillmöglichkeit stehen ebenfalls zur Verfügung.",
    "Die großzügige Aufteilung, die 3 getrennten Schlafzimmer, das Wohnzimmer, zwei Duschbad-Bereiche und ein separates WC machen den Aufenthalt auch für Gruppen angenehm.",
    "D1 ist eine gute Wahl für alle, die ein geräumiges, bequemes Haus suchen, um das Balaton-Oberland zu entdecken und zugleich aus dem Alltag herauszukommen. Balaton, Szent György-hegy, Badacsony, Szigliget, Csobánc und die Weingüter der Umgebung sind mit kurzer Fahrt erreichbar. Gäste von D1 können auch den Panorama Pool nutzen, der Gästen von D1, D2 und Fügeház zur Verfügung steht."
  ],
  facts: [
    ["Gäste", "6-8 Gäste"],
    ["Schlafzimmer", "3 Schlafzimmer"],
    ["Badezimmer", "2 Badezimmer"],
    ["Außenbereich", "Terrasse und großer Garten"],
    ["Lage", "Kisapáti, nahe Szent György-hegy"]
  ],
  experienceFacts: [
    ["Panorama Pool", "für D1, D2 und Fügeház Gäste ab 15. Juni 2026"],
    ["Familienzeit", "viel Platz im Haus und draußen"],
    ["Ausflüge", "Balaton, Wanderwege und Weingüter"],
    ["Direktanfrage", "deutsche Anfrage über Kontaktseite"]
  ],
  highlights: ["Großer Garten", "Terrasse", "Familienfreundliche Aufteilung", "Gut ausgestattete Küche", "Panorama Pool"],
  reasons: [
    { iconKey: "users", title: "Großes Familienhaus", text: "8 Gäste, getrennte Zimmer" },
    { iconKey: "terrace", title: "Garten und Terrasse", text: "Essen im Freien" },
    { iconKey: "pool", title: "Sommeraufenthalt", text: "Panorama Pool" },
    { iconKey: "trail", title: "Ausgangspunkt am Berg", text: "Wandern und Weingüter" }
  ],
  amenities: ["3 Schlafzimmer", "Gemütliches Wohnzimmer", "Gut ausgestattete Küche", "Panoramaterrasse", "Grillmöglichkeit", "Klimaanlage", "Waschmaschine", "Geschirrspüler", "Gigabit-Internet"],
  geoDecision: {
    kicker: "D1 schnelle Antworten",
    title: "Dandelion D1 ist eine gute Wahl, wenn Sie ein geräumiges Haus in Kisapáti mit Zugang zum Panorama Pool suchen",
    lead: "D1 ist für größere Familien und Freundesgruppen gedacht: bis zu 8 Gäste, Panoramaterrasse, großzügige Gemeinschaftsbereiche und Panorama Pool ab 15. Juni 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Hat Dandelion D1 Zugang zum Pool?",
        answer: "Ja. Ab 15. Juni 2026 können D1-Gäste den Panorama Pool nutzen."
      },
      {
        iconKey: "pool",
        question: "Ist der Pool privat für D1?",
        answer: "Nein. Der Panorama Pool ist ein gemeinsamer Poolbereich für Gäste von D1, D2 und Fügeház."
      },
      {
        iconKey: "guests",
        question: "Für wie viele Gäste ist Dandelion D1 bequem?",
        answer: "Dandelion D1 ist für bis zu 8 Gäste bequem, mit 3 Schlafzimmern, Wohnzimmer und mehreren Badezimmern."
      },
      {
        iconKey: "mountain",
        question: "Für welche Ausflüge ist D1 ein guter Ausgangspunkt?",
        answer: "Von Kisapáti aus sind Szent György-hegy, Badacsony, Szigliget, Csobánc, der Balaton und lokale Weingüter mit kurzer Fahrt erreichbar."
      },
      {
        iconKey: "kitchen",
        question: "Welche Ausstattung hat D1?",
        answer: "D1 hat eine gut ausgestattete Küche, Geschirrspüler, Waschmaschine, Klimaanlage, ein gemütliches Wohnzimmer, Panoramaterrasse und Grillmöglichkeit."
      },
      {
        iconKey: "wifi",
        question: "Hat Dandelion D1 schnelles Internet?",
        answer: "Ja. In Dandelion D1 gibt es Gigabit-Internet, daher ist das Haus auch für längere Aufenthalte und ruhigeres Online-Arbeiten praktisch."
      }
    ],
    amenitiesTitle: "Was im Haus wichtig ist"
  },
  mapBody:
    "Dandelion D1 liegt in Kisapáti, mit guter Erreichbarkeit von Szent György-hegy, Tapolca, Badacsony und den Balaton-Stränden.",
  mapBenefits: [
    { label: "Wanderwege in der Nähe", icon: "trail" },
    { label: "Balaton mit kurzer Fahrt erreichbar", icon: "route" },
    { label: "Weingüter und Aussichtspunkte", icon: "grapes" }
  ],
  relatedSlot: "d1_card_image"
});

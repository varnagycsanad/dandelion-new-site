import { createGermanAccommodationPage } from "./german-page-factory";
import { d1EnglishPageData } from "./d1.en";

export const d1GermanPageData = createGermanAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/de/dandelion-d1/",
  listingAnchor: "dandelion-d1",
  location: "Kisapati",
  region: "Balaton-Oberland - Szent György-hegy",
  guests: "6-8 Gäste",
  character: "Großes Ferienhaus mit Garten und Terrasse",
  shortDescription: "Großzügiges Ferienhaus für Familien und Freundesgruppen nahe Szent György-hegy.",
  lead:
    "Dandelion D1 bietet viel Platz, drei Schlafzimmer, einen großen Garten und eine entspannte Lage für Tage zwischen Balaton, Weinbergen und ruhigen Abenden auf der Terrasse.",
  longDescription: [
    "Das Haus eignet sich für Gäste, die zusammen reisen, aber trotzdem genug Raum im Alltag brauchen. Wohnbereich, Küche und Terrasse verbinden sich zu einem unkomplizierten Ferienrhythmus.",
    "Der Garten und die Außenbereiche machen D1 besonders angenehm für Familien. Tagsüber sind Ausflüge an den Balaton, Wanderungen am Szent György-hegy und Besuche bei Weingütern gut erreichbar.",
    "Der gemeinsame Panorama Pool gehört zum nahe gelegenen D1-D2-Fügeház Bereich und ist ab 15. Juni 2026 für die passenden Unterkünfte vorgesehen."
  ],
  facts: [
    ["Gäste", "6-8 Gäste"],
    ["Schlafzimmer", "3 Schlafzimmer"],
    ["Badezimmer", "2 Badezimmer"],
    ["Außenbereich", "Terrasse und großer Garten"],
    ["Lage", "Kisapati, nahe Szent György-hegy"]
  ],
  experienceFacts: [
    ["Gemeinsamer Panorama Pool", "für D1, D2 und Fügeház Gäste ab 15. Juni 2026"],
    ["Familienzeit", "viel Platz im Haus und draußen"],
    ["Ausflüge", "Balaton, Wanderwege und Weingüter"],
    ["Direktanfrage", "deutsche Anfrage über Kontaktseite"]
  ],
  highlights: ["Großer Garten", "Terrasse", "Familienfreundliche Aufteilung", "Gut ausgestattete Küche", "Gemeinsamer Panorama Pool"],
  reasons: [
    { iconKey: "users", title: "Großes Familienhaus", text: "8 Gäste, getrennte Zimmer" },
    { iconKey: "terrace", title: "Garten und Terrasse", text: "Essen im Freien" },
    { iconKey: "pool", title: "Sommeraufenthalt", text: "gemeinsamer Pool" },
    { iconKey: "trail", title: "Basis am Berg", text: "Wandern und Weingüter" }
  ],
  amenities: ["3 Schlafzimmer", "Gemütliches Wohnzimmer", "Gut ausgestattete Küche", "Panoramaterrasse", "Grillmöglichkeit", "Klimaanlage", "Waschmaschine", "Geschirrspüler", "Gigabit-Internet"],
  geoDecision: {
    kicker: "D1 schnelle Antworten",
    title: "Dandelion D1 passt, wenn Sie ein geräumiges Haus in Kisapati mit gemeinsamem Poolzugang suchen",
    lead: "D1 ist für größere Familien und Freundesgruppen gedacht: bis zu 8 Gäste, Panoramaterrasse, großzügige Gemeinschaftsbereiche und gemeinsamer Panorama Pool ab 15. Juni 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Hat Dandelion D1 Zugang zum Pool?",
        answer: "Ja. Ab 15. Juni 2026 können D1-Gäste den gemeinsamen Panorama Pool nutzen."
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
        answer: "Von Kisapati aus sind Szent György-hegy, Badacsony, Szigliget, Csobánc, der Balaton und lokale Weingüter mit kurzer Fahrt erreichbar."
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
    "Dandelion D1 liegt in Kisapati, mit guter Erreichbarkeit von Szent György-hegy, Tapolca, Badacsony und den Balaton-Stränden.",
  mapBenefits: [
    { label: "Wanderwege in der Nähe", icon: "trail" },
    { label: "Balaton mit kurzer Fahrt erreichbar", icon: "route" },
    { label: "Weingüter und Aussichtspunkte", icon: "grapes" }
  ],
  relatedSlot: "d1_card_image"
});

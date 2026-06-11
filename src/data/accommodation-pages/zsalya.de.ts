import { createGermanAccommodationPage } from "./german-page-factory";
import { zsalyaEnglishPageData } from "./zsalya.en";

const zsalyaGermanBasePageData = createGermanAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsálya",
  route: "/de/dandelion-zsalya/",
  listingAnchor: "zsalya-vendeghaz",
  location: "Kisapáti",
  region: "Balaton-Oberland - Szent György-hegy",
  guests: "4 Gäste",
  character: "Ruhiges Hanghaus mit Glas-Terrasse",
  shortDescription: "Ruhiges, separates Hanghaus für 4 Gäste nahe Szent György-hegy mit komplett überdachter Glas-Terrasse und Zeugenberg-Panorama.",
  lead:
    "Dandelion Zsálya eignet sich für Gäste, die ein ruhiges separates Haus mit großer eigener Fläche, Glas-Terrasse, Aussicht und kurzen Wegen zu Wanderwegen suchen.",
  longDescription: [
    "Zsálya ist ruhig, separat und gut für langsame Tage geeignet. Die komplett überdachte Glas-Terrasse macht den Außenbereich zu einem wichtigen Teil des Aufenthalts.",
    "Die Umgebung ist naturnah, mit Szent György-hegy, Weinbergen und kleineren Wegen direkt in Reichweite.",
    "Die Unterkunft ist eine gute Wahl für Paare, kleinere Familien oder Freundinnen und Freunde, die Aussicht, Platz und eine ruhigere Hanglage suchen."
  ],
  facts: [
    ["Gäste", "4 Gäste"],
    ["Haus", "separates zweistöckiges Haus"],
    ["Außenbereich", "komplett überdachte Glas-Terrasse"],
    ["Stimmung", "ruhig, hell und naturnah"],
    ["Lage", "Kisapáti"]
  ],
  experienceFacts: [
    ["Morgen", "Terrasse und ruhiger Start"],
    ["Wandern", "Szent György-hegy in der Nähe"],
    ["Balaton", "mit kurzer Fahrt erreichbar"],
    ["Anfrage", "über deutsche Kontaktseite"]
  ],
  highlights: ["Komplett überdachte Terrasse", "Große Glasflächen", "Zeugenberg-Panorama", "Große eigene Fläche", "Klimaanlage auf beiden Ebenen", "Zwei Badezimmer", "Guter Ausgangspunkt für Ausflüge"],
  reasons: [
    { iconKey: "mountain", title: "Zeugenberg-Panorama", text: "Csobánc, Gulács" },
    { iconKey: "terrace", title: "Glas-Terrasse", text: "mit Aussicht" },
    { iconKey: "leaf", title: "Große eigene Fläche", text: "Ruhe, Raum" },
    { iconKey: "trail", title: "Wanderbasis", text: "Wege in der Nähe" }
  ],
  geoDecision: {
    kicker: "Zsálya schnelle Antworten",
    title: "Dandelion Zsálya ist ein ruhiges, separates Hanghaus für 4 Gäste mit komplett überdachter Terrasse und Zeugenberg-Panorama",
    lead: "Zsálya bietet große Glasflächen, eine große eigene Fläche, zwei Ebenen, Klimaanlage auf beiden Ebenen und nahe Wanderwege für ruhige Tage im Balaton-Oberland.",
    questions: [
      {
        iconKey: "family",
        question: "Für wen ist Zsálya eine gute Wahl?",
        answer: "Zsálya eignet sich für Paare, kleinere Familien und Gäste, die ein separates Haus, eine große eigene Fläche und schöne Aussicht suchen."
      },
      {
        iconKey: "mountain",
        question: "Wie ist die Aussicht?",
        answer: "Von der Terrasse und durch die großen Glasflächen öffnet sich der Blick zu den Zeugenbergen, unter anderem Richtung Csobánc, Gulács und Tóti-hegy."
      },
      {
        iconKey: "terrace",
        question: "Was macht die Terrasse besonders?",
        answer: "Die Terrasse ist komplett überdacht und über große Glasflächen mit der Landschaft verbunden, deshalb funktioniert sie morgens, abends und bei wechselndem Wetter gut."
      },
      {
        iconKey: "guests",
        question: "Für wie viele Gäste ist Zsálya bequem?",
        answer: "Zsálya ist bequem für 4 Gäste und als zweistöckiges Gästehaus eingerichtet."
      },
      {
        iconKey: "bathroom",
        question: "Was gibt es im Haus?",
        answer: "Klimaanlage auf beiden Ebenen, eine ausgestattete Kochnische, zwei Badezimmer, Badewanne, separates WC und ein Wohnbereich mit Terrassenzugang."
      },
      {
        iconKey: "trail",
        question: "Für welche Programme ist Zsálya ein guter Ausgangspunkt?",
        answer: "Zsálya eignet sich gut für Wanderungen, Ausflüge zu den Zeugenbergen, Balaton-Programme und ruhigere Tage im Balaton-Oberland."
      }
    ],
    amenitiesTitle: "Was in Zsálya wichtig ist"
  },
  amenities: ["Komplett überdachte Terrasse", "Große Glasflächen", "Zeugenberg-Panorama", "Große eigene Fläche", "Klimaanlage auf beiden Ebenen", "Kochnische", "Zwei Badezimmer", "Wanderwege in der Nähe"],
  mapBody:
    "Zsálya liegt auf der ruhigeren Seite von Kisapáti, mit guter Nähe zu Szent György-hegy, Tapolca und Balaton-Ausflügen.",
  mapBenefits: [
    { label: "Ruhige Hanglage", icon: "trail" },
    { label: "Balaton-Oberland", icon: "route" },
    { label: "Weinberge und Spazierwege", icon: "grapes" }
  ],
  relatedSlot: "zsalya_card_image"
});

export const zsalyaGermanPageData = {
  ...zsalyaGermanBasePageData,
  reviews: {
    kicker: "Gästebewertungen",
    title: "Was Gäste sagen",
    intro: "Zsálya-spezifische Hinweise zur ruhigen Terrasse, Hanglage und zu Wanderungen am Szent György-hegy.",
    mobileSummaryLabel: "Weitere Bewertungen",
    mobileHighlightedAriaLabel: "Hervorgehobene Google-Bewertung",
    mobileMoreGoogleAriaLabel: "Weitere Google-Bewertungen",
    mobileBookingAriaLabel: "Booking.com Bewertungen",
    items: [
      {
        source: "Google" as const,
        quote: "Ein ruhiger Ort, von dem man leicht zu Wanderungen aufbricht und abends sehr gern zurückkommt.",
        meta: "Gast - Google - 5/5"
      },
      {
        source: "Google" as const,
        quote: "Die Terrasse und die Umgebung tragen viel zur Erholung bei; hier findet man schnell einen langsameren Rhythmus.",
        meta: "Gast - Google - 5/5"
      },
      {
        source: "Google" as const,
        quote: "Ein kleineres, aber durchdachtes und bequemes Haus für eine naturnahe Auszeit.",
        meta: "Gast - Google - 5/5"
      },
      {
        source: "Booking.com" as const,
        quote: "Freundliche, komfortable Unterkunft und ein sehr guter Ausgangspunkt, um den Szent György-hegy zu entdecken.",
        meta: "Gast - Booking.com - 9/10"
      },
      {
        source: "Booking.com" as const,
        quote: "Ruhig und angenehm, mit einer überdachten Terrasse, auf der man auch bei wechselndem Wetter gut sitzen kann.",
        meta: "Gast - Booking.com - 9/10"
      }
    ]
  }
};

import { createGermanAccommodationPage } from "./german-page-factory";
import { szololigetEnglishPageData } from "./szololiget.en";

export const szololigetGermanPageData = createGermanAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szőlőliget",
  route: "/de/szololiget/",
  listingAnchor: "szololiget-vendeghaz",
  location: "Kisapáti",
  region: "Szent György-hegy - Weinberge",
  guests: "4 Gäste + Zustellbett",
  character: "Panoramahaus mit großer Terrasse",
  shortDescription: "Separates zweistöckiges Haus für 4 Gäste plus Zustellbett, mit großer Terrasse, schön bepflanztem Garten und 180-Grad-Zeugenberg-Panorama.",
  lead:
    "Dandelion Szőlőliget ist ein ruhiger Rückzugsort am Osthang des Szent György-hegy für Gäste, die Terrasse, Sonnenaufgang und Panorama suchen.",
  longDescription: [
    "Die große Terrasse, der schön bepflanzte Garten und die Lage am Hang geben dem Haus seine stärkste Stimmung: viel Luft, Ruhe, Grün und Blick auf die Zeugenberge.",
    "Rund um das Haus wachsen viele besondere Pflanzen. Der Garten ist deshalb nicht nur Hintergrund, sondern ein wichtiger Teil des ruhigen, naturnahen Aufenthalts.",
    "Das Haus ist zweistöckig, für 4 Gäste bequem und mit einem Zustellbett erweiterbar. Es eignet sich gut für Paare, kleinere Familien und Gäste, die wandern oder Weingüter besuchen möchten.",
    "Szőlőliget ist keine trubelige Ferienanlage, sondern ein ruhiger Ausgangspunkt für Szent György-hegy, Basaltorgeln, Badacsony, Szigliget und Balaton-Tage."
  ],
  facts: [
    ["Gäste", "4 Gäste + Zustellbett"],
    ["Charakter", "separates zweistöckiges Haus"],
    ["Außenbereich", "große Terrasse"],
    ["Garten", "schön bepflanzt mit besonderen Pflanzen"],
    ["Panorama", "180-Grad-Blick auf Zeugenberge"],
    ["Lage", "Ostseite des Szent György-hegy"]
  ],
  experienceFacts: [
    ["Sonnenaufgang", "vom Bett aus sichtbar"],
    ["Terrasse", "großer Außenbereich"],
    ["Wandern", "Basaltorgeln und Szent György-hegy"],
    ["Balaton", "kurze Fahrt zu Strand und Orten"]
  ],
  highlights: ["Große Terrasse", "Schöner Garten", "180-Grad-Panorama", "Sonnenaufgang", "Ruhige Umgebung"],
  reasons: [
    { iconKey: "mountain", title: "Zeugenberg-Panorama", text: "180-Grad-Blick" },
    { iconKey: "terrace", title: "Große Terrasse", text: "ruhiger Außenbereich" },
    { iconKey: "sun", title: "Besondere Morgen", text: "Sonnenaufgang vom Bett" },
    { iconKey: "trail", title: "Guter Ausgangspunkt", text: "Szent György-hegy nah" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Große Terrasse", "Schön bepflanzter Garten", "180-Grad-Panorama", "Zustellbett"],
  geoDecision: {
    kicker: "Szőlőliget schnelle Antworten",
    title: "Szőlőliget ist eine gute Wahl, wenn ihr ein separates Panoramahaus mit schönem Garten am Szent György-hegy sucht",
    lead:
      "Szőlőliget bietet 4 Gästen plus Zustellbett einen ruhigen zweistöckigen Rückzugsort mit großer Terrasse, schön bepflanztem Garten, 180-Grad-Zeugenberg-Panorama und Sonnenaufgang vom Bett.",
    questions: [
      {
        question: "Für wen ist Szőlőliget eine gute Wahl?",
        answer:
          "Für Paare, kleinere Familien und Gäste, die ein ruhiges separates Haus in Kisapáti suchen, nahe Wanderwegen, Weingütern und Balaton-Oberland-Programmen."
      },
      {
        question: "Welche Aussicht hat Szőlőliget?",
        answer:
          "Von der großen Terrasse öffnet sich ein 180-Grad-Panorama auf die Zeugenberge, darunter Csobánc, Tóti-hegy und Gulács."
      },
      {
        question: "Wie viele Gäste wohnen bequem?",
        answer:
          "Das Haus ist für 4 Gäste bequem und kann mit einem Zustellbett erweitert werden. Die zweistöckige Aufteilung eignet sich gut für Paare, kleine Familien und Wanderurlauber."
      },
      {
        question: "Warum ist die Terrasse wichtig?",
        answer:
          "Die Terrasse ist groß und dadurch ein wichtiger Außenraum für Frühstück, langsame Nachmittage, Wein und ruhige Abende."
      },
      {
        question: "Wie ist der Garten bei Szőlőliget?",
        answer:
          "Der Garten ist sehr schön und mit vielen besonderen Pflanzen bepflanzt. Zusammen mit der Terrasse gibt er dem Haus eine ruhige, grüne und naturnahe Atmosphäre."
      },
      {
        question: "Für welche Programme ist das Haus gut?",
        answer:
          "Es ist ein guter Ausgangspunkt für Szent György-hegy, Basaltorgeln, lokale Weingüter, Badacsony, Szigliget und Balaton-Ausflüge mit kurzer Autofahrt."
      }
    ],
    amenitiesTitle: "Was in Szőlőliget wichtig ist"
  },
  mapBody:
    "Szőlőliget liegt in Kisapáti am Szent György-hegy, gut für Wanderungen, Weingüter, Zeugenberge und Balaton-Tage.",
  mapBenefits: [
    { label: "Weinberge rundherum", icon: "grapes" },
    { label: "Wanderwege in der Nähe", icon: "trail" },
    { label: "Balaton erreichbar", icon: "route" }
  ],
  relatedSlot: "szololiget_card_image"
});

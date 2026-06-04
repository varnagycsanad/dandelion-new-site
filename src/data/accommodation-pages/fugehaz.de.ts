import { createGermanAccommodationPage } from "./german-page-factory";
import { fugehazEnglishPageData } from "./fugehaz.en";

export const fugehazGermanPageData = createGermanAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fügeház",
  route: "/de/dandelion-fugehaz/",
  listingAnchor: "fugehaz",
  location: "Szent György-hegy",
  region: "Balaton-Oberland - Panorama",
  guests: "4-6 Gäste",
  character: "Panoramahaus mit Terrasse und Hot Tub",
  shortDescription: "Ruhiges Panoramahaus für 4-6 Gäste nahe Szent György-hegy.",
  lead:
    "Dandelion Fügeház ist für Gäste gemacht, die Aussicht, Terrassenzeit und eine ruhige Basis im Balaton-Oberland suchen.",
  longDescription: [
    "Das Haus hat eine klare, entspannte Aufteilung und eignet sich gut für Familien, Paare oder Freunde, die ein paar ruhige Tage zusammen verbringen möchten.",
    "Die Terrasse und die Aussicht prägen den Aufenthalt: morgens langsam starten, tagsüber die Umgebung erkunden und abends draußen sitzen.",
    "Fügeház gehört zu den Unterkünften mit Zugang zum Panorama Pool Bereich ab 15. Juni 2026."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Charakter", "Panorama und Terrassen"],
    ["Außenbereich", "Terrasse und Hot Tub"],
    ["Lage", "nahe Szent György-hegy"],
    ["Pool", "Panorama Pool Bereich"]
  ],
  experienceFacts: [
    ["Panorama", "Blick in die Hügellandschaft"],
    ["Hot Tub", "entspannte Abende draußen"],
    ["Panorama Pool", "ab 15. Juni 2026"],
    ["Umgebung", "Wein, Wandern und Balaton"]
  ],
  highlights: ["Panorama", "Terrasse", "Hot Tub", "Panorama Pool", "Ruhige Lage"],
  reasons: [
    { iconKey: "terrace", title: "Panorama-Terrassen", text: "Hügel, Abende" },
    { iconKey: "leaf", title: "Gut für Paare", text: "Ruhe, Aussicht" },
    { iconKey: "family", title: "Kleinere Familien", text: "4 Gäste, Extrabett" },
    { iconKey: "pool", title: "Sommer mit Pool", text: "Panorama Pool" }
  ],
  geoDecision: {
    kicker: "Fügeház schnelle Antworten",
    title: "Dandelion Fügeház passt, wenn Sie ein ruhiges, terrassenbetontes Panoramahaus nahe Szent György-hegy suchen",
    lead: "Fügeház ist bequem für 4 Gäste und mit Extrabett bis 6 Gäste erweiterbar. Es ist ein zweistöckiges Haus mit Panoramaterrassen, Grillmöglichkeit und Zugang zum Panorama Pool ab 15. Juni 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Hat Fügeház Zugang zum Pool?",
        answer: "Ja. Ab 15. Juni 2026 können Fügeház-Gäste den Panorama Pool zusammen mit den Gästen von D1 und D2 nutzen."
      },
      {
        iconKey: "family",
        question: "Für wen ist Dandelion Fügeház eine gute Wahl?",
        answer: "Fügeház passt vor allem zu Paaren, kleineren Familien und Gästen, die einen ruhigeren Aufenthalt im Balaton-Oberland suchen."
      },
      {
        iconKey: "guests",
        question: "Für wie viele Gäste ist Fügeház bequem?",
        answer: "Fügeház ist bequem für 4 Gäste und mit Extrabett bis 6 Gäste erweiterbar."
      },
      {
        iconKey: "home",
        question: "Worin unterscheidet sich Fügeház von D1 oder D2?",
        answer: "Fügeház wirkt intimer, panoramischer und stärker auf Terrassenzeit ausgerichtet. Für größere Gemeinschaftsbereiche passt D1 besser; für ein gartennahes Familienhaus ist D2 stärker."
      },
      {
        iconKey: "kitchen",
        question: "Welche Ausstattung gibt es in Fügeház?",
        answer: "Fügeház hat Panoramaterrassen, eine gut ausgestattete Küche, Grillmöglichkeit, Essplatz im Garten, Duschbad, zwei Ebenen und Zugang zum Panorama Pool."
      },
      {
        iconKey: "mountain",
        question: "Für welche Ausflüge ist Fügeház eine gute Basis?",
        answer: "Fügeház ist eine gute Basis für den Szent György-hegy, Badacsony, Csobánc, Tóti-hegy, Gulács, lokale Weingüter und Balaton-Strände."
      }
    ],
    amenitiesTitle: "Was in Fügeház wichtig ist"
  },
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse", "Hot Tub", "Parken", "Panorama Pool"],
  mapBody:
    "Fügeház liegt im Balaton-Oberland nahe Szent György-hegy, Badacsony, Tapolca und mehreren Aussichtspunkten.",
  mapBenefits: [
    { label: "Panorama und Hügel", icon: "trail" },
    { label: "Weingüter in Reichweite", icon: "grapes" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "fugehaz_card_image"
});

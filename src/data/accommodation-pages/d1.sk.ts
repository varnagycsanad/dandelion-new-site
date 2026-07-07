import { d1EnglishPageData } from "./d1.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

export const d1SlovakPageData = createSlovakAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/sk/dandelion-d1/",
  location: "Kisapáti / Szent György-hegy",
  region: "Balatonská vrchovina - Tapolcai-medence",
  guests: "6-8 hostí",
  character: "PRIESTRANNÝ DOM PRE RODINY A PRIATEĽOV",
  shortDescription: "Priestranný klimatizovaný dom v Kisapáti až pre 8 hostí, s 3 spálňami, terasou, grilom a sezónnym prístupom k Panorama Pool.",
  lead: "Dandelion D1 je dobrá voľba na spoločný pobyt, keď je dôležitý priestor, záhrada a jednoduché zázemie na výlety po Balatonskej vrchovine.",
  longDescription: [
    "D1 je najpriestrannejší klimatizovaný dom medzi ubytovaniami Dandelion a pohodlná voľba pre väčšie rodiny alebo skupiny priateľov. V dome sú 3 spálne a obývačka, takže dobre funguje aj pri pobyte viacerých hostí.",
    "Obývačka je hlavnou časťou domu a nadväzuje na veľkú, plne vybavenú kuchyňu a jedáleň. Odtiaľ sa vychádza na terasu, kde má ranná káva, spoločná večera alebo večerný rozhovor za dobrého počasia vlastnú atmosféru. Z terasy sa otvára výhľad na Csobánc, Tóti-hegy, Gulács a Badacsony. K dispozícii je vonkajší jedálenský set a možnosť grilovania.",
    "Priestranné usporiadanie domu, 3 samostatné spálne, obývačka, dve sprchové kúpeľňové časti a samostatné WC zabezpečujú pohodlie aj pre skupiny.",
    "D1 je dobrá voľba pre tých, ktorí hľadajú priestranný a pohodlný dom na objavovanie Balatonskej vrchoviny a zároveň si chcú oddýchnuť od všedných dní. Balaton, Szent György-hegy, Badacsony, Szigliget, Csobánc a vinárstva v okolí sú dostupné krátkou jazdou autom. Hostia D1 môžu využívať aj Panorama Pool, ktorý je k dispozícii hosťom D1, D2 a Fügeház."
  ],
  facts: [["Hostia", "6-8 hostí"], ["Spálne", "3 spálne"], ["Kúpeľne", "2 kúpeľne"], ["Exteriér", "záhrada a terasa"]],
  experienceFacts: [["Panorama Pool", "Panorama Pool od 15. júna 2026"], ["Pre skupiny", "viac priestoru na spoločný čas"], ["Výlety", "Szent György-hegy a Balaton"], ["Rytmus", "pokojné dni v prírode"]],
  highlights: ["Veľká záhrada", "Terasa", "3 spálne", "2 kúpeľne", "Panorama Pool", "Parkovanie"],
  reasons: [
    { iconKey: "guests", title: "Priestranný rodinný dom", text: "8 hostí, oddelené izby" },
    { iconKey: "garden", title: "Záhrada a terasa", text: "jedlo vonku" },
    { iconKey: "pool", title: "Letný pobyt", text: "Panorama Pool" },
    { iconKey: "trail", title: "Základňa pri kopcoch", text: "výlety a vinárstva" }
  ],
  amenities: ["3 spálne", "Pohodlná obývačka", "Dobre vybavená kuchyňa", "Panoramatická terasa", "Možnosť grilovania", "Klimatizácia", "Práčka", "Umývačka riadu", "Gigabitový internet"],
  geoDecision: {
    kicker: "D1 rýchle odpovede",
    title: "Dandelion D1 je dobrá voľba, ak hľadáte priestranný dom v Kisapáti s prístupom k Panorama Pool",
    lead: "D1 je pripravený pre väčšie rodiny a skupiny priateľov: až 8 hostí, panoramatická terasa, priestranné časti a Panorama Pool od 15. júna 2026.",
    questions: [
      { iconKey: "pool", question: "Má Dandelion D1 prístup k bazénu?", answer: "Áno. Od 15. júna 2026 môžu hostia D1 využívať Panorama Pool." },
      { iconKey: "pool", question: "Je bazén súkromný iba pre D1?", answer: "Nie. Panorama Pool nie je súkromný bazén iba pre D1; v sezóne je k dispozícii hosťom D1, D2 a Fügeház." },
      { iconKey: "guests", question: "Pre koľko hostí je Dandelion D1 pohodlný?", answer: "Dandelion D1 je pohodlný až pre 8 hostí, s 3 spálňami, obývačkou a viacerými kúpeľňami." },
      { iconKey: "mountain", question: "Na aké výlety je D1 dobrá základňa?", answer: "Z Kisapáti sú krátkou jazdou dostupné Szent György-hegy, Badacsony, Szigliget, Csobánc, Balaton aj miestne vinárstva." },
      { iconKey: "kitchen", question: "Aké vybavenie má D1?", answer: "D1 má dobre vybavenú kuchyňu, umývačku riadu, práčku, klimatizáciu, pohodlnú obývačku, panoramatickú terasu a možnosť grilovania." },
      { iconKey: "wifi", question: "Má Dandelion D1 rýchly internet?", answer: "Áno. V Dandelion D1 je gigabitový internet, takže dom je praktický aj na dlhšie pobyty a pokojnejšiu online prácu." }
    ],
    amenitiesTitle: "Čo je v dome dôležité"
  },
  mapBody: "Dandelion D1 leží v Kisapáti, v dosahu Szent György-hegy, Tapolcai-medence, viníc a Balatonu.",
  mapBenefits: [{ label: "Szent György-hegy nablízku", icon: "trail" }, { label: "Pre väčšiu skupinu", icon: "users" }, { label: "Balaton dostupný autom", icon: "route" }]
});

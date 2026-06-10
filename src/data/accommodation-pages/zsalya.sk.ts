import { zsalyaEnglishPageData } from "./zsalya.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

const zsalyaSlovakBasePageData = createSlovakAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsálya",
  route: "/sk/dandelion-zsalya/",
  location: "Kisapáti / Szent György-hegy",
  region: "Szent György-hegy - Kisapáti",
  guests: "4 hostia",
  character: "POKOJNÝ SAMOSTATNÝ DOM S PRESKLENOU TERASOU",
  shortDescription: "Pokojný samostatný dom pre 4 hostí pri Szent György-hegy, s úplne krytou presklenou terasou a výhľadom na svedecké vrchy.",
  lead: "Zsálya je prirodzene pokojná voľba pre hostí, ktorí chcú samostatný dom, veľký vlastný priestor, výhľady a turistické trasy v okolí.",
  longDescription: [
    "Dom pôsobí súkromne a pokojne. Úplne krytá presklená terasa predlžuje obytný priestor smerom von a dobre funguje na raňajky aj večerné posedenie.",
    "Poloha je vhodná na krátke výlety, víno, turistiku a oddych mimo rušného balatonského centra.",
    "Zsálya je dobrá voľba pre páry, menšie rodiny alebo priateľov, ktorí chcú pokoj, priestor a výhľady."
  ],
  facts: [["Hostia", "4 hostia"], ["Dom", "samostatný dvojpodlažný dom"], ["Terasa", "úplne krytá presklená terasa"], ["Atmosféra", "pokoj, svetlo a súkromie"]],
  experienceFacts: [["Szent György-hegy", "trasy a výhľady nablízku"], ["Balaton", "krátka jazda autom"], ["Víno", "vinárstva v regióne"], ["Tempo", "pomalé dni"]],
  highlights: ["Úplne krytá terasa", "Veľké presklené plochy", "Výhľad na svedecké vrchy", "Veľký vlastný priestor", "Klimatizácia na oboch podlažiach", "Dve kúpeľne", "Turistické trasy nablízku"],
  reasons: [
    { iconKey: "mountain", title: "Výhľad na vrchy", text: "Csobánc, Gulács" },
    { iconKey: "terrace", title: "Presklená terasa", text: "s výhľadom" },
    { iconKey: "leaf", title: "Veľký vlastný priestor", text: "pokoj, miesto" },
    { iconKey: "trail", title: "Turistická základňa", text: "trasy nablízku" }
  ],
  geoDecision: {
    kicker: "Zsálya rýchle odpovede",
    title: "Dandelion Zsálya je pokojný samostatný dom vo svahu pre 4 hostí, s úplne krytou terasou a výhľadom na svedecké vrchy",
    lead: "Zsálya ponúka veľké presklené plochy, veľký vlastný priestor, dve podlažia, klimatizáciu na oboch podlažiach a turistické trasy v okolí.",
    questions: [
      { iconKey: "family", question: "Pre koho je Zsálya dobrá voľba?", answer: "Zsálya sa hodí pre páry, menšie rodiny a hostí, ktorí hľadajú samostatný dom, veľký vlastný priestor a pekné výhľady." },
      { iconKey: "mountain", question: "Aký je výhľad?", answer: "Z terasy a cez veľké presklené plochy sa otvára výhľad na svedecké vrchy, napríklad smerom na Csobánc, Gulács a Tóti-hegy." },
      { iconKey: "terrace", question: "Čím je terasa výnimočná?", answer: "Terasa je úplne krytá a veľkými presklenými plochami nadväzuje na krajinu, takže dobre funguje ráno, večer aj pri premenlivom počasí." },
      { iconKey: "guests", question: "Pre koľko hostí je Zsálya pohodlná?", answer: "Zsálya je pohodlná pre 4 hostí a je riešená ako dvojpodlažný dom." },
      { iconKey: "bathroom", question: "Čo je v dome?", answer: "Klimatizácia na oboch podlažiach, vybavený kuchynský kút, dve kúpeľne, vaňa, samostatné WC a obytná časť so vstupom na terasu." },
      { iconKey: "trail", question: "Na aké programy je Zsálya dobrá základňa?", answer: "Zsálya je dobrá na turistiku, výlety medzi svedeckými vrchmi, balatonské programy a pokojnejšie dni v Balatonskej vrchovine." }
    ],
    amenitiesTitle: "Čo je v Zsálya dôležité"
  },
  amenities: ["Úplne krytá terasa", "Veľké presklené plochy", "Výhľad na svedecké vrchy", "Veľký vlastný priestor", "Klimatizácia na oboch podlažiach", "Kuchynský kút", "Dve kúpeľne", "Turistické trasy nablízku"],
  mapBody: "Zsálya leží na východnej strane Szent György-hegy, odkiaľ sa dá ľahko vyraziť na vyhliadky, k Balatonu aj do viníc.",
  mapBenefits: [{ label: "Pokojná poloha", icon: "leaf" }, { label: "Kopce nablízku", icon: "trail" }, { label: "Balaton krátkou jazdou", icon: "route" }]
});

export const zsalyaSlovakPageData = {
  ...zsalyaSlovakBasePageData,
  reviews: {
    ...zsalyaSlovakBasePageData.reviews,
    intro: "Poznámky k pokojnej terase, polohe vo svahu a výletom pri Szent György-hegy.",
    items: [
      { source: "Google" as const, quote: "Pokojné miesto, odkiaľ sa ľahko vyráža na výlety a večer sa sem dobre vracia.", meta: "Hosť - Google - 5/5" },
      { source: "Google" as const, quote: "Terasa a okolitá krajina veľmi pridávajú k oddychu; človek tu rýchlo spomalí.", meta: "Hosť - Google - 5/5" },
      { source: "Google" as const, quote: "Menší, ale premyslený a pohodlný dom na oddych blízko prírody.", meta: "Hosť - Google - 5/5" },
      { source: "Booking.com" as const, quote: "Príjemné a pohodlné ubytovanie, veľmi dobrý východiskový bod na objavovanie Szent György-hegy.", meta: "Hosť - Booking.com - 9/10" },
      { source: "Booking.com" as const, quote: "Tiché a pokojné miesto, kde sa dobre sedí na krytej terase aj pri premenlivom počasí.", meta: "Hosť - Booking.com - 9/10" }
    ]
  }
};

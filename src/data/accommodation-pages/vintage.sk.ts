import { vintageEnglishPageData } from "./vintage.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

export const vintageSlovakPageData = createSlovakAccommodationPage(vintageEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Vintage",
  route: "/sk/dandelion-vintage/",
  location: "Nemesgulács / Balatonská vrchovina",
  region: "Nemesgulács - Balatonská vrchovina",
  guests: "4 hostia",
  character: "ÚTULNÝ PENZIÓN S VLASTNÝM DVOROM",
  shortDescription: "Útulný dom v Nemesgulácsi s vlastným dvorom, pokojnou atmosférou a dobrou polohou na výlety.",
  lead: "Dandelion Vintage je menší, pokojnejší dom pre hostí, ktorí chcú jednoduché zázemie, vlastný dvor a dobrú dostupnosť Balatonu aj kopcov.",
  longDescription: [
    "Vintage má vidiecky charakter a komornejšiu mierku. Vlastný dvor vytvára príjemný priestor na ráno, oddych aj večerné posedenie.",
    "Nemesgulács je dobrá základňa pre Badacsony, Szent György-hegy, Tapolcai-medence a balatonské programy.",
    "Dom je vhodný pre menšiu rodinu, pár alebo priateľov, ktorí hľadajú pokojnú, nie príliš hotelovú atmosféru."
  ],
  facts: [["Hostia", "až 4 hostia"], ["Spálne", "2 spálne"], ["Exteriér", "vlastný dvor"], ["Poloha", "Nemesgulács"]],
  experienceFacts: [["Badacsony", "výlety a víno"], ["Balaton", "krátka jazda"], ["Kopce", "Szent György-hegy a okolie"], ["Pokoj", "menší dom"]],
  highlights: ["Vlastný dvor", "2 spálne", "Kuchyňa", "Pokojná poloha", "Parkovanie", "Vonkajšie posedenie"],
  reasons: [
    { iconKey: "leaf", title: "Vlastný dvor", text: "súkromný vonkajší čas" },
    { iconKey: "home", title: "Útulný dom", text: "menšia mierka" },
    { iconKey: "route", title: "Dobrá poloha", text: "Balaton a Badacsony" },
    { iconKey: "grapes", title: "Vinársky región", text: "výlety do okolia" }
  ],
  amenities: ["Wi-Fi", "Kuchyňa", "Vlastný dvor", "Kúrenie", "Parkovanie", "Vonkajšie posedenie", "Kúpeľňa", "Pokojná poloha"],
  geoDecision: {
    kicker: "Vintage rýchle odpovede",
    title: "Dandelion Vintage je dobrá voľba, ak hľadáte pokojný dom s vlastným dvorom v Nemesgulácsi, blízko Balatonu a Badacsonyu",
    lead: "Vintage je útulný dom pre 4 hostí s 2 spálňami, obývačkou, vlastným dvorom, možnosťou grilovania, klimatizáciou, silným internetom a pokojnou vidieckou atmosférou.",
    questions: [
      { question: "Pre koho je Dandelion Vintage vhodný?", answer: "Pre menšie rodiny, páry a priateľov, ktorí hľadajú domácky dom s vlastným dvorom v Nemesgulácsi, blízko programov pri Balatone a výletov v Balatonskej vrchovine." },
      { question: "Pre koľko hostí je Vintage pohodlný?", answer: "Dom je pohodlný pre 4 hostí. Má dve spálne: jednu s manželskou posteľou a druhú s dvoma samostatnými lôžkami; obývačka slúži ako spoločný priestor." },
      { question: "Aký je dvor pri Vintage?", answer: "Vlastný dvor je jednou z hlavných výhod domu: hodí sa na raňajky vonku, večerné posedenie, grilovanie aj pomalšie vidiecke dni." },
      { question: "Na aké programy je Nemesgulács dobrým východiskovým bodom?", answer: "Je praktickou základňou pre Badacsony, Szigliget, svedecké vrchy, balatonské pláže, vinárstva a kratšie výlety v okolí." },
      { question: "Dá sa odtiaľto pokojne pracovať?", answer: "Áno. Dom má silný gigabitový internet a klimatizáciu, takže sa hodí aj na pokojnú prácu, dlhší pobyt alebo kombináciu oddychu a práce." },
      { question: "Čo vytvára atmosféru Vintage?", answer: "Teplé vintage detaily, samostatná kuchyňa, vlastný dvor a pokojná poloha v Nemesgulácsi spolu vytvárajú pomalší vidiecky rytmus domu." }
    ],
    amenitiesTitle: "Čo je vo Vintage dôležité"
  },
  mapBody: "Dandelion Vintage leží v Nemesgulácsi, prakticky medzi Balatonom, Badacsonyom a kopcami Balatonskej vrchoviny.",
  mapBenefits: [{ label: "Vlastný dvor", icon: "leaf" }, { label: "Badacsony nablízku", icon: "grapes" }, { label: "Balaton krátkou jazdou", icon: "route" }]
});

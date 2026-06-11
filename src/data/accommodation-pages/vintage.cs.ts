import { vintageEnglishPageData } from "./vintage.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const vintageCzechPageData = createCzechAccommodationPage(vintageEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Vintage",
  route: "/cs/dandelion-vintage/",
  location: "Nemesgulács / Balatonská vrchovina",
  region: "Nemesgulács - Balatonská vrchovina",
  guests: "4 hosté",
  character: "ÚTULNÝ PENZION S VLASTNÍM DVOREM",
  shortDescription: "Útulný dům v Nemesgulácsi s vlastním dvorem, klidnou atmosférou a dobrou polohou pro výlety.",
  lead: "Dandelion Vintage je menší, klidnější dům pro hosty, kteří chtějí jednoduché zázemí, vlastní dvůr a dobrou dostupnost Balatonu i kopců.",
  longDescription: [
    "Vintage má venkovský charakter a komornější měřítko. Vlastní dvůr vytváří příjemný prostor pro ráno, odpočinek i večerní posezení.",
    "Nemesgulács je dobrá základna pro Badacsony, Szent György-hegy, Tapolcai-medence a balatonské programy.",
    "Dům je vhodný pro menší rodinu, pár nebo přátele, kteří hledají klidnou, nepřehnaně hotelovou atmosféru."
  ],
  facts: [["Hosté", "až 4 hosté"], ["Ložnice", "2 ložnice"], ["Exteriér", "vlastní dvůr"], ["Poloha", "Nemesgulács"]],
  experienceFacts: [["Badacsony", "výlety a víno"], ["Balaton", "krátká jízda"], ["Kopce", "Szent György-hegy a okolí"], ["Klid", "menší dům"]],
  highlights: ["Vlastní dvůr", "2 ložnice", "Kuchyně", "Klidná poloha", "Parkování", "Venkovní posezení"],
  reasons: [
    { iconKey: "leaf", title: "Vlastní dvůr", text: "soukromý venkovní čas" },
    { iconKey: "home", title: "Útulný dům", text: "menší měřítko" },
    { iconKey: "route", title: "Dobrá poloha", text: "Balaton a Badacsony" },
    { iconKey: "grapes", title: "Vinařský region", text: "výlety do okolí" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Vlastní dvůr", "Topení", "Parkování", "Venkovní posezení", "Koupelna", "Klidná poloha"],
  geoDecision: {
    kicker: "Vintage rychlé odpovědi",
    title: "Dandelion Vintage je dobrá volba, pokud hledáte klidný dům s vlastním dvorem v Nemesgulácsi, blízko Balatonu a Badacsony",
    lead:
      "Vintage je útulný dům pro 4 hosty se 2 ložnicemi, obývacím pokojem, vlastním dvorem, možností grilování, klimatizací, silným internetem a klidnou venkovskou atmosférou.",
    questions: [
      {
        question: "Pro koho je Dandelion Vintage vhodný?",
        answer:
          "Pro menší rodiny, páry a přátele, kteří hledají domácí dům s vlastním dvorem v Nemesgulácsi, blízko programů u Balatonu a výletů v Balatonské vrchovině."
      },
      {
        question: "Pro kolik hostů je Vintage pohodlný?",
        answer:
          "Dům je pohodlný pro 4 hosty. Má dvě ložnice: jednu s manželskou postelí a druhou se dvěma samostatnými lůžky; obývací pokoj slouží jako společný prostor."
      },
      {
        question: "Jaký je dvůr u Vintage?",
        answer:
          "Vlastní dvůr je jednou z hlavních výhod domu: hodí se na snídani venku, večerní posezení, grilování i pomalejší venkovské dny."
      },
      {
        question: "Na jaké programy je Nemesgulács dobrým výchozím bodem?",
        answer:
          "Je praktickou základnou pro Badacsony, Szigliget, svědecké kopce, balatonské pláže, vinařství a kratší výlety v okolí."
      },
      {
        question: "Dá se odtud klidně pracovat?",
        answer:
          "Ano. Dům má silný gigabitový internet a klimatizaci, takže se hodí i pro klidnou práci, delší pobyt nebo kombinaci odpočinku a práce."
      },
      {
        question: "Co vytváří atmosféru Vintage?",
        answer:
          "Teplé vintage detaily, samostatná kuchyně, vlastní dvůr a klidná poloha v Nemesgulácsi společně vytvářejí pomalejší venkovský rytmus domu."
      }
    ],
    amenitiesTitle: "Co je ve Vintage důležité"
  },
  mapBody: "Dandelion Vintage leží v Nemesgulácsi, prakticky mezi Balatonem, Badacsonyi a kopci Balatonské vrchoviny.",
  mapBenefits: [{ label: "Vlastní dvůr", icon: "leaf" }, { label: "Badacsony poblíž", icon: "grapes" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});

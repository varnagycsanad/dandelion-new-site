import { vintageEnglishPageData } from "./vintage.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const vintageCzechPageData = createCzechAccommodationPage(vintageEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Vintage",
  route: "/cs/dandelion-vintage/",
  location: "Nemesgulács / Balatonská vrchovina",
  region: "Nemesgulács - Balatonská vrchovina",
  guests: "4 hosté",
  character: "UTULNY PENZION S VLASTNIM DVOREM",
  shortDescription: "Útulný dům v Nemesgulácsi s vlastním dvorem, klidnou atmosferou a dobrou polohou pro výlety.",
  lead: "Dandelion Vintage je menší, klidnéjsi dům pro hosty, kteri chteji jednoduché zazemi, vlastní dvůr a dobrou dostupnost Balatonu i kopcu.",
  longDescription: [
    "Vintage ma venkovsky charakter a komornejsi meritko. Vlastní dvůr vytvari prijemny prostor pro ráno, odpocinek i večerni posezení.",
    "Nemesgulács je dobra základna pro Badacsony, Szent György-hegy, Tapolcai-medence a balatonské programy.",
    "Dům je vhodny pro menší rodinu, par nebo přátele, kteri hledaji klidnou, neprehnane hotelovou atmosferu."
  ],
  facts: [["Hosté", "až 4 hosté"], ["Ložnice", "2 ložnice"], ["Exterier", "vlastní dvůr"], ["Poloha", "Nemesgulács"]],
  experienceFacts: [["Badacsony", "výlety a víno"], ["Balaton", "krátká jízda"], ["Kopce", "Szent György-hegy a okolí"], ["Klid", "menší dům"]],
  highlights: ["Vlastní dvůr", "2 ložnice", "Kuchyně", "Klidná poloha", "Parkování", "Venkovní posezení"],
  reasons: [
    { iconKey: "leaf", title: "Vlastní dvůr", text: "soukromy venkovní čas" },
    { iconKey: "home", title: "Útulný dům", text: "menší meritko" },
    { iconKey: "route", title: "Dobra poloha", text: "Balaton a Badacsony" },
    { iconKey: "grapes", title: "Vinařský region", text: "výlety do okolí" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Vlastní dvůr", "Topení", "Parkování", "Venkovní posezení", "Koupelna", "Klidná poloha"],
  mapBody: "Dandelion Vintage lezi v Nemesgulácsi, prakticky mezi Balatonem, Badacsonyi a kopci Balatonské vrchoviny.",
  mapBenefits: [{ label: "Vlastní dvůr", icon: "leaf" }, { label: "Badacsony poblíž", icon: "grapes" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});

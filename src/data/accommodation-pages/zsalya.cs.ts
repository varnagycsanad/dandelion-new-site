import { zsalyaEnglishPageData } from "./zsalya.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const zsalyaCzechPageData = createCzechAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsálya",
  route: "/cs/dandelion-zsalya/",
  location: "Kisapáti / Szent György-hegy",
  region: "Szent György-hegy - Kisapáti",
  guests: "2-4 hosté",
  character: "KLIDNÝ SAMOSTATNÝ PENZION S TERASOU",
  shortDescription: "Menší samostatný dům pro páry, rodinu nebo přátele, s krytou terasou a klidnou polohou u Szent György-hegy.",
  lead: "Zsálya je přirozeně klidná volba pro hosty, kteří chtějí soukromí, pomalý rytmus a blízkost kopců i Balatonu.",
  longDescription: [
    "Dům působí soukromě a jednoduše. Krytá terasa prodlužuje obytný prostor ven a dobře funguje pro snídaně i večerní posezení.",
    "Poloha je vhodná pro krátké výlety, víno, turistiku a odpočinek mimo rušné balatonské centrum.",
    "Zsálya je dobrá volba pro páry, menší rodiny nebo přátele, kteří nechtějí velký dům."
  ],
  facts: [["Hosté", "2-4 hosté"], ["Ložnice", "2 ložnice"], ["Terasa", "krytá terasa"], ["Atmosféra", "klid a soukromí"]],
  experienceFacts: [["Szent György-hegy", "trasy a výhledy poblíž"], ["Balaton", "krátká jízda autem"], ["Víno", "vinařství v regionu"], ["Tempo", "pomalé dny"]],
  highlights: ["Krytá terasa", "Klimatizace", "Kuchyně", "Soukromi", "Parkování", "Klidná poloha"],
  reasons: [
    { iconKey: "terrace", title: "Krytá terasa", text: "venku i pri zméně počasi" },
    { iconKey: "leaf", title: "Klid", text: "mimo rušné centrum" },
    { iconKey: "users", title: "Menší pobyt", text: "páry a malá rodina" },
    { iconKey: "route", title: "Dobra dostupnost", text: "kopce i Balaton" }
  ],
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyně", "Terasa", "Topení", "Parkování", "Koupelna", "Venkovní posezení"],
  mapBody: "Zsálya leží na východní straně Szent György-hegy, odkud se dá snadno vyrazit na vyhlídky, k Balatonu i do vinic.",
  mapBenefits: [{ label: "Klidná poloha", icon: "leaf" }, { label: "Kopce poblíž", icon: "trail" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});

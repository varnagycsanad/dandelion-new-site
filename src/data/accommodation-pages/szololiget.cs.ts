import { szololigetEnglishPageData } from "./szololiget.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const szololigetCzechPageData = createCzechAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szőlőliget",
  route: "/cs/szololiget/",
  location: "Kisapáti / Szent György-hegy",
  region: "Vinice u Szent György-hegy",
  guests: "2-4 hosté",
  character: "POBYT MEZI VINICEMI S TERASOU A VYHLEDEM",
  shortDescription: "Samostatný dům pro pomalé dny mezi vinicemi, s terasou, výhledem a prirozenym klidem.",
  lead: "Szőlőliget je vhodny pro hosty, kteri chteji byt blízko krajiny, vina a turistickych tras, ale mit vlastní klidný prostor.",
  longDescription: [
    "Terasa a poloha ve svahu davaji domu otevreny, venkovsky charakter. Je to misto pro pomalé ráno, výhledy a jednoduché dny venku.",
    "Dům se hodi pro par, menší rodinu nebo hosty, kteri hledaji přírodní zakladnu pro Szent György-hegy a Balaton.",
    "Okolí je dobře pro krátké prochazky, vinařské zastavky a výlety smerem Badacsony nebo Szigliget."
  ],
  facts: [["Hosté", "2-4 hosté"], ["Poloha", "mezi vinicemi"], ["Terasa", "venkovní posezení"], ["Charakter", "klidný dům ve svahu"]],
  experienceFacts: [["Víno", "vinice a sklepy poblíž"], ["Turistika", "Szent György-hegy"], ["Balaton", "krátká jízda"], ["Odpocinek", "výhled a ticho"]],
  highlights: ["Terasa", "Výhled", "Kuchyně", "Klimatizace", "Parkování", "Vinařská oblast"],
  reasons: [
    { iconKey: "grapes", title: "Vinice", text: "krajina hned kolem" },
    { iconKey: "terrace", title: "Terasa", text: "venkovní rytmus" },
    { iconKey: "trail", title: "Turistika", text: "Szent György-hegy" },
    { iconKey: "leaf", title: "Klid", text: "maly dům pro odpocinek" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Terasa", "Klimatizace", "Topení", "Parkování", "Koupelna", "Venkovní posezení"],
  mapBody: "Szőlőliget je v oblasti Kisapáti a Szent György-hegy, s dobrou dostupnosti vinic, vyhlidek, Balatonu a Badacsonye.",
  mapBenefits: [{ label: "Vinice poblíž", icon: "grapes" }, { label: "Výhledy a trasy", icon: "trail" }, { label: "Balaton dostupný autem", icon: "route" }]
});

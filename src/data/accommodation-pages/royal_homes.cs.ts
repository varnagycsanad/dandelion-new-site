import { royalHomesEnglishPageData } from "./royal_homes.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const royalHomesCzechPageData = createCzechAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/cs/royal/",
  location: "Keszthely / Balaton",
  region: "Keszthely - Balaton",
  guests: "4-6 hostů",
  character: "APARTMÁN BLÍZKO BALATONU",
  shortDescription: "Pohodlný apartmán v Keszthelyi, vhodný pro balatonské dny, procházky a jednodušší městský rytmus.",
  lead: "Royal Homes je dobrá volba pro hosty, kteří chtějí být blízko Balatonu, Keszthelye a programů u vody, ale zůstat v klidném zázemí.",
  longDescription: [
    "Apartmán spojuje pohodlné ubytování s balatonskou polohou. Hodí se pro rodinu nebo pár, který chce trávit čas u vody a mít vše prakticky blízko.",
    "Keszthely nabízí procházky, pláže, restaurace i výletní směr k Hévízu nebo severnímu břehu Balatonu.",
    "Pobyt je více balatonský a městský než domy u Szent György-hegy, ale pořád zůstává v klidném stylu Dandelion."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Poloha", "Keszthely / Balaton"], ["Typ", "apartmán"], ["Vhodné pro", "balatonské dny"]],
  experienceFacts: [["Balaton", "voda a procházky"], ["Keszthely", "město a programy"], ["Hévíz", "výletní směr"], ["Rodiny", "praktická poloha"]],
  highlights: ["Apartmán", "Terasa", "Kuchyně", "Klimatizace", "Balaton poblíž", "Parkování"],
  reasons: [
    { iconKey: "balaton", title: "Balaton", text: "blízko vody" },
    { iconKey: "home", title: "Apartmán", text: "pohodlné zázemí" },
    { iconKey: "route", title: "Keszthely", text: "programy poblíž" },
    { iconKey: "users", title: "Rodinná volba", text: "praktický pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Klimatizace", "Terasa", "Koupelna", "Topení", "Parkování", "Balaton poblíž"],
  mapBody: "Royal Homes leží v Keszthelyi, v dobré poloze pro balatonské pláže, promenády, restaurace a výlety v západní části jezera.",
  mapBenefits: [{ label: "Balaton poblíž", icon: "balaton" }, { label: "Keszthely programy", icon: "route" }, { label: "Pohodlný apartmán", icon: "home" }]
});

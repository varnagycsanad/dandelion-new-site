import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const szepvolgyiCzechPageData = createCzechAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szépvölgyi",
  route: "/cs/szepvolgyi/",
  location: "Badacsonyörs / Balaton",
  region: "Badacsonyörs - Balaton",
  guests: "až 8 hostů",
  character: "VELKÝ DŮM S BALATONSKÝM PANORAMATEM",
  shortDescription: "Prostorný dům u Badacsonyörs až pro 8 hostů, s výhledem na Balaton a dobrým zázemím pro rodiny.",
  lead: "Szépvölgyi je pro větší rodinu nebo skupinu, která chce být blízko Balatonu, Badacsonye a mít dost prostoru pro společný pobyt.",
  longDescription: [
    "Dům nabízí více ložnic, zahradu a praktické zázemí pro delší pobyt. Výhled na Balaton dává pobytu silný letní charakter.",
    "Poloha u Badacsonyörs je dobrá pro pláže, večerní programy v Badacsonyi, Folly Arboretum i výlety směrem Szigliget.",
    "Szépvölgyi dobře funguje, když chcete kombinovat vodu, víno, výhled a společný čas ve větším domě."
  ],
  facts: [["Hosté", "až 8 hostů"], ["Ložnice", "4 ložnice"], ["Koupelny", "2 koupelny"], ["Poloha", "Badacsonyörs / Balaton"]],
  experienceFacts: [["Balaton", "pláže a promenády poblíž"], ["Badacsony", "víno a večeře"], ["Výhled", "balatonské panorama"], ["Rodiny", "více prostoru"]],
  highlights: ["4 ložnice", "2 koupelny", "Balatonské panorama", "Zahrada", "Kuchyně", "Parkování"],
  reasons: [
    { iconKey: "guests", title: "Až 8 hostů", text: "pro větší skupinu" },
    { iconKey: "balaton", title: "Balaton", text: "voda a výhled" },
    { iconKey: "home", title: "Prostor", text: "více loznic" },
    { iconKey: "route", title: "Badacsony", text: "programy poblíž" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Zahrada", "Terasa", "2 koupelny", "Parkování", "Topení", "Venkovní posezení"],
  mapBody: "Szépvölgyi leží v Badacsonyörs, odkud je blízko k Balatonu, Badacsonyi, plážím, vínům i rodinným programům.",
  mapBenefits: [{ label: "Balaton poblíž", icon: "balaton" }, { label: "Badacsony a víno", icon: "grapes" }, { label: "Pro větší rodiny", icon: "users" }]
});

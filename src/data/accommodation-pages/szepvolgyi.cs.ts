import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const szepvolgyiCzechPageData = createCzechAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szépvölgyi",
  route: "/cs/szepvolgyi/",
  location: "Badacsonyörs / Balaton",
  region: "Badacsonyörs - Balaton",
  guests: "až 8 hostů",
  character: "VELKY DUM S BALATONSKYM PANORAMATEM",
  shortDescription: "Prostorný dům u Badacsonyörs až pro 8 hostů, s výhledem na Balaton a dobrým zazemim pro rodiny.",
  lead: "Szépvölgyi je pro větší rodinu nebo skupinu, ktera chce byt blízko Balatonu, Badacsonye a mit dost prostoru pro společný pobyt.",
  longDescription: [
    "Dům nabizi více loznic, zahradu a prakticke zazemi pro delsi pobyt. Výhled na Balaton dava pobytu silny letni charakter.",
    "Poloha u Badacsonyörs je dobra pro plaze, večerni programy v Badacsonyi, Folly Arboretum i výlety smerem Szigliget.",
    "Szépvölgyi dobře funguje, kdyz chcete kombinovat vodu, víno, výhled a společný čas ve větším dome."
  ],
  facts: [["Hosté", "až 8 hostů"], ["Ložnice", "4 ložnice"], ["Koupelny", "2 koupelny"], ["Poloha", "Badacsonyörs / Balaton"]],
  experienceFacts: [["Balaton", "plaze a promenady poblíž"], ["Badacsony", "víno a večere"], ["Výhled", "balatonské panorama"], ["Rodiny", "více prostoru"]],
  highlights: ["4 ložnice", "2 koupelny", "Balatonské panorama", "Zahrada", "Kuchyně", "Parkování"],
  reasons: [
    { iconKey: "guests", title: "Až 8 hostů", text: "pro větší skupinu" },
    { iconKey: "balaton", title: "Balaton", text: "voda a výhled" },
    { iconKey: "home", title: "Prostor", text: "více loznic" },
    { iconKey: "route", title: "Badacsony", text: "programy poblíž" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Zahrada", "Terasa", "2 koupelny", "Parkování", "Topení", "Venkovní posezení"],
  mapBody: "Szépvölgyi lezi v Badacsonyörs, odkud je blízko k Balatonu, Badacsonyi, plazim, vinum i rodinným programum.",
  mapBenefits: [{ label: "Balaton poblíž", icon: "balaton" }, { label: "Badacsony a víno", icon: "grapes" }, { label: "Pro větší rodiny", icon: "users" }]
});

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
  geoDecision: {
    kicker: "Szépvölgyi rychlé odpovědi",
    title: "Szépvölgyi je dobrá volba, pokud větší rodina nebo skupina přátel hledá prostorný dům s výhledem na Balaton a vlastní zahradou v Badacsonyörs",
    lead:
      "Szépvölgyi je pohodlný až pro 8 hostů, má 4 ložnice, 2 koupelny, uzavřenou zahradu, panoramatickou terasu, možnost grilování a balatonské programy poblíž.",
    questions: [
      {
        question: "Pro koho je Szépvölgyi vhodný?",
        answer:
          "Pro větší rodiny a skupiny přátel, které hledají v Badacsonyörs prostorný dům s vlastní zahradou a výhledem na Balaton, blízko pláže, přístavu a programů v Badacsonyi."
      },
      {
        question: "Pro kolik hostů je Szépvölgyi pohodlný?",
        answer:
          "Dům je pohodlný až pro 8 hostů. Má 4 ložnice a 2 koupelny, takže dobře funguje pro větší rodinu nebo skupinu."
      },
      {
        question: "Jaký je výhled z terasy?",
        answer:
          "Z terasy je výhled na Balaton. Je to jedna z nejsilnějších částí domu a vytváří krásné pozadí pro snídaně, večerní posezení i společný odpočinek."
      },
      {
        question: "Jaká je zahrada a venkovní prostor?",
        answer:
          "Uzavřená zahrada má parkování pro dvě auta. Terasový nábytek a gril dělají venkovní čas pohodlný a praktický."
      },
      {
        question: "Jaké programy jsou poblíž?",
        answer:
          "Pláž, přístav a cyklostezka jsou snadno dostupné. Folly Arboretum, hrad Szigliget, vinařské trasy v Badacsonyi, gastroprogramy a festivaly jsou dobré cíle v okolí."
      },
      {
        question: "Čím se liší od apartmánového pobytu u Balatonu?",
        answer:
          "Szépvölgyi nabízí spíš rytmus vlastního domu: více společného prostoru, vlastní zahradu a klidnější atmosféru, přitom Balaton zůstává blízko."
      }
    ],
    amenitiesTitle: "Co je v Szépvölgyi důležité"
  },
  mapBody: "Szépvölgyi leží v Badacsonyörs, odkud je blízko k Balatonu, Badacsonyi, plážím, vínům i rodinným programům.",
  mapBenefits: [{ label: "Balaton poblíž", icon: "balaton" }, { label: "Badacsony a víno", icon: "grapes" }, { label: "Pro větší rodiny", icon: "users" }]
});

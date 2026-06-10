import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

export const szepvolgyiSlovakPageData = createSlovakAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szépvölgyi",
  route: "/sk/szepvolgyi/",
  location: "Badacsonyörs / Balaton",
  region: "Badacsonyörs - Balaton",
  guests: "až 8 hostí",
  character: "VEĽKÝ DOM S PANORÁMOU BALATONU",
  shortDescription: "Priestranný dom pri Badacsonyörs až pre 8 hostí, s výhľadom na Balaton a dobrým zázemím pre rodiny.",
  lead: "Szépvölgyi je pre väčšiu rodinu alebo skupinu, ktorá chce byť blízko Balatonu, Badacsonyu a mať dosť priestoru na spoločný pobyt.",
  longDescription: [
    "Dom ponúka viac spální, záhradu a praktické zázemie na dlhší pobyt. Výhľad na Balaton dáva pobytu silný letný charakter.",
    "Poloha pri Badacsonyörs je dobrá na pláže, večerné programy v Badacsonyi, Folly Arboretum aj výlety smerom na Szigliget.",
    "Szépvölgyi dobre funguje, keď chcete kombinovať vodu, víno, výhľad a spoločný čas vo väčšom dome."
  ],
  facts: [["Hostia", "až 8 hostí"], ["Spálne", "4 spálne"], ["Kúpeľne", "2 kúpeľne"], ["Poloha", "Badacsonyörs / Balaton"]],
  experienceFacts: [["Balaton", "pláže a promenády nablízku"], ["Badacsony", "víno a večere"], ["Výhľad", "panoráma Balatonu"], ["Rodiny", "viac priestoru"]],
  highlights: ["4 spálne", "2 kúpeľne", "Panoráma Balatonu", "Záhrada", "Kuchyňa", "Parkovanie"],
  reasons: [
    { iconKey: "guests", title: "Až 8 hostí", text: "pre väčšiu skupinu" },
    { iconKey: "balaton", title: "Balaton", text: "voda a výhľad" },
    { iconKey: "home", title: "Priestor", text: "viac spální" },
    { iconKey: "route", title: "Badacsony", text: "programy nablízku" }
  ],
  amenities: ["Wi-Fi", "Kuchyňa", "Záhrada", "Terasa", "2 kúpeľne", "Parkovanie", "Kúrenie", "Vonkajšie posedenie"],
  geoDecision: {
    kicker: "Szépvölgyi rýchle odpovede",
    title: "Szépvölgyi je dobrá voľba, ak väčšia rodina alebo skupina priateľov hľadá priestranný dom s výhľadom na Balaton a vlastnou záhradou v Badacsonyörs",
    lead: "Szépvölgyi je pohodlný až pre 8 hostí, má 4 spálne, 2 kúpeľne, uzavretú záhradu, panoramatickú terasu, možnosť grilovania a balatonské programy nablízku.",
    questions: [
      { question: "Pre koho je Szépvölgyi vhodný?", answer: "Pre väčšie rodiny a skupiny priateľov, ktoré hľadajú v Badacsonyörs priestranný dom s vlastnou záhradou a výhľadom na Balaton, blízko pláže, prístavu a programov v Badacsonyi." },
      { question: "Pre koľko hostí je Szépvölgyi pohodlný?", answer: "Dom je pohodlný až pre 8 hostí. Má 4 spálne a 2 kúpeľne, takže dobre funguje pre väčšiu rodinu alebo skupinu." },
      { question: "Aký je výhľad z terasy?", answer: "Z terasy je výhľad na Balaton. Je to jedna z najsilnejších častí domu a vytvára krásne pozadie pre raňajky, večerné posedenie aj spoločný oddych." },
      { question: "Aká je záhrada a vonkajší priestor?", answer: "Uzavretá záhrada má parkovanie pre dve autá. Terasový nábytok a gril robia vonkajší čas pohodlný a praktický." },
      { question: "Aké programy sú nablízku?", answer: "Pláž, prístav a cyklotrasa sú ľahko dostupné. Folly Arboretum, hrad Szigliget, vinárske trasy v Badacsonyi, gastroprogramy a festivaly sú dobré ciele v okolí." },
      { question: "Čím sa líši od apartmánového pobytu pri Balatone?", answer: "Szépvölgyi ponúka skôr rytmus vlastného domu: viac spoločného priestoru, vlastnú záhradu a pokojnejšiu atmosféru, pričom Balaton zostáva blízko." }
    ],
    amenitiesTitle: "Čo je v Szépvölgyi dôležité"
  },
  mapBody: "Szépvölgyi leží v Badacsonyörs, odkiaľ je blízko k Balatonu, Badacsonyu, plážam, vínam aj rodinným programom.",
  mapBenefits: [{ label: "Balaton nablízku", icon: "balaton" }, { label: "Badacsony a víno", icon: "grapes" }, { label: "Pre väčšie rodiny", icon: "users" }]
});

import { royalHomesEnglishPageData } from "./royal_homes.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

// [CHANGE 2026-06-15 00:00] Royal Homes cseh fő tartalom magyar jacuzzi- és mólóállításaihoz igazítva.
export const royalHomesCzechPageData = createCzechAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/cs/royal/",
  location: "Keszthely / Balaton",
  region: "Keszthely - Balaton",
  guests: "4-6 hostů",
  character: "PRÉMIOVÝ APARTMÁN S MOLEM A STŘEŠNÍ VÍŘIVKOU",
  shortDescription: "Prémiový apartmán v Keszthely s velkou terasou, molem rezidence a společnou střešní vířivkou.",
  lead: "Royal Homes je dobrá volba pro hosty, kteří chtějí být blízko Balatonu, Keszthely a programů u vody, ale zůstat v klidném zázemí.",
  longDescription: [
    "Apartmán spojuje pohodlné ubytování s balatonskou polohou. Hodí se pro rodinu nebo pár, který chce trávit čas u vody a mít vše prakticky blízko.",
    "Rezidence má vlastní molo, sluneční terasu a společnou vířivku na střešní terase. Tyto prvky dávají pobytu prémiový balatonský charakter.",
    "Keszthely nabízí procházky, pláže, restaurace i výletní směr k Hévízu nebo severnímu břehu Balatonu.",
    "Pobyt je více balatonský a městský než domy u Szent György-hegy, ale pořád zůstává v klidném stylu Dandelion."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Poloha", "Keszthely / Balaton"], ["Typ", "apartmán"], ["Exteriér", "velká terasa a balkon"], ["Střecha", "společná vířivka"]],
  experienceFacts: [["Balaton", "molo a procházky"], ["Keszthely", "město a programy"], ["Střešní vířivka", "společný prémiový prvek"], ["Rodiny", "praktická poloha"]],
  highlights: ["Apartmán", "Velká terasa", "Molo rezidence", "Střešní vířivka", "Klimatizace", "Balaton poblíž"],
  reasons: [
    { iconKey: "balaton", title: "Balaton", text: "blízko vody" },
    { iconKey: "spark", title: "Střešní vířivka", text: "společný prémiový prvek" },
    { iconKey: "route", title: "Keszthely", text: "programy poblíž" },
    { iconKey: "users", title: "Rodinná volba", text: "praktický pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Klimatizace", "Velká terasa", "Molo rezidence", "Střešní vířivka", "Topení", "Parkování"],
  geoDecision: {
    kicker: "Royal Homes rychlé odpovědi",
    title: "Dandelion Royal Homes je dobrá volba, pokud hledáte moderní apartmán v Keszthely, blízko Balatonu a městských programů",
    lead:
      "Royal Homes je kvalitní apartmán se 2 ložnicemi a obývacím pokojem v balatonské rezidenční části Keszthely, s velkou terasou, širokým balkonem, vlastním molem rezidence a společnou střešní vířivkou.",
    questions: [
      {
        question: "Pro koho je Dandelion Royal Homes vhodný?",
        answer:
          "Pro rodiny, páry a přátele, kteří hledají moderní, kvalitní apartmán v Keszthely, blízko Balatonu, promenády, přístavu a městských programů."
      },
      {
        question: "Jak blízko je Royal Homes k Balatonu?",
        answer:
          "Royal Homes leží v rezidenční části blízko Balatonu. Promenáda, jachtařský přístav a cyklostezka jsou snadno dostupné; k rezidenci patří vlastní molo a sluneční terasa."
      },
      {
        question: "Pro kolik hostů je Royal Homes pohodlný?",
        answer:
          "Apartmán má 2 ložnice a obývací pokoj a může být pohodlnou balatonskou základnou až pro 6 hostů. V jedné ložnici je manželská postel, ve druhé rozkládací pohovka."
      },
      {
        question: "Je u Royal Homes vířivka?",
        answer:
          "Ano, rezidenční komplex má společnou vířivku na střešní terase. Není to soukromá vířivka uvnitř apartmánu, ale společný prémiový komfortní prvek budovy."
      },
      {
        question: "Jaký je venkovní prostor?",
        answer:
          "Jednou z nejsilnějších částí apartmánu je velká terasa a široký balkon. Sluneční terasa a molo rezidence posilují balatonskou dovolenkovou atmosféru."
      },
      {
        question: "Na jaké programy je Keszthely dobrým výchozím bodem?",
        answer:
          "Poloha se hodí pro balatonské pláže, promenádu, přístav, cyklistiku, programy v Keszthely i výlety v západní části Balatonu. Centrum města je přibližně 10 minut pěšky."
      }
    ],
    amenitiesTitle: "Co je v Royal Homes důležité"
  },
  mapBody: "Royal Homes leží v Keszthely, v dobré poloze pro balatonské pláže, promenády, restaurace a výlety v západní části jezera.",
  mapBenefits: [{ label: "Balaton poblíž", icon: "balaton" }, { label: "Keszthely programy", icon: "route" }, { label: "Pohodlný apartmán", icon: "home" }]
});

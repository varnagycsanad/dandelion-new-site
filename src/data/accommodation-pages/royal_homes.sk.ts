import { royalHomesEnglishPageData } from "./royal_homes.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

export const royalHomesSlovakPageData = createSlovakAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/sk/royal/",
  location: "Keszthely / Balaton",
  region: "Keszthely - Balaton",
  guests: "4-6 hostí",
  character: "APARTMÁN BLÍZKO BALATONU",
  shortDescription: "Pohodlný apartmán v Keszthelyi, vhodný na balatonské dni, prechádzky a jednoduchší mestský rytmus.",
  lead: "Royal Homes je dobrá voľba pre hostí, ktorí chcú byť blízko Balatonu, Keszthelyu a programov pri vode, no zostať v pokojnom zázemí.",
  longDescription: [
    "Apartmán spája pohodlné ubytovanie s balatonskou polohou. Hodí sa pre rodinu alebo pár, ktorý chce tráviť čas pri vode a mať všetko prakticky blízko.",
    "Keszthely ponúka prechádzky, pláže, reštaurácie aj výletný smer k Hévízu alebo severnému brehu Balatonu.",
    "Pobyt je viac balatonský a mestský než domy pri Szent György-hegy, ale stále zostáva v pokojnom štýle Dandelion."
  ],
  facts: [["Hostia", "4-6 hostí"], ["Poloha", "Keszthely / Balaton"], ["Typ", "apartmán"], ["Vhodné na", "balatonské dni"]],
  experienceFacts: [["Balaton", "voda a prechádzky"], ["Keszthely", "mesto a programy"], ["Hévíz", "výletný smer"], ["Rodiny", "praktická poloha"]],
  highlights: ["Apartmán", "Terasa", "Kuchyňa", "Klimatizácia", "Balaton nablízku", "Parkovanie"],
  reasons: [
    { iconKey: "balaton", title: "Balaton", text: "blízko vody" },
    { iconKey: "home", title: "Apartmán", text: "pohodlné zázemie" },
    { iconKey: "route", title: "Keszthely", text: "programy nablízku" },
    { iconKey: "users", title: "Rodinná voľba", text: "praktický pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyňa", "Klimatizácia", "Terasa", "Kúpeľňa", "Kúrenie", "Parkovanie", "Balaton nablízku"],
  geoDecision: {
    kicker: "Royal Homes rýchle odpovede",
    title: "Dandelion Royal Homes je dobrá voľba, ak hľadáte moderný apartmán v Keszthelyi, blízko Balatonu a mestských programov",
    lead: "Royal Homes je kvalitný apartmán s 2 spálňami a obývačkou v balatonskej rezidenčnej časti Keszthelyu, s veľkou terasou, širokým balkónom, vlastným mólom rezidencie a spoločnou strešnou vírivkou.",
    questions: [
      { question: "Pre koho je Dandelion Royal Homes vhodný?", answer: "Pre rodiny, páry a priateľov, ktorí hľadajú moderný, kvalitný apartmán v Keszthelyi, blízko Balatonu, promenády, prístavu a mestských programov." },
      { question: "Ako blízko je Royal Homes k Balatonu?", answer: "Royal Homes leží v rezidenčnej časti blízko Balatonu. Promenáda, jachtársky prístav a cyklotrasa sú ľahko dostupné; k rezidencii patrí vlastné mólo a slnečná terasa." },
      { question: "Pre koľko hostí je Royal Homes pohodlný?", answer: "Apartmán má 2 spálne a obývačku a môže byť pohodlnou balatonskou základňou až pre 6 hostí. V jednej spálni je manželská posteľ, v druhej rozkladacia pohovka." },
      { question: "Je pri Royal Homes vírivka?", answer: "Áno, rezidenčný komplex má spoločnú vírivku na strešnej terase. Nie je to súkromná vírivka vo vnútri apartmánu, ale spoločný prémiový komfortný prvok budovy." },
      { question: "Aký je vonkajší priestor?", answer: "Jednou z najsilnejších častí apartmánu je veľká terasa a široký balkón. Slnečná terasa a mólo rezidencie posilňujú balatonskú dovolenkovú atmosféru." },
      { question: "Na aké programy je Keszthely dobrým východiskovým bodom?", answer: "Poloha sa hodí na balatonské pláže, promenádu, prístav, cyklistiku, programy v Keszthelyi aj výlety v západnej časti Balatonu. Centrum mesta je približne 10 minút pešo." }
    ],
    amenitiesTitle: "Čo je v Royal Homes dôležité"
  },
  mapBody: "Royal Homes leží v Keszthelyi, v dobrej polohe na balatonské pláže, promenády, reštaurácie a výlety v západnej časti jazera.",
  mapBenefits: [{ label: "Balaton nablízku", icon: "balaton" }, { label: "Programy v Keszthelyi", icon: "route" }, { label: "Pohodlný apartmán", icon: "home" }]
});

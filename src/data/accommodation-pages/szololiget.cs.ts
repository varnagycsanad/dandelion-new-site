import { szololigetEnglishPageData } from "./szololiget.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const szololigetCzechPageData = createCzechAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szololiget",
  route: "/cs/szololiget/",
  location: "Kisapati / Szent Gyorgy-hegy",
  region: "Vinice u Szent Gyorgy-hegy",
  guests: "2-4 hoste",
  character: "POBYT MEZI VINICEMI S TERASOU A VYHLEDEM",
  shortDescription: "Samostatny dum pro pomale dny mezi vinicemi, s terasou, vyhledem a prirozenym klidem.",
  lead: "Szololiget je vhodny pro hosty, kteri chteji byt blizko krajiny, vina a turistickych tras, ale mit vlastni klidny prostor.",
  longDescription: [
    "Terasa a poloha ve svahu davaji domu otevreny, venkovsky charakter. Je to misto pro pomale rano, vyhledy a jednoduche dny venku.",
    "Dum se hodi pro par, mensi rodinu nebo hosty, kteri hledaji prirodni zakladnu pro Szent Gyorgy-hegy a Balaton.",
    "Okoli je dobre pro kratke prochazky, vinarske zastavky a vylety smerem Badacsony nebo Szigliget."
  ],
  facts: [["Hoste", "2-4 hoste"], ["Poloha", "mezi vinicemi"], ["Terasa", "venkovni posezeni"], ["Charakter", "klidny dum ve svahu"]],
  experienceFacts: [["Vino", "vinice a sklepy pobliz"], ["Turistika", "Szent Gyorgy-hegy"], ["Balaton", "kratka jizda"], ["Odpocinek", "vyhled a ticho"]],
  highlights: ["Terasa", "Vyhled", "Kuchyne", "Klimatizace", "Parkovani", "Vinarska oblast"],
  reasons: [
    { iconKey: "grapes", title: "Vinice", text: "krajina hned kolem" },
    { iconKey: "terrace", title: "Terasa", text: "venkovni rytmus" },
    { iconKey: "trail", title: "Turistika", text: "Szent Gyorgy-hegy" },
    { iconKey: "leaf", title: "Klid", text: "maly dum pro odpocinek" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Terasa", "Klimatizace", "Topeni", "Parkovani", "Koupelna", "Venkovni posezeni"],
  mapBody: "Szololiget je v oblasti Kisapati a Szent Gyorgy-hegy, s dobrou dostupnosti vinic, vyhlidek, Balatonu a Badacsonye.",
  mapBenefits: [{ label: "Vinice pobliz", icon: "grapes" }, { label: "Vyhledy a trasy", icon: "trail" }, { label: "Balaton dostupny autem", icon: "route" }]
});

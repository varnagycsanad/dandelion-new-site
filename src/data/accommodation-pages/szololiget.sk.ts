import { szololigetEnglishPageData } from "./szololiget.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

export const szololigetSlovakPageData = createSlovakAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szőlőliget",
  route: "/sk/szololiget/",
  location: "Kisapáti / Szent György-hegy",
  region: "Vinice pri Szent György-hegy",
  guests: "4 hostia + prístelka",
  character: "PANORAMATICKÝ DOM S VEĽKOU TERASOU",
  shortDescription: "Samostatný dvojpodlažný dom pre 4 hostí a prístelku, s veľkou terasou, krásnou záhradou a 180° výhľadom na svedecké vrchy.",
  lead: "Szőlőliget je pokojný dom na východnej strane Szent György-hegy pre hostí, ktorí chcú terasu, krásnu záhradu, východ slnka a panoramatický výhľad.",
  longDescription: [
    "Veľká terasa, krásne vysadená záhrada a poloha vo svahu dávajú Szőlőligetu otvorený, pokojný charakter s výhľadom na krajinu.",
    "V záhrade je vysadených mnoho zaujímavých rastlín, takže vonkajší priestor nie je iba doplnok, ale dôležitá časť pokojnej atmosféry domu.",
    "Dom je dvojpodlažný, pohodlný pre 4 hostí a možno ho doplniť prístelkou. Hodí sa pre páry, menšie rodiny aj hostí, ktorí chcú turistiku a vinárstva.",
    "Je to pokojná základňa pre Szent György-hegy, čadičové varhany, Badacsony, Szigliget a dni pri Balatone."
  ],
  facts: [["Hostia", "4 hostia + prístelka"], ["Dom", "samostatný dvojpodlažný"], ["Terasa", "veľká terasa"], ["Záhrada", "krásne vysadená zvláštnymi rastlinami"]],
  experienceFacts: [["Východ slnka", "viditeľný z postele"], ["Turistika", "Szent György-hegy a čadičové varhany"], ["Balaton", "krátka jazda"], ["Oddych", "výhľad a ticho"]],
  highlights: ["Veľká terasa", "Krásna záhrada", "180° výhľad", "Klimatizácia", "Parkovanie", "Vinárska oblasť"],
  reasons: [
    { iconKey: "mountain", title: "Panoráma vrchov", text: "180° výhľad" },
    { iconKey: "terrace", title: "Veľká terasa", text: "na pomalé dni vonku" },
    { iconKey: "sun", title: "Ranné svetlo", text: "východ slnka z postele" },
    { iconKey: "trail", title: "Turistika", text: "Szent György-hegy nablízku" }
  ],
  amenities: ["Wi-Fi", "Kuchyňa", "Veľká terasa", "Krásna záhrada", "Klimatizácia", "Kúrenie", "180° výhľad", "Prístelka"],
  geoDecision: {
    kicker: "Szőlőliget rýchle odpovede",
    title: "Szőlőliget je dobrá voľba, ak hľadáte samostatný panoramatický dom s krásnou záhradou pri Szent György-hegy",
    lead: "Szőlőliget ponúka 4 hosťom a prístelke pokojnú dvojpodlažnú základňu s veľkou terasou, krásne vysadenou záhradou, 180° výhľadom na svedecké vrchy a východom slnka z postele.",
    questions: [
      { question: "Pre koho je Szőlőliget vhodný?", answer: "Pre páry, menšie rodiny a hostí, ktorí hľadajú pokojný samostatný dom v Kisapáti, blízko turistických trás, vinárstiev a programov v Balatonskej vrchovine." },
      { question: "Aký je výhľad zo Szőlőligetu?", answer: "Z veľkej terasy je 180° výhľad na svedecké vrchy vrátane Csobáncu, Tóti-hegy a Gulácsu." },
      { question: "Koľkým hosťom je dom pohodlný?", answer: "Dom je pohodlný pre 4 hostí a možno ho doplniť prístelkou. Dvojpodlažné usporiadanie sa hodí pre páry, menšie rodiny aj hostí na turistiku." },
      { question: "Prečo je terasa dôležitá?", answer: "Terasa je veľká, preto je hlavným vonkajším priestorom na raňajky, pomalé popoludnia, víno a pokojné večery." },
      { question: "Aká je záhrada pri Szőlőligete?", answer: "Záhrada je veľmi pekná a vysadená mnohými zvláštnymi rastlinami. Spolu s terasou vytvára pokojnú, zelenú a prírodnú atmosféru domu." },
      { question: "Na aké programy je dom dobrý?", answer: "Je dobrou základňou pre Szent György-hegy, čadičové varhany, miestne vinárstva, Badacsony, Szigliget a krátke výlety k Balatonu." }
    ],
    amenitiesTitle: "Čo je v Szőlőligete dôležité"
  },
  mapBody: "Szőlőliget je v oblasti Kisapáti a Szent György-hegy, s dobrou dostupnosťou viníc, vyhliadok, Balatonu a Badacsonyu.",
  mapBenefits: [{ label: "Vinice nablízku", icon: "grapes" }, { label: "Výhľady a trasy", icon: "trail" }, { label: "Balaton dostupný autom", icon: "route" }]
});

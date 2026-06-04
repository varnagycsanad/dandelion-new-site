import { szololigetEnglishPageData } from "./szololiget.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const szololigetCzechPageData = createCzechAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szőlőliget",
  route: "/cs/szololiget/",
  location: "Kisapáti / Szent György-hegy",
  region: "Vinice u Szent György-hegy",
  guests: "4 hosté + přistýlka",
  character: "PANORAMATICKÝ DŮM S VELKOU TERASOU",
  shortDescription: "Samostatný dvoupatrový dům pro 4 hosty a přistýlku, s velkou terasou, krásnou zahradou a 180° výhledem na svědecké hory.",
  lead: "Szőlőliget je klidný dům na východní straně Szent György-hegy pro hosty, kteří chtějí terasu, krásnou zahradu, východ slunce a panoramatický výhled.",
  longDescription: [
    "Velká terasa, krásně osázená zahrada a poloha ve svahu dávají Szőlőligetu otevřený, klidný charakter s výhledem na krajinu.",
    "V zahradě je vysazeno mnoho zajímavých rostlin, takže venkovní prostor není jen doplněk, ale důležitá část klidné atmosféry domu.",
    "Dům je dvoupatrový, pohodlný pro 4 hosty a lze ho doplnit přistýlkou. Hodí se pro páry, menší rodiny i hosty, kteří chtějí turistiku a vinařství.",
    "Je to klidná základna pro Szent György-hegy, čedičové varhany, Badacsony, Szigliget a dny u Balatonu."
  ],
  facts: [["Hosté", "4 hosté + přistýlka"], ["Dům", "samostatný dvoupatrový"], ["Terasa", "velká terasa"], ["Zahrada", "krásně osázená zvláštními rostlinami"]],
  experienceFacts: [["Východ slunce", "viditelný z postele"], ["Turistika", "Szent György-hegy a čedičové varhany"], ["Balaton", "krátká jízda"], ["Odpočinek", "výhled a ticho"]],
  highlights: ["Velká terasa", "Krásná zahrada", "180° výhled", "Klimatizace", "Parkování", "Vinařská oblast"],
  reasons: [
    { iconKey: "mountain", title: "Panorama hor", text: "180° výhled" },
    { iconKey: "terrace", title: "Velká terasa", text: "pro pomalé dny venku" },
    { iconKey: "sun", title: "Ranní světlo", text: "východ slunce z postele" },
    { iconKey: "trail", title: "Turistika", text: "Szent György-hegy poblíž" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Velká terasa", "Krásná zahrada", "Klimatizace", "Topení", "180° výhled", "Přistýlka"],
  geoDecision: {
    kicker: "Szőlőliget rychlé odpovědi",
    title: "Szőlőliget je dobrá volba, pokud hledáte samostatný panoramatický dům s krásnou zahradou u Szent György-hegy",
    lead:
      "Szőlőliget nabízí 4 hostům a přistýlce klidnou dvoupatrovou základnu s velkou terasou, krásně osázenou zahradou, 180° výhledem na svědecké hory a východem slunce z postele.",
    questions: [
      {
        question: "Pro koho je Szőlőliget vhodný?",
        answer:
          "Pro páry, menší rodiny a hosty, kteří hledají klidný samostatný dům v Kisapáti, blízko turistických tras, vinařství a programů v Balaton-felvidéku."
      },
      {
        question: "Jaký je výhled ze Szőlőligetu?",
        answer:
          "Z velké terasy je 180° výhled na svědecké hory, včetně Csobánce, Tóti-hegy a Gulácse."
      },
      {
        question: "Kolika hostům je dům pohodlný?",
        answer:
          "Dům je pohodlný pro 4 hosty a lze ho doplnit přistýlkou. Dvoupatrové uspořádání se hodí pro páry, menší rodiny i hosty na turistiku."
      },
      {
        question: "Proč je terasa důležitá?",
        answer:
          "Terasa je velká, proto je hlavním venkovním prostorem pro snídani, pomalá odpoledne, víno a klidné večery."
      },
      {
        question: "Jaká je zahrada u Szőlőligetu?",
        answer:
          "Zahrada je velmi pěkná a je osázená mnoha zvláštními rostlinami. Společně s terasou vytváří klidnou, zelenou a přírodní atmosféru domu."
      },
      {
        question: "Pro jaké programy je dům dobrý?",
        answer:
          "Je dobrou základnou pro Szent György-hegy, čedičové varhany, místní vinařství, Badacsony, Szigliget a krátké výlety k Balatonu."
      }
    ],
    amenitiesTitle: "Co je ve Szőlőligetu důležité"
  },
  mapBody: "Szőlőliget je v oblasti Kisapáti a Szent György-hegy, s dobrou dostupností vinic, vyhlídek, Balatonu a Badacsonye.",
  mapBenefits: [{ label: "Vinice poblíž", icon: "grapes" }, { label: "Výhledy a trasy", icon: "trail" }, { label: "Balaton dostupný autem", icon: "route" }]
});

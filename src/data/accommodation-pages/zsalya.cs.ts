import { zsalyaEnglishPageData } from "./zsalya.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

const zsalyaCzechBasePageData = createCzechAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsálya",
  route: "/cs/dandelion-zsalya/",
  location: "Kisapáti / Szent György-hegy",
  region: "Szent György-hegy - Kisapáti",
  guests: "4 hosté",
  character: "KLIDNÝ SAMOSTATNÝ DŮM S PROSKLENOU TERASOU",
  shortDescription: "Klidný samostatný dům pro 4 hosty u Szent György-hegy, s plně krytou prosklenou terasou a výhledem na svědecké hory.",
  lead: "Zsálya je přirozeně klidná volba pro hosty, kteří chtějí samostatný dům, velký vlastní prostor, výhledy a turistické trasy v okolí.",
  longDescription: [
    "Dům působí soukromě a klidně. Plně krytá prosklená terasa prodlužuje obytný prostor ven a dobře funguje pro snídaně i večerní posezení.",
    "Poloha je vhodná pro krátké výlety, víno, turistiku a odpočinek mimo rušné balatonské centrum.",
    "Zsálya je dobrá volba pro páry, menší rodiny nebo přátele, kteří chtějí klid, prostor a výhledy."
  ],
  facts: [["Hosté", "4 hosté"], ["Dům", "samostatný dvoupatrový dům"], ["Terasa", "plně krytá prosklená terasa"], ["Atmosféra", "klid, světlo a soukromí"]],
  experienceFacts: [["Szent György-hegy", "trasy a výhledy poblíž"], ["Balaton", "krátká jízda autem"], ["Víno", "vinařství v regionu"], ["Tempo", "pomalé dny"]],
  highlights: ["Plně krytá terasa", "Velké prosklené plochy", "Výhled na svědecké hory", "Velký vlastní prostor", "Klimatizace v obou patrech", "Dvě koupelny", "Turistické trasy poblíž"],
  reasons: [
    { iconKey: "mountain", title: "Výhled na hory", text: "Csobánc, Gulács" },
    { iconKey: "terrace", title: "Prosklená terasa", text: "s výhledem" },
    { iconKey: "leaf", title: "Velký vlastní prostor", text: "klid, místo" },
    { iconKey: "trail", title: "Turistická základna", text: "trasy poblíž" }
  ],
  geoDecision: {
    kicker: "Zsálya rychlé odpovědi",
    title: "Dandelion Zsálya je klidný samostatný dům ve svahu pro 4 hosty, s plně krytou terasou a výhledem na svědecké hory",
    lead: "Zsálya nabízí velké prosklené plochy, velký vlastní prostor, dvě patra, klimatizaci v obou patrech a turistické trasy v okolí.",
    questions: [
      {
        iconKey: "family",
        question: "Pro koho je Zsálya dobrá volba?",
        answer: "Zsálya se hodí pro páry, menší rodiny a hosty, kteří hledají samostatný dům, velký vlastní prostor a pěkné výhledy."
      },
      {
        iconKey: "mountain",
        question: "Jaký je výhled?",
        answer: "Z terasy a přes velké prosklené plochy se otevírá výhled na svědecké hory, například směrem na Csobánc, Gulács a Tóti-hegy."
      },
      {
        iconKey: "terrace",
        question: "Čím je terasa zvláštní?",
        answer: "Terasa je plně krytá a velkými prosklenými plochami navazuje na krajinu, takže dobře funguje ráno, večer i při proměnlivém počasí."
      },
      {
        iconKey: "guests",
        question: "Pro kolik hostů je Zsálya pohodlná?",
        answer: "Zsálya je pohodlná pro 4 hosty a je řešená jako dvoupatrový dům."
      },
      {
        iconKey: "bathroom",
        question: "Co je v domě?",
        answer: "Klimatizace v obou patrech, vybavený kuchyňský kout, dvě koupelny, vana, samostatné WC a obývací část se vstupem na terasu."
      },
      {
        iconKey: "trail",
        question: "Pro jaké programy je Zsálya dobrá základna?",
        answer: "Zsálya je dobrá pro turistiku, výlety mezi svědeckými horami, balatonské programy a klidnější dny v Balatonské vrchovině."
      }
    ],
    amenitiesTitle: "Co je v Zsálya důležité"
  },
  amenities: ["Plně krytá terasa", "Velké prosklené plochy", "Výhled na svědecké hory", "Velký vlastní prostor", "Klimatizace v obou patrech", "Kuchyňský kout", "Dvě koupelny", "Turistické trasy poblíž"],
  mapBody: "Zsálya leží na východní straně Szent György-hegy, odkud se dá snadno vyrazit na vyhlídky, k Balatonu i do vinic.",
  mapBenefits: [{ label: "Klidná poloha", icon: "leaf" }, { label: "Kopce poblíž", icon: "trail" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});

export const zsalyaCzechPageData = {
  ...zsalyaCzechBasePageData,
  reviews: {
    kicker: "Hodnocení hostů",
    title: "Co říkají hosté",
    intro: "Poznámky ke klidné terase, poloze ve svahu a výletům u Szent György-hegy.",
    mobileSummaryLabel: "Další hodnocení",
    mobileHighlightedAriaLabel: "Vybrané hodnocení Google",
    mobileMoreGoogleAriaLabel: "Další hodnocení Google",
    mobileBookingAriaLabel: "Hodnocení Booking.com",
    items: [
      {
        source: "Google" as const,
        quote: "Klidné místo, odkud se snadno vyráží na výlety a večer se sem dobře vrací.",
        meta: "Host - Google - 5/5"
      },
      {
        source: "Google" as const,
        quote: "Terasa a okolní krajina hodně přidávají k odpočinku; člověk tu rychle zpomalí.",
        meta: "Host - Google - 5/5"
      },
      {
        source: "Google" as const,
        quote: "Menší, ale promyšlený a pohodlný dům pro odpočinek blízko přírody.",
        meta: "Host - Google - 5/5"
      },
      {
        source: "Booking.com" as const,
        quote: "Příjemné a pohodlné ubytování, velmi dobrý výchozí bod pro objevování Szent György-hegy.",
        meta: "Host - Booking.com - 9/10"
      },
      {
        source: "Booking.com" as const,
        quote: "Tiché a klidné místo, kde se dobře sedí na kryté terase i při proměnlivém počasí.",
        meta: "Host - Booking.com - 9/10"
      }
    ]
  }
};

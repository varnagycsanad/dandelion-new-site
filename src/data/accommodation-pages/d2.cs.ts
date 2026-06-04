import { d2EnglishPageData } from "./d2.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const d2CzechPageData = createCzechAccommodationPage(d2EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D2",
  route: "/cs/dandelion-d2/",
  location: "Kisapáti / Szent György-hegy",
  region: "Balatonská vrchovina - Szent György-hegy",
  guests: "4-6 hostů",
  character: "RODINNE UBYTOVANI SE ZAHRADOU A TERASOU",
  shortDescription: "Světlý a klidný dům pro rodiny, s velkou zahradou, krytou terasou a dobrou polohou pro balatonské dny.",
  lead: "Dandelion D2 je klidná základna u Szent György-hegy. Hodí se pro rodiny, které chtějí zahradu, terasu, jednoduché vaření a krátké výlety k Balatonu, do vinic nebo na vyhlídky.",
  longDescription: [
    "Otevřený obytný prostor, praktická kuchyně a krytá terasa dávají domu pomalý rytmus. Ráno může začít venku u stolu, den pokračuje v kopcích nebo u vody a večer se vrací do zahrady.",
    "Velká zahrada je přirozené místo pro děti, grilování i odpočinek. Ubytování zůstává jednoduché na používání, ale přitom má dost prostoru pro delší pobyt.",
    "Panorama Pool je společný pro hosty D1, D2 a Fügeház od 15. června 2026. Neni to soukromy bazén pouze pro D2.",
    "Balaton, turistické trasy Szent György-hegy a vinařství v okolí jsou dostupné krátkou jízdou."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Terasa", "krytá terasa a posezení v zahradě"], ["Zahrada", "velká a dobře využitelná"], ["Kuchyně", "prakticky vybavená"]],
  experienceFacts: [["Panorama Pool", "společný pro D1, D2 a Fügeház od 15. června 2026"], ["Venkovní čas", "zahrada, terasa, gril"], ["Pro děti", "prostor a přírodní atmosféra"], ["V okolí", "Balaton, trasy, vinařství"]],
  highlights: ["Krytá terasa", "Velka zahrada", "Klimatizace", "Kuchyně", "Společný Panorama Pool", "Grilovani venku"],
  reasons: [
    { iconKey: "terrace", title: "Krytá terasa", text: "Velká zahrada" },
    { iconKey: "users", title: "Zahrada pro děti", text: "Zahrada, zvířata" },
    { iconKey: "balaton", title: "Balaton a kopce", text: "Pláž, výlety" },
    { iconKey: "home", title: "Rodinná základna", text: "Prostorné pokoje" }
  ],
  geoDecision: {
    kicker: "D2 rychlé odpovědi",
    title: "Dandelion D2 se hodí, pokud hledáte rodinný dům se zahradou v Kisapati",
    lead: "D2 je pohodlný pro 4-6 hostů, s velkou zahradou, krytou terasou, renovovanou kuchyní a společným přístupem k Panorama Pool od 15. června 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Má Dandelion D2 přístup k bazénu?",
        answer: "Ano. Od 15. června 2026 mohou hosté D2 využívat společný Panorama Pool spolu s hosty D1 a Fügeház."
      },
      {
        iconKey: "family",
        question: "Pro koho je Dandelion D2 dobrá volba?",
        answer: "D2 se hodí hlavně pro rodiny a menší skupiny přátel, které hledají velkou zahradu, krytou terasu a klidnou základnu v Balatonské vrchovině."
      },
      {
        iconKey: "guests",
        question: "Pro kolik hostů je Dandelion D2 pohodlný?",
        answer: "D2 je pohodlný pro 4-6 hostů, s galerijním obývacím prostorem, manželskou postelí, dvěma samostatnými lůžky a rozkládací pohovkou."
      },
      {
        iconKey: "garden",
        question: "Je D2 dobrá volba s dětmi?",
        answer: "Ano. Velká zahrada, venkovní posezení a zvířata kolem domu dělají z D2 praktickou volbu pro rodiny s dětmi."
      },
      {
        iconKey: "kitchen",
        question: "Jaké vybavení je v D2?",
        answer: "V D2 je renovovaná, dobře vybavená kuchyně, myčka, klimatizace, gigabitový internet, krb, vana, krytá terasa a posezení v zahradě."
      },
      {
        iconKey: "mountain",
        question: "Pro jaké výlety je D2 dobrá základna?",
        answer: "D2 je dobrá základna pro Szent György-hegy, Balaton, svědecké kopce, místní vinařství a Tapolcai-medence."
      }
    ],
    amenitiesTitle: "Co je v D2 důležité"
  },
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyně", "Koupelna", "Topení", "Zahradni posezení", "Gril", "Parkování"],
  mapBody: "Dandelion D2 leží v klidné části u Szent György-hegy. Odtud se dá dobře vyrazit k Balatonu, do Tapolcai-medence i mezi vinice.",
  mapBenefits: [{ label: "Turisticke trasy poblíž", icon: "trail" }, { label: "Vinařská oblast", icon: "grapes" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});

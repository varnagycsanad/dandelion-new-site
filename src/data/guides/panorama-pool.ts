import type { GuideContent, GuideLocaleContent } from "./types";

type PoolGuideHouse = {
  houseSlug: string;
  houseName: string;
};

const issueBulletsHu = [
  "üveg törik a medence körül",
  "szennyeződés kerül a vízbe",
  "a medencefedés megsérül vagy nem mozgatható",
  "a víz színe, szaga vagy állapota szokatlan",
  "valaki rosszul lesz vagy megsérül"
];

const issueBulletsEn = [
  "glass breaks around the pool",
  "contamination gets into the water",
  "the pool cover is damaged or cannot be moved",
  "the colour, smell or condition of the water seems unusual",
  "someone feels unwell or gets injured"
];

const forbiddenBulletsHu = [
  "fejest ugrani",
  "a vízbe ugrálni",
  "futkározni",
  "lökdösődni",
  "másokat fröcsköléssel vagy hangoskodással zavarni",
  "a medence szélén veszélyesen közlekedni",
  "a medencefedésre ráállni, ráülni vagy ráugrani",
  "elektromos eszközt a víz közvetlen közelében használni",
  "szemetelni vagy a vizet szennyezni"
];

const forbiddenBulletsEn = [
  "diving head first",
  "jumping into the water",
  "running around the pool",
  "pushing others",
  "disturbing others by splashing or shouting",
  "moving dangerously around the pool edge",
  "standing, sitting or jumping on the pool cover",
  "using electrical devices directly near the water",
  "littering or contaminating the water"
];

const issueBulletsCs = [
  "se kolem bazénu rozbije sklo",
  "do vody se dostane nečistota",
  "zastřešení bazénu je poškozené nebo s ním nelze pohnout",
  "barva, zápach nebo stav vody je neobvyklý",
  "někomu se udělá špatně nebo se zraní"
];

const forbiddenBulletsCs = [
  "skákat do vody po hlavě",
  "skákat do vody",
  "běhat kolem bazénu",
  "strkat do ostatních",
  "rušit ostatní cákáním nebo křikem",
  "pohybovat se nebezpečně u okraje bazénu",
  "stát, sedět nebo skákat na zastřešení bazénu",
  "používat elektrická zařízení přímo u vody",
  "odhazovat odpadky nebo znečišťovat vodu"
];

const createPoolGuideCsContent = (houseName: string): GuideLocaleContent => ({
  title: "Panorama Pool - pravidla používání bazénu",
  subtitle: `Pravidla používání bazénu Panorama Pool - ${houseName}`,
  intro:
    "Platí od: 24. května 2026. Upraveno: 25. května 2026. Panorama Pool mohou hosté Dandelion používat během koupací sezóny.",
  keyPoints: [
    "Otevírací doba během koupací sezóny: denně 10:00-21:00.",
    "Bazén používáte na vlastní odpovědnost, plavčík není přítomen.",
    "Děti mohou bazén používat pouze pod dohledem dospělé osoby.",
    "Společný prostor bazénu může být monitorován kamerovým systémem.",
    "Po posledním večerním použití je nutné zastřešení zatáhnout zpět nad bazén."
  ],
  backLabel: `Zpět na průvodce ${houseName}`,
  sections: [
    {
      id: "acceptance",
      title: "Přijetí pravidel",
      paragraphs: [
        "Panorama Pool mohou hosté Dandelion používat během koupací sezóny.",
        "Použitím bazénu host přijímá tato pravidla a zavazuje se používat bazén pouze podle nich."
      ]
    },
    {
      id: "opening-hours",
      title: "1. Otevírací doba",
      paragraphs: [
        "Během koupací sezóny je Panorama Pool otevřen denně od 10:00 do 21:00.",
        "Mimo otevírací dobu se bazén nesmí používat.",
        "Provozovatel může používání bazénu dočasně omezit nebo pozastavit kvůli počasí, údržbě, úpravě vody, technické závadě, bezpečnostním důvodům nebo porušení pravidel."
      ]
    },
    {
      id: "pool-use",
      title: "2. Používání bazénu",
      paragraphs: [
        "Bazén používáte na vlastní odpovědnost.",
        "U bazénu není plavčík.",
        "Hloubka vody je přibližně 1,30 m. Bazén není skokanský bazén, proto je zakázáno skákat po hlavě, skákat do vody, strkat do ostatních, skákat z okraje bazénu a běhat kolem bazénu.",
        "Každý host smí bazén používat jen podle svých plaveckých schopností, zdravotního a fyzického stavu.",
        "Hosté, kteří neumějí plavat nebo si nejsou jistí, mohou bazén používat pouze s náležitou opatrností a případně s plaveckou pomůckou."
      ]
    },
    {
      id: "children",
      title: "3. Pravidla pro děti",
      paragraphs: [
        "Děti mohou bazén používat pouze pod dohledem dospělé osoby.",
        "Za bezpečnost dětí vždy odpovídá rodič, příbuzný nebo doprovázející dospělý.",
        "Děti nesmí zůstat v bazénu ani v jeho okolí bez dozoru.",
        "Děti nesmí pohybovat se zastřešením bazénu, lézt na něj ani po něm chodit."
      ]
    },
    {
      id: "hygiene",
      title: "4. Hygienická pravidla",
      paragraphs: [
        "Před použitím bazénu je sprchování povinné.",
        "Po použití opalovacího krému, tělového mléka, oleje nebo jiné kosmetiky se prosím zvlášť pečlivě osprchujte, protože tyto přípravky zhoršují kvalitu vody.",
        "Do bazénu se nesmí dostat jídlo, nápoje, šampon, sprchový gel, pěna do koupele, olej ani žádná cizí látka.",
        "Jíst v bazénu je zakázáno.",
        "Malé děti mohou bazén používat pouze s vhodnou plovací plenou.",
        "Bazén nesmí používat osoba s infekční nemocí, horečkou, průjmem, zvracením, otevřenou ranou nebo kožní infekcí."
      ]
    },
    {
      id: "forbidden",
      title: "5. Zakázané předměty a činnosti",
      paragraphs: [
        "Do bazénu ani do jeho bezprostředního okolí se nesmí nosit sklo, skleněné kelímky ani rozbitné předměty.",
        "V bazénu a jeho okolí je zakázáno:"
      ],
      bullets: forbiddenBulletsCs,
      important:
        "Domácí zvířata do bazénu nesmí. Osoba pod vlivem alkoholu, drog nebo jinak ovlivněná nesmí bazén používat."
    },
    {
      id: "toys",
      title: "6. Nafukovací pomůcky a hračky",
      paragraphs: [
        "Nafukovací hračky, matrace, míče nebo jiné vodní hračky lze používat pouze tehdy, pokud neruší a neohrožují ostatní hosty.",
        "Provozovatel může použití velkých nafukovacích pomůcek omezit nebo zakázat.",
        "Za nehody způsobené používáním hraček a pomůcek odpovídá uživatel, u dětí doprovázející dospělý."
      ]
    },
    {
      id: "pool-cover",
      title: "7. Používání zastřešení bazénu",
      paragraphs: [
        "Před prvním použitím dne je nutné zastřešení bazénu odsunout.",
        "Se zastřešením vždy pohybujte opatrně a pomalu, aby se nepoškodilo zastřešení ani kolejnice.",
        "Po posledním večerním použití musí hosté zastřešení zatáhnout zpět nad bazén.",
        "Zatažení zastřešení je důležité pro čistotu vody, udržení tepla a bezpečnost.",
        "Na zastřešení je zakázáno stát, sedět, skákat nebo po něm chodit.",
        "Děti nesmí se zastřešením pohybovat.",
        "Pokud se zastřešení zasekne nebo nefunguje správně, nepoužívejte sílu a ihned informujte provozovatele."
      ]
    },
    {
      id: "weather",
      title: "8. Počasí a mimořádné situace",
      paragraphs: [
        "Bazén se nesmí používat při bouřce, blescích, silném větru nebo nebezpečném počasí.",
        "Při blescích je nutné bazén okamžitě opustit.",
        "Bazén může být dočasně uzavřen kvůli údržbě, úpravě vody, chemickému ošetření, technické závadě nebo neobvyklé kvalitě vody.",
        "Uzavřený nebo mimo provoz označený bazén se nesmí používat."
      ]
    },
    {
      id: "order",
      title: "9. Pořádek, čistota a klid ostatních hostů",
      paragraphs: [
        "Udržujte prosím prostor bazénu čistý a uklizený a respektujte odpočinek ostatních hostů.",
        "Nábytek, lehátka a další vybavení kolem bazénu používejte pouze k určenému účelu.",
        "Po použití si prosím odneste své věci, ručníky, hračky i odpad.",
        "Hlasitá hudba nebo chování rušící ostatní není v okolí bazénu dovoleno."
      ]
    },
    {
      id: "camera-surveillance",
      title: "10. Kamerový dohled",
      paragraphs: [
        "Společný prostor Panorama Pool může být monitorován kamerovým systémem.",
        "Účelem kamerového monitoringu je ochrana hostů a ubytování, ochrana majetku, prevence škod a porušování pravidel a objasnění stížností, nehod nebo škodních událostí.",
        "Kamerový dohled není službou plavčíka ani nepřetržitým osobním dohledem a nenahrazuje dohled dospělých nad dětmi.",
        "Podrobná pravidla zpracování kamerových záznamů obsahují zásady ochrany osobních údajů Dandelion Vendégházak."
      ]
    },
    {
      id: "reporting",
      title: "11. Hlášení nehody, závady nebo znečištění",
      paragraphs: [
        "V případě nehody, zranění, nevolnosti, technické závady, znečištění nebo neobvyklé kvality vody prosím ihned informujte provozovatele.",
        "Zvlášť důležité je okamžitě hlásit, pokud:"
      ],
      bullets: issueBulletsCs
    },
    {
      id: "liability",
      title: "12. Odpovědnost",
      paragraphs: [
        "Bazén používáte na vlastní odpovědnost.",
        "Provozovatel nenese odpovědnost za nehody, zranění, škody nebo dodatečné náklady vzniklé nedodržením pravidel.",
        "U dětí odpovídá za jejich bezpečnost po celou dobu používání bazénu rodič nebo doprovázející dospělý.",
        "Při úmyslném nebo nedbalostním poškození nese náklady na opravu, obnovu nebo náhradu host, který škodu způsobil."
      ],
      important:
        "Použitím bazénu host bere na vědomí a přijímá tato pravidla používání bazénu."
    }
  ]
});

const createPoolGuide = ({ houseSlug, houseName }: PoolGuideHouse): GuideContent => ({
  slug: "medence",
  houseSlug,
  houseName,
  path: `/guide/${houseSlug}/medence/`,
  qrTarget: `https://dandelionhouse.hu/guide/${houseSlug}/medence/`,
  dePreparedTitle: "Poolnutzungsordnung",
  content: {
    hu: {
      title: "Panorama Pool - Medencehasználati szabályzat",
      subtitle: `Panorama Pool medencehasználati szabályzat - ${houseName}`,
      intro:
        "Hatályos: 2026. május 24. Módosítva: 2026. május 25. A Panorama Pool a Dandelion vendégek részére, a fürdési szezonban használható.",
      keyPoints: [
        "Nyitvatartás a fürdési szezonban: naponta 10:00-21:00.",
        "A medence használata saját felelősségre történik, úszómester nincs.",
        "Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét.",
        "A közös medencetér kamerás megfigyeléssel érintett terület.",
        "A medencefedést az esti utolsó használat után vissza kell tolni a medence fölé."
      ],
      backLabel: `Vissza a ${houseName} útmutatóhoz`,
      sections: [
        {
          id: "elfogadas",
          title: "A szabályzat elfogadása",
          paragraphs: [
            "A Panorama Pool a Dandelion vendégek részére, a fürdési szezonban használható.",
            "A medence használatával a vendég elfogadja a jelen Medencehasználati szabályzatot, és vállalja, hogy a medencét kizárólag az itt leírt szabályok betartásával használja."
          ]
        },
        {
          id: "nyitvatartas",
          title: "1. Nyitvatartás",
          paragraphs: [
            "A Panorama Pool a fürdési szezonban naponta 10:00-21:00 között használható.",
            "A medence nyitvatartási időn kívül nem használható.",
            "Az üzemeltető időjárási okból, karbantartás, vízkezelés, műszaki hiba, biztonsági ok vagy a szabályok megszegése esetén a medence használatát ideiglenesen korlátozhatja vagy szüneteltetheti."
          ]
        },
        {
          id: "hasznalat",
          title: "2. A medence használata",
          paragraphs: [
            "A medence használata saját felelősségre történik.",
            "A medencénél úszómester nem tartózkodik.",
            "A medence vízmélysége körülbelül 1,30 m. A medence nem ugrómedence, ezért fejest ugrani, vízbe ugrani, lökdösődni, a medence széléről beugrálni, valamint a medence körül futkározni tilos.",
            "A medencét minden vendég csak a saját úszástudásának, egészségi állapotának és fizikai állapotának megfelelően használhatja.",
            "Úszni nem tudó vagy bizonytalanul úszó vendég kizárólag megfelelő óvatossággal, szükség esetén úszást segítő eszközzel használhatja a medencét."
          ]
        },
        {
          id: "gyermekek",
          title: "3. Gyermekekre vonatkozó szabályok",
          paragraphs: [
            "Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét.",
            "A gyermekek biztonságáért minden esetben a velük érkező szülő, hozzátartozó vagy kísérő felnőtt felel.",
            "Gyermekeket a medencében vagy a medence környékén felügyelet nélkül hagyni tilos.",
            "Gyermekek a medencefedést nem mozgathatják, arra nem mászhatnak rá, és azon nem közlekedhetnek."
          ]
        },
        {
          id: "higienia",
          title: "4. Higiéniai szabályok",
          paragraphs: [
            "A medence használata előtt zuhanyzás kötelező.",
            "Naptej, testápoló, olaj vagy egyéb krém használata után kérjük, különösen figyeljetek a zuhanyzásra, mert ezek rontják a vízminőséget.",
            "A medencébe ételt, italt, sampont, tusfürdőt, habfürdőt, olajat vagy bármilyen idegen anyagot juttatni tilos.",
            "A medencében étkezni tilos.",
            "Kisgyermekek esetében kizárólag megfelelő fürdőpelenka használatával engedélyezett a medencehasználat.",
            "A medencét nem használhatja az, aki fertőző betegségben szenved, lázas, hasmenéses, hányásos tünetei vannak, illetve nyílt sebbel vagy bőrgyógyászati fertőzéssel rendelkezik."
          ]
        },
        {
          id: "tiltott",
          title: "5. Tiltott tárgyak és tevékenységek",
          paragraphs: [
            "A medencébe és közvetlen környezetébe üveget, üvegpoharat, törékeny tárgyat bevinni tilos.",
            "A medencében és a medence körül tilos:"
          ],
          bullets: forbiddenBulletsHu,
          important:
            "Háziállat a medencébe nem vihető. Ittas, bódult vagy tudatmódosító szer hatása alatt álló személy a medencét nem használhatja."
        },
        {
          id: "jatekok",
          title: "6. Felfújható eszközök, játékok",
          paragraphs: [
            "Felfújható játék, matrac, labda vagy egyéb vízi játék csak úgy használható, ha az más vendégeket nem zavar és nem veszélyeztet.",
            "Nagyméretű felfújható eszköz használatát az üzemeltető korlátozhatja vagy megtilthatja.",
            "A játékok és eszközök használatából eredő balesetekért a használó, gyermekek esetén a kísérő felnőtt felel."
          ]
        },
        {
          id: "medencefedes",
          title: "7. Medencefedés használata",
          paragraphs: [
            "A medence fedését a napi első használat előtt el kell húzni.",
            "Kérjük, hogy a medencefedést mindig óvatosan, lassan mozgassátok, hogy a fedés és a sín ne sérüljön.",
            "Az esti utolsó medencehasználat után a vendégek kötelesek a medencefedést visszatolni a medence fölé.",
            "A medencefedés visszatolása fontos a víz tisztasága, a hő megtartása és a biztonság miatt.",
            "A medencefedésre ráállni, ráülni, ráugrani vagy azon közlekedni tilos.",
            "Gyermekek a medencefedést nem mozgathatják.",
            "Ha a medencefedés akad, megszorul vagy rendellenesen működik, kérjük, ne erőltessétek, hanem azonnal jelezzétek az üzemeltetőnek."
          ]
        },
        {
          id: "idojaras",
          title: "8. Időjárás és rendkívüli helyzetek",
          paragraphs: [
            "Vihar, villámlás, erős szél vagy veszélyes időjárási körülmény esetén a medencét használni tilos.",
            "Villámlás esetén a medencét azonnal el kell hagyni.",
            "Karbantartás, vízkezelés, vegyszeres kezelés, műszaki hiba vagy rendellenes vízminőség esetén a medence ideiglenesen lezárható.",
            "A lezárt vagy használaton kívüli medencét használni tilos."
          ]
        },
        {
          id: "rend",
          title: "9. Rend, tisztaság, más vendégek nyugalma",
          paragraphs: [
            "Kérjük, a medence környékén ügyeljetek a rendre, a tisztaságra és a többi vendég pihenésére.",
            "A medence környezetében elhelyezett bútorokat, napozóágyakat és egyéb eszközöket rendeltetésszerűen kell használni.",
            "Használat után kérjük, a saját tárgyakat, törölközőket, játékokat és hulladékot vigyétek magatokkal.",
            "A medence környékén hangos zenehallgatás vagy másokat zavaró viselkedés nem megengedett."
          ]
        },
        {
          id: "kameras-megfigyeles",
          title: "10. Kamerás megfigyelés",
          paragraphs: [
            "A Panorama Pool közös medencetere kamerás megfigyeléssel érintett terület lehet.",
            "A kamerás megfigyelés célja a vendégek és a szálláshely biztonságának védelme, a vagyonvédelem, a károkozások és szabályszegések megelőzése, valamint panaszok, balesetek vagy káresemények tisztázása.",
            "A kamerás megfigyelés nem jelent úszómesteri vagy folyamatos személyes felügyeletet, és nem helyettesíti a gyermekek felnőtt felügyeletét.",
            "A kamerás adatkezelés részletes szabályait a Dandelion Vendégházak Adatkezelési tájékoztatója tartalmazza."
          ]
        },
        {
          id: "bejelentes",
          title: "11. Baleset, hiba, szennyezés bejelentése",
          paragraphs: [
            "Baleset, sérülés, rosszullét, műszaki hiba, szennyezés vagy rendellenes vízminőség esetén kérjük, azonnal értesítsétek az üzemeltetőt.",
            "Különösen fontos azonnal jelezni, ha:"
          ],
          bullets: issueBulletsHu
        },
        {
          id: "felelosseg",
          title: "12. Felelősség",
          paragraphs: [
            "A medence használata saját felelősségre történik.",
            "A szabályok be nem tartásából eredő balesetért, sérülésért, kárért vagy többletköltségért az üzemeltető felelősséget nem vállal.",
            "Gyermekek esetében a medencehasználat teljes ideje alatt a szülő vagy kísérő felnőtt felel a gyermek biztonságáért.",
            "Szándékos vagy gondatlan károkozás esetén a helyreállítás, javítás vagy pótlás költsége a kárt okozó vendéget terheli."
          ],
          important:
            "A medence használatával a vendég tudomásul veszi és elfogadja a jelen Medencehasználati szabályzatot."
        }
      ]
    },
    en: {
      title: "Panorama Pool - Pool Rules",
      subtitle: `Panorama Pool rules - ${houseName}`,
      intro:
        "Effective date: 24 May 2026. Modified: 25 May 2026. Panorama Pool may be used by Dandelion guests during the bathing season.",
      keyPoints: [
        "Opening hours during the bathing season: daily from 10:00 to 21:00.",
        "Guests use the pool at their own responsibility. There is no lifeguard on duty.",
        "Children may use the pool only under adult supervision.",
        "The shared pool area is covered by camera surveillance.",
        "After the last evening use, the pool cover must be pulled back over the pool."
      ],
      backLabel: `Back to the ${houseName} guide`,
      sections: [
        {
          id: "acceptance",
          title: "Acceptance of the rules",
          paragraphs: [
            "Panorama Pool may be used by Dandelion guests during the bathing season.",
            "By using the pool, the guest accepts these Pool Rules and agrees to use the pool only in accordance with the rules described here."
          ]
        },
        {
          id: "opening-hours",
          title: "1. Opening hours",
          paragraphs: [
            "During the bathing season, Panorama Pool may be used daily between 10:00 and 21:00.",
            "The pool may not be used outside opening hours.",
            "The operator may temporarily restrict or suspend pool use due to weather, maintenance, water treatment, technical issues, safety reasons or breach of the rules."
          ]
        },
        {
          id: "pool-use",
          title: "2. Use of the pool",
          paragraphs: [
            "Guests use the pool at their own responsibility.",
            "There is no lifeguard on duty at the pool.",
            "The water depth is approximately 1.30 m. The pool is not a diving pool, so diving head first, jumping into the water, pushing others, jumping in from the pool edge and running around the pool are prohibited.",
            "Each guest may use the pool only according to their own swimming ability, health condition and physical condition.",
            "Guests who cannot swim or who are uncertain swimmers may use the pool only with appropriate caution and, if necessary, with a swimming aid."
          ]
        },
        {
          id: "children",
          title: "3. Rules for children",
          paragraphs: [
            "Children may use the pool only under adult supervision.",
            "The parent, relative or accompanying adult is responsible for the safety of children in all cases.",
            "Children must not be left unattended in the pool or around the pool area.",
            "Children must not move the pool cover, climb onto it or walk on it."
          ]
        },
        {
          id: "hygiene",
          title: "4. Hygiene rules",
          paragraphs: [
            "Showering before using the pool is mandatory.",
            "After using sunscreen, body lotion, oil or any other cream, please pay particular attention to showering, as these products reduce water quality.",
            "Food, drinks, shampoo, shower gel, bath foam, oil or any foreign substance must not be introduced into the pool.",
            "Eating in the pool is prohibited.",
            "Small children may use the pool only with a suitable swim nappy.",
            "The pool must not be used by anyone with an infectious disease, fever, diarrhoea, vomiting symptoms, open wounds or dermatological infection."
          ]
        },
        {
          id: "forbidden",
          title: "5. Prohibited items and activities",
          paragraphs: [
            "Glass, glass cups and breakable objects must not be taken into the pool or its immediate surroundings.",
            "In and around the pool, the following are prohibited:"
          ],
          bullets: forbiddenBulletsEn,
          important:
            "Pets are not allowed in the pool. Persons who are intoxicated, under the influence of drugs or otherwise impaired may not use the pool."
        },
        {
          id: "toys",
          title: "6. Inflatable equipment and toys",
          paragraphs: [
            "Inflatable toys, mattresses, balls or other water toys may be used only if they do not disturb or endanger other guests.",
            "The operator may restrict or prohibit the use of large inflatable equipment.",
            "The user is responsible for accidents resulting from the use of toys and equipment; in the case of children, the accompanying adult is responsible."
          ]
        },
        {
          id: "pool-cover",
          title: "7. Use of the pool cover",
          paragraphs: [
            "The pool cover must be opened before the first use of the day.",
            "Please always move the pool cover carefully and slowly, so that the cover and rail are not damaged.",
            "After the last evening pool use, guests are required to pull the pool cover back over the pool.",
            "Closing the pool cover is important for water cleanliness, heat retention and safety.",
            "Standing, sitting, jumping or walking on the pool cover is prohibited.",
            "Children must not move the pool cover.",
            "If the pool cover gets stuck, jams or does not work normally, please do not force it and inform the operator immediately."
          ]
        },
        {
          id: "weather",
          title: "8. Weather and exceptional situations",
          paragraphs: [
            "The pool must not be used during storms, lightning, strong wind or dangerous weather conditions.",
            "In case of lightning, the pool must be left immediately.",
            "The pool may be temporarily closed due to maintenance, water treatment, chemical treatment, technical issues or abnormal water quality.",
            "A closed or out-of-use pool must not be used."
          ]
        },
        {
          id: "order",
          title: "9. Order, cleanliness and other guests' peace",
          paragraphs: [
            "Please keep the pool area tidy and clean, and respect other guests' rest.",
            "Furniture, sun loungers and other equipment placed around the pool must be used only for their intended purpose.",
            "After use, please take your own belongings, towels, toys and rubbish with you.",
            "Loud music or behaviour that disturbs others is not allowed around the pool."
          ]
        },
        {
          id: "camera-surveillance",
          title: "10. Camera surveillance",
          paragraphs: [
            "The shared Panorama Pool area may be covered by camera surveillance.",
            "The purpose of camera surveillance is to protect guests and the accommodation, protect property, prevent damage and breaches of rules, and clarify complaints, accidents or damage events.",
            "Camera surveillance does not constitute lifeguard service or continuous personal supervision, and it does not replace adult supervision of children.",
            "Detailed rules on camera-related data processing are set out in the Dandelion Guesthouses Privacy Policy."
          ]
        },
        {
          id: "reporting",
          title: "11. Reporting accidents, faults or contamination",
          paragraphs: [
            "In case of accident, injury, illness, technical fault, contamination or abnormal water quality, please notify the operator immediately.",
            "It is especially important to report immediately if:"
          ],
          bullets: issueBulletsEn
        },
        {
          id: "liability",
          title: "12. Liability",
          paragraphs: [
            "Guests use the pool at their own responsibility.",
            "The operator does not accept liability for accidents, injuries, damage or additional costs resulting from failure to follow the rules.",
            "In the case of children, the parent or accompanying adult is responsible for the child's safety throughout pool use.",
            "In case of intentional or negligent damage, the cost of repair, restoration or replacement shall be borne by the guest who caused the damage."
          ],
          important:
            "By using the pool, the guest acknowledges and accepts these Pool Rules."
        }
      ]
    },
    cs: createPoolGuideCsContent(houseName)
  }
});

// [CHANGE 2026-05-24 20:20] Medencehasznalati guide szabalyzati szovegre frissitve HU/EN tartalommal es hatalyossagi datummal.
// [CHANGE 2026-05-25 00:00] Medenceter kameras megfigyelesi tajekoztatas HU/EN tartalommal hozzaadva.
export const d1PoolGuide = createPoolGuide({
  houseSlug: "d1",
  houseName: "Dandelion D1"
});

export const d2PoolGuide = createPoolGuide({
  houseSlug: "d2",
  houseName: "Dandelion D2"
});

export const fugehazPoolGuide = createPoolGuide({
  houseSlug: "fugehaz",
  houseName: "Fügeház"
});

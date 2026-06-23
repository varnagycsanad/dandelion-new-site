export type PoolRulesLocale = "hu" | "en" | "de" | "cs" | "sk";

type PoolRulesSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  important?: string;
};

export type PoolRulesContent = {
  title: string;
  intro: string;
  summaryPoints: string[];
  detailsLabel: string;
  fullTitle: string;
  effectiveLabel: string;
  effectiveDate: string;
  updatedLabel: string;
  updatedDate: string;
  sections: PoolRulesSection[];
};

const poolRulesByLocale: Record<PoolRulesLocale, PoolRulesContent> = {
  hu: {
    title: "Medencehasználati szabályok",
    intro:
      "A Panorama Pool a Dandelion D1, Dandelion D2 és Fügeház vendégei részére, a fürdési szezonban használható. A medence használatával a vendég elfogadja a medencehasználati szabályzatot.",
    summaryPoints: [
      "A medence naponta 10:00-21:00 között használható.",
      "A medence használata saját felelősségre történik, úszómester nincs.",
      "Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét.",
      "A medence kb. 130 cm mély, nem ugrómedence: fejest ugrani és vízbe ugrálni tilos.",
      "Használat előtt zuhanyzás szükséges.",
      "Üveget, üvegpoharat és törékeny tárgyat a medence területére bevinni tilos.",
      "Vihar, villámlás, erős szél vagy veszélyes időjárás esetén a medence nem használható.",
      "Szeles időben a napernyőt le kell engedni, erős szélben nem szabad nyitva hagyni.",
      "Az esti utolsó használat után a medencefedést vissza kell tolni a medence fölé.",
      "A Panorama Pool területe kamerás megfigyeléssel érintett lehet."
    ],
    detailsLabel: "Teljes medencehasználati szabályzat megnyitása",
    fullTitle: "Panorama Pool - Medencehasználati szabályzat",
    effectiveLabel: "Hatályos",
    effectiveDate: "2026. május 24.",
    updatedLabel: "Módosítva",
    updatedDate: "2026. május 25.",
    sections: [
      {
        title: "A szabályzat elfogadása",
        paragraphs: [
          "A Panorama Pool a Dandelion D1, Dandelion D2 és Fügeház vendégei részére, a fürdési szezonban használható.",
          "A medence használatával a vendég elfogadja a jelen Medencehasználati szabályzatot, és vállalja, hogy a medencét kizárólag az itt leírt szabályok betartásával használja."
        ]
      },
      {
        title: "1. Nyitvatartás",
        paragraphs: [
          "A Panorama Pool a fürdési szezonban naponta 10:00-21:00 között használható.",
          "A medence nyitvatartási időn kívül nem használható.",
          "Az üzemeltető időjárási okból, karbantartás, vízkezelés, műszaki hiba, biztonsági ok vagy a szabályok megszegése esetén a medence használatát ideiglenesen korlátozhatja vagy szüneteltetheti."
        ]
      },
      {
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
        title: "3. Gyermekekre vonatkozó szabályok",
        paragraphs: [
          "Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét.",
          "A gyermekek biztonságáért minden esetben a velük érkező szülő, hozzátartozó vagy kísérő felnőtt felel.",
          "Gyermekeket a medencében vagy a medence környékén felügyelet nélkül hagyni tilos.",
          "Gyermekek a medencefedést nem mozgathatják, arra nem mászhatnak rá, és azon nem közlekedhetnek."
        ]
      },
      {
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
        title: "5. Tiltott tárgyak és tevékenységek",
        paragraphs: [
          "A medencébe és közvetlen környezetébe üveget, üvegpoharat, törékeny tárgyat bevinni tilos.",
          "A medencében és a medence körül tilos:"
        ],
        bullets: [
          "fejest ugrani;",
          "a vízbe ugrálni;",
          "futkározni;",
          "lökdösődni;",
          "másokat fröcsköléssel vagy hangoskodással zavarni;",
          "a medence szélén veszélyesen közlekedni;",
          "a medencefedésre ráállni, ráülni vagy ráugrani;",
          "elektromos eszközt a víz közvetlen közelében használni;",
          "szemetelni vagy a vizet szennyezni."
        ],
        important:
          "Háziállat a medencébe nem vihető. Ittas, bódult vagy tudatmódosító szer hatása alatt álló személy a medencét nem használhatja."
      },
      {
        title: "6. Felfújható eszközök, játékok",
        paragraphs: [
          "Felfújható játék, matrac, labda vagy egyéb vízi játék csak úgy használható, ha az más vendégeket nem zavar és nem veszélyeztet.",
          "Nagyméretű felfújható eszköz használatát az üzemeltető korlátozhatja vagy megtilthatja.",
          "A játékok és eszközök használatából eredő balesetekért a használó, gyermekek esetén a kísérő felnőtt felel."
        ]
      },
      {
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
        title: "8. Időjárás, napernyő és rendkívüli helyzetek",
        paragraphs: [
          "Vihar, villámlás, erős szél vagy veszélyes időjárási körülmény esetén a medencét használni tilos.",
          "Villámlás esetén a medencét azonnal el kell hagyni.",
          "Szeles időben a napernyőt le kell engedni, erős szélben nem szabad nyitva hagyni.",
          "Karbantartás, vízkezelés, vegyszeres kezelés, műszaki hiba vagy rendellenes vízminőség esetén a medence ideiglenesen lezárható.",
          "A lezárt vagy használaton kívüli medencét használni tilos."
        ]
      },
      {
        title: "9. Rend, tisztaság, más vendégek nyugalma",
        paragraphs: [
          "Kérjük, a medence környékén ügyeljetek a rendre, a tisztaságra és a többi vendég pihenésére.",
          "A medence környezetében elhelyezett bútorokat, napozóágyakat és egyéb eszközöket rendeltetésszerűen kell használni.",
          "Használat után kérjük, a saját tárgyakat, törölközőket, játékokat és hulladékot vigyétek magatokkal.",
          "A medence környékén hangos zenehallgatás vagy másokat zavaró viselkedés nem megengedett."
        ]
      },
      {
        title: "10. Kamerás megfigyelés",
        paragraphs: [
          "A Panorama Pool területe kamerás megfigyeléssel érintett terület lehet.",
          "A kamerás megfigyelés célja a vendégek és a szálláshely biztonságának védelme, a vagyonvédelem, a károkozások és szabályszegések megelőzése, valamint panaszok, balesetek vagy káresemények tisztázása.",
          "A kamerás megfigyelés nem jelent úszómesteri vagy folyamatos személyes felügyeletet, és nem helyettesíti a gyermekek felnőtt felügyeletét.",
          "A kamerás adatkezelés részletes szabályait a Dandelion Vendégházak Adatkezelési tájékoztatója tartalmazza."
        ]
      },
      {
        title: "11. Baleset, hiba, szennyezés bejelentése",
        paragraphs: [
          "Baleset, sérülés, rosszullét, műszaki hiba, szennyezés vagy rendellenes vízminőség esetén kérjük, azonnal értesítsétek az üzemeltetőt.",
          "Különösen fontos azonnal jelezni, ha:"
        ],
        bullets: [
          "üveg törik a medence körül;",
          "szennyeződés kerül a vízbe;",
          "a medencefedés megsérül vagy nem mozgatható;",
          "a víz színe, szaga vagy állapota szokatlan;",
          "valaki rosszul lesz vagy megsérül."
        ]
      },
      {
        title: "12. Felelősség",
        paragraphs: [
          "A medence használata saját felelősségre történik.",
          "A szabályok be nem tartásából eredő balesetért, sérülésért, kárért vagy többletköltségért az üzemeltető felelősséget nem vállal.",
          "Gyermekek esetében a medencehasználat teljes ideje alatt a szülő vagy kísérő felnőtt felel a gyermek biztonságáért.",
          "Szándékos vagy gondatlan károkozás esetén a helyreállítás, javítás vagy pótlás költsége a kárt okozó vendéget terheli."
        ]
      }
    ]
  },
  en: {
    title: "Pool rules",
    intro:
      "During the bathing season, Panorama Pool is available for guests of Dandelion D1, Dandelion D2 and Fügeház. By using the pool, the guest accepts the pool rules.",
    summaryPoints: [
      "The pool may be used daily between 10:00 and 21:00.",
      "Use of the pool is at your own risk and there is no lifeguard on duty.",
      "Children may use the pool only under adult supervision.",
      "The pool is approximately 130 cm deep and is not a diving pool; diving and jumping into the water are not allowed.",
      "Please shower before use.",
      "Glass, glassware and breakable objects are not allowed in the pool area.",
      "The pool may not be used during storms, lightning, strong wind or dangerous weather conditions.",
      "In windy weather, the sun umbrella must be closed, and in strong wind it must not be left open.",
      "After the last use in the evening, the pool cover must be pulled back over the pool.",
      "The Panorama Pool area may be covered by camera surveillance."
    ],
    detailsLabel: "Open full pool rules",
    fullTitle: "Panorama Pool - Pool rules",
    effectiveLabel: "Effective",
    effectiveDate: "24 May 2026",
    updatedLabel: "Updated",
    updatedDate: "25 May 2026",
    sections: [
      {
        title: "Acceptance of the rules",
        paragraphs: [
          "During the bathing season, Panorama Pool is available for guests of Dandelion D1, Dandelion D2 and Fügeház.",
          "By using the pool, the guest accepts these Pool Rules and agrees to use the pool only in accordance with the rules described here."
        ]
      },
      {
        title: "1. Opening hours",
        paragraphs: [
          "During the bathing season, Panorama Pool may be used daily between 10:00 and 21:00.",
          "The pool may not be used outside opening hours.",
          "The operator may temporarily restrict or suspend pool use due to weather, maintenance, water treatment, technical issues, safety reasons or breach of the rules."
        ]
      },
      {
        title: "2. Use of the pool",
        paragraphs: [
          "Use of the pool is at your own risk.",
          "There is no lifeguard on duty at the pool.",
          "The water depth is approximately 1.30 m. The pool is not a diving pool, so diving head first, jumping into the water, pushing others, jumping in from the pool edge and running around the pool are prohibited.",
          "Each guest may use the pool only according to their own swimming ability, health condition and physical condition.",
          "Guests who cannot swim or who are uncertain swimmers may use the pool only with appropriate caution and, if necessary, with a swimming aid."
        ]
      },
      {
        title: "3. Rules for children",
        paragraphs: [
          "Children may use the pool only under adult supervision.",
          "The parent, relative or accompanying adult is responsible for the safety of children in all cases.",
          "Children must not be left unattended in the pool or around the pool area.",
          "Children must not move the pool cover, climb onto it or walk on it."
        ]
      },
      {
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
        title: "5. Prohibited items and activities",
        paragraphs: [
          "Glass, glass cups and breakable objects must not be taken into the pool or its immediate surroundings.",
          "In and around the pool, the following are prohibited:"
        ],
        bullets: [
          "diving head first;",
          "jumping into the water;",
          "running around the pool;",
          "pushing others;",
          "disturbing others by splashing or shouting;",
          "moving dangerously around the pool edge;",
          "standing, sitting or jumping on the pool cover;",
          "using electrical devices directly near the water;",
          "littering or contaminating the water."
        ],
        important:
          "Pets are not allowed in the pool. Persons who are intoxicated, under the influence of drugs or otherwise impaired may not use the pool."
      },
      {
        title: "6. Inflatable equipment and toys",
        paragraphs: [
          "Inflatable toys, mattresses, balls or other water toys may be used only if they do not disturb or endanger other guests.",
          "The operator may restrict or prohibit the use of large inflatable equipment.",
          "The user is responsible for accidents resulting from the use of toys and equipment; in the case of children, the accompanying adult is responsible."
        ]
      },
      {
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
        title: "8. Weather, sun umbrella and exceptional situations",
        paragraphs: [
          "The pool must not be used during storms, lightning, strong wind or dangerous weather conditions.",
          "In case of lightning, the pool must be left immediately.",
          "In windy weather, the sun umbrella must be closed, and in strong wind it must not be left open.",
          "The pool may be temporarily closed due to maintenance, water treatment, chemical treatment, technical issues or abnormal water quality.",
          "A closed or out-of-use pool must not be used."
        ]
      },
      {
        title: "9. Order, cleanliness and other guests' peace",
        paragraphs: [
          "Please keep the pool area tidy and clean, and respect other guests' rest.",
          "Furniture, sun loungers and other equipment placed around the pool must be used only for their intended purpose.",
          "After use, please take your own belongings, towels, toys and rubbish with you.",
          "Loud music or behaviour that disturbs others is not allowed around the pool."
        ]
      },
      {
        title: "10. Camera surveillance",
        paragraphs: [
          "The Panorama Pool area may be covered by camera surveillance.",
          "The purpose of camera surveillance is to protect guests and the accommodation, protect property, prevent damage and breaches of rules, and clarify complaints, accidents or damage events.",
          "Camera surveillance does not constitute lifeguard service or continuous personal supervision, and it does not replace adult supervision of children.",
          "Detailed rules on camera-related data processing are set out in the Dandelion Guesthouses Privacy Policy."
        ]
      },
      {
        title: "11. Reporting accidents, faults or contamination",
        paragraphs: [
          "In case of accident, injury, illness, technical fault, contamination or abnormal water quality, please notify the operator immediately.",
          "It is especially important to report immediately if:"
        ],
        bullets: [
          "glass breaks around the pool;",
          "contamination gets into the water;",
          "the pool cover is damaged or cannot be moved;",
          "the colour, smell or condition of the water seems unusual;",
          "someone feels unwell or gets injured."
        ]
      },
      {
        title: "12. Liability",
        paragraphs: [
          "Use of the pool is at your own risk.",
          "The operator does not accept liability for accidents, injuries, damage or additional costs resulting from failure to follow the rules.",
          "In the case of children, the parent or accompanying adult is responsible for the child's safety throughout pool use.",
          "In case of intentional or negligent damage, the cost of repair, restoration or replacement shall be borne by the guest who caused the damage."
        ]
      }
    ]
  },
  de: {
    title: "Poolregeln",
    intro:
      "Während der Badesaison steht der Panorama Pool den Gästen von Dandelion D1, Dandelion D2 und Fügeház zur Verfügung. Mit der Nutzung des Pools akzeptiert der Gast die Poolregeln.",
    summaryPoints: [
      "Der Pool darf täglich zwischen 10:00 und 21:00 genutzt werden.",
      "Die Nutzung erfolgt auf eigene Verantwortung, es gibt keinen Bademeister.",
      "Kinder dürfen den Pool nur unter Aufsicht eines Erwachsenen nutzen.",
      "Der Pool ist ungefähr 130 cm tief und kein Sprungbecken; Kopfsprünge und Sprünge ins Wasser sind verboten.",
      "Vor der Nutzung ist Duschen erforderlich.",
      "Glas, Glasbecher und zerbrechliche Gegenstände sind im Poolbereich verboten.",
      "Bei Gewitter, Blitz, starkem Wind oder gefährlichen Wetterbedingungen darf der Pool nicht genutzt werden.",
      "Bei windigem Wetter muss der Sonnenschirm geschlossen werden; bei starkem Wind darf er nicht geöffnet bleiben.",
      "Nach der letzten Nutzung am Abend muss die Poolabdeckung wieder über den Pool gezogen werden.",
      "Der Panorama-Poolbereich kann videoüberwacht sein."
    ],
    detailsLabel: "Vollständige Poolregeln öffnen",
    fullTitle: "Panorama Pool - Poolregeln",
    effectiveLabel: "Gültig ab",
    effectiveDate: "24. Mai 2026",
    updatedLabel: "Geändert am",
    updatedDate: "25. Mai 2026",
    sections: [
      {
        title: "Annahme der Regeln",
        paragraphs: [
          "Während der Badesaison steht der Panorama Pool den Gästen von Dandelion D1, Dandelion D2 und Fügeház zur Verfügung.",
          "Mit der Nutzung des Pools akzeptiert der Gast diese Poolregeln und verpflichtet sich, den Pool nur nach den hier beschriebenen Regeln zu verwenden."
        ]
      },
      {
        title: "1. Öffnungszeiten",
        paragraphs: [
          "Während der Badesaison darf der Panorama Pool täglich zwischen 10:00 und 21:00 genutzt werden.",
          "Außerhalb der Öffnungszeiten darf der Pool nicht genutzt werden.",
          "Der Betreiber kann die Nutzung wegen Wetter, Wartung, Wasserbehandlung, technischer Probleme, Sicherheitsgründen oder Regelverstößen vorübergehend einschränken oder aussetzen."
        ]
      },
      {
        title: "2. Nutzung des Pools",
        paragraphs: [
          "Die Nutzung des Pools erfolgt auf eigene Verantwortung.",
          "Am Pool ist kein Bademeister anwesend.",
          "Die Wassertiefe beträgt ungefähr 1,30 m. Der Pool ist kein Sprungbecken; Kopfsprünge, Springen ins Wasser, Schubsen, Hineinspringen vom Beckenrand und Laufen rund um den Pool sind verboten.",
          "Jeder Gast darf den Pool nur entsprechend der eigenen Schwimmfähigkeit, Gesundheit und körperlichen Verfassung nutzen.",
          "Nichtschwimmer oder unsichere Schwimmer dürfen den Pool nur mit besonderer Vorsicht und bei Bedarf mit Schwimmhilfe nutzen."
        ]
      },
      {
        title: "3. Regeln für Kinder",
        paragraphs: [
          "Kinder dürfen den Pool nur unter Aufsicht eines Erwachsenen nutzen.",
          "Für die Sicherheit der Kinder ist immer der mitreisende Elternteil, Angehörige oder begleitende Erwachsene verantwortlich.",
          "Kinder dürfen im Pool oder im Poolbereich nicht unbeaufsichtigt gelassen werden.",
          "Kinder dürfen die Poolabdeckung nicht bewegen, nicht darauf klettern und nicht darauf laufen."
        ]
      },
      {
        title: "4. Hygieneregeln",
        paragraphs: [
          "Vor der Nutzung des Pools ist Duschen verpflichtend.",
          "Nach Sonnencreme, Körperlotion, Öl oder anderen Cremes bitten wir besonders auf das Duschen zu achten, da diese die Wasserqualität beeinträchtigen.",
          "Essen, Getränke, Shampoo, Duschgel, Schaumbad, Öl oder andere Fremdstoffe dürfen nicht in den Pool gelangen.",
          "Essen im Pool ist verboten.",
          "Kleinkinder dürfen den Pool nur mit geeigneter Schwimmwindel nutzen.",
          "Personen mit ansteckender Krankheit, Fieber, Durchfall, Erbrechen, offenen Wunden oder Hautinfektionen dürfen den Pool nicht nutzen."
        ]
      },
      {
        title: "5. Verbotene Gegenstände und Tätigkeiten",
        paragraphs: [
          "Glas, Glasbecher und zerbrechliche Gegenstände dürfen nicht in den Pool oder den unmittelbaren Poolbereich mitgenommen werden.",
          "Im Pool und rund um den Pool ist Folgendes verboten:"
        ],
        bullets: [
          "Kopfsprünge;",
          "ins Wasser springen;",
          "im Poolbereich laufen;",
          "andere Personen schubsen;",
          "andere Gäste durch Spritzen oder Lärm stören;",
          "sich am Poolrand gefährlich bewegen;",
          "auf die Poolabdeckung steigen, sich darauf setzen oder darauf springen;",
          "elektrische Geräte direkt am Wasser verwenden;",
          "Abfälle liegen lassen oder das Wasser verunreinigen."
        ],
        important:
          "Haustiere dürfen nicht in den Pool. Personen unter Alkohol-, Drogen- oder bewusstseinsveränderndem Einfluss dürfen den Pool nicht nutzen."
      },
      {
        title: "6. Aufblasbare Gegenstände und Spielzeug",
        paragraphs: [
          "Aufblasbares Spielzeug, Matratzen, Bälle oder anderes Wasserspielzeug dürfen nur genutzt werden, wenn sie andere Gäste nicht stören oder gefährden.",
          "Der Betreiber kann große aufblasbare Gegenstände einschränken oder verbieten.",
          "Für Unfälle durch Spielzeug oder Hilfsmittel ist der Nutzer verantwortlich; bei Kindern der begleitende Erwachsene."
        ]
      },
      {
        title: "7. Nutzung der Poolabdeckung",
        paragraphs: [
          "Vor der ersten Nutzung des Tages muss die Poolabdeckung geöffnet werden.",
          "Bitte bewegen Sie die Poolabdeckung immer vorsichtig und langsam, damit Abdeckung und Schiene nicht beschädigt werden.",
          "Nach der letzten Nutzung am Abend müssen Gäste die Poolabdeckung wieder über den Pool ziehen.",
          "Das Schließen der Abdeckung ist wichtig für Sauberkeit, Wärmeerhalt und Sicherheit.",
          "Auf die Poolabdeckung zu steigen, sich darauf zu setzen, darauf zu springen oder darauf zu laufen ist verboten.",
          "Kinder dürfen die Poolabdeckung nicht bewegen.",
          "Wenn die Abdeckung klemmt, blockiert oder ungewöhnlich funktioniert, bitte nicht erzwingen, sondern sofort den Betreiber informieren."
        ]
      },
      {
        title: "8. Wetter, Sonnenschirm und außergewöhnliche Situationen",
        paragraphs: [
          "Bei Gewitter, Blitz, starkem Wind oder gefährlichen Wetterbedingungen darf der Pool nicht genutzt werden.",
          "Bei Blitz muss der Pool sofort verlassen werden.",
          "Bei windigem Wetter muss der Sonnenschirm geschlossen werden; bei starkem Wind darf er nicht geöffnet bleiben.",
          "Der Pool kann wegen Wartung, Wasserbehandlung, chemischer Behandlung, technischer Probleme oder ungewöhnlicher Wasserqualität vorübergehend geschlossen werden.",
          "Ein geschlossener oder außer Betrieb befindlicher Pool darf nicht genutzt werden."
        ]
      },
      {
        title: "9. Ordnung, Sauberkeit und Ruhe anderer Gäste",
        paragraphs: [
          "Bitte halten Sie den Poolbereich sauber und respektieren Sie die Ruhe anderer Gäste.",
          "Möbel, Sonnenliegen und andere Gegenstände im Poolbereich dürfen nur bestimmungsgemäß genutzt werden.",
          "Nach der Nutzung nehmen Sie bitte eigene Gegenstände, Handtücher, Spielzeug und Abfall mit.",
          "Laute Musik oder störendes Verhalten ist im Poolbereich nicht erlaubt."
        ]
      },
      {
        title: "10. Videoüberwachung",
        paragraphs: [
          "Der Panorama-Poolbereich kann videoüberwacht sein.",
          "Zweck der Videoüberwachung ist der Schutz der Gäste und der Unterkunft, der Eigentumsschutz, die Vorbeugung von Schäden und Regelverstößen sowie die Klärung von Beschwerden, Unfällen oder Schadensfällen.",
          "Videoüberwachung ist kein Bademeisterdienst und keine dauerhafte persönliche Aufsicht; sie ersetzt nicht die Aufsicht von Kindern durch Erwachsene.",
          "Die detaillierten Regeln zur Kameradatenverarbeitung stehen in der Datenschutzerklärung der Dandelion Gästehäuser."
        ]
      },
      {
        title: "11. Meldung von Unfällen, Fehlern oder Verunreinigung",
        paragraphs: [
          "Bei Unfall, Verletzung, Unwohlsein, technischem Fehler, Verunreinigung oder ungewöhnlicher Wasserqualität informieren Sie bitte sofort den Betreiber.",
          "Besonders wichtig ist eine sofortige Meldung, wenn:"
        ],
        bullets: [
          "Glas im Poolbereich zerbricht;",
          "Schmutz oder Verunreinigung ins Wasser gelangt;",
          "die Poolabdeckung beschädigt ist oder nicht bewegt werden kann;",
          "Farbe, Geruch oder Zustand des Wassers ungewöhnlich wirken;",
          "sich jemand unwohl fühlt oder verletzt."
        ]
      },
      {
        title: "12. Haftung",
        paragraphs: [
          "Die Nutzung des Pools erfolgt auf eigene Verantwortung.",
          "Der Betreiber haftet nicht für Unfälle, Verletzungen, Schäden oder Zusatzkosten, die aus der Nichtbeachtung der Regeln entstehen.",
          "Bei Kindern ist der Elternteil oder begleitende Erwachsene während der gesamten Poolnutzung für die Sicherheit des Kindes verantwortlich.",
          "Bei vorsätzlicher oder fahrlässiger Beschädigung trägt der verursachende Gast die Kosten für Reparatur, Wiederherstellung oder Ersatz."
        ]
      }
    ]
  },
  cs: {
    title: "Pravidla používání bazénu",
    intro:
      "Během koupací sezóny je Panorama Pool k dispozici hostům ubytování Dandelion D1, Dandelion D2 a Fügeház. Použitím bazénu host přijímá pravidla používání bazénu.",
    summaryPoints: [
      "Bazén lze používat denně od 10:00 do 21:00.",
      "Používání bazénu je na vlastní odpovědnost a není zde plavčík.",
      "Děti mohou bazén používat pouze pod dohledem dospělé osoby.",
      "Bazén je hluboký přibližně 130 cm a není určen ke skákání; skoky po hlavě ani skákání do vody nejsou dovoleny.",
      "Před použitím je nutné se osprchovat.",
      "Sklo, skleněné nádobí a rozbitné předměty jsou v prostoru bazénu zakázány.",
      "Při bouřce, blescích, silném větru nebo nebezpečném počasí se bazén nesmí používat.",
      "Za větrného počasí je nutné slunečník zavřít; při silném větru nesmí zůstat otevřený.",
      "Po posledním večerním použití je nutné zastřešení zatáhnout zpět nad bazén.",
      "Prostor Panorama Pool může být monitorován kamerovým systémem."
    ],
    detailsLabel: "Otevřít úplná pravidla používání bazénu",
    fullTitle: "Panorama Pool - pravidla používání bazénu",
    effectiveLabel: "Platí od",
    effectiveDate: "24. května 2026",
    updatedLabel: "Upraveno",
    updatedDate: "25. května 2026",
    sections: [
      {
        title: "Přijetí pravidel",
        paragraphs: [
          "Během koupací sezóny je Panorama Pool k dispozici hostům ubytování Dandelion D1, Dandelion D2 a Fügeház.",
          "Použitím bazénu host přijímá tato pravidla a zavazuje se používat bazén pouze podle nich."
        ]
      },
      {
        title: "1. Otevírací doba",
        paragraphs: [
          "Během koupací sezóny je Panorama Pool otevřen denně od 10:00 do 21:00.",
          "Mimo otevírací dobu se bazén nesmí používat.",
          "Provozovatel může používání bazénu dočasně omezit nebo pozastavit kvůli počasí, údržbě, úpravě vody, technické závadě, bezpečnostním důvodům nebo porušení pravidel."
        ]
      },
      {
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
        title: "3. Pravidla pro děti",
        paragraphs: [
          "Děti mohou bazén používat pouze pod dohledem dospělé osoby.",
          "Za bezpečnost dětí vždy odpovídá rodič, příbuzný nebo doprovázející dospělý.",
          "Děti nesmí zůstat v bazénu ani v jeho okolí bez dozoru.",
          "Děti nesmí pohybovat se zastřešením bazénu, lézt na něj ani po něm chodit."
        ]
      },
      {
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
        title: "5. Zakázané předměty a činnosti",
        paragraphs: [
          "Do bazénu ani do jeho bezprostředního okolí se nesmí nosit sklo, skleněné kelímky ani rozbitné předměty.",
          "V bazénu a jeho okolí je zakázáno:"
        ],
        bullets: [
          "skákat do vody po hlavě;",
          "skákat do vody;",
          "běhat kolem bazénu;",
          "strkat do ostatních;",
          "rušit ostatní cákáním nebo křikem;",
          "pohybovat se nebezpečně u okraje bazénu;",
          "stát, sedět nebo skákat na zastřešení bazénu;",
          "používat elektrická zařízení přímo u vody;",
          "odhazovat odpadky nebo znečišťovat vodu."
        ],
        important:
          "Domácí zvířata do bazénu nesmí. Osoba pod vlivem alkoholu, drog nebo jinak ovlivněná nesmí bazén používat."
      },
      {
        title: "6. Nafukovací pomůcky a hračky",
        paragraphs: [
          "Nafukovací hračky, matrace, míče nebo jiné vodní hračky lze používat pouze tehdy, pokud neruší a neohrožují ostatní hosty.",
          "Provozovatel může použití velkých nafukovacích pomůcek omezit nebo zakázat.",
          "Za nehody způsobené používáním hraček a pomůcek odpovídá uživatel, u dětí doprovázející dospělý."
        ]
      },
      {
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
        title: "8. Počasí, slunečník a mimořádné situace",
        paragraphs: [
          "Bazén se nesmí používat při bouřce, blescích, silném větru nebo nebezpečném počasí.",
          "Při blescích je nutné bazén okamžitě opustit.",
          "Za větrného počasí je nutné slunečník zavřít; při silném větru nesmí zůstat otevřený.",
          "Bazén může být dočasně uzavřen kvůli údržbě, úpravě vody, chemickému ošetření, technické závadě nebo neobvyklé kvalitě vody.",
          "Uzavřený nebo mimo provoz označený bazén se nesmí používat."
        ]
      },
      {
        title: "9. Pořádek, čistota a klid ostatních hostů",
        paragraphs: [
          "Udržujte prosím prostor bazénu čistý a uklizený a respektujte odpočinek ostatních hostů.",
          "Nábytek, lehátka a další vybavení kolem bazénu používejte pouze k určenému účelu.",
          "Po použití si prosím odneste své věci, ručníky, hračky i odpad.",
          "Hlasitá hudba nebo chování rušící ostatní není v okolí bazénu dovoleno."
        ]
      },
      {
        title: "10. Kamerový dohled",
        paragraphs: [
          "Prostor Panorama Pool může být monitorován kamerovým systémem.",
          "Účelem kamerového monitoringu je ochrana hostů a ubytování, ochrana majetku, prevence škod a porušování pravidel a objasnění stížností, nehod nebo škodních událostí.",
          "Kamerový dohled není službou plavčíka ani nepřetržitým osobním dohledem a nenahrazuje dohled dospělých nad dětmi.",
          "Podrobná pravidla zpracování kamerových záznamů obsahují zásady ochrany osobních údajů Dandelion Vendégházak."
        ]
      },
      {
        title: "11. Hlášení nehody, závady nebo znečištění",
        paragraphs: [
          "V případě nehody, zranění, nevolnosti, technické závady, znečištění nebo neobvyklé kvality vody prosím ihned informujte provozovatele.",
          "Zvlášť důležité je okamžitě hlásit, pokud:"
        ],
        bullets: [
          "se kolem bazénu rozbije sklo;",
          "do vody se dostane nečistota;",
          "zastřešení bazénu je poškozené nebo s ním nelze pohnout;",
          "barva, zápach nebo stav vody je neobvyklý;",
          "někomu se udělá špatně nebo se zraní."
        ]
      },
      {
        title: "12. Odpovědnost",
        paragraphs: [
          "Bazén používáte na vlastní odpovědnost.",
          "Provozovatel nenese odpovědnost za nehody, zranění, škody nebo dodatečné náklady vzniklé nedodržením pravidel.",
          "U dětí odpovídá za jejich bezpečnost po celou dobu používání bazénu rodič nebo doprovázející dospělý.",
          "Při úmyslném nebo nedbalostním poškození nese náklady na opravu, obnovu nebo náhradu host, který škodu způsobil."
        ]
      }
    ]
  },
  sk: {
    title: "Pravidlá používania bazéna",
    intro:
      "Počas kúpacej sezóny je Panorama Pool k dispozícii hosťom ubytovaní Dandelion D1, Dandelion D2 a Fügeház. Používaním bazéna hosť prijíma pravidlá používania bazéna.",
    summaryPoints: [
      "Bazén je možné využívať denne od 10:00 do 21:00.",
      "Používanie bazéna je na vlastnú zodpovednosť a pri bazéne nie je plavčík.",
      "Deti môžu bazén používať iba pod dohľadom dospelej osoby.",
      "Bazén má približne 130 cm hĺbku a nie je určený na skákanie; skoky po hlave ani skákanie do vody nie sú povolené.",
      "Pred použitím je potrebné sa osprchovať.",
      "Sklo, sklenené poháre a krehké predmety sú v priestore bazéna zakázané.",
      "Počas búrky, bleskov, silného vetra alebo nebezpečného počasia sa bazén nesmie používať.",
      "Vo veternom počasí je potrebné slnečník zavrieť; pri silnom vetre nesmie zostať otvorený.",
      "Po poslednom večernom použití je potrebné zastrešenie posunúť späť nad bazén.",
      "Priestor Panorama Pool môže byť monitorovaný kamerovým systémom."
    ],
    detailsLabel: "Otvoriť úplné pravidlá používania bazéna",
    fullTitle: "Panorama Pool - pravidlá používania bazéna",
    effectiveLabel: "Platné od",
    effectiveDate: "24. mája 2026",
    updatedLabel: "Upravené",
    updatedDate: "25. mája 2026",
    sections: [
      {
        title: "Prijatie pravidiel",
        paragraphs: [
          "Počas kúpacej sezóny je Panorama Pool k dispozícii hosťom ubytovaní Dandelion D1, Dandelion D2 a Fügeház.",
          "Používaním bazéna hosť prijíma tieto pravidlá a zaväzuje sa používať bazén iba podľa nich."
        ]
      },
      {
        title: "1. Otváracie hodiny",
        paragraphs: [
          "Počas kúpacej sezóny je Panorama Pool otvorený denne od 10:00 do 21:00.",
          "Mimo otváracích hodín sa bazén nesmie používať.",
          "Prevádzkovateľ môže používanie bazéna dočasne obmedziť alebo pozastaviť z dôvodu počasia, údržby, úpravy vody, technickej poruchy, bezpečnostných dôvodov alebo porušenia pravidiel."
        ]
      },
      {
        title: "2. Používanie bazéna",
        paragraphs: [
          "Používanie bazéna je na vlastnú zodpovednosť.",
          "Pri bazéne nie je plavčík.",
          "Hĺbka vody je približne 1,30 m. Bazén nie je skokanský bazén, preto je zakázané skákať po hlave, skákať do vody, strkať do ostatných, skákať z okraja bazéna a behať okolo bazéna.",
          "Každý hosť smie bazén používať len podľa svojich plaveckých schopností, zdravotného a fyzického stavu.",
          "Hostia, ktorí nevedia plávať alebo si nie sú istí, môžu bazén používať iba s primeranou opatrnosťou a v prípade potreby s plaveckou pomôckou."
        ]
      },
      {
        title: "3. Pravidlá pre deti",
        paragraphs: [
          "Deti môžu bazén používať iba pod dohľadom dospelej osoby.",
          "Za bezpečnosť detí vždy zodpovedá rodič, príbuzný alebo sprevádzajúci dospelý.",
          "Deti nesmú zostať v bazéne ani v jeho okolí bez dozoru.",
          "Deti nesmú pohybovať zastrešením bazéna, liezť naň ani po ňom chodiť."
        ]
      },
      {
        title: "4. Hygienické pravidlá",
        paragraphs: [
          "Pred použitím bazéna je sprchovanie povinné.",
          "Po použití opaľovacieho krému, telového mlieka, oleja alebo inej kozmetiky sa prosím dôkladne osprchujte, pretože tieto prípravky zhoršujú kvalitu vody.",
          "Do bazéna sa nesmie dostať jedlo, nápoje, šampón, sprchový gél, pena do kúpeľa, olej ani žiadna cudzia látka.",
          "Jesť v bazéne je zakázané.",
          "Malé deti môžu bazén používať iba s vhodnou plávacou plienkou.",
          "Bazén nesmie používať osoba s infekčným ochorením, horúčkou, hnačkou, vracaním, otvorenou ranou alebo kožnou infekciou."
        ]
      },
      {
        title: "5. Zakázané predmety a činnosti",
        paragraphs: [
          "Do bazéna ani do jeho bezprostredného okolia sa nesmie nosiť sklo, sklenené poháre ani krehké predmety.",
          "V bazéne a jeho okolí je zakázané:"
        ],
        bullets: [
          "skákať do vody po hlave;",
          "skákať do vody;",
          "behať okolo bazéna;",
          "strkať do ostatných;",
          "rušiť ostatných striekaním alebo krikom;",
          "pohybovať sa nebezpečne pri okraji bazéna;",
          "stáť, sedieť alebo skákať na zastrešení bazéna;",
          "používať elektrické zariadenia priamo pri vode;",
          "odhadzovať odpadky alebo znečisťovať vodu."
        ],
        important:
          "Domáce zvieratá do bazéna nesmú. Osoba pod vplyvom alkoholu, drog alebo iných omamných látok nesmie bazén používať."
      },
      {
        title: "6. Nafukovacie pomôcky a hračky",
        paragraphs: [
          "Nafukovacie hračky, matrace, lopty alebo iné vodné hračky možno používať iba vtedy, ak nerušia a neohrozujú ostatných hostí.",
          "Prevádzkovateľ môže používanie veľkých nafukovacích pomôcok obmedziť alebo zakázať.",
          "Za nehody spôsobené používaním hračiek a pomôcok zodpovedá používateľ, pri deťoch sprevádzajúci dospelý."
        ]
      },
      {
        title: "7. Používanie zastrešenia bazéna",
        paragraphs: [
          "Pred prvým použitím dňa je potrebné zastrešenie bazéna odsunúť.",
          "So zastrešením pohybujte vždy opatrne a pomaly, aby sa nepoškodilo zastrešenie ani koľajnica.",
          "Po poslednom večernom použití musia hostia zastrešenie posunúť späť nad bazén.",
          "Zatvorenie zastrešenia je dôležité pre čistotu vody, udržanie tepla a bezpečnosť.",
          "Na zastrešenie je zakázané stúpať, sedieť, skákať alebo po ňom chodiť.",
          "Deti nesmú so zastrešením manipulovať.",
          "Ak sa zastrešenie zasekne alebo nefunguje správne, nepoužívajte silu a okamžite informujte prevádzkovateľa."
        ]
      },
      {
        title: "8. Počasie, slnečník a mimoriadne situácie",
        paragraphs: [
          "Bazén sa nesmie používať počas búrky, bleskov, silného vetra alebo nebezpečného počasia.",
          "Pri bleskoch je potrebné bazén okamžite opustiť.",
          "Vo veternom počasí je potrebné slnečník zavrieť; pri silnom vetre nesmie zostať otvorený.",
          "Bazén môže byť dočasne uzatvorený z dôvodu údržby, úpravy vody, chemického ošetrenia, technickej poruchy alebo neobvyklej kvality vody.",
          "Uzatvorený alebo mimo prevádzky označený bazén sa nesmie používať."
        ]
      },
      {
        title: "9. Poriadok, čistota a pokoj ostatných hostí",
        paragraphs: [
          "Prosíme, udržiavajte priestor pri bazéne čistý a uprataný a rešpektujte oddych ostatných hostí.",
          "Nábytok, ležadlá a ďalšie vybavenie pri bazéne používajte len na určený účel.",
          "Po použití si prosím odneste svoje veci, uteráky, hračky aj odpad.",
          "Hlasná hudba alebo správanie rušiace ostatných nie je v okolí bazéna dovolené."
        ]
      },
      {
        title: "10. Kamerový dohľad",
        paragraphs: [
          "Priestor Panorama Pool môže byť monitorovaný kamerovým systémom.",
          "Účelom kamerového monitoringu je ochrana hostí a ubytovania, ochrana majetku, predchádzanie škodám a porušovaniu pravidiel a objasnenie sťažností, nehôd alebo škodových udalostí.",
          "Kamerový dohľad nie je službou plavčíka ani nepretržitým osobným dohľadom a nenahrádza dohľad dospelých nad deťmi.",
          "Podrobné pravidlá spracovania kamerových záznamov obsahujú zásady ochrany osobných údajov Dandelion Vendégházak."
        ]
      },
      {
        title: "11. Hlásenie nehody, poruchy alebo znečistenia",
        paragraphs: [
          "V prípade nehody, zranenia, nevoľnosti, technickej poruchy, znečistenia alebo neobvyklej kvality vody prosím ihneď informujte prevádzkovateľa.",
          "Osobitne dôležité je okamžite nahlásiť, ak:"
        ],
        bullets: [
          "sa pri bazéne rozbije sklo;",
          "do vody sa dostane znečistenie;",
          "zastrešenie bazéna je poškodené alebo sa s ním nedá pohnúť;",
          "farba, vôňa alebo stav vody sú neobvyklé;",
          "niekomu príde nevoľno alebo sa zraní."
        ]
      },
      {
        title: "12. Zodpovednosť",
        paragraphs: [
          "Používanie bazéna je na vlastnú zodpovednosť.",
          "Prevádzkovateľ nenesie zodpovednosť za nehody, zranenia, škody alebo dodatočné náklady vzniknuté nedodržaním pravidiel.",
          "Pri deťoch zodpovedá za ich bezpečnosť počas celej doby používania bazéna rodič alebo sprevádzajúci dospelý.",
          "Pri úmyselnom alebo nedbanlivom poškodení znáša náklady na opravu, obnovenie alebo náhradu hosť, ktorý škodu spôsobil."
        ]
      }
    ]
  }
};

export const getPoolRulesContent = (locale: PoolRulesLocale) => poolRulesByLocale[locale];

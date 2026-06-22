import type { GuideContent, GuideLocale, GuideLocaleContent, GuideSection } from "./types";
import { d2AszfGuide } from "./d2-aszf";

// [CHANGE 2026-06-22 21:20] D1 hasznalati es ASZF guide letrehozva a friss legal oldalakhoz igazitott tartalommal.

const replaceCommon = (value: string) =>
  value.replaceAll("Dandelion D2", "Dandelion D1").replaceAll("/guide/d2/medence/", "/guide/d1/medence/");

const mapSections = (locale: GuideLocale, overrides: Partial<Record<string, Partial<GuideSection>>>) =>
  d2AszfGuide.content[locale].sections.map((section) => {
    const override = overrides[section.id];

    return {
      ...section,
      title: replaceCommon(section.title),
      paragraphs: (override?.paragraphs ?? section.paragraphs).map(replaceCommon),
      bullets: (override?.bullets ?? section.bullets)?.map(replaceCommon),
      steps: (override?.steps ?? section.steps)?.map(replaceCommon),
      important: replaceCommon(override?.important ?? section.important ?? "")
    };
  });

const paymentParagraphsHu = [
  "A foglalás véglegesítéséhez a foglalás értékének 30%-a előlegként fizetendő.",
  "Az előleg a foglalási folyamat során online bankkártyás fizetéssel, SabeePay rendszeren keresztül, vagy banki átutalással fizethető.",
  "Online bankkártyás fizetés esetén az előleg a foglalás véglegesítésekor kerül megterhelésre. A fennmaradó összeg a szállásadó fizetési szabályzata szerint, legkésőbb az érkezéskor / tartózkodás során rendezendő.",
  "Banki átutalás választása esetén az előleget a foglalást követően azonnal, de legkésőbb 1 munkanapon belül kérjük elutalni. A foglalás az előleg beérkezése után tekinthető garantáltnak.",
  "A közleményben kérjük feltüntetni a foglalási nevet és az érkezési dátumot. Ha a foglaló nem az érkező vendég, akkor az érkező vendég neve is szerepeljen.",
  "OTA foglalás, például Booking.com vagy Airbnb esetén mindig az adott értékesítési csatorna saját fizetési és lemondási feltételei az irányadók."
];

const transferParagraphsHu = [
  "Banki átutalás választása esetén kérjük, mindig a foglalt szálláshelyhez tartozó utalási adatokat használd."
];

const transferBulletsHu = [
  "Dandelion D1 / Dandelion D2 / Fügeház - Kedvezményezett: Várnagy Ilona",
  "Revolut: @ilonai62b",
  "Számlaszám / IBAN: LT17 3250 0224 2786 2232",
  "SWIFT/BIC: REVOLT21",
  "A közleményben kérjük feltüntetni a foglalási nevet és az érkezési dátumot."
];

const cancellationParagraphsHu = [
  "A lemondás akkor érvényes, ha azt a vendég írásban, e-mailben megküldi, vagy a foglalási rendszeren, illetve az értékesítési csatornán keresztül hivatalosan lemondja. A lemondás időpontjának a beérkezés időpontja számít.",
  "Ha az előleg visszajár, azt legkésőbb 5 munkanapon belül visszautaljuk arra a bankszámlára, ahonnan az előleg érkezett, vagy amelyet a vendég írásban megad."
];

const cancellationBulletsHu = [
  "Díjmentes lemondás: érkezés előtt legalább 30 nappal történő lemondás esetén a befizetett előleg visszajár.",
  "30 napon belüli lemondás: a befizetett 30% előleg nem visszatérítendő.",
  "No-show vagy érkezés napján történő lemondás esetén a foglalás teljes összege fizetendő."
];

const petsBulletsHu = [
  "A berendezést rendeltetésszerűen kell használni, a tűz- és balesetvédelmi szabályok betartása kötelező.",
  "Dohányzás: minden szálláshely beltéren nemdohányzó. Kültéren dohányozni csak az erre alkalmas helyeken megengedett, csikket eldobni tilos. Beltéri dohányzás esetén 30.000 Ft extra takarítási díjat számítunk fel.",
  "Kisállat csak az erre kijelölt szálláshelyeken hozható. Jelenleg kisállat fogadására alkalmas szállásaink: Dandelion D1, Dandelion D2 és Fügeház. Kisállattal érkező foglalás esetén előzetes egyeztetés szükséges."
];

const paymentParagraphsEn = [
  "To finalize the booking, 30% of the total booking value must be paid as a deposit.",
  "The deposit can be paid during the booking process either online by bank card through the SabeePay system or by bank transfer.",
  "In the case of online card payment, the deposit is charged when the booking is finalized. The remaining amount must be settled according to the accommodation provider's payment policy, at the latest on arrival or during the stay.",
  "If bank transfer is chosen, please send the deposit immediately after booking, but no later than within 1 working day. The booking is considered guaranteed after the deposit has been received.",
  "Please include the booking name and the arrival date in the transfer reference. If the person making the payment is not the arriving guest, please also include the arriving guest's name.",
  "For OTA bookings, for example through Booking.com or Airbnb, the payment and cancellation terms of the relevant sales channel always apply."
];

const transferParagraphsEn = [
  "If bank transfer is chosen, please always use the transfer details assigned to the booked accommodation."
];

const transferBulletsEn = [
  "Dandelion D1 / Dandelion D2 / Fügeház - Beneficiary: Ilona Varnagy",
  "Revolut: @ilonai62b",
  "Account number / IBAN: LT17 3250 0224 2786 2232",
  "SWIFT/BIC: REVOLT21",
  "Please include the booking name and the arrival date in the transfer reference."
];

const cancellationParagraphsEn = [
  "Cancellation is valid when sent by the guest in writing by e-mail, or officially cancelled through the booking system or the sales channel. The time of cancellation is the time when it is received.",
  "If the deposit is refundable, we will transfer it back within 5 working days to the bank account from which the deposit was received, or to another account provided by the guest in writing."
];

const cancellationBulletsEn = [
  "Free cancellation: if cancelled at least 30 days before arrival, the paid deposit is refunded.",
  "Cancellation within 30 days: the paid 30% deposit is non-refundable.",
  "In case of no-show or cancellation on the day of arrival, the full booking amount is payable."
];

const petsBulletsEn = [
  "Furniture, equipment and fittings must be used properly, and fire safety and accident prevention rules must be followed.",
  "Smoking: smoking is prohibited indoors in all accommodations. Outdoors, smoking is allowed only in suitable designated areas, and cigarette butts must not be thrown away. Indoor smoking results in an extra cleaning fee of HUF 30,000.",
  "Pets are allowed only at designated accommodations. Currently, pet-friendly accommodations are Dandelion D1, Dandelion D2 and Fügeház. Prior arrangement is required for bookings with pets."
];

const paymentParagraphsCs = [
  "Pro dokončení rezervace je nutné uhradit zálohu ve výši 30 % z celkové hodnoty rezervace.",
  "Zálohu lze během rezervačního procesu zaplatit online platební kartou přes systém SabeePay nebo bankovním převodem.",
  "Při online platbě kartou je záloha stržena při dokončení rezervace. Zbývající částka se hradí podle platebních pravidel ubytovatele, nejpozději při příjezdu nebo během pobytu.",
  "Pokud zvolíte bankovní převod, prosíme o odeslání zálohy ihned po rezervaci, nejpozději však do 1 pracovního dne. Rezervace je považována za garantovanou po připsání zálohy.",
  "Do poznámky k platbě prosíme uveďte jméno rezervace a datum příjezdu. Pokud platbu provádí jiná osoba než přijíždějící host, uveďte také jméno přijíždějícího hosta.",
  "U OTA rezervací, například přes Booking.com nebo Airbnb, se vždy řiďte platebními a storno podmínkami daného prodejního kanálu."
];

const transferParagraphsCs = [
  "Pokud zvolíte bankovní převod, používejte vždy platební údaje příslušné k rezervovanému ubytování."
];

const transferBulletsCs = [
  "Dandelion D1 / Dandelion D2 / Fügeház - Příjemce: Ilona Varnagy",
  "Revolut: @ilonai62b",
  "Číslo účtu / IBAN: LT17 3250 0224 2786 2232",
  "SWIFT/BIC: REVOLT21",
  "Do poznámky k platbě prosíme uveďte jméno rezervace a datum příjezdu."
];

const cancellationParagraphsCs = [
  "Storno je platné, pokud jej host zašle písemně e-mailem nebo jej oficiálně zruší přes rezervační systém či prodejní kanál. Za čas storna se považuje okamžik doručení.",
  "Pokud je záloha vratná, vrátíme ji nejpozději do 5 pracovních dnů na bankovní účet, ze kterého přišla, nebo na jiný účet písemně uvedený hostem."
];

const cancellationBulletsCs = [
  "Bezplatné storno: při zrušení alespoň 30 dní před příjezdem se uhrazená záloha vrací.",
  "Storno do 30 dní: uhrazená 30% záloha je nevratná.",
  "V případě nedojezdu nebo zrušení v den příjezdu je splatná celá částka rezervace."
];

const petsBulletsCs = [
  "Vybavení je nutné používat řádně; dodržování požárních a bezpečnostních pravidel je povinné.",
  "Kouření: ve všech ubytováních je v interiéru zakázáno. Venku je kouření povoleno pouze na vhodných místech a nedopalky se nesmí odhazovat. Kouření v interiéru znamená mimořádný poplatek za úklid 30 000 HUF.",
  "Domácí mazlíčci jsou povoleni pouze ve vybraných ubytováních. Aktuálně jsou pro pobyt se zvířaty vhodná ubytování Dandelion D1, Dandelion D2 a Fügeház. Rezervaci s domácím mazlíčkem je nutné předem domluvit."
];

const paymentParagraphsDe = [
  "Zur Finalisierung der Buchung sind 30% des Buchungswerts als Anzahlung zu leisten.",
  "Die Anzahlung kann während des Buchungsprozesses entweder online per Bankkarte über das SabeePay-System oder per Banküberweisung bezahlt werden.",
  "Bei Online-Kartenzahlung wird die Anzahlung bei Finalisierung der Buchung belastet. Der Restbetrag ist gemäß der Zahlungsregelung des Unterkunftgebers spätestens bei Anreise oder während des Aufenthalts zu begleichen.",
  "Wenn Banküberweisung gewählt wird, bitten wir darum, die Anzahlung sofort nach der Buchung, spätestens jedoch innerhalb von 1 Werktag zu überweisen. Die Buchung gilt nach Eingang der Anzahlung als garantiert.",
  "Bitte geben Sie im Verwendungszweck den Buchungsnamen und das Anreisedatum an. Wenn die zahlende Person nicht der anreisende Gast ist, geben Sie bitte auch den Namen des anreisenden Gastes an.",
  "Bei OTA-Buchungen, zum Beispiel über Booking.com oder Airbnb, gelten immer die Zahlungs- und Stornierungsbedingungen des jeweiligen Vertriebskanals."
];

const transferParagraphsDe = [
  "Wenn Banküberweisung gewählt wird, verwenden Sie bitte immer die zur gebuchten Unterkunft gehörenden Überweisungsdaten."
];

const transferBulletsDe = [
  "Dandelion D1 / Dandelion D2 / Fügeház - Begünstigte: Ilona Varnagy",
  "Revolut: @ilonai62b",
  "Kontonummer / IBAN: LT17 3250 0224 2786 2232",
  "SWIFT/BIC: REVOLT21",
  "Bitte geben Sie im Verwendungszweck den Buchungsnamen und das Anreisedatum an."
];

const cancellationParagraphsDe = [
  "Eine Stornierung ist gültig, wenn der Gast sie schriftlich per E-Mail sendet oder offiziell über das Buchungssystem beziehungsweise den Vertriebskanal storniert. Als Zeitpunkt der Stornierung gilt der Zeitpunkt des Eingangs.",
  "Wenn die Anzahlung zurückzuzahlen ist, überweisen wir sie spätestens innerhalb von 5 Werktagen auf das Konto zurück, von dem die Anzahlung eingegangen ist, oder auf ein vom Gast schriftlich angegebenes Konto."
];

const cancellationBulletsDe = [
  "Kostenfreie Stornierung: Bei Stornierung mindestens 30 Tage vor Anreise wird die gezahlte Anzahlung zurückerstattet.",
  "Stornierung innerhalb von 30 Tagen: Die gezahlte 30% Anzahlung ist nicht erstattbar.",
  "Bei No-Show oder Stornierung am Anreisetag ist der vollständige Buchungsbetrag zahlbar."
];

const petsBulletsDe = [
  "Möbel, Ausstattung und Einrichtungen sind sachgemäß zu nutzen.",
  "Rauchen: In allen Unterkünften ist Rauchen in Innenräumen verboten. Im Außenbereich ist Rauchen nur an dafür geeigneten Stellen erlaubt, und Zigarettenstummel dürfen nicht weggeworfen werden. Rauchen im Innenbereich führt zu einer zusätzlichen Reinigungsgebühr von 30.000 HUF.",
  "Haustiere sind nur in dafür vorgesehenen Unterkünften erlaubt. Derzeit sind Dandelion D1, Dandelion D2 und Fügeház haustierfreundlich. Bei Buchungen mit Haustier ist eine vorherige Abstimmung erforderlich."
];

const buildContent = (
  locale: GuideLocale,
  title: string,
  subtitle: string,
  intro: string,
  keyPoints: string[],
  backLabel: string,
  sectionOverrides: Partial<Record<string, Partial<GuideSection>>>
): GuideLocaleContent => ({
  title,
  subtitle,
  intro,
  keyPoints,
  backLabel,
  sections: mapSections(locale, sectionOverrides)
});

const contentHu = buildContent(
  "hu",
  "Dandelion D1 - ÁSZF és használati szabályok",
  "Dandelion D1 ÁSZF és használati szabályok",
  "A Dandelion D1 foglalási, tartózkodási és helyszíni használati feltételei. Érvényes: 2026. február 01-től. Módosítva: 2026. június 22.",
  [
    "A foglalás elküldésével és visszaigazolásával a vendég elfogadja a feltételeket.",
    "A Panorama Pool használatával a vendég elfogadja a medencehasználati szabályzatot.",
    "A medence használata saját felelősségre történik, gyermekek csak felnőtt felügyeletével használhatják.",
    "A szállás elfoglalásának feltétele lehet az online bejelentkezés elvégzése."
  ],
  "Vissza a Dandelion D1 útmutatóhoz",
  {
    "aszf-5": { paragraphs: paymentParagraphsHu },
    "aszf-6": { paragraphs: transferParagraphsHu, bullets: transferBulletsHu },
    "aszf-7": { paragraphs: cancellationParagraphsHu, bullets: cancellationBulletsHu },
    "aszf-11": { bullets: petsBulletsHu }
  }
);

const contentEn = buildContent(
  "en",
  "Dandelion D1 - Terms and house rules",
  "Dandelion D1 terms and house rules",
  "Booking, stay and on-site use conditions for Dandelion D1. Valid from: 1 February 2026. Modified: 22 June 2026.",
  [
    "By submitting and confirming a booking, the guest accepts these terms.",
    "By using Panorama Pool, the guest accepts the Pool Rules.",
    "Pool use is at the guest's own risk, and children may use it only under adult supervision.",
    "Completing online check-in may be a condition of occupying the accommodation."
  ],
  "Back to the Dandelion D1 guide",
  {
    "aszf-5": { paragraphs: paymentParagraphsEn },
    "aszf-6": { paragraphs: transferParagraphsEn, bullets: transferBulletsEn },
    "aszf-7": { paragraphs: cancellationParagraphsEn, bullets: cancellationBulletsEn },
    "aszf-11": { bullets: petsBulletsEn }
  }
);

const contentCs = buildContent(
  "cs",
  "Dandelion D1 - obchodní podmínky a pravidla",
  "Dandelion D1 obchodní podmínky a pravidla",
  "Podmínky rezervace, pobytu a používání ubytování Dandelion D1 na místě. Platné od: 1. února 2026. Aktualizováno: 22. června 2026.",
  [
    "Odesláním a potvrzením rezervace host tyto podmínky přijímá.",
    "Používáním Panorama Pool host přijímá pravidla bazénu.",
    "Bazén se používá na vlastní odpovědnost; děti jej mohou používat pouze pod dohledem dospělé osoby.",
    "Dokončení online check-inu může být podmínkou obsazení ubytování."
  ],
  "Zpět na průvodce Dandelion D1",
  {
    "aszf-5": { paragraphs: paymentParagraphsCs },
    "aszf-6": { paragraphs: transferParagraphsCs, bullets: transferBulletsCs },
    "aszf-7": { paragraphs: cancellationParagraphsCs, bullets: cancellationBulletsCs },
    "aszf-11": { bullets: petsBulletsCs }
  }
);

const contentDe = buildContent(
  "de",
  "Dandelion D1 - AGB und Nutzungsregeln",
  "Dandelion D1 AGB und Nutzungsregeln",
  "Buchungs-, Aufenthalts- und Nutzungsbedingungen vor Ort für Dandelion D1. Gültig ab: 1. Februar 2026. Geändert: 22. Juni 2026.",
  [
    "Mit Absenden und Bestätigung der Buchung akzeptiert der Gast diese Bedingungen.",
    "Durch die Nutzung des Panorama Pools akzeptiert der Gast die Pool-Regeln.",
    "Die Poolnutzung erfolgt auf eigene Verantwortung; Kinder dürfen den Pool nur unter Aufsicht eines Erwachsenen nutzen.",
    "Der Abschluss des Online Check-ins kann Voraussetzung für die Nutzung der Unterkunft sein."
  ],
  "Zurück zum Dandelion D1 Guide",
  {
    "aszf-5": { paragraphs: paymentParagraphsDe },
    "aszf-6": { paragraphs: transferParagraphsDe, bullets: transferBulletsDe },
    "aszf-7": { paragraphs: cancellationParagraphsDe, bullets: cancellationBulletsDe },
    "aszf-11": { bullets: petsBulletsDe }
  }
);

export const d1AszfGuide: GuideContent = {
  slug: "aszf",
  houseSlug: "d1",
  houseName: "Dandelion D1",
  path: "/guide/d1/aszf/",
  qrTarget: "https://dandelionhouse.hu/guide/d1/aszf/",
  dePreparedTitle: "D1 ÁSZF",
  content: {
    hu: contentHu,
    en: contentEn,
    cs: contentCs,
    de: contentDe
  }
};

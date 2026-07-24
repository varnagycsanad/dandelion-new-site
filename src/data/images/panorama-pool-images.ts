// [CHANGE 2026-06-28 00:00] Panorama Pool gallery registry updated to the curated 2026-06-28 WebP photo set.

export type PanoramaPoolImageUsageHint = "hero" | "teaser" | "gallery";

export interface PanoramaPoolImageDraft {
  id: string;
  src: string;
  mobileSrc?: string;
  thumb: string;
  altHu: string;
  titleHu: string;
  captionHu: string;
  altEn: string;
  titleEn: string;
  captionEn: string;
  altDe: string;
  titleDe: string;
  captionDe: string;
  altCs: string;
  titleCs: string;
  captionCs: string;
  altSk: string;
  titleSk: string;
  captionSk: string;
  usageHint: PanoramaPoolImageUsageHint;
  sortOrder: number;
  approved: false;
}

type PanoramaPoolLocalizedCopy = {
  alt: string;
  title: string;
  caption: string;
};

const panoramaPoolImageBlueprints: Array<{
  id: string;
  src: string;
  mobileSrc: string;
  thumb: string;
  usageHint: PanoramaPoolImageUsageHint;
  sortOrder: number;
  includeInGallery?: boolean;
  copy: {
    hu: PanoramaPoolLocalizedCopy;
    en: PanoramaPoolLocalizedCopy;
    de: PanoramaPoolLocalizedCopy;
    cs: PanoramaPoolLocalizedCopy;
    sk: PanoramaPoolLocalizedCopy;
  };
}> = [
  {
    id: "panorama-pool-gallery-2026-06-28-01",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-01.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-01-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-01-thumb.webp",
    usageHint: "gallery",
    sortOrder: 10,
    copy: {
      hu: {
        alt: "Panorama Pool hosszanti medencetér napozóágyakkal Kisapátiban.",
        title: "Panorama Pool medence",
        caption: "A Panorama Pool hosszanti medencéje és a mellette kialakított pihenőrész."
      },
      en: {
        alt: "The long Panorama Pool with sun loungers in Kisapáti.",
        title: "Panorama Pool",
        caption: "The long Panorama Pool and the relaxation area beside it."
      },
      de: {
        alt: "Der langgestreckte Panorama Pool mit Liegen in Kisapáti.",
        title: "Panorama Pool",
        caption: "Der langgestreckte Panorama Pool mit dem Ruhebereich daneben."
      },
      cs: {
        alt: "Podlouhlý Panorama Pool s lehátky v Kisapáti.",
        title: "Panorama Pool",
        caption: "Podlouhlý Panorama Pool a odpočinková část vedle bazénu."
      },
      sk: {
        alt: "Dlhý Panorama Pool s ležadlami v Kisapáti.",
        title: "Panorama Pool",
        caption: "Dlhý Panorama Pool a oddychová zóna vedľa bazéna."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-02",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-02.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-02-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-02-thumb.webp",
    usageHint: "teaser",
    includeInGallery: true,
    sortOrder: 20,
    copy: {
      hu: {
        alt: "Panorama Pool medence és terasz napernyőkkel a domboldali kilátás felé.",
        title: "Panorama Pool terasz",
        caption: "Napernyők, pihenőszékek és a Panorama Pool terasza a domboldali környezetben."
      },
      en: {
        alt: "Panorama Pool and terrace with parasols facing the hillside view.",
        title: "Panorama Pool terrace",
        caption: "Parasols, lounge chairs and the Panorama Pool terrace in the hillside setting."
      },
      de: {
        alt: "Panorama Pool und Terrasse mit Sonnenschirmen zur Hanglandschaft hin.",
        title: "Panorama Pool Terrasse",
        caption: "Sonnenschirme, Liegestühle und die Terrasse des Panorama Pools in Hanglage."
      },
      cs: {
        alt: "Panorama Pool a terasa se slunečníky směrem do svahu.",
        title: "Terasa Panorama Pool",
        caption: "Slunečníky, lehátka a terasa Panorama Pool v prostředí svahu."
      },
      sk: {
        alt: "Panorama Pool a terasa so slnečníkmi smerom do svahu.",
        title: "Terasa Panorama Pool",
        caption: "Slnečníky, ležadlá a terasa Panorama Pool v svahovitom prostredí."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-03",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-03.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-03-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-03-thumb.webp",
    usageHint: "teaser",
    sortOrder: 30,
    copy: {
      hu: {
        alt: "Panorama Pool medence széle és a terasz ülőhelyei.",
        title: "Panorama Pool részlet",
        caption: "A medence széle és a terasz pihenőhelyei közelről."
      },
      en: {
        alt: "The edge of Panorama Pool and the terrace seating.",
        title: "Panorama Pool detail",
        caption: "A closer view of the pool edge and the terrace seating."
      },
      de: {
        alt: "Der Beckenrand des Panorama Pools und die Sitzplätze auf der Terrasse.",
        title: "Panorama Pool Detail",
        caption: "Nahaufnahme vom Beckenrand und den Sitzplätzen auf der Terrasse."
      },
      cs: {
        alt: "Okraj Panorama Pool a posezení na terase.",
        title: "Detail Panorama Pool",
        caption: "Pohled zblízka na okraj bazénu a posezení na terase."
      },
      sk: {
        alt: "Okraj Panorama Pool a sedenie na terase.",
        title: "Detail Panorama Pool",
        caption: "Bližší pohľad na okraj bazéna a sedenie na terase."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-04",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-04.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-04-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-04-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 40,
    copy: {
      hu: {
        alt: "Panorama Pool medence a napos terasszal és a világos medencevízzel.",
        title: "Panorama Pool napos terasz",
        caption: "Napos terasz és világos vízfelület a Panorama Pool mellett."
      },
      en: {
        alt: "Panorama Pool with a sunny terrace and bright water.",
        title: "Panorama Pool sunny terrace",
        caption: "A sunny terrace and bright water surface beside Panorama Pool."
      },
      de: {
        alt: "Panorama Pool mit sonniger Terrasse und hellem Wasser.",
        title: "Panorama Pool Sonnenterrasse",
        caption: "Sonnige Terrasse und helle Wasserfläche am Panorama Pool."
      },
      cs: {
        alt: "Panorama Pool se slunnou terasou a světlou hladinou vody.",
        title: "Slunná terasa Panorama Pool",
        caption: "Slunná terasa a světlá hladina vody vedle Panorama Pool."
      },
      sk: {
        alt: "Panorama Pool so slnečnou terasou a svetlou hladinou vody.",
        title: "Slnečná terasa Panorama Pool",
        caption: "Slnečná terasa a svetlá hladina vody pri Panorama Pool."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-05",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-05.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-05-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-05-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 50,
    copy: {
      hu: {
        alt: "Panorama Pool egyik sarka napozóágyakkal és teraszburkolattal.",
        title: "Panorama Pool sarokrészlet",
        caption: "A medence egyik sarka napozóágyakkal és a terasz szélével."
      },
      en: {
        alt: "One corner of Panorama Pool with loungers and terrace paving.",
        title: "Panorama Pool corner detail",
        caption: "One corner of the pool with loungers and the terrace edge."
      },
      de: {
        alt: "Eine Ecke des Panorama Pools mit Liegen und Terrassenbelag.",
        title: "Panorama Pool Eckdetail",
        caption: "Eine Ecke des Beckens mit Liegen und dem Rand der Terrasse."
      },
      cs: {
        alt: "Jeden roh Panorama Pool s lehátky a dlažbou terasy.",
        title: "Roh Panorama Pool",
        caption: "Jeden roh bazénu s lehátky a okrajem terasy."
      },
      sk: {
        alt: "Jeden roh Panorama Pool s ležadlami a dlažbou terasy.",
        title: "Roh Panorama Pool",
        caption: "Jeden roh bazéna s ležadlami a okrajom terasy."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-06",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-06.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-06-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-06-thumb.webp",
    usageHint: "teaser",
    includeInGallery: true,
    sortOrder: 60,
    copy: {
      hu: {
        alt: "Panorama Pool teljes vízfelülete és a fölötte futó teraszrész.",
        title: "Panorama Pool teljes medencetér",
        caption: "A Panorama Pool teljes vízfelülete a terasszal és pihenőszékekkel."
      },
      en: {
        alt: "The full water surface of Panorama Pool and the terrace above it.",
        title: "Full Panorama Pool view",
        caption: "The full water surface of Panorama Pool with the terrace and lounge chairs."
      },
      de: {
        alt: "Die gesamte Wasserfläche des Panorama Pools mit Terrasse darüber.",
        title: "Gesamtansicht Panorama Pool",
        caption: "Die gesamte Wasserfläche des Panorama Pools mit Terrasse und Liegestühlen."
      },
      cs: {
        alt: "Celá vodní plocha Panorama Pool a terasa nad ní.",
        title: "Celkový pohled na Panorama Pool",
        caption: "Celá vodní plocha Panorama Pool s terasou a lehátky."
      },
      sk: {
        alt: "Celá vodná plocha Panorama Pool a terasa nad ňou.",
        title: "Celkový pohľad na Panorama Pool",
        caption: "Celá vodná plocha Panorama Pool s terasou a ležadlami."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-07",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-07.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-07-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-07-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 70,
    copy: {
      hu: {
        alt: "Panorama Pool vízfelülete a terasz és a napozóágyak felől nézve.",
        title: "Panorama Pool medencevíz",
        caption: "A medence vízfelülete és a terasz a napozóágyak felől nézve."
      },
      en: {
        alt: "Panorama Pool water seen from the terrace and loungers.",
        title: "Panorama Pool water view",
        caption: "The pool water and terrace viewed from the loungers side."
      },
      de: {
        alt: "Die Wasserfläche des Panorama Pools von Terrasse und Liegen aus gesehen.",
        title: "Panorama Pool Wasserblick",
        caption: "Die Wasserfläche und Terrasse des Pools von der Liegen-Seite aus."
      },
      cs: {
        alt: "Hladina Panorama Pool při pohledu od terasy a lehátek.",
        title: "Pohled na vodu Panorama Pool",
        caption: "Hladina bazénu a terasa při pohledu od lehátek."
      },
      sk: {
        alt: "Hladina Panorama Pool pri pohľade od terasy a ležadiel.",
        title: "Pohľad na vodu Panorama Pool",
        caption: "Hladina bazéna a terasa pri pohľade od ležadiel."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-08",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-08.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-08-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-08-thumb.webp",
    usageHint: "gallery",
    includeInGallery: true,
    sortOrder: 80,
    copy: {
      hu: {
        alt: "Panorama Pool oldalnézete olajfával és napozóágyakkal.",
        title: "Panorama Pool oldalnézet",
        caption: "Oldalnézet a medencére olajfával, napozóágyakkal és a terasz szélével."
      },
      en: {
        alt: "Side view of Panorama Pool with an olive tree and loungers.",
        title: "Panorama Pool side view",
        caption: "A side view of the pool with an olive tree, loungers and the terrace edge."
      },
      de: {
        alt: "Seitenansicht des Panorama Pools mit Olivenbaum und Liegen.",
        title: "Panorama Pool Seitenansicht",
        caption: "Seitenansicht des Pools mit Olivenbaum, Liegen und Terrassenkante."
      },
      cs: {
        alt: "Boční pohled na Panorama Pool s olivovníkem a lehátky.",
        title: "Boční pohled na Panorama Pool",
        caption: "Boční pohled na bazén s olivovníkem, lehátky a okrajem terasy."
      },
      sk: {
        alt: "Bočný pohľad na Panorama Pool s olivovníkom a ležadlami.",
        title: "Bočný pohľad na Panorama Pool",
        caption: "Bočný pohľad na bazén s olivovníkom, ležadlami a okrajom terasy."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-09",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-09.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-09-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-09-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 90,
    copy: {
      hu: {
        alt: "Panorama Pool medence oldalnézetből a terasz ülőhelyeivel.",
        title: "Panorama Pool teraszülőhelyek",
        caption: "Oldalnézet a medencére és a terasz ülőhelyeire."
      },
      en: {
        alt: "Side view of Panorama Pool with the terrace seating.",
        title: "Panorama Pool terrace seating",
        caption: "A side view of the pool and the terrace seating."
      },
      de: {
        alt: "Seitenansicht des Panorama Pools mit den Sitzplätzen auf der Terrasse.",
        title: "Panorama Pool Terrassensitzplätze",
        caption: "Seitenansicht des Pools mit den Sitzplätzen auf der Terrasse."
      },
      cs: {
        alt: "Boční pohled na Panorama Pool s posezením na terase.",
        title: "Posezení na terase Panorama Pool",
        caption: "Boční pohled na bazén a posezení na terase."
      },
      sk: {
        alt: "Bočný pohľad na Panorama Pool so sedením na terase.",
        title: "Sedenie na terase Panorama Pool",
        caption: "Bočný pohľad na bazén a sedenie na terase."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-10",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-10.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-10-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-10-thumb.webp",
    usageHint: "teaser",
    includeInGallery: true,
    sortOrder: 100,
    copy: {
      hu: {
        alt: "Panorama Pool terasza gyepes résszel és nyitott kilátással.",
        title: "Panorama Pool gyepes terasz",
        caption: "A terasz és a gyepes rész a medence mellett, nyitott balatoni-felvidéki környezettel."
      },
      en: {
        alt: "Panorama Pool terrace with a lawn section and open surroundings.",
        title: "Panorama Pool lawn terrace",
        caption: "The terrace and lawn beside the pool in an open Balaton Uplands setting."
      },
      de: {
        alt: "Die Terrasse des Panorama Pools mit Rasenfläche und offener Umgebung.",
        title: "Panorama Pool Rasenterrasse",
        caption: "Terrasse und Rasenfläche neben dem Pool in offener Balaton-Oberland-Umgebung."
      },
      cs: {
        alt: "Terasa Panorama Pool s travnatou částí a otevřeným okolím.",
        title: "Travnatá terasa Panorama Pool",
        caption: "Terasa a travnatá část vedle bazénu v otevřeném prostředí Balatonské vrchoviny."
      },
      sk: {
        alt: "Terasa Panorama Pool s trávnatou časťou a otvoreným okolím.",
        title: "Trávnatá terasa Panorama Pool",
        caption: "Terasa a trávnatá časť vedľa bazéna v otvorenom prostredí Balatonskej vrchoviny."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-11",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-11.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-11-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-11-thumb.webp",
    usageHint: "hero",
    includeInGallery: true,
    sortOrder: 110,
    copy: {
      hu: {
        alt: "Panorama Pool gyep felőli nézete a medencével és a tanúhegyek látványával.",
        title: "Panorama Pool panoráma",
        caption: "Gyep felőli nézet a medencére és a környező tanúhegyekre."
      },
      en: {
        alt: "Lawn-side view of Panorama Pool with the pool and the surrounding hills beyond.",
        title: "Panorama Pool panorama",
        caption: "A lawn-side view of the pool with the surrounding hills."
      },
      de: {
        alt: "Blick vom Rasen auf den Panorama Pool mit den umliegenden Hügeln im Hintergrund.",
        title: "Panorama Pool Panorama",
        caption: "Blick von der Rasenfläche auf den Pool und die umliegenden Hügel."
      },
      cs: {
        alt: "Pohled od trávníku na Panorama Pool s okolními kopci v pozadí.",
        title: "Panorama Panorama Pool",
        caption: "Pohled od trávníku na bazén a okolní kopce."
      },
      sk: {
        alt: "Pohľad od trávnika na Panorama Pool s okolitými kopcami v pozadí.",
        title: "Panoráma Panorama Pool",
        caption: "Pohľad od trávnika na bazén a okolité kopce."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-12",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-12.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-12-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-12-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 120,
    copy: {
      hu: {
        alt: "Panorama Pool gyep felőli nézete félig zárt medencefedéssel.",
        title: "Panorama Pool fedéssel",
        caption: "A medence gyep felőli nézete a félrehúzott fedéssel és a terasszal."
      },
      en: {
        alt: "Lawn-side view of Panorama Pool with the cover partly open.",
        title: "Panorama Pool with cover",
        caption: "A lawn-side view of the pool with the cover pulled back and the terrace behind it."
      },
      de: {
        alt: "Blick vom Rasen auf den Panorama Pool mit teilweise geöffneter Abdeckung.",
        title: "Panorama Pool mit Abdeckung",
        caption: "Blick auf den Pool mit zurückgeschobener Abdeckung und Terrasse dahinter."
      },
      cs: {
        alt: "Pohled od trávníku na Panorama Pool s částečně otevřeným zastřešením.",
        title: "Panorama Pool se zastřešením",
        caption: "Pohled na bazén s odsunutým zastřešením a terasou za ním."
      },
      sk: {
        alt: "Pohľad od trávnika na Panorama Pool s čiastočne otvoreným zastrešením.",
        title: "Panorama Pool so zastrešením",
        caption: "Pohľad na bazén s odsunutým zastrešením a terasou za ním."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-13",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-13.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-13-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-13-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 130,
    copy: {
      hu: {
        alt: "Panorama Pool medence és terasz gyep felőli nézetből.",
        title: "Panorama Pool teljes tér",
        caption: "A medence és a terasz együtt, gyep felőli nézetből."
      },
      en: {
        alt: "Panorama Pool and terrace seen from the lawn side.",
        title: "Panorama Pool full area",
        caption: "The pool and terrace together as seen from the lawn."
      },
      de: {
        alt: "Panorama Pool und Terrasse von der Rasenseite aus.",
        title: "Panorama Pool Gesamtbereich",
        caption: "Pool und Terrasse zusammen, gesehen von der Rasenfläche."
      },
      cs: {
        alt: "Panorama Pool a terasa při pohledu od trávníku.",
        title: "Celý prostor Panorama Pool",
        caption: "Bazén a terasa společně při pohledu od trávníku."
      },
      sk: {
        alt: "Panorama Pool a terasa pri pohľade od trávnika.",
        title: "Celý priestor Panorama Pool",
        caption: "Bazén a terasa spolu pri pohľade od trávnika."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-14",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-14.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-14-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-14-thumb.webp",
    usageHint: "teaser",
    includeInGallery: true,
    sortOrder: 140,
    copy: {
      hu: {
        alt: "Panorama Pool tágabb nézete a medencével, terasszal és a hegyekkel a háttérben.",
        title: "Panorama Pool tágabb nézet",
        caption: "Tágabb nézet a medencére, a teraszra és a hegyekre a háttérben."
      },
      en: {
        alt: "Wider view of Panorama Pool with the terrace and hills in the background.",
        title: "Panorama Pool wide view",
        caption: "A wider view of the pool, terrace and hills in the background."
      },
      de: {
        alt: "Weiterer Blick auf den Panorama Pool mit Terrasse und Bergen im Hintergrund.",
        title: "Panorama Pool Weitblick",
        caption: "Weiterer Blick auf Pool, Terrasse und die Berge im Hintergrund."
      },
      cs: {
        alt: "Širší pohled na Panorama Pool s terasou a kopci v pozadí.",
        title: "Širší pohled na Panorama Pool",
        caption: "Širší pohled na bazén, terasu a kopce v pozadí."
      },
      sk: {
        alt: "Širší pohľad na Panorama Pool s terasou a kopcami v pozadí.",
        title: "Širší pohľad na Panorama Pool",
        caption: "Širší pohľad na bazén, terasu a kopce v pozadí."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-15",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-15.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-15-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-15-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 150,
    copy: {
      hu: {
        alt: "Panorama Pool a dombok felé néző napozóágyakkal és félig nyitott fedéssel.",
        title: "Panorama Pool pihenőrész",
        caption: "Napozóágyak, félig nyitott fedés és a medence a dombok felé néző oldalon."
      },
      en: {
        alt: "Panorama Pool with loungers facing the hills and a partly open cover.",
        title: "Panorama Pool relaxation area",
        caption: "Loungers, the partly open cover and the pool on the side facing the hills."
      },
      de: {
        alt: "Panorama Pool mit Liegen Richtung Hügel und teilweise geöffneter Abdeckung.",
        title: "Panorama Pool Ruhebereich",
        caption: "Liegen, teilweise geöffnete Abdeckung und der Pool auf der Seite zu den Hügeln."
      },
      cs: {
        alt: "Panorama Pool s lehátky směrem ke kopcům a částečně otevřeným zastřešením.",
        title: "Odpočinková část Panorama Pool",
        caption: "Lehátka, částečně otevřené zastřešení a bazén na straně směrem ke kopcům."
      },
      sk: {
        alt: "Panorama Pool s ležadlami smerom ku kopcom a čiastočne otvoreným zastrešením.",
        title: "Oddychová časť Panorama Pool",
        caption: "Ležadlá, čiastočne otvorené zastrešenie a bazén na strane smerom ku kopcom."
      }
    }
  },
  {
    id: "panorama-pool-gallery-2026-06-28-16",
    src: "/images/panorama-pool/gallery/panorama-pool-gallery-2026-06-28-16.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-gallery-2026-06-28-16-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-gallery-2026-06-28-16-thumb.webp",
    usageHint: "gallery",
    includeInGallery: false,
    sortOrder: 160,
    copy: {
      hu: {
        alt: "Panorama Pool a terasz felől, napernyővel és a domboldali háttérrel.",
        title: "Panorama Pool terasz felől",
        caption: "A medence a terasz felől nézve, napernyővel és a domboldali háttérrel."
      },
      en: {
        alt: "Panorama Pool seen from the terrace side with a parasol and hillside backdrop.",
        title: "Panorama Pool from the terrace side",
        caption: "The pool seen from the terrace side with a parasol and hillside backdrop."
      },
      de: {
        alt: "Panorama Pool von der Terrassenseite mit Sonnenschirm und Hangkulisse.",
        title: "Panorama Pool von der Terrasse",
        caption: "Der Pool von der Terrassenseite mit Sonnenschirm und Hangkulisse."
      },
      cs: {
        alt: "Panorama Pool při pohledu ze strany terasy se slunečníkem a svažitým pozadím.",
        title: "Panorama Pool od terasy",
        caption: "Bazén při pohledu ze strany terasy se slunečníkem a svažitým pozadím."
      },
      sk: {
        alt: "Panorama Pool pri pohľade zo strany terasy so slnečníkom a svahovitým pozadím.",
        title: "Panorama Pool od terasy",
        caption: "Bazén pri pohľade zo strany terasy so slnečníkom a svahovitým pozadím."
      }
    }
  }
];

export const panoramaPoolHero = {
  desktop: "/images/panorama-pool/hero/panorama-pool-hero-desktop-2026-06-28.webp",
  mobile: "/images/panorama-pool/hero/panorama-pool-hero-mobile-2026-06-28.webp"
};

export const panoramaPoolImages: PanoramaPoolImageDraft[] = panoramaPoolImageBlueprints
  .filter((image) => image.includeInGallery !== false)
  .map((image) => ({
    id: image.id,
    src: image.src,
    mobileSrc: image.mobileSrc,
    thumb: image.thumb,
    altHu: image.copy.hu.alt,
    titleHu: image.copy.hu.title,
    captionHu: image.copy.hu.caption,
    altEn: image.copy.en.alt,
    titleEn: image.copy.en.title,
    captionEn: image.copy.en.caption,
    altDe: image.copy.de.alt,
    titleDe: image.copy.de.title,
    captionDe: image.copy.de.caption,
    altCs: image.copy.cs.alt,
    titleCs: image.copy.cs.title,
    captionCs: image.copy.cs.caption,
    altSk: image.copy.sk.alt,
    titleSk: image.copy.sk.title,
    captionSk: image.copy.sk.caption,
    usageHint: image.usageHint,
    sortOrder: image.sortOrder,
    approved: false
  }));

// [CHANGE 2026-07-24 00:00] Panorama Pool page gallery split from the shared teaser registry to keep non-gallery pages unchanged.
export const panoramaPoolPageGalleryImages: PanoramaPoolImageDraft[] = [
  {
    id: "panorama-pool-page-gallery-2026-07-20-01",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-01.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-01-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-01-thumb.webp",
    altHu: "Panorama Pool medence napozóágyakkal és napernyőkkel a domboldali környezetben.",
    titleHu: "Panorama Pool medence",
    captionHu: "A Panorama Pool vízfelülete a pihenőtérrel és a domboldali háttérrel.",
    altEn: "Panorama Pool with loungers and parasols in the hillside setting.",
    titleEn: "Panorama Pool",
    captionEn: "The Panorama Pool water surface with the relaxation area and the hillside backdrop.",
    altDe: "Panorama Pool mit Liegen und Sonnenschirmen in Hanglage.",
    titleDe: "Panorama Pool",
    captionDe: "Die Wasserfläche des Panorama Pools mit Ruhebereich und Hangkulisse.",
    altCs: "Panorama Pool s lehátky a slunečníky ve svahovém prostředí.",
    titleCs: "Panorama Pool",
    captionCs: "Vodní plocha Panorama Pool s odpočinkovou částí a svažitým pozadím.",
    altSk: "Panorama Pool s ležadlami a slnečníkmi v svahovitom prostredí.",
    titleSk: "Panorama Pool",
    captionSk: "Vodná plocha Panorama Pool s oddychovou zónou a svahovitým pozadím.",
    usageHint: "hero",
    sortOrder: 10,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-02",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-02.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-02-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-02-thumb.webp",
    altHu: "Panorama Pool tágabb nézete medencefedéssel és tanúhegyekkel a háttérben.",
    titleHu: "Panorama Pool panoráma",
    captionHu: "A medence és a terasz panorámás nézete a környező hegyek felé.",
    altEn: "Wider view of Panorama Pool with the pool cover and witness hills behind it.",
    titleEn: "Panorama Pool panorama",
    captionEn: "A panoramic view of the pool and terrace facing the surrounding hills.",
    altDe: "Weiterer Blick auf den Panorama Pool mit Abdeckung und Zeugenbergen im Hintergrund.",
    titleDe: "Panorama Pool Panorama",
    captionDe: "Ein panoramischer Blick auf Pool und Terrasse in Richtung der umliegenden Berge.",
    altCs: "Širší pohled na Panorama Pool se zastřešením a svědeckými kopci v pozadí.",
    titleCs: "Panorama Panorama Pool",
    captionCs: "Panoramatický pohled na bazén a terasu směrem k okolním kopcům.",
    altSk: "Širší pohľad na Panorama Pool so zastrešením a svedeckými vrchmi v pozadí.",
    titleSk: "Panoráma Panorama Pool",
    captionSk: "Panoramatický pohľad na bazén a terasu smerom k okolitým vrchom.",
    usageHint: "teaser",
    sortOrder: 20,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-03",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-03.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-03-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-03-thumb.webp",
    altHu: "Panorama Pool a rövidebb oldala felől, napozóágyakkal és terasszal.",
    titleHu: "Panorama Pool terasz felől",
    captionHu: "A medence a terasz felől nézve, pihenőszékekkel és nyári fényekkel.",
    altEn: "Panorama Pool seen from the short side with loungers and terrace seating.",
    titleEn: "Panorama Pool from the terrace side",
    captionEn: "The pool seen from the terrace side with lounge chairs in summer light.",
    altDe: "Panorama Pool von der kurzen Seite mit Liegen und Terrasse.",
    titleDe: "Panorama Pool von der Terrasse",
    captionDe: "Der Pool von der Terrassenseite mit Liegestühlen im sommerlichen Licht.",
    altCs: "Panorama Pool při pohledu od kratší strany s lehátky a terasou.",
    titleCs: "Panorama Pool od terasy",
    captionCs: "Bazén při pohledu od terasy s lehátky v letním světle.",
    altSk: "Panorama Pool pri pohľade od kratšej strany s ležadlami a terasou.",
    titleSk: "Panorama Pool od terasy",
    captionSk: "Bazén pri pohľade od terasy s ležadlami v letnom svetle.",
    usageHint: "teaser",
    sortOrder: 30,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-04",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-04.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-04-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-04-thumb.webp",
    altHu: "Panorama Pool közelebbi nézete napernyőkkel, pihenőszékekkel és hegyháttérrel.",
    titleHu: "Panorama Pool pihenőtér",
    captionHu: "Közelebbi nézet a medence vízfelületére és a napernyős pihenőtérre.",
    altEn: "Closer view of Panorama Pool with parasols, lounge chairs and hills behind it.",
    titleEn: "Panorama Pool relaxation area",
    captionEn: "A closer look at the pool water and the relaxation area with parasols.",
    altDe: "Nahansicht des Panorama Pools mit Sonnenschirmen, Liegen und Bergkulisse.",
    titleDe: "Panorama Pool Ruhebereich",
    captionDe: "Nahansicht der Wasserfläche und des Ruhebereichs mit Sonnenschirmen.",
    altCs: "Bližší pohled na Panorama Pool se slunečníky, lehátky a horským pozadím.",
    titleCs: "Odpočinková část Panorama Pool",
    captionCs: "Bližší pohled na hladinu bazénu a odpočinkovou část se slunečníky.",
    altSk: "Bližší pohľad na Panorama Pool so slnečníkmi, ležadlami a horským pozadím.",
    titleSk: "Oddychová časť Panorama Pool",
    captionSk: "Bližší pohľad na hladinu bazéna a oddychovú zónu so slnečníkmi.",
    usageHint: "gallery",
    sortOrder: 40,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-05",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-05.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-05-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-05-thumb.webp",
    altHu: "Panorama Pool emelt oldalnézetből, részben nyitott medencefedéssel és napozóágyakkal.",
    titleHu: "Panorama Pool oldalnézet",
    captionHu: "Oldalnézet a medencére a fedés, a pihenőtér és a gyepes környezet felől.",
    altEn: "Elevated side view of Panorama Pool with the cover partly open and loungers beside it.",
    titleEn: "Panorama Pool side view",
    captionEn: "Side view of the pool with the cover, loungers and lawn area around it.",
    altDe: "Erhöhte Seitenansicht des Panorama Pools mit teilweise geöffneter Abdeckung und Liegen.",
    titleDe: "Panorama Pool Seitenansicht",
    captionDe: "Seitenansicht des Pools mit Abdeckung, Liegen und Rasenbereich.",
    altCs: "Zvýšený boční pohled na Panorama Pool s částečně otevřeným zastřešením a lehátky.",
    titleCs: "Boční pohled na Panorama Pool",
    captionCs: "Boční pohled na bazén se zastřešením, lehátky a travnatým okolím.",
    altSk: "Vyšší bočný pohľad na Panorama Pool s čiastočne otvoreným zastrešením a ležadlami.",
    titleSk: "Bočný pohľad na Panorama Pool",
    captionSk: "Bočný pohľad na bazén so zastrešením, ležadlami a trávnatým okolím.",
    usageHint: "gallery",
    sortOrder: 50,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-06",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-06.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-06-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-06-thumb.webp",
    altHu: "Panorama Pool a medence végéből nézve, gyepes terasszal és hegyoldallal szemben.",
    titleHu: "Panorama Pool gyep felől",
    captionHu: "A medence tengelye, a gyepes pihenőtér és a domboldali háttér egy képen.",
    altEn: "Panorama Pool seen from the pool end with the lawn terrace and hillside opposite.",
    titleEn: "Panorama Pool from the lawn side",
    captionEn: "The pool axis, the lawn relaxation area and the hillside backdrop in one view.",
    altDe: "Panorama Pool vom Beckenende mit Rasenterrasse und Hang gegenüber.",
    titleDe: "Panorama Pool von der Rasenfläche",
    captionDe: "Die Beckenachse, der Rasenbereich und die Hangkulisse in einer Ansicht.",
    altCs: "Panorama Pool při pohledu od konce bazénu s travnatou terasou a svahem naproti.",
    titleCs: "Panorama Pool od trávníku",
    captionCs: "Osa bazénu, travnatá odpočinková část a svah v jednom záběru.",
    altSk: "Panorama Pool pri pohľade od konca bazéna s trávnatou terasou a svahom oproti.",
    titleSk: "Panorama Pool od trávnika",
    captionSk: "Os bazéna, trávnatá oddychová zóna a svah v jednom zábere.",
    usageHint: "teaser",
    sortOrder: 60,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-07",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-07.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-07-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-07-thumb.webp",
    altHu: "Panorama Pool felülnézetből, napernyőkkel és a terasz teljes alaprajzával.",
    titleHu: "Panorama Pool felülnézet",
    captionHu: "Felülnézet a medence teljes formájára és a körülötte kialakított teraszra.",
    altEn: "Top view of Panorama Pool with parasols and the full terrace layout.",
    titleEn: "Panorama Pool top view",
    captionEn: "Top view showing the full pool shape and the surrounding terrace layout.",
    altDe: "Draufsicht auf den Panorama Pool mit Sonnenschirmen und kompletter Terrassenaufteilung.",
    titleDe: "Panorama Pool Draufsicht",
    captionDe: "Draufsicht auf die gesamte Beckenform und die Terrasse rundherum.",
    altCs: "Pohled shora na Panorama Pool se slunečníky a celým uspořádáním terasy.",
    titleCs: "Panorama Pool shora",
    captionCs: "Pohled shora na celý tvar bazénu a terasu kolem něj.",
    altSk: "Pohľad zhora na Panorama Pool so slnečníkmi a celým rozložením terasy.",
    titleSk: "Panorama Pool zhora",
    captionSk: "Pohľad zhora na celý tvar bazéna a terasu okolo neho.",
    usageHint: "gallery",
    sortOrder: 70,
    approved: false
  },
  {
    id: "panorama-pool-page-gallery-2026-07-20-08",
    src: "/images/panorama-pool/gallery/panorama-pool-page-gallery-2026-07-20-08.webp",
    mobileSrc: "/images/panorama-pool/mobile/panorama-pool-page-gallery-2026-07-20-08-mobile.webp",
    thumb: "/images/panorama-pool/thumbs/panorama-pool-page-gallery-2026-07-20-08-thumb.webp",
    altHu: "Panorama Pool drónképen, a kisapáti házakkal és a tanúhegyekkel együtt.",
    titleHu: "Panorama Pool drónnézet",
    captionHu: "Tágabb drónnézet a medencére, a környező házakra és a hegyekre.",
    altEn: "Panorama Pool in an aerial view with the Kisapáti houses and the surrounding witness hills.",
    titleEn: "Panorama Pool aerial view",
    captionEn: "A wider aerial view of the pool, the nearby houses and the surrounding hills.",
    altDe: "Panorama Pool in der Drohnenansicht mit den Häusern von Kisapáti und den umliegenden Zeugenbergen.",
    titleDe: "Panorama Pool Drohnenansicht",
    captionDe: "Weiterer Drohnenblick auf den Pool, die umliegenden Häuser und die Berge.",
    altCs: "Panorama Pool na dronovém záběru s domy v Kisapáti a okolními svědeckými kopci.",
    titleCs: "Panorama Pool z dronu",
    captionCs: "Širší dronový pohled na bazén, okolní domy a kopce.",
    altSk: "Panorama Pool na dronovom zábere s domami v Kisapáti a okolitými svedeckými vrchmi.",
    titleSk: "Panorama Pool z dronu",
    captionSk: "Širší dronový pohľad na bazén, okolité domy a vrchy.",
    usageHint: "gallery",
    sortOrder: 80,
    approved: false
  }
];

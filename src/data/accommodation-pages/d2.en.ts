import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-19 00:00] First English Dandelion D2 content object added for the shared accommodation template.
const d2PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d2EnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D2 near Szent György Hill | Family-friendly countryside stay",
    description:
      "Dandelion D2 is a peaceful family-friendly accommodation near Szent György Hill and the Balaton Uplands, with garden, terrace and access to the Panorama Pool."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c64244f6153c3ca1&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d2",
      "hero",
      "dandelion-d2-kisapati-hero-mobile-01.webp",
      "d2 English mobile hero"
    ),
    fallbackAlt: "Dandelion D2 covered terrace with yellow chairs and a large garden in Kisapáti",
    kicker: "Balaton Uplands · Szent György Hill",
    title: "Dandelion",
    titleAccent: "D2",
    subtitle: "FAMILY-FRIENDLY COUNTRYSIDE ACCOMMODATION WITH GARDEN AND TERRACE",
    lead: "A bright, peaceful countryside stay near Szent György Hill, with a large garden, covered terrace and easy access to Lake Balaton.",
    poolHighlight: {
      enabled: true,
      label: "Panorama Pool near Dandelion D2",
      text: "Panorama Pool is available in season for guests of D1, D2 and Fügeház.",
      href: "/panorama-pool/",
      ctaLabel: "Open pool page",
      variant: "strong"
    },
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "Real guest feedback from Google and Booking.com",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "An idyllic setting, kind hosts, plenty of space for children and a calm, lovable atmosphere.",
        meta: "Vanessa L. · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The house has everything you need, and I warmly recommend it for a few quiet days away.",
        meta: "Ildikó Barna · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A beautiful, tidy place with a quiet setting and smooth arrival. Especially good for relaxing.",
        meta: "Eszter K. · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A completely positive experience, with quick replies and very helpful hosts.",
        meta: "Bernadett · Booking.com · 10/10"
      },
      {
        source: "Booking.com",
        quote: "Perfect for restful days: a quiet place, friendly hosts and comfortable accommodation.",
        meta: "Angelika · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Slow rhythm · large garden · covered terrace",
    title: "Covered terrace, garden space and relaxed family rooms",
    lead: "Dandelion D2 is made for calm family time in the Balaton Uplands. The covered terrace, large garden and practical kitchen keep the stay easy, while nearby hills, beaches and wineries give every day a different route."
  },
  details: {
    kicker: "Dandelion D2",
    title: "Family-friendly countryside accommodation near Szent György Hill",
    shortDescription:
      "A peaceful base with bright indoor spaces, a large garden, animals around the house and Lake Balaton within easy reach.",
    supportingLink: {
      label: "Explore Dandelion stays from the English accommodations page.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "The gallery-style living room gives the house an open, easy rhythm, and the renovated kitchen makes longer stays comfortable too. Mornings can start on the terrace, days can move toward the hills or Lake Balaton, and evenings can slow down again in the garden.",
      "The covered terrace and outdoor seating are useful even when the weather changes, while the large garden gives children and adults space to play, sit, grill or simply enjoy the quiet.",
      "Panorama Pool is available in season for guests of D1, D2 and Fügeház. It is not a private pool for D2, but part of the nearby D1-D2-Fügeház pool area from June 15, 2026.",
      "There are animals around the house, which many children experience as a small countryside adventure. It adds a warmer village feeling without taking anything away from the comfort of the stay.",
      "Lake Balaton, the hiking routes of Szent György Hill and the wineries of the region are all within a short drive, so Dandelion D2 works well as one calm base for several kinds of Balaton Uplands days."
    ],
    moreLabel: "More about Dandelion D2",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Guests", "4-6 guests"],
          ["Outdoor space", "covered terrace and garden seating"],
          ["Garden", "large, usable garden"],
          ["Kitchen", "renovated in 2026 and well equipped"]
        ]
      },
      {
        title: "Experiences",
        items: [
          ["Panorama Pool", "for D1, D2 and Fügeház guests from June 15, 2026"],
          ["Outdoor cooking", "grill option in the garden"],
          ["For children", "animals and a large garden around the house"],
          ["Nearby", "Lake Balaton, hiking routes and wineries"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Kitchen renovated in 2026", icon: "utensils" },
      { label: "Gallery-style living room", icon: "home" },
      { label: "Panorama Pool access", icon: "pool" },
      { label: "Covered terrace and garden area", icon: "leaf" },
      { label: "Outdoor grilling option", icon: "grapes" },
      { label: "Animals around the house", icon: "users" },
      { label: "Good base for witness-hill walks", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "4-6 guests", text: "Capacity" },
      { iconKey: "terrace", title: "Covered terrace", text: "and garden seating" },
      { iconKey: "garden", title: "Large garden", text: "with space to slow down" },
      { iconKey: "kitchen", title: "Renovated kitchen" },
      { iconKey: "home", title: "Gallery-style living room" },
      { iconKey: "animals", title: "Animals around the house" }
    ],
    featuredExperience: {
      label: "Featured experience",
      title: "Panorama Pool",
      text: "Book Dandelion D2, and from summer the panoramic pool access is included in the price.",
      note: "from June 15, 2026",
      iconKey: "pool",
      image: d2PanoramaPoolHeroImage
        ? {
            src: d2PanoramaPoolHeroImage.src,
            alt: d2PanoramaPoolHeroImage.altEn,
            width: 1800,
            height: 1350
          }
        : undefined
    },
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "terrace",
        title: "Covered terrace",
        text: "Large garden"
      },
      {
        iconKey: "users",
        title: "Child-friendly garden",
        text: "Garden, animals"
      },
      {
        iconKey: "balaton",
        title: "Balaton and hills",
        text: "Beach, hikes"
      },
      {
        iconKey: "home",
        title: "Family base",
        text: "Spacious rooms"
      }
    ]
  },
  geoDecision: {
    kicker: "D2 quick answers",
    title: "Dandelion D2 is a good choice if you want a garden-based, family-friendly house in Kisapati",
    lead: "D2 is comfortable for 4-6 guests, with a large garden, covered terrace, renovated kitchen and Panorama Pool access from June 15, 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Does Dandelion D2 have pool access?",
        answer: "Yes. From June 15, 2026, D2 guests can use the Panorama Pool together with guests of D1 and Fügeház."
      },
      {
        iconKey: "family",
        question: "Who is Dandelion D2 best for?",
        answer: "D2 mainly suits families and smaller groups of friends looking for a large garden, covered terrace and a calm Balaton Uplands base."
      },
      {
        iconKey: "guests",
        question: "How many guests is Dandelion D2 comfortable for?",
        answer: "D2 is comfortable for 4-6 guests, with a gallery-style living room, a double bed, two single beds and a sofa bed."
      },
      {
        iconKey: "garden",
        question: "Is D2 a good choice with children?",
        answer: "Yes. The large garden, outdoor seating and animals around the house make D2 especially practical for families with children."
      },
      {
        iconKey: "kitchen",
        question: "What amenities are available in D2?",
        answer: "D2 has a renovated, well-equipped kitchen, dishwasher, air conditioning, gigabit internet, fireplace, bathtub, covered terrace and garden seating."
      },
      {
        iconKey: "mountain",
        question: "What trips is D2 a good base for?",
        answer: "D2 is a good base for Szent György Hill, Lake Balaton, the witness hills, local wineries and the Tapolcai Basin."
      }
    ],
    amenitiesTitle: "What matters in D2"
  },
  amenities: [
    {
      iconKey: "wifi",
      title: "Gigabit internet"
    },
    {
      iconKey: "utensils",
      title: "Dishwasher"
    },
    {
      iconKey: "sun",
      title: "Air conditioning"
    },
    {
      iconKey: "home",
      title: "Heating"
    },
    {
      iconKey: "home",
      title: "Fireplace"
    },
    {
      iconKey: "bathroom",
      title: "Bathtub"
    },
    {
      iconKey: "sun",
      title: "Fan"
    },
    {
      iconKey: "leaf",
      title: "Garden seating"
    }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Dandelion D2",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Dandelion D2 gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY HILL · KISAPÁTI",
    title: "Around Dandelion D2",
    body: "Dandelion D2 is well placed for exploring the Tapolcai Basin, the shore of Lake Balaton and the surrounding wine region from one peaceful base. It works for nearby hill walks as well as slower Balaton days.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Hiking routes nearby", icon: "trail" },
      { label: "Wine region and vineyard hills", icon: "grapes" },
      { label: "Lake Balaton by short drive", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps/d/u/0/embed?mid=1YRCy3UzpGcrJ6YJ4ihdVcluhJWtisVk&ehbc=2E312F",
    embedTitle: "Map of the area around Dandelion D2"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion D2 gallery",
    closeAriaLabel: "Close gallery",
    previousAriaLabel: "Previous image",
    nextAriaLabel: "Next image"
  },
  labels: {
    googleLogoAlt: "Google review",
    bookingLogoAlt: "Booking.com review",
    galleryOpenAriaLabel: "Open gallery image",
    galleryHoverLabel: "View photo"
  },
  relatedStays: {
    kicker: "More stays",
    title: "More Dandelion stays",
    intro: "If you like the Dandelion atmosphere, you can choose another house or another part of the region from here.",
    items: [
      {
        name: "Fügeház",
        meta: "4-6 guests · panorama · family stay",
        href: "/en/dandelion-fugehaz/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház countryside guesthouse with terrace near Szent György Hill"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6-8 guests · large garden · for families",
        href: "/en/dandelion-d1/",
        image: {
          type: "mapping",
          slot: "d1_card_image",
          alt: "Dandelion D1 countryside guesthouse for families in Kisapáti"
        }
      },
      {
        name: "Zsálya Vendégház",
        meta: "quiet, nature-close countryside rest",
        href: "/en/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image",
          alt: "Zsálya Vendégház countryside accommodation near Szent György Hill"
        }
      },
      {
        name: "Szőlőliget Vendégház",
        meta: "a slower stay among the vineyards",
        href: "/en/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Szőlőliget Vendégház countryside stay among vineyards"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "Káli-medence · quiet village atmosphere",
        href: "/en/dandelion-koveskal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "D2 English related Köveskál"
          ),
          alt: "Exterior view of Dandelion Köveskál guesthouse"
        }
      }
    ]
  }
};

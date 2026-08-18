import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Dandelion Koveskal content added for the shared accommodation template.
export const koveskalEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Köveskál | Countryside stay in the Káli Basin",
    description:
      "Dandelion Köveskál in the Káli Basin: peaceful countryside stay near Lake Balaton for guests who value village atmosphere, nature and slow days."
  },
  bookingLink: "/en/contact/",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "koveskal",
      "gallery",
      "dandelion-koveskal-source-001.webp",
      "Dandelion Köveskál English mobile hero"
    ),
    fallbackAlt: "Dandelion Köveskál guesthouse in a quiet part of the Káli Basin",
    kicker: "Káli Basin · Köveskál",
    title: "Dandelion",
    titleAccent: "Köveskál",
    subtitle: "QUIET COUNTRYSIDE STAY IN THE KÁLI BASIN",
    lead:
      "A peaceful guesthouse for guests who are looking for the slower rhythm of the Káli Basin, village atmosphere and nature-close rest.",
    video: {
      desktop: "/videos/accommodations/koveskal/dandelion-koveskal-hero-desktop.mp4?v=20260603-lite",
      mobile: "/videos/accommodations/koveskal/dandelion-koveskal-hero-mobile-lite.mp4?v=20260606-mobile-lite"
    },
    primaryCtaLabel: "Send inquiry",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "A quiet, comfortable guesthouse in a calm part of Köveskál, with generous spaces and a real Káli Basin mood.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A calm place with a slower rhythm and a good starting point for exploring the Káli Basin.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "Friendly, nature-close atmosphere that works well for both a short rest and a longer break.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The quiet of the area and the understated countryside mood make it especially easy to like.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A pleasant, tidy accommodation and a good base for trips and quiet evenings.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "Clean, comfortable rest in the Káli Basin, without a crowded resort feeling.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Village calm · Káli Basin",
    title: "Quiet rest in the Káli Basin",
    lead:
      "Dandelion Köveskál gives you a restrained, nature-close base in Köveskál, with easy access to the villages, walking routes and wine stops of the Káli Basin."
  },
  details: {
    kicker: "Dandelion Köveskál",
    title: "Village calm, nature-close rhythm and slower days",
    shortDescription:
      "Dandelion Köveskál is a good choice for guests looking for the quiet, characterful side of the Káli Basin, where rest matters as much as local programmes.",
    longDescription: [
      "Köveskál is one of the calmer points of the Káli Basin, where stone walls, vineyards, small village streets and a slower daily rhythm shape the stay.",
      "The guesthouse is a good starting point for walks, nearby wine stops and Balaton Uplands programmes where the quiet and the landscape remain part of the rest.",
      "If you are drawn to the more understated countryside side of the Dandelion stays, Köveskál is a natural continuation of that mood."
    ],
    moreLabel: "More about Dandelion Köveskál",
    ctaLabel: "Send inquiry"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Location", "Köveskál"],
          ["Region", "Káli Basin"],
          ["Style", "quiet countryside rest"],
          ["Best for", "larger families and groups of friends looking for a calmer stay"]
        ]
      },
      {
        title: "Atmosphere",
        items: [
          ["Focus", "slower time away"],
          ["Surroundings", "village-like and nature-close"],
          ["Programmes", "walks, trips and rest"],
          ["Pace", "quiet and understated"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Nature-close atmosphere", icon: "leaf" },
      { label: "Good base for trips", icon: "trail" },
      { label: "Countryside calm", icon: "users" },
      { label: "Káli Basin setting", icon: "route" },
      { label: "Wine region nearby", icon: "grapes" },
      { label: "Clear photo gallery", icon: "wifi" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "balaton", title: "Köveskál", text: "Location" },
      { iconKey: "route", title: "Káli Basin", text: "Region" },
      { iconKey: "leaf", title: "Village calm", text: "Style" },
      { iconKey: "spark", title: "Slower time away", text: "Mood" },
      { iconKey: "trail", title: "Walks and wineries", text: "Programmes" },
      { iconKey: "leaf", title: "Quiet rhythm", text: "Rest" }
    ],
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "leaf",
        title: "Slow days",
        text: "A calm village setting"
      },
      {
        iconKey: "trail",
        title: "Good base for exploring",
        text: "Káli Basin nearby"
      },
      {
        iconKey: "spark",
        title: "Understated atmosphere",
        text: "Natural, not crowded"
      },
      {
        iconKey: "grill",
        title: "Wine-region surroundings",
        text: "Cellars and local stops"
      }
    ]
  },
  geoDecision: {
    kicker: "Köveskál quick answers",
    title: "Dandelion Köveskál is a good choice if you want a quiet village-style guesthouse in the Káli Basin for slower days and local exploring",
    lead:
      "The Köveskál guesthouse gives up to 6 guests a calm Káli Basin base with a large garden, large terrace, 2 bathrooms, village rhythm and nearby wine and gastronomy programmes.",
    questions: [
      {
        question: "Who is Dandelion Köveskál best for?",
        answer:
          "It is a good fit for larger families and groups of friends who are not looking for a busy lakeside stay, but for a quieter Káli Basin village atmosphere in Köveskál."
      },
      {
        question: "How many guests is the Köveskál guesthouse comfortable for?",
        answer:
          "The house is comfortable for up to 6 guests. The sleeping setup includes 2 double beds and 2 single beds, and 2 bathrooms support a more comfortable stay."
      },
      {
        question: "What are the garden and terrace like?",
        answer:
          "The large garden and large terrace suit slower days: breakfast outside, evening conversations, reading and quiet shared time."
      },
      {
        question: "What programmes is Köveskál a good base for?",
        answer:
          "It is a good starting point for Káli Basin villages, walks, wine and gastronomy stops, Hegyestű, Salföld, Badacsony and Lake Balaton trips."
      },
      {
        question: "How is Köveskál different from lakeside Balaton stays?",
        answer:
          "Köveskál is not a waterfront stay; it is a quieter, more village-like Káli Basin choice. It works best when landscape, village mood, wine region and slower pace matter more than direct beach access."
      },
      {
        question: "What is the courtyard like at the Köveskál guesthouse?",
        answer:
          "The house has a pretty enclosed courtyard, giving guests a calm outdoor space for breakfast, evening conversations, reading or slower family time."
      }
    ],
    amenitiesTitle: "What matters at Köveskál"
  },
  amenities: [
    { iconKey: "leaf", title: "Nature-close atmosphere" },
    { iconKey: "trail", title: "Good base for trips" },
    { iconKey: "family", title: "Countryside calm" },
    { iconKey: "route", title: "Káli Basin setting" },
    { iconKey: "grill", title: "Wine region nearby" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Moments from the Köveskál atmosphere",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Köveskál gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "KÖVESKÁL · KÁLI BASIN",
    title: "Around Dandelion Köveskál",
    body:
      "Köveskál is one of the calm, characterful villages of the Káli Basin. The area is a good choice for slower days, walks and longer trips across the Balaton Uplands.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Káli Basin atmosphere", icon: "grapes" },
      { label: "Trips nearby", icon: "trail" },
      { label: "Quiet village rhythm", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=K%C3%B6vesk%C3%A1l&z=13&output=embed",
    embedTitle: "Map of the area around Dandelion Köveskál"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion Köveskál gallery",
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
    intro: "If you like the quiet of the Káli Basin, you can also choose another Balaton Uplands or Lake Balaton area Dandelion stay from here.",
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
        name: "Dandelion D2",
        meta: "4-6 guests · garden · family-friendly",
        href: "/en/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image",
          alt: "Dandelion D2 countryside accommodation near Szent György Hill"
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
        name: "Dandelion Royal Homes",
        meta: "comfortable days near Lake Balaton",
        href: "/en/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "Köveskál English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
        }
      }
    ]
  }
};

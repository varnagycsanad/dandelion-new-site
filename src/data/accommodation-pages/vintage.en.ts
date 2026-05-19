import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Dandelion Vintage content added for the shared accommodation template.
export const vintageEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Vintage Vendégház | Peaceful countryside stay near Lake Balaton",
    description:
      "Dandelion Vintage Vendégház is a peaceful countryside guesthouse with a warm, characterful atmosphere, ideal for a relaxed stay near Lake Balaton and the Balaton Uplands."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=0c9e5eaae0545ee3&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "vintage",
      "gallery",
      "dandelion-vintage-source-001.webp",
      "Dandelion Vintage English mobile hero"
    ),
    fallbackAlt: "Dandelion Vintage Vendégház in Nemesgulács with a private garden and peaceful countryside atmosphere",
    kicker: "Nemesgulács · Balaton Uplands",
    title: "Dandelion",
    titleAccent: "Vintage",
    subtitle: "PEACEFUL COUNTRYSIDE STAY WITH A PRIVATE GARDEN NEAR LAKE BALATON",
    lead: "A friendly countryside guesthouse in Nemesgulács, with a private garden and an easy, relaxed rhythm close to Lake Balaton.",
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "Real guest feedback from Google and Booking.com.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A very lovable house, where the private garden and quiet surroundings truly help you slow down.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "We arrived as a family, and the house felt comfortable, practical and easy to use with a small child.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The Vintage atmosphere feels warm, and the garden and grill add a lot to relaxed evenings.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Good location, a quiet house and stable internet, comfortable for both rest and calm work.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "Lake Balaton is close, yet staying here is much calmer than being in the busier resort areas.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Countryside calm · private garden · family-friendly rest",
    title: "A comfortable guesthouse in Nemesgulács with a gentle Vintage mood",
    lead: "Vintage works well for guests who like having Lake Balaton nearby, but prefer returning at the end of the day to a quieter house with its own garden."
  },
  details: {
    kicker: "Dandelion Vintage Vendégház",
    title: "Private garden, air-conditioned comfort and a quiet base near Lake Balaton",
    shortDescription:
      "A two-bedroom house with living room, private garden, air conditioning and strong internet, comfortable for families, couples and friends.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "One of the best parts of Vintage is the private garden and the calm daily rhythm: breakfast outside, a Lake Balaton or countryside programme during the day, then grilling and quiet in the evening.",
      "The house is well equipped, air-conditioned and has strong gigabit internet, so it is comfortable for resting, retreating or even a little calm work. Lake Balaton is only 7 km away, close enough for easy beach days while the stay itself keeps a quieter village pace.",
      "The guesthouse has two bedrooms and a living room. The main bedroom has a 180 cm double bed, the second bedroom has two separate 90 cm beds, and the living room offers an additional sofa bed. A separate kitchen and bathroom are also available.",
      "Vintage is set up in a simple, useful, everything-you-need way: a practical kitchen, air conditioning, stable internet, a private garden and a grill make the days easy. Baby-friendly equipment also makes it a good choice for families arriving with small children.",
      "Dandelion Vintage Vendégház suits families, friends spending a few quiet days together, couples looking for a countryside break, and guests who want Lake Balaton within easy reach without sleeping in the middle of the bustle."
    ],
    moreLabel: "More about Dandelion Vintage Vendégház",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Location", "Nemesgulács"],
          ["Layout", "2 bedrooms + living room"],
          ["Sleeping options", "180 cm double bed, 2 separate beds and a sofa bed"],
          ["Distance", "Lake Balaton 7 km"]
        ]
      },
      {
        title: "Comfort and atmosphere",
        items: [
          ["Comfort", "air conditioning and strong gigabit internet"],
          ["Outdoor space", "private garden and grilling option"],
          ["Amenities", "separate kitchen and bathroom"],
          ["For families", "baby-friendly equipment"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "2 bedrooms + living room", icon: "home" },
      { label: "Private garden", icon: "leaf" },
      { label: "Grilling option", icon: "utensils" },
      { label: "Air conditioning", icon: "sun" },
      { label: "Strong internet", icon: "wifi" },
      { label: "Baby-friendly equipment", icon: "users" },
      { label: "Lake Balaton 7 km", icon: "route" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "balaton", title: "Nemesgulács", text: "Location" },
      { iconKey: "home", title: "2 bedrooms + living room", text: "Layout" },
      { iconKey: "garden", title: "Private garden", text: "Outdoor space" },
      { iconKey: "route", title: "Lake Balaton 7 km", text: "Distance" },
      { iconKey: "sun", title: "Air-conditioned comfort", text: "Comfort" },
      { iconKey: "family", title: "Family-friendly", text: "Stay style" }
    ],
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "leaf",
        title: "Quiet countryside rhythm",
        text: "A calm house for slower days"
      },
      {
        iconKey: "grill",
        title: "Easy garden evenings",
        text: "Private garden and grill"
      },
      {
        iconKey: "balaton",
        title: "Balaton nearby, less bustle",
        text: "A comfortable distance"
      },
      {
        iconKey: "family",
        title: "Good for families too",
        text: "Homely and practical"
      }
    ]
  },
  amenities: [
    { iconKey: "home", title: "2 bedrooms + living room" },
    { iconKey: "garden", title: "Private garden" },
    { iconKey: "grill", title: "Grilling option" },
    { iconKey: "sun", title: "Air conditioning" },
    { iconKey: "wifi", title: "Strong internet" },
    { iconKey: "utensils", title: "Separate kitchen" },
    { iconKey: "bathroom", title: "Bathroom" },
    { iconKey: "family", title: "Baby-friendly equipment" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Moments from the Vintage atmosphere",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Vintage gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "NEMESGULÁCS · BALATON UPLANDS",
    title: "Around Dandelion Vintage Vendégház",
    body: "Dandelion Vintage Vendégház is located in Nemesgulács, in a quiet countryside setting. From here, the Lake Balaton shore, local trips, witness hills and Balaton Uplands wineries are easy to reach, while the house itself keeps a calmer rhythm.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Lake Balaton 7 km", icon: "route" },
      { label: "Quiet village setting", icon: "leaf" },
      { label: "Trips and wineries nearby", icon: "trail" }
    ],
    embedSrc: "https://www.google.com/maps?q=Nemesgul%C3%A1cs&z=12&output=embed",
    embedTitle: "Map of the area around Dandelion Vintage Vendégház"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion Vintage gallery",
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
        name: "Fügeház",
        meta: "terraces · countryside views · quiet rest",
        href: "/en/dandelion-fugehaz/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház countryside guesthouse with terrace near Szent György Hill"
        }
      },
      {
        name: "Dandelion D1",
        meta: "spacious countryside stay for families and friends",
        href: "/en/dandelion-d1/",
        image: {
          type: "mapping",
          slot: "d1_card_image",
          alt: "Dandelion D1 spacious countryside guesthouse in Kisapáti"
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
            "Dandelion Vintage English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
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
      }
    ]
  }
};

import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Royal Homes content added for the shared accommodation template.
export const royalHomesEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Royal Homes in Keszthely | Comfortable apartments near Lake Balaton",
    description:
      "Dandelion Royal Homes offers comfortable apartments in Keszthely, close to Lake Balaton, ideal for a convenient stay near the lake and the town centre."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=c4b8753ec9ad4dc9&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "royal_homes",
      "gallery",
      "dandelion-royal-homes-source-001.webp",
      "Royal Homes English mobile hero"
    ),
    fallbackAlt: "Dandelion Royal Homes apartment in Keszthely near Lake Balaton",
    kicker: "Keszthely · near Lake Balaton",
    title: "Dandelion",
    titleAccent: "Royal Homes",
    subtitle: "COMFORTABLE APARTMENT NEAR LAKE BALATON",
    lead: "A comfortable, high-quality apartment in Keszthely, where Lake Balaton, the waterfront and the town centre are all easy to reach.",
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
        quote: "A very lovable apartment with carefully designed interiors and a calm Lake Balaton feeling.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The location is especially convenient, with the waterfront, promenade and town programmes easy to reach.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A thoughtful, high-quality apartment where the large terrace adds a lot to the stay.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Modern and comfortable accommodation, a good base for Keszthely and Lake Balaton days.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "A clean, high-standard apartment that feels easy to use for both shorter and longer stays.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Comfortable apartment · lake nearby · town convenience",
    title: "A high-quality apartment stay in Keszthely",
    lead: "Dandelion Royal Homes is a good choice if you want a modern apartment close to Lake Balaton and Keszthely's town programmes, while still keeping the stay calm and comfortable."
  },
  details: {
    kicker: "Dandelion Royal Homes",
    title: "A comfortable Keszthely apartment with a large terrace and lakeside convenience",
    shortDescription:
      "A two-bedroom apartment with living room, large terrace, wide balcony, private waterfront pier for the building and a rooftop jacuzzi in the residential complex.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "Dandelion Royal Homes is set in a lakeside residential area in Keszthely, close to Lake Balaton, the waterfront promenade and the town's programmes. It suits guests who want lake days and town convenience in one comfortable stay.",
      "The building has its own waterfront pier, sun terrace and a shared rooftop jacuzzi. The cycling route, sailing harbour and lakeside promenade are directly nearby, while the town centre and Keszthely's main sights are around a 10-minute walk away.",
      "The apartment is reached by a glass-walled lift. Inside, the entrance opens into a bright living room with an American-style kitchen, with direct access to the large terrace. A wide balcony runs along the outer side of the apartment, making the outdoor space one of its strongest features.",
      "Dandelion Royal Homes has custom-designed, high-quality furniture and carefully placed decorative lighting in every room. The building's sail-like floor plan, curved walls and coordinated materials give the apartment an elegant, modern atmosphere without making it feel cold.",
      "Comfort is supported by a heat-pump system, underfloor heating and individually adjustable cooling-heating air conditioning in the rooms. The apartment is designed for both shorter breaks and longer stays.",
      "The layout includes 2 bedrooms and a living room. One bedroom has a 180 cm double bed, while the other has a pull-out sofa. The apartment has a bathroom with bathtub and toilet, plus a separate toilet. Terrace furniture makes outdoor rest simple.",
      "Dandelion Royal Homes is ideal for guests looking for a comfortable, modern apartment in Keszthely, close to Lake Balaton, the promenade, the harbour and the town centre."
    ],
    moreLabel: "More about Dandelion Royal Homes",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Location", "Keszthely"],
          ["Setting", "lakeside residential area near Lake Balaton"],
          ["Layout", "2 bedrooms + living room"],
          ["Building", "new residential complex with glass-walled lift"]
        ]
      },
      {
        title: "Comfort details",
        items: [
          ["Outdoor space", "private waterfront pier for the building, sun terrace, large terrace and wide balcony"],
          ["Rooftop", "shared rooftop jacuzzi"],
          ["Comfort", "underfloor heating and individually adjustable cooling-heating air conditioning"],
          ["Interior", "custom furniture, decorative lighting and high-quality equipment"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Keszthely", icon: "route" },
      { label: "Lakeside residential area", icon: "mountain" },
      { label: "Waterfront pier for the building", icon: "leaf" },
      { label: "Shared rooftop jacuzzi", icon: "home" },
      { label: "2 bedrooms + living room", icon: "users" },
      { label: "Large terrace and wide balcony", icon: "trail" },
      { label: "Underfloor heating", icon: "utensils" },
      { label: "Cooling-heating air conditioning", icon: "wifi" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "balaton", title: "Keszthely", text: "Location" },
      { iconKey: "home", title: "2 bedrooms + living room", text: "Layout" },
      { iconKey: "route", title: "Near Lake Balaton", text: "Setting" },
      { iconKey: "terrace", title: "Large terrace", text: "Outdoor space" },
      { iconKey: "spark", title: "Rooftop jacuzzi", text: "Shared highlight" },
      { iconKey: "sun", title: "Heating and air conditioning", text: "Comfort" }
    ],
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "balaton",
        title: "Lake and town together",
        text: "Harbour, promenade, centre"
      },
      {
        iconKey: "spark",
        title: "High-quality apartment feel",
        text: "Thoughtful interiors"
      },
      {
        iconKey: "terrace",
        title: "Strong outdoor space",
        text: "Terrace and sun area"
      },
      {
        iconKey: "home",
        title: "Comfortable for longer stays",
        text: "Practical layout"
      }
    ]
  },
  geoDecision: {
    kicker: "Royal Homes quick answers",
    title: "Dandelion Royal Homes is a good choice if you want a modern Keszthely apartment close to Lake Balaton and convenient for town programmes",
    lead:
      "Royal Homes is a high-quality two-bedroom apartment with living room in Keszthely's lakeside residential area, with a large terrace, wide balcony, waterfront pier for the building and a shared rooftop jacuzzi.",
    questions: [
      {
        question: "Who is Dandelion Royal Homes best for?",
        answer:
          "It works well for families, couples and friends looking for a modern, high-quality apartment in Keszthely, close to Lake Balaton, the promenade, the harbour and town programmes."
      },
      {
        question: "How close is it to Lake Balaton?",
        answer:
          "Royal Homes is in a lakeside residential area. The promenade, sailing harbour and cycling route are easy to reach, and the building has its own waterfront pier and sun terrace."
      },
      {
        question: "How many guests is Royal Homes comfortable for?",
        answer:
          "The apartment has 2 bedrooms and a living room and can serve as a comfortable Lake Balaton base for up to 6 guests. One bedroom has a double bed, while the other has a pull-out sofa."
      },
      {
        question: "Is there a jacuzzi at Royal Homes?",
        answer:
          "Yes, the residential complex has a shared rooftop jacuzzi. It is not a private in-apartment jacuzzi, but a shared premium comfort feature of the building."
      },
      {
        question: "What is the outdoor space like?",
        answer:
          "One of the strongest parts of the apartment is the large terrace and wide balcony. The building's sun terrace and waterfront pier add to the Lake Balaton holiday feeling."
      },
      {
        question: "What programmes is Keszthely good for?",
        answer:
          "It is a good base for Lake Balaton beach days, the promenade, the harbour, cycling, Keszthely town programmes and West Balaton trips. The town centre is around a 10-minute walk away."
      }
    ],
    amenitiesTitle: "What matters at Royal Homes"
  },
  amenities: [
    { iconKey: "leaf", title: "Waterfront pier for the building" },
    { iconKey: "sun", title: "Sun terrace" },
    { iconKey: "spark", title: "Shared rooftop jacuzzi" },
    { iconKey: "terrace", title: "Large terrace" },
    { iconKey: "utensils", title: "Underfloor heating" },
    { iconKey: "wifi", title: "Cooling-heating air conditioning" },
    { iconKey: "home", title: "Separate toilet" },
    { iconKey: "home", title: "Glass-walled lift" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Dandelion Royal Homes",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Dandelion Royal Homes gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "KESZTHELY · NEAR LAKE BALATON",
    title: "Around Dandelion Royal Homes",
    body: "Dandelion Royal Homes is in a lakeside residential area of Keszthely, where the promenade, sailing harbour, cycling route and town programmes are easy to reach. The setting gives guests a comfortable mix of Lake Balaton presence and town convenience.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Promenade and harbour nearby", icon: "route" },
      { label: "Cycling route directly beside the residential complex", icon: "trail" },
      { label: "Town centre around a 10-minute walk away", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Keszthely&z=13&output=embed",
    embedTitle: "Map of the area around Dandelion Royal Homes"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion Royal Homes gallery",
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
        meta: "4-6 guests · terraces · countryside calm",
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
        name: "Szépvölgyi Vendégház",
        meta: "Badacsonyörs · peaceful stay near Lake Balaton",
        href: "/en/szepvolgyi/",
        image: {
          type: "mapping",
          slot: "szepvolgyi_card_image",
          alt: "Szépvölgyi Vendégház in Badacsonyörs near Lake Balaton"
        }
      },
      {
        name: "Szőlőliget Vendégház",
        meta: "quiet stay · large terrace · panorama",
        href: "/en/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Szőlőliget Vendégház countryside stay among vineyards"
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
      }
    ]
  }
};

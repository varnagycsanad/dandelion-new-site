import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Royal Homes content added for the shared accommodation template.
export const royalHomesEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion Royal Homes | Keszthely near Balaton",
    description:
      "Royal Homes in Keszthely near Lake Balaton: apartment for 4-6 guests with a large terrace, waterfront pier and shared rooftop jacuzzi."
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
    kicker: "Keszthely · apartment near Lake Balaton",
    title: "Dandelion",
    titleAccent: "Royal Homes",
    subtitle: "KESZTHELY APARTMENT NEAR LAKE BALATON",
    lead: "Royal Homes is a modern two-bedroom apartment in Keszthely, not a standalone guesthouse. It suits guests who want to stay near Lake Balaton with a large terrace and a shared rooftop jacuzzi.",
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
    kicker: "apartment, not guesthouse · lake nearby · town convenience",
    title: "A Keszthely apartment stay for guests who want lake and town together",
    lead: "Dandelion Royal Homes is a good choice if you want a modern apartment in Keszthely rather than a detached guesthouse, with quick access to the waterfront, harbour and town programmes."
  },
  details: {
    kicker: "Dandelion Royal Homes",
    title: "An apartment in Keszthely near Lake Balaton, with terrace, pier and shared jacuzzi",
    shortDescription:
      "A two-bedroom apartment for 4-6 guests in Keszthely, with a large terrace, waterfront pier for the building and a shared rooftop jacuzzi in the residential complex.",
    highlights: [
      "Apartment, not standalone guesthouse: a modern stay in a residential complex in Keszthely.",
      "Near Lake Balaton: the promenade, harbour and cycling route are easy to reach, and the building has its own waterfront pier.",
      "Good for couples and families: 2 bedrooms plus living room for up to 6 guests.",
      "Best for guests who prefer waterfront programmes and town convenience over a detached countryside house."
    ],
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
    featuredExperience: {
      label: "Why choose Keszthely?",
      title: "Keszthely is a strong base if you want Lake Balaton and town comfort in one trip",
      text: "Beach days, promenade walks, harbour atmosphere, restaurants and town programmes are all part of the same stay, so you do not need to choose between lakeside mood and urban convenience.",
      note: "Royal Homes turns that Keszthely advantage into a modern apartment stay.",
      iconKey: "balaton",
      imageKey: "hero-desktop"
    },
    experienceCta: {
      eyebrow: "Royal Homes or another Dandelion stay?",
      title: "Royal Homes is the Balaton apartment option",
      text: "Choose it if you want to stay in Keszthely near the lake. Another Dandelion stay may fit better if you want a detached guesthouse, a bigger garden or a quieter vineyard setting.",
      href: "/en/szallasok/",
      ctaLabel: "Compare Dandelion stays",
      image: {
        src: "/images/home/region-stories/dandelion-home-balaton-story-01.webp",
        alt: "Lake Balaton atmosphere near Keszthely",
        width: 1800,
        height: 1350
      }
    },
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "balaton",
        title: "Lake and town together",
        text: "promenade, harbour, restaurants, centre"
      },
      {
        iconKey: "spark",
        title: "Jacuzzi plus terrace",
        text: "more than just a place to sleep"
      },
      {
        iconKey: "home",
        title: "Clearly an apartment stay",
        text: "modern complex, not guesthouse"
      },
      {
        iconKey: "users",
        title: "Works for couples and families",
        text: "2 bedrooms plus living room"
      }
    ]
  },
  geoDecision: {
    kicker: "Royal Homes quick answers",
    title: "Dandelion Royal Homes is a Keszthely apartment near Lake Balaton, not a standalone guesthouse",
    lead:
      "Royal Homes is a two-bedroom apartment with living room in Keszthely's lakeside residential area, with a large terrace, waterfront pier for the building and a shared rooftop jacuzzi. It is best for guests who want the lake, the promenade and town convenience close by.",
    questions: [
      {
        question: "Apartment or guesthouse?",
        answer:
          "Royal Homes is an apartment, not a standalone guesthouse. It is in a modern residential complex in Keszthely, so it fits guests who want a practical lake-and-town base rather than a detached house."
      },
      {
        question: "Balaton accommodation near the lake in Keszthely?",
        answer:
          "Yes. Royal Homes is in Keszthely's lakeside residential area near the promenade, harbour and cycling route, and the building has its own waterfront pier and sun terrace."
      },
      {
        question: "Is there accommodation with jacuzzi in Keszthely?",
        answer:
          "Yes. Royal Homes includes access to a shared rooftop jacuzzi in the residential complex. It is not a private in-apartment jacuzzi, but a shared premium feature of the building."
      },
      {
        question: "Is it better for couples or families?",
        answer:
          "It can work for both. Couples like the modern feel and quick access to the waterfront, while families benefit from the two-bedroom layout, the living room and the 4-6 guest capacity."
      },
      {
        question: "How long does it take to reach the shore?",
        answer:
          "The waterfront feeling starts almost immediately: the residential complex has its own pier, and the promenade and harbour are within an easy short walk."
      },
      {
        question: "Why choose this over another Dandelion stay?",
        answer:
          "Royal Homes is the stronger choice if staying close to Lake Balaton, restaurants and town programmes matters more to you than having a detached guesthouse, a bigger garden or a quieter vineyard setting."
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

import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Zsalya content added for the shared accommodation template.
export const zsalyaEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Zsálya Vendégház near Szent György Hill | Peaceful countryside stay",
    description:
      "Zsálya Vendégház is a quiet countryside guesthouse near Szent György Hill in the Balaton Uplands, ideal for a peaceful stay close to nature."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=cf20da88f046211e&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "zsalya",
      "gallery",
      "dandelion-zsalya-source-001.webp",
      "Zsalya English mobile hero"
    ),
    fallbackAlt: "Zsálya Vendégház countryside guesthouse near Szent György Hill",
    kicker: "Szent György Hill · Kisapáti",
    title: "Zsálya",
    titleAccent: "Vendégház",
    subtitle: "QUIET COUNTRYSIDE GUESTHOUSE FOR SLOWER DAYS",
    lead: "A separate two-floor hillside guesthouse for 4 guests, with a fully covered glass terrace, large private grounds, witness-hill views and a peaceful countryside rhythm.",
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "Guest-style notes for the quiet terrace, hillside setting and walks around Szent György Hill.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A quiet, calm place where it is easy to start a walk and very good to return in the evening.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The terrace and the surrounding landscape add a lot to the rest, and it is easy to find a slower rhythm here.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A smaller but thoughtful and comfortable house, a good choice for resting close to nature.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A friendly, comfortable stay and a very good base for discovering Szent György Hill.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "A peaceful, quiet place where the covered terrace is pleasant even when the weather changes.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Quiet · terrace · sunrise",
    title: "A separate little house in the calm of the hillside",
    lead: "Zsálya Vendégház is for guests who want a separate hillside house where the glass terrace, wide private grounds and witness-hill views shape the stay."
  },
  details: {
    kicker: "Zsálya Vendégház",
    title: "Sunrise, witness-hill views and a calm two-floor stay",
    shortDescription:
      "A two-floor guesthouse for 4 guests, with a fully covered glass terrace, large private grounds, refreshed interiors and a quiet, nature-close setting near Szent György Hill.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "Mornings are one of the quiet pleasures of Zsálya Vendégház: sunrise, hillside light and the view from the terrace naturally set a slower pace for the day.",
      "The house was refreshed in 2026. The terrace is now fully covered and connected to the landscape through large glass surfaces. From here, the view opens toward Csobánc, Gulács and Tóti Hill.",
      "The lower level has a cooking corner, a bathroom with shower and a separate toilet. The kitchen corner includes a refrigerator, built-in freezer and the everyday tools needed for shorter or longer stays.",
      "The living area is bright and friendly, with a sofa, several windows and direct access to the terrace. Upstairs, guests have a double bed, a sink and a bathtub.",
      "Both floors have air conditioning, so the house can be cooled in summer and heated in cooler weather. The large private grounds, the fully covered terrace and the quiet surroundings help guests settle into an easier countryside rhythm.",
      "One of the practical advantages is the location: hiking routes around Szent György Hill are almost available from the gate. Days can start with a walk and end with a quiet evening back at the house."
    ],
    moreLabel: "More about Zsálya Vendégház",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Guests", "4 guests"],
          ["Layout", "separate two-floor small house"],
          ["Location", "eastern side of Szent György Hill"],
          ["Refreshed", "updated in 2026 with a fully covered glass terrace"]
        ]
      },
      {
        title: "Highlights",
        items: [
          ["Views", "Csobánc, Gulács and Tóti Hill from the terrace"],
          ["Morning", "beautiful sunrise atmosphere"],
          ["Comfort", "air conditioning on both floors"],
          ["Walks", "hiking route almost from the gate"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Separate guesthouse", icon: "home" },
      { label: "Comfortable for 4 guests", icon: "users" },
      { label: "Two floors", icon: "route" },
      { label: "Fully covered glass terrace", icon: "leaf" },
      { label: "Witness-hill views", icon: "mountain" },
      { label: "Large private grounds", icon: "leaf" },
      { label: "Air conditioning on both floors", icon: "sun" },
      { label: "Equipped kitchen corner", icon: "utensils" },
      { label: "Hiking route nearby", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "4 guests", text: "Capacity" },
      { iconKey: "home", title: "Two floors", text: "Layout" },
      { iconKey: "terrace", title: "Covered glass terrace", text: "Outdoor space" },
      { iconKey: "mountain", title: "Witness-hill views", text: "View" },
      { iconKey: "sun", title: "Air conditioning on both floors", text: "Comfort" },
      { iconKey: "balaton", title: "Eastern side of Szent György Hill", text: "Location" }
    ],
    reasonsTitle: "Why you will love it",
    reasons: [
      { iconKey: "mountain", title: "Witness-hill views", text: "Csobánc, Gulács" },
      { iconKey: "terrace", title: "Covered glass terrace", text: "With views" },
      { iconKey: "leaf", title: "Large private grounds", text: "Calm, space" },
      { iconKey: "trail", title: "Walking base", text: "Routes nearby" }
    ]
  },
  geoDecision: {
    kicker: "Zsálya quick answers",
    title: "Dandelion Zsálya is a quiet, separate hillside house for 4 guests, with a fully covered terrace and witness-hill views",
    lead: "Zsálya offers large glass surfaces, large private grounds, two floors, air conditioning on both floors and nearby hiking routes for a calm Balaton Uplands stay.",
    questions: [
      {
        iconKey: "family",
        question: "Who is Zsálya a good choice for?",
        answer: "Zsálya suits couples, smaller families and guests looking for a quiet stay with a separate house, large private grounds and beautiful views."
      },
      {
        iconKey: "mountain",
        question: "What is the view like?",
        answer: "The terrace and large glass surfaces open toward the witness hills, including Csobánc, Gulács and Tóti Hill."
      },
      {
        iconKey: "terrace",
        question: "What makes the terrace special?",
        answer: "The terrace is fully covered and connected to the landscape through large glass surfaces, so it works well in the morning, evening and changing weather."
      },
      {
        iconKey: "guests",
        question: "How many guests is it comfortable for?",
        answer: "Zsálya is comfortable for 4 guests in a two-floor guesthouse."
      },
      {
        iconKey: "bathroom",
        question: "What is inside the house?",
        answer: "There is air conditioning on both floors, an equipped kitchen corner, two bathrooms, a bathtub, a separate toilet and a living area with terrace access."
      },
      {
        iconKey: "trail",
        question: "What activities is it a good base for?",
        answer: "Zsálya works well for hiking, witness-hill trips, Lake Balaton programs and quieter Balaton Uplands days, with routes available in several directions nearby."
      }
    ],
    amenitiesTitle: "What matters in Zsálya"
  },
  amenities: [
    { iconKey: "terrace", title: "Fully covered terrace" },
    { iconKey: "terrace", title: "Large glass surfaces" },
    { iconKey: "mountain", title: "Witness-hill views" },
    { iconKey: "leaf", title: "Large private grounds" },
    { iconKey: "sun", title: "Air conditioning on both floors" },
    { iconKey: "utensils", title: "Equipped kitchen corner" },
    { iconKey: "bathroom", title: "Two bathrooms" },
    { iconKey: "trail", title: "Hiking routes nearby" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Zsálya Vendégház",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Zsálya Vendégház gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY HILL · EASTERN SIDE",
    title: "Around Zsálya Vendégház",
    body: "Zsálya Vendégház sits on the eastern side of Szent György Hill, where hiking routes are almost available from the gate. The area gives easy access to the quieter, nature-close side of the Balaton Uplands.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Hiking route nearby", icon: "trail" },
      { label: "Quiet hillside setting", icon: "leaf" },
      { label: "Witness-hill views", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Map of the area around Zsálya Vendégház"
  },
  lightbox: {
    galleryAriaLabel: "Zsálya Vendégház gallery",
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
        name: "Szőlőliget Vendégház",
        meta: "vineyard-area quiet · large terrace · witness-hill views",
        href: "/en/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Szőlőliget Vendégház countryside stay near Szent György Hill"
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
        name: "Fügeház",
        meta: "4-6 guests · terraces · countryside views",
        href: "/en/dandelion-fugehaz/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház countryside guesthouse with terrace near Szent György Hill"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6-8 guests · spacious family stay",
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
            "Zsalya English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
        }
      }
    ]
  }
};

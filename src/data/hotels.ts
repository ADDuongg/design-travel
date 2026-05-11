import { getProvince } from "@/data/provinces";

const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=${w}`;

/** Mirrors reference HotelSortBy */
export type HotelSortMode = "newest" | "name" | "rating";

/** Mirrors reference HotelListQuery (province as slug for this codebase) */
export type HotelListQuery = {
  search: string;
  /** Empty string = all provinces */
  provinceSlug: string;
  minStars: 0 | 3 | 4 | 5;
  sortBy: HotelSortMode;
};

export const defaultHotelListQuery: HotelListQuery = {
  search: "",
  provinceSlug: "",
  minStars: 0,
  sortBy: "newest",
};

/** Static archive excerpt — same shape as TourReviewEntry */
export type HotelReviewEntry = {
  rating: number;
  comment: string;
  author: string;
  place?: string;
  date: string;
};

/** Subset of reference Room for editorial previews (no booking API) */
export type HotelRoomPreview = {
  id: string;
  roomType: string;
  name: string;
  shortDescription: string;
  maxGuests: number;
  roomSizeM2?: number;
  pricing: {
    basePrice: number;
    currency: string;
    weekendPrice?: number;
  };
  bookingConfig: {
    minNights: number;
    maxNights?: number;
    allowInstantBooking: boolean;
  };
  inventoryTotalRooms: number;
  thumbnail?: string;
  hotelRules?: string[];
};

export type HotelGalleryItem = {
  src: string;
  alt: string;
};

export type HotelListItem = {
  slug: string;
  title: string;
  dek: string;
  provinceSlug: string;
  starRating: number;
  coverImage: string;
  ratingAvg: number;
  reviewCount: number;
  /** Indicative from-price in VND — confirm via correspondence */
  priceFromVnd: number;
  priceNote: string;
  /** For “newest” sort in static dataset */
  listingYear: number;
  mood: string;
};

export type HotelDetail = HotelListItem & {
  address: string;
  storyLead: string;
  storyBody: string[];
  gallery: HotelGalleryItem[];
  amenities: string[];
  policies: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  location?: {
    lat: number;
    lng: number;
    mapLabel?: string;
  };
  rooms: HotelRoomPreview[];
  reviews: HotelReviewEntry[];
};

const hotelsDetailed: HotelDetail[] = [
  {
    slug: "fog-drinkers-inn",
    title: "Fog Drinkers Inn",
    dek: "Teak floors, tea at dawn, and a terrace that forgets the highway exists.",
    provinceSlug: "ha-giang",
    starRating: 3,
    coverImage: u("photo-1528127269322-539801943592"),
    ratingAvg: 4.72,
    reviewCount: 128,
    priceFromVnd: 890000,
    priceNote: "Indicative double · correspondence confirms window",
    listingYear: 2023,
    mood: "Plateau hush",
    address: "Đường phố Cầu Mè, thị trấn Đồng Văn, Hà Giang",
    storyLead:
      "A small house turned inward toward fog — corridors short, windows tall, so weather writes the first paragraph of every day.",
    storyBody: [
      "Owners keep a handwritten ledger of who asked for extra blankets and who wanted silence. There is no lobby television; the common room is paper maps and a single radio tuned low.",
      "Breakfast is phở or cháo depending on what the market carried — never a buffet line. Nights cool fast; staff will remind you to close the wooden shutters before mist climbs the stairs.",
    ],
    gallery: [
      { src: u("photo-1566073771259-6a8506099945"), alt: "Terrace at dawn" },
      { src: u("photo-1582719508461-905c673771fd"), alt: "Guest room interior" },
      { src: u("photo-1618773928121-c32242e63f39"), alt: "Corridor light" },
    ],
    amenities: ["Mountain water kettle", "Borrowed rain gear", "Motorbike lock-up", "Common room maps"],
    policies: ["Check-in after 14:00 · Check-out before 11:00", "Quiet hours 22:00–07:00", "No smoking indoors"],
    contact: {
      phone: "+84-219-000-1122",
      email: "stay@fogdrinkers.example",
      website: "https://example.com/fog-drinkers",
    },
    location: { lat: 23.2797, lng: 105.3619, mapLabel: "Đồng Văn town edge" },
    rooms: [
      {
        id: "r1",
        roomType: "Plateau double",
        name: "Mist Double",
        shortDescription: "Queen, east light, shared terrace access.",
        maxGuests: 2,
        roomSizeM2: 24,
        pricing: { basePrice: 890000, currency: "VND", weekendPrice: 1050000 },
        bookingConfig: { minNights: 2, maxNights: 14, allowInstantBooking: false },
        inventoryTotalRooms: 6,
        thumbnail: u("photo-1631049307264-da0ec9a703e5"),
        hotelRules: ["No shoes on teak runner"],
      },
      {
        id: "r2",
        roomType: "Family loft",
        name: "Ledger Loft",
        shortDescription: "Two queens, low ceiling — best for readers.",
        maxGuests: 4,
        roomSizeM2: 38,
        pricing: { basePrice: 1520000, currency: "VND" },
        bookingConfig: { minNights: 2, allowInstantBooking: false },
        inventoryTotalRooms: 2,
        thumbnail: u("photo-1590490360182-c33d57733418"),
      },
    ],
    reviews: [
      {
        rating: 5,
        comment: "They remembered we wanted the quiet room from email — rare.",
        author: "Minh T.",
        place: "Đà Nẵng",
        date: "January 2026",
      },
      {
        rating: 4,
        comment: "Stairs are steep; worth it for the roof view at 5:45.",
        author: "Clara R.",
        place: "Berlin",
        date: "November 2025",
      },
    ],
  },
  {
    slug: "sapa-thread-lodge",
    title: "Sapa Thread Lodge",
    dek: "Indigo-dyed linen, wood smoke from the valley, and a reading chair that faces the wrong ridge on purpose.",
    provinceSlug: "lao-cai",
    starRating: 4,
    coverImage: u("photo-1542314831-068cd1dbfeeb"),
    ratingAvg: 4.58,
    reviewCount: 214,
    priceFromVnd: 1250000,
    priceNote: "From rate · valley-view rooms step up gently",
    listingYear: 2022,
    mood: "Ridge-thread calm",
    address: "Hoàng Liên, Sa Pa, Lào Cai",
    storyLead: "Built beside a seamstress cooperative — walls hold dye vats downstairs, sleep upstairs.",
    storyBody: [
      "Windows are small by design so cold drafts choreograph slowly. Staff train in one-sentence weather reports: “cloud at knee height by noon.”",
      "Evening broth is vegetarian unless you ask a day ahead — logistics here respect the market bus schedule, not algorithms.",
    ],
    gallery: [
      { src: u("photo-1566663417736-0e227b66e635"), alt: "Linen and window" },
      { src: u("photo-1611892440504-42a792e54d66"), alt: "Lodge exterior" },
    ],
    amenities: ["Drying room for jackets", "Indigo workshop visit", "Luggage lift"],
    policies: ["Deposit for keys · cash or transfer", "Children welcome; loft ladders unsupervised"],
    contact: { phone: "+84-214-555-8891", email: "threads@sapalodge.example" },
    location: { lat: 22.3364, lng: 103.8438 },
    rooms: [
      {
        id: "s1",
        roomType: "Valley deluxe",
        name: "Indigo Deluxe",
        shortDescription: "King, valley glass, heated towel rack.",
        maxGuests: 2,
        roomSizeM2: 32,
        pricing: { basePrice: 1450000, currency: "VND", weekendPrice: 1680000 },
        bookingConfig: { minNights: 1, maxNights: 10, allowInstantBooking: true },
        inventoryTotalRooms: 8,
        thumbnail: u("photo-1591088398332-8a7791972843"),
      },
    ],
    reviews: [
      { rating: 5, comment: "Workshop hour felt sincere, not staged.", author: "Hương L.", date: "March 2025" },
    ],
  },
  {
    slug: "old-quarter-hush",
    title: "Old Quarter Hush",
    dek: "Three floors, twelve keys, a courtyard that swallows scooter honks.",
    provinceSlug: "hanoi",
    starRating: 4,
    coverImage: u("photo-1564501049412-61c2a3083791"),
    ratingAvg: 4.81,
    reviewCount: 502,
    priceFromVnd: 2100000,
    priceNote: "Weekend corridor rooms carry a soft premium",
    listingYear: 2021,
    mood: "Courtyard diplomacy",
    address: "Ngõ nhỏ phố Hàng Bông, Hoàn Kiếm, Hà Nội",
    storyLead: "A tube house softened — inner well of light, outer wall thick to the street.",
    storyBody: [
      "Reception is a desk under a skylight; keys hang on brass hooks labeled by scent of soap, not numbers.",
      "Coffee is phin downstairs at 06:30; after 22:00 the gate locks — night staff texts a code if you return late.",
    ],
    gallery: [
      { src: u("photo-1551882547-ff40c63fe5e9"), alt: "Courtyard" },
      { src: u("photo-1578683010236-d716f9a3f461"), alt: "Room" },
      { src: u("photo-1584132967334-10e2bd60faa2"), alt: "Stairwell" },
    ],
    amenities: ["Phin coffee mornings", "Bicycle map overlays", "Laundry bag same-day"],
    policies: ["ID scan required by local regulation", "No parties — acoustic guitar okay until 21:00"],
    contact: { phone: "+84-24-3822-0091", email: "quiet@oldquarterhush.example", website: "https://example.com/old-quarter-hush" },
    location: { lat: 21.0285, lng: 105.8542, mapLabel: "Hoàn Kiếm fringe" },
    rooms: [
      {
        id: "h1",
        roomType: "Courtyard queen",
        name: "Well Queen",
        shortDescription: "Internal view, quietest category.",
        maxGuests: 2,
        roomSizeM2: 22,
        pricing: { basePrice: 2100000, currency: "VND", weekendPrice: 2450000 },
        bookingConfig: { minNights: 1, allowInstantBooking: true },
        inventoryTotalRooms: 5,
        thumbnail: u("photo-1631049552057-403cdb8f46f7"),
      },
      {
        id: "h2",
        roomType: "Street studio",
        name: "Balcony Studio",
        shortDescription: "Sofa, desk, small balcony — some street texture.",
        maxGuests: 2,
        pricing: { basePrice: 1850000, currency: "VND", weekendPrice: 2200000 },
        bookingConfig: { minNights: 1, allowInstantBooking: true },
        inventoryTotalRooms: 4,
        thumbnail: u("photo-1505693416388-ac5ce068fe85"),
      },
    ],
    reviews: [
      { rating: 5, comment: "Earplugs in drawer but I never opened them — courtyard magic.", author: "James K.", place: "Melbourne", date: "February 2026" },
      { rating: 4, comment: "Stairs narrow with luggage; staff carried both bags.", author: "Lan P.", date: "December 2025" },
    ],
  },
  {
    slug: "perfume-river-house",
    title: "Perfume River House",
    dek: "River-facing balconies, slow fans, and a library of Hue poetry reprints.",
    provinceSlug: "thua-thien-hue",
    starRating: 5,
    coverImage: u("photo-1566073771259-6a8506099945"),
    ratingAvg: 4.9,
    reviewCount: 167,
    priceFromVnd: 3200000,
    priceNote: "Heritage wing · modern wing priced lower on request",
    listingYear: 2024,
    mood: "Imperial breeze",
    address: "Lê Lợi, Phú Hội, Huế",
    storyLead: "Two wings — one restored timber, one quiet concrete — share a garden that slopes toward the water.",
    storyBody: [
      "Concierge refuses to print “top ten” lists; they hand-draw a single walking line based on how hot the asphalt felt yesterday.",
      "Room service stops at 21:00; after that there is tea and oranges in the salon.",
    ],
    gallery: [
      { src: u("photo-1582719478250-c89cae4dc85b"), alt: "River balcony" },
      { src: u("photo-1445019980597-93fa8e234b51"), alt: "Garden path" },
    ],
    amenities: ["River shuttle bicycles", "Poetry salon Thu", "Spa steam limited slots"],
    policies: ["Heritage wing no children under 12", "Respect robe dress code in spa"],
    contact: { phone: "+84-234-3939-001", email: "river@perfumehouse.example" },
    location: { lat: 16.4637, lng: 107.5909 },
    rooms: [
      {
        id: "p1",
        roomType: "Heritage suite",
        name: "Timber Suite",
        shortDescription: "Separate sitting room, river glass wall.",
        maxGuests: 3,
        roomSizeM2: 56,
        pricing: { basePrice: 5200000, currency: "VND" },
        bookingConfig: { minNights: 2, allowInstantBooking: false },
        inventoryTotalRooms: 4,
        thumbnail: u("photo-1595576508898-0ad3c879a1ca"),
      },
      {
        id: "p2",
        roomType: "Garden double",
        name: "Garden Double",
        shortDescription: "Ground floor, patio, modern wing.",
        maxGuests: 2,
        roomSizeM2: 30,
        pricing: { basePrice: 3200000, currency: "VND" },
        bookingConfig: { minNights: 1, allowInstantBooking: true },
        inventoryTotalRooms: 10,
        thumbnail: u("photo-1615873968403-89e068629265"),
      },
    ],
    reviews: [{ rating: 5, comment: "Wing choice explained honestly — no upsell tone.", author: "Elena V.", date: "April 2025" }],
  },
  {
    slug: "lantern-coast-stay",
    title: "Lantern Coast Stay",
    dek: "Short walk to Cửa Đại breeze; rooms smell of lime leaf and salt.",
    provinceSlug: "quang-nam",
    starRating: 4,
    coverImage: u("photo-1520250497591-112f2f40a3f4"),
    ratingAvg: 4.63,
    reviewCount: 341,
    priceFromVnd: 1780000,
    priceNote: "Garden path rooms slightly lower",
    listingYear: 2022,
    mood: "Salt-lantern ease",
    address: "Cẩm Châu, Hội An, Quảng Nam",
    storyLead: "A low compound — roofs staggered so neighbors’ laundry lines still get sun.",
    storyBody: [
      "Pool is small and shaded; staff will tell you which beach hour had the gentlest undertow last week.",
      "Bikes are numbered; baskets come with a cloth map folded to rice paper thickness.",
    ],
    gallery: [
      { src: u("photo-1571896349842-33c89424de2d"), alt: "Pool and palms" },
      { src: u("photo-1566073771259-6a8506099945"), alt: "Path" },
    ],
    amenities: ["Pool towels", "Bike with basket", "Beach umbrella shed"],
    policies: ["Pool closes 20:00", "Sand rinse before lobby entry"],
    contact: { phone: "+84-235-3911-772", email: "hello@lanterncoast.example" },
    location: { lat: 15.8801, lng: 108.338 },
    rooms: [
      {
        id: "q1",
        roomType: "Pool deluxe",
        name: "Pool Deluxe",
        shortDescription: "Ground patio + direct pool access.",
        maxGuests: 2,
        pricing: { basePrice: 1980000, currency: "VND", weekendPrice: 2300000 },
        bookingConfig: { minNights: 2, allowInstantBooking: true },
        inventoryTotalRooms: 12,
        thumbnail: u("photo-1596436889106-be35e843f974"),
      },
    ],
    reviews: [{ rating: 4, comment: "Bike tires a bit soft — fixed in twenty minutes.", author: "Tomás G.", date: "August 2025" }],
  },
  {
    slug: "sea-silk-retreat",
    title: "Sea Silk Retreat",
    dek: "Dunes in the morning voice, concrete cooled by sea air at night.",
    provinceSlug: "binh-thuan",
    starRating: 5,
    coverImage: u("photo-1507525428034-b723cf961d3e"),
    ratingAvg: 4.77,
    reviewCount: 189,
    priceFromVnd: 4100000,
    priceNote: "Villa categories · duplex on inquiry",
    listingYear: 2023,
    mood: "Dune-line luxury",
    address: "Nguyễn Đình Chiểu, Hàm Tiến, Bình Thuận",
    storyLead: "Low-slung blocks buried in casuarina — corridors open to wind, not air-con tunnels.",
    storyBody: [
      "Restaurant sources fish from a list of boat names, not ports — menu changes when those boats rest.",
      "Spa uses cold stones first, hot second — staff trained in one coastal clinic tradition.",
    ],
    gallery: [
      { src: u("photo-1540541338287-41700207dee6"), alt: "Beach path" },
      { src: u("photo-1520250497591-112f2f40a3f4"), alt: "Pool at dusk" },
    ],
    amenities: ["Private beach cabanas", "Surf board rack", "Kids tide pool hour"],
    policies: ["Outside food not at pool", "Drone use by permission only"],
    contact: { phone: "+84-252-384-0001", email: "stay@seasilk.example", website: "https://example.com/sea-silk" },
    location: { lat: 10.9347, lng: 108.2839 },
    rooms: [
      {
        id: "b1",
        roomType: "Dune villa",
        name: "Dune Villa",
        shortDescription: "Two bedrooms, kitchenette, plunge pool.",
        maxGuests: 5,
        roomSizeM2: 95,
        pricing: { basePrice: 8900000, currency: "VND" },
        bookingConfig: { minNights: 2, maxNights: 21, allowInstantBooking: false },
        inventoryTotalRooms: 6,
        thumbnail: u("photo-1602002418082-a4443e081dd1"),
      },
      {
        id: "b2",
        roomType: "Ocean double",
        name: "Ocean Double",
        shortDescription: "High floor, glass rail balcony.",
        maxGuests: 2,
        pricing: { basePrice: 4100000, currency: "VND" },
        bookingConfig: { minNights: 1, allowInstantBooking: true },
        inventoryTotalRooms: 24,
        thumbnail: u("photo-1566663417736-0e227b66e635"),
      },
    ],
    reviews: [{ rating: 5, comment: "Cold stone ritual was new to us — memorable.", author: "Sora N.", place: "Osaka", date: "May 2025" }],
  },
  {
    slug: "pine-mist-villa",
    title: "Pine Mist Villa",
    dek: "Fireplaces in July, french doors to a garden that argues with fog.",
    provinceSlug: "lam-dong",
    starRating: 4,
    coverImage: u("photo-1600596542815-ffad4c1539a9"),
    ratingAvg: 4.69,
    reviewCount: 256,
    priceFromVnd: 1950000,
    priceNote: "Firewood allotment included Nov–Feb",
    listingYear: 2021,
    mood: "Highland hush",
    address: "Măng Lin, Đà Lạt, Lâm Đồng",
    storyLead: "Mid-century bones, contemporary linens — heat is optional, blankets are not.",
    storyBody: [
      "Breakfast includes strawberry jam from one farm contract renewed each Tet.",
      "Staff will not promise “best sunrise spot” — they describe three benches with different wind exposures.",
    ],
    gallery: [
      { src: u("photo-1600585154340-be6161a56a0c"), alt: "Villa exterior" },
      { src: u("photo-1600607687939-ce8a6c25118c"), alt: "Living room" },
    ],
    amenities: ["Fireplace kit", "Garden chess", "Jeep tour partner desk"],
    policies: ["No open flame on balconies", "Pets one small dog by advance notice"],
    contact: { phone: "+84-263-3822-441", email: "mist@pinevilla.example" },
    location: { lat: 11.9404, lng: 108.4583 },
    rooms: [
      {
        id: "l1",
        roomType: "Garden bungalow",
        name: "Bungalow B",
        shortDescription: "Detached, fireplace, small kitchen.",
        maxGuests: 3,
        roomSizeM2: 45,
        pricing: { basePrice: 2650000, currency: "VND" },
        bookingConfig: { minNights: 2, allowInstantBooking: false },
        inventoryTotalRooms: 8,
        thumbnail: u("photo-1600047509807-ba8f99d2cdde"),
      },
    ],
    reviews: [{ rating: 4, comment: "Firewood bundle was generous.", author: "Bảo N.", date: "January 2026" }],
  },
  {
    slug: "saigon-ledger-suite",
    title: "Saigon Ledger Suite",
    dek: "High floor silence above Phạm Viết Chánh — desk lamps meant for long letters.",
    provinceSlug: "ho-chi-minh-city",
    starRating: 5,
    coverImage: u("photo-1542314831-068cd1dbfeeb"),
    ratingAvg: 4.85,
    reviewCount: 412,
    priceFromVnd: 2800000,
    priceNote: "Club floor · city view premium",
    listingYear: 2024,
    mood: "Vertical calm",
    address: "Phạm Viết Chánh, Quận 1, TP. Hồ Chí Minh",
    storyLead: "Tower hotel with a dedicated quiet floor — keycards fail loud bars.",
    storyBody: [
      "Housekeeping uses scent-free products unless you opt into lemongrass sachet.",
      "Club lounge serves cold bánh mì sandwiches at 15:00 — a nod to office workers’ break rhythm.",
    ],
    gallery: [
      { src: u("photo-1618773928121-c32242e63f39"), alt: "Suite living" },
      { src: u("photo-1631049307264-da0ec9a703e5"), alt: "Night city view" },
    ],
    amenities: ["Club lounge", "Gym 24h", "Airport sedan partner"],
    policies: ["Club dress smart casual after 18:00", "Late checkout subject to occupancy"],
    contact: { phone: "+84-28-3822-9988", email: "ledger@saigonsuite.example", website: "https://example.com/ledger-suite" },
    location: { lat: 10.789, lng: 106.697 },
    rooms: [
      {
        id: "c1",
        roomType: "Club king",
        name: "Club King",
        shortDescription: "High floor, tub, city panorama.",
        maxGuests: 2,
        roomSizeM2: 42,
        pricing: { basePrice: 3200000, currency: "VND", weekendPrice: 3800000 },
        bookingConfig: { minNights: 1, allowInstantBooking: true },
        inventoryTotalRooms: 30,
        thumbnail: u("photo-1591088398332-8a7791972843"),
      },
    ],
    reviews: [{ rating: 5, comment: "Quiet floor promise held — rare in Q1.", author: "Priya S.", place: "Singapore", date: "October 2025" }],
  },
  {
    slug: "delta-lantern-canal",
    title: "Delta Lantern Canal",
    dek: "Water taxis stop at the garden gate; rooms open to fruit trees, not corridors.",
    provinceSlug: "can-tho",
    starRating: 3,
    coverImage: u("photo-1566073771259-6a8506099945"),
    ratingAvg: 4.55,
    reviewCount: 97,
    priceFromVnd: 720000,
    priceNote: "Canal wing · garden wing steps up",
    listingYear: 2020,
    mood: "Mekong lantern",
    address: "Đường Hai Bà Trưng, Ninh Kiều, Cần Thơ",
    storyLead: "Homestay scale with hotel-grade sheets — owner family lives in the back house.",
    storyBody: [
      "Floating market pickup leaves at 05:10 sharp; if you miss it, they will not fake a second boat — honesty over revenue.",
      "Dinner is family-style unless you request tray service for jet lag.",
    ],
    gallery: [
      { src: u("photo-1564501049412-61c2a3083791"), alt: "Canal garden" },
      { src: u("photo-1582719508461-905c673771fd"), alt: "Guest room" },
    ],
    amenities: ["Water taxi coordination", "Mosquito nets optional", "Laundry line garden"],
    policies: ["Shoes off in wooden house wing", "Quiet after 22:00 — roosters exempt"],
    contact: { phone: "+84-292-385-2211", email: "canal@delta-lantern.example" },
    rooms: [
      {
        id: "k1",
        roomType: "Canal double",
        name: "Canal Double",
        shortDescription: "Shared bathroom wing possible — ask when booking.",
        maxGuests: 2,
        roomSizeM2: 18,
        pricing: { basePrice: 720000, currency: "VND" },
        bookingConfig: { minNights: 1, allowInstantBooking: true },
        inventoryTotalRooms: 7,
        thumbnail: u("photo-1505693416388-ac5ce068fe85"),
      },
    ],
    reviews: [{ rating: 4, comment: "Missed boat — they refunded half without us asking.", author: "Chris D.", date: "September 2025" }],
  },
  {
    slug: "paper-lantern-alley",
    title: "Paper Lantern Alley",
    dek: "Micro-inn above a bookbindery — two rooms only, shared bath honest in listing.",
    provinceSlug: "hanoi",
    starRating: 3,
    coverImage: u("photo-1519710164239-da123dc03ef4"),
    ratingAvg: 4.88,
    reviewCount: 64,
    priceFromVnd: 650000,
    priceNote: "Two keys total · correspondence essential",
    listingYear: 2024,
    mood: "Bibliophile nook",
    address: "Ngõ Trung Yên, Hoàn Kiếm, Hà Nội",
    storyLead: "You book the whole floor or nothing — the bindery closes at 18:00 and silence is the amenity.",
    storyBody: [
      "Shared bath is across a covered bridge three meters — slippers provided, ego not.",
      "Tea is self-serve; owner leaves notes in pencil about which shelf has decaf.",
    ],
    gallery: [{ src: u("photo-1522708323590-d24dbb6b0267"), alt: "Reading nook" }],
    amenities: ["Bookbindery tour", "Shared kitchenette", "Roof clothesline"],
    policies: ["Whole floor booking only", "No visitors not on reservation"],
    contact: { email: "twokeys@paperlantern.example" },
    rooms: [
      {
        id: "y1",
        roomType: "Whole floor",
        name: "Alley Floor",
        shortDescription: "Two bedrooms, one shared bath across bridge.",
        maxGuests: 4,
        pricing: { basePrice: 2400000, currency: "VND" },
        bookingConfig: { minNights: 2, allowInstantBooking: false },
        inventoryTotalRooms: 1,
        thumbnail: u("photo-1520250497591-112f2f40a3f4"),
      },
    ],
    reviews: [{ rating: 5, comment: "Shared bath was spotless every morning.", author: "Yuki M.", date: "December 2025" }],
  },
];

export const hotels: HotelDetail[] = hotelsDetailed;

export function getHotel(slug: string): HotelDetail | undefined {
  return hotels.find((h) => h.slug === slug);
}

function matchesSearch(h: HotelDetail, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  const prov = getProvince(h.provinceSlug)?.name ?? "";
  return (
    h.title.toLowerCase().includes(s) ||
    h.dek.toLowerCase().includes(s) ||
    h.address.toLowerCase().includes(s) ||
    prov.toLowerCase().includes(s)
  );
}

export function filterHotels(list: HotelDetail[], query: HotelListQuery): HotelDetail[] {
  return list.filter((h) => {
    if (query.provinceSlug && h.provinceSlug !== query.provinceSlug) return false;
    if (query.minStars > 0 && h.starRating < query.minStars) return false;
    if (!matchesSearch(h, query.search)) return false;
    return true;
  });
}

export function sortHotels(list: HotelDetail[], sortBy: HotelSortMode): HotelDetail[] {
  const copy = [...list];
  if (sortBy === "name") {
    copy.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "rating") {
    copy.sort((a, b) => b.ratingAvg - a.ratingAvg || b.reviewCount - a.reviewCount);
  } else {
    copy.sort((a, b) => b.listingYear - a.listingYear || b.ratingAvg - a.ratingAvg);
  }
  return copy;
}

export function priceLabelFrom(h: Pick<HotelDetail, "priceFromVnd" | "priceNote">): string {
  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(h.priceFromVnd);
  return `${formatted} from · ${h.priceNote}`;
}

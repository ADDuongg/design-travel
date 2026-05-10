export type CitySlug = "hanoi" | "da-nang" | "hoi-an" | "ho-chi-minh-city" | "da-lat";

export type CityCard = {
  slug: CitySlug;
  name: string;
  subtitle: string;
  vibe: string;
  specialties: string[];
  image: string;
  moodClass: "city-hanoi" | "city-danang" | "city-hoian" | "city-hcmc" | "city-dalat";
};

export type CityGuide = CityCard & {
  eyebrow: string;
  intro: string;
  fullGuide: boolean;
  heroSecondary?: string;
  foods: { title: string; detail: string; image: string }[];
  experiences: { title: string; detail: string }[];
  hiddenPlaces: { title: string; detail: string }[];
  walks: { title: string; stops: string[]; km: string }[];
  gallery: string[];
  culture: { title: string; body: string }[];
  bestTime: string;
};

/** Curated Unsplash photography — editorial travel mood, not generic composites */
const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

export const cityCards: CityCard[] = [
  {
    slug: "hanoi",
    name: "Hanoi",
    subtitle: "Layers of lakeside dusk",
    vibe: "Nostalgic lanes · dusk trains · egg coffee steam",
    specialties: ["Phở gánh", "Bánh cuốn", "Egg coffee"],
    moodClass: "city-hanoi",
    image: u("photo-1528127269322-539801943592"),
  },
  {
    slug: "da-nang",
    name: "Da Nang",
    subtitle: "Sea salt on the marble breeze",
    vibe: "Coastal roads · morning surf · modern galleries",
    specialties: ["Mì Quảng", "Bánh xèo", "Seafood grill"],
    moodClass: "city-danang",
    image: u("photo-1559827260-dc66d52bef19"),
  },
  {
    slug: "hoi-an",
    name: "Hoi An",
    subtitle: "Silk light through paper lanterns",
    vibe: "Riverside tailors · night markets · slow pedals",
    specialties: ["Cao lầu", "White rose dumplings", "Herbed corn"],
    moodClass: "city-hoian",
    image: u("photo-1559592419-010646930cda"),
  },
  {
    slug: "ho-chi-minh-city",
    name: "Ho Chi Minh City",
    subtitle: "Neon rivers on asphalt",
    vibe: "Rooftop jazz · alley banh mi · midnight phở",
    specialties: ["Bánh mì", "Hủ tiếu", "Com tam"],
    moodClass: "city-hcmc",
    image: u("photo-1583417319070-7bcbc71bcbd8"),
  },
  {
    slug: "da-lat",
    name: "Da Lat",
    subtitle: "Pine fog and greenhouse glass",
    vibe: "French villas · farm strawberries · quiet hikes",
    specialties: ["Bánh căn", "Artichoke tea", "Farm cheeses"],
    moodClass: "city-dalat",
    image: u("photo-1464822759023-fed622ff2c3b"),
  },
];

const guides: Record<CitySlug, CityGuide> = {
  hanoi: {
    ...cityCards[0],
    eyebrow: "Northern pulse",
    fullGuide: true,
    heroSecondary: u("photo-1528184039930-03951f31748f"),
    intro:
      "Hanoi rewards wandering without a map — tiled sidewalks, cyclo bells, and the perfume of grilled pork drifting from alley kitchens. Stay through blue hour; the Old Quarter turns cinematic when storefront shutters glow and trains sigh past pastel flats.",
    foods: [
      {
        title: "Street-side phở before sunrise",
        detail:
          "Metal stools under fluorescent strips, broth skimmed for hours, herbs piled high. Order cham tight — locals sip before the commute wakes.",
        image: u("photo-1569718212162-588ae82494df"),
      },
      {
        title: "Egg coffee on a wooden loft",
        detail:
          "Ca Phe Trung feels like dessert disguised as ritual. Sit floor-level, listen for rain on corrugated roofs.",
        image: u("photo-1497935586351-b67a49e012bf"),
      },
      {
        title: "Bánh cuốn steamed to order",
        detail:
          "Paper-thin rice sheets, wood-ear mushroom filling, fish sauce cut with lime — breakfast choreography behind glass.",
        image: u("photo-1546549032-9571cd6b27df"),
      },
    ],
    experiences: [
      {
        title: "Train street choreography",
        detail:
          "Tables retract; shutters slam; phones lift as steel brushes brick — respectful distance keeps residents sane.",
      },
      {
        title: "Long Bien dawn ride",
        detail:
          "Borrow a bicycle for mist over the Red River — fishermen silhouette against rusty trusses.",
      },
      {
        title: "Ceramic roads of Bat Trang",
        detail:
          "Half-day ceramic village east of the city — glaze fires and river breezes.",
      },
    ],
    hiddenPlaces: [
      {
        title: "Apartment block cafes",
        detail:
          "Follow handwritten arrows up spiral stairs — rooftop mint teas overlooking zinc roofs.",
      },
      {
        title: "French mansions behind hedges",
        detail:
          "Ba Dinh side streets hide embassy-era villas turned galleries — knock softly on courtyard gates.",
      },
      {
        title: "West Lake lotus pockets",
        detail:
          "Cycle the quieter northern rim where lotus farms exhale at sunset.",
      },
    ],
    walks: [
      {
        title: "Old Quarter sensory loop",
        stops: ["Hang Bac silver smells", "Ma May courtyard tea", "Ta Hien spillover"],
        km: "3.2 km",
      },
      {
        title: "French Quarter shade arc",
        stops: ["Opera House limestone", "Metropole hedges", "Trang Tien ice cream"],
        km: "2.4 km",
      },
    ],
    gallery: [
      u("photo-1583417319070-7bcbc71bcbd8"),
      u("photo-1528127269322-539801943592"),
      u("photo-1476514525535-07fb3b4ae5f1"),
      u("photo-1469474968028-56623f02e42e"),
    ],
    culture: [
      {
        title: "Water puppet ancestry",
        body: "Evening shows near Hoan Kiem pair percussion with lacquer screens — mythic turtles still circle the lake in storytelling.",
      },
      {
        title: "Calligraphy street during Tet",
        body: "Hang Buom blooms red paper — artists brush wishes while incense threads the cold.",
      },
    ],
    bestTime: "October–April for dry cool air; September for moody storms if you love cinematic skies.",
  },
  "da-nang": {
    ...cityCards[1],
    eyebrow: "Central coast",
    fullGuide: false,
    intro:
      "Marble mountains shoulder the city while Han River bridges bloom LEDs after dark. Morning is for seafood markets; afternoons belong to gallery hopping between ocean dips.",
    foods: [],
    experiences: [],
    hiddenPlaces: [],
    walks: [],
    gallery: [cityCards[1].image],
    culture: [],
    bestTime: "February–August for swimmable seas; September invites quieter beaches.",
  },
  "hoi-an": {
    ...cityCards[2],
    eyebrow: "Lantern river",
    fullGuide: false,
    intro:
      "Yellow walls drink golden hour; sampans drift under silk bulbs. Tailors measure by tea light — leave room in your bag.",
    foods: [],
    experiences: [],
    hiddenPlaces: [],
    walks: [],
    gallery: [cityCards[2].image],
    culture: [],
    bestTime: "Dry months February–July; full moon nights amplify lantern reflections.",
  },
  "ho-chi-minh-city": {
    ...cityCards[3],
    eyebrow: "Southern velocity",
    fullGuide: false,
    intro:
      "Motorbike rivers braid District 1 with rooftop bars humming saxophone. Midnight bowls of phở appear where alley fluorescents never sleep.",
    foods: [],
    experiences: [],
    hiddenPlaces: [],
    walks: [],
    gallery: [cityCards[3].image],
    culture: [],
    bestTime: "December–April dry heat; rainy season greens the canals.",
  },
  "da-lat": {
    ...cityCards[4],
    eyebrow: "Highland mist",
    fullGuide: false,
    intro:
      "Pine needles soften every sound; glasshouses fog at dawn. Cafés pour strawberry brews beside valley swings.",
    foods: [],
    experiences: [],
    hiddenPlaces: [],
    walks: [],
    gallery: [cityCards[4].image],
    culture: [],
    bestTime: "Year-round cool; November rains deepen fog for moody photography.",
  },
};

export function getCity(slug: string): CityGuide | undefined {
  return guides[slug as CitySlug];
}

export const foodStories = [
  {
    title: "Night grills & rice paper",
    body: "Plastic stools glow under bare bulbs — pork skewers hiss beside dill-heavy cha ca trays.",
    image: u("photo-1567620905732-2d1ec7ab7445"),
  },
  {
    title: "Market mornings",
    body: "Banana leaves unwrap sticky rice; vendors chop herbs by rhythm, not scale.",
    image: u("photo-1498837167922-ddd27525d352"),
  },
  {
    title: "Coffee as ceremony",
    body: "Phin drip stalls time — condensed milk layered slow while scooters blur outside.",
    image: u("photo-1497935586351-b67a49e012bf"),
  },
];

export const trendingSpots = [
  {
    label: "Sa Pa terraces",
    detail: "Mist ladders climb limestone ribs.",
    image: u("photo-1470071459604-3b5ec3a7fe05"),
  },
  {
    label: "Ha Giang loops",
    detail: "Karst walls ribbon beside hemp fields.",
    image: u("photo-1526778548025-fa2f459cd5c1"),
  },
  {
    label: "Phong Nha caves",
    detail: "Underground rivers swallow headlamps.",
    image: u("photo-1500530855697-b586d89ba3ee"),
  },
];

export const collections = [
  {
    title: "Lantern streets after rain",
    subtitle: "Reflections, scooter sparks, wet lacquer.",
    image: u("photo-1507525428034-b723cf961d3e"),
  },
  {
    title: "Mountain passes & ribbon fog",
    subtitle: "Switchbacks stitched above tea terraces.",
    image: u("photo-1526778548025-fa2f459cd5c1"),
  },
  {
    title: "Island limestone mornings",
    subtitle: "Junks idle till mist peels back.",
    image: u("photo-1476514525535-07fb3b4ae5f1"),
  },
];

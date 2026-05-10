export type TourCategory =
  | "food-tours"
  | "coastal-journeys"
  | "mountain-exploration"
  | "coffee-culture"
  | "hidden-city-walks"
  | "cultural-experiences";

export const tourCategoryLabels: Record<TourCategory, string> = {
  "food-tours": "Food tours",
  "coastal-journeys": "Coastal journeys",
  "mountain-exploration": "Mountain exploration",
  "coffee-culture": "Coffee culture",
  "hidden-city-walks": "Hidden city walks",
  "cultural-experiences": "Cultural experiences",
};

export const tourCategories: TourCategory[] = [
  "food-tours",
  "coastal-journeys",
  "mountain-exploration",
  "coffee-culture",
  "hidden-city-walks",
  "cultural-experiences",
];

export type TourCollection = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  slugs: string[];
};

/** Indicative planning budget — confirm via correspondence (editorial site, not checkout). */
export type TourVoiceQuote = {
  quote: string;
  attribution: string;
  roleOrPlace?: string;
};

/** Structured reviews (static archive — mirrors travel booking sites’ rating lists). */
export type TourReviewEntry = {
  rating: number;
  comment: string;
  author: string;
  /** Optional location or context line under the name. */
  place?: string;
  /** Display date, e.g. “March 2025”. */
  date: string;
};

export type TourScheduleWindow = {
  label: string;
  note: string;
};

export type TourGalleryItem = {
  src: string;
  alt: string;
};

export type TourListItem = {
  slug: string;
  title: string;
  dek: string;
  category: TourCategory;
  mood: string;
  duration: string;
  /** Calendar-day span for copy (sub-day walks may use 0). */
  durationDays: number;
  durationNights: number;
  /** Sort key for “shorter first” — approximate hours of experience. */
  sortDurationHours: number;
  region: string;
  coverImage: string;
  /** Indicative from-price in VND for sorting and display. */
  priceFromVnd: number;
  priceNote: string;
  /** Optional seasonal note — subtle, not a screaming badge. */
  salePercent?: number;
  ratingAvg: number;
  reviewCount: number;
};

export type TourItineraryStop = {
  label: string;
  title: string;
  detail: string;
};

export type TourDetail = TourListItem & {
  heroSecondary?: string;
  storyLead: string;
  storyBody: string[];
  itinerary: TourItineraryStop[];
  gallery: TourGalleryItem[];
  foods: { title: string; detail: string; image: string }[];
  context: { title: string; body: string }[];
  suggested: { title: string; detail: string; slug?: string }[];
  voiceQuotes: TourVoiceQuote[];
  departureRhythm: string[];
  nextWindows: TourScheduleWindow[];
  included: string[];
  excluded: string[];
  inquiryCopy: string;
  /** Max travelers per departure for booking request UI (demo cap). */
  maxGuests: number;
  /** Rating list + comments (demo content). */
  reviewEntries: TourReviewEntry[];
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function priceLabelFrom(item: Pick<TourListItem, "priceFromVnd" | "salePercent">): string {
  const base = item.priceFromVnd;
  if (item.salePercent && item.salePercent > 0) {
    const discounted = Math.round(base * (1 - item.salePercent / 100));
    return `From ${formatVnd(discounted)}`;
  }
  return `From ${formatVnd(base)}`;
}

export const tourCollections: TourCollection[] = [
  {
    id: "after-dark",
    title: "After dark flavors",
    subtitle: "Grills, neon reflections, and phở steam before dawn.",
    image: u("photo-1567620905732-2d1ec7ab7445"),
    slugs: ["saigon-midnight-tasting", "hanoi-dawn-bowls"],
  },
  {
    id: "coast-ridges",
    title: "Coast & limestone",
    subtitle: "Salt wind, fishing boats, and empty roads after rain.",
    image: u("photo-1559827260-dc66d52bef19"),
    slugs: ["central-coast-ribbon", "hoi-an-lantern-drift"],
  },
  {
    id: "mist-lines",
    title: "Fog & elevation",
    subtitle: "Terraces, pine silence, and coffee that tastes like weather.",
    image: u("photo-1470071459604-3b5ec3a7fe05"),
    slugs: ["sapa-terrace-mist", "dalat-highland-fog"],
  },
];

export const tours: TourListItem[] = [
  {
    slug: "saigon-midnight-tasting",
    title: "Saigon midnight tasting lanes",
    dek: "Plastic stools, herb piles, and the hum of District 3 long after office towers sleep.",
    category: "food-tours",
    mood: "Electric · aromatic · intimate",
    duration: "Evening — 4 hours",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 4,
    region: "Ho Chi Minh City",
    coverImage: u("photo-1583417319070-7bcbc71bcbd8"),
    priceFromVnd: 1_290_000,
    priceNote: "Indicative host-led tasting route · beverages extra",
    salePercent: 10,
    ratingAvg: 4.9,
    reviewCount: 128,
  },
  {
    slug: "hanoi-dawn-bowls",
    title: "Hanoi dawn bowls & steam",
    dek: "Follow fluorescent strips to broth that clears the fog from your bones.",
    category: "food-tours",
    mood: "Nostalgic · steam-lit · unhurried",
    duration: "Early morning — 3 hours",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 3,
    region: "Hanoi",
    coverImage: u("photo-1569718212162-588ae82494df"),
    priceFromVnd: 890_000,
    priceNote: "Street food pacing · small-group departure",
    ratingAvg: 4.95,
    reviewCount: 204,
  },
  {
    slug: "central-coast-ribbon",
    title: "Central coast ribbon road",
    dek: "Empty curves between fishing harbors — turn off the playlist and listen to the sea.",
    category: "coastal-journeys",
    mood: "Airy · open throttle · salt",
    duration: "Full day",
    durationDays: 1,
    durationNights: 0,
    sortDurationHours: 11,
    region: "Da Nang → Quảng Nam",
    coverImage: u("photo-1559827260-dc66d52bef19"),
    priceFromVnd: 2_450_000,
    priceNote: "Private vehicle rhythm · excludes flights",
    ratingAvg: 4.85,
    reviewCount: 76,
  },
  {
    slug: "hoi-an-lantern-drift",
    title: "Lantern hour sampan drift",
    dek: "Yellow walls dissolve into water — oars kiss silk light one ripple at a time.",
    category: "coastal-journeys",
    mood: "Romantic · still · cinematic",
    duration: "Golden hour",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 2,
    region: "Hoi An",
    coverImage: u("photo-1559592419-010646930cda"),
    priceFromVnd: 720_000,
    priceNote: "Water timing shifts with tide · confirm evening slot",
    ratingAvg: 4.88,
    reviewCount: 312,
  },
  {
    slug: "sapa-terrace-mist",
    title: "Terrace mist & morning tea",
    dek: "Clouds pool in rice steps — hike before the valley wakes enough to speak.",
    category: "mountain-exploration",
    mood: "Quiet · vertical · cool air",
    duration: "Sunrise half day",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 6,
    region: "Sa Pa",
    coverImage: u("photo-1470071459604-3b5ec3a7fe05"),
    priceFromVnd: 1_850_000,
    priceNote: "Highland microclimate — pack a layer even in summer",
    ratingAvg: 4.82,
    reviewCount: 91,
  },
  {
    slug: "dalat-highland-fog",
    title: "Highland pine & glasshouse fog",
    dek: "Strawberry fields exhale at dawn; pine needles soften every footstep.",
    category: "mountain-exploration",
    mood: "Dreamy · gentle · green",
    duration: "Morning into afternoon",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 7,
    region: "Da Lat",
    coverImage: u("photo-1464822759023-fed622ff2c3b"),
    priceFromVnd: 1_680_000,
    priceNote: "Garden entries vary by season",
    ratingAvg: 4.79,
    reviewCount: 64,
  },
  {
    slug: "phin-drip-lofts",
    title: "Phin drip & loft silence",
    dek: "Condensed milk layers slow while zinc roofs percussion the rain — no rush, no receipts.",
    category: "coffee-culture",
    mood: "Contemplative · wooden · warm",
    duration: "Slow morning",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 4,
    region: "Hanoi",
    coverImage: u("photo-1497935586351-b67a49e012bf"),
    priceFromVnd: 650_000,
    priceNote: "Third-wave adjacent · heritage phin focus",
    ratingAvg: 4.92,
    reviewCount: 156,
  },
  {
    slug: "hanoi-old-quarter-arc",
    title: "Old Quarter sensory arc",
    dek: "Train breath, silver smells, and courtyard stairs that only locals annotate.",
    category: "hidden-city-walks",
    mood: "Layered · tactile · cinematic",
    duration: "Walking half day",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 5,
    region: "Hanoi",
    coverImage: u("photo-1528127269322-539801943592"),
    priceFromVnd: 1_120_000,
    priceNote: "Train corridor timing is resident-led",
    ratingAvg: 4.96,
    reviewCount: 421,
  },
  {
    slug: "hue-citadel-fringe",
    title: "Citadel fringe & perfume river",
    dek: "Moat mist and morning incense — history as texture, not lecture.",
    category: "hidden-city-walks",
    mood: "Meditative · stone · river light",
    duration: "Half day on foot",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 5,
    region: "Hue",
    coverImage: u("photo-1528184039930-03951f31748f"),
    priceFromVnd: 980_000,
    priceNote: "Monuments ticketed separately",
    ratingAvg: 4.84,
    reviewCount: 88,
  },
  {
    slug: "water-puppet-dusk",
    title: "Water puppet & percussion dusk",
    dek: "Lacquer screens ripple; drums mimic storms — myth told ankle-deep in water.",
    category: "cultural-experiences",
    mood: "Ritual · communal · electric calm",
    duration: "Evening performance",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 3,
    region: "Hanoi",
    coverImage: u("photo-1583417319070-7bcbc71bcbd8"),
    priceFromVnd: 520_000,
    priceNote: "Seat tier affects sightlines — we advise early arrival",
    ratingAvg: 4.73,
    reviewCount: 267,
  },
  {
    slug: "cham-towers-salt",
    title: "Cham bricks & salt wind",
    dek: "Ancient ochre against blue — barefoot respect, slow circles, fishing smoke on the horizon.",
    category: "cultural-experiences",
    mood: "Sacred · windswept · timeless",
    duration: "Coastal afternoon",
    durationDays: 0,
    durationNights: 0,
    sortDurationHours: 4,
    region: "Phan Rang–Tháp Chàm",
    coverImage: u("photo-1507525428034-b723cf961d3e"),
    priceFromVnd: 1_450_000,
    priceNote: "Sun exposure · carry shade and water",
    ratingAvg: 4.81,
    reviewCount: 53,
  },
];

const editorialDetails: Record<string, Omit<TourDetail, keyof TourListItem>> = {
  "hanoi-old-quarter-arc": {
    heroSecondary: u("photo-1528184039930-03951f31748f"),
    storyLead:
      "This is not a checklist — it is a choreography of smells, sounds, and borrowed stairwells. The Old Quarter rewards feet that can pause.",
    storyBody: [
      "Begin where motor oil meets phở steam: Hang Bac still carries the scent of polished silver from workshops that open before accountants log in. Let your route drift — the quarter teaches direction by color temperature, not street names.",
      "Mid-morning belongs to train street courtesies. Residents retract stools; shutters kiss brick. Photography here is observation with consent — linger for tea after the carriages pass.",
      "Afternoon pulls you to apartment-block cafés: handwritten arrows, spiral stairs, mint leaves steeping beside zinc oceans. The city verticalizes its rituals.",
    ],
    itinerary: [
      {
        label: "05:30",
        title: "Hang Bac silver air",
        detail: "Watch shutters rise; accept a tiny stool coffee from a vendor who measures time by kettle whistle.",
      },
      {
        label: "07:45",
        title: "Lake loop exhale",
        detail: "Hoan Kiem perimeter — mist lifts where joggers and lotus sellers trade nods.",
      },
      {
        label: "10:30",
        title: "Train corridor respect",
        detail: "Tables slide; phones lower; steel brushes brick — stay back, tip tea, thank residents.",
      },
      {
        label: "14:00",
        title: "Courtyard ascent",
        detail: "Follow arrows to lofts pouring phin slow — listen for rain on corrugated roofs.",
      },
      {
        label: "17:30",
        title: "Ma May tea punctuation",
        detail: "End with lotus tea where courtyard moss holds the day’s heat.",
      },
    ],
    gallery: [
      { src: u("photo-1528127269322-539801943592"), alt: "Narrow lane in Hanoi Old Quarter with hanging greenery" },
      { src: u("photo-1476514525535-07fb3b4ae5f1"), alt: "Courtyard light falling on worn stone steps" },
      { src: u("photo-1469474968028-56623f02e42e"), alt: "Silhouettes walking past ochre walls at dusk" },
      { src: u("photo-1501785888041-af3ef285b470"), alt: "River mist and distant rooftops" },
    ],
    foods: [
      {
        title: "Sidewalk bún chả smoke",
        detail: "Pork kisses charcoal; herbs arrive still wet — dip and eat before the plastic cools.",
        image: u("photo-1567620905732-2d1ec7ab7445"),
      },
      {
        title: "Egg coffee in the rafters",
        detail: "Foam like meringue shadows — sip slow; the city below is percussion only.",
        image: u("photo-1497935586351-b67a49e012bf"),
      },
    ],
    context: [
      {
        title: "Urban texture as heritage",
        body: "Tube houses narrate migration and commerce in vertical lanes — preservation here is lived-in, not museum-quiet.",
      },
      {
        title: "Sound design of the quarter",
        body: "Cyclo bells, grinding coffee, distant karaoke — Hanoi teaches ear-first navigation.",
      },
    ],
    suggested: [
      {
        title: "Long Bien bicycle mist",
        detail: "Borrow wheels for Red River dawn — fishermen silhouette on rusty trusses.",
      },
      {
        title: "Highland pine & glasshouse fog",
        detail: "Da Lat exhale when you need fog instead of exhaust.",
        slug: "dalat-highland-fog",
      },
    ],
    voiceQuotes: [
      {
        quote:
          "It felt less like a tour and more like borrowing someone else’s morning — the kind you don’t post, you remember.",
        attribution: "Mai L.",
        roleOrPlace: "Studio photographer · Berlin",
      },
      {
        quote: "Train street hit different when neighbors waved us in for tea after. That’s the arc we wanted.",
        attribution: "James & Priya",
        roleOrPlace: "Returning travelers",
      },
    ],
    departureRhythm: [
      "Small departures on Tue / Thu / Sat before dawn (when steam reads honest).",
      "Weekend arcs available with gentler start times — fewer shutters, more courtyard sun.",
    ],
    nextWindows: [
      { label: "06:10 · Sat", note: "Fog tends low — silver workshops glint first." },
      { label: "05:40 · Tue", note: "Quieter trains; locals claim stools earlier." },
    ],
    included: [
      "Walking companion notes & pacing prompts",
      "Local etiquette cues for train corridor stops",
      "Heritage café map sketch (handwritten picks)",
    ],
    excluded: [
      "Monument tickets & museum entries",
      "Personal shopping & shipping",
      "Private transport unless arranged separately",
    ],
    inquiryCopy:
      "Tell us your tolerance for crowds and rain smell — we tune the arc so the quarter teaches you, not the brochure.",
    maxGuests: 10,
    reviewEntries: [
      {
        rating: 5,
        comment:
          "Folded into the quarter like a local — train corridor felt respectful, not performative. Egg coffee in the rafters was the quiet ending we needed.",
        author: "Mai L.",
        place: "Berlin",
        date: "Feb 2026",
      },
      {
        rating: 5,
        comment:
          "We asked for fewer crowds; they reshaped the morning without making us feel difficult. Silver street air at dawn is something I still smell.",
        author: "James & Priya",
        place: "Singapore",
        date: "Jan 2026",
      },
      {
        rating: 4,
        comment:
          "Dense sensory day — bring comfortable shoes and patience for humidity. Worth every stairwell.",
        author: "Elliot R.",
        place: "UK",
        date: "Dec 2025",
      },
      {
        rating: 5,
        comment:
          "Photography guidance was about consent and rhythm, not Instagram checkpoints. That alone changed how we travel.",
        author: "Sora K.",
        place: "Seoul",
        date: "Nov 2025",
      },
    ],
  },
  "saigon-midnight-tasting": {
    heroSecondary: u("photo-1569718212162-588ae82494df"),
    storyLead: "Saigon after midnight is a different democracy — plastic tables, shared herbs, neon reflected in shallow broth.",
    storyBody: [
      "District arteries calm; alley kitchens ignite. Follow the hiss of grills, not signage — vendors here signal readiness with steam, not SEO.",
      "Seafood on ice catches blue LED; lime squirts arc over metal trays. Eat communally; pace with locals who treat midnight as lunch.",
      "End near a com tam stall where fluorescent strips buzz like insects — sweetness of broken rice anchors the adrenaline.",
    ],
    itinerary: [
      {
        label: "22:00",
        title: "Alley grill mapping",
        detail: "Let smoke lead — choose stalls where stools are mostly Vietnamese.",
      },
      {
        label: "23:00",
        title: "Seafood ice & neon",
        detail: "Oysters, scallops, herbs — fingers acceptable; napkins scarce.",
      },
      {
        label: "00:30",
        title: "Herb-forward snail pause",
        detail: "Lemongrass steam resets the palate before sweetness.",
      },
      {
        label: "02:00",
        title: "Broken rice anchor",
        detail: "Com tam as punctuation — eat slow, listen for distant motorbikes thinning.",
      },
    ],
    gallery: [
      { src: u("photo-1583417319070-7bcbc71bcbd8"), alt: "Night street with neon signage reflecting on wet pavement" },
      { src: u("photo-1540189549336-e6e99c3679fe"), alt: "Fresh herbs and colorful dishes on a street stall" },
      { src: u("photo-1498837167922-ddd27525d352"), alt: "Warm light over a crowded sidewalk eatery" },
    ],
    foods: [
      {
        title: "Lemongrass snail steam",
        detail: "Oc stalls billow — sip broth like tea, shells stack as quiet tally.",
        image: u("photo-1540189549336-e6e99c3679fe"),
      },
      {
        title: "Midnight com tam",
        detail: "Broken rice under buzzing tubes — pork crackle, pickled balance, sweat-cooled seats.",
        image: u("photo-1565299624946-b28f40a0ae38"),
      },
    ],
    context: [
      {
        title: "Neon as lantern",
        body: "District LEDs color seafood ice — Saigon’s night markets are chromatic essays on appetite.",
      },
      {
        title: "Shared tables, shared pace",
        body: "Midnight eating is social infrastructure — wait your turn, thank the grill hand, tip tea money small.",
      },
    ],
    suggested: [
      { title: "Hanoi dawn bowls & steam", detail: "Flip the clock — broth before the city inhales.", slug: "hanoi-dawn-bowls" },
      { title: "Old Quarter sensory arc", detail: "Northern alleys if Saigon wired you too bright.", slug: "hanoi-old-quarter-arc" },
    ],
    voiceQuotes: [
      {
        quote: "We scheduled sleep around seafood. Worth it — the city finally sounded honest.",
        attribution: "André F.",
        roleOrPlace: "Composer · Lisbon",
      },
    ],
    departureRhythm: ["Thu / Fri / Sat after 21:30 — when alley steam replaces rush-hour exhaust.", "Private pacing possible for spice-sensitive guests."],
    nextWindows: [
      { label: "22:30 · Fri", note: "Seafood icing peaks; neon reads richer." },
      { label: "23:15 · Thu", note: "Snail rhythm lands between waves." },
    ],
    included: ["District pacing notes", "Vendor etiquette cues", "Hydration prompts between bites"],
    excluded: ["Alcohol unless ordered direct", "Hotel pickup outside central districts"],
    inquiryCopy: "Share spice tolerance and bedtime ethics — we choreograph heat so midnight stays generous.",
    maxGuests: 12,
    reviewEntries: [
      {
        rating: 5,
        comment:
          "Midnight seafood on ice under neon — chaotic and tender at once. Com tam at 2am hit like punctuation.",
        author: "André F.",
        place: "Lisbon",
        date: "Mar 2026",
      },
      {
        rating: 5,
        comment:
          "Pacing matched how Saigon actually eats — shared stools, lime arcs, zero rush. Best night of our trip.",
        author: "Chi & Noah",
        place: "California",
        date: "Feb 2026",
      },
      {
        rating: 4,
        comment:
          "Spice-forward; say so if you’re sensitive — they adjusted snail broth heat without fuss.",
        author: "Renee V.",
        date: "Jan 2026",
      },
    ],
  },
};

function defaultReviewEntries(item: TourListItem): TourReviewEntry[] {
  const regionShort = item.region.split("→")[0]?.trim() ?? item.region;
  return [
    {
      rating: 5,
      comment: `Thoughtful pacing through ${regionShort} — we never felt like we were ticking boxes.`,
      author: "Traveler correspondence",
      date: "Jan 2026",
    },
    {
      rating: 4,
      comment:
        "Hosts explained etiquette before we entered intimate spaces — that context made the route feel ethical, not voyeuristic.",
      author: "Field journal",
      place: "Archive note",
      date: "Dec 2025",
    },
    {
      rating: 5,
      comment: item.dek,
      author: "Returning guest",
      place: "Australia",
      date: "Nov 2025",
    },
  ];
}

function defaultEditorial(item: TourListItem): Omit<TourDetail, keyof TourListItem> {
  return {
    heroSecondary: undefined,
    storyLead: item.dek,
    storyBody: [
      `${item.region} holds a specific humidity in the chest — this path favors honest rhythm over spectacle.`,
      "Move slower than your lens wants. Courtesy scales with proximity — homes eat first.",
    ],
    itinerary: [
      {
        label: "Arrive",
        title: "Empty hands, open eyes",
        detail: "Watch how vendors greet regulars — borrow posture, not volume.",
      },
      {
        label: "Mid",
        title: "Follow texture",
        detail: `${item.mood} — let that string be your compass.`,
      },
      {
        label: "Close",
        title: "Exit on foot",
        detail: "Let the last light pick the corner — maps are suggestions, not scripture.",
      },
    ],
    gallery: [
      { src: item.coverImage, alt: `Atmospheric scene — ${item.title}` },
      { src: u("photo-1469474968028-56623f02e42e"), alt: "Soft mountain light across layered ridges" },
    ],
    foods: [],
    context: [
      {
        title: "Field notes",
        body: item.dek,
      },
    ],
    suggested: tours
      .filter((t) => t.slug !== item.slug)
      .slice(0, 3)
      .map((t) => ({ title: t.title, detail: t.dek, slug: t.slug })),
    voiceQuotes: [
      {
        quote: `We still talk about ${item.region.split("→")[0]?.trim() ?? item.region} in the present tense — like weather that followed us home.`,
        attribution: "Traveler notes",
        roleOrPlace: "Private correspondence",
      },
    ],
    departureRhythm: [
      "Flexible correspondence-led dates — we anchor rhythm to season and local tempo.",
    ],
    nextWindows: [
      { label: "Next arc", note: "Share your window; we suggest two gentle departures." },
    ],
    included: ["Editorial route framing", "Host messaging for respectful pacing", "Post-journey reading list"],
    excluded: ["International flights", "Travel insurance", "Personal equipment rental"],
    inquiryCopy: "Tell us the mood you want to carry home — we translate it into steps and light.",
    maxGuests: 12,
    reviewEntries: defaultReviewEntries(item),
  };
}

/** Demo-only availability rows (no API) — mirrors tour booking date lists. */
export type TourAvailabilitySlot = {
  departureDate: string;
  availableSlots: number;
};

export function getMockAvailability(slug: string, yearMonth: string): TourAvailabilitySlot[] {
  const parts = yearMonth.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  if (!y || !m || m > 12) return [];
  const last = new Date(y, m, 0).getDate();
  const out: TourAvailabilitySlot[] = [];
  for (let day = 1; day <= last; day++) {
    const seed =
      slug.split("").reduce((acc, ch, i) => acc + ch.charCodeAt(0) * (i + 3), day * 17 + m * 31) %
      997;
    const dow = new Date(y, m - 1, day).getDay();
    const strongDay = dow === 0 || dow === 6 || dow === 5 || dow === 4;
    if (!strongDay && seed % 3 !== 0) continue;
    if (seed % 13 === 0) continue;
    out.push({
      departureDate: `${yearMonth}-${String(day).padStart(2, "0")}`,
      availableSlots: 4 + (seed % 9),
    });
  }
  return out.slice(0, 16);
}

export function getTour(slug: string): TourDetail | undefined {
  const item = tours.find((t) => t.slug === slug);
  if (!item) return undefined;
  const extra = editorialDetails[slug] ?? defaultEditorial(item);
  return { ...item, ...extra };
}

export function toursInCategory(cat: TourCategory | "all"): TourListItem[] {
  if (cat === "all") return tours;
  return tours.filter((t) => t.category === cat);
}

export type TourSortMode = "story" | "shorter" | "budget";

export function sortTours(list: TourListItem[], mode: TourSortMode): TourListItem[] {
  const copy = [...list];
  if (mode === "story") return copy;
  if (mode === "shorter") {
    return copy.sort((a, b) => a.sortDurationHours - b.sortDurationHours);
  }
  return copy.sort((a, b) => {
    const pa = a.salePercent ? Math.round(a.priceFromVnd * (1 - a.salePercent / 100)) : a.priceFromVnd;
    const pb = b.salePercent ? Math.round(b.priceFromVnd * (1 - b.salePercent / 100)) : b.priceFromVnd;
    return pa - pb;
  });
}

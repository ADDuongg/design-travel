import type { TourGalleryItem, TourReviewEntry, TourScheduleWindow } from "@/data/tours";
import { formatVnd } from "@/data/tours";

/** Regions for soft filtering — mirrors “specialized provinces” grouping without API IDs. */
export type TourGuideRegion = "north" | "central" | "south" | "highlands" | "delta";

export const tourGuideRegionLabels: Record<TourGuideRegion, string> = {
  north: "Northern fog",
  central: "Central coast",
  south: "Southern rhythm",
  highlands: "Central highlands",
  delta: "Mekong delta",
};

export const tourGuideRegions: TourGuideRegion[] = ["north", "central", "south", "highlands", "delta"];

export type TourGuideListItem = {
  slug: string;
  name: string;
  /** One breathing line for list spreads — like a documentary logline. */
  dek: string;
  /** Emotional palette — displayed small, like film notation. */
  moodLine: string;
  languages: string[];
  provinceLabels: string[];
  region: TourGuideRegion;
  verified: boolean;
  ratingAvg: number;
  reviewCount: number;
  dailyRateVnd: number;
  currency: string;
  yearsExperience: number;
  portraitImage: string;
  /** Short atmospheric caption under portrait on list. */
  beat: string;
};

export type TourGuideVoicePull = {
  quote: string;
  attribution: string;
};

export type TourGuideDetail = TourGuideListItem & {
  storyLead: string;
  storyBody: string[];
  specialtyItems: string[];
  gallery: TourGalleryItem[];
  scheduleWindows: TourScheduleWindow[];
  voicePull?: TourGuideVoicePull;
  /** Booking-adjacent rhythm — when they typically confirm walks (editorial, not a dashboard). */
  cadenceNotes: string[];
  reviewEntries: TourReviewEntry[];
  inquiryCopy: string;
  contactMethods: string[];
  responseRatePercent: number;
  completedWalks: number;
  returningGuestsPercent: number;
};

const p = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=${w}`;

export function dailyRateLabel(guide: Pick<TourGuideListItem, "dailyRateVnd" | "currency">): string {
  if (guide.dailyRateVnd <= 0) return "Correspond for pacing";
  return `${formatVnd(guide.dailyRateVnd)} · full day`;
}

const guides: TourGuideDetail[] = [
  {
    slug: "minh-sapa-field-notes",
    name: "Minh Tran",
    dek: "High passes, low kitchens — walks measured in breath, not mileage.",
    moodLine: "Fog · pine smoke · patient Mandarin",
    languages: ["Vietnamese", "English", "Mandarin"],
    provinceLabels: ["Lào Cai", "Hà Giang"],
    region: "north",
    verified: true,
    ratingAvg: 4.92,
    reviewCount: 38,
    dailyRateVnd: 2_450_000,
    currency: "VND",
    yearsExperience: 11,
    portraitImage: p("photo-1560250097-0b93528c311a", 1200),
    beat: "Portrait by a friend, Sapa 2019",
    storyLead:
      "Minh still writes coordinates in a paper notebook. He learned guiding as a way to pay for night school, then fell in love with the way strangers listen when the road gets quiet.",
    storyBody: [
      "He does not ‘cover’ the loop in a day. If the light is wrong on a pass, you wait. If a household is making thắng cố, you sit. The contract is not hours on a receipt — it is trust in how you move through someone else’s weather.",
      "When the trail thins, he tells stories as if he is afraid to wake the ridgeline. You will hear Hmong work songs without performance, and you will be asked to pass through markets like a guest, not a camera on legs.",
    ],
    specialtyItems: [
      "Multi-day ridgeline pacing (no rush days)",
      "Homestay translation with care, not performance",
      "Small-group food ethics (order what the table is already eating)",
    ],
    gallery: [
      { src: p("photo-1501785888031-af3ef285b470"), alt: "Mist between two mountain folds at dawn" },
      { src: p("photo-1506905925346-21bda4d32df4"), alt: "Rice terraces cutting across a valley" },
      { src: p("photo-1482192505345-5655af888cc4"), alt: "Hands pouring tea into short cups" },
      { src: p("photo-1476514525535-07fb3f4fae62"), alt: "River bend disappearing into cloud" },
    ],
    scheduleWindows: [
      { label: "Late autumn · early winter", note: "Clearest passes — book four weeks ahead for weekends." },
      { label: "After Tet quiet", note: "Fewer vans on the road; homestays reopen slowly." },
    ],
    voicePull: {
      quote: "He teaches you how to be small in a big landscape without making you feel small as a person.",
      attribution: "A. from Melbourne",
    },
    cadenceNotes: [
      "Replies most days within a few hours — longer when he is on trail without signal.",
      "Prefers one group at a time; shares a car with other guides only if you ask.",
    ],
    reviewEntries: [
      {
        rating: 5,
        author: "Clara P.",
        place: "Hà Giang loop",
        date: "Jan 2026",
        comment:
          "We changed the plan twice because of rain. Minh was calm, not apologetic — as if weather is part of the fee. The homestay felt like being invited, not sold a package.",
      },
      {
        rating: 5,
        author: "Theo M.",
        place: "Lào Cai",
        date: "Oct 2025",
        comment: "I am a slow hiker. He never made a face. The trip felt like a letter from a friend who lives in the mountains.",
      },
    ],
    inquiryCopy:
      "Request a day or a thread of days. We will echo your dates to Minh and confirm by message — no card on this site, only correspondence with your real constraints.",
    contactMethods: ["Direct message", "Email", "WhatsApp"],
    responseRatePercent: 97,
    completedWalks: 214,
    returningGuestsPercent: 42,
  },
  {
    slug: "lan-hoi-an-lantern",
    name: "Lan Phương",
    dek: "Coast light, ceramic hands, and the patience to let a town show itself.",
    moodLine: "Salt · late sun · old town hush",
    languages: ["Vietnamese", "English", "French"],
    provinceLabels: ["Quảng Nam", "Đà Nẵng"],
    region: "central",
    verified: true,
    ratingAvg: 4.88,
    reviewCount: 56,
    dailyRateVnd: 2_200_000,
    currency: "VND",
    yearsExperience: 9,
    portraitImage: p("photo-1573496359142-b8d87734a5a2", 1200),
    beat: "By the river, just after blue hour",
    storyLead:
      "Lan left gallery work to walk people through a city that already had too many ‘experiences’ sold in an hour. She frames Hội An as a material culture — light, wood, water — not a costume.",
    storyBody: [
      "Mornings are for craft districts and the sound of sand under tires. Evenings are for sitting until the lanterns feel less like a stage set and more like a habit the river remembers.",
      "If you want food, she will not run you through a checklist. You will eat what the market is proud of that week — a small paper menu, a lot of looking at hands.",
    ],
    specialtyItems: [
      "Lantern quarter pacing without the rush shot",
      "Ceramic village visits with makers (not showroom floors)",
      "Photography ethics — where to stand so people remain people",
    ],
    gallery: [
      { src: p("photo-1528127269322-539801943592"), alt: "Lanterns reflected on wet cobblestones" },
      { src: p("photo-1559827260-dc66d52bef19"), alt: "Fishing basket boats near reeds" },
      { src: p("photo-1539650116574-75c0c6d73363"), alt: "Hands shaping clay on a wheel" },
    ],
    scheduleWindows: [
      { label: "Dry months", note: "March–August — bright afternoons for coast drives." },
      { label: "Monsoon stretch", note: "Lan prefers shorter outdoor loops; more indoor craft time." },
    ],
    voicePull: {
      quote: "She slowed us down so deeply we forgot to check our phones. That is rare for me.",
      attribution: "Morgan · Seattle",
    },
    cadenceNotes: [
      "Two walks per day max — she guards energy like light.",
      "Weekends book early; weekdays feel more spacious.",
    ],
    reviewEntries: [
      {
        rating: 5,
        author: "Isabelle R.",
        place: "Old town",
        date: "Aug 2025",
        comment:
          "We asked for ‘hidden spots’ like embarrassing tourists. Lan laughed kindly and took us to a roof where the river looked like a ribbon. No influencer nonsense.",
      },
      {
        rating: 4,
        author: "Ben K.",
        place: "Đà Nẵng day trip",
        date: "May 2025",
        comment: "Detailed and gentle. I wish we had one more day — my fault, not hers.",
      },
    ],
    inquiryCopy:
      "Tell us your flight times and how you like to move — Lan shapes hours, not a grid. We confirm by message with a soft quote for add-ons (boat, private car) if needed.",
    contactMethods: ["Email", "WhatsApp", "Signal"],
    responseRatePercent: 94,
    completedWalks: 302,
    returningGuestsPercent: 38,
  },
  {
    slug: "huy-saigon-after-midnight",
    name: "Huy Lê",
    dek: "District voices after dark — street theology and soup steam.",
    moodLine: "Neon · vendor bells · night buses",
    languages: ["Vietnamese", "English"],
    provinceLabels: ["Hồ Chí Minh City"],
    region: "south",
    verified: true,
    ratingAvg: 4.95,
    reviewCount: 72,
    dailyRateVnd: 1_950_000,
    currency: "VND",
    yearsExperience: 7,
    portraitImage: p("photo-1472099645785-5658abf4ff4e", 1200),
    beat: "District 3, stairwell light",
    storyLead:
      "Huy guides like a documentarian with his recorder off — paying attention to who works the grill, who watches the cat, who laughs first when heat rises from the asphalt.",
    storyBody: [
      "His tours refuse the ‘street food hits’ playlist. You might walk farther for a broth that only appears after ten. You might stop because someone needs help lifting a cart — and that is also the city.",
      "Safety is spoken plainly: where to stand, how to cross like you belong, how to refuse a photo request without making a scene. The night is generous if you know its etiquette.",
    ],
    specialtyItems: [
      "Post-midnight bowls with vendor consent",
      "Music venues as cultural context (not club promo)",
      "Saigon history through apartments and alleys, not only monuments",
    ],
    gallery: [
      { src: p("photo-1555396273-367ea4eb4db5"), alt: "Narrow alley kitchen with steam" },
      { src: p("photo-1528605248644-14dd04022da1"), alt: "Friends at a plastic table with beer and lime" },
      { src: p("photo-1567620905732-2d1ec7ab7445"), alt: "Night market grill flare" },
      { src: p("photo-1559339352-11d035aa65de"), alt: "Motorbike tail lights streaking rain" },
    ],
    scheduleWindows: [
      { label: "Dry season nights", note: "Cooler walks — more outdoor stops." },
      { label: "Wet season", note: "More covered lanes; Huy carries spare sandals humorously in his bag." },
    ],
    voicePull: {
      quote: "I thought I knew Saigon. Huy made me feel like I had been sleepwalking.",
      attribution: "James · London",
    },
    cadenceNotes: [
      "Night walks start after 20:30 to miss commuter crush.",
      "No fixed end time — Huy ends when the story feels finished.",
    ],
    reviewEntries: [
      {
        rating: 5,
        author: "Priya S.",
        place: "District 4 loop",
        date: "Dec 2025",
        comment:
          "Respectful to vendors, hilarious about traffic, serious about history. I laughed and learned until my feet hurt — worth every đồng.",
      },
    ],
    inquiryCopy:
      "Ask for a night or a trio of nights with different districts. We mirror your hotel area and any dietary lines — confirmation stays human, not automated receipts.",
    contactMethods: ["WhatsApp", "Telegram", "Email"],
    responseRatePercent: 99,
    completedWalks: 411,
    returningGuestsPercent: 29,
  },
  {
    slug: "thao-dalat-pine-air",
    name: "Thảo Nguyễn",
    dek: "Pine air, coffee physics, and roads that ask you to downshift emotionally.",
    moodLine: "Cool soil · French echoes · farm silence",
    languages: ["Vietnamese", "English", "Korean"],
    provinceLabels: ["Lâm Đồng"],
    region: "highlands",
    verified: true,
    ratingAvg: 4.9,
    reviewCount: 44,
    dailyRateVnd: 2_100_000,
    currency: "VND",
    yearsExperience: 8,
    portraitImage: p("photo-1580489944761-15a19d654956", 1200),
    beat: "Greenhouse glass at sunrise",
    storyLead:
      "Thảo grew up between a flower farm and a mother who read poetry aloud while weighing beans. Her walks carry that double tempo — practical and a little tender.",
    storyBody: [
      "Đà Lạt can feel like a mood board if you move fast. She introduces it through irrigation, through families who still burn charcoal carefully, through coffee that tastes like patience.",
      "You might spend twenty minutes with a glass roof fogging because the story needs it. That is not waste — it is the pace of a plateau.",
    ],
    specialtyItems: [
      "Coffee farm ethics — labor-forward narratives",
      "Soft trekking that respects mud seasons",
      "Wild mushroom windows (when safe and legal)",
    ],
    gallery: [
      { src: p("photo-1469474968028-56623f02e42e"), alt: "Pine trunks and mist between them" },
      { src: p("photo-1495474472217-e90fd44a7e90"), alt: "Coffee cherries on a branch" },
      { src: p("photo-1509042239860-f550ce710b93"), alt: "Steam rising from a metal filter phin" },
    ],
    scheduleWindows: [
      { label: "Flower season", note: "January–March — busier roads; book midweek if you can." },
      { label: "Quiet rains", note: "July–September — greener hollows, slower drives." },
    ],
    cadenceNotes: [
      "One full day or two half-days — Thảo avoids stacking intensity.",
      "Replies mornings and early evenings.",
    ],
    reviewEntries: [
      {
        rating: 5,
        author: "Hana L.",
        place: "Lâm Đồng",
        date: "Feb 2026",
        comment: "Calm, knowledgeable, unhurried. The greenhouse visit felt like art class and agriculture at once.",
      },
    ],
    inquiryCopy:
      "Share how you handle altitude and motion sickness — Đà Lạt rewards honesty. We confirm farm visits with growers first; nothing is promised until it is respectful.",
    contactMethods: ["Email", "KakaoTalk", "WhatsApp"],
    responseRatePercent: 91,
    completedWalks: 178,
    returningGuestsPercent: 36,
  },
  {
    slug: "khoi-mekong-current",
    name: "Khôi Phạm",
    dek: "Delta currents, ferry patience, and kitchens that measure time in tide.",
    moodLine: "Silt · fruit sugar · long horizon",
    languages: ["Vietnamese", "English"],
    provinceLabels: ["Cần Thơ", "An Giang"],
    region: "delta",
    verified: false,
    ratingAvg: 4.84,
    reviewCount: 31,
    dailyRateVnd: 1_850_000,
    currency: "VND",
    yearsExperience: 6,
    portraitImage: p("photo-1507003211169-0a1dd7228f2d", 1200),
    beat: "On a ferry deck, hat low",
    storyLead:
      "Khôi’s family moved with the water — boats before bikes. He reads the delta as a schedule written in brown ink: when bridges open, when fruit drops, when a market should be loud or silent.",
    storyBody: [
      "You will float as much as you walk. Conversations happen beside motors, under hats, with mangoes traded hand to hand. He is careful about whom he introduces you to — tourism can flatten dignity if rushed.",
      "Evenings might find you watching birds without a checklist, because the light decided it was enough.",
    ],
    specialtyItems: [
      "Floating market timing without the selfie circus",
      "Khmer heritage visits with community consent",
      "Bird routes when season and respect align",
    ],
    gallery: [
      { src: p("photo-1544735716-392fe2489ffa"), alt: "Wooden boats tied along a muddy bank" },
      { src: p("photo-1516026672322-bc52d7a49d78"), alt: "Palm silhouettes against orange sky" },
      { src: p("photo-1518548419970-58e3b4079ab2"), alt: "Bowls of noodles with fresh herbs" },
    ],
    scheduleWindows: [
      { label: "High water", note: "Easier canal passages — early starts." },
      { label: "Fruit harvests", note: "Khôi adjusts routes so you eat what is honest that week." },
    ],
    voicePull: {
      quote: "He never rushed the river. I finally understood what ‘delta time’ means.",
      attribution: "Elena · Madrid",
    },
    cadenceNotes: [
      "Verification in progress — Khôi works mostly by referral; profile reflects community letters.",
      "Overnight trips need two weeks’ notice for homestays.",
    ],
    reviewEntries: [
      {
        rating: 5,
        author: "Raj V.",
        place: "Cần Thơ",
        date: "Nov 2025",
        comment:
          "Thoughtful, generous, precise about boat safety. We ate better than any restaurant tour I have paid triple for.",
      },
    ],
    inquiryCopy:
      "Let us know your tolerance for heat and early alarms — the delta rewards dawn people. Khôi confirms ferry windows before locking a day.",
    contactMethods: ["Phone", "Zalo", "Email"],
    responseRatePercent: 88,
    completedWalks: 126,
    returningGuestsPercent: 41,
  },
];

export const tourGuides: TourGuideListItem[] = guides.map((g) => ({
  slug: g.slug,
  name: g.name,
  dek: g.dek,
  moodLine: g.moodLine,
  languages: g.languages,
  provinceLabels: g.provinceLabels,
  region: g.region,
  verified: g.verified,
  ratingAvg: g.ratingAvg,
  reviewCount: g.reviewCount,
  dailyRateVnd: g.dailyRateVnd,
  currency: g.currency,
  yearsExperience: g.yearsExperience,
  portraitImage: g.portraitImage,
  beat: g.beat,
}));

export type TourGuideSortMode = "story" | "rating" | "gentler-rate";

export function getTourGuide(slug: string): TourGuideDetail | undefined {
  return guides.find((g) => g.slug === slug);
}

export function sortTourGuides(list: TourGuideListItem[], mode: TourGuideSortMode): TourGuideListItem[] {
  const copy = [...list];
  if (mode === "rating") {
    copy.sort((a, b) => b.ratingAvg - a.ratingAvg || a.name.localeCompare(b.name));
  } else if (mode === "gentler-rate") {
    copy.sort((a, b) => a.dailyRateVnd - b.dailyRateVnd || a.name.localeCompare(b.name));
  } else {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  return copy;
}

export type TourGuideListFilter = {
  region: TourGuideRegion | "all";
  language: string | "all";
  verifiedOnly: boolean;
  query: string;
};

export const defaultTourGuideListFilter: TourGuideListFilter = {
  region: "all",
  language: "all",
  verifiedOnly: false,
  query: "",
};

export function filterTourGuides(
  list: TourGuideListItem[],
  f: TourGuideListFilter,
): TourGuideListItem[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((g) => {
    if (f.region !== "all" && g.region !== f.region) return false;
    if (f.verifiedOnly && !g.verified) return false;
    if (f.language !== "all" && !g.languages.some((l) => l.toLowerCase() === f.language.toLowerCase())) return false;
    if (!q) return true;
    const hay = `${g.name} ${g.dek} ${g.moodLine} ${g.provinceLabels.join(" ")} ${g.languages.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

/** Distinct language labels for filter chips */
export function tourGuideLanguageOptions(list: TourGuideListItem[]): string[] {
  const set = new Set<string>();
  list.forEach((g) => g.languages.forEach((l) => set.add(l)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

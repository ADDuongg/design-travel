import type { TourListItem } from "@/data/tours";
import { tours } from "@/data/tours";

export type ProvinceRegion = "NORTH" | "CENTRAL" | "SOUTH";

export type ProvinceTranslations = {
  shortDescription: string;
  description: string;
  bestTimeToVisit: string;
};

export type ProvinceHighlight = {
  thumbnail: string;
  name: string;
  description: string;
};

export type ProvinceWard = {
  name: string;
  slug: string;
};

/** List / card content model */
export type ProvinceListItem = {
  slug: string;
  name: string;
  fullName: string;
  region: ProvinceRegion;
  thumbnail: string;
  gallery: string[];
  translations: { shortDescription: string };
  isPopular: boolean;
  /** Editorial tallies — never framed as bookings */
  totalHotels: number;
  totalTours: number;
  totalTourGuides: number;
};

export type ProvinceDetail = ProvinceListItem & {
  population: number;
  /** km² */
  areaKm2: number;
  translations: ProvinceTranslations;
  highlights: ProvinceHighlight[];
  wards: ProvinceWard[];
  relatedTourSlugs: string[];
};

const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=${w}`;

export const provinceRegionLabels: Record<ProvinceRegion, string> = {
  NORTH: "Northern provinces",
  CENTRAL: "Central coast & highlands",
  SOUTH: "Southern delta & metropolis",
};

export const provinceRegions: ProvinceRegion[] = ["NORTH", "CENTRAL", "SOUTH"];

const provincesDetailed: ProvinceDetail[] = [
  {
    slug: "ha-giang",
    name: "Hà Giang",
    fullName: "Hà Giang Province",
    region: "NORTH",
    thumbnail: u("photo-1506905925346-21bda4d32df4"),
    gallery: [
      u("photo-1506905925346-21bda4d32df4", 1600),
      u("photo-1469474968028-56623f02e42e", 1600),
      u("photo-1470071459604-3b5ec3a7fe05", 1600),
      u("photo-1519682337052-a94a5194bd9e", 1600),
    ],
    translations: {
      shortDescription:
        "Sky roads cut into karst plates — petrol-scented bends, peach blossoms, and market mornings that arrive in mist.",
      description:
        "Hà Giang reads like a lithograph carved by wind: limestone teeth, terraces stacked like notebooks, villages where dusk lands before the radios quiet. Riders thread passes not for itineraries but because the horizon keeps folding. Nights cool fast; lanterns at homestays look like hesitant stars. Language here is quieter than the highways — gestures over tea, boiled corn on coals. The plateau rewards slow tires and early rises: light lifts from valleys in thin bands, exposing roads you swore weren't there an hour earlier.",
      bestTimeToVisit:
        "Late autumn into early spring — dry passes, sharper air, blossoms on the plateau. Avoid peak holiday convoys unless you savor human texture with your fog.",
    },
    isPopular: false,
    totalHotels: 189,
    totalTours: 42,
    totalTourGuides: 61,
    population: 880_000,
    areaKm2: 7929,
    highlights: [
      {
        thumbnail: u("photo-1469474968028-56623f02e42e", 1200),
        name: "Mã Pì Lèng dusk",
        description: "The pass exhales when headlights switch on — cobalt silhouettes against a thinning sky.",
      },
      {
        thumbnail: u("photo-1470071459604-3b5ec3a7fe05", 1200),
        name: "Terrace geometries",
        description: "Rice ladders catch rain-light; contour lines drawn by hand for centuries.",
      },
      {
        thumbnail: u("photo-1519682337052-a94a5194bd9e", 1200),
        name: "Border market hum",
        description: "Indigo folds, turmeric dust, bells on loaded ponies — trade as choreography.",
      },
    ],
    wards: [
      { name: "Hà Giang (ward)", slug: "ha-giang-ward" },
      { name: "Minh Khai — Quảng Trường", slug: "minh-khai" },
      { name: "Nguyễn Trãi fringe", slug: "nguyen-trai" },
    ],
    relatedTourSlugs: ["sapa-terrace-mist"],
  },
  {
    slug: "lao-cai",
    name: "Lào Cai",
    fullName: "Lào Cai Province",
    region: "NORTH",
    thumbnail: u("photo-1470071459604-3b5ec3a7fe05"),
    gallery: [
      u("photo-1470071459604-3b5ec3a7fe05", 1600),
      u("photo-1500530855697-b586d89ba3ee", 1600),
      u("photo-1526778548025-fa2f459cd5c1", 1600),
      u("photo-1464822759023-fed622ff2c3b", 1600),
    ],
    translations: {
      shortDescription:
        "Where the rails meet cloud — Red River gorge mist, terraces, and market cloth that remembers every hill tribe dialect.",
      description:
        "Lào Cai is the hinge between lowland rhythm and alpine weather. Overnight trains sigh into mornings of wet rail and incense near the tracks. Fansipan's shoulders hide behind satin cloud; valleys trade in herbs, peaches, stitched indigo stories. Café steam competes with woodsmoke. It is nostalgic without being sentimental: concrete staircases climb past century-old stonework while teens film the same fog their grandparents cursed.",
      bestTimeToVisit:
        "April–May terraces flood mirror-bright; September–October harvest gold; winter for mist purists.",
    },
    isPopular: true,
    totalHotels: 412,
    totalTours: 108,
    totalTourGuides: 174,
    population: 730_000,
    areaKm2: 6383,
    highlights: [
      {
        thumbnail: u("photo-1500530855697-b586d89ba3ee", 1200),
        name: "Morning border light",
        description: "The town blinks awake where two geographies politely disagree about temperature.",
      },
      {
        thumbnail: u("photo-1526778548025-fa2f459cd5c1", 1200),
        name: "Valley crossings",
        description: "Bridges braided with scooters, corn drying on eaves — vertical calm above horizontal hustle.",
      },
      {
        thumbnail: u("photo-1464822759023-fed622ff2c3b", 1200),
        name: "Tea on the slope",
        description: "Cups cool faster at altitude — conversation stretches to match.",
      },
    ],
    wards: [
      { name: "Lào Cai — Bắc Cường", slug: "bac-cuong" },
      { name: "Kim Tân ridges", slug: "kim-tan" },
      { name: "Phố Mới evening", slug: "pho-moi" },
    ],
    relatedTourSlugs: ["sapa-terrace-mist"],
  },
  {
    slug: "hanoi",
    name: "Hà Nội",
    fullName: "Hà Nội Capital Area",
    region: "NORTH",
    thumbnail: u("photo-1528127269322-539801943592"),
    gallery: [
      u("photo-1528127269322-539801943592", 1600),
      u("photo-1555881400-74d7acaacd8b", 1600),
      u("photo-1583417319070-7bcbc71bcbd8", 1600),
      u("photo-1569355745687-e9f4d4607d54", 1600),
    ],
    translations: {
      shortDescription:
        "Lakeside scooters, condensed milk coffee, perfume of pork grilling over coals — a capital that hoards tenderness in cramped streets.",
      description:
        "Hà Nội organizes itself around intimacy and narrowness: train alleys squeezed between French shutters, balconies hung with jasmine, sidewalks claimed by tiny plastics. Museums exist, but narrative lives in condensation on glass shops and elders reading papers beside bánh cuốn steam. The city oscillates humidity and poetry; politics hums politely behind lacquer panels. Nights layer jazz onto exhaust roar until they sound like cousins.",
      bestTimeToVisit:
        "Autumn dryness and golden afternoons; spring for blossoms and festivals; midsummer rewards night wanderers.",
    },
    isPopular: true,
    totalHotels: 2840,
    totalTours: 611,
    totalTourGuides: 820,
    population: 8_400_000,
    areaKm2: 3359,
    highlights: [
      {
        thumbnail: u("photo-1555881400-74d7acaacd8b", 1200),
        name: "Old Quarter braid",
        description: "Tube houses shoulder each other — laundry lines draw constellations only locals read.",
      },
      {
        thumbnail: u("photo-1569355745687-e9f4d4607d54", 1200),
        name: "West Lake rinse",
        description: "Dawn walkers trade circles with fisherman silhouettes.",
      },
      {
        thumbnail: u("photo-1528127269322-539801943592", 1200),
        name: "Train street choreography",
        description: "Kettles lift, stools slide — performance without stage managers.",
      },
    ],
    wards: [
      { name: "Hàng Buồm — lantern dusk", slug: "hang-buom" },
      { name: "Tây Hồ — breeze ward", slug: "tay-ho" },
      { name: "Đống Đa avenues", slug: "dong-da" },
    ],
    relatedTourSlugs: ["hanoi-old-quarter-arc", "hanoi-dawn-bowls", "phin-drip-lofts"],
  },
  {
    slug: "thua-thien-hue",
    name: "Thừa Thiên Huế",
    fullName: "Thừa Thiên Huế Province",
    region: "CENTRAL",
    thumbnail: u("photo-1544273677-c4331360212e"),
    gallery: [
      u("photo-1544273677-c4331360212e", 1600),
      u("photo-1559592419-010646930cda", 1600),
      u("photo-1528183429752-a97d0bf99b59", 1600),
      u("photo-1506976785307-bb3d5c4d3c5b", 1600),
    ],
    translations: {
      shortDescription:
        "Imperial reds behind frangipani — incense rivers, noodle clarity, afternoons where rain writes calligraphy on lotus ponds.",
      description:
        "Huế holds court in understatement: walled gardens, restrained spice, perfumes that cling to gauze umbrellas. Perfume River ferries glide like commas between chapters of stone. Culinary precision here is philosophy — soups clear as thought, fermented shrimp paste anchoring nostalgia. Colonial arcades flirt with karaoke neon; contradiction feels curated rather than chaotic. Light is aqueous — everything seems filtered through jasmine water.",
      bestTimeToVisit:
        "Dry season months for river clarity; rainy season for luminous greens and subdued crowds.",
    },
    isPopular: true,
    totalHotels: 516,
    totalTours: 198,
    totalTourGuides: 289,
    population: 1_150_000,
    areaKm2: 4948,
    highlights: [
      {
        thumbnail: u("photo-1528183429752-a97d0bf99b59", 1200),
        name: "Citadel silence",
        description: "Stones memorize footfall; moats hoard sky color after storms.",
      },
      {
        thumbnail: u("photo-1506976785307-bb3d5c4d3c5b", 1200),
        name: "Ao dai silhouettes",
        description: "Bridges soften motion — pedestrians become brush strokes.",
      },
      {
        thumbnail: u("photo-1544273677-c4331360212e", 1200),
        name: "Pine hill tombs",
        description: "Stair climbs trade sweat for vantage — incense threads the canopy.",
      },
    ],
    wards: [
      { name: "Phú Hậu waterfront", slug: "phu-hau" },
      { name: "Kim Long garden ward", slug: "kim-long" },
      { name: "Vỹ Dạ dusk", slug: "vy-da" },
    ],
    relatedTourSlugs: ["hue-citadel-fringe"],
  },
  {
    slug: "quang-nam",
    name: "Quảng Nam",
    fullName: "Quảng Nam Province",
    region: "CENTRAL",
    thumbnail: u("photo-1559592419-010646930cda"),
    gallery: [
      u("photo-1559592419-010646930cda", 1600),
      u("photo-1559827260-dc66d52bef19", 1600),
      u("photo-1570077188670-e00b4fb6c7e9", 1600),
      u("photo-1507525428034-b723cf961d3e", 1600),
    ],
    translations: {
      shortDescription:
        "Silk lanterns, river tides, tailoring needles — coastline opening into farmland like a sigh between waves.",
      description:
        "Quảng Nam stitches heritage to surf: Hội An's ochre lanes lean toward the Thu Bồn while Da Nàng's horizons breathe glass. Chili fields flirt with chilli wind; ancestral houses store flood stories in beams. Nights taste of grilled corn and tidal salt. Here, tourism grazes authenticity without consuming it entirely — scooters still dodge chickens, fishermen mend nets beside fairy lights duplicated for cameras.",
      bestTimeToVisit:
        "February–August for lantern clarity; rainy months for subdued river walks and luminous greens.",
    },
    isPopular: true,
    totalHotels: 892,
    totalTours: 264,
    totalTourGuides: 351,
    population: 1_250_000,
    areaKm2: 5164,
    highlights: [
      {
        thumbnail: u("photo-1559592419-010646930cda", 1200),
        name: "Lantern tributaries",
        description: "Water mirrors multiply warm glass — pedestrians borrow colors from reflections.",
      },
      {
        thumbnail: u("photo-1559827260-dc66d52bef19", 1200),
        name: "An Bàng salt exhale",
        description: "Beach umbrellas thin out at dusk — waves rewrite footsteps.",
      },
      {
        thumbnail: u("photo-1570077188670-e00b4fb6c7e9", 1200),
        name: "Cham sandstone",
        description: "Brickwork drinks afternoon heat; shadows teach geometry anew.",
      },
    ],
    wards: [
      { name: "Cẩm Châu — lantern core", slug: "cam-chau" },
      { name: "Cửa Đại evening", slug: "cua-dai" },
      { name: "Trà Kiệu meadows", slug: "tra-kieu" },
    ],
    relatedTourSlugs: ["hoi-an-lantern-drift", "central-coast-ribbon", "cham-towers-salt"],
  },
  {
    slug: "binh-thuan",
    name: "Bình Thuận",
    fullName: "Bình Thuận Province",
    region: "CENTRAL",
    thumbnail: u("photo-1519046904884-53103bae34c9"),
    gallery: [
      u("photo-1519046904884-53103bae34c9", 1600),
      u("photo-1507525428034-b723cf961d3e", 1600),
      u("photo-1559827260-dc66d52bef19", 1600),
      u("photo-1439066615861-d1af74d74000", 1600),
    ],
    translations: {
      shortDescription:
        "Dunes that behave like inland seas — dragonfruit light, kite strings, fishermen mending nets under neon cyan.",
      description:
        "Bình Thuận tastes of salt crystallized twice: Atlantic-style wind on white slopes, grilled squid markets after midnight. Roads straighten toward horizons that refuse dusk. Resorts hover like UFOs beside fishing hamlets yet somehow the province keeps its shrug — corrugated roofs, incense at household altars beside surf shops. Kites tether childhood to adulthood; scooters carry ice boxes clinking optimism.",
      bestTimeToVisit:
        "Dry months for dune contrasts; windy season appeals to surfers and solitude seekers alike.",
    },
    isPopular: false,
    totalHotels: 336,
    totalTours: 71,
    totalTourGuides: 93,
    population: 1_340_000,
    areaKm2: 7834,
    highlights: [
      {
        thumbnail: u("photo-1519046904884-53103bae34c9", 1200),
        name: "Mũi Né ridges",
        description: "Sunrise walks trade shadows for footprints the wind erases politely.",
      },
      {
        thumbnail: u("photo-1439066615861-d1af74d74000", 1200),
        name: "Harbor sodium glow",
        description: "Nets fluorescent-dry beside boats humming diesel lullabies.",
      },
      {
        thumbnail: u("photo-1507525428034-b723cf961d3e", 1200),
        name: "Coastal ribbons",
        description: "Sea meets highway — scooters lean into salt without commentary.",
      },
    ],
    wards: [
      { name: "Phú Hài dunes", slug: "phu-hai" },
      { name: "Hàm Tiến evening", slug: "ham-tien" },
      { name: "Lagi fishing fringe", slug: "lagi" },
    ],
    relatedTourSlugs: ["central-coast-ribbon"],
  },
  {
    slug: "lam-dong",
    name: "Lâm Đồng",
    fullName: "Lâm Đồng Province",
    region: "SOUTH",
    thumbnail: u("photo-1464822759023-fed622ff2c3b"),
    gallery: [
      u("photo-1464822759023-fed622ff2c3b", 1600),
      u("photo-1506905925346-21bda4d32df4", 1600),
      u("photo-1441974231531-c6227db76b6e", 1600),
      u("photo-1511497584788-876760111969", 1600),
    ],
    translations: {
      shortDescription:
        "Pine fog, greenhouse valleys, hillside coffee ripening beside French chimneys softened by moss.",
      description:
        "Lâm Đồng inhales vertically — valleys cup mist, highways ribbon through reservoirs that mirror sky in duplicate. Farmers speak in liters of rainfall; tourists arrive seeking sweaters in the tropics. Night markets braid strawberries with grilled rice paper; scooters carry flower bundles taller than helmets. Silence has texture here like felt — punctuated by drip coffee landing in thick-walled mugs.",
      bestTimeToVisit:
        "Year-round cool anomalies; flowering greenhouses blaze brightest in temperate months; mist loyalists adore rainy weeks.",
    },
    isPopular: true,
    totalHotels: 628,
    totalTours: 156,
    totalTourGuides: 204,
    population: 1_310_000,
    areaKm2: 9831,
    highlights: [
      {
        thumbnail: u("photo-1441974231531-c6227db76b6e", 1200),
        name: "Pine tunnel drives",
        description: "Headlights braid trunks — each bend exhales a cooler paragraph.",
      },
      {
        thumbnail: u("photo-1511497584788-876760111969", 1200),
        name: "Reservoir reflections",
        description: "Dams cradle doubled skies; kayaks stitch quiet ripples.",
      },
      {
        thumbnail: u("photo-1464822759023-fed622ff2c3b", 1200),
        name: "Highland dusk markets",
        description: "Wool collars meet grilled corn — scarves appear by instinct.",
      },
    ],
    wards: [
      { name: "Đà Lạt — Xuân Trường", slug: "xuan-truong" },
      { name: "Lệ Hồ hillside", slug: "le-ho" },
      { name: "Prenn fringe", slug: "prenn" },
    ],
    relatedTourSlugs: ["dalat-highland-fog", "phin-drip-lofts"],
  },
  {
    slug: "ho-chi-minh-city",
    name: "Hồ Chí Minh City",
    fullName: "Ho Chi Minh City",
    region: "SOUTH",
    thumbnail: u("photo-1583417319070-7bcbc71bcbd8"),
    gallery: [
      u("photo-1583417319070-7bcbc71bcbd8", 1600),
      u("photo-1555881400-74d7acaacd8b", 1600),
      u("photo-1567620905732-2d1ec7ab7445", 1600),
      u("photo-1513635269976-596ae144da46", 1600),
    ],
    translations: {
      shortDescription:
        "Neon veins on asphalt — jasmine tea beside construction dust, techno bass bleeding into soup steam.",
      description:
        "The southern metropolis refuses a single climax: District 1's marble lobbies shrug at alley grills three blocks away where plastic hierarchy is theology. Rooftops layer conversations; basements ferment dreams. Diaspora flavors rewrite menus weekly. Saigon pulses — scooters as syntax, karaoke as confession. Yet pockets of tiled courtyards still practice slowness, proving modernity hasn't won every argument.",
      bestTimeToVisit:
        "Dry season evenings for rooftop clarity; rainy months for luminous streets rinsed nightly.",
    },
    isPopular: true,
    totalHotels: 3520,
    totalTours: 702,
    totalTourGuides: 891,
    population: 9_000_000,
    areaKm2: 2095,
    highlights: [
      {
        thumbnail: u("photo-1567620905732-2d1ec7ab7445", 1200),
        name: "Alley fluorescence",
        description: "Tungsten on bowls — spoons click like metronomes for the neighborhood.",
      },
      {
        thumbnail: u("photo-1513635269976-596ae144da46", 1200),
        name: "Canal crossings",
        description: "Bridges stitched with commuters — dusk paints water in varnish tones.",
      },
      {
        thumbnail: u("photo-1583417319070-7bcbc71bcbd8", 1200),
        name: "Glass monolith halo",
        description: "High-rises halo mist — cranes sketch tomorrow's skyline with patience.",
      },
    ],
    wards: [
      { name: "Bến Nghé skyline", slug: "ben-nghe" },
      { name: "Thảo Điền treelines", slug: "thao-dien" },
      { name: "Phạm Viết Chánh dusk", slug: "pham-viet-chanh" },
    ],
    relatedTourSlugs: ["saigon-midnight-tasting"],
  },
  {
    slug: "can-tho",
    name: "Cần Thơ",
    fullName: "Cần Thơ City Province",
    region: "SOUTH",
    thumbnail: u("photo-1596422847844-956166e7bd19"),
    gallery: [
      u("photo-1596422847844-956166e7bd19", 1600),
      u("photo-1544986581-533ac943393d", 1600),
      u("photo-1566378246598-2b65664de657", 1600),
      u("photo-1509316785283-ecdab83ebb38", 1600),
    ],
    translations: {
      shortDescription:
        "Floating markets at blue hour — jackfruit pulp, sampan coffee, cicadas drowning out bridge traffic.",
      description:
        "Cần Thơ organizes life around arterial water — palm shadows, wholesalers bargaining in whistles, orchard birds mistaken for alarms. Bridges lift self-esteem; orchards braid scent into motorway edges. Nights taste of clay pot fish and karaoke barges politely distant. Hospitality here lowers shoulders before asking names; refrigerators hum with melon generosity.",
      bestTimeToVisit:
        "Early dry season for market clarity before heat thickens; fruit seasons rotate drama — durian diplomacy optional.",
    },
    isPopular: false,
    totalHotels: 298,
    totalTours: 84,
    totalTourGuides: 112,
    population: 1_250_000,
    areaKm2: 1437,
    highlights: [
      {
        thumbnail: u("photo-1544986581-533ac943393d", 1200),
        name: "Cái Răng rowing",
        description: "Dawn pigments melons — sampans braid like commas on brown water.",
      },
      {
        thumbnail: u("photo-1566378246598-2b65664de657", 1200),
        name: "Orchard lane detours",
        description: "Dirt hugs irrigation ditches — fruit scent negotiates helmets off.",
      },
      {
        thumbnail: u("photo-1509316785283-ecdab83ebb38", 1200),
        name: "Ninh Kiều promenade",
        description: "Neon kisses river skin — pedestrians borrow breeze from barges.",
      },
    ],
    wards: [
      { name: "Ninh Kiều riverfront", slug: "ninh-kieu" },
      { name: "Cái Khế canals", slug: "cai-khe" },
      { name: "An Khánh orchard edge", slug: "an-khanh" },
    ],
    relatedTourSlugs: ["water-puppet-dusk"],
  },
];

export const provinces: ProvinceDetail[] = provincesDetailed;

export function getProvince(slug: string): ProvinceDetail | undefined {
  return provinces.find((p) => p.slug === slug);
}

export function popularProvinces(): ProvinceDetail[] {
  return provinces.filter((p) => p.isPopular);
}

export type ProvinceSortMode = "curated" | "name_az" | "region";

export function toursForProvince(slugs: string[]): TourListItem[] {
  const set = new Set(slugs);
  return tours.filter((t) => set.has(t.slug));
}

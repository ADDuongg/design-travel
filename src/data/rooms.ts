import { hotels, type HotelDetail, type HotelGalleryItem, type HotelRoomPreview } from "@/data/hotels";
import { formatVnd } from "@/data/tours";

export { formatVnd };

/** Mirrors reference RoomQueryParams sort subset for static catalog */
export type RoomSortMode = "price_asc" | "price_desc" | "rating_desc" | "newest";

export type RoomListQuery = {
  search: string;
  provinceSlug: string;
  minPrice: string;
  maxPrice: string;
  /** Minimum maxGuests required (0 = any) */
  minGuestsFit: number;
  sortBy: RoomSortMode;
};

export const defaultRoomListQuery: RoomListQuery = {
  search: "",
  provinceSlug: "",
  minPrice: "",
  maxPrice: "",
  minGuestsFit: 0,
  sortBy: "newest",
};

export type RoomGalleryItem = HotelGalleryItem;

/** Denormalized room + parent hotel context for list/detail */
export type RoomRecord = {
  routeSlug: string;
  hotelSlug: string;
  hotelTitle: string;
  provinceSlug: string;
  hotelListingYear: number;
  hotelRatingAvg: number;
  hotelReviewCount: number;
  hotelContact: HotelDetail["contact"];
  hotelAddress: string;
  roomId: string;
  roomType: string;
  name: string;
  shortDescription: string;
  maxGuests: number;
  roomSizeM2?: number;
  pricing: HotelRoomPreview["pricing"];
  bookingConfig: HotelRoomPreview["bookingConfig"];
  inventoryTotalRooms: number;
  thumbnail?: string;
  hotelRules?: string[];
  description: string[];
  gallery: RoomGalleryItem[];
  amenities: string[];
};

export function roomRouteSlug(hotelSlug: string, roomId: string): string {
  return `${hotelSlug}--${roomId}`;
}

function dedupeGallery(items: RoomGalleryItem[]): RoomGalleryItem[] {
  const seen = new Set<string>();
  return items.filter((g) => {
    if (seen.has(g.src)) return false;
    seen.add(g.src);
    return true;
  });
}

function buildGallery(hotel: HotelDetail, room: HotelRoomPreview): RoomGalleryItem[] {
  const fromRoom: RoomGalleryItem[] = room.thumbnail
    ? [{ src: room.thumbnail, alt: room.name }]
    : [];
  const fromHotel = hotel.gallery.slice(0, 3);
  return dedupeGallery([...fromRoom, ...fromHotel]);
}

function buildDescription(hotel: HotelDetail, room: HotelRoomPreview): string[] {
  const lead = `${room.name} belongs to ${hotel.title}: ${room.shortDescription}`;
  const mid = hotel.storyLead;
  const tail = `Indicative nightly rate from ${formatVnd(room.pricing.basePrice)} in ${room.pricing.currency}. ${hotel.priceNote} Correspondence confirms dates before any hold.`;
  return [lead, mid, tail];
}

function pickAmenities(hotel: HotelDetail, room: HotelRoomPreview): string[] {
  const fromHotel = hotel.amenities.slice(0, 4);
  const extra: string[] = [];
  if (room.roomSizeM2) extra.push(`${room.roomSizeM2} m² footprint`);
  if (room.pricing.weekendPrice) extra.push("Weekend rate tier on calendar");
  return dedupeStrings([...fromHotel, ...extra].slice(0, 6));
}

function dedupeStrings(xs: string[]): string[] {
  const s = new Set<string>();
  const out: string[] = [];
  for (const x of xs) {
    if (s.has(x)) continue;
    s.add(x);
    out.push(x);
  }
  return out;
}

function toRoomRecord(hotel: HotelDetail, room: HotelRoomPreview): RoomRecord {
  return {
    routeSlug: roomRouteSlug(hotel.slug, room.id),
    hotelSlug: hotel.slug,
    hotelTitle: hotel.title,
    provinceSlug: hotel.provinceSlug,
    hotelListingYear: hotel.listingYear,
    hotelRatingAvg: hotel.ratingAvg,
    hotelReviewCount: hotel.reviewCount,
    hotelContact: hotel.contact,
    hotelAddress: hotel.address,
    roomId: room.id,
    roomType: room.roomType,
    name: room.name,
    shortDescription: room.shortDescription,
    maxGuests: room.maxGuests,
    roomSizeM2: room.roomSizeM2,
    pricing: room.pricing,
    bookingConfig: room.bookingConfig,
    inventoryTotalRooms: room.inventoryTotalRooms,
    thumbnail: room.thumbnail,
    hotelRules: room.hotelRules,
    description: buildDescription(hotel, room),
    gallery: buildGallery(hotel, room),
    amenities: pickAmenities(hotel, room),
  };
}

const built: RoomRecord[] = hotels.flatMap((h) => h.rooms.map((r) => toRoomRecord(h, r)));

export const allRooms: RoomRecord[] = built;

export function getRoomByRouteSlug(slug: string): RoomRecord | undefined {
  return allRooms.find((r) => r.routeSlug === slug);
}

function parsePrice(s: string): number | undefined {
  const t = s.trim();
  if (!t) return undefined;
  const n = Number(t.replace(/\D/g, ""));
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return n;
}

function matchesSearch(r: RoomRecord, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return (
    r.name.toLowerCase().includes(s) ||
    r.roomType.toLowerCase().includes(s) ||
    r.hotelTitle.toLowerCase().includes(s) ||
    r.shortDescription.toLowerCase().includes(s) ||
    r.hotelAddress.toLowerCase().includes(s)
  );
}

export function filterRooms(list: RoomRecord[], query: RoomListQuery): RoomRecord[] {
  const minP = parsePrice(query.minPrice);
  const maxP = parsePrice(query.maxPrice);

  return list.filter((r) => {
    if (query.provinceSlug && r.provinceSlug !== query.provinceSlug) return false;
    if (query.minGuestsFit > 0 && r.maxGuests < query.minGuestsFit) return false;
    if (minP !== undefined && r.pricing.basePrice < minP) return false;
    if (maxP !== undefined && r.pricing.basePrice > maxP) return false;
    if (!matchesSearch(r, query.search)) return false;
    return true;
  });
}

export function sortRooms(list: RoomRecord[], sortBy: RoomSortMode): RoomRecord[] {
  const copy = [...list];
  if (sortBy === "price_asc") {
    copy.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice || a.name.localeCompare(b.name));
  } else if (sortBy === "price_desc") {
    copy.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice || a.name.localeCompare(b.name));
  } else if (sortBy === "rating_desc") {
    copy.sort(
      (a, b) =>
        b.hotelRatingAvg - a.hotelRatingAvg ||
        b.hotelReviewCount - a.hotelReviewCount ||
        b.hotelListingYear - a.hotelListingYear,
    );
  } else {
    copy.sort(
      (a, b) =>
        b.hotelListingYear - a.hotelListingYear ||
        b.hotelRatingAvg - a.hotelRatingAvg ||
        a.name.localeCompare(b.name),
    );
  }
  return copy;
}

export function roomPath(routeSlug: string): string {
  return `/rooms/${routeSlug}`;
}

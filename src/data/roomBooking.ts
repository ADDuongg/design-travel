/**
 * Client-side validation aligned with react-vite `createRoomBooking`
 * (see reference: features/rooms/api.ts).
 */

export type RoomGuestPayload = {
  adults: number;
  children?: number;
};

export type RoomBookingValidationArgs = {
  checkIn: string;
  checkOut: string;
  rooms: RoomGuestPayload[];
  bookingConfig: {
    minNights: number;
    maxNights?: number;
  };
  inventoryTotalRooms: number;
  maxGuestsPerRoom: number;
};

export function diffInNights(checkInIsoDate: string, checkOutIsoDate: string): number {
  const a = new Date(`${checkInIsoDate}T12:00:00`);
  const b = new Date(`${checkOutIsoDate}T12:00:00`);
  if (!Number.isFinite(a.getTime()) || !Number.isFinite(b.getTime())) return 0;
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export type RoomBookingValidationResult =
  | { ok: true }
  | { ok: false; message: string };

/** Mirrors reference API checks before POST (no network). */
export function validateRoomBooking(args: RoomBookingValidationArgs): RoomBookingValidationResult {
  const { checkIn, checkOut, rooms, bookingConfig, inventoryTotalRooms, maxGuestsPerRoom } = args;

  if (!checkIn.trim() || !checkOut.trim()) {
    return { ok: false, message: "Choose check-in and check-out dates." };
  }

  const nights = diffInNights(checkIn, checkOut);

  if (nights <= 0) {
    return { ok: false, message: "Invalid check-in / check-out: need at least one night." };
  }

  if (nights < bookingConfig.minNights) {
    return { ok: false, message: `Minimum stay is ${bookingConfig.minNights} night${bookingConfig.minNights === 1 ? "" : "s"}.` };
  }

  if (bookingConfig.maxNights != null && nights > bookingConfig.maxNights) {
    return { ok: false, message: `Maximum stay is ${bookingConfig.maxNights} nights.` };
  }

  const quantity = rooms.length;

  if (quantity < 1) {
    return { ok: false, message: "Select at least one room." };
  }

  if (quantity > inventoryTotalRooms) {
    return { ok: false, message: `Only ${inventoryTotalRooms} room${inventoryTotalRooms === 1 ? "" : "s"} available in this category.` };
  }

  for (let i = 0; i < rooms.length; i++) {
    const g = rooms[i];
    const adults = Math.max(1, g.adults || 1);
    const children = Math.max(0, g.children ?? 0);
    const heads = adults + children;
    if (heads > maxGuestsPerRoom) {
      return {
        ok: false,
        message: `Room ${i + 1}: up to ${maxGuestsPerRoom} guests (adults + children).`,
      };
    }
  }

  return { ok: true };
}

/**
 * Mock availability cap (reference uses GET room-inventories/availability).
 * Deterministic from dates so the UI can show "up to N rooms" without an API.
 */
export function getMockMaxRoomsCanBook(
  inventoryTotalRooms: number,
  checkIn: string,
  checkOut: string,
): number {
  if (!checkIn || !checkOut) return inventoryTotalRooms;
  const nights = diffInNights(checkIn, checkOut);
  if (nights <= 0) return 0;
  let h = 0;
  const key = `${checkIn}|${checkOut}`;
  for (let i = 0; i < key.length; i++) {
    h = (h + key.charCodeAt(i) * (i + 3)) % 10007;
  }
  const ratio = 0.55 + (h % 45) / 100;
  const cap = Math.max(1, Math.floor(inventoryTotalRooms * ratio));
  return Math.min(inventoryTotalRooms, cap);
}

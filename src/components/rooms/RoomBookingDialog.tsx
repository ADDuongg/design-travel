import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  diffInNights,
  getMockMaxRoomsCanBook,
  validateRoomBooking,
  type RoomGuestPayload,
} from "@/data/roomBooking";
import { formatVnd, type RoomRecord } from "@/data/rooms";

const field =
  "w-full rounded-2xl border border-charcoal/12 bg-sand-50/90 px-4 py-3 text-[0.95rem] text-charcoal shadow-inner outline-none transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15";

function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysIso(iso: string, days: number): string {
  const [ys, ms, ds] = iso.split("-").map(Number);
  const d = new Date(ys, ms - 1, ds + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type Props = {
  open: boolean;
  onClose: () => void;
  room: RoomRecord;
};

export function RoomBookingDialog({ open, onClose, room }: Props) {
  const titleId = useId();
  const descId = useId();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomQty, setRoomQty] = useState("1");
  const [guestsByRoom, setGuestsByRoom] = useState<RoomGuestPayload[]>([{ adults: 1, children: 0 }]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rootError, setRootError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ code: string } | null>(null);

  const maxGuests = room.maxGuests;

  const maxRoomsCanBook = useMemo(() => {
    if (!checkIn || !checkOut) return room.inventoryTotalRooms;
    return getMockMaxRoomsCanBook(room.inventoryTotalRooms, checkIn, checkOut);
  }, [checkIn, checkOut, room.inventoryTotalRooms]);

  const roomQtyNum =
    maxRoomsCanBook <= 0
      ? 0
      : Math.max(1, Math.min(parseInt(roomQty, 10) || 1, maxRoomsCanBook));

  useEffect(() => {
    if (maxRoomsCanBook <= 0) return;
    const n = parseInt(roomQty, 10) || 1;
    if (n > maxRoomsCanBook) setRoomQty(String(maxRoomsCanBook));
  }, [maxRoomsCanBook, roomQty]);

  useEffect(() => {
    if (roomQtyNum <= 0) return;
    setGuestsByRoom((prev) => {
      const next = [...prev];
      if (roomQtyNum > next.length) {
        for (let i = next.length; i < roomQtyNum; i++) {
          next.push({ adults: 1, children: 0 });
        }
      } else if (roomQtyNum < next.length) {
        next.length = roomQtyNum;
      }
      return next;
    });
  }, [roomQtyNum]);

  useEffect(() => {
    if (!open) return;
    setCheckIn("");
    setCheckOut("");
    setRoomQty("1");
    setGuestsByRoom([{ adults: 1, children: 0 }]);
    setSuccess(null);
    setRootError(null);
  }, [open, room.routeSlug]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const updateGuest = (index: number, patch: Partial<RoomGuestPayload>) => {
    setGuestsByRoom((prev) => {
      const next = prev.map((g, i) => (i === index ? { ...g, ...patch } : g));
      const g = next[index];
      if (g) {
        const adults = Math.max(1, g.adults);
        const maxChild = Math.max(0, maxGuests - adults);
        const children = Math.min(Math.max(0, g.children ?? 0), maxChild);
        next[index] = { adults, children };
      }
      return next;
    });
  };

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setRootError(null);

      if (maxRoomsCanBook <= 0) {
        setRootError("No rooms available for that date range. Try other dates.");
        return;
      }

      if (roomQtyNum <= 0) {
        setRootError("No rooms available for that date range. Try other dates.");
        return;
      }

      const qty = Math.min(roomQtyNum, maxRoomsCanBook);
      const roomsPayload = guestsByRoom.slice(0, qty).map((g) => ({
        adults: Math.max(1, g.adults),
        children: Math.max(0, g.children ?? 0),
      }));

      if (qty > maxRoomsCanBook) {
        setRootError(`Only ${maxRoomsCanBook} room${maxRoomsCanBook === 1 ? "" : "s"} remain for those dates. Reduce quantity or change dates.`);
        return;
      }

      const inventoryCap = Math.min(room.inventoryTotalRooms, maxRoomsCanBook);
      const baseVal = validateRoomBooking({
        checkIn,
        checkOut,
        rooms: roomsPayload,
        bookingConfig: room.bookingConfig,
        inventoryTotalRooms: inventoryCap,
        maxGuestsPerRoom: maxGuests,
      });

      if (!baseVal.ok) {
        setRootError(baseVal.message);
        return;
      }

      if (!fullName.trim()) {
        setRootError("Please enter your name.");
        return;
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setRootError("Please enter a valid email.");
        return;
      }

      setSubmitting(true);
      window.setTimeout(() => {
        setSubmitting(false);
        const short = room.routeSlug.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
        const code = `DV-RM-${short}-${Date.now().toString(36).slice(-8).toUpperCase()}`;
        setSuccess({ code });
      }, 520);
    },
    [
      checkIn,
      checkOut,
      email,
      fullName,
      guestsByRoom,
      maxGuests,
      maxRoomsCanBook,
      room.bookingConfig,
      room.inventoryTotalRooms,
      room.routeSlug,
      roomQtyNum,
    ],
  );

  const resetAndClose = () => {
    setSuccess(null);
    setCheckIn("");
    setCheckOut("");
    setRoomQty("1");
    setGuestsByRoom([{ adults: 1, children: 0 }]);
    setFullName("");
    setEmail("");
    setPhone("");
    setNote("");
    onClose();
  };

  const minCheckIn = todayIso();
  const minCheckOut = checkIn ? addDaysIso(checkIn, 1) : addDaysIso(minCheckIn, 1);

  const adultOptions = useMemo(
    () =>
      Array.from({ length: maxGuests }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
      })),
    [maxGuests],
  );

  if (typeof document === "undefined") return null;

  const contactHref = `/contact?stay=${encodeURIComponent(room.hotelSlug)}&room=${encodeURIComponent(room.routeSlug)}`;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="room-booking"
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close booking dialog"
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-[1] flex max-h-[min(92vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.85rem] border border-charcoal/12 bg-sand-50 shadow-soft sm:max-h-[90vh] sm:rounded-[1.85rem]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-charcoal/10 px-6 py-5 md:px-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Đất Việt · Hold dates</p>
                <h2 id={titleId} className="mt-2 font-display text-2xl text-charcoal md:text-3xl">
                  Request this room
                </h2>
                <p id={descId} className="mt-1 text-sm text-mist">
                  Same payload shape as the reference room booking (check-in, check-out, rooms[], guests per room). Demo inbox only; no payment.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-charcoal/15 bg-sand-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/70 transition hover:border-charcoal/30 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                Close
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-6 py-6 md:px-8 md:py-8">
              <div className="mb-6 rounded-[1.25rem] border border-charcoal/10 bg-sand-100/90 px-4 py-3">
                <p className="font-display text-lg text-charcoal">{room.name}</p>
                <p className="mt-1 text-xs text-mist">{room.hotelTitle}</p>
                <p className="mt-2 text-sm text-charcoal">
                  From <span className="font-mono font-medium">{formatVnd(room.pricing.basePrice)}</span>
                  {room.pricing.weekendPrice ? (
                    <span className="ms-2 text-mist">weekend {formatVnd(room.pricing.weekendPrice)}</span>
                  ) : null}
                  <span className="text-mist"> · {room.pricing.currency}</span>
                </p>
              </div>

              {success ? (
                <div className="space-y-5 rounded-[1.25rem] border border-forest/25 bg-sand-100 px-5 py-6">
                  <p className="font-display text-xl text-charcoal">Request received</p>
                  <p className="text-sm leading-relaxed text-mist">
                    Thank you. Reference code <strong className="font-mono text-charcoal">{success.code}</strong>. Nights and room count follow the same checks as the live API client; no charge is made here.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={resetAndClose}
                      className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90"
                    >
                      Done
                    </button>
                    <Link
                      to={contactHref}
                      className="rounded-full border border-charcoal/15 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-forest/35"
                      onClick={onClose}
                    >
                      Add a longer note
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-charcoal/80">Dates</p>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Check-in</span>
                      <input
                        type="date"
                        value={checkIn}
                        min={minCheckIn}
                        onChange={(e) => {
                          const v = e.target.value;
                          setCheckIn(v);
                          setCheckOut((co) => {
                            if (!co || !v) return co;
                            if (co <= v) return addDaysIso(v, 1);
                            return co;
                          });
                        }}
                        className={field}
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Check-out</span>
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn ? minCheckOut : addDaysIso(minCheckIn, 1)}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={field}
                      />
                    </label>
                    {checkIn && checkOut ? (
                      <p className="text-xs text-charcoal/45">
                        {diffInNights(checkIn, checkOut)} night{diffInNights(checkIn, checkOut) === 1 ? "" : "s"} · min{" "}
                        {room.bookingConfig.minNights}
                        {room.bookingConfig.maxNights ? ` · max ${room.bookingConfig.maxNights}` : ""}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-charcoal/80">Rooms</p>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Quantity</span>
                      {maxRoomsCanBook <= 0 ? (
                        <p className="rounded-2xl border border-charcoal/12 bg-sand-100/90 px-4 py-3 text-sm text-mist">
                          No inventory for this window. Adjust dates.
                        </p>
                      ) : (
                        <select
                          value={String(Math.max(1, roomQtyNum))}
                          onChange={(e) => setRoomQty(e.target.value)}
                          className={field}
                        >
                          {Array.from({ length: maxRoomsCanBook }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={String(n)}>
                              {n} room{n === 1 ? "" : "s"}
                            </option>
                          ))}
                        </select>
                      )}
                    </label>
                    {checkIn && checkOut ? (
                      <p className="text-xs text-mist">
                        Up to {maxRoomsCanBook} room{maxRoomsCanBook === 1 ? "" : "s"} available for this window (mock availability, same role as reference inventory API).
                      </p>
                    ) : (
                      <p className="text-xs text-mist">Pick dates to refresh availability.</p>
                    )}
                  </div>

                  <div className="space-y-5">
                    <p className="text-sm font-medium text-charcoal/80">Guests per room</p>
                    {roomQtyNum <= 0 ? null : guestsByRoom.slice(0, roomQtyNum).map((g, index) => {
                      const adults = Math.max(1, g.adults);
                      const maxChild = Math.max(0, maxGuests - adults);
                      const childOpts = Array.from({ length: maxChild + 1 }, (_, i) => ({
                        value: String(i),
                        label: String(i),
                      }));
                      return (
                        <div key={index} className="rounded-[1.25rem] border border-charcoal/10 bg-sand-100/80 px-4 py-4">
                          <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-charcoal/45">
                            Room {index + 1}
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="block space-y-1.5">
                              <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/45">Adults</span>
                              <select
                                value={String(adults)}
                                onChange={(e) =>
                                  updateGuest(index, {
                                    adults: parseInt(e.target.value, 10) || 1,
                                  })
                                }
                                className={field}
                              >
                                {adultOptions.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label className="block space-y-1.5">
                              <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/45">Children</span>
                              <select
                                value={String(Math.min(g.children ?? 0, maxChild))}
                                onChange={(e) =>
                                  updateGuest(index, {
                                    children: parseInt(e.target.value, 10) || 0,
                                  })
                                }
                                className={field}
                              >
                                {childOpts.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <p className="mt-2 text-xs text-charcoal/45">
                            Max {maxGuests} guests per room (adults + children).
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-charcoal/80">Contact</p>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Full name</span>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                        className={field}
                        placeholder="Nguyễn Văn A"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Email</span>
                      <input
                        type="email"
                        dir="ltr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className={field}
                        placeholder="you@domain.com"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Phone</span>
                      <input
                        type="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        className={field}
                        placeholder="Optional"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Note</span>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        className={`${field} resize-y`}
                        placeholder="Late arrival, twin beds, celebration…"
                      />
                    </label>
                  </div>

                  {rootError ? (
                    <p className="rounded-xl border border-sunset/30 bg-sand-100 px-3 py-2 text-sm text-charcoal" role="alert">
                      {rootError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting || maxRoomsCanBook <= 0}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal py-3.5 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    {submitting ? "Sending…" : "Submit booking request"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

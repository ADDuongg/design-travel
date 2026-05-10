import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { formatVnd, getMockAvailability, type TourDetail } from "@/data/tours";

const field =
  "w-full rounded-2xl border border-charcoal/12 bg-sand-50/90 px-4 py-3 text-[0.95rem] text-charcoal shadow-inner outline-none transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15";

function currentYearMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function shiftYearMonth(ym: string, delta: number): string {
  const [ys, ms] = ym.split("-").map(Number);
  const d = new Date(ys, ms - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthHeading(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return ym;
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(y, m - 1, 1));
}

type Props = {
  open: boolean;
  onClose: () => void;
  tour: TourDetail;
};

export function JourneyBookingDialog({ open, onClose, tour }: Props) {
  const titleId = useId();
  const descId = useId();

  const [month, setMonth] = useState(currentYearMonth);
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rootError, setRootError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ code: string } | null>(null);

  const availability = useMemo(
    () => getMockAvailability(tour.slug, month),
    [tour.slug, month],
  );

  const selectable = availability.filter((d) => d.availableSlots > 0);
  const maxGuests = tour.maxGuests;

  useEffect(() => {
    setDepartureDate("");
  }, [month, tour.slug]);

  useEffect(() => {
    if (!open) return;
    setMonth(currentYearMonth());
    setSuccess(null);
    setRootError(null);
  }, [open, tour.slug]);

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

  const discounted =
    tour.salePercent && tour.salePercent > 0
      ? Math.round(tour.priceFromVnd * (1 - tour.salePercent / 100))
      : tour.priceFromVnd;

  const adultOptions = useMemo(
    () =>
      Array.from({ length: maxGuests }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
      })),
    [maxGuests],
  );

  const minorOptions = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        value: String(i),
        label: String(i),
      })),
    [],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setRootError(null);
      const a = Math.max(1, parseInt(adults, 10) || 1);
      const c = Math.max(0, parseInt(children, 10) || 0);
      const i = Math.max(0, parseInt(infants, 10) || 0);
      if (!departureDate) {
        setRootError("Choose a departure date.");
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
      const slot = selectable.find((d) => d.departureDate === departureDate);
      if (!slot) {
        setRootError("That date is no longer available — pick another.");
        return;
      }
      const heads = a + c + i;
      if (heads > maxGuests) {
        setRootError(`This departure accepts up to ${maxGuests} travelers total (including infants).`);
        return;
      }
      if (heads > slot.availableSlots) {
        setRootError(`Only ${slot.availableSlots} spots remain on that date — adjust guests or pick another day.`);
        return;
      }
      setSubmitting(true);
      window.setTimeout(() => {
        setSubmitting(false);
        const code = `DV-${tour.slug.slice(0, 4).toUpperCase()}-${Date.now().toString(36).slice(-8).toUpperCase()}`;
        setSuccess({ code });
      }, 520);
    },
    [
      adults,
      children,
      infants,
      departureDate,
      email,
      fullName,
      maxGuests,
      selectable,
    ],
  );

  const resetAndClose = () => {
    setSuccess(null);
    setDepartureDate("");
    setAdults("1");
    setChildren("0");
    setInfants("0");
    setFullName("");
    setEmail("");
    setPhone("");
    setNote("");
    onClose();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="journey-booking"
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
                  Request this journey
                </h2>
                <p id={descId} className="mt-1 text-sm text-mist">
                  Same steps as a live tour booking — here it sends a structured request (prototype inbox, no payment).
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
                <p className="font-display text-lg text-charcoal">{tour.title}</p>
                <p className="mt-1 text-xs text-mist">{tour.region}</p>
                <p className="mt-2 text-sm text-charcoal">
                  Indicative from <span className="font-mono font-medium">{formatVnd(discounted)}</span>
                  {tour.salePercent && tour.salePercent > 0 ? (
                    <span className="ms-2 text-mist line-through">{formatVnd(tour.priceFromVnd)}</span>
                  ) : null}
                </p>
              </div>

              {success ? (
                <div className="space-y-5 rounded-[1.25rem] border border-forest/25 bg-sand-100 px-5 py-6">
                  <p className="font-display text-xl text-charcoal">Request received</p>
                  <p className="text-sm leading-relaxed text-mist">
                    Thank you — this demo captures your intent like the reference booking flow. Reference code{" "}
                    <strong className="font-mono text-charcoal">{success.code}</strong>. We will follow up by email;
                    no charge is made here.
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
                      to={`/contact?tour=${encodeURIComponent(tour.slug)}`}
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
                    <p className="text-sm font-medium text-charcoal/80">Departure date</p>
                    <div className="flex items-center gap-2 rounded-2xl border border-charcoal/12 bg-sand-100/80 px-3 py-2">
                      <button
                        type="button"
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-charcoal/60 transition hover:bg-sand-50 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
                        aria-label="Previous month"
                        onClick={() => setMonth((m) => shiftYearMonth(m, -1))}
                      >
                        ‹
                      </button>
                      <span className="flex-1 text-center text-sm font-medium tabular-nums text-charcoal">
                        {formatMonthHeading(month)}
                      </span>
                      <button
                        type="button"
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-charcoal/60 transition hover:bg-sand-50 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
                        aria-label="Next month"
                        onClick={() => setMonth((m) => shiftYearMonth(m, 1))}
                      >
                        ›
                      </button>
                    </div>
                    <div>
                      <label htmlFor="jb-departure" className="sr-only">
                        Select departure date
                      </label>
                      <select
                        id="jb-departure"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className={field}
                      >
                        <option value="">
                          {selectable.length === 0 ? "No departures this month" : "Choose a departure"}
                        </option>
                        {selectable.map((d) => (
                          <option key={d.departureDate} value={d.departureDate}>
                            {d.departureDate} — {d.availableSlots} spots left
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectable.length === 0 ? (
                      <p className="text-xs text-mist">Try another month — rhythm shifts by season.</p>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-charcoal/80">Guests</p>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="block space-y-1.5">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/45">Adults</span>
                        <select value={adults} onChange={(e) => setAdults(e.target.value)} className={field}>
                          {adultOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block space-y-1.5">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/45">Children</span>
                        <select value={children} onChange={(e) => setChildren(e.target.value)} className={field}>
                          {minorOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block space-y-1.5">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/45">Infants</span>
                        <select value={infants} onChange={(e) => setInfants(e.target.value)} className={field}>
                          {minorOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <p className="text-xs text-charcoal/45">Maximum {maxGuests} travelers per departure (including infants).</p>
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
                        placeholder="Diet, pace, celebration…"
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
                    disabled={submitting || selectable.length === 0}
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

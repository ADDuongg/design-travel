import { Link } from "react-router-dom";
import { formatVnd, type TourListItem } from "@/data/tours";

type Props = {
  slug: string;
  tour: Pick<TourListItem, "priceFromVnd" | "salePercent" | "priceNote"> & {
    inquiryCopy: string;
  };
  onOpenBooking: () => void;
};

export function JourneyPlanBand({ slug, tour, onOpenBooking }: Props) {
  const discounted =
    tour.salePercent && tour.salePercent > 0
      ? Math.round(tour.priceFromVnd * (1 - tour.salePercent / 100))
      : tour.priceFromVnd;

  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-gradient-to-br from-sand-100 via-sand-50 to-sand-100 px-6 py-10 shadow-soft md:px-12 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Planning posture</p>
          <p className="max-w-prose text-lg leading-relaxed text-mist">{tour.inquiryCopy}</p>
          <p className="text-xs leading-relaxed text-charcoal/45">
            Booking form mirrors a full departure request — still no payment here; our team confirms by message.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-charcoal/10 bg-sand-50/90 p-6 md:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Indicative from</p>
            <p className="mt-2 font-display text-4xl text-charcoal md:text-[2.75rem]">{formatVnd(discounted)}</p>
            {tour.salePercent && tour.salePercent > 0 ? (
              <p className="mt-1 text-sm text-mist line-through">{formatVnd(tour.priceFromVnd)}</p>
            ) : null}
            <p className="mt-2 text-xs text-mist">{tour.priceNote}</p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex w-full items-center justify-center rounded-full bg-charcoal px-8 py-3.5 text-center text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Book this journey
          </button>
          <Link
            to={`/contact?tour=${encodeURIComponent(slug)}`}
            className="text-center text-sm font-semibold text-forest underline-offset-4 hover:text-sunset-deep hover:underline"
          >
            Prefer a letter first — write to us
          </Link>
        </div>
      </div>
    </div>
  );
}

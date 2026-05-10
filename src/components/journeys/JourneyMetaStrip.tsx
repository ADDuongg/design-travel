import { priceLabelFrom, type TourListItem } from "@/data/tours";

type Props = {
  tour: Pick<
    TourListItem,
    "region" | "duration" | "durationDays" | "durationNights" | "priceFromVnd" | "priceNote" | "salePercent" | "ratingAvg" | "reviewCount"
  >;
  className?: string;
};

function formatNightsDays(days: number, nights: number): string | null {
  if (days <= 0 && nights <= 0) return null;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (nights > 0) parts.push(`${nights} night${nights === 1 ? "" : "s"}`);
  return parts.join(" · ");
}

export function JourneyMetaStrip({ tour, className }: Props) {
  const span = formatNightsDays(tour.durationDays, tour.durationNights);
  const price = priceLabelFrom(tour);

  return (
    <div
      className={
        className ??
        "rounded-[1.5rem] border border-charcoal/10 bg-sand-100/80 px-5 py-5 shadow-inner md:px-8 md:py-6"
      }
    >
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Region</dt>
          <dd className="mt-1.5 font-display text-lg text-charcoal">{tour.region}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Time on foot & road</dt>
          <dd className="mt-1.5 text-sm leading-snug text-mist">
            {tour.duration}
            {span ? <span className="mt-1 block text-xs text-charcoal/50">({span})</span> : null}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Indicative planning</dt>
          <dd className="mt-1.5 font-display text-lg text-charcoal">{price}</dd>
          <dd className="mt-1 text-xs leading-relaxed text-mist">{tour.priceNote}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Traveler voices</dt>
          <dd className="mt-1.5 text-sm text-charcoal">
            <span className="font-display text-xl text-charcoal">{tour.ratingAvg.toFixed(2)}</span>
            <span className="text-mist"> · </span>
            <span className="text-mist">{tour.reviewCount} notes</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

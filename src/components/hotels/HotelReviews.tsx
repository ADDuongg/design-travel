import { Reveal } from "@/components/motion/Reveal";
import type { HotelReviewEntry } from "@/data/hotels";

function StarRow({ rating }: { rating: number }) {
  const r = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${r} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-[0.95rem] leading-none ${i <= r ? "text-sunset-deep" : "text-charcoal/22"}`} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

type Props = {
  reviews: HotelReviewEntry[];
};

export function HotelReviews({ reviews }: Props) {
  return (
    <ul className="space-y-6">
      {reviews.map((rev, i) => (
        <Reveal key={`${rev.author}-${rev.date}`} delay={i * 0.04}>
          <li className="rounded-2xl border border-charcoal/10 bg-sand-50 px-5 py-5 shadow-soft md:px-7 md:py-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <StarRow rating={rev.rating} />
              <time className="text-[11px] uppercase tracking-[0.2em] text-charcoal/45">{rev.date}</time>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">{rev.comment}</p>
            <p className="mt-4 text-sm font-medium text-charcoal">
              {rev.author}
              {rev.place ? <span className="font-normal text-mist"> · {rev.place}</span> : null}
            </p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

import { Link } from "react-router-dom";
import { dailyRateLabel, type TourGuideDetail } from "@/data/tourGuides";

type Props = {
  slug: string;
  guide: Pick<TourGuideDetail, "inquiryCopy" | "dailyRateVnd" | "currency">;
};

export function TourGuidePlanBand({ slug, guide }: Props) {
  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-gradient-to-br from-sand-100 via-sand-50 to-sand-100 px-6 py-10 shadow-soft md:px-12 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Correspondence first</p>
          <p className="max-w-prose text-lg leading-relaxed text-mist">{guide.inquiryCopy}</p>
          <p className="text-xs leading-relaxed text-charcoal/45">
            Day rates are indicative — seasons and routes shift; our team confirms kindly by message.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-charcoal/10 bg-sand-50/90 p-6 md:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Full-day companion fee</p>
            <p className="mt-2 font-display text-3xl text-charcoal md:text-[2.35rem]">{dailyRateLabel(guide)}</p>
          </div>
          <Link
            to={`/contact?guide=${encodeURIComponent(slug)}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-charcoal px-8 py-3.5 text-center text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Request this guide
          </Link>
          <Link
            to="/contact"
            className="text-center text-sm font-semibold text-forest underline-offset-4 hover:text-sunset-deep hover:underline"
          >
            Open the correspondence desk
          </Link>
        </div>
      </div>
    </div>
  );
}

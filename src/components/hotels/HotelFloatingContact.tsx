import { Link } from "react-router-dom";
import { formatVnd } from "@/data/tours";
import type { HotelDetail } from "@/data/hotels";

type Props = {
  slug: string;
  hotel: Pick<HotelDetail, "priceFromVnd" | "contact" | "title">;
};

export function HotelFloatingContact({ slug, hotel }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/15 bg-sand-50/92 px-4 py-3 shadow-[0_-12px_40px_-20px_oklch(22%_0.02_75/0.35)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[9px] uppercase tracking-[0.28em] text-charcoal/45">Indicative from</p>
          <p className="truncate font-display text-xl text-charcoal">{formatVnd(hotel.priceFromVnd)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={`/contact?stay=${encodeURIComponent(slug)}`}
            className="rounded-full border border-charcoal/15 px-3 py-2 text-xs font-semibold text-charcoal/80 transition hover:border-forest/35 hover:text-forest"
          >
            Note
          </Link>
          {hotel.contact.phone ? (
            <a
              href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`}
              className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-forest-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Call
            </a>
          ) : hotel.contact.email ? (
            <a
              href={`mailto:${hotel.contact.email}?subject=${encodeURIComponent(`Inquiry: ${hotel.title}`)}`}
              className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-forest-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Mail
            </a>
          ) : (
            <Link
              to={`/contact?stay=${encodeURIComponent(slug)}`}
              className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-forest-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Write
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

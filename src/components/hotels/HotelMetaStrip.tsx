import { Link } from "react-router-dom";
import { priceLabelFrom, type HotelDetail } from "@/data/hotels";
import { getProvince } from "@/data/provinces";

type Props = {
  hotel: Pick<HotelDetail, "provinceSlug" | "starRating" | "address" | "priceFromVnd" | "priceNote" | "ratingAvg" | "reviewCount" | "listingYear">;
  className?: string;
};

export function HotelMetaStrip({ hotel, className }: Props) {
  const province = getProvince(hotel.provinceSlug);
  const price = priceLabelFrom(hotel);

  return (
    <div
      className={
        className ??
        "rounded-[1.5rem] border border-charcoal/10 bg-sand-100/80 px-5 py-5 shadow-inner md:px-8 md:py-6"
      }
    >
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Province</dt>
          <dd className="mt-1.5 font-display text-lg text-charcoal">
            {province ? (
              <Link to={`/provinces/${province.slug}`} className="transition hover:text-sunset-deep">
                {province.name}
              </Link>
            ) : (
              hotel.provinceSlug
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Star & address</dt>
          <dd className="mt-1.5 text-sm leading-snug text-mist">
            <span className="font-medium text-charcoal">{hotel.starRating}★ property</span>
            <span className="mt-1 block text-xs text-charcoal/55">{hotel.address}</span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Indicative planning</dt>
          <dd className="mt-1.5 font-display text-lg text-charcoal">{price}</dd>
          <dd className="mt-1 text-xs leading-relaxed text-mist">{hotel.priceNote}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Guest notes</dt>
          <dd className="mt-1.5 text-sm text-charcoal">
            <span className="font-display text-xl text-charcoal">{hotel.ratingAvg.toFixed(2)}</span>
            <span className="text-mist"> · </span>
            <span className="text-mist">{hotel.reviewCount} notes</span>
            <span className="mt-1 block text-xs text-charcoal/45">Listed {hotel.listingYear}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

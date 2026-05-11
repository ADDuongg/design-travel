import { Link } from "react-router-dom";
import { formatVnd, type RoomRecord } from "@/data/rooms";
import { getProvince } from "@/data/provinces";

type Props = {
  room: RoomRecord;
  className?: string;
};

export function RoomMetaStrip({ room, className }: Props) {
  const province = getProvince(room.provinceSlug);
  const priceLine = `From ${formatVnd(room.pricing.basePrice)} · ${room.pricing.currency}`;

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
              room.provinceSlug
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Property</dt>
          <dd className="mt-1.5 text-sm leading-snug text-mist">
            <Link to={`/hotels/${room.hotelSlug}`} className="font-medium text-charcoal transition hover:text-sunset-deep">
              {room.hotelTitle}
            </Link>
            <span className="mt-1 block text-xs text-charcoal/55">{room.hotelAddress}</span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Capacity & inventory</dt>
          <dd className="mt-1.5 font-display text-lg text-charcoal">
            Up to {room.maxGuests} guests
            {room.roomSizeM2 ? <span className="text-mist"> · {room.roomSizeM2} m²</span> : null}
          </dd>
          <dd className="mt-1 text-xs text-charcoal/55">{room.inventoryTotalRooms} rooms in this category</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.28em] text-charcoal/45">Indicative rate</dt>
          <dd className="mt-1.5 font-display text-lg text-charcoal">{priceLine}</dd>
          <dd className="mt-1 text-xs leading-relaxed text-mist">
            {room.hotelRatingAvg.toFixed(2)} guest tone · {room.hotelReviewCount} notes · listed {room.hotelListingYear}
          </dd>
        </div>
      </dl>
    </div>
  );
}

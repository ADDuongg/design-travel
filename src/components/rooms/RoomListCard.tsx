import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { formatVnd, roomPath, type RoomRecord } from "@/data/rooms";
import { getProvince } from "@/data/provinces";

type Props = {
  room: RoomRecord;
  index: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RoomListCard({ room, index }: Props) {
  const province = getProvince(room.provinceSlug);
  const region = province?.name ?? room.provinceSlug;

  return (
    <Reveal delay={(index % 4) * 0.04}>
      <motion.article
        initial={false}
        whileHover={{ y: prefersReducedMotion() ? 0 : -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-sand-50 shadow-soft"
      >
        <Link to={roomPath(room.routeSlug)} className="group block">
          {room.thumbnail ? (
            <div className="relative aspect-[16/10]">
              <img
                src={room.thumbnail}
                alt=""
                className="h-full w-full object-cover transition duration-[800ms] group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-sand-100/90">
                {room.roomType}
              </p>
            </div>
          ) : null}
        </Link>
        <div className="flex flex-1 flex-col space-y-3 p-6 md:p-7">
          <p className="text-[10px] uppercase tracking-[0.26em] text-charcoal/45">
            {room.hotelTitle} · {region}
          </p>
          <h3 className="font-display text-2xl text-charcoal">
            <Link to={roomPath(room.routeSlug)} className="transition hover:text-sunset-deep">
              {room.name}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-mist">{room.shortDescription}</p>
          <ul className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-charcoal/50">
            <li>Up to {room.maxGuests} guests</li>
            {room.roomSizeM2 ? (
              <li className="before:pe-2 before:content-['·']">{room.roomSizeM2} m²</li>
            ) : null}
            <li className="before:pe-2 before:content-['·']">{room.inventoryTotalRooms} in inventory</li>
          </ul>
          <p className="font-display text-lg text-charcoal">
            From {formatVnd(room.pricing.basePrice)}
            {room.pricing.weekendPrice ? (
              <span className="ms-2 text-sm font-normal text-mist">· weekend {formatVnd(room.pricing.weekendPrice)}</span>
            ) : null}
            <span className="text-sm font-normal text-mist"> · {room.pricing.currency}</span>
          </p>
          <p className="text-xs leading-relaxed text-charcoal/55">
            Min {room.bookingConfig.minNights} night{room.bookingConfig.minNights === 1 ? "" : "s"}
            {room.bookingConfig.maxNights ? ` · max ${room.bookingConfig.maxNights}` : ""}
            {room.bookingConfig.allowInstantBooking
              ? " · lighter correspondence hold when slots allow"
              : " · hold via correspondence only"}
          </p>
          <p className="text-xs text-charcoal/45">
            Property tone {room.hotelRatingAvg.toFixed(2)} · {room.hotelReviewCount} guest notes
          </p>
          <Link
            to={roomPath(room.routeSlug)}
            className="mt-auto inline-flex w-fit items-center gap-2 border-b border-charcoal/20 pb-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-forest/40 hover:text-forest"
          >
            Open room sheet
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.article>
    </Reveal>
  );
}

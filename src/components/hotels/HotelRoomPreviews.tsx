import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import type { HotelRoomPreview } from "@/data/hotels";
import { formatVnd, roomPath, roomRouteSlug } from "@/data/rooms";

type Props = {
  rooms: HotelRoomPreview[];
  hotelSlug: string;
};

export function HotelRoomPreviews({ rooms, hotelSlug }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {rooms.map((room, i) => {
        const toRoom = roomPath(roomRouteSlug(hotelSlug, room.id));
        return (
        <Reveal key={room.id} delay={i * 0.05}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-sand-50 shadow-soft"
          >
            {room.thumbnail ? (
              <Link to={toRoom} className="group relative block aspect-[16/10]">
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
              </Link>
            ) : null}
            <div className="flex flex-1 flex-col space-y-3 p-6 md:p-7">
              <h3 className="font-display text-2xl text-charcoal">
                <Link to={toRoom} className="transition hover:text-sunset-deep">
                  {room.name}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-mist">{room.shortDescription}</p>
              <ul className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-charcoal/50">
                <li>Up to {room.maxGuests} guests</li>
                {room.roomSizeM2 ? (
                  <li className="before:pe-2 before:content-['·']">{room.roomSizeM2} m²</li>
                ) : null}
                <li className="before:pe-2 before:content-['·']">
                  {room.inventoryTotalRooms} in inventory
                </li>
              </ul>
              <p className="font-display text-lg text-charcoal">
                From {formatVnd(room.pricing.basePrice)}
                {room.pricing.weekendPrice ? (
                  <span className="ms-2 text-sm font-normal text-mist">
                    · weekend {formatVnd(room.pricing.weekendPrice)}
                  </span>
                ) : null}
                <span className="text-sm font-normal text-mist"> · {room.pricing.currency}</span>
              </p>
              <p className="text-xs leading-relaxed text-charcoal/55">
                Min {room.bookingConfig.minNights} night{room.bookingConfig.minNights === 1 ? "" : "s"}
                {room.bookingConfig.maxNights ? ` · max ${room.bookingConfig.maxNights}` : ""}
                {room.bookingConfig.allowInstantBooking ? " · lighter correspondence hold when slots allow" : " · hold via correspondence only"}
              </p>
              {room.hotelRules?.length ? (
                <ul className="mt-2 space-y-1 border-t border-charcoal/10 pt-3 text-xs text-mist">
                  {room.hotelRules.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              ) : null}
              <Link
                to={toRoom}
                className="mt-auto inline-flex w-fit items-center gap-2 border-b border-charcoal/20 pb-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-forest/40 hover:text-forest"
              >
                Room sheet
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.article>
        </Reveal>
        );
      })}
    </div>
  );
}

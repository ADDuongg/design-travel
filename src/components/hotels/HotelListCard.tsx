import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { getProvince } from "@/data/provinces";
import { priceLabelFrom, type HotelDetail } from "@/data/hotels";

type Props = {
  hotel: HotelDetail;
  index: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HotelListCard({ hotel, index }: Props) {
  const province = getProvince(hotel.provinceSlug);
  const region = province?.name ?? hotel.provinceSlug;

  return (
    <Reveal delay={(index % 3) * 0.04}>
      <motion.article
        initial={false}
        whileHover={{ y: prefersReducedMotion() ? 0 : -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <Link to={`/hotels/${hotel.slug}`} className="group block overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
            <div className="relative aspect-[3/4] max-h-[min(92vh,720px)] w-full sm:aspect-[4/5]">
              <img
                src={hotel.coverImage}
                alt=""
                className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-sand-50 md:p-9">
                <p className="text-[10px] uppercase tracking-[0.28em] text-sand-100/75">
                  {hotel.starRating}★ · {region}
                </p>
                <p className="mt-3 font-display text-3xl leading-[1.05] md:text-[2.35rem]">{hotel.title}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">{hotel.mood}</p>
          <p className="text-lg leading-relaxed text-mist md:text-xl">{hotel.dek}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-charcoal/50">
            <span>{region}</span>
            <span className="hidden h-1 w-1 rounded-full bg-charcoal/25 sm:inline" />
            <span>{priceLabelFrom(hotel)}</span>
          </div>
          <p className="text-xs text-charcoal/45">
            {hotel.ratingAvg.toFixed(2)} guest tone · {hotel.reviewCount} notes
          </p>
          <Link
            to={`/hotels/${hotel.slug}`}
            className="inline-flex items-center gap-2 border-b border-charcoal/25 pb-0.5 text-sm font-semibold text-charcoal transition hover:border-forest/50 hover:text-sunset-deep"
          >
            Enter this stay
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.article>
    </Reveal>
  );
}

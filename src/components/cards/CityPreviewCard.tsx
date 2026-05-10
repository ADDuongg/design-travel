import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { CityCard } from "@/data/cities";

export function CityPreviewCard({ city, index }: { city: CityCard; index: number }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`group relative overflow-hidden rounded-3xl bg-sand-100 shadow-soft ${city.moodClass}`}
    >
      <Link to={`/cities/${city.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/11]">
          <img
            src={city.image}
            alt={city.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-sand-50/75">{city.subtitle}</p>
            <h3 className="font-display text-3xl text-sand-50 md:text-4xl">{city.name}</h3>
            <p className="text-sm text-sand-100/85">{city.vibe}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {city.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-sand-50/25 bg-sand-50/10 px-3 py-1 text-[11px] text-sand-50/90 backdrop-blur-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

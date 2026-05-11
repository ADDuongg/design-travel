import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HotelListCard } from "@/components/hotels";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { Input } from "@/design-system";
import {
  defaultHotelListQuery,
  filterHotels,
  hotels,
  sortHotels,
  type HotelListQuery,
  type HotelSortMode,
} from "@/data/hotels";
import { provinces } from "@/data/provinces";

const sortLabels: Record<HotelSortMode, string> = {
  newest: "Newest listed",
  name: "Name A–Z",
  rating: "Guest tone",
};

export function HotelListPage() {
  const [query, setQuery] = useState<HotelListQuery>({ ...defaultHotelListQuery });

  const visible = useMemo(() => {
    const filtered = filterHotels(hotels, query);
    return sortHotels(filtered, query.sortBy);
  }, [query]);

  return (
    <article>
      <ParallaxHero image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400">
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">Shelters · correspondence first</p>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.95]">Stays that behave like chapters</h1>
            <p className="max-w-2xl text-lg text-sand-100/85">
              Boutique roofs and honest inventories; filters stay soft, and nothing here pretends to be a checkout cart.
            </p>
          </motion.div>
        </div>
      </ParallaxHero>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-10 md:py-20">
        <Reveal className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Search</p>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">Name, province, or address fragment</h2>
          </div>
          <div className="w-full max-w-md">
            <Input
              label="Find a stay"
              hint="Matches title, dek, address, or province name."
              value={query.search}
              onChange={(e) => setQuery((q) => ({ ...q, search: e.target.value }))}
              placeholder="e.g. Huế, terrace, canal…"
              autoComplete="off"
              className="!rounded-2xl !border-charcoal/12 !bg-sand-50/90"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-b border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Province</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Where the roof should listen</h2>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2 md:gap-3">
            <FilterPill
              active={query.provinceSlug === ""}
              onClick={() => setQuery((q) => ({ ...q, provinceSlug: "" }))}
              label="All provinces"
            />
            {provinces.map((p) => (
              <FilterPill
                key={p.slug}
                active={query.provinceSlug === p.slug}
                onClick={() => setQuery((q) => ({ ...q, provinceSlug: q.provinceSlug === p.slug ? "" : p.slug }))}
                label={p.name}
              />
            ))}
          </Stagger>

          <Reveal className="mt-12 border-t border-charcoal/10 pt-10">
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-forest">Minimum stars</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {([0, 3, 4, 5] as const).map((n) => (
                <FilterPill
                  key={n}
                  active={query.minStars === n}
                  onClick={() => setQuery((q) => ({ ...q, minStars: n }))}
                  label={n === 0 ? "Any stars" : `${n}+ stars`}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-forest">Sort</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {(Object.keys(sortLabels) as HotelSortMode[]).map((mode) => (
                <SortPill
                  key={mode}
                  active={query.sortBy === mode}
                  onClick={() => setQuery((q) => ({ ...q, sortBy: mode }))}
                  label={sortLabels[mode]}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 md:px-10 md:pb-36">
        <div className="flex flex-col gap-24 md:gap-32">
          {visible.map((h, i) => (
            <HotelListCard key={h.slug} hotel={h} index={i} />
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-mist">Nothing in this pairing: loosen a filter or clear search.</p>
        ) : null}
        <Reveal className="mt-20">
          <Link
            to="/journeys"
            className="inline-flex items-center gap-2 border-b border-charcoal/25 pb-0.5 text-sm font-semibold text-charcoal transition hover:border-forest/50 hover:text-sunset-deep"
          >
            Prefer slow routes instead
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <RevealItem>
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition md:px-5 ${
          active
            ? "border-forest bg-forest text-sand-50 shadow-soft"
            : "border-charcoal/15 bg-sand-50 text-charcoal/70 hover:border-forest/35 hover:text-charcoal"
        }`}
      >
        {label}
      </button>
    </RevealItem>
  );
}

function SortPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition md:px-5 ${
        active
          ? "border-charcoal bg-charcoal text-sand-50"
          : "border-charcoal/15 bg-transparent text-charcoal/65 hover:border-charcoal/35 hover:text-charcoal"
      }`}
    >
      {label}
    </button>
  );
}

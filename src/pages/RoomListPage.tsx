import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RoomListCard } from "@/components/rooms";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { Input } from "@/design-system";
import {
  allRooms,
  defaultRoomListQuery,
  filterRooms,
  sortRooms,
  type RoomListQuery,
  type RoomSortMode,
} from "@/data/rooms";
import { provinces } from "@/data/provinces";

const heroImage =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400";

const sortLabels: Record<RoomSortMode, string> = {
  newest: "Newest listed",
  price_asc: "Rate · gentle first",
  price_desc: "Rate · generous first",
  rating_desc: "Property tone",
};

const guestFitOptions: { value: number; label: string }[] = [
  { value: 0, label: "Any party size" },
  { value: 2, label: "Fits 2+" },
  { value: 3, label: "Fits 3+" },
  { value: 4, label: "Fits 4+" },
];

export function RoomListPage() {
  const [query, setQuery] = useState<RoomListQuery>({ ...defaultRoomListQuery });

  const visible = useMemo(() => {
    const filtered = filterRooms(allRooms, query);
    return sortRooms(filtered, query.sortBy);
  }, [query]);

  return (
    <article>
      <ParallaxHero image={heroImage}>
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">Inventory · correspondence first</p>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.95]">Rooms as typed inventory</h1>
            <p className="max-w-2xl text-lg text-sand-100/85">
              Same fields as the live catalog: nights, capacity, weekend tiers. Shown here without a checkout fiction. Filters stay soft; holds stay human.
            </p>
          </motion.div>
        </div>
      </ParallaxHero>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-10 md:py-20">
        <Reveal className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Search</p>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">Room, type, or property name</h2>
          </div>
          <div className="w-full max-w-md">
            <Input
              label="Find a room"
              hint="Matches room name, type, property title, or address fragment."
              value={query.search}
              onChange={(e) => setQuery((q) => ({ ...q, search: e.target.value }))}
              placeholder="e.g. Indigo, courtyard, Huế…"
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
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Where the room should face</h2>
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
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-forest">Party size</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {guestFitOptions.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={query.minGuestsFit === opt.value}
                  onClick={() => setQuery((q) => ({ ...q, minGuestsFit: opt.value }))}
                  label={opt.label}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10 grid gap-6 border-t border-charcoal/10 pt-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-forest">Minimum rate (VND)</p>
              <Input
                label="Floor"
                hint="Digits only; leave empty for no floor."
                value={query.minPrice}
                onChange={(e) => setQuery((q) => ({ ...q, minPrice: e.target.value }))}
                placeholder="e.g. 1000000"
                inputMode="numeric"
                className="!rounded-2xl !border-charcoal/12 !bg-sand-50/90"
              />
            </div>
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-forest">Maximum rate (VND)</p>
              <Input
                label="Ceiling"
                hint="Digits only; leave empty for no ceiling."
                value={query.maxPrice}
                onChange={(e) => setQuery((q) => ({ ...q, maxPrice: e.target.value }))}
                placeholder="e.g. 5000000"
                inputMode="numeric"
                className="!rounded-2xl !border-charcoal/12 !bg-sand-50/90"
              />
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-forest">Sort</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {(Object.keys(sortLabels) as RoomSortMode[]).map((mode) => (
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

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-10 md:py-24">
        <Reveal className="mb-12 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Catalog</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">{visible.length} room categories</h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          {visible.map((r, i) => (
            <RoomListCard key={r.routeSlug} room={r} index={i} />
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-mist">Nothing in this pairing: loosen price band or clear search.</p>
        ) : null}
        <Reveal className="mt-20">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 border-b border-charcoal/25 pb-0.5 text-sm font-semibold text-charcoal transition hover:border-forest/50 hover:text-sunset-deep"
          >
            Browse whole properties instead
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

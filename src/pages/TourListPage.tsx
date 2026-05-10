import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { JourneyShareSave } from "@/components/journeys/JourneyShareSave";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import {
  tourCategories,
  tourCategoryLabels,
  tourCollections,
  tours,
  sortTours,
  priceLabelFrom,
  type TourCategory,
  type TourListItem,
  type TourSortMode,
} from "@/data/tours";

type Filter = TourCategory | "all";

const sortLabels: Record<TourSortMode, string> = {
  story: "Story order",
  shorter: "Shorter first",
  budget: "Gentler budget",
};

export function TourListPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<TourSortMode>("story");

  const filtered = useMemo(() => {
    let list: TourListItem[] = tours;
    if (collectionId) {
      const c = tourCollections.find((x) => x.id === collectionId);
      if (c) list = tours.filter((t) => c.slugs.includes(t.slug));
    }
    if (filter !== "all") list = list.filter((t) => t.category === filter);
    return list;
  }, [filter, collectionId]);

  const visible = useMemo(() => sortTours(filtered, sortMode), [filtered, sortMode]);

  return (
    <article>
      <ParallaxHero image="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400">
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">Curated routes · correspondence first</p>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.95]">Chapters of Vietnam, paced like film</h1>
            <p className="max-w-2xl text-lg text-sand-100/85">
              Slow dispatches through fog, coast, and neon — human tempo, generous whitespace, no marketplace noise.
            </p>
          </motion.div>
        </div>
      </ParallaxHero>

      <section className="border-b border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Collections</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Three moods to wander inside</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {tourCollections.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => {
                    setCollectionId(collectionId === col.id ? null : col.id);
                    setFilter("all");
                  }}
                  className={`group relative block w-full overflow-hidden rounded-[1.75rem] border text-start shadow-soft transition ${
                    collectionId === col.id
                      ? "border-forest/50 ring-2 ring-forest/20"
                      : "border-charcoal/10 hover:border-forest/30"
                  }`}
                >
                  <div className="relative aspect-[16/11]">
                    <img src={col.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/10" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-sand-50">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-sand-100/70">Curated set</p>
                    <h3 className="font-display text-2xl">{col.title}</h3>
                    <p className="mt-2 text-sm text-sand-100/80">{col.subtitle}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
          {collectionId ? (
            <p className="mt-8 text-sm text-mist">
              Showing journeys in this collection.
              <button type="button" className="ms-2 font-semibold text-forest underline-offset-4 hover:underline" onClick={() => setCollectionId(null)}>
                Clear
              </button>
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-10 md:py-20">
        <Reveal className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Browse</p>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">Find your rhythm</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-mist">
            Filters stay soft — pair them with a sort that respects time, budget, or the order we first drafted these routes.
          </p>
        </Reveal>
        <Stagger className="flex flex-wrap gap-2 md:gap-3">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")} label="All journeys" />
          {tourCategories.map((cat) => (
            <FilterPill
              key={cat}
              active={filter === cat}
              onClick={() => {
                setFilter(cat);
                setCollectionId(null);
              }}
              label={tourCategoryLabels[cat]}
            />
          ))}
        </Stagger>

        <Reveal className="mt-12 border-t border-charcoal/10 pt-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-forest">Sort</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {(Object.keys(sortLabels) as TourSortMode[]).map((mode) => (
              <SortPill key={mode} active={sortMode === mode} onClick={() => setSortMode(mode)} label={sortLabels[mode]} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 md:px-10 md:pb-36">
        <div className="flex flex-col gap-24 md:gap-32">
          {visible.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 0.04}>
              <motion.article
                initial={false}
                whileHover={{ y: prefersReducedMotion() ? 0 : -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="absolute right-4 top-4 z-10 lg:right-5 lg:top-5">
                    <JourneyShareSave slug={t.slug} title={t.title} variant="save-only" />
                  </div>
                  <Link to={`/journeys/${t.slug}`} className="group block overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
                    <div className="relative aspect-[3/4] max-h-[min(92vh,720px)] w-full sm:aspect-[4/5]">
                      <img
                        src={t.coverImage}
                        alt=""
                        className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-7 text-sand-50 md:p-9">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-sand-100/75">{tourCategoryLabels[t.category]}</p>
                        <p className="mt-3 font-display text-3xl leading-[1.05] md:text-[2.35rem]">{t.title}</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className={`space-y-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-forest">{t.region}</p>
                  <p className="text-lg leading-relaxed text-mist md:text-xl">{t.dek}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-charcoal/50">
                    <span>{t.duration}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-charcoal/25 sm:inline" />
                    <span>{priceLabelFrom(t)}</span>
                  </div>
                  <p className="text-sm font-medium italic text-charcoal/75">{t.mood}</p>
                  <p className="text-xs text-charcoal/45">
                    {t.ratingAvg.toFixed(2)} listener tone · {t.reviewCount} notes
                  </p>
                  <Link
                    to={`/journeys/${t.slug}`}
                    className="inline-flex items-center gap-2 border-b border-charcoal/25 pb-0.5 text-sm font-semibold text-charcoal transition hover:border-forest/50 hover:text-sunset-deep"
                  >
                    Enter this chapter
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-mist">Nothing in this pairing — loosen a filter.</p>
        ) : null}
      </section>
    </article>
  );
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

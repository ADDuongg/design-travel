import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { TourGuideShareSave } from "@/components/tourGuides";
import {
  dailyRateLabel,
  defaultTourGuideListFilter,
  filterTourGuides,
  sortTourGuides,
  tourGuideLanguageOptions,
  tourGuideRegionLabels,
  tourGuideRegions,
  tourGuides,
  type TourGuideListItem,
  type TourGuideSortMode,
} from "@/data/tourGuides";

const sortLabels: Record<TourGuideSortMode, string> = {
  story: "Name · gentle order",
  rating: "Listener tone",
  "gentler-rate": "Softer day fee",
};

export function TourGuideListPage() {
  const [filters, setFilters] = useState(defaultTourGuideListFilter);
  const [sortMode, setSortMode] = useState<TourGuideSortMode>("story");

  const languageOptions = useMemo(() => tourGuideLanguageOptions(tourGuides), []);

  const filtered = useMemo(() => filterTourGuides(tourGuides, filters), [filters]);
  const visible = useMemo(() => sortTourGuides(filtered, sortMode), [filtered, sortMode]);

  return (
    <article>
      <ParallaxHero image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400">
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">Voices on the route · human tempo</p>
            <h1 className="font-display text-[clamp(2.45rem,6.5vw,4.35rem)] leading-[0.95]">Guides as companions, not catalogs</h1>
            <p className="max-w-2xl text-lg text-sand-100/85">
              Portraits, dialects, and the quiet agreements good walks require — browse slowly; filters stay soft.
            </p>
          </motion.div>
        </div>
      </ParallaxHero>

      <section className="border-b border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-12 max-w-[52ch] space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Field desk</p>
            <p className="font-display text-3xl leading-tight text-charcoal md:text-[2.35rem]">A magazine spread, not a roster</p>
            <p className="text-sm leading-relaxed text-mist md:text-base">
              Each profile mirrors how we think about expertise: languages, regions, verified presence, day fees — framed as story first.
              Nothing here competes with the portrait; metadata sits beneath like captions.
            </p>
          </Reveal>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <label className="block w-full max-w-md space-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/45">Search by name, place, or tongue</span>
              <input
                type="search"
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                className="w-full rounded-2xl border border-charcoal/12 bg-sand-50/95 px-4 py-3 text-sm text-charcoal shadow-inner outline-none placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15"
                placeholder="Try “delta”, “Mandarin”, “night”…"
                autoComplete="off"
              />
            </label>
            <button
              type="button"
              onClick={() => setFilters({ ...defaultTourGuideListFilter })}
              className="self-start rounded-full border border-charcoal/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70 transition hover:border-forest/35 hover:text-forest"
            >
              Clear filters
            </button>
          </div>

          <Reveal className="mb-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-forest">Region</p>
            <Stagger className="flex flex-wrap gap-2 md:gap-3">
              <FilterPill
                label="All regions"
                active={filters.region === "all"}
                onClick={() => setFilters((f) => ({ ...f, region: "all" }))}
              />
              {tourGuideRegions.map((r) => (
                <FilterPill
                  key={r}
                  label={tourGuideRegionLabels[r]}
                  active={filters.region === r}
                  onClick={() => setFilters((f) => ({ ...f, region: r }))}
                />
              ))}
            </Stagger>
          </Reveal>

          <Reveal className="mb-6" delay={0.04}>
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-forest">Language</p>
            <Stagger className="flex flex-wrap gap-2 md:gap-3">
              <FilterPill
                label="Any language"
                active={filters.language === "all"}
                onClick={() => setFilters((f) => ({ ...f, language: "all" }))}
              />
              {languageOptions.map((lang) => (
                <FilterPill
                  key={lang}
                  label={lang}
                  active={filters.language === lang}
                  onClick={() => setFilters((f) => ({ ...f, language: lang }))}
                />
              ))}
            </Stagger>
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-4 border-t border-charcoal/10 pt-8" delay={0.06}>
            <button
              type="button"
              role="switch"
              aria-checked={filters.verifiedOnly}
              onClick={() => setFilters((f) => ({ ...f, verifiedOnly: !f.verifiedOnly }))}
              className={`rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition md:px-5 ${
                filters.verifiedOnly
                  ? "border-forest bg-forest text-sand-50 shadow-soft"
                  : "border-charcoal/15 bg-transparent text-charcoal/65 hover:border-forest/35 hover:text-charcoal"
              }`}
            >
              Verified guides only
            </button>
            <p className="text-xs text-mist">
              Mirrors “trusted presence” filters — off by default so voices stay inclusive.
            </p>
          </Reveal>

          <Reveal className="mt-10 border-t border-charcoal/10 pt-10">
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-forest">Sort</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {(Object.keys(sortLabels) as TourGuideSortMode[]).map((mode) => (
                <SortPill key={mode} active={sortMode === mode} onClick={() => setSortMode(mode)} label={sortLabels[mode]} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 md:px-10 md:pb-36">
        <Reveal className="mb-16 mt-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Portraits in conversation</p>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">Who walks beside you</h2>
          </div>
          <p className="max-w-md text-sm text-mist">
            {visible.length} guide{visible.length === 1 ? "" : "s"} in this edit — turn filters off if the room feels quiet.
          </p>
        </Reveal>

        <div className="flex flex-col gap-28 md:gap-36">
          {visible.map((g, i) => (
            <GuideEditorialRow key={g.slug} guide={g} index={i} />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-20 text-center text-mist">Nothing in this light — widen language or region.</p>
        ) : null}
      </section>
    </article>
  );
}

function GuideEditorialRow({ guide, index }: { guide: TourGuideListItem; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal delay={(index % 3) * 0.04}>
      <motion.article
        initial={false}
        whileHover={{ y: prefersReducedMotion() ? 0 : -3 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16"
      >
        <div className={`relative ${flip ? "lg:order-2" : ""}`}>
          <div className="absolute right-4 top-4 z-10 lg:right-5 lg:top-5">
            <TourGuideShareSave slug={guide.slug} title={guide.name} variant="save-only" />
          </div>
          <Link to={`/guides/${guide.slug}`} className="group block overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
            <div className="relative aspect-[3/4] max-h-[min(88vh,680px)] w-full sm:aspect-[4/5]">
              <img
                src={guide.portraitImage}
                alt=""
                className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/2 to-charcoal/10" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-sand-50 md:p-9">
                <p className="text-[10px] uppercase tracking-[0.28em] text-sand-100/75">{tourGuideRegionLabels[guide.region]}</p>
                <p className="mt-3 font-display text-[clamp(1.85rem,4vw,2.65rem)] leading-[1.05]">{guide.name}</p>
                {guide.verified ? (
                  <p className="mt-3 inline-flex rounded-full border border-sand-100/25 bg-charcoal/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sand-100/95">
                    Verified presence
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
          <p className="mt-4 text-xs italic text-charcoal/45">{guide.beat}</p>
        </div>

        <div className={`space-y-6 ${flip ? "lg:order-1" : ""}`}>
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">{guide.moodLine}</p>
          <p className="text-xl leading-relaxed text-mist md:text-2xl">{guide.dek}</p>
          <p className="text-sm leading-relaxed text-charcoal/70 md:text-base">{guide.provinceLabels.join(" · ")}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-charcoal/50">
            <span>{guide.languages.join(" · ")}</span>
            <span className="hidden h-1 w-1 rounded-full bg-charcoal/25 sm:inline" />
            <span>{guide.yearsExperience} seasons in the field</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-charcoal/80">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-forest/85">{dailyRateLabel(guide)}</span>
            <span className="text-charcoal/35">·</span>
            <span>
              {guide.ratingAvg.toFixed(2)} tone · {guide.reviewCount} notes
            </span>
          </div>
          <Link
            to={`/guides/${guide.slug}`}
            className="inline-flex items-center gap-2 border-b border-charcoal/25 pb-0.5 text-sm font-semibold text-charcoal transition hover:border-forest/50 hover:text-sunset-deep"
          >
            Open their chapter
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.article>
    </Reveal>
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

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { ProvincesPagination } from "@/components/provinces/ProvincesPagination";
import {
  popularProvinces,
  provinces,
  provinceRegions,
  provinceRegionLabels,
  type ProvinceDetail,
  type ProvinceRegion,
  type ProvinceSortMode,
} from "@/data/provinces";

const PAGE_SIZE = 6;

const regionCardTone: Record<ProvinceRegion, string> = {
  NORTH: "from-charcoal/60 via-charcoal/25 to-[oklch(35%_0.03_230)]/55",
  CENTRAL: "from-charcoal/55 via-sunset-deep/35 to-charcoal/20",
  SOUTH: "from-charcoal/60 via-charcoal/30 to-[oklch(42%_0.12_55)]/40",
};

function sortProvinces(list: ProvinceDetail[], mode: ProvinceSortMode): ProvinceDetail[] {
  const regionOrder: Record<ProvinceRegion, number> = { NORTH: 0, CENTRAL: 1, SOUTH: 2 };
  if (mode === "name_az") return [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (mode === "region") {
    return [...list].sort(
      (a, b) => regionOrder[a.region] - regionOrder[b.region] || a.name.localeCompare(b.name),
    );
  }
  return [...list].sort(
    (a, b) => Number(b.isPopular) - Number(a.isPopular) || a.name.localeCompare(b.name),
  );
}

export function ProvincesListPage() {
  const [regionFilter, setRegionFilter] = useState<ProvinceRegion | "ALL">("ALL");
  const [popularOnly, setPopularOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<ProvinceSortMode>("curated");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...provinces];
    if (regionFilter !== "ALL") list = list.filter((p) => p.region === regionFilter);
    if (popularOnly) list = list.filter((p) => p.isPopular);
    if (q.length) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fullName.toLowerCase().includes(q) ||
          p.translations.shortDescription.toLowerCase().includes(q),
      );
    }
    return sortProvinces(list, sortMode);
  }, [regionFilter, popularOnly, search, sortMode]);

  const popular = popularProvinces();
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(0, page), pageCount - 1);
  const paged = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  return (
    <article>
      <ParallaxHero image="https://images.unsplash.com/photo-1570077188670-e00b4fb6c7e9?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400">
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">Atlas · moods by latitude</p>
            <h1 className="font-display text-[clamp(2.6rem,6.8vw,4.85rem)] leading-[0.92]">Provinces unfold like diary spreads</h1>
            <p className="max-w-2xl text-lg text-sand-100/85">
              A visual map of silhouette, fog, lantern glow, and delta breeze — curated frames, whisper-light filters, zero booking
              chrome.
            </p>
          </motion.div>
        </div>
      </ParallaxHero>

      <div className="sticky top-[4.5rem] z-30 border-b border-charcoal/10 bg-sand-50/80 px-4 py-4 shadow-[0_12px_40px_-24px_oklch(22%_0.02_75/0.25)] backdrop-blur-md md:top-[6rem] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block min-w-[min(100%,280px)] flex-1">
            <span className="sr-only">Search provinces</span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              type="search"
              placeholder="Search name, sensation…"
              className="w-full rounded-full border border-charcoal/12 bg-sand-50/90 px-5 py-3 text-sm text-charcoal outline-none ring-forest/25 transition placeholder:text-charcoal/40 focus:border-forest/35 focus:ring-4"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Stagger className="flex flex-wrap gap-2">
              <RevealItem>
                <button
                  type="button"
                  onClick={() => {
                    setRegionFilter("ALL");
                    setPage(0);
                  }}
                  className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    regionFilter === "ALL"
                      ? "border-forest bg-forest text-sand-50"
                      : "border-charcoal/12 bg-transparent text-charcoal/70 hover:border-forest/30"
                  }`}
                >
                  All regions
                </button>
              </RevealItem>
              {provinceRegions.map((r) => (
                <RevealItem key={r}>
                  <button
                    type="button"
                    onClick={() => {
                      setRegionFilter(r);
                      setPage(0);
                    }}
                    className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                      regionFilter === r
                        ? "border-forest bg-forest text-sand-50"
                        : "border-charcoal/12 bg-transparent text-charcoal/70 hover:border-forest/30"
                    }`}
                  >
                    {r === "NORTH" ? "North mist" : r === "CENTRAL" ? "Central coast" : "South warmth"}
                  </button>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </div>
        <div className="mx-auto mt-4 flex max-w-6xl flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">
          <button
            type="button"
            onClick={() => {
              setPopularOnly((v) => !v);
              setPage(0);
            }}
            className={`rounded-full border px-4 py-2 transition ${popularOnly ? "border-sunset-deep text-sunset-deep" : "border-charcoal/10 hover:border-charcoal/25"}`}
          >
            {popularOnly ? "Popular unlocked" : "Popular focus"}
          </button>
          <span className="hidden h-5 w-px bg-charcoal/15 sm:block" aria-hidden />
          <div className="flex flex-wrap gap-3">
            <span className="self-center text-charcoal/40">Sort</span>
            {(["curated", "name_az", "region"] as ProvinceSortMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setSortMode(m);
                  setPage(0);
                }}
                className={`rounded-full px-3 py-1.5 tracking-[0.16em] transition ${
                  sortMode === m ? "bg-charcoal text-sand-50" : "hover:text-forest"
                }`}
              >
                {m === "curated" ? "Curated rhythm" : m === "name_az" ? "A–Z" : "Regional arc"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="border-b border-charcoal/10 bg-sand-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-10 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Beloved signatures</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Provinces travelers return to</h2>
          </Reveal>
          <div className="flex snap-x gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden">
            {popular.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="min-w-[min(88vw,320px)] snap-center md:min-w-[380px]">
                <PopularStripCard province={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 pb-24 md:px-10 md:py-20 md:pb-28">
        <Reveal className="mb-14 max-w-[52ch] space-y-4">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Immersive atlas</p>
          <p className="font-display text-3xl leading-tight text-charcoal md:text-4xl">Scroll as if paging a travel folio.</p>
          <p className="text-sm leading-relaxed text-mist">
            Each ribbon is geography rendered as temperament — overlays borrow night markets, tidal flats, plateau fog.
          </p>
        </Reveal>

        <div className="grid gap-12 sm:gap-14 md:grid-cols-2">
          {paged.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.06}>
              <ProvinceMagazineCard province={p} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-mist">No provinces match — loosen a filter.</p>
        ) : (
          <div className="mt-16 border-t border-charcoal/10 pt-14">
            <ProvincesPagination
              page={safePage}
              pageCount={pageCount}
              onPageChange={setPage}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
            />
          </div>
        )}
      </section>
    </article>
  );
}

function PopularStripCard({ province }: { province: ProvinceDetail }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="group relative h-[460px] overflow-hidden rounded-[1.85rem] border border-charcoal/10 shadow-soft md:h-[520px]"
    >
      <Link to={`/provinces/${province.slug}`} className="absolute inset-0 z-10" aria-labelledby={`popular-${province.slug}`} />
      <img
        src={province.thumbnail}
        alt=""
        className="absolute inset-0 size-full object-cover transition duration-[1.1s] group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${regionCardTone[province.region]} opacity-95 transition duration-700 group-hover:opacity-85`}
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-7 text-sand-50">
        <p className="text-[10px] uppercase tracking-[0.3em] text-sand-100/72">{provinceRegionLabels[province.region]}</p>
        <h3 id={`popular-${province.slug}`} className="mt-2 font-display text-3xl">
          {province.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-sand-100/82">{province.translations.shortDescription}</p>
      </div>
    </motion.article>
  );
}

function ProvinceMagazineCard({ province }: { province: ProvinceDetail }) {
  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-charcoal/10 bg-sand-50 shadow-soft"
    >
      <Link to={`/provinces/${province.slug}`} className="relative block aspect-[16/11] overflow-hidden md:aspect-[16/10]">
        <img
          src={province.thumbnail}
          alt=""
          className="size-full object-cover transition duration-[1s] group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${regionCardTone[province.region]} opacity-90 mix-blend-multiply`}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-charcoal/25" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-sand-50">
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-sand-100/70">
            <span>{province.fullName}</span>
            {province.isPopular ? <span className="rounded-full bg-sand-50/15 px-2 py-1 text-sand-50">Returning favorite</span> : null}
          </div>
          <h3 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] leading-[0.95]">{province.name}</h3>
        </div>
      </Link>
      <div className="flex flex-col gap-5 p-8 md:p-10">
        <p className="font-display text-xl italic leading-snug text-charcoal/92 md:text-[1.35rem]">{province.translations.shortDescription}</p>
        <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-charcoal/40">
          Whisper tallies · {province.totalTourGuides} field voices · {province.totalTours} documented rhythms · accommodations noted for
          context, not resale
        </p>
        <Link
          to={`/provinces/${province.slug}`}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-forest transition hover:text-sunset-deep"
        >
          Open dossier<span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

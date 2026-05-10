import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { cityCards } from "@/data/cities";
import {
  getProvince,
  provinceRegionLabels,
  toursForProvince,
  type ProvinceRegion,
} from "@/data/provinces";

const regionAtmosphereCopy: Record<ProvinceRegion, { title: string; body: string }> = {
  NORTH: {
    title: "Northern temperament",
    body: "Altitude writes the script — mist cuffs ridges, scooters carry soup steam uphill, afternoons dissolve into train-whistle echoes. Editorially, gradients stay cool; accents borrow pine and kiln smoke.",
  },
  CENTRAL: {
    title: "Central choreography",
    body: "Sea salt stitches fabric to lanterns; sandstone drinks heat then exhales it at dusk. Compositions favor horizontal calm interrupted by incense verticals — horizons wide, palettes warming toward copper.",
  },
  SOUTH: {
    title: "Southern resonance",
    body: "Tropical inertia meets voltage — jasmine competes with LED, deltas braid patience with commerce. Typography can stretch taller; overlays lean sunset without shouting sale.",
  },
};

const navItems = [
  { id: "intro", label: "Intro" },
  { id: "story", label: "Story" },
  { id: "highlights", label: "Highlights" },
  { id: "gallery", label: "Gallery" },
  { id: "atmosphere", label: "Mood" },
  { id: "wards", label: "Wards" },
  { id: "insights", label: "Insights" },
  { id: "timing", label: "Seasons" },
  { id: "journeys", label: "Journeys" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

function formatPopulation(n: number): string {
  return new Intl.NumberFormat("en-US", { notation: n >= 1_000_000 ? "compact" : "standard", compactDisplay: "short", maximumFractionDigits: 1 }).format(n);
}

export function ProvinceDetailPage() {
  const { slug } = useParams();
  const province = slug ? getProvince(slug) : undefined;
  const heroRef = useRef<HTMLElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setNavVisible(v >= 0.88);
  });

  const onNav = useCallback((id: string) => scrollToSection(id), []);

  const relatedTours = useMemo(
    () => (province ? toursForProvince(province.relatedTourSlugs) : []),
    [province],
  );

  const relatedCityLinks = useMemo(() => {
    if (!province) return [];
    const match: Record<ProvinceRegion, string[]> = {
      NORTH: ["hanoi"],
      CENTRAL: ["da-nang", "hoi-an"],
      SOUTH: ["ho-chi-minh-city", "da-lat"],
    };
    return cityCards.filter((c) => match[province.region].includes(c.slug));
  }, [province]);

  if (!province) {
    return <Navigate to="/provinces" replace />;
  }

  const atm = regionAtmosphereCopy[province.region];
  const storyParagraphs = province.translations.description.split(/\.\s+/).reduce<string[]>((acc, bit, idx, arr) => {
    const frag = idx < arr.length - 1 ? `${bit.trim()}.` : bit.trim();
    if (frag) acc.push(frag);
    return acc;
  }, []);

  const mid = Math.ceil(storyParagraphs.length / 2);
  const paraA = storyParagraphs.slice(0, mid).join(" ");
  const paraB = storyParagraphs.slice(mid).join(" ");

  return (
    <article className="pb-24">
      <section ref={heroRef}>
        <ParallaxHero image={province.thumbnail} heightClass="min-h-[100svh]">
          <div className="flex flex-1 flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-6 text-sand-50"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/72">{provinceRegionLabels[province.region]}</p>
              <h1 className="font-display text-[clamp(2.8rem,7.2vw,5rem)] leading-[0.92]">{province.name}</h1>
              <p className="max-w-[48ch] text-lg leading-relaxed text-sand-100/85">{province.translations.shortDescription}</p>
              <dl className="flex flex-wrap gap-x-10 gap-y-3 border-t border-sand-100/20 pt-6 text-[11px] uppercase tracking-[0.24em] text-sand-100/72">
                <div>
                  <dt className="text-sand-100/55">Population (sense of scale)</dt>
                  <dd className="mt-1 font-mono normal-case tracking-normal text-sand-50">{formatPopulation(province.population)} humans</dd>
                </div>
                <div>
                  <dt className="text-sand-100/55">Area</dt>
                  <dd className="mt-1 font-mono normal-case tracking-normal text-sand-50">{province.areaKm2.toLocaleString()} km² tapestry</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </ParallaxHero>
      </section>

      <motion.div
        initial={false}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-30 flex justify-center px-4 md:top-[5.5rem]"
      >
        <nav className="pointer-events-auto max-w-4xl rounded-full border border-charcoal/10 bg-sand-50/82 px-2 py-2 shadow-soft backdrop-blur-md">
          <div className="flex max-h-[52vh] flex-wrap justify-center gap-1 overflow-y-auto px-2 md:max-h-none md:gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNav(item.id)}
                className="rounded-full px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-charcoal/70 transition hover:bg-sand-100 hover:text-forest sm:text-[10px]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </motion.div>

      <section id="intro" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20 md:px-10 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Atmospheric introduction</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.9rem]">First light on {province.fullName}</h2>
            <p className="text-xl leading-relaxed text-mist md:text-[1.35rem]">{province.translations.shortDescription}</p>
          </Reveal>
          <Reveal>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft"
            >
              <img src={province.gallery[1] ?? province.thumbnail} alt="" className="aspect-[4/5] w-full object-cover md:aspect-auto md:min-h-[460px]" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal/50 via-transparent to-transparent" />
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section id="story" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-24">
        <Reveal className="mb-12 max-w-xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Province storytelling</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Essay without encyclopedia glaze</h2>
        </Reveal>
        <div className={`grid gap-12 ${paraB.trim() ? "lg:grid-cols-2 lg:gap-16" : "max-w-[58ch]"}`}>
          <Reveal>
            <p className="text-lg leading-[1.75] text-mist">{paraA}</p>
          </Reveal>
          {paraB.trim() ? (
            <Reveal delay={0.08}>
              <p className="text-lg leading-[1.75] text-mist">{paraB}</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section id="highlights" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Highlight experiences</p>
              <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Scenes stitched from field notes</h2>
            </div>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-3">
            {province.highlights.map((h, i) => (
              <Reveal key={h.name} delay={i * 0.06}>
                <motion.article whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 28 }} className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-sand-50 shadow-soft">
                  <div className="relative aspect-[16/11]">
                    <img src={h.thumbnail} alt="" className="size-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                    <h3 className="font-display text-2xl text-charcoal">{h.name}</h3>
                    <p className="text-sm leading-relaxed text-mist md:text-[0.97rem]">{h.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-24">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Cinematic gallery</p>
          <h2 className="font-display text-4xl text-charcoal">Frames that refuse postcard flattening</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {province.gallery.map((src, idx) => {
            const hero = idx === 0;
            return (
              <Reveal key={`${province.slug}-${src}`} delay={idx * 0.05} className={hero ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}>
                <motion.div whileHover={{ scale: hero ? 1.01 : 1.03 }} transition={{ type: "spring", stiffness: 240, damping: 22 }} className="h-full">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className={`w-full rounded-[1.35rem] object-cover shadow-soft ${hero ? "min-h-[300px] md:min-h-[520px]" : "aspect-[16/11] md:aspect-auto md:min-h-[240px]"}`}
                  />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="atmosphere" className="scroll-mt-28 border-y border-charcoal/10 bg-charcoal px-4 py-20 text-sand-50 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/65">Regional atmosphere</p>
            <h2 className="font-display text-4xl leading-tight md:text-[2.9rem]">{atm.title}</h2>
            <p className="text-lg leading-relaxed text-sand-100/85">{atm.body}</p>
          </Reveal>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <img src={province.gallery[2] ?? province.thumbnail} alt="" className="aspect-[16/13] w-full object-cover opacity-92" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              <p className="absolute bottom-8 left-8 right-8 font-display text-2xl italic text-sand-50/92 md:text-3xl">
                “Mood before metadata — {province.name} keeps its own weather.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="wards" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-24">
        <Reveal className="mb-12 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Local discovery · wards</p>
          <h2 className="font-display text-4xl text-charcoal">Neighborhoods as microclimates</h2>
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] border border-charcoal/10 bg-sand-100 shadow-inner md:aspect-[5/6]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_35%,oklch(88%_0.02_85/0.5),transparent_55%)]" />
              <div className="absolute inset-[18%] rounded-[40%_60%_45%_55%] border border-charcoal/12 bg-charcoal/[0.04] blur-[0.5px]" />
              {province.wards.slice(0, 3).map((w, idx) => (
                <motion.button
                  key={w.slug}
                  type="button"
                  onClick={() => scrollToSection(`ward-${w.slug}`)}
                  className="absolute z-10 flex size-14 items-center justify-center rounded-full border border-charcoal/10 bg-sand-50/90 shadow-soft backdrop-blur-sm md:size-16"
                  style={{
                    insetInlineStart: `${28 + idx * 22}%`,
                    insetBlockStart: `${40 + idx * 8}%`,
                  }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 320 }}
                  aria-label={`Jump to ward ${w.name}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-forest">{String(idx + 1).padStart(2, "0")}</span>
                </motion.button>
              ))}
              <p className="absolute bottom-8 left-6 right-6 text-center text-[11px] uppercase tracking-[0.28em] text-charcoal/45">
                Abstract atlas — emotional pins, not survey lines
              </p>
            </div>
          </Reveal>
          <Stagger className="space-y-8">
            {province.wards.map((w, i) => (
              <RevealItem key={w.slug}>
                <article id={`ward-${w.slug}`} className="scroll-mt-36 rounded-[1.5rem] border border-charcoal/10 bg-sand-50 p-8 shadow-soft">
                  <p className="font-mono text-xs uppercase tracking-[0.26em] text-forest">Ward vignette {(i + 1).toString().padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-3xl text-charcoal">{w.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist md:text-[0.98rem]">
                    A tactile slice of how {province.name} layers residence, commerce, and gossip — glide through on scooters or foot,
                    respecting the choreography of storefronts reclaiming sidewalks.
                  </p>
                </article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="insights" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14 md:px-10 md:py-20">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Travel insights</p>
          <h2 className="font-display text-4xl text-charcoal">Field tallies kept honest</h2>
        </Reveal>
        <div className="rounded-[2rem] border border-dashed border-charcoal/18 bg-sand-50/80 p-10 shadow-soft md:p-14">
          <p className="max-w-3xl font-display text-2xl leading-snug text-charcoal md:text-3xl">
            Numbers below exist as archival texture — editorial context only, never a storefront grid.
          </p>
          <dl className="mt-12 grid gap-10 sm:grid-cols-3">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.26em] text-charcoal/45">Shelters inventoried · hotels</dt>
              <dd className="mt-3 font-display text-4xl text-charcoal">{province.totalHotels.toLocaleString()}</dd>
              <dd className="mt-2 text-sm text-mist">How many roofs were counted in public datasets — curiosity, not cart.</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.26em] text-charcoal/45">Circumstantial tours cited</dt>
              <dd className="mt-3 font-display text-4xl text-charcoal">{province.totalTours.toLocaleString()}</dd>
              <dd className="mt-2 text-sm text-mist">Ways strangers describe walking these streets — distilled, not pitched.</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.26em] text-charcoal/45">Distinct narrators • guides referenced</dt>
              <dd className="mt-3 font-display text-4xl text-charcoal">{province.totalTourGuides.toLocaleString()}</dd>
              <dd className="mt-2 text-sm text-mist">Human voices aggregated as cultural density, not SKU.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="timing" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Best windows</p>
              <h2 className="font-display text-4xl text-charcoal">When the province softens toward you</h2>
            </div>
            <p className="text-lg leading-[1.8] text-mist">{province.translations.bestTimeToVisit}</p>
          </Reveal>
        </div>
      </section>

      <section id="journeys" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-8 md:px-10">
        <Reveal className="mb-12 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Related rhythms</p>
          <h2 className="font-display text-4xl text-charcoal">Journeys that echo this province</h2>
          <p className="max-w-xl text-sm text-mist">Curated magazine routes — read like chapters, behave like scouting notes.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedTours.length ? (
            relatedTours.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.05}>
                <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-charcoal/10 bg-sand-50 shadow-soft">
                  <Link to={`/journeys/${t.slug}`} className="relative block aspect-[16/11] overflow-hidden">
                    <img src={t.coverImage} alt="" className="size-full object-cover transition duration-700 hover:scale-[1.03]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-sand-100/85">{t.region}</span>
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl text-charcoal">{t.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-mist">{t.dek}</p>
                    <Link className="text-sm font-semibold text-forest hover:text-sunset-deep" to={`/journeys/${t.slug}`}>
                      Read journey →
                    </Link>
                  </div>
                </motion.article>
              </Reveal>
            ))
          ) : (
            <Reveal className="col-span-full rounded-[1.5rem] border border-dashed border-charcoal/18 bg-sand-100/70 p-12 text-center md:col-span-3">
              <p className="font-display text-2xl text-charcoal">Companion journeys are still being inscribed for this province.</p>
              <p className="mt-3 text-sm text-mist">Browse the journeys index — the tone matches even when the pin is still loose.</p>
              <Link className="mt-6 inline-block text-sm font-semibold text-forest hover:text-sunset-deep" to="/journeys">
                Open journeys shelf →
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-20 space-y-6">
          <h3 className="font-display text-3xl text-charcoal">Cities stitched nearby</h3>
          <div className="flex flex-wrap gap-4">
            {relatedCityLinks.map((c) => (
              <Link
                key={c.slug}
                to={`/cities/${c.slug}`}
                className="rounded-full border border-charcoal/12 px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-forest/35 hover:text-forest"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/cities"
              className="rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-sand-50 shadow-soft hover:bg-charcoal/90"
            >
              Full city atlas
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/provinces"
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
          >
            Back to provinces atlas
          </Link>
          <Link
            to="/"
            className="rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-mist underline-offset-4 hover:text-charcoal hover:underline"
          >
            Home editorial
          </Link>
        </Reveal>
      </section>
    </article>
  );
}

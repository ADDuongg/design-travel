import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import {
  TourGuideMobileContactBar,
  TourGuidePlanBand,
  TourGuideReviews,
  TourGuideShareSave,
} from "@/components/tourGuides";
import { dailyRateLabel, getTourGuide, tourGuideRegionLabels } from "@/data/tourGuides";

type NavItem = { id: string; label: string };

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

export function TourGuideDetailPage() {
  const { slug } = useParams();
  const guide = slug ? getTourGuide(slug) : undefined;
  const heroRef = useRef<HTMLElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setNavVisible(v >= 0.88);
  });

  const navItems = useMemo<NavItem[]>(() => {
    if (!guide) return [];
    const items: NavItem[] = [
      { id: "story", label: "Story" },
      { id: "presence", label: "Presence" },
      { id: "rhythm", label: "Rhythm" },
      { id: "windows", label: "Windows" },
      { id: "gallery", label: "Gallery" },
    ];
    if (guide.voicePull) items.push({ id: "voice", label: "Voices" });
    items.push({ id: "reviews", label: "Reviews" }, { id: "plan", label: "Request" });
    return items;
  }, [guide]);

  const onNav = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  return (
    <article className="relative pb-28 lg:pb-16">
      <section ref={heroRef}>
        <ParallaxHero image={guide.portraitImage} heightClass="min-h-[100svh]">
          <div className="flex flex-1 flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-5 text-sand-50"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">
                {tourGuideRegionLabels[guide.region]} · companion
              </p>
              <h1 className="font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95]">{guide.name}</h1>
              <p className="max-w-2xl text-lg text-sand-100/85">{guide.storyLead}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] uppercase tracking-[0.24em] text-sand-100/70">
                <span>{guide.languages.join(" · ")}</span>
                <span className="text-sand-100/40">·</span>
                <span>{guide.yearsExperience} seasons walking</span>
                <span className="text-sand-100/40">·</span>
                <span>{guide.moodLine}</span>
              </div>
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
        <nav
          aria-label="Section navigation"
          className="pointer-events-auto max-w-4xl rounded-full border border-charcoal/10 bg-sand-50/85 px-2 py-2 shadow-soft backdrop-blur-md"
        >
          <div className="flex max-h-[44vh] flex-wrap justify-center gap-1 overflow-y-auto md:max-h-none md:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNav(item.id)}
                className="rounded-full px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-charcoal/70 transition hover:bg-sand-100 hover:text-forest md:px-3 md:text-[10px]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </motion.div>

      <section className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-14 md:px-10 md:pt-16">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <TourGuideShareSave slug={guide.slug} title={guide.name} />
        </Reveal>
        <Reveal delay={0.05} className="mt-8 rounded-[1.75rem] border border-charcoal/10 bg-sand-100/90 px-6 py-6 shadow-soft md:px-10 md:py-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-forest/90">Archival line · presence</p>
              <p className="text-sm leading-relaxed text-mist md:text-base">
                {guide.provinceLabels.join(" · ")} — languages spoken with care, not performance.
              </p>
            </div>
            <dl className="grid gap-4 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/60 md:justify-items-end md:text-end">
              <div>
                <dt className="text-charcoal/40">Day fee</dt>
                <dd className="mt-1 font-display text-xl normal-case tracking-normal text-charcoal">{dailyRateLabel(guide)}</dd>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
                <div>
                  <dt className="text-charcoal/40">Tone</dt>
                  <dd className="mt-1 text-charcoal">{guide.ratingAvg.toFixed(2)}</dd>
                </div>
                <div>
                  <dt className="text-charcoal/40">Notes</dt>
                  <dd className="mt-1 text-charcoal">{guide.reviewCount}</dd>
                </div>
                <div>
                  <dt className="text-charcoal/40">Reply</dt>
                  <dd className="mt-1 text-charcoal">{guide.responseRatePercent}%</dd>
                </div>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal className="space-y-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Letter from the field</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Why the route trusts them</h2>
            {guide.storyBody.map((para) => (
              <p key={para.slice(0, 36)} className="text-lg leading-relaxed text-mist md:text-xl">
                {para}
              </p>
            ))}
          </Reveal>
          <Reveal>
            <blockquote className="relative overflow-hidden rounded-[2rem] border border-charcoal/10 bg-charcoal px-8 py-10 text-sand-50 shadow-soft md:px-12 md:py-12">
              <p className="font-display text-2xl italic leading-snug md:text-3xl">
                “{guide.dek}”
              </p>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.35em] text-sand-100/55">Logline · not a marketing line</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section id="presence" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Specialties</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">What they refuse to rush</h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {guide.specialtyItems.map((line) => (
              <RevealItem key={line}>
                <div className="h-full rounded-[1.5rem] border border-charcoal/10 bg-sand-50 px-6 py-6 shadow-soft md:px-8 md:py-7">
                  <p className="text-sm leading-relaxed text-mist md:text-base">{line}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
          <Reveal className="mt-14 grid gap-6 border-t border-charcoal/10 pt-12 md:grid-cols-3">
            <StatCard label="Walks completed" value={String(guide.completedWalks)} />
            <StatCard label="Guests who return" value={`${guide.returningGuestsPercent}%`} />
            <StatCard
              label="Verification"
              value={guide.verified ? "Atlas-verified" : "Community letters"}
            />
          </Reveal>
        </div>
      </section>

      <section id="rhythm" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Cadence</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">How replies and miles behave</h2>
        </Reveal>
        <ul className="space-y-6">
          {guide.cadenceNotes.map((note) => (
            <Reveal key={note}>
              <li className="flex gap-4 rounded-[1.5rem] border border-charcoal/10 bg-sand-50/90 px-6 py-5 shadow-soft md:px-8 md:py-6">
                <span className="mt-1 font-mono text-xs text-forest/80">—</span>
                <p className="text-base leading-relaxed text-mist">{note}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 text-sm text-charcoal/55">
          Contact channels: {guide.contactMethods.join(" · ")}
        </Reveal>
      </section>

      <section id="windows" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Seasonal windows</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">When the air cooperates</h2>
          </Reveal>
          <div className="relative ms-2 border-s border-charcoal/15 ps-8 md:ms-6 md:ps-12">
            {guide.scheduleWindows.map((w, i) => (
              <Reveal key={`${w.label}-${i}`} delay={i * 0.05}>
                <div className="relative pb-12 last:pb-0">
                  <span className="absolute -start-[calc(0.5rem+1px)] top-2 flex size-3 -translate-x-1/2 rounded-full bg-sunset shadow-[0_0_0_6px_var(--color-sand-100)] md:-start-[calc(1.5rem+1px)]" />
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-forest/80">{w.label}</p>
                  <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-mist md:text-base">{w.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-12 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Still frames</p>
          <h2 className="font-display text-4xl text-charcoal">Light they move through</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {guide.gallery.map((g, idx) => (
            <Reveal
              key={g.src}
              delay={idx * 0.05}
              className={
                idx === 0
                  ? "md:col-span-7 md:row-span-2"
                  : idx === 1
                    ? "md:col-span-5"
                    : idx === 2
                      ? "md:col-span-5"
                      : "md:col-span-7"
              }
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="h-full overflow-hidden rounded-[1.35rem] border border-charcoal/10 shadow-soft"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  className={`h-full w-full object-cover ${
                    idx === 0 ? "min-h-[280px] md:min-h-[520px]" : "aspect-[4/5] md:aspect-auto md:min-h-[240px]"
                  }`}
                  loading="lazy"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {guide.voicePull ? (
        <section
          id="voice"
          className="scroll-mt-28 border-y border-charcoal/10 bg-charcoal py-20 text-sand-50 md:py-28"
        >
          <div className="mx-auto max-w-4xl px-4 text-center md:px-10">
            <Reveal className="space-y-8">
              <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/55">Traveler voice</p>
              <p className="font-display text-3xl italic leading-snug md:text-[2.35rem]">“{guide.voicePull.quote}”</p>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-sand-100/55">{guide.voicePull.attribution}</p>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section id="reviews" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Traveler reviews</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Written beside the path</h2>
          <p className="max-w-2xl text-mist">
            Archive excerpts plus your own note — saved on this browser until you edit or clear it.
          </p>
        </Reveal>
        <TourGuideReviews guide={guide} />
      </section>

      <section id="plan" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-12 md:px-10 md:pb-20">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Hold a date gently</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Request time with {guide.name.split(" ")[0]}</h2>
        </Reveal>
        <TourGuidePlanBand slug={guide.slug} guide={guide} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 md:px-10 md:pb-36">
        <Reveal className="flex flex-wrap gap-4">
          <Link
            to="/guides"
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
          >
            Back to all guides
          </Link>
          <Link
            to="/journeys"
            className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90"
          >
            Pair with a journey
          </Link>
        </Reveal>
      </section>

      <TourGuideMobileContactBar slug={guide.slug} guide={guide} />
    </article>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-charcoal/10 bg-sand-50 px-5 py-5 shadow-soft">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-charcoal/45">{label}</p>
      <p className="mt-2 font-display text-2xl text-charcoal">{value}</p>
    </div>
  );
}

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  JourneyBookingDialog,
  JourneyEssentials,
  JourneyMetaStrip,
  JourneyMobileInquiryBar,
  JourneyPlanBand,
  JourneyReviews,
  JourneyRhythm,
  JourneyShareSave,
  JourneyVoices,
} from "@/components/journeys";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { getTour, tourCategoryLabels } from "@/data/tours";

type NavItem = { id: string; label: string };

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

export function TourDetailPage() {
  const { slug } = useParams();
  const tour = slug ? getTour(slug) : undefined;
  const heroRef = useRef<HTMLElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setNavVisible(v >= 0.88);
  });

  const navItems = useMemo<NavItem[]>(() => {
    if (!tour) return [];
    const items: NavItem[] = [
      { id: "story", label: "Story" },
      { id: "essentials", label: "Essentials" },
      { id: "rhythm", label: "Rhythm" },
      { id: "itinerary", label: "Itinerary" },
      { id: "gallery", label: "Gallery" },
      { id: "voices", label: "Voices" },
    ];
    items.push({ id: "reviews", label: "Reviews" });
    if (tour.foods.length > 0) items.push({ id: "food", label: "Food" });
    items.push({ id: "context", label: "Context" }, { id: "plan", label: "Plan" }, { id: "more", label: "More" });
    return items;
  }, [tour]);

  const onNav = useCallback(
    (id: string) => {
      if (!tour) return;
      if (id === "food" && tour.foods.length === 0) scrollToSection("context");
      else scrollToSection(id);
    },
    [tour],
  );

  if (!tour) {
    return <Navigate to="/journeys" replace />;
  }

  const showFood = tour.foods.length > 0;

  return (
    <article className="relative pb-28 lg:pb-24">
      <section ref={heroRef}>
        <ParallaxHero image={tour.coverImage} heightClass="min-h-[100svh]">
          <div className="flex flex-1 flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-5 text-sand-50"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">{tourCategoryLabels[tour.category]}</p>
              <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]">{tour.title}</h1>
              <p className="max-w-2xl text-lg text-sand-100/85">{tour.storyLead}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] uppercase tracking-[0.24em] text-sand-100/70">
                <span>{tour.region}</span>
                <span className="text-sand-100/40">·</span>
                <span>{tour.duration}</span>
                <span className="text-sand-100/40">·</span>
                <span>{tour.mood}</span>
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
          <JourneyShareSave slug={tour.slug} title={tour.title} />
        </Reveal>
        <Reveal delay={0.05} className="mt-8">
          <JourneyMetaStrip tour={tour} />
        </Reveal>
      </section>

      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal className="space-y-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Editorial</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Why this route breathes</h2>
            {tour.storyBody.map((para) => (
              <p key={para.slice(0, 32)} className="text-lg leading-relaxed text-mist md:text-xl">
                {para}
              </p>
            ))}
          </Reveal>
          {tour.heroSecondary ? (
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
                <img src={tour.heroSecondary} alt="" className="max-h-[640px] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section id="essentials" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">What travels with you</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Essentials & honest boundaries</h2>
          </Reveal>
          <JourneyEssentials included={tour.included} excluded={tour.excluded} />
        </div>
      </section>

      <section id="rhythm" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Departure cadence</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">When the route finds its pulse</h2>
        </Reveal>
        <JourneyRhythm departureRhythm={tour.departureRhythm} nextWindows={tour.nextWindows} />
      </section>

      <section id="itinerary" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Itinerary</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">A measured arc, not a spreadsheet</h2>
          </Reveal>
          <div className="relative ms-2 border-s border-charcoal/15 ps-8 md:ms-6 md:ps-12">
            {tour.itinerary.map((stop, i) => (
              <Reveal key={`${stop.label}-${stop.title}`} delay={i * 0.05}>
                <div className="relative pb-12 last:pb-0">
                  <span className="absolute -start-[calc(0.5rem+1px)] top-2 flex size-3 -translate-x-1/2 rounded-full bg-sunset shadow-[0_0_0_6px_var(--color-sand-100)] md:-start-[calc(1.5rem+1px)]" />
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-forest/80">{stop.label}</p>
                  <h3 className="mt-3 font-display text-2xl text-charcoal md:text-3xl">{stop.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-mist md:text-base">{stop.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-12 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Gallery</p>
          <h2 className="font-display text-4xl text-charcoal">Still frames from the same air</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {tour.gallery.map((g, idx) => (
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

      <section id="voices" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Traveler voices</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Notes from people who slowed down</h2>
          </Reveal>
          <JourneyVoices quotes={tour.voiceQuotes} />
        </div>
      </section>

      <section id="reviews" className="scroll-mt-28 border-t border-charcoal/10 bg-sand-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Traveler reviews</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Ratings & written notes</h2>
            <p className="max-w-2xl text-mist">
              Archive excerpts plus your own note — saved on this browser until you edit or clear it.
            </p>
          </Reveal>
          <JourneyReviews tour={tour} />
        </div>
      </section>

      {showFood ? (
        <section id="food" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Food</p>
              <h2 className="font-display text-4xl text-charcoal">Dishes that punctuate the walk</h2>
            </div>
            <p className="max-w-md text-sm text-mist">No tasting menus sold — only what locals queue for when light is honest.</p>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-2">
            {tour.foods.map((food, i) => (
              <Reveal key={food.title} delay={i * 0.06}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-sand-50 shadow-soft"
                >
                  <div className="relative aspect-[16/10]">
                    <img src={food.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                  </div>
                  <div className="space-y-3 p-6 md:p-7">
                    <h3 className="font-display text-2xl text-charcoal">{food.title}</h3>
                    <p className="text-sm leading-relaxed text-mist">{food.detail}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section
        id="context"
        className={`scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28 ${showFood ? "" : "border-t border-charcoal/10 bg-sand-50"}`}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <Reveal className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Place & culture</p>
            <h2 className="font-display text-4xl text-charcoal">Context without encyclopedia voice</h2>
          </Reveal>
          <Stagger className="space-y-6">
            {tour.context.map((c) => (
              <RevealItem key={c.title}>
                <div className="rounded-2xl border border-charcoal/10 bg-sand-100 px-6 py-5 shadow-soft md:px-8 md:py-6">
                  <h3 className="font-display text-2xl text-charcoal">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist md:text-base">{c.body}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="plan" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-12 md:px-10 md:pb-16">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Invest in the arc</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Plan with us, slowly</h2>
        </Reveal>
        <JourneyPlanBand slug={tour.slug} tour={tour} onOpenBooking={() => setBookingOpen(true)} />
      </section>

      <section id="more" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-8 md:px-10">
        <Reveal className="mb-8 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Suggested next</p>
          <h2 className="font-display text-4xl text-charcoal">Stay in the same posture</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {tour.suggested.map((s, i) => (
            <Reveal key={`${s.title}-${i}`} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-[1.5rem] border border-charcoal/10 bg-sand-50 p-6 shadow-soft">
                <h3 className="font-display text-xl text-charcoal">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{s.detail}</p>
                {s.slug ? (
                  <Link
                    to={`/journeys/${s.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-forest hover:text-sunset-deep"
                  >
                    Open journey →
                  </Link>
                ) : (
                  <span className="mt-4 text-xs uppercase tracking-[0.2em] text-charcoal/45">Notebook entry</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/journeys"
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
          >
            Back to all journeys
          </Link>
          <Link
            to="/cities"
            className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90"
          >
            Browse cities
          </Link>
        </Reveal>
      </section>

      <JourneyMobileInquiryBar slug={tour.slug} tour={tour} onOpenBooking={() => setBookingOpen(true)} />

      <JourneyBookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} tour={tour} />
    </article>
  );
}

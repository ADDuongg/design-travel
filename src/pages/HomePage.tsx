import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CityPreviewCard } from "@/components/cards/CityPreviewCard";
import { VietnamMap } from "@/components/map/VietnamMap";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { cityCards, collections, foodStories, trendingSpots } from "@/data/cities";

const heroImage =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400";

export function HomePage() {
  const featured = cityCards.slice(0, 3);

  return (
    <div className="pb-6">
      <ParallaxHero image={heroImage}>
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-6 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/80">Curated Vietnam · No bookings</p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92]">
              Chase alley kitchens, lantern dusk, and limestone fog.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-sand-100/85 md:text-lg">
              Đất Việt reads like a travel magazine you can touch — sensory routes through cities, night markets, and coastal roads with zero commerce chrome.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/cities"
                className="rounded-full bg-sunset px-7 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-sunset-deep"
              >
                Wander cities
              </Link>
              <Link
                to="/journeys"
                className="rounded-full border border-sand-50/35 px-7 py-3 text-sm font-medium text-sand-50 transition hover:border-sand-50 hover:bg-sand-50/10"
              >
                Curated journeys
              </Link>
              <a
                href="#collections"
                className="rounded-full border border-sand-50/35 px-7 py-3 text-sm font-medium text-sand-50 transition hover:border-sand-50 hover:bg-sand-50/10"
              >
                Story collections
              </a>
            </div>
          </motion.div>
          <motion.div
            aria-hidden
            className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-sand-50/55"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 4.8, repeat: Infinity }}
          >
            <span className="h-px w-14 bg-sand-50/35" />
            Scroll · cinematic pacing
          </motion.div>
        </div>
      </ParallaxHero>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 md:px-10 md:py-28">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Featured cities</p>
            <h2 className="font-display text-4xl text-charcoal md:text-5xl">Faces of Vietnam — five atmospheres</h2>
          </div>
          <Link to="/cities" className="text-sm font-semibold text-sunset-deep underline-offset-4 hover:underline">
            Open full atlas →
          </Link>
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {featured.map((city, i) => (
            <RevealItem key={city.slug}>
              <CityPreviewCard city={city} index={i} />
            </RevealItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-10">
          <Reveal className="max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Local food highlights</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Heat, herbs, and stalls that answer back</h2>
            <p className="text-mist md:text-lg">
              Vietnam feeds you before it introduces itself — plastic stools become stages for smoky grills and slow dripped coffee.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {foodStories.map((story, i) => (
              <Reveal key={story.title} delay={i * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-sand-50 shadow-soft">
                  <div className="relative aspect-[16/11]">
                    <img src={story.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-2xl text-charcoal">{story.title}</h3>
                    <p className="text-sm leading-relaxed text-mist">{story.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-20 md:px-10 md:py-28">
        <Reveal className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Trending destinations</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Beyond the capital rhythm</h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {trendingSpots.map((spot, i) => (
            <Reveal key={spot.label} delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-[1.75rem] bg-charcoal">
                <img
                  src={spot.image}
                  alt=""
                  className="h-[420px] w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-95 md:h-[480px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-2 p-8 text-sand-50">
                  <h3 className="font-display text-3xl">{spot.label}</h3>
                  <p className="text-sm text-sand-100/80">{spot.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-10 md:pb-28">
        <Reveal className="mb-10 max-w-2xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Navigate</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Interactive Vietnam map</h2>
          <p className="text-mist">
            Tap pulses — each opens an immersive dossier with culinary lore and cinematic prompts rather than ticket widgets.
          </p>
        </Reveal>
        <Reveal>
          <VietnamMap />
        </Reveal>
      </section>

      <section id="collections" className="border-t border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-10">
          <Reveal className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Story collections</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Films you walk through</h2>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {collections.map((col, i) => (
              <Reveal key={col.title} delay={i * 0.07}>
                <article className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-sand-50 shadow-soft">
                  <div className="relative aspect-[16/12]">
                    <img src={col.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="space-y-3 p-7">
                    <h3 className="font-display text-3xl text-charcoal">{col.title}</h3>
                    <p className="text-sm text-mist">{col.subtitle}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:px-10 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-14 text-sand-50 md:px-14 md:py-16">
            <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-sunset/35 blur-3xl" />
            <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.32em] text-sand-50/70">Seasonal recommendations</p>
                <h3 className="font-display text-4xl md:text-[2.75rem]">April fog on terrace ribbons · August phosphor seas</h3>
                <p className="text-sand-50/85 md:text-lg">
                  Chase shoulder seasons when storms polish limestone colors or rice floods mirrors — fewer crowds, sharper photographs, warmer bowls after dusk rides.
                </p>
              </div>
              <ul className="space-y-4 rounded-2xl bg-sand-50/10 p-6 glass-panel text-sm text-sand-50/90 md:text-base">
                <li className="flex justify-between gap-4 border-b border-sand-50/15 pb-4">
                  <span>Northern plateaus</span>
                  <span className="text-sand-50/70">Sep–Nov mist arcs</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-sand-50/15 pb-4">
                  <span>Central coast</span>
                  <span className="text-sand-50/70">Feb–Jul lantern clarity</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Mekong deltas</span>
                  <span className="text-sand-50/70">Nov–Jan dry river paths</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

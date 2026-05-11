import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

const visuals = {
  hero: u("photo-1528127269322-539801943592"),
  journal: u("photo-1476514525535-07fb3b4ae5f1"),
  archive: u("photo-1559592419-010646930cda"),
  sensoryFog: u("photo-1464822759023-fed622ff2c3b"),
  sensoryCoast: u("photo-1559827260-dc66d52bef19"),
  sensoryNight: u("photo-1583417319070-7bcbc71bcbd8"),
  closing: u("photo-1583417319070-7bcbc71bcbd8"),
};

const sensory = [
  {
    label: "Alley kitchens",
    line: "Charcoal hiss behind corrugated doors — supper before introductions.",
  },
  {
    label: "Lantern streets",
    line: "Silk light pooled on pavers, tailoring conversations to a softer tempo.",
  },
  {
    label: "Coffee culture",
    line: "Egg foam, phin drip, condensation on glass — the pause between chapters.",
  },
  {
    label: "Mountain fog",
    line: "Terraces erased and redrawn by breath; ridges appear like ink bleeding through paper.",
  },
  {
    label: "Coastal roads",
    line: "Salt film on skin, scooters leaning into bends that smell like midday fish markets.",
  },
  {
    label: "Local markets",
    line: "Wet leaves, peeled fruit, shouted prices — choreography without a conductor.",
  },
  {
    label: "Train-street tempo",
    line: "Tracks as a hallway; houses leaning in until the whistle pulls everything upright.",
  },
  {
    label: "Night lights & rain",
    line: "Neon smeared across puddles, plastic covers snapping — texture you can hear.",
  },
];

const values = [
  {
    title: "Slowness",
    body: "We privilege lingering over listing — corridors worth walking twice.",
  },
  {
    title: "Atmosphere",
    body: "Mood arrives before geography; humidity, sound, and color are geography too.",
  },
  {
    title: "Authenticity",
    body: "We stay close to how places feel lived-in, imperfect, scented, audible.",
  },
  {
    title: "Visual storytelling",
    body: "Images carry plot; type whispers narration; whitespace is pacing.",
  },
  {
    title: "Emotional discovery",
    body: "Curiosity routed through feeling — awe, tenderness, bittersweet dusk.",
  },
  {
    title: "Local immersion",
    body: "Corners that do not audition for brochures; rhythms that refuse rush.",
  },
];

export function AboutPage() {
  return (
    <div className="pb-6">
      <ParallaxHero
        image={visuals.hero}
        overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/6 to-charcoal/30"
      >
        <div className="flex min-h-[92vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-5xl flex-col gap-8 text-center text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/78">
              Đất Việt · Editorial note
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7.5vw,5.75rem)] leading-[0.95] tracking-[-0.01em]">
              A manifesto folded into fog, lanterns, and the sound of spoons on
              tin.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sand-100/86 md:text-lg">
              We are not a booking desk. We are a magazine-minded companion for
              travelers who want Vietnam to unfold like a documentary written in
              humidity and light — slow, tactile, fiercely local.
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            className="mx-auto mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.34em] text-sand-50/50"
            animate={{ opacity: [0.4, 0.95, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="h-px w-12 bg-sand-50/35" />
            Read slowly · atmosphere first
          </motion.div>
        </div>
      </ParallaxHero>

      {/* Philosophy */}
      <section
        id="philosophy"
        className="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28"
      >
        <Reveal className="max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">
            Why we wander this way
          </p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">
            Discovering Vietnam quietly, on purpose
          </h2>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist md:text-lg">
            <p>
              The country refuses a single storyline. Alley kitchens braid with
              lantern dusk; mountain fog rinses terraces until they look like
              graphite sketches; coastal highways hum with salt and karaoke
              bleeding from storefronts.{" "}
              <span className="text-charcoal/90">
                Đất Việt chooses slowness: letting place arrive before
                itineraries, honoring food as culture’s first handshake,
                insisting that hidden pockets remain hidden until you earn them
                with footsteps.
              </span>
            </p>
            <p>
              Cinematic travel, for us, is not spectacle — it’s fidelity to
              sensory truth. Noise, drizzle, incense, jasmine tea cooling in
              small cups — the palette of immersion is ordinary until you decide
              to listen.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Storytelling — alternating */}
      <section className="border-y border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-20 px-4 md:px-10">
          <Reveal className="max-w-xl space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">
              How we see the archive
            </p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">
              Curated atlas, cinematic journal
            </h2>
          </Reveal>

          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.95fr] md:gap-14">
            <Reveal>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="overflow-hidden rounded-[1.75rem] shadow-soft"
              >
                <div className="relative aspect-[16/11]">
                  <img
                    src={visuals.journal}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 via-transparent to-charcoal/20" />
                </div>
              </motion.div>
            </Reveal>
            <Reveal className="space-y-5" delay={0.06}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/40">
                Curated exploration
              </p>
              <h3 className="font-display text-3xl text-charcoal md:text-[2.25rem]">
                Routes chosen for texture, not checklists
              </h3>
              <p className="text-mist md:text-[1.05rem] md:leading-relaxed">
                Journeys read like folded magazine features — glimpses through
                kitchen steam, scooters threading markets, ridges that blush at
                sunset. Commerce never steers us; longing does.
              </p>
              <Link
                to="/journeys"
                className="inline-flex text-sm font-semibold text-sunset-deep underline-offset-4 hover:underline"
              >
                Open curated journeys →
              </Link>
            </Reveal>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.1fr] md:gap-14">
            <Reveal className="order-2 space-y-5 md:order-1" delay={0.05}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/40">
                Visual travel journal
              </p>
              <h3 className="font-display text-3xl text-charcoal md:text-[2.25rem]">
                Images as handwriting, captions as whisper
              </h3>
              <p className="text-mist md:text-[1.05rem] md:leading-relaxed">
                Photography here is pacing: wide shots for longing, tighter
                frames when detail matters — knuckles on a phin press, rainwater
                collecting in a tarp’s fold. Typography keeps the narration
                human; interface stays recessive so the atmosphere can lead.
              </p>
              <Link
                to="/cities"
                className="inline-flex text-sm font-semibold text-sunset-deep underline-offset-4 hover:underline"
              >
                Wander cities · five moods →
              </Link>
            </Reveal>
            <Reveal className="order-1 md:order-2">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="overflow-hidden rounded-[1.75rem] shadow-soft"
              >
                <div className="relative aspect-[16/11]">
                  <img
                    src={visuals.archive}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-charcoal/35 via-transparent to-charcoal/25" />
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sensory Vietnam */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <img
          src={visuals.sensoryFog}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-50/92 to-sand-100" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">
              Sensory atlas
            </p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.8rem]">
              Vietnam, taught through sensation
            </h2>
            <p className="text-mist md:text-lg">
              These are not “features”. They’re the tonal notes we keep
              returning to when we edit light, copy, and motion — the evidence
              that travel here is orchestral, never flat.
            </p>
          </Reveal>
          <Stagger className="grid gap-8 md:grid-cols-2" stagger={0.07}>
            {sensory.map((item) => (
              <RevealItem key={item.label}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-charcoal/10 bg-sand-50/80 p-8 shadow-soft backdrop-blur-[2px]"
                >
                  <p className="font-display text-2xl text-charcoal">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {item.line}
                  </p>
                </motion.article>
              </RevealItem>
            ))}
          </Stagger>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.65rem]">
                <img
                  src={visuals.sensoryCoast}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-6 px-6 font-display text-2xl text-sand-50 md:text-[1.85rem]">
                  Coastline as moving manuscript
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative overflow-hidden rounded-[1.65rem]">
                <img
                  src={visuals.sensoryNight}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-6 px-6 font-display text-2xl text-sand-50 md:text-[1.85rem]">
                  Urban electricity, humane scale
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Editorial values */}
      <section className="border-y border-charcoal/10 bg-charcoal px-4 py-20 text-sand-50 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <Reveal className="max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/65">
              Tone we protect
            </p>
            <h2 className="font-display text-4xl leading-tight md:text-[2.8rem]">
              Editorial vows — not KPIs
            </h2>
            <p className="text-sand-100/75 md:text-[1.05rem] md:leading-relaxed">
              Holding lines so the experience stays human: atmosphere before
              conversion, intimacy before scale, longing before logistics.
            </p>
          </Reveal>
          <Stagger className="grid gap-10 md:grid-cols-2" stagger={0.09}>
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="border-b border-sand-50/15 pb-8">
                  <p className="font-display text-2xl">{v.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-sand-100/74">
                    {v.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-4xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="space-y-10">
          <p className="text-[11px] uppercase tracking-[0.34em] text-forest">
            Journey manifesto
          </p>
          <blockquote className="space-y-8">
            <p className="font-display text-[clamp(2rem,4.8vw,3.35rem)] leading-[1.12] text-charcoal">
              Travel owes you memory, not velocity. Vietnam rewards the curious
              who accept humidity as a pause mark, detours as grace notes, and
              strangers’ chopsticks tapping rhythm against tin bowls as
              percussion for the night.
            </p>
            <p className="text-lg leading-relaxed text-mist md:text-xl">
              This land deserves cinematic patience — lanterns measured in
              breathing room, ridges allowed to veil and unveil, narratives that
              concede commerce is peripheral to appetite, sound, devotion, and
              dusk.{" "}
              <span className="text-charcoal/95">
                We keep discovery human: no dashboards masquerading as poetry,
                no engine noise where a story should be whispered.
              </span>
            </p>
          </blockquote>
        </Reveal>
      </section>

      {/* Closing */}
      <ParallaxHero
        image={visuals.closing}
        overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/20"
      >
        <div className="flex min-h-[88vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-40">
          <Reveal className="max-w-2xl space-y-7 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.36em] text-sand-100/75">
              Return to the atlas
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,3.85rem)] leading-[1.05]">
              Stay longer in the margins than the marquee.
            </h2>
            <p className="text-base leading-relaxed text-sand-100/85 md:text-lg">
              Let alley steam write your captions. Follow mountains until they
              blush. Carry this magazine spirit into night markets you did not
              rehearse — we built Đất Việt so those nights have a quieter map.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/provinces"
                className="rounded-full bg-sunset px-7 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-sunset-deep"
              >
                Provinces atlas
              </Link>
              <Link
                to="/journeys"
                className="rounded-full border border-sand-50/35 px-7 py-3 text-sm font-medium text-sand-50 transition hover:border-sand-50 hover:bg-sand-50/10"
              >
                Curated journeys
              </Link>
              <Link
                to="/"
                className="rounded-full border border-transparent px-7 py-3 text-sm font-medium text-sand-50/82 underline-offset-[6px] transition hover:text-sand-50 hover:underline"
              >
                Homepage →
              </Link>
            </div>
          </Reveal>
        </div>
      </ParallaxHero>
    </div>
  );
}

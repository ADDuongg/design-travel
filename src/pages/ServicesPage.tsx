import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

const visuals = {
  hero: u("photo-1469854523086-cc02fe5d8800"),
  cityJourney: u("photo-1559592419-010646930cda"),
  food: u("photo-1555396273-367ea4eb4db5"),
  hidden: u("photo-1528181304800-259b08848529"),
  cultural: u("photo-1528127269322-539801943592"),
  coffeeNight: u("photo-1495474472287-4d71bcdd2085"),
  guidance: u("photo-1476514525535-07fb3b4ae5f1"),
  atmosphere: u("photo-1559827260-dc66d52bef19"),
  mountain: u("photo-1464822759023-fed622ff2c3b"),
  lanterns: u("photo-1540998145336-ab74febec946"),
  coastal: u("photo-1507525428034-b723cf961d3e"),
  fog: u("photo-1506905925346-21bda4d32df4"),
  cafe: u("photo-1517248135467-4c7edcad34c4"),
  alley: u("photo-1583417319070-7bcbc71bcbd8"),
  district: u("photo-1560493677328-b02f716703d6"),
  closing: u("photo-1528183429757-a51288d8fbaa"),
};

const experienceOffers = [
  {
    eyebrow: "City rhythms",
    title: "Curated city journeys",
    body:
      "Blocks paced like film reels — train-street hush, colonial balconies catching dusk, scooters knitting neon into humidity. We choreograph mood before mileage.",
    image: visuals.cityJourney,
    gradient: "from-charcoal/42 via-transparent to-charcoal/22",
    link: { to: "/cities", label: "Explore cities · five moods →" },
    imageFirst: true,
  },
  {
    eyebrow: "Appetite as compass",
    title: "Food exploration experiences",
    body:
      "Steam becomes narration: broth clarity, herb scissors clicking, plastic stools arranged like stage seating. No checklist hunger — only sensory arcs worth lingering inside.",
    image: visuals.food,
    gradient: "from-charcoal/38 via-transparent to-charcoal/26",
    link: { to: "/journeys", label: "Taste-led journeys →" },
    imageFirst: false,
  },
  {
    eyebrow: "Margins on purpose",
    title: "Hidden local discovery",
    body:
      "Alleys that tighten until sound muffles, rooftop corners where laundry paints breeze, stairwells scented with jasmine tea. Geography revealed through patience, not pins.",
    image: visuals.hidden,
    gradient: "from-charcoal/45 via-transparent to-charcoal/18",
    link: { to: "/provinces", label: "Province atlas →" },
    imageFirst: true,
  },
  {
    eyebrow: "Ritual & resonance",
    title: "Cultural storytelling routes",
    body:
      "Temple incense threading fog, festival drums softened by rain tarp percussion — routes edited so belief and festivity read as atmosphere, not anthropology slides.",
    image: visuals.cultural,
    gradient: "from-charcoal/36 via-transparent to-charcoal/28",
    link: { to: "/journeys", label: "Cultural arcs →" },
    imageFirst: false,
  },
  {
    eyebrow: "Night hum",
    title: "Coffee & night-market exploration",
    body:
      "Phin drip slowing clocks; fluorescent aisles where fruit knives spark polite bargaining. We pair caffeine patience with sodium glow — two languages of Vietnamese evening.",
    image: visuals.coffeeNight,
    gradient: "from-charcoal/40 via-transparent to-charcoal/24",
    link: { to: "/journeys", label: "Nocturnal lanes →" },
    imageFirst: true,
  },
  {
    eyebrow: "Frames & fog",
    title: "Cinematic travel guidance",
    body:
      "Light direction as kindness — when to climb for mist burn-off, when to descend into lantern pools. Guidance feels like a cinematographer whispering, not a dispatcher routing.",
    image: visuals.guidance,
    gradient: "from-charcoal/34 via-transparent to-charcoal/30",
    link: { to: "/about", label: "Our editorial vow →" },
    imageFirst: false,
  },
  {
    eyebrow: "Collections",
    title: "Local atmosphere archives",
    body:
      "Mood boards stitched from humidity grades, horn cadences, rain tempo on corrugated roofs — atmospheric bundles you wander through instead of purchase.",
    image: visuals.atmosphere,
    gradient: "from-charcoal/41 via-transparent to-charcoal/20",
    link: { to: "/", label: "Seasonal collections →" },
    imageFirst: true,
  },
];

const showcase = [
  { src: visuals.mountain, line: "Mountain routes — terraces erased, redrawn by fog breath." },
  { src: visuals.lanterns, line: "Lantern streets — silk light slowing every negotiation." },
  { src: visuals.coastal, line: "Coastal roads — salt film, open horizon, exhale curves." },
  { src: visuals.fog, line: "Foggy mornings — ridges borrowing pencil from clouds." },
  { src: visuals.cafe, line: "Local cafés — condensation grammar on slow glasses." },
  { src: visuals.alley, line: "Hidden alley kitchens — charcoal hiss behind modest doors." },
  { src: visuals.district, line: "Cultural districts — heritage woven into everyday commerce." },
];

const flow = [
  {
    word: "Discover",
    line: "Let headlines dissolve into humidity — maps suggested, never shouted.",
  },
  {
    word: "Wander",
    line: "Footsteps edit the day; detours earn their own typography.",
  },
  {
    word: "Immerse",
    line: "Sound, steam, and pigment become orientation — not icons on glass.",
  },
  {
    word: "Connect",
    line: "Conversation over counters; eyes meeting across broth steam.",
  },
  {
    word: "Remember",
    line: "Carry scenes like folded negatives — tactile, imperfect, true.",
  },
];

export function ServicesPage() {
  return (
    <div className="pb-6">
      <ParallaxHero image={visuals.hero} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/48 to-charcoal/28">
        <div className="flex min-h-[92vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-5xl flex-col gap-8 text-center text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/78">Đất Việt · Offerings</p>
            <h1 className="font-display text-[clamp(2.45rem,7.4vw,5.65rem)] leading-[0.95] tracking-[-0.01em]">
              Journeys designed through atmosphere — not itineraries sold as inventory.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sand-100/88 md:text-lg">
              Vietnam experienced beyond spreadsheets: curated exploration, cinematic pacing, and sensory storytelling woven across cities, coastlines, and alleys that never audition for brochures.
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            className="mx-auto mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.34em] text-sand-50/50"
            animate={{ opacity: [0.4, 0.95, 0.4] }}
            transition={{ duration: 5.1, repeat: Infinity }}
          >
            <span className="h-px w-12 bg-sand-50/35" />
            Editorial services · human tempo
          </motion.div>
        </div>
      </ParallaxHero>

      {/* Editorial introduction */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">What we craft together</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Exploration services — imagined as magazine fragments</h2>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist md:text-lg">
            <p>
              Think of these offerings as{" "}
              <span className="text-charcoal/92">
                cinematic discovery journeys: immersive local storytelling, appetite-led wandering, and atmosphere-first guidance
              </span>{" "}
              — never a booking ledger dressed in prettier chrome.
            </p>
            <p>
              Each module honors slow travel, sensory fidelity, and emotional immersion. Commerce stays peripheral; longing leads — whether you are chasing fog on pine ridges or neon dragged across wet pavement after midnight.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Service experiences — alternating editorial layouts */}
      <section className="border-y border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-24 px-4 md:space-y-28 md:px-10">
          <Reveal className="max-w-xl space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Immersive chapters</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Seven atmospheres we steward</h2>
            <p className="text-mist md:text-[1.05rem] md:leading-relaxed">
              Postcard compositions — imagery carries plot; copy keeps whisper pace. Tap links like annotations, not checkout lanes.
            </p>
          </Reveal>

          {experienceOffers.map((block) => (
            <div key={block.title} className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
              <Reveal className={block.imageFirst ? "" : "md:order-2"}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="overflow-hidden rounded-[1.75rem] shadow-soft">
                  <div className="relative aspect-[16/11]">
                    <img src={block.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${block.gradient}`} />
                  </div>
                </motion.div>
              </Reveal>
              <Reveal className={`space-y-5 ${block.imageFirst ? "" : "md:order-1"}`} delay={0.06}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/40">{block.eyebrow}</p>
                <h3 className="font-display text-3xl text-charcoal md:text-[2.25rem]">{block.title}</h3>
                <p className="text-mist md:text-[1.05rem] md:leading-relaxed">{block.body}</p>
                <Link to={block.link.to} className="inline-flex text-sm font-semibold text-sunset-deep underline-offset-4 hover:underline">
                  {block.link.label}
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Journey showcase */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <img src={visuals.fog} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 grayscale" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-50/94 to-sand-100" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Visual atlas</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.8rem]">Scenes we design journeys around</h2>
            <p className="text-mist md:text-lg">
              Imagery dominates structure — each frame is invitation, not decoration. Hover lifts gently; pacing stays cinematic.
            </p>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {showcase.map((frame) => (
              <RevealItem key={frame.line}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden rounded-[1.65rem] shadow-soft">
                  <div className="relative aspect-[16/11]">
                    <img src={frame.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/72 via-charcoal/15 to-transparent" />
                    <p className="absolute inset-x-0 bottom-5 px-5 font-display text-xl leading-snug text-sand-50 md:text-[1.35rem]">{frame.line}</p>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-charcoal/10 bg-charcoal px-4 py-20 text-sand-50 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl space-y-10">
          <Reveal className="max-w-3xl space-y-5">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/65">Philosophy of exploration</p>
            <h2 className="font-display text-4xl leading-tight md:text-[2.75rem]">Slow travel, sensory honesty, atmosphere before logistics</h2>
            <div className="space-y-5 text-sand-100/78 md:text-[1.05rem] md:leading-relaxed">
              <p>
                We resist optimization language — no funnels disguised as poetry. Services breathe through emotional immersion: fog as punctuation, broth steam as orientation, lantern blush as clock.
              </p>
              <p>
                Authentic discovery means granting places their uneven rhythms — scooters arguing at intersections, sudden rain improvising a roof chorus, elders claiming sidewalks with low plastic stools.
                {" "}
                <span className="text-sand-50/92">
                  Sensory storytelling stays our north star; anything transactional must stay quieter than the alley kitchens we praise.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience flow */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14 max-w-2xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Curated rhythm</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">How presence unfolds here</h2>
          <p className="text-mist md:text-lg">
            Not a diagram — a sentence spoken across five breaths. Each beat is editorial pacing, not pipeline jargon.
          </p>
        </Reveal>
        <Stagger className="grid gap-8 md:grid-cols-5 md:gap-6" stagger={0.08}>
          {flow.map((step) => (
            <RevealItem key={step.word}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="rounded-3xl border border-charcoal/10 bg-sand-50/85 p-7 shadow-soft backdrop-blur-[2px]"
              >
                <p className="font-display text-2xl text-charcoal">{step.word}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist">{step.line}</p>
              </motion.article>
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {/* Closing */}
      <ParallaxHero image={visuals.closing} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/52 to-charcoal/22">
        <div className="flex min-h-[88vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-40">
          <Reveal className="max-w-2xl space-y-7 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.36em] text-sand-100/75">Invitation, not invoice</p>
            <h2 className="font-display text-[clamp(2.2rem,5.4vw,3.75rem)] leading-[1.05]">Carry Vietnam as atmosphere — long after the screen dims.</h2>
            <p className="text-base leading-relaxed text-sand-100/85 md:text-lg">
              Wander provinces for mood maps, cities for personality weather, journeys for sensory arcs. When you are ready for correspondence, we listen like editors — calm, human, unhurried.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/journeys"
                className="rounded-full bg-sunset px-7 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-sunset-deep"
              >
                Curated journeys
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-sand-50/35 px-7 py-3 text-sm font-medium text-sand-50 transition hover:border-sand-50 hover:bg-sand-50/10"
              >
                Begin a conversation
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

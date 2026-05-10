import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

const visuals = {
  hero: u("photo-1528127269322-539801943592"),
  featured1: u("photo-1540998145336-ab74febec946"),
  featured2: u("photo-1583417319070-7bcbc71bcbd8"),
  closing: u("photo-1476514525535-07fb3b4ae5f1"),
};

const chapters = [
  {
    n: "01",
    title: "Lantern nights",
    verse: "Silk light negotiates with shadow until the street forgets hurry.",
    body:
      "A chapter written in blush and brass — reflections gathered on water, vendors pausing mid-sentence, the humid vowels of evening eased into amber.",
    images: [
      { src: u("photo-1540998145336-ab74febec946"), aspect: "aspect-[4/5]", span: "md:col-span-5" },
      { src: u("photo-1555396273-367ea4eb4db5"), aspect: "aspect-[16/11]", span: "md:col-span-7" },
    ],
    tint: "from-charcoal/38 via-transparent to-charcoal/16",
  },
  {
    n: "02",
    title: "Fog & pine",
    verse: "Mountains borrow pencil from clouds; terraces erase, then return.",
    body:
      "Pine resin and drizzle become a single scent. Roads narrow until headlights feel like conversation — one beam acknowledging another through the mute grammar of fog.",
    images: [
      { src: u("photo-1464822759023-fed622ff2c3b"), aspect: "aspect-[16/10]", span: "md:col-span-7" },
      { src: u("photo-1506905925346-21bda4d32df4"), aspect: "aspect-[3/4]", span: "md:col-span-5" },
    ],
    tint: "from-charcoal/34 via-transparent to-charcoal/22",
  },
  {
    n: "03",
    title: "Alley kitchens",
    verse: "Charcoal hisses behind modest doors — supper before introductions.",
    body:
      "Steam carries plot: shallots sweating, fish sauce brightening air, plastic stools claiming sidewalk like honest punctuation. Noise is intimacy here; appetite is orientation.",
    images: [
      { src: u("photo-1583417319070-7bcbc71bcbd8"), aspect: "aspect-[5/6]", span: "md:col-span-4" },
      { src: u("photo-1551218808-94e220e084d2"), aspect: "aspect-[16/11]", span: "md:col-span-8" },
    ],
    tint: "from-charcoal/42 via-transparent to-charcoal/18",
  },
  {
    n: "04",
    title: "Coastal silence",
    verse: "Salt writes a thin script on skin; horizons refuse deadlines.",
    body:
      "Fishing arcs at dawn, tarps snapping polite greetings, scooters leaning into bends that smell of midday catch — the coast as exhale, rhythm measured by tide instead of clock.",
    images: [
      { src: u("photo-1559827260-dc66d52bef19"), aspect: "aspect-[16/9]", span: "md:col-span-8" },
      { src: u("photo-1507525428034-b723cf961d3e"), aspect: "aspect-[4/5]", span: "md:col-span-4" },
    ],
    tint: "from-charcoal/32 via-transparent to-charcoal/20",
  },
  {
    n: "05",
    title: "Neon rain",
    verse: "Color dragged through puddles — city as wet manuscript.",
    body:
      "Rain collaborates with fluorescence; scooters sketch light trails; awnings drum a tempo you walk inside. Nothing is sterile — texture arrives with sound.",
    images: [
      { src: u("photo-1548919973-5cef6c43b3e1"), aspect: "aspect-[3/4]", span: "md:col-span-5" },
      { src: u("photo-1559827260-dc66d52bef19"), aspect: "aspect-[16/10]", span: "md:col-span-7" },
    ],
    hint: "Urban drizzle, signage bleed, motion suggested — not spectacle for its own sake.",
    tint: "from-charcoal/48 via-charcoal/10 to-charcoal/24",
  },
  {
    n: "06",
    title: "Coffee corners",
    verse: "Phin drip slows clocks; condensation is its own punctuation.",
    body:
      "Egg foam, slow glasses, tiled floors recording decades of chair scrapes — cafés as editorial rooms where Vietnam edits the afternoon into patience, humor, and small sweetness.",
    images: [
      { src: u("photo-1495474472287-4d71bcdd2085"), aspect: "aspect-[16/11]", span: "md:col-span-7" },
      { src: u("photo-1517248135467-4c7edcad34c4"), aspect: "aspect-[4/5]", span: "md:col-span-5" },
    ],
    tint: "from-charcoal/36 via-transparent to-charcoal/18",
  },
  {
    n: "07",
    title: "River light",
    verse: "Morning lifts in thin sheets — water holding sky until both agree.",
    body:
      "Misty embankments, washing lines echoing bridges, boats stitching currents with diesel patience — rivers organize cities emotionally before they organize them geographically.",
    images: [
      { src: u("photo-1469474968028-56623f02e42e"), aspect: "aspect-[16/10]", span: "md:col-span-6" },
      { src: u("photo-1501785888031-b535ceb22159"), aspect: "aspect-[16/10]", span: "md:col-span-6" },
    ],
    tint: "from-charcoal/30 via-transparent to-charcoal/16",
  },
  {
    n: "08",
    title: "Hidden courtyards",
    verse: "Thresholds earned quiet — courtyards hum with private weather.",
    body:
      "Walls cup sound differently than streets; bonsai and laundry negotiate sunlight; tea cools while neighbors trade news across wells of shade — domestic mythologies held in tile.",
    images: [
      { src: u("photo-1528183429757-a51288d8fbaa"), aspect: "aspect-[5/6]", span: "md:col-span-4" },
      { src: u("photo-1560493677328-b02f716703d6"), aspect: "aspect-[16/11]", span: "md:col-span-8" },
    ],
    tint: "from-charcoal/40 via-transparent to-charcoal/22",
  },
  {
    n: "09",
    title: "Train street echoes",
    verse: "Metal as corridor; houses leaning in until whistles realign space.",
    body:
      "Folded chairs, sudden hush, breath shared with strangers — proximity staged without performance. The train passes; ordinary life reasserts itself like a tide.",
    images: [
      { src: u("photo-1559592419-010646930cda"), aspect: "aspect-[16/10]", span: "md:col-span-7" },
      { src: u("photo-1528181304800-259b08848529"), aspect: "aspect-[3/4]", span: "md:col-span-5" },
    ],
    tint: "from-charcoal/44 via-transparent to-charcoal/20",
  },
  {
    n: "10",
    title: "Mountain roads",
    verse: "Curves teach humility; vistas repay it with silence you can wear.",
    body:
      "Switchbacks sketch nerve against beauty — rice terraces, limestone sentinels, mist erasing distance until the next bend reintroduces the world with gentler contrast.",
    images: [
      { src: u("photo-1469854523086-cc02fe5d8800"), aspect: "aspect-[16/9]", span: "md:col-span-8" },
      { src: u("photo-1500530855697-b586d89ba3ee"), aspect: "aspect-[4/5]", span: "md:col-span-4" },
    ],
    tint: "from-charcoal/34 via-transparent to-charcoal/24",
  },
] as const;

const storyStills = [
  { src: u("photo-1564760055777-d84952466adc"), line: "Scooter blur — city humming in polite impatience." },
  { src: u("photo-1528164344705-47542687000d"), line: "Market bronze — fruit knives catching polite bargaining." },
  { src: u("photo-1508009606055-2efff3cdad48"), line: "Rice terraces — graphite steps rinsed by brief sun." },
];

function FrameCluster({
  images,
  tint,
}: {
  images: readonly { src: string; aspect: string; span: string }[];
  tint: string;
}) {
  return (
    <div className={`grid gap-5 md:grid-cols-12 md:gap-6`}>
      {images.map((im) => (
        <Reveal key={im.src} className={im.span}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[1.65rem] shadow-soft"
          >
            <div className={`relative ${im.aspect} w-full`}>
              <img src={im.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${tint}`} />
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

export function GalleryPage() {
  return (
    <div className="pb-6">
      <ParallaxHero image={visuals.hero} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-charcoal/25">
        <div className="flex min-h-[92vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-5xl flex-col gap-8 text-center text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/78">Đất Việt · Visual archive</p>
            <h1 className="font-display text-[clamp(2.45rem,7.2vw,5.55rem)] leading-[0.95] tracking-[-0.01em]">
              Fragments of Vietnam — light, smoke, rain, and the country between moments.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sand-100/86 md:text-lg">
              Stories held in still frames: not a stock library, not a portfolio grid — a slow walk through atmospheric memory, edited like a travel essay you can breathe inside.
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            className="mx-auto mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.34em] text-sand-50/50"
            animate={{ opacity: [0.4, 0.95, 0.4] }}
            transition={{ duration: 5.2, repeat: Infinity }}
          >
            <span className="h-px w-12 bg-sand-50/35" />
            Browse slowly · mood before category
          </motion.div>
        </div>
      </ParallaxHero>

      {/* Editorial introduction */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">A cinematic memory collection</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Atmosphere first — captions kept whisper-quiet</h2>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist md:text-lg">
            <p>
              This gallery behaves like a field notebook rendered large: sensory journeys through{" "}
              <span className="text-charcoal/92">lantern blush, mountain breath, alley steam, and neon dragged through storms</span>{" "}
              — arranged in chapters, not SKUs.
            </p>
            <p>
              Let rhythm vary; let negative space be part of the image. We avoid crowded masonry and marketplace grids — the sequence should feel like turning heavy magazine leaves, not scanning a catalog.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Chapters 1–3 */}
      <section className="border-y border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-24 px-4 md:space-y-28 md:px-10">
          {chapters.slice(0, 3).map((ch) => (
            <article key={ch.n} className="space-y-10 md:space-y-12">
              <Reveal className="max-w-3xl space-y-5">
                <p className="text-[11px] uppercase tracking-[0.34em] text-charcoal/45">Chapter · {ch.n}</p>
                <h2 className="font-display text-[clamp(2rem,4vw,2.85rem)] text-charcoal">{ch.title}</h2>
                <p className="font-display text-xl italic text-forest md:text-[1.35rem]">{ch.verse}</p>
                <p className="text-mist md:text-[1.05rem] md:leading-relaxed">{ch.body}</p>
                {"hint" in ch && ch.hint ? (
                  <p className="border-s-2 border-sunset/55 ps-4 text-sm leading-relaxed text-charcoal/70">{ch.hint}</p>
                ) : null}
              </Reveal>
              <FrameCluster images={ch.images} tint={ch.tint} />
            </article>
          ))}
        </div>
      </section>

      {/* Featured frame */}
      <ParallaxHero
        image={visuals.featured1}
        heightClass="min-h-[76vh]"
        overlayClass="absolute inset-0 bg-gradient-to-r from-charcoal/72 via-charcoal/38 to-charcoal/18"
      >
        <div className="flex min-h-[76vh] flex-col justify-center px-6 py-24 md:px-14">
          <Reveal className="max-w-xl space-y-5 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/72">Featured frame</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">Documentary still — lantern glass catching breath.</h2>
            <p className="text-base leading-relaxed text-sand-100/84 md:text-[1.05rem]">
              Some images need the whole stage. Not every story fits a tile — some insist on occupying your periphery until you slow down enough to notice the sound implied in the light.
            </p>
          </Reveal>
        </div>
      </ParallaxHero>

      {/* Chapters 4–6 */}
      <section className="mx-auto max-w-6xl space-y-24 px-4 py-20 md:space-y-28 md:px-10 md:py-28">
        {chapters.slice(3, 6).map((ch) => (
          <article key={ch.n} className="space-y-10 md:space-y-12">
            <Reveal className="max-w-3xl space-y-5">
              <p className="text-[11px] uppercase tracking-[0.34em] text-charcoal/45">Chapter · {ch.n}</p>
              <h2 className="font-display text-[clamp(2rem,4vw,2.85rem)] text-charcoal">{ch.title}</h2>
              <p className="font-display text-xl italic text-forest md:text-[1.35rem]">{ch.verse}</p>
              <p className="text-mist md:text-[1.05rem] md:leading-relaxed">{ch.body}</p>
              {"hint" in ch && ch.hint ? (
                <p className="border-s-2 border-sunset/55 ps-4 text-sm leading-relaxed text-charcoal/70">{ch.hint}</p>
              ) : null}
            </Reveal>
            <FrameCluster images={ch.images} tint={ch.tint} />
          </article>
        ))}
      </section>

      {/* Featured frame 2 */}
      <ParallaxHero
        image={visuals.featured2}
        heightClass="min-h-[74vh]"
        overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal/78 via-charcoal/32 to-charcoal/14"
      >
        <div className="flex min-h-[74vh] flex-col justify-end px-6 pb-16 pt-28 md:px-14 md:pb-20">
          <Reveal className="max-w-2xl space-y-5 pb-6 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/72">Still · night texture</p>
            <h2 className="font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.08]">Alley kitchens after dark — steam as narration.</h2>
            <p className="text-sm leading-relaxed text-sand-100/78 md:text-base">
              Heat, charcoal, neon leaking from signs — a single frame can hold an entire city’s appetite if you let it be large enough.
            </p>
          </Reveal>
        </div>
      </ParallaxHero>

      {/* Chapters 7–10 */}
      <section className="border-y border-charcoal/10 bg-sand-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-24 px-4 md:space-y-28 md:px-10">
          {chapters.slice(6).map((ch) => (
            <article key={ch.n} className="space-y-10 md:space-y-12">
              <Reveal className="max-w-3xl space-y-5">
                <p className="text-[11px] uppercase tracking-[0.34em] text-charcoal/45">Chapter · {ch.n}</p>
                <h2 className="font-display text-[clamp(2rem,4vw,2.85rem)] text-charcoal">{ch.title}</h2>
                <p className="font-display text-xl italic text-forest md:text-[1.35rem]">{ch.verse}</p>
                <p className="text-mist md:text-[1.05rem] md:leading-relaxed">{ch.body}</p>
              </Reveal>
              <FrameCluster images={ch.images} tint={ch.tint} />
            </article>
          ))}
        </div>
      </section>

      {/* Visual storytelling — slow strip */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <img src={visuals.closing} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-50/96 to-sand-100" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 max-w-3xl space-y-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Visual essay · fragments</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Sensory captions — three stills, three tides</h2>
            <p className="text-mist md:text-lg">
              Imagery, copy, and pacing layered without hurry. Let each frame breathe; let the eye travel at foot-speed, not scroll-speed.
            </p>
          </Reveal>
          <Stagger className="grid gap-8 lg:grid-cols-3" stagger={0.09}>
            {storyStills.map((s) => (
              <RevealItem key={s.line}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="overflow-hidden rounded-[1.7rem] border border-charcoal/10 bg-sand-50/70 shadow-soft backdrop-blur-[2px]"
                >
                  <div className="relative aspect-[16/11]">
                    <img src={s.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                  </div>
                  <p className="px-6 py-5 text-sm leading-relaxed text-mist">{s.line}</p>
                </motion.article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Closing */}
      <ParallaxHero image={visuals.closing} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/20">
        <div className="flex min-h-[88vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-40">
          <Reveal className="max-w-2xl space-y-7 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.36em] text-sand-100/75">Fade quiet</p>
            <h2 className="font-display text-[clamp(2.15rem,5.2vw,3.6rem)] leading-[1.06]">Carry the frames — then go make your own weather in the streets.</h2>
            <p className="text-base leading-relaxed text-sand-100/85 md:text-lg">
              This archive ends where your footsteps begin. Wander provinces for mood maps, cities for personality weather, journeys for sensory arcs — let Vietnam stay cinematic, human, and beautifully incomplete.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/provinces"
                className="rounded-full bg-sunset px-7 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-sunset-deep"
              >
                Province atlas
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

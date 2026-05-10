import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import {
  teamInterludeQuote,
  teamPortraitChapters,
  teamVisuals,
  type TeamPortraitChapter,
} from "@/data/team";

function PortraitFrame({
  chapter,
  tint,
}: {
  chapter: TeamPortraitChapter;
  tint: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="overflow-hidden rounded-[1.75rem] shadow-soft"
    >
      <div className="relative aspect-[4/5] md:aspect-[3/4]">
        <img
          src={chapter.portrait.src}
          alt={chapter.portrait.alt}
          className="h-full w-full object-cover object-[center_22%]"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${tint}`} />
        <p className="absolute inset-x-0 bottom-6 px-6 font-display text-2xl text-sand-50 md:text-[1.85rem]">
          {chapter.givenName}
        </p>
      </div>
    </motion.div>
  );
}

function SecondaryCluster({ chapter }: { chapter: TeamPortraitChapter }) {
  if (!chapter.secondaryStill) return null;
  return (
    <div className="grid gap-5 md:grid-cols-12 md:gap-6">
      <Reveal className="md:col-span-7">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.65rem] shadow-soft"
        >
          <div className={`relative ${chapter.secondaryStill.aspect} w-full`}>
            <img
              src={chapter.secondaryStill.src}
              alt={chapter.secondaryStill.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/38 via-transparent to-charcoal/14" />
          </div>
        </motion.div>
      </Reveal>
    </div>
  );
}

function PortraitChapterBlock({
  chapter,
  index,
}: {
  chapter: TeamPortraitChapter;
  index: number;
}) {
  const reverse = index % 2 === 1;
  const tint =
    index % 2 === 0
      ? "from-charcoal/52 via-charcoal/15 to-charcoal/25"
      : "from-charcoal/48 via-charcoal/12 to-charcoal/28";

  const portraitCol = (
    <Reveal>
      <PortraitFrame chapter={chapter} tint={tint} />
    </Reveal>
  );

  const textCol = (
    <div className="space-y-6">
      <Reveal className="space-y-4" delay={0.05}>
        <p className="text-[11px] uppercase tracking-[0.34em] text-charcoal/45">Scene · {chapter.scene}</p>
        <h2 className="font-display text-[clamp(2rem,4vw,2.85rem)] text-charcoal">{chapter.givenName}</h2>
        <p className="font-display text-lg italic text-forest md:text-[1.2rem]">{chapter.descriptor}</p>
        <p className="text-[11px] uppercase tracking-[0.26em] text-charcoal/40">{chapter.vietnamAnchor}</p>
      </Reveal>
      <Reveal className="space-y-5" delay={0.08}>
        <p className="font-display text-xl italic text-charcoal/88 md:text-[1.35rem]">{chapter.verse}</p>
        <div className="space-y-4 text-mist md:text-[1.05rem] md:leading-relaxed">
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </div>
  );

  return (
    <article className="space-y-12 md:space-y-14">
      <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.95fr] md:gap-14">
        {reverse ? (
          <>
            {textCol}
            {portraitCol}
          </>
        ) : (
          <>
            {portraitCol}
            {textCol}
          </>
        )}
      </div>
      <SecondaryCluster chapter={chapter} />
    </article>
  );
}

export function TeamPage() {
  const [firstPair, secondPair] = [
    teamPortraitChapters.slice(0, 2),
    teamPortraitChapters.slice(2, 4),
  ];

  return (
    <div className="pb-6">
      <ParallaxHero image={teamVisuals.hero} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/5 to-charcoal/35">
        <div className="flex min-h-[92vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-5xl flex-col gap-8 text-center text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/78">Đất Việt · Field witnesses</p>
            <h1 className="font-display text-[clamp(2.45rem,7.2vw,5.55rem)] leading-[0.95] tracking-[-0.01em]">
              The people who walk slowly enough for Vietnam to speak in full sentences.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sand-100/86 md:text-lg">
              A documentary lens on the storytellers behind this atlas — not an org chart, not headshots for investors — portraits of patience, appetite, and fidelity to atmosphere.
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            className="mx-auto mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.34em] text-sand-50/50"
            animate={{ opacity: [0.4, 0.95, 0.4] }}
            transition={{ duration: 5.2, repeat: Infinity }}
          >
            <span className="h-px w-12 bg-sand-50/35" />
            Warmth first · credentials never
          </motion.div>
        </div>
      </ParallaxHero>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Why humans lead the map</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Exploration edited like film — scenes, breath, texture</h2>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist md:text-lg">
            <p>
              Vietnam refuses to be reduced into bullet points.{" "}
              <span className="text-charcoal/90">
                The voices gathered here are not ‘staff’ — they are craftspeople who treat travel as sensory ethics: listen longer than the itinerary allows, eat where steam replaces signage, document without stealing dignity.
              </span>
            </p>
            <p>
              Read these chapters as interviews without microphones — faces lit by kitchen fog, coastlines humming through cheap headphones, notebooks softened by humidity. This is the crew behind the feelings you meet on every route we publish.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-charcoal/10 bg-sand-100 py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-24 px-4 md:space-y-28 md:px-10">
          {firstPair.map((chapter, i) => (
            <PortraitChapterBlock key={chapter.scene} chapter={chapter} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-sand-50 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-10">
          <Reveal className="space-y-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-forest">Interlude · collective vow</p>
            <blockquote className="font-display text-[clamp(1.65rem,3.6vw,2.35rem)] leading-snug text-charcoal">
              {teamInterludeQuote}
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-4 py-20 md:space-y-28 md:px-10 md:py-28">
        {secondPair.map((chapter, i) => (
          <PortraitChapterBlock key={chapter.scene} chapter={chapter} index={i + 2} />
        ))}
      </section>

      <ParallaxHero
        image={teamVisuals.interlude}
        heightClass="min-h-[74vh]"
        overlayClass="absolute inset-0 bg-gradient-to-r from-charcoal/72 via-charcoal/40 to-charcoal/18"
      >
        <div className="flex min-h-[74vh] flex-col justify-center px-6 py-24 md:px-14">
          <Reveal className="max-w-xl space-y-5 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/72">Field frame</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">Fog as collaborator — not weather to defeat.</h2>
            <p className="text-base leading-relaxed text-sand-100/84 md:text-[1.05rem]">
              The team returns to mountains because silence there is honest — ridges erase distance until patience becomes visible. This frame is a reminder: cinematic travel dignifies waiting.
            </p>
          </Reveal>
        </div>
      </ParallaxHero>

      <section className="border-y border-charcoal/10 bg-charcoal px-4 py-20 text-sand-50 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl space-y-10">
          <Reveal className="max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/65">Rhythm we protect</p>
            <h2 className="font-display text-4xl leading-tight md:text-[2.8rem]">Story first — hierarchy never</h2>
            <p className="text-sand-100/75 md:text-[1.05rem] md:leading-relaxed">
              You will not find reporting lines here — only shared devotion to alley steam, coastal salt, and night rain wired through neon. We argue like editors, wander like students, return like locals-in-training.
            </p>
          </Reveal>
          <Stagger className="grid gap-8 md:grid-cols-2" stagger={0.08}>
            {[
              {
                title: "Patience",
                body: "Scenes earn their length — no montage where a pause would honor a vendor’s laugh.",
              },
              {
                title: "Proximity",
                body: "Microphones and notebooks close to bowls and tide lines — intimacy without intrusion.",
              },
              {
                title: "Texture",
                body: "Humidity, oil, gravel sound — atmosphere treated as truthful data.",
              },
              {
                title: "Trust",
                body: "Subjects before spectacle; contributors credited in spirit even when names stay quiet in public.",
              },
            ].map((item) => (
              <RevealItem key={item.title}>
                <div className="border-b border-sand-50/15 pb-8">
                  <p className="font-display text-2xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-sand-100/74">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ParallaxHero
        image={teamVisuals.closing}
        overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/22"
      >
        <div className="flex min-h-[88vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-40">
          <Reveal className="max-w-2xl space-y-7 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.36em] text-sand-100/75">Walk with us</p>
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,3.85rem)] leading-[1.05]">Say hello — we answer like travelers, not desks.</h2>
            <p className="text-base leading-relaxed text-sand-100/85 md:text-lg">
              If our atlas reads cinematic, it is because humans carried its humidity across drafts and tide clocks. Reach out when you want routes that respect silence as much as spectacle.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact"
                className="rounded-full bg-sunset px-7 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-sunset-deep"
              >
                Write to us
              </Link>
              <Link
                to="/journeys"
                className="rounded-full border border-sand-50/35 px-7 py-3 text-sm font-medium text-sand-50 transition hover:border-sand-50 hover:bg-sand-50/10"
              >
                Curated journeys
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-transparent px-7 py-3 text-sm font-medium text-sand-50/82 underline-offset-[6px] transition hover:text-sand-50 hover:underline"
              >
                Manifesto →
              </Link>
            </div>
          </Reveal>
        </div>
      </ParallaxHero>
    </div>
  );
}

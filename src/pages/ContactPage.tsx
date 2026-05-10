import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { getTour } from "@/data/tours";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

const visuals = {
  hero: u("photo-1506905925346-21bda4d32df4"),
  formSide: u("photo-1528181304800-259b08848529"),
  rain: u("photo-1519865885898-296b6b2fbfae"),
  lanterns: u("photo-1559827260-dc66d52bef19"),
  coffee: u("photo-1495474472287-4d71bcdd2085"),
  train: u("photo-1583417319070-7bcbc71bcbd8"),
  coast: u("photo-1469474968028-56623f02e42e"),
  fog: u("photo-1464822759023-fed622ff2c3b"),
  closing: u("photo-1528127269322-539801943592"),
};

const conversationKinds = [
  {
    id: "stories",
    title: "Story collaborations",
    line: "Co-create features, photo essays, or slow dispatches — we listen before we frame a shot.",
  },
  {
    id: "local",
    title: "Local recommendations",
    line: "Whispered corners, dawn markets, and kitchens that never made a brochure.",
  },
  {
    id: "inspiration",
    title: "Travel inspiration",
    line: "When you know the mood but not the latitude — we trade references, not templates.",
  },
  {
    id: "hidden",
    title: "Hidden destinations",
    line: "Ridges, bays, and alleys that deserve patience instead of crowds.",
  },
  {
    id: "culture",
    title: "Cultural conversations",
    line: "Ritual, sound, and food as the real map — dialogue, not a script.",
  },
  {
    id: "partnership",
    title: "Partnership inquiries",
    line: "Editorial alignment first; anything commercial stays secondary to atmosphere.",
  },
];

const atmosphere = [
  { src: visuals.rain, caption: "Rain reflections — glass and asphalt as one long sigh." },
  { src: visuals.lanterns, caption: "Lantern streets — silk light pooling where scooters slow down." },
  { src: visuals.coffee, caption: "Coffee corners — phin steam marking time between chapters." },
  { src: visuals.train, caption: "Train-street mood — houses leaning in until steel whistles through." },
  { src: visuals.coast, caption: "Coastal roads — salt film, open sky, curves that feel like exhale." },
  { src: visuals.fog, caption: "Foggy ridges — terraces erased, then redrawn by breath." },
];

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [journeyInterest, setJourneyInterest] = useState("");
  const [message, setMessage] = useState("");
  const [focusKind, setFocusKind] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const resetTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    const slug = searchParams.get("tour");
    if (!slug) return;
    const t = getTour(slug);
    if (!t) return;
    setJourneyInterest((prev) => prev || t.title);
    setMessage(
      (prev) =>
        prev ||
        `I'd love to discuss "${t.title}" (${t.region}). `,
    );
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    setSent(true);
    resetTimer.current = window.setTimeout(() => {
      resetTimer.current = null;
      setSent(false);
      setName("");
      setEmail("");
      setJourneyInterest("");
      setMessage("");
      setFocusKind(null);
    }, 5200);
  }

  return (
    <div className="pb-6">
      <ParallaxHero image={visuals.hero} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/25">
        <div className="flex min-h-[92vh] flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-5xl flex-col gap-8 text-center text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/78">Đất Việt · Correspondence</p>
            <h1 className="font-display text-[clamp(2.45rem,7.2vw,5.5rem)] leading-[0.95] tracking-[-0.01em]">
              Every journey begins with a conversation.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sand-100/88 md:text-lg">
              Let Vietnam speak through stories — not tickets. Reach out like you are writing in the margins of a travel journal we are still filling together.
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            className="mx-auto mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.34em] text-sand-50/50"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 5.2, repeat: Infinity }}
          >
            <span className="h-px w-12 bg-sand-50/35" />
            Calm replies · human pace
          </motion.div>
        </div>
      </ParallaxHero>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Why we keep a mailbox open</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">A studio for cinematic exploration, not a help desk</h2>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist md:text-lg">
            <p>
              Đất Việt is built as a{" "}
              <span className="text-charcoal/92">
                curated Vietnam exploration — part magazine, part atlas, part love letter to alley steam and mountain fog.
              </span>{" "}
              When you write, you are not opening a ticket; you are extending a thread about atmosphere, appetite, and the hidden stories a map forgets.
            </p>
            <p>
              This is a visual and emotional archive of travel — slow scouting, sensory truth, and editorial restraint. Tell us what moved you, what you are dreaming toward, or what corner of the country keeps tugging at your curiosity.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Form + atmosphere strip */}
      <section className="border-y border-charcoal/10 bg-sand-100/80 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <div className="grid items-stretch gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Reveal>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="relative overflow-hidden rounded-[1.85rem] shadow-soft"
              >
                <div className="relative aspect-[4/5] md:aspect-[16/13] lg:aspect-auto lg:min-h-[560px]">
                  <img src={visuals.formSide} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/55 via-charcoal/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-8 pb-10 pt-16 md:px-10">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/75">Reach beyond the itinerary</p>
                    <p className="mt-4 max-w-md font-display text-3xl leading-tight text-sand-50 md:text-[2.35rem]">
                      We read every note with the lights low — the way you would replay a voice memo from a night market.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.06} className="flex flex-col justify-center">
              <div className="rounded-[1.85rem] border border-charcoal/10 bg-sand-50/75 p-8 shadow-soft backdrop-blur-md md:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/45">Send a note</p>
                <h3 className="mt-3 font-display text-3xl text-charcoal md:text-[2.35rem]">Begin the thread</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist md:text-[0.95rem]">
                  Soft fields, calm pacing — tell us who you are, what you are circling, and the texture of the journey on your mind.
                </p>

                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                  <label className="block space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Name</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="w-full rounded-2xl border border-charcoal/12 bg-sand-50/65 px-4 py-3 text-[0.95rem] text-charcoal shadow-inner outline-none ring-forest/0 transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15"
                      placeholder="How we should address you"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Email</span>
                    <input
                      required
                      type="email"
                      dir="ltr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full rounded-2xl border border-charcoal/12 bg-sand-50/65 px-4 py-3 text-[0.95rem] text-charcoal shadow-inner outline-none ring-forest/0 transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15"
                      placeholder="you@domain.com"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Journey interest</span>
                    <input
                      value={journeyInterest}
                      onChange={(e) => setJourneyInterest(e.target.value)}
                      className="w-full rounded-2xl border border-charcoal/12 bg-sand-50/65 px-4 py-3 text-[0.95rem] text-charcoal shadow-inner outline-none ring-forest/0 transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15"
                      placeholder="Foggy highlands, lantern-lit old towns, midnight pho lanes…"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Message</span>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full resize-y rounded-2xl border border-charcoal/12 bg-sand-50/65 px-4 py-3 text-[0.95rem] leading-relaxed text-charcoal shadow-inner outline-none ring-forest/0 transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15"
                      placeholder="A paragraph is enough — mood, references, questions you cannot shake."
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90"
                    >
                      Send note
                    </button>
                    {sent ? (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-forest"
                      >
                        Received — thank you. This is a prototype inbox; your words reset so you can keep drafting.
                      </motion.p>
                    ) : (
                      <p className="text-xs leading-relaxed text-charcoal/45">No urgency implied — we answer like editors, not automation.</p>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Conversation categories */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,oklch(92%_0.05_145/0.18),transparent_45%),radial-gradient(circle_at_82%_32%,oklch(88%_0.06_45/0.12),transparent_42%)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 max-w-3xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Kinds of correspondence</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">What you might be circling</h2>
            <p className="text-mist md:text-lg">
              Choose a tone — not a department. Tap a card to echo it in your note; we fold the thread naturally.
            </p>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.07}>
            {conversationKinds.map((item) => {
              const active = focusKind === item.id;
              return (
                <RevealItem key={item.id}>
                  <motion.button
                    type="button"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => {
                      setFocusKind(item.id);
                      setJourneyInterest(item.title);
                    }}
                    className={[
                      "w-full rounded-3xl border p-8 text-start shadow-soft backdrop-blur-[2px] transition",
                      active
                        ? "border-forest/35 bg-sand-50/90"
                        : "border-charcoal/10 bg-sand-50/70 hover:border-charcoal/18",
                    ].join(" ")}
                  >
                    <p className="font-display text-2xl text-charcoal">{item.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{item.line}</p>
                    {active ? <p className="mt-5 text-[11px] uppercase tracking-[0.26em] text-forest">Echoed into your journey interest</p> : null}
                  </motion.button>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Vietnam atmosphere */}
      <section className="border-t border-charcoal/10 bg-charcoal px-4 py-20 text-sand-50 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl space-y-14">
          <Reveal className="max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.34em] text-sand-100/65">Atmosphere in the margin</p>
            <h2 className="font-display text-4xl leading-tight md:text-[2.75rem]">The weather of a reply</h2>
            <p className="text-sand-100/76 md:text-[1.05rem] md:leading-relaxed">
              Before we write back, we hold these scenes in mind — the sensory grammar that makes Vietnam impossible to flatten into a brochure.
            </p>
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {atmosphere.map((frame) => (
              <RevealItem key={frame.caption}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="overflow-hidden rounded-[1.6rem]">
                  <div className="relative aspect-[16/11]">
                    <img src={frame.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/78 via-charcoal/12 to-transparent" />
                    <p className="absolute inset-x-0 bottom-5 px-5 font-display text-xl leading-snug text-sand-50 md:text-[1.35rem]">{frame.caption}</p>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Closing */}
      <ParallaxHero image={visuals.closing} overlayClass="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/5 to-charcoal/35">
        <div className="flex min-h-[86vh] flex-col justify-end px-6 pb-16 pt-32 md:px-14 md:pb-24 md:pt-40">
          <Reveal className="max-w-2xl space-y-7 text-sand-50">
            <p className="text-[11px] uppercase tracking-[0.36em] text-sand-100/75">Stay in the slow light</p>
            <h2 className="font-display text-[clamp(2.15rem,5.2vw,3.6rem)] leading-[1.06]">Connection, not checkout.</h2>
            <p className="text-base leading-relaxed text-sand-100/86 md:text-lg">
              Wander the atlas while you wait — provinces, cities, and journeys all breathe the same editorial air. We will meet you in the story, not the queue.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                to="/provinces"
                className="rounded-full bg-sunset px-7 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-sunset-deep"
              >
                Provinces atlas
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-sand-50/35 px-7 py-3 text-sm font-medium text-sand-50 transition hover:border-sand-50 hover:bg-sand-50/10"
              >
                Our manifesto
              </Link>
            </div>
          </Reveal>
        </div>
      </ParallaxHero>
    </div>
  );
}

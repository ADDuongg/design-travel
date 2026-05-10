import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { getCity } from "@/data/cities";

export function CityDetailPage() {
  const { slug } = useParams();
  const city = slug ? getCity(slug) : undefined;

  if (!city) {
    return <Navigate to="/cities" replace />;
  }

  return (
    <article className={`${city.moodClass} pb-24`}>
      <ParallaxHero image={city.image}>
        <div className="flex flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-14 md:pb-20 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5 text-sand-50"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">{city.eyebrow}</p>
            <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]">{city.name}</h1>
            <p className="max-w-2xl text-lg text-sand-100/85">{city.intro}</p>
          </motion.div>
        </div>
      </ParallaxHero>

      {!city.fullGuide ? (
        <section className="mx-auto max-w-3xl px-4 pt-16 md:px-10 md:pt-20">
          <Reveal className="space-y-6 rounded-[2rem] border border-charcoal/10 bg-sand-50 p-8 shadow-soft md:p-12">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Guide expanding</p>
            <p className="text-lg text-mist">
              We are sequencing full sensory dossiers city-by-city. Hanoi holds the deepest editorial pass today — wander there for walking routes,
              hidden cafes, and galleries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/cities/hanoi"
                className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-forest-soft"
              >
                Open Hanoi dossier
              </Link>
              <Link
                to="/cities"
                className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
              >
                Back to atlas
              </Link>
            </div>
            <p className="text-sm text-charcoal/65">
              <span className="font-semibold text-charcoal">Suggested timing:</span> {city.bestTime}
            </p>
          </Reveal>
        </section>
      ) : (
        <>
          <section className="mx-auto max-w-6xl space-y-12 px-4 pt-20 md:px-10 md:pt-24">
            <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Best foods</p>
                <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Bowls that choreograph dawn</h2>
              </div>
              <p className="max-w-md text-mist">
                Hanoi eats early — follow steam before sunlight hits Hoan Kiem. Photography courteous; pay before hovering lenses over grills.
              </p>
            </Reveal>
            <div className="grid gap-8 lg:grid-cols-3">
              {city.foods.map((food, i) => (
                <Reveal key={food.title} delay={i * 0.06}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-sand-50 shadow-soft"
                  >
                    <div className="relative aspect-[16/11]">
                      <img src={food.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="font-display text-2xl text-charcoal">{food.title}</h3>
                      <p className="text-sm leading-relaxed text-mist">{food.detail}</p>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="border-y border-charcoal/10 bg-sand-100 py-20 md:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1fr_1.1fr] md:px-10 md:items-start">
              <Reveal className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Local experiences</p>
                <h2 className="font-display text-4xl text-charcoal">Hands-on rhythm</h2>
                <p className="text-mist">
                  Balance spectacle with residential courtesy — train cafés are homes first.
                </p>
              </Reveal>
              <Stagger className="space-y-5">
                {city.experiences.map((exp) => (
                  <RevealItem key={exp.title}>
                    <div className="rounded-2xl border border-charcoal/10 bg-sand-50 px-6 py-5 shadow-soft">
                      <h3 className="font-display text-2xl text-charcoal">{exp.title}</h3>
                      <p className="mt-2 text-sm text-mist">{exp.detail}</p>
                    </div>
                  </RevealItem>
                ))}
              </Stagger>
            </div>
          </section>

          <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 md:px-10 md:py-24">
            <Reveal className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Hidden places</p>
              <h2 className="font-display text-4xl text-charcoal">Courtyards & rooftop breezes</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {city.hiddenPlaces.map((place, i) => (
                <Reveal key={place.title} delay={i * 0.07}>
                  <div className="h-full rounded-[1.5rem] border border-charcoal/10 bg-sand-50 p-6 shadow-soft">
                    <h3 className="font-display text-2xl text-charcoal">{place.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{place.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="border-y border-charcoal/10 bg-sand-50 py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-4 md:px-10">
              <Reveal className="mb-10 space-y-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Suggested walking routes</p>
                <h2 className="font-display text-4xl text-charcoal">Loops measured in smells</h2>
              </Reveal>
              <div className="grid gap-6 md:grid-cols-2">
                {city.walks.map((walk, i) => (
                  <Reveal key={walk.title} delay={i * 0.08}>
                    <div className="relative overflow-hidden rounded-[1.75rem] bg-forest p-8 text-sand-50 shadow-soft">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-3xl">{walk.title}</h3>
                        <span className="rounded-full bg-sand-50/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-sand-50/75 glass-panel">
                          {walk.km}
                        </span>
                      </div>
                      <ul className="mt-6 space-y-3 text-sm text-sand-50/85">
                        {walk.stops.map((stop) => (
                          <li key={stop} className="flex gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sunset" />
                            {stop}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 md:px-10 md:py-24">
            <Reveal className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Photo gallery</p>
              <h2 className="font-display text-4xl text-charcoal">Film frames from real wanderings</h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
              {city.gallery.map((src, idx) => (
                <Reveal
                  key={src}
                  delay={idx * 0.05}
                  className={idx === 0 ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="h-full">
                    <img
                      src={src}
                      alt=""
                      className={`h-full w-full rounded-[1.25rem] object-cover ${idx === 0 ? "min-h-[320px] md:min-h-[420px]" : "aspect-square md:aspect-auto md:min-h-[200px]"}`}
                      loading="lazy"
                    />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-12 md:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <Reveal className="space-y-6 rounded-[2rem] border border-charcoal/10 bg-sand-100 p-8 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Cultural highlights</p>
                <div className="space-y-6">
                  {city.culture.map((item) => (
                    <div key={item.title}>
                      <h3 className="font-display text-3xl text-charcoal">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal>
                <div className="relative overflow-hidden rounded-[2rem] border border-charcoal/10 bg-charcoal">
                  {city.heroSecondary ? (
                    <img src={city.heroSecondary} alt="" className="h-[520px] w-full object-cover opacity-85 md:h-full md:min-h-[520px]" loading="lazy" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-4 p-8 text-sand-50 md:p-10">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-sand-50/70">Recommended timing</p>
                    <p className="text-xl leading-relaxed text-sand-50/90">{city.bestTime}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </article>
  );
}

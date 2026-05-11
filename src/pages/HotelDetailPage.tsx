import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  HotelFloatingContact,
  HotelLocationBlock,
  HotelMetaStrip,
  HotelReviews,
  HotelRoomPreviews,
} from "@/components/hotels";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { getHotel } from "@/data/hotels";
import { getProvince } from "@/data/provinces";

type NavItem = { id: string; label: string };

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

export function HotelDetailPage() {
  const { slug } = useParams();
  const hotel = slug ? getHotel(slug) : undefined;
  const heroRef = useRef<HTMLElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setNavVisible(v >= 0.88);
  });

  const hasLocation = Boolean(
    hotel?.location && typeof hotel.location.lat === "number" && typeof hotel.location.lng === "number",
  );

  const navItems = useMemo<NavItem[]>(() => {
    if (!hotel) return [];
    const items: NavItem[] = [
      { id: "story", label: "Story" },
      { id: "rooms", label: "Rooms" },
      { id: "policies", label: "Policies" },
      { id: "gallery", label: "Gallery" },
    ];
    if (hasLocation) items.push({ id: "location", label: "Location" });
    items.push({ id: "reviews", label: "Reviews" }, { id: "plan", label: "Plan" });
    return items;
  }, [hotel, hasLocation]);

  function onNav(id: string) {
    scrollToSection(id);
  }

  if (!hotel) {
    return <Navigate to="/hotels" replace />;
  }

  const province = getProvince(hotel.provinceSlug);

  return (
    <article className="relative pb-28 lg:pb-24">
      <section ref={heroRef}>
        <ParallaxHero image={hotel.coverImage} heightClass="min-h-[100svh]">
          <div className="flex flex-1 flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-5 text-sand-50"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">
                {hotel.starRating}★ · {province?.name ?? hotel.provinceSlug}
              </p>
              <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]">{hotel.title}</h1>
              <p className="max-w-2xl text-lg text-sand-100/85">{hotel.storyLead}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] uppercase tracking-[0.24em] text-sand-100/70">
                <span>{hotel.mood}</span>
                <span className="text-sand-100/40">·</span>
                <span>{hotel.reviewCount} guest notes</span>
                <span className="text-sand-100/40">·</span>
                <span>Listed {hotel.listingYear}</span>
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
        <Reveal delay={0.05} className="mt-4">
          <HotelMetaStrip hotel={hotel} />
        </Reveal>
      </section>

      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal className="space-y-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Editorial</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Why this roof earns patience</h2>
            {hotel.storyBody.map((para) => (
              <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-mist md:text-xl">
                {para}
              </p>
            ))}
          </Reveal>
          {hotel.gallery[0] ? (
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
                <img src={hotel.gallery[0].src} alt={hotel.gallery[0].alt} className="max-h-[640px] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section id="rooms" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Inventory previews</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Rooms as correspondence objects</h2>
            <p className="max-w-2xl text-sm text-mist">
              Rates and nights mirror how the reference catalog thinks about rooms; here they stay indicative, and confirmation stays human.
            </p>
          </Reveal>
          <HotelRoomPreviews rooms={hotel.rooms} hotelSlug={hotel.slug} />
        </div>
      </section>

      <section id="policies" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">House rules</p>
          <h2 className="font-display text-4xl text-charcoal">Policies without fine-print voice</h2>
        </Reveal>
        <Stagger className="space-y-4">
          {hotel.policies.map((p) => (
            <RevealItem key={p}>
              <div className="rounded-2xl border border-charcoal/10 bg-sand-50 px-6 py-4 text-mist shadow-soft md:px-8">
                {p}
              </div>
            </RevealItem>
          ))}
        </Stagger>
        <Reveal className="mt-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Amenities</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.map((a) => (
              <li
                key={a}
                className="rounded-full border border-charcoal/12 bg-sand-100 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-charcoal/75"
              >
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="gallery" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Gallery</p>
            <h2 className="font-display text-4xl text-charcoal">Still frames from the same air</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-12 md:gap-6">
            {hotel.gallery.map((g, idx) => (
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
        </div>
      </section>

      {hasLocation && hotel.location ? (
        <section id="location" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
          <Reveal className="mb-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Location</p>
            <h2 className="font-display text-4xl text-charcoal">Where to stand on the map</h2>
          </Reveal>
          <HotelLocationBlock location={hotel.location} hotelTitle={hotel.title} />
        </section>
      ) : null}

      <section id="reviews" className="scroll-mt-28 border-t border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-14 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Guest reviews</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Written notes, not star spam</h2>
            <p className="max-w-2xl text-mist">Archive excerpts (static on this build), same posture as journey reviews.</p>
          </Reveal>
          <HotelReviews reviews={hotel.reviews} />
        </div>
      </section>

      <section id="plan" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-12 md:px-10 md:pb-20">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Correspondence</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Plan this stay slowly</h2>
          <p className="max-w-2xl text-sm text-mist">
            No instant checkout: share dates, room preference, and pace. We mirror the reference business flow (holds, nights, contact) without
            pretending wire transfers already ran.
          </p>
        </Reveal>
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-charcoal/10 bg-sand-50 p-8 shadow-soft md:flex-row md:flex-wrap md:items-center md:gap-6">
          {hotel.contact.phone ? (
            <a
              href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`}
              className="rounded-full bg-forest px-6 py-3 text-center text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-forest-soft"
            >
              Call
            </a>
          ) : null}
          {hotel.contact.email ? (
            <a
              href={`mailto:${hotel.contact.email}?subject=${encodeURIComponent(`Inquiry: ${hotel.title}`)}`}
              className="rounded-full border border-charcoal/20 px-6 py-3 text-center text-sm font-semibold text-charcoal transition hover:border-forest/40"
            >
              Email
            </a>
          ) : null}
          {hotel.contact.website ? (
            <a
              href={hotel.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-charcoal/20 px-6 py-3 text-center text-sm font-semibold text-charcoal transition hover:border-forest/40"
            >
              Property site ↗
            </a>
          ) : null}
          <Link
            to={`/contact?stay=${encodeURIComponent(hotel.slug)}`}
            className="rounded-full bg-charcoal px-6 py-3 text-center text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90"
          >
            Write via Đất Việt
          </Link>
        </div>
        <Reveal className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/hotels"
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
          >
            All stays
          </Link>
          {province ? (
            <Link
              to={`/provinces/${province.slug}`}
              className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
            >
              Province atlas
            </Link>
          ) : null}
        </Reveal>
      </section>

      <HotelFloatingContact slug={hotel.slug} hotel={hotel} />
    </article>
  );
}

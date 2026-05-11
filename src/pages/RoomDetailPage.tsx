import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  RoomBookingDialog,
  RoomMetaStrip,
  RoomMobileBookingBar,
  RoomPlanBand,
} from "@/components/rooms";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { formatVnd, getRoomByRouteSlug } from "@/data/rooms";
import { getProvince } from "@/data/provinces";

type NavItem = { id: string; label: string };

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

export function RoomDetailPage() {
  const { slug } = useParams();
  const room = slug ? getRoomByRouteSlug(slug) : undefined;
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

  const heroImage = room?.gallery[0]?.src ?? room?.thumbnail ?? "";

  const navItems = useMemo<NavItem[]>(() => {
    if (!room) return [];
    const items: NavItem[] = [
      { id: "story", label: "Story" },
      { id: "rules", label: "Nights & rules" },
      { id: "amenities", label: "Amenities" },
    ];
    if (room.gallery.length > 1) items.push({ id: "gallery", label: "Gallery" });
    items.push({ id: "plan", label: "Plan" });
    return items;
  }, [room]);

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  const province = getProvince(room.provinceSlug);
  const contactQuery = `/contact?stay=${encodeURIComponent(room.hotelSlug)}&room=${encodeURIComponent(room.routeSlug)}`;

  return (
    <article className="relative pb-28 lg:pb-24">
      <section ref={heroRef}>
        <ParallaxHero image={heroImage} heightClass="min-h-[100svh]">
          <div className="flex flex-1 flex-col justify-end px-6 pb-16 pt-36 md:px-14 md:pb-24 md:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-5 text-sand-50"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-sand-100/75">
                {room.roomType} · {room.hotelTitle}
              </p>
              <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]">{room.name}</h1>
              <p className="max-w-2xl text-lg text-sand-100/85">{room.shortDescription}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] uppercase tracking-[0.24em] text-sand-100/70">
                <span>Up to {room.maxGuests} guests</span>
                <span className="text-sand-100/40">·</span>
                <span>{room.inventoryTotalRooms} in category</span>
                <span className="text-sand-100/40">·</span>
                <span>From {formatVnd(room.pricing.basePrice)}</span>
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
                onClick={() => scrollToSection(item.id)}
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
          <RoomMetaStrip room={room} />
        </Reveal>
      </section>

      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20 md:px-10 md:pt-28">
        <Reveal className="space-y-8">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Editorial</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.85rem]">Why this inventory line exists</h2>
          {room.description.map((para) => (
            <p key={para.slice(0, 48)} className="text-lg leading-relaxed text-mist md:text-xl">
              {para}
            </p>
          ))}
        </Reveal>
      </section>

      <section id="rules" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <Reveal className="mb-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Booking posture</p>
            <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Nights, holds, and correspondence</h2>
            <p className="max-w-2xl text-sm text-mist">
              Same booking rules shape as the live catalog: min and max nights, instant vs correspondence-only holds, and how many physical keys sit in this category.
            </p>
          </Reveal>
          <Stagger className="space-y-4">
            <RevealItem>
              <div className="rounded-2xl border border-charcoal/10 bg-sand-50 px-6 py-4 text-mist shadow-soft md:px-8">
                <p className="font-medium text-charcoal">Stay length</p>
                <p className="mt-2 text-sm">
                  Minimum {room.bookingConfig.minNights} night{room.bookingConfig.minNights === 1 ? "" : "s"}
                  {room.bookingConfig.maxNights ? ` · maximum ${room.bookingConfig.maxNights} nights` : ""}.
                </p>
                <p className="mt-2 text-sm">
                  {room.bookingConfig.allowInstantBooking
                    ? "When slots allow, staff may offer a lighter correspondence hold (still not a cart checkout)."
                    : "This category is correspondence-only: dates and party shape are confirmed before a hold is discussed."}
                </p>
              </div>
            </RevealItem>
            {room.hotelRules?.length ? (
              <RevealItem>
                <div className="rounded-2xl border border-charcoal/10 bg-sand-50 px-6 py-4 text-mist shadow-soft md:px-8">
                  <p className="font-medium text-charcoal">Room notes</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {room.hotelRules.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ) : null}
          </Stagger>
        </div>
      </section>

      <section id="amenities" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Amenities</p>
          <h2 className="font-display text-4xl text-charcoal">What travels with this key</h2>
        </Reveal>
        <Stagger className="flex flex-wrap gap-2">
          {room.amenities.map((a) => (
            <RevealItem key={a}>
              <span className="inline-block rounded-full border border-charcoal/12 bg-sand-100 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-charcoal/75">
                {a}
              </span>
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {room.gallery.length > 1 ? (
        <section id="gallery" className="scroll-mt-28 border-y border-charcoal/10 bg-sand-50 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <Reveal className="mb-12 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Gallery</p>
              <h2 className="font-display text-4xl text-charcoal">Same air, different corners</h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
              {room.gallery.slice(1).map((g, idx) => (
                <Reveal key={g.src} delay={idx * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.012 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="overflow-hidden rounded-[1.35rem] border border-charcoal/10 shadow-soft"
                  >
                    <img src={g.src} alt={g.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="plan" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-12 md:px-10 md:pb-20">
        <Reveal className="mb-10 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Correspondence</p>
          <h2 className="font-display text-4xl text-charcoal md:text-[2.75rem]">Hold this room in language</h2>
          <p className="max-w-2xl text-sm text-mist">
            Share check-in intent, guest count, and pace. We keep the reference flow (room id, nights, contact) without simulating payment rails.
          </p>
        </Reveal>

        <Reveal className="mb-14">
          <RoomPlanBand room={room} onOpenBooking={() => setBookingOpen(true)} />
        </Reveal>

        <Reveal className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Direct lines</p>
          <p className="mt-2 max-w-prose text-sm text-mist">Call or mail the property, or route through Đất Việt if you want the letter on file.</p>
        </Reveal>

        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-charcoal/10 bg-sand-50 p-8 shadow-soft md:flex-row md:flex-wrap md:items-center md:gap-6">
          {room.hotelContact.phone ? (
            <a
              href={`tel:${room.hotelContact.phone.replace(/\s/g, "")}`}
              className="rounded-full bg-forest px-6 py-3 text-center text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-forest-soft"
            >
              Call property
            </a>
          ) : null}
          {room.hotelContact.email ? (
            <a
              href={`mailto:${room.hotelContact.email}?subject=${encodeURIComponent(`Inquiry: ${room.name} · ${room.hotelTitle}`)}`}
              className="rounded-full border border-charcoal/20 px-6 py-3 text-center text-sm font-semibold text-charcoal transition hover:border-forest/40"
            >
              Email property
            </a>
          ) : null}
          {room.hotelContact.website ? (
            <a
              href={room.hotelContact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-charcoal/20 px-6 py-3 text-center text-sm font-semibold text-charcoal transition hover:border-forest/40"
            >
              Property site ↗
            </a>
          ) : null}
          <Link
            to={contactQuery}
            className="rounded-full bg-charcoal px-6 py-3 text-center text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90"
          >
            Write via Đất Việt
          </Link>
        </div>
        <Reveal className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/rooms"
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
          >
            All rooms
          </Link>
          <Link
            to={`/hotels/${room.hotelSlug}`}
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-forest/40"
          >
            Whole property
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

      <RoomMobileBookingBar room={room} onOpenBooking={() => setBookingOpen(true)} />

      <RoomBookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} room={room} />
    </article>
  );
}

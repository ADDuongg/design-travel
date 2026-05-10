import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-sand-100 px-4 py-16 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-display text-3xl text-charcoal">Đất Việt</p>
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            A curated magazine for travelers who chase alley kitchens, midnight scooters, and the quiet fog above pine ridges —
            no itineraries sold.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-[11px] uppercase tracking-[0.26em] text-charcoal/45">Explore</p>
          <Link className="block hover:text-sunset-deep" to="/journeys">
            Curated journeys
          </Link>
          <Link className="block hover:text-sunset-deep" to="/guides">
            Local guides
          </Link>
          <Link className="block hover:text-sunset-deep" to="/provinces">
            Provinces atlas
          </Link>
          <Link className="block hover:text-sunset-deep" to="/cities">
            Cities & moods
          </Link>
          <Link className="block hover:text-sunset-deep" to="/gallery">
            Visual archive
          </Link>
          <Link className="block hover:text-sunset-deep" to="/">
            Collections & seasons
          </Link>
          <Link className="block hover:text-sunset-deep" to="/services">
            Our services
          </Link>
          <Link className="block hover:text-sunset-deep" to="/team">
            The people behind the atlas
          </Link>
          <Link className="block hover:text-sunset-deep" to="/about">
            Our manifesto
          </Link>
          <Link className="block hover:text-sunset-deep" to="/contact">
            Write to us
          </Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-[11px] uppercase tracking-[0.26em] text-charcoal/45">Note</p>
          <p className="text-mist">
            Imagery credits photographers via Unsplash. Stories are editorial prompts — verify openings hours locally before wandering at dawn.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl text-center text-[11px] uppercase tracking-[0.34em] text-charcoal/35">
        Not a booking product · Built as cinematic exploration
      </p>
    </footer>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import type { HotelDetail } from "@/data/hotels";

type Props = {
  location: NonNullable<HotelDetail["location"]>;
  hotelTitle: string;
};

export function HotelLocationBlock({ location, hotelTitle }: Props) {
  const label = location.mapLabel ?? hotelTitle;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${label} @${location.lat},${location.lng}`)}`;

  return (
    <Reveal>
      <div className="overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-sand-100 shadow-soft">
        <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-10 md:p-10">
          <div className="relative flex min-h-[180px] items-end rounded-[1.25rem] border border-charcoal/10 bg-gradient-to-br from-forest/15 via-sand-100 to-sunset-deep/10 p-6 md:min-h-[220px]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden>
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-charcoal" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <p className="relative text-[11px] uppercase tracking-[0.28em] text-charcoal/55">Editorial pin</p>
          </div>
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-forest">Location</p>
            <h3 className="font-display text-2xl text-charcoal md:text-3xl">{label}</h3>
            <p className="font-mono text-sm text-charcoal/70">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
            <p className="text-sm leading-relaxed text-mist">
              Opens in your maps app. We keep the site free of tracking embeds and API keys.
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-charcoal/20 bg-sand-50 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-forest/40 hover:text-forest"
            >
              Open in maps
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

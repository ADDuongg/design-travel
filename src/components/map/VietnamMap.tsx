import { useNavigate } from "react-router-dom";

const hotspots: { slug: string; label: string; cx: number; cy: number }[] = [
  { slug: "hanoi", label: "Hanoi", cx: 52, cy: 26 },
  { slug: "da-nang", label: "Da Nang", cx: 54, cy: 52 },
  { slug: "hoi-an", label: "Hoi An", cx: 56, cy: 54 },
  { slug: "ho-chi-minh-city", label: "HCMC", cx: 46, cy: 76 },
  { slug: "da-lat", label: "Da Lat", cx: 49, cy: 69 },
];

export function VietnamMap() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-charcoal/10 bg-gradient-to-br from-sand-50 via-sand-100 to-sand-200 p-6 shadow-soft md:p-10">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-sunset/35 opacity-60 blur-3xl" />
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative">
          <svg
            viewBox="0 0 100 120"
            role="img"
            aria-label="Stylized Vietnam map with city anchors"
            className="w-full drop-shadow-[0_28px_70px_rgba(26,26,26,0.18)]"
          >
            <defs>
              <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(94% 0.03 82)" />
                <stop offset="100%" stopColor="oklch(88% 0.04 160)" />
              </linearGradient>
            </defs>
            <path
              fill="url(#land)"
              stroke="oklch(28% 0.045 165 / 0.35)"
              strokeWidth="0.6"
              d="M52 8 C58 15 63 22 66 30 C68 38 70 46 69 54 C67 62 63 70 58 78 C54 86 48 94 44 102 C40 108 36 112 32 114 C28 116 24 114 22 110 C20 104 22 98 26 92 C30 84 34 76 36 68 C38 58 40 48 42 40 C44 30 46 22 48 16 C49 12 50 9 52 8 Z"
            />
            {hotspots.map((h) => (
              <g
                key={h.slug}
                role="link"
                tabIndex={0}
                className="cursor-pointer outline-none"
                onClick={() => navigate(`/cities/${h.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/cities/${h.slug}`);
                  }
                }}
              >
                <circle cx={h.cx} cy={h.cy} r="6" fill="transparent" />
                <circle cx={h.cx} cy={h.cy} r="2.4" className="fill-sunset stroke-charcoal/40" strokeWidth="0.35" />
              </g>
            ))}
          </svg>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.26em] text-charcoal/45">
            Tap pulses · Editorial routing only
          </p>
        </div>
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-forest">Interactive atlas</p>
          <h3 className="font-display text-4xl leading-tight text-charcoal md:text-[2.75rem]">
            Trace moods across latitude — fog towns to neon deltas.
          </h3>
          <p className="text-sm leading-relaxed text-mist md:text-base">
            Distances compress when you follow cravings instead of checklists. Use this schematic map as a compass toward sensory contrasts —
            each pulse opens the living dossier for that city.
          </p>
          <div className="flex flex-wrap gap-3">
            {hotspots.map((h) => (
              <button
                key={h.slug}
                type="button"
                onClick={() => navigate(`/cities/${h.slug}`)}
                className="rounded-full border border-charcoal/10 bg-sand-50 px-4 py-2 text-xs font-medium text-charcoal transition hover:border-forest/40 hover:text-forest"
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

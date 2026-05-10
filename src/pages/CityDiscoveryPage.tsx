import { CityPreviewCard } from "@/components/cards/CityPreviewCard";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { cityCards } from "@/data/cities";

export function CityDiscoveryPage() {
  return (
    <div className="px-4 pb-24 pt-28 md:px-10 md:pt-32">
      <Reveal className="mx-auto max-w-6xl space-y-6 pb-14 md:pb-16">
        <p className="text-[11px] uppercase tracking-[0.32em] text-forest">City discovery</p>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.02] text-charcoal">
              Listen for what each skyline sounds like after midnight.
            </h1>
            <p className="text-lg text-mist">
              Five sensory dossiers — nostalgic Hanoi fog, Da Nang salt, Hoi An silk bulbs, Saigon neon rivers, Da Lat greenhouse calm.
              Hanoi ships first as our deepest editorial cut.
            </p>
          </div>
          <p className="max-w-xs rounded-2xl border border-charcoal/10 bg-sand-50 px-5 py-4 text-sm leading-relaxed text-mist shadow-soft glass-panel">
            Tap any tile — itineraries stay offline; this is atmosphere routing only.
          </p>
        </div>
      </Reveal>

      <Stagger className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {cityCards.map((city, index) => (
          <RevealItem key={city.slug}>
            <CityPreviewCard city={city} index={index} />
          </RevealItem>
        ))}
      </Stagger>
    </div>
  );
}

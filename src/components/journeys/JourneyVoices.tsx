import { Reveal } from "@/components/motion/Reveal";
import type { TourVoiceQuote } from "@/data/tours";

type Props = {
  quotes: TourVoiceQuote[];
};

export function JourneyVoices({ quotes }: Props) {
  if (quotes.length === 0) return null;

  return (
    <div className="space-y-8">
      {quotes.map((q, i) => (
        <Reveal key={`${q.attribution}-${i}`} delay={i * 0.06}>
          <figure className="border-l-2 border-forest/40 pl-6 md:pl-8">
            <blockquote className="font-display text-2xl leading-snug text-charcoal md:text-[1.75rem]">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-mist">
              <span className="font-medium text-charcoal/90">{q.attribution}</span>
              {q.roleOrPlace ? <span className="text-charcoal/50"> — {q.roleOrPlace}</span> : null}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

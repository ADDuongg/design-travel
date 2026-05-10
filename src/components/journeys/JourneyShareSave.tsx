import { useCallback } from "react";
import { useSavedJourneys } from "@/hooks/useSavedJourneys";

type Props = {
  slug: string;
  title: string;
  /** Full URL for sharing; defaults to current origin + `/journeys/:slug`. */
  shareUrl?: string;
  variant?: "full" | "save-only";
};

function IconShare({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 8a3 3 0 1 0-2.83-4M18 8a3 3 0 1 1-2.83-4M18 8v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8M6 15a3 3 0 1 0 2.83 4M6 15a3 3 0 1 1 2.83 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHeart({ filled, className }: { filled?: boolean; className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function JourneyShareSave({ slug, title, shareUrl, variant = "full" }: Props) {
  const { toggle, isSaved } = useSavedJourneys();
  const saved = isSaved(slug);

  const href =
    shareUrl ??
    (typeof window !== "undefined" ? `${window.location.origin}/journeys/${slug}` : `/journeys/${slug}`);

  const onShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: title, url: href });
        return;
      } catch {
        /* dismissed or failed */
      }
    }
    try {
      await navigator.clipboard.writeText(href);
    } catch {
      /* clipboard blocked */
    }
  }, [href, title]);

  if (variant === "save-only") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={saved ? "Remove journey from saved" : "Save journey"}
        className="inline-flex size-10 items-center justify-center rounded-full border border-charcoal/12 bg-sand-50/90 text-charcoal/70 shadow-sm transition hover:border-forest/30 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        <IconHeart filled={saved} className={saved ? "text-sunset-deep" : undefined} />
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => void onShare()}
        aria-label="Share this journey"
        className="inline-flex items-center gap-2 rounded-full border border-charcoal/12 bg-sand-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/75 shadow-sm transition hover:border-forest/30 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        <IconShare className="text-charcoal/60" />
        Share
      </button>
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={saved ? "Remove journey from saved" : "Save journey"}
        className="inline-flex items-center gap-2 rounded-full border border-charcoal/12 bg-sand-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/75 shadow-sm transition hover:border-forest/30 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        <IconHeart filled={saved} className={saved ? "text-sunset-deep" : "text-charcoal/60"} />
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

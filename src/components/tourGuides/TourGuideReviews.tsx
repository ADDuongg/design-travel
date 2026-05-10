import { motion } from "framer-motion";
import { useCallback, useMemo, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { TourReviewEntry } from "@/data/tours";
import { useLocalGuideUserReview, type StoredUserGuideReview } from "@/hooks/useLocalGuideUserReview";

type SortKey = "listed" | "rating";

type DisplayRow = TourReviewEntry & {
  rowKey: string;
  isUser?: boolean;
};

const field =
  "w-full rounded-2xl border border-charcoal/12 bg-sand-50/90 px-4 py-3 text-[0.95rem] text-charcoal shadow-inner outline-none transition placeholder:text-charcoal/35 focus:border-forest/35 focus:ring-2 focus:ring-forest/15";

function StarRow({ rating }: { rating: number }) {
  const r = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${r} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-[0.95rem] leading-none ${i <= r ? "text-sunset-deep" : "text-charcoal/22"}`}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
  idPrefix,
}: {
  value: number;
  onChange: (n: number) => void;
  idPrefix: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/45">Your rating</span>
      <div className="flex gap-0.5" role="group" aria-label="Choose star rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            id={`${idPrefix}-star-${n}`}
            onClick={() => onChange(n)}
            className={`rounded-md px-1 py-0.5 text-2xl leading-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              n <= value ? "text-sunset-deep" : "text-charcoal/22"
            }`}
            aria-label={`${n} out of 5 stars`}
            aria-pressed={n <= value}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function storedToDisplay(r: StoredUserGuideReview): DisplayRow {
  const dateLabel = r.updatedAt
    ? `Edited · ${formatWhen(r.updatedAt)}`
    : `${formatWhen(r.createdAt)} · this browser`;
  return {
    rating: r.rating,
    comment: r.comment,
    author: r.author,
    date: dateLabel,
    rowKey: `user-${r.id}`,
    isUser: true,
  };
}

type Props = {
  guide: {
    slug: string;
    ratingAvg: number;
    reviewCount: number;
    reviewEntries: TourReviewEntry[];
  };
};

export function TourGuideReviews({ guide }: Props) {
  const { review: userStored, save, remove } = useLocalGuideUserReview(guide.slug);
  const [sortKey, setSortKey] = useState<SortKey>("listed");
  const [editing, setEditing] = useState(false);

  const [formAuthor, setFormAuthor] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const formId = `guide-review-${guide.slug}`;

  const openNewForm = useCallback(() => {
    setEditing(true);
    if (userStored) {
      setFormAuthor(userStored.author);
      setFormRating(userStored.rating);
      setFormComment(userStored.comment);
    } else {
      setFormAuthor("");
      setFormRating(5);
      setFormComment("");
    }
  }, [userStored]);

  const cancelForm = useCallback(() => {
    setEditing(false);
    setFormAuthor("");
    setFormRating(5);
    setFormComment("");
  }, []);

  const rows = useMemo((): DisplayRow[] => {
    const seeds: DisplayRow[] = guide.reviewEntries.map((r, i) => ({
      ...r,
      rowKey: `seed-${i}-${r.author}`,
    }));
    const userRow = userStored ? storedToDisplay(userStored) : null;
    const merged = userRow ? [userRow, ...seeds] : seeds;

    if (sortKey === "rating") {
      return [...merged].sort((a, b) => b.rating - a.rating || a.author.localeCompare(b.author));
    }
    return merged;
  }, [guide.reviewEntries, userStored, sortKey]);

  const stats = useMemo(() => {
    const ratings = rows.map((r) => r.rating);
    if (ratings.length === 0) return { avg: guide.ratingAvg, count: guide.reviewCount };
    const sum = ratings.reduce((a, b) => a + b, 0);
    return { avg: sum / ratings.length, count: ratings.length };
  }, [rows, guide.ratingAvg, guide.reviewCount]);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formComment.trim()) return;
    save({ rating: formRating, comment: formComment, author: formAuthor });
    setEditing(false);
    setFormAuthor("");
    setFormRating(5);
    setFormComment("");
  };

  const onDelete = () => {
    if (!userStored) return;
    if (typeof window !== "undefined" && !window.confirm("Remove your note from this device?")) return;
    remove();
    setEditing(false);
  };

  const showComposer = editing || !userStored;

  if (guide.reviewEntries.length === 0 && !userStored) {
    return (
      <div className="space-y-8">
        <p className="text-mist">No archive excerpts yet — be the first to leave a note about walking with this guide.</p>
        <ReviewComposer
          formId={formId}
          formAuthor={formAuthor}
          formRating={formRating}
          formComment={formComment}
          setFormAuthor={setFormAuthor}
          setFormRating={setFormRating}
          setFormComment={setFormComment}
          onSubmit={onSubmitForm}
          onCancel={userStored ? cancelForm : undefined}
          submitLabel="Publish note"
        />
        <p className="text-center text-xs text-charcoal/45">
          Stored only in this browser (local demo — no account required).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-8 rounded-[2rem] border border-charcoal/10 bg-sand-50/90 p-6 shadow-soft md:flex-row md:items-center md:justify-between md:gap-12 md:p-10">
        <div className="space-y-3">
          <p className="font-display text-5xl leading-none text-charcoal md:text-6xl">{stats.avg.toFixed(2)}</p>
          <StarRow rating={Math.round(stats.avg)} />
          <p className="text-sm text-mist">
            <span className="font-medium text-charcoal/80">{stats.count}</span> notes shown
            {userStored ? " (includes yours on this device)" : ""} — archive excerpts plus your optional comment.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:min-w-[220px]">
          <label htmlFor={`review-sort-${guide.slug}`} className="text-[11px] uppercase tracking-[0.22em] text-charcoal/45">
            Order
          </label>
          <select
            id={`review-sort-${guide.slug}`}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-2xl border border-charcoal/12 bg-sand-100/90 px-4 py-3 text-sm font-medium text-charcoal shadow-inner outline-none focus:border-forest/35 focus:ring-2 focus:ring-forest/15"
          >
            <option value="listed">As curated · yours first</option>
            <option value="rating">Highest rated first</option>
          </select>
        </div>
      </div>

      <ul className="space-y-6">
        {rows.map((rev, i) => (
          <Reveal key={rev.rowKey} delay={(i % 5) * 0.05}>
            <motion.li
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className={`rounded-[1.75rem] border p-6 shadow-soft md:p-8 ${
                rev.isUser ? "border-forest/35 bg-sand-100/90" : "border-charcoal/10 bg-sand-50"
              }`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-full border border-charcoal/10 bg-sand-100 font-display text-lg text-charcoal"
                  aria-hidden
                >
                  {initials(rev.author)}
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl text-charcoal">{rev.author}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-charcoal/45">
                        {rev.isUser ? rev.date : rev.place ? `${rev.place} · ${rev.date}` : rev.date}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <StarRow rating={rev.rating} />
                      {rev.isUser ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openNewForm()}
                            className="rounded-full border border-charcoal/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-forest transition hover:border-forest/40"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={onDelete}
                            className="rounded-full border border-charcoal/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/70 transition hover:border-sunset/40 hover:text-sunset-deep"
                          >
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-mist md:text-[1.05rem]">{rev.comment}</p>
                </div>
              </div>
            </motion.li>
          </Reveal>
        ))}
      </ul>

      {showComposer ? (
        <Reveal>
          <div className="rounded-[1.85rem] border border-charcoal/10 bg-sand-100/80 px-6 py-8 shadow-inner md:px-10 md:py-10">
            <p className="text-[11px] uppercase tracking-[0.32em] text-forest">{userStored ? "Update your note" : "Leave a note"}</p>
            <h3 className="mt-2 font-display text-2xl text-charcoal md:text-3xl">
              {userStored ? "Revise rating or wording" : "Describe how it felt to walk together"}
            </h3>
            <ReviewComposer
              formId={formId}
              formAuthor={formAuthor}
              formRating={formRating}
              formComment={formComment}
              setFormAuthor={setFormAuthor}
              setFormRating={setFormRating}
              setFormComment={setFormComment}
              onSubmit={onSubmitForm}
              onCancel={cancelForm}
              submitLabel={userStored ? "Save changes" : "Publish note"}
            />
          </div>
        </Reveal>
      ) : null}

      <p className="text-center text-xs leading-relaxed text-charcoal/45">
        Your comment is saved only on this browser. Clearing site data removes it — no login in this prototype.
      </p>
    </div>
  );
}

function ReviewComposer({
  formId,
  formAuthor,
  formRating,
  formComment,
  setFormAuthor,
  setFormRating,
  setFormComment,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  formId: string;
  formAuthor: string;
  formRating: number;
  formComment: string;
  setFormAuthor: (v: string) => void;
  setFormRating: (v: number) => void;
  setFormComment: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel?: () => void;
  submitLabel: string;
}) {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <StarPicker idPrefix={formId} value={formRating} onChange={setFormRating} />
      <label className="block space-y-2">
        <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Display name</span>
        <input
          required
          value={formAuthor}
          onChange={(e) => setFormAuthor(e.target.value)}
          className={field}
          placeholder="How you’d like to appear"
          autoComplete="name"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal/40">Comment</span>
        <textarea
          required
          value={formComment}
          onChange={(e) => setFormComment(e.target.value)}
          rows={4}
          className={`${field} resize-y`}
          placeholder="Pacing, trust, humor — a few honest sentences."
          minLength={8}
        />
      </label>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-sand-50 shadow-soft transition hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal/80 transition hover:border-charcoal/30"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

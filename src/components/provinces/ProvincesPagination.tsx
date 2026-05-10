import { useMemo } from "react";

/** 0-based indices; inserts `"ellipsis"` where there is a gap between visible spreads. */
function atlasPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 1) return total === 1 ? [0] : [];
  if (total <= 9) return Array.from({ length: total }, (_, i) => i);

  const windowRadius = 2;
  const pages = new Set<number>();
  pages.add(0);
  pages.add(total - 1);
  for (let i = current - windowRadius; i <= current + windowRadius; i++) {
    if (i > 0 && i < total - 1) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push("ellipsis");
    out.push(sorted[i]);
  }
  return out;
}

type ProvincesPaginationProps = {
  /** 0-based active page index */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Total matching provinces (for editorial caption) */
  totalItems?: number;
  pageSize?: number;
  className?: string;
};

export function ProvincesPagination({
  page,
  pageCount,
  onPageChange,
  totalItems,
  pageSize = 6,
  className,
}: ProvincesPaginationProps) {
  const safePage = Math.min(Math.max(0, page), Math.max(0, pageCount - 1));
  const items = useMemo(() => atlasPageItems(safePage, pageCount), [safePage, pageCount]);

  const rangeStart = totalItems !== undefined && totalItems > 0 ? safePage * pageSize + 1 : undefined;
  const rangeEnd =
    totalItems !== undefined && totalItems > 0 ? Math.min(totalItems, (safePage + 1) * pageSize) : undefined;

  const canPrev = safePage > 0;
  const canNext = safePage < pageCount - 1;

  return (
    <nav
      aria-label="Province atlas pagination"
      className={["flex flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-between", className].filter(Boolean).join(" ")}
    >
      <div className="flex flex-col gap-2 text-center md:text-left">
        <p className="text-[11px] uppercase tracking-[0.28em] text-charcoal/40">
          {totalItems !== undefined ? (
            <>
              Showing{" "}
              <span className="font-medium text-charcoal/70">
                {rangeStart}–{rangeEnd}
              </span>{" "}
              of <span className="font-medium text-charcoal/70">{totalItems}</span> provinces
            </>
          ) : (
            <>
              <span className="font-medium text-charcoal/70">{pageCount}</span> spread{pageCount === 1 ? "" : "s"} · Atlas view
            </>
          )}
        </p>
        <p className="font-display text-lg text-charcoal/55">
          Folio <span className="text-charcoal">{String(safePage + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-charcoal/25">/</span>
          <span className="text-charcoal/70">{String(pageCount).padStart(2, "0")}</span>
        </p>
      </div>

      <div
        className="flex w-full max-w-[min(100%,560px)] items-center justify-center gap-1 rounded-2xl border border-charcoal/10 bg-sand-50/95 px-2 py-2 shadow-soft backdrop-blur-[2px] sm:w-auto sm:max-w-none sm:gap-1.5 sm:px-3 md:ml-auto"
        role="group"
        aria-label="Spread navigation"
      >
        <PaginationArrow
          direction="prev"
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(safePage - 1)}
        />

        <div className="mx-1 flex min-h-[2.5rem] flex-wrap items-center justify-center gap-1 sm:mx-2">
          {items.map((item, idx) =>
            item === "ellipsis" ? (
              <span
                key={`e-${idx}`}
                className="select-none px-1.5 font-display text-lg leading-none text-charcoal/30"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === safePage ? "page" : undefined}
                className={[
                  "flex min-h-9 min-w-9 items-center justify-center rounded-xl border text-xs font-semibold tabular-nums transition",
                  item === safePage
                    ? "border-forest bg-forest text-sand-50 shadow-[0_10px_28px_-14px_oklch(28%_0.045_165/0.55)]"
                    : "border-transparent text-charcoal/75 hover:border-charcoal/15 hover:bg-charcoal/[0.04]",
                ].join(" ")}
              >
                {String(item + 1).padStart(2, "0")}
              </button>
            ),
          )}
        </div>

        <PaginationArrow
          direction="next"
          disabled={!canNext}
          onClick={() => canNext && onPageChange(safePage + 1)}
        />
      </div>
    </nav>
  );
}

function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const label = direction === "prev" ? "Previous spread" : "Next spread";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-charcoal/10 text-charcoal transition enabled:hover:border-forest/35 enabled:hover:bg-charcoal/[0.03] enabled:hover:text-forest disabled:cursor-not-allowed disabled:opacity-30"
    >
      <span className="sr-only">{label}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "datviet.guideUserReviews";

export type StoredUserGuideReview = {
  id: string;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
};

type Store = Record<string, StoredUserGuideReview>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as unknown;
    if (typeof p !== "object" || p === null || Array.isArray(p)) return {};
    return p as Store;
  } catch {
    return {};
  }
}

function writeStore(s: Store) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota */
  }
}

let cache: Store = {};
let seeded = false;

function seed() {
  if (typeof window === "undefined") return;
  if (!seeded) {
    cache = readStore();
    seeded = true;
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  seed();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Store {
  seed();
  return cache;
}

function getServerSnapshot(): Store {
  return {};
}

function emit(next: Store) {
  cache = next;
  writeStore(next);
  listeners.forEach((l) => l());
}

export function useLocalGuideUserReview(slug: string) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const review = store[slug] ?? null;

  const save = useCallback(
    (payload: { rating: number; comment: string; author: string }) => {
      seed();
      const now = new Date().toISOString();
      const prev = cache[slug];
      const id = prev?.id ?? crypto.randomUUID();
      const next: StoredUserGuideReview = {
        id,
        rating: Math.min(5, Math.max(1, Math.round(payload.rating))),
        comment: payload.comment.trim(),
        author: payload.author.trim(),
        createdAt: prev?.createdAt ?? now,
        updatedAt: prev ? now : undefined,
      };
      emit({ ...cache, [slug]: next });
    },
    [slug],
  );

  const remove = useCallback(() => {
    seed();
    if (!cache[slug]) return;
    const { [slug]: _, ...rest } = cache;
    emit(rest as Store);
  }, [slug]);

  return { review, save, remove };
}

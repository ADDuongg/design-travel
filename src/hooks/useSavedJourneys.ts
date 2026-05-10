import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "datviet.savedJourneys";

function readSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

function writeSlugs(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* quota / private mode */
  }
}

let cache: string[] = [];
let seeded = false;

function seed() {
  if (typeof window === "undefined") return;
  if (!seeded) {
    cache = readSlugs();
    seeded = true;
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  seed();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): string[] {
  seed();
  return cache;
}

function getServerSnapshot(): string[] {
  return [];
}

function emit(next: string[]) {
  cache = next;
  writeSlugs(next);
  listeners.forEach((l) => l());
}

export function useSavedJourneys() {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    seed();
    const next = new Set(cache);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    emit([...next]);
  }, []);

  const isSaved = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs],
  );

  return { slugs, toggle, isSaved };
}

# New page checklist (this project)

## File structure

- [ ] Add a new file under **`src/pages/`** (e.g. `MyPage.tsx`).
- [ ] Export a **named** component (same pattern as existing: `export function HomePage()` …).
- [ ] Register the route in **`src/App.tsx`** inside the `<Route element={<AppShell />}>` group with the desired `path`.
- [ ] If the page needs shared copy or structs, add or extend modules under **`src/data/`** (see `tours.ts`, `provinces.ts`, `cities` data).

## Layout

- [ ] **Do not** create a second root layout — pages render through **`AppShell`** (`Navbar` + `Outlet` + `Footer`).
- [ ] Use the same **content width** pattern as other pages unless there is a strong reason not to: outer sections often use **`mx-auto max-w-6xl`** with **`px-4 md:px-10`** (and section `py-*` as needed).
- [ ] For hero strips, reuse **`ParallaxHero`** + inner flex column with bottom-aligned content (see `HomePage` / `TourListPage`).

## Styling

- [ ] Colors: use **Tailwind classes** mapped to `@theme` tokens in `src/index.css` (`sand-*`, `forest`, `sunset*`, `charcoal`, `mist`, opacity modifiers like `charcoal/10`).
- [ ] Optional: `ThemeProvider` exposes **`--ds-*`** variables; body already falls back to `@theme` colors.
- [ ] Motion: **`framer-motion`** is used on pages (`motion.div`, `ParallaxHero`, `Reveal`); match existing easing arrays where copying patterns (e.g. `[0.22, 1, 0.36, 1]`).

## Data & types

- [ ] Domain types for tours/provinces/cities live next to data in **`src/data/*.ts`** — follow the same export style (`export type`, `export const`).
- [ ] **No global API layer** is defined in this repo; lists are **static imports** from `@/data/...`.

## States

- [ ] **Loading (route-level):** no `Suspense` / async route pattern found — pages render immediately from static data.
- [ ] **Images:** below-the-fold images commonly use **`loading="lazy"`**; hero / first paint often **`loading="eager"`** where already used.
- [ ] **Empty / error:** list pages filter in memory (e.g. `TourListPage` `useMemo`); **no shared empty-state component** — if a list can be empty, inline messaging must be added explicitly.
- [ ] **Forms:** `ContactPage` uses **local React state** + `onSubmit` — no shared form library observed.

## Imports alias

- [ ] Use **`@/`** → `src/` (see `tsconfig.json` `paths`).

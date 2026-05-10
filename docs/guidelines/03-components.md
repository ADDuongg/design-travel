# Component inventory (from this repo)

## `src/components/` — feature UI

### `src/components/layout/AppShell.tsx`

Wraps the app with navbar, `<Outlet />`, footer. **Props:** none. **Used in:** `src/App.tsx` as the parent route element.

### `src/components/layout/Navbar.tsx`

Top navigation with `NavLink`, active styles vs `useLocation()`. **Props:** none. **Used in:** `AppShell` only.

### `src/components/layout/Footer.tsx`

Footer links and copy. **Props:** none. **Used in:** `AppShell` only.

### `src/components/motion/ParallaxHero.tsx`

Full-width hero with background image and parallax (`useScroll` / `useTransform`).

**Props:**

| Prop | Type | Default |
|------|------|---------|
| `image` | `string` | (required) |
| `heightClass` | `string` | `"min-h-[92vh]"` |
| `overlayClass` | `string` | gradient `from-charcoal via-charcoal/55 to-charcoal/15` |
| `children` | `ReactNode` | optional |

**Example usage:** `TourListPage` — `<ParallaxHero image="https://images.unsplash.com/...">` wrapping hero content.

### `src/components/motion/Reveal.tsx`

Scroll-reveal wrappers using `framer-motion`.

- **`Reveal`:** `children`, `className`, `delay` (number), plus `Omit<HTMLMotionProps<"div">, "children">`.
- **`Stagger`:** `children`, `className`, `stagger` (number, default `0.08`).
- **`RevealItem`:** `children`, `className` — use inside `Stagger`.

**Example usage:** `HomePage` — `<Reveal>`, `<Stagger className="grid gap-6 md:grid-cols-3">` with `<RevealItem>` around `CityPreviewCard`.

### `src/components/cards/CityPreviewCard.tsx`

City teaser linking to `/cities/:slug`.

**Props:** `{ city: CityCard; index: number }` (`CityCard` from `@/data/cities`).

**Example usage:** `HomePage` — `featured.map((city, i) => <RevealItem key={...}><CityPreviewCard city={city} index={i} /></RevealItem>)`.

### `src/components/map/VietnamMap.tsx`

SVG map with clickable hotspots → `navigate(\`/cities/${slug}\`)`. **Props:** none. **Used in:** `HomePage` (map + collections section).

---

## `src/design-system/` — shared primitives

Located under `src/design-system/`; barrel export `src/design-system/index.ts`. Includes **tokens**, **theme** (`ThemeProvider`, `useTheme`), **layouts** (`Container`, `Stack`, `Grid`, `Sidebar`, `PageShell`, …), **typography** (`Heading`, `Text`, `Link`), and **components** (`Button`, `Input`, `Textarea`, `Badge`, `Tag`, `Card`, `Modal`, `ToastProvider` / `useToast`, `Avatar`, `Skeleton`, `Divider`, `Tooltip`). Each folder has its own `*.types.ts` / `*.module.css` where applicable.

> Pages in this project currently rely primarily on **Tailwind + `src/components/`** above; adoption of `design-system` components is optional unless a page is explicitly migrated.

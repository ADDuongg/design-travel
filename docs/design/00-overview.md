# Design cognition system — overview

This folder is an **AI-native design operating system** for the Đất Việt / Vietnam Discovery project. It combines **visual foundations**, **implementation references**, **experience composition rules**, and **agent governance** so automated and human contributors ship the same experiential intelligence—not only the same colors and components.

---

## What this system is

- **Not** only a visual design system: composition, pacing, narrative sequencing, and semantic grouping are first-class.
- **Not** a generic UI kit doc set: implementation files describe what exists in *this* repo; cognition files (`10–17`) are **transferable reasoning** for other stacks.
- **Optimized for AI-assisted UI generation**: numbered layers, explicit reading order, and `99-agent-rules.md` define how agents must consume and apply the material.

---

## Layer architecture

| Layer | Prefix | Role |
|-------|--------|------|
| **Overview** | `00` | Entry point, stack context, master reading order |
| **Foundation** | `01–03` | Identity intent, tokens, layout shell |
| **UI implementation** | `04–06` | Components, code patterns, new-page checklist |
| **Experience composition** | `10–17` | Why pages are structured—archetypes, sequencing, hierarchy, density, grouping, story, interaction |
| **Governance** | `99` | Mandatory agent behavior and guardrails |

---

## Canonical reading order

### For humans (first onboarding)

1. `00-overview.md` — this file  
2. `01-visual-identity.md` — mood, rhythm, anti-patterns (intent)  
3. `03-layout.md` — app shell and width patterns (reality in code)  
4. `10-composition-rules.md` — **start composition-first thinking**  
5. `11-page-archetypes.md` — pick the page’s job  
6. Remaining `12–17` as needed for the task  

### For AI agents (mandatory)

Follow **`99-agent-rules.md`** for full precedence rules. Short version:

1. **`99-agent-rules.md`** — constraints  
2. **`10–17`** — *before* inventing section structure or layout  
3. **`01`, `02`, `03`** — foundations when styling or scaffolding  
4. **`04–06`** — when touching React/Tailwind implementation  

---

## Project context (implementation)

**Stack:** Vite 7, React 18, TypeScript, React Router 7, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme` in `src/index.css`), Framer Motion. **`tailwind.config.ts` is not present** — theme tokens live in `src/index.css` and in `src/design-system/` (`ThemeProvider`, `--ds-*` variables).

Root wiring: `src/main.tsx` → `ThemeProvider` → `BrowserRouter` → `App`. Routed pages render inside **`AppShell`** (`Navbar` + `<Outlet />` + `Footer`) — see `03-layout.md`.

---

## File index

### Foundation

| File | Contents |
|------|----------|
| `01-visual-identity.md` | Creative direction: mood, typography feeling, motion, what to avoid |
| `02-tokens.md` | Colors, fonts, shadows, DS variables — from actual repo files |
| `03-layout.md` | Root shell, `AppShell`, navbar/footer patterns, section wrappers |

### UI implementation

| File | Contents |
|------|----------|
| `04-components.md` | Inventory of `src/components/` and `src/design-system/` |
| `05-patterns.md` | Recurring compositions copied from real pages |
| `06-new-page-checklist.md` | Routes, files, styling conventions for new pages |

### Experience composition

| File | Contents |
|------|----------|
| `10-composition-rules.md` | Single spine, registers, block roles, alternation, closure |
| `11-page-archetypes.md` | Magazine home, discovery list, long-form detail, dossier, utility |
| `12-section-sequencing.md` | Order logic for long-form, lists, home curves |
| `13-information-hierarchy.md` | Staging: hero vs. operational register, proof order |
| `14-density-rules.md` | Breath gaps, bands, islands, chunking |
| `15-semantic-grouping.md` | Parity cards, spine, label–value, pills, mosaic |
| `16-storytelling-patterns.md` | Editorial posture, named arcs, honesty, continuity |
| `17-interaction-philosophy.md` | Motion as pacing, deferred nav, soft filters, dialogs |

### Governance

| File | Contents |
|------|----------|
| `99-agent-rules.md` | How agents must use this system — non-negotiable |

---

## Canonical visual identity

The creative-direction manifesto lives in **`01-visual-identity.md`**. A short pointer may exist at `docs/visual-identity-creative-direction.md` for legacy links.

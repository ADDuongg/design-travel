# Agent rules — design cognition system

**Purpose:** Bind future AI agents to this repository’s **design operating system**. Violating these rules produces generic SaaS/dashboard UI and breaks editorial-travel cognition.

**Scope:** Applies to any automated or assisted work that creates or significantly changes pages, layouts, section structure, copy framing, or interaction patterns.

---

## 1. Documentation precedence

1. Read **`99-agent-rules.md`** (this file) first.
2. For **page structure, section order, narrative, density, or grouping**, read **`10–17`** before writing JSX or prose blocks.
3. For **visual intent and brand avoidance**, read **`01-visual-identity.md`** early.
4. For **tokens, layout shell, component names, file paths**, read **`02–06`** when implementing in this repo.

**Do not** invent layout philosophy solely from general LLM priors or generic design systems (Material, dashboard patterns, marketing landing clichés).

---

## 2. Composition-first philosophy

- **Structure is the product.** Section sequence, density curve, and semantic grouping determine whether the UI feels editorial—more than color or rounded corners.
- **Default workflow:** choose a **page archetype** (`11-page-archetypes.md`) → apply **section sequencing** (`12-section-sequencing.md`) → apply **composition rules** (`10-composition-rules.md`) → then map to components and tokens.
- **One primary vertical story** per surface unless the user explicitly needs comparison or dashboard-style multitasking.

---

## 3. Mandatory reading order (generation tasks)

| Task type | Read first |
|-----------|------------|
| New marketing / home / magazine-style page | `11`, `12`, `10`, `16`, `14`, `01` |
| New long-form detail (journey, hotel, place) | `11`, `12`, `13`, `14`, `15`, `16`, `17` |
| New list / browse page | `11`, `12`, `14`, `17` |
| Styling / tokens only | `01`, `02`, `03` |
| Implementation / wiring only | `04`, `05`, `06` |

Always cross-check **`17-interaction-philosophy.md`** if adding motion, sticky nav, filters, or persistent CTAs.

---

## 4. Preserving business logic

- **Data and rules live in code** (`src/data/`, route params, types). Docs do not replace source of truth.
- When generating UI, **do not** contradict pricing notes, durations, or domain types defined in data modules.
- **Conditional UI:** omit sections and navigation items when underlying data is absent—never show hollow prestige blocks (`16-storytelling-patterns.md`, `12-section-sequencing.md`).
- Prefer **extending existing data modules** over hardcoding copy that should be shared.

---

## 5. Anti-dashboard / anti-generic-SaaS rules

**Rejected patterns** unless the product owner explicitly requests a utility dashboard:

- Dense metric cards, sparklines, and “stats grids” as page heroes.
- Neutral white-on-white card seas with no narrative spine.
- Purple-gradient startup aesthetics, clip-art travel icons, countdown urgency.
- Infinite feed grids, skeleton churn, engagement-bait patterns.
- **Specifications before story** on editorial destinations (price walls before “why”).

**Preferred patterns:**

- **Eyebrow + display title + muted body** section ladder (`13-information-hierarchy.md`).
- **Banded sections** for operational density (`14-density-rules.md`).
- **Named, angle-driven section titles** (`16-storytelling-patterns.md`).
- **Hero → breath → facts → chapters** sequencing (`12-section-sequencing.md`).

Use **`01-visual-identity.md`** “What this project intentionally avoids” as a lint list.

---

## 6. Semantic grouping (non-negotiable)

Select container **roles** intentionally (`15-semantic-grouping.md`):

- **Parity cards** for equivalent choices.
- **Timeline / spine** for ordered journeys—not for unordered perks.
- **Label–value clusters** for scannable facts—not paragraphs.
- **Pills** for lightweight facets—not long sentences.
- **Mosaic** for visual proof hierarchies—not balanced marketplace grids.

If the metaphor does not match the user decision, **change the pattern**.

---

## 7. Pacing and density

- **Breath gap** after immersive heroes before dense specs (`14-density-rules.md`, `13-information-hierarchy.md`).
- Use **bands** (background + boundary) to mark chapter shifts and higher scanning load (`14-density-rules.md`, `10-composition-rules.md`).
- **Islands** for fact bundles—one decisive panel rather than scattered numbers (`14-density-rules.md`, `15-semantic-grouping.md`).
- **Imagery as palate cleanser** between operational stretches when content is sensory.

---

## 8. Motion and interaction

- Motion **orchestrates disclosure**, not novelty (`17-interaction-philosophy.md`).
- **Secondary section navigation** appears only after immersion threshold—never compete with the hero thesis.
- **Persistent CTAs** must not hijack the narrative lead; story-first DOM and visual order (`17-interaction-philosophy.md`).
- Filters in browse flows stay **soft** (pills, toggles)—avoid modal gates for exploration.

---

## 9. Reusable architecture expectations

Implementation docs (`04–06`) describe **this** repo. When generating code:

- Pages go through **`AppShell`**; no second root layout (`06-new-page-checklist.md`).
- Content width patterns match **`03-layout.md`** unless there is explicit editorial reason for divergence.
- Reuse **`ParallaxHero`**, **`Reveal`**, established patterns in **`05-patterns.md`** instead of one-off inventions.

Cognition docs **`10–17`** apply to **future projects** even when the stack differs: preserve **intent** (sequencing, density, grouping), translate **implementation**.

---

## 10. Conflict resolution

If instructions conflict:

1. **`99-agent-rules.md`** + product owner explicit instructions win.
2. Then **`10–17`** (experience composition).
3. Then **`01-visual-identity.md`**.
4. Then **`02–06`** (implementation accuracy).

When unsure, **slow the layout** (more whitespace, clearer section titles, fewer simultaneous CTAs) rather than **dashboard density**.

---

## 11. Quick compliance checklist

Before shipping generated UI:

- [ ] Archetype chosen and respected (`11`).
- [ ] Section order follows curve for archetype (`12`).
- [ ] No specs-first on emotional destinations (`12`, `13`).
- [ ] Dense blocks chunked and banded (`14`, `15`).
- [ ] Grouping metaphor matches semantics (`15`).
- [ ] Voice and titles are angle-driven, not generic (`16`).
- [ ] Motion and sticky behavior respect pacing (`17`).
- [ ] Business data unchanged and empty states honest (`16`, `12`).
- [ ] Does not resemble generic SaaS dashboard (`01`, section 5 above).

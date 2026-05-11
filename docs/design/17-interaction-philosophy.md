# Interaction philosophy

**Purpose:** Describe **how motion, navigation, and persistence behave** in service of pacing—so interactions feel calm and deliberate, not gimmicky.

**Audience:** Engineers and AI agents; specifics (libraries, durations) are examples only—preserve the *intent*.

---

## Motion serves pacing, not novelty

**Principles:**

- **Reveal on approach:** content enters as users **arrive**, not all at once on load (below the fold).
- **Shared easing family:** one coherent curve vocabulary across hero entrances and scroll reveals—reads as one product.
- **Stagger for siblings:** grids and lists disclose in sequence with small delays—implies **collection**, reduces visual slap.

**Why:** Simultaneous animation everywhere feels chaotic; orchestrated disclosure mirrors **reading gravity**.

---

## Secondary navigation appears after immersion

For long pages:

- Hide sticky section navigation until the **hero’s narrative job** is largely complete (e.g. scroll past immersion threshold).
- **Spring** or gentle transition into a compact nav—feels like **graduated control**, not chrome clutter.

**Why:** Early sticky nav competes with hero thesis; late sticky nav supports **re-entry** and scanning.

---

## Soft filters vs. hard gates

For browse experiences:

- Prefer **inline toggles** or pill filters over modal interruption when exploring.
- Make selected state **visible but calm**—clear affordance without shouty contrast.

**Why:** Discovery is iterative; modals imply commitment.

---

## Hover as whisper

Micro-interactions on cards and tiles:

- **Small** scale or lift—enough to confirm affordance, not enough to feel theatrical.

**Why:** Travel editorial brands skew premium; aggressive hovers feel marketplace.

---

## Persistent conversion without hijacking story

Mobile or narrow layouts:

- Use **bottom bars** or compact inquiry affordances **after** article content in DOM order where possible; anchor persistence visually separate from narrative blocks.

**Why:** Early sticky CTAs train users to ignore the story entirely.

---

## Dialogs for commitment moments

Reserve overlays for:

- Booking / inquiry forms,
- Actions that need validation or legal acknowledgement.

**Why:** Overlays signal **phase change**—from reading to committing.

---

## Anti-patterns

- **Parallax that fights readability**—motion must never compete with headline legibility.
- **Infinite micro-bouncing**—undermines calm brand posture.
- **Same-day interaction grammar for hero and fine print**—everything feels equally urgent.

---

## Transfer checklist

1. Does each animated element have a **reader-facing purpose** (orient, reveal, confirm)?
2. Does navigation **escalate** only after context?
3. Do persistent CTAs respect **story-first** ordering?

See also: [section-sequencing.md](./12-section-sequencing.md), [page-archetypes.md](./11-page-archetypes.md).

# Composition rules

**Purpose:** Encode *why* layouts are assembled the way they are—so pages feel like one continuous experience, not a pile of widgets.

**Audience:** Designers, developers, and AI agents generating new surfaces in any codebase that adopts this cognition.

---

## Core thesis

Composition is **narrative infrastructure**. The goal is not symmetry or maximal information density; it is **controlled attention**: immersion first, orientation second, elaboration third, decision last—unless the user has explicitly entered a task-only mode (e.g. pure utility flows).

---

## Single spine principle

- **One primary vertical story** per page. Avoid competing “hero” regions or multiple full-width emotional peaks unless the user journey explicitly requires comparison (e.g. A/B product choice).
- **Stable outer frame** (global chrome + footer): repeat predictably so the **content column** can vary in rhythm without disorienting.

**Why:** Users build a mental model of “where I am” from the frame; the middle is where pacing and emotion live.

---

## Column discipline

- Prefer **one readable measure** for prose and most sections (a bounded max width).
- **Break width only with intent:** hero immersion, full-bleed imagery, maps, or asymmetric galleries—not arbitrary “full width because we can.”

**Why:** Narrow measures signal **reading**; wide measures signal **environment or scanning**. Mixing them without purpose destroys hierarchy.

---

## Register shifts (two-register layouts)

Use **two-register** composition when two kinds of cognition must coexist:

| Register | Typical role |
|----------|----------------|
| **Primary column** | Story, argument, emotional setup |
| **Secondary column or panel** | Proof, illustration, inventory summary, schedule |

**Why:** Humans cannot absorb prose and a dense fact grid in one visual gesture. Splitting registers lets eyes **choose** story vs. facts instead of blending them into mush.

---

## Block roles (recurring layout intentions)

Reuse **layout roles**, not pixel-perfect grids from another project:

- **Parity grid:** comparable cards (same altitude, same affordances).
- **Mosaic / asymmetric grid:** gallery or proof—guides the eye from one anchor tile outward.
- **Vertical spine:** sequences (timeline, itinerary)—implies **order** and **duration**.
- **Contained island:** rounded/bordered panel holding operational data—signals **scanning**, not reading.

**Why:** Roles encode meaning. Reusing them trains users to recognize “this is a sequence” vs. “this is a basket of options.”

---

## Alternation as meaning

Alternate **open** sections (airy, default canvas) with **banded** sections (visually grouped background + boundaries) when:

- Content shifts from **narrative** to **operational**, or
- Density increases (lists, policies, specs).

**Why:** Alternation creates **chapter boundaries** without requiring literal headings for every mood shift.

---

## Closure and continuity

End substantive pages with:

1. **Decision or planning adjacency** (how to act next), then
2. **Continuity** (related journeys, sibling destinations, “same posture” exploration).

**Why:** Closing only on conversion feels transactional; closing only on related content feels aimless. Pair them.

---

## Anti-patterns

- **Mirror symmetry for decoration:** two equal columns without distinct semantic roles confuse scanning order.
- **Hero + immediate dense tables:** strips emotion before trust exists.
- **Multiple competing CTAs at the same visual weight** before intent is established.

---

## Transfer checklist (any stack)

1. Is there exactly **one** primary story arc on this page?
2. Does each section have a **named intention** (not just “Section 3”)?
3. Do wide layouts **earn** their width (maps, galleries, immersion)?
4. Does density increase only after **context** sections establish *why* it matters?

See also: [density-rules.md](./14-density-rules.md), [section-sequencing.md](./12-section-sequencing.md).

# Yugam.io — Claude Code Prompts

**Version:** 1.0 · **Date:** 2026-07-10

Copy-paste these prompts into Claude Code **in order**, inside the website repo
(`.../yugam-website/`). Each prompt is a self-contained, reviewable unit of work.
Do NOT paste them all at once — run one, review the diff, commit, then continue.

Assumes this handoff folder sits at the repo root as `design-handoff/` (adjust the path if you put it elsewhere). All referenced docs live there: `YUGAM-TECH-SPEC.md`, `YUGAM-SITEMAP.md`, `YUGAM-BRAND-LANGUAGE.md`, and the `mockup-*.png` files.

---

## PROMPT 0 — Orientation (run first, no code changes)

```
Read design-handoff/YUGAM-TECH-SPEC.md, design-handoff/YUGAM-SITEMAP.md, and
design-handoff/YUGAM-BRAND-LANGUAGE.md in full. Then read CLAUDE.md at the repo root.

Explore the current codebase: index.html, about.html, methodology.html, ai-stack.html,
faq.html, prompt-library.html, and assets/css/design-v2.css, assets/js/design-v2.js,
assets/js/enhance.js. Do NOT open or modify assets/css/enhance.css (read-only).

Give me: (1) a short map of how each page is structured (inline styles vs design-v2.css),
(2) confirmation of where the design tokens currently live, (3) a task-by-task plan that
matches the spec's priority order (all H, then M, then L). Make no code changes yet.
```

---

## PROMPT 1 — Foundations: tokens, type scale, card system (spec §1, §3)

```
Implement spec §1 (design tokens: color, type scale, spacing) and §3 (the .card / .card--dark
system) in assets/css/design-v2.css. Add only missing tokens; keep existing values.
Apply the modular type scale per the §1.2 table across all pages. Replace the two ad-hoc
card treatments with the single C3 card system site-wide (see mockup-*.png).
Do not touch assets/css/enhance.css. Show me the diff before committing.
```

---

## PROMPT 2 — Global copy & label fixes (spec §2)

```
Apply spec §2 tasks G1, G2, G3 across the repo:
- G1: unify the third engagement pillar to "Enable" in every heading/label (index.html,
  methodology.html, faq.html, nav/footer). Keep "training" as a common noun in body copy.
- G2: replace maskyrohit@gmail.com with rohit@yugam.io everywhere; route the cost-calculator
  CTA to #contact (not mailto).
- G3: reconcile "three phases" vs "six steps" per the spec wording.
Grep to confirm no gmail.com remains and no pillar heading says "Train". Show the diff.
```

---

## PROMPT 3 — Homepage restructure (spec §4, mockup-home.png)

```
Restructure index.html to the section order in spec §4 / YUGAM-SITEMAP.md, using
mockup-home.png and mockup-home-mobile.png as the visual target. Implement:
4.A hero sub-copy tightened to two sentences + dial back the constellation in
    assets/js/design-v2.js (keep it interactive, keep reduced-motion fallback).
4.B credential strip (NEW) below hero — use the exact copy in design-handoff/CLAUDE.md.
4.C stat band with GOLD (--teak-light) numbers + sourced context lines.
4.D show only 3 featured diagnostics (D1 layout) + "See all 8 diagnostics →" link.
4.E move Readiness ABOVE Case Studies.
4.F Process section with the 3→6 note and bold Output: lines.
4.G contact form primary + newsletter as a slim strip; remove extra CTAs.
Show the diff before committing.
```

---

## PROMPT 4 — New Diagnostics page (spec §6, mockup-diagnostics.png)

```
Create diagnostics.html per spec §6, matching mockup-diagnostics.png. Include the 3 featured
diagnostics (D1 layout, for continuity with the homepage), the 5 "go deeper" tools moved off
the homepage as a 3-col .card grid, and the honesty note panel. Add "Diagnostics" to the
Resources ▾ nav dropdown and wire the homepage + ai-stack "see all diagnostics" links to it.
Reuse the card system and type tokens. Show the diff.
```

---

## PROMPT 5 — AI Stack page (spec §5.A, mockup-ai-stack.png)

```
Refine ai-stack.html per spec §5.A (tasks A1–A4), matching mockup-ai-stack.png:
reduce hero to ~52vh with content vertically centered and ambient constellation behind;
add the "start with these four" row; make the category filter chips sticky and have them
section the 21-tool list; render tools as .card items in category groups with optional
TOP PICK tags. Show the diff.
```

---

## PROMPT 6 — Methodology page (spec §5.C, mockup-methodology.png)

```
Refine methodology.html per spec §5.C (M1–M3), matching mockup-methodology.png:
reduce hero height; add the 3-engagements→6-steps mapping bar; render six steps in the
3-column row layout with a stone-2 Output panel each; unify labels to "Enable". Show the diff.
```

---

## PROMPT 7 — About page (spec §5.B, mockup-about.png)

```
Refine about.html per spec §5.B, matching mockup-about.png. Fix the timeline so every role
has its own company + date header (no orphaned roles). Use these entries in order:
- Yugam — June 2026 – Present — Founder, AI Strategist and Systems Architect
- Meta — 2016 – 2026 — (single merged block; do NOT include "Senior Program Manager,
  Business Engineering") — operations, strategy, product, customer experience
- KPMG — 2012 – 2015 — Governance, Risk & Compliance (Fortune-500 risk & process advisory)
- Vedanta Aluminium Limited — 2010 – 2012 — Operations, Manufacturing Shop Floor
Add the two-column hero (bio + round photo) and the credential strip (three separate lines,
exact copy in design-handoff/CLAUDE.md). Founder subtitle: "AI Strategist and Systems Architect".
Show the diff.
```

---

## PROMPT 8 — Magnetic CTA effect (spec §7)

```
Implement the magnetic-pull effect from spec §7 in assets/js/design-v2.js. SCOPE: primary CTA
ONLY — the hero "Let's Talk" + "Take the AI Assessment" pair, and optionally the contact submit.
Do NOT apply it to nav, cards, chips, or secondary links. Use RADIUS 45, PULL 0.12, MAX cap 6px,
and ensure ≥24px gap between the paired hero buttons. Add data-magnetic + inline-block +
will-change:transform to those buttons. Must no-op under prefers-reduced-motion. Show the diff.
```

---

## PROMPT 9 — Responsive + accessibility (spec §8, §9)

```
Implement spec §8 (responsive rules) and §9 (accessibility). Verify at 375px, 768px, 1280px.
Key items: mobile hero single-column with photo first & capped at 200px; CTAs stacked ≥44px;
stat band 2×2; card grids single-column; hamburger nav with grouped menu; body never <16px.
Confirm AA contrast over the grained hero and reduced-motion fallbacks on every animation.
Show the diff.
```

---

## PROMPT 10 — Final QA (spec §10)

```
Run the spec §10 QA checklist against the whole site and report pass/fail per item. Fix any
fails. Confirm assets/css/enhance.css is unchanged (git diff --stat should not list it).
Then update CLAUDE.md's "Change log" section with a dated summary of what shipped.
```

---

## Notes for the operator

- Review the diff after every prompt; commit per prompt with a message like
  `refine: homepage restructure (spec §4)`.
- If a prompt is too large for one pass, ask Claude Code to split it by section (e.g. "do 4.A–4.D now, 4.E–4.G next").
- The mockups are the visual source of truth; the spec is the behavioral/precise source of truth. Where they seem to differ, the spec wins — ask if unsure.

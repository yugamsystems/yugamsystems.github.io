# CLAUDE.md — Yugam.io

> Place this file at the ROOT of the yugam-website repo. Claude Code reads it automatically
> for persistent project memory. It captures brand rules, decisions, and history so future
> sessions stay consistent.

## What this project is

Yugam.io — the website for Rohit Kumar Maskara's independent AI transformation advisory.
Positioning, palette, and voice are documented in `design-handoff/YUGAM-BRAND-LANGUAGE.md`.
Read that + `design-handoff/YUGAM-TECH-SPEC.md` before making design changes.

## Hard rules (never violate)

1. Palette is warm stone/ink/teak — see brand doc §2. No new hues.
2. Founder photo is always round, grayscale-sepia, prominent.
3. No custom cursor.
4. Homepage hero constellation is INTERACTIVE (mouse-reactive). Methodology + AI Stack heroes
   are AMBIENT. Article pages have NONE.
5. No AI clichés (circuit boards, glowing orbs, robots, generic tech stock).
6. Every motion effect has a `prefers-reduced-motion: reduce` fallback.
7. Nav is transparent → frosted-on-scroll.
8. `assets/css/enhance.css` is READ-ONLY. Never modify it.
9. Third engagement pillar is always "Enable" (never "Train" / "Training & Enablement").
10. Currency is dollars. Email is rohit@yugam.io (never a personal gmail).
11. Magnetic CTA pull is PRIMARY-CTA-ONLY (hero pair + optional contact submit). Never on
    nav, cards, chips, or secondary links.

## Design tokens

Source of truth is `assets/css/design-v2.css` `:root`. Full list in
`design-handoff/YUGAM-TECH-SPEC.md` §1. Type scale is modular (ratio ≈1.4); body never <16px.

## Canonical copy blocks

**Homepage credential strip (one line):**
> A decade running operations, strategy, and product at Meta. Risk and process work for the
> Fortune 500 at KPMG. A career that began on a manufacturing shop floor — running operations,
> not slide decks.

**About credential strip (three separate lines):**
> A decade inside Meta running operations, strategy, product, and customer experience.
> Advising Fortune 500 companies on risk management and process optimization at KPMG.
> A career that began on a manufacturing shop floor, running hands-on operations, not preparing slide decks.

**Manifesto:** "AI without organizational readiness is just expensive software."

**Founder title:** AI Strategist and Systems Architect.

**About timeline (in order):**
- Yugam — June 2026 – Present — Founder, AI Strategist and Systems Architect
- Meta — 2016 – 2026 — single merged block (operations, strategy, product, customer experience)
- KPMG — 2012 – 2015 — Governance, Risk & Compliance
- Vedanta Aluminium Limited — 2010 – 2012 — Operations, Manufacturing Shop Floor

## Design decisions on record (with rationale)

- **Hero layout = H1 (balanced two-column).** Headline left, founder card right. Keeps the
  person present without letting the photo dominate.
- **Cards = C3 (elevated white / dark featured).** Chosen over hairline and quiet variants for
  clear contrast; fixes the muddy stone-on-stone cards that read as flat text.
- **Stat band = S1 with GOLD numbers.** Dark band, `--teak-light` numerals, each with a sourced
  context line (sector/team size) — unsourced numbers read as marketing on a truth-teller brand.
- **Diagnostics = D1 (1 featured + 2).** Homepage shows 3, not 8; the rest live on
  `diagnostics.html`. Eight cards read as a directory and contradicted the "few good tools" thesis.
- **Credential strip = R2 (serif sentence).** Logo-free, type-only — no logos to license, on-brand.
- **Readiness moved above Case Studies.** Argument before proof.
- **Magnetic effect scoped to primary CTA only.** Broad use cheapens the signal and fights the
  "advisor not SaaS" tone. Gentle tuning (RADIUS 45 / PULL 0.12 / MAX 6 / ≥24px gap) so paired
  buttons never overlap.

## How this refinement was produced

A design audit (`design-handoff/`, and the original brief) identified: inconsistent type scale,
two card treatments, an over-stuffed 8-tool diagnostics section, a 3-way pillar-label
contradiction, oversized inner-page hero constellation fields, an orphaned About timeline role,
unsourced/recycled stat numbers, and a personal-gmail contact. The fixes are specced in
`YUGAM-TECH-SPEC.md` and visualized in the `mockup-*.png` files. Implement via
`YUGAM-CLAUDE-CODE-PROMPTS.md` (run prompts in order, commit per prompt).

## Change log

- 2026-07-10 — Design refinement pass specced & mocked (audit → brief → mockups → spec).
  Not yet implemented in the repo. First implementation should follow the prompt sequence
  and append its results here.

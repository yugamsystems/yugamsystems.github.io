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

- 2026-07-10 — Design implementation pass (Prompts 0–10) shipped in full:
  - **Prompt 0:** Validation gate (`scripts/validate.py`) + `assets/css/design-v2.css` token layer
    established. All subsequent commits gated on `python3 scripts/validate.py` passing.
  - **Prompt 1:** Homepage stat band (S1) with gold `--teak-light` numbers; sourced context lines
    per stat; responsive 2×2 at 900px.
  - **Prompt 2:** Homepage redesign — H1 hero layout (headline left, founder card right);
    credential strip R2 (serif sentence, no logos); Readiness section moved above Case Studies;
    C3 card system (white `.card` + dark `.card--dark`) applied sitewide; diagnostics trimmed
    to D1 (1 featured dark card + 2 white); "Enable" pillar corrected everywhere.
  - **Prompt 3:** `diagnostics.html` built from scratch — full-page tool hub with featured ATI
    card (dark), 2-column secondary row, 5-tool go-deeper grid, and honesty-note panel.
    Wired to nav on all pages.
  - **Prompt 4:** Nav updated sitewide — "Diagnostic Tools" → "Diagnostics" → `./diagnostics.html`
    (desktop + mobile) across index, ai-stack, methodology, about, prompt-library.
  - **Prompt 5:** AI Stack page hero — 52vh min-height, `--fs-h1` scale, ambient constellation;
    "Top Pick" starter row (4 cards: Claude dark, ChatGPT, Zapier, HubSpot); tool cards grouped
    by category in default/all view; mobile: 2-col starter row, cards 3–4 hidden.
  - **Prompt 6:** Methodology page — 52vh hero with ambient constellation; 3-column phase layout
    (260px nav | content | 260px output panel); mapping bar (Assess / Build / Enable);
    engagement kicker on all 6 phases; output panel per phase (stone-2 inset, hidden at 1024px).
  - **Prompt 7:** About page — full hero with kicker + `--fs-h1` headline "AI Strategist and
    Systems Architect" + 3-line credential strip + round 280×280 grayscale-sepia photo;
    sidebar role updated; timeline canonicalised to 4 entries.
  - **Prompt 8:** Magnetic CTA — `magneticCTA()` added to `design-v2.js`; `data-magnetic`
    on hero CTA pair in index.html; gap corrected to 24px; `prefers-reduced-motion` respected.
  - **Prompt 9:** Mobile pass — container 22px gutter; hero photo 200×200; hero CTAs stacked
    full-width ≥44px with 10px gap; hamburger aria-expanded wired; old inline magnetic code
    removed from index.html.
  - **Prompt 10:** QA — all gmail.com addresses replaced with rohit@yugam.io (blog post +
    risk playbook); `enhance.css` confirmed untouched; all nav links, section order, credential
    strip, stat band, hero photo verified; `diagnostics.html` added to `sitemap.xml`;
    CLAUDE.md copied to repo root with this change log appended.

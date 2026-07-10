# Yugam.io — Refinement Handoff Package

**Version:** 1.0 · **Date:** 2026-07-10
Everything Claude Code needs to implement the next design pass — and to retain memory of what
we decided and why.

---

## START HERE — how to hand off to Claude Code

1. **Copy this whole folder into your website repo** at the root, named `design-handoff/`:
   ```
   yugam-website/
   ├── design-handoff/          ← this folder
   │   ├── HANDOFF-README.md     (this file)
   │   ├── YUGAM-TECH-SPEC.md
   │   ├── YUGAM-SITEMAP.md
   │   ├── YUGAM-BRAND-LANGUAGE.md
   │   ├── YUGAM-CLAUDE-CODE-PROMPTS.md
   │   ├── CLAUDE.md             (see step 2)
   │   ├── mockup-home.png
   │   ├── mockup-home-mobile.png
   │   ├── mockup-ai-stack.png
   │   ├── mockup-methodology.png
   │   ├── mockup-about.png
   │   ├── mockup-diagnostics.png
   │   └── source/*.dc.html      (editable mockup sources)
   ├── index.html
   └── ...
   ```

2. **Move `CLAUDE.md` to the repo ROOT** (not inside `design-handoff/`). Claude Code reads a
   root-level `CLAUDE.md` automatically as persistent project memory. If you already have one,
   merge the two — keep both change logs.

3. **Open Claude Code in the repo** and paste the prompts from `YUGAM-CLAUDE-CODE-PROMPTS.md`
   **one at a time, in order** (0 → 10). Review the diff and commit after each. Prompt 0 makes
   no changes — it orients the agent and produces a plan.

4. **Review against the mockups.** The `mockup-*.png` files are the visual target; the spec is
   the precise/behavioral source of truth. Where they differ, the spec wins.

---

## What each file is for

| File | Purpose | Audience |
|---|---|---|
| `HANDOFF-README.md` | This file — how to run the handoff | You |
| `YUGAM-TECH-SPEC.md` | The work order: tokens, per-page CSS, copy find→replace, file/selector targets, magnetic code, responsive + a11y, QA checklist | Claude Code executes this |
| `YUGAM-SITEMAP.md` | Target IA, nav, page inventory, homepage section order, cross-links | Both |
| `YUGAM-BRAND-LANGUAGE.md` | Persistent brand & style system (palette, type, layout, motion, voice, anti-patterns) | Both, and future work |
| `YUGAM-CLAUDE-CODE-PROMPTS.md` | Copy-paste prompts, sequenced, one commit each | You → Claude Code |
| `CLAUDE.md` | Project memory: hard rules, canonical copy, decisions + rationale, change log | Claude Code (root of repo) |
| `mockup-*.png` | Rendered visual targets (desktop + mobile) | Visual reference |
| `source/*.dc.html` | The live mockup source — open in a browser to inspect exact markup/spacing and the working magnetic effect | Reference only (not the production stack) |

> **Note on `source/*.dc.html`:** these are self-contained mockups built in a component
> format for rapid prototyping — they are NOT the production framework. Use them to read exact
> values (spacing, colors, the magnetic JS) and to see interactions live. Implement in the
> actual site's HTML/CSS/JS per the spec. `support.js` is the mockup runtime; ignore it for production.

---

## Design decisions locked this round

Hero **H1** (balanced two-column) · Cards **C3** (elevated white / dark featured) ·
Stat band **S1** with **gold** numbers · Diagnostics **D1** (1 featured + 2) ·
Credential strip **R2** (serif sentence) · Magnetic pull **primary-CTA-only**.
Rationale for each is in `CLAUDE.md` → "Design decisions on record."

## Priority order (from the spec)

Do all **H** (high) tasks first — label unification, email fix, 3→6 reconciliation, diagnostics
split + new page, About timeline fix, reduced inner-hero heights. Then **M**, then **L**.
Full checklist in `YUGAM-TECH-SPEC.md` §10.

## Non-negotiables (never violate)

Warm stone/ink/teak palette · round founder photo · interactive homepage constellation ·
ambient constellation on methodology/ai-stack only · none on articles · no AI clichés ·
reduced-motion fallbacks · nav transparent→frosted · pillar always "Enable" · dollars ·
`rohit@yugam.io` · magnetic effect on primary CTA only · do NOT modify `assets/css/enhance.css`.

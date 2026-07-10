# Yugam.io — Refinement Implementation Spec

**Version:** 1.0 · **Date:** 2026-07-10
**For:** Claude Code (implementation agent)
**Companion assets:** `mockup-home.png`, `mockup-home-mobile.png`, `mockup-ai-stack.png`, `mockup-methodology.png`, `mockup-about.png`, `mockup-diagnostics.png`

---

## 0. How to use this document

This is the work order. Each task below is written to be executed without interpretation. Where a task says **FIND** / **REPLACE**, treat the strings as literal (match ignoring surrounding whitespace only). Where it names a **File** and **Selector/Section**, edit that location only. Do not restyle or "improve" anything not named in a task.

**Golden rules — do not violate:**
1. Preserve the warm stone / ink / teak palette (tokens in §1). Do not introduce new hues.
2. Keep the founder photo round, grayscale-sepia, prominent.
3. No custom cursor.
4. Keep the homepage hero constellation **interactive** (mouse-reactive). Keep methodology/ai-stack heroes **ambient** (no mouse tracking). **No** constellation on article pages.
5. No AI clichés: no circuit boards, no glowing orbs, no robot/tech stock imagery.
6. Every motion effect must have a `prefers-reduced-motion: reduce` off-switch.
7. Keep nav transparent → frosted-on-scroll.
8. `assets/css/enhance.css` is **read-only** — do not modify it.

**Priority legend:** **H** = fixes a real problem, do first · **M** = meaningful improvement · **L** = polish.

---

## 1. Design tokens (source of truth)

Add/confirm these as CSS custom properties on `:root` in `assets/css/design-v2.css`. If any already exist with the same name, keep the existing value; only add missing ones.

### 1.1 Color

```css
:root{
  --stone:#F4EFE9;        /* primary background (warm off-white) */
  --stone-2:#EDE7DF;      /* alt section background / inset panels */
  --ink:#1A1612;          /* near-black: dark sections + primary text */
  --teak:#8B6914;         /* accent, primary CTA, links, kickers */
  --teak-light:#C9A94E;   /* gold on dark backgrounds (stat numbers, dark-card CTA) */
  --bark:#6B5E51;         /* secondary text */
  --drift:#9B9183;        /* tertiary text, labels */
  --sand:#E8E1D8;         /* borders, quiet card fill */
  --clay:#D4CBC0;         /* dividers */
  --card:#FFFFFF;         /* elevated card fill (see §3 card system) */
  --card-border:#E4DCD0;  /* hairline on quiet cards */
  --pos:#1F8A5B;          /* "after"/positive metric (already in use) */
  --neg:#B4462A;          /* "before"/negative metric + error accents */
}
```

**Color application rules (enforce site-wide):**
- **Teak (`--teak`)** is reserved for: the ONE primary CTA per viewport, the single italic headline word, links, and mono kickers. Do **not** use teak for hover bars on secondary cards or for decorative rules.
- On dark (`--ink`) backgrounds, gold accents use **`--teak-light`**, never `--teak` (contrast).
- Secondary/hover affordances use `--bark` or `--drift`, never teak.
- Positive/negative metrics use `--pos` / `--neg`.

### 1.2 Type scale (modular, ratio ≈ 1.4)

Replace the three ad-hoc heading sizes (hero clamp, inner-page fixed 80, article 58) with ONE scale. Define as tokens and apply per the table.

```css
:root{
  --font-serif:'DM Serif Display', Georgia, serif;
  --font-sans:'Inter', system-ui, sans-serif;
  --font-mono:'JetBrains Mono', ui-monospace, monospace;

  --fs-display:clamp(48px, 6.5vw, 90px);  /* homepage hero H1 only */
  --fs-h1:clamp(40px, 4.6vw, 64px);       /* inner-page hero H1, article H1 */
  --fs-h2:clamp(30px, 3vw, 44px);         /* section headings */
  --fs-h3:clamp(22px, 2vw, 30px);         /* card/subsection headings */
  --fs-lead:17px;                          /* hero/section intro paragraph */
  --fs-body:16px;                          /* body copy — never below 16 */
  --fs-small:13.5px;                       /* card body, captions */
  --fs-kicker:12px;                        /* mono eyebrow/kicker */
}
```

| Element | Token | Family | Notes |
|---|---|---|---|
| Homepage hero H1 | `--fs-display` | serif | italic teak word only on "easy" |
| Inner-page hero H1 (AI Stack, Methodology, About, Diagnostics) | `--fs-h1` | serif | |
| Article H1 | `--fs-h1` | serif | |
| Section heading | `--fs-h2` | serif | |
| Card / subsection heading | `--fs-h3` | serif | |
| Lead paragraph | `--fs-lead` | sans | line-height 1.7, color `--bark` |
| Body | `--fs-body` | sans | line-height 1.7–1.78 |
| Kicker/eyebrow | `--fs-kicker` | mono | uppercase, letter-spacing 0.16em, color `--teak` |

Line-height: serif headings `1.04–1.12`; body `1.7`; article body `1.78`.

### 1.3 Spacing rhythm

One section-padding token, applied to every top-level `<section>` vertical padding:

```css
:root{ --section-pad:clamp(72px, 9vw, 132px); }
section{ padding-top:var(--section-pad); padding-bottom:var(--section-pad); }
```

Horizontal page gutter: `80px` desktop, `22px` mobile (≤640px). Card grid gap: `24px` desktop, `14px` mobile. Card interior padding: `30–34px` desktop, `20–22px` mobile.

---

## 2. Global copy / labeling fixes (do these first — they touch many files)

### TASK G1 — Unify the third engagement label — **H**
The third pillar is currently "Train" (Services, FAQ), "Enable" (homepage Process), and "Training & Enablement" (Methodology). Standardize on **"Enable"**.
- **Files:** `index.html`, `methodology.html`, `faq.html`, and any nav/footer references.
- **FIND** (case-sensitive, whole-label occurrences in headings/pill labels): `Train` and `Training & Enablement` where they name the pillar.
- **REPLACE:** `Enable`.
- Body copy describing the phase may keep the word "training" as a common noun (e.g. "role-specific training"); only the **pillar label/heading** becomes "Enable".
- **Acceptance:** Grep the repo for the pillar in a heading context → only "Enable" appears. Homepage Services card 03, Process phase 03, Methodology step 05–06 grouping, and FAQ engagement answer all say "Enable".

### TASK G2 — Replace personal email with domain email — **H**
- **Files:** all pages + the calculator CTA + footer.
- **FIND:** `maskyrohit@gmail.com`  **REPLACE:** `rohit@yugam.io`
- Also: the cost calculator's primary button must route to the on-page contact form (`href="#contact"`), **not** a `mailto:`.
- **Acceptance:** No `gmail.com` string remains in the repo. Calculator CTA scrolls to `#contact`.

### TASK G3 — "Three phases" vs "six steps" reconciliation — **H**
Wherever the homepage says the engagement is "three phases," it must bridge to the six-step Methodology.
- **File:** `index.html`, Process section intro.
- **REPLACE** the intro line with: `Three engagements — Assess, Build, Enable — expanded into six detailed steps on the Methodology page. Each phase ends with a deliverable your team owns.`
- **File:** `methodology.html`, add a mapping bar above the step list (see §5.C).

---

## 3. Card system (site-wide) — **M** — TASK C0

There are currently two card treatments (crisp on Prompt Library, muddy stone-on-stone elsewhere). Standardize on ONE elevated card, matching mockup selection **C3**.

Create a reusable class and apply to every card grid (diagnostics, tools, services, insights, case studies, readiness):

```css
.card{
  background:var(--card);            /* #FFFFFF */
  border:none;
  border-radius:14px;
  padding:30px;
  box-shadow:0 10px 30px rgba(26,22,18,0.08);
  transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
}
.card:hover{ transform:translateY(-4px); box-shadow:0 16px 40px rgba(26,22,18,0.12); }
/* Featured / "start here" card is the inverse: */
.card--dark{ background:var(--ink); color:var(--stone); box-shadow:0 14px 40px rgba(26,22,18,0.14); }
.card--dark .kicker{ color:var(--teak-light); }
```

- On mobile (≤640px) reduce `border-radius` to 12px and padding to 20–22px.
- Remove the old sand-on-stone card backgrounds and teak left-border card variants except where explicitly a callout (§5 readiness quote uses `--ink` dark card).
- **Acceptance:** Every card on homepage + AI Stack + Diagnostics uses `.card` (white, soft shadow) or `.card--dark`. No stone-on-stone low-contrast cards remain.

---

## 4. Homepage (`index.html`) — section order + fixes

**Target section order (top→bottom)** — reorder the DOM to this. See `mockup-home.png`.

1. Nav
2. Hero (H1 layout — see §4.A)
3. **Credential strip** (NEW — §4.B)
4. Stat band (§4.C)
5. Diagnostics — 3 featured + "see all 8" (§4.D)
6. AI Stack teaser
7. Services (Assess / Build / **Enable**)
8. **Readiness** — *moved ABOVE case studies* (§4.E)
9. Case studies
10. Process (three engagements → six steps note, §4.F)
11. Manifesto
12. Insights
13. Contact (primary) + Newsletter (slim secondary) (§4.G)
14. Footer

### TASK 4.A — Hero (layout H1) — **M**
Keep the current balanced two-column hero (headline left, founder card right). Two changes:
1. **Tighten sub-copy to two sentences.** **FIND** the 4-sentence hero paragraph; **REPLACE** with:
   `The hard part is knowing whether your people, processes, and data are ready for it. I help founders and leadership teams design AI strategies grounded in how their business actually operates — not how it looks on a slide deck.`
2. **Dial back the constellation.** In `assets/js/enhance.js`, reduce node opacity and line density so it reads as atmosphere behind the headline (target: node alpha ≈ 0.5, connective-line alpha ≈ 0.25, ~30–40% fewer nodes). Keep mouse-reactivity. Keep the `prefers-reduced-motion` static fallback.
- **Hero CTAs:** two buttons — primary `Let's Talk` (teak fill), secondary `Take the AI Assessment` (1px `--clay` border, ink text). Both get the magnetic effect (§7).

### TASK 4.B — Credential strip (NEW) — **M**
Insert directly below the hero, above the stat band. Matches mockup selection **R2**.
```html
<div class="cred-strip">
  <span class="kicker">The background —</span>
  <p>A decade inside Meta. Fortune-500 risk and process work at KPMG. A career that began on a manufacturing shop floor — reading operations, not slide decks.</p>
</div>
```
- Style: full-width inside the 80px gutter; `border-top`/`border-bottom` 1px `--clay`; padding 24px 0; kicker mono teak; sentence in `--font-serif` at 21px, color `--ink`, line-height 1.3; flex row with 28px gap (kicker left, sentence right); stack on mobile.

### TASK 4.C — Stat band (S1, gold numbers) — **M**
Dark `--ink` band. Four metrics, numbers in `--font-serif` at ~56px colored **`--teak-light`** (gold), each with a sourced context line in `--drift`.
- Numbers/labels: `82%` — "Process automation — 12-person operations team, logistics" · `21min` — "Contract review, cut from 4 hours — professional services" · `$240K` — "Annual savings — intelligent document processing, manufacturing" · `53%` — "Support tickets auto-resolved — SaaS support desk".
- Keep the count-up animation; add `prefers-reduced-motion` fallback that shows final numbers immediately.
- **Note:** copy above is structural/illustrative — Rohit will confirm real figures. Keep the sourced-context pattern regardless.

### TASK 4.D — Diagnostics: 3 featured + move 5 to new page — **H**
- On the homepage, show only THREE diagnostics in layout **D1**: one dark featured hero card (`AI Transformation Index`, `.card--dark`, `--teak-light` CTA) spanning ~1.6fr, plus two white `.card`s (`Implementation Risk`, `Cost-to-Deploy`).
- Add a text link below the grid: `See all 8 diagnostics →` → `/diagnostics.html`.
- Move the other 5 tools to the new Diagnostics page (§6).
- **Acceptance:** Homepage shows exactly 3 diagnostic cards + the "see all" link. `/diagnostics.html` exists and lists all 8.

### TASK 4.E — Move Readiness above Case Studies — **H**
DOM reorder only: the "Three things I check" Readiness section (with the dark pull-quote card) must render **before** the Case Studies section. No restyle.

### TASK 4.F — Process section — **M**
Three columns (Assess / Build / Enable), each with a top teak rule, duration kicker, and a bold **Output:** line. Intro copy per TASK G3. See mockup for the "Output" emphasis pattern.

### TASK 4.G — Contact primary, newsletter slim — **M**
- Contact form is the primary closing block (two-column: heading+blurb left, form right). Email field placeholder shows `rohit@yugam.io`. Submit button teak.
- Newsletter becomes a single slim horizontal strip **below** the contact block: one line of copy + inline email input + dark `Subscribe` button. Remove the large standalone newsletter section.
- Remove any third CTA / mailto elsewhere in the page flow.

---

## 5. Inner pages

### 5.A AI Stack (`ai-stack.html`) — see `mockup-ai-stack.png`

- **TASK A1 (H):** Reduce hero height. The hero currently opens with ~40% empty constellation before the H1. Set hero `min-height:52vh`, vertically center the kicker + H1 + intro, ambient constellation behind at ≤0.4 opacity. H1 uses `--fs-h1`.
- **TASK A2 (M):** Add a "Start with these four" row of 4 cards (`.card`, first one `.card--dark`) directly under the hero — the tools clients begin with.
- **TASK A3 (M):** Make the category filter chips a **sticky** bar (`position:sticky; top:0; backdrop-filter:blur(8px); background:rgba(244,239,233,.94)`), and have them actually section the 21-tool list by category (Productivity, Automation, Sales & Marketing, Customer Support, Data & Analytics, Knowledge).
- **TASK A4 (M):** Render the 21 tools in category groups (heading + count), each tool as a `.card` in a 2-col grid, with an optional `TOP PICK` tag (`--pos` on a light-green chip). Reinforce the "two or three tools beat a dozen" thesis by leading with the four picks.

### 5.B About (`about.html`) — see `mockup-about.png`

- **TASK B1 (H):** Fix the timeline. Every role entry must have its own **company + date header**. Currently the 2024–2026 Meta role renders orphaned (title only). Restructure the timeline so each item = `{ company (serif 22px), date (mono teak), role title (600), description }`. Roles in order: Yugam (2025–Present), Meta (2024–2026, Senior Program Manager, Business Engineering), Meta (2015–2024, Program & Operations Leadership), KPMG (2012–2015, Governance/Risk/Compliance), Manufacturing shop floor (early career).
- **TASK B2 (M):** Add a proper hero/intro (two-column: heading+bio left, round founder photo right ~260px) so About matches the other pages' entry rhythm. Add the R2 credential strip below the intro.

### 5.C Methodology (`methodology.html`) — see `mockup-methodology.png`

- **TASK M1 (H):** Reduce hero height (same treatment as AI Stack A1). H1 uses `--fs-h1`.
- **TASK M2 (H):** Add a mapping bar above the step list making the 3→6 relationship explicit: three columns (Engagement 01 Assess = Steps 1–2; 02 Build = Steps 3–4; 03 Enable = Steps 5–6), each with a teak left-rule.
- **TASK M3 (M):** Render the six steps in a 3-column row each: `{ big number + engagement kicker } | { step title + description } | { Output panel (stone-2 inset) }`. Unify labels per TASK G1.

### 5.D FAQ / Prompt Library — **L**
These are the strongest pages; leave layout as-is. Only: apply TASK G1 (the FAQ engagement answer says "Train" → "Enable") and confirm they use the `.card` system and the §1 type tokens. Treat these pages as the quality bar for the rest.

### 5.E Article pages — **L**
No constellation (rule 4). Apply §1 type tokens: H1 = `--fs-h1`, body 17px/1.78, teak callout keeps its left-border. No other changes.

---

## 6. NEW PAGE — `diagnostics.html` — **H** — see `mockup-diagnostics.png`

Create the page that receives the 5 tools moved off the homepage.
- **Hero:** kicker `Free Diagnostics — no email required`; H1 `Know where you stand before you spend.` (`--fs-h1`, italic teak on "before"); one-line intro. No constellation needed (or ambient, low).
- **Featured row:** the same 3 featured diagnostics as the homepage (D1 layout) for continuity.
- **"Go deeper" grid:** the 5 remaining tools as `.card`s in a 3-col grid: `Cost-Savings Calculator` (Value), `Use-Case Prioritizer` (Prioritization), `Data Readiness Check` (Data), `Team Adoption Survey` (People), `AI Policy Generator` (Governance). Each: mono category kicker, serif title, one-line description, `Open tool →` link.
- **Honesty note:** stone-2 panel with teak left-border: "None of these ask for your email, and none of them try to sell you something at the end. They exist so you can arrive at a conversation already knowing where you stand. If a tool tells you you're not ready, that's the tool working."
- **Nav:** add `Diagnostics` under the `Resources ▾` dropdown; link the homepage + AI Stack "see all diagnostics" CTAs here.

---

## 7. Magnetic CTA buttons — **M** — TASK 7

Add a "gravitational pull" hover to the **primary CTA only**. As the cursor approaches within a proximity radius, the button translates a fraction of the way toward it; on exit it springs back.

**SCOPE RULE (decided — do not broaden):** apply `data-magnetic` ONLY to the single primary CTA per page — the hero `Let's Talk` and its paired `Take the AI Assessment`, and optionally the contact-form submit. Do **NOT** put it on nav buttons, card-footer links, filter chips, "see all" links, or any secondary/tertiary action. Rationale: the effect's value is that it marks *the* action worth taking; if every button pulls, nothing stands out — which fights the "senior advisor, not SaaS" positioning. Everything else uses the calmer specced hovers (card lift, teak underline sweep).

Reference implementation (vanilla, drop into `assets/js/design-v2.js`; **not** enhance.css/js):

```js
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const RADIUS = 45;   // px of influence beyond the button edge
  const PULL   = 0.12; // fraction of cursor offset the button travels
  const MAX    = 6;    // px hard cap so adjacent buttons never overlap
  document.querySelectorAll('[data-magnetic]').forEach(btn=>{
    let raf=null, tx=0, ty=0, cx=0, cy=0;
    const tick=()=>{
      tx+=(cx-tx)*0.18; ty+=(cy-ty)*0.18;
      btn.style.transform=`translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px)`;
      if(Math.abs(cx-tx)>0.1||Math.abs(cy-ty)>0.1){ raf=requestAnimationFrame(tick); }
      else { btn.style.transform=`translate(${cx}px,${cy}px)`; raf=null; }
    };
    window.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
      const reach=Math.max(r.width,r.height)/2+RADIUS;
      if(Math.hypot(dx,dy)<reach){
        cx=Math.max(-MAX,Math.min(MAX,dx*PULL));
        cy=Math.max(-MAX,Math.min(MAX,dy*PULL));
      } else { cx=0; cy=0; }
      btn.style.transition='none';
      if(!raf) raf=requestAnimationFrame(tick);
    });
    btn.addEventListener('mouseleave',()=>{
      cx=cy=0; btn.style.transition='transform .45s cubic-bezier(.22,1,.36,1)';
      btn.style.transform='translate(0,0)'; if(raf){cancelAnimationFrame(raf);raf=null;}
    });
  });
})();
```
- Add `data-magnetic` + `display:inline-block; will-change:transform;` to the target buttons.
- **Tuning:** keep the pull gentle so adjacent CTAs never overlap — `RADIUS` 40–55px, `PULL` 0.10–0.15, `MAX` cap 6px, AND set the gap between side-by-side CTAs to ≥24px. With a 6px cap and 24px gap, two buttons pulled toward a cursor between them stay ≥12px apart. Do not raise `PULL` past ~0.18.
- **Acceptance:** With reduced-motion OFF, hovering near a CTA visibly pulls it toward the cursor and it springs back on exit. With reduced-motion ON, no transform is applied and the button is fully clickable.

---

## 8. Responsive rules

Breakpoints: `≤1024px` (tablet), `≤640px` (mobile). See `mockup-home-mobile.png`.

- **Hero (≤640px):** single column, **photo first** (order: photo → kicker → H1 → sub-copy → CTAs). Cap founder photo at **200px** (currently 320 — too large on 375). Stack CTAs full-width, ≥44px tall, 10px gap.
- **Stat band (≤640px):** 2×2 grid, numbers ~38px.
- **All card grids:** collapse to single column ≤640px; 2-col at tablet.
- **Diagnostics D1 (≤640px):** stack featured card on top, supporting cards below, single column.
- **Type:** body never below 16px. `--fs-display` floors at 48px via clamp — verify at 375px.
- **Gutter:** 22px mobile.
- **Nav (≤640px):** hamburger; grouped menu (Explore / Resources subheadings) so the flattened list stays scannable.
- **Process/sticky-split:** provide a non-sticky stacked fallback ≤640px.

---

## 9. Accessibility

- **Contrast:** verify body text over the grained hero meets WCAG AA (≥4.5:1). If marginal, reduce grain to ~1.8% or set text to full `--ink`. `--bark` on `--stone` and `--drift` on `--ink` must both pass AA for their text sizes.
- **Motion:** every animation (constellation, count-up, word-reveal, magnetic buttons, card hovers) must no-op under `prefers-reduced-motion: reduce`.
- **Targets:** interactive targets ≥44×44px on mobile.
- **Semantics:** one `<h1>` per page; sections use `<section>` with an accessible heading; nav is a `<nav>`; the mobile menu toggle has `aria-expanded`.
- **Focus:** visible focus ring on all links/buttons/inputs (teak outline, 2px). Do not remove outlines without a replacement.
- **Forms:** contact + newsletter inputs have associated `<label>`s (visually-hidden is fine).

---

## 10. QA checklist (run before handing back)

- [ ] No `gmail.com` anywhere; calculator CTA → `#contact`.
- [ ] Pillar is "Enable" in every heading/label; body "training" noun allowed.
- [ ] Homepage order matches §4; Readiness renders before Case Studies.
- [ ] Homepage shows exactly 3 diagnostics + "See all 8 diagnostics →".
- [ ] `/diagnostics.html` exists with 3 featured + 5 deeper tools + honesty note; linked from nav + homepage + AI Stack.
- [ ] Credential strip present under homepage hero and on About.
- [ ] Stat band numbers are `--teak-light` gold with sourced context lines.
- [ ] AI Stack + Methodology heroes fit content in first screen (≤52vh hero); constellation ambient behind.
- [ ] Methodology has the 3→6 mapping bar; six steps each show an Output panel.
- [ ] About timeline: every role has company + date header; no orphaned Meta role.
- [ ] All cards use `.card` / `.card--dark`; no stone-on-stone low-contrast cards.
- [ ] Teak appears once per viewport as the primary action (plus links/kickers/italic word only).
- [ ] Magnetic CTAs pull toward cursor; disabled under reduced-motion.
- [ ] Homepage hero constellation still interactive; article pages have none.
- [ ] Mobile (375px): photo ≤200px & first; CTAs stacked ≥44px; stat band 2×2; body ≥16px.
- [ ] All motion has reduced-motion fallback; AA contrast verified over grain.
- [ ] `assets/css/enhance.css` unchanged.

---

## 11. Out of scope (do NOT do)

- Do not redesign FAQ or Prompt Library layouts.
- Do not change the palette or fonts.
- Do not remove the constellation or the round photo.
- Do not add new content sections beyond those specified here (ask Rohit first).
- Do not touch `assets/css/enhance.css`.

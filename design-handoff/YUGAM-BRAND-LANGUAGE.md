# Yugam — Brand & Style Language

**Version:** 1.0 · **Date:** 2026-07-10
Persistent brand reference for all future Yugam design & development work.

---

## 1. Positioning

**Who:** Rohit Kumar Maskara — independent AI transformation consultant, one-person practice under the brand "Yugam."
**For:** Founders, C-suite, and senior leadership at SMEs (50–500 people) implementing AI without getting burned.
**Stance:** Not a vendor, not a tool reseller — a trusted advisor who tells the uncomfortable truth.

> "Implementing AI is the easy part. Knowing whether your people, processes, and data are ready for it is the real work."

**Brand DNA:** serious, intelligent, no-hype · warm but authoritative (a senior colleague who's seen it go wrong) · craft, not corporate · editorial, unhurried, certain.

**Feel target:** a printed advisory memo that happens to live on the web — NOT a SaaS landing page.

---

## 2. Color palette

Warm stone / ink / teak. Do not introduce new hues.

| Token | Hex | Role |
|---|---|---|
| `--stone` | `#F4EFE9` | Primary background (warm off-white) |
| `--stone-2` | `#EDE7DF` | Alt section bg / inset panels |
| `--ink` | `#1A1612` | Dark sections, primary text |
| `--teak` | `#8B6914` | Accent, primary CTA, links, kickers |
| `--teak-light` | `#C9A94E` | Gold on dark bg (stat numbers, dark-card CTA) |
| `--bark` | `#6B5E51` | Secondary text |
| `--drift` | `#9B9183` | Tertiary text, labels |
| `--sand` | `#E8E1D8` | Borders, quiet card fill |
| `--clay` | `#D4CBC0` | Dividers |
| `--card` | `#FFFFFF` | Elevated card fill |
| `--card-border` | `#E4DCD0` | Hairline on quiet cards |
| `--pos` | `#1F8A5B` | Positive / "after" metric |
| `--neg` | `#B4462A` | Negative / "before" metric |

**Discipline rules:**
- Teak = ONE primary action per viewport + the single italic headline word + links + mono kickers. Nothing else.
- On dark backgrounds use `--teak-light`, never `--teak`.
- Secondary/hover affordances use `--bark` / `--drift`.

---

## 3. Typography

| Family | Use | Source |
|---|---|---|
| **DM Serif Display** | Headings, pull-quotes, big numbers | Google Fonts |
| **Inter** | Body, UI, lead paragraphs | Google Fonts |
| **JetBrains Mono** | Kickers, labels, tags, dates | Google Fonts |

**Modular scale (ratio ≈ 1.4):**
- `--fs-display` `clamp(48px,6.5vw,90px)` — homepage hero H1 only
- `--fs-h1` `clamp(40px,4.6vw,64px)` — inner hero H1, article H1
- `--fs-h2` `clamp(30px,3vw,44px)` — section headings
- `--fs-h3` `clamp(22px,2vw,30px)` — card headings
- `--fs-lead` 17px — intros (lh 1.7, `--bark`)
- `--fs-body` 16px — body (never below 16; lh 1.7–1.78)
- `--fs-small` 13.5px — card body, captions
- `--fs-kicker` 12px — mono eyebrow (uppercase, ls 0.16em, `--teak`)

**Signature move:** one word in a headline set in DM Serif Display *italic* and colored teak (e.g. the *easy* in "Implementing AI is the easy part").

---

## 4. Layout & components

- **Page gutter:** 80px desktop, 22px mobile.
- **Section padding:** `clamp(72px,9vw,132px)` top/bottom, uniform.
- **Card system (C3):** white fill, no border, `border-radius:14px`, `box-shadow:0 10px 30px rgba(26,22,18,.08)`, hover lifts `translateY(-4px)`. Featured variant `.card--dark` inverts to `--ink` with `--teak-light` accents.
- **Founder photo:** always round, grayscale-sepia, prominent. 300px desktop hero / 260px About / ≤200px mobile.
- **Dark bands** (`--ink`) chapter the page: stat band, manifesto, featured cards, some CTAs.
- **Credential strip:** mono kicker + serif sentence, framed by top/bottom hairlines.
- **Metrics:** big DM Serif numbers; before→after pairs use `--neg`→`--pos`.

---

## 5. Motion

- **Homepage hero constellation:** interactive (mouse-reactive), kept subtle (atmosphere, not competing).
- **Methodology + AI Stack heroes:** ambient constellation (no mouse tracking).
- **Article pages:** NO constellation.
- **Magnetic CTA pull:** PRIMARY CTA ONLY (hero pair + optional contact submit). Gentle — RADIUS 45px, PULL 0.12, MAX cap 6px, ≥24px gap between paired buttons. Never on nav/cards/chips.
- **Other motion:** count-up stats, word-by-word headline reveal, card hover lift, teak underline sweep on links.
- **Grain:** film texture on hero at ~2.5% (drop to ~1.8% if it threatens text contrast).
- **Non-negotiable:** every effect has a `prefers-reduced-motion: reduce` off-switch.

---

## 6. Voice & copy

- Honest, specific, numbers where numbers exist. "I'll tell you honestly whether you need what I'm selling."
- Name real credentials: Meta (operations, strategy, product), KPMG (Fortune-500 risk & process), Vedanta Aluminium (shop-floor operations).
- Currency is **dollars**.
- Anti-hype: no "revolutionary," no "unlock," no exclamation marks.
- Label discipline: the third engagement pillar is **"Enable"** everywhere (never "Train" / "Training & Enablement").

---

## 7. Anti-patterns (never do)

- No AI clichés: circuit boards, glowing orbs, robots, generic tech stock.
- No custom cursor.
- No new palette hues or fonts.
- No SaaS-landing-page tropes (aggressive gradients, rounded-corner + left-accent-border containers everywhere, emoji).
- No magnetic effect on secondary buttons.
- No rectangular founder photo.

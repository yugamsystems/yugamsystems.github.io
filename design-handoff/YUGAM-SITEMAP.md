# Yugam.io — Sitemap & Information Architecture

**Version:** 1.0 · **Date:** 2026-07-10

This is the target sitemap after the refinement pass. One page is NEW (`diagnostics.html`); the rest exist and are being refined.

## Primary navigation

```
Yugam (logo → /)
├── Home ............ index.html
├── About ........... about.html
├── AI Stack ........ ai-stack.html
├── Services ........ (section on index.html, or services page if it exists)
└── Resources ▾ (dropdown)
    ├── Methodology ...... methodology.html
    ├── Diagnostics ...... diagnostics.html      ← NEW PAGE
    ├── Prompt Library ... prompt-library.html
    ├── FAQ .............. faq.html
    └── Articles ......... articles/*.html
[ Let's Talk ] ......... #contact (primary CTA, teak)
```

## Page inventory

| Page | File | Status | Key refinements |
|---|---|---|---|
| Homepage | `index.html` | Refine | Reorder sections; credential strip; 3 featured diagnostics; readiness before case studies; contact-primary |
| About | `about.html` | Refine | Timeline fix (company+date per role); hero+photo; credential strip |
| AI Stack | `ai-stack.html` | Refine | Reduced hero; "start with 4" row; sticky category filters; card system |
| Methodology | `methodology.html` | Refine | Reduced hero; 3-engagements→6-steps mapping bar; Output panels |
| Diagnostics | `diagnostics.html` | **NEW** | Receives the 5 tools moved off homepage + 3 featured |
| FAQ | `faq.html` | Light polish | Label fix (Train→Enable); confirm card/type tokens |
| Prompt Library | `prompt-library.html` | Light polish | Confirm card/type tokens (this is the quality bar) |
| Articles | `articles/*.html` | Light polish | Type tokens only; no constellation |

## Homepage section order (top → bottom)

1. Nav
2. Hero (H1 balanced two-column)
3. Credential strip (NEW)
4. Stat band (dark, gold numbers)
5. Diagnostics — 3 featured + "See all 8 →"
6. AI Stack teaser
7. Services (Assess / Build / Enable)
8. Readiness (MOVED above case studies)
9. Case studies
10. Process (3 engagements → 6 steps note)
11. Manifesto
12. Insights
13. Contact (primary) + Newsletter (slim strip)
14. Footer

## Cross-links to wire

- Homepage diagnostics "See all 8 diagnostics →" → `diagnostics.html`
- AI Stack "see all diagnostics" → `diagnostics.html`
- Homepage Services "See the full methodology →" → `methodology.html`
- Homepage Process intro "Methodology" → `methodology.html`
- Nav Resources ▾ → add `Diagnostics`
- All CTAs labelled "Let's Talk" / contact → `#contact` (never mailto)

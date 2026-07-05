# yugam.io

Static site for Yugam (AI transformation consulting), served by GitHub Pages at https://www.yugam.io.

## Architecture

- **No build step.** Every page is a self-contained HTML file with inline CSS. What's in `main` is what's served.
- **Hosting:** GitHub Pages, source = "Deploy from a branch" (`main`, `/` root). Do not switch the source to GitHub Actions — the system workflow has a history of permanently stuck queued runs (July 2026).
- **Domain:** `www.yugam.io` via the `CNAME` file + GoDaddy DNS (4 A records on the apex, CNAME on www). Apex redirects to www.
- **Shared enhancement layer:** `assets/css/enhance.css` + `assets/js/enhance.js`, loaded by every page. Progressive — the site works fully with this layer removed. Contains: hero constellation canvas (`data-constellation`), count-up metrics (`.metric__value`), scroll reveals with a 2s pure-CSS failsafe, card hover language, reading progress bar, reduced-motion support.
- **SEO layer:** per-page canonical + Open Graph tags, JSON-LD (Organization/Person/Article/FAQPage), `robots.txt`, `sitemap.xml`, `llms.txt`.
- **Diagnostic tools** (`resources/*.html`) call a Cloudflare Worker (`worker/yugam-ai-proxy.js`). The worker is NOT deployed from this repo — after editing, paste into Cloudflare Dashboard → yugam-ai-proxy → Deploy. Requires `OPENROUTER_API_KEY` env var set in Cloudflare.
- **Forms** (contact, ATI) submit to Formspree.

## Workflow

1. Edit locally.
2. `python3 scripts/validate.py` — must pass before any push (checks page structure, JSON-LD, sitemap targets, internal links, canonical tags, enhancement wiring).
3. Push to `main` → live in ~60 seconds.
4. After publishing a new page: add it to `sitemap.xml` and, if reader-facing, `llms.txt`.

## Rules

- Internal/proprietary documents never live in this repo — it is public and everything in it is served. Internal work lives outside the repo.
- New articles follow the template of `resources/article-2026-06-27-why-95-percent-fail.html` (head tags, Article JSON-LD, sources block).

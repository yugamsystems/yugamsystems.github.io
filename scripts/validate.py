#!/usr/bin/env python3
"""Pre-push validation for yugam.io. Run from the repo root:

    python3 scripts/validate.py

Exits non-zero if any check fails. Run this before every push.
"""
import glob
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

FAILURES = []


def check(label, ok, detail=""):
    print(("PASS" if ok else "FAIL") + f": {label}" + (f" — {detail}" if detail else ""))
    if not ok:
        FAILURES.append(label)


def pages():
    return [f for f in glob.glob("*.html") + glob.glob("resources/*.html")
            + glob.glob("ai-transformation-index/*.html")
            if f != "yugam_logo_showcase.html"]


def main():
    os.chdir(os.path.join(os.path.dirname(__file__), ".."))

    # 1. Every page structurally intact
    for f in pages():
        h = open(f, encoding="utf-8").read()
        check(f"structure {f}", h.count("</head>") == 1 and h.count("<body") == 1)

    # 2. Every JSON-LD block parses
    for f in pages():
        h = open(f, encoding="utf-8").read()
        for i, m in enumerate(re.findall(
                r'<script type="application/ld\+json">(.*?)</script>', h, re.S)):
            try:
                json.loads(m)
            except json.JSONDecodeError as e:
                check(f"JSON-LD {f} block {i}", False, str(e))
                break
        else:
            if 'application/ld+json' in h:
                check(f"JSON-LD {f}", True)

    # 3. sitemap.xml well-formed; every sitemap URL maps to a real file
    try:
        tree = ET.parse("sitemap.xml")
        check("sitemap.xml XML", True)
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        for loc in tree.findall(".//s:loc", ns):
            path = loc.text.replace("https://www.yugam.io/", "") or "index.html"
            if path.endswith("/"):
                path += "index.html"
            check(f"sitemap target {path}", os.path.exists(path))
    except ET.ParseError as e:
        check("sitemap.xml XML", False, str(e))

    # 4. Internal links resolve (href/src, non-http, non-anchor)
    for f in pages():
        base = os.path.dirname(f)
        h = open(f, encoding="utf-8").read()
        h = re.sub(r"<(style|script)[^>]*>.*?</\1>", "", h, flags=re.S)
        bad = []
        for attr, target in re.findall(r'(href|src)="([^"#]+?)(?:#[^"]*)?"', h):
            if target.startswith(("http", "mailto", "data:", "//")):
                continue
            clean = target.split("?")[0]
            p = os.path.normpath(os.path.join(base, clean))
            if not os.path.exists(p):
                bad.append(target)
        check(f"links {f}", not bad, ", ".join(bad[:3]))

    # 5. Shared assets exist and are referenced by every page
    check("assets/css/enhance.css exists", os.path.exists("assets/css/enhance.css"))
    check("assets/js/enhance.js exists", os.path.exists("assets/js/enhance.js"))
    for f in pages():
        h = open(f, encoding="utf-8").read()
        check(f"enhance layer wired {f}", "enhance.css" in h and "enhance.js" in h)

    # 6. Every indexable page has a canonical tag
    for f in pages():
        if f in ("404.html", "thank-you.html"):
            continue
        h = open(f, encoding="utf-8").read()
        check(f"canonical {f}", 'rel="canonical"' in h)

    # 7. No internal-IP paths accidentally tracked
    check("no _ops/ in repo", not os.path.exists("_ops"))

    print()
    if FAILURES:
        print(f"{len(FAILURES)} FAILURE(S) — do not push.")
        sys.exit(1)
    print("All checks passed.")


if __name__ == "__main__":
    main()

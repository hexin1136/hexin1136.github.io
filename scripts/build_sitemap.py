#!/usr/bin/env python3
"""Build sitemap.xml for an AI-tools static site."""

from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape


CORE = [
    ("index.html", "1.0", "weekly"),
    ("about.html", "0.5", "monthly"),
    ("contact.html", "0.5", "monthly"),
    ("privacy.html", "0.3", "yearly"),
    ("disclaimer.html", "0.3", "yearly"),
    ("articles/index.html", "0.8", "weekly"),
]


def url_entry(base: str, loc: str, priority: str, freq: str, lastmod: str) -> str:
    href = f"{base.rstrip('/')}/{loc.lstrip('/')}"
    return (
        "  <url>\n"
        f"    <loc>{escape(href)}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        f"    <changefreq>{freq}</changefreq>\n"
        f"    <priority>{priority}</priority>\n"
        "  </url>"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site_root", type=Path)
    parser.add_argument(
        "--base-url",
        default="https://example.com",
        help="Canonical site origin (no trailing slash)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Output path (default: <site_root>/sitemap.xml)",
    )
    args = parser.parse_args()
    root: Path = args.site_root
    out = args.output or (root / "sitemap.xml")
    today = date.today().isoformat()

    entries: list[str] = []
    for loc, priority, freq in CORE:
        if (root / loc).exists() or loc == "index.html":
            entries.append(url_entry(args.base_url, loc, priority, freq, today))

    articles_dir = root / "articles"
    if articles_dir.is_dir():
        for path in sorted(articles_dir.glob("*.html")):
            if path.name == "index.html":
                continue
            rel = f"articles/{path.name}"
            entries.append(url_entry(args.base_url, rel, "0.7", "monthly", today))

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(entries)
        + "\n</urlset>\n"
    )
    out.write_text(xml, encoding="utf-8")
    print(f"Wrote {out} ({len(entries)} URLs)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

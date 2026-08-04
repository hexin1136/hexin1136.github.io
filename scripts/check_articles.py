#!/usr/bin/env python3
"""Check Phase-1 AI-tools articles for SEO basics."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

TAG_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"\s+")
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)
H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.I | re.S)
META_DESC_RE = re.compile(
    r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']',
    re.I | re.S,
)
ARTICLE_RE = re.compile(r"<article\b[^>]*>(.*?)</article>", re.I | re.S)


def strip_html(html: str) -> str:
    text = TAG_RE.sub(" ", html)
    return WS_RE.sub(" ", text).strip()


def word_count(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9']+", text))


def check_file(path: Path, keyword: str | None, min_words: int) -> list[str]:
    html = path.read_text(encoding="utf-8", errors="replace")
    errors: list[str] = []

    title_m = TITLE_RE.search(html)
    if not title_m:
        errors.append("missing <title>")
        title = ""
    else:
        title = strip_html(title_m.group(1))

    if not META_DESC_RE.search(html):
        errors.append("missing meta description")

    body_m = ARTICLE_RE.search(html)
    body = strip_html(body_m.group(1) if body_m else html)
    wc = word_count(body)
    if wc < min_words:
        errors.append(f"word count {wc} < {min_words}")

    if keyword:
        kw = keyword.lower()
        if kw not in title.lower():
            errors.append(f"title missing keyword '{keyword}'")
        h1_m = H1_RE.search(html)
        h1 = strip_html(h1_m.group(1)) if h1_m else ""
        if kw not in h1.lower() and kw not in body[:500].lower():
            errors.append(f"keyword '{keyword}' not in H1 or early body")

    if 'data-ad-slot="in-content"' not in html and "ad-slot" not in html:
        errors.append("no ad slot placeholder found")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "articles_dir",
        type=Path,
        help="Directory containing article HTML files",
    )
    parser.add_argument(
        "--min-words",
        type=int,
        default=800,
        help="Minimum word count (default 800)",
    )
    parser.add_argument(
        "--keywords",
        type=Path,
        help="Optional TSV file: slug<TAB>primary keyword",
    )
    args = parser.parse_args()

    kw_map: dict[str, str] = {}
    if args.keywords and args.keywords.exists():
        for line in args.keywords.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split("\t")
            if len(parts) >= 2:
                kw_map[parts[0].strip()] = parts[1].strip()

    files = sorted(args.articles_dir.glob("*.html"))
    files = [f for f in files if f.name != "index.html"]
    if not files:
        print(f"No articles found in {args.articles_dir}", file=sys.stderr)
        return 1

    failed = 0
    for path in files:
        keyword = kw_map.get(path.stem)
        errs = check_file(path, keyword, args.min_words)
        wc = word_count(
            strip_html(
                ARTICLE_RE.search(path.read_text(encoding="utf-8", errors="replace")).group(1)
                if ARTICLE_RE.search(path.read_text(encoding="utf-8", errors="replace"))
                else path.read_text(encoding="utf-8", errors="replace")
            )
        )
        if errs:
            failed += 1
            print(f"FAIL {path.name} (~{wc} words): {'; '.join(errs)}")
        else:
            print(f"OK   {path.name} (~{wc} words)")

    print(f"\n{len(files) - failed}/{len(files)} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

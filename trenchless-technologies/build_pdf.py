#!/usr/bin/env python3
"""Build one printable PDF from every lesson and reference page.

Usage (from anywhere):
    python trenchless-technologies/build_pdf.py [output.pdf]

Default output: trenchless-technologies/trenchless-technologies-lessons.pdf

What it does:
  1. Reads the page list from the MANIFEST in assets/nav.js (same order/titles as the site menu).
  2. Merges lessons/*.html and reference/*.html into one HTML document using assets/style.css
     (forced to the light theme).
  3. Adds a Menu page, a menu bar + prev/next links on every page, and rewrites links between
     pages to in-PDF anchors. Links to files not in the PDF (MISSION.md, RESOURCES.md, ...)
     point to the GitHub copy.
  4. Prints the quiz answers (quizzes are click-to-reveal on the web).
  5. Prints to PDF with headless Chrome/Edge, then adds PDF bookmarks (Lessons / Reference).

Requires: Python 3.9+, `pip install pypdf`, and Google Chrome, Chromium or Microsoft Edge
(set CHROME_PATH to override auto-detection).
"""
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import pypdf

ROOT = Path(__file__).resolve().parent
GH = "https://github.com/lx4ever/MattPocock-skills/blob/trenchless-technologies-learning/trenchless-technologies/"
E = html.escape


def find_browser():
    env = os.environ.get("CHROME_PATH")
    if env and Path(env).exists():
        return env
    for name in ("chrome", "google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "msedge"):
        p = shutil.which(name)
        if p:
            return p
    for p in (
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ):
        if Path(p).exists():
            return p
    sys.exit("No Chrome/Chromium/Edge found. Set CHROME_PATH.")


def load_manifest():
    js = (ROOT / "assets" / "nav.js").read_text(encoding="utf-8")
    m = re.search(r"var MANIFEST = (\{.*?\n\});", js, re.S)
    if not m:
        sys.exit("Could not find MANIFEST in assets/nav.js")
    return json.loads(m.group(1))


def build_html(man):
    css = (ROOT / "assets" / "style.css").read_text(encoding="utf-8")
    css = re.sub(r"@media \(prefers-color-scheme: dark\)\s*\{.*?\n\}\n", "", css, flags=re.S)
    items = [("lessons", f"Lesson {x['n']}", x["file"], x["title"]) for x in man["lessons"]] + [
        ("reference", "Reference", x["file"], x["title"]) for x in man["reference"]
    ]
    anchor = {it[2]: f"p{i + 1}" for i, it in enumerate(items)}

    def menu_bar(i):
        g, lab, _, _ = items[i]
        prev = (
            f'<a href="#{anchor[items[i - 1][2]]}">&larr; {E(items[i - 1][1])}: {E(items[i - 1][3])}</a>'
            if i > 0 else "<span></span>"
        )
        nxt = (
            f'<a href="#{anchor[items[i + 1][2]]}">{E(items[i + 1][1])}: {E(items[i + 1][3])} &rarr;</a>'
            if i < len(items) - 1 else "<span></span>"
        )
        grp = "Lessons" if g == "lessons" else "Reference"
        return (
            f'<div class="pmenu"><a href="#menu">&#9776; Menu</a>'
            f'<span class="here">{E(lab)} &middot; {grp}</span></div>'
            f'<div class="pmenu2">{prev}{nxt}</div>'
        )

    def reveal(mm):
        it = mm.group(0)
        b = re.search(r'<button[^>]*data-correct="true"[^>]*data-feedback="([^"]*)"', it) or re.search(
            r'<button[^>]*data-feedback="([^"]*)"[^>]*data-correct="true"', it
        )
        if b:
            fb = b.group(1)
            # the site's print CSS already prepends "Answer: " to .quiz-feedback
            it = re.sub(r'(<p class="quiz-feedback"[^>]*>)\s*(</p>)', lambda q: q.group(1) + fb + q.group(2), it, count=1)
        return it

    def link(mm):
        url = mm.group(1)
        base = url.split("/")[-1].split("#")[0]
        if base in anchor:
            return f'href="#{anchor[base]}"'
        if url.startswith(("http", "#", "mailto:")):
            return mm.group(0)
        u = re.sub(r"^(\.\./)+", "", url)
        if "/" not in u and not u.endswith(".md"):
            u = "reference/" + u
        return f'href="{GH}{u}"'

    def fix(body):
        body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
        body = re.sub(
            r'<div class="quiz-item".*?<p class="quiz-feedback"[^>]*>\s*</p>\s*</div>', reveal, body, flags=re.S
        )
        return re.sub(r'href="([^"]*)"', link, body)

    parts = []
    for i, (g, _, f, _) in enumerate(items):
        src = (ROOT / g / f).read_text(encoding="utf-8")
        body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
        parts.append(f'<section class="lesson" id="{anchor[f]}">{menu_bar(i)}{fix(body)}</section>')

    def toc(g):
        return "".join(
            f'<li><a href="#{anchor[f]}"><span class="n">{E(lab)}</span> {E(t)}</a></li>'
            for gg, lab, f, t in items if gg == g
        )

    doc = f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Trenchless Technologies Lessons</title>
<style>{css}
body{{max-width:none;padding:0;margin:0;background:#fff}}
.lesson{{page-break-before:always}}
.cover{{padding-top:30vh}}
.toc{{list-style:none;padding:0;margin:.5rem 0}} .toc li{{margin:.15rem 0}} .toc a{{text-decoration:none;color:var(--ink)}}
.toc .n{{display:inline-block;min-width:6rem;color:var(--accent);font-size:.9rem}}
.pmenu{{display:flex;justify-content:space-between;font-family:system-ui,sans-serif;font-size:.8rem;border-bottom:1px solid var(--rule);padding-bottom:.35rem}}
.pmenu2{{display:flex;justify-content:space-between;gap:1rem;font-family:system-ui,sans-serif;font-size:.78rem;margin:.35rem 0 1.2rem}}
.pmenu a,.pmenu2 a{{color:var(--accent);text-decoration:none}} .pmenu .here{{color:var(--muted)}}
.quiz-feedback{{display:block;color:#3d6b3d;font-size:.95rem}}
nav.lesson-nav{{page-break-inside:avoid}}
table,.quiz-item,pre{{page-break-inside:avoid}} h1,h2,h3{{page-break-after:avoid}}
@page{{size:Letter;margin:18mm 16mm}}
</style></head><body>
<div class="cover"><h1>Trenchless Technologies Lessons</h1><p class="kicker">{len(man["lessons"])} lessons &middot; {len(man["reference"])} reference pages</p></div>
<section class="lesson" id="menu"><h1>Menu</h1><h2>Lessons</h2><ol class="toc">{toc("lessons")}</ol><h2>Reference</h2><ol class="toc">{toc("reference")}</ol></section>
{"".join(parts)}</body></html>"""
    return doc, items


def add_bookmarks(raw_pdf, out_pdf, items, n_lessons):
    r = pypdf.PdfReader(str(raw_pdf))
    txt = [(p.extract_text() or "") for p in r.pages]
    start, cur = {}, 1
    for i, (g, lab, _, _) in enumerate(items):
        key = ("Menu" + lab + "·" + ("Lessons" if g == "lessons" else "Reference")).replace(" ", "")
        for p in range(cur, len(txt)):
            if key in txt[p][:200].replace(" ", "").replace("\n", ""):
                start[i] = p
                cur = p + 1
                break
    missing = [items[i][3] for i in range(len(items)) if i not in start]
    if missing:
        sys.exit(f"Could not locate pages for bookmarks: {missing[:5]}")
    w = pypdf.PdfWriter(clone_from=r)
    w.add_outline_item("Menu", 1)
    lessons = w.add_outline_item("Lessons", start[0])
    reference = w.add_outline_item("Reference", start[n_lessons])
    for i, (g, lab, _, t) in enumerate(items):
        w.add_outline_item(f"{lab}: {t}", start[i], parent=lessons if g == "lessons" else reference)
    w.page_mode = "/UseOutlines"
    w.write(str(out_pdf))
    return len(txt)


def main():
    out = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "trenchless-technologies-lessons.pdf"
    man = load_manifest()
    doc, items = build_html(man)
    with tempfile.TemporaryDirectory() as td:
        html_path, raw = Path(td) / "all.html", Path(td) / "raw.pdf"
        html_path.write_text(doc, encoding="utf-8")
        subprocess.run(
            [find_browser(), "--headless", "--disable-gpu", "--no-pdf-header-footer",
             f"--print-to-pdf={raw}", html_path.as_uri()],
            check=True, capture_output=True,
        )
        pages = add_bookmarks(raw, out, items, len(man["lessons"]))
    print(f"Wrote {out} ({pages} pages, {len(items)} bookmarked)")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Build one printable, bookmarked PDF from a workspace of lesson + reference HTML pages.

Usage:
    python build_pdf.py [WORKSPACE_DIR] [OUTPUT.pdf]      (a lone OUTPUT.pdf argument also works) [--title "Title"] [--gh-base URL]

WORKSPACE_DIR  folder containing lessons/*.html and (optionally) reference/*.html.
               Defaults to the folder this script lives in.
OUTPUT.pdf     defaults to <WORKSPACE_DIR>/<workspace-name>-lessons.pdf
--title        cover/PDF title. Defaults to the "# Mission: ..." heading of MISSION.md, else the folder name.
--gh-base      URL prefix used for links to files that are not in the PDF (MISSION.md, RESOURCES.md, ...).
               Defaults to the git remote + branch of the workspace; if there is none, those links are
               turned into plain text.

What it does:
  1. Finds pages in lessons/ and reference/ (sorted by file name). Titles come from the MANIFEST in
     assets/nav.js when one is present, otherwise from each page's <title>.
  2. Merges them into one HTML document, inlining the stylesheets the pages link (light theme).
  3. Adds a Menu page, a menu bar with previous/next links on every page, and rewrites links between
     pages to in-PDF anchors. Script-built navigation (nav.js / course-nav.js) is not available in print,
     so the Menu page and menu bars replace it.
  4. Prints quiz answers (quizzes are click-to-reveal on the web). Supports the three quiz markups used in
     these workspaces: button[data-correct] (prints the correct option + explanation),
     .quiz[data-answer] type-in (prints the stored answer), input[data-answer], and .quiz[data-quiz] with .q[data-answer].
  5. Prints with headless Chrome/Edge, then adds PDF bookmarks (Lessons / Reference).

Requires: Python 3.9+, `pip install pypdf`, and Google Chrome, Chromium or Microsoft Edge
(set CHROME_PATH to override auto-detection).
"""
import argparse
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


def git(root, *args):
    try:
        return subprocess.run(["git", "-C", str(root), *args], capture_output=True, text=True, check=True).stdout.strip()
    except Exception:
        return ""


def default_gh_base(root):
    remote = git(root, "remote", "get-url", "origin")
    branch = git(root, "rev-parse", "--abbrev-ref", "HEAD")
    top = git(root, "rev-parse", "--show-toplevel")
    if not (remote and branch and top):
        return None
    m = re.search(r"github\.com[:/](.+?)(?:\.git)?$", remote)
    if not m:
        return None
    rel = Path(root).resolve().relative_to(Path(top).resolve()).as_posix()
    rel = "" if rel == "." else rel + "/"
    return f"https://github.com/{m.group(1)}/blob/{branch}/{rel}"


def manifest_titles(root):
    """file -> title from assets/nav.js, tolerant of JSON or JS-object style manifests."""
    out = {}
    nav = root / "assets" / "nav.js"
    if nav.exists():
        js = nav.read_text(encoding="utf-8")
        for m in re.finditer(
            r"""["']?file["']?\s*:\s*["']([^"']+)["']\s*,\s*["']?title["']?\s*:\s*"((?:[^"\\]|\\.)*)\"""", js
        ):
            try:
                out[m.group(1).split("/")[-1]] = json.loads('"' + m.group(2) + '"')
            except ValueError:
                pass
    return out


def page_title(src, fallback):
    m = re.search(r"<title>(.*?)</title>", src, re.S)
    t = html.unescape(m.group(1)).strip() if m else fallback
    return re.sub(r"^\s*Lesson\s+\d+\s*[:\u2014-]\s*", "", t)


def collect_pages(root):
    titles = manifest_titles(root)
    items = []
    for group in ("lessons", "reference"):
        d = root / group
        if not d.is_dir():
            continue
        for f in sorted(d.glob("*.html")):
            src = f.read_text(encoding="utf-8")
            t = titles.get(f.name) or page_title(src, f.stem)
            t = re.sub(r"^\d+\s*[\u2014-]\s*", "", t)  # drop "0001 — " prefixes
            m = re.match(r"(\d+)", f.name)
            lab = f"Lesson {int(m.group(1))}" if group == "lessons" and m else ("Lesson" if group == "lessons" else "Reference")
            items.append((group, lab, f, t))
    if not items:
        sys.exit(f"No lessons/*.html or reference/*.html found in {root}")
    return items


def collect_css(root, items):
    local, remote = [], []
    for _, _, f, _ in items:
        src = f.read_text(encoding="utf-8")
        for tag in re.findall(r"<link[^>]+>", src):
            if "stylesheet" not in tag:
                continue
            m = re.search(r'href="([^"]+)"', tag)
            if not m:
                continue
            href = m.group(1)
            if href.startswith("http"):
                if href not in remote:
                    remote.append(href)
            else:
                p = (f.parent / href).resolve()
                if p.exists() and p not in local:
                    local.append(p)
    css = "\n".join(p.read_text(encoding="utf-8") for p in local)
    css = re.sub(r"@media \(prefers-color-scheme: dark\)\s*\{.*?\n\}\n", "", css, flags=re.S)
    return css, remote


def reveal_answers(body, css_labels_answers):
    label = "" if css_labels_answers else "Answer: "

    # A) <button data-correct="true" data-feedback="...">Option</button> + empty <p class="quiz-feedback">
    #    Print the correct option itself, then the explanation shown after clicking it.
    def a(mm):
        it = mm.group(0)
        b = re.search(r'<button[^>]*data-correct="true"[^>]*data-feedback="([^"]*)"[^>]*>(.*?)</button>', it, re.S) or re.search(
            r'<button[^>]*data-feedback="([^"]*)"[^>]*data-correct="true"[^>]*>(.*?)</button>', it, re.S
        )
        if b:
            fb = f"{label}<strong>{b.group(2).strip()}</strong> &mdash; {b.group(1)}"
            it = re.sub(r'(<p class="quiz-feedback"[^>]*>)\s*(</p>)', lambda q: q.group(1) + fb + q.group(2), it, count=1)
        return it

    body = re.sub(r'<div class="quiz-item".*?<p class="quiz-feedback"[^>]*>\s*</p>\s*</div>', a, body, flags=re.S)

    # D) <div class="quiz" data-answer="x"> type-in question + empty <p class="quiz-feedback"> (answer only
    #    appears after a wrong attempt on the web, so print it from data-answer)
    body = re.sub(
        r'(<div class="quiz"[^>]*data-answer="([^"]*)"[^>]*>.*?<p class="quiz-feedback"[^>]*>)\s*(</p>)',
        lambda m: m.group(1) + label + "<strong>" + m.group(2) + "</strong>" + m.group(3),
        body,
        flags=re.S,
    )

    # B) <input data-answer="x"> + empty <div class="feedback">
    body = re.sub(
        r'(<input[^>]*data-answer="([^"]*)"[^>]*>\s*<div class="feedback"[^>]*>)\s*(</div>)',
        lambda m: m.group(1) + "Answer: " + m.group(2) + m.group(3),
        body,
    )

    # C) <div class="q" data-answer="N"> with <button class="opt"> options and a hidden <p class="fb">
    def c(mm):
        blk = mm.group(0)
        idx = int(mm.group(1))
        n = {"i": -1}

        def mark(o):
            n["i"] += 1
            return o.group(0).replace('class="opt', 'class="opt is-correct', 1) if n["i"] == idx else o.group(0)

        blk = re.sub(r'<button[^>]*class="opt[^"]*"[^>]*>', mark, blk)
        return re.sub(r'(<p class="fb"[^>]*?)\s+hidden', r"\1", blk)

    body = re.sub(r'<div class="q"[^>]*data-answer="(\d+)".*?(?=<div class="q"|</div>\s*</div>\s*(?:<|$))', c, body, flags=re.S)
    return body


def build_html(root, items, title, gh_base):
    css, remote = collect_css(root, items)
    css_labels_answers = "quiz-feedback::before" in css
    anchor = {(g, f.name): f"p{i + 1}" for i, (g, _, f, _) in enumerate(items)}
    by_name = {}
    for k, v in anchor.items():
        by_name.setdefault(k[1], v)
    n_lessons = sum(1 for it in items if it[0] == "lessons")
    n_ref = len(items) - n_lessons

    def menu_bar(i):
        g, lab, _, _ = items[i]
        prev = (f'<a href="#p{i}">&larr; {E(items[i - 1][1])}: {E(items[i - 1][3])}</a>' if i > 0 else "<span></span>")
        nxt = (f'<a href="#p{i + 2}">{E(items[i + 1][1])}: {E(items[i + 1][3])} &rarr;</a>' if i < len(items) - 1 else "<span></span>")
        grp = "Lessons" if g == "lessons" else "Reference"
        return (
            f'<div class="pmenu"><a href="#menu">&#9776; Menu</a><span class="here">{E(lab)} &middot; {grp}</span></div>'
            f'<div class="pmenu2">{prev}{nxt}</div>'
        )

    def fix_links(body, page):
        def link(mm):
            url = mm.group(1)
            if url.startswith(("http", "#", "mailto:", "data:")):
                return mm.group(0)
            base = url.split("#")[0].split("/")[-1]
            if base in by_name:
                return f'href="#{by_name[base]}"'
            if gh_base:
                target = os.path.normpath(os.path.join(page.parent.relative_to(root).as_posix(), url.split("#")[0]))
                return f'href="{gh_base}{target.replace(os.sep, "/")}"'
            return 'data-unlinked="1"'
        return re.sub(r'href="([^"]*)"', link, body)

    parts = []
    for i, (g, lab, f, t) in enumerate(items):
        src = f.read_text(encoding="utf-8")
        body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
        body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
        body = re.sub(r"<nav[^>]*data-course-[^>]*>.*?</nav>", "", body, flags=re.S)  # JS-filled nav shells
        body = reveal_answers(body, css_labels_answers)
        body = fix_links(body, f)
        parts.append(f'<section class="lesson" id="p{i + 1}">{menu_bar(i)}{body}</section>')

    def toc(g):
        return "".join(
            f'<li><a href="#p{i + 1}"><span class="n">{E(lab)}</span> {E(t)}</a></li>'
            for i, (gg, lab, _, t) in enumerate(items) if gg == g
        )

    sections = f'<h2>Lessons</h2><ol class="toc">{toc("lessons")}</ol>' if n_lessons else ""
    if n_ref:
        sections += f'<h2>Reference</h2><ol class="toc">{toc("reference")}</ol>'
    links = "".join(f'<link rel="stylesheet" href="{E(h)}">' for h in remote)
    doc = f"""<!DOCTYPE html><html lang="en" data-theme="light"><head><meta charset="utf-8"><title>{E(title)}</title>{links}
<style>{css}
body{{max-width:none;padding:0;margin:0;background:#fff}}
.lesson{{page-break-before:always}}
.cover{{padding:30vh 1.5rem 0}} .cover h1{{font-size:2.2rem}}
#menu{{padding:0 1.5rem}}
.toc{{list-style:none;padding:0;margin:.5rem 0}} .toc li{{margin:.15rem 0}} .toc a{{text-decoration:none;color:#1a1a1a}}
.toc .n{{display:inline-block;min-width:6rem;color:#8a4f2e;font-size:.9rem}}
.pmenu{{display:flex;justify-content:space-between;font-family:system-ui,sans-serif;font-size:.8rem;border-bottom:1px solid #d8d3c8;padding-bottom:.35rem;margin:0 0 0}}
.pmenu2{{display:flex;justify-content:space-between;gap:1rem;font-family:system-ui,sans-serif;font-size:.78rem;margin:.35rem 0 1.2rem}}
.pmenu a,.pmenu2 a{{color:#8a4f2e;text-decoration:none}} .pmenu .here{{color:#6b6a63}}
.quiz-feedback,.quiz-item .feedback{{display:block;color:#3d6b3d;font-size:.95rem}}
.quiz,.recall,[data-answer-text]{{display:block!important}} .reveal,.ask{{display:none!important}}
.opt.is-correct{{font-weight:700;color:#2e6b3e}}
nav.lesson-nav,table,.quiz-item,pre{{page-break-inside:avoid}} h1,h2,h3{{page-break-after:avoid}}
@page{{size:Letter;margin:18mm 16mm}}
</style></head><body>
<div class="cover"><h1>{E(title)}</h1><p class="kicker">{n_lessons} lessons &middot; {n_ref} reference pages</p></div>
<section class="lesson" id="menu"><h1>Menu</h1>{sections}</section>
{"".join(parts)}</body></html>"""
    return doc


def add_bookmarks(raw_pdf, out_pdf, items, title):
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
    roots = {}
    for i, (g, lab, _, t) in enumerate(items):
        if g not in roots:
            roots[g] = w.add_outline_item("Lessons" if g == "lessons" else "Reference", start[i])
        w.add_outline_item(f"{lab}: {t}", start[i], parent=roots[g])
    w.add_metadata({"/Title": title})
    w.page_mode = "/UseOutlines"
    w.write(str(out_pdf))
    return len(txt)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("workspace", nargs="?", default=str(Path(__file__).resolve().parent))
    ap.add_argument("output", nargs="?")
    ap.add_argument("--title")
    ap.add_argument("--gh-base")
    a = ap.parse_args()
    if a.workspace.lower().endswith(".pdf") and not a.output:  # `build_pdf.py out.pdf` => default workspace
        a.workspace, a.output = str(Path(__file__).resolve().parent), a.workspace

    root = Path(a.workspace).resolve()
    title = a.title
    if not title:
        mission = root / "MISSION.md"
        m = re.match(r"#\s*(?:Mission:\s*)?(.+)", mission.read_text(encoding="utf-8").strip()) if mission.exists() else None
        title = m.group(1).strip() if m else root.name
    out = Path(a.output).resolve() if a.output else root / f"{root.name}-lessons.pdf"
    gh_base = a.gh_base or default_gh_base(root)

    items = collect_pages(root)
    doc = build_html(root, items, title, gh_base)
    with tempfile.TemporaryDirectory() as td:
        html_path, raw = Path(td) / "all.html", Path(td) / "raw.pdf"
        html_path.write_text(doc, encoding="utf-8")
        subprocess.run(
            [find_browser(), "--headless", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=20000",
             f"--print-to-pdf={raw}", html_path.as_uri()],
            check=True, capture_output=True,
        )
        pages = add_bookmarks(raw, out, items, title)
    print(f"Wrote {out} ({pages} pages, {len(items)} bookmarked)")


if __name__ == "__main__":
    main()

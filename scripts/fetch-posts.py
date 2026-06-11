#!/usr/bin/env python3
"""Fetch curated blog posts from the old WordPress site into web/content/posts/.

Selection, topics, and language tags are curated below (2026-06-11, 20 posts:
all of 2023-2025 plus eight evergreen pieces). Output:
  content/posts/<slug>.html   sanitized post body (images rewritten to local)
  content/posts/index.json    feed metadata (title, date, lang, topic, excerpt,
                              byline, source, reading time)
  public/blog-media/          downloaded images

Re-runnable; overwrites previous output for the selected posts.
"""
import json, re, html, pathlib, subprocess, sys

SITE = "https://public-api.wordpress.com/wp/v2/sites/63338113"
ROOT = pathlib.Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "content" / "posts"
MEDIA_DIR = ROOT / "public" / "blog-media"
POSTS_DIR.mkdir(parents=True, exist_ok=True)
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

# id: (topic, lang, featured)
SELECTION = {
    1170: ("AI in Economic Research", "tr", True),
    1149: ("Teaching Notes", "en", False),
    1156: ("Platform & Digital Regulation", "tr", False),
    1143: ("Platform & Digital Regulation", "en", False),
    1116: ("Competition Policy", "tr", False),
    1110: ("Competition Policy", "tr", False),
    1105: ("Law & Economics", "tr", False),
    1097: ("Law & Economics", "en", False),
    1066: ("Platform & Digital Regulation", "tr", False),
    1061: ("Law & Economics", "en", False),
    1049: ("Competition Policy", "tr", False),
    1016: ("Platform & Digital Regulation", "tr", False),
    994:  ("Competition Policy", "en", False),
    944:  ("Competition Policy", "tr", False),
    934:  ("Climate & Energy Economics", "en", False),
    898:  ("Competition Policy", "tr", False),
    793:  ("Law & Economics", "en", False),
    717:  ("Competition Policy", "tr", False),
    655:  ("Platform & Digital Regulation", "en", False),
    668:  ("Competition Policy", "tr", False),
}

def get(url):
    r = subprocess.run(["curl", "-sfL", "--max-time", "30", "-A", "Mozilla/5.0", url],
                       capture_output=True)
    if r.returncode != 0:
        raise RuntimeError(f"curl failed ({r.returncode}) for {url}")
    return r.stdout

def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)

def sanitize(body, slug):
    # WordPress block comments and zero-width junk
    body = re.sub(r"<!--\s*/?wp:[^>]*-->", "", body)
    body = body.replace("​", "")
    # download images, rewrite src to local copies
    imgs = re.findall(r'<img[^>]+src="([^"]+)"', body)
    for i, src in enumerate(dict.fromkeys(imgs), 1):
        clean_src = src.split("?")[0]
        ext = pathlib.Path(clean_src).suffix or ".jpg"
        local = f"{slug}-{i}{ext}"
        try:
            (MEDIA_DIR / local).write_bytes(get(clean_src))
            body = body.replace(src, f"/blog-media/{local}")
            print(f"    img -> {local}")
        except Exception as e:
            print(f"    WARN image failed {clean_src}: {e}", file=sys.stderr)
    # strip presentation attributes; site CSS owns styling
    for attr in ("srcset", "sizes", "class", "style", "decoding", "loading",
                 "width", "height", "data-[a-z-]+"):
        body = re.sub(rf'\s{attr}="[^"]*"', "", body)
    # drop empty paragraphs
    body = re.sub(r"<p>(\s|&nbsp;)*</p>", "", body)
    return body.strip()

def extract_byline(text_start, html_start):
    """Heuristic byline/source from the post's opening line. Reviewed by hand after."""
    byline = source_name = source_url = None
    m = re.search(r"^\s*(.{2,60}?)\s+ile birlikte\s+@?([\w.]+)", text_start)
    if m:
        byline, source_name = m.group(1).strip(), m.group(2).strip()
    else:
        m = re.search(r"^\s*w(?:ith|/)\s+(.{2,60}?)[,–—]\s*(?:originally\s+)?published\s+@?([\w.]+)",
                      text_start, re.I)
        if m:
            byline, source_name = m.group(1).strip(), m.group(2).strip()
    mu = re.search(r'<a href="(https?://[^"]+)"', html_start)
    if mu:
        source_url = mu.group(1)
    return byline, source_name, source_url

ids = ",".join(str(i) for i in SELECTION)
posts = json.loads(get(f"{SITE}/posts?include={ids}&per_page=100&_fields=id,slug,date,title,content,excerpt"))
print(f"fetched {len(posts)} posts")

index = []
for p in sorted(posts, key=lambda x: x["date"], reverse=True):
    topic, lang, featured = SELECTION[p["id"]]
    slug = p["slug"][:60].rstrip("-")
    title = html.unescape(strip_tags(p["title"]["rendered"])).strip().rstrip("*").strip()
    print(f"  {p['date'][:10]} {slug}")
    body = sanitize(p["content"]["rendered"], slug)
    (POSTS_DIR / f"{slug}.html").write_text(body, encoding="utf-8")
    text = html.unescape(strip_tags(body))
    words = len(text.split())
    excerpt = html.unescape(strip_tags(p["excerpt"]["rendered"])).strip()
    excerpt = re.sub(r"\s*\[?…\]?\s*$", "", excerpt).replace("&hellip;", "").strip()
    byline, source_name, source_url = extract_byline(text[:300], body[:600])
    index.append({
        "slug": slug,
        "title": title,
        "date": p["date"][:10],
        "lang": lang,
        "topic": topic,
        "featured": featured,
        "excerpt": excerpt[:220],
        "byline": byline,
        "sourceName": source_name,
        "sourceUrl": source_url,
        "readingMin": max(1, round(words / 200)),
        "words": words,
    })

(POSTS_DIR / "index.json").write_text(
    json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"wrote {POSTS_DIR / 'index.json'} ({len(index)} posts)")

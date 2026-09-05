#!/usr/bin/env python3
"""Fetch the blog archive from the old WordPress site into web/content/posts/.

Selection, topics, and language tags are curated below. The first pass
(2026-06-11) took 20 posts; on 2026-09-05 the remaining 65 published posts
were added, so the whole 2013-2025 archive (85 posts) now lives here. Output:
  content/posts/<slug>.html   sanitized post body (images rewritten to local)
  content/posts/index.json    feed metadata (title, date, lang, topic, excerpt,
                              byline, source, reading time, cover image)
  public/blog-media/          downloaded images (body images + covers)

Cover images come from the WordPress "featured image" of each post, are
resized to at most 1600 px on the long edge (macOS `sips`), and are stored as
<slug>-cover.<ext>. index.json records the path in "image"; "coverInBody" is
set when the same picture already opens the body, so the post page can skip
the duplicate.

Re-runnable. By default it only ADDS: posts whose body file already exists
keep that body and their hand-reviewed metadata (title, excerpt, byline,
source) from index.json, so curation survives a re-run. Pass --refresh to
re-fetch everything from WordPress. Native posts (written directly into
content/posts/, "native": true) are always preserved.
"""
import json, re, html, pathlib, subprocess, sys

SITE = "https://public-api.wordpress.com/wp/v2/sites/63338113"
ROOT = pathlib.Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "content" / "posts"
MEDIA_DIR = ROOT / "public" / "blog-media"
POSTS_DIR.mkdir(parents=True, exist_ok=True)
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

COVER_MAX_PX = 1600
REFRESH = "--refresh" in sys.argv

# Hand-checked normalisations for the byline heuristic below.
NAME_FIXES = {"Şahin Adıyok": "Şahin Ardıyok", "Melih Uyer": "Melih Üyer"}
SOURCE_FIXES = {"RekabetReguasyon.com": "RekabetRegulasyon.com",
                "RekabetRegulasyon": "RekabetRegulasyon.com"}
# Where a source has a stable home page we link it; Mondaq and firm
# newsletters get no link (article URLs there are not stable).
SOURCE_URLS = {"RekabetRegulasyon.com": "https://www.rekabetregulasyon.com/"}
# Posts whose featured image is the same picture as the first body image but
# uploaded under a different URL (checked by eye, 2026-09-05).
DUPLICATE_COVERS = {
    "kaldirac-leverage-teorisi-dijital-pazarlar-icin-yeniden-yoru",
    "elektrik-ve-internetin-birlikte-satisi-turkiye-icin-bir-firs",
    "iste-turkiyenin-aradigi-adam",
    # cover is the header panel of the infographic that opens the body
    "cimento-sektoru-icin-alternatif-bir-cografi-pazar-tanimi-yon",
    "blokzinciri-rekabet-hukuku",
    "avrupa-cezalandirirken-artik-amerika-da-bos-durmuyor",
    "kartel-tarama-araclari-ve-karteller-ile-mucadele",
    "avrupa-birligi-cezalandirirken-amerika-ne-yapiyor",
}

T_AI = "AI in Economic Research"
T_TEACH = "Teaching Notes"
T_PLAT = "Platform & Digital Regulation"
T_COMP = "Competition Policy"
T_LAWECON = "Law & Economics"
T_CLIMATE = "Climate & Energy Economics"
T_POLICY = "Economics & Public Policy"

# id: (topic, lang, featured)
SELECTION = {
    # 2025
    1170: (T_AI, "tr", False),  # featured slot now held by the native 2026 post
    1149: (T_TEACH, "en", False),
    1156: (T_PLAT, "tr", False),
    # 2024
    1143: (T_PLAT, "en", False),
    1116: (T_COMP, "tr", False),
    1110: (T_COMP, "tr", False),
    1105: (T_LAWECON, "tr", False),
    1097: (T_LAWECON, "en", False),
    1066: (T_PLAT, "tr", False),
    1061: (T_LAWECON, "en", False),
    # 2023
    1049: (T_COMP, "tr", False),
    1016: (T_PLAT, "tr", False),
    # 2022
    994:  (T_COMP, "en", False),
    1053: (T_COMP, "tr", False),
    1004: (T_CLIMATE, "tr", False),
    965:  (T_PLAT, "tr", False),
    949:  (T_CLIMATE, "en", False),
    955:  (T_CLIMATE, "tr", False),
    944:  (T_COMP, "tr", False),
    934:  (T_CLIMATE, "en", False),
    898:  (T_COMP, "tr", False),
    # 2021
    835:  (T_CLIMATE, "en", False),
    893:  (T_PLAT, "tr", False),
    783:  (T_CLIMATE, "en", False),
    831:  (T_COMP, "tr", False),
    826:  (T_COMP, "en", False),
    820:  (T_CLIMATE, "tr", False),
    793:  (T_LAWECON, "en", False),
    799:  (T_POLICY, "tr", False),
    886:  (T_COMP, "en", False),
    717:  (T_COMP, "tr", False),
    # 2020
    769:  (T_PLAT, "en", False),
    761:  (T_PLAT, "en", False),
    774:  (T_COMP, "tr", False),
    756:  (T_COMP, "en", False),
    747:  (T_COMP, "tr", False),
    738:  (T_COMP, "tr", False),
    # 2019
    655:  (T_PLAT, "en", False),
    668:  (T_COMP, "tr", False),
    700:  (T_COMP, "tr", False),
    709:  (T_PLAT, "tr", False),
    663:  (T_COMP, "tr", False),
    651:  (T_POLICY, "tr", False),
    614:  (T_COMP, "en", False),
    586:  (T_PLAT, "tr", False),
    601:  (T_TEACH, "en", False),
    590:  (T_PLAT, "en", False),
    620:  (T_COMP, "en", False),
    459:  (T_POLICY, "tr", False),
    490:  (T_CLIMATE, "en", False),
    # 2018
    407:  (T_COMP, "tr", False),
    425:  (T_COMP, "en", False),
    414:  (T_PLAT, "tr", False),
    476:  (T_COMP, "en", False),
    361:  (T_TEACH, "tr", False),
    # 2017
    496:  (T_COMP, "en", False),
    346:  (T_PLAT, "tr", False),
    308:  (T_TEACH, "tr", False),
    # 2016
    482:  (T_PLAT, "en", False),
    480:  (T_COMP, "en", False),
    288:  (T_COMP, "tr", False),
    281:  (T_PLAT, "tr", False),
    278:  (T_PLAT, "tr", False),
    471:  (T_PLAT, "en", False),
    247:  (T_PLAT, "tr", False),
    226:  (T_PLAT, "tr", False),
    221:  (T_POLICY, "tr", False),
    214:  (T_PLAT, "tr", False),
    # 2015
    208:  (T_POLICY, "tr", False),
    197:  (T_COMP, "tr", False),
    179:  (T_PLAT, "tr", False),
    177:  (T_PLAT, "tr", False),
    140:  (T_COMP, "tr", False),
    168:  (T_POLICY, "tr", False),
    # 2014
    131:  (T_POLICY, "tr", False),
    124:  (T_POLICY, "tr", False),
    64:   (T_POLICY, "tr", False),
    855:  (T_LAWECON, "tr", False),
    # 2013
    56:   (T_PLAT, "tr", False),
    49:   (T_POLICY, "tr", False),
    74:   (T_LAWECON, "tr", False),
    76:   (T_POLICY, "tr", False),
    79:   (T_POLICY, "tr", False),
    85:   (T_PLAT, "tr", False),
    87:   (T_PLAT, "tr", False),
}

def trim_excerpt(text, limit):
    """Cap at `limit` chars on a word boundary, adding an ellipsis when cut."""
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(" ,;:—-")
    return cut + "…"

def get(url, tries=3):
    for attempt in range(tries):
        r = subprocess.run(["curl", "-sfL", "--max-time", "30", "-A", "Mozilla/5.0", url],
                           capture_output=True)
        if r.returncode == 0:
            return r.stdout
        # 22 = HTTP error (gone for good); anything else may be transient
        if r.returncode == 22 or attempt == tries - 1:
            raise RuntimeError(f"curl failed ({r.returncode}) for {url}")
    raise RuntimeError(f"curl failed for {url}")

def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)

def clean_url(src):
    """Drop Jetpack/Photon resize params so we fetch the original upload."""
    return src.split("?")[0]

def sanitize(body, slug):
    """Return (sanitized body, list of original image URLs found in it)."""
    # WordPress block comments and zero-width junk
    body = re.sub(r"<!--\s*/?wp:[^>]*-->", "", body)
    body = body.replace("​", "")
    # download images, rewrite src to local copies
    imgs = re.findall(r'<img[^>]+src="([^"]+)"', body)
    originals = []
    for i, src in enumerate(dict.fromkeys(imgs), 1):
        clean_src = clean_url(src)
        originals.append(clean_src)
        ext = pathlib.Path(clean_src).suffix or ".jpg"
        local = f"{slug}-{i}{ext}"
        try:
            (MEDIA_DIR / local).write_bytes(get(clean_src))
            body = body.replace(src, f"/blog-media/{local}")
            print(f"    img -> {local}")
        except Exception as e:
            print(f"    WARN image dropped {clean_src}: {e}", file=sys.stderr)
            body = drop_image(body, src)
    # strip presentation attributes; site CSS owns styling
    for attr in ("srcset", "sizes", "class", "style", "decoding", "loading",
                 "width", "height", "data-[a-z-]+"):
        body = re.sub(rf'\s{attr}="[^"]*"', "", body)
    # drop empty paragraphs
    body = re.sub(r"<p>(\s|&nbsp;)*</p>", "", body)
    body = fix_footnotes(body)
    return body.strip(), originals

def drop_image(body, src):
    """Remove an <img> (and its now-empty <figure>/<p>/<a> wrapper) from body."""
    esc = re.escape(src)
    body = re.sub(rf'<a[^>]*>\s*<img[^>]*src="{esc}"[^>]*>\s*</a>', "", body)
    body = re.sub(rf'<img[^>]*src="{esc}"[^>]*>', "", body)
    body = re.sub(r"<figure[^>]*>(\s|&nbsp;)*</figure>", "", body)
    body = re.sub(r"<p[^>]*>(\s|&nbsp;)*</p>", "", body)
    return body

def image_size(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
                         capture_output=True, text=True).stdout
    w = re.search(r"pixelWidth:\s*(\d+)", out)
    h = re.search(r"pixelHeight:\s*(\d+)", out)
    return (int(w.group(1)), int(h.group(1))) if w and h else (None, None)

def fetch_cover(url, slug):
    """Download the featured image, cap its size, return the site path."""
    if not url:
        return None
    clean = clean_url(url)
    ext = pathlib.Path(clean).suffix.lower() or ".jpg"
    raw = MEDIA_DIR / f"{slug}-cover-raw{ext}"
    local = MEDIA_DIR / f"{slug}-cover.jpg"
    if local.exists() and not REFRESH:
        w, h = image_size(local)
        return f"/blog-media/{local.name}", w, h
    raw.write_bytes(get(clean))
    # One format for every cover: JPEG, long edge <= COVER_MAX_PX. Photos
    # arrive as multi-MB PNGs otherwise.
    r = subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82",
                        "-Z", str(COVER_MAX_PX), str(raw), "--out", str(local)],
                       capture_output=True)
    raw.unlink(missing_ok=True)
    if r.returncode != 0 or not local.exists():
        raise RuntimeError(f"sips failed: {r.stderr.decode(errors='replace')[:200]}")
    w, h = image_size(local)
    print(f"    cover -> {local.name} ({w}x{h})")
    return f"/blog-media/{local.name}", w, h

# Word-exported footnotes reach WordPress with their anchors intact but their
# base URL mangled — either a bare "//<UUID>" (a protocol-relative link to a
# host that does not exist) or the original rekabetregulasyon.com article. The
# marker never reaches the note sitting at the bottom of the same page. Rewrite
# both ends to same-page anchors, and give each end the id the other points at.
_FTN = re.compile(r'<a\s+href="[^"]*#_ftn(\d+)"')
_REF = re.compile(r'<a\s+href="[^"]*#_ftnref(\d+)"')

def fix_footnotes(body):
    body = _REF.sub(lambda m: f'<a id="_ftn{m.group(1)}" href="#_ftnref{m.group(1)}"', body)
    body = _FTN.sub(lambda m: f'<a id="_ftnref{m.group(1)}" href="#_ftn{m.group(1)}"', body)
    return body

def extract_byline(text_start, html_start):
    """Heuristic byline/source from the post's opening line. Reviewed by hand after."""
    byline = source_name = None
    m = re.search(r"^\s*(.{2,80}?)\s+ile birlikte(?:\s+@([\w.]+))?", text_start)
    if m:
        byline, source_name = m.group(1), m.group(2)
    else:
        m = re.search(r"^\s*w(?:ith|/)\s+(.{2,80}?),?\s*(?:originally\s+)?published\s+@?([\w.]+)",
                      text_start, re.I)
        if m:
            byline, source_name = m.group(1), m.group(2)
    if byline:
        byline = re.sub(r"\s+", " ", byline).strip(" ,*")
        for bad, good in NAME_FIXES.items():
            byline = byline.replace(bad, good)
    if source_name:
        source_name = source_name.strip(" .")
        source_name = SOURCE_FIXES.get(source_name, source_name)
    return byline, source_name, SOURCE_URLS.get(source_name)

def norm_ws(s):
    return re.sub(r"\s+", " ", s.replace("\xa0", " ")).strip()

def clean_excerpt(excerpt, body):
    """WordPress builds the excerpt from the body, so a byline paragraph at
    the top of the post ("X ile birlikte @Source —") leaks into it. Strip it
    when the first paragraph is such a line."""
    m = re.match(r"\s*<p[^>]*>(.*?)</p>", body, re.S)
    if not m:
        return excerpt
    first = norm_ws(html.unescape(strip_tags(m.group(1))))
    if not re.search(r"ile birlikte|published", first, re.I):
        return excerpt
    ex = norm_ws(excerpt)
    lead = first.rstrip(" -–—")
    if ex.startswith(lead):
        ex = ex[len(lead):].lstrip(" -–—")
    return ex

def fetch_selected():
    """The WP REST API caps `include` lists well below 85 ids — page through."""
    ids = list(SELECTION)
    out = []
    for i in range(0, len(ids), 40):
        chunk = ",".join(str(x) for x in ids[i:i + 40])
        out += json.loads(get(
            f"{SITE}/posts?include={chunk}&per_page=100"
            "&_fields=id,slug,date,title,content,excerpt,jetpack_featured_media_url"))
    return out

posts = fetch_selected()
print(f"fetched {len(posts)} posts")
missing = set(SELECTION) - {p["id"] for p in posts}
if missing:
    sys.exit(f"missing posts: {sorted(missing)}")

existing_path = POSTS_DIR / "index.json"
existing = json.loads(existing_path.read_text()) if existing_path.exists() else []
curated = {p["slug"]: p for p in existing if not p.get("native")}
KEEP_FIELDS = ("title", "excerpt", "byline", "sourceName", "sourceUrl")

index = []
seen_slugs = set()
for p in sorted(posts, key=lambda x: x["date"], reverse=True):
    topic, lang, featured = SELECTION[p["id"]]
    slug = p["slug"][:60].rstrip("-")
    if slug in seen_slugs:
        sys.exit(f"slug collision after truncation: {slug} (id {p['id']})")
    seen_slugs.add(slug)
    title = html.unescape(strip_tags(p["title"]["rendered"])).strip().rstrip("*").strip()
    body_path = POSTS_DIR / f"{slug}.html"
    keep = body_path.exists() and not REFRESH
    print(f"  {p['date'][:10]} {slug}{'  (kept)' if keep else ''}")
    if keep:
        body = body_path.read_text(encoding="utf-8")
        body_imgs = [clean_url(u) for u in re.findall(r'<img[^>]+src="([^"]+)"',
                                                        p["content"]["rendered"])]
    else:
        body, body_imgs = sanitize(p["content"]["rendered"], slug)
        body_path.write_text(body, encoding="utf-8")
    cover_src = p.get("jetpack_featured_media_url") or ""
    try:
        image, img_w, img_h = fetch_cover(cover_src, slug) if cover_src else (None, None, None)
    except Exception as e:
        print(f"    WARN cover failed {cover_src}: {e}", file=sys.stderr)
        image, img_w, img_h = None, None, None
    cover_in_body = bool(cover_src) and (clean_url(cover_src) in body_imgs
                                         or slug in DUPLICATE_COVERS)
    text = html.unescape(strip_tags(body))
    words = len(text.split())
    excerpt = html.unescape(strip_tags(p["excerpt"]["rendered"])).strip()
    excerpt = re.sub(r"\s*\[?…\]?\s*$", "", excerpt).replace("&hellip;", "").strip()
    excerpt = clean_excerpt(excerpt, body)
    byline, source_name, source_url = extract_byline(text[:300], body[:600])
    index.append({
        "slug": slug,
        "title": title,
        "date": p["date"][:10],
        "lang": lang,
        "topic": topic,
        "featured": featured,
        "excerpt": trim_excerpt(excerpt, 220),
        "byline": byline,
        "sourceName": source_name,
        "sourceUrl": source_url,
        "image": image,
        "imageWidth": img_w,
        "imageHeight": img_h,
        "coverInBody": cover_in_body,
        "readingMin": max(1, round(words / 200)),
        "words": words,
    })
    if keep and slug in curated:
        for k in KEEP_FIELDS:
            index[-1][k] = curated[slug].get(k)

# preserve native (non-WordPress) posts already in index.json
native = [p for p in existing if p.get("native")]
index = sorted(native + index, key=lambda p: p["date"], reverse=True)

(POSTS_DIR / "index.json").write_text(
    json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"wrote {POSTS_DIR / 'index.json'} ({len(index)} posts)")

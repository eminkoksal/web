/**
 * Post-build prerender step.
 *
 * After `vite build` (client) and `vite build --ssr` (server) run, this script
 * renders each page's React tree to static HTML and injects it into the built
 * HTML file's #root. The result is real, crawlable HTML that the client then
 * hydrates — no in-browser compilation, fast first paint, good SEO.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(dir, 'dist');

const { render, renderPost, pageNames } = await import('./dist-server/entry-server.js');

// React page name -> built HTML filename
const htmlFor = {
  home: 'index.html',
  about: 'about.html',
  research: 'research.html',
  cv: 'cv.html',
  blog: 'blog.html',
  contact: 'contact.html',
};

const ROOT_DIV = '<div id="root"></div>';

for (const name of pageNames) {
  const fileName = htmlFor[name];
  if (!fileName) throw new Error(`No HTML mapping for page "${name}"`);

  const filePath = path.join(dist, fileName);
  let html = fs.readFileSync(filePath, 'utf8');

  if (!html.includes(ROOT_DIV)) {
    throw new Error(`Could not find ${ROOT_DIV} in ${fileName} — cannot inject prerendered markup.`);
  }

  const appHtml = render(name);
  html = html.replace(ROOT_DIV, `<div id="root">${appHtml}</div>`);
  fs.writeFileSync(filePath, html);

  console.log(`prerendered ${fileName.padEnd(14)} ${(appHtml.length / 1024).toFixed(1)} KB`);
}

/* ------------------------------------------------------------------ */
/* Per-post pages: stamp dist/blog-post.html out to dist/blog/<slug>.html
   for every post in content/posts/index.json. Each page gets its own
   <title>/meta, the prerendered article in #root, and a window.__POST__
   payload so the shared entry-post bundle can hydrate it (Nav menu etc.). */

const postsDir = path.join(dir, 'content', 'posts');
const posts = JSON.parse(fs.readFileSync(path.join(postsDir, 'index.json'), 'utf8'));

const templatePath = path.join(dist, 'blog-post.html');
const template = fs.readFileSync(templatePath, 'utf8');
fs.mkdirSync(path.join(dist, 'blog'), { recursive: true });

const escAttr = (s) => s
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Trim to ≤155 chars on a word boundary for meta descriptions. */
function metaDesc(text) {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= 155) return t;
  const cut = t.slice(0, 154);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

for (const meta of posts) {
  const bodyHtml = fs.readFileSync(path.join(postsDir, `${meta.slug}.html`), 'utf8');
  const post = { ...meta, bodyHtml };
  const appHtml = renderPost(post);

  let html = template
    .replaceAll('__POST_TITLE__', escAttr(meta.title))
    .replaceAll('__POST_DESC__', escAttr(metaDesc(meta.excerpt)))
    .replaceAll('__POST_SLUG__', meta.slug)
    .replaceAll('__POST_LANG__', meta.lang || 'en');

  if (!html.includes(ROOT_DIV)) {
    throw new Error(`Could not find ${ROOT_DIV} in blog-post template.`);
  }

  // Inline (non-module) script runs before the deferred hydration module.
  const state = `<script>window.__POST__ = ${
    JSON.stringify(post).replace(/</g, '\\u003c')
  }</script>`;

  html = html.replace(ROOT_DIV, `${state}<div id="root">${appHtml}</div>`);
  fs.writeFileSync(path.join(dist, 'blog', `${meta.slug}.html`), html);

  console.log(`prerendered blog/${meta.slug}.html ${(appHtml.length / 1024).toFixed(1)} KB`);
}

// The raw template has served its purpose — don't ship it.
fs.rmSync(templatePath);

/* ------------------------------------------------------------------ */
/* RSS 2.0 feed at dist/feed.xml — the only subscribe channel the site
   offers, so it carries the full post body rather than just an excerpt. */

const SITE = 'https://eminkoksal.com';
const escText = (s) => s
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** RFC-822 date at noon UTC — posts carry a date but no time of day. */
const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString();

/** Rewrite root-relative asset paths so feed readers resolve images. */
const absolutize = (html) =>
  html.replace(/(\s(?:src|href)=")\/(?!\/)/g, `$1${SITE}/`);

const feedItems = [...posts]
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .map((p) => {
    const url = `${SITE}/blog/${p.slug}.html`;
    const body = absolutize(
      fs.readFileSync(path.join(postsDir, `${p.slug}.html`), 'utf8'));
    return `    <item>
      <title>${escText(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <category>${escText(p.topic)}</category>
      <description>${escText(p.excerpt)}</description>
      <content:encoded><![CDATA[${body.replace(/]]>/g, ']]&gt;')}]]></content:encoded>
    </item>`;
  })
  .join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Emin Köksal</title>
    <link>${SITE}/blog.html</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Essays and working notes on AI in economic research, competition policy, and legal practice. Mostly English, sometimes Turkish.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(posts.map((p) => p.date).sort().at(-1))}</lastBuildDate>
${feedItems}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(dist, 'feed.xml'), feed);
console.log(`wrote feed.xml       ${posts.length} items`);

/* ------------------------------------------------------------------ */
/* sitemap.xml — every prerendered page plus every blog post. */

const pageUrls = Object.values(htmlFor).map((f) =>
  f === 'index.html' ? `${SITE}/` : `${SITE}/${f}`);
const postUrls = posts.map((p) => `${SITE}/blog/${p.slug}.html`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pageUrls, ...postUrls].map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`wrote sitemap.xml    ${pageUrls.length + postUrls.length} URLs`);

console.log(`Prerender complete. (${pageNames.length} pages + ${posts.length} posts)`);

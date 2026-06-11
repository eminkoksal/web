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
    .replaceAll('__POST_SLUG__', meta.slug);

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

console.log(`Prerender complete. (${pageNames.length} pages + ${posts.length} posts)`);

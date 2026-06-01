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

const { render, pageNames } = await import('./dist-server/entry-server.js');

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

console.log('Prerender complete.');

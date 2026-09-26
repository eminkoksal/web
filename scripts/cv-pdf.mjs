/**
 * Render the CV PDF from the same content as the CV page.
 *
 *   npm run cv-pdf
 *
 * Builds the site (so dist-server has the latest cv-data.jsx), renders
 * src/cv-print.jsx to static HTML with scripts/cv-pdf/cv-print.css and the
 * local Emin Style fonts, then prints it to A4 with headless Chrome into
 * public/assets/Emin-Koksal-CV.pdf (the file the site's CV_PDF points at).
 * Commit the PDF; GitHub Actions does not run this step.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'scripts', 'cv-pdf');
const work = path.join(root, 'dist-cv');
const out = path.join(root, 'public', 'assets', 'Emin-Koksal-CV.pdf');

const CHROME = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!fs.existsSync(CHROME)) {
  throw new Error(`Chrome not found at ${CHROME}. Set CHROME_PATH to a Chrome or Chromium binary.`);
}

const { renderCvPrint, CV_UPDATED } = await import(
  pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);

fs.rmSync(work, { recursive: true, force: true });
fs.mkdirSync(work, { recursive: true });
fs.cpSync(path.join(assets, 'fonts'), path.join(work, 'fonts'), { recursive: true });

const css = fs.readFileSync(path.join(assets, 'cv-print.css'), 'utf8').replaceAll('__UPDATED__', CV_UPDATED);
fs.writeFileSync(path.join(work, 'cv-print.css'), css);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Emin Köksal · Curriculum Vitae</title>
<meta name="author" content="Emin Köksal">
<link rel="stylesheet" href="cv-print.css">
</head>
<body>${renderCvPrint()}</body>
</html>`;
const htmlPath = path.join(work, 'cv-print.html');
fs.writeFileSync(htmlPath, html);

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=10000',
  `--print-to-pdf=${out}`,
  pathToFileURL(htmlPath).href,
], { stdio: ['ignore', 'ignore', 'pipe'] });

const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log(`wrote ${path.relative(root, out)}  ${kb} KB  (updated ${CV_UPDATED})`);


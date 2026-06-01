# eminkoksal.com

Personal website for **Emin Köksal** — Academic Economist & AI Strategist
(Associate Professor, Doç. Dr.). Tagline: *Where economic rigor meets AI fluency.*

Built from a [Claude Design](https://claude.ai/design) prototype, productionized as a
**static, prerendered React multi-page site** and deployed to **GitHub Pages**.

## How it works

- Each page is a plain HTML entry (`index.html`, `about.html`, `research.html`,
  `cv.html`, `blog.html`, `contact.html`).
- The UI is React (inline-styled components) in `src/`. `src/shared.jsx` holds the
  nav, footer, and shared primitives; each `src/<page>.jsx` is a page.
- At build time the pages are **prerendered to real HTML** (`react-dom/server`) and
  then **hydrated** in the browser (`src/entry-*.jsx`). No in-browser compiler —
  fast first paint and full SEO (content is in the page source).
- Static assets (CSS, portrait, favicon) live in `public/` and are served verbatim.
- `content/` holds the source markdown copy for each page (reference only; not built).

## Develop

```bash
npm install
npm run dev      # local dev server with hot reload
```

## Build

```bash
npm run build    # client build + SSR build + prerender -> dist/
npm run preview  # serve the built dist/ locally
```

The build runs three steps: `vite build` (client bundles), `vite build --ssr`
(server bundle for prerendering), then `node prerender.js` (injects static HTML
into each page's `#root`). Output is in `dist/`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. The custom domain is set via `public/CNAME`
(`eminkoksal.com`).

## Stack

Vite · React 18 · `@vitejs/plugin-react` · GitHub Pages.

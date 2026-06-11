import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const root = import.meta.dirname;

// Multi-page app: one HTML entry per page. Each HTML loads its own client
// hydration entry (src/entry-*.jsx). Pages are prerendered to static HTML
// after build via prerender.js using src/entry-server.jsx.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        research: resolve(root, 'research.html'),
        cv: resolve(root, 'cv.html'),
        blog: resolve(root, 'blog.html'),
        contact: resolve(root, 'contact.html'),
        /* Template entry for per-post pages. prerender.js stamps this out
           to dist/blog/<slug>.html for every post in content/posts/index.json,
           then removes the raw template from dist. */
        'blog-post': resolve(root, 'blog-post.html'),
      },
    },
  },
});

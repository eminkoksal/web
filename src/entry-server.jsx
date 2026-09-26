import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from './home.jsx';
import About from './about.jsx';
import Research from './research.jsx';
import CV from './cv.jsx';
import Blog from './blog.jsx';
import Contact from './contact.jsx';
import Post from './post.jsx';
import CvPrint from './cv-print.jsx';

export { CV_UPDATED } from './cv-data.jsx';

const pages = {
  home: Home,
  about: About,
  research: Research,
  cv: CV,
  blog: Blog,
  contact: Contact,
};

/** Render a page's React tree to a static HTML string for prerendering. */
export function render(name) {
  const App = pages[name];
  if (!App) throw new Error(`Unknown page: ${name}`);
  return renderToString(<App />);
}

/** Render a single blog post (index.json record + bodyHtml) to static HTML. */
export function renderPost(post) {
  return renderToString(<Post post={post} />);
}

/** Render the A4 print edition of the CV (scripts/cv-pdf.mjs turns it into the PDF). */
export function renderCvPrint() {
  return renderToString(<CvPrint />);
}

export const pageNames = Object.keys(pages);

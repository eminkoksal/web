import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from './home.jsx';
import About from './about.jsx';
import Research from './research.jsx';
import CV from './cv.jsx';
import Blog from './blog.jsx';
import Contact from './contact.jsx';

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

export const pageNames = Object.keys(pages);

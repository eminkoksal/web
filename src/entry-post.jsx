import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Post from './post.jsx';

/* Each prerendered post page embeds its own data as window.__POST__
   (index.json record + bodyHtml) so one bundle hydrates every post. */
const post = window.__POST__;
if (post) {
  hydrateRoot(document.getElementById('root'), <Post post={post} />);
}

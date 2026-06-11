/* Blog post page — one template rendering any post from content/posts/.
   Receives the full post object (index.json record + bodyHtml) as a prop:
   prerender.js passes it at build time; entry-post.jsx reads window.__POST__
   for hydration. */
import React from 'react';
import { IconArrow, Eyebrow, Button, Nav, Footer } from './shared.jsx';
import { formatDate } from './posts.js';

/* Scoped long-form typography for the sanitized WordPress body HTML.
   Tokens match the rest of the site: ink #141413, body #262627, muted #555,
   accent #F37338 / #CF4500, hairline rgba(20,20,19,.12). */
const POST_CSS = `
.post-body { max-width: 70ch; font-size: 18px; line-height: 1.7; color: #262627; }
.post-body p { margin: 0 0 1.5em; }
.post-body h2, .post-body h3, .post-body h4 {
  font-family: var(--font-sans); font-weight: 500; letter-spacing: -.022em;
  line-height: 1.15; color: #141413; margin: 2.2em 0 .7em;
}
.post-body h2 { font-size: clamp(26px, 2.6vw, 34px); }
.post-body h3 { font-size: clamp(22px, 2.2vw, 27px); }
.post-body h4 { font-size: 19px; }
.post-body a {
  color: #141413; text-decoration: underline;
  text-decoration-color: #F37338; text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
.post-body a:hover { color: #CF4500; }
.post-body ul, .post-body ol { margin: 0 0 1.5em; padding-left: 1.3em; }
.post-body li { margin: 0 0 .6em; }
.post-body blockquote {
  margin: 2em 0; padding: 2px 0 2px 26px;
  border-left: 3px solid #F37338; color: #141413; font-size: 19px;
}
.post-body blockquote p { margin-bottom: 1em; }
.post-body blockquote p:last-child { margin-bottom: 0; }
.post-body figure { margin: 2.4em 0; }
.post-body img {
  max-width: 100%; height: auto; display: block;
  border-radius: 24px; box-shadow: 0 8px 28px rgba(0,0,0,.07);
}
.post-body figcaption { font-size: 14px; color: #555; margin-top: 12px; }
.post-body iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border: 0; border-radius: 24px; }
.post-body strong { color: #141413; }
.post-body hr { border: 0; border-top: 1px solid rgba(20,20,19,.12); margin: 2.5em 0; }
.post-body sup { font-size: .7em; }
`;

function PostHeader({ post }) {
  const tr = post.lang === 'tr';
  const bylineText = post.byline ?
    (tr ? `${post.byline} ile birlikte` : `With ${post.byline}`) : null;

  return (
    <header style={{ paddingTop: 96 }}>
      <Eyebrow>{post.topic}</Eyebrow>
      <h1 className="display" style={{
        fontSize: 'clamp(36px, 4.6vw, 72px)',
        margin: '28px 0 24px', maxWidth: 980,
      }}>
        {post.title}
      </h1>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        fontSize: 15, color: '#555',
      }}>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingMin} min read</span>
        <span aria-hidden="true">·</span>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
          letterSpacing: '.06em', color: '#141413',
          border: '1px solid rgba(20,20,19,.25)', borderRadius: 999,
          padding: '4px 10px', lineHeight: 1,
        }}>
          {post.lang.toUpperCase()}
        </span>
      </div>

      {(bylineText || post.sourceName) &&
      <p style={{ fontSize: 16, lineHeight: 1.5, color: '#262627', margin: '20px 0 0' }}>
        {bylineText}
        {bylineText && post.sourceName && <span aria-hidden="true"> · </span>}
        {post.sourceName && <>
          {tr ? 'İlk yayın: ' : 'Originally published at '}
          {post.sourceUrl ?
          <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" style={{
            color: '#141413', textDecoration: 'underline',
            textDecorationColor: '#F37338', textUnderlineOffset: 3,
          }}>
              {post.sourceName}
            </a> :
          <em>{post.sourceName}</em>
          }
        </>}
      </p>
      }
    </header>);

}

function PostBody({ post }) {
  return (
    <section style={{ padding: '56px 0 48px' }}>
      <style dangerouslySetInnerHTML={{ __html: POST_CSS }} />
      <article
        className="post-body"
        lang={post.lang === 'tr' ? 'tr' : undefined}
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
    </section>);

}

function PostFooterCTA() {
  return (
    <section style={{ padding: '8px 0 64px' }}>
      <div style={{
        borderTop: '1px solid rgba(20,20,19,.12)', paddingTop: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 14, flexWrap: 'wrap',
      }}>
        <Button variant="ghost" href="blog.html">
          <IconArrow size={14} dir="left" /> All writing
        </Button>
        <Button variant="primary" href="contact.html">
          Get in touch <IconArrow size={14} dir="up-right" />
        </Button>
      </div>
    </section>);

}

function PostApp({ post }) {
  return (
    <>
      <Nav active="Blog" />
      <main>
        <div className="container">
          <PostHeader post={post} />
          <PostBody post={post} />
          <PostFooterCTA />
        </div>
      </main>
      <Footer />
    </>);

}

export default PostApp;

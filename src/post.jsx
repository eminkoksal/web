/* Blog post page — one template rendering any post from content/posts/.
   Receives the full post object (index.json record + bodyHtml) as a prop:
   prerender.js passes it at build time; entry-post.jsx reads window.__POST__
   for hydration.
   Emin Style v1.2 (2026-11-25): larger reading text, mono meta line, pictures with a
   hairline instead of a shadow, a coral reading-progress rule, and the neighbouring
   posts under the text. No motion on the body itself. */
import React from 'react';
import { Eyebrow, Nav, Footer } from './shared.jsx';
import { POSTS, formatDate } from './posts.js';
import { useReveal, ArrowUpRight, Btn } from './v2.jsx';

const { useEffect, useRef } = React;

/* Scoped long-form typography for the sanitized WordPress body HTML.
   Tokens match the rest of the site: ink #16150F, body #2E2E29, muted #555,
   accent #F37338 / #E75C39, hairline rgba(22,21,15,.12). */
const POST_CSS = `
.post-body { max-width: 66ch; font-family: var(--font-prose); font-size: 20px; line-height: 1.6; color: #2E2E29; }
.post-body p { margin: 0 0 1.5em; }
.post-body h2, .post-body h3, .post-body h4 {
  font-family: var(--font-sans); font-weight: 500; letter-spacing: -.022em;
  line-height: 1.15; color: #16150F; margin: 2.2em 0 .7em;
}
.post-body h2 { font-size: clamp(28px, 2.8vw, 38px); }
.post-body h3 { font-size: clamp(23px, 2.3vw, 29px); }
.post-body h4 { font-size: 20px; }
.post-body a {
  color: #16150F; text-decoration: underline;
  text-decoration-color: #E75C39; text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.post-body a:hover { color: #BC4527; }
.post-body a { overflow-wrap: anywhere; }   /* long bare URLs in footnotes used to push the page wide on phones */
.post-body ul, .post-body ol { margin: 0 0 1.5em; padding-left: 1.3em; }
.post-body li { margin: 0 0 .6em; }
.post-body blockquote {
  margin: 2em 0; padding: 2px 0 2px 26px;
  border-left: 2px solid #E75C39; color: #16150F; font-size: 23px; line-height: 1.45;
}
.post-body blockquote p { margin-bottom: 1em; }
.post-body blockquote p:last-child { margin-bottom: 0; }
.post-body figure { margin: 2.4em 0; }
.post-body img {
  max-width: 100%; height: auto; display: block;
  border-radius: 24px; border: 1px solid #DAD8CD;
}
.post-body figcaption { font-family: var(--font-mono); font-size: 12px; color: #56554F; margin-top: 12px; }
.post-body iframe { width: 100%; aspect-ratio: 16 / 9; height: auto; border: 0; border-radius: 24px; }
.post-body strong { color: #16150F; }
.post-body hr { border: 0; border-top: 1px solid rgba(22,21,15,.12); margin: 2.5em 0; }
.post-body sup { font-size: .7em; }
.post-progress { position: fixed; left: 0; right: 0; top: 0; height: 3px; z-index: 60; background: #E75C39; transform: scaleX(0); transform-origin: left center; }
.post-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: #56554F; }
.post-meta__lang { letter-spacing: .06em; color: #16150F; background: #EAE8DF; border-radius: 6px; padding: 5px 9px; line-height: 1; }
.post-next { position: relative; margin: 8px 0 56px; }
.post-next__label { margin: 0 0 12px; }
.post-next__row { position: relative; display: grid; grid-template-columns: 150px minmax(0, 1fr) auto; gap: 32px; align-items: start; padding: 28px 0; border-bottom: 1px solid rgba(22,21,15,.16); color: inherit; text-decoration: none; }
.post-next__when { display: flex; flex-direction: column; gap: 8px; padding-top: 6px; font-family: var(--font-mono); font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: #56554F; }
.post-next__when b { font-weight: 500; color: #BC4527; }
.post-next__title { font-family: var(--font-sans); font-size: clamp(21px, 1.9vw, 26px); font-weight: 500; letter-spacing: -.02em; line-height: 1.2; color: #16150F; transition: color .18s var(--ek-ease), transform .3s var(--ek-ease-out); }
.post-next__go { width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(22,21,15,.5); display: inline-flex; align-items: center; justify-content: center; color: #16150F; transition: background .18s var(--ek-ease), color .18s var(--ek-ease), border-color .18s var(--ek-ease); }
.post-next__row:hover .post-next__title { color: #BC4527; transform: translateX(8px); }
.post-next__row:hover .post-next__go { background: #BC4527; border-color: #BC4527; color: #F5F2EB; }
.post-end { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 0 0 72px; }
@media (max-width: 760px) {
  .post-body { font-size: 19px; }
  .post-next__row { grid-template-columns: 1fr; gap: 10px; }
  .post-next__when { flex-direction: row; gap: 12px; padding-top: 0; }
  .post-next__go { display: none; }
}
@media print { .post-progress, .post-next, .post-end { display: none; } }
`;

function PostHeader({ post }) {
  const tr = post.lang === 'tr';
  const bylineText = post.byline ?
    (tr ? `${post.byline} ile birlikte` : `With ${post.byline}`) : null;

  return (
    <header style={{ paddingTop: 40 }} data-reveal>
      <div data-r><Eyebrow><span lang="en">{post.topic}</span></Eyebrow></div>
      <h1 className="display" data-r style={{
        '--i': 1,
        fontSize: 'clamp(36px, 5vw, 80px)',
        margin: '28px 0 28px', maxWidth: 1040,
      }}>
        {post.title}
      </h1>

      <div className="post-meta" data-r style={{ '--i': 2 }}>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingMin} {tr ? 'dk okuma' : 'min read'}</span>
        <span aria-hidden="true">·</span>
        <span className="post-meta__lang">
          {post.lang.toUpperCase()}
        </span>
      </div>

      {(bylineText || post.sourceName) &&
      <p data-r style={{ '--i': 3, fontSize: 18, lineHeight: 1.5, color: '#2E2E29', margin: '22px 0 0' }}>
          {bylineText}
        {bylineText && post.sourceName && <span aria-hidden="true"> · </span>}
        {post.sourceName && <>
          {tr ? 'İlk yayın: ' : 'Originally published at '}
          {post.sourceUrl ?
          <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" style={{
            color: '#16150F', textDecoration: 'underline',
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

/* Cover = the WordPress featured image. Natural aspect ratio, capped in
   height so square and portrait covers don't push the text off-screen;
   skipped when the same picture already opens the body. */
function PostCover({ post }) {
  if (!post.image || post.coverInBody) return null;
  return (
    <figure style={{ margin: '48px 0 0', maxWidth: 860 }}>
      <img src={post.image} alt=""
           width={post.imageWidth || undefined} height={post.imageHeight || undefined}
           style={{
             display: 'block', width: '100%', height: 'auto', maxHeight: 560,
             objectFit: 'cover', borderRadius: 24, background: '#EAE8DF',
          border: '1px solid #DAD8CD',
           }} />
    </figure>
  );
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

/* The coral rule at the top of the window: how far through the text the reader is. */
function ReadingProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const bar = ref.current;
    const body = document.querySelector('.post-body');
    if (!bar || !body) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = body.getBoundingClientRect();
      const span = r.height - window.innerHeight * 0.6;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : (r.top < 0 ? 1 : 0);
      bar.style.transform = 'scaleX(' + p + ')';
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div className="post-progress" ref={ref} aria-hidden="true" />;
}

/* The posts on either side of this one in the feed (index.json is newest first). */
function PostNeighbours({ post }) {
  const i = POSTS.findIndex((p) => p.slug === post.slug);
  if (i < 0) return null;
  const tr = post.lang === 'tr';
  const rows = [
    { p: POSTS[i - 1], label: tr ? 'Daha yeni' : 'Newer' },
    { p: POSTS[i + 1], label: tr ? 'Daha eski' : 'Older' },
  ].filter((r) => r.p);
  if (!rows.length) return null;
  return (
    <section className="post-next" data-reveal>
      <span className="v2-rule v2-draw" />
      <div style={{ paddingTop: 28 }} data-r>
        <p className="v2-mono post-next__label">{tr ? 'Okumaya devam' : 'Keep reading'}</p>
        {rows.map(({ p, label }) =>
        <a className="post-next__row" href={`blog/${p.slug}.html`} key={p.slug} lang={p.lang}>
          <span className="post-next__when"><b lang={tr ? 'tr' : 'en'}>{label}</b>{formatDate(p.date)}</span>
          <span className="post-next__title">{p.title}</span>
          <span className="post-next__go"><ArrowUpRight size={14} width={1.4} /></span>
        </a>
        )}
      </div>
    </section>);
}

function PostFooterCTA() {
  return (
    <section className="post-end">
      <Btn variant="ghost" href="blog.html">All writing</Btn>
      <Btn href="contact.html">Get in touch <ArrowUpRight /></Btn>
    </section>);
}

function PostApp({ post }) {
  useReveal();
  return (
    <>
      <ReadingProgress />
      <Nav active="Blog" />
      <main>
        <div className="container">
          <PostHeader post={post} />
          <PostCover post={post} />
          <PostBody post={post} />
          <PostNeighbours post={post} />
          <PostFooterCTA />
        </div>
      </main>
      <Footer />
    </>);
}

export default PostApp;

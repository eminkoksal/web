/* Blog page — real post feed from content/posts/index.json.
   Featured post pinned at top; topic chips + Turkish-posts filter drive
   the grid client-side. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';
import { POSTS, TOPICS, FEATURED_POST, formatDate, trimWords } from './posts.js';

const { useState: useBlogState } = React;

const PAGE_SIZE = 9;

/* Card cover gradients — assigned by position, brand palette. */
const CARD_GRADS = [
  'radial-gradient(circle at 30% 30%, #F4C0B2 0%, #E75C39 55%, #BC4527 100%)',
  'radial-gradient(circle at 60% 30%, #EAE8DF 0%, #DAD8CD 60%, #CB6951 110%)',
  'radial-gradient(circle at 40% 30%, #FFE5DE 0%, #F37338 45%, #E75C39 100%)',
  'radial-gradient(circle at 30% 30%, #E75C39 0%, #BC4527 60%, #2E2E29 100%)',
  'radial-gradient(circle at 70% 30%, #F37338 0%, #E75C39 50%, #56554F 100%)',
  'radial-gradient(circle at 30% 60%, #F4C0B2 0%, #E8A493 40%, #B9482C 100%)',
];

function postHref(p) {
  return `blog/${p.slug}.html`;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function BlogHero() {
  return (
    <section style={{ position: 'relative', padding: '120px 0 48px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: -10, top: 60, zIndex: 0 }}>
          <GhostHeadline>Writing</GhostHeadline>
        </div>
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 64,
                      display: 'grid', gridTemplateColumns: '1.4fr 1fr',
                      gap: 64, alignItems: 'end' }}>
          <div>
            <Eyebrow>Writing</Eyebrow>
            <h1 className="display" style={{ margin: '28px 0 0' }}>
              Notes from the seam between economics, regulation, and AI
            </h1>
          </div>
          <p style={{ fontFamily: 'var(--font-prose)', fontSize: 18, lineHeight: 1.55, color: '#2E2E29',
                      margin: 0 }}>
            Essays, working notes, and shorter posts from where economics,
            competition policy, and AI tools meet in day-to-day analytical
            work. Some pieces are written for academics, some for
            practitioners; most try to serve both. In English or Turkish,
            depending on who the piece is for. The archive goes back to 2013.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Topic chips                                                        */
/* ------------------------------------------------------------------ */

function TopicChips({ topic, trOnly, onTopic }) {
  const all = ['All', ...TOPICS];
  return (
    <section id="topics" style={{ padding: '24px 0 16px', scrollMarginTop: 120 }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {all.map((t) => {
            const on = topic === t && !(t === 'All' && trOnly);
            return (
              <button key={t} type="button" onClick={() => onTopic(t)}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
                  letterSpacing: '-0.02em', lineHeight: 1,
                  padding: '12px 18px', borderRadius: 999,
                  border: '1.5px solid ' + (on ? '#16150F' : 'rgba(22,21,15,.22)'),
                  background: on ? '#16150F' : 'transparent',
                  color: on ? '#F5F2EB' : '#16150F',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'background 180ms cubic-bezier(0.4,0,0.2,1), color 180ms, border-color 180ms',
                }}>
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured post (pinned)                                             */
/* ------------------------------------------------------------------ */

function FeaturedPost() {
  const p = FEATURED_POST;
  if (!p) return null;
  return (
    <section className="section" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56,
          alignItems: 'center', padding: '64px 0',
          borderTop: '1px solid rgba(22,21,15,.12)',
          borderBottom: '1px solid rgba(22,21,15,.12)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <Eyebrow>Featured</Eyebrow>
              <span style={{ fontSize: 13, color: '#56554F' }}>
                {formatDate(p.date)} · {p.readingMin} min read · {p.topic}
              </span>
            </div>
            <h2 className="display--mid" style={{ margin: '0 0 20px' }}>
              <a href={postHref(p)} style={{ color: 'inherit', textDecoration: 'none' }}>
                {p.title}
              </a>
            </h2>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 18, lineHeight: 1.5, color: '#56554F',
                        margin: '0 0 28px', maxWidth: 560 }}>
              {trimWords(p.excerpt, 45)}
            </p>
            <a href={postHref(p)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-sans)',
              fontSize: 16, fontWeight: 500, letterSpacing: '-.02em',
              color: '#16150F', textDecoration: 'none',
            }}>
              Read the post <IconArrow size={14} />
            </a>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <a href={postHref(p)} style={{ position: 'relative', display: 'block', textDecoration: 'none' }}>
              {p.image ? (
                <div aria-hidden="true" style={{
                  width: 360, height: 360, borderRadius: '50%',
                  background: `#EAE8DF url(${p.image}) center/cover`,
                }} />
              ) : (
                <Portrait
                  size={360}
                  gradient="radial-gradient(circle at 35% 35%, #F4C0B2 0%, #F37338 45%, #E75C39 100%)"
                />
              )}
              <span style={{
                position: 'absolute', left: '50%', bottom: 34, transform: 'translateX(-50%)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#FFFFFF', color: '#16150F',
                padding: '8px 14px', borderRadius: 999,
                fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
                letterSpacing: '-.02em', whiteSpace: 'nowrap',
              }}>
                {p.topic} · {p.lang.toUpperCase()}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Post cards grid                                                    */
/* ------------------------------------------------------------------ */

function PostCard({ p, n }) {
  return (
    <article style={{
      display: 'flex', flexDirection: 'column', gap: 22,
    }}>
      <a href={postHref(p)} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1.05/1' }}>
          {p.image ? (
            <img src={p.image} alt="" loading="lazy"
                 width={p.imageWidth || undefined} height={p.imageHeight || undefined}
                 style={{
                   width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                   borderRadius: 24, background: '#EAE8DF',
                 }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              borderRadius: 24, background: CARD_GRADS[n % CARD_GRADS.length],
            }} />
          )}
          <div style={{ position: 'absolute', left: 20, top: 20 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#FFFFFF', color: '#16150F',
              padding: '8px 14px', borderRadius: 999,
              fontFamily: 'var(--font-sans)',
              fontSize: 12, fontWeight: 500, letterSpacing: '-.02em',
            }}>
              {p.topic}
            </span>
          </div>
          <div style={{
            position: 'absolute', right: 20, bottom: 20,
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500,
            letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
            color: '#F5F2EB', background: 'rgba(22,21,15,.72)',
            padding: '6px 10px', borderRadius: 999, lineHeight: 1,
          }}>
            {p.lang.toUpperCase()}
          </div>
        </div>
      </a>
      <div>
        <div style={{ fontSize: 13, color: '#56554F', marginBottom: 10 }}>
          {formatDate(p.date)} · {p.readingMin} min read
        </div>
        <h3 style={{ fontFamily: 'var(--font-sans)',
                     fontSize: 24, fontWeight: 500, letterSpacing: '-.02em',
                     lineHeight: 1.2, margin: '0 0 12px' }}>
          <a href={postHref(p)} style={{ color: '#16150F', textDecoration: 'none' }}>
            {p.title}
          </a>
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#56554F',
                    margin: '0 0 14px' }}>
          {trimWords(p.excerpt, 25)}
        </p>
        <a href={postHref(p)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-sans)',
          fontSize: 14, fontWeight: 500, letterSpacing: '-.02em',
          color: '#16150F', textDecoration: 'none',
        }}>
          Read <IconArrow size={12} />
        </a>
      </div>
    </article>
  );
}

function RecentPosts({ posts, total, trOnly, limit, onMore }) {
  const visible = posts.slice(0, limit);
  return (
    <section id="feed" className="section" style={{ paddingTop: 64, scrollMarginTop: 120 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline',
                      justifyContent: 'space-between', marginBottom: 48,
                      flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Eyebrow>Posts</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>
              All writing
            </h2>
          </div>
          <span style={{ fontSize: 14, color: '#56554F', maxWidth: 380 }}>
            Showing {visible.length} of {posts.length}
            {posts.length < total ? ` matching posts (${total} in all)` : ' posts'}
            {trOnly ? ' · Turkish' : ''}
          </span>
        </div>
        {posts.length === 0 ? (
          <p style={{ fontSize: 16, color: '#56554F', margin: 0 }}>
            Nothing under this filter yet — try another topic.
          </p>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 56,
          }}>
            {visible.map((p, i) => (
              <PostCard key={p.slug} p={p} n={i} />
            ))}
          </div>
        )}
        {visible.length < posts.length && (
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={onMore}>
              Load more <IconArrow size={14} dir="down" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Archive                                                            */
/* ------------------------------------------------------------------ */

function Archive({ onByYear, onByTopic, onTurkish }) {
  const items = [
    { label: 'By year', target: 'feed', onClick: onByYear },
    { label: 'By topic', target: 'topics', onClick: onByTopic },
    { label: 'Turkish posts', target: 'feed', onClick: onTurkish },
  ];
  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64,
                      alignItems: 'start' }}>
          <div>
            <Eyebrow>Archive</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>
              Browse everything
            </h2>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 18, lineHeight: 1.5, color: '#2E2E29',
                        margin: '24px 0 0', maxWidth: 460 }}>
              Or browse the full archive by year, by topic, or by language.
            </p>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            borderTop: '1px solid rgba(22,21,15,.18)',
            borderBottom: '1px solid rgba(22,21,15,.18)',
          }}>
            {items.map((it, i) => (
              <a key={it.label} href={`#${it.target}`}
                 onClick={(e) => { e.preventDefault(); it.onClick(); }}
                 style={{
                   padding: '40px 28px',
                   borderLeft: i === 0 ? 'none' : '1px solid rgba(22,21,15,.18)',
                   display: 'flex', flexDirection: 'column',
                   justifyContent: 'space-between',
                   gap: 32, minHeight: 200,
                   textDecoration: 'none', color: '#16150F',
                 }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 500,
                  letterSpacing: '-0.02em', lineHeight: 1.1,
                }}>
                  {it.label}
                </span>
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid #16150F',
                  display: 'inline-flex', alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconArrow size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Subscribe / Follow                                                 */
/* ------------------------------------------------------------------ */

function Subscribe() {
  return (
    <section className="section" style={{ paddingTop: 0, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          background: '#FBFAF6', borderRadius: 24,
          padding: '72px 64px',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: 56, alignItems: 'start',
          }}>
            <div>
              <Eyebrow>Stay in touch</Eyebrow>
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(32px, 3.4vw, 48px)',
                fontWeight: 500, lineHeight: 1.05,
                letterSpacing: '-0.025em',
                margin: '24px 0 0',
              }}>
                Get new writing as it goes out
              </h2>
              <p style={{ fontFamily: 'var(--font-prose)', fontSize: 17, lineHeight: 1.5, color: '#2E2E29',
                          margin: '24px 0 0', maxWidth: 400 }}>
                I publish when I have something to say, which makes the
                schedule irregular by design. Two ways to keep up:
              </p>
            </div>

            <div style={{
              padding: '32px 32px 32px 32px',
              borderLeft: '1px solid rgba(22,21,15,.14)',
              display: 'flex', flexDirection: 'column', gap: 16,
              minHeight: 240,
            }}>
              <Eyebrow>RSS</Eyebrow>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: '#2E2E29',
                          margin: 0, flex: 1 }}>
                Every post, full text, in your own reader. No email address,
                no list, nothing to unsubscribe from.
              </p>
              <div>
                <Button variant="primary" href="feed.xml" target="_blank">
                  Get the feed <IconArrow size={14} dir="up-right" />
                </Button>
              </div>
            </div>

            <div style={{
              padding: '32px 32px 32px 32px',
              borderLeft: '1px solid rgba(22,21,15,.14)',
              display: 'flex', flexDirection: 'column', gap: 16,
              minHeight: 240,
            }}>
              <Eyebrow>LinkedIn</Eyebrow>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: '#2E2E29',
                          margin: 0, flex: 1 }}>
                Where most of the shorter posts go first.
              </p>
              <div>
                <Button variant="secondary" href="https://www.linkedin.com/in/eminkoksal"
                        target="_blank">
                  Follow on LinkedIn <IconArrow size={14} dir="up-right" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing CTA                                                        */
/* ------------------------------------------------------------------ */

function ClosingCTA() {
  return (
    <section className="section" style={{ paddingTop: 16, paddingBottom: 120 }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.3fr 1fr',
          gap: 64, alignItems: 'center',
          padding: '64px 0',
          borderTop: '1px solid rgba(22,21,15,.12)',
        }}>
          <div>
            <h2 className="display--mid" style={{ margin: 0, maxWidth: 720 }}>
              Have a piece in mind for a guest essay, podcast, or panel?
            </h2>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 18, lineHeight: 1.5, color: '#2E2E29',
                        margin: '24px 0 0', maxWidth: 640 }}>
              I take on a small number of invited essays, podcast
              appearances, and panels each year, mostly on
              AI in competition and regulation, AI-native research methods,
              or the economics of digital platforms. Get in touch.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" href="contact.html">
              Get in touch <IconArrow size={14} dir="up-right" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function BlogApp() {
  const [topic, setTopic] = useBlogState('All');
  const [trOnly, setTrOnly] = useBlogState(false);
  const [limit, setLimit] = useBlogState(PAGE_SIZE);

  /* The featured post is pinned above the grid, so the grid carries
     the rest; topic and language filters apply to the grid. */
  const gridPosts = POSTS.filter((p) => !p.featured);
  const filtered = gridPosts.filter((p) =>
    (topic === 'All' || p.topic === topic) &&
    (!trOnly || p.lang === 'tr'));

  const pickTopic = (t) => {
    setTopic(t);
    if (t === 'All') setTrOnly(false);
    setLimit(PAGE_SIZE);
  };

  return (
    <>
      <Nav active="Blog" />
      <main>
        <BlogHero />
        <TopicChips topic={topic} trOnly={trOnly} onTopic={pickTopic} />
        <FeaturedPost />
        <RecentPosts
          posts={filtered}
          total={gridPosts.length}
          trOnly={trOnly}
          limit={limit}
          onMore={() => setLimit(limit + PAGE_SIZE)} />
        <Archive
          onByYear={() => { setTopic('All'); setTrOnly(false); setLimit(gridPosts.length); scrollToId('feed'); }}
          onByTopic={() => { scrollToId('topics'); }}
          onTurkish={() => { setTopic('All'); setTrOnly(true); setLimit(gridPosts.length); scrollToId('feed'); }} />
        <Subscribe />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

export default BlogApp;

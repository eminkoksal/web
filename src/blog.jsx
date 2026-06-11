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
  'radial-gradient(circle at 30% 30%, #F37338 0%, #CF4500 55%, #9A3A0A 100%)',
  'radial-gradient(circle at 60% 30%, #E8E2DA 0%, #D1CDC7 60%, #9A3A0A 110%)',
  'radial-gradient(circle at 40% 30%, #F79E1B 0%, #F37338 40%, #CF4500 100%)',
  'radial-gradient(circle at 30% 30%, #CF4500 0%, #9A3A0A 60%, #2B2B2B 100%)',
  'radial-gradient(circle at 70% 30%, #F37338 0%, #CF4500 50%, #555555 100%)',
  'radial-gradient(circle at 30% 60%, #F79E1B 0%, #F37338 40%, #9A3A0A 100%)',
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
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#262627',
                      margin: 0 }}>
            Essays, working notes, and shorter posts from where economics,
            competition policy, and AI tools meet in day-to-day analytical
            work. Some pieces are written for academics, some for
            practitioners; most try to serve both. Mostly in English, with
            occasional Turkish posts where the audience is primarily Turkish.
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
                  border: '1.5px solid ' + (on ? '#141413' : 'rgba(20,20,19,.22)'),
                  background: on ? '#141413' : 'transparent',
                  color: on ? '#F3F0EE' : '#141413',
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
          borderTop: '1px solid rgba(20,20,19,.12)',
          borderBottom: '1px solid rgba(20,20,19,.12)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <Eyebrow>Featured</Eyebrow>
              <span style={{ fontSize: 13, color: '#555' }}>
                {formatDate(p.date)} · {p.readingMin} min read · {p.topic}
              </span>
            </div>
            <h2 className="display--mid" style={{ margin: '0 0 20px' }}>
              <a href={postHref(p)} style={{ color: 'inherit', textDecoration: 'none' }}>
                {p.title}
              </a>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: '#555',
                        margin: '0 0 28px', maxWidth: 560 }}>
              {trimWords(p.excerpt, 45)}
            </p>
            <a href={postHref(p)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-sans)',
              fontSize: 16, fontWeight: 500, letterSpacing: '-.02em',
              color: '#141413', textDecoration: 'none',
            }}>
              Read the post <IconArrow size={14} />
            </a>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <a href={postHref(p)} style={{ position: 'relative', display: 'block', textDecoration: 'none' }}>
              <Portrait
                size={360}
                gradient="radial-gradient(circle at 35% 35%, #F79E1B 0%, #F37338 45%, #CF4500 100%)"
              />
              <span style={{
                position: 'absolute', left: '50%', bottom: 34, transform: 'translateX(-50%)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#FFFFFF', color: '#141413',
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
          <div style={{
            width: '100%', height: '100%',
            borderRadius: 40, background: CARD_GRADS[n % CARD_GRADS.length],
          }} />
          <div style={{ position: 'absolute', left: 20, top: 20 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#FFFFFF', color: '#141413',
              padding: '8px 14px', borderRadius: 999,
              fontFamily: 'var(--font-sans)',
              fontSize: 12, fontWeight: 500, letterSpacing: '-.02em',
            }}>
              {p.topic}
            </span>
          </div>
          <div style={{
            position: 'absolute', right: 20, bottom: 20,
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#FFFFFF', opacity: 0.78,
          }}>
            {p.lang.toUpperCase()}
          </div>
        </div>
      </a>
      <div>
        <div style={{ fontSize: 13, color: '#555', marginBottom: 10 }}>
          {formatDate(p.date)} · {p.readingMin} min read
        </div>
        <h3 style={{ fontFamily: 'var(--font-sans)',
                     fontSize: 24, fontWeight: 500, letterSpacing: '-.02em',
                     lineHeight: 1.2, margin: '0 0 12px' }}>
          <a href={postHref(p)} style={{ color: '#141413', textDecoration: 'none' }}>
            {p.title}
          </a>
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#555',
                    margin: '0 0 14px' }}>
          {trimWords(p.excerpt, 25)}
        </p>
        <a href={postHref(p)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-sans)',
          fontSize: 14, fontWeight: 500, letterSpacing: '-.02em',
          color: '#141413', textDecoration: 'none',
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
            <Eyebrow>Recent</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>
              Recent writing
            </h2>
          </div>
          <span style={{ fontSize: 14, color: '#555', maxWidth: 380 }}>
            {posts.length} of {total} posts{trOnly ? ' · Turkish' : ''}
          </span>
        </div>
        {posts.length === 0 ? (
          <p style={{ fontSize: 16, color: '#555', margin: 0 }}>
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
    { label: 'By year', onClick: onByYear },
    { label: 'By topic', onClick: onByTopic },
    { label: 'Turkish posts', onClick: onTurkish },
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
            <p style={{ fontSize: 18, lineHeight: 1.5, color: '#262627',
                        margin: '24px 0 0', maxWidth: 460 }}>
              Or browse the full archive by year, by topic, or by language.
            </p>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            borderTop: '1px solid rgba(20,20,19,.18)',
            borderBottom: '1px solid rgba(20,20,19,.18)',
          }}>
            {items.map((it, i) => (
              <a key={it.label} href="#feed"
                 onClick={(e) => { e.preventDefault(); it.onClick(); }}
                 style={{
                   padding: '40px 28px',
                   borderLeft: i === 0 ? 'none' : '1px solid rgba(20,20,19,.18)',
                   display: 'flex', flexDirection: 'column',
                   justifyContent: 'space-between',
                   gap: 32, minHeight: 200,
                   textDecoration: 'none', color: '#141413',
                 }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 500,
                  letterSpacing: '-0.02em', lineHeight: 1.1,
                }}>
                  {it.label}
                </span>
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid #141413',
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
          background: '#FCFBFA', borderRadius: 40,
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
              <p style={{ fontSize: 17, lineHeight: 1.5, color: '#262627',
                          margin: '24px 0 0', maxWidth: 400 }}>
                I publish when I have something to say, which makes the
                schedule irregular by design. Two ways to keep up:
              </p>
            </div>

            <div style={{
              padding: '32px 32px 32px 32px',
              borderLeft: '1px solid rgba(20,20,19,.14)',
              display: 'flex', flexDirection: 'column', gap: 16,
              minHeight: 240,
            }}>
              <Eyebrow>Email</Eyebrow>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: '#262627',
                          margin: 0, flex: 1 }}>
                Optional, low-frequency newsletter. Mostly long-form essays
                and research updates. No marketing.
              </p>
              <div>
                <Button variant="primary" href="#">
                  Subscribe <IconArrow size={14} dir="up-right" />
                </Button>
              </div>
            </div>

            <div style={{
              padding: '32px 32px 32px 32px',
              borderLeft: '1px solid rgba(20,20,19,.14)',
              display: 'flex', flexDirection: 'column', gap: 16,
              minHeight: 240,
            }}>
              <Eyebrow>LinkedIn</Eyebrow>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: '#262627',
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
          borderTop: '1px solid rgba(20,20,19,.12)',
        }}>
          <div>
            <h2 className="display--mid" style={{ margin: 0, maxWidth: 720 }}>
              Have a piece in mind for a guest essay, podcast, or panel?
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: '#262627',
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

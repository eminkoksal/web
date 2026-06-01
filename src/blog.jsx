/* Blog page — editorial framing only. The post feed will be auto-populated
   by the site builder after migration; the cards below are intentionally
   visible placeholders. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';

const { useState: useBlogState } = React;

const BLOG_TOPICS = [
  'AI in Economic Research',
  'AI in Legal Practice',
  'Competition Policy',
  'Platform & Digital Regulation',
  'Climate & Energy Economics',
  'Workflows & Tooling',
  'Teaching Notes',
];

/* Placeholder cards — deliberately marked as placeholders so they are not
   mistaken for real Emin writing. Titles and excerpts are obviously dummy. */
const BLOG_PLACEHOLDERS = [
  {
    topic: 'AI in Economic Research',
    date: 'Date · EN',
    read: '8 min read',
    grad: 'radial-gradient(circle at 30% 30%, #F37338 0%, #CF4500 55%, #9A3A0A 100%)',
  },
  {
    topic: 'Competition Policy',
    date: 'Date · EN',
    read: '6 min read',
    grad: 'radial-gradient(circle at 60% 30%, #E8E2DA 0%, #D1CDC7 60%, #9A3A0A 110%)',
  },
  {
    topic: 'AI in Legal Practice',
    date: 'Date · EN',
    read: '5 min read',
    grad: 'radial-gradient(circle at 40% 30%, #F79E1B 0%, #F37338 40%, #CF4500 100%)',
  },
  {
    topic: 'Workflows & Tooling',
    date: 'Date · EN',
    read: '4 min read',
    grad: 'radial-gradient(circle at 30% 30%, #CF4500 0%, #9A3A0A 60%, #2B2B2B 100%)',
  },
  {
    topic: 'Platform & Digital Regulation',
    date: 'Date · TR',
    read: '7 min read',
    grad: 'radial-gradient(circle at 70% 30%, #F37338 0%, #CF4500 50%, #555555 100%)',
  },
  {
    topic: 'Teaching Notes',
    date: 'Date · EN',
    read: '3 min read',
    grad: 'radial-gradient(circle at 30% 60%, #F79E1B 0%, #F37338 40%, #9A3A0A 100%)',
  },
];

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
              Notes from the seam between economics, regulation, and AI.
            </h1>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#262627',
                      margin: 0 }}>
            Essays, working notes, and shorter posts on what's actually
            happening at the intersection of academic economics, competition
            policy, and the use of frontier AI tools in serious analytical
            work. Some pieces are addressed to academic readers, some to
            practitioners; most try to speak to both. Written in English;
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

function TopicChips() {
  const [active, setActive] = useBlogState('All');
  const all = ['All', ...BLOG_TOPICS];
  return (
    <section style={{ padding: '24px 0 16px' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {all.map((t) => {
            const on = active === t;
            return (
              <button key={t} type="button" onClick={() => setActive(t)}
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
/*  Featured Post (placeholder slot)                                   */
/* ------------------------------------------------------------------ */

function FeaturedSlot() {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <Eyebrow>Featured</Eyebrow>
              <span style={{ fontSize: 13, color: '#555' }}>Slot reserved · to be selected</span>
            </div>
            <h2 className="display--mid" style={{ margin: '0 0 20px', color: 'rgba(20,20,19,.55)' }}>
              Featured post — placeholder for migration.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: '#555',
                        margin: '0 0 28px', maxWidth: 560 }}>
              One post pinned at the top. The site builder will pull the most
              representative current piece from the archive after the
              WordPress migration; for now this slot is intentionally empty.
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 16, fontWeight: 500, letterSpacing: '-.02em',
              color: 'rgba(20,20,19,.45)',
            }}>
              Read the post →
            </span>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Portrait
                size={360}
                gradient="radial-gradient(circle at 35% 35%, #E8E2DA 0%, #D1CDC7 55%, #B8B1A8 100%)"
              />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'rgba(20,20,19,.55)', pointerEvents: 'none',
              }}>
                Featured image
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Recent posts grid (placeholder cards)                              */
/* ------------------------------------------------------------------ */

function PlaceholderCard({ p, n }) {
  return (
    <article style={{
      display: 'flex', flexDirection: 'column', gap: 22,
    }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1.05/1' }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 40, background: p.grad,
        }} />
        <div style={{ position: 'absolute', left: 20, top: 20 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#FFFFFF', padding: '8px 14px', borderRadius: 999,
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
          Placeholder · 0{n}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, color: '#555', marginBottom: 10 }}>
          {p.date} · {p.read}
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-.02em',
                     lineHeight: 1.2, margin: '0 0 12px',
                     color: 'rgba(20,20,19,.7)' }}>
          Sample post title — placeholder for migration.
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#666',
                    margin: '0 0 14px' }}>
          Excerpt placeholder. The site builder will populate this card with
          the post's first ~25 words once the archive is migrated; the layout
          below demonstrates the card pattern only.
        </p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 14, fontWeight: 500, letterSpacing: '-.02em',
          color: 'rgba(20,20,19,.5)',
        }}>
          Read →
        </span>
      </div>
    </article>
  );
}

function RecentPosts() {
  return (
    <section className="section" style={{ paddingTop: 64 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline',
                      justifyContent: 'space-between', marginBottom: 48,
                      flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Eyebrow>Recent</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>
              Recent writing.
            </h2>
          </div>
          <span style={{ fontSize: 14, color: '#555', maxWidth: 380 }}>
            Auto-feed once migrated. Each card shows title, date, a short
            excerpt, topic chip, and a Read link.
          </span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 56,
        }}>
          {BLOG_PLACEHOLDERS.map((p, i) => (
            <PlaceholderCard key={i} p={p} n={i + 1} />
          ))}
        </div>
        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary">
            Load more <IconArrow size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Archive                                                            */
/* ------------------------------------------------------------------ */

function Archive() {
  const items = [
    { label: 'By year', href: '#' },
    { label: 'By topic', href: '#' },
    { label: 'Turkish posts', href: '#' },
  ];
  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64,
                      alignItems: 'start' }}>
          <div>
            <Eyebrow>Archive</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>
              Browse everything.
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
              <a key={it.label} href={it.href}
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
                Get new writing as it goes out.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.5, color: '#262627',
                          margin: '24px 0 0', maxWidth: 400 }}>
                I publish irregularly — usually when there's something
                genuinely worth saying about AI in economic and legal
                research. Two ways to keep up:
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
              appearances, and panel discussions each year, particularly on
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
  return (
    <>
      <Nav active="Blog" />
      <main>
        <BlogHero />
        <TopicChips />
        <FeaturedSlot />
        <RecentPosts />
        <Archive />
        <Subscribe />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

export default BlogApp;

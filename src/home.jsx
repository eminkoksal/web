/* Home page — brand-correct content. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';
import { POSTS, formatDate, trimWords } from './posts.js';

const { useState, useEffect } = React;

const HOME_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "editorial",
  "showOrbitalArc": true,
  "ghostWord": "Rigor",
  "showPillars": true
} /*EDITMODE-END*/;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PILLARS = [
{
  title: 'Academic Economics & Teaching',
  body:
  'The foundation. Associate Professor of Economics, with 50+ publications, ' +
  'a co-edited Routledge volume, and an editorship at Competition and Regulation in ' +
  'Network Industries (SAGE). I’ve taught graduate courses every year since 2002, ' +
  'and still do.',
  cta: 'Read more',
  href: 'about.html#academic'
},
{
  title: 'AI Strategy & Workflow Design',
  body:
  'I build AI workflows for competition and regulation teams at international law ' +
  'firms: playbooks, complex prompts, MCP-based research infrastructure. Then I train ' +
  'the people who use them. Everything I teach, I’ve run on real work first.',
  cta: 'Read more',
  href: 'about.html#ai-strategy'
},
{
  title: 'AI-Native Research',
  body:
  'My current research program uses AI to read legal texts at a scale no person could. ' +
  'The first paper analyzed 3,369 Turkish Competition Board decisions as a single dataset. ' +
  'The second maps the 18,513 citations connecting all 9,995 published decisions.',
  cta: 'Explore the research',
  href: 'research.html'
},
{
  title: 'Public Thought Leadership',
  body:
  'Essays and talks on AI, competition, and regulation, for academic and professional ' +
  'audiences alike.',
  cta: 'Read the blog',
  href: 'blog.html'
}];


const FEATURED = [
{
  eyebrow: 'Routledge volume · 2024',
  title: 'The Economics and Regulation of Digitalisation: The Case of Türkiye',
  body:
  'A co-edited volume on Türkiye\u2019s digital transformation, with M. Eroğlu and ' +
  'M. Finger. My own chapter, written with O. Bakış, builds the Türkiye Digital ' +
  'Society Index.',
  meta: 'Routledge, 2024',
  cta: 'Read more',
  href: 'research.html'
},
{
  eyebrow: 'AI-Native Research · Published',
  title: 'A Quarter-Century Analysis of the Turkish Competition Board\u2019s Decisions',
  body:
  'With C. Peker and M. Üyer, I analyzed all 3,369 decisions the Board published over ' +
  'twenty-five years. Nobody had treated the full record as one dataset before; the ' +
  'patterns across industries and time only show up when you do.',
  meta: 'SSRN, 2025',
  cta: 'Read the paper',
  href: 'research.html'
},
{
  eyebrow: 'AI-Native Research · Published',
  title: 'The Intellectual DNA of the Turkish Competition Board',
  body:
  'With C. Peker and M. Üyer, we mapped the 18,513 citations connecting all 9,995 ' +
  'published decisions of the Board: which decisions everything else leans on, and ' +
  'where the doctrine quietly shifts.',
  meta: 'SSRN, 2026',
  cta: 'Read the paper',
  href: 'research.html'
}];


const STATS = [
{ value: '20+', label: 'years in competition economics' },
{ value: '50+', label: 'publications' },
{ value: '1000s', label: 'legal documents analyzed with AI' },
{ value: '11+', label: 'graduate courses taught' }];


/* ------------------------------------------------------------------ */
/*  Hero variants                                                      */
/* ------------------------------------------------------------------ */

function HeroEditorial({ t }) {
  return (
    <section style={{ position: 'relative', padding: '80px 0 120px' }}>
      <div className="container" style={{ position: 'relative' }}>
        {/* Ghost watermark */}
        <div style={{ position: 'absolute', left: -10, top: -30, zIndex: 0 }}>
          <GhostHeadline>{t.ghostWord}</GhostHeadline>
        </div>

        {t.showOrbitalArc &&
        <OrbitalArc
          d="M 40 480 Q 320 80 720 260 Q 1020 380 1240 120"
          viewBox="0 0 1280 600"
          stroke="#F37338" strokeWidth={1.4}
          style={{ height: 600, top: 80 }} />
        }

        <div style={{
          display: 'grid', gridTemplateColumns: '1.45fr 1fr',
          gap: 64, alignItems: 'center',
          position: 'relative', zIndex: 1, paddingTop: 80
        }}>
          <div>
            <Eyebrow>Economist · Associate Professor · AI Consultant</Eyebrow>
            <h1 className="display" style={{ margin: '28px 0 28px' }}>
              Emin Köksal
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px, 2.2vw, 32px)',
              fontWeight: 500, letterSpacing: '-.022em',
              lineHeight: 1.18, color: '#141413',
              margin: '0 0 32px', maxWidth: 620
            }}>Where economic rigor meets AI fluency

            </p>
            <p style={{
              fontSize: 18, lineHeight: 1.55, color: '#262627',
              maxWidth: 560, margin: '0 0 40px'
            }}>
              I&rsquo;ve spent twenty years in competition economics, as a professor, a
              journal editor, and a consultant to law firms. A few years ago I started
              using AI tools in my own research, mostly to save time. They changed the
              work instead. Today I design AI workflows for competition and regulation
              teams at international law firms, train practitioners on legal AI
              platforms, and publish research that uses AI to read a quarter-century of
              regulatory decisions at once.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Button variant="primary" href="research.html">
                View Research <IconArrow size={14} dir="up-right" />
              </Button>
              <Button variant="ghost" href="cv.html">
                Read the CV
              </Button>
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Portrait size={460} src="assets/portrait.jpg" />
              <SatelliteCTA size={68} anchor={{ right: -10, bottom: 40 }}
              href="about.html" label="Read about Emin" />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function HeroStadium({ t }) {
  return (
    <section style={{ position: 'relative', padding: '60px 0 100px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          paddingTop: 60, paddingBottom: 32
        }}>
          <Eyebrow>Economist · Associate Professor · AI Consultant</Eyebrow>
          <span style={{ fontSize: 14, color: '#555' }}>
            Türkiye
          </span>
        </div>

        <div style={{
          position: 'relative',
          borderRadius: 40,
          background: 'linear-gradient(180deg, #E8E2DA 0%, #D8D0C6 100%)',
          overflow: 'hidden',
          height: 'clamp(420px, 56vw, 680px)'
        }}>

          <div style={{
            position: 'absolute', left: '50%', top: '52%',
            transform: 'translate(-50%, -50%)'
          }}>
            <div style={{ position: 'relative' }}>
              <Portrait size={420} src="assets/portrait.jpg" />
              <SatelliteCTA size={68} anchor={{ right: -8, bottom: 40 }}
              href="about.html" label="Read about Emin" />
            </div>
          </div>

          <div style={{ position: 'absolute', left: 28, top: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#FFFFFF', color: '#141413',
              padding: '8px 16px', borderRadius: 999,
              fontSize: 13, fontWeight: 500, letterSpacing: '-.02em'
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F37338' }} />
              Available for consulting · 2026
            </span>
          </div>

          <div style={{
            position: 'absolute', left: 32, bottom: 28, right: 32,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            color: '#141413'
          }}>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500,
              letterSpacing: '-.02em', lineHeight: 1.2, maxWidth: 460
            }}>
              Where economic rigor meets AI fluency
            </div>
            <div style={{ fontSize: 13, opacity: .7 }}>01 / Emin Köksal</div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48,
          alignItems: 'end', paddingTop: 56
        }}>
          <h1 className="display" style={{ margin: 0 }}>
            Emin Köksal
          </h1>
          <div>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: '#262627',
              margin: '0 0 24px', maxWidth: 420
            }}>
              I&rsquo;ve spent twenty years in competition economics, as a professor, a
              journal editor, and a consultant to law firms. A few years ago I started
              using AI tools in my own research, mostly to save time. They changed the
              work instead. Today I design AI workflows for competition and regulation
              teams at international law firms, train practitioners on legal AI
              platforms, and publish research that uses AI to read a quarter-century of
              regulatory decisions at once.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" href="research.html">
                View Research <IconArrow size={14} dir="up-right" />
              </Button>
              <Button variant="ghost" href="cv.html">
                Read the CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function HeroTypographic({ t }) {
  return (
    <section style={{ position: 'relative', padding: '80px 0 100px' }}>
      <div className="container" style={{ position: 'relative' }}>
        {t.showOrbitalArc &&
        <>
            <OrbitalArc
            d="M -40 80 Q 280 320 720 180 Q 1080 60 1320 360"
            viewBox="0 0 1280 500"
            stroke="#F37338" strokeWidth={1.3}
            style={{ height: 500, top: 220 }} />
            <OrbitalArc
            d="M 1280 0 Q 980 200 760 120 Q 540 60 320 280"
            viewBox="0 0 1280 400"
            stroke="#CF4500" strokeWidth={1.2}
            style={{ height: 400, top: 80, opacity: .5 }} />
          </>
        }

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 80, position: 'relative', zIndex: 2
        }}>
          <Eyebrow>Economist · Associate Professor · AI Consultant</Eyebrow>
          <span style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '.04em',
            textTransform: 'uppercase', color: '#555'
          }}>
            Türkiye → Worldwide
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 48 }}>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(56px, 11vw, 184px)',
            fontWeight: 500, lineHeight: .9,
            letterSpacing: '-0.035em',
            color: '#141413', margin: 0, textWrap: 'balance'
          }}>
            <div>Emin</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
              <span>Köksal.</span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Portrait size={140} src="assets/portrait.jpg" />
              </span>
            </div>
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(24px, 3vw, 40px)',
            fontWeight: 500, letterSpacing: '-.022em',
            lineHeight: 1.18, color: '#141413',
            margin: '40px 0 0', maxWidth: 820
          }}>
            Where economic rigor meets AI fluency
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 40,
            paddingTop: 64, alignItems: 'start'
          }}>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: '#262627',
              margin: 0, maxWidth: 420
            }}>
              I&rsquo;ve spent twenty years in competition economics, as a professor, a
              journal editor, and a consultant to law firms. A few years ago I started
              using AI tools in my own research, mostly to save time. They changed the
              work instead. Today I design AI workflows for competition and regulation
              teams at international law firms, train practitioners on legal AI
              platforms, and publish research that uses AI to read a quarter-century of
              regulatory decisions at once.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <Button variant="primary" href="research.html">
                View Research <IconArrow size={14} dir="up-right" />
              </Button>
              <Button variant="ghost" href="cv.html">
                Read the CV
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Stat label="Years in practice" value="20+" />
              <Stat label="Publications" value="50+" />
              <Stat label="Legal documents analyzed" value="1000s" />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Small primitives                                                   */
/* ------------------------------------------------------------------ */

function Stat({ label, value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      borderTop: '1px solid rgba(20,20,19,.15)', paddingTop: 14
    }}>
      <span style={{ fontSize: 14, color: '#555' }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 500, letterSpacing: '-.02em'
      }}>
        {value}
      </span>
    </div>);

}

/* ------------------------------------------------------------------ */
/*  Section: Four Pillars                                              */
/* ------------------------------------------------------------------ */

function FourPillars() {
  return (
    <section style={{ position: 'relative', padding: '128px 0 96px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 880, marginBottom: 80 }}>
          <Eyebrow>What I do</Eyebrow>
          <h2 className="display--mid" style={{ margin: '20px 0 28px' }}>
            Four areas of work that feed each other
          </h2>
          <p style={{
            fontSize: 19, lineHeight: 1.55, color: '#262627',
            margin: 0, maxWidth: 720
          }}>
            Everything here draws on the same foundation: twenty years of
            competition economics, and daily hands-on use of the most capable
            AI tools available. The mix looks unusual on paper. In practice,
            each part makes the others better.
          </p>
        </div>

        <OrbitalArc
          d="M 40 380 Q 320 60 700 240 Q 1040 400 1260 100"
          viewBox="0 0 1280 480"
          stroke="#F37338" strokeWidth={1.3}
          style={{ height: 480, top: 240, opacity: .8 }} />

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          rowGap: 64, columnGap: 56
        }}>
          {PILLARS.map((p, i) =>
          <PillarCard key={p.title} index={i + 1} {...p} />
          )}
        </div>
      </div>
    </section>);

}

function PillarCard({ index, title, body, cta, href }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      padding: '36px 0 28px',
      borderTop: '1.5px solid #141413',
      textDecoration: 'none', color: 'inherit',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
          letterSpacing: '.04em', textTransform: 'uppercase', color: '#555'
        }}>
          {String(index).padStart(2, '0')}
        </span>
        <span style={{
          width: 44, height: 44, borderRadius: '50%',
          background: hover ? '#141413' : '#FFFFFF',
          color: hover ? '#FFFFFF' : '#141413',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 180ms cubic-bezier(0.4,0,0.2,1), color 180ms',
          boxShadow: '0 8px 18px rgba(0,0,0,.06)'
        }}>
          <IconArrow size={15} dir="up-right" />
        </span>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontSize: 'clamp(26px, 2.4vw, 36px)',
        fontWeight: 500, letterSpacing: '-.022em', lineHeight: 1.1,
        margin: 0, maxWidth: 520
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 16, lineHeight: 1.55, color: '#262627',
        margin: 0, maxWidth: 520
      }}>
        {body}
      </p>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
        letterSpacing: '-.02em', color: '#141413',
        display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 4
      }}>
        {cta} <IconArrow size={13} />
      </span>
    </a>);

}

/* ------------------------------------------------------------------ */
/*  Section: Featured Work                                             */
/* ------------------------------------------------------------------ */

function FeaturedWork() {
  return (
    <section style={{ padding: '96px 0 64px' }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, marginBottom: 56
        }}>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Featured work</Eyebrow>
            <h2 className="display--mid" style={{ margin: '20px 0 0' }}>
              What I&rsquo;m working on now
            </h2>
          </div>
          <Button variant="ghost" href="research.html">
            See all research <IconArrow size={14} dir="up-right" />
          </Button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24
        }}>
          {FEATURED.map((f) =>
          <FeaturedCard key={f.title} {...f} />
          )}
        </div>
      </div>
    </section>);

}

function FeaturedCard({ eyebrow, title, body, meta, cta, href }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      display: 'flex', flexDirection: 'column',
      borderRadius: 40,
      padding: 36, gap: 20,
      minHeight: 420,
      textDecoration: 'none', color: '#141413',
      transition: 'background 180ms cubic-bezier(0.4,0,0.2,1)',
      background: hover ? '#FFFFFF' : '#FCFBFA'
    }}>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
        letterSpacing: '.04em', textTransform: 'uppercase', color: '#9A3A0A'
      }}>
        {eyebrow}
      </span>
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 500,
        letterSpacing: '-.022em', lineHeight: 1.2, margin: 0
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 15, lineHeight: 1.55, color: '#555', margin: 0, flex: 1
      }}>
        {body}
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 8, borderTop: '1px solid rgba(20,20,19,.12)'
      }}>
        <span style={{ fontSize: 13, color: '#555', fontStyle: 'italic' }}>{meta}</span>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
          letterSpacing: '-.02em',
          display: 'inline-flex', alignItems: 'center', gap: 6
        }}>
          {cta} <IconArrow size={12} />
        </span>
      </div>
    </a>);

}

/* ------------------------------------------------------------------ */
/*  Section: Numbers                                                   */
/* ------------------------------------------------------------------ */

function Numbers() {
  return (
    <section style={{ padding: '96px 0' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          borderTop: '1.5px solid #141413',
          borderBottom: '1.5px solid #141413',
          padding: '56px 0'
        }}>
          {STATS.map((s, i) =>
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: 18,
            paddingLeft: i === 0 ? 0 : 32,
            borderLeft: i === 0 ? 'none' : '1px solid rgba(20,20,19,.15)'
          }}>
              <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(56px, 6vw, 96px)',
              fontWeight: 500, letterSpacing: '-.03em',
              lineHeight: 1, color: '#141413'
            }}>
                {s.value}
              </span>
              <span style={{
              fontSize: 15, lineHeight: 1.4, color: '#555',
              maxWidth: 220
            }}>
                {s.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Section: Recent Writing                                            */
/* ------------------------------------------------------------------ */

function RecentWriting() {
  const recent = POSTS.slice(0, 3);

  return (
    <section style={{ padding: '64px 0 128px' }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, marginBottom: 56
        }}>
          <div>
            <Eyebrow>From the blog</Eyebrow>
            <h2 className="display--mid" style={{ margin: '20px 0 0' }}>
              Recent writing
            </h2>
          </div>
          <Button variant="ghost" href="blog.html">
            Read all writing <IconArrow size={14} dir="up-right" />
          </Button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {recent.map((p, i) =>
          <li key={p.slug} style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr auto',
            gap: 32, alignItems: 'baseline',
            padding: '32px 0',
            borderTop: '1px solid rgba(20,20,19,.12)',
            borderBottom: i === recent.length - 1 ? '1px solid rgba(20,20,19,.12)' : 'none'
          }}>
            <span style={{ fontSize: 14, color: '#555' }}>{formatDate(p.date)}</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 500,
                letterSpacing: '-.02em', lineHeight: 1.25, margin: 0
              }}>
                <a href={`blog/${p.slug}.html`}
                style={{ color: '#141413', textDecoration: 'none' }}>
                  {p.title}
                </a>
              </div>
              <div style={{ fontSize: 15, color: '#555', marginTop: 8, maxWidth: 640 }}>
                {trimWords(p.excerpt, 22)}
              </div>
            </div>
            <a href={`blog/${p.slug}.html`} aria-label={p.title} style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(20,20,19,.5)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: '#141413', textDecoration: 'none'
            }}>
              <IconArrow size={14} dir="up-right" />
            </a>
          </li>
          )}
        </ul>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Section: Closing CTA                                               */
/* ------------------------------------------------------------------ */

function ClosingCTA() {
  return (
    <section style={{
      background: '#FCFBFA', padding: '128px 0',
      borderTop: '1px solid rgba(20,20,19,.08)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 64, alignItems: 'end'
        }}>
          <h2 className="display--mid" style={{ margin: 0, maxWidth: 760 }}>
            Working on something where economics, regulation, and AI meet?
          </h2>
          <div>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: '#262627',
              margin: '0 0 28px', maxWidth: 460
            }}>
              Most of my work is with competition and regulation teams at international
              law firms and consultancies, alongside academic collaborations and my own
              research. If what you&rsquo;re doing overlaps with any of that, send me a
              note and tell me about it.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" href="contact.html">
                Get in touch <IconArrow size={14} dir="up-right" />
              </Button>
              <Button variant="ghost"
              href="https://www.linkedin.com/in/eminkoksal/"
              target="_blank">
                Connect on LinkedIn <IconArrow size={14} dir="up-right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Tweaks panel                                                       */
/* ------------------------------------------------------------------ */

function HomeTweaksPanel({ open, onClose, t, setT }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', right: 24, bottom: 24, zIndex: 100,
      width: 320, background: '#FCFBFA', color: '#141413',
      borderRadius: 20, boxShadow: '0 24px 48px rgba(0,0,0,.18)',
      border: '1px solid rgba(20,20,19,.1)',
      padding: 22, fontFamily: 'var(--font-sans)'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18
      }}>
        <strong style={{ fontSize: 14, letterSpacing: '.04em', textTransform: 'uppercase' }}>
          Tweaks
        </strong>
        <button onClick={onClose} style={{
          width: 28, height: 28, borderRadius: '50%', border: 0,
          background: '#141413', color: '#FFFFFF', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>×</button>
      </div>

      <Field label="Hero variant">
        <Segmented value={t.heroVariant} onChange={(v) => setT({ heroVariant: v })}
        options={[
        { value: 'editorial', label: 'Editorial' },
        { value: 'stadium', label: 'Stadium' },
        { value: 'typographic', label: 'Type' }]
        } />
      </Field>

      <Field label="Ghost word">
        <input
          value={t.ghostWord}
          onChange={(e) => setT({ ghostWord: e.target.value })}
          style={{
            width: '100%', padding: '10px 12px', borderRadius: 12,
            border: '1px solid rgba(20,20,19,.15)', fontFamily: 'inherit',
            fontSize: 14, background: '#FFFFFF', color: '#141413'
          }} />
      </Field>

      <Field label="Orbital arc">
        <Toggle value={t.showOrbitalArc} onChange={(v) => setT({ showOrbitalArc: v })} />
      </Field>

      <Field label="Show Four Pillars section">
        <Toggle value={t.showPillars} onChange={(v) => setT({ showPillars: v })} />
      </Field>
    </div>);

}

function Field({ label, children }) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '.04em',
        textTransform: 'uppercase', color: '#555', marginBottom: 8
      }}>
        {label}
      </div>
      {children}
    </label>);

}
function Segmented({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', background: '#F3F0EE', borderRadius: 999, padding: 3 }}>
      {options.map((o) =>
      <button key={o.value} onClick={() => onChange(o.value)}
      style={{
        flex: 1, padding: '8px 0', borderRadius: 999, border: 0,
        background: value === o.value ? '#141413' : 'transparent',
        color: value === o.value ? '#F3F0EE' : '#141413',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
        cursor: 'pointer'
      }}>{o.label}</button>
      )}
    </div>);

}
function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: 44, height: 26, borderRadius: 999,
      background: value ? '#141413' : 'rgba(20,20,19,.2)',
      border: 0, padding: 0, cursor: 'pointer', position: 'relative',
      transition: 'background 180ms'
    }}>
      <span style={{
        position: 'absolute', top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#FFFFFF',
        transition: 'left 180ms cubic-bezier(0.4,0,0.2,1)'
      }} />
    </button>);

}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function HomeApp() {
  const t = HOME_TWEAK_DEFAULTS;
  return (
    <>
      <Nav active="Home" />
      <main>
        <HeroEditorial t={t} />
        {t.showPillars && <FourPillars />}
        <FeaturedWork />
        <Numbers />
        <RecentWriting />
        <ClosingCTA />
      </main>
      <Footer />
    </>);

}

export default HomeApp;
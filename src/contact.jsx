/* Contact page — short by design. Email + LinkedIn + Web only. No form. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';

const { useEffect: useContactEffect, useRef: useContactRef,
  useState: useContactState } = React;

/* Obfuscated email — assembled at runtime to reduce scraper exposure. */
const MAIL_USER = 'mail';
const MAIL_HOST = 'eminkoksal.com';

function useObfuscatedEmail() {
  /* Returns [text, href]; assembled in an effect so the literal string
     "mail@eminkoksal.com" never appears in the static HTML source. */
  const [pair, setPair] = useContactState(['mail [at] eminkoksal.com', '#']);
  useContactEffect(() => {
    const txt = MAIL_USER + '\u0040' + MAIL_HOST;
    setPair([txt, 'mailto:' + txt]);
  }, []);
  return pair;
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function ContactHero() {
  return (
    <section style={{ position: 'relative', padding: '120px 0 48px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: -20, top: 60, zIndex: 0 }}>
          <GhostHeadline>Contact</GhostHeadline>
        </div>
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 64,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
          gap: 64, alignItems: 'end' }}>
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="display" style={{ margin: '28px 0 0' }}>
              Get in touch
            </h1>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#262627',
            margin: 0 }}>
            Email is the most reliable way to reach me. If you're working on
            a competition or regulation matter where AI could change the
            workflow, building AI infrastructure for a research or consulting
            team, writing about AI in legal practice, or putting together a
            course, panel, or talk — tell me about it.
          </p>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Channels                                                           */
/* ------------------------------------------------------------------ */

function ChannelCard({ label, value, helper, href, target, primary }) {
  const [hover, setHover] = useContactState(false);
  const bg = primary ? '#141413' : '#FCFBFA';
  const fg = primary ? '#F3F0EE' : '#141413';
  const mutedFg = primary ? 'rgba(243,240,238,.72)' : '#555';
  return (
    <a href={href} target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      position: 'relative',
      background: bg, color: fg,
      borderRadius: 40,
      border: primary ? '1.5px solid #141413' : '1px solid rgba(20,20,19,.12)',
      padding: primary ? '40px 36px 36px' : '36px 32px 32px',
      minHeight: primary ? 320 : 280,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      gap: 24,
      textDecoration: 'none',
      transition: 'background 180ms cubic-bezier(0.4,0,0.2,1), transform 180ms'
    }}>
      <div>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          color: primary ? '#F3F0EE' : '#141413',
          display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%',
            background: '#F37338', flexShrink: 0 }} />
          {label}
          {primary &&
          <span style={{
            marginLeft: 8, padding: '4px 10px', borderRadius: 999,
            background: '#F37338', color: '#141413',
            fontSize: 11, letterSpacing: '0.08em'
          }}>
              Primary
            </span>
          }
        </span>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: primary ? 'clamp(26px, 2.6vw, 36px)' : 22,
          fontWeight: 500, letterSpacing: '-0.02em',
          lineHeight: 1.15,
          margin: '24px 0 16px',
          wordBreak: 'break-word'
        }}>
          {value}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: mutedFg, margin: 0,
          maxWidth: 420 }}>
          {helper}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12,
        color: primary ? '#F3F0EE' : '#141413',
        fontFamily: 'var(--font-sans)',
        fontSize: 14, fontWeight: 500, letterSpacing: '-.02em' }}>
        <span style={{
          width: primary ? 52 : 44, height: primary ? 52 : 44,
          borderRadius: '50%',
          background: primary ? '#FCFBFA' : '#141413',
          color: primary ? '#141413' : '#F3F0EE',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transform: hover ? 'translateX(2px)' : 'none',
          transition: 'transform 180ms cubic-bezier(0.4,0,0.2,1)'
        }}>
          <IconArrow size={primary ? 16 : 14} dir={target === '_blank' ? 'up-right' : 'right'} />
        </span>
        <span>
          {target === '_blank' ? 'Open profile' :
          href && href.startsWith('mailto:') ? 'Open mail client' : 'Open'}
        </span>
      </div>
    </a>);

}

function ContactChannels() {
  const [emailText, emailHref] = useObfuscatedEmail();
  return (
    <section className="section" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr 1fr',
          gap: 24, alignItems: 'stretch'
        }}>
          <ChannelCard
            primary
            label="Email"
            value={emailText}
            helper="The best way to start a conversation. I usually reply within a few business days."
            href={emailHref} />
          
          <ChannelCard
            label="LinkedIn"
            value="linkedin.com/in/eminkoksal"
            helper="Where most of my short-form writing goes first, and the wider professional context."
            href="https://www.linkedin.com/in/eminkoksal"
            target="_blank" />
          
          <ChannelCard
            label="Web"
            value="eminkoksal.com"
            helper={"Where you are now. Bookmark /research for project updates and /blog for new writing."}
            href="index.html" />
          
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  What I'm Open To                                                   */
/* ------------------------------------------------------------------ */

const OPEN_TO = {
  practice: [
  'AI workflow audits and playbook design for competition / regulation teams',
  'Practitioner training on legal AI platforms',
  'Complex prompt, agent, and MCP design for analytical work',
  'Expert economic testimony in competition and regulatory matters',
  'Strategic AI adoption advisory for senior leadership'],

  research: [
  'Co-authored papers on AI methods for legal or regulatory text analysis',
  'Citation network and case law mapping collaborations',
  'Conference invitations, panels, and keynote talks',
  'Doctoral committee membership and external thesis examination',
  'Editorial work, peer review, and special issue invitations']

};

function OpenToColumn({ heading, items }) {
  return (
    <div>
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em',
        lineHeight: 1.2, margin: '0 0 24px'
      }}>{heading}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((it, i) =>
        <li key={i} style={{
          padding: '20px 0',
          borderTop: '1px solid rgba(20,20,19,.14)',
          borderBottom: i === items.length - 1 ? '1px solid rgba(20,20,19,.14)' : 'none',
          display: 'grid', gridTemplateColumns: '20px 1fr', gap: 16,
          alignItems: 'start',
          fontSize: 16, lineHeight: 1.45, color: '#141413'
        }}>
            <span style={{
            display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center',
            width: 18, height: 18, borderRadius: '50%',
            background: '#F37338', color: '#141413',
            marginTop: 3
          }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>{it}</span>
          </li>
        )}
      </ul>
    </div>);

}

function OpenTo() {
  return (
    <section className="section" style={{ paddingTop: 16, paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 64, alignItems: 'start', marginBottom: 56 }}>
          <div>
            <Eyebrow>What I'm open to</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>
              Good fits
            </h2>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#262627',
            margin: 0, maxWidth: 640 }}>
            If your inquiry looks like one of these, we'll probably have
            something to talk about.
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64
        }}>
          <OpenToColumn heading="Consulting & Practice" items={OPEN_TO.practice} />
          <OpenToColumn heading="Research & Academic" items={OPEN_TO.research} />
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Speaking & Media                                                   */
/* ------------------------------------------------------------------ */

function SpeakingMedia() {
  return (
    <section className="section" style={{ paddingTop: 16, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          background: '#FCFBFA', borderRadius: 40, padding: '64px 56px',
          display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          gap: 64, alignItems: 'start'
        }}>
          <div>
            <Eyebrow>Speaking & media</Eyebrow>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em',
              margin: '24px 0 0', maxWidth: 480
            }}>
              For interview, podcast, panel, or keynote inquiries
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#262627',
            margin: 0, maxWidth: 620 }}>
            I speak in both English and Turkish. The topics where I'm most
            useful: AI in legal and economic practice, AI-native research
            methods for regulatory corpora, citation network analysis,
            competition policy in digital markets, and the economics of
            digitalization. For media or programming inquiries, a one-line
            description of the format, date window, and audience is all I
            need to give you a quick answer.
          </p>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Location                                                           */
/* ------------------------------------------------------------------ */

function Location() {
  return (
    <section className="section" style={{ paddingTop: 16, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 64, alignItems: 'center',
          padding: '64px 0',
          borderTop: '1px solid rgba(20,20,19,.12)',
          borderBottom: '1px solid rgba(20,20,19,.12)'
        }}>
          <div>
            <Eyebrow>Location</Eyebrow>
            <h2 className="display--mid" style={{ margin: '24px 0 0' }}>Based in Türkiye

            </h2>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#262627',
            margin: 0, maxWidth: 620 }}>
            Available for remote collaboration worldwide; able to travel
            within Europe for selected engagements.
          </p>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Confidentiality note                                               */
/* ------------------------------------------------------------------ */

function Confidentiality() {
  return (
    <section className="section" style={{ paddingTop: 16, paddingBottom: 120 }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64,
          alignItems: 'start'
        }}>
          <Eyebrow>A note on confidentiality</Eyebrow>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(20px, 1.8vw, 26px)',
            fontWeight: 450, lineHeight: 1.35,
            letterSpacing: '-0.015em',
            color: '#141413', margin: 0, maxWidth: 760
          }}>
            All client-side work runs on confidentiality-grade legal AI
            platforms; non-confidential academic and writing work runs on
            general-purpose tools. If your inquiry involves sensitive
            material, say so in your first email and I'll route the
            conversation accordingly.
          </p>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Sticky mailto FAB                                                  */
/* ------------------------------------------------------------------ */

function StickyMailto() {
  const [, emailHref] = useObfuscatedEmail();
  const [hover, setHover] = useContactState(false);
  return (
    <a href={emailHref}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    aria-label="Email Emin Köksal"
    style={{
      position: 'fixed', right: 24, bottom: 24, zIndex: 60,
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '14px 22px 14px 18px',
      borderRadius: 999,
      background: hover ? '#1f1f1e' : '#141413',
      color: '#F3F0EE',
      fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
      letterSpacing: '-0.02em',
      boxShadow: '0 14px 32px rgba(0,0,0,.18)',
      textDecoration: 'none',
      transition: 'background 180ms cubic-bezier(0.4,0,0.2,1)'
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: '#F37338', color: '#141413',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      </span>
      Email me
    </a>);

}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function ContactApp() {
  return (
    <>
      <Nav active="Contact" />
      <main>
        <ContactHero />
        <ContactChannels />
        <OpenTo />
        <SpeakingMedia />
        <Location />
        <Confidentiality />
      </main>
      <Footer />
      <StickyMailto />
    </>);

}

export default ContactApp;
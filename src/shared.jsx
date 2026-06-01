/* Shared chrome — Monogram, Nav pill, Footer, primitives — used by every page */
import React from 'react';

const { useState, useEffect, useRef } = React;

/* ------- Icons ------- */
function IconArrow({ size = 16, dir = 'right' }) {
  const r = { right: 0, up: -45, 'up-right': -45, left: 180, down: 90 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
         style={{ transform: `rotate(${r}deg)` }}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}
function IconDownload({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}
function IconChevron({ dir = 'down', size = 14 }) {
  const r = { down: 0, up: 180, left: 90, right: -90 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         style={{ transform: `rotate(${r}deg)` }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

/* ------- Monogram — replaces Mastercard mark; "EK" inside a dual circle ------- */
function Monogram({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Emin Köksal"
         xmlns="http://www.w3.org/2000/svg">
      {/* Two overlapping discs — orange covers ~70% of black */}
      <circle cx="24" cy="32" r="22" fill="#141413" />
      <circle cx="37" cy="32" r="22" fill="#F37338" />
      <path d="M30.5 11 a22 22 0 0 1 0 42 a22 22 0 0 1 0 -42 Z" fill="#CF4500" />
      <text x="30.5" y="32" textAnchor="middle" dominantBaseline="central"
            fontFamily="'Sofia Sans', 'MarkForMC', Arial, sans-serif"
            fontSize="19" fontWeight="700"
            letterSpacing="-0.5" fill="#F3F0EE">EK</text>
    </svg>
  );
}

/* ------- Eyebrow ------- */
function Eyebrow({ children, color = '#141413', dotColor = '#F37338' }) {
  return (
    <span style={{
      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      color, display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      {children}
    </span>
  );
}

/* ------- Ghost watermark ------- */
function GhostHeadline() {
  /* Ghost watermark headlines removed site-wide. */
  return null;
}

/* ------- Button ------- */
function Button({ children, variant = 'primary', href, onClick, style, target, rel }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500,
    letterSpacing: '-0.03em', lineHeight: 1,
    padding: '14px 26px', borderRadius: 20,
    border: '1.5px solid #141413', cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 180ms cubic-bezier(0.4,0,0.2,1), color 180ms, border-color 180ms',
  };
  const variants = {
    primary:   { background: '#141413', color: '#F3F0EE' },
    secondary: { background: '#FCFBFA', color: '#141413', fontWeight: 450 },
    ghost:     { background: 'transparent', color: '#141413', fontWeight: 450 },
    inverse:   { background: '#FCFBFA', color: '#141413', border: '1.5px solid #FCFBFA' },
  };
  const [hover, setHover] = useState(false);
  const merged = { ...base, ...variants[variant], ...style };
  if (hover) {
    if (variant === 'primary')   { merged.background = '#1f1f1e'; merged.borderColor = '#1f1f1e'; }
    if (variant === 'secondary') { merged.background = '#F3F0EE'; }
    if (variant === 'ghost')     { merged.background = '#141413'; merged.color = '#F3F0EE'; }
    if (variant === 'inverse')   { merged.background = 'transparent'; merged.color = '#FCFBFA'; }
  }
  const Tag = href ? 'a' : 'button';
  const extraRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;
  return (
    <Tag href={href} onClick={onClick} style={merged}
         target={target} rel={extraRel}
         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
    </Tag>
  );
}

/* ------- Portrait circle ------- */
function Portrait({ size = 280, src, gradient, children, style }) {
  const bg = src ? `url(${src}) center 25%/cover` :
    gradient || 'radial-gradient(circle at 35% 35%, #F37338 0%, #CF4500 50%, #9A3A0A 100%)';
  return (
    <div style={{
      position: 'relative', width: size, height: size,
      borderRadius: '50%', background: bg, overflow: 'visible', ...style,
    }}>
      {children}
    </div>
  );
}

/* ------- Satellite CTA ------- */
function SatelliteCTA({ onClick, href, size = 60, anchor = { right: -6, bottom: 30 }, label }) {
  const [hover, setHover] = useState(false);
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} onClick={onClick}
         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         aria-label={label}
         style={{
           position: 'absolute', width: size, height: size,
           borderRadius: '50%',
           background: hover ? '#141413' : '#FFFFFF',
           color: hover ? '#FFFFFF' : '#141413',
           border: 0, cursor: 'pointer', textDecoration: 'none',
           display: 'flex', alignItems: 'center', justifyContent: 'center',
           boxShadow: '0 8px 18px rgba(0,0,0,.07)',
           transition: 'background 180ms cubic-bezier(0.4,0,0.2,1), color 180ms',
           ...anchor,
         }}>
      <IconArrow size={size * 0.34} dir="up-right" />
    </Tag>
  );
}

/* ------- Nav (floating white pill) ------- */
function Nav({ active = 'Home' }) {
  const links = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Research', href: 'research.html' },
    { label: 'CV', href: 'cv.html' },
    { label: 'Blog', href: 'blog.html' },
    { label: 'Contact', href: 'contact.html' },
  ];
  return (
    <div style={{
      position: 'sticky', top: 24, zIndex: 50,
      padding: '0 32px', display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        background: '#FFFFFF', borderRadius: 999,
        boxShadow: '0 4px 24px rgba(0,0,0,.06)',
        padding: '12px 14px 12px 22px',
        display: 'flex', alignItems: 'center', gap: 28,
        pointerEvents: 'auto', maxWidth: 1100, width: '100%',
      }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: '#141413' }}>
          <Monogram size={42} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Emin Köksal
          </span>
        </a>
        <nav style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          {links.map((l) => (
            <a key={l.label} href={l.href}
               style={{
                 fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
                 letterSpacing: '-0.02em', color: '#141413', textDecoration: 'none',
                 padding: '8px 4px', position: 'relative', lineHeight: 1,
               }}>
              {l.label}
              {active === l.label && (
                <span style={{
                  position: 'absolute', left: '50%', bottom: -3, transform: 'translateX(-50%)',
                  width: 5, height: 5, borderRadius: '50%', background: '#F37338',
                }} />
              )}
            </a>
          ))}
          <a href="contact.html" style={{
            marginLeft: 8,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
            letterSpacing: '-0.02em',
            padding: '10px 18px', borderRadius: 999,
            background: '#141413', color: '#F3F0EE', textDecoration: 'none',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            Get in touch <IconArrow size={13} dir="up-right" />
          </a>
        </nav>
      </div>
    </div>
  );
}

/* ------- Footer ------- */
function Footer() {
  const columns = [
    {
      title: 'Site',
      links: [
        { label: 'Home', href: 'index.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Research', href: 'research.html' },
        { label: 'CV', href: 'cv.html' },
        { label: 'Blog', href: 'blog.html' },
        { label: 'Contact', href: 'contact.html' },
      ],
    },
    {
      title: 'Research focus',
      links: [
        { label: 'Competition economics' },
        { label: 'Digital regulation' },
        { label: 'Public policy' },
        { label: 'Generative AI for analysis' },
      ],
    },
    {
      title: 'Elsewhere',
      links: [
        { label: 'LinkedIn', ext: true, href: '#' },
        { label: 'Twitter / X', ext: true, href: '#' },
        { label: 'Instagram', ext: true, href: '#' },
        { label: 'Google Scholar', ext: true, href: '#' },
        { label: 'SSRN', ext: true, href: '#' },
      ],
    },
    {
      title: 'Email',
      links: [
        { label: 'The most reliable way to reach me.' },
        { label: 'mail@eminkoksal.com', href: 'mailto:mail@eminkoksal.com' },
        { label: 'Replies within a few business days.' },
      ],
    },
  ];

  return (
    <footer style={{
      background: '#141413', color: '#FFFFFF',
      padding: '120px 32px 56px',
      position: 'relative', marginTop: 96,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Eyebrow color="rgba(255,255,255,.7)" dotColor="#F37338">Get in touch</Eyebrow>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(40px, 5.2vw, 76px)',
          fontWeight: 500, lineHeight: 1, letterSpacing: '-0.025em',
          color: '#FFFFFF', margin: '24px 0 0', maxWidth: 880,
        }}>
          Working at the seam of<br/>economics and machine intelligence.
        </h2>
        <div style={{
          marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap',
        }}>
          <Button variant="inverse" href="mailto:mail@eminkoksal.com">
            mail@eminkoksal.com <IconArrow size={14} dir="up-right" />
          </Button>
          <Button variant="ghost" href="cv.html" style={{ borderColor: 'rgba(255,255,255,.4)', color: '#FFFFFF' }}>
            Download CV <IconDownload size={14} />
          </Button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
          marginTop: 96,
        }}>
          {columns.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>

        <div style={{ marginTop: 96, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Monogram size={42} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 500, letterSpacing: '-.02em' }}>
            Emin Köksal
          </span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,.3)', margin: '32px 0 24px' }} />

        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 24,
        }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>
            <span>© 2026 Emin Köksal</span>
            <a href="#" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Imprint</a>
            <a href="#" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Colophon</a>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <SocialIcon kind="linkedin" />
            <SocialIcon kind="x" />
            <SocialIcon kind="instagram" />
            <SocialIcon kind="scholar" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 style={{
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,.6)', margin: '0 0 20px',
      }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map((l, i) => (
          <li key={i}>
            {l.href ? (
              <a href={l.href} style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 450,
                color: '#FFFFFF', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {l.label}
                {l.ext && <span style={{ fontSize: 11, opacity: .65 }}>↗</span>}
              </a>
            ) : (
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 450,
                color: 'rgba(255,255,255,.75)',
              }}>{l.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ kind }) {
  const paths = {
    linkedin:  'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    x:         'M4 4l16 16M20 4L4 20',
    instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01',
    scholar:   'M12 14l-9-5 9-5 9 5-9 5zm0 0v6m-5-3.5a5 5 0 0 0 10 0',
  };
  return (
    <a href="#" style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[kind]} />
      </svg>
    </a>
  );
}

/* ------- Orbital arc helper ------- */
function OrbitalArc() {
  /* Orbital arcs removed site-wide. */
  return null;
}

/* ES module exports — consumed by every page module */
export {
  IconArrow, IconSearch, IconDownload, IconChevron,
  Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA,
  Nav, Footer, OrbitalArc,
};

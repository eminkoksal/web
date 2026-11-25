/* Emin Style v1.2 — the pieces shared by the pages ported to v1.2 (home, research).
   Styles: public/assets/v2.css. */
import React from 'react';

const { useEffect } = React;

/* A [data-reveal] block gets the class v2-in when it scrolls into view; its
   [data-r] children fade up (staggered by --i), its .v2-draw rules draw, and
   its [data-count] figures count up. With reduced motion the CSS shows
   everything at once and the figures are left as rendered. The page template
   sets the "js" class on <html> before first paint; this hook tells it the
   bundle arrived (window.__ekMotion), otherwise the template shows everything. */
function useReveal() {
  useEffect(() => {
    window.__ekMotion = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const countUp = (el) => {
      const to = Number(el.getAttribute('data-count'));
      const comma = el.textContent.includes(',');
      const show = (v) => { el.textContent = comma ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)); };
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1500);
        show(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('v2-in');
        if (!reduce) e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('main [data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ArrowUpRight({ size = 13, width = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
    strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 10.5l7-7M5 3.5h5.5V9" />
    </svg>);
}

function ArrowRight({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" />
    </svg>);
}

/* Pill button. variant: undefined (ink) | 'ghost' | 'paper' and 'line' (both for ink surfaces). */
function Btn({ variant, href, external, children }) {
  return (
    <a className={'v2-btn' + (variant ? ' v2-btn--' + variant : '')} href={href}
    target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}
    </a>);
}

/* The page's one coral surface: the closing ask. children are the buttons. */
function CoralClose({ title, body, children }) {
  return (
    <section className="v2-close">
      <div className="container">
        <div className="v2-close__stone" data-reveal>
          <h2 className="v2-h2" data-r>{title}</h2>
          <div data-r style={{ '--i': 1 }}>
            <p>{body}</p>
            <div className="v2-close__cta">{children}</div>
          </div>
        </div>
      </div>
    </section>);
}

export { useReveal, ArrowUpRight, ArrowRight, Btn, CoralClose };

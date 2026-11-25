/* Home page — Emin Style v1.2 (2026-11-25).
   Copy lives in content/home.md; styles in public/assets/home.css (hm- classes).
   The reveal-on-scroll and count-up behaviour is wired once in useHomeMotion. */
import React from 'react';
import { Eyebrow, Nav, Footer } from './shared.jsx';
import { POSTS, formatDate, trimWords } from './posts.js';
import CitationNetwork from './citation-network.jsx';

const { useEffect } = React;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PILLARS = [
{
  title: 'Academic Economics & Teaching',
  body:
  'Where the rest comes from. I am an Associate Professor of Economics, with 50+ ' +
  'publications, a co-edited Routledge volume, and the Associate Editor-in-Chief role at ' +
  'Competition and Regulation in Network Industries (SAGE). I have taught every year ' +
  'since 2002, and still do.',
  href: 'about.html#academic'
},
{
  title: 'AI Strategy & Workflow Design',
  body:
  'I build AI workflows for competition and regulation teams at international law ' +
  'firms: playbooks, complex prompts, MCP-based research infrastructure. Then I train ' +
  'the people who use them. Everything I teach, I have run on a live matter first.',
  href: 'about.html#ai-strategy'
},
{
  title: 'AI-Native Research',
  body:
  'My current research program uses AI to read legal texts at a scale no person could. ' +
  'The first paper analyzed all 3,369 infringement decisions of the Turkish Competition ' +
  'Board as a single dataset. The second maps the 18,513 citations connecting all 9,995 ' +
  'of its published decisions.',
  href: 'research.html'
},
{
  title: 'Writing & Talks',
  body:
  'I have written for a general audience since 2013, mostly in Turkish, on competition ' +
  'cases, platform regulation, climate policy, and now AI. The whole archive is on this ' +
  'site. I also give talks, to academic and professional audiences alike.',
  href: 'blog.html'
}];

/* The 2026 citation paper is shown by the network band; the featured cards follow it. */
const NETWORK = {
  eyebrow: 'AI-Native Research · SSRN 2026',
  total: 18513,
  say:
  'citations connecting all 9,995 published decisions of the Turkish Competition ' +
  'Board, extracted by an AI model and mapped as one network',
  paper: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258',
  tag: 'Most cited decision',
  note:
  'Each dot is a decision, each line a citation, placed by decision date. Shown: the ' +
  'largest connected component, 5,359 decisions and 15,689 citations. Köksal, Peker, ' +
  'Üyer, SSRN 2026'
};

/* The first entry is the lead card (wide, with the coral figure); the rest stack beside it.
   The lead is work in progress: no link, and no pilot numbers until they are verified. */
const FEATURED = [
{
  eyebrow: 'AI-Native Research · In progress',
  figure: 10000,
  figureSuffix: '+',
  figureLabel: 'decisions published from 1997 to 2026',
  title:
  'How Predictable Is the Competition Board? A \u201CCrystal Ball\u201D Experiment with ' +
  'Thirty Years of Case Law and Artificial Intelligence',
  body:
  'Every firm that drafts a distribution agreement is guessing how the Turkish ' +
  'Competition Board would rule. With F. G. Bilgin and C. Karataş, we are turning that ' +
  'guess into an experiment. An AI model reads the Board\u2019s decisions up to a given ' +
  'year, is told only the facts of the next year\u2019s cases, and has to call the ' +
  'outcome. Its hit rate, year by year, measures how predictable the case law is. Each ' +
  'miss goes to the lawyers on the team, who check whether the Board changed course.',
  meta: 'Work in progress · first results expected in 2027'
},
{
  eyebrow: 'AI-Native Research · Published',
  title: 'A Quarter-Century Analysis of the Turkish Competition Board’s Decisions',
  body:
  'With C. Peker and M. Üyer, we analyzed all 3,369 infringement decisions the Board ' +
  'published over twenty-five years. Nobody had treated that record as one dataset before; the ' +
  'patterns across industries and time only show up when you do.',
  meta: 'SSRN, 2025',
  cta: 'Read the paper',
  href: 'https://ssrn.com/abstract=5731282',
  external: true
},
{
  eyebrow: 'Routledge volume · 2024',
  title: 'The Economics and Regulation of Digitalisation: The Case of Türkiye',
  body:
  'A co-edited volume on Türkiye’s digital transformation, with M. Eroğlu and ' +
  'M. Finger. My own chapter, written with O. Bakış, builds the Türkiye Digital ' +
  'Society Index.',
  meta: 'Routledge, 2024',
  cta: 'Read more',
  href: 'research.html'
}];

/* The coral figure is the one the AI work produced. */
const STATS = [
{ n: 20, suffix: '+', label: 'years in competition economics' },
{ n: 50, suffix: '+', label: 'publications' },
{ n: 1000, suffix: 's', label: 'legal documents analyzed with AI', hero: true },
{ n: 11, suffix: '+', label: 'courses taught' }];

/* ------------------------------------------------------------------ */
/*  Motion: reveal on scroll, count-up                                 */
/* ------------------------------------------------------------------ */

/* A [data-reveal] block gets the class hm-in when it scrolls into view; its
   [data-r] children fade up (staggered by --i), its .hm-draw rules draw, and
   its [data-count] figures count up. With reduced motion the CSS shows
   everything at once and the figures are left as rendered. */
function useHomeMotion() {
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
        e.target.classList.add('hm-in');
        if (!reduce) e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.hm [data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Small primitives                                                   */
/* ------------------------------------------------------------------ */

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

function Btn({ variant, href, external, children }) {
  return (
    <a className={'hm-btn' + (variant ? ' hm-btn--' + variant : '')} href={href}
    target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}
    </a>);
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hm-hero">
      <div className="container" data-reveal>
        <div data-r><Eyebrow>Economist · AI Consultant · Associate Professor</Eyebrow></div>
        <h1 className="hm-name" aria-label="Emin Köksal"><span>Emin&nbsp;</span><span>Köksal</span></h1>
        <div className="hm-hero__row">
          <div data-r style={{ '--i': 3 }}>
            <p className="hm-tagline">Where economic rigor meets AI fluency</p>
            <div className="hm-hero__cta">
              <Btn href="research.html">View Research <ArrowUpRight /></Btn>
              <Btn variant="ghost" href="cv.html">Read the CV</Btn>
            </div>
          </div>
          <p className="hm-hero__lede" data-r style={{ '--i': 4 }}>
            I have spent twenty years in competition economics, as an academic and,
            since 2015, as an economist working inside a law firm&rsquo;s competition
            team. I started using AI to save time on my own research. It ended up
            changing how I do the work. Today I design AI workflows for competition
            and regulation teams and train the lawyers and economists who use them.
            My latest paper had an AI model read all 9,995 published decisions of
            the Turkish Competition Board.
          </p>
          <div className="hm-portrait-wrap" data-r style={{ '--i': 5 }}>
            <img className="hm-portrait" src="assets/portrait.jpg" alt="Portrait of Emin Köksal" width="296" height="296" />
            <a className="hm-satellite" href="about.html" aria-label="Read about Emin"><ArrowUpRight size={18} width={1.4} /></a>
          </div>
        </div>
      </div>
    </section>);
}

function NetworkBand() {
  return (
    <CitationNetwork
      total={NETWORK.total}
      eyebrow={<Eyebrow color="#B9B6AB">{NETWORK.eyebrow}</Eyebrow>}
      tag={NETWORK.tag}
      note={NETWORK.note}>
      <p className="hm-net__say">{NETWORK.say}</p>
      <div className="hm-net__cta">
        <Btn variant="paper" href={NETWORK.paper} external>Read the paper <ArrowUpRight /></Btn>
        <Btn variant="line" href="research.html">Explore the research</Btn>
      </div>
    </CitationNetwork>);
}

function FourPillars() {
  return (
    <section className="hm-pillars">
      <div className="container">
        <div className="hm-pillars__head" data-reveal>
          <div data-r>
            <Eyebrow>What I do</Eyebrow>
            <h2 className="hm-h2">Four areas of work that feed each other</h2>
          </div>
          <p className="hm-prose" data-r style={{ '--i': 1 }}>
            On paper it is an odd pairing: twenty years of competition economics
            and daily use of the newest AI tools. In practice each feeds the other.
            The economics decides which question a workflow should answer, and the
            workflows let my research ask questions that were too large to ask by
            hand.
          </p>
        </div>
        <div className="hm-pillars__grid" data-reveal>
          {PILLARS.map((p, i) =>
          <a className="hm-pillar" href={p.href} key={p.title} data-r style={{ '--i': i }}>
            <span className="hm-rule hm-draw" style={{ '--i': i }} />
            <div className="hm-pillar__top">
              <h3>{p.title}</h3>
              <span className="hm-pillar__go"><ArrowUpRight size={15} width={1.4} /></span>
            </div>
            <p>{p.body}</p>
          </a>
          )}
        </div>
      </div>
    </section>);
}

function FeaturedCard({ lead, index, eyebrow, figure, figureSuffix, figureLabel, title, body, meta, cta, href, external }) {
  const Tag = href ? 'a' : 'div';
  const cls = 'hm-card ' + (lead ? 'hm-card--sunken' : 'hm-card--line hm-card--compact') + (href ? '' : ' hm-card--static');
  return (
    <Tag className={cls} href={href}
    target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
    data-r style={{ '--i': index }}>
      <span className="hm-mono">{eyebrow}</span>
      {figure &&
      <div className="hm-card__fig">
        <strong><span data-count={figure}>{figure.toLocaleString('en-US')}</span>{figureSuffix}</strong>
        <span>{figureLabel}</span>
      </div>
      }
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="hm-card__foot">
        <span className="hm-meta">{meta}</span>
        {cta && <span className="hm-arrow-link">{cta} <ArrowRight /></span>}
      </div>
    </Tag>);
}

function FeaturedWork() {
  const [lead, ...rest] = FEATURED;
  return (
    <section className="hm-work">
      <div className="container">
        <div className="hm-work__head" data-reveal>
          <div data-r>
            <Eyebrow>Featured work</Eyebrow>
            <h2 className="hm-h2">What I&rsquo;m working on now</h2>
          </div>
          <div data-r style={{ '--i': 1 }}>
            <Btn variant="ghost" href="research.html">See all research <ArrowUpRight /></Btn>
          </div>
        </div>
        <div className="hm-work__grid" data-reveal>
          <FeaturedCard {...lead} lead index={0} />
          <div className="hm-work__side">
            {rest.map((f, i) => <FeaturedCard key={f.title} {...f} index={i + 1} />)}
          </div>
        </div>
      </div>
    </section>);
}

function Numbers() {
  return (
    <section className="hm-stats">
      <div className="container">
        <div className="hm-stats__row" data-reveal>
          <span className="hm-rule hm-rule--t hm-draw" />
          {STATS.map((s, i) =>
          <div className={'hm-stat' + (s.hero ? ' hm-stat--hero' : '')} key={s.label} data-r style={{ '--i': i }}>
            <strong><span data-count={s.n}>{s.n}</span>{s.suffix}</strong>
            <span>{s.label}</span>
          </div>
          )}
          <span className="hm-rule hm-rule--b hm-draw" style={{ '--i': 2 }} />
        </div>
      </div>
    </section>);
}

function RecentWriting() {
  const recent = POSTS.slice(0, 3);
  return (
    <section className="hm-writing">
      <div className="container">
        <div className="hm-writing__head" data-reveal>
          <div data-r>
            <Eyebrow>From the blog</Eyebrow>
            <h2 className="hm-h2">Essays &amp; working notes</h2>
          </div>
          <div data-r style={{ '--i': 1 }}>
            <Btn variant="ghost" href="blog.html">Read all writing <ArrowUpRight /></Btn>
          </div>
        </div>
        <div data-reveal>
          {recent.map((p, i) =>
          <a className="hm-post" href={`blog/${p.slug}.html`} key={p.slug} lang={p.lang || undefined}
          data-r style={{ '--i': i }}>
            <span className="hm-post__date">
              {formatDate(p.date)}
              {p.lang && <span className="hm-tag">{p.lang.toUpperCase()}</span>}
            </span>
            <div>
              <h3>{p.title}</h3>
              <p>{trimWords(p.excerpt, 30)}</p>
            </div>
            <span className="hm-post__go"><ArrowUpRight size={14} width={1.4} /></span>
          </a>
          )}
        </div>
      </div>
    </section>);
}

function ClosingCTA() {
  return (
    <section className="hm-close">
      <div className="container">
        <div className="hm-close__stone" data-reveal>
          <h2 className="hm-h2" data-r>
            Working on something where economics, regulation, and AI meet?
          </h2>
          <div data-r style={{ '--i': 1 }}>
            <p>
              Most of my work is with competition and regulation teams at international
              law firms and consultancies, alongside academic collaborations and my own
              research. If what you are doing overlaps with any of that, send me a
              note about it.
            </p>
            <div className="hm-close__cta">
              <Btn href="contact.html">Get in touch <ArrowUpRight /></Btn>
              <Btn variant="ghost" href="https://www.linkedin.com/in/eminkoksal/" external>Connect on LinkedIn</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function HomeApp() {
  useHomeMotion();
  return (
    <>
      <Nav active="Home" />
      <main className="hm">
        <Hero />
        <NetworkBand />
        <FourPillars />
        <FeaturedWork />
        <Numbers />
        <RecentWriting />
        <ClosingCTA />
      </main>
      <Footer />
    </>);
}

export default HomeApp;

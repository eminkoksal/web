/* About page — Emin Style v1.2 (2026-11-25).
   Copy lives in content/about.md; styles in public/assets/v2.css (shared) and
   about.css (ab- classes). The career timeline is shared with the CV page (career-timeline.jsx). */
import React from 'react';
import { Eyebrow, Nav, Footer } from './shared.jsx';
import { useReveal, ArrowUpRight, Btn, CoralClose, StatRow } from './v2.jsx';
import CareerTimeline from './career-timeline.jsx';

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

/* The coral figure is the one the AI work produced. */
const ABOUT_STATS = [
{ n: 20, suffix: '+', label: 'years in competition economics' },
{ n: 50, suffix: '+', label: 'publications' },
{ n: 1000, suffix: 's', label: 'legal documents analyzed with AI', hero: true },
{ n: 11, suffix: '+', label: 'courses taught' }];

const EDUCATION = [
{ years: '2008', degree: 'PhD in Economics', place: 'Marmara University' },
{ years: '2004', degree: 'MA in Public Finance', place: 'Galatasaray University' },
{ years: '2001', degree: 'BA in Economics', place: 'Galatasaray University' }];

const ABOUT_PILLARS = [
{
  id: 'academic',
  title: 'Academic Economics & Teaching',
  intro:
  <>
    Where it all started. I have taught every year since 2002. When the subject is
    Becker&rsquo;s economics of crime, I open with <em>Ocean&rsquo;s Eleven</em>: the heist
    is a cost-benefit calculation, and students remember it long after the equation.
  </>,
  bullets: [
  {
    lead: 'Associate Professor of Economics',
    body:
    ', working on competition policy, platform economics, and digital regulation.'
  },
  {
    lead: '50+ publications',
    body:
    ' across peer-reviewed journals and book chapters in economics, competition, and regulation.'
  },
  {
    lead: 'Routledge co-editor',
    body:
    ', The Economics and Regulation of Digitalisation: The Case of T\u00fcrkiye (Routledge, 2024), ' +
    'with M. Ero\u011flu and M. Finger.'
  },
  {
    lead: 'Associate Editor-in-Chief',
    body:
    ', Competition and Regulation in Network Industries (SAGE Publishing), since 2018.'
  },
  {
    lead: 'University teaching',
    body:
    ' at Bah\u00e7e\u015fehir University and other institutions, from undergraduate to MBA and PhD: ' +
    'Generative AI for Economic Analysis, ' +
    'Managerial Economics, Platform Business and Economics, Industrial Organization, ' +
    'Innovation & Competition Policy in Digital Markets, Economics of Climate Change, Law & Economics.'
  }]

},
{
  id: 'ai-strategy',
  title: 'AI Strategy & Workflow Design (for Organizations)',
  intro:
  'I work with competition, regulation, and economic-analysis teams on the AI side of ' +
  'their daily work. The first question is always where the data goes. Public and ' +
  'academic material can run through general-purpose tools; client material runs only ' +
  'on a confidentiality-grade legal AI platform. I hold that line strictly.',
  subhead: 'What I deliver',
  bullets: [
  {
    lead: 'AI workflow and playbook design',
    body: ' for competition cases, regulatory dossiers, and economic analysis.'
  },
  {
    lead: 'Practitioner training on legal AI platforms',
    body:
    ': how to go beyond the chat box, and how to build playbooks the next matter can reuse.'
  },
  {
    lead: 'Complex prompt and agent design',
    body:
    ': task-specific prompts, multi-step research agents, reusable templates.'
  },
  {
    lead: 'MCP-based research infrastructure',
    body:
    ': custom Model Context Protocol setups for legal and academic research, run from ' +
    'inside the tools practitioners already use.'
  },
  {
    lead: 'Advice for partners and senior management',
    body:
    ': where AI earns its cost in a regulatory or economic practice, and where it does not.'
  }],

  pull: {
    label: 'Where the work happens',
    body:
    'Since 2015 I have worked inside the competition and regulation practice of a leading ' +
    'international law firm. The workflows I design run there first, on live matters. If a ' +
    'playbook does not survive contact with a real case, it does not get taught.'
  }
},
{
  id: 'research',
  title: 'AI-Native Research',
  intro:
  'What began as one paper has become a research program: using AI to ask competition-law ' +
  'and economics questions that were too large to ask before.',
  methodSig:
  'AI-powered analysis of legal corpora: regulatory text turned into economic evidence. ' +
  'Pairs large-scale legal-text analysis with citation networks and economic interpretation.',
  subhead: 'Flagship projects',
  projects: [
  {
    title: 'AI analysis of 3,369 Turkish Competition Board decisions',
    meta: 'Published, SSRN 2025 \u00b7 with C. Peker and M. Üyer',
    body:
    'A quarter-century of the Board\u2019s infringement decisions, treated as a single coherent dataset. ' +
    'Combines NLP and economic methods to find patterns no manual review could.'
  },
  {
    title:
    'The Intellectual DNA of the Turkish Competition Board',
    meta: 'Published, SSRN 2026 \u00b7 with C. Peker and M. Üyer',
    body:
    'Maps the 18,513 citations connecting all 9,995 published decisions: thirty years of case law, drawn as a network.'
  },
  {
    title: 'How Predictable Is the Competition Board?',
    meta: 'In progress, 2027 \u00b7 with F. G. Bilgin and C. Karataş',
    body:
    'An experiment: an AI model reads the Board\u2019s decisions up to a given year, is told only the ' +
    'facts of the next year\u2019s cases, and has to predict the outcome.'
  }],

  closing:
  'Treating the regulatory record as a structured, queryable corpus does more than save ' +
  'time: it changes which questions are worth asking. The literature is only ' +
  'beginning to use these methods seriously.',
  cta: { label: 'Explore the research', href: 'research.html' }
},
{
  /* No anchor required for pillar 4 per source. */
  id: null,
  title: 'Writing & Talks',
  intro:
  'I have written for a general audience since 2013, mostly in Turkish, on competition ' +
  'cases, platform regulation, climate policy, and now AI. The whole archive is on this ' +
  'site. I also give conference talks and the occasional podcast interview, in English ' +
  'and Turkish.',
  cta: { label: 'Read the writing', href: 'blog.html' }
}];


const AFFILIATIONS = [
{
  name: 'Istanbul Center for Regulation (IC4R)',
  role: 'Deputy Director',
  years: 'since 2019'
},
{
  name: 'Network-Industries.org',
  role: 'Member',
  years: 'since 2019'
},
{
  name: 'T\u00dcS\u0130AD (Turkish Industry & Business Association)',
  role:
  'Member of three working groups: Climate Change & Environment (since 2019), Information ' +
  'and Communication Technologies (since 2018), and E-commerce (since 2018)',
  years: ''
},
{
  name: 'US-Turkey Business Council',
  role: 'Member, Digital Economy Advisory Board',
  years: 'since 2017'
},
{
  name: 'International Atlantic Economic Society',
  role: 'Lifetime Member',
  years: 'since 2012'
}];


/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function AboutHero() {
  return (
    <section className="ab-hero">
      <div className="container">
        <div data-reveal>
          <div data-r><Eyebrow>About</Eyebrow></div>
          <h1 className="ab-display" data-r style={{ '--i': 1 }}>
            Twenty years an economist |<br />The last few rebuilding the work around AI
          </h1>
        </div>
        <div className="ab-hero__grid" data-reveal>
          <p className="ab-hero__lede" data-r>
            I am <strong>Emin Köksal</strong>, an economist and Associate Professor
            based in Türkiye. Competition and regulation have been my subject for
            twenty years: I teach them, publish on them, edit a journal about them,
            and since 2015 I have advised on them from inside a law firm. A few years
            ago I started rebuilding that work around AI. It began in my own research,
            where the tools saved me time, and spread to the teams I work with, where
            they now do real analytical work.
          </p>
          <div className="ab-portrait-wrap" data-r style={{ '--i': 1 }}>
            <img className="ab-portrait" src="assets/portrait.jpg" alt="Portrait of Emin Köksal" width="380" height="380" />
            <a className="ab-satellite" href="cv.html" aria-label="See full CV"><ArrowUpRight size={18} width={1.4} /></a>
          </div>
        </div>
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  One identity, two tracks                                           */
/* ------------------------------------------------------------------ */

/* The mark at full size: the ink node is the economics, the coral node the AI,
   and the edge between them the work. */
function MarkDiagram() {
  return (
    <svg className="ab-mark" viewBox="0 0 260 230" role="img" aria-label="Two nodes joined by an edge: economics and AI">
      <line className="ab-mark__edge" x1="46" y1="176" x2="196" y2="46" />
      <circle className="ab-mark__ink" cx="46" cy="176" r="24" />
      <circle className="ab-mark__coral" cx="196" cy="46" r="24" data-r style={{ '--i': 6 }} />
      <text x="82" y="200">Economics</text>
      <text x="160" y="50" textAnchor="end">AI</text>
    </svg>);
}

function TwoIdentities() {
  return (
    <section className="ab-two">
      <div className="container">
        <div className="ab-split" data-reveal>
          <div data-r>
            <Eyebrow>One identity, two tracks</Eyebrow>
            <h2 className="v2-h2">Academic economist <em>and</em> AI consultant, in that order</h2>
            <MarkDiagram />
          </div>
          <div className="ab-prose" data-r style={{ '--i': 1 }}>
            <p>
              The economics comes first because it has to. An AI tool will answer
              whatever question it is given, quickly and with great confidence.
              Knowing which question a competition case turns on takes twenty years of
              cases, dossiers, and papers, and that knowledge is what a workflow is
              built around. Without it, a &ldquo;legal AI workflow&rdquo; is a template
              anyone could sell.
            </p>
            <p>
              The AI half keeps the economics current. I use these tools every day, in
              research and in client work, and I write the prompts and playbooks myself
              before I teach them to anyone. My recent papers go a step further: AI is
              the method, and the regulatory record itself is the data.
            </p>
          </div>
        </div>
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  Four pillars                                                       */
/* ------------------------------------------------------------------ */

function PillarsSection() {
  return (
    <section className="ab-pillars">
      <div className="container">
        <div className="ab-head" data-reveal>
          <div data-r><Eyebrow>What I do</Eyebrow></div>
          <h2 className="v2-h2" data-r style={{ '--i': 1 }}>Four pillars, one body of work</h2>
        </div>
        {ABOUT_PILLARS.map((p) => <PillarBlock key={p.title} pillar={p} />)}
      </div>
    </section>);
}

function PillarBlock({ pillar }) {
  return (
    <article id={pillar.id || undefined} className="ab-pillar" data-reveal>
      <span className="v2-rule v2-draw" />
      <h3 data-r>{pillar.title}</h3>
      <div className="ab-pillar__body" data-r style={{ '--i': 1 }}>
        <p className="ab-pillar__intro">{pillar.intro}</p>

        {pillar.methodSig && <blockquote>{pillar.methodSig}</blockquote>}

        {pillar.subhead && <h4>{pillar.subhead}</h4>}

        {pillar.bullets &&
        <ul className="ab-nodes">
          {pillar.bullets.map((b) => <li key={b.lead}><strong>{b.lead}</strong>{b.body}</li>)}
        </ul>
        }

        {pillar.projects &&
        <div className="ab-projects">
          {pillar.projects.map((p) =>
          <div className="ab-project" key={p.title}>
            <div className="v2-mono">{p.meta}</div>
            <div className="ab-project__title">{p.title}</div>
            <p>{p.body}</p>
          </div>
          )}
        </div>
        }

        {pillar.pull &&
        <div className="ab-pull">
          <div className="v2-mono">{pillar.pull.label}</div>
          <p>{pillar.pull.body}</p>
        </div>
        }

        {pillar.closing && <p className="ab-pillar__closing">{pillar.closing}</p>}

        {pillar.cta && <Btn variant="ghost" href={pillar.cta.href}>{pillar.cta.label} <ArrowUpRight /></Btn>}
      </div>
    </article>);
}

/* ------------------------------------------------------------------ */
/*  Career: the timeline band (ink), then the story                    */
/* ------------------------------------------------------------------ */

function CareerBand() {
  return (
    <section className="ab-career">
      <div className="container">
        <div data-reveal>
          <div data-r><Eyebrow color="#B9B6AB">Career story</Eyebrow></div>
          <h2 className="v2-h2" data-r style={{ '--i': 1 }}>How I got here</h2>
        </div>
        <CareerTimeline />
      </div>
    </section>);
}

function Background() {
  return (
    <section className="ab-story">
      <div className="container">
        <div className="ab-split" data-reveal>
          <div className="ab-edu" data-r>
            <span className="v2-rule v2-draw" />
            <h3>Education</h3>
            <ul>
              {EDUCATION.map((e) =>
              <li key={e.degree}><span>{e.years}</span><div><strong>{e.degree}</strong>{e.place}</div></li>
              )}
            </ul>
          </div>
          <div className="ab-prose" data-r style={{ '--i': 1 }}>
            <p>
              My career began at Bahçeşehir University in 2002, as a research assistant.
              Over the next two decades I moved through Assistant Professor, Vice Dean of
              the Faculty of Administrative and Economic Sciences, Program Coordinator of
              the Financial Economics Graduate Program, and Associate Professor.
            </p>
            <p>
              My research centered on industrial economics, competition policy, platform
              economics, and digital regulation. In 2015 I began working with Dentons as
              Economic Consultant, and the cases came from across the economy:
              electricity, banking, telecoms, retail, cement, petroleum, digital
              platforms. Three years later I became Associate Editor-in-Chief of{' '}
              <em>Competition and Regulation in Network Industries</em> (SAGE Publishing),
              and in 2024 I co-edited <em>The Economics and Regulation of Digitalisation:
              The Case of Türkiye</em> for Routledge.
            </p>
            <p>
              Then came AI. At first I only wanted to save time: summaries, first
              drafts, the obvious uses. I kept going until the tools were doing real
              analytical work. These days I design AI workflows for competition and
              regulation teams, train practitioners on a leading European legal AI
              platform, and build MCP-based research infrastructure. At Bahçeşehir I
              added an undergraduate course, <em>Generative AI for Economic
              Analysis</em>, to the ones I have taught for years.
            </p>
          </div>
        </div>
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  Affiliations                                                       */
/* ------------------------------------------------------------------ */

function AffiliationsSection() {
  return (
    <section className="ab-aff">
      <div className="container">
        <div className="ab-head" data-reveal>
          <div data-r><Eyebrow>Affiliations</Eyebrow></div>
          <h2 className="v2-h2" data-r style={{ '--i': 1 }}>Where I serve</h2>
        </div>
        <div className="ab-ledger" data-reveal>
          <span className="v2-rule v2-draw" aria-hidden="true" />
          <ul>
          {AFFILIATIONS.map((it, i) =>
          <li key={it.name} data-r style={{ '--i': i }}>
            <div className="ab-ledger__name">{it.name}</div>
            <div className="ab-ledger__role">{it.role}</div>
            <div className="ab-ledger__years">{it.years}</div>
          </li>
          )}
          </ul>
        </div>
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  Personal                                                           */
/* ------------------------------------------------------------------ */

function Personal() {
  return (
    <section className="ab-personal">
      <div className="container">
        <div className="ab-split" data-reveal>
          <div data-r>
            <Eyebrow>Off the page</Eyebrow>
            <h2 className="v2-h2">A few things outside the work</h2>
          </div>
          <p className="ab-personal__text" data-r style={{ '--i': 1 }}>
            I live at the intersection of the Aegean and the Mediterranean. Away from
            work I ride gravel bikes and do amateur astronomy, two hobbies that reward
            patience and good instruments.
          </p>
        </div>
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function AboutApp() {
  useReveal();
  return (
    <>
      <Nav active="About" />
      <main className="ab">
        <AboutHero />
        <StatRow stats={ABOUT_STATS} />
        <TwoIdentities />
        <PillarsSection />
        <CareerBand />
        <Background />
        <AffiliationsSection />
        <Personal />
        <CoralClose
          title="Want to work together, or just compare notes?"
          body={'I am always glad to hear from practitioners in competition and regulation, ' +
          'academics working on AI methods, journal editors, conference organizers, ' +
          'and anyone building serious AI infrastructure for analytical work.'}>
          <Btn href="contact.html">Get in touch <ArrowUpRight /></Btn>
          <Btn variant="ghost" href="cv.html">Read the CV</Btn>
          <Btn variant="ghost" href="https://www.linkedin.com/in/eminkoksal/" external>Connect on LinkedIn</Btn>
        </CoralClose>
      </main>
      <Footer />
    </>);
}

export default AboutApp;

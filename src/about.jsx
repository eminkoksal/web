/* About page — full brand-correct content. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';

const { useState } = React;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const ABOUT_STATS = [
{ value: '20+', label: 'years in competition economics' },
{ value: '50+', label: 'publications' },
{ value: '11+', label: 'graduate courses taught' }];


const ABOUT_PILLARS = [
{
  id: 'academic',
  title: 'Academic Economics & Teaching',
  intro:
  'The original ground. A formal academic record in economics, sustained ' +
  'alongside active graduate-level teaching.',
  bullets: [
  {
    lead: 'Associate Professorship in Economics',
    body:
    'earned through the national associate professorship examination; the formal title ' +
    'that would enter a full university post at full Professor rank.'
  },
  {
    lead: '50+ publications',
    body:
    'across peer-reviewed journals and book chapters in economics, competition, and regulation.'
  },
  {
    lead: 'Routledge co-editor',
    body:
    '\u2014 The Economics and Regulation of Digitalisation: The Case of Türkiye (Routledge, 2024), ' +
    'with M. Eroğlu and M. Finger.'
  },
  {
    lead: 'Associate Editor-in-Chief',
    body:
    ', Competition and Regulation in Network Industries (SAGE Publishing), since 2018.'
  },
  {
    lead: 'Graduate-level teaching',
    body:
    ' at Bahçeşehir University and other institutions: Generative AI for Economic Analysis, ' +
    'Managerial Economics, Platform Business and Economics, Industrial Organization, ' +
    'Innovation & Competition Policy in Digital Markets, Economics of Climate Change, Law & Economics.'
  },
  {
    lead: 'Recognised in the field',
    body:
    ' as an academic economist working at the intersection of competition policy, regulation, ' +
    'and AI — particularly within the Turkish and international competition-law community.'
  }]

},
{
  id: 'ai-strategy',
  title: 'AI Strategy & Workflow Design (for Organizations)',
  intro:
  'Translating frontier AI tools into reliable analytical infrastructure for competition, ' +
  'regulation, and economic-analysis teams. The work distinguishes carefully between ' +
  'general-purpose AI tools (for non-confidential academic and marketing work) and ' +
  'confidentiality-grade legal AI platforms (for client work).',
  subhead: 'What I deliver',
  bullets: [
  {
    lead: 'AI workflow and playbook design',
    body: ' for competition cases, regulatory dossiers, and economic analysis.'
  },
  {
    lead: 'Legal AI platform enablement',
    body:
    ' — practitioner training on next-generation European legal AI platforms: how to use them ' +
    'at depth, how to design playbooks that compound across matters, and how to integrate them ' +
    'into existing review and drafting flows.'
  },
  {
    lead: 'Complex prompt and agent design',
    body:
    ' — task-specific prompts, multi-step research agents, and reusable templates that raise ' +
    'output quality while saving time on repetitive analytical work.'
  },
  {
    lead: 'MCP-based research infrastructure',
    body:
    ' — custom Model Context Protocol setups that let practitioners run high-quality legal and ' +
    'academic discovery research from inside their AI tools.'
  },
  {
    lead: 'Strategic AI adoption advisory',
    body:
    ' for senior leadership — where AI actually moves the needle in a regulatory/economic ' +
    'practice, and where it doesn\u2019t.'
  }],

  pull: {
    label: 'Where the work happens',
    body:
    'Embedded inside the competition and regulation practice of a leading international law firm, ' +
    'designing AI workflows in production. Builds playbooks and trains practitioners on a leading ' +
    'European legal AI platform. The work is practitioner-built, not slide-deck.'
  }
},
{
  id: 'research',
  title: 'AI-Native Research',
  intro:
  'A distinct research program — not a single project. Using AI as a primary method to ask ' +
  'economic and competition-law questions that were previously infeasible at scale, and to ' +
  'contribute methodologically to how the literature itself uses these tools.',
  methodSig:
  'AI-powered analysis of legal corpora — turning regulatory text into research-grade economic ' +
  'evidence. Pairs large-scale legal-text analysis with citation networks and economic interpretation.',
  subhead: 'Flagship projects',
  projects: [
  {
    title: 'AI analysis of 3,369 Turkish Competition Board decisions',
    meta: 'Published, SSRN 2025 · with C. Peker and M. Uyer',
    body:
    'A quarter-century of the Turkish Competition Board\u2019s decisions, treated as a single ' +
    'coherent dataset. Combines NLP and economic methods to surface patterns invisible to manual review.'
  },
  {
    title:
    'The Competition Board\u2019s \u201CIntellectual DNA\u201D: A Citation Network and Case Law Mapping Analysis',
    meta: 'Forthcoming working paper',
    body:
    'Combining AI analysis of legal texts with citation network analysis to map how authority, ' +
    'precedent, and reasoning propagate through an agency\u2019s case law over time.'
  }],

  closing:
  'AI doesn\u2019t just speed up what an economist could already do. It changes the questions that ' +
  'can be asked. Treating the regulatory record as a structured, queryable corpus opens up research ' +
  'that simply wasn\u2019t feasible a decade ago — and the literature is only beginning to use these ' +
  'methods seriously.',
  cta: { label: 'Explore the research', href: 'research.html' }
},
{
  /* No anchor required for pillar 4 per source. */
  id: null,
  title: 'Public Thought Leadership',
  intro:
  'The external voice of the three pillars above — essays, conference talks, podcast appearances, ' +
  'and writing that translates research and practice into accessible writing for both academic and ' +
  'professional audiences.',
  cta: { label: 'Read the writing', href: 'blog.html' }
}];


const AFFILIATIONS = [
{
  name: 'Istanbul Center for Regulation (IC4R)',
  role: 'Deputy Director',
  years: '2019 - 2024'
},
{
  name: 'Network-Industries.org',
  role: 'Member',
  years: 'since 2019'
},
{
  name: 'TÜSİAD (Turkish Industry & Business Association)',
  role:
  'Member of three working groups: Climate Change & Environment, Information and Communication ' +
  'Technologies, and E-commerce',
  years: 'since 2018/2019'
},
{
  name: 'US-Turkey Business Council',
  role: 'Member, Digital Economy Advisory Board',
  years: '2017 - 2018'
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
    <section style={{ position: 'relative', padding: '100px 0 80px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: -20, top: 40, zIndex: 0 }}>
          <GhostHeadline>About</GhostHeadline>
        </div>

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96 }}>
          <Eyebrow>About</Eyebrow>
          <h1 className="display"
          style={{ margin: '28px 0 0', maxWidth: 1180, fontSize: 'clamp(40px, 5.6vw, 92px)' }}>
            Academic economist and AI strategist.
          </h1>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80,
          alignItems: 'start', paddingTop: 96, position: 'relative', zIndex: 1
        }}>
          <div className="prose" style={{ maxWidth: 600 }}>
            <p>
              I&rsquo;m <strong>Emin Köksal</strong> — Associate Professor of Economics,
              Routledge author, and AI strategist. Twenty years of my work
              has been inside competition economics and digital regulation; the last few
              have been about rebuilding that same work around AI. I design AI workflows
              for competition and regulation teams at leading international law firms,
              train practitioners on next-generation legal AI platforms, and use AI to
              extend what economic and competition-law research can ask. The four pillars
              below are not four careers — they are one identity, viewed from four angles.
            </p>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <OrbitalArc
                d="M 30 360 Q 200 120 420 240 Q 600 320 760 80"
                viewBox="0 0 800 400"
                stroke="#F37338" strokeWidth={1.4}
                style={{ position: 'absolute', left: -160, top: -60, width: 800, height: 400, inset: 'auto', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Portrait size={420} src="assets/portrait.jpg" />
                <SatelliteCTA size={62} anchor={{ right: -8, bottom: 40 }}
                href="cv.html" label="See full CV" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  At a glance                                                        */
/* ------------------------------------------------------------------ */

function AtAGlance() {
  return (
    <section style={{ padding: '48px 0 96px' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          borderTop: '1.5px solid #141413',
          borderBottom: '1.5px solid #141413',
          padding: '56px 0'
        }}>
          {ABOUT_STATS.map((s, i) =>
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: 16,
            paddingLeft: i === 0 ? 0 : 32,
            borderLeft: i === 0 ? 'none' : '1px solid rgba(20,20,19,.15)'
          }}>
              <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(48px, 5vw, 80px)',
              fontWeight: 500, letterSpacing: '-.03em',
              lineHeight: 1, color: '#141413'
            }}>
                {s.value}
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.4, color: '#555', maxWidth: 220 }}>
                {s.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Two Identities                                                     */
/* ------------------------------------------------------------------ */

function TwoIdentities() {
  return (
    <section style={{ background: '#FCFBFA', padding: '128px 0' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80,
          alignItems: 'start'
        }}>
          <div>
            <Eyebrow>One identity, two tracks</Eyebrow>
            <h2 className="display--mid" style={{ margin: '20px 0 0', maxWidth: 460 }}>
              Academic economist <em>and</em> AI strategist — in that order.
            </h2>
          </div>

          <div className="prose" style={{ maxWidth: 720 }}>
            <p>
              Most consultants oversell AI and undersell rigor. Most academics undersell
              urgency. I work the seam between the two.
            </p>
            <p>
              The academic identity comes first because it has to. Twenty years inside
              competition cases, regulatory dossiers, platform economics, and climate
              policy is what makes the AI work mean anything. Without it, &ldquo;AI
              workflow for legal teams&rdquo; is generic; with it, every workflow knows
              what question it&rsquo;s trying to answer.
            </p>
            <p>
              The AI identity is what makes the academic work current. I don&rsquo;t write
              about AI from the outside — I use it as a daily research and consulting
              tool, I design the prompts and playbooks personally before teaching them to
              anyone else, and my published research uses AI as a primary method, not a topic.
            </p>
            <p>
              The order matters in voice, too: every page on this site leads with academic
              credibility, then shows the AI fluency on top. It&rsquo;s the inverse of the
              usual consulting site, and it&rsquo;s deliberate.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Four Pillars                                                       */
/* ------------------------------------------------------------------ */

function PillarsSection() {
  return (
    <section style={{ padding: '128px 0 64px' }}>
      <div className="container">
        <div style={{ maxWidth: 880, marginBottom: 80 }}>
          <Eyebrow>What I do</Eyebrow>
          <h2 className="display--mid" style={{ margin: '20px 0 0' }}>
            Four pillars, one body of work.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
          {ABOUT_PILLARS.map((p, i) =>
          <PillarBlock key={p.title} index={i + 1} pillar={p} />
          )}
        </div>
      </div>
    </section>);

}

function PillarBlock({ index, pillar }) {
  return (
    <article id={pillar.id || undefined}
    style={{
      display: 'grid', gridTemplateColumns: '160px 1fr',
      gap: 48, paddingTop: 48,
      borderTop: '1.5px solid #141413',
      scrollMarginTop: 120
    }}>
      <div>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(56px, 6vw, 96px)',
          fontWeight: 500, letterSpacing: '-.03em',
          lineHeight: 1, color: '#F37338'
        }}>
          {String(index).padStart(2, '0')}
        </span>
        {pillar.id &&
        <div style={{
          marginTop: 14, fontFamily: 'var(--font-sans)', fontSize: 12,
          fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase',
          color: '#555'
        }}>
            #{pillar.id}
          </div>
        }
      </div>

      <div style={{ maxWidth: 820 }}>
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(28px, 3vw, 44px)',
          fontWeight: 500, letterSpacing: '-.022em', lineHeight: 1.1,
          margin: '0 0 22px'
        }}>
          {pillar.title}
        </h3>
        <p style={{
          fontSize: 18, lineHeight: 1.55, color: '#262627', margin: '0 0 28px'
        }}>
          {pillar.intro}
        </p>

        {pillar.methodSig &&
        <blockquote style={{
          margin: '0 0 32px', padding: '20px 28px',
          borderLeft: '3px solid #F37338',
          background: 'transparent',
          fontFamily: 'var(--font-sans)',
          fontSize: 17, fontStyle: 'italic',
          lineHeight: 1.5, color: '#141413'
        }}>
            {pillar.methodSig}
          </blockquote>
        }

        {pillar.subhead &&
        <h4 style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
          letterSpacing: '.04em', textTransform: 'uppercase',
          color: '#141413', margin: '0 0 16px'
        }}>
            {pillar.subhead}
          </h4>
        }

        {pillar.bullets &&
        <ul style={{
          listStyle: 'none', padding: 0, margin: '0 0 28px',
          display: 'flex', flexDirection: 'column', gap: 14
        }}>
            {pillar.bullets.map((b, i) =>
          <li key={i} style={{
            display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.55, color: '#262627'
          }}>
                <span style={{
              flexShrink: 0, marginTop: 9, width: 6, height: 6,
              borderRadius: '50%', background: '#F37338'
            }} />
                <span>
                  <strong style={{ fontWeight: 500, color: '#141413' }}>{b.lead}</strong>
                  {b.body}
                </span>
              </li>
          )}
          </ul>
        }

        {pillar.projects &&
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 28
        }}>
            {pillar.projects.map((p, i) =>
          <div key={i} style={{
            padding: 28, background: '#FCFBFA', borderRadius: 40
          }}>
                <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
              letterSpacing: '.04em', textTransform: 'uppercase',
              color: '#9A3A0A', marginBottom: 10
            }}>
                  {p.meta}
                </div>
                <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500,
              letterSpacing: '-.022em', lineHeight: 1.25, marginBottom: 12,
              color: '#141413'
            }}>
                  {p.title}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: '#555', margin: 0 }}>
                  {p.body}
                </p>
              </div>
          )}
          </div>
        }

        {pillar.pull &&
        <div style={{
          padding: '24px 28px',
          background: '#141413', color: '#F3F0EE',
          borderRadius: 24, marginBottom: 28
        }}>
            <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
            letterSpacing: '.04em', textTransform: 'uppercase',
            color: 'rgba(243,240,238,.6)', marginBottom: 10
          }}>
              {pillar.pull.label}
            </div>
            <p style={{
            fontSize: 16, lineHeight: 1.55, margin: 0, color: '#F3F0EE'
          }}>
              {pillar.pull.body}
            </p>
          </div>
        }

        {pillar.closing &&
        <p style={{
          fontSize: 16, lineHeight: 1.55, color: '#262627',
          margin: '0 0 24px'
        }}>
            {pillar.closing}
          </p>
        }

        {pillar.cta &&
        <Button variant="ghost" href={pillar.cta.href}>
            {pillar.cta.label} <IconArrow size={14} dir="up-right" />
          </Button>
        }
      </div>
    </article>);

}

/* ------------------------------------------------------------------ */
/*  Background                                                         */
/* ------------------------------------------------------------------ */

function Background() {
  return (
    <section style={{ background: '#FCFBFA', padding: '128px 0' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80,
          alignItems: 'start'
        }}>
          <div>
            <Eyebrow>Career story</Eyebrow>
            <h2 className="display--mid" style={{ margin: '20px 0 0', maxWidth: 460 }}>
              Twenty years inside the questions, then rebuilt around AI.
            </h2>
          </div>

          <div className="prose" style={{ maxWidth: 720 }}>
            <p>
              My career began at Bahçeşehir University in 2002 as a research assistant.
              Over the next two decades, I moved through Assistant Professor, Vice Dean of
              the Faculty of Administrative and Economic Sciences, Program Coordinator of
              the Financial Economics Graduate Program, and Associate Professor — earning
              the formal <em></em> Associate Professorship in Economics along
              the way.
            </p>
            <p>
              Through that period, my academic work centered on industrial economics,
              competition policy, platform economics, and digital regulation. In 2015, I
              began working as Economic Consultant at a leading international law firm —
              providing expert economic analysis in competition law and regulatory matters
              across electricity, banking, telecoms, retail, cement, petroleum, and digital
              platforms. In 2018, I became Associate Editor-in-Chief of{' '}
              <em>Competition and Regulation in Network Industries</em> (SAGE Publishing).
              In 2024, I co-edited <em>The Economics and Regulation of Digitalisation: The
              Case of Türkiye</em> (Routledge).
            </p>
            <p>
              Then came AI. Not as a topic to write <em>about</em>, but as a tool that
              genuinely changes how the work is done. I rebuilt my own research and
              consulting workflows around frontier AI tools — first to save time, then to
              ask questions that hadn&rsquo;t been askable before. That rebuild is what the
              AI Strategy and AI-Native Research pillars on this site describe. I now
              design AI workflows for competition and regulation teams at leading
              international law firms, train practitioners on a leading European legal AI
              platform, build MCP-based research infrastructure for legal and academic
              discovery, and teach a graduate course on <em>Generative AI for Economic
              Analysis</em> — alongside the older courses I&rsquo;ve been teaching for years.
            </p>
            <p>
              <strong>Education:</strong> PhD in Economics, Marmara University (2008).
              MA in Public Finance, Galatasaray University (2004). BA in Economics,
              Galatasaray University (2001).
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
    <section style={{ padding: '128px 0 96px' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Eyebrow>Affiliations</Eyebrow>
          <h2 className="display--mid" style={{ margin: '20px 0 0' }}>
            Where I serve.
          </h2>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {AFFILIATIONS.map((it, i) =>
          <li key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1.6fr 0.6fr',
            gap: 32, alignItems: 'baseline',
            padding: '32px 0',
            borderTop: '1px solid rgba(20,20,19,.12)',
            borderBottom: i === AFFILIATIONS.length - 1 ? '1px solid rgba(20,20,19,.12)' : 'none'
          }}>
              <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500,
              letterSpacing: '-.02em', lineHeight: 1.2
            }}>
                {it.name}
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: '#262627' }}>
                {it.role}
              </div>
              <div style={{ fontSize: 14, color: '#555', textAlign: 'right' }}>
                {it.years}
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Personal                                                           */
/* ------------------------------------------------------------------ */

function Personal() {
  return (
    <section style={{ padding: '64px 0 128px' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80,
          alignItems: 'start'
        }}>
          <div>
            <Eyebrow>Off the page</Eyebrow>
            <h2 className="display--mid" style={{ margin: '20px 0 0', maxWidth: 460 }}>
              A few things outside the work.
            </h2>
          </div>

          <div className="prose" style={{ maxWidth: 640 }}>
            <p style={{ fontSize: 20 }}>Based in Türkiye. Married. Keen gravel cyclist. Amateur astronomer. Available for remote collaboration worldwide.


            </p>
          </div>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/*  Closing CTA                                                        */
/* ------------------------------------------------------------------ */

function AboutClosingCTA() {
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
            Want to work together — or just compare notes?
          </h2>
          <div>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: '#262627',
              margin: '0 0 28px', maxWidth: 460
            }}>
              I&rsquo;m always glad to hear from practitioners in competition and regulation,
              fellow academics working on AI methods, journal editors, conference organizers,
              and anyone designing serious AI infrastructure for analytical work.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" href="contact.html">
                Get in touch <IconArrow size={14} dir="up-right" />
              </Button>
              <Button variant="ghost" href="cv.html">
                Read the CV
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
/*  App                                                                */
/* ------------------------------------------------------------------ */

function AboutApp() {
  return (
    <>
      <Nav active="About" />
      <main>
        <AboutHero />
        <AtAGlance />
        <TwoIdentities />
        <PillarsSection />
        <Background />
        <AffiliationsSection />
        <Personal />
        <AboutClosingCTA />
      </main>
      <Footer />
    </>);

}

export default AboutApp;
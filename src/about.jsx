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
{ value: '1000s', label: 'legal documents analyzed with AI' },
{ value: '11+', label: 'graduate courses taught' }];


const ABOUT_PILLARS = [
{
  id: 'academic',
  title: 'Academic Economics & Teaching',
  intro:
  'Where it all started: a formal academic record in economics, kept current by ' +
  'teaching every year.',
  bullets: [
  {
    lead: 'Associate Professorship (Do\u00e7entlik) in Economics',
    body:
    ' \u2014 earned through T\u00fcrkiye\u2019s national associate professorship examination; the title ' +
    'that would enter a full university post at full Professor rank.'
  },
  {
    lead: '50+ publications',
    body:
    ' across peer-reviewed journals and book chapters in economics, competition, and regulation.'
  },
  {
    lead: 'Routledge co-editor',
    body:
    ' \u2014 The Economics and Regulation of Digitalisation: The Case of T\u00fcrkiye (Routledge, 2024), ' +
    'with M. Ero\u011flu and M. Finger.'
  },
  {
    lead: 'Associate Editor-in-Chief',
    body:
    ', Competition and Regulation in Network Industries (SAGE Publishing), since 2018.'
  },
  {
    lead: 'Graduate-level teaching',
    body:
    ' at Bah\u00e7e\u015fehir University and other institutions: Generative AI for Economic Analysis, ' +
    'Managerial Economics, Platform Business and Economics, Industrial Organization, ' +
    'Innovation & Competition Policy in Digital Markets, Economics of Climate Change, Law & Economics.'
  }]

},
{
  id: 'ai-strategy',
  title: 'AI Strategy & Workflow Design (for Organizations)',
  intro:
  'I help competition, regulation, and economic-analysis teams turn frontier AI tools ' +
  'into infrastructure they can rely on. General-purpose tools for non-confidential work; ' +
  'confidentiality-grade legal AI platforms for client matters. The distinction matters, ' +
  'and I hold it strictly.',
  subhead: 'What I deliver',
  bullets: [
  {
    lead: 'AI workflow and playbook design',
    body: ' for competition cases, regulatory dossiers, and economic analysis.'
  },
  {
    lead: 'Practitioner training on legal AI platforms',
    body:
    ' \u2014 how to use them at depth, and how to build playbooks that compound across matters.'
  },
  {
    lead: 'Complex prompt and agent design',
    body:
    ' \u2014 task-specific prompts, multi-step research agents, and reusable templates.'
  },
  {
    lead: 'MCP-based research infrastructure',
    body:
    ' \u2014 custom Model Context Protocol setups for legal and academic discovery, run from ' +
    'inside the tools practitioners already use.'
  },
  {
    lead: 'AI adoption advisory for senior leadership',
    body:
    ' \u2014 where AI moves the needle in a regulatory or economic practice, and where it doesn\u2019t.'
  }],

  pull: {
    label: 'Where the work happens',
    body:
    'Since 2015 I\u2019ve worked inside the competition and regulation practice of a leading ' +
    'international law firm. The workflows I design run there first, on live matters. If a ' +
    'playbook doesn\u2019t survive contact with a real case, it doesn\u2019t get taught.'
  }
},
{
  id: 'research',
  title: 'AI-Native Research',
  intro:
  'What began as one paper has become a research program: using AI to ask competition-law ' +
  'and economics questions that were too large to ask before.',
  methodSig:
  'AI-powered analysis of legal corpora \u2014 turning regulatory text into research-grade economic ' +
  'evidence. Pairs large-scale legal-text analysis with citation networks and economic interpretation.',
  subhead: 'Flagship projects',
  projects: [
  {
    title: 'AI analysis of 3,369 Turkish Competition Board decisions',
    meta: 'Published, SSRN 2025 \u00b7 with C. Peker and M. Uyer',
    body:
    'A quarter-century of the Board\u2019s decisions, treated as a single coherent dataset. ' +
    'Combines NLP and economic methods to find patterns no manual review could.'
  },
  {
    title:
    'The Competition Board\u2019s \u201CIntellectual DNA\u201D: A Citation Network and Case Law Mapping Analysis',
    meta: 'Forthcoming working paper',
    body:
    'Maps how authority, precedent, and reasoning move through the agency\u2019s case law over time.'
  }],

  closing:
  'The interesting part isn\u2019t the speed. Treating the regulatory record as a structured, ' +
  'queryable corpus changes which questions are worth asking \u2014 and the literature is only ' +
  'beginning to use these methods seriously.',
  cta: { label: 'Explore the research', href: 'research.html' }
},
{
  /* No anchor required for pillar 4 per source. */
  id: null,
  title: 'Public Thought Leadership',
  intro:
  'Essays, conference talks, and podcast appearances that carry the other three pillars to ' +
  'a wider audience, in English and Turkish.',
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
    <section style={{ position: 'relative', padding: '100px 0 80px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: -20, top: 40, zIndex: 0 }}>
          <GhostHeadline>About</GhostHeadline>
        </div>

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96 }}>
          <Eyebrow>About</Eyebrow>
          <h1 className="display"
          style={{ margin: '28px 0 0', maxWidth: 1180, fontSize: 'clamp(40px, 5.6vw, 92px)' }}>
            Twenty years an economist | The last few rebuilding the work around AI
          </h1>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80,
          alignItems: 'start', paddingTop: 96, position: 'relative', zIndex: 1
        }}>
          <div className="prose" style={{ maxWidth: 600 }}>
            <p>
              I&rsquo;m <strong>Emin Köksal</strong> — Associate Professor of Economics
             , based in Türkiye. I&rsquo;ve spent twenty years in competition
              economics and digital regulation: teaching, publishing, editing a journal,
              and advising law firms on cases. A few years ago I began rebuilding that
              work around AI. Now I design AI workflows for competition and regulation
              teams, train practitioners on legal AI platforms, and run a research
              program that uses AI as its method. This page is the longer version of
              that story.
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
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
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
              Academic economist <em>and</em> AI consultant — in that order
            </h2>
          </div>

          <div className="prose" style={{ maxWidth: 720 }}>
            <p>
              Consultants who talk about AI tend to skip the hard part: knowing which
              questions matter. Academics who study it often stop short of using it.
              I&rsquo;ve tried to hold on to both.
            </p>
            <p>
              The economics comes first because it has to. Twenty years of competition
              cases, regulatory dossiers, and platform economics is what tells an AI
              workflow which question it should answer. Without that, a &ldquo;legal AI
              workflow&rdquo; is a template anyone could sell.
            </p>
            <p>
              The AI side keeps the economics current. I use these tools every day, in
              research and in client work. I write the prompts and playbooks myself
              before I teach them to anyone. And my recent papers use AI as their
              method, with the regulatory record itself as the data.
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
            Four pillars, one body of work
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
              How I got here
            </h2>
          </div>

          <div className="prose" style={{ maxWidth: 720 }}>
            <p>
              My career began at Bahçeşehir University in 2002, as a research assistant.
              Over the next two decades I moved through Assistant Professor, Vice Dean of
              the Faculty of Administrative and Economic Sciences, Program Coordinator of
              the Financial Economics Graduate Program, and Associate Professor — earning
              the formal <em>Doçentlik</em> (Associate Professorship in Economics) along
              the way.
            </p>
            <p>
              The research centered on industrial economics, competition policy, platform
              economics, and digital regulation. In 2015, I began working as Economic
              Consultant at Dentons, providing expert economic analysis in competition and
              regulatory matters across electricity, banking, telecoms, retail, cement,
              petroleum, and digital platforms. In 2018, I became Associate Editor-in-Chief
              of{' '}
              <em>Competition and Regulation in Network Industries</em> (SAGE Publishing).
              In 2024, I co-edited <em>The Economics and Regulation of Digitalisation: The
              Case of Türkiye</em> (Routledge).
            </p>
            <p>
              Then came AI. I started with the obvious uses — summarizing, drafting,
              saving time — and kept going until the tools were doing real analytical
              work. That rebuild is what the AI Strategy and AI-Native Research pillars on
              this site describe. These days I design AI workflows for competition and
              regulation teams, train practitioners on a leading European legal AI
              platform, build MCP-based research infrastructure, and teach a graduate
              course on <em>Generative AI for Economic
              Analysis</em> — alongside the courses I&rsquo;ve been teaching for years.
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
            Where I serve
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
              A few things outside the work
            </h2>
          </div>

          <div className="prose" style={{ maxWidth: 640 }}>
            <p style={{ fontSize: 20 }}>I live at the intersection of the Aegean and the Mediterranean. Off the page,
            it&rsquo;s gravel cycling and amateur astronomy — two hobbies that reward
            patience and good instruments. I collaborate remotely worldwide.
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
              academics working on AI methods, journal editors, conference organizers,
              and anyone building serious AI infrastructure for analytical work.
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
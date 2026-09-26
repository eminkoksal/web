/* CV, print edition: the A4 layout that scripts/cv-pdf.mjs renders to
   public/assets/Emin-Koksal-CV.pdf. Same content as the CV page (cv-data.jsx);
   styles live in scripts/cv-pdf/cv-print.css, not inline, so the page stays
   a plain document that Chrome can paginate. */
import React from 'react';
import { PROFILES } from './shared.jsx';
import {
  CV_UPDATED, CV_TITLE, CV_ACADEMIC_RANK, CV_AI_STRATEGY, CV_ECONOMIC, CV_PERSONAL,
  CURRENT_POSITIONS, PREVIOUS_POSITIONS, AFFILIATIONS, EDUCATION,
  TEACHING_BAU, TEACHING_GUEST, REFEREE_FOR, RESEARCH_INTERESTS, venuePart,
  PUB_BOOKS, PUB_CHAPTERS, PUB_ARTICLES_SELECTED, PUB_ARTICLES_OTHER,
  PUB_OTHER_JOURNAL, PUB_REPORTS,
} from './cv-data.jsx';

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 64 64" aria-hidden="true">
      <line x1="19" y1="45" x2="45" y2="19" stroke="#16150F" strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="45" r="8" fill="#16150F" />
      <circle cx="45" cy="19" r="8" fill="#F37338" />
    </svg>);
}

function Section({ title, long, children }) {
  return (
    <section className={long ? 'sec sec--long' : 'sec'}>
      <h2 className="sec-head">{title}</h2>
      {children}
    </section>);
}

function Row({ main, sub, years }) {
  return (
    <li className="row">
      <span className="row-main">
        <span className="row-role">{main}</span>
        {sub && <span className="row-org">{sub}</span>}
      </span>
      <span className="row-years">{years}</span>
    </li>);
}

function Contact({ label, children }) {
  return (
    <div className="contact">
      <span className="label">{label}</span>
      <span className="value">{children}</span>
    </div>);
}

function Citation({ pub }) {
  return (
    <li className="cite">
      <span className="cite-year">{pub.year}</span>
      <p className="cite-text">
        {pub.authors}{pub.year ? ` (${pub.year}). ` : ' '}
        {pub.href ?
        <a href={pub.href}><em>{pub.title}</em></a> :
        <em>{pub.title}</em>}{' '}
        {pub.venueItalic ? venuePart(pub.venue, pub.venueItalic) : pub.venue}
        {pub.note && <span className="cite-note"> {pub.note}</span>}
        {pub.highlight && <span className="tag">AI-native</span>}
      </p>
    </li>);
}

function PubGroup({ title, items }) {
  return (
    <div className="pub-group">
      <h3 className="sub-head">{title}</h3>
      <ol className="cites">{items.map((p, i) => <Citation key={i} pub={p} />)}</ol>
    </div>);
}

export default function CvPrint() {
  return (
    <main className="cv">
      <header className="masthead">
        <div className="name-line">
          <Mark />
          <h1>Emin Köksal</h1>
        </div>
        <p className="title-line">{CV_TITLE}</p>
        <div className="contacts">
          <Contact label="Email"><a href="mailto:mail@eminkoksal.com">mail@eminkoksal.com</a></Contact>
          <Contact label="Web"><a href="https://eminkoksal.com">eminkoksal.com</a></Contact>
          <Contact label="LinkedIn"><a href={PROFILES.linkedin}>linkedin.com/in/eminkoksal</a></Contact>
          <Contact label="Based in">Türkiye</Contact>
          <Contact label="ORCID"><a href={PROFILES.orcid}>0000-0003-4232-3193</a></Contact>
          <Contact label="Google Scholar"><a href={PROFILES.scholar}>Profile</a></Contact>
          <Contact label="SSRN"><a href={PROFILES.ssrn}>Author page</a></Contact>
          <Contact label="Updated">{CV_UPDATED}</Contact>
        </div>
      </header>

      <Section title="Current positions">
        <ul className="rows">{CURRENT_POSITIONS.map((p, i) => <Row key={i} main={p.role} sub={p.org} years={p.years} />)}</ul>
      </Section>

      <Section title="Previous positions">
        <ul className="rows">{PREVIOUS_POSITIONS.map((p, i) => <Row key={i} main={p.role} sub={p.org} years={p.years} />)}</ul>
      </Section>

      <Section title="Other positions and affiliations">
        <ul className="rows">{AFFILIATIONS.map((p, i) => <Row key={i} main={p.role} sub={p.org} years={p.years} />)}</ul>
      </Section>

      <Section title="Education">
        <ul className="rows">{EDUCATION.map((e, i) => <Row key={i} main={e.degree} sub={e.institution} years={e.years} />)}</ul>
        <p className="note"><span className="label">Academic rank</span> {CV_ACADEMIC_RANK}</p>
      </Section>

      <Section title="AI strategy and consultancy">
        <div className="prose">{CV_AI_STRATEGY.map((para, i) => <p key={i}>{para}</p>)}</div>
      </Section>

      <Section title="Economic consultancy">
        <div className="prose"><p>{CV_ECONOMIC}</p></div>
      </Section>

      <Section title="Research interests">
        <p className="inline-list">{RESEARCH_INTERESTS.join(' · ')}</p>
      </Section>

      <Section title="Teaching" long>
        <h3 className="sub-head"><span lang="tr">Bahçeşehir</span> University</h3>
        <ul className="rows">{TEACHING_BAU.map((c, i) => <Row key={i} main={c.title} years={c.level} />)}</ul>
        <h3 className="sub-head">Guest lecturing</h3>
        <ul className="rows">{TEACHING_GUEST.map((c, i) => <Row key={i} main={c.title} sub={c.org} years={c.years} />)}</ul>
      </Section>

      <Section title="Additional professional activities">
        <p className="inline-list"><span className="label">Referee for</span>{' '}
          {REFEREE_FOR.map((j, i) =>
          <React.Fragment key={i}>
              {i > 0 && ' · '}
              {j.startsWith('Many') ? j.toLowerCase() : <em>{j}</em>}
            </React.Fragment>
          )}
        </p>
      </Section>

      <Section title="Publications" long>
        <PubGroup title="Books and edited volumes" items={PUB_BOOKS} />
        <PubGroup title="Book chapters" items={PUB_CHAPTERS} />
        <PubGroup title="Selected peer-reviewed journal articles" items={PUB_ARTICLES_SELECTED} />
        <PubGroup title="Other peer-reviewed articles" items={PUB_ARTICLES_OTHER} />
        <PubGroup title="Other journal articles" items={PUB_OTHER_JOURNAL} />
        <PubGroup title="Reports and working papers" items={PUB_REPORTS} />
      </Section>

      <Section title="Personal">
        <p className="inline-list">{CV_PERSONAL.join(' · ')}</p>
      </Section>
    </main>);
}

/* CV page: full curriculum vitae. Content lives in cv-data.jsx, shared with the PDF. */
import React from 'react';
import {
  CV_UPDATED, CV_TITLE, CV_ACADEMIC_RANK, CV_AI_STRATEGY, CV_ECONOMIC, CV_PERSONAL, CURRENT_POSITIONS, PREVIOUS_POSITIONS, AFFILIATIONS, EDUCATION, TEACHING_BAU, TEACHING_GUEST, REFEREE_FOR, RESEARCH_INTERESTS, venuePart, PUB_BOOKS, PUB_CHAPTERS, PUB_ARTICLES_SELECTED, PUB_ARTICLES_OTHER, PUB_OTHER_JOURNAL, PUB_REPORTS,
} from './cv-data.jsx';
import { CV_PDF, IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';

const { useState, useEffect, useRef } = React;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const TOC = [
{ id: 'current', label: 'Current Positions' },
{ id: 'previous', label: 'Previous Positions' },
{ id: 'affiliations', label: 'Affiliations' },
{ id: 'education', label: 'Education' },
{ id: 'ai-strategy', label: 'AI Strategy & Consultancy' },
{ id: 'economic', label: 'Economic Consultancy' },
{ id: 'interests', label: 'Research Interests' },
{ id: 'teaching', label: 'Teaching' },
{ id: 'service', label: 'Professional Activities' },
{ id: 'publications', label: 'Publications' },
{ id: 'personal', label: 'Personal' }];


/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

function Citation({ pub }) {
  return (
    <li className="cv-cite" style={{
      display: 'grid', gridTemplateColumns: '64px 1fr auto',
      gap: 16, alignItems: 'baseline',
      padding: '18px 0',
      borderTop: '1px solid rgba(22,21,15,.1)'
    }}>
      <span style={{ fontSize: 13, color: '#56554F', whiteSpace: 'nowrap' }}>
        {pub.year || ''}
      </span>
      <p style={{
        fontSize: 15, lineHeight: 1.5, color: '#16150F', margin: 0
      }}>
        <strong style={{ fontWeight: 500 }}>{pub.authors}</strong>
        {pub.year ? ` (${pub.year}). ` : ' '}
        {/* Many entries — Turkish seminar volumes, working notes — have no DOI
            or stable publisher page. Those titles render as plain italics
            rather than as links that go nowhere. */}
        {pub.href ? (
          <a href={pub.href} target="_blank" rel="noopener noreferrer" style={{
            color: '#16150F', textDecoration: 'none',
            borderBottom: '1px solid rgba(22,21,15,.3)'
          }}>
            {pub.title}
          </a>
        ) : (
          <em>{pub.title}</em>
        )}{' '}
        {pub.venueItalic ? venuePart(pub.venue, pub.venueItalic) : pub.venue}
        {pub.note && <span style={{ color: '#56554F' }}> {pub.note}</span>}
      </p>
      <span className="cv-cite__ext" style={{
        fontSize: 12, color: '#BC4527', fontWeight: 500,
        letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)'
      }}>
        {pub.highlight ? 'AI-native' : ''}
      </span>
    </li>);

}

function PubGroup({ id, title, items }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h4 className="cv-pub-group" style={{
        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
        letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
        color: '#16150F', margin: '0 0 12px'
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((p, i) => <Citation key={i} pub={p} />)}
      </ul>
    </div>);

}

/* CV section header — eyebrow + heading, with anchor scroll target */
function CVHeader({ index, eyebrow, title }) {
  return (
    <header style={{
      display: 'grid', gridTemplateColumns: '64px 1fr',
      gap: 24, alignItems: 'baseline',
      marginBottom: 32
    }}>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 16, fontWeight: 500,
        letterSpacing: '.08em', color: '#BC4527'
      }}>
        {index}
      </div>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(28px, 3.4vw, 52px)',
          fontWeight: 500, letterSpacing: '-.022em',
          lineHeight: 1.05, margin: '18px 0 0'
        }}>
          {title}
        </h2>
      </div>
    </header>);

}

function CVSection({ id, index, eyebrow, title, children, pageBreak, alt }) {
  return (
    <section id={id} className={'cv-section' + (pageBreak ? ' cv-section--break' : '')}
    style={{
      padding: '96px 0',
      scrollMarginTop: 140,
      background: alt ? '#FBFAF6' : 'transparent'
    }}>
      <div className="container">
        <CVHeader index={index} eyebrow={eyebrow} title={title} />
        <div style={{
          display: 'grid', gridTemplateColumns: '64px 1fr',
          gap: 24, alignItems: 'start'
        }}>
          <div />
          <div>{children}</div>
        </div>
      </div>
    </section>);

}

/* Position row — common pattern for Current / Previous / Affiliations */
function PositionRow({ role, org, years }) {
  return (
    <li style={{
      display: 'grid', gridTemplateColumns: '1.2fr 1.6fr 0.6fr',
      gap: 24, alignItems: 'baseline',
      padding: '22px 0',
      borderTop: '1px solid rgba(22,21,15,.12)'
    }}>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 19, fontWeight: 500,
        letterSpacing: '-.015em', lineHeight: 1.3, color: '#16150F'
      }}>
        {role}
      </div>
      <div style={{
        fontSize: 16, color: '#2E2E29', lineHeight: 1.5
      }}>
        {org}
      </div>
      <div style={{
        fontSize: 14, color: '#56554F', textAlign: 'right', whiteSpace: 'nowrap'
      }}>
        {years}
      </div>
    </li>);

}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function CVHero() {
  return (
    <section className="cv-hero" style={{ position: 'relative', padding: '100px 0 64px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: -20, top: 60, zIndex: 0 }}>
          <GhostHeadline>Vitae</GhostHeadline>
        </div>

        <div style={{
          position: 'relative', zIndex: 1, paddingTop: 64,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 32
        }}>
          <div style={{ maxWidth: 880 }}>
            <Eyebrow>Curriculum Vitae</Eyebrow>
            <h1 className="display" style={{ margin: '28px 0 24px' }}>
              Emin Köksal · Curriculum Vitae
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 500, letterSpacing: '-.018em', color: '#16150F',
              margin: 0, lineHeight: 1.35
            }}>{CV_TITLE}</p>
            <p style={{
              fontSize: 14, color: '#56554F', margin: '12px 0 0',
              letterSpacing: '.02em'
            }}>
              Last updated: {CV_UPDATED}
            </p>
          </div>

          <div className="cv-hero__actions"
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" href={CV_PDF} target="_blank">
              Download PDF <IconDownload size={14} />
            </Button>
            <Button variant="ghost" href="mailto:mail@eminkoksal.com">
              Email me <IconArrow size={14} dir="up-right" />
            </Button>
          </div>
        </div>

        <div className="cv-contact" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          borderTop: '1px solid rgba(22,21,15,.15)',
          marginTop: 64, paddingTop: 24
        }}>
          <Meta label="Email" value={<a href="mailto:mail@eminkoksal.com" style={{ color: '#16150F', textDecoration: 'underline', textUnderlineOffset: 3 }}>mail@eminkoksal.com</a>} />
          <Meta label="Web" value={<a href="https://eminkoksal.com" target="_blank" rel="noopener noreferrer" style={{ color: '#16150F', textDecoration: 'underline', textUnderlineOffset: 3 }}>eminkoksal.com</a>} />
          <Meta label="LinkedIn" value={<a href="https://linkedin.com/in/eminkoksal" target="_blank" rel="noopener noreferrer" style={{ color: '#16150F', textDecoration: 'underline', textUnderlineOffset: 3 }}>linkedin.com/in/eminkoksal</a>} />
          <Meta label="Based in" value="Türkiye" />
        </div>
      </div>
    </section>);

}

function Meta({ label, value }) {
  return (
    <div>
      <div style={{
        fontSize: 12, fontWeight: 500, letterSpacing: '.08em', fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', color: '#56554F', marginBottom: 6
      }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: '#16150F' }}>{value}</div>
    </div>);

}

/* ------------------------------------------------------------------ */
/*  Sticky TOC                                                         */
/* ------------------------------------------------------------------ */

function CVTOC() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const opts = {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    TOC.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="cv-toc" style={{
      position: 'sticky', top: 96, zIndex: 40,
      background: 'rgba(245,242,235,.92)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(22,21,15,.12)',
      borderBottom: '1px solid rgba(22,21,15,.12)',
      marginBottom: 16
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: '14px var(--container-gutter)',
        overflowX: 'auto'
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
          letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
          color: '#56554F', flexShrink: 0
        }}>
          On this page
        </span>
        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', gap: 6, flexShrink: 0
        }}>
          {TOC.map((t) =>
          <li key={t.id}>
              <a href={'#' + t.id} style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '8px 14px', borderRadius: 999,
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
              letterSpacing: '-.01em', whiteSpace: 'nowrap',
              color: active === t.id ? '#F5F2EB' : '#16150F',
              background: active === t.id ? '#16150F' : 'transparent',
              textDecoration: 'none',
              transition: 'background 180ms cubic-bezier(0.4,0,0.2,1), color 180ms'
            }}>
                {t.label}
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>);

}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function CVApp() {
  return (
    <>
      <Nav active="CV" />
      <main>
        <CVHero />
        <CVTOC />

        <CVSection id="current" index="01" eyebrow="Current Positions" title="Where I am now">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {CURRENT_POSITIONS.map((p, i) => <PositionRow key={i} {...p} />)}
          </ul>
        </CVSection>

        <CVSection id="previous" index="02" eyebrow="Previous Positions" title="Where I have been" alt>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {PREVIOUS_POSITIONS.map((p, i) => <PositionRow key={i} {...p} />)}
          </ul>
        </CVSection>

        <CVSection id="affiliations" index="03" eyebrow="Other Positions & Affiliations" title="Where I serve">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {AFFILIATIONS.map((p, i) => <PositionRow key={i} {...p} />)}
          </ul>
        </CVSection>

        <CVSection id="education" index="04" eyebrow="Education" title="Degrees & qualifications" alt>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontFamily: 'var(--font-sans)'
          }}>
            <thead>
              <tr>
                <th style={thStyle}>Years</th>
                <th style={thStyle}>Institution</th>
                <th style={thStyle}>Degree</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATION.map((e, i) =>
              <tr key={i} style={{ borderTop: '1px solid rgba(22,21,15,.12)' }}>
                  <td style={{ ...tdStyle, color: '#56554F', whiteSpace: 'nowrap' }}>{e.years}</td>
                  <td style={{ ...tdStyle }}>{e.institution}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{e.degree}</td>
                </tr>
              )}
            </tbody>
          </table>
          <p style={{
            fontSize: 15, color: '#2E2E29', lineHeight: 1.55,
            margin: '24px 0 0', maxWidth: 760
          }}>
            <strong style={{ fontWeight: 500 }}>Academic rank:</strong> {CV_ACADEMIC_RANK}.
          </p>
        </CVSection>

        <CVSection id="ai-strategy" index="05" eyebrow="AI Strategy & Consultancy"
        title="AI workflows for analytical and legal work">
          <div className="prose" style={{ maxWidth: 820 }}>
            {CV_AI_STRATEGY.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </CVSection>

        <CVSection id="economic" index="06" eyebrow="Economic Consultancy"
        title="Expert economic analysis in competition law and regulation" alt>
          <div className="prose" style={{ maxWidth: 820 }}>
            <p>{CV_ECONOMIC}</p>
          </div>
        </CVSection>

        <CVSection id="interests" index="07" eyebrow="Research Interests" title="Active areas of inquiry">
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexWrap: 'wrap', gap: 12
          }}>
            {RESEARCH_INTERESTS.map((it, i) =>
            <li key={i} style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '10px 18px', borderRadius: 999,
              border: '1px solid rgba(22,21,15,.25)',
              fontSize: 15, fontWeight: 500, letterSpacing: '-.015em',
              background: '#FBFAF6'
            }}>
                {it}
              </li>
            )}
          </ul>
        </CVSection>

        <CVSection id="teaching" index="08" eyebrow="Teaching" title="Courses, current and recent" alt>
          <h3 style={subheadStyle}><span lang="tr">Bahçeşehir</span> University</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
            {TEACHING_BAU.map((c, i) =>
            <li key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: 24, alignItems: 'baseline',
              padding: '18px 0',
              borderTop: '1px solid rgba(22,21,15,.1)'
            }}>
                <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 500,
                letterSpacing: '-.015em'
              }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 13, color: '#56554F' }}>
                  {c.level}
                </div>
              </li>
            )}
          </ul>

          <h3 style={subheadStyle}>Guest lecturing</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {TEACHING_GUEST.map((c, i) =>
            <li key={i} style={{
              display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 0.6fr',
              gap: 24, alignItems: 'baseline',
              padding: '18px 0',
              borderTop: '1px solid rgba(22,21,15,.1)'
            }}>
                <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 500,
                letterSpacing: '-.015em'
              }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 15, color: '#2E2E29' }}>
                  {c.org}
                </div>
                <div style={{ fontSize: 14, color: '#56554F', textAlign: 'right' }}>
                  {c.years}
                </div>
              </li>
            )}
          </ul>
        </CVSection>

        <CVSection id="service" index="09" eyebrow="Additional Professional Activities"
        title="Editorial, refereeing, advisory">
          <h3 style={subheadStyle}>Referee for</h3>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: 0
          }}>
            {REFEREE_FOR.map((j, i) =>
            <li key={i} style={{
              padding: '14px 0',
              borderTop: '1px solid rgba(22,21,15,.1)',
              fontSize: 16,
              color: '#16150F'
            }}>
                {j}
              </li>
            )}
          </ul>
        </CVSection>

        <CVSection id="publications" index="10" eyebrow="Publications"
        title="The full record" alt pageBreak>
          <PubGroup title="Books & Edited Volumes" items={PUB_BOOKS} />
          <PubGroup title="Book Chapters" items={PUB_CHAPTERS} />
          <PubGroup title="Selected Peer-Reviewed Journal Articles" items={PUB_ARTICLES_SELECTED} />
          <PubGroup title="Other Peer-Reviewed Articles" items={PUB_ARTICLES_OTHER} />
          <PubGroup title="Other Journal Articles" items={PUB_OTHER_JOURNAL} />
          <PubGroup title="Reports & Working Papers" items={PUB_REPORTS} />
        </CVSection>

        <CVSection id="personal" index="11" eyebrow="Personal" title="A few details for the record">
          <p style={{
            fontFamily: 'var(--font-prose)', fontFamily: 'var(--font-prose)', fontSize: 'clamp(20px, 2vw, 28px)',
            fontWeight: 500, letterSpacing: '-.018em', lineHeight: 1.3,
            color: '#16150F', margin: 0, maxWidth: 880
          }}>
            {CV_PERSONAL.join(' · ')}
          </p>
        </CVSection>

        {/* Footer CTA */}
        <section className="cv-footer-cta" style={{
          padding: '64px 0 128px', background: 'transparent'
        }}>
          <div className="container">
            <div style={{
              padding: '48px',
              background: '#16150F', color: '#F5F2EB',
              borderRadius: 24,
              display: 'grid', gridTemplateColumns: '1.4fr 1fr',
              gap: 48, alignItems: 'end'
            }}>
              <p style={{
                fontFamily: 'var(--font-prose)', fontSize: 18, lineHeight: 1.55,
                color: 'rgba(245,242,235,.9)', margin: 0, maxWidth: 640
              }}>
                The latest PDF version of this CV is available for download above.
                For collaboration or speaking inquiries, reach out by{' '}
                <a href="mailto:mail@eminkoksal.com" style={{
                  color: '#F5F2EB', textDecoration: 'underline', textUnderlineOffset: 3
                }}>email</a>
                {' '}or{' '}
                <a href="https://linkedin.com/in/eminkoksal" target="_blank" rel="noopener noreferrer" style={{
                  color: '#F5F2EB', textDecoration: 'underline', textUnderlineOffset: 3
                }}>LinkedIn</a>.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button variant="inverse" href={CV_PDF} target="_blank">
                  Download PDF <IconDownload size={14} />
                </Button>
                <Button variant="ghost" href="contact.html"
                style={{ borderColor: 'rgba(255,255,255,.4)', color: '#F5F2EB' }}>
                  Get in touch <IconArrow size={14} dir="up-right" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>);

}

/* ---------- inline styles reused ---------- */
const thStyle = {
  textAlign: 'left', padding: '12px 16px 12px 0',
  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
  letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
  color: '#56554F', borderBottom: '1.5px solid #16150F'
};
const tdStyle = {
  padding: '20px 16px 20px 0',
  fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.4,
  color: '#16150F', verticalAlign: 'top'
};
const subheadStyle = {
  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
  letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
  color: '#16150F', margin: '0 0 12px'
};

export default CVApp;
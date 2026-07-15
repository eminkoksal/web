/* Research page — AI-native research program. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';

const { useState } = React;

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const METHOD_STEPS = [
  {
    title: 'Large-scale AI analysis of legal texts.',
    body:
      "Treat a national authority\u2019s full decision record as a single queryable dataset, " +
      'then use AI to extract concepts, parties, holdings, and reasoning patterns at a ' +
      'granularity manual review can\u2019t reach.',
  },
  {
    title: 'Citation network analysis.',
    body:
      'Map how authority, precedent, and reasoning move through a body of decisions over time, ' +
      'turning a flat case list into an intellectual genealogy.',
  },
  {
    title: 'Economic interpretation.',
    body:
      'Use economics \u2014 industrial organization, competition theory, regulatory economics \u2014 ' +
      'to make sense of what the first two steps surface, and to find the next question.',
  },
];

const FLAGSHIP = [
  {
    id: 'quarter-century',
    status: 'Published',
    statusMeta: 'SSRN, 2025',
    title: "A Quarter-Century Analysis of the Turkish Competition Board\u2019s Decisions",
    coauthors: 'with C. Peker and M. Uyer',
    summary: [
      'We took all 3,369 decisions the Turkish Competition Board published over roughly ' +
      'twenty-five years and analyzed them as one dataset \u2014 something nobody had done before. ' +
      'Combining NLP and economic analysis, the paper traces how the Board has reasoned, ruled, ' +
      'and shifted across industries and decision types over a quarter-century. Patterns that ' +
      'would take a team months to find by hand show up in days.',
      'The dataset itself is part of the contribution. Building it opened the door to a ' +
      'research program, including the citation network study below.',
    ],
    why: [
      "It shows that a national agency\u2019s full decision record can be treated as a research-grade dataset.",
      "It maps how the agency\u2019s practice has moved across industries and over time.",
      'And it makes a larger claim. As we put it in the paper: \u201Cthis research demonstrates ' +
      'the potential of large language models to open up new avenues of inquiry in ' +
      'text-intensive disciplines such as law and economics.\u201D',
    ],
    cta: { label: 'Read on SSRN', href: '#', external: true },
  },
  {
    id: 'intellectual-dna',
    status: 'Published',
    statusMeta: 'SSRN, 2026',
    title: 'The Intellectual DNA of the Turkish Competition Board',
    coauthors: 'with C. Peker and M. Üyer',
    summary: [
      'The follow-up to the 2025 paper. An AI model read all 9,995 published decisions of ' +
      'the Turkish Competition Board \u2014 roughly thirty years of case law \u2014 and extracted ' +
      "the 18,513 citations connecting them. Network analysis did the rest: the paper makes the Board\u2019s " +
      '\u201Cintellectual DNA\u201D \u2014 its citation backbone, its conceptual lineages, the points ' +
      'where doctrine shifts \u2014 visible as a graph rather than an anecdote.',
      'Methodologically, the paper combines two techniques that competition-law ' +
      'research rarely uses together: AI-assisted extraction of structured information from ' +
      'regulatory text at scale, and network analysis of the resulting citation web. Nothing ' +
      'like it exists for the Turkish setting, and there are few examples anywhere.',
    ],
    whyLabel: 'What we found',
    why: [
      "The Board\u2019s most influential decision attracts just ten direct citations.",
      'Reliance on EU case law follows a U-curve: early dependence, then autonomization, then re-engagement.',
      'Doctrine-shifting decisions become the canon within three years. How fast a decision gets cited predicts its staying power.',
    ],
    cta: { label: 'Read on SSRN', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258', external: true },
  },
];

/* Citation primitives — authors render bold, titles italic, venue italic where source uses it. */
const PUBS_BOOKS = [
  {
    authors: 'Eroğlu, M., Finger, M., & Köksal, E. (Eds.).',
    year: '2024',
    title: 'The Economics and Regulation of Digitalisation: The Case of Türkiye.',
    venue: 'Routledge.',
    href: '#',
  },
  {
    authors: 'Köksal, E., & Bakış, O.',
    year: '2024',
    title: 'Digitalization of Society — Türkiye Digital Society Index.',
    venue: 'In The Economics and Regulation of Digitalisation (pp. 136–154). Routledge.',
    venueItalic: 'The Economics and Regulation of Digitalisation',
    href: '#',
  },
  {
    authors: 'Finger, M., Köksal, E., & Eroğlu, M.',
    year: '2024',
    title: 'Setting the Scene.',
    venue: 'In The Economics and Regulation of Digitalisation (pp. 1–20). Routledge.',
    venueItalic: 'The Economics and Regulation of Digitalisation',
    href: '#',
  },
];

const PUBS_ARTICLES = [
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2022',
    title: "Turkish Competition Authority\u2019s First Hub-and-Spoke Cartel Decision.",
    venue: 'Journal of European Competition Law & Practice, 13(8), 566–570.',
    venueItalic: 'Journal of European Competition Law & Practice',
    href: '#',
  },
  {
    authors: 'Aydınonat, N. E. & Köksal, E.',
    year: '2019',
    title: "Explanatory Value in Context: The Curious Case of Hotelling\u2019s Location Model.",
    venue: 'The European Journal of the History of Economic Thought, 26(5), 879–910.',
    venueItalic: 'The European Journal of the History of Economic Thought',
    href: '#',
  },
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2018',
    title: 'Regulatory and Market Disharmony in the Turkish Electricity Industry.',
    venue: 'Utilities Policy, 55, 90–98.',
    venueItalic: 'Utilities Policy',
    href: '#',
  },
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2018',
    title:
      "Diverging Approaches in Europe for the Most Favoured-Customer Clauses: How Turkish Competition Authority\u2019s Decision for the Online Food Ordering Market Contributed.",
    venue: 'Journal of European Competition Law & Practice, 9(2), 119–123.',
    venueItalic: 'Journal of European Competition Law & Practice',
    href: '#',
  },
  {
    authors: 'Gürakar, E. & Köksal, E.',
    year: '2016',
    title: 'Institutional Evolution and Economic Development in Iran and Turkey.',
    venue: 'Middle East Development Journal, 8(1), 32–64.',
    venueItalic: 'Middle East Development Journal',
    href: '#',
  },
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2015',
    title: 'Reviewing Regulatory Policy for Broadband in Turkey.',
    venue: 'Competition and Regulation in Network Industries, 16(4), 354–377.',
    venueItalic: 'Competition and Regulation in Network Industries',
    href: '#',
  },
  {
    authors: 'Köksal, E.',
    year: '2011',
    title: 'Network Neutrality and Quality of Service: A Two-Sided Market Analysis.',
    venue: 'International Journal of Management and Network Economics, 2(1), 39–57.',
    venueItalic: 'International Journal of Management and Network Economics',
    href: '#',
  },
];

const PUBS_CHAPTERS = [
  {
    authors: 'Köksal, E. & Ak, A.',
    year: '2024',
    title: 'Neo-Brandeisian Traces in the New E-Commerce Act.',
    venue: 'On İki Levha.',
    note: '(in Turkish)',
    href: '#',
  },
  {
    authors: 'Köksal, E., İkiler, B., & Canbeyli, A.',
    year: '2023',
    title: 'Law and Economics of the 2021 Retail Decision.',
    venue: 'On İki Levha.',
    note: '(in Turkish)',
    href: '#',
  },
  {
    authors: 'Köksal, E.',
    year: '2021',
    title: 'Regulation of Fiber and the Internet.',
    venue: 'In Finger & Eroğlu (Eds.), Regulation of Turkish Network Industries (pp. 383–401). Springer.',
    venueItalic: 'Regulation of Turkish Network Industries',
    href: '#',
  },
];

const PUBS_REPORTS = [
  {
    authors: 'Köksal, E., Peker, C. & Üyer, M.',
    year: '2026',
    title: 'The Intellectual DNA of the Turkish Competition Board.',
    venue: 'SSRN.',
    venueItalic: 'SSRN',
    href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258',
    highlight: true,
  },
  {
    authors: 'Köksal, E., Peker, C. & Uyer, M.',
    year: '2025',
    title: "A Quarter-Century Analysis of the Turkish Competition Board\u2019s Decisions: An AI-Supported Examination.",
    venue: 'SSRN.',
    venueItalic: 'SSRN',
    href: '#',
    highlight: true,
  },
  {
    authors: 'Köksal, E. & Bakış, O.',
    year: '2023',
    title: 'Türkiye Digital Society Index.',
    venue: 'Betam Research Note, 23/269.',
    href: '#',
  },
  {
    authors: 'Bakış, O., Tetikol-Dalgıç, D. E., Deniz, P., Finger, M., Gümüş, İ., & Köksal, E.',
    year: '2022',
    title: "Assessment of a Carbon Tax as a Tool to Decarbonize Türkiye\u2019s Energy Supply 2050.",
    venue: 'IC4R Report Series No. 1.',
    href: '#',
  },
];

const INTERESTS = [
  {
    lead: 'Generative AI and economics',
    body: '— research methods, agentic workflows, AI-assisted analysis of legal and regulatory corpora.',
  },
  {
    lead: 'Industrial economics & competition policy',
    body: '— competition cases, theory of harm, market definition, cartels, vertical restraints.',
  },
  {
    lead: 'Platform economics & digital regulation',
    body: '— multi-sided markets, platform governance, digital market regulation.',
  },
  {
    lead: 'Digitalization',
    body: '— measurement, policy, structural change.',
  },
  {
    lead: 'Climate economics',
    body: '— carbon pricing, decarbonization, regulation.',
  },
];

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function ResearchHero() {
  return (
    <section style={{ position: 'relative', padding: '100px 0 80px' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: -30, top: 60, zIndex: 0 }}>
          <GhostHeadline>Research</GhostHeadline>
        </div>
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96 }}>
          <Eyebrow>Research</Eyebrow>
          <h1 className="display" style={{ margin: '28px 0 32px', maxWidth: 1100 }}>
            AI-native economic research
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(20px, 2vw, 28px)',
            fontWeight: 500, letterSpacing: '-.02em',
            lineHeight: 1.22, color: '#141413',
            margin: '0 0 32px', maxWidth: 880,
          }}>
            Using AI as a primary method to ask economic and competition-law questions
            that were previously infeasible at scale
          </p>
          <p style={{
            fontSize: 18, lineHeight: 1.55, color: '#262627',
            maxWidth: 780, margin: 0,
          }}>
            Plenty of researchers write about AI. I&rsquo;d rather use it. Over the past
            few years I&rsquo;ve rebuilt part of my research practice around frontier AI
            tools: large-scale analysis of legal texts, citation-network mapping, and
            economic interpretation of regulatory corpora. The projects below are the
            result. The publication record underneath shows where the questions come from.
          </p>
        </div>
      </div>
    </section>
  );
}

function MethodSignature() {
  return (
    <section style={{
      background: '#141413', color: '#F3F0EE',
      padding: '128px 0', position: 'relative', overflow: 'hidden',
      marginTop: 48,
    }}>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Eyebrow color="rgba(255,255,255,.85)" dotColor="#F37338">Method</Eyebrow>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(34px, 4.6vw, 76px)',
          fontWeight: 500, letterSpacing: '-.025em',
          lineHeight: 1.08, color: '#F3F0EE',
          margin: '28px 0 0', maxWidth: 1100,
          fontStyle: 'italic',
        }}>
          AI-powered analysis of legal corpora — turning regulatory text into research-grade
          economic evidence
        </h2>

        <p style={{
          fontSize: 18, lineHeight: 1.55, color: 'rgba(243,240,238,.85)',
          margin: '56px 0 48px', maxWidth: 820,
        }}>
          The method pairs three things:
        </p>

        <ol style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
        }}>
          {METHOD_STEPS.map((step, i) => (
            <li key={i} style={{
              padding: '32px 0 0',
              borderTop: '1px solid rgba(255,255,255,.3)',
            }}>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 48, fontWeight: 500,
                letterSpacing: '-.02em', lineHeight: 1,
                color: '#F37338', marginBottom: 24,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500,
                letterSpacing: '-.022em', lineHeight: 1.2,
                color: '#F3F0EE', margin: '0 0 14px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 15, lineHeight: 1.55,
                color: 'rgba(243,240,238,.78)', margin: 0,
              }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p style={{
          fontSize: 17, lineHeight: 1.55,
          color: 'rgba(243,240,238,.85)',
          margin: '56px 0 0', maxWidth: 880,
        }}>
          The combination is what makes the work AI-native rather than AI-flavored: each step
          depends on the others, and none works as well alone.
        </p>
      </div>
    </section>
  );
}

function FlagshipProjects() {
  return (
    <section id="flagship" style={{ padding: '128px 0 96px', scrollMarginTop: 120 }}>
      <div className="container">
        <div style={{ maxWidth: 880, marginBottom: 80 }}>
          <Eyebrow>Flagship projects</Eyebrow>
          <h2 className="display--mid" style={{ margin: '20px 0 0' }}>
            Two projects, one program
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {FLAGSHIP.map((p) => <FlagshipCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}

function FlagshipCard({ project }) {
  const isForthcoming = project.status === 'Forthcoming';
  return (
    <article style={{
      background: '#FCFBFA',
      borderRadius: 40,
      padding: 48,
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 56,
    }}>
      <div>
        <StatusPill status={project.status} meta={project.statusMeta} />
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(26px, 2.8vw, 40px)',
          fontWeight: 500, letterSpacing: '-.022em', lineHeight: 1.1,
          margin: '20px 0 12px',
        }}>
          <em>{project.title}</em>
        </h3>
        {project.workingTitle && (
          <p style={{
            fontSize: 15, color: '#555', margin: '0 0 16px',
            lineHeight: 1.4,
          }}>
            <span style={{ fontWeight: 500, color: '#141413' }}>Working title: </span>
            <em>{project.workingTitle}</em>
          </p>
        )}
        {project.coauthors && (
          <p style={{
            fontSize: 14, fontWeight: 700, letterSpacing: '.04em',
            textTransform: 'uppercase', color: '#9A3A0A',
            margin: '0 0 24px',
          }}>
            Co-authors · {project.coauthors}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {project.summary.map((para, i) => (
            <p key={i} style={{
              fontSize: 16, lineHeight: 1.55, color: '#262627', margin: 0,
            }}>
              {para}
            </p>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <Button variant="primary" href={project.cta.href}
            target={project.cta.external ? '_blank' : undefined}>
            {project.cta.label} <IconArrow size={14} dir="up-right" />
          </Button>
        </div>
      </div>

      <div style={{
        padding: '32px 0 0',
        borderTop: '1.5px solid #141413',
      }}>
        <h4 style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
          letterSpacing: '.04em', textTransform: 'uppercase',
          margin: '0 0 20px',
        }}>
          {project.whyLabel || 'Why it matters'}
        </h4>
        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {project.why.map((w, i) => (
            <li key={i} style={{
              display: 'flex', gap: 14,
              fontSize: 15, lineHeight: 1.55, color: '#262627',
            }}>
              <span style={{
                flexShrink: 0, marginTop: 9, width: 6, height: 6,
                borderRadius: '50%', background: '#F37338',
              }} />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function StatusPill({ status, meta }) {
  const isPublished = status === 'Published';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '8px 18px', borderRadius: 999,
      background: isPublished ? '#141413' : 'transparent',
      color: isPublished ? '#F3F0EE' : '#141413',
      border: isPublished ? 'none' : '1.5px dashed rgba(20,20,19,.55)',
      fontSize: 12, fontWeight: 700, letterSpacing: '.06em',
      textTransform: 'uppercase',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: isPublished ? '#F37338' : '#9A3A0A',
      }} />
      {status}
      {meta && (
        <span style={{
          fontWeight: 500, letterSpacing: '.04em', opacity: .8,
        }}>
          · {meta}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Selected publications                                              */
/* ------------------------------------------------------------------ */

function SelectedPublications() {
  return (
    <section id="publications" style={{ padding: '64px 0 96px', scrollMarginTop: 120 }}>
      <div className="container">
        <div style={{ maxWidth: 880, marginBottom: 56 }}>
          <Eyebrow>Selected publications</Eyebrow>
          <h2 className="display--mid" style={{ margin: '20px 0 24px' }}>
            Where the questions come from
          </h2>
          <p style={{
            fontSize: 18, lineHeight: 1.55, color: '#262627',
            margin: 0, maxWidth: 720,
          }}>
            The AI-native work above grows out of twenty years of research on competition policy,
            network industries, and digital regulation. A curated subset is below;
            the full list lives on the <a href="cv.html" style={{
              color: '#141413', textDecoration: 'underline', textUnderlineOffset: 3,
            }}>CV page</a>.
          </p>
        </div>

        <PubGroup title="Books & edited volumes" items={PUBS_BOOKS} />
        <PubGroup title="Selected peer-reviewed journal articles" items={PUBS_ARTICLES} />
        <PubGroup title="Selected book chapters" items={PUBS_CHAPTERS} />
        <PubGroup title="Selected reports & working papers" items={PUBS_REPORTS} />

        <p style={{
          fontSize: 15, color: '#555', margin: '24px 0 0',
        }}>
          Full publication list: <a href="cv.html" style={{
            color: '#141413', textDecoration: 'underline', textUnderlineOffset: 3,
          }}>/cv</a>.
        </p>
      </div>
    </section>
  );
}

function PubGroup({ title, items }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
        letterSpacing: '.04em', textTransform: 'uppercase',
        color: '#141413', margin: '0 0 8px',
      }}>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((p, i) => (
          <li key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr auto',
            gap: 24, alignItems: 'baseline',
            padding: '22px 0',
            borderTop: '1px solid rgba(20,20,19,.12)',
            borderBottom: i === items.length - 1 ? '1px solid rgba(20,20,19,.12)' : 'none',
          }}>
            <span style={{ fontSize: 14, color: '#555', whiteSpace: 'nowrap' }}>{p.year}</span>
            <div>
              <p style={{
                fontSize: 17, lineHeight: 1.5, color: '#141413', margin: 0,
              }}>
                <strong style={{ fontWeight: 500 }}>{p.authors}</strong>{' '}
                ({p.year}). <em>{p.title}</em>{' '}
                {p.venueItalic ? (
                  <RenderVenue text={p.venue} italic={p.venueItalic} />
                ) : (
                  <span>{p.venue}</span>
                )}
                {p.note && <span style={{ color: '#555' }}> {p.note}</span>}
              </p>
            </div>
            <a href={p.href} target="_blank" rel="noopener noreferrer" style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1px solid rgba(20,20,19,.4)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: '#141413', textDecoration: 'none', flexShrink: 0,
            }}>
              <IconArrow size={12} dir="up-right" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Renders a venue string with one phrase italicized */
function RenderVenue({ text, italic }) {
  const idx = text.indexOf(italic);
  if (idx < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <em>{italic}</em>
      {text.slice(idx + italic.length)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Research interests                                                 */
/* ------------------------------------------------------------------ */

function ResearchInterests() {
  return (
    <section id="interests" style={{
      background: '#FCFBFA', padding: '128px 0',
      scrollMarginTop: 120,
    }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80,
          alignItems: 'start',
        }}>
          <div>
            <Eyebrow>Active interests</Eyebrow>
            <h2 className="display--mid" style={{ margin: '20px 0 0', maxWidth: 460 }}>
              Active interests
            </h2>
          </div>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            {INTERESTS.map((it, i) => (
              <li key={i} style={{
                display: 'flex', gap: 18,
                paddingBottom: 20,
                borderBottom: i === INTERESTS.length - 1 ? 'none' : '1px solid rgba(20,20,19,.12)',
              }}>
                <span style={{
                  flexShrink: 0, marginTop: 11, width: 6, height: 6,
                  borderRadius: '50%', background: '#F37338',
                }} />
                <p style={{
                  fontSize: 17, lineHeight: 1.55, color: '#262627', margin: 0,
                }}>
                  <strong style={{ fontWeight: 500, color: '#141413' }}>{it.lead}</strong>{' '}
                  {it.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing CTA                                                        */
/* ------------------------------------------------------------------ */

function ResearchClosingCTA() {
  return (
    <section style={{ padding: '128px 0' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 64, alignItems: 'end',
        }}>
          <h2 className="display--mid" style={{ margin: 0, maxWidth: 760 }}>
            Collaborating on AI-native economic or legal research?
          </h2>
          <div>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: '#262627',
              margin: '0 0 28px', maxWidth: 460,
            }}>
              If you work on AI methods for legal or regulatory text, on citation networks, on
              competition-policy research, or on research infrastructure for economists
              and lawyers — send me a note. There aren&rsquo;t many of us yet.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" href="contact.html">
                Get in touch <IconArrow size={14} dir="up-right" />
              </Button>
              <Button variant="ghost" href="cv.html">
                Read the CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function ResearchApp() {
  return (
    <>
      <Nav active="Research" />
      <main>
        <ResearchHero />
        <MethodSignature />
        <FlagshipProjects />
        <SelectedPublications />
        <ResearchInterests />
        <ResearchClosingCTA />
      </main>
      <Footer />
    </>
  );
}

export default ResearchApp;

/* Research page — AI-native research program. Emin Style v1.2 (2026-11-25).
   Copy lives in content/research.md; styles in public/assets/v2.css (shared) and
   research.css (rs- classes). Every figure and chart on this page is taken from the
   papers themselves: the network from the 2026 paper's citation data, the EU-law
   shares from its Section IV.5. */
import React from 'react';
import { Eyebrow, Nav, Footer } from './shared.jsx';
import { useReveal, ArrowUpRight, Btn, CoralClose } from './v2.jsx';
import CitationNetwork from './citation-network.jsx';

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const METHOD_STEPS = [
  {
    title: 'Large-scale AI analysis of legal texts',
    body:
      "Treat a national authority’s full decision record as a single queryable dataset, " +
      'then use AI to extract concepts, parties, holdings, and reasoning patterns at a ' +
      'granularity manual review cannot reach.',
  },
  {
    title: 'Citation network analysis',
    body:
      'Map how authority, precedent, and reasoning move through a body of decisions over time, ' +
      'turning a flat case list into an intellectual genealogy.',
  },
  {
    title: 'Economic interpretation',
    body:
      'Use economics (industrial organization, competition theory, regulatory economics) ' +
      'to make sense of what the first two steps surface, and to find the next question.',
  },
];

/* surface: how the card separates from the page (sunken, ink, line).
   figure: a coral figure with a mono label. network: the card opens with the citation network.
   chart: the EU-law chart sits under the finding with the same index. */
const FLAGSHIP = [
  {
    id: 'quarter-century',
    surface: 'sunken',
    status: 'Published',
    statusMeta: 'SSRN, 2025',
    figure: { n: 3369, label: 'infringement decisions, twenty-five years, one dataset' },
    title: "A Quarter-Century Analysis of the Turkish Competition Board’s Decisions",
    coauthors: 'with C. Peker and M. Üyer',
    summary: [
      'We took all 3,369 infringement decisions the Turkish Competition Board published over roughly ' +
      'twenty-five years and analyzed them as one dataset, which nobody had done before. ' +
      "Combining NLP with economic analysis, the paper traces how the Board’s reasoning and " +
      'rulings moved across industries and decision types. Patterns that would have taken a ' +
      'team months to find by hand showed up in days.',
      'The dataset itself is part of the contribution. Building it opened the door to a ' +
      'research program, including the citation network study below.',
    ],
    why: [
      "It shows that a national agency’s full decision record can be treated as a research dataset.",
      "It maps how the agency’s practice has moved across industries and over time.",
      'And it makes a larger claim. As we put it in the paper: “this research demonstrates ' +
      'the potential of large language models to open up new avenues of inquiry in ' +
      'text-intensive disciplines such as law and economics.”',
    ],
    cta: { label: 'Read on SSRN', href: 'https://ssrn.com/abstract=5731282', external: true },
  },
  {
    id: 'intellectual-dna',
    surface: 'ink',
    network: true,
    status: 'Published',
    statusMeta: 'SSRN, 2026',
    title: 'The Intellectual DNA of the Turkish Competition Board',
    coauthors: 'with C. Peker and M. Üyer',
    summary: [
      'The follow-up to the 2025 paper. An AI model read all 9,995 published decisions of ' +
      'the Turkish Competition Board, roughly thirty years of case law, and extracted ' +
      'the 18,513 citations connecting them. Network analysis did the rest. The paper draws ' +
      "the Board’s “intellectual DNA” as a graph: which decisions carry the case " +
      'law, how its concepts descend from one another, and where the doctrine changed course.',
      'Methodologically, the paper combines two techniques that competition-law ' +
      'research rarely uses together: AI-assisted extraction of structured information from ' +
      'regulatory text at scale, and network analysis of the resulting citation web. Nothing ' +
      'like it exists for the Turkish setting, and there are few examples anywhere.',
    ],
    whyLabel: 'What we found',
    why: [
      "The Board’s most influential decision attracts just 10 direct citations. Authority in " +
      'this case law is spread across many rulings, and no small set of landmarks dominates.',
      'Reliance on EU case law follows a U-curve: early dependence, then autonomization, then re-engagement.',
      'Doctrine-shifting decisions become the canon within three years. How fast a decision gets cited predicts its staying power.',
    ],
    chartAt: 1,
    cta: { label: 'Read on SSRN', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258', external: true },
  },
  {
    id: 'crystal-ball',
    surface: 'line',
    status: 'In progress',
    statusMeta: '2027',
    title:
      'How Predictable Is the Competition Board? A “Crystal Ball” Experiment with ' +
      'Thirty Years of Case Law and Artificial Intelligence',
    coauthors: 'with F. G. Bilgin and C. Karataş',
    summary: [
      'Predictability is what legal certainty looks like in daily practice. A firm that drafts a ' +
      'distribution agreement, plans an acquisition, or assesses its own exemption is guessing ' +
      'how the Board would rule in a similar case, and the guess rests on the case law. How far ' +
      'that case law can be predicted has, as far as we know, never been measured.',
      'We turn the question into an experiment. The model is not trained on the decisions; for ' +
      'every case it finds and reads the relevant precedents again. Each year gets its own run: ' +
      'the decisions and citation links the model can reach stop at the start of that year, it is ' +
      'given only the facts of the following year’s cases, and it has to predict what the ' +
      'Board decided. Set against the real outcomes, the predictions give a predictability ' +
      'series, year by year.',
      'Three things can mislead such an experiment. The model may remember a decision instead ' +
      'of inferring it, so we test on decisions published after its training. Most mergers are ' +
      'cleared, so a guess of “always cleared” is right most of the time, and the model is ' +
      'scored against that guess. And a wrong prediction is not always a change of course, so ' +
      'the lawyers on the team read every miss.',
    ],
    whyLabel: 'What we are asking',
    why: [
      "Did the 2020 amendment to the Competition Act, new guidelines, and changes in the Board’s " +
      "membership lower the model’s accuracy?",
      'Are cartel cases more predictable than mergers?',
      'Do the decisions that gather citations fastest, the ones that turn the case law, fall in ' +
      'the periods where the model is most often wrong?',
    ],
  },
];

/* EU-law share of the Board's citations by five-year period, as reported in the 2026 paper
   (Section IV.5; computed from the citation data, 12.3 percent over the whole record). */
const EU_SHARE = [
  { from: 2000, to: 2005, label: '2000–05', value: 22.7 },
  { from: 2006, to: 2010, label: '2006–10', value: 15.3 },
  { from: 2011, to: 2015, label: '2011–15', value: 7.1 },
  { from: 2016, to: 2020, label: '2016–20', value: 12.1 },
  { from: 2021, to: 2025, label: '2021–25', value: 12.3 },
];

/* Citation primitives — authors render bold, titles italic, venue italic where source uses it. */
const PUBS_BOOKS = [
  {
    authors: 'Eroğlu, M., Finger, M., & Köksal, E. (Eds.).',
    year: '2024',
    title: 'The Economics and Regulation of Digitalisation: The Case of Türkiye.',
    venue: 'Routledge.',
    href: 'https://doi.org/10.4324/9781032692937',
  },
  {
    authors: 'Köksal, E., & Bakış, O.',
    year: '2024',
    title: 'Digitalization of Society: Türkiye Digital Society Index.',
    venue: 'In The Economics and Regulation of Digitalisation (pp. 136–154). Routledge.',
    venueItalic: 'The Economics and Regulation of Digitalisation',
    href: 'https://doi.org/10.4324/9781032692937',
  },
  {
    authors: 'Finger, M., Köksal, E., & Eroğlu, M.',
    year: '2024',
    title: 'Setting the Scene.',
    venue: 'In The Economics and Regulation of Digitalisation (pp. 1–20). Routledge.',
    venueItalic: 'The Economics and Regulation of Digitalisation',
    href: 'https://doi.org/10.4324/9781032692937',
  },
];

const PUBS_ARTICLES = [
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2022',
    title: "Turkish Competition Authority\u2019s First Hub-and-Spoke Cartel Decision.",
    venue: 'Journal of European Competition Law & Practice, 13(8), 566–570.',
    venueItalic: 'Journal of European Competition Law & Practice',
    href: 'https://doi.org/10.1093/jeclap/lpac045',
  },
  {
    authors: 'Aydınonat, N. E. & Köksal, E.',
    year: '2019',
    title: "Explanatory Value in Context: The Curious Case of Hotelling\u2019s Location Model.",
    venue: 'The European Journal of the History of Economic Thought, 26(5), 879–910.',
    venueItalic: 'The European Journal of the History of Economic Thought',
    href: 'https://doi.org/10.1080/09672567.2019.1626460',
  },
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2018',
    title: 'Regulatory and Market Disharmony in the Turkish Electricity Industry.',
    venue: 'Utilities Policy, 55, 90–98.',
    venueItalic: 'Utilities Policy',
    href: 'https://doi.org/10.1016/j.jup.2018.10.001',
  },
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2018',
    title:
      "Diverging Approaches in Europe for the Most Favoured-Customer Clauses: How Turkish Competition Authority\u2019s Decision for the Online Food Ordering Market Contributed.",
    venue: 'Journal of European Competition Law & Practice, 9(2), 119–123.',
    venueItalic: 'Journal of European Competition Law & Practice',
    href: 'https://doi.org/10.1093/jeclap/lpx091',
  },
  {
    authors: 'Gürakar, E. & Köksal, E.',
    year: '2016',
    title: 'Institutional Evolution and Economic Development in Iran and Turkey.',
    venue: 'Middle East Development Journal, 8(1), 32–64.',
    venueItalic: 'Middle East Development Journal',
    href: 'https://doi.org/10.1080/17938120.2016.1150008',
  },
  {
    authors: 'Köksal, E. & Ardıyok, Ş.',
    year: '2015',
    title: 'Reviewing Regulatory Policy for Broadband in Turkey.',
    venue: 'Competition and Regulation in Network Industries, 16(4), 354–377.',
    venueItalic: 'Competition and Regulation in Network Industries',
    href: 'https://doi.org/10.1177/178359171501600403',
  },
  {
    authors: 'Köksal, E.',
    year: '2011',
    title: 'Network Neutrality and Quality of Service: A Two-Sided Market Analysis.',
    venue: 'International Journal of Management and Network Economics, 2(1), 39–57.',
    venueItalic: 'International Journal of Management and Network Economics',
    href: 'https://doi.org/10.1504/ijmne.2011.042579',
  },
];

const PUBS_CHAPTERS = [
  {
    authors: 'Köksal, E. & Ak, A.',
    year: '2024',
    title: 'Neo-Brandeisian Traces in the New E-Commerce Act.',
    venue: 'On İki Levha.',
    note: '(in Turkish)',
  },
  {
    authors: 'Köksal, E., İkiler, B., & Canbeyli, A.',
    year: '2023',
    title: 'Law and Economics of the 2021 Retail Decision.',
    venue: 'On İki Levha.',
    note: '(in Turkish)',
  },
  {
    authors: 'Köksal, E.',
    year: '2021',
    title: 'Regulation of Fiber and the Internet.',
    venue: 'In Finger & Eroğlu (Eds.), Regulation of Turkish Network Industries (pp. 383–401). Springer.',
    venueItalic: 'Regulation of Turkish Network Industries',
    href: 'https://doi.org/10.1007/978-3-030-81720-6_19',
  },
];

const PUBS_REPORTS = [
  {
    authors: 'Köksal, E., Peker, C. & Üyer, M.',
    year: '2026',
    title: 'The Intellectual DNA of the Turkish Competition Board: Mapping Three Decades of Case Law Through Citation Networks.',
    venue: 'SSRN.',
    venueItalic: 'SSRN',
    href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258',
    highlight: true,
  },
  {
    authors: 'Köksal, E., Peker, C. & Üyer, M.',
    year: '2025',
    title: "A Quarter-Century Analysis of the Turkish Competition Board\u2019s Decisions: An AI-Supported Examination.",
    venue: 'SSRN.',
    venueItalic: 'SSRN',
    href: 'https://ssrn.com/abstract=5731282',
    highlight: true,
  },
  {
    authors: 'Köksal, E. & Bakış, O.',
    year: '2023',
    title: 'Türkiye Digital Society Index.',
    venue: 'Betam Research Note, 23/269.',
    href: 'https://betam.bahcesehir.edu.tr/2023/03/turkiye-dijital-toplum-endeksi/',
  },
  {
    authors: 'Bakış, O., Tetikol-Dalgıç, D. E., Deniz, P., Finger, M., Gümüş, İ., & Köksal, E.',
    year: '2022',
    title: "Assessment of a Carbon Tax as a Tool to Decarbonize Turkey\u2019s Energy Supply 2050.",
    venue: 'IC4R Report Series No. 1.',
    href: 'https://www.ic4r.net/2022/04/27/assesment-of-a-carbon-tax-as-a-tool-to-decorbonize-turkeys-energy-supply-2050/',
  },
];

const INTERESTS = [
  {
    lead: 'Generative AI and economics',
    body: 'research methods, agentic workflows, AI-assisted analysis of legal and regulatory corpora.',
  },
  {
    lead: 'Industrial economics & competition policy',
    body: 'competition cases, theory of harm, market definition, cartels, vertical restraints.',
  },
  {
    lead: 'Platform economics & digital regulation',
    body: 'multi-sided markets, platform governance, digital market regulation.',
  },
  {
    lead: 'Digitalization',
    body: 'measurement, policy, structural change.',
  },
  {
    lead: 'Climate economics',
    body: 'carbon pricing, decarbonization, regulation.',
  },
];

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function ResearchHero() {
  return (
    <section className="rs-hero">
      <div className="container">
        <div data-reveal>
          <div data-r><Eyebrow>Research</Eyebrow></div>
          <h1 className="rs-display" data-r style={{ '--i': 1 }}>AI-native economic research</h1>
        </div>
        <div className="rs-hero__grid" data-reveal>
          <div>
            <p className="rs-lede" data-r style={{ '--i': 2 }}>
              Using AI as the method to ask economic and competition-law questions too
              large to ask by hand
            </p>
            <p className="rs-body" data-r style={{ '--i': 3 }}>
              Say a careful reader needs half an hour for one decision of the Turkish
              Competition Board. The Board has published 9,995 of them, so reading the lot
              once would take some 5,000 hours, two and a half working years, before anyone
              drew a single conclusion. That arithmetic is why the record had never been
              studied as a whole, and why I rebuilt part of my research practice around
              AI. The two papers below are the result, and a third project is under way. The
              publications underneath show where the questions come from.
            </p>
          </div>
          <div className="rs-hero__fig" data-r style={{ '--i': 4 }}>
            <span className="rs-rule v2-draw" style={{ '--i': 4 }} />
            <strong data-count="5000">5,000</strong>
            <span>hours to read all 9,995 published decisions once, at half an hour each</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodSignature() {
  return (
    <section className="rs-method">
      <div className="container">
        <div data-reveal>
          <div data-r><Eyebrow color="#B9B6AB">Method</Eyebrow></div>
          <h2 data-r style={{ '--i': 1 }}>
            AI-powered analysis of legal corpora: regulatory text turned into economic
            evidence
          </h2>
          <p className="rs-method__intro" data-r style={{ '--i': 2 }}>The method combines three steps:</p>
        </div>
        <ol className="rs-steps" data-reveal>
          {METHOD_STEPS.map((step, i) => (
            <li className="rs-step" key={step.title} data-r style={{ '--i': i }}>
              <span className="rs-rule v2-draw" style={{ '--i': i }} />
              <div className="rs-step__n">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="rs-method__close" data-reveal>
          <span data-r>
            The combination is what makes the work AI-native rather than AI-flavored: each step
            depends on the others, and none works as well alone.
          </span>
        </p>
      </div>
    </section>
  );
}

function FlagshipProjects() {
  return (
    <section id="flagship" className="rs-flagship">
      <div className="container">
        <div className="rs-head" data-reveal>
          <div data-r><Eyebrow>Flagship projects</Eyebrow></div>
          <h2 className="v2-h2" data-r style={{ '--i': 1 }}>Three projects, one program</h2>
          <p className="v2-prose" data-r style={{ '--i': 2 }}>
            All three study the Turkish Competition Board. It is the authority I have
            worked on for twenty years, and it publishes its decisions with their
            reasoning, which is what makes a full corpus possible. The method should
            travel to any authority that does the same.
          </p>
        </div>
        <div className="rs-flags">
          {FLAGSHIP.map((p) => <FlagshipCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}

function FlagshipCard({ project }) {
  const p = project;
  return (
    <article id={p.id} className={'rs-flag rs-flag--' + p.surface} data-reveal>
      {p.network && (
        <CitationNetwork compact
          tags={[
            { node: 'top', label: 'Most cited' },
            { node: '05-71/981-270', label: 'Most influential' },
          ]}
          note={'Each dot is a decision, each line a citation, placed by decision date. Shown: the ' +
            'largest connected component, 5,359 decisions and 15,689 citations. “Most influential” ' +
            'is the decision ranked first by PageRank'} />
      )}
      <div className="rs-flag__body">
        <div data-r>
          <StatusPill status={p.status} meta={p.statusMeta} />
          {p.figure && (
            <div className="rs-flag__fig">
              <strong data-count={p.figure.n}>{p.figure.n.toLocaleString('en-US')}</strong>
              <span>{p.figure.label}</span>
            </div>
          )}
          <h3>{p.title}</h3>
          <p className="rs-flag__co">Co-authors · {p.coauthors}</p>
          <div className="rs-flag__sum">
            {p.summary.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          {p.cta && (
            <div className="rs-flag__cta">
              <Btn variant={p.surface === 'ink' ? 'paper' : undefined} href={p.cta.href} external={p.cta.external}>
                {p.cta.label} <ArrowUpRight />
              </Btn>
            </div>
          )}
        </div>
        <div className="rs-flag__side" data-r style={{ '--i': 1 }}>
          <span className="rs-rule v2-draw" style={{ '--i': 1 }} />
          <h4>{p.whyLabel || 'Why it matters'}</h4>
          <ul className="rs-points">
            {p.why.map((w, i) => (
              <li key={i}>
                {w}
                {p.chartAt === i && <EuShareChart />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function StatusPill({ status, meta }) {
  return (
    <div className={'rs-pill' + (status === 'Published' ? '' : ' rs-pill--open')}>
      <span className="rs-pill__node" />
      {status}
      {meta && <span className="rs-pill__meta">· {meta}</span>}
    </div>
  );
}

/* One series, five periods: each period is a bar of its own width in time, set at its share.
   Drawn for the ink card; values are printed, so the chart reads without colour or hover. */
function EuShareChart() {
  const W = 400, H = 196, L = 30, R = 6, T = 26, B = 30;
  const x = (yr) => L + (yr - 2000) / 26 * (W - L - R);
  const y = (v) => T + (1 - v / 25) * (H - T - B);
  return (
    <figure className="rs-chart">
      <figcaption>EU-law share of the Board&rsquo;s citations, by five-year period</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img"
        aria-label={'Share of the Board’s citations that go to European Commission and EU court decisions: ' +
          EU_SHARE.map((d) => `${d.from} to ${d.to}, ${d.value} percent`).join('; ')}>
        {[0, 10, 20].map((v) => (
          <g key={v}>
            <line className="rs-chart__grid" x1={L} x2={W - R} y1={y(v)} y2={y(v)} />
            <text className="rs-chart__tick" x={L - 8} y={y(v) + 3.5} textAnchor="end">{v}%</text>
          </g>
        ))}
        {EU_SHARE.map((d, i) => {
          const x1 = x(d.from) + 3, x2 = x(d.to + 1) - 3, mid = (x1 + x2) / 2;
          return (
            <g key={d.label} className="rs-chart__period">
              <title>{`${d.from} to ${d.to}: ${d.value} percent of the Board’s citations go to EU decisions`}</title>
              <rect className="rs-chart__hit" x={x1 - 3} y={T - 20} width={x2 - x1 + 6} height={H - T - B + 20} />
              <rect className="rs-chart__mark v2-draw" style={{ '--i': i + 2 }} x={x1} y={y(d.value) - 2} width={x2 - x1} height="4" rx="2" />
              <text className="rs-chart__value" x={mid} y={y(d.value) - 10} textAnchor="middle">{d.value}%</text>
              <text className="rs-chart__tick" x={mid} y={H - 10} textAnchor="middle">{d.label}</text>
            </g>
          );
        })}
      </svg>
      <p className="rs-chart__src">Köksal, Peker, Üyer, SSRN 2026, Section IV.5 · 12.3% over the whole record</p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Selected publications                                              */
/* ------------------------------------------------------------------ */

function SelectedPublications() {
  return (
    <section id="publications" className="rs-pubs">
      <div className="container">
        <div className="rs-head" data-reveal>
          <div data-r><Eyebrow>Selected publications</Eyebrow></div>
          <h2 className="v2-h2" data-r style={{ '--i': 1 }}>Where the questions come from</h2>
          <p className="v2-prose" data-r style={{ '--i': 2 }}>
            The AI-native work above grows out of twenty years of research on competition policy,
            network industries, and digital regulation. A curated subset is below;
            the full list lives on the <a href="cv.html">CV page</a>.
          </p>
        </div>

        <PubGroup title="Books & edited volumes" items={PUBS_BOOKS} />
        <PubGroup title="Selected peer-reviewed journal articles" items={PUBS_ARTICLES} />
        <PubGroup title="Selected book chapters" items={PUBS_CHAPTERS} />
        <PubGroup title="Selected reports & working papers" items={PUBS_REPORTS} />

        <p className="rs-pubs__more">Full publication list: <a href="cv.html">/cv</a>.</p>
      </div>
    </section>
  );
}

function PubGroup({ title, items }) {
  return (
    <div className="rs-pubgroup" data-reveal>
      <h3 data-r>{title}</h3>
      <ul data-r style={{ '--i': 1 }}>
        {items.map((p, i) => (
          <li className="rs-pub" key={i}>
            <span className="rs-pub__yr">{p.year}</span>
            <p>
              <strong>{p.authors}</strong>{' '}
              ({p.year}). <em>{p.title}</em>{' '}
              {p.venueItalic ? (
                <RenderVenue text={p.venue} italic={p.venueItalic} />
              ) : (
                <span>{p.venue}</span>
              )}
              {p.note && <span className="rs-pub__note"> {p.note}</span>}
            </p>
            {/* A few Turkish-language chapters have no stable public URL; those
                rows render without an arrow rather than with a dead link. */}
            {p.href ? (
              <a className="rs-pub__go" href={p.href} target="_blank" rel="noopener noreferrer"
                 aria-label={`Open “${p.title.replace(/\.$/, '')}” at the publisher`}>
                <ArrowUpRight size={13} width={1.4} />
              </a>
            ) : <span className="rs-pub__gap" />}
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
    <section id="interests" className="rs-interests">
      <div className="container">
        <div className="rs-interests__grid" data-reveal>
          <div data-r>
            <Eyebrow>Research interests</Eyebrow>
            <h2 className="v2-h2">Active interests</h2>
          </div>
          <ul className="rs-nodes" data-r style={{ '--i': 1 }}>
            {INTERESTS.map((it) => (
              <li key={it.lead}><strong>{it.lead}</strong>: {it.body}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function ResearchApp() {
  useReveal();
  return (
    <>
      <Nav active="Research" />
      <main className="rs">
        <ResearchHero />
        <MethodSignature />
        <FlagshipProjects />
        <SelectedPublications />
        <ResearchInterests />
        <CoralClose
          title="Collaborating on AI-native economic or legal research?"
          body={'If you work on AI methods for legal or regulatory text, on citation networks, on ' +
            'competition-policy research, or on research infrastructure for economists ' +
            'and lawyers, send me a note. There are not many of us yet.'}>
          <Btn href="contact.html">Get in touch <ArrowUpRight /></Btn>
          <Btn variant="ghost" href="cv.html">Read the CV</Btn>
        </CoralClose>
      </main>
      <Footer />
    </>
  );
}

export default ResearchApp;

/* CV page — full curriculum vitae, web version of the February 2026 PDF. */
import React from 'react';
import { IconArrow, IconSearch, IconDownload, IconChevron, Monogram, Eyebrow, GhostHeadline, Button, Portrait, SatelliteCTA, Nav, Footer, OrbitalArc } from './shared.jsx';

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


const CURRENT_POSITIONS = [
{ role: 'AI Consultant', org: 'Freelance', years: 'since 2024' },
{ role: 'Lecturer (part-time)', org: 'Bahçeşehir University', years: 'since 2024' },
{ role: 'Associate Editor-in-Chief', org: 'Competition and Regulation in Network Industries, SAGE Publishing',
  years: 'since 2018' },
{ role: 'Economic Consultant', org: 'Dentons', years: 'since 2015' }];


const PREVIOUS_POSITIONS = [
{ role: 'Associate Professor', org: 'Department of Economics, Bahçeşehir University', years: '2018–2024' },
{ role: 'Program Coordinator', org: 'Financial Economics Graduate Program, Bahçeşehir University', years: '2013–2019' },
{ role: 'Vice Dean', org: 'Faculty of Administrative and Economic Sciences, Bahçeşehir University', years: '2013–2015' },
{ role: 'Assistant Professor of Economics', org: 'Department of Economics, Bahçeşehir University', years: '2008–2018' },
{ role: 'Research Assistant', org: 'Department of Economics, Bahçeşehir University', years: '2002–2008' }];


const AFFILIATIONS = [
{ role: 'Deputy Director', org: 'Istanbul Center for Regulation (IC4R)', years: 'since 2019' },
{ role: 'Member', org: 'Network-Industries.org', years: 'since 2019' },
{ role: 'Member', org: 'Climate Change & Environment Working Group, TÜSİAD', years: 'since 2019' },
{ role: 'Member', org: 'Information and Communication Technologies Working Group, TÜSİAD', years: 'since 2018' },
{ role: 'Member', org: 'E-commerce Working Group, TÜSİAD', years: 'since 2018' },
{ role: 'Member', org: 'Digital Economy Advisory Board, US-Turkey Business Council', years: 'since 2017' },
{ role: 'Lifetime Member', org: 'International Atlantic Economic Society', years: 'since 2012' }];


const EDUCATION = [
{ years: '2004–2008', institution: 'Marmara University', degree: 'PhD in Economics' },
{ years: '2002–2004', institution: 'Galatasaray University', degree: 'MA in Public Finance' },
{ years: '1995–2001', institution: 'Galatasaray University', degree: 'BA in Economics' }];


const TEACHING_BAU = [
{ title: 'Generative AI in Economic Analysis & Research', level: 'undergraduate' },
{ title: 'Managerial Economics', level: 'MBA, PhD' },
{ title: 'Platform Business and Economics', level: 'MBA' },
{ title: 'Industrial Organization', level: 'undergraduate' },
{ title: 'Platform Economics', level: 'undergraduate' },
{ title: 'Innovation & Competition Policy in Digital Markets', level: 'undergraduate' },
{ title: 'Economics of Climate Change', level: 'undergraduate' },
{ title: 'Law & Economics', level: 'undergraduate' }];


const TEACHING_GUEST = [
{ title: 'Antitrust Economics', org: 'Bilgi University', years: '2018–2022' },
{ title: 'Competition Policy in Digital Markets', org: 'Koç University', years: '2018–2019' },
{ title: 'Regulation and Competition in Platform Industries', org: 'Istanbul Technical University', years: '2019' }];


const REFEREE_FOR = [
'Energy Policy',
'Utilities Policy',
'Telecommunications Policy',
'Competition and Regulation in Network Industries',
'Many other national journals'];


const RESEARCH_INTERESTS = [
'Generative AI and economics',
'Industrial economics',
'Competition policy',
'Economics of platforms',
'Digitalization',
'Climate change'];


/* ---------- Publications ---------- */

/* Helper: render a venue string with one phrase italicized. */
function venuePart(text, italic) {
  if (!italic) return text;
  const idx = text.indexOf(italic);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <em>{italic}</em>
      {text.slice(idx + italic.length)}
    </>);

}

const PUB_BOOKS = [
{
  authors: 'Eroğlu, M., Finger, M., & Köksal, E. (Eds.).', year: '2024',
  title: 'The Economics and Regulation of Digitalisation: The Case of Türkiye.',
  venue: 'Routledge.',
  href: '#'
}];


const PUB_CHAPTERS = [
{
  authors: 'Köksal, E., & Bakış, O.', year: '2024',
  title: 'Digitalization of Society — Türkiye Digital Society Index.',
  venue: 'In The Economics and Regulation of Digitalisation (pp. 136–154). Routledge.',
  venueItalic: 'The Economics and Regulation of Digitalisation',
  href: '#'
},
{
  authors: 'Finger, M., Köksal, E., & Eroğlu, M.', year: '2024',
  title: 'Setting the Scene.',
  venue: 'In The Economics and Regulation of Digitalisation (pp. 1–20). Routledge.',
  venueItalic: 'The Economics and Regulation of Digitalisation',
  href: '#'
},
{
  authors: 'Köksal, E. & Ak, A.', year: '2024',
  title: 'Neo-Brandeisian Traces in the New E-Commerce Act.',
  venue: 'In K. C. Sanlı, D. Alma, & D. Tanlı (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2023 (pp. 381–410). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2023',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E., İkiler, B., & Canbeyli, A.', year: '2023',
  title: 'Law and Economics of the 2021 Retail Decision: Price Transitions, Buyer Power, Price Leadership and Hub-And-Spoke Cartel Allegations in an Inflationary Environment.',
  venue: 'In Sanlı, Alma & Tanlı (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2022 (pp. 23–78). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2022',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & İkiler, B.', year: '2022',
  title: "Turkish Competition Board\u2019s Fuel Decision: Critics on the Approach Taken for Resale Price Maintenance and Employed Methodology for Data Analysis.",
  venue: 'In Sanlı, Alma & Tanlı (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2021 (pp. 311–326). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2021',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2021',
  title: 'Regulation of Fiber and the Internet.',
  venue: 'In M. Finger & M. Eroğlu (Eds.), Regulation of Turkish Network Industries (pp. 383–401). Springer.',
  venueItalic: 'Regulation of Turkish Network Industries',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2021',
  title: 'Public Interventions Towards Platform Industries in Turkey.',
  venue: 'In O. Kent et al. (Eds.), Türkiye Ekonomisinde Büyüme, Kalkınma ve Eşitsizlik (pp. 282–303). Efil Yayınevi.',
  venueItalic: 'Türkiye Ekonomisinde Büyüme, Kalkınma ve Eşitsizlik',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & Sesli, E.', year: '2021',
  title: 'Concerted Practice Decisions of the Turkish Competition Board.',
  venue: 'In Sanlı & Alma (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2020 (pp. 85–114). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2020',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & İkiler, B.', year: '2020',
  title: 'Current Competition Policies Towards Digital Platforms: Amex, Sahibinden, and Google Shopping.',
  venue: 'In Sanlı & Alma (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2019 (pp. 477–492). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2019',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2019',
  title: "Why Can\u2019t We Choose the Best Mobile Phone Tariff for Us?",
  venue: 'In N. E. Aydınonat & Ü. B. Urhan (Eds.), Economics In Everyday Life (pp. 19–26). İletişim Yayınları.',
  venueItalic: 'Economics In Everyday Life',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2019',
  title: 'An Economic Assessment on E-commerce and Vertical Restrictions.',
  venue: 'In K. C. Sanlı (Ed.), Rekabet Hukukunda Dikey Anlaşmaların Son 10 Yılı (pp. 108–131). On İki Levha.',
  venueItalic: 'Rekabet Hukukunda Dikey Anlaşmaların Son 10 Yılı',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2012',
  title: 'Welfare Implications of Deviation from Network Neutrality: A Price Discrimination Application.',
  venue: 'In M. Bartolacci & S. Powell (Eds.), Research, Practice, and Educational Advancements in Telecommunications and Networking (pp. 108–131).',
  venueItalic: 'Research, Practice, and Educational Advancements in Telecommunications and Networking',
  href: '#'
}];


const PUB_ARTICLES_SELECTED = [
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2022',
  title: "Turkish Competition Authority\u2019s First Hub-and-Spoke Cartel Decision.",
  venue: 'Journal of European Competition Law & Practice, 13(8), 566–570.',
  venueItalic: 'Journal of European Competition Law & Practice',
  href: '#'
},
{
  authors: 'Dalgic-Tetikol, D. E., Guloglu, B., & Köksal, E.', year: '2022',
  title: 'Determinants of Internet Adoption in Turkey and the Need For a More Coherent Vision on ICT Policy.',
  venue: 'Competition and Regulation in Network Industries, 23(4), 311–336.',
  venueItalic: 'Competition and Regulation in Network Industries',
  href: '#'
},
{
  authors: 'Aydınonat, N. E. & Köksal, E.', year: '2019',
  title: "Explanatory Value in Context: The Curious Case of Hotelling\u2019s Location Model.",
  venue: 'The European Journal of the History of Economic Thought, 26(5), 879–910.',
  venueItalic: 'The European Journal of the History of Economic Thought',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2018',
  title: 'Regulatory and Market Disharmony in the Turkish Electricity Industry.',
  venue: 'Utilities Policy, 55, 90–98.',
  venueItalic: 'Utilities Policy',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2018',
  title: 'Diverging Approaches in Europe for the Most Favoured-Customer Clauses.',
  venue: 'Journal of European Competition Law & Practice, 9(2), 119–123.',
  venueItalic: 'Journal of European Competition Law & Practice',
  href: '#'
},
{
  authors: 'Gürakar, E. & Köksal, E.', year: '2016',
  title: 'Institutional Evolution and Economic Development in Iran and Turkey.',
  venue: 'Middle East Development Journal, 8(1), 32–64.',
  venueItalic: 'Middle East Development Journal',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2015',
  title: 'Reviewing Regulatory Policy for Broadband in Turkey.',
  venue: 'Competition and Regulation in Network Industries, 16(4), 354–377.',
  venueItalic: 'Competition and Regulation in Network Industries',
  href: '#'
}];


const PUB_ARTICLES_OTHER = [
{
  authors: 'Köksal, E., Ardıyok, Ş., & İkiler, B.', year: '2024',
  title: 'How Can Charging Infrastructure for Electric Vehicles Be Expanded in Turkey?',
  venue: 'Ekonomi-Tek, 13(1), 84–121.',
  venueItalic: 'Ekonomi-Tek',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Dalgic-Tetikol, D. E., Köksal, E., & Guloglu, B.', year: '2023',
  title: 'The Evolution of the Digital Divide in Turkey.',
  venue: 'Journal of Research in Economics, 7(1), 65–83.',
  venueItalic: 'Journal of Research in Economics',
  href: '#'
},
{
  authors: 'Köksal, E., & Ardıyok, Ş.', year: '2023',
  title: 'What Did the Turkish Competition Authority Ignore in Its First Hub-and-Spoke Cartel Decision?',
  venue: 'Ekonomi-Tek, 12(1), 21–33.',
  venueItalic: 'Ekonomi-Tek',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2021',
  title: 'Analysis of Syndicated Loans from the Perspective of Competition Economics.',
  venue: 'Ekonomi-Tek, 10(1), 41–68.',
  venueItalic: 'Ekonomi-Tek',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2019',
  title: 'Necessity of a Broader Market Definition in the Analysis of Syndicated Loans Markets.',
  venue: 'European Competition Law Review, 40(11), 547–555.',
  venueItalic: 'European Competition Law Review',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2018',
  title: 'Sector Specific Regulations and Behavioral Economics: Reflections on the Decision Numbered 149.',
  venue: 'Business & Management Studies, 6(1), 48–62.',
  venueItalic: 'Business & Management Studies',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & Yurtseven, C.', year: '2018',
  title: 'The Effects of the Increase in the Number of University Students on the Growth of the Movie Industry in Turkey.',
  venue: 'International Review of Economics and Management, 6(3), 103–116.',
  venueItalic: 'International Review of Economics and Management',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Erbil, C., Köksal, E., & Yurtseven, C.', year: '2017',
  title: 'Mall Flicks — The Mall Boom in Turkey with an Unexpected Byproduct: The Movie Sector Expansion.',
  venue: 'Research in World Economy, 8(1), 1–17.',
  venueItalic: 'Research in World Economy',
  href: '#'
},
{
  authors: 'Anıl, B. & Köksal, E.', year: '2016',
  title: 'Who Uses the Internet in Turkey and For What Purposes?',
  venue: 'İktisadi ve İdari Bilimler Dergisi, 38(1), 1–13.',
  venueItalic: 'İktisadi ve İdari Bilimler Dergisi',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Akben-Selçuk, E., Köksal, E., & Altıok-Yılmaz, A. D.', year: '2016',
  title: 'The Impact of Merger and Acquisition Transactions at the Company and Industry Level: A Literature Review.',
  venue: 'Business & Management Studies, 4(1), 48–62.',
  venueItalic: 'Business & Management Studies',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Ardıyok, Ş., Demirkan, H., Köksal, E., & Yüksel, B.', year: '2015',
  title: 'Assessment of Net Neutrality Regulations and Traffic Management Activities in Mobile Communications from the Perspective of Competition Law.',
  venue: 'Competition Journal, 16(3), 51–100.',
  venueItalic: 'Competition Journal',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Ardıyok, Ş., Köksal, E., & Yüksel, B.', year: '2015',
  title: 'An Evaluation Concerning the New Ex-Ante Regulations for the Prevention of Margin Squeeze in the Electronic Communication Market in Turkey.',
  venue: 'Competition Journal, 16(2), 3–42.',
  venueItalic: 'Competition Journal',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & Anıl, B.', year: '2015',
  title: 'The Determinants of Broadband Access and Usage in Turkey: Do Regions Matter?',
  venue: 'Topics in Middle Eastern and African Economies, 17(1), 114–133.',
  venueItalic: 'Topics in Middle Eastern and African Economies',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2011',
  title: 'Network Neutrality and Quality of Service: A Two-Sided Market Analysis.',
  venue: 'International Journal of Management and Network Economics, 2(1), 39–57.',
  venueItalic: 'International Journal of Management and Network Economics',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2010',
  title: 'Welfare Implications of Deviation from Network Neutrality: A Price Discrimination Application.',
  venue: 'International Journal of Interdisciplinary Telecommunications and Networking, 2(2), 27–49.',
  venueItalic: 'International Journal of Interdisciplinary Telecommunications and Networking',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2008',
  title: 'An Analysis of Public Expenditures Using the Median Voter Theorem for Turkey.',
  venue: 'Dokuz Eylül Üniversitesi İşletme Fakültesi Dergisi, 9(2), 211–225.',
  venueItalic: 'Dokuz Eylül Üniversitesi İşletme Fakültesi Dergisi',
  href: '#'
}];


const PUB_OTHER_JOURNAL = [
{
  authors: 'Köksal, E. & Yüksel, B.', year: '2022',
  title: 'Hub-and-Spoke Cartels — An Economic and Legal Perspective.',
  venue: 'Rekabet Forumu, 154, 1–12.',
  venueItalic: 'Rekabet Forumu',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2021',
  title: 'The Economics of Electric Vehicles and the Need for a Public Policy.',
  venue: 'Network Industries Quarterly Turkey, 1(4), 6–9.',
  venueItalic: 'Network Industries Quarterly Turkey',
  href: '#'
},
{
  authors: 'Ardıyok, Ş., İkiler, B., & Köksal, E.', year: '2021',
  title: 'A Brief Overview of Charging Infrastructure in EU and Turkey.',
  venue: 'Network Industries Quarterly Turkey, 1(4), 14–18.',
  venueItalic: 'Network Industries Quarterly Turkey',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2020',
  title: 'The COVID-19 Pandemic Shows How Vital the Broadband Internet Infrastructure Is.',
  venue: 'Network Industries Quarterly Turkey, 1(2), 14–17.',
  venueItalic: 'Network Industries Quarterly Turkey',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2019',
  title: 'Competition Policy Towards Digital Platforms.',
  venue: 'Network Industries Quarterly, 21(4), 7–9.',
  venueItalic: 'Network Industries Quarterly',
  href: '#'
},
{
  authors: 'Köksal, E. & Uçar, B. G.', year: '2019',
  title: 'Public Interventions in Platform Industries: The Role of Interest Groups and Potential Welfare Effects.',
  venue: 'Network Industries Quarterly, 21(2), 3–5.',
  venueItalic: 'Network Industries Quarterly',
  href: '#'
},
{
  authors: 'Köksal, E.', year: '2018',
  title: 'Industry 4.0: Innovation, Education and Public Policy.',
  venue: 'Biktisat, 1(3), 46–54.',
  venueItalic: 'Biktisat',
  note: '(in Turkish)',
  href: '#'
}];


const PUB_REPORTS = [
{
  authors: 'Köksal, E., Peker, C. & Uyer, M.', year: '2025',
  title: "A Quarter-Century Analysis of the Turkish Competition Board\u2019s Decisions: An AI-Supported Examination.",
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)',
  href: '#',
  highlight: true
},
{
  authors: 'Köksal, E. & Bakış, O.', year: '2023',
  title: 'Türkiye Digital Society Index.',
  venue: 'Betam Research Note, 23/269. SSRN.',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Bakış, O. & Köksal, E.', year: '2022',
  title: 'ICT Expenditures and Digitalization in Turkey.',
  venue: 'Betam Research Report. SSRN.',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Bakış, O., Tetikol-Dalgıç, D. E., Deniz, P., Finger, M., Gümüş, İ., & Köksal, E.', year: '2022',
  title: "Assessment of a Carbon Tax as a Tool to Decarbonize Turkey\u2019s Energy Supply 2050.",
  venue: 'IC4R Report Series No. 1. SSRN.',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2021',
  title: 'Decisions of the Competition Board on Resale Price Maintenance.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E., Ardıyok, Ş. & İkiler, B.', year: '2021',
  title: 'Charging Infrastructure for Electric Vehicles — Opportunities and Suggestions for Turkey.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2019',
  title: 'Assessing Buyer Power in Syndicated Loans.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  href: '#'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2019',
  title: 'Necessity of a Broader Market Definition in the Analysis of Syndicated Loans.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)',
  href: '#'
}];


const PUB_FORTHCOMING = [
{
  authors: 'Köksal, E., Peker, C. & Uyer, M.',
  title: "The Competition Board\u2019s \u201CIntellectual DNA\u201D: A Citation Network and Case Law Mapping Analysis.",
  venue: 'Working paper.',
  href: '#'
}];


/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

function Citation({ pub }) {
  return (
    <li className="cv-cite" style={{
      display: 'grid', gridTemplateColumns: '64px 1fr auto',
      gap: 16, alignItems: 'baseline',
      padding: '18px 0',
      borderTop: '1px solid rgba(20,20,19,.1)'
    }}>
      <span style={{ fontSize: 13, color: '#555', whiteSpace: 'nowrap' }}>
        {pub.year || ''}
      </span>
      <p style={{
        fontSize: 15, lineHeight: 1.5, color: '#141413', margin: 0
      }}>
        <strong style={{ fontWeight: 500 }}>{pub.authors}</strong>
        {pub.year ? ` (${pub.year}). ` : ' '}
        <a href={pub.href} target="_blank" rel="noopener noreferrer" style={{
          color: '#141413', textDecoration: 'none', fontStyle: 'italic',
          borderBottom: '1px solid rgba(20,20,19,.3)'
        }}>
          {pub.title}
        </a>{' '}
        {pub.venueItalic ? venuePart(pub.venue, pub.venueItalic) : pub.venue}
        {pub.note && <span style={{ color: '#555' }}> {pub.note}</span>}
      </p>
      <span className="cv-cite__ext" style={{
        fontSize: 12, color: '#9A3A0A', fontWeight: 700,
        letterSpacing: '.04em', textTransform: 'uppercase'
      }}>
        {pub.highlight ? 'AI-native' : ''}
      </span>
    </li>);

}

function PubGroup({ id, title, items }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h4 className="cv-pub-group" style={{
        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
        letterSpacing: '.04em', textTransform: 'uppercase',
        color: '#141413', margin: '0 0 12px'
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
        letterSpacing: '.04em', color: '#F37338'
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
      background: alt ? '#FCFBFA' : 'transparent'
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
      borderTop: '1px solid rgba(20,20,19,.12)'
    }}>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 19, fontWeight: 500,
        letterSpacing: '-.015em', lineHeight: 1.3, color: '#141413'
      }}>
        {role}
      </div>
      <div style={{
        fontSize: 16, color: '#262627', lineHeight: 1.5, fontStyle: 'italic'
      }}>
        {org}
      </div>
      <div style={{
        fontSize: 14, color: '#555', textAlign: 'right', whiteSpace: 'nowrap'
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
              Emin Köksal — Curriculum Vitae
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 500, letterSpacing: '-.018em', color: '#141413',
              margin: 0, lineHeight: 1.35
            }}>Associate Professor of Economics · AI Consultant · Researcher

            </p>
            <p style={{
              fontSize: 14, color: '#555', margin: '12px 0 0',
              letterSpacing: '.02em'
            }}>
              Last updated: February 2026
            </p>
          </div>

          <div className="cv-hero__actions"
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" href="#" target="_blank">
              Download PDF <IconDownload size={14} />
            </Button>
            <Button variant="ghost" href="mailto:mail@eminkoksal.com">
              Email me <IconArrow size={14} dir="up-right" />
            </Button>
          </div>
        </div>

        <div className="cv-contact" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          borderTop: '1px solid rgba(20,20,19,.15)',
          marginTop: 64, paddingTop: 24
        }}>
          <Meta label="Email" value={<a href="mailto:mail@eminkoksal.com" style={{ color: '#141413', textDecoration: 'underline', textUnderlineOffset: 3 }}>mail@eminkoksal.com</a>} />
          <Meta label="Web" value={<a href="https://eminkoksal.com" target="_blank" rel="noopener noreferrer" style={{ color: '#141413', textDecoration: 'underline', textUnderlineOffset: 3 }}>eminkoksal.com</a>} />
          <Meta label="LinkedIn" value={<a href="https://linkedin.com/in/eminkoksal" target="_blank" rel="noopener noreferrer" style={{ color: '#141413', textDecoration: 'underline', textUnderlineOffset: 3 }}>linkedin.com/in/eminkoksal</a>} />
          <Meta label="Based in" value="Türkiye" />
        </div>
      </div>
    </section>);

}

function Meta({ label, value }) {
  return (
    <div>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '.04em',
        textTransform: 'uppercase', color: '#555', marginBottom: 6
      }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: '#141413' }}>{value}</div>
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
      background: 'rgba(243,240,238,.92)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(20,20,19,.12)',
      borderBottom: '1px solid rgba(20,20,19,.12)',
      marginBottom: 16
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: '14px var(--container-gutter)',
        overflowX: 'auto'
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
          letterSpacing: '.06em', textTransform: 'uppercase',
          color: '#555', flexShrink: 0
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
              color: active === t.id ? '#F3F0EE' : '#141413',
              background: active === t.id ? '#141413' : 'transparent',
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

        <CVSection id="current" index="01" eyebrow="Current Positions" title="Where I am now.">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {CURRENT_POSITIONS.map((p, i) => <PositionRow key={i} {...p} />)}
          </ul>
        </CVSection>

        <CVSection id="previous" index="02" eyebrow="Previous Positions" title="Where I have been." alt>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {PREVIOUS_POSITIONS.map((p, i) => <PositionRow key={i} {...p} />)}
          </ul>
        </CVSection>

        <CVSection id="affiliations" index="03" eyebrow="Other Positions & Affiliations" title="Where I serve.">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {AFFILIATIONS.map((p, i) => <PositionRow key={i} {...p} />)}
          </ul>
        </CVSection>

        <CVSection id="education" index="04" eyebrow="Education" title="Degrees & qualifications." alt>
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
              <tr key={i} style={{ borderTop: '1px solid rgba(20,20,19,.12)' }}>
                  <td style={{ ...tdStyle, color: '#555', whiteSpace: 'nowrap' }}>{e.years}</td>
                  <td style={{ ...tdStyle, fontStyle: 'italic' }}>{e.institution}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{e.degree}</td>
                </tr>
              )}
            </tbody>
          </table>
          <p style={{
            fontSize: 15, color: '#262627', lineHeight: 1.55,
            margin: '24px 0 0', maxWidth: 760
          }}>
            <strong style={{ fontWeight: 500 }}>
              Associate Professorship (Doçentlik) in Economics
            </strong>
            {' '}— formal Turkish academic title earned through the national associate
            professorship examination.
          </p>
        </CVSection>

        <CVSection id="ai-strategy" index="05" eyebrow="AI Strategy & Consultancy"
        title="Turning frontier AI tools into reliable analytical infrastructure.">
          <div className="prose" style={{ maxWidth: 820 }}>
            <p>
              I work with organizations across different sectors to identify opportunities where
              generative AI and automation can meaningfully enhance or streamline their workflows.
              Drawing on my academic background in managerial economics and law & economics, I
              bring an analytical lens to understanding how complex institutional and business
              processes can be thoughtfully redesigned with AI tools — balancing efficiency gains
              with practical constraints.
            </p>
            <p>
              In practice, I am embedded inside the competition and regulation team of a leading
              international law firm, where I design AI workflows, complex prompts, and reusable
              playbooks on a leading European legal AI platform. I distinguish carefully between
              general-purpose AI tools (for non-confidential academic and marketing work) and
              confidentiality-grade legal AI platforms (for client work), and I build custom
              MCP-based research infrastructure for legal and academic discovery.
            </p>
          </div>
        </CVSection>

        <CVSection id="economic" index="06" eyebrow="Economic Consultancy"
        title="Expert economic analysis in competition law and regulation." alt>
          <div className="prose" style={{ maxWidth: 820 }}>
            <p>
              I provide expert economic analysis in competition law and regulatory matters, with
              experience spanning antitrust investigations in platform, electricity, banking,
              cement, petroleum, and retail industries, as well as regulatory proceedings on
              issues including net neutrality, OTT services, electrification, and climate policy.
              My work has included quantitative market analysis, economic opinion writing, and
              testimony support for law firms and companies in proceedings before the Turkish
              Competition Authority and in international trade defense cases.
            </p>
          </div>
        </CVSection>

        <CVSection id="interests" index="07" eyebrow="Research Interests" title="Active areas of inquiry.">
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexWrap: 'wrap', gap: 12
          }}>
            {RESEARCH_INTERESTS.map((it, i) =>
            <li key={i} style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '10px 18px', borderRadius: 999,
              border: '1px solid rgba(20,20,19,.25)',
              fontSize: 15, fontWeight: 500, letterSpacing: '-.015em',
              background: '#FCFBFA'
            }}>
                {it}
              </li>
            )}
          </ul>
        </CVSection>

        <CVSection id="teaching" index="08" eyebrow="Teaching" title="Courses, current and recent." alt>
          <h3 style={subheadStyle}>Bahçeşehir University</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
            {TEACHING_BAU.map((c, i) =>
            <li key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: 24, alignItems: 'baseline',
              padding: '18px 0',
              borderTop: '1px solid rgba(20,20,19,.1)'
            }}>
                <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 500,
                letterSpacing: '-.015em'
              }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 13, color: '#555', fontStyle: 'italic' }}>
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
              borderTop: '1px solid rgba(20,20,19,.1)'
            }}>
                <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 500,
                letterSpacing: '-.015em'
              }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 15, color: '#262627', fontStyle: 'italic' }}>
                  {c.org}
                </div>
                <div style={{ fontSize: 14, color: '#555', textAlign: 'right' }}>
                  {c.years}
                </div>
              </li>
            )}
          </ul>
        </CVSection>

        <CVSection id="service" index="09" eyebrow="Additional Professional Activities"
        title="Editorial, refereeing, advisory.">
          <h3 style={subheadStyle}>Referee for</h3>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: 0
          }}>
            {REFEREE_FOR.map((j, i) =>
            <li key={i} style={{
              padding: '14px 0',
              borderTop: '1px solid rgba(20,20,19,.1)',
              fontSize: 16, fontStyle: 'italic',
              color: '#141413'
            }}>
                {j}
              </li>
            )}
          </ul>
        </CVSection>

        <CVSection id="publications" index="10" eyebrow="Publications"
        title="The full record." alt pageBreak>
          <PubGroup title="Books & Edited Volumes" items={PUB_BOOKS} />
          <PubGroup title="Book Chapters" items={PUB_CHAPTERS} />
          <PubGroup title="Selected Peer-Reviewed Journal Articles" items={PUB_ARTICLES_SELECTED} />
          <PubGroup title="Other Peer-Reviewed Articles" items={PUB_ARTICLES_OTHER} />
          <PubGroup title="Other Journal Articles" items={PUB_OTHER_JOURNAL} />
          <PubGroup title="Reports & Working Papers" items={PUB_REPORTS} />

          <div style={{ marginTop: 16 }}>
            <h4 style={{
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
              letterSpacing: '.04em', textTransform: 'uppercase',
              color: '#141413', margin: '0 0 12px'
            }}>
              Forthcoming
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {PUB_FORTHCOMING.map((p, i) =>
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '64px 1fr',
                gap: 16, alignItems: 'baseline',
                padding: '18px 0',
                borderTop: '1px solid rgba(20,20,19,.1)'
              }}>
                  <span style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '.06em',
                  textTransform: 'uppercase', color: '#9A3A0A'
                }}>
                    Forthcoming
                  </span>
                  <p style={{
                  fontSize: 15, lineHeight: 1.5, color: '#141413', margin: 0
                }}>
                    <strong style={{ fontWeight: 500 }}>{p.authors}</strong>{' '}
                    <a href={p.href} target="_blank" rel="noopener noreferrer" style={{
                    color: '#141413', textDecoration: 'none', fontStyle: 'italic',
                    borderBottom: '1px solid rgba(20,20,19,.3)'
                  }}>
                      {p.title}
                    </a>{' '}
                    {p.venue}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </CVSection>

        <CVSection id="personal" index="11" eyebrow="Personal" title="A few details for the record.">
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2vw, 28px)',
            fontWeight: 500, letterSpacing: '-.018em', lineHeight: 1.3,
            color: '#141413', margin: 0, maxWidth: 880
          }}>
            Turkish citizen · Married · Keen gravel cyclist · Amateur astronomer
          </p>
        </CVSection>

        {/* Footer CTA */}
        <section className="cv-footer-cta" style={{
          padding: '64px 0 128px', background: 'transparent'
        }}>
          <div className="container">
            <div style={{
              padding: '48px',
              background: '#141413', color: '#F3F0EE',
              borderRadius: 40,
              display: 'grid', gridTemplateColumns: '1.4fr 1fr',
              gap: 48, alignItems: 'end'
            }}>
              <p style={{
                fontSize: 18, lineHeight: 1.55,
                color: 'rgba(243,240,238,.9)', margin: 0, maxWidth: 640
              }}>
                The latest PDF version of this CV is available for download above.
                For collaboration or speaking inquiries, reach out by{' '}
                <a href="mailto:mail@eminkoksal.com" style={{
                  color: '#F3F0EE', textDecoration: 'underline', textUnderlineOffset: 3
                }}>email</a>
                {' '}or{' '}
                <a href="https://linkedin.com/in/eminkoksal" target="_blank" rel="noopener noreferrer" style={{
                  color: '#F3F0EE', textDecoration: 'underline', textUnderlineOffset: 3
                }}>LinkedIn</a>.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button variant="inverse" href="#" target="_blank">
                  Download PDF <IconDownload size={14} />
                </Button>
                <Button variant="ghost" href="contact.html"
                style={{ borderColor: 'rgba(255,255,255,.4)', color: '#F3F0EE' }}>
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
  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
  letterSpacing: '.04em', textTransform: 'uppercase',
  color: '#555', borderBottom: '1.5px solid #141413'
};
const tdStyle = {
  padding: '20px 16px 20px 0',
  fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.4,
  color: '#141413', verticalAlign: 'top'
};
const subheadStyle = {
  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
  letterSpacing: '.04em', textTransform: 'uppercase',
  color: '#141413', margin: '0 0 12px'
};

export default CVApp;
/* CV content: the single source for the CV page (cv.jsx) and the PDF
   (cv-print.jsx, rendered by scripts/cv-pdf.mjs). Edit here, then run
   `npm run cv-pdf` so the downloadable PDF matches the page. */
import React from 'react';

export const CV_UPDATED = 'September 2026';

export const CV_TITLE = 'Associate Professor of Economics · AI Consultant · Researcher';

export const CV_ACADEMIC_RANK = 'Associate Professor of Economics';

export const CV_AI_STRATEGY = [
  'I help organizations decide where generative AI and automation belong in their ' +
  'workflows, and where they do not. That is an economic question before it is a ' +
  'technical one: what a task costs now, what it would cost with AI, and what could ' +
  'go wrong. My background in managerial economics and law and economics is what I ' +
  'bring to it.',
  'In practice, I am embedded inside the competition and regulation team of a leading ' +
  'international law firm, where I design AI workflows, complex prompts, and reusable ' +
  'playbooks on a leading European legal AI platform. I distinguish carefully between ' +
  'general-purpose AI tools (for non-confidential academic and marketing work) and ' +
  'confidentiality-grade legal AI platforms (for client work), and I build custom ' +
  'MCP-based research infrastructure for legal and academic research.',
];

export const CV_ECONOMIC =
  'I provide expert economic analysis in competition law and regulatory matters, with ' +
  'experience spanning antitrust investigations in platform, electricity, banking, ' +
  'cement, petroleum, and retail industries, as well as regulatory proceedings on ' +
  'issues including net neutrality, OTT services, electrification, and climate policy. ' +
  'My work has included quantitative market analysis, economic opinion writing, and ' +
  'testimony support for law firms and companies in proceedings before the Turkish ' +
  'Competition Authority and in international trade defense cases.';

export const CV_PERSONAL = ['Turkish citizen', 'Married', 'Keen gravel cyclist', 'Amateur astronomer'];

export const CURRENT_POSITIONS = [
{ role: 'AI Consultant', org: 'Freelance', years: 'since 2024' },
{ role: 'Lecturer (part-time)', org: 'Bahçeşehir University', years: 'since 2024' },
{ role: 'Associate Editor-in-Chief', org: 'Competition and Regulation in Network Industries, SAGE Publishing',
  years: 'since 2018' },
{ role: 'Economic Consultant', org: 'Dentons', years: 'since 2015' }];


export const PREVIOUS_POSITIONS = [
{ role: 'Associate Professor', org: 'Department of Economics, Bahçeşehir University', years: '2018–2024' },
{ role: 'Program Coordinator', org: 'Financial Economics Graduate Program, Bahçeşehir University', years: '2013–2019' },
{ role: 'Vice Dean', org: 'Faculty of Administrative and Economic Sciences, Bahçeşehir University', years: '2013–2015' },
{ role: 'Assistant Professor of Economics', org: 'Department of Economics, Bahçeşehir University', years: '2008–2018' },
{ role: 'Research Assistant', org: 'Department of Economics, Bahçeşehir University', years: '2002–2008' }];


export const AFFILIATIONS = [
{ role: 'Deputy Director', org: 'Istanbul Center for Regulation (IC4R)', years: 'since 2019' },
{ role: 'Member', org: 'Network-Industries.org', years: 'since 2019' },
{ role: 'Member', org: 'Climate Change & Environment Working Group, TÜSİAD', years: 'since 2019' },
{ role: 'Member', org: 'Information and Communication Technologies Working Group, TÜSİAD', years: 'since 2018' },
{ role: 'Member', org: 'E-commerce Working Group, TÜSİAD', years: 'since 2018' },
{ role: 'Member', org: 'Digital Economy Advisory Board, US-Turkey Business Council', years: 'since 2017' },
{ role: 'Lifetime Member', org: 'International Atlantic Economic Society', years: 'since 2012' }];


export const EDUCATION = [
{ years: '2004–2008', institution: 'Marmara University', degree: 'PhD in Economics' },
{ years: '2002–2004', institution: 'Galatasaray University', degree: 'MA in Public Finance' },
{ years: '1995–2001', institution: 'Galatasaray University', degree: 'BA in Economics' }];


export const TEACHING_BAU = [
{ title: 'Generative AI for Economic Analysis', level: 'undergraduate' },
{ title: 'Managerial Economics', level: 'MBA, PhD' },
{ title: 'Platform Business and Economics', level: 'MBA' },
{ title: 'Industrial Organization', level: 'undergraduate' },
{ title: 'Platform Economics', level: 'undergraduate' },
{ title: 'Innovation & Competition Policy in Digital Markets', level: 'undergraduate' },
{ title: 'Economics of Climate Change', level: 'undergraduate' },
{ title: 'Law & Economics', level: 'undergraduate' }];


export const TEACHING_GUEST = [
{ title: 'Antitrust Economics', org: 'Bilgi University', years: '2018–2022' },
{ title: 'Competition Policy in Digital Markets', org: 'Koç University', years: '2018–2019' },
{ title: 'Regulation and Competition in Platform Industries', org: 'Istanbul Technical University', years: '2019' }];


export const REFEREE_FOR = [
'Energy Policy',
'Utilities Policy',
'Telecommunications Policy',
'Competition and Regulation in Network Industries',
'Many other national journals'];


export const RESEARCH_INTERESTS = [
'Generative AI and economics',
'Industrial economics',
'Competition policy',
'Economics of platforms',
'Digitalization',
'Climate change'];


/* ---------- Publications ---------- */

/* Helper: render a venue string with one phrase italicized. */
export function venuePart(text, italic) {
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

export const PUB_BOOKS = [
{
  authors: 'Eroğlu, M., Finger, M., & Köksal, E. (Eds.).', year: '2024',
  title: 'The Economics and Regulation of Digitalisation: The Case of Türkiye.',
  venue: 'Routledge.',
  href: 'https://doi.org/10.4324/9781032692937'
}];


export const PUB_CHAPTERS = [
{
  authors: 'Köksal, E., & Bakış, O.', year: '2024',
  title: 'Digitalization of Society: Türkiye Digital Society Index.',
  venue: 'In The Economics and Regulation of Digitalisation (pp. 136–154). Routledge.',
  venueItalic: 'The Economics and Regulation of Digitalisation',
  href: 'https://doi.org/10.4324/9781032692937'
},
{
  authors: 'Finger, M., Köksal, E., & Eroğlu, M.', year: '2024',
  title: 'Setting the Scene.',
  venue: 'In The Economics and Regulation of Digitalisation (pp. 1–20). Routledge.',
  venueItalic: 'The Economics and Regulation of Digitalisation',
  href: 'https://doi.org/10.4324/9781032692937'
},
{
  authors: 'Köksal, E. & Ak, A.', year: '2024',
  title: 'Neo-Brandeisian Traces in the New E-Commerce Act.',
  venue: 'In K. C. Sanlı, D. Alma, & D. Tanlı (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2023 (pp. 381–410). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2023',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E., İkiler, B., & Canbeyli, A.', year: '2023',
  title: 'Law and Economics of the 2021 Retail Decision: Price Transitions, Buyer Power, Price Leadership and Hub-And-Spoke Cartel Allegations in an Inflationary Environment.',
  venue: 'In Sanlı, Alma & Tanlı (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2022 (pp. 23–78). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2022',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E. & İkiler, B.', year: '2022',
  title: "Turkish Competition Board\u2019s Fuel Decision: Critics on the Approach Taken for Resale Price Maintenance and Employed Methodology for Data Analysis.",
  venue: 'In Sanlı, Alma & Tanlı (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2021 (pp. 311–326). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2021'
},
{
  authors: 'Köksal, E.', year: '2021',
  title: 'Regulation of Fiber and the Internet.',
  venue: 'In M. Finger & M. Eroğlu (Eds.), Regulation of Turkish Network Industries (pp. 383–401). Springer.',
  venueItalic: 'Regulation of Turkish Network Industries',
  href: 'https://doi.org/10.1007/978-3-030-81720-6_19'
},
{
  authors: 'Köksal, E.', year: '2021',
  title: 'Public Interventions Towards Platform Industries in Turkey.',
  venue: 'In O. Kent et al. (Eds.), Türkiye Ekonomisinde Büyüme, Kalkınma ve Eşitsizlik (pp. 282–303). Efil Yayınevi.',
  venueItalic: 'Türkiye Ekonomisinde Büyüme, Kalkınma ve Eşitsizlik',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E. & Sesli, E.', year: '2021',
  title: 'Concerted Practice Decisions of the Turkish Competition Board.',
  venue: 'In Sanlı & Alma (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2020 (pp. 85–114). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2020',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E. & İkiler, B.', year: '2020',
  title: 'Current Competition Policies Towards Digital Platforms: Amex, Sahibinden, and Google Shopping.',
  venue: 'In Sanlı & Alma (Eds.), Uygulamalı Rekabet Hukuku Seminerleri 2019 (pp. 477–492). On İki Levha.',
  venueItalic: 'Uygulamalı Rekabet Hukuku Seminerleri 2019',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E.', year: '2019',
  title: "Why Can\u2019t We Choose the Best Mobile Phone Tariff for Us?",
  venue: 'In N. E. Aydınonat & Ü. B. Urhan (Eds.), Economics In Everyday Life (pp. 19–26). İletişim Yayınları.',
  venueItalic: 'Economics In Everyday Life',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E.', year: '2019',
  title: 'An Economic Assessment on E-commerce and Vertical Restrictions.',
  venue: 'In K. C. Sanlı (Ed.), Rekabet Hukukunda Dikey Anlaşmaların Son 10 Yılı (pp. 108–131). On İki Levha.',
  venueItalic: 'Rekabet Hukukunda Dikey Anlaşmaların Son 10 Yılı',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E.', year: '2012',
  title: 'Welfare Implications of Deviation from Network Neutrality: A Price Discrimination Application.',
  venue: 'In M. Bartolacci & S. Powell (Eds.), Research, Practice, and Educational Advancements in Telecommunications and Networking (pp. 108–131).',
  venueItalic: 'Research, Practice, and Educational Advancements in Telecommunications and Networking',
  href: 'https://doi.org/10.4018/978-1-4666-0050-8.ch006'
}];


export const PUB_ARTICLES_SELECTED = [
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2022',
  title: "Turkish Competition Authority\u2019s First Hub-and-Spoke Cartel Decision.",
  venue: 'Journal of European Competition Law & Practice, 13(8), 566–570.',
  venueItalic: 'Journal of European Competition Law & Practice',
  href: 'https://doi.org/10.1093/jeclap/lpac045'
},
{
  authors: 'Dalgic-Tetikol, D. E., Guloglu, B., & Köksal, E.', year: '2022',
  title: 'Determinants of Internet Adoption in Turkey and the Need For a More Coherent Vision on ICT Policy.',
  venue: 'Competition and Regulation in Network Industries, 23(4), 311–336.',
  venueItalic: 'Competition and Regulation in Network Industries',
  href: 'https://doi.org/10.1177/17835917221143060'
},
{
  authors: 'Aydınonat, N. E. & Köksal, E.', year: '2019',
  title: "Explanatory Value in Context: The Curious Case of Hotelling\u2019s Location Model.",
  venue: 'The European Journal of the History of Economic Thought, 26(5), 879–910.',
  venueItalic: 'The European Journal of the History of Economic Thought',
  href: 'https://doi.org/10.1080/09672567.2019.1626460'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2018',
  title: 'Regulatory and Market Disharmony in the Turkish Electricity Industry.',
  venue: 'Utilities Policy, 55, 90–98.',
  venueItalic: 'Utilities Policy',
  href: 'https://doi.org/10.1016/j.jup.2018.10.001'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2018',
  title: 'Diverging Approaches in Europe for the Most Favoured-Customer Clauses.',
  venue: 'Journal of European Competition Law & Practice, 9(2), 119–123.',
  venueItalic: 'Journal of European Competition Law & Practice',
  href: 'https://doi.org/10.1093/jeclap/lpx091'
},
{
  authors: 'Gürakar, E. & Köksal, E.', year: '2016',
  title: 'Institutional Evolution and Economic Development in Iran and Turkey.',
  venue: 'Middle East Development Journal, 8(1), 32–64.',
  venueItalic: 'Middle East Development Journal',
  href: 'https://doi.org/10.1080/17938120.2016.1150008'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2015',
  title: 'Reviewing Regulatory Policy for Broadband in Turkey.',
  venue: 'Competition and Regulation in Network Industries, 16(4), 354–377.',
  venueItalic: 'Competition and Regulation in Network Industries',
  href: 'https://doi.org/10.1177/178359171501600403'
}];


export const PUB_ARTICLES_OTHER = [
{
  authors: 'Köksal, E., Ardıyok, Ş., & İkiler, B.', year: '2024',
  title: 'How Can Charging Infrastructure for Electric Vehicles Be Expanded in Turkey?',
  venue: 'Ekonomi-Tek, 13(1), 84–121.',
  venueItalic: 'Ekonomi-Tek',
  note: '(in Turkish)'
},
{
  authors: 'Dalgic-Tetikol, D. E., Köksal, E., & Guloglu, B.', year: '2023',
  title: 'The Evolution of the Digital Divide in Turkey.',
  venue: 'Journal of Research in Economics, 7(1), 65–83.',
  venueItalic: 'Journal of Research in Economics'
},
{
  authors: 'Köksal, E., & Ardıyok, Ş.', year: '2023',
  title: 'What Did the Turkish Competition Authority Ignore in Its First Hub-and-Spoke Cartel Decision?',
  venue: 'Ekonomi-Tek, 12(1), 21–33.',
  venueItalic: 'Ekonomi-Tek',
  href: 'https://doi.org/10.2139/ssrn.4235201'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2021',
  title: 'Analysis of Syndicated Loans from the Perspective of Competition Economics.',
  venue: 'Ekonomi-Tek, 10(1), 41–68.',
  venueItalic: 'Ekonomi-Tek',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2019',
  title: 'Necessity of a Broader Market Definition in the Analysis of Syndicated Loans Markets.',
  venue: 'European Competition Law Review, 40(11), 547–555.',
  venueItalic: 'European Competition Law Review',
  href: 'https://doi.org/10.2139/ssrn.3365828'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2018',
  title: 'Sector Specific Regulations and Behavioral Economics: Reflections on the Decision Numbered 149.',
  venue: 'Business & Management Studies, 6(1), 48–62.',
  venueItalic: 'Business & Management Studies',
  note: '(in Turkish)',
  href: 'https://doi.org/10.15295/bmij.v6i1.210'
},
{
  authors: 'Köksal, E. & Yurtseven, C.', year: '2018',
  title: 'The Effects of the Increase in the Number of University Students on the Growth of the Movie Industry in Turkey.',
  venue: 'International Review of Economics and Management, 6(3), 103–116.',
  venueItalic: 'International Review of Economics and Management',
  note: '(in Turkish)'
},
{
  authors: 'Erbil, C., Köksal, E., & Yurtseven, C.', year: '2017',
  title: 'Mall Flicks: The Mall Boom in Turkey with an Unexpected Byproduct: The Movie Sector Expansion.',
  venue: 'Research in World Economy, 8(1), 1–17.',
  venueItalic: 'Research in World Economy',
  href: 'https://doi.org/10.5430/rwe.v8n1p1'
},
{
  authors: 'Anıl, B. & Köksal, E.', year: '2016',
  title: 'Who Uses the Internet in Turkey and For What Purposes?',
  venue: 'İktisadi ve İdari Bilimler Dergisi, 38(1), 1–13.',
  venueItalic: 'İktisadi ve İdari Bilimler Dergisi',
  note: '(in Turkish)',
  href: 'https://dergipark.org.tr/tr/pub/muiibd/article/255329'
},
{
  authors: 'Akben-Selçuk, E., Köksal, E., & Altıok-Yılmaz, A. D.', year: '2016',
  title: 'The Impact of Merger and Acquisition Transactions at the Company and Industry Level: A Literature Review.',
  venue: 'Business & Management Studies, 4(1), 86–106.',
  venueItalic: 'Business & Management Studies',
  note: '(in Turkish)'
},
{
  authors: 'Ardıyok, Ş., Demirkan, H., Köksal, E., & Yüksel, B.', year: '2015',
  title: 'Assessment of Net Neutrality Regulations and Traffic Management Activities in Mobile Communications from the Perspective of Competition Law.',
  venue: 'Competition Journal, 16(3), 51–100.',
  venueItalic: 'Competition Journal',
  note: '(in Turkish)'
},
{
  authors: 'Ardıyok, Ş., Köksal, E., & Yüksel, B.', year: '2015',
  title: 'An Evaluation Concerning the New Ex-Ante Regulations for the Prevention of Margin Squeeze in the Electronic Communication Market in Turkey.',
  venue: 'Competition Journal, 16(2), 3–42.',
  venueItalic: 'Competition Journal',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E. & Anıl, B.', year: '2015',
  title: 'The Determinants of Broadband Access and Usage in Turkey: Do Regions Matter?',
  venue: 'Topics in Middle Eastern and African Economies, 17(1), 114–133.',
  venueItalic: 'Topics in Middle Eastern and African Economies',
  href: 'https://doi.org/10.2139/ssrn.2362376'
},
{
  authors: 'Köksal, E.', year: '2011',
  title: 'Network Neutrality and Quality of Service: A Two-Sided Market Analysis.',
  venue: 'International Journal of Management and Network Economics, 2(1), 39–57.',
  venueItalic: 'International Journal of Management and Network Economics',
  href: 'https://doi.org/10.1504/ijmne.2011.042579'
},
{
  authors: 'Köksal, E.', year: '2010',
  title: 'Welfare Implications of Deviation from Network Neutrality: A Price Discrimination Application.',
  venue: 'International Journal of Interdisciplinary Telecommunications and Networking, 2(2), 27–49.',
  venueItalic: 'International Journal of Interdisciplinary Telecommunications and Networking',
  href: 'https://doi.org/10.4018/jitn.2010040102'
},
{
  authors: 'Köksal, E.', year: '2008',
  title: 'An Analysis of Public Expenditures Using the Median Voter Theorem for Turkey.',
  venue: 'Dokuz Eylül Üniversitesi İşletme Fakültesi Dergisi, 9(2), 211–225.',
  venueItalic: 'Dokuz Eylül Üniversitesi İşletme Fakültesi Dergisi'
}];


export const PUB_OTHER_JOURNAL = [
{
  authors: 'Köksal, E. & Yüksel, B.', year: '2022',
  title: 'Hub-and-Spoke Cartels: An Economic and Legal Perspective.',
  venue: 'Rekabet Forumu, 154, 1–12.',
  venueItalic: 'Rekabet Forumu',
  note: '(in Turkish)',
  href: 'https://doi.org/10.2139/ssrn.4133001'
},
{
  authors: 'Köksal, E.', year: '2021',
  title: 'The Economics of Electric Vehicles and the Need for a Public Policy.',
  venue: 'Network Industries Quarterly Turkey, 1(4), 6–9.',
  venueItalic: 'Network Industries Quarterly Turkey'
},
{
  authors: 'Ardıyok, Ş., İkiler, B., & Köksal, E.', year: '2021',
  title: 'A Brief Overview of Charging Infrastructure in EU and Turkey.',
  venue: 'Network Industries Quarterly Turkey, 1(4), 14–18.',
  venueItalic: 'Network Industries Quarterly Turkey'
},
{
  authors: 'Köksal, E.', year: '2020',
  title: 'The COVID-19 Pandemic Shows How Vital the Broadband Internet Infrastructure Is.',
  venue: 'Network Industries Quarterly Turkey, 1(2), 14–17.',
  venueItalic: 'Network Industries Quarterly Turkey'
},
{
  authors: 'Köksal, E.', year: '2019',
  title: 'Competition Policy Towards Digital Platforms.',
  venue: 'Network Industries Quarterly, 21(4), 7–9.',
  venueItalic: 'Network Industries Quarterly',
  href: 'https://www.network-industries.org/wp-content/uploads/2019/12/Competition-Policy-Towards-Digital-Platforms.pdf'
},
{
  authors: 'Köksal, E. & Uçar, B. G.', year: '2019',
  title: 'Public Interventions in Platform Industries: The Role of Interest Groups and Potential Welfare Effects.',
  venue: 'Network Industries Quarterly, 21(2), 3–5.',
  venueItalic: 'Network Industries Quarterly'
},
{
  authors: 'Köksal, E.', year: '2018',
  title: 'Industry 4.0: Innovation, Education and Public Policy.',
  venue: 'Biktisat, 1(3), 46–54.',
  venueItalic: 'Biktisat',
  note: '(in Turkish)'
}];


export const PUB_REPORTS = [
{
  authors: 'Köksal, E., Peker, C. & Üyer, M.', year: '2026',
  title: 'The Intellectual DNA of the Turkish Competition Board: Mapping Three Decades of Case Law Through Citation Networks.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258',
  highlight: true
},
{
  authors: 'Köksal, E., Peker, C. & Üyer, M.', year: '2025',
  title: "A Quarter-Century Analysis of the Turkish Competition Board\u2019s Decisions: An AI-Supported Examination.",
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  href: 'https://ssrn.com/abstract=5731282',
  highlight: true
},
{
  authors: 'Köksal, E. & Bakış, O.', year: '2023',
  title: 'Türkiye Digital Society Index.',
  venue: 'Betam Research Note, 23/269. SSRN.',
  note: '(in Turkish)',
  href: 'https://betam.bahcesehir.edu.tr/2023/03/turkiye-dijital-toplum-endeksi/'
},
{
  authors: 'Bakış, O. & Köksal, E.', year: '2022',
  title: 'ICT Expenditures and Digitalization in Turkey.',
  venue: 'Betam Research Report. SSRN.',
  note: '(in Turkish)',
  href: 'https://betam.bahcesehir.edu.tr/2022/07/turkiyede-bilgi-iletisim-harcamalari-ve-dijitallesme/'
},
{
  authors: 'Bakış, O., Tetikol-Dalgıç, D. E., Deniz, P., Finger, M., Gümüş, İ., & Köksal, E.', year: '2022',
  title: "Assessment of a Carbon Tax as a Tool to Decarbonize Turkey\u2019s Energy Supply 2050.",
  venue: 'IC4R Report Series No. 1. SSRN.',
  href: 'https://doi.org/10.2139/ssrn.4250459'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2021',
  title: 'Decisions of the Competition Board on Resale Price Maintenance.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E., Ardıyok, Ş. & İkiler, B.', year: '2021',
  title: 'Charging Infrastructure for Electric Vehicles: Opportunities and Suggestions for Turkey.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2019',
  title: 'Assessing Buyer Power in Syndicated Loans.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  href: 'https://doi.org/10.2139/ssrn.3365833'
},
{
  authors: 'Köksal, E. & Ardıyok, Ş.', year: '2019',
  title: 'Necessity of a Broader Market Definition in the Analysis of Syndicated Loans.',
  venue: 'SSRN.',
  venueItalic: 'SSRN',
  note: '(in Turkish)',
  href: 'https://doi.org/10.2139/ssrn.3365828'
}];

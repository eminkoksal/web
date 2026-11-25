# Home — eminkoksal.com

> Drop-in content for the homepage of the new site. Aligned with `brand-guide.md` (verbal identity). Visual design (colors, typography, spacing, components) is handled in Claude Design. English. Each section is a self-contained block; the new site builder can split or reorder as needed.
>
> **Layout note (Emin Style v1.2, 2026-11-25):** the page now opens with the name at display size, then an ink band that draws the citation network of the 2026 paper (Section 1b). Coral marks evidence only: the 18,513 in the band, the 10,000+ on the lead featured card, the "1000s" in the stat row, and the closing block, which sits on the one coral surface of the page. Sections reveal on scroll and the figures count up. Copy outside Sections 1b and 3 is unchanged.
>
> **Voice note (2026-09-26 pass):** copy revised to the `emin-english-voice` register (the Turkish Emin in fluent English): verdict first, concede then rule, one aphorism and one vivid example per page at most, no em-dashes, no contractions in prose, American spelling except published titles, no consultancy phrasing. Builds on the 2026-06-11 humanizing rewrite. Facts unchanged.

---

## Section 1 — Hero

**Eyebrow**

> ECONOMIST · AI CONSULTANT · ASSOCIATE PROFESSOR

**H1**

> Emin Köksal

**Tagline** *(pick one and stay consistent across the site)*

> Where economic rigor meets AI fluency

**Lead paragraph** *(max ~95 words)*

> I have spent twenty years in competition economics, as an academic and, since 2015, as an economist working inside a law firm's competition team. I started using AI to save time on my own research. It ended up changing how I do the work. Today I design AI workflows for competition and regulation teams and train the lawyers and economists who use them. My latest paper had an AI model read all 9,995 published decisions of the Turkish Competition Board.

**Primary CTA buttons** *(two, side by side)*

- `View Research →` *(primary — leads to /research)*
- `Read the CV` *(secondary — leads to /cv)*

---

## Section 1b — The citation network (ink band)

*(New in v1.2. A full-width ink band directly under the hero. The network is drawn from `public/assets/citation-network.json`, a layout of the real citation data behind the 2026 paper; decisions run left to right by date, 1998 to 2025.)*

**Eyebrow**

> AI-NATIVE RESEARCH · SSRN 2026

**Hero figure** *(arc orange, counts up as the network draws)*

> 18,513

**Line beside the figure**

> citations connecting all 9,995 published decisions of the Turkish Competition Board, extracted by an AI model and mapped as one network

**CTA buttons**

- `Read the paper →` *(direct to SSRN: papers.ssrn.com/sol3/papers.cfm?abstract_id=7094258)*
- `Explore the research` *(to /research)*

**Label on the largest node** *(the year and the count are read from the data file, not typed here)*

> MOST CITED DECISION · 2011 · CITED 112 TIMES

**Source line** *(mono, under the year axis)*

> Each dot is a decision, each line a citation, placed by decision date. Shown: the largest connected component, 5,359 decisions and 15,689 citations. Köksal, Peker, Üyer, SSRN 2026

---

## Section 2 — The Four Pillars

**Eyebrow**

> WHAT I DO

**H2**

> Four areas of work that feed each other

**Intro paragraph**

> On paper it is an odd pairing: twenty years of competition economics and daily use of the newest AI tools. In practice each feeds the other. The economics decides which question a workflow should answer, and the workflows let my research ask questions that were too large to ask by hand.

**Pillar grid** *(four cards)*

### Card 1 — Academic Economics & Teaching

> Where the rest comes from. I am an Associate Professor of Economics, with 50+ publications, a co-edited Routledge volume, and the Associate Editor-in-Chief role at *Competition and Regulation in Network Industries* (SAGE). I have taught every year since 2002, and still do.

**Card link:** `Read more →` *(to /about#academic)*

### Card 2 — AI Strategy & Workflow Design

> I build AI workflows for competition and regulation teams at international law firms: playbooks, complex prompts, MCP-based research infrastructure. Then I train the people who use them. Everything I teach, I have run on a live matter first.

**Card link:** `Read more →` *(to /about#ai-strategy)*

### Card 3 — AI-Native Research

> My current research program uses AI to read legal texts at a scale no person could. The first paper analyzed all 3,369 infringement decisions of the Turkish Competition Board as a single dataset. The second maps the 18,513 citations connecting all 9,995 of its published decisions.

**Card link:** `Explore the research →` *(to /research)*

### Card 4 — Writing & Talks

> I have written for a general audience since 2013, mostly in Turkish, on competition cases, platform regulation, climate policy, and now AI. The whole archive is on this site. I also give talks, to academic and professional audiences alike.

**Card link:** `Read the blog →` *(to /blog)*

---

## Section 3 — Featured Work

**Eyebrow**

> FEATURED WORK

**H2**

> What I'm working on now

**Three-card layout** *(v1.2: one wide lead card for the work in progress, two smaller cards stacked beside it. The 2026 paper, "The Intellectual DNA of the Turkish Competition Board", is carried by the network band in Section 1b and does not repeat here)*:

### Card 1 — AI-Native Research (in progress) *(lead card: wide, sunken surface, not a link until there is something to link to)*

*(Added 2026-11-25. The project is the Bilgi 2027 seminar proposal; source: `Coding/Bilgi 2027/`. Two limits on this copy until they lapse: the seminar's decision on the abstract is due 9 December 2026, so the card does not name the seminar; and the pilot's accuracy figures are unverified until the lawyers' check ends on 4 January 2027, so no result is quoted. "10,000+" is the corpus: decisions published from 1997 to the end of 2026, a later and larger set than the 9,995 of the 2026 paper.)*

**Figure** *(coral)* **and its label** *(mono)*

> 10,000+ · DECISIONS PUBLISHED FROM 1997 TO 2026

> **How Predictable Is the Competition Board? A "Crystal Ball" Experiment with Thirty Years of Case Law and Artificial Intelligence**
>
> Every firm that drafts a distribution agreement is guessing how the Turkish Competition Board would rule. With F. G. Bilgin and C. Karataş, we are turning that guess into an experiment. An AI model reads the Board's decisions up to a given year, is told only the facts of the next year's cases, and has to call the outcome. Its hit rate, year by year, measures how predictable the case law is. Each miss goes to the lawyers on the team, who check whether the Board changed course.
>
> *Work in progress · first results expected in 2027.*

### Card 2 — AI-Native Research (published)

> **A Quarter-Century Analysis of the Turkish Competition Board's Decisions**
>
> With C. Peker and M. Üyer, we analyzed all 3,369 infringement decisions the Board published over twenty-five years. Nobody had treated that record as one dataset before; the patterns across industries and time only show up when you do.
>
> *SSRN, 2025.* `Read the paper →` *(direct to SSRN: ssrn.com/abstract=5731282)*

### Card 3 — Routledge volume (2024)

> **The Economics and Regulation of Digitalisation: The Case of Türkiye**
>
> A co-edited volume on Türkiye's digital transformation, with M. Eroğlu and M. Finger. My own chapter, written with O. Bakış, builds the Türkiye Digital Society Index.
>
> *Routledge, 2024.* `Read more →` *(to /research)*

---

## Section 4 — Numbers

*(The page's single stat moment. "1000s" is set in coral; the other three in ink.)*

| | | | |
|---|---|---|---|
| **20+** | **50+** | **1000s** | **11+** |
| years in competition economics | publications | legal documents analyzed with AI | courses taught |

---

## Section 5 — From the Blog

**Eyebrow**

> FROM THE BLOG

**H2**

> Essays & working notes

*(Auto-feed: latest three posts from /blog, with date and ~25-word excerpt each. Below the list, a single link.)*

**Link:** `Read all writing →` *(to /blog)*

---

## Section 6 — Closing CTA

*(Set on the page's one coral surface: arc orange block, ink text.)*

**H2**

> Working on something where economics, regulation, and AI meet?

**Body**

> Most of my work is with competition and regulation teams at international law firms and consultancies, alongside academic collaborations and my own research. If what you are doing overlaps with any of that, send me a note about it.

**CTA buttons**

- `Get in touch →` *(to /contact, primary)*
- `Connect on LinkedIn` *(secondary, opens LinkedIn)*

---

## SEO meta description (≤155 chars)

> *Academic economist and AI consultant. Twenty years in competition economics. AI workflows, practitioner training, and AI-native research.*

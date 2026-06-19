# Space Economy Atlas Content Automation Roadmap

Date: 2026-06-20
Status: Draft implementation roadmap

## Goal

Extend Space Economy Atlas from a static educational atlas into a lightweight space-economy intelligence hub. The site should continue to prioritize public education, but gradually add curated updates, source monitoring, and opt-in subscriptions.

## Editorial Principles

- Prefer official and primary sources: NASA, ESA, JAXA, ISRO, China Manned Space, CNSA, national space agencies, company websites, university labs, arXiv, and peer-reviewed journals.
- Keep automated content in a review queue before public display.
- Label uncertainty clearly: planned, announced, tested, launched, operational, delayed, or retired.
- Avoid investment framing. Company updates should explain infrastructure, capability, partnerships, and market signals.
- Keep bilingual summaries short enough for cards, email digests, and future audio updates.

## Phase 1: Curated Latest Signals

Build a manually updated `Latest Signals` content file.

Recommended scope:

- 5 to 8 updates per issue.
- One short bilingual summary per update.
- Tags: launch, rocket, satellite, station, applications, policy, research, company.
- Each update requires one source URL and one editorial takeaway.

Why first:

- No backend required.
- High editorial control.
- Gives subscribers a clear reason to return.

## Phase 2: Subscription Capture

Add a simple opt-in form before building automation.

Lean options:

- Buttondown, Mailchimp, ConvertKit, Beehiiv, or a simple Cloudflare Worker form endpoint.
- Store only email, language preference, and topic preferences.
- Start with monthly updates, then move to weekly if source volume supports it.

Recommended topic preferences:

- Launch and rockets.
- Satellites and connectivity.
- Space stations and microgravity.
- Orbital compute and AI.
- Government programs and policy.
- Academic research.

## Phase 3: Semi-Automated Source Collection

Use scheduled jobs to gather source candidates into JSON, not directly into the public site.

Candidate sources:

- NASA RSS/news pages.
- ESA news and programme pages.
- JAXA and ISRO news pages.
- China Manned Space and CNSA official updates.
- GOV.UK UK Space Agency updates.
- arXiv queries for orbital compute, space data centers, satellites, astrodynamics, robotics, and space sustainability.
- Official company newsrooms for selected companies.
- Selected Chinese commercial space company updates: LandSpace, Galactic Energy, CAS Space, Space Pioneer, Deep Blue Aerospace, Commsat, and Geespace.

Suggested implementation:

- GitHub Actions daily or weekly cron for low cost.
- Cloudflare Workers Cron when the site needs server-side integration.
- Output to `data/source-candidates/YYYY-MM-DD.json`.
- Add a manual review file that promotes selected items into the `latestSignals` export in `src/data/content.js`.

## Phase 4: AI-Assisted Summaries With Human Review

Use AI only after the source collection flow is stable.

Workflow:

1. Fetch source candidates.
2. Deduplicate by URL and title similarity.
3. Classify by chapter and topic.
4. Generate bilingual short summaries.
5. Add source labels and caveats.
6. Human editor approves before publishing.

Quality gates:

- No unsourced claims.
- No investment advice.
- No direct copying of source paragraphs.
- Source date and event date must be clear when available.

## Phase 5: Personalized Digest

After the content loop works, make subscriptions more useful.

Features:

- Language selection: English, Traditional Chinese, or both.
- Topic preferences.
- Monthly digest first; weekly optional.
- "Why it matters" note per update.
- Links back to the related atlas chapter.

## Suggested First Build

The first implementation pass now includes:

- A static `latestSignals` data model in `src/data/content.js`.
- A low-profile `Latest Signals` disclosure after Sources in the node Overview panel.
- A mailto-based subscription CTA as a temporary low-friction placeholder.

Next implementation pass:

- Replace the mailto placeholder with a real subscription endpoint.
- Store email, language preference, topic preferences, consent timestamp, and source page.
- Documentation for source-review workflow.

Do not build full automation until the manual editorial format feels useful.

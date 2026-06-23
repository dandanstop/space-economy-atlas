---
name: space-content-curator
description: Use when curating educational space-economy content from trusted official sources, especially when turning agency updates, university research, laboratory findings, company websites, and papers into structured website copy, chapter summaries, deep dives, source lists, or bilingual editorial notes.
---

# Space Content Curator

## Overview

Use this skill to turn raw space-sector source material into clear, credible, reader-friendly website content. The goal is not just to summarize information, but to shape it into a layered educational experience:

- a short homepage-level summary
- a deeper chapter explanation
- expandable research context
- source links readers can explore on their own

This skill is designed for editorial products like `Space Economy Atlas`, where the tone should stay informative, future-facing, and accessible without drifting into hype or investment advice.

## When to Use

- The project covers space economy, launch systems, satellites, stations, orbital infrastructure, downstream services, or adjacent industries.
- You need to update one or more content modules such as `Why it matters`, `How it works`, `Future signals`, `Government programs`, `Research notes`, `Companies to explore`, or `Sources`.
- You want to transform long reports, official websites, PDFs, or research pages into concise website-ready content.
- You need bilingual editorial output, especially English-first with matching Chinese structure.
- You want stronger educational depth from universities, laboratories, research centers, and mission organizations, not just company pages or news.

Do not use this skill for financial recommendations, rumor collection, or unreviewed auto-publication of scraped material.

## Inputs

Gather these when available:

- `chapter`: which section is being updated, for example `launch`, `rockets`, `satellites`, `space stations`, `industry`, or `future signals`
- `content_mode`: `chapter-refresh`, `signals-digest`, `source-to-web`, or `bilingual-refresh`
- `audience_level`: `general`, `curious beginner`, `design-savvy`, `technical-light`, or `expert-supporting`
- `language_mode`: `en`, `zh`, or `bilingual`
- `site_structure`: existing UI slots such as `summary`, `why_it_matters`, `how_it_works`, `government_programs`, `research_notes`, `companies_to_explore`, `future_signals`, `sources`
- `source_set`: URLs, PDFs, notes, or topics to research

If some inputs are missing, infer the likely chapter structure from the project files and current conversation before drafting.

## Editorial Principles

1. Lead with education.
   - Explain why the topic matters to society, infrastructure, science, or daily life.
   - Prefer systems thinking over isolated trivia.

2. Build from summary to depth.
   - Homepage text should be readable in seconds.
   - Deeper layers should reward curiosity with specifics, examples, and links.

3. Prefer primary sources.
   - Official agency pages, mission pages, university labs, research institutes, company websites, and papers come first.
   - Use third-party media only as a secondary pointer, not as the authoritative basis.

4. Keep the tone accessible.
   - Avoid jargon walls.
   - Translate technical material into plain language without flattening the meaning.

5. Avoid investment framing.
   - Company mentions should help readers explore the ecosystem, not interpret the site as stock-picking content.

6. Distinguish confidence levels.
   - Stable background knowledge can appear in the main body.
   - Emerging claims should be framed as signals, pilots, or early-stage possibilities.

## Supported Modes

### `chapter-refresh`

Refresh one content chapter for the site.

Output:

- short summary
- `Why it matters`
- `How it works`
- optional `Government programs`
- optional `Research notes`
- optional `Companies to explore`
- curated `Sources`

### `signals-digest`

Collect recent official developments and reduce them into low-key editorial highlights.

Output:

- 5 to 8 concise signals
- each with date, source, why it matters, and optional follow-up link
- mark anything speculative as emerging

### `source-to-web`

Turn reports, PDFs, and source links into site-ready content blocks.

Output:

- `summary`
- `deeper detail`
- `link list`
- `editor notes`

### `bilingual-refresh`

Prepare English-first content and then align Chinese to the same structure and meaning.

Output:

- English source-of-truth copy
- Chinese counterpart with matching hierarchy
- note any terms that should stay in English for clarity

## Source Hierarchy

Always prioritize sources in this order when possible:

1. National and intergovernmental agencies
2. Mission operators and applied research centers
3. University laboratories and research institutes
4. Company official websites and technical blogs
5. Papers, preprints, and academic summaries
6. Reputable secondary reporting only when needed for context

Read `/references/source-whitelist.md` before selecting sources for a chapter update.
Read `/references/chapter-templates.md` before drafting chapter-specific content for atlas-style sites.

## Source Whitelist Rules

Use the whitelist as an inclusion guide, not as a forced quota.

- A source can appear in `summary` only if a general reader can understand it without specialist context.
- A source can appear in `Why it matters` if it supports public value, long-term infrastructure, or systems-level impact.
- A source can appear in `How it works` if it helps explain engineering, operations, manufacturing, launch, orbital mechanics, or service delivery.
- A source can appear in `Research notes` if it is more technical, lab-based, experimental, or paper-linked.
- A source can appear in `Companies to explore` only if it is a meaningful industry participant and the link goes to the official company site.
- A source can appear in `Future signals` when it reflects early movement worth watching, such as in-orbit demos, policy pilots, new lab programs, frontier manufacturing, orbital compute, or on-orbit servicing.

## Regional Coverage

Default coverage should be globally balanced across:

- United States
- Europe
- Japan
- India
- China
- Taiwan
- selected international research collaborations

Do not omit major countries with sustained space activity if they materially improve the reader's understanding of the ecosystem.

## China Coverage Guidance

China is in scope and should be handled as a serious part of the global space ecosystem.

- Prefer official English-language pages when available.
- Favor mission, institute, laboratory, observatory, or university pages over generic news pages.
- Keep the framing educational and technical, not geopolitical.
- If a useful source exists only in Chinese or has weak English coverage, it may still be listed in `Sources` or `editor notes`, but mark it for editor review before homepage publication.

## Workflow

1. Identify the chapter and its role in the site.
   - Is the section about public understanding, technical process, ecosystem mapping, or future scenarios?

2. Gather source candidates.
   - Start with official agencies and mission pages.
   - Expand to university labs and research centers for explanatory depth.
   - Add company sites for ecosystem exploration.

3. Sort material into information layers.
   - `summary`
   - `Why it matters`
   - `How it works`
   - `Government programs`
   - `Research notes`
   - `Companies to explore`
   - `Future signals`
   - `Sources`

4. Compress for readability.
   - Lead each section with 2 to 4 sentences.
   - Use expandable details for denser evidence, program lists, or technical notes.

5. Check editorial risk.
   - Remove direct investment prompts.
   - Avoid unverified claims.
   - Do not overstate early-stage technology readiness.

6. Align bilingual structure when requested.
   - English should define the architecture.
   - Chinese should preserve the same factual hierarchy and reader intent.

7. Match the chapter template.
   - Use the chapter guidance file to tune emphasis, source mix, and reader prompts for each card.

## Recommended Output Shape

Use this structure unless the project asks for a different schema:

```yaml
chapter:
summary:
why_it_matters:
how_it_works:
government_programs:
research_notes:
companies_to_explore:
future_signals:
sources:
editor_notes:
```

## Chapter Template Use

For atlas-style experiences with five core cards, use the chapter templates to keep each chapter distinct.

- `Launch Sites` should emphasize geography, infrastructure, cadence, regulation, and mission readiness.
- `Rockets` should emphasize propulsion, staging, payload delivery, reuse, and industrial capability.
- `Satellites` should emphasize orbit roles, sensing, communications, navigation, and service layers.
- `Space Stations` should emphasize microgravity research, servicing, crew systems, in-orbit operations, and future orbital industry.
- `Industry` should emphasize the value chain, enabling systems, downstream services, strategic bottlenecks, and future signals.

Do not let all five cards collapse into the same narrative shape.

## Writing Standards

- Prefer concrete nouns over vague futurist language.
- Use numbers, dates, and mission names when they add clarity.
- Keep each summary sentence information-dense but readable.
- Link readers outward only to sources that deepen understanding.
- If mentioning companies, explain what role they play in the value chain.
- If using professors, labs, or research centers, tie them back to a practical question the reader cares about.

## Good Fits for This Skill

- Turning NASA, ESA, JAXA, ISRO, CAS, or WEF material into atlas content
- Adding university-lab depth to `How it works`
- Curating `Government programs` and `Research notes`
- Expanding `Companies to explore` beyond listed firms while staying educational
- Building low-key `Latest signals` or `Future signals` blocks

## Common Mistakes

- Treating the site like a stock watchlist
- Filling chapters with raw facts but no explanatory structure
- Using only company sources and forgetting public-interest framing
- Overloading the main page with research detail that belongs in expandable panels
- Ignoring China, Japan, India, or Europe when the topic is clearly global
- Summarizing papers without translating them into reader value

## Final Check

Before finishing:

- Did the content become easier to understand, not just longer?
- Are the sources primary and trustworthy?
- Is the hierarchy clear from summary to deep dive?
- Does the piece invite curiosity without overwhelming the reader?
- If bilingual, do both languages carry the same meaning and structure?

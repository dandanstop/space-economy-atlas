# Space Content Curator Workflow Guide

Project scope: `Space Economy Atlas` only. This workflow is intentionally scoped to space-industry and space-economy editorial work, and should not be treated as a general cross-project content skill.

`space-content-curator` is a project-local workflow for turning trusted space-industry sources into structured educational website content.

It is designed for editorial products like Space Economy Atlas, where the content needs to stay:

- educational
- source-driven
- globally aware
- bilingual-ready
- readable for non-specialists

## What The Skill Does

Use this skill when you want to:

- refresh one of the five main Space Economy Atlas cards
- turn reports, PDFs, and official source pages into website-ready copy
- expand `Why it matters`, `How it works`, `Government programs`, `Research notes`, `Future signals`, or `Companies to explore`
- curate global space content from agencies, universities, labs, companies, and papers
- keep English as the source-of-truth version and align Chinese to the same structure

## Supported Modes

### `chapter-refresh`

Refresh one content chapter for the site.

Best for:

- Launch Sites
- Rockets
- Satellites
- Space Stations
- Industry

Typical output:

- `summary`
- `why_it_matters`
- `how_it_works`
- `government_programs`
- `research_notes`
- `companies_to_explore`
- `future_signals`
- `sources`

### `signals-digest`

Collect recent official developments and reduce them into low-key editorial highlights.

Best for:

- Latest Signals
- monthly updates
- curated trend monitoring

Typical output:

- 5 to 8 short items
- date
- source
- why it matters
- optional follow-up link

### `source-to-web`

Turn source material into site-ready content blocks.

Best for:

- PDFs
- official reports
- notes from agency or lab pages
- long research pages that need compression

Typical output:

- summary
- deep-dive notes
- links
- editor notes

### `bilingual-refresh`

Create English-first content and align the Chinese version to the same hierarchy.

Best for:

- production content updates
- dual-language chapter refreshes
- keeping both languages consistent over time

## Recommended Prompt Patterns

### 1. Update one chapter

```text
Please use space-content-curator to refresh the Industry chapter for Space Economy Atlas.
Focus on summary, Why it matters, How it works, Government programs, Research notes, Companies to explore, Future signals, and Sources.
Keep it educational, English-first, and suitable for progressive disclosure.
```

### 2. Update one chapter in bilingual mode

```text
Please use space-content-curator in bilingual-refresh mode to update the Space Stations chapter.
Keep English as the source-of-truth version, then align Chinese to the same structure.
Add stronger research context and future orbital-industry signals.
```

### 3. Turn source material into site copy

```text
Please use space-content-curator in source-to-web mode.
Use the PDF and official source links I provide, then turn them into website-ready summary, Why it matters, How it works, Research notes, and Sources.
```

### 4. Curate latest official signals

```text
Please use space-content-curator in signals-digest mode.
Collect 5 to 8 recent official signals from NASA, ESA, JAXA, ISRO, CAS, and selected university labs.
Keep the tone low-key, educational, and suitable for a collapsed Latest Signals section.
```

### 5. Strengthen university and lab coverage

```text
Please use space-content-curator to improve the Satellites chapter.
Add more educational depth from university labs and research institutes, especially for How it works and Research notes.
```

## Recommended Inputs

When possible, provide:

- `chapter`
- `content_mode`
- `language_mode`
- `audience_level`
- `source_set`
- target slots such as `summary`, `why_it_matters`, `how_it_works`, `government_programs`, `research_notes`, `companies_to_explore`, `future_signals`, and `sources`

Example:

```yaml
chapter: industry
content_mode: chapter-refresh
language_mode: bilingual
audience_level: general
source_set:
  - NASA commercial LEO economy page
  - WEF report
  - company websites
  - university labs
```

## Source Strategy

The skill is built to favor primary sources in this order:

1. national and intergovernmental agencies
2. mission operators and applied research centers
3. university laboratories and research institutes
4. company official websites
5. papers and preprints

The whitelist already includes regional coverage across:

- United States
- Europe
- Japan
- India
- China
- Taiwan

China is explicitly included in scope. Core examples include:

- Chinese Academy of Sciences
- National Astronomical Observatories, CAS
- National Space Science Center, CAS
- Beihang University
- Harbin Institute of Technology
- Northwestern Polytechnical University

## How The Five Cards Differ

The skill includes chapter templates so the five main cards do not collapse into the same editorial shape.

### Launch Sites

Focus:

- geography
- launch infrastructure
- range systems
- safety
- readiness

### Rockets

Focus:

- propulsion
- staging
- payload delivery
- reusability
- manufacturing capability

### Satellites

Focus:

- orbit roles
- communications
- Earth observation
- navigation
- data services

### Space Stations

Focus:

- microgravity research
- crew systems
- docking
- robotics
- in-orbit operations

### Industry

Focus:

- value chain
- upstream, midstream, downstream structure
- enabling infrastructure
- software and services
- future opportunities

## Best Practices

- Lead with a simple summary before adding detail.
- Keep `Why it matters` useful for general readers, not just experts.
- Keep `How it works` concrete and visual.
- Put denser material into `Research notes`, `Future signals`, and `Sources`.
- Use company examples to map the ecosystem, not to imply investment advice.
- Include global government programs when they materially improve understanding.
- Use university labs to explain how emerging capabilities are actually being developed.

## Good Output Shape

When you want structured content, ask for this format:

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

## Example Requests For Space Economy Atlas

### Example A: Industry chapter refresh

```text
Please use space-content-curator to refresh the Industry chapter for Space Economy Atlas.
Raise Future signals above Companies to explore.
Keep company coverage educational, not investment-oriented.
Add more university and laboratory context under Research notes.
```

### Example B: Government programs expansion

```text
Please use space-content-curator to expand Government programs under Why it matters.
Include meaningful links from the United States, Europe, Japan, India, and China.
Keep the summary concise, with detail in expandable sections.
```

### Example C: Space Stations chapter with future orbital economy angle

```text
Please use space-content-curator to update the Space Stations chapter.
Strengthen the explanation of microgravity research, in-orbit servicing, commercial LEO transition, and future orbital industry.
Add research institutions and official program links.
```

### Example D: Latest Signals monthly editorial pass

```text
Please use space-content-curator in signals-digest mode for Space Economy Atlas.
Prepare 6 recent signals from agencies, labs, and official company updates.
Do not auto-publish speculative claims. Mark emerging items clearly.
```

## Where This Skill Fits In The Workflow

Recommended workflow:

1. gather sources
2. run `space-content-curator`
3. review for tone, hierarchy, and accuracy
4. adapt to site content objects or markdown
5. publish

This skill works especially well together with:

- `vercel-cloudflare-launch-check` for post-launch validation
- future `latest-signals-pipeline` workflow for semi-automated source collection

## Maintenance Notes

- Keep English as the primary editorial source when possible.
- Update the whitelist over time as new labs, programs, and regions become important.
- Add new chapter templates if the site grows beyond the current five-card structure.
- Recheck all external links periodically, especially company and research pages.

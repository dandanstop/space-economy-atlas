# Space Economy Atlas Workflows

This folder contains project-local editorial workflows for `Space Economy Atlas`.

These workflows are intentionally scoped to this project's space-industry content model. They should not be treated as general-purpose cross-project content tools unless they are explicitly redesigned and generalized.

## At A Glance

| Name | Scope | Purpose | Cross-project |
| --- | --- | --- | --- |
| `space-content-curator` | Project-local | Turn trusted space-industry sources into structured educational website content | No |
| `latest-signals-pipeline` | Project-local | Collect, deduplicate, tag, and prepare recent space-industry signals for editorial review | No |
| `vercel-cloudflare-launch-check` | Global skill | Verify production launch health for Vercel sites behind Cloudflare | Yes |

## Recommended Order

Use the workflows in this order when maintaining the site:

1. `latest-signals-pipeline`
2. manual editorial review
3. `space-content-curator`
4. publish site changes
5. `vercel-cloudflare-launch-check`

## Workflow Roles

## 1. `latest-signals-pipeline`

Use this first when the job is to discover what changed recently.

Primary role:

- scan recent updates from agencies, labs, universities, official company sites, and papers
- remove duplicates
- assign chapter tags and confidence labels
- prepare a review queue

Use it when:

- updating the low-profile `Latest Signals` section
- preparing monthly or weekly monitoring
- deciding which source items deserve editorial attention

Do not use it for:

- rewriting chapter copy
- producing final reader-facing explanations
- auto-publishing content

Main files:

- [latest-signals-pipeline/SKILL.md](/Users/daniel/Projects/space-economy-atlas/workflows/latest-signals-pipeline/SKILL.md)
- [latest-signals-pipeline/references/source-families.md](/Users/daniel/Projects/space-economy-atlas/workflows/latest-signals-pipeline/references/source-families.md)
- [latest-signals-pipeline/references/review-queue-schema.md](/Users/daniel/Projects/space-economy-atlas/workflows/latest-signals-pipeline/references/review-queue-schema.md)

## 2. `space-content-curator`

Use this after signal selection, or whenever trusted source material needs to become structured website copy.

Primary role:

- transform source material into `summary`, `Why it matters`, `How it works`, `Government programs`, `Research notes`, `Companies to explore`, `Future signals`, and `Sources`
- keep the editorial hierarchy clear
- support bilingual content with English as the source-of-truth version

Use it when:

- refreshing one of the five atlas cards
- turning PDFs and official pages into website-ready copy
- strengthening educational depth with government, lab, and university context

Do not use it for:

- source crawling
- feed monitoring
- deployment verification

Main files:

- [space-content-curator/SKILL.md](/Users/daniel/Projects/space-economy-atlas/workflows/space-content-curator/SKILL.md)
- [space-content-curator/references/source-whitelist.md](/Users/daniel/Projects/space-economy-atlas/workflows/space-content-curator/references/source-whitelist.md)
- [space-content-curator/references/chapter-templates.md](/Users/daniel/Projects/space-economy-atlas/workflows/space-content-curator/references/chapter-templates.md)

## 3. `vercel-cloudflare-launch-check`

This one is not stored in this folder because it remains a reusable global skill.

Primary role:

- verify that the public production site is healthy after deployment
- catch route, cache, asset, metadata, and Cloudflare proxy issues

Use it when:

- deploying updates to production
- checking `522`, stale assets, broken subpaths, or metadata regressions
- validating that public behavior matches local or preview expectations

Cross-project status:

- safe to reuse across other Vercel + Cloudflare projects

## Decision Guide

If the question is:

- "What changed recently?" -> use `latest-signals-pipeline`
- "How should this be explained on the site?" -> use `space-content-curator`
- "Did the production launch actually work?" -> use `vercel-cloudflare-launch-check`

## Project Boundary

`latest-signals-pipeline` and `space-content-curator` are project-local because they are tightly coupled to:

- the space-economy subject area
- the five-card atlas structure
- the project's educational tone
- its source families and editorial hierarchy

They should remain inside this repository unless they are intentionally redesigned for another domain.

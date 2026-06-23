# Space Economy Atlas Content Ops Runbook

Date: 2026-06-20  
Status: Active project workflow

## Purpose

This runbook explains how to maintain `Space Economy Atlas` as an educational space-industry site with light ongoing updates.

It is designed for a small team or solo operator who wants:

- controlled editorial quality
- low-noise updates
- clear approval checkpoints
- a repeatable path from source review to production launch

## Operating Principles

- Prefer official and primary sources.
- Keep the site educational, not investment-oriented.
- Use human review before publishing new `Latest Signals`.
- Keep the homepage calm; do not turn the site into a high-frequency news feed.
- Maintain English as the editorial source-of-truth language when possible.
- Treat production verification as a separate step from content editing.

## Core Tools And Workflows

### Project-local workflows

- [workflows/latest-signals-pipeline/SKILL.md](/Users/daniel/Projects/space-economy-atlas/workflows/latest-signals-pipeline/SKILL.md)
- [workflows/space-content-curator/SKILL.md](/Users/daniel/Projects/space-economy-atlas/workflows/space-content-curator/SKILL.md)
- [workflows/README.md](/Users/daniel/Projects/space-economy-atlas/workflows/README.md)

### Global reusable skill

- `vercel-cloudflare-launch-check`

Supporting docs:

- [docs/latest-signals-pipeline.md](/Users/daniel/Projects/space-economy-atlas/docs/latest-signals-pipeline.md)
- [docs/space-content-curator.md](/Users/daniel/Projects/space-economy-atlas/docs/space-content-curator.md)
- [docs/content-automation-roadmap.md](/Users/daniel/Projects/space-economy-atlas/docs/content-automation-roadmap.md)
- [docs/monthly-content-checklist-template.md](/Users/daniel/Projects/space-economy-atlas/docs/monthly-content-checklist-template.md)
- [docs/subpath-launch-checklist.md](/Users/daniel/Projects/space-economy-atlas/docs/subpath-launch-checklist.md)

## Recommended Cadence

### Monthly baseline

Use this as the default operating rhythm:

1. review recent sources
2. prepare a signal queue
3. select 3 to 6 meaningful updates
4. decide whether any chapter needs deeper copy refresh
5. update site content
6. verify production

### Optional weekly light pass

Only do this if source volume justifies it.

Recommended weekly scope:

- check for one or two major official updates
- add only high-signal items
- do not force a publish if nothing meaningful happened

## Standard Monthly Workflow

## Step 1: Scan recent sources

Goal:

- identify what changed in the last 30 days

Use:

- `latest-signals-pipeline`

Suggested prompt:

```text
Please use latest-signals-pipeline in review-queue mode.
Collect recent space-industry updates from the last 30 days across NASA, ESA, JAXA, ISRO, CAS, selected university labs, and official company sources.
Prepare a deduplicated review queue in markdown.
```

Expected output:

- candidate list
- chapter tags
- confidence labels
- why-it-matters note
- `hold`, `review`, or `ready-for-curator`

## Step 2: Manual editorial review

Goal:

- reduce the queue to the few items worth publishing

Use these filters:

- Is the source official or primary?
- Does the update teach readers something meaningful?
- Is it relevant to one of the five cards?
- Is it infrastructure, research, policy, or capability progress rather than noise?
- Is the claim clear enough to summarize without overstatement?

Recommended target:

- keep 3 to 6 strong items
- avoid publishing all collected items

## Step 3: Decide the update type

Choose one of these paths:

### A. `Latest Signals` only

Use when:

- the update is timely
- the chapter itself does not need a deeper rewrite

### B. `Latest Signals` plus chapter refresh

Use when:

- the new material changes how a topic should be explained
- a chapter now needs stronger `Why it matters`, `How it works`, `Government programs`, or `Research notes`

### C. Chapter refresh without new signal

Use when:

- the existing chapter is thin, outdated, or structurally weak
- a source packet or PDF needs to be turned into evergreen content

## Step 4: Curate chapter copy

Goal:

- transform selected source material into website-ready content

Use:

- `space-content-curator`

Suggested prompt:

```text
Please use space-content-curator to refresh the Industry chapter for Space Economy Atlas.
Focus on summary, Why it matters, How it works, Government programs, Research notes, Companies to explore, Future signals, and Sources.
Keep it educational, English-first, and suitable for progressive disclosure.
```

Use this step for:

- chapter summaries
- deeper educational explanations
- source-supported `Future Signals`
- `Government Programs`
- `Research Notes`
- `Companies to Explore`

## Step 5: Update the project files

Goal:

- apply approved content changes to the actual site

Typical areas to update:

- `src/data/content.js`
- site copy blocks
- `latestSignals` entries
- bilingual content objects

Checklist:

- English and Chinese structures still align
- `Sources` stay below the main explanation
- `Future Signals` stays above company exploration where intended
- company descriptions remain educational, not investment-like
- new source links are valid

## Step 6: QA locally

Goal:

- catch visual, content, and interaction regressions before deployment

Check:

- desktop, tablet, and mobile layouts
- chapter switching
- language switching
- audio and scene sync if updated
- card disclosures and source links
- any changed 3D interaction behavior

If the change affects structured content, also check:

- section order
- copy length
- overflow issues
- bilingual consistency

## Step 7: Publish

Publish using the normal project deployment flow.

Typical path:

1. commit changes
2. push to GitHub
3. deploy to Vercel
4. wait for production alias to update

## Step 8: Verify production

Goal:

- confirm the public site is truly healthy

Use:

- `vercel-cloudflare-launch-check`

Suggested prompt:

```text
Please use vercel-cloudflare-launch-check to validate the production site after deployment.
Check the public URL, path routing, metadata, key assets, and Cloudflare behavior.
```

Focus on:

- public URL status
- subpath routing
- OG image and metadata
- stale assets
- Cloudflare route or cache issues
- whether the apex and `www` DNS records are actually `Proxied` in Cloudflare when a Worker-based subpath proxy is expected

Cloudflare DNS lesson from this project:

- a deployed Worker route can still appear broken if the apex record or `www` record is set to `DNS only`
- when a hostname is `DNS only`, traffic goes directly to Vercel and never reaches the Worker, so subpath routes like `/space-economy` fall through to Vercel `404 NOT_FOUND`
- for Worker-based subpath projects on `dandanstop.me/xxxx`, verify both `dandanstop.me` and `www.dandanstop.me` are `Proxied` before treating the issue as a code or deployment failure
- if the apex host works but `www` still fails, compare Cloudflare propagation timing and confirm a matching Worker route exists for `www.dandanstop.me/<path>*`

If the live page still looks old after a successful deploy:

1. compare the direct Vercel alias and the public domain
2. inspect the live HTML for the exact `main.js` and `styles.css` version strings
3. confirm nested module imports such as `content.js` also moved to the new version
4. if HTML is new but runtime assets are stale, issue a fresh asset version string and redeploy before repeating cache purges

Recent lesson from this project:

- the public HTML updated successfully, but the visible About dialog still served old behavior because `index.html` referenced an older asset version
- bumping the asset version strings fixed the mismatch cleanly across Vercel and the Cloudflare subpath proxy

## Decision Matrix

Use this table when deciding which workflow to run.

| Situation | Use |
| --- | --- |
| Need to know what changed recently | `latest-signals-pipeline` |
| Need to rewrite or deepen site content | `space-content-curator` |
| Need to confirm production launch health | `vercel-cloudflare-launch-check` |

## Editorial Quality Gates

Before publishing, confirm:

- every public claim has a trustworthy source
- no wording sounds like stock advice or hype
- `Latest Signals` items are concise and useful
- chapter updates improve understanding, not just length
- speculative items are marked clearly
- Chinese and English remain aligned in meaning

## Light-Touch Publishing Rule

The site should feel curated, not overactive.

Good rule of thumb:

- if there is no meaningful update, do not force a publish
- if a source is interesting but not yet clear, keep it in review
- if a chapter refresh adds depth without needing a signal block, publish the chapter improvement on its own

## Handoff Notes For Future Maintainers

If handing this project to another editor or operator:

- start with [workflows/README.md](/Users/daniel/Projects/space-economy-atlas/workflows/README.md)
- use `latest-signals-pipeline` first, not `space-content-curator`
- treat `space-content-curator` as project-local and space-specific
- keep `vercel-cloudflare-launch-check` as the final production gate
- avoid changing the content hierarchy unless there is a clear editorial reason

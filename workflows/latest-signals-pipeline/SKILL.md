---
name: latest-signals-pipeline
description: Use when collecting, triaging, deduplicating, and preparing recent space-industry updates for editorial review, especially when building a low-profile Latest Signals workflow from agencies, labs, universities, official company updates, and research feeds without directly publishing unreviewed content.
---

# Latest Signals Pipeline

## Overview

Use this skill to build and operate a review-first update pipeline for space-industry content. This skill is not for rewriting full website chapters. Its job is to gather recent source candidates, sort them, reduce noise, and prepare a queue that an editor can approve before publication.

This skill works especially well for projects like `Space Economy Atlas`, where the site wants to add fresh signals without turning into a news feed.

## When to Use

- You need to collect recent updates from official space-industry sources.
- You want a `Latest Signals` section that stays low-key, curated, and educational.
- You need to turn raw feeds, source pages, and recent updates into a review queue.
- You want to prepare JSON or markdown handoff files for a human editor.
- You want to classify signals by chapter such as `launch sites`, `rockets`, `satellites`, `space stations`, or `industry`.
- You need to deduplicate overlapping agency posts, company announcements, and lab updates before editorial review.

Do not use this skill to rewrite chapter copy, build bilingual deep dives, or publish unreviewed content directly to the site. Use `space-content-curator` after signals are selected for editorial expansion.

## Core Boundary

This skill is for:

- source scanning
- signal triage
- deduplication
- labeling
- review queue preparation

This skill is not for:

- rewriting entire chapter content
- producing final long-form educational copy
- replacing editorial approval
- financial interpretation or investment recommendations

## Inputs

Gather these when available:

- `time_window`: for example `7d`, `30d`, or `90d`
- `source_scope`: agencies, labs, universities, company sites, papers
- `chapter_scope`: one chapter or all five
- `pipeline_mode`: `source-scan`, `review-queue`, or `monthly-digest-draft`
- `language_mode`: `en`, `zh`, or `bilingual`
- `max_items`: preferred queue size
- `output_format`: `json`, `markdown`, or `both`

If inputs are missing, choose defaults that match a lightweight editorial workflow:

- `time_window`: `30d`
- `pipeline_mode`: `review-queue`
- `language_mode`: `en`
- `max_items`: `12`
- `output_format`: `markdown`

## Required References

Read these before choosing sources or output structure:

- `/references/source-families.md`
- `/references/review-queue-schema.md`

## Supported Modes

### `source-scan`

Use when the goal is broad collection.

Output:

- source candidates
- title
- url
- source family
- date when available
- short note on relevance

### `review-queue`

Use when the goal is editorial selection.

Output:

- deduplicated signal list
- chapter tags
- confidence label
- why it matters note
- recommended next action such as `hold`, `review`, `ready for curator`

### `monthly-digest-draft`

Use when the goal is a low-volume issue draft for subscribers or a site disclosure block.

Output:

- 5 to 8 selected items
- one short summary per item
- source link
- editorial takeaway
- caveat note for anything emerging

## Workflow

1. Define the window and scope.
   - Decide which chapters and which source families matter for this pass.

2. Gather source candidates.
   - Prefer official agencies, mission pages, university labs, observatories, research centers, company newsrooms, and paper feeds.

3. Normalize source records.
   - Capture title, url, publication date, event date when available, source family, and likely chapter.

4. Deduplicate.
   - Merge duplicate URLs.
   - Merge near-duplicate titles that point to the same event.
   - Favor primary source URLs over reposts or summaries.

5. Classify.
   - Apply chapter tags and optional topic tags such as `policy`, `research`, `launch`, `orbital compute`, `in-orbit servicing`, `debris`, `connectivity`, or `manufacturing`.

6. Filter for editorial fit.
   - Remove weak, repetitive, vague, or low-signal items.
   - Keep items that teach readers something meaningful about the ecosystem.

7. Prepare the review queue.
   - Use the queue schema.
   - Mark each item as `hold`, `review`, or `ready for curator`.

8. Handoff.
   - If an item is selected for site copy or bilingual expansion, pass it to `space-content-curator`.

## Source Rules

- Prefer primary and official URLs.
- Prefer event pages, mission pages, lab pages, and official newsroom posts over general media coverage.
- If the same event appears across multiple posts, keep the most authoritative source.
- Keep speculative or early-stage items, but mark them clearly as emerging.
- Do not assume a company post is meaningful just because the brand is well known.

## Deduplication Rules

- Exact same URL: keep one record only.
- Same event across multiple URLs: keep the primary source and record secondary references only if they add unique technical detail.
- Same title with minor punctuation changes: treat as one signal.
- Repeated company marketing posts without new infrastructure or mission relevance: filter out.

## Confidence Labels

Use a simple confidence scale:

- `confirmed`: official release, mission page, or formal institutional update
- `credible`: strong source but secondary packaging or incomplete detail
- `emerging`: early indication, pilot, proposal, preprint, or initial demo

## Recommended Output Shape

Use this shape unless the project already has a stronger schema:

```yaml
date:
title:
url:
source_name:
source_family:
chapter_tags:
topic_tags:
confidence:
why_it_matters:
editor_note:
next_action:
```

## Relationship To Space Content Curator

`latest-signals-pipeline` comes before `space-content-curator`.

Use this skill to:

- find the signal
- clean the queue
- select the candidate

Use `space-content-curator` to:

- transform the chosen material into educational website copy
- align bilingual wording
- fit the content into chapter structure

Do not let the two skills collapse into the same job.

## Good Fits For This Skill

- monthly review of NASA, ESA, JAXA, ISRO, CAS, and university lab updates
- low-profile `Latest Signals` curation
- GitHub Actions or Cloudflare cron review-first workflows
- agency plus company plus research feed triage
- preparation for newsletter or digest drafting

## Common Mistakes

- publishing raw feed items without review
- treating all company posts as equally meaningful
- skipping universities and labs, which often contain the most useful future-facing signals
- writing long educational paragraphs instead of preparing an editorial queue
- mixing event date and publish date without labeling them

## Final Check

Before finishing:

- Is the queue deduplicated?
- Are primary sources favored?
- Is each item tagged to the right chapter?
- Are speculative items clearly marked?
- Does the output help an editor decide what to publish next?

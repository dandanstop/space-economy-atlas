# Latest Signals Pipeline Workflow Guide

Project scope: `Space Economy Atlas` only.

`latest-signals-pipeline` is a project-local workflow for collecting and triaging recent space-industry updates before they become website content.

It complements `space-content-curator`, but it does a different job.

## Short Version

- `latest-signals-pipeline` finds and prepares signal candidates
- `space-content-curator` turns selected signals into reader-facing content

Think of the relationship like this:

1. scan sources
2. clean and tag the queue
3. select promising items
4. pass selected items into `space-content-curator`

## What This Skill Does

Use this skill when you want to:

- collect recent updates from agencies, labs, universities, company sites, and papers
- deduplicate overlapping items
- classify updates by chapter and topic
- prepare a review queue for human approval
- draft a low-volume monthly digest
- support a future GitHub Actions or Cloudflare cron workflow

## What This Skill Does Not Do

Do not use it to:

- rewrite full chapter content
- generate final long-form educational copy
- replace editorial approval
- auto-publish raw feed results

That is where `space-content-curator` takes over.

## Supported Modes

### `source-scan`

Best for:

- broad source gathering
- early research
- raw source inventories

### `review-queue`

Best for:

- editorial triage
- deduplicated candidate selection
- preparing items for curation

### `monthly-digest-draft`

Best for:

- 5 to 8 curated updates
- low-key monthly issues
- preparing digest candidates for the site or a subscriber email

## Recommended Prompt Patterns

### 1. Build a review queue

```text
Please use latest-signals-pipeline in review-queue mode.
Collect recent space-industry updates from the last 30 days across NASA, ESA, JAXA, ISRO, CAS, selected university labs, and official company sources.
Tag each item by chapter, mark confidence, and prepare a review queue in markdown.
```

### 2. Scan one topic area

```text
Please use latest-signals-pipeline in source-scan mode.
Focus on orbital compute, in-orbit servicing, and commercial LEO infrastructure from the last 45 days.
Prioritize agencies, labs, and official company updates.
```

### 3. Prepare a monthly digest draft

```text
Please use latest-signals-pipeline in monthly-digest-draft mode.
Select 6 recent signals that are educationally meaningful for Space Economy Atlas.
Keep the output concise and suitable for human editorial review.
```

## Recommended Inputs

When possible, provide:

- `time_window`
- `source_scope`
- `chapter_scope`
- `pipeline_mode`
- `language_mode`
- `max_items`
- `output_format`

Example:

```yaml
time_window: 30d
pipeline_mode: review-queue
chapter_scope:
  - industry
  - space-stations
source_scope:
  - agencies
  - university-labs
  - company-sites
max_items: 10
output_format: markdown
```

## Difference From Space Content Curator

### `latest-signals-pipeline`

Primary job:

- source collection
- triage
- deduplication
- labeling
- review queue preparation

Output style:

- compact, operational, editor-facing

### `space-content-curator`

Primary job:

- editorial transformation
- bilingual shaping
- chapter writing
- summary and deep-dive structure

Output style:

- reader-facing, educational, polished

## Why They Are Not Too Duplicative

They touch similar sources, but they solve different steps in the workflow.

`latest-signals-pipeline` answers:

- What happened recently?
- Which sources are worth attention?
- Which items should go into the review queue?

`space-content-curator` answers:

- How should this information be explained to readers?
- Where does it belong in the chapter structure?
- How do we make it work in English and Chinese?

If we keep that boundary, the overlap stays low and the workflow stays clean.

## Recommended Workflow

1. run `latest-signals-pipeline`
2. review queue manually
3. choose items worth publishing
4. run `space-content-curator` on selected items
5. publish into the site

## Good Fit For Space Economy Atlas

This skill is especially helpful if the project wants:

- a low-profile `Latest Signals` section
- monthly or weekly editorial monitoring
- human review before publication
- future automation using GitHub Actions or Cloudflare Workers

## Maintenance Notes

- Keep the queue small and meaningful.
- Prefer primary sources over secondary summaries.
- Tag speculative or early-stage items clearly.
- Avoid turning the site into a high-frequency news stream.
- Keep the editorial lens educational and infrastructure-focused.

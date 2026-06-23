# Latest Signals Review Queue Schema

Use this schema for markdown or JSON review queues.

## Required Fields

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

## Field Guidance

- `date`: publication date when available; include event date separately in `editor_note` if needed
- `title`: concise normalized title
- `url`: canonical primary source URL
- `source_name`: institution, company, lab, or agency name
- `source_family`: one of `agency`, `mission-center`, `university-lab`, `company`, `paper`
- `chapter_tags`: one or more of `launch-sites`, `rockets`, `satellites`, `space-stations`, `industry`
- `topic_tags`: optional tags such as `policy`, `research`, `orbital-compute`, `servicing`, `debris`, `connectivity`, `manufacturing`
- `confidence`: `confirmed`, `credible`, or `emerging`
- `why_it_matters`: one short sentence for editor triage
- `editor_note`: optional note about duplication, caveat, or context
- `next_action`: `hold`, `review`, or `ready-for-curator`

## Example Markdown Entry

```yaml
date: 2026-06-18
title: "Agency advances commercial LEO infrastructure plan"
url: "https://example.gov/leo-update"
source_name: "Example Agency"
source_family: "agency"
chapter_tags:
  - "space-stations"
  - "industry"
topic_tags:
  - "policy"
  - "commercial-leo"
confidence: "confirmed"
why_it_matters: "The update shows how public stations policy is shifting toward commercially operated orbital infrastructure."
editor_note: "Good candidate for Future signals and Government programs."
next_action: "ready-for-curator"
```

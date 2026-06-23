# Space Economy Atlas Monthly Content Checklist

Month:
Owner:
Status: Not started / In progress / Completed

## 1. Planning

- [ ] Confirm the update window, for example last 30 days
- [ ] Confirm whether this is a light update or a deeper chapter refresh month
- [ ] Confirm target publish window
- [ ] Confirm whether English-only draft comes first before bilingual alignment

Notes:

## 2. Source Scan

- [ ] Run `latest-signals-pipeline`
- [ ] Collect recent updates from agencies, labs, universities, official company sites, and papers
- [ ] Deduplicate overlapping updates
- [ ] Tag items by chapter
- [ ] Mark confidence level for each candidate

Suggested target:

- 8 to 12 raw candidates

Notes:

## 3. Editorial Review

- [ ] Reduce the queue to the most meaningful items
- [ ] Remove weak, repetitive, vague, or overhyped items
- [ ] Keep only items that improve reader understanding
- [ ] Confirm each shortlisted item has a trustworthy primary source

Suggested target:

- 3 to 6 selected items

Selected chapters:

- [ ] Launch Sites
- [ ] Rockets
- [ ] Satellites
- [ ] Space Stations
- [ ] Industry

Notes:

## 4. Decide Update Type

- [ ] `Latest Signals` only
- [ ] `Latest Signals` plus chapter refresh
- [ ] Chapter refresh without new signal

If chapter refresh is needed:

- [ ] Identify which card needs deeper work
- [ ] Identify whether `Why it matters`, `How it works`, `Government programs`, `Research notes`, `Companies to explore`, `Future signals`, or `Sources` need updates

Notes:

## 5. Content Curation

- [ ] Run `space-content-curator` for selected chapters or source packets
- [ ] Keep summary concise and educational
- [ ] Keep `Why it matters` useful for general readers
- [ ] Keep `How it works` concrete and readable
- [ ] Keep `Future Signals` forward-looking but not overstated
- [ ] Keep company mentions educational, not investment-oriented
- [ ] Confirm source links still work

Notes:

## 6. Bilingual Alignment

- [ ] English updated first
- [ ] Chinese updated to match the same structure and meaning
- [ ] Terminology stays consistent across both languages
- [ ] No section is updated in one language but forgotten in the other

Notes:

## 7. Site Content Update

- [ ] Update `src/data/content.js`
- [ ] Update `latestSignals` entries if needed
- [ ] Update chapter copy blocks if needed
- [ ] Update `Sources` links if needed
- [ ] Confirm `Future Signals` stays above company exploration where intended
- [ ] Confirm `Sources` stays below the main explanation where intended

Files changed:

## 8. Local QA

- [ ] Check desktop layout
- [ ] Check tablet layout
- [ ] Check mobile layout
- [ ] Check chapter switching
- [ ] Check language switching
- [ ] Check disclosures and source links
- [ ] Check audio and scene sync if related content changed
- [ ] Check for text overflow or layout regressions

QA notes:

## 9. Publish

- [ ] Commit approved changes
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Wait for production alias to update

Deployment notes:

## 10. Production Verification

- [ ] Run `vercel-cloudflare-launch-check`
- [ ] Confirm public URL status
- [ ] Confirm subpath routing
- [ ] Confirm key assets load correctly
- [ ] Confirm OG image and metadata
- [ ] Confirm no stale cache issue remains

Verification notes:

## 11. Final Editorial Gate

- [ ] Every public claim has a trustworthy source
- [ ] No copy sounds like investment advice
- [ ] `Latest Signals` entries are concise and useful
- [ ] Chapter updates improve understanding, not just length
- [ ] Speculative or early-stage items are clearly framed
- [ ] English and Chinese meanings still align

Final decision:

- [ ] Publish complete
- [ ] Needs follow-up edits
- [ ] Hold until next cycle

## 12. Archive

- [ ] Save the final selected signals list
- [ ] Record which chapters were touched
- [ ] Record major source additions
- [ ] Record follow-up ideas for next month

Carryover notes:

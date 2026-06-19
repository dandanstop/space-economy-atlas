# SEO Audit

Audit date: 2026-06-19

Site: Space Economy Atlas

Production URL: `https://dandanstop.me/space-economy`

Scope: single-page interactive 3D educational site, English default with Traditional Chinese language switching.

## Executive Summary

The site has a strong interactive concept and useful educational content, but the first audit found that the SEO foundation was thin because the original static HTML contained little indexable content and no structured metadata beyond a basic title and description.

This audit added the most important quick wins:

- Improved title and meta description.
- Added robots, author, theme color, Open Graph, and Twitter metadata.
- Added static hero and launch-site summary content to the HTML shell.
- Added a `noscript` educational summary for non-JavaScript contexts.
- Added JSON-LD structured data for `WebPage` and `LearningResource`.
- Added `robots.txt`.
- Added canonical URL, `og:url`, JSON-LD URL fields, and `sitemap.xml` after the production URL was confirmed.
- Added `og:image` and `twitter:image` using `https://dandanstop.me/space-economy/og-image.png`.
- Added JSON-LD `image` fields using the same social preview image.
- Expanded static verification to check key SEO snippets.

The biggest remaining SEO decisions are:

- Hreflang alternates.
- HTTPS and production caching headers.

## Current SEO Health

Overall: Medium.

The page is now much more understandable to crawlers and social previews, but it still needs social image, multilingual URL, and deployment-header work before launch.

Top priorities:

1. Decide whether Traditional Chinese should be a separate indexable URL, such as `/space-economy/zh/`, instead of only a JavaScript language state.
2. Re-check Core Web Vitals after deployment, especially JavaScript transfer size and WebGL startup cost.
3. Confirm HTTPS, production cache headers, root-domain robots behavior, and the production image URL on `dandanstop.me`.

## Technical SEO Findings

### 1. Canonical URL Configured

Impact: High, fixed.

Evidence: `index.html` now includes:

```html
<link rel="canonical" href="https://dandanstop.me/space-economy">
```

Why it matters: Google uses canonical URLs to consolidate duplicate signals and understand the preferred indexable URL. This is especially important for a single-page app that may be served with query strings such as `?verify=1` or `?forceFallback=1`.

### 2. Sitemap Added

Impact: Medium, fixed.

Evidence: `sitemap.xml` includes `https://dandanstop.me/space-economy`, and `robots.txt` references `https://dandanstop.me/space-economy/sitemap.xml`.

Deployment note: if this project is served under `/space-economy`, the root-domain `https://dandanstop.me/robots.txt` should also reference the sitemap URL.

### 3. International SEO Needs URL-Level Locale Strategy

Impact: High if Chinese organic traffic matters.

Evidence: The site switches language in JavaScript but currently uses one URL.

Why it matters: Search engines need distinct URLs to index distinct language versions reliably. A JavaScript-only language switch can be useful for users, but it is weak for multilingual indexing.

Recommended structure:

- `/space-economy` or `/space-economy/en/` for English.
- `/space-economy/zh/` for Traditional Chinese.
- Use self-referencing canonicals per locale.
- Use reciprocal hreflang:

```html
<link rel="alternate" hreflang="en" href="https://dandanstop.me/space-economy">
<link rel="alternate" hreflang="zh-Hant" href="https://dandanstop.me/space-economy/zh/">
<link rel="alternate" hreflang="x-default" href="https://dandanstop.me/space-economy">
```

Do not canonical Chinese to English. That would suppress the Chinese page.

### 4. Static HTML Was Too Thin

Impact: High, now improved.

Evidence before fix: `#hero-copy`, `#chapter-rail`, and `#node-panel` were empty in static HTML and populated by JavaScript.

Fix completed:

- Static H1 and hero summary added.
- Static chapter labels added.
- Static launch-site summary added.
- `noscript` educational summary added.

Maintenance note: keep static copy aligned with `src/data/content.js` whenever hero positioning changes.

### 5. JavaScript Payload And WebGL Startup Need Production CWV Review

Impact: Medium

Evidence: Three.js module is approximately 1.28 MB before network compression, and the total checked Three.js-related files are approximately 1.37 MB before compression.

Risks:

- LCP may be delayed if the first meaningful content waits on JavaScript or WebGL.
- INP may be affected if the 3D scene blocks the main thread on lower-end devices.

Current mitigations:

- Static HTML now contains the main H1 and summary before JavaScript runs.
- Reduced-motion users start in Explore Mode.
- Device pixel ratio is capped at 2.
- Particle tiers exist.

Future improvements:

- Bundle and minify production JavaScript.
- Serve compressed assets with Brotli or gzip.
- Add long-lived cache headers for Three.js and static assets.
- Consider lazy-loading postprocessing on low-power devices.

### 6. HTTPS And Security Headers Are Deployment Tasks

Impact: Medium

Evidence: Local audit is running on `http://127.0.0.1`.

Fix after deployment:

- Serve production over HTTPS.
- Redirect HTTP to HTTPS.
- Add HSTS only after HTTPS is stable.
- Check for mixed content after adding social images or external assets.

## On-Page SEO Findings

### 1. Title And Description Were Generic

Impact: Medium, fixed.

Previous title:

```text
Cinematic Space Economy Atlas
```

Updated title:

```text
Space Economy Atlas | 3D Guide to Space Infrastructure
```

Previous description mentioned ground stations even though the node changed to space stations.

Updated description:

```text
Explore the space economy through an interactive 3D guide to launch sites, rockets, satellites, space stations, and downstream applications.
```

### 2. H1 Is Now Available In Static HTML

Impact: High, fixed.

Current H1:

```text
The space economy is an industry chain from Earth to orbit
```

This aligns the visible message, title, and primary topic around "space economy" and "space infrastructure."

### 3. Open Graph And Twitter Metadata Added

Impact: Medium, partly fixed.

Added:

- `og:type`
- `og:site_name`
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:image:secure_url`
- `og:image:width`
- `og:image:height`
- `og:image:alt`
- `og:locale`
- `og:locale:alternate`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:image:alt`

Still needed:

- Confirm `https://dandanstop.me/space-economy/og-image.png` returns 200 after deployment.

### 4. Content Depth Is Strong But Hidden Behind Interaction

Impact: Medium

The overview cards include strong educational content, key numbers, risk framing, and source notes. This is good for E-E-A-T, but search engines and users may miss some of it if it stays only inside collapsed UI.

Recommendations:

- Keep summaries and key concepts visible by default.
- Consider a future "Read the full guide" section below the 3D experience for a crawlable long-form version.
- If SEO traffic becomes a priority, create dedicated content pages for each node.

## Content And E-E-A-T Findings

Strengths:

- Clear editorial angle: space economy as infrastructure.
- Uses credible sources: NASA, WEF, and SpaceX company disclosure materials.
- Includes specific figures and risk caveats.
- Includes contact information through the About modal.
- Last updated date is visible in the About modal.

Risks:

- Some figures come from company disclosures and should remain labeled as such.
- Collapsed source lists are user-friendly, but a future long-form page could make provenance more visible.
- GA4 is now installed, but there is no visible privacy policy or terms page yet. Add a short privacy notice if the project is shared broadly or connected to broader site analytics.
- If this page targets jurisdictions requiring cookie consent, add a consent banner or Google Consent Mode before launch.

## Structured Data Findings

Status: JSON-LD added.

Current schema types:

- `WebPage`
- `LearningResource`

Why this choice:

- The page is educational and interactive, not a product, article, event, or FAQ page.
- The schema represents visible page content without promising unsupported rich results.

Validation checklist after deployment:

- Test with Google Rich Results Test.
- Test with Schema.org Validator.
- JSON-LD `image` fields are currently set to `https://dandanstop.me/space-economy/og-image.png`.

## Prioritized Action Plan

### Critical Before Public Launch

1. Serve the site on HTTPS.
2. Confirm `https://dandanstop.me/space-economy/og-image.png` returns 200 after deployment.
3. Confirm `https://dandanstop.me/space-economy/sitemap.xml` returns 200 after deployment.
4. Confirm the root-domain `https://dandanstop.me/robots.txt` references the sitemap if this project is deployed below the domain root.

### High Impact If Chinese SEO Matters

1. Create distinct `/en/` and `/zh/` URLs, or `/` plus `/zh/`.
2. Add self-canonical per language page.
3. Add reciprocal hreflang and `x-default`.
4. Ensure all metadata is localized per URL.
5. Avoid IP or Accept-Language redirects.

### Quick Wins Already Completed

1. Improved title and meta description.
2. Added social metadata.
3. Added static H1 and hero summary.
4. Added `noscript` fallback content.
5. Added JSON-LD.
6. Added `robots.txt`.
7. Expanded static SEO verification.
8. Added canonical URL, `og:url`, sitemap, and production URL fields.
9. Added 1200 x 630 social preview image and social image metadata.

### Longer-Term SEO Content Opportunities

1. Create crawlable chapter pages:
   - `/launch-sites/`
   - `/rockets/`
   - `/satellites/`
   - `/space-stations/`
   - `/space-economy-applications/`
2. Add a glossary for terms such as LEO, mass to orbit, constellation, debris mitigation, direct-to-device, and orbital services.
3. Add source-backed explainers for NASA LEO economy, orbital sustainability, and reusable launch economics.
4. Add internal links from the atlas page to those supporting pages.

## Verification

Run after SEO-related changes:

```bash
npm test
npm run render:og
npm run build
npm run verify:browser
```

Current automated checks cover:

- Static SEO snippets.
- Static H1 presence.
- JSON-LD presence.
- `noscript` presence.
- Desktop and mobile renderability.
- Mobile horizontal overflow.
- About modal behavior.
- WebGL fallback.

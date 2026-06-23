---
name: vercel-cloudflare-launch-check
description: Use when a website is deployed with Vercel and served through Cloudflare, especially when validating production launch, subpath routing, cache busting, Worker proxies, OG assets, canonical metadata, or when a public URL works differently from local or preview environments across marketing sites, docs, apps, and interactive web experiences.
---

# Vercel Cloudflare Launch Check

## Overview

Use this skill to verify that a public website is actually healthy after deployment, not just that the build succeeded. Focus on production behavior across Vercel deployment state, Cloudflare routing, asset freshness, and public-facing metadata.

This skill is intentionally general-purpose. It is suitable for marketing sites, documentation sites, product microsites, apps, and interactive web experiences, including WebGL-heavy frontends.

## When to Use

- The site is hosted on Vercel and the public domain is behind Cloudflare.
- The site uses a subpath such as `/space-economy`, `/blog`, or `/campaign/...`.
- Local or preview environments work, but the public URL shows different behavior.
- The team needs a production preflight before launch, or a post-deploy audit after launch.
- Symptoms include `522`, stale JS or CSS, broken rewrites, missing OG images, wrong `canonical`, or HTML and assets serving different revisions.

Do not use this skill for local-only tools or projects without a public Vercel + Cloudflare deployment path.

## Inputs

Gather these values before running checks when available:

- `production_url`: Public URL, for example `https://example.com/product`
- `path_prefix`: Optional subpath, for example `/product`
- `vercel_project`: Optional Vercel project name
- `cloudflare_worker`: Optional Worker or route name
- `check_mode`: `preflight`, `post-deploy`, or `incident-check`

If some values are missing, infer them from `vercel.json`, `wrangler.jsonc`, `index.html`, `.vercel/project.json`, `README.md`, or the current conversation.

## Modes

### `preflight`

Use before deployment to catch configuration mistakes:

- `vercel.json`, `.vercelignore`, and `wrangler.jsonc`
- path-prefix assumptions in `index.html`, JS imports, and asset URLs
- metadata targets such as `canonical`, `og:url`, and `og:image`
- cache-busting version strings for runtime assets

### `post-deploy`

Use after deployment to verify the live site:

- Vercel deployment and alias status
- production URL HTTP status
- HTML, JS, CSS, OG image, and other referenced assets
- Cloudflare proxy headers and path behavior
- metadata presence in the actual served HTML

### `incident-check`

Use when the public site is already failing:

- identify whether the fault is Vercel, Cloudflare, stale cache, bad rewrites, or metadata mismatch
- compare the served HTML revision with expected asset versions
- isolate whether the issue affects root, trailing slash, subpath assets, or share cards

## Workflow

1. Confirm the target.
   - Resolve the production URL and expected path prefix.
   - Note whether the site is supposed to serve from root or from a subpath.

2. Verify deployment state.
   - Use `vercel --prod`, `vercel ls`, or `vercel inspect` when deployment status matters.
   - Confirm the latest production deployment is `READY`.

3. Check the public URL with `curl`.
   - Inspect `production_url`
   - Inspect `production_url/` when trailing slash behavior matters
   - Record status code, redirects, `content-type`, cache headers, and proxy headers

4. Check critical assets directly.
   - HTML document
   - main JS entry
   - primary stylesheet
   - OG image
   - any path-prefixed runtime assets that are easy to regress

5. Compare served HTML with expected references.
   - Confirm the live HTML points at the intended JS/CSS version strings
   - Confirm the live JS contains the expected fix markers when checking a recent incident
   - If the site uses versioned asset URLs, confirm that `index.html`, the served module entry, and any nested module imports all reference the same new asset generation

6. Validate SEO and share metadata from served HTML.
   - `canonical`
   - `og:url`
   - `og:image`
   - `twitter:image`
   - `google-site-verification`
   - JSON-LD when present

7. Summarize by failure layer.
   - `deployment`
   - `routing`
   - `cache`
   - `metadata`
   - `asset availability`

## Command Patterns

Prefer these patterns:

```bash
vercel --prod --yes
vercel inspect <deployment-url>
curl -I -L <production-url>
curl -L -sS -o /tmp/page.html -w "%{http_code} %{url_effective} %{content_type}\n" <production-url>
```

Useful follow-up checks:

```bash
curl -L -sS -o /tmp/asset.js -w "%{http_code} %{url_effective} %{content_type}\n" '<asset-url-with-version>'
rg -n "canonical|og:url|og:image|google-site-verification" /tmp/page.html
rg -n "<expected-fix-marker>" /tmp/asset.js
```

## Diagnosis Guide

- `Vercel problem`:
  build failed, deployment not `READY`, alias missing, or deployment URL itself is broken.

- `Cloudflare problem`:
  `522`, wrong redirects, missing Worker headers, or public domain differs from direct Vercel deployment behavior.

- `Cache problem`:
  served HTML references an old asset version, or new HTML points to old runtime files still cached at the public URL.

- `Nested asset-version problem`:
  the HTML references a new `main.js` URL, but that `main.js` still imports an older `content.js`, data module, or stylesheet version, causing the live page to show stale content even after a successful deploy.

- `Routing problem`:
  `/path` and `/path/` behave differently, static assets resolve from root instead of subpath, or rewrite/proxy logic strips the prefix incorrectly.

- `Metadata problem`:
  public HTML is reachable but `canonical`, `og:image`, `twitter:image`, JSON-LD, or verification tags are missing or stale.

## Cache-Busting Guidance

If the public site still shows stale UI after a confirmed healthy Vercel deployment:

1. Compare the direct Vercel production alias against the custom domain.
2. Inspect the actual asset URLs served by the public HTML.
3. Check whether nested imports inside `main.js` or similar entry files still reference old module versions.
4. If needed, issue a brand-new asset version string for:
   - `index.html` asset references
   - module entry files such as `main.js`
   - nested data modules or stylesheets loaded by that entry file
5. Re-deploy Vercel.
6. Re-deploy the Cloudflare Worker if it proxies the path and may still cache source assets.
7. Purge the custom-domain path or source-asset prefix if the custom domain still differs from the Vercel alias.

When a stale-content issue survives redeploy plus purge, prefer a fresh asset version over repeatedly purging the same URLs.

## Output Format

Respond with a concise launch report:

- `PASS` or `FAIL`
- deployment status
- public URL status
- asset status summary
- metadata summary
- root cause layer when failing
- exact next action when a fix is needed

Example:

```text
Launch Check: PASS

Deployment
- Vercel production deployment is READY

Routing
- /product -> 200
- /product/ -> 308 -> /product

Assets
- HTML 200
- JS 200
- CSS 200
- OG image 200

Metadata
- canonical OK
- og:url OK
- google-site-verification OK
```

## Common Mistakes

- Treating a successful Vercel build as proof the public site is healthy.
- Checking only HTML and not the referenced JS/CSS revision.
- Forgetting to test both `/path` and `/path/`.
- Verifying local files instead of the actual served HTML.
- Fixing code without confirming whether the real issue is Cloudflare cache or route configuration.
- Updating `index.html` version strings but forgetting that `main.js` may still import an older nested module version.
- Assuming a custom domain and the direct Vercel alias are serving the same asset generation without checking both.

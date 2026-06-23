# dandanstop.me Subpath Launch Checklist

Use this checklist for any project that will be served on a path such as `dandanstop.me/space-economy`, `dandanstop.me/datacenter-3d`, or future `dandanstop.me/xxxx` launches.

Project name:
Subpath:
Vercel production alias:
Cloudflare Worker name:
Status: Not started / In progress / Completed

## 1. Canonical URL and path plan

- [ ] Confirm the intended canonical public URL
- [ ] Confirm whether `www` should resolve directly or redirect to the bare domain
- [ ] Confirm the subpath does not conflict with another existing project
- [ ] Confirm metadata uses the final public path

Notes:

## 2. Vercel project readiness

- [ ] Production deployment is `READY`
- [ ] Vercel alias works directly
- [ ] Static assets load correctly from the subpath-aware build output
- [ ] Any public metadata files such as `llms.txt`, `llms-full.txt`, or `humans.txt` are included in `dist` if required

Checks:

```bash
vercel inspect <deployment-url>
curl -I https://<project-alias>.vercel.app/<subpath>
```

## 3. Cloudflare DNS

- [ ] Apex record for `dandanstop.me` is `Proxied`
- [ ] `www` record is `Proxied`
- [ ] No critical hostname for this project remains `DNS only`

Important lesson:

If a Worker-based subpath project stays `DNS only`, traffic goes directly to Vercel, the Worker never runs, and the subpath can return Vercel `404 NOT_FOUND` even when the Worker itself is deployed correctly.

## 4. Cloudflare Worker routes

- [ ] Route exists for `dandanstop.me/<subpath>*`
- [ ] Route exists for `www.dandanstop.me/<subpath>*` when `www` should also work
- [ ] Worker code does not assume only one hostname unless that is intentional
- [ ] Worker redirects and forwarded headers use the intended public host behavior

Notes:

## 5. Local configuration sanity check

- [ ] `wrangler.jsonc` matches the intended routes
- [ ] Worker upstream origin points to the correct Vercel project
- [ ] `vercel.json` rewrites and redirects match the intended subpath
- [ ] canonical, `og:url`, and sitemap entries match the public URL

Files to check:

- `wrangler.jsonc`
- `cloudflare/<worker-file>.js`
- `vercel.json`
- `index.html`
- `sitemap.xml`
- `robots.txt`

## 6. Public URL verification

- [ ] `https://dandanstop.me/<subpath>` returns `200`
- [ ] `https://www.dandanstop.me/<subpath>` returns expected behavior
- [ ] response headers show Cloudflare handling the request when Worker proxying is expected
- [ ] response headers include the Worker marker header if the project sets one

Checks:

```bash
curl -I https://dandanstop.me/<subpath>
curl -I https://www.dandanstop.me/<subpath>
```

Interpretation:

- `x-space-economy-proxy: cloudflare-worker` or equivalent means the Worker is handling the request
- plain Vercel `404 NOT_FOUND` usually means the hostname bypassed Cloudflare or the matching Worker route is missing

## 7. Asset and metadata verification

- [ ] HTML returns `200`
- [ ] main JS returns `200`
- [ ] main CSS returns `200`
- [ ] OG image returns `200`
- [ ] `llms.txt` returns `200` if used
- [ ] sitemap returns `200`
- [ ] canonical is correct
- [ ] `og:url` is correct
- [ ] `twitter:image` and `og:image` are correct

## 8. Final launch gate

- [ ] bare domain behavior confirmed
- [ ] `www` behavior confirmed
- [ ] Worker route confirmed
- [ ] DNS proxying confirmed
- [ ] no stale asset mismatch remains
- [ ] production analytics behavior confirmed if relevant

Final notes:

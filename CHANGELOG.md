# Changelog

All notable project changes are documented here so future editors, designers, and engineers can understand what changed and why.

This project follows a maintenance-friendly format inspired by Keep a Changelog, with sections grouped by user-facing behavior and implementation area.

## [Unreleased] - 2026-06-20

### Added

- Added the DanDanStop amber profile mark to the About dialog as a low-profile author identifier.
- Added `llms.txt`, `llms-full.txt`, and `humans.txt` so the project has AI-readable and maintainer-readable public metadata endpoints.
- Added deeper GA4 engagement tracking for chapter quality, audio progress, and About reading duration.

### Changed

- Raised `Future Signals` from an internal Deep dive subsection to its own Overview disclosure above company exploration.
- Replaced `Public-company examples` with `Companies to Explore`, grouping official company links into private and public companies.
- Expanded `Companies to Explore` with representative Chinese commercial space companies across launch, rockets, satellites, and downstream applications.
- Removed the education-only investment warning from the visible company section because the section is now an industry-discovery resource, not an investment list.
- Expanded `Why It Matters` with short educational intros and progressive `Expert Perspective` disclosures.
- Added `Government Programs` under `Why It Matters`, linking to global official space programs from NASA, ESA, the EU, the UK, ISRO, JAXA, China Manned Space, and CNSA.
- Added academic and research-institution links under `Research Notes`, including MIT, Stanford, Caltech, CU Boulder, LASP, and JAXA ISAS.
- Expanded `How It Works` with short technical intros and progressive `Research Notes` disclosures, including NASA and orbital-compute research references.
- Added a low-profile `Latest Signals` disclosure at the end of Overview, using a manually curated pilot issue filtered to the selected node.
- Moved `Sources` to the bottom of `How It Works` so readers encounter explanation and research context before citation details.
- Added a content automation and subscription roadmap for future latest-signal collection and newsletter development.
- Simplified the UI visual system for future multilingual expansion by reducing all-caps labels, decorative letter spacing, bright active states, and heavy glass effects.
- Confirmed English as the primary source language and changed content fallback helpers to return English when a localized language key is missing.
- Replaced the always-visible `EN / 中文` switcher with a compact current-language dropdown that defaults to `EN` and opens on demand.
- Fixed mobile audio playlist selection so changing a narration segment also moves the scroll-driven mobile chapter state and 3D focus to the matching node.
- Updated content tests so private companies do not require tickers, while public companies still include them when available.
- Refined the About dialog author mark sizing, spacing, and corner radius so it reads as a subtle signature instead of a hero visual.
- Updated the page title, `og:title`, and `twitter:title` to `Space Economy Atlas | A visual guide to how space infrastructure works`.
- Bumped production asset version strings after deployment so the public Cloudflare-served site would fetch the updated About dialog JavaScript and CSS instead of stale cached assets.
- Expanded the Vercel build output so `llms.txt`, `llms-full.txt`, and `humans.txt` are included in the deployed static package instead of being left out of `dist`.
- Updated the Cloudflare Worker route configuration to support both `dandanstop.me/space-economy*` and `www.dandanstop.me/space-economy*`, and changed the Worker to derive the public host dynamically instead of assuming only the bare domain.

### Maintenance Notes

- When production HTML is updated but the visible UI still looks old, compare the live `index.html` asset query strings against the expected `main.js`, nested content modules, and `styles.css` versions before assuming the deploy failed.
- For Vercel plus Cloudflare subpath launches, a fresh asset version string can resolve stale UI faster than repeated cache purges when HTML and runtime files are out of sync.
- When adding new public metadata files, verify both the build script and deployed subpath URLs. In this project, files can exist in the repo but still 404 in production if `scripts/build-vercel.mjs` does not copy them into `dist`.
- For Worker-based subpath projects on `dandanstop.me/xxxx`, make sure both the apex record and `www` record are set to `Proxied` in Cloudflare. If either host stays `DNS only`, traffic bypasses Cloudflare, the Worker never runs, and the subpath can fall through to Vercel `404 NOT_FOUND`.
- When one hostname works and the other does not, compare the response headers first. `x-space-economy-proxy: cloudflare-worker` indicates the Worker is handling the request; a plain Vercel `404` usually means the hostname is bypassing Cloudflare or the matching Worker route is missing.

## [0.1.0] - 2026-06-19

### Added

- Built the first complete interactive 3D concept for Space Economy Atlas.
- Added bilingual content support for English and Traditional Chinese.
- Set English as the default language.
- Added an SEO audit document with launch recommendations and maintenance notes.
- Added five primary educational navigation nodes:
  - Launch Site.
  - Rocket.
  - Satellite.
  - Space Station.
  - Applications.
- Added progressive content layers for each node:
  - Overview.
  - Industry.
  - Engineering.
  - Key numbers.
  - Reality check.
  - Deep dive.
  - Public-company examples.
  - Sources.
- Added editorial content based on NASA commercial space pages, NASA spaceships and rockets page, WEF Clear Orbit Secure Future 2026, and SpaceX company disclosure materials dated June 2026.
- Added educational public-company example links to the five primary Deep dive cards, with an education-only note that they are not investment advice.
- Added bilingual short audio-summary scripts for the five primary cards.
- Added a compact audio player with play, pause, resume, and playlist selection.
- Added ElevenLabs audio generation script that outputs bilingual MP3 files to `assets/audio/`.
- Changed the audio player from browser speech synthesis to fixed ElevenLabs MP3 playback.
- Added audio playlist to 3D node synchronization in Explore Mode.
- Added analytics events for audio playback, audio playlist selection, and company-example link clicks.
- Added source notes in `src/data/content.js` for future editorial review.
- Added a low-profile About link in the bottom-right corner for both desktop and mobile.
- Added About modal content curated by DanDanStop.
- Added `mailto:hello@dandanstop.me` Contact link in the About modal.
- Added native dialog behavior for the About modal, including close button and backdrop close.
- Added `README.md` as the main project documentation entry.
- Added `robots.txt` with a production sitemap placeholder.
- Added `sitemap.xml` for `https://dandanstop.me/space-economy`.
- Added JSON-LD structured data for `WebPage` and `LearningResource`.
- Added canonical URL and `og:url` for `https://dandanstop.me/space-economy`.
- Added Open Graph and Twitter metadata.
- Added a generated 1200 x 630 `og-image.png` social preview image.
- Added `npm run render:og` to regenerate the social preview image.
- Added Vercel deployment configuration for the `/space-economy` production path.
- Added `npm run vercel:build` to verify and prepare the static `dist` output for Vercel.
- Added `.vercelignore` to keep test artifacts and local documentation out of deployment uploads.
- Added deployment-generated directories to `.gitignore`.
- Added Cloudflare Wrangler CLI scripts for Worker login, dry-run, deploy, and account checks.
- Added Cloudflare Worker proxy configuration for `dandanstop.me/space-economy*`.
- Added Worker HTML base-path injection so relative assets load correctly under the `/space-economy/` subpath.
- Added GA4 tracking with Measurement ID `G-2CJ15FLWPY`.
- Added project-level analytics parameters: `project_slug: space-economy` and `project_name: Space Economy`.
- Added fixed GA4 page path `/space-economy` and production page location `https://dandanstop.me/space-economy`.
- Added interaction tracking for language selection, intro actions, node selection, overview panel, detail tabs, disclosures, About modal, and Contact link.
- Added [ANALYTICS.md](./ANALYTICS.md) tracking plan for future maintenance.
- Added static HTML hero, chapter, and launch-site summary content for crawler readability.
- Added `noscript` educational summary content.

### 3D Scene

- Built the 3D scene with Three.js, WebGLRenderer, EffectComposer, RenderPass, and UnrealBloomPass.
- Added a cinematic Earth-to-orbit composition with Earth, atmosphere, orbit lines, stars, launch site, rocket, satellite, space station, and application markers.
- Added procedural Earth texture generation for ocean, land, and cloud-like strokes.
- Added a more realistic launch site model with pad, tower, service arm, flame trench, storage tanks, and feedlines.
- Replaced the previous ground-station concept with a space station positioned around the orbital layer.
- Redesigned the satellite and space station to make their silhouettes clearly different.
- Added a realistic space station structure with truss, pressurized modules, docking ports, radiators, and solar arrays.
- Removed bright selection effects so selected objects keep their original appearance and remain readable.
- Added focus camera views for each major node so chapter selection moves the camera toward the matching object.

### Interaction

- Added Guided Intro mode with automatic camera movement through the main infrastructure story.
- Added Explore Mode after the intro completes.
- Added Skip Intro and Replay Intro actions.
- Added node selection through desktop chapter navigation.
- Added 3D object selection through raycasting.
- Added drag-to-rotate behavior after Guided Intro.
- Added desktop mouse-wheel chapter stepping across the five primary nodes.
- Added pointer-event handling for mouse, trackpad, stylus, and touch-capable browsers.
- Added click-vs-drag threshold to reduce accidental 3D object selection while rotating.
- Added camera orbit inertia and pitch clamping for a more controlled interaction feel.
- Added behavior that resets orbit rotation when switching to a different selected object.
- Added wheel-event guards so scrolling inside the information panel or modal does not change the active node.

### Mobile And Tablet

- Reworked mobile layout to prioritize the 3D model.
- Moved intro description and action controls to the lower part of the screen on mobile.
- Hid hero text during mobile Explore Mode to maximize model visibility.
- Converted the five chapter cards into a sticky bottom menu on mobile.
- Shows only the active chapter card by default on mobile.
- Added mobile scroll-step navigation so vertical scrolling switches between the five chapter views.
- Added mobile behavior where tapping the sticky chapter card opens the Overview bottom sheet.
- Added close behavior for the mobile Overview bottom sheet.
- Set canvas touch behavior to allow vertical scroll in mobile Explore Mode.
- Positioned the About link above the mobile sticky chapter card so it remains available without blocking the primary navigation.
- Added responsive refinements for widths below 920px and 640px.
- Added short-desktop-height behavior to keep navigation from covering the key visual and headline.

### Changed

- Changed the site name in Chinese from the English brand to `太空經濟地圖`.
- Increased the Chinese header brand size.
- Increased the mobile header brand size so it aligns better with the language switcher.
- Reordered language switcher display to `EN / 中文`.
- Rewrote the hero subtitle angle to be more science-education oriented and less repetitive with the site name.
- Reduced English hero kicker size while keeping Chinese sizing stable.
- Moved the hero kicker closer to the main headline.
- Simplified desktop hierarchy so the site name, navigation, hero title, description, and progressive content read in the intended order.
- Moved the About link out of the header and into the bottom-right corner.
- Updated About body copy from "just for you" to "just for fun".
- Changed the About Contact link style to match the body copy font size and color tone.
- Standardized Sources text inside node cards to 12px.
- Updated navigation button styling to feel integrated with the header system instead of like separate bordered cards.
- Updated the HTML title and meta description to match the current space-station and space-infrastructure positioning.

### Removed

- Removed the reset camera button.
- Removed the lower six value-chain text boxes from the visible page.
- Removed the `Explore Atlas / high / WebGL ready` status text from the visible page.
- Removed `Go deeper` text from content cards.
- Removed all selected-object visual highlight effects that made 3D models too bright or hard to inspect.
- Removed ground antennas and ground-platform visuals associated with the old ground-station node.

### Accessibility And Fallback

- Added document language switching between `en` and `zh-Hant`.
- Kept interactive controls as real buttons.
- Added aria labels for the canvas, chapter navigation, language navigation, and modal close behavior.
- Added WebGL availability detection.
- Added a 2D fallback view when WebGL is unavailable.
- Added `?forceFallback=1` support for fallback verification.
- Added reduced-motion handling so users with reduced motion preferences start in Explore Mode.

### Testing And Verification

- Added and expanded content tests for bilingual copy, editorial layers, source integrity, and About copy.
- Added and expanded state tests for language switching, selected nodes, detail layers, mobile panel state, fallback behavior, and performance tiers.
- Added browser verification for:
  - Desktop rendering.
  - Mobile rendering.
  - Nonblank WebGL canvas.
  - No mobile horizontal overflow.
  - English and Chinese language switching.
  - About link placement.
  - About modal content, title line break, mailto link, and Contact style.
  - Mobile sticky chapter behavior.
  - Mobile scroll-step navigation.
  - WebGL fallback mode.
- Expanded static verification to check SEO metadata, JSON-LD, static H1, and `noscript` content.
- Expanded verification to check `og:image`, `twitter:image`, and `summary_large_image`.
- Expanded verification to check GA4 Measurement ID, fixed page path, project parameters, and local tracking guard.
- Expanded static verification to check the Vercel build command, output directory, redirect, and `/space-economy` rewrites.
- Verified Cloudflare Worker proxy responses for the production page, OG image, CSS, main JavaScript, Three.js runtime, and sitemap.
- Added generated browser verification report output under `artifacts/verify-browser.json`.

### Maintenance Notes

- Main editable content lives in `src/data/content.js`.
- UI rendering and mobile behavior live in `src/main.js`.
- Three.js models, lighting, camera focus views, and WebGL fallback live in `src/scene.js`.
- Pointer selection and drag handling live in `src/interactions.js`.
- Guided intro and exploded-view offsets live in `src/animations.js`.
- State transitions live in `src/state.js`.
- Responsive layout and visual hierarchy live in `src/styles.css`.
- Keep source figures labeled as either independent references or company disclosures.
- Before publishing externally, re-verify all market figures and long-term projections.
- Run `npm test`, `npm run build`, and `npm run verify:browser` after behavior, content, layout, or 3D interaction changes.
- Run `npm run vercel:build` before Vercel deployment so the generated `dist` output includes the Three.js runtime files required by the import map.
- Run `npm run cf:dry-run` before Cloudflare Worker deployment, then `npm run cf:deploy` to update the `dandanstop.me/space-economy*` route.
- If Wrangler reports that a route is assigned to another Worker, remove the conflicting Worker or route before deploying `space-economy-proxy`.

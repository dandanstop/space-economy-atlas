# Space Economy Atlas Project Notes

Space Economy Atlas is an interactive 3D educational explainer for the space economy. The site uses a cinematic Earth-to-orbit scene to explain how launch sites, rockets, satellites, space stations, and downstream applications become a repeatable infrastructure chain.

Production URL: `https://dandanstop.me/space-economy`

The default language is English. Traditional Chinese is available through the language switcher.

For implementation history and maintenance notes, see [CHANGELOG.md](./CHANGELOG.md).

For SEO findings and launch recommendations, see [SEO_AUDIT.md](./SEO_AUDIT.md).

For GA4 tracking details, see [ANALYTICS.md](./ANALYTICS.md).

## Editorial Direction

The site should communicate the space economy as an infrastructure system, not as isolated hardware.

Core message:

- Space activity starts on Earth and scales through orbital infrastructure.
- Launch sites and rockets are the logistics layer.
- Satellites and space stations turn orbit into service platforms.
- Downstream applications convert orbital capability into broadband, direct-to-device, aviation, maritime, IoT, disaster response, government, research, and commercial services.
- Long-term growth depends on orbital sustainability, debris governance, regulation, supply chains, capital intensity, and commercial adoption.

Primary educational nodes:

- Launch Site: integration, fueling, testing, mission control, safety, launch cadence, and pad capacity.
- Rocket: reusable transport, payload capacity, launch frequency, mass to orbit, and development risk.
- Satellite: communications, observation, navigation, data relay, constellation scale, and recurring services.
- Space Station: orbital research, commercial experiments, international cooperation, servicing, and future in-orbit infrastructure.
- Applications: Earth-facing services such as broadband, direct-to-device, mobility connectivity, IoT, disaster backup, Earth observation, and government missions.

Supporting industry-chain framing:

- Manufacture -> Launch -> Deploy -> Connect -> Apply -> Revenue.
- Revenue funds the next generation of infrastructure.
- Orbital safety and sustainability should be presented as economic issues, not only environmental or regulatory issues.

## Content Structure

The page follows a progressive disclosure structure:

- Hero: one clear science-education headline and short description.
- Five navigation nodes: Launch Site, Rocket, Satellite, Space Station, Applications.
- Overview cards: short summary first.
- Detail tabs: Overview, Industry, Engineering.
- Key numbers: concise numeric context for education.
- Reality check: constraints and risks for each node.
- Deep dive: collapsed by default for interested readers.
- Sources: collapsed by default with NASA, WEF, and SpaceX prospectus references.
- About: low-profile text link in the bottom-right corner, opening a modal dialog.

Current About content:

- Title breaks into two lines: "Curated by" and "DanDanStop".
- Contact link uses `mailto:hello@dandanstop.me`.
- Last updated: June 2026.
- The Contact link visually matches the About body copy in font size and color tone.

## Visual System

The visual direction is a high-realism WebGL scene with restrained editorial UI.

3D scene requirements:

- Use a cinematic Earth-to-orbit composition as the first visual signal.
- Keep the 3D model as the primary experience rather than placing it inside a card.
- Use realistic, readable forms for launch site, rocket, satellite, and space station.
- Launch site should resemble a real ground launch complex: pad, tower, service arm, flame trench, fuel tanks, and feedlines. It should not use spherical objects as the main launch-station metaphor.
- Space station should sit around the orbital line, not on the Earth surface.
- Satellite and space station models must be visually distinct: satellite as compact bus plus solar arrays, space station as truss, modules, docking ports, radiators, and larger arrays.
- Selected objects should keep their original appearance. Do not apply bright bloom, outline, or high-contrast selection effects that obscure the model.
- Use orbit lines, stars, atmospheric glow, and ACES tone mapping to support depth without overwhelming the object shapes.

UI hierarchy:

- Site name.
- Navigation system.
- Main headline.
- Description text.
- Progressive content.

The desktop navigation uses a quiet header and a five-node navigation rail. The About link is intentionally low emphasis and fixed in the bottom-right corner.

## Interaction Design

The site has two primary modes:

- Guided Intro: automatic cinematic camera tour.
- Explore Mode: user-controlled navigation and model interaction.

Guided Intro:

- The intro camera moves through the main infrastructure story: launch site, rocket, satellite, orbital/space-station layer, and applications.
- Users can skip the intro.
- After the intro ends, the site enters Explore Mode.
- Users can replay the intro from the hero action.
- Users with `prefers-reduced-motion: reduce` start directly in Explore Mode.

Explore Mode:

- Clicking a top navigation node changes the selected chapter and moves the camera toward the matching 3D object.
- Clicking a selectable 3D object also selects the matching node.
- On desktop, mouse wheel input over the main 3D scene steps through the five primary nodes and updates the active card and camera focus.
- Desktop wheel stepping is disabled while the pointer is over scrollable or interactive UI such as the information panel, chapter navigation, language switcher, About link, or modal.
- After Guided Intro, users can drag on the canvas to rotate the camera around the selected object.
- Drag uses pointer events, so mouse, trackpad, stylus, and touch-capable browsers share the same interaction model.
- Click and drag are separated by a movement threshold to avoid accidental node selection.
- When a different object is selected, orbit rotation is reset so the new object starts from its intended editorial camera angle.

Object information:

- Desktop shows the information panel on the right.
- Mobile opens the information panel only when the user taps the bottom sticky node card.
- Overview includes summary, key numbers, reality check, Deep dive, and Sources.
- Industry and Engineering tabs provide compact bullet lists.

About interaction:

- About is a low-profile text button fixed at the bottom-right corner on desktop and mobile.
- Clicking About opens a native dialog modal.
- Clicking the close button or the backdrop closes the modal.

## Mobile And Tablet Behavior

Mobile layout prioritizes the 3D model.

Breakpoints:

- Desktop: wider than 920px.
- Mobile/tablet interaction layout: 920px and below.
- Small phone refinements: 640px and below.

Mobile intro:

- The header remains compact.
- Hero supporting text and the skip-intro action move to the bottom area.
- The 3D canvas remains the dominant visual area.

Mobile Explore Mode:

- Hero text is hidden to maximize model visibility.
- Only one active chapter card is visible as a sticky bottom menu.
- The user scrolls vertically to move through five invisible scroll steps.
- Each scroll step updates the active node and moves the 3D camera to the matching object.
- Tapping the visible sticky chapter card opens the Overview bottom sheet.
- The Overview bottom sheet can be closed with the close button.
- Canvas touch behavior allows vertical scroll in Explore Mode with `touch-action: pan-y`.
- About is placed above the bottom sticky card so it remains available without blocking primary navigation.

Tablet and short desktop handling:

- Intermediate desktop widths reduce panel and navigation density.
- Short desktop heights move the chapter rail into a compact vertical rail to avoid covering the key visual and headline.

Safe-area support:

- Fixed header, bottom chapter card, and About link account for `env(safe-area-inset-*)` where needed.

## Technical Specifications

Stack:

- Vanilla JavaScript ES modules.
- Three.js `^0.165.0`.
- Native CSS.
- Native HTML dialog for About modal.
- No build bundler; the app uses an import map in `index.html`.

Rendering:

- `THREE.WebGLRenderer` with antialiasing and alpha.
- `THREE.SRGBColorSpace`.
- `THREE.ACESFilmicToneMapping`.
- `EffectComposer`, `RenderPass`, and `UnrealBloomPass`.
- Procedural 3D geometry for Earth, launch site, rocket, satellite, space station, orbit lines, node markers, flame, stars, and atmosphere.
- Procedural canvas texture for Earth land, ocean, and cloud-like strokes.

Interaction:

- Raycasting selects 3D objects.
- Pointer events handle click and drag.
- Drag orbit uses yaw and pitch offsets with clamped polar angle.
- IntersectionObserver powers mobile scroll-step navigation.
- Application state is managed in `src/state.js`.
- Content and localized strings live in `src/data/content.js`.

Fallback:

- WebGL availability is checked at startup.
- If WebGL is unavailable, the app switches to a 2D fallback view.
- `?forceFallback=1` can be used to test fallback behavior.

Performance:

- Device pixel ratio is capped at 2.
- Particle count is controlled through performance tiers: high, medium, low.
- Reduced motion starts in Explore Mode instead of running the full intro.

Accessibility and semantics:

- Document language updates between `en` and `zh-Hant`.
- Main dynamic regions use `aria-live`.
- Language and chapter controls are real buttons.
- About uses a dialog with an accessible title and close label.
- Canvas includes an aria label.

## File Map

- `index.html`: DOM structure, canvas, header, About dialog, import map.
- `src/main.js`: rendering of UI, localization, mobile scroll steps, About modal, panel behavior.
- `src/scene.js`: Three.js scene, camera, models, lighting, WebGL fallback, drag orbit.
- `src/interactions.js`: node registry, raycast selection, pointer click/drag handling.
- `src/animations.js`: guided intro camera path and exploded-view offsets.
- `src/state.js`: application state transitions.
- `src/data/content.js`: bilingual copy, node metadata, editorial layers, source notes.
- `src/styles.css`: responsive layout, desktop/mobile UI, modal, panels, visual hierarchy.
- `scripts/serve.mjs`: local development server.
- `scripts/verify-static.mjs`: static structure verification.
- `scripts/verify-browser.cjs`: automated desktop/mobile/fallback browser verification.
- `cloudflare/space-economy-proxy.js`: Cloudflare Worker proxy for the production subpath.
- `wrangler.jsonc`: Cloudflare Worker route and deployment configuration.
- `test/content.test.mjs`: content schema and editorial source tests.
- `test/state.test.mjs`: state transition tests.

## Source Notes

Editorial inputs currently referenced by the site:

- NASA Spaceships and Rockets: `https://www.nasa.gov/humans-in-space/spaceships-and-rockets/`
- NASA Commercial Space: `https://www.nasa.gov/humans-in-space/commercial-space/`
- NASA Low Earth Orbit Economy: `https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/`
- WEF Clear Orbit, Secure Future, 2026.
- User-provided SpaceX EU Prospectus, June 5, 2026.
- FHILY / Three.js cinematic hero reference: `https://x.com/Oluwaphilemon1/status/2066394029076435318`

When publishing externally, independently verify market figures and label company-disclosed forecasts as company disclosures or expectations.

## Development Commands

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Regenerate the social preview image:

```bash
npm run render:og
```

Run tests:

```bash
npm test
```

Verify static files:

```bash
npm run build
```

Run browser verification:

```bash
npm run verify:browser
```

The browser verification checks:

- Desktop rendering and nonblank WebGL canvas.
- Mobile rendering and no horizontal overflow.
- Chinese/English language switching.
- About link, modal title line break, contact mailto, and contact text style.
- Mobile sticky chapter behavior.
- Mobile scroll-step navigation.
- WebGL fallback mode.

## Vercel Deployment

The project is prepared for Vercel as a static site served at:

```text
https://dandanstop.me/space-economy
```

Vercel configuration lives in `vercel.json`:

- Build command: `npm run vercel:build`.
- Output directory: `dist`.
- `/` redirects to `/space-economy`.
- `/space-economy` rewrites to `index.html`.
- `/space-economy/:path*` rewrites to root static assets in `dist`.

Prepare the Vercel output locally:

```bash
npm run vercel:build
```

The Vercel build script verifies static project requirements, recreates `dist`, then copies:

- `index.html`.
- `og-image.png`.
- `robots.txt`.
- `sitemap.xml`.
- `src`.
- Required Three.js runtime files from `node_modules/three`.

Create a Vercel preview deployment:

```bash
vercel
```

Create the production deployment:

```bash
vercel --prod
```

Post-deploy checks:

- Open `https://dandanstop.me/space-economy`.
- Confirm `https://dandanstop.me/space-economy/og-image.png` loads.
- Confirm `https://dandanstop.me/space-economy/sitemap.xml` loads.
- Confirm the 3D scene renders on desktop and mobile.
- Confirm GA4 receives production page views for `/space-economy`.

## Cloudflare Worker Route

The public production URL is served through a Cloudflare Worker route:

```text
dandanstop.me/space-economy*
```

The Worker proxies requests to:

```text
https://space-economy-atlas.vercel.app
```

Cloudflare configuration:

- Worker name: `space-economy-proxy`.
- Worker source: `cloudflare/space-economy-proxy.js`.
- Wrangler config: `wrangler.jsonc`.
- Route pattern: `dandanstop.me/space-economy*`.
- Zone name: `dandanstop.me`.

The Worker injects:

```html
<base href="/space-economy/">
```

This keeps relative app assets such as `./src/main.js`, `./src/styles.css`, and Three.js import-map URLs under the `/space-economy/` subpath when served from `dandanstop.me`.

Cloudflare commands:

```bash
npm run cf:whoami
npm run cf:dry-run
npm run cf:deploy
```

Post-deploy checks:

```bash
curl -I https://dandanstop.me/space-economy
curl -I https://dandanstop.me/space-economy/og-image.png
curl -I https://dandanstop.me/space-economy/src/main.js
curl -I https://dandanstop.me/space-economy/node_modules/three/build/three.module.js
```

Expected headers:

```text
HTTP/2 200
x-space-economy-proxy: cloudflare-worker
```

Troubleshooting:

- `522` from `dandanstop.me/space-economy` usually means Cloudflare is still routing to a broken origin or an outdated Worker.
- Wrangler will reject deployment if another Worker owns `dandanstop.me/space-economy*`.
- The previous conflicting Worker was `wild-term-9a52`; it was removed so `space-economy-proxy` could own the route.

# Space Economy Atlas Content Tabs and Future Signals Design

Date: 2026-06-20
Status: Approved and expanded for implementation

## Goal

Improve the five chapter cards so they feel more educational, repeat-visit worthy, and future-looking for readers who follow space industry development. The update should make the current `Industry` and `Engineering` tabs easier to understand, while adding a clear place for emerging opportunities such as orbital GPU servers, in-space AI compute, microgravity manufacturing, and space-native infrastructure.

## Editorial Lens

Use two combined perspectives:

- NASA-style public education: explain why a system matters to humanity, science, infrastructure, and future markets without overhyping early-stage technology.
- Aerospace professor framing: help readers learn the system logic, constraints, trade-offs, bottlenecks, and interfaces between launch, orbit, hardware, software, and downstream adoption.

The result should stay compact enough for the existing card UI, with deeper context reserved for Deep dive sections.

## Recommended Tab Naming

Replace the current tab labels:

- `Industry` -> `Why It Matters`
- `Engineering` -> `How It Works`

Chinese:

- `產業` -> `為何重要`
- `工程` -> `如何運作`

Keep:

- `Overview` / `摘要`

Rationale:

- `Industry` is accurate but feels internal and business-heavy.
- `Engineering` is accurate but can sound like a component list.
- `Why It Matters` and `How It Works` are clearer reader questions and fit a public science-learning experience.

## Content Pattern

Each chapter card should follow this logic:

- Overview: what this node is in the space economy.
- Why It Matters: what value it creates, what market or mission bottleneck it affects, and what metric readers should watch.
- How It Works: what systems make it function, what constraints engineers manage, and what trade-offs shape the design.

Each tab should begin with a short explanatory paragraph, then three concise bullets. The bullets should avoid being only nouns or slogans; each bullet should teach one relationship.

Use progressive disclosure for deeper learning:

- Why It Matters can add an `Expert Perspective` / `專家觀點` disclosure with a short takeaway from NASA, industry leaders, or public-facing space-economy voices.
- Why It Matters can add a `Government Programs` / `全球政府計畫` disclosure with official space-program links from global agencies and governments.
- Why It Matters can also include `Research Notes` / `研究線索` when the reader needs broader academic or research-institution context before going deeper into technical details.
- How It Works can add a `Research Notes` / `研究線索` disclosure with NASA technical pages, university research, or peer-reviewed/arXiv summaries.
- How It Works should place `Sources` at the bottom so readers can verify details after the technical explanation.
- Overview should keep the compact summary, key numbers, and reality check, then expose deeper sections in this order: `Deep dive`, `Future Signals`, `Companies to Explore`, `Latest Signals`.

## Proposed Card Copy Direction

### Launch Site

Why It Matters:

- Launch sites turn rockets into operational capacity; the key constraint is often pad turnaround, not only rocket performance.
- Site location, weather, safety corridors, and regulation shape how often missions can fly.
- Higher launch cadence enables satellites, stations, and future orbital compute platforms to scale.

How It Works:

- Integration facilities, launch towers, service arms, and fueling systems prepare the vehicle before flight.
- Telemetry, tracking, flight safety, and weather teams coordinate the countdown as one timed system.
- Ground infrastructure must recover quickly after each launch while staying within safety and environmental rules.

### Rocket

Why It Matters:

- Rockets are the logistics layer of the space economy, moving mass from Earth into useful orbit.
- Reuse only changes economics when inspection, repair, and relaunch cycles become reliable and fast.
- Lower launch cost expands what can be built in orbit, from satellite constellations to larger platforms.

How It Works:

- Engines, propellant tanks, structures, avionics, and staging work together to trade mass for velocity.
- Payload fairings protect cargo during ascent, then separate cleanly so satellites or modules can deploy.
- Reentry and reuse add heat, vibration, fatigue, and refurbishment constraints to the vehicle design.

### Satellite

Why It Matters:

- Satellites convert orbital hardware into services such as connectivity, navigation, Earth observation, and data relay.
- Constellation scale, refresh rate, and spectrum access determine how much capacity users actually experience.
- The next step is space-native computing, where satellites may process data in orbit before sending results to Earth.

How It Works:

- A satellite bus supplies power, thermal control, attitude control, command, and data handling for the payload.
- Antennas, optical links, and onboard processors decide how data moves between spacecraft, stations, and Earth.
- Radiation, orbital debris, limited repair access, and end-of-life deorbit planning shape every design choice.

### Space Station

Why It Matters:

- Space stations are orbital laboratories and work platforms, not only symbols of human presence.
- Microgravity creates conditions for research, biotech, materials science, and in-space production that are hard to reproduce on Earth.
- Commercial stations could make NASA, companies, universities, and governments customers in a broader LEO marketplace.

How It Works:

- Pressurized modules, trusses, docking ports, solar arrays, thermal systems, and life support form a maintainable habitat.
- Robotic arms, airlocks, and docking systems support experiments, cargo, repairs, and future in-orbit servicing.
- Crew safety, resupply cadence, radiation exposure, orbital debris, and station aging set practical limits.

### Applications

Why It Matters:

- Applications are where the space economy becomes visible on Earth: broadband, disaster response, mobility, IoT, observation, and secure communications.
- Revenue from services can fund the next layer of launch, satellites, stations, and orbital infrastructure.
- Emerging applications include orbital AI compute, sovereign cloud backup, in-space manufacturing, and data products created directly in orbit.

How It Works:

- User terminals, gateways, spectrum rights, inter-satellite links, and software routing determine service quality.
- Earth observation and space sensors can use onboard AI to reduce downlink bottlenecks and deliver faster insights.
- Adoption depends on price, reliability, latency, regulation, customer trust, and integration with existing networks.

## Future Signals Layer

Add a standalone Overview disclosure called:

- EN: `Future Signals`
- ZH: `未來訊號`

This should not become a sixth main card yet. It should appear above company examples so the site emphasizes future learning before company exploration.

Core ideas to include:

- Space is not only a destination; it is a natural industrial environment.
- Continuous solar exposure in some orbital regimes can support power-intensive systems.
- Microgravity can enable research and production paths in biotech, crystals, semiconductors, fiber optics, and advanced materials.
- Vacuum is useful for some processes, but heat removal still requires radiators because there is no air convection.
- Global line of sight, orbital vantage, and distributed assets can support resilient communications, Earth observation, sovereign backup, and disaster response.
- Orbital compute is most credible first as space-native edge processing: analyzing satellite or station data in orbit before downlink.

## GPU Server and Orbital Compute Framing

Use as a future signal, not as a guaranteed forecast.

Suggested English copy:

> The next space economy may not only move data through orbit. It may process, store, and manufacture value there.

Suggested Chinese copy:

> 下一階段的太空經濟，可能不只是把資料經過軌道傳回地球，而是在軌道上直接運算、儲存，甚至製造價值。

Possible supporting examples:

- Starcloud-1 carried an NVIDIA H100 GPU into orbit in November 2025.
- Starcloud-2 is described by Starcloud as a future commercial mission with a GPU cluster, persistent storage, 24/7 access, and thermal and power systems in a smallsat form factor.
- NASA's low Earth orbit economy pages position microgravity research, commercial stations, and in-space production as parts of a future commercial LEO marketplace.

Editorial caution:

- Avoid saying orbital AI data centers are already proven at large scale.
- Explain key constraints: launch cost, radiation, thermal management, repair access, downlink capacity, utilization, mission lifetime, orbital safety, and regulation.

## Companies to Explore Layer

Replace `Public-company examples` with:

- EN: `Companies to Explore`
- ZH: `值得探索的太空公司`

The goal is education and discovery, not investment framing. The list should include companies that are deeply building space infrastructure, whether private or public. Remove the existing investment-warning note. Instead, use a neutral reader prompt:

- EN: `Explore how different companies build launch, satellite, station, and downstream infrastructure.`
- ZH: `探索不同公司如何建置發射、衛星、太空站與下游服務基礎設施。`

Group companies by status:

- EN: `Private companies` / `Public companies`
- ZH: `未上市公司` / `上市公司`

Company records should include official website links. Public companies may include tickers; private companies should not require tickers.

Suggested examples by chapter:

- Launch Site: SpaceX, Blue Origin, LandSpace, CAS Space, Rocket Lab, Arianespace, Northrop Grumman.
- Rocket: SpaceX, Blue Origin, LandSpace, Galactic Energy, CAS Space, Space Pioneer, Deep Blue Aerospace, Rocket Lab, Relativity Space, Stoke Space, Firefly Aerospace.
- Satellite: SpaceX Starlink, Commsat, Geespace, Planet, Iridium, Astranis, Capella Space, MDA Space.
- Space Station: Axiom Space, Vast, Sierra Space, Starlab, Redwire, MDA Space.
- Applications: Starlink, Geespace, Commsat, AST SpaceMobile, Iridium, Viasat, Planet, Skylo.

## Sources to Attach

Use these as visible source links or reference notes in Deep dive:

- NASA Low Earth Orbit Economy: https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/
- NASA Commercial Space: https://www.nasa.gov/humans-in-space/commercial-space/
- NASA Why Go to Space: https://www.nasa.gov/humans-in-space/why-go-to-space/
- NASA Artemis: https://www.nasa.gov/humans-in-space/artemis/
- NASA Commercial LEO Destinations: https://www.nasa.gov/humans-in-space/commercial-space/low-earth-orbit-economy/commercial-destinations-in-low-earth-orbit/
- ESA Moonlight: https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Moonlight
- EU IRIS2: https://defence-industry-space.ec.europa.eu/eu-space/iris2-secure-connectivity_en
- UK National Space Strategy: https://www.gov.uk/government/publications/national-space-strategy
- ISRO Gaganyaan: https://www.isro.gov.in/Gaganyaan.html
- JAXA Space Strategy Fund: https://fund.jaxa.jp/
- JAXA Kibo: https://global.jaxa.jp/projects/iss_human/kibo/
- JAXA H3: https://global.jaxa.jp/projects/sas/h3/
- China Manned Space Program: https://en.cmse.gov.cn/aboutcms/
- China Space Station Science: https://en.cmse.gov.cn/spacescience/spacescienceresearchandapplication/
- CNSA Space Programs: https://www.cnsa.gov.cn/english/
- CNSA International Lunar Research Station: https://www.cnsa.gov.cn/english/n6465652/n6465653/c6812150/content.html
- LandSpace: https://www.landspace.com/
- Galactic Energy: https://www.galactic-energy.cn/
- CAS Space: https://www.cas-space.com/
- Space Pioneer: https://www.spacepioneer.cc/
- Deep Blue Aerospace: https://www.dbaspace.com/
- Commsat: https://www.commsat.cn/
- Geespace: https://www.geespace.com/
- MIT Space Systems Laboratory: https://ssl.scripts.mit.edu/www/
- Stanford Space Rendezvous Laboratory: https://slab.stanford.edu/
- Caltech Space Solar Power Project: https://www.spacesolar.caltech.edu/
- CU Boulder Aerospace Research: https://www.colorado.edu/aerospace/research
- CU Boulder Laboratory for Atmospheric and Space Physics: https://lasp.colorado.edu/
- JAXA Institute of Space and Astronautical Science: https://www.isas.jaxa.jp/en/
- Starcloud homepage: https://www.starcloud.com/
- Starcloud-1: https://www.starcloud.com/starcloud-1
- Starcloud-2: https://www.starcloud.com/starcloud-2
- Tether-Based Architecture for Solar-Powered Orbital AI Data Centers: https://arxiv.org/abs/2512.09044
- Orbital Data Centers: Spacecraft Constraints and Economic Viability: https://arxiv.org/abs/2604.27197

## Content Automation and Subscription Roadmap

Treat automation as a later product layer, not as a blocker for the educational atlas.

Recommended phases:

- Phase 1: manually curated `Latest Signals` with short bilingual summaries and source links.
- Phase 2: lightweight subscription capture with language and topic preferences.
- Phase 3: semi-automated source collection from official feeds, arXiv queries, and selected company newsrooms into a private review queue.
- Phase 4: AI-assisted bilingual summaries with human approval before publication.
- Phase 5: personalized email digest connected back to the five atlas chapters.

See `docs/content-automation-roadmap.md` for the detailed maintenance plan.

## UI Scope

First implementation should avoid layout expansion:

- Rename the two tabs in `pageCopy.detailTabs`.
- Rewrite the five primary card bullets.
- Add `Future Signals` / `未來訊號` as its own Overview disclosure above company exploration.
- Rename and rebuild the company section as grouped private/public company exploration.
- Add short educational summaries plus progressive disclosures for `Why It Matters` and `How It Works`.
- Add a low-profile `Latest Signals` disclosure at the bottom of Overview, filtered to the selected node and driven by manually curated data.
- Move `Sources` out of Overview and place it at the bottom of `How It Works`.
- Keep `Overview` and the five-card navigation unchanged.
- Do not add a sixth card unless the user later wants a dedicated future-trends chapter.

## Testing and Review

After implementation, verify:

- English and Chinese tab labels fit on desktop, tablet, and mobile.
- No copy overflows inside card tabs or sticky mobile menu.
- Existing audio playlist and 3D node sync still work.
- Browser smoke test passes.
- Build passes before deployment.

## Self-Review

- No unresolved TBD or TODO placeholders remain.
- Scope is intentionally limited to naming and content, not visual redesign.
- Emerging orbital compute is framed as a future signal with constraints, not as a guaranteed investment thesis.
- The design preserves the current five-node structure.
- The company layer is positioned as educational discovery, not investment advice.

# Space Economy Content Tabs and Future Signals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the five-card content tabs to clearer educational labels, rewrite the five primary card bullets, and add a future-signals layer for orbital compute, GPU servers, microgravity production, and other space-native advantages.

**Architecture:** Keep the existing five-node site structure. Update copy in `src/data/content.js`, add a small optional `futureSignals` editorial array, and render that array inside the existing Deep dive disclosure without creating a new main card.

**Tech Stack:** Vanilla JavaScript modules, Three.js frontend, Node built-in test runner, static Vercel build scripts.

---

## File Map

- Modify `src/data/content.js`: tab labels, primary node bullets, editorial future-signals copy, and source links.
- Modify `src/main.js`: extend `renderDeepDive(editorial)` to render optional future-signals headings and paragraphs.
- Modify `src/styles.css`: add compact styles for the future-signals subsection inside Deep dive.
- Modify `test/content.test.mjs`: add schema and copy assertions for the renamed tabs and future-signals layer.

Current working tree note: `src/main.js`, `README.md`, and `CHANGELOG.md` already have unrelated local changes from the audio-to-3D sync feature. Do not overwrite them. When editing `src/main.js`, patch only `renderDeepDive(editorial)`.

---

### Task 1: Add Content Tests

**Files:**
- Modify: `/Users/daniel/Projects/space-economy-atlas/test/content.test.mjs`

- [ ] **Step 1: Add failing tests for new tab labels and future signals**

Insert this test after `all configured languages are available in page and node copy`:

```js
test("detail tabs use educational reader-facing labels", () => {
  assert.equal(pageCopy.en.detailTabs.overview, "Overview");
  assert.equal(pageCopy.en.detailTabs.industry, "Why It Matters");
  assert.equal(pageCopy.en.detailTabs.engineering, "How It Works");
  assert.equal(pageCopy.zh.detailTabs.overview, "摘要");
  assert.equal(pageCopy.zh.detailTabs.industry, "為何重要");
  assert.equal(pageCopy.zh.detailTabs.engineering, "如何運作");
});
```

Insert this test after `primary chapters include company examples for educational deep dives`:

```js
test("primary chapters include future signals for emerging space-economy opportunities", () => {
  for (const chapter of chapters) {
    for (const { id: lang } of languages) {
      const editorial = getEditorialLayer(chapter.nodeId, lang);
      assert.ok(editorial.futureSignals, `${chapter.nodeId} missing ${lang} future signals`);
      assert.ok(editorial.futureSignals.title.length >= 4);
      assert.ok(editorial.futureSignals.items.length >= 2);
      for (const item of editorial.futureSignals.items) {
        assert.ok(item.length > 40);
      }
    }
  }
});
```

- [ ] **Step 2: Run the content tests to verify they fail before implementation**

Run:

```bash
npm test -- test/content.test.mjs
```

Expected: FAIL because `Industry`, `Engineering`, and `futureSignals` are still using the old content schema.

---

### Task 2: Update Content Data

**Files:**
- Modify: `/Users/daniel/Projects/space-economy-atlas/src/data/content.js`
- Test: `/Users/daniel/Projects/space-economy-atlas/test/content.test.mjs`

- [ ] **Step 1: Rename detail tab labels**

Replace `pageCopy.zh.detailTabs` with:

```js
detailTabs: {
  overview: "摘要",
  industry: "為何重要",
  engineering: "如何運作"
},
```

Replace `pageCopy.en.detailTabs` with:

```js
detailTabs: {
  overview: "Overview",
  industry: "Why It Matters",
  engineering: "How It Works"
},
```

- [ ] **Step 2: Rewrite primary card bullets**

Replace the five primary node bullet arrays with these exact values.

For `launch-site.copy.zh`:

```js
industry: [
  "發射站把火箭轉換成可營運產能，瓶頸常在週轉速度而不只火箭性能",
  "場址、天候、安全走廊與法規會共同決定任務能多常飛行",
  "更高發射頻率能支撐衛星、太空站與未來軌道運算平台擴張"
],
engineering: [
  "整合廠房、發射塔、支撐臂與燃料系統在起飛前完成任務準備",
  "遙測、追蹤、飛行安全與天候團隊把倒數流程串成一套系統",
  "地面設施必須在安全與環境規範內快速恢復，才能支撐高頻任務"
],
```

For `launch-site.copy.en`:

```js
industry: [
  "Launch sites turn rockets into operational capacity; the key constraint is often pad turnaround, not only vehicle performance",
  "Site location, weather, safety corridors, and regulation shape how often missions can fly",
  "Higher launch cadence enables satellites, stations, and future orbital compute platforms to scale"
],
engineering: [
  "Integration facilities, launch towers, service arms, and fueling systems prepare the vehicle before flight",
  "Telemetry, tracking, flight safety, and weather teams coordinate the countdown as one timed system",
  "Ground infrastructure must recover quickly after each launch while staying within safety and environmental rules"
],
```

For `rocket.copy.zh`:

```js
industry: [
  "火箭是太空經濟的物流層，負責把質量從地球送到有用軌道",
  "可回收只有在檢查、維修與再發射週期可靠且夠快時才會改變經濟性",
  "更低發射成本會擴大可在軌道建置的系統，從星座到大型平台"
],
engineering: [
  "引擎、燃料槽、結構、航電與分節設計共同把質量轉換成速度",
  "酬載整流罩在上升段保護貨物，並在部署前乾淨分離",
  "回收再利用會把熱防護、振動、疲勞與翻修限制加入火箭設計"
],
```

For `rocket.copy.en`:

```js
industry: [
  "Rockets are the logistics layer of the space economy, moving mass from Earth into useful orbit",
  "Reuse changes economics only when inspection, repair, and relaunch cycles become reliable and fast",
  "Lower launch cost expands what can be built in orbit, from satellite constellations to larger platforms"
],
engineering: [
  "Engines, propellant tanks, structures, avionics, and staging work together to trade mass for velocity",
  "Payload fairings protect cargo during ascent, then separate cleanly so satellites or modules can deploy",
  "Reentry and reuse add heat, vibration, fatigue, and refurbishment constraints to vehicle design"
],
```

For `satellite.copy.zh`:

```js
industry: [
  "衛星把軌道硬體轉換成連線、導航、觀測與資料中繼等服務",
  "星座規模、更新週期與頻譜使用權會決定使用者實際感受到的容量",
  "下一步是 space-native computing，讓衛星先在軌道處理資料再傳回地球"
],
engineering: [
  "衛星公車為酬載提供電力、熱控、姿態控制、指令與資料處理",
  "天線、光通訊鏈路與 onboard processors 決定資料如何在太空與地球間移動",
  "輻射、軌道碎片、有限維修能力與退役離軌規劃會影響每個設計選擇"
],
```

For `satellite.copy.en`:

```js
industry: [
  "Satellites convert orbital hardware into services such as connectivity, navigation, Earth observation, and data relay",
  "Constellation scale, refresh rate, and spectrum access determine how much capacity users actually experience",
  "The next step is space-native computing, where satellites may process data in orbit before sending results to Earth"
],
engineering: [
  "A satellite bus supplies power, thermal control, attitude control, command, and data handling for the payload",
  "Antennas, optical links, and onboard processors decide how data moves between spacecraft, stations, and Earth",
  "Radiation, orbital debris, limited repair access, and end-of-life deorbit planning shape every design choice"
],
```

For `ground-station.copy.zh`:

```js
industry: [
  "太空站是軌道上的實驗室與工作平台，不只是人類長期駐留的象徵",
  "微重力能支撐生醫、材料、晶體與在軌製造等地面難以複製的研究",
  "商業太空站可能讓 NASA、企業、大學與政府成為低軌市場中的客戶"
],
engineering: [
  "加壓艙、桁架、對接口、太陽能陣列、熱控與生命維持形成可維護棲地",
  "機械臂、氣閘艙與對接系統支撐實驗、貨運、維修與未來在軌服務",
  "乘員安全、補給頻率、輻射、軌道碎片與老化維護設定實際限制"
],
```

For `ground-station.copy.en`:

```js
industry: [
  "Space stations are orbital laboratories and work platforms, not only symbols of human presence",
  "Microgravity supports research in biotech, materials, crystals, and in-space production that is hard to reproduce on Earth",
  "Commercial stations could make NASA, companies, universities, and governments customers in a broader LEO marketplace"
],
engineering: [
  "Pressurized modules, trusses, docking ports, solar arrays, thermal systems, and life support form a maintainable habitat",
  "Robotic arms, airlocks, and docking systems support experiments, cargo, repairs, and future in-orbit servicing",
  "Crew safety, resupply cadence, radiation exposure, orbital debris, and station aging set practical limits"
],
```

For `applications.copy.zh`:

```js
industry: [
  "下游應用是太空經濟被地面使用者感受到的地方",
  "服務收入能回頭支撐下一層發射、衛星、太空站與軌道基礎設施",
  "新應用正在延伸到軌道 AI 運算、主權資料備援、在軌製造與太空資料產品"
],
engineering: [
  "用戶終端、地面閘道、頻譜、星間鏈路與軟體路由共同決定服務品質",
  "地球觀測與太空感測器可用 onboard AI 減少下行瓶頸並加快洞察速度",
  "採用速度取決於價格、可靠度、延遲、法規、客戶信任與既有網路整合"
],
```

For `applications.copy.en`:

```js
industry: [
  "Applications are where the space economy becomes visible to users on Earth",
  "Service revenue can fund the next layer of launch, satellites, stations, and orbital infrastructure",
  "Emerging applications include orbital AI compute, sovereign cloud backup, in-space manufacturing, and data products created directly in orbit"
],
engineering: [
  "User terminals, gateways, spectrum rights, inter-satellite links, and software routing determine service quality",
  "Earth observation and space sensors can use onboard AI to reduce downlink bottlenecks and deliver faster insights",
  "Adoption depends on price, reliability, latency, regulation, customer trust, and integration with existing networks"
],
```

- [ ] **Step 3: Add futureSignals objects to primary editorial layers**

For each primary chapter in `editorialLayers`, add `futureSignals` next to `deepDive`.

Launch Site EN:

```js
futureSignals: {
  title: "Future Signals",
  items: [
    "As launch cadence rises, launch sites become the front door for larger orbital infrastructure, including commercial stations, servicing vehicles, and future compute platforms.",
    "The overlooked opportunity is operational rhythm: faster integration, safer turnaround, and clearer range coordination can unlock more value than a single vehicle upgrade."
  ]
},
```

Launch Site ZH:

```js
futureSignals: {
  title: "未來訊號",
  items: [
    "當發射頻率提高，發射站會成為大型軌道基礎設施的入口，包含商業太空站、在軌服務載具與未來運算平台。",
    "容易被忽略的機會是營運節奏：更快整合、更安全週轉與更清楚的 range coordination，可能比單一火箭升級創造更多價值。"
  ]
},
```

Rocket EN:

```js
futureSignals: {
  title: "Future Signals",
  items: [
    "Reusable heavy-lift launch is what makes large orbital systems plausible, from station modules to deployable solar arrays and space-based data infrastructure.",
    "The key question is not only cost per launch, but delivered useful lifetime: how much operating capability reaches orbit per dollar, kilogram, and mission risk."
  ]
},
```

Rocket ZH:

```js
futureSignals: {
  title: "未來訊號",
  items: [
    "可回收重型運載能力會讓大型軌道系統更可行，從太空站模組、可展開太陽能陣列到太空資料基礎設施。",
    "關鍵問題不只是一趟發射多少錢，而是每一美元、每一公斤與每一次任務風險能換到多少可運作壽命。"
  ]
},
```

Satellite EN:

```js
futureSignals: {
  title: "Future Signals",
  items: [
    "Satellites may evolve from sensors and relays into orbital edge-compute nodes that process imagery, signals, and scientific data before downlink.",
    "This matters because raw space data can be massive; analyzing it in orbit can reduce bandwidth needs and deliver faster alerts for disasters, climate, security, and logistics."
  ]
},
```

Satellite ZH:

```js
futureSignals: {
  title: "未來訊號",
  items: [
    "衛星可能從感測器與中繼器進化成軌道邊緣運算節點，先在太空處理影像、訊號與科學資料再下傳。",
    "這很重要，因為原始太空資料量可能非常大；在軌分析能降低頻寬需求，並更快支援災害、氣候、安全與物流決策。"
  ]
},
```

Space Station EN:

```js
futureSignals: {
  title: "Future Signals",
  items: [
    "Microgravity is a natural advantage for experiments in cells, crystals, fluids, fiber optics, semiconductors, and advanced materials.",
    "Commercial stations could become shared orbital labs where research, manufacturing, robotics, and servicing mature before larger industrial platforms arrive."
  ]
},
```

Space Station ZH:

```js
futureSignals: {
  title: "未來訊號",
  items: [
    "微重力是太空少數天然優勢之一，適合探索細胞、晶體、流體、光纖、半導體與先進材料實驗。",
    "商業太空站可能成為共享軌道實驗室，讓研究、製造、機器人與在軌服務在更大型工業平台出現前先成熟。"
  ]
},
```

Applications EN:

```js
futureSignals: {
  title: "Future Signals",
  items: [
    "The next space economy may not only move data through orbit. It may process, store, and manufacture value there.",
    "Orbital GPU servers are most credible first as space-native compute: processing satellite and station data in orbit before returning smaller, more useful results to Earth."
  ]
},
```

Applications ZH:

```js
futureSignals: {
  title: "未來訊號",
  items: [
    "下一階段的太空經濟，可能不只是把資料經過軌道傳回地球，而是在軌道上直接運算、儲存，甚至製造價值。",
    "軌道 GPU server 最可信的早期場景，是先處理衛星與太空站產生的資料，再把更小、更有用的結果傳回地球。"
  ]
},
```

- [ ] **Step 4: Add supporting source links where relevant**

Add these source entries to the relevant `sources` arrays if they are not already present:

```js
{ label: "NASA Why Go to Space", url: "https://www.nasa.gov/humans-in-space/why-go-to-space/" }
```

```js
{ label: "Starcloud-1", url: "https://www.starcloud.com/starcloud-1" }
```

```js
{ label: "Starcloud-2", url: "https://www.starcloud.com/starcloud-2" }
```

```js
{ label: "Tether-Based Architecture for Solar-Powered Orbital AI Data Centers", url: "https://arxiv.org/abs/2512.09044" }
```

```js
{ label: "Orbital Data Centers: Spacecraft Constraints and Economic Viability", url: "https://arxiv.org/abs/2604.27197" }
```

Attach NASA sources to Space Station and Applications. Attach Starcloud and arXiv sources to Satellite and Applications. Keep source lists compact by using at most four visible sources per language per primary chapter.

- [ ] **Step 5: Run content tests**

Run:

```bash
npm test -- test/content.test.mjs
```

Expected: PASS.

---

### Task 3: Render Future Signals in Deep Dive

**Files:**
- Modify: `/Users/daniel/Projects/space-economy-atlas/src/main.js`
- Modify: `/Users/daniel/Projects/space-economy-atlas/src/styles.css`

- [ ] **Step 1: Update `renderDeepDive(editorial)`**

Replace the current `renderDeepDive(editorial)` function with:

```js
function renderDeepDive(editorial) {
  const wrap = document.createElement("div");
  wrap.className = "node-panel__deep-dive";

  for (const paragraph of editorial?.deepDive ?? []) {
    const text = document.createElement("p");
    text.textContent = paragraph;
    wrap.append(text);
  }

  if (editorial?.futureSignals?.items?.length) {
    const section = document.createElement("section");
    section.className = "node-panel__future-signals";

    const title = document.createElement("h3");
    title.textContent = editorial.futureSignals.title;
    section.append(title);

    for (const item of editorial.futureSignals.items) {
      const text = document.createElement("p");
      text.textContent = item;
      section.append(text);
    }

    wrap.append(section);
  }

  return wrap;
}
```

- [ ] **Step 2: Add compact styles for the subsection**

Add after `.node-panel__deep-dive p`:

```css
.node-panel__future-signals {
  display: grid;
  gap: 8px;
  margin-top: 2px;
  padding-top: 10px;
  border-top: 1px solid rgba(205, 231, 239, 0.12);
}

.node-panel__future-signals h3 {
  margin: 0;
  color: var(--green);
  font-size: 12px;
  line-height: 1.3;
  letter-spacing: 0;
}

.node-panel__future-signals p {
  margin-bottom: 0;
}
```

- [ ] **Step 3: Run unit tests**

Run:

```bash
npm test
```

Expected: all tests pass.

---

### Task 4: Verify Build and Browser Behavior

**Files:**
- Verify only unless failures require targeted edits.

- [ ] **Step 1: Run static build**

Run:

```bash
npm run vercel:build
```

Expected: build completes and writes `dist/`.

- [ ] **Step 2: Run browser smoke test**

Run:

```bash
npm run verify:browser
```

Expected: browser smoke test passes. Confirm the site still renders 3D, the node panel opens, and no JavaScript console errors stop the app.

- [ ] **Step 3: Manual local preview check**

Open the existing local preview at:

```text
http://127.0.0.1:8125/
```

Check:

- English tab labels show `Overview`, `Why It Matters`, and `How It Works`.
- Chinese tab labels show `摘要`, `為何重要`, and `如何運作`.
- Deep dive contains `Future Signals` / `未來訊號`.
- The audio playlist still switches the related 3D node in Explore Mode.
- Mobile sticky card behavior still works.

- [ ] **Step 4: Commit only this content feature if requested**

Because the working tree already contains prior audio-sync changes, do not run broad staging commands for this task. If a commit is requested, inspect the diff and stage only intentional hunks:

```bash
git diff -- src/data/content.js src/main.js src/styles.css test/content.test.mjs docs/superpowers/plans/2026-06-20-space-economy-content-tabs-future-signals.md
git add -p src/data/content.js src/main.js src/styles.css test/content.test.mjs
git add docs/superpowers/plans/2026-06-20-space-economy-content-tabs-future-signals.md
git commit -m "Update space economy educational content tabs"
```

Expected: the commit excludes unrelated `README.md` and `CHANGELOG.md` audio-sync documentation unless the user explicitly wants them included.

---

## Self-Review

- Spec coverage: tab naming, card copy, future signals, sources, UI scope, and verification are covered.
- Placeholder scan: the plan uses concrete file paths, exact copy, exact source URLs, and exact commands.
- Scope check: this is one implementation unit because the data, rendering, and tests all serve the same content update.
- Risk control: the plan preserves the existing five-node structure and avoids deployment.

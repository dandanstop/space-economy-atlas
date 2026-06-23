const { spawn } = require("node:child_process");
const { createServer } = require("node:net");
const { mkdir, writeFile } = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const projectRoot = path.resolve(__dirname, "..");
const artifactsDir = path.join(projectRoot, "artifacts");
const reportPath = path.join(artifactsDir, "verify-browser.json");
const productionUrl = "https://www.dandanstop.me/space-economy";
const productionImage = `${productionUrl}/og-image.png`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolvePlaywright() {
  const attempts = [];
  const candidatePaths = [
    projectRoot,
    path.join(projectRoot, "node_modules"),
    path.resolve(projectRoot, ".."),
    path.join(path.resolve(projectRoot, ".."), "node_modules"),
    "/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules"
  ];

  try {
    return { playwright: require("playwright"), source: "default require(\"playwright\")" };
  } catch (error) {
    attempts.push(`default require failed: ${error.message}`);
  }

  for (const candidatePath of candidatePaths) {
    try {
      const resolved = require.resolve("playwright", { paths: [candidatePath] });
      return { playwright: require(resolved), source: resolved };
    } catch (error) {
      attempts.push(`${candidatePath}: ${error.message}`);
    }
  }

  const error = new Error(`Unable to resolve Playwright. Attempts:\n${attempts.join("\n")}`);
  error.attempts = attempts;
  throw error;
}

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

function requestOk(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.setTimeout(500, () => {
      req.destroy();
      resolve(false);
    });
    req.on("error", () => resolve(false));
  });
}

async function waitForServer({ child, url, output }) {
  const deadline = Date.now() + 10000;
  let sawReadyLine = false;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Server exited before becoming ready with code ${child.exitCode}.\n${output.join("")}`);
    }

    sawReadyLine = sawReadyLine || output.join("").includes("Space Economy Atlas running at");
    if (sawReadyLine && (await requestOk(url))) return;
    await sleep(150);
  }

  throw new Error(`Timed out waiting for server at ${url}.\n${output.join("")}`);
}

function startServer(port) {
  const output = [];
  const child = spawn(process.execPath, ["scripts/serve.mjs"], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  });

  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  child.stderr.on("data", (chunk) => output.push(chunk.toString()));

  return { child, output };
}

async function stopServer(child) {
  if (!child || child.exitCode !== null) return;

  child.kill("SIGTERM");

  const exited = await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    sleep(2500).then(() => false)
  ]);

  if (exited === false && child.exitCode === null) {
    child.kill("SIGKILL");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      sleep(1000)
    ]);
  }
}

async function launchChromium(chromium) {
  const launchErrors = [];

  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    launchErrors.push(`bundled chromium: ${error.message}`);
  }

  const executableCandidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium"
  ];

  for (const executablePath of executableCandidates) {
    try {
      return await chromium.launch({ headless: true, executablePath });
    } catch (error) {
      launchErrors.push(`${executablePath}: ${error.message}`);
    }
  }

  throw new Error(`Unable to launch Chromium. Attempts:\n${launchErrors.join("\n")}`);
}

function attachPageDiagnostics(page, bucket) {
  page.on("pageerror", (error) => {
    bucket.pageErrors.push(error.stack || error.message || String(error));
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      bucket.consoleErrors.push(message.text());
    }
  });
}

async function readCanvasMetrics(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("#space-canvas");
    const app = document.querySelector("#app");
    const fallback = document.querySelector("#fallback-view");
    const result = {
      exists: Boolean(canvas),
      visible: false,
      fallbackActive: app?.dataset.mode === "fallback",
      fallbackVisible: Boolean(fallback && !fallback.hidden && fallback.getBoundingClientRect().height > 0),
      width: 0,
      height: 0,
      sampled: false,
      uniqueColors: 0,
      variedPixels: 0,
      nonBackgroundPixels: 0,
      sampleError: null
    };

    if (!canvas) return result;

    const rect = canvas.getBoundingClientRect();
    result.visible = rect.width > 0 && rect.height > 0 && getComputedStyle(canvas).display !== "none";
    result.width = Math.round(rect.width);
    result.height = Math.round(rect.height);

    if (!result.visible) return result;

    try {
      const sample = document.createElement("canvas");
      sample.width = 96;
      sample.height = 64;
      const context = sample.getContext("2d", { willReadFrequently: true });
      context.drawImage(canvas, 0, 0, sample.width, sample.height);
      const data = context.getImageData(0, 0, sample.width, sample.height).data;
      const colors = new Set();
      let variedPixels = 0;
      let nonBackgroundPixels = 0;
      const first = [data[0], data[1], data[2], data[3]];

      for (let index = 0; index < data.length; index += 4) {
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        colors.add(`${r >> 4},${g >> 4},${b >> 4},${a >> 4}`);

        if (Math.abs(r - first[0]) + Math.abs(g - first[1]) + Math.abs(b - first[2]) + Math.abs(a - first[3]) > 24) {
          variedPixels += 1;
        }

        if (Math.abs(r - 2) + Math.abs(g - 5) + Math.abs(b - 10) > 28 && a > 0) {
          nonBackgroundPixels += 1;
        }
      }

      result.sampled = true;
      result.uniqueColors = colors.size;
      result.variedPixels = variedPixels;
      result.nonBackgroundPixels = nonBackgroundPixels;
    } catch (error) {
      result.sampleError = error.message;
    }

    return result;
  });
}

function assertUsableCanvas(canvas, label) {
  if (canvas.fallbackActive) {
    if (!canvas.fallbackVisible) {
      throw new Error(`${label} entered fallback mode, but fallback view is not visible.`);
    }
    return;
  }

  if (!canvas.visible) throw new Error(`#space-canvas is not visible on ${label}.`);
  if (!canvas.sampled) {
    throw new Error(`Unable to sample ${label} canvas pixels: ${canvas.sampleError ?? "unknown error"}`);
  }
  if (canvas.uniqueColors < 3 || canvas.variedPixels < 20 || canvas.nonBackgroundPixels < 20) {
    throw new Error(
      `${label} canvas appears blank: ${JSON.stringify({
        uniqueColors: canvas.uniqueColors,
        variedPixels: canvas.variedPixels,
        nonBackgroundPixels: canvas.nonBackgroundPixels
      })}`
    );
  }
}

async function collectUiState(page) {
  return page.evaluate(() => {
    const text = (selector) => document.querySelector(selector)?.textContent?.trim() ?? "";
    const box = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        visible: rect.width > 0 && rect.height > 0 && getComputedStyle(element).display !== "none"
      };
    };

    return {
      mode: document.querySelector("#app")?.dataset.mode ?? null,
      lang: document.documentElement.lang,
      brand: text(".brand"),
      aboutLink: text("#about-link"),
      heroTitle: text("#hero-copy h1"),
      heroTextLength: text("#hero-copy").length,
      chapterCount: document.querySelectorAll(".chapter-button").length,
      activeChapter: text(".chapter-button[aria-pressed='true']"),
      nodePanelTitle: text("#node-panel h2"),
      nodePanelTextLength: text("#node-panel").length,
      introActionText: text(".hero-action--primary"),
      status: text("#scene-status"),
      boxes: {
        topBar: box(".top-bar"),
        aboutLink: box("#about-link"),
        heroCopy: box("#hero-copy"),
        nodePanel: box("#node-panel"),
        chapterRail: box("#chapter-rail")
      }
    };
  });
}

async function selectAudioAndAssertSync(page, { option, expectedChapter, expectedPanel = expectedChapter, label, expectScroll = false }) {
  await page.locator(".audio-guide__select").selectOption(option);
  await page.waitForTimeout(850);

  const state = await page.evaluate(() => ({
    activeChapter: document.querySelector(".chapter-button[aria-pressed='true']")?.textContent?.trim() ?? "",
    panelTitle: document.querySelector("#node-panel h2")?.textContent?.trim() ?? "",
    selectValue: document.querySelector(".audio-guide__select")?.value ?? "",
    scrollY: Math.round(window.scrollY)
  }));

  if (
    state.activeChapter !== expectedChapter ||
    state.panelTitle !== expectedPanel ||
    state.selectValue !== option ||
    (expectScroll && state.scrollY <= 0)
  ) {
    throw new Error(`Expected ${label} audio playlist to sync visual chapter: ${JSON.stringify(state)}.`);
  }

  return state;
}

async function verifyDesktop(browser, url, report) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  const diagnostics = { pageErrors: [], consoleErrors: [] };
  attachPageDiagnostics(page, diagnostics);

  try {
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    await page.waitForSelector("#space-canvas", { state: "attached", timeout: 10000 });
    await page.waitForSelector("#hero-copy h1", { state: "visible", timeout: 10000 });
    await page.waitForSelector(".chapter-button", { state: "visible", timeout: 10000 });
    await page.waitForSelector("#node-panel h2", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(700);

    const before = await collectUiState(page);
    if (before.brand !== "Space Economy Atlas") {
      throw new Error(`Expected English brand, found "${before.brand}".`);
    }
    if (before.aboutLink !== "About") {
      throw new Error(`Expected English about link, found "${before.aboutLink}".`);
    }
    if (!before.boxes.aboutLink?.visible || before.boxes.aboutLink.x < 1320 || before.boxes.aboutLink.y < 880) {
      throw new Error(`Expected desktop About link near bottom-right, found ${JSON.stringify(before.boxes.aboutLink)}.`);
    }
    if (before.heroTextLength < 40) throw new Error("Desktop hero copy did not render meaningful text.");
    if (before.chapterCount < 5) throw new Error(`Expected at least 5 chapter buttons, found ${before.chapterCount}.`);
    if (before.nodePanelTextLength < 40) throw new Error("Desktop node panel did not render meaningful text.");

    const seo = await page.evaluate(() => {
      const schemaScripts = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
        JSON.parse(script.textContent)
      );
      return {
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
        ogUrl: document.querySelector('meta[property="og:url"]')?.content ?? "",
        ogImage: document.querySelector('meta[property="og:image"]')?.content ?? "",
        twitterCard: document.querySelector('meta[name="twitter:card"]')?.content ?? "",
        twitterImage: document.querySelector('meta[name="twitter:image"]')?.content ?? "",
        schemaScripts
      };
    });
    const schemaText = JSON.stringify(seo.schemaScripts);
    if (seo.canonical !== productionUrl) {
      throw new Error(`Expected canonical ${productionUrl}, found "${seo.canonical}".`);
    }
    if (seo.ogUrl !== productionUrl) {
      throw new Error(`Expected og:url ${productionUrl}, found "${seo.ogUrl}".`);
    }
    if (seo.ogImage !== productionImage || seo.twitterImage !== productionImage) {
      throw new Error(`Expected social image ${productionImage}, found ${JSON.stringify(seo)}.`);
    }
    if (seo.twitterCard !== "summary_large_image") {
      throw new Error(`Expected summary_large_image twitter card, found "${seo.twitterCard}".`);
    }
    if (!schemaText.includes(`${productionUrl}#webpage`) || !schemaText.includes(`${productionUrl}#learning-resource`)) {
      throw new Error(`Expected production URL in JSON-LD, found ${schemaText}.`);
    }
    if (!schemaText.includes(productionImage)) {
      throw new Error(`Expected production image in JSON-LD, found ${schemaText}.`);
    }

    const analytics = await page.evaluate(() => ({
      config: window.spaceEconomyAnalytics ?? null,
      gtagScriptCount: document.querySelectorAll('script[data-ga4-id="G-2CJ15FLWPY"]').length
    }));
    if (
      !analytics.config ||
      analytics.config.measurementId !== "G-2CJ15FLWPY" ||
      analytics.config.pagePath !== "/space-economy" ||
      analytics.config.pageLocation !== productionUrl ||
      analytics.config.project?.project_slug !== "space-economy" ||
      analytics.config.project?.project_name !== "Space Economy"
    ) {
      throw new Error(`Expected GA4 analytics config, found ${JSON.stringify(analytics)}.`);
    }
    if (analytics.config.enabled !== false || analytics.gtagScriptCount !== 0) {
      throw new Error(`Local verification should not send GA4 hits: ${JSON.stringify(analytics)}.`);
    }

    await page.getByRole("button", { name: "About" }).click();
    await page.waitForSelector("#about-dialog[open]", { state: "attached", timeout: 5000 });
    const about = await page.evaluate(() => {
      const titleSpans = [...document.querySelectorAll("#about-title span")].map((span) => span.textContent.trim());
      const intro = document.querySelector(".about-dialog__body p");
      const contact = document.querySelector(".about-dialog__contact");
      const introStyle = intro ? getComputedStyle(intro) : null;
      const contactStyle = contact ? getComputedStyle(contact) : null;
      return {
        titleSpans,
        body: document.querySelector("#about-dialog-content")?.textContent ?? "",
        contactHref: contact?.getAttribute("href") ?? "",
        introStyle: introStyle
          ? {
              color: introStyle.color,
              fontSize: introStyle.fontSize
            }
          : null,
        contactStyle: contactStyle
          ? {
              color: contactStyle.color,
              fontSize: contactStyle.fontSize
            }
          : null
      };
    });
    if (about.titleSpans[0] !== "Curated by" || about.titleSpans[1] !== "DanDanStop") {
      throw new Error(`About title did not render as two lines: ${JSON.stringify(about.titleSpans)}.`);
    }
    if (!about.body.includes("all-nighter") || !about.body.includes("Last updated: June 2026")) {
      throw new Error("About dialog body did not render required text.");
    }
    if (about.contactHref !== "mailto:hello@dandanstop.me") {
      throw new Error(`Expected About contact mailto, found "${about.contactHref}".`);
    }
    if (
      !about.introStyle ||
      !about.contactStyle ||
      about.introStyle.color !== about.contactStyle.color ||
      about.introStyle.fontSize !== about.contactStyle.fontSize
    ) {
      throw new Error(`Expected About contact to match intro style: ${JSON.stringify(about)}.`);
    }
    await page.getByRole("button", { name: "Close about" }).click();
    await page.waitForFunction(() => !document.querySelector("#about-dialog")?.open, null, { timeout: 5000 });

    await page.getByRole("button", { name: "Language: EN" }).click();
    await page.locator(".language-menu__option[data-lang='zh']").click();
    await page.waitForFunction(() => document.querySelector(".brand")?.textContent?.trim() === "太空經濟地圖", null, {
      timeout: 5000
    });
    const localized = await collectUiState(page);
    if (localized.lang !== "zh-Hant") throw new Error(`Expected zh-Hant document language, found "${localized.lang}".`);
    if (localized.aboutLink !== "關於") throw new Error(`Expected Chinese about link, found "${localized.aboutLink}".`);

    await page.getByRole("button", { name: "Language: 中文" }).click();
    await page.locator(".language-menu__option[data-lang='en']").click();
    await page.waitForFunction(() => document.querySelector(".brand")?.textContent?.trim() === "Space Economy Atlas", null, {
      timeout: 5000
    });

    await page.locator(".hero-action--primary").click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mode === "explore", null, { timeout: 5000 });

    const chapterButtons = page.locator(".chapter-button");
    await page.mouse.move(640, 500);
    await page.mouse.wheel(0, 720);
    await page.waitForFunction(() => document.querySelector(".chapter-button[aria-pressed='true']")?.textContent?.trim() === "Rocket", null, {
      timeout: 5000
    });

    await page.mouse.move(1200, 420);
    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(750);
    const wheelGuard = await collectUiState(page);
    if (wheelGuard.activeChapter !== "Rocket") {
      throw new Error(`Expected wheel inside node panel not to change chapter, got "${wheelGuard.activeChapter}".`);
    }

    await chapterButtons.nth(1).click();
    await page.waitForFunction(() => document.querySelector("#node-panel h2")?.textContent?.trim() === "Rocket", null, {
      timeout: 5000
    });
    await page.waitForTimeout(400);

    await selectAudioAndAssertSync(page, {
      option: "satellite",
      expectedChapter: "Satellite",
      label: "desktop"
    });

    const after = await collectUiState(page);
    const canvas = await readCanvasMetrics(page);
    assertUsableCanvas(canvas, "desktop");

    if (diagnostics.pageErrors.length || diagnostics.consoleErrors.length) {
      throw new Error("Desktop page emitted errors.");
    }

    const screenshot = path.join(artifactsDir, "desktop.png");
    await page.screenshot({ path: screenshot, fullPage: true });

    report.desktop = {
      success: true,
      before,
      after,
      canvas,
      screenshot,
      ...diagnostics
    };
  } catch (error) {
    report.desktop = {
      success: false,
      error: error.message,
      ...diagnostics
    };
    throw error;
  } finally {
    await context.close();
  }
}

async function verifyMobile(browser, url, report) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  const diagnostics = { pageErrors: [], consoleErrors: [] };
  attachPageDiagnostics(page, diagnostics);

  try {
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    await page.waitForSelector(".top-bar", { state: "visible", timeout: 10000 });
    await page.waitForSelector(".hero-action--primary", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(700);

    const ui = await collectUiState(page);
    const overflow = await page.evaluate(() => {
      const documentWidth = document.documentElement.scrollWidth;
      const viewportWidth = document.documentElement.clientWidth;
      const overflowingElements = [...document.body.querySelectorAll("*")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            selector: element.id ? `#${element.id}` : element.className ? `.${String(element.className).split(/\s+/)[0]}` : element.tagName.toLowerCase(),
            right: Math.round(rect.right),
            left: Math.round(rect.left),
            width: Math.round(rect.width)
          };
        })
        .filter((entry) => entry.right > viewportWidth + 2 || entry.left < -2)
        .slice(0, 10);

      return {
        documentWidth,
        viewportWidth,
        bodyWidth: document.body.scrollWidth,
        hasHorizontalOverflow: documentWidth > viewportWidth + 1 || overflowingElements.length > 0,
        overflowingElements
      };
    });

    if (!ui.boxes.topBar?.visible) throw new Error("Mobile top bar is not visible.");
    if (!ui.boxes.aboutLink?.visible || ui.boxes.aboutLink.x < 320 || ui.boxes.aboutLink.y < 700) {
      throw new Error(`Expected mobile About link near bottom-right, found ${JSON.stringify(ui.boxes.aboutLink)}.`);
    }
    if (!ui.introActionText) throw new Error("Mobile intro action is missing.");
    if (overflow.hasHorizontalOverflow) {
      throw new Error(`Mobile layout has horizontal overflow: ${JSON.stringify(overflow)}`);
    }
    if (diagnostics.pageErrors.length || diagnostics.consoleErrors.length) {
      throw new Error("Mobile page emitted errors.");
    }

    await page.getByRole("button", { name: "Language: EN" }).click();
    await page.locator(".language-menu__option[data-lang='zh']").click();
    await page.waitForFunction(() => document.querySelector(".brand")?.textContent?.trim() === "太空經濟地圖", null, {
      timeout: 5000
    });

    const localized = await collectUiState(page);
    const localizedOverflow = await page.evaluate(() => {
      const documentWidth = document.documentElement.scrollWidth;
      const viewportWidth = document.documentElement.clientWidth;
      return {
        documentWidth,
        viewportWidth,
        hasHorizontalOverflow: documentWidth > viewportWidth + 1
      };
    });

    if (localized.brand !== "太空經濟地圖") {
      throw new Error(`Expected mobile Chinese brand, found "${localized.brand}".`);
    }
    if (localized.aboutLink !== "關於") {
      throw new Error(`Expected mobile Chinese about link, found "${localized.aboutLink}".`);
    }
    if (localizedOverflow.hasHorizontalOverflow) {
      throw new Error(`Mobile Chinese layout has horizontal overflow: ${JSON.stringify(localizedOverflow)}`);
    }

    await page.getByRole("button", { name: "略過導覽" }).click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mode === "explore", null, {
      timeout: 5000
    });
    await page.waitForTimeout(500);

    const mobileExplore = await page.evaluate(() => {
      const visibleChapterButtons = [...document.querySelectorAll(".chapter-button")]
        .filter((button) => {
          const rect = button.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && getComputedStyle(button).display !== "none";
        })
        .map((button) => button.textContent.trim());
      const panel = document.querySelector("#node-panel");
      const panelRect = panel?.getBoundingClientRect();
      return {
        mode: document.querySelector("#app")?.dataset.mode ?? null,
        mobilePanel: document.querySelector("#app")?.dataset.mobilePanel ?? null,
        visibleChapterButtons,
        activeChapter: document.querySelector(".chapter-button[aria-pressed='true']")?.textContent?.trim() ?? "",
        panelVisible: Boolean(panelRect && panelRect.width > 0 && panelRect.height > 0 && getComputedStyle(panel).display !== "none"),
        stepCount: document.querySelectorAll(".mobile-scroll-step").length
      };
    });

    if (mobileExplore.mode !== "explore") throw new Error(`Expected mobile explore mode, got "${mobileExplore.mode}".`);
    if (mobileExplore.stepCount !== 5) throw new Error(`Expected 5 mobile scroll steps, found ${mobileExplore.stepCount}.`);
    if (mobileExplore.visibleChapterButtons.length !== 1 || mobileExplore.visibleChapterButtons[0] !== "發射站") {
      throw new Error(`Expected only first sticky chapter visible, got ${JSON.stringify(mobileExplore.visibleChapterButtons)}.`);
    }
    if (mobileExplore.mobilePanel !== "closed" || mobileExplore.panelVisible) {
      throw new Error(`Expected mobile overview panel closed by default: ${JSON.stringify(mobileExplore)}.`);
    }

    const audioSyncedChapter = await selectAudioAndAssertSync(page, {
      option: "rocket",
      expectedChapter: "火箭",
      label: "mobile",
      expectScroll: true
    });

    await page.locator(".chapter-button[aria-pressed='true']").click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mobilePanel === "open", null, {
      timeout: 5000
    });
    const openedPanel = await collectUiState(page);
    if (openedPanel.nodePanelTitle !== "火箭") {
      throw new Error(`Expected mobile overview title 火箭, found "${openedPanel.nodePanelTitle}".`);
    }

    await page.getByRole("button", { name: "關閉資訊卡" }).click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mobilePanel === "closed", null, {
      timeout: 5000
    });

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.15));
    await page.waitForFunction(() => document.querySelector(".chapter-button[aria-pressed='true']")?.textContent?.trim() === "火箭", null, {
      timeout: 5000
    });

    const canvas = await readCanvasMetrics(page);
    assertUsableCanvas(canvas, "mobile");

    const screenshot = path.join(artifactsDir, "mobile.png");
    await page.screenshot({ path: screenshot, fullPage: false });

    report.mobile = {
      success: true,
      ui,
      overflow,
      localized,
      localizedOverflow,
      audioSyncedChapter,
      canvas,
      screenshot,
      ...diagnostics
    };
  } catch (error) {
    report.mobile = {
      success: false,
      error: error.message,
      ...diagnostics
    };
    throw error;
  } finally {
    await context.close();
  }
}

async function verifyTablet(browser, url, report) {
  const context = await browser.newContext({
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  const diagnostics = { pageErrors: [], consoleErrors: [] };
  attachPageDiagnostics(page, diagnostics);

  try {
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    await page.waitForSelector(".top-bar", { state: "visible", timeout: 10000 });
    await page.waitForSelector(".hero-action--primary", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(700);

    await page.locator(".hero-action--primary").click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mode === "explore", null, {
      timeout: 5000
    });
    await page.waitForTimeout(500);

    const tabletExplore = await page.evaluate(() => {
      const visibleChapterButtons = [...document.querySelectorAll(".chapter-button")]
        .filter((button) => {
          const rect = button.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && getComputedStyle(button).display !== "none";
        })
        .map((button) => button.textContent.trim());
      const panel = document.querySelector("#node-panel");
      const panelRect = panel?.getBoundingClientRect();
      return {
        mode: document.querySelector("#app")?.dataset.mode ?? null,
        mobilePanel: document.querySelector("#app")?.dataset.mobilePanel ?? null,
        visibleChapterButtons,
        panelVisible: Boolean(panelRect && panelRect.width > 0 && panelRect.height > 0 && getComputedStyle(panel).display !== "none"),
        stepCount: document.querySelectorAll(".mobile-scroll-step").length
      };
    });

    if (tabletExplore.mode !== "explore") throw new Error(`Expected tablet explore mode, got "${tabletExplore.mode}".`);
    if (tabletExplore.stepCount !== 5) throw new Error(`Expected 5 tablet scroll steps, found ${tabletExplore.stepCount}.`);
    if (tabletExplore.visibleChapterButtons.length !== 1 || tabletExplore.visibleChapterButtons[0] !== "Launch Site") {
      throw new Error(`Expected one tablet sticky chapter, got ${JSON.stringify(tabletExplore.visibleChapterButtons)}.`);
    }
    if (tabletExplore.mobilePanel !== "closed" || tabletExplore.panelVisible) {
      throw new Error(`Expected tablet overview panel closed by default: ${JSON.stringify(tabletExplore)}.`);
    }

    const audioSyncedChapter = await selectAudioAndAssertSync(page, {
      option: "ground-station",
      expectedChapter: "Space Station",
      label: "tablet",
      expectScroll: true
    });

    await page.locator(".chapter-button[aria-pressed='true']").click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mobilePanel === "open", null, {
      timeout: 5000
    });
    const openedPanel = await collectUiState(page);
    if (openedPanel.nodePanelTitle !== "Space Station") {
      throw new Error(`Expected tablet overview title Space Station, found "${openedPanel.nodePanelTitle}".`);
    }

    const canvas = await readCanvasMetrics(page);
    assertUsableCanvas(canvas, "tablet");

    if (diagnostics.pageErrors.length || diagnostics.consoleErrors.length) {
      throw new Error("Tablet page emitted errors.");
    }

    const screenshot = path.join(artifactsDir, "tablet.png");
    await page.screenshot({ path: screenshot, fullPage: false });

    report.tablet = {
      success: true,
      tabletExplore,
      audioSyncedChapter,
      openedPanel,
      canvas,
      screenshot,
      ...diagnostics
    };
  } catch (error) {
    report.tablet = {
      success: false,
      error: error.message,
      ...diagnostics
    };
    throw error;
  } finally {
    await context.close();
  }
}

async function verifyFallback(browser, url, report, expectedNodeCount) {
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  const diagnostics = { pageErrors: [], consoleErrors: [] };
  attachPageDiagnostics(page, diagnostics);

  try {
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    await page.waitForSelector("#fallback-view", { state: "visible", timeout: 10000 });
    await page.waitForSelector(".fallback-node[data-node]", { state: "visible", timeout: 10000 });

    const fallback = await page.evaluate(() => {
      const fallbackView = document.querySelector("#fallback-view");
      const rect = fallbackView?.getBoundingClientRect();
      const buttons = [...document.querySelectorAll(".fallback-node[data-node]")];

      return {
        mode: document.querySelector("#app")?.dataset.mode ?? null,
        visible: Boolean(
          fallbackView &&
            !fallbackView.hidden &&
            rect &&
            rect.width > 0 &&
            rect.height > 0 &&
            getComputedStyle(fallbackView).display !== "none"
        ),
        title: document.querySelector("#fallback-view h2")?.textContent?.trim() ?? "",
        introLength: document.querySelector("#fallback-view p")?.textContent?.trim().length ?? 0,
        nodeButtonCount: buttons.length,
        nodeIds: buttons.map((button) => button.dataset.node),
        selectedCount: buttons.filter((button) => button.getAttribute("aria-pressed") === "true").length
      };
    });

    if (fallback.mode !== "fallback") throw new Error(`Expected fallback mode, got ${fallback.mode}.`);
    if (!fallback.visible) throw new Error("Fallback view is not visible.");
    if (!fallback.title) throw new Error("Fallback title is missing.");
    if (fallback.introLength < 20) throw new Error("Fallback intro did not render meaningful text.");
    if (fallback.nodeButtonCount !== expectedNodeCount) {
      throw new Error(`Expected ${expectedNodeCount} fallback node buttons, found ${fallback.nodeButtonCount}.`);
    }
    if (new Set(fallback.nodeIds).size !== expectedNodeCount || fallback.nodeIds.some((id) => !id)) {
      throw new Error(`Fallback node buttons have invalid data-node values: ${JSON.stringify(fallback.nodeIds)}`);
    }
    if (fallback.selectedCount !== 1) {
      throw new Error(`Expected exactly one selected fallback node, found ${fallback.selectedCount}.`);
    }
    if (diagnostics.pageErrors.length || diagnostics.consoleErrors.length) {
      throw new Error("Fallback page emitted errors.");
    }

    report.fallback = {
      success: true,
      expectedNodeCount,
      fallback,
      ...diagnostics
    };
  } catch (error) {
    report.fallback = {
      success: false,
      error: error.message,
      ...diagnostics
    };
    throw error;
  } finally {
    await context.close();
  }
}

async function writeReport(report) {
  await mkdir(artifactsDir, { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

async function main() {
  await mkdir(artifactsDir, { recursive: true });

  const report = {
    success: false,
    startedAt: new Date().toISOString(),
    projectRoot,
    artifactsDir,
    playwright: null,
    server: null,
    desktop: null,
    mobile: null,
    tablet: null,
    fallback: null
  };

  let server = null;
  let browser = null;

  try {
    const { playwright, source } = resolvePlaywright();
    const { nodes } = await import(pathToFileURL(path.join(projectRoot, "src/data/content.js")).href);
    report.playwright = { source };

    const port = await getAvailablePort();
    const baseUrl = `http://127.0.0.1:${port}/`;
    const url = new URL("?verify=1", baseUrl).toString();
    const fallbackUrl = new URL("?verify=1&forceFallback=1", baseUrl).toString();
    server = startServer(port);
    report.server = { port, url, fallbackUrl };
    await waitForServer({ child: server.child, url, output: server.output });

    browser = await launchChromium(playwright.chromium);
    await verifyDesktop(browser, url, report);
    await verifyMobile(browser, url, report);
    await verifyTablet(browser, url, report);
    await verifyFallback(browser, fallbackUrl, report, nodes.length);

    report.success = true;
  } catch (error) {
    report.success = false;
    report.error = error.stack || error.message || String(error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    if (server) {
      report.server.output = server.output.join("");
      await stopServer(server.child);
      report.server.exitCode = server.child.exitCode;
    }
    report.finishedAt = new Date().toISOString();
    await writeReport(report);
  }

  if (!report.success) {
    throw new Error(`Browser verification failed. See ${reportPath}`);
  }

  console.log(`Browser verification passed. Report written to ${reportPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

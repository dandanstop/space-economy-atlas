const { spawn } = require("node:child_process");
const { createServer } = require("node:net");
const { existsSync } = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "og-image.png");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolvePlaywright() {
  const candidatePaths = [
    projectRoot,
    path.join(projectRoot, "node_modules"),
    path.resolve(projectRoot, ".."),
    path.join(path.resolve(projectRoot, ".."), "node_modules"),
    "/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules"
  ];

  try {
    return require("playwright");
  } catch {}

  for (const candidatePath of candidatePaths) {
    try {
      return require(require.resolve("playwright", { paths: [candidatePath] }));
    } catch {}
  }

  throw new Error("Unable to resolve Playwright.");
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
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Server exited before ready with code ${child.exitCode}.\n${output.join("")}`);
    }
    if (output.join("").includes("Space Economy Atlas running at") && (await requestOk(url))) return;
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
    if (!existsSync(executablePath)) continue;
    try {
      return await chromium.launch({ headless: true, executablePath });
    } catch (error) {
      launchErrors.push(`${executablePath}: ${error.message}`);
    }
  }

  throw new Error(`Unable to launch Chromium.\n${launchErrors.join("\n")}`);
}

async function main() {
  const port = await getAvailablePort();
  const server = startServer(port);
  const url = `http://127.0.0.1:${port}/?verify=1`;
  let browser = null;

  try {
    await waitForServer({ child: server.child, url, output: server.output });
    const { chromium } = resolvePlaywright();
    browser = await launchChromium(chromium);

    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1
    });
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    await page.waitForSelector("#space-canvas", { state: "attached", timeout: 10000 });
    await page.waitForSelector("#hero-copy h1", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(600);
    await page.locator(".hero-action--primary").click();
    await page.waitForFunction(() => document.querySelector("#app")?.dataset.mode === "explore", null, {
      timeout: 5000
    });
    await page.locator(".chapter-button").nth(1).click();
    await page.waitForTimeout(1300);
    await page.addStyleTag({
      content: `
        .chapter-rail,
        .node-panel,
        .about-link,
        .language-toggle,
        .hero-copy__prompt,
        .hero-copy__actions {
          display: none !important;
        }

        .app-shell[data-mode="explore"] .hero-copy {
          display: block !important;
        }

        .top-bar {
          min-height: 72px !important;
          border-bottom: 0 !important;
          background: linear-gradient(180deg, rgba(2, 5, 10, 0.88), rgba(2, 5, 10, 0)) !important;
          backdrop-filter: none !important;
        }

        .brand {
          font-size: 15px !important;
        }

        .hero-copy {
          width: min(700px, calc(100vw - 64px)) !important;
          padding: 116px 0 0 38px !important;
        }

        .hero-copy__kicker {
          margin-bottom: 10px !important;
          font-size: 11px !important;
          transform: none !important;
        }

        .hero-copy h1 {
          max-width: 12ch !important;
          margin-bottom: 18px !important;
          font-size: 74px !important;
          line-height: 0.94 !important;
        }

        .hero-copy__subtitle {
          max-width: 48ch !important;
          font-size: 22px !important;
          line-height: 1.36 !important;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.8) !important;
        }
      `
    });
    await page.screenshot({ path: outputPath, type: "png", fullPage: false });
    console.log(`OG image written to ${outputPath}`);
  } finally {
    await browser?.close();
    await stopServer(server.child);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

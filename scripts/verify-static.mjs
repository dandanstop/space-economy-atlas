import { access, readFile } from "node:fs/promises";

const required = [
  "index.html",
  "og-image.png",
  "vercel.json",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "humans.txt",
  "scripts/build-vercel.mjs",
  "src/analytics.js",
  "src/main.js",
  "src/state.js",
  "src/scene.js",
  "src/interactions.js",
  "src/animations.js",
  "src/styles.css",
  "src/data/content.js"
];

await Promise.all(required.map((file) => access(file)));

const html = await readFile("index.html", "utf8");
const analytics = await readFile("src/analytics.js", "utf8");
const robots = await readFile("robots.txt", "utf8");
const sitemap = await readFile("sitemap.xml", "utf8");
const llms = await readFile("llms.txt", "utf8");
const llmsFull = await readFile("llms-full.txt", "utf8");
const humans = await readFile("humans.txt", "utf8");
const vercelConfig = JSON.parse(await readFile("vercel.json", "utf8"));
const productionUrl = "https://www.dandanstop.me/space-economy";
const productionImage = `${productionUrl}/og-image.png`;
const requiredIds = [
  "app",
  "space-canvas",
  "fallback-view",
  "language-toggle",
  "about-link",
  "about-dialog",
  "about-dialog-content",
  "chapter-rail",
  "chapter-rail-buttons",
  "audio-guide",
  "hero-copy",
  "node-panel",
  "mobile-scroll-steps"
];

for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`Missing required DOM id: ${id}`);
  }
}

const requiredSeoSnippets = [
  "<title>Space Economy Atlas | A visual guide to how space infrastructure works</title>",
  'name="description"',
  'name="robots"',
  'property="og:title"',
  `property="og:url" content="${productionUrl}"`,
  `property="og:image" content="${productionImage}"`,
  'name="twitter:card" content="summary_large_image"',
  `name="twitter:image" content="${productionImage}"`,
  `<link rel="canonical" href="${productionUrl}">`,
  'type="application/ld+json"',
  `"url": "${productionUrl}"`,
  `"image": "${productionImage}"`,
  "<h1>The space economy is an industry chain from Earth to orbit</h1>",
  "<noscript>"
];

for (const snippet of requiredSeoSnippets) {
  if (!html.includes(snippet)) {
    throw new Error(`Missing SEO snippet: ${snippet}`);
  }
}

const requiredAnalyticsSnippets = [
  'GA_MEASUREMENT_ID = "G-2CJ15FLWPY"',
  'ANALYTICS_PATH = "/space-economy"',
  'ANALYTICS_LOCATION = "https://www.dandanstop.me/space-economy"',
  'project_slug: "space-economy"',
  'project_name: "Space Economy"',
  "googletagmanager.com/gtag/js",
  "page_path: ANALYTICS_PATH",
  "page_location: ANALYTICS_LOCATION"
];

for (const snippet of requiredAnalyticsSnippets) {
  if (!analytics.includes(snippet)) {
    throw new Error(`Missing analytics snippet: ${snippet}`);
  }
}

if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  throw new Error("robots.txt must allow crawling by default.");
}

if (!robots.includes(`Sitemap: ${productionUrl}/sitemap.xml`)) {
  throw new Error("robots.txt must reference the production sitemap.");
}

if (!sitemap.includes(`<loc>${productionUrl}</loc>`)) {
  throw new Error("sitemap.xml must include the production URL.");
}

if (!llms.includes("# Space Economy Atlas") || !llms.includes(productionUrl)) {
  throw new Error("llms.txt must include the project title and canonical production URL.");
}

if (!llmsFull.includes("Full AI-Readable Summary") || !llmsFull.includes(productionUrl)) {
  throw new Error("llms-full.txt must include the detailed AI summary and production URL.");
}

if (!humans.includes("Curated by: DanDanStop") || !humans.includes(productionUrl)) {
  throw new Error("humans.txt must include maintainer attribution and production URL.");
}

if (vercelConfig.buildCommand !== "npm run vercel:build") {
  throw new Error("vercel.json must use npm run vercel:build as the build command.");
}

if (vercelConfig.outputDirectory !== "dist") {
  throw new Error("vercel.json must output to dist.");
}

const redirects = vercelConfig.redirects ?? [];
const rewrites = vercelConfig.rewrites ?? [];

if (!redirects.some((route) => route.source === "/" && route.destination === "/space-economy")) {
  throw new Error("vercel.json must redirect / to /space-economy.");
}

if (!rewrites.some((route) => route.source === "/space-economy" && route.destination === "/index.html")) {
  throw new Error("vercel.json must rewrite /space-economy to index.html.");
}

if (!rewrites.some((route) => route.source === "/space-economy/:path*" && route.destination === "/:path*")) {
  throw new Error("vercel.json must rewrite /space-economy/:path* to root static assets.");
}

console.log(`Static build verified: ${required.length} files present.`);

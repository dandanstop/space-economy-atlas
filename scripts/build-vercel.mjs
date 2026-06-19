import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

const files = [
  "index.html",
  "og-image.png",
  "robots.txt",
  "sitemap.xml"
];

const directories = [
  "assets",
  "src",
  "node_modules/three/build",
  "node_modules/three/examples/jsm"
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of files) {
  await mkdir(dirname(join(dist, file)), { recursive: true });
  await cp(join(root, file), join(dist, file));
}

for (const directory of directories) {
  await cp(join(root, directory), join(dist, directory), {
    recursive: true,
    force: true
  });
}

console.log(`Vercel output prepared at ${dist}`);

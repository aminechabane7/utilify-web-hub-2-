import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const siteUrl = "https://utilify-web-hub-2.vercel.app";
const toolsRoot = path.join(process.cwd(), "src", "pages", "tools");
const source = readFileSync(path.join(process.cwd(), "src", "pages", "tools.ts"), "utf8");
const categories = [...source.matchAll(/\{\s*id:\s*'([^']+)',\s*title:\s*'[^']+',\s*description:\s*'[^']+',\s*icon:/g)]
  .map(([, id]) => id);
const toolEntries = [
  ...source.matchAll(/\{\s*id:\s*'[^']+',\s*title:\s*'[^']+',\s*description:\s*'[^']+',\s*path:\s*'([^']+)',\s*implemented:\s*(true|false)\s*\}/g),
];

if (categories.length === 0 || toolEntries.length === 0) {
  throw new Error("Unable to read tool categories and routes from src/pages/tools.ts");
}

const toSlug = (value) =>
  value
    .replace(/\.tsx$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
const normalizeSegment = (value) => value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
const moduleRoutes = new Map();

for (const category of categories) {
  const categoryRoot = path.join(toolsRoot, category);
  for (const entry of readdirSync(categoryRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".tsx") || entry.name === "index.tsx") continue;
    const slug = toSlug(entry.name);
    moduleRoutes.set(`${category}|${normalizeSegment(slug)}`, `/tools/${category}/${slug}`);
  }
}

const urls = new Set(["/", "/about", "/tools", ...categories.map((category) => `/tools/${category}`)]);
for (const [, route, implemented] of toolEntries) {
  if (implemented !== "true") continue;
  const segments = route.split("/").filter(Boolean);
  const category = segments[1];
  const rawSlug = segments.at(-1);
  const canonicalRoute = moduleRoutes.get(`${category}|${normalizeSegment(rawSlug)}`);
  if (!canonicalRoute) {
    throw new Error(`Implemented tool route has no page module: ${route}`);
  }
  urls.add(canonicalRoute);
}
for (const route of moduleRoutes.values()) urls.add(route);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...urls]
    .sort()
    .map((url) => `  <url><loc>${siteUrl}${url}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`Generated sitemap with ${urls.size} canonical URLs.`);

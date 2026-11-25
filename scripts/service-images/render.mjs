import { launch } from "./launch.mjs";
import fs from "node:fs";
const only = process.argv.slice(2);
const slugs = ["static-website","dynamic-website","landing-page","business-website","portfolio-website","ecommerce","online-store-setup","product-management","wordpress","wordpress-customization","elementor-design","meta-ads","seo","social-media-marketing","business-card","banner-design","social-post-design","poster-design","bug-fixing","speed-optimization","website-maintenance"];
fs.mkdirSync("out", { recursive: true });
const b = await launch();
for (const slug of slugs.filter(s => !only.length || only.includes(s))) {
  const p = await b.newPage();
  p.on("pageerror", e => console.log("PAGEERROR", slug, e.message));
  await p.setViewport({ width: 1200, height: 750 });
  await p.goto(`file:///tmp/shot/scenes.html#${slug}`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 500));
  await p.screenshot({ path: `out/${slug}.png` });
  await p.close();
  console.log("ok", slug);
}
await b.close();

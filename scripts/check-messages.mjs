// Verifies every messages/*.json has exactly the same keys as en.json
// and the same ICU placeholders. Run: npm run check:messages
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("../messages/", import.meta.url);
const load = (f) => JSON.parse(readFileSync(new URL(f, dir), "utf8"));
const flat = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === "object" ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]
  );
const placeholders = (s) =>
  [...s.matchAll(/\{(\w+)(?:,|\})/g)].map((m) => m[1]).sort().join(",");

const en = new Map(flat(load("en.json")));
let errors = 0;
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const t = new Map(flat(load(f)));
  for (const k of en.keys()) {
    if (!t.has(k)) { console.error(`${f}: missing ${k}`); errors++; }
    else if (placeholders(t.get(k)) !== placeholders(en.get(k))) {
      console.error(`${f}: placeholder mismatch in ${k}`); errors++;
    }
  }
  for (const k of t.keys()) if (!en.has(k)) { console.error(`${f}: extra key ${k}`); errors++; }
  console.log(`${f}: ${t.size} keys`);
}
console.log(`en.json: ${en.size} keys`);
process.exit(errors ? 1 : 0);

// Fails fast with a clear message if pre-i18n route files are still present.
// (Typical cause: the updated project was extracted over an older copy, which
// never deletes old files.) Runs automatically before `npm run build`.
import { existsSync } from "node:fs";

const stale = [
  ["app/(client)", "moved to app/[locale]/(client)"],
  ["app/layout.tsx", "moved to app/[locale]/layout.tsx"],
];
const found = stale.filter(([p]) => existsSync(p));
if (found.length) {
  console.error("\n✖ Old (pre-multilingual) route files are still in your project:\n");
  for (const [p, why] of found) console.error(`   - ${p}   (${why})`);
  console.error(
    "\n  They render the new Header outside a locale, which crashes with\n" +
      '  "Error occurred prerendering page /about … at usePathname".\n' +
      "  Delete the paths listed above and run the build again.\n"
  );
  process.exit(1);
}
console.log("✓ route structure OK");

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Locale detection order: URL prefix → NEXT_LOCALE cookie (manual choice)
// → browser Accept-Language → default (en).
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and any file with an extension
  // (favicon.ico, robots.txt, sitemap.xml, images…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

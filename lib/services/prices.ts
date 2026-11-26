import type { AddonKey, Money, Tier } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRICE LIST — the only file you need to edit to change prices.
 *
 *  • EUR and USD are set independently (they are NOT converted from each other).
 *  • Use `null` for "Price on request" (e.g. complex projects).
 *  • A missing service/tier also shows "Price on request".
 *  • Set PRICING_STATUS to "final" once you have confirmed your prices.
 *    While it is "draft", prices are left out of structured data (JSON-LD)
 *    so search engines never index placeholder numbers.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const PRICING_STATUS: "draft" | "final" = "draft";

const m = (eur: number | null, usd: number | null): Money => ({ eur, usd });
const ON_REQUEST: Money = m(null, null);

/** DRAFT starting prices (per project, or per month for monthly services). */
export const PRICES: Record<string, Record<Tier, Money>> = {
  // ── Website Development ────────────────────────────────────────────
  "static-website": { basic: m(60, 65), standard: m(120, 130), premium: m(250, 270) },
  "dynamic-website": { basic: m(150, 165), standard: m(300, 330), premium: m(600, 660) },
  "landing-page": { basic: m(50, 55), standard: m(100, 110), premium: m(180, 200) },
  "business-website": { basic: m(120, 130), standard: m(250, 270), premium: m(500, 550) },
  "portfolio-website": { basic: m(70, 75), standard: m(140, 150), premium: m(260, 285) },
  // ── E-commerce ─────────────────────────────────────────────────────
  ecommerce: { basic: m(300, 330), standard: m(600, 660), premium: ON_REQUEST },
  "online-store-setup": { basic: m(120, 130), standard: m(240, 260), premium: m(450, 490) },
  "product-management": { basic: m(200, 220), standard: m(400, 440), premium: ON_REQUEST },
  // ── WordPress ──────────────────────────────────────────────────────
  wordpress: { basic: m(100, 110), standard: m(200, 220), premium: m(380, 415) },
  "wordpress-customization": { basic: m(40, 45), standard: m(90, 100), premium: m(180, 195) },
  "elementor-design": { basic: m(80, 90), standard: m(160, 175), premium: m(300, 330) },
  // ── Digital Marketing (Meta Ads & Social = per month, ad spend not included) ──
  "meta-ads": { basic: m(20, 30), standard: m(100, 120), premium: m(150, 199) },
  seo: { basic: m(100, 110), standard: m(200, 220), premium: m(380, 415) },
  "social-media-marketing": { basic: m(90, 100), standard: m(180, 200), premium: m(340, 375) },
  // ── Graphics Design ────────────────────────────────────────────────
  "business-card": { basic: m(10, 11), standard: m(20, 22), premium: m(35, 38) },
  "banner-design": { basic: m(12, 13), standard: m(25, 27), premium: m(45, 49) },
  "social-post-design": { basic: m(8, 9), standard: m(20, 22), premium: m(40, 44) },
  "poster-design": { basic: m(15, 16), standard: m(30, 33), premium: m(55, 60) },
  // ── Website Maintenance (Website Maintenance = per month) ──────────
  "bug-fixing": { basic: m(20, 22), standard: m(45, 50), premium: m(90, 100) },
  "speed-optimization": { basic: m(35, 38), standard: m(70, 77), premium: m(130, 143) },
  "website-maintenance": { basic: m(40, 44), standard: m(80, 88), premium: m(150, 165) },
};

/** DRAFT prices of optional extras (shown as "+ price" under the packages). */
export const ADDON_PRICES: Record<AddonKey, Money> = {
  extraRevision: m(15, 17),
  fastDelivery: m(40, 44),
  extraPage: m(20, 22),
  extraProducts: m(25, 27),
  extraDesign: m(10, 11),
  extraPlatform: m(30, 33),
};

export function priceFor(serviceId: string, tier: Tier): Money {
  return PRICES[serviceId]?.[tier] ?? ON_REQUEST;
}

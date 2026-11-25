import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/locales";

export type CategoryId =
  | "website"
  | "ecommerce"
  | "wordpress"
  | "marketing"
  | "graphics"
  | "maintenance";

export type Tier = "basic" | "standard" | "premium";
export const tiers: Tier[] = ["basic", "standard", "premium"];

/** English is required; other languages fall back to English when missing. */
export type LocalizedText = { en: string } & Partial<Record<Locale, string>>;

/** Keys of messages → pricing.features.* */
export type FeatureKey =
  | "pages" | "responsive" | "responsiveAdvanced" | "seoBasic" | "seoStandard"
  | "seoAdvanced" | "contactForm" | "social" | "integrations" | "performance"
  | "cms" | "adminPanel" | "database" | "auth" | "analytics" | "hosting"
  | "sourceCode" | "support" | "animations" | "products" | "checkout"
  | "payments" | "orders" | "inventory" | "theme" | "plugins" | "elementor"
  | "customization" | "security" | "backups" | "campaigns" | "audience"
  | "tracking" | "reporting" | "keywords" | "onPage" | "audit" | "posts"
  | "calendar" | "platforms" | "concepts" | "sourceFiles" | "printReady"
  | "formats" | "designs" | "issues" | "diagnosis" | "speedGains" | "images"
  | "caching" | "updates" | "uptime" | "changes" | "brandKit";

/** Keys of messages → pricing.addons.* (prices live in lib/services/prices.ts) */
export type AddonKey =
  | "extraRevision" | "fastDelivery" | "extraPage"
  | "extraProducts" | "extraDesign" | "extraPlatform";

export interface FeatureRef {
  key: FeatureKey;
  /** Fills the {count} placeholder of the feature text. */
  value?: string | number;
}

/** null = "Price on request" for that currency. EUR and USD are independent. */
export interface Money {
  eur: number | null;
  usd: number | null;
}

export interface ServicePackage {
  tier: Tier;
  /** Optional custom name; defaults to Basic / Standard / Premium. */
  name?: LocalizedText;
  /** Optional custom description; defaults to pricing.tierDescription.<tier>. */
  description?: LocalizedText;
  price: Money;
  features: FeatureRef[];
  deliveryDays: number;
  revisions: number;
  addons?: AddonKey[];
}

export interface ServiceFaq {
  q: LocalizedText;
  a: LocalizedText;
}

export type ServiceIcon =
  | "FileCode" | "Database" | "Rocket" | "Briefcase" | "User" | "ShoppingCart"
  | "Store" | "Package" | "LayoutTemplate" | "SlidersHorizontal"
  | "MousePointerClick" | "Megaphone" | "Search" | "Share2" | "CreditCard"
  | "ImageIcon" | "Frame" | "LayoutGrid" | "Bug" | "Gauge" | "Wrench";

export interface Service {
  id: string;
  slug: string;
  category: CategoryId;
  icon: ServiceIcon;
  title: LocalizedText;
  short: LocalizedText;
  /** Optional photo; otherwise a generated category thumbnail is used. */
  thumbnail?: StaticImageData;
  gallery: StaticImageData[];
  technologies: string[];
  packages: Record<Tier, ServicePackage>;
  /** "month" shows "/ month" after the price. */
  unit: "project" | "month";
  /** Service-specific FAQs shown after the shared + category FAQs. */
  faqs?: ServiceFaq[];
  featured: boolean;
  published: boolean;
  seo?: { title?: LocalizedText; description?: LocalizedText };
}

/** Locale-resolved service used by listing UI (small, serialisable). */
export interface ServiceSummary {
  slug: string;
  category: CategoryId;
  icon: ServiceIcon;
  thumbnail?: StaticImageData;
  title: string;
  short: string;
  startingEur: number | null;
  startingUsd: number | null;
  unit: "project" | "month";
  featured: boolean;
}

import type { StaticImageData } from "next/image";
import { priceFor } from "../prices";
import type {
  AddonKey, CategoryId, FeatureKey, FeatureRef, LocalizedText, Service,
  ServiceFaq, ServiceIcon, ServicePackage, Tier,
} from "../types";

/** Localized text in the fixed order: en, it, bn, es, fr, de, ar */
export const L = (
  en: string, it: string, bn: string, es: string, fr: string, de: string, ar: string
): LocalizedText => ({ en, it, bn, es, fr, de, ar });

/** Feature reference shortcut: f("pages", "1–3") */
export const f = (key: FeatureKey, value?: string | number): FeatureRef => ({ key, value });

interface PackageInput {
  /** Delivery time in days */
  days: number;
  revisions: number;
  features: FeatureRef[];
  addons?: AddonKey[];
}

interface ServiceInput {
  id: string;
  slug?: string;
  category: CategoryId;
  icon: ServiceIcon;
  title: LocalizedText;
  short: LocalizedText;
  technologies: string[];
  gallery?: StaticImageData[];
  featured?: boolean;
  published?: boolean;
  unit?: "project" | "month";
  faqs?: ServiceFaq[];
  seo?: Service["seo"];
  basic: PackageInput;
  standard: PackageInput;
  premium: PackageInput;
  /** Extras offered on every package unless a package sets its own. */
  addons?: AddonKey[];
}

export function defineService(i: ServiceInput): Service {
  const build = (tier: Tier, p: PackageInput): ServicePackage => ({
    tier,
    price: priceFor(i.id, tier),
    features: p.features,
    deliveryDays: p.days,
    revisions: p.revisions,
    addons: p.addons ?? i.addons,
  });
  return {
    id: i.id,
    slug: i.slug ?? i.id,
    category: i.category,
    icon: i.icon,
    title: i.title,
    short: i.short,
    gallery: i.gallery ?? [],
    technologies: i.technologies,
    unit: i.unit ?? "project",
    faqs: i.faqs,
    featured: i.featured ?? false,
    published: i.published ?? true,
    seo: i.seo,
    packages: {
      basic: build("basic", i.basic),
      standard: build("standard", i.standard),
      premium: build("premium", i.premium),
    },
  };
}

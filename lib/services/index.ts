import type { Locale } from "@/i18n/locales";
import { websiteServices } from "./catalog/website";
import { ecommerceServices } from "./catalog/ecommerce";
import { wordpressServices } from "./catalog/wordpress";
import { marketingServices } from "./catalog/marketing";
import { graphicsServices } from "./catalog/graphics";
import { maintenanceServices } from "./catalog/maintenance";
import { categoryIds } from "./categories";
import { thumbnails } from "./thumbnails";
import type {
  FeatureRef, LocalizedText, Money, Service, ServiceSummary, Tier,
} from "./types";
import { tiers } from "./types";

/** Add a new service by creating it in a catalog file and registering it here. */
const allServices: Service[] = [
  ...websiteServices,
  ...ecommerceServices,
  ...wordpressServices,
  ...marketingServices,
  ...graphicsServices,
  ...maintenanceServices,
];

/** Published services in category order, then catalog order. */
export const services: Service[] = allServices
  .filter((s) => s.published)
  .map((s) => ({ ...s, thumbnail: s.thumbnail ?? thumbnails[s.slug] }))
  .sort((a, b) => categoryIds.indexOf(a.category) - categoryIds.indexOf(b.category));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getServiceSlugs = () => services.map((s) => s.slug);

/** Picks the locale's text, falling back to English. */
export const text = (t: LocalizedText, locale: Locale): string => t[locale] ?? t.en;

const lowest = (values: (number | null)[]): number | null => {
  const nums = values.filter((v): v is number => v !== null);
  return nums.length ? Math.min(...nums) : null;
};

/** Lowest configured price per currency (never converted between currencies). */
export function startingPrice(service: Service): Money {
  const prices = tiers.map((t) => service.packages[t].price);
  return { eur: lowest(prices.map((p) => p.eur)), usd: lowest(prices.map((p) => p.usd)) };
}

export function toSummary(service: Service, locale: Locale): ServiceSummary {
  const start = startingPrice(service);
  return {
    slug: service.slug,
    category: service.category,
    icon: service.icon,
    thumbnail: service.thumbnail,
    title: text(service.title, locale),
    short: text(service.short, locale),
    startingEur: start.eur,
    startingUsd: start.usd,
    unit: service.unit,
    featured: service.featured,
  };
}

export function getRelated(service: Service, limit = 3): Service[] {
  const same = services.filter((s) => s.category === service.category && s.id !== service.id);
  const others = services.filter((s) => s.category !== service.category);
  return [...same, ...others].slice(0, limit);
}

/** Union of features across packages (highest tier value wins), for the "Key features" list. */
export function keyFeatures(service: Service): FeatureRef[] {
  const seen = new Set<string>();
  const out: FeatureRef[] = [];
  for (const tier of [...tiers].reverse() as Tier[]) {
    for (const feature of service.packages[tier].features) {
      if (!seen.has(feature.key)) {
        seen.add(feature.key);
        out.push(feature);
      }
    }
  }
  return out;
}

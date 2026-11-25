import type { StaticImageData } from "next/image";
import staticWebsite from "@/assets/services/static-website.webp";
import dynamicWebsite from "@/assets/services/dynamic-website.webp";
import landingPage from "@/assets/services/landing-page.webp";
import businessWebsite from "@/assets/services/business-website.webp";
import portfolioWebsite from "@/assets/services/portfolio-website.webp";
import ecommerce from "@/assets/services/ecommerce.webp";
import onlineStoreSetup from "@/assets/services/online-store-setup.webp";
import productManagement from "@/assets/services/product-management.webp";
import wordpress from "@/assets/services/wordpress.webp";
import wordpressCustomization from "@/assets/services/wordpress-customization.webp";
import elementorDesign from "@/assets/services/elementor-design.webp";
import metaAds from "@/assets/services/meta-ads.webp";
import seo from "@/assets/services/seo.webp";
import socialMediaMarketing from "@/assets/services/social-media-marketing.webp";
import businessCard from "@/assets/services/business-card.webp";
import bannerDesign from "@/assets/services/banner-design.webp";
import socialPostDesign from "@/assets/services/social-post-design.webp";
import posterDesign from "@/assets/services/poster-design.webp";
import bugFixing from "@/assets/services/bug-fixing.webp";
import speedOptimization from "@/assets/services/speed-optimization.webp";
import websiteMaintenance from "@/assets/services/website-maintenance.webp";

/**
 * Service card / hero images (960×600 WebP, 16:10).
 * To change an image, replace the file in assets/services/ (keep the name),
 * or point a service's `thumbnail` field at a different import.
 * Services without an entry fall back to the generated category thumbnail.
 */
export const thumbnails: Record<string, StaticImageData> = {
  "static-website": staticWebsite,
  "dynamic-website": dynamicWebsite,
  "landing-page": landingPage,
  "business-website": businessWebsite,
  "portfolio-website": portfolioWebsite,
  "ecommerce": ecommerce,
  "online-store-setup": onlineStoreSetup,
  "product-management": productManagement,
  "wordpress": wordpress,
  "wordpress-customization": wordpressCustomization,
  "elementor-design": elementorDesign,
  "meta-ads": metaAds,
  "seo": seo,
  "social-media-marketing": socialMediaMarketing,
  "business-card": businessCard,
  "banner-design": bannerDesign,
  "social-post-design": socialPostDesign,
  "poster-design": posterDesign,
  "bug-fixing": bugFixing,
  "speed-optimization": speedOptimization,
  "website-maintenance": websiteMaintenance,
};

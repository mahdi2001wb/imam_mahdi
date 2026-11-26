/**
 * Central site configuration.
 * Edit contact details, social links and homepage statistics HERE only.
 */
export const siteConfig = {
  name: "Imam Mahdi",

  contact: {
    email: "mahsiimam0@gmail.com",
    /** International format. Digits are derived for wa.me links. */
    whatsappNumber: "+8801895297482",
    /** Where order/contact inquiries are delivered (Resend). Override with INQUIRY_TO_EMAIL. */
    inquiryToEmail: "mahsiimam0@gmail.com",
  },

  social: {
    github: "https://github.com/mahdi2001wb",
    linkedin: "https://www.linkedin.com/in/imam-mahdi-60a06a28b/",
    facebook: "https://www.facebook.com/imam.mahdi.490907?_rdc=1&_rdr#",
  },

  /** Homepage statistics (kept exactly as on the original site). */
  stats: {
    yearsExperience: 2,
    clients: 10,
    projectsDone: 50,
    /** Statistics panel (label keys live in messages → homepage.statLabels) */
    breakdown: [
      { key: "websiteDevelopment", number: 30 },
      { key: "webDesign", number: 20 },
      { key: "ecommerce", number: 10 },
      { key: "openSource", number: 10 },
    ],
  },
} as const;

const whatsappDigits = siteConfig.contact.whatsappNumber.replace(/\D/g, "");

/** https://wa.me/<number>?text=<encoded message> */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string): string {
  const base = `mailto:${siteConfig.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

/** Absolute site URL used for canonical/hreflang/sitemap. Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

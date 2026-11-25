import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Banner from "@/components/Banner";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import JsonLd from "@/components/shared/JsonLd";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("home.title"),
    description: t("home.description"),
    siteName: t("siteName"),
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return (
    <div className="overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteConfig.name,
          description: t("home.description"),
          url: absoluteUrl(locale as Locale, "/"),
          email: siteConfig.contact.email,
          sameAs: Object.values(siteConfig.social),
          inLanguage: locale,
          areaServed: "Worldwide",
        }}
      />
      <Banner />
      <Experience />
      <Services />
      <Skills />
      <Projects />
    </div>
  );
}

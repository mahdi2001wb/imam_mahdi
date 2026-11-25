import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Container from "@/components/Container";
import ServiceBrowser from "@/components/services/ServiceBrowser";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";
import { services, toSummary } from "@/lib/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/services",
    title: t("services.title"),
    description: t("services.description"),
    siteName: t("siteName"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const summaries = services.map((s) => toSummary(s, locale as Locale));

  return (
    <div>
      <section className="py-20 md:py-28 bg-gradient-to-r from-darkOrange to-darkBlue text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{t("heroTitle")}</h1>
            <p className="text-xl md:text-2xl mb-8">{t("heroText")}</p>
            <Button size="lg" variant="secondary" asChild>
              <a href="#all-services">
                {t("explore")}
                <ArrowDown className="ms-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <Suspense fallback={null}>
          <ServiceBrowser services={summaries} />
        </Suspense>
      </Container>
    </div>
  );
}

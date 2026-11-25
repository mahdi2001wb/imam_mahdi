import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Container from "@/components/Container";
import ProjectInquiryForm from "@/components/inquiry/ProjectInquiryForm";
import type { Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";
import { services, text } from "@/lib/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/order",
    title: t("order.title"),
    description: t("order.description"),
    siteName: t("siteName"),
    noIndex: true, // pre-filled query URLs shouldn't compete in search results
  });
}

export default async function OrderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const options = services.map((s) => ({
    slug: s.slug,
    category: s.category,
    title: text(s.title, locale as Locale),
  }));

  return (
    <Container className="py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">{t("orderTitle")}</h1>
        <p className="mb-8 text-primary/75">{t("orderText")}</p>
        <Suspense fallback={null}>
          <ProjectInquiryForm services={options} />
        </Suspense>
      </div>
    </Container>
  );
}

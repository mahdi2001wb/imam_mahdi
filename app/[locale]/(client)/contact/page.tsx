import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Container from "@/components/Container";
import ProjectInquiryForm from "@/components/inquiry/ProjectInquiryForm";
import { ButtonAnchor } from "@/components/shared/ButtonLink";
import { mailtoLink, siteConfig, whatsappLink } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";
import { services, text } from "@/lib/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("contact.title"),
    description: t("contact.description"),
    siteName: t("siteName"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const wa = await getTranslations({ locale, namespace: "whatsapp" });
  const options = services.map((s) => ({
    slug: s.slug,
    category: s.category,
    title: text(s.title, locale as Locale),
  }));

  return (
    <Container className="flex gap-10 items-start md:gap-20 py-20">
      <div aria-hidden="true">
        <div className="w-[2px] h-28 bg-primary/30">
          <div className="w-full h-[80%] bg-primary" />
        </div>
      </div>

      <div className="flex-1 max-w-4xl">
        <h1 className="font-bold text-2xl md:text-4xl md:leading-[50px] mb-2">
          {t("titleLine1")} <br />
          {t("titleLine2")}
        </h1>
        <p className="mb-8 text-primary/75">{t("intro")}</p>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-xl border border-primary/10 bg-white p-5">
            <div className="flex items-center gap-2 font-bold">
              <FaWhatsapp className="size-6 text-[#25D366]" aria-hidden="true" />
              {t("whatsappTitle")}
            </div>
            <p className="text-sm text-primary/70">{t("whatsappText")}</p>
            <p className="text-sm font-semibold" dir="ltr">{siteConfig.contact.whatsappNumber}</p>
            <ButtonAnchor href={whatsappLink(wa("general"))} variant="whatsapp" external className="mt-auto">
              {t("whatsappCta")}
            </ButtonAnchor>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-primary/10 bg-white p-5">
            <div className="flex items-center gap-2 font-bold">
              <Mail className="size-6 text-darkOrange" aria-hidden="true" />
              {t("emailTitle")}
            </div>
            <p className="text-sm text-primary/70">{t("emailText")}</p>
            <p className="text-sm font-semibold" dir="ltr">{siteConfig.contact.email}</p>
            <ButtonAnchor href={mailtoLink()} variant="outline" className="mt-auto">
              {siteConfig.contact.email}
            </ButtonAnchor>
          </div>
        </div>

        <h2 className="mb-5 text-2xl font-bold">{t("formTitle")}</h2>
        <Suspense fallback={null}>
          <ProjectInquiryForm services={options} />
        </Suspense>
      </div>
    </Container>
  );
}

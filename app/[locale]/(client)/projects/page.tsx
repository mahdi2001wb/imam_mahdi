import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Container from "@/components/Container";
import Projects from "@/components/Projects";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/projects",
    title: t("projects.title"),
    description: t("projects.description"),
    siteName: t("siteName"),
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <div>
      <section className="py-20 md:py-32 bg-gradient-to-r from-darkOrange to-darkBlue text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{t("heroTitle")}</h1>
            <p className="text-xl md:text-2xl mb-8">{t("heroText")}</p>
            <Button size="lg" variant="secondary" asChild>
              <a href="#projects">
                {t("explore")}
                <ArrowDown className="ms-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <div id="projects" className="scroll-mt-20">
        <Projects />
      </div>
    </div>
  );
}

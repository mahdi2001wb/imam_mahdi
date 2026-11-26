import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hero1 } from "@/assets/image";
import Container from "@/components/Container";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: t("about.title"),
    description: t("about.description"),
    siteName: t("siteName"),
  });
}

const skills = [
  "JavaScript", "TypeScript", "React", "Node.js", "Next.js", "Expressjs", "MongoDB", "Git",
  "Google Firebase", "Tailwindcss", "Sanity.io", "HTML5", "CSS3", "VS Code", "Github",
  "UI Design", "Figma", "Canva", "Adobe Illustrator", "Website Design", "Vercel", "netlify",
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const years = siteConfig.stats.yearsExperience;

  return (
    <Container className=" bg-white text-darkColor py-10 md:py-20">
      <div>
        <div className=" md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-contain md:w-48"
              src={hero1}
              alt={t("imageAlt")}
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-darkOrange font-bold">{t("role")}</div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-darkColor sm:text-4xl">
              Imam Mahdi
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-darkColor/80">{t("intro")}</p>
          </div>
        </div>

        <div className="wrapper px-8 py-6">
          <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
          <p className="text-darkColor/80 mb-4">{t("p1", { years })}</p>
          <p className="text-darkColor/80 mb-4">{t("p2")}</p>
          <p className="text-darkColor/80 mb-4">{t("p3")}</p>
        </div>

        <div className="wrapper px-8 py-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">{t("skills")}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

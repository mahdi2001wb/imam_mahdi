import React from "react";
import { useTranslations } from "next-intl";
import { AiFillAppstore, AiFillChrome } from "react-icons/ai";
import { FaMobile, FaGlobe } from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";
import { MoveRight } from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const cards = [
  { key: "webDev", icon: <AiFillChrome /> },
  { key: "webDesign", icon: <AiFillAppstore /> },
  { key: "ecommerce", icon: <FaMobile /> },
  { key: "ebook", icon: <SiAntdesign /> },
  { key: "seo", icon: <SiProgress /> },
  { key: "hosting", icon: <FaGlobe /> },
] as const;

const Services = ({ className }: { className?: string }) => {
  const t = useTranslations("homepage");
  return (
    <div className={cn("wrapper py-20 md:py-24", className)}>
      <Container className="">
        <div className="flex flex-col items-center justify-center ">
          <h2 className="text-4xl font-bold tracking-wide">{t("servicesTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 pt-10 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
          {cards.map(({ key, icon }) => (
            <Card
              key={key}
              title={t(`cards.${key}.title`)}
              des={t(`cards.${key}.des`)}
              icon={icon}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md bg-darkOrange px-8 py-3 text-sm font-bold text-white border border-darkOrange hover:bg-transparent hover:text-primary transition-colors duration-300"
          >
            {t("browseAll")}
            <MoveRight className="size-4 flip-rtl" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Services;

import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import Container from "./Container";
import Image from "next/image";
import { hero1 } from "@/assets/image";
import Statistics from "./Statistics";
import Counter from "./Counter";
import { Link } from "@/i18n/navigation";
import { mailtoLink, siteConfig } from "@/config/site";

const Banner = () => {
  const t = useTranslations("homepage");
  return (
    <div>
      {/* Two-column grid: text on the start side, portrait on the end side.
          No absolute positioning, so the layout cannot detach from the flow. */}
      <Container className="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-8 lg:gap-16 lg:py-16">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl sm:text-5xl font-bold capitalize leading-[1.15]">
            <span className="flex items-center gap-5 flex-wrap">
              {t("greeting")}{" "}
              <span className="bg-darkBlue text-primaryWhite rounded-full text-xl px-6 py-1.5">
                {t("role")}
              </span>
            </span>
            Imam Mahdi
          </h1>
          <p className="text-base font-medium tracking-wide">
            {t.rich("yearsLine", {
              years: siteConfig.stats.yearsExperience,
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm font-bold tracking-wide">
            <Link
              href="/contact"
              className="bg-darkOrange text-primaryWhite border border-darkOrange px-8 py-2.5 cursor-pointer rounded-md hover:bg-transparent hover:text-primary transition-colors duration-300"
            >
              {t("hireMe")}
            </Link>
            <Link
              href={"/projects"}
              className="flex items-center gap-2 border px-6 py-2.5 rounded-md hover:border-darkOrange transition-colors duration-300 group"
            >
              {t("viewProjects")}{" "}
              <MoveUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 flip-rtl" />
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              <Counter end={siteConfig.stats.clients} />+
            </h2>
            <p className="text-base font-medium leading-5 mt-1">{t("clients")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-16 gap-y-4 md:gap-x-24">
            <div>
              <h2 className="text-2xl font-bold">
                <Counter end={siteConfig.stats.projectsDone} />+
              </h2>
              <p className="text-base font-medium leading-5 mt-1">
                {t("projectsDone")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t("contact")}</h2>
              <a href={mailtoLink()} className="text-base font-medium" dir="ltr">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px]">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-lightYellow px-4 pt-5 shadow-sm">
            <Image
              src={hero1}
              alt={t("heroImageAlt")}
              priority
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 320px"
              className="size-full object-contain object-bottom"
            />
          </div>
        </div>
      </Container>
      <Statistics />
    </div>
  );
};

export default Banner;

import React from "react";
import { useTranslations } from "next-intl";
import { SiReactivex, SiFreelancer, SiFiverr } from "react-icons/si";
import { GiClockwork } from "react-icons/gi";
import ExperienceCard from "./ExperienceCard";
import Container from "./Container";
import { cn } from "@/lib/utils";

const Experience = ({ className }: { className?: string }) => {
  const t = useTranslations("homepage");
  return (
    <div className={cn("wrapper py-20 md:py-24 bg-darkColor", className)}>
      <Container className="">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-4xl font-bold text-white tracking-wide">
            {t("experienceTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-10">
          <ExperienceCard
            title="UpWork.com"
            subTitle={t("experience.webDeveloper")}
            icon={<SiReactivex />}
          />
          <ExperienceCard
            title="Kwork.com"
            subTitle={t("experience.mernDeveloper")}
            icon={<GiClockwork />}
          />
          <ExperienceCard
            title="Freelancer"
            subTitle={t("experience.mernDeveloper")}
            icon={<SiFreelancer />}
          />
          <ExperienceCard
            title="Fiverr"
            subTitle={t("experience.mernDeveloper")}
            icon={<SiFiverr />}
          />
        </div>
      </Container>
    </div>
  );
};

export default Experience;

import React from "react";
import { useTranslations } from "next-intl";
import Container from "./Container";
import ProjectCard from "./ProjectCard"
import {  schoolManagement, school, bandb,
  DevfolioPortfolio, 
  
  dynamicPortfolio,
  bookManagement } from "@/assets/image";

import { cn } from "@/lib/utils";


const Projects = ({ className }: { className?: string }) => {
  const t = useTranslations("portfolio");
  return (
    <div className={cn("wrapper py-20 md:py-24", className)}>
      <Container className="">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-4xl font-bold tracking-wide">{t("title")}</h2>
        </div>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        <ProjectCard
          img={schoolManagement.src}
          title="School Management"
          alt={t("preview", { title: "School Management" })}
          link="https://school-management-system-jet-tau.vercel.app/admin"
        />
        <ProjectCard
          img={bookManagement.src}
          title="Book Management"
          alt={t("preview", { title: "Book Management" })}
          link="/"
        />
        <ProjectCard
          img={DevfolioPortfolio.src}
          title="Devfolio Portfolio"
          alt={t("preview", { title: "Devfolio Portfolio" })}
          link="https://imam-mahdi.vercel.app/"
        />
        <ProjectCard
          img={school.src}
          title="School Management System"
          alt={t("preview", { title: "School Management System" })}
          link="https://dtmm.vercel.app/admin/login"
        />
        <ProjectCard
          img={dynamicPortfolio.src}
          title="Dynamic Portfolio"
          alt={t("preview", { title: "Dynamic Portfolio" })}
          link="https://imam-mahdi.vercel.app/"
        />

        <ProjectCard
          img={bandb.src}
          title="B&B Altura"
          alt={t("preview", { title: "B&B Altura" })}
          link="https://www.alturaprossedi.it/"
        />
      </div>
      </Container>
    </div>
  );
};

export default Projects;

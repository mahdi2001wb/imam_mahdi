import React from "react";
import Container from "./Container";
import ProjectCard from "./ProjectCard"
import {  schoolManagement, school, bandb,
  DevfolioPortfolio, 
  
  dynamicPortfolio, dashboard,
  bookManagement } from "@/assets/image";

import { cn } from "@/lib/utils";


const Projects = ({ className }: { className?: string }) => {
  return (
    <div className={cn("wrapper py-20 md:py-24", className)}>
      <Container className="">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold tracking-wide">My Projects</h1>
        </div>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        <ProjectCard
          img={schoolManagement.src}
          title="School Management"
          link="https://school-management-system-jet-tau.vercel.app/admin"
        />
        <ProjectCard
          img={bookManagement.src}
          title="Book Management"
          link="/"
        />
        <ProjectCard
          img={DevfolioPortfolio.src}
          title="Devfolio Portfolio"
          link="https://next-js-portfolio-2.vercel.app/"
        />
        <ProjectCard
          img={school.src}
          title="School Management System"
          link="https://dtmm.vercel.app/admin/login"
        />
        <ProjectCard
          img={dynamicPortfolio.src}
          title="Dynamic Portfolio"
          link="https://portfolioone.com/"
        />

        <ProjectCard
          img={bandb.src}
          title="B&B Altura"
          link="https://www.alturaprossdi.it/"
        />
      </div>
      </Container>
    </div>
  );
};

export default Projects;

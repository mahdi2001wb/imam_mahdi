import React from "react";
import Container from "./Container";
import ProjectCard from "./ProjectCard"
import {  amazonClone,
  DevfolioPortfolio, 
  noorShop,
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
          img={amazonClone.src}
          title="Amazon Clone"
          link="https://amazonclone.reactbd.com/"
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
          img={noorShop.src}
          title="Noor Shopping"
          link="https://orebishopping.reactbd.com/"
        />
        <ProjectCard
          img={dynamicPortfolio.src}
          title="Dynamic Portfolio"
          link="https://portfolioone.reactbd.com/"
        />

        <ProjectCard
          img={dashboard.src}
          title="Dashboard"
          link="https://orebishopping.reactbd.com/"
        />
      </div>
      </Container>
    </div>
  );
};

export default Projects;

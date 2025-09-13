import React from "react";
import { SiReactivex , SiFreelancer, SiFiverr } from "react-icons/si";
import { GiClockwork } from "react-icons/gi";
import ExperienceCard from "./ExperienceCard";
import Container from "./Container";
import { cn } from "@/lib/utils";

const Experience = ({ className }: { className?: string }) => {
  return (
    <div className={cn("wrapper py-20 md:py-24 bg-darkColor", className)}>
  <Container className="">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold text-white tracking-wide">Experience</h1>
        </div>
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-10">
        <ExperienceCard
          title="UpWork.com"
          subTitle="Web Developer 2024 - Present"
          icon={<SiReactivex />}
        />
        <ExperienceCard
          title="Kwork.com"
          subTitle="MERN Stack Developer 2024 - present"
          icon={<GiClockwork /> }
        />
        <ExperienceCard
          title="Freelancer"
          subTitle="MERN Stack Developer 2024 - present"
          icon={<SiFreelancer />}
        />

        <ExperienceCard
          title="Fiverr"
          subTitle="MERN Stack Developer 2024 - present"
          icon={<SiFiverr />}
        />
      </div>
  </Container>    
    </div>
  );
};

export default Experience;

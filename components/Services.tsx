import React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe } from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";
import { AiFillChrome } from "react-icons/ai";
import Card from "./Card";
import Container from "./Container";
import { cn } from "@/lib/utils";



const Services = ({className}:{className ? : string}) => {
  return (
    <div className={cn("wrapper py-20 md:py-24", className)}>
   <Container className="" >    
         <div className="flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold tracking-wide">Services</h1>
        </div>
        
        <div className="grid grid-cols-1 pt-10 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
          <Card
            title="Web Development"
            des="From design to integration to maintenance, I offer full-cycle web application development services besides being Able to build apps that are secure, scalable, fast, and work well across all devices and platforms."
            icon={<AiFillChrome/>}
          />
          <Card
            title="Website Design"
            des="The web isn't about moving images, but about images that move you. So it's surprising how many businesses get tricked into focusing solely on the technical side of digital marketing."
            icon={<AiFillAppstore />}
          />
          <Card
            title="E-commerce Websites"
            des="I am developing modern designs, A full-featured online store with product catalog, shopping cart, secure checkout, and admin dashboard."
            icon={<FaMobile />}
          />
          <Card
            title="E-book Platforms | Portfolio Websites"
            des="Custom platform for browsing, reading, and purchasing digital books with user authentication and payment integration."
            icon={<SiAntdesign />}
          />
           <Card
            title="SEO Optimisation"
            des="With a deep understanding of the latest algorithms and technologies, I provide top-notch services to help businesses and individuals increase their online visibility and improve their web presence."
            icon={<SiProgress />}
          />
          <Card
            title="Hosting Websites"
            des="With a deep understanding of the latest algorithms and technologies, I provide top-notch services to help businesses and individuals increase their online visibility and improve their web presence."
            icon={<FaGlobe />}
          />
        </div>

    </Container> 
     
    </div>
  );
};

export default Services;
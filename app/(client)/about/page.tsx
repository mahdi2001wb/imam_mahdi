import { hero1 } from "@/assets/image";
import Container from "@/components/Container";
import Image from "next/image";
import React from "react";

const BlogPage = () => {
  return (
    <Container className=" bg-white text-darkColor py-10 md:py-20">
      <div>
        <div className=" md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-contain md:w-48"
              src={hero1}
              alt="Profile picture"
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-darkOrange font-bold">
              Full Stack Developer
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-darkColor sm:text-4xl">
              Imam Mahdi
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-darkColor/80">
            MERN Stack Developer passionate about building scalable and efficient software solutions.
            </p>
          </div>
        </div>

        <div className="wrapper px-8 py-6">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-darkColor/80 mb-4">
          With over 2+ years of experience in web development, I specialize in building robust, scalable, and user-centric web applications using the MERN stack (MongoDB, Express.js, React, Node.js). My expertise covers the entire development lifecycle—from designing clean RESTful APIs and efficient back-end logic to crafting responsive, interactive front-end interfaces.
          
          </p>
          <p className="text-darkColor/80 mb-4">
          I am passionate about clean code, test-driven development, and writing maintainable, high-performance applications. Whether it&apos;s building an e-commerce system, an e-book platform, or automating workflows, I bring a problem-solving mindset and a keen eye for detail to every project.
          <br />
          Outside of work, I contribute to open-source projects and mentor junior developers, helping them grow and succeed in their careers. I believe in continuous learning and always stay updated with the latest trends in the JavaScript ecosystem.
          </p>
        </div>

        <div className="wrapper px-8 py-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "Next.js",
              "Expressjs",
              "MongoDB",
              "Git",
              "Google Firebase",
              "Tailwindcss",
              "Sanity.io",
              "HTML5",
              "CSS3",
              "VS Code",
              "Github",
              "UI Design",
              "Figma",
              "Canva",
              "Adobe Illustrator",
              "Website Design" ,
              "Vercel",
              "netlify",
              
            ].map((skill) => (
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
};

export default BlogPage;

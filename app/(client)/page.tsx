import Banner from "@/components/Banner";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";



export default function Home() {
  return (
    <div className="overflow-hidden">
      <Banner />
      <Experience />
      <Services />
      <Skills />
      <Projects />
    </div>
  );
}

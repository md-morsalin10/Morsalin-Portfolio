import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import { div } from "motion/react-client";
import About from "./components/About";
import Projects from "./components/Project";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import TechMarquee from "./components/TechMarquee";

export default function Home() {
  return (
    <div>
      <Hero />
      <TechMarquee/>
      <About/>
      <Experience/>
      <Services />
      <Projects/>
      <Contact/>
    </div>
  );
}

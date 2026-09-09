import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ProgramCards from "@/components/sections/ProgramCards";
import ProgramStacks from "@/components/sections/ProgramStacks";
import Battlefield from "@/components/sections/Battlefield";
import AboutAuthority from "@/components/sections/AboutAuthority";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProgramCards />
      <ProgramStacks />
      <Battlefield />
      <AboutAuthority />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

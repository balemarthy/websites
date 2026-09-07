import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ProgramCards from "@/components/sections/ProgramCards";
import ProgramsSupport from "@/components/sections/ProgramsSupport";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProgramCards />
      <ProgramsSupport />
    </main>
  );
}

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import FeatureGrid from "@/components/sections/FeatureGrid";
import Framework from "@/components/sections/Framework";
import Battlefield from "@/components/sections/Battlefield";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import WebinarCTA from "@/components/sections/WebinarCTA";
import ReframeBand from "@/components/sections/ReframeBand";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <FeatureGrid />
      <Framework />
      <Battlefield />
      <HowItWorks />
      <Testimonials />
      <WebinarCTA />
      <ReframeBand />
    </main>
  );
}

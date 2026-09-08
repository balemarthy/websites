import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ProgramCards from "@/components/sections/ProgramCards";
import ProgramStacks from "@/components/sections/ProgramStacks";
import Battlefield from "@/components/sections/Battlefield";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProgramCards />
      <ProgramStacks />
      <Battlefield />

      <section className="bg-esc-paper px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-esc-dark-teal sm:text-3xl">
            Treat your career like a one-person business.
          </p>
          <p className="mt-4 font-body text-sm text-esc-dark-teal/70 sm:text-base">
            Your resume is the static brochure. LinkedIn is the living resume. You are the
            product.
          </p>
        </div>
      </section>
    </main>
  );
}

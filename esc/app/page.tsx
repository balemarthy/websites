import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      {/* PROGRAMS SECTION — Design / Architecture. Build later, do not design now. */}
      <section id="programs-placeholder" style={{ minHeight: "40vh" }} />
    </main>
  );
}

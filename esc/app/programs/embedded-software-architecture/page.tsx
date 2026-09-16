import Link from "next/link";
import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";
import ScrollStatement from "@/components/sections/ScrollStatement";
import RoadmapList from "@/components/sections/RoadmapList";
import ForYouList from "@/components/sections/ForYouList";
import Callout from "@/components/sections/Callout";
import ProgramTestimonials from "@/components/sections/ProgramTestimonials";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const STATEMENTS = [
  "I shipped it. Could I defend every decision in it?",
  "Most of it was instinct. Not reasoning.",
  "A folder of files nobody can explain six months later.",
  "I did a project — mostly by copying and guessing.",
  "Real project experience isn't the same as real fundamentals.",
  "I know it works. I don't know why it's designed this way.",
];

// Workflow D — drawn verbatim from the programme's own "What's In It For
// You" opening paragraph. Don't paraphrase further.
const SCROLL_PHRASES = [
  "You shipped it. It works.",
  "Ask you why you built it that way, and the answer comes out thinner than you'd like.",
  "Most of it was instinct.",
  "Some of it was guesswork that happened to land.",
  "Could you defend every decision in it?",
];

const ROADMAP_STEPS = [
  {
    number: "S1",
    title: "Problem Definition & Object Model",
    description: "Break the system into responsibilities. Define entities and behaviours. No coding yet.",
  },
  {
    number: "S2",
    title: "CRC Cards & Event Modelling",
    description: "Map collaborations. Identify triggers and flows. Replace guesswork with design.",
  },
  {
    number: "S3",
    title: "Runtime Model & Module Catalog",
    description: "Decide super loop vs RTOS. Build the module catalog. Document for clarity and interviews.",
  },
  {
    number: "S4",
    title: "TDD & Interface Design",
    description: "Write tests first. Design expressive interfaces. Readability before implementation.",
  },
  {
    number: "S5",
    title: "Implementation & Design Review",
    description: "Build and ship. Defend every design decision. Walk away with a portfolio-ready artifact.",
  },
];

const FOR_YOU = [
  "You've built and shipped something real — even something small — and you know it could have been designed better.",
  "You're tired of decisions that were instinct rather than reasoning, and want a repeatable way to think it through.",
  "You want a portfolio project you can defend in an interview, not just show.",
  "You already have the fundamentals and you're ready for the layer above implementation.",
];

// TODO(vamsi): replace with real testimonials for this cohort — placeholder content only
const TESTIMONIALS = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real Architecture cohort quote once available.",
    nameRole: "Mentee Name 1 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real Architecture cohort quote once available.",
    nameRole: "Mentee Name 2 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real Architecture cohort quote once available.",
    nameRole: "Mentee Name 3 · Role, Company",
  },
];

function SectionHeading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-esc-teal">{eyebrow}</span>
      <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-3xl">
        {heading}
      </h2>
    </AnimatedItem>
  );
}

export default function EmbeddedSoftwareArchitecturePage() {
  // Note the natural cross-link in the Architecture page's first "not for
  // you" bullet ("the foundations programme comes first") — a real <Link>
  // to the Design page, not just text. The one place cross-program
  // reference belongs, since it's the source doc's own words.
  const notForYou = [
    "You haven't shipped anything yet. This lives above implementation — CRC cards and architecture tradeoffs need something real to apply to, not a tutorial you followed once.",
    <>
      You did a project, but mostly by copying and guessing. Real project experience and real
      fundamentals aren&apos;t always the same person. If you&apos;ve never sat with structured
      fundamentals at all,{" "}
      <Link href="/programs/embedded-software-design" className="underline underline-offset-2">
        the foundations programme
      </Link>{" "}
      comes first.
    </>,
    "You want better C syntax, not better design thinking. This is about the thinking that happens before and above the code.",
    "You want to collect frameworks passively. The shift happens through application — your own cards, your own catalog, your own decisions, defended out loud.",
    "You're hoping for a placement service. This builds design judgment, not job referrals.",
  ];

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero
        statements={STATEMENTS}
        backgroundImage="/images/hero/architecture-hero-bg.jpg"
        pageTitle="Embedded Software Architecture"
      />

      <ScrollStatement phrases={SCROLL_PHRASES} />

      {/* 3.1 — What's In It For You */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              You&apos;ve built something real — it works, it shipped, maybe it&apos;s even in
              production. But sit across from someone who asks why you structured it the way you did,
              and the answer comes out thinner than you&apos;d like. Most of it was instinct. Some of
              it was guesswork that happened to land.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              This programme is the layer almost nobody in this industry teaches at all: the thinking
              that has to happen before the code, and the discipline to defend it after.
              Class-responsibility-collaboration cards instead of guesswork. Event modelling instead of
              &ldquo;I think this triggers that.&rdquo; A module catalog instead of a folder of files
              nobody can explain six months later.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Fifteen days, fully engaged, and you don&apos;t just have a project. You have a project
              you can walk someone through, decision by decision — and a habit of thinking that
              doesn&apos;t switch off when the cohort ends. The habit is what actually takes the time
              to set; the project is just where it gets practiced first.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What We Don't Promise">
            Mastery, magic, or instant transformation in fifteen days. What we promise is a real habit
            of thinking, built through one real project — and a foundation you keep applying long after
            the cohort ends. Nobody becomes an expert in two weeks, and we will never imply otherwise.
          </Callout>
        </AnimatedSection>
      </section>

      {/* 3.2 — Format */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading
          eyebrow="Format"
          heading="Fifteen Days. Five Sessions. One Real Project."
        />
        <AnimatedSection className="mx-auto max-w-[640px]">
          <AnimatedItem>
            <p className="text-center font-body text-sm leading-relaxed text-esc-dark-teal sm:text-base">
              Live sessions, three days apart on purpose — enough time to sit with the material and
              experiment, not binge it. A dedicated group for the cohort, for continuous support
              between sessions. One real project, built from scratch, derived from a genuine use case —
              not a toy demo.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 3.3 — The Roadmap: Five Sessions, in Order */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading eyebrow="In Order" heading="The Roadmap: Five Sessions" />
        <RoadmapList steps={ROADMAP_STEPS} />
      </section>

      {/* 3.4 — Key Philosophy */}
      <section className="bg-esc-paper px-6 py-8 sm:px-10 lg:px-16">
        <AnimatedSection className="mx-auto max-w-[760px]">
          <Callout eyebrow="Key Philosophy">
            Design before coding. Continuous feedback through test-driven development. Apply this
            process to a real project at work and you become interview-ready — because you know the
            design behind the code, not just the code itself.
          </Callout>
        </AnimatedSection>
      </section>

      {/* 3.5 — Who This Is Not For / For You If */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <ForYouList notForYou={notForYou} forYou={FOR_YOU} />
      </section>

      {/* 3.6 — No guarantee callout */}
      <section className="bg-esc-paper px-6 py-8 sm:px-10 lg:px-16">
        <AnimatedSection className="mx-auto max-w-[760px]">
          <Callout>
            No job guarantee. Nobody honestly can promise one. What you get is the habit of designing
            before you build, and a project that proves it — plus a bonus track on resume, LinkedIn,
            and GitHub presence to help put it in front of the right people.
          </Callout>
        </AnimatedSection>
      </section>

      {/* 3.7 — Format / Price / CTA */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <AnimatedSection className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <p className="font-body text-base text-esc-dark-teal">
              10 hours, over 15 days. 5 sessions, 2 hours each, every 3rd day, evenings.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <span className="font-display text-4xl font-extrabold text-esc-dark-teal">₹8,999</span>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              variant="primary"
              href="/apply/embedded-software-architecture"
              className="mt-2"
              style={{ boxShadow: "0 0 20px 4px rgba(240,120,57,.3), 0 4px 12px rgba(240,120,57,.3)" }}
            >
              Start with Architecture
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 3.8 — Testimonials */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <ProgramTestimonials testimonials={TESTIMONIALS} />
      </section>

      <Footer />
    </main>
  );
}

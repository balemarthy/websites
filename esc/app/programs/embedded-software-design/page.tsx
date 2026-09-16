import { CircuitBoard, Layers, Cpu, GitBranch, Radio, MonitorSmartphone } from "lucide-react";
import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";
import ScrollStatement from "@/components/sections/ScrollStatement";
import StageDiagram from "@/components/sections/StageDiagram";
import RoadmapList from "@/components/sections/RoadmapList";
import ForYouList from "@/components/sections/ForYouList";
import Callout from "@/components/sections/Callout";
import ProgramTestimonials from "@/components/sections/ProgramTestimonials";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const STATEMENTS = [
  "I can make it work. I just can't explain why.",
  "A tutorial said configure this register. So I did.",
  "It works — until someone asks me to change it.",
  "Am I actually good at this?",
  "Is embedded even the right field for me?",
  "Years of experience. Still not fluent.",
];

// Workflow D — drawn verbatim from the programme's own "What's In It For
// You" opening paragraph. Don't paraphrase further.
const SCROLL_PHRASES = [
  "You can make it work.",
  "That's not the same as knowing why it's built that way.",
  "A register gets configured because a tutorial said so.",
  "A startup sequence runs because it was copied from a reference project.",
  "It works — until someone asks you to change it.",
  "This is where you learn why it works.",
];

const HARDWARE_STAGES = [
  {
    marker: "1",
    icon: CircuitBoard,
    label: "Discrete",
    description: "Resistors, capacitors, transistors — every function a separate, visible part.",
  },
  {
    marker: "2",
    icon: Layers,
    label: "Integrated Circuits",
    description: "Adders, counters, timer ICs. Logic becomes reusable.",
  },
  {
    marker: "3",
    icon: Cpu,
    label: "System on Chip",
    description: "Everything once external now lives inside one chip.",
  },
];

const SOFTWARE_STAGES = [
  {
    marker: "C1",
    icon: Cpu,
    label: "Chip",
    description: "Pins, clocks, timers, watchdog safety.",
  },
  {
    marker: "C2",
    icon: GitBranch,
    label: "Core",
    description: "Deterministic logic, states, error handling.",
  },
  {
    marker: "C3",
    icon: Radio,
    label: "Connectivity",
    description: "Lightweight telemetry and logging.",
  },
  {
    marker: "C4",
    icon: MonitorSmartphone,
    label: "Customer-facing",
    description: "Buttons, display, the human interface.",
  },
];

const ROADMAP_STEPS = [
  {
    number: "1",
    title: "Starting Point",
    description:
      "What makes a system “embedded.” Writing and structuring your first real program on real hardware.",
  },
  {
    number: "2",
    title: "Build & Debug Toolchain",
    description:
      "How source code becomes a running image on a chip — and how to inspect it when it doesn't behave.",
  },
  {
    number: "3",
    title: "Hardware & Memory",
    description: "Reading a datasheet properly. Testing and validating memory. Working with flash the right way.",
  },
  {
    number: "4",
    title: "Peripherals & Device Drivers",
    description: "Control and status registers. The device driver philosophy — then writing a real one.",
  },
  {
    number: "5",
    title: "Operating Systems",
    description:
      "Why operating systems exist. A real embedded OS, its real-time characteristics, and how to choose one.",
  },
  {
    number: "6",
    title: "Integration & Optimization",
    description: "Putting a complete application together — then optimizing it for size, speed, and memory.",
  },
];

const NOT_FOR_YOU = [
  "You want interview answers by Tuesday. This rebuilds real understanding — if you have an interview next week, you need hacks, not this.",
  "You expect to be walked through every step. You learn by doing the work yourself. Nobody builds it for you.",
  "You won't read — real books, real source code, real documentation. If you want every concept delivered as a ten-minute video summary, this resists the method that makes it work.",
  "You're looking for a placement service. This builds fluency, not job referrals.",
  "You get defensive instead of curious when shown a gap. If “years of experience isn't the same as fluency” feels like an attack rather than a relief, this isn't the right room yet.",
  "You're a hobbyist with no professional stakes. Nothing wrong with tinkering for fun — it's a different pace and a different reason to push through the hard parts.",
  "You want the certificate more than the skill.",
];

const FOR_YOU = [
  "You can make embedded code work, but go quiet when asked to explain why it was built that way.",
  "You've felt a design review or interview question go deeper than you could answer.",
  "You're willing to read real source code and sit with material that doesn't resolve in ten minutes.",
  "You want to understand the hardware and software well enough to teach someone else, not just pass a test on it.",
];

// TODO(vamsi): replace with real testimonials for this cohort — placeholder content only
const TESTIMONIALS = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real Design cohort quote once available.",
    nameRole: "Mentee Name 1 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real Design cohort quote once available.",
    nameRole: "Mentee Name 2 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real Design cohort quote once available.",
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

export default function EmbeddedSoftwareDesignPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero statements={STATEMENTS} />

      <ScrollStatement phrases={SCROLL_PHRASES} />

      {/* 2.1 — What's In It For You */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              You&apos;ve spent time writing embedded code, and somewhere along the way you noticed the
              gap: you can make things work, but you can&apos;t always say why they&apos;re built the
              way they are. A register gets configured because a tutorial said so. A startup sequence
              runs because it was copied from a reference project. It works — until someone asks you to
              change it, or explain it, and the confidence disappears.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              This programme closes that gap. Not by teaching you more syntax. By teaching you the
              reasoning underneath the code: what belongs in hardware and what belongs in software, why
              a startup sequence exists at all, how a real-time operating system actually makes
              decisions, and how to read a datasheet like an engineer instead of guessing your way
              through it.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Put in real, consistent time across this, and you stop assembling code that happens to
              work, and start designing systems you can explain line by line. Not instantly — the same
              way every real skill is actually built.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What We Don't Promise">
            Mastery, magic, or a fixed number of days. What we promise is this — put in real,
            consistent time across two to three months, and it works. What you learn are enablers, not
            an endpoint. Nobody becomes an expert in a day, and we will never imply otherwise.
          </Callout>
        </AnimatedSection>
      </section>

      {/* 2.2 — Before We Begin: Hardware */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading eyebrow="Before We Begin" heading="Hardware" />
        <StageDiagram
          stages={HARDWARE_STAGES}
          intro="This isn't a module you'll sit through. It's the lens we use throughout — the context that makes every register and peripheral make sense the moment it shows up, instead of feeling like an arbitrary line in a datasheet."
          closing="Once that progression is visible, nothing about the hardware feels like a black box."
        />
      </section>

      {/* 2.3 — Before We Begin: Software */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading eyebrow="Before We Begin" heading="Software" />
        <StageDiagram
          stages={SOFTWARE_STAGES}
          intro="Same idea, the software side. Not a module — a habit. Before a single line gets written, four questions get asked about the system in front of you, every time, until asking them stops being a step and becomes how you think."
          closing="Demonstrated on a real system — a sugarcane vending machine, mapped block by block — so it's never abstract."
        />
      </section>

      {/* 2.4 — The Path, Start to Finish */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading eyebrow="Start to Finish" heading="The Path" />
        <AnimatedSection className="mx-auto mb-10 max-w-[640px]">
          <AnimatedItem>
            <p className="text-center font-body text-sm leading-relaxed text-esc-dark-teal sm:text-base">
              Structured the way the discipline itself is structured — consolidated from the canon
              engineers have used for decades to actually learn this properly, not a syllabus invented
              for a cohort.
            </p>
          </AnimatedItem>
        </AnimatedSection>
        <RoadmapList steps={ROADMAP_STEPS} />
      </section>

      {/* 2.5 — Hardware note */}
      <section className="bg-esc-paper px-6 py-8 sm:px-10 lg:px-16">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <AnimatedItem>
            <p className="text-center font-body text-sm italic leading-relaxed text-esc-teal">
              Popular, widely available ARM-based microcontroller boards — chosen so you&apos;re never
              stuck waiting on hardware or hunting for a part nobody stocks.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 2.6 — Who This Is Not For / For You If */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <ForYouList notForYou={NOT_FOR_YOU} forYou={FOR_YOU} />
      </section>

      {/* 2.7 — What You Walk Away With */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading eyebrow="After This Programme" heading="What You Walk Away With" />
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem>
            <p className="text-center font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              The ability to open an unfamiliar embedded codebase and orient yourself immediately —
              what the hardware is doing, what the software structure is doing, what the operating
              system underneath is actually managing. Not a certificate. A way of seeing the system
              that doesn&apos;t go away.
            </p>
          </AnimatedItem>
          <Callout>
            No job guarantee. Nobody honestly can promise one. What you get is fluency — and a bonus
            track on resume, LinkedIn, and GitHub presence to help put it in front of the right people
            once you have it.
          </Callout>
        </AnimatedSection>
      </section>

      {/* 2.8 — Format / Price / CTA */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <AnimatedSection className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <p className="font-body text-base text-esc-dark-teal">
              32 hours, over two months. Saturday and Sunday mornings, 2 hours each session.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <span className="font-display text-4xl font-extrabold text-esc-dark-teal">₹14,999</span>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              variant="primary"
              href="/apply/embedded-software-design"
              className="mt-2"
              style={{ boxShadow: "0 0 20px 4px rgba(240,120,57,.3), 0 4px 12px rgba(240,120,57,.3)" }}
            >
              Start with Design
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 2.9 — Testimonials */}
      <section className="bg-esc-paper px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <ProgramTestimonials testimonials={TESTIMONIALS} />
      </section>

      <Footer />
    </main>
  );
}

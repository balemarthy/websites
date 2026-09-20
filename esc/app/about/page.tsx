import Footer from "@/components/layout/Footer";
import ScrollStatement from "@/components/sections/ScrollStatement";
import Callout from "@/components/sections/Callout";
import RoadmapList from "@/components/sections/RoadmapList";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Workflow D — the page's one reframe, built from Vamsi's own confirmed
// facts only (20+ years, four named companies) and his existing coaching
// philosophy line ("your career is a one-person business") — not invented.
const SCROLL_PHRASES = [
  "Twenty-plus years in embedded systems.",
  "Four companies. Wipro. Bosch. Cisco. Dell.",
  "Every one of them taught the same lesson, differently.",
  "A company manages its own risk first. That's not a flaw — it's the job.",
  "Your career was never their job. It was always yours.",
  "Your career is a one-person business.",
];

const CAREER_STEPS = [
  {
    number: "01",
    title: "Wipro",
    description:
      "A real product, a counterpart in the US on the other end of every review, and C++ that had to actually hold up under someone else's eyes. That's where UML and class design stopped being theory from a textbook and started being how software actually gets designed.",
  },
  {
    number: "02",
    title: "Bosch",
    description:
      "A parent board talking to a daughter board wired with sensors — one of them driving a vacuum pump, on a device built to repair a car's AC system. That's where 'embedded software' stopped meaning register-level C and started meaning the layer above it: abstraction, the OS, Linux on a custom board.",
  },
  {
    number: "03",
    title: "Cisco",
    description:
      "Chosen on purpose, for the domain — not just the paycheck. Data center, enterprise networking, a custom-built OS giving way to Linux. The most technical years of the run. Also the years that taught the hardest lesson: technical skill alone doesn't move a career forward. Nobody tells you that. You find out.",
  },
  {
    number: "04",
    title: "Dell",
    description:
      "Had a clear path back to Cisco. Turned it down for this instead — on purpose, to get closer to the hardware after years of living at the abstraction layer. The company where 'I understand the whole stack' stopped being a claim and started being something I could actually back up.",
  },
  {
    number: "05",
    title: "Embedded System Coach",
    description:
      "Two stints at Wipro bookended the run — the second one as an architect, mentoring engineers straight out of NITs and regional colleges. Turned out the coaching had already started before it had a name. Built from the one thing all four employers confirmed: nobody was ever coming to manage the career itself. So now that's the job.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      {/* Flat typographic header — no 3D hero here; About isn't a product page.
          Per styles/tokens.css governance, this is FLAT mode, same as the
          homepage's About-Me line. */}
      <section className="bg-esc-paper px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-esc-teal">
              About
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-4xl lg:text-5xl">
              I spent 20+ years inside the system I now coach you to outgrow.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Embedded System Coach exists because of what those twenty years actually taught —
              not a theory borrowed from somewhere else.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <ScrollStatement phrases={SCROLL_PHRASES} />

      {/* The career timeline */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-esc-teal">
            Start To Now
          </span>
          <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-3xl">
            The Path Here
          </h2>
        </AnimatedItem>
        <RoadmapList steps={CAREER_STEPS} />
      </section>

      {/* Why ESC exists, in his own framing */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Before any of the four companies on this page, there were two years writing 8051
              code for pay that wasn&apos;t worth mentioning. I didn&apos;t set out to become an
              embedded engineer — I don&apos;t think I even knew that was a job. I just wanted to
              understand why a microcontroller did what it did, and I struggled with 8085 assembly
              long enough that it stopped feeling like study and started feeling like a game. Those
              two years weren&apos;t wasted. They were the foundation everything after was built on.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              I spent the Bosch and Cisco years the way most engineers do — banking everything on
              technical skill, assuming the career would follow. It doesn&apos;t. That&apos;s not a
              theory I read somewhere; it&apos;s the lesson those years actually taught me, the hard
              way: technical skill alone doesn&apos;t give you progression or visibility.
              Communication does. Nobody told me that going in. I&apos;m telling you now.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              There was an 8-month stretch at a startup where hardware and software both sat on my
              desk, full ownership, no one else to hand it to. And a second run at Wipro, this time
              as an architect, mentoring engineers straight out of NITs and regional colleges —
              before I ever called it coaching. Add it all up and I&apos;ve now touched every layer
              of the stack: low-level drivers, the OS, the GUI, the domain logic, the libraries
              underneath all of it. When someone asks where security or encryption actually belongs
              in a system, I&apos;m not guessing at the layer — I&apos;ve worked at all of them.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What I Actually Believe">
            Your career is a one-person business. Not a slogan — a lesson Bosch and Cisco taught me
            the hard way, when I found out technical skill alone doesn&apos;t move you forward.
            Nobody at any of the four companies I worked for was ever going to manage my career for
            me. Once that was clear, everything else — the programs, the weekend
            sessions, the content — followed from it.
          </Callout>
        </AnimatedSection>
      </section>

      {/* CTA — booking. Stubbed until Topmate→GHL wiring exists, same
          convention as ApplyForm.tsx: a real button, no live destination yet.
          TODO(vamsi): drop in your live Topmate link here, or the GHL booking
          URL once that flow is built — tracked in BACKEND-TODO.md. */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <p className="font-body text-base text-esc-dark-teal">
              If a program on this site looks right, or you&apos;re not sure which one is, talk to me
              directly.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <Button variant="primary" href="#">
              Book Time With Me →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}

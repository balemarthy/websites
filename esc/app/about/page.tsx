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
    description: "Where the embedded systems work started.",
  },
  {
    number: "02",
    title: "Bosch",
    description: "One stop in a run across four companies, over twenty years, in embedded systems.",
  },
  {
    number: "03",
    title: "Cisco",
    description: "Same discipline, a different system to learn from the inside.",
  },
  {
    number: "04",
    title: "Dell",
    description: "Two decades in, the pattern was clear before the exit was.",
  },
  {
    number: "05",
    title: "Embedded System Coach",
    description:
      "Built from the one thing all four jobs confirmed: nobody was ever coming to manage the career itself. So now that's the job.",
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
              I don&apos;t coach from a certification or a course I once took. I coach from having
              actually been the engineer on the other side of the register, the datasheet, and the
              performance review — four times over, at four different companies, across twenty years.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              I run Embedded System Coach as a one-person media house — every program, every session,
              every piece of content comes from the same place: what actually worked, tested on real
              hardware, not repackaged theory. I call myself the Chief Human Officer of it, because
              that&apos;s the job — nobody else is hiring for it.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What I Actually Believe">
            Your career is a one-person business. Not a slogan — the operating premise behind every
            program on this site. Nobody at any of the four companies I worked for was ever going to
            manage my career for me. Once that was clear, everything else — the programs, the weekend
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

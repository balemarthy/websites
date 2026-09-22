import { Lightbulb, FileCheck, Award } from "lucide-react";
import ReframeBand from "@/components/sections/ReframeBand";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Separate from /industry-consulting (companies, purely technical) per Vamsi's
// explicit correction — this page is career-visibility content aimed at
// institutions, not the technical campus-talk format.
const FEATURES = [
  {
    Icon: Lightbulb,
    eyebrow: "Why Skill Alone Doesn't Get You Hired",
    title: "The Lesson, Before The Slow Way",
    desc: "The same lesson Vamsi learned the hard way across Wipro, Bosch, and Cisco, told to students before they learn it the slow way.",
  },
  {
    Icon: FileCheck,
    eyebrow: "Resume And Profile, Before The First Application",
    title: "Practical, Not Theoretical",
    desc: "Positioning work done before the first application goes out, not after the rejections start.",
  },
  {
    Icon: Award,
    eyebrow: "A Track Record, Delivered Live",
    title: "“From Bytes To Sockets”",
    desc: "A hands-on protocol-engineering session for 7th-semester ECE students at Jyothy Institute of Technology, IEEE JIT/SPS chapter, Aug 2026.",
  },
];

export default function CampusToCareerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              For Institutions
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl lg:text-5xl">
              The degree ends. The invisibility starts there.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              Final-year students graduate technically ready and professionally unseen. A session
              on career visibility, before that gap costs them their first year of job search, not
              after.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <Button href="#" variant="primary">
              Request a Session →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
            What The Session Covers
          </span>
          <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-3xl">
            Not Syllabus. Signal.
          </h2>
        </AnimatedItem>
        <AnimatedSection className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-3">
          {FEATURES.map(({ Icon, eyebrow, title, desc }) => (
            <AnimatedItem
              key={eyebrow}
              className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow-[0_4px_16px_rgba(10,31,68,0.11)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-bve-accent/10 text-bve-ink">
                <Icon size={24} strokeWidth={2} aria-hidden />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wide text-bve-accent-600">
                {eyebrow}
              </span>
              <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink">
                {title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-bve-ink-body/80">{desc}</p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
        <p className="mx-auto mt-8 max-w-[760px] text-center font-body text-xs leading-relaxed text-bve-ink-body/60">
          The JIT session was a purely technical talk (protocol engineering, Wireshark, sockets) —
          not a career-visibility session. It&apos;s used here only as proof Vamsi does campus
          engagements at all, not as an example of this specific offer.
        </p>
      </section>

      <ReframeBand
        statement="NOT ANOTHER GUEST LECTURE. A HEAD START."
        variant="navy"
        cta={{ label: "Request a Session", href: "#" }}
      />
    </main>
  );
}

import { Check } from "lucide-react";
import ReframeBand from "@/components/sections/ReframeBand";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { BOOK_CALL_CONSULTING } from "@/lib/links";
import forYouListStyles from "@/components/sections/ForYouList.module.css";

const WAYS_I_WORK = [
  {
    title: "Solve a software problem",
    desc: "A bug that keeps coming back, a codebase nobody wants to touch, a driver that has to move from bare metal to an RTOS or Linux. I get into the code and fix it.",
  },
  {
    title: "Build the embedded project",
    desc: "From requirements to working firmware on your hardware: bare metal, RTOS, Linux drivers, BLE and networking. You get the project delivered, not a slide deck.",
  },
];

const WHAT_YOU_CAN_COUNT_ON: { title: string; desc: string }[] = [
  {
    title: "The person on the call does the work.",
    desc: "No hand-off to a junior team you've never met.",
  },
  {
    title: "Your team understands what was built.",
    desc: "When I leave, the knowledge stays.",
  },
  {
    title: "Clear scope before anything starts.",
    desc: "You know what you're getting before you commit.",
  },
];

function SectionHeading({ heading }: { heading: string }) {
  return (
    <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
      <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-3xl">
        {heading}
      </h2>
    </AnimatedItem>
  );
}

export default function IndustryConsultingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      {/* 1. Hero */}
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              For Product Companies
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl lg:text-5xl">
              Embedded project stuck? Let&apos;s get it moving.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              Firmware that won&apos;t stabilise. A port to a new platform nobody on the team has
              done before. A product that needs embedded work your team has no bandwidth for.
              Tell me the problem on a call. If I can solve it, I&apos;ll tell you how.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <Button href={BOOK_CALL_CONSULTING} variant="primary">
              Book a Call →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 2. What I take on */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading heading="Two ways I work with teams." />
        <AnimatedSection className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-2">
          {WAYS_I_WORK.map((card) => (
            <AnimatedItem
              key={card.title}
              className="flex flex-col gap-3 rounded-lg bg-white p-8 shadow-[0_4px_16px_rgba(10,31,68,0.11)]"
            >
              <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink">
                {card.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-bve-ink-body/80">
                {card.desc}
              </p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </section>

      {/* 3. How I work */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[560px]">
          <AnimatedItem className={forYouListStyles.forYouCol}>
            <span
              className={`font-display ${forYouListStyles.heading} ${forYouListStyles.forYouHeading}`}
            >
              What you can count on.
            </span>
            <ul className={forYouListStyles.list}>
              {WHAT_YOU_CAN_COUNT_ON.map((item) => (
                <li key={item.title} className={forYouListStyles.forYouItem}>
                  <Check
                    aria-hidden
                    size={18}
                    strokeWidth={2}
                    className={forYouListStyles.forYouIcon}
                  />
                  <span className={`font-body ${forYouListStyles.itemText}`}>
                    <strong>{item.title}</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 4. Background */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <AnimatedItem>
            <p className="text-center font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              Twenty-plus years building embedded systems at Wipro, Bosch, Cisco and Dell: drivers,
              protocol stacks, and products that shipped.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 5. Closing reframe + CTA */}
      <ReframeBand
        statement="NOT A VENDOR. AN ENGINEER ON YOUR SIDE."
        variant="navy"
        cta={{ label: "Book a 30-Minute Call", href: BOOK_CALL_CONSULTING }}
      />
    </main>
  );
}

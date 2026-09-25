import Link from "next/link";
import { X } from "lucide-react";
import ReframeBand from "@/components/sections/ReframeBand";
import RoadmapList from "@/components/sections/RoadmapList";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { BOOK_CALL_CLARITY } from "@/lib/links";
import forYouListStyles from "@/components/sections/ForYouList.module.css";

const PROBLEM_CARDS = [
  {
    title: "Career Fluency",
    subhead: "When the market doesn’t answer.",
    items: [
      "You apply, and nothing comes back. Not a no. Nothing.",
      "Your resume reads like a job description of your last role.",
      "“What’s the most challenging problem you’ve solved?” and you’re not sure your problems count.",
    ],
  },
  {
    title: "Technical Branding",
    subhead: "When your own company doesn’t see you.",
    items: [
      "You deliver, and someone else gets tagged for it.",
      "You asked for visibility and were told to “talk to your manager.”",
      "Promotion came back “not ready yet,” with nothing concrete behind it.",
    ],
  },
];

const WHY_FIXES_DONT_WORK = [
  {
    title: "Asking your manager.",
    desc: "Your manager is managing their own visibility. Yours is a line item, at best.",
  },
  {
    title: "Rewriting the resume, again.",
    desc: "Ten experts, ten different opinions, and the same result. Rewording doesn’t fix a resume that was never positioned in the first place.",
  },
  {
    title: "“Just post more on LinkedIn.”",
    desc: "You’ve seen that feed. You don’t want to become that person, and you don’t have to.",
  },
];

const CAREER_FLUENCY_STEPS = [
  {
    number: "1",
    title: "Value Proposition.",
    description: "What you actually solve, said in one line a hiring manager can repeat.",
  },
  {
    number: "2",
    title: "Content Bank.",
    description:
      "Every project, fix and decision worth mentioning, pulled out of your head and written down.",
  },
  {
    number: "3",
    title: "Experience Bullets.",
    description: "Each role rewritten as proof, not duties.",
  },
  {
    number: "4",
    title: "Career Summary.",
    description: "The top of the resume that makes someone keep reading.",
  },
];

const TECHNICAL_BRANDING_LEVELS = [
  {
    number: "1",
    title: "Your own record.",
    description:
      "A running log of what you built, fixed and decided. Nobody sees it but you. Everything else is built from it.",
  },
  {
    number: "2",
    title: "Inside the company.",
    description:
      "Design notes, demos, a written post-mortem. The people who decide promotions start seeing your thinking, not just your tickets.",
  },
  {
    number: "3",
    title: "One outside channel.",
    description:
      "A talk, a technical write-up, or LinkedIn. One, chosen to fit you, at a pace you’ll actually keep.",
  },
];

const NOT_RIGHT_FIT = [
  <>
    You&apos;re a student or in your first job.{" "}
    <Link href="/campus-to-career" className="underline underline-offset-2">
      Campus to Career →
    </Link>
  </>,
  <>
    You only need your resume fixed.{" "}
    <Link href="/resume-review" className="underline underline-offset-2">
      Resume Review →
    </Link>
  </>,
  <>
    You only need your LinkedIn profile fixed.{" "}
    <Link href="/linkedin-profile" className="underline underline-offset-2">
      LinkedIn Profile →
    </Link>
  </>,
];

function SectionHeading({ eyebrow, heading }: { eyebrow?: string; heading: string }) {
  return (
    <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-3xl">
        {heading}
      </h2>
    </AnimatedItem>
  );
}

export default function ClarityVisibilityPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      {/* 1. Hero */}
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              Career Fluency · Technical Branding
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl lg:text-5xl">
              Your skill isn&apos;t the gap. Nobody can see it.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              Fifteen years in and zero callbacks. Feedback that asks for &ldquo;evidence&rdquo;
              of work you&apos;ve already done. A promotion that went to someone who talked about
              their work more than they did it. Different symptoms, same problem: what
              you&apos;re good at isn&apos;t written down anywhere the right people look.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <Button href={BOOK_CALL_CLARITY} variant="primary">
              Book a Call →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 2. Two problems, side by side */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading eyebrow="Which One Is Yours?" heading="Two problems. Often the same person." />
        <AnimatedSection className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-2">
          {PROBLEM_CARDS.map((card) => (
            <AnimatedItem
              key={card.title}
              className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow-[0_4px_16px_rgba(10,31,68,0.11)]"
            >
              <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink">
                {card.title}
              </h3>
              <p className="font-body text-sm italic leading-relaxed text-bve-ink-body/70">
                {card.subhead}
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-bve-accent">
                {card.items.map((item, i) => (
                  <li key={i} className="font-body text-sm leading-relaxed text-bve-ink-body/90">
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </section>

      {/* 3. Why the usual fixes don't work */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading heading="You’ve probably tried these already." />
        <AnimatedSection className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-3">
          {WHY_FIXES_DONT_WORK.map((block) => (
            <AnimatedItem
              key={block.title}
              className="flex flex-col gap-2 rounded-lg bg-white p-8 shadow-[0_4px_16px_rgba(10,31,68,0.11)]"
            >
              <h3 className="font-display text-lg font-extrabold text-bve-ink">{block.title}</h3>
              <p className="font-body text-sm leading-relaxed text-bve-ink-body/80">
                {block.desc}
              </p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </section>

      {/* 4. How it works: Career Fluency */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading heading="Career Fluency: four worksheets, in order." />
        <RoadmapList steps={CAREER_FLUENCY_STEPS} />
      </section>

      {/* 5. How it works: Technical Branding */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading heading="Technical Branding: private first, public last." />
        <RoadmapList steps={TECHNICAL_BRANDING_LEVELS} />
        <AnimatedItem>
          <p className="mx-auto mt-8 max-w-[640px] text-center font-body text-sm leading-relaxed text-bve-ink-body/70">
            Nobody here is asking you to become a creator.
          </p>
        </AnimatedItem>
      </section>

      {/* 6. Arjun and Priya */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[900px] flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <AnimatedItem>
              <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
                <strong className="text-bve-ink">Arjun</strong>, ten-plus years in, sent out
                applications for months and heard nothing back. That&apos;s Career Fluency.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
                <strong className="text-bve-ink">Priya</strong>, seven-plus years in, watched her
                work get presented by other people. That&apos;s Technical Branding.
              </p>
            </AnimatedItem>
          </div>
          <AnimatedItem>
            <p className="text-center font-body text-sm leading-relaxed text-bve-ink-body/70">
              Most engineers are both, at different points in the same career.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 7. Who this isn't for */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[560px]">
          <AnimatedItem className={forYouListStyles.notForYouCol}>
            <span
              className={`font-display ${forYouListStyles.heading} ${forYouListStyles.notForYouHeading}`}
            >
              Not the right fit if…
            </span>
            <ul className={forYouListStyles.list}>
              {NOT_RIGHT_FIT.map((item, i) => (
                <li key={i} className={forYouListStyles.notForYouItem}>
                  <X
                    aria-hidden
                    size={18}
                    strokeWidth={2}
                    className={forYouListStyles.notForYouIcon}
                  />
                  <span className={`font-body ${forYouListStyles.itemText}`}>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* 8. Closing reframe + CTA */}
      <ReframeBand
        statement="NOT MORE NOISE. A RECORD PEOPLE CAN READ."
        variant="amber"
        cta={{ label: "Book a Call with Vamsi", href: BOOK_CALL_CLARITY }}
      />
    </main>
  );
}

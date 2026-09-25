import { FileSearch, MessageSquare, Layers } from "lucide-react";
import Testimonials from "@/components/sections/Testimonials";
import ReframeBand from "@/components/sections/ReframeBand";
import Callout from "@/components/sections/Callout";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Flat typographic header, not the homepage's 3-state scroll Hero — that
// component is hardcoded to the homepage's career/branding/consulting
// states and takes no props (same finding as ESC's own subpages, which use
// this exact flat-header pattern instead of ESC's 3D hero for non-offer
// pages). See claude/bve-dnm-build-approach.md.
const FEATURES = [
  {
    Icon: FileSearch,
    eyebrow: "Free Audit",
    title: "Six-Section Scorecard",
    desc: "A Red/Yellow/Green scorecard. Diagnosis only — you see exactly where positioning breaks down before spending anything.",
  },
  {
    Icon: MessageSquare,
    eyebrow: "Strategy Session",
    title: "Rebuild, Not Rewrite",
    desc: "Once the audit names the gap, a paid 1:1 session rebuilds the positioning around it, not just the wording.",
  },
  {
    Icon: Layers,
    eyebrow: "Any Domain, Any Stage",
    title: "No Positioning Is Never Fine",
    desc: "This isn't embedded-only or senior-only. Broad positioning is fine early in a career. No positioning at all is never fine, whatever stage you're at.",
  },
];

const STRATEGY_SESSION_URL = "https://topmate.io/balemarthy_vamsi/1668087";

const SCORECARD_CHECKS = [
  {
    title: "Format & ATS Parseability.",
    desc: "Can a parser read it at all?",
  },
  {
    title: "Positioning & Career-Stage Fit.",
    desc: "Does it say who you are and what you want next, at the right breadth for your seniority?",
  },
  {
    title: "Target-Role Alignment.",
    desc: "Does the vocabulary match the roles you're actually going after?",
  },
  {
    title: "Bullet Discipline.",
    desc: "Is each bullet a result, or just a duty?",
  },
  {
    title: "Technical Depth & Ownership.",
    desc: "Is there proof behind the keywords?",
  },
  {
    title: "Career Summary.",
    desc: "Does the top make the case in six seconds?",
  },
];

export default function ResumeReviewPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              Resume Clarity
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl lg:text-5xl">
              It&apos;s not your experience that&apos;s thin. It&apos;s your positioning.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              You&apos;ve shipped real work for years. Your resume still reads like a job
              description. That gap is the only thing standing between your experience and the
              interview.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm leading-relaxed text-bve-ink-body/70">
              This is the same clarity gap Arjun — ten-plus years in, technically excellent,
              professionally invisible — kept hitting every time he updated his resume.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            {/* TODO(vamsi): wire to the real Resume Review booking/payment destination — no URL provided yet */}
            <Button href="#" variant="primary">
              Get Your Free Resume Audit →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
            What You Get
          </span>
          <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-3xl">
            Two Steps, Not One Sales Call
          </h2>
        </AnimatedItem>
        <AnimatedSection className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-3">
          {FEATURES.map(({ Icon, eyebrow, title, desc }) => (
            <AnimatedItem
              key={title}
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
      </section>

      {/* What the Scorecard actually checks */}
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedItem className="mb-4 flex flex-col items-center gap-3 text-center">
          <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-3xl">
            What the Scorecard actually checks
          </h2>
        </AnimatedItem>
        <AnimatedItem>
          <p className="mx-auto mb-10 max-w-[640px] text-center font-body text-sm leading-relaxed text-bve-ink-body/80 sm:text-base">
            Six sections, each marked Red, Yellow or Green. You see exactly what&apos;s working
            and what isn&apos;t, before anyone rewrites a word.
          </p>
        </AnimatedItem>
        <AnimatedSection className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SCORECARD_CHECKS.map((item) => (
            <AnimatedItem
              key={item.title}
              className="flex flex-col gap-2 rounded-lg bg-white p-8 shadow-[0_4px_16px_rgba(10,31,68,0.11)]"
            >
              <h3 className="font-display text-lg font-extrabold text-bve-ink">{item.title}</h3>
              <p className="font-body text-sm leading-relaxed text-bve-ink-body/80">{item.desc}</p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
        <AnimatedSection className="mx-auto mt-10 max-w-[560px]">
          <Callout eyebrow="Example verdict (illustrative, not a real client)">
            Bullet: <em>“Responsible for firmware development of the BMS module.”</em>{" "}
            <strong>Bullet Discipline: Red.</strong> It says what the job was, not what you did.
            No result, no decision, no scale.
          </Callout>
        </AnimatedSection>
      </section>

      <Testimonials />

      <ReframeBand
        statement="NOT A BETTER RESUME. A CLEARER ONE."
        variant="amber"
        cta={{ label: "Book a Strategy Session", href: STRATEGY_SESSION_URL }}
      />
    </main>
  );
}

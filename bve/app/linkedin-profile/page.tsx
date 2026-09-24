import { Search, Users, Layers } from "lucide-react";
import Testimonials from "@/components/sections/Testimonials";
import ReframeBand from "@/components/sections/ReframeBand";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Same anatomy as /resume-review by design — the two pages are meant to
// read as siblings. Flat typographic header, not the homepage Hero (see
// that page's comment for why).
const FEATURES = [
  {
    Icon: Search,
    eyebrow: "Profile Audit",
    title: "Found And Read, Not Just Filled In",
    desc: "Evaluated against what makes a profile actually get found and read, not a grammar pass.",
  },
  {
    Icon: Users,
    eyebrow: "1:1 Strategy Session",
    title: "Built Together, Live",
    desc: "Headline, About section, and a posting rhythm you'll actually keep, built together, live.",
  },
  {
    Icon: Layers,
    eyebrow: "Any Domain, Any Stage",
    title: "Same Rule As Resume Review",
    desc: "Open to any technical background, any career stage.",
  },
];

const PROFILE_SESSION_URL = "https://topmate.io/balemarthy_vamsi/1715793";

export default function LinkedInProfilePage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              Professional Visibility
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl lg:text-5xl">
              A complete profile still says nothing if no one ever sees it move.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              You filled in every section years ago. You haven&apos;t posted, commented, or shown
              up since. A finished profile and a visible one are not the same thing.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm leading-relaxed text-bve-ink-body/70">
              This is Priya&apos;s exact pattern — seven-plus years in, waiting to be noticed by
              people who have no way of finding her.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <Button href={PROFILE_SESSION_URL} variant="primary">
              Book a Profile Session →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
            What Gets Fixed
          </span>
          <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-3xl">
            Not A Rewrite. A Repositioning.
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

      <Testimonials />

      <ReframeBand
        statement="NOT A BETTER PROFILE. A LOUDER ONE."
        variant="navy"
        cta={{ label: "Book a Profile Session", href: PROFILE_SESSION_URL }}
      />
    </main>
  );
}

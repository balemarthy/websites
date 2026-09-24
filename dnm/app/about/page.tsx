import Framework from "@/components/sections/Framework";
import ReframeBand from "@/components/sections/ReframeBand";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Flat typographic header, not the homepage's scroll-scrubbed Hero — that
// component is hardcoded to the homepage's Guru/Gowri/Gaurav frame sequence
// and takes no props. Faceless throughout: no "I", no Vamsi likeness
// anywhere on this page, per dnm-about-page-copy.md.
export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-dnm-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-dnm-accent">
              The System
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-dnm-ink sm:text-4xl lg:text-5xl">
              Not motivation. A system.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-dnm-ink-body sm:text-lg">
              Most people trying to build a second income are given hustle and hype. What
              actually works is a repeatable setup — the same one behind every real result here,
              not a personality to follow.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <a
              href="#framework"
              className="font-display inline-flex items-center justify-center rounded-md border-2 border-dnm-ink px-6 py-3 text-xs uppercase tracking-wide text-dnm-ink transition-colors duration-base ease-standard hover:bg-dnm-ink/5 sm:text-sm"
            >
              See How It Works
            </a>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <div id="framework">
        <Framework />
      </div>

      <ReframeBand
        statement="The job was never the safe choice. It was just the familiar one."
        variant="orange"
        cta={{ label: "Register for the Free Webinar", href: "/webinar" }}
      />
    </main>
  );
}

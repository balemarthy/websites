import Callout from "@/components/sections/Callout";
import Newsletter from "@/components/sections/Newsletter";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Honest-empty-state shell, matching ESC's exact precedent
// (website-changes-2026-09-18.md) — the locked pattern for a page with no
// content yet, not a lesser effort.
export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              Blog
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl">
              The Archive
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              Long-form pieces on career visibility and technical positioning land here first, then
              go out by email. Nothing&apos;s published yet — the first one is coming.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <Callout eyebrow="First Pieces Landing Soon">
            Nothing published here yet — the first pieces are in progress. Subscribe below and
            you&apos;ll get each one the day it goes up.
          </Callout>
        </AnimatedSection>
      </section>

      <Newsletter />
    </main>
  );
}

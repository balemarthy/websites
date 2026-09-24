import Callout from "@/components/sections/Callout";
import Newsletter from "@/components/sections/Newsletter";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Honest-empty-state shell, matching ESC's exact precedent
// (website-changes-2026-09-18.md) — the locked pattern for a page with no
// content yet, not a lesser effort.
export default function DownloadsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
              Downloads
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bve-ink sm:text-4xl">
              Resources
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-bve-ink-body sm:text-lg">
              Worksheets and frameworks for career visibility and resume positioning will live
              here. First ones are still being built.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <Callout eyebrow="First Titles In Progress">
            Nothing built yet — no fabricated titles or prices here in the meantime. Subscribe
            below and you&apos;ll know the moment the first one is ready.
          </Callout>
        </AnimatedSection>
      </section>

      <Newsletter />
    </main>
  );
}

import Link from "next/link";
import Callout from "@/components/sections/Callout";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Honest-empty-state shell, same pattern as ESC's and BVE's. Faceless voice
// throughout — no "I". DNM has no Newsletter component yet, so the /webinar
// registration is the page's call-to-action instead.
export default function DownloadsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-dnm-canvas">
      <section className="px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-dnm-accent">
              Downloads
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-dnm-ink sm:text-4xl">
              Start Here
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-dnm-ink-body sm:text-lg">
              Free guides on second income and the myths around it. Nothing posted yet.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <Callout eyebrow="First Guides In Progress">
            Nothing posted yet. In the meantime, the free webinar covers the same system these
            guides will build on.
          </Callout>
        </AnimatedSection>
      </section>

      <section className="px-6 pb-16 text-center">
        <Link
          href="/webinar"
          className="font-body inline-flex items-center justify-center rounded-md bg-dnm-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Register for the Free Webinar
        </Link>
      </section>
    </main>
  );
}

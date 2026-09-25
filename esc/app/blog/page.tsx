import { redirect } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Callout from "@/components/sections/Callout";
import Newsletter from "@/components/sections/Newsletter";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { BLOG_URL } from "@/lib/links";

// No-hero listing tier (page-factory-system.md): navigational page, no
// offer/price of its own, so no big hero — flat header + light content only.
// Blog content now lives in GHL (BLOG_URL) — once that link is real, any
// visitor who still lands on this route gets bounced straight there. While
// BLOG_URL is still the "#" placeholder, this stays the empty-state page.
export default function BlogPage() {
  if (BLOG_URL !== "#") {
    redirect(BLOG_URL);
  }

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <section className="bg-esc-paper px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-esc-teal">
              Blog
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-4xl">
              Writing on embedded fluency
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Long-form pieces on the reasoning behind the register, not just the register — the same
              material the programs are built from.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* Empty state — no posts published on this site yet. Real, not a
          "content in progress" placeholder: tells the visitor exactly what
          this page is for and gives them a reason to come back. */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <Callout eyebrow="First Pieces Landing Soon">
            Nothing published here yet — the first pieces are in progress. Subscribe below and
            you&apos;ll get each one the day it goes up, before it&apos;s posted anywhere else.
          </Callout>
        </AnimatedSection>
      </section>

      <Newsletter />

      <Footer />
    </main>
  );
}

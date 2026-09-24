"use client";

import type { FormEvent } from "react";
import FeatureGrid from "@/components/sections/FeatureGrid";
import WebinarCTA from "@/components/sections/WebinarCTA";
import ReframeBand from "@/components/sections/ReframeBand";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Flat typographic header with its own registration form, not the
// homepage's scroll-scrubbed Hero — that component is hardcoded to the
// Guru/Gowri/Gaurav frame sequence and has no form slot to reuse. This is
// the funnel's actual conversion point, so the form goes straight into the
// header instead of waiting for a later section.
function RegisterForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this to the real webinar registration flow (GHL form embed
    // or similar). This form does not submit anywhere yet — markup and
    // styling only, matching WebinarCTA.tsx's existing stub pattern.
  }

  return (
    <form
      id="register"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-xl bg-white p-6 shadow-[0_4px_16px_rgba(0,114,132,0.11)] sm:flex-row sm:items-center sm:gap-2 sm:p-2"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="font-body w-full rounded-md border border-dnm-border px-4 py-3 text-sm text-dnm-ink-body focus:outline-none sm:border-0 sm:px-3"
      />
      <button
        type="submit"
        className="font-body inline-flex items-center justify-center whitespace-nowrap rounded-md bg-dnm-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
      >
        Register Free
      </button>
    </form>
  );
}

export default function WebinarPage() {
  return (
    <main className="flex min-h-screen flex-col bg-dnm-canvas">
      <section className="px-6 pb-10 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-dnm-accent">
              Free Webinar — For Working Professionals
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-dnm-ink sm:text-4xl lg:text-5xl">
              The job was never the safe choice. It was just the familiar one.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-dnm-ink-body sm:text-lg">
              If your income depends entirely on one employer staying in business, you have a
              problem most people never name until it&apos;s too late. This free session shows
              the setup for a second income that doesn&apos;t ask you to quit your job or start
              from zero.
            </p>
          </AnimatedItem>
          <AnimatedItem className="w-full pt-2">
            <RegisterForm />
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <FeatureGrid />

      <WebinarCTA />

      <ReframeBand
        statement="Not a second job. The first income you actually own."
        variant="orange"
      />
    </main>
  );
}

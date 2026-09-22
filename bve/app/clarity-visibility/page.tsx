export default function ClarityVisibilityPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bve-canvas">
      <section
        id="clarity"
        className="flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
          Career Fluency
        </span>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bve-ink sm:text-4xl">
          Clarity
        </h1>
        <p className="font-body mt-4 text-base text-bve-ink-body">
          Content in progress. Check back soon.
        </p>
      </section>

      <section
        id="visibility"
        className="flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-bve-accent">
          Technical Branding
        </span>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bve-ink sm:text-4xl">
          Visibility
        </h1>
        <p className="font-body mt-4 text-base text-bve-ink-body">
          Content in progress. Check back soon.
        </p>
      </section>
    </main>
  );
}

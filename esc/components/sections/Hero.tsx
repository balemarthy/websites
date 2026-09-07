import Nav from "@/components/layout/Nav";
import Button from "@/components/ui/Button";
import HeroCanvas from "@/components/sections/HeroCanvas";
import MobileHeroImage from "@/components/sections/MobileHeroImage";

// Legibility scrim — near-opaque directly behind the centered text column (roughly the
// middle third), fading to nothing at both edges. Shared by both hero variants below.
const scrimStyle = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 34%, rgba(0,0,0,0.75) 66%, rgba(0,0,0,0) 100%)",
};

function HeroContent() {
  return (
    <div className="max-w-[600px] text-center">
      <h1
        className="font-display uppercase text-esc-paper"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.25rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "22ch",
        }}
      >
        You can make it work. Can you explain why you built it that way?
      </h1>

      <p
        className="mt-6 font-body text-base text-esc-paper/75 sm:text-lg"
        style={{ maxWidth: "480px" }}
      >
        That gap is why interviews stall. Real engineering judgment, taught the way it&apos;s
        actually used — not another certificate.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="primary"
          style={{
            boxShadow: "0 0 28px 6px rgba(240,120,57,.4), 0 4px 14px rgba(240,120,57,.35)",
          }}
        >
          Enrol Now
        </Button>
        <a
          href="#"
          className="font-body text-sm font-bold text-esc-paper transition-colors duration-base ease-standard hover:text-esc-orange"
        >
          Not sure? Talk to Vamsi first →
        </a>
      </div>

      <p className="mt-6 font-body text-sm text-esc-paper/60">
        Alumni at AMD · Infineon · Mirafra · Bosch
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      {/* Mobile: static hero, no scroll-pin — a scroll-linked canvas felt too fast/heavy at
          this size, and this dedicated portrait crop (both characters, headroom for text above
          them) was built specifically for a static mobile backdrop. */}
      <section className="relative min-h-screen w-full overflow-hidden bg-esc-paper md:hidden">
        <MobileHeroImage />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={scrimStyle} />
        <Nav />
        <div className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-12">
          <HeroContent />
        </div>
      </section>

      {/* Tablet/desktop: scroll-linked frame-sequence canvas, pinned while a tall section
          scrolls past underneath it. */}
      <section
        data-hero-scroll-track
        className="relative hidden w-full bg-esc-paper md:block md:h-[350vh] lg:h-[400vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Nav />

          <div className="absolute inset-0 z-10 flex items-start justify-center px-10 pt-[96px] lg:px-16">
            <HeroContent />
          </div>

          <HeroCanvas />

          <div aria-hidden className="pointer-events-none absolute inset-0" style={scrimStyle} />
        </div>
      </section>
    </>
  );
}

import Nav from "@/components/layout/Nav";
import Button from "@/components/ui/Button";
import HeroCanvas from "@/components/sections/HeroCanvas";

export default function Hero() {
  return (
    <section
      data-hero-scroll-track
      className="relative h-[300vh] w-full bg-esc-paper md:h-[350vh] lg:h-[400vh]"
    >
      {/* Sticky pin — stays fixed to the viewport while the tall section above scrolls past
          underneath it. Applies at every breakpoint now: the canvas is the backdrop everywhere,
          not just on desktop. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Nav />

        {/* Content block — absolute overlay, centered horizontally over the seam between Pagla
            and Pagli, clear of both characters, at every breakpoint. */}
        <div className="absolute inset-0 z-10 flex items-start justify-center px-6 pt-[96px] sm:px-10 lg:px-16">
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
        </div>

        {/* Scroll-linked frame-sequence canvas — the full-bleed backdrop at every breakpoint,
            replacing the static combined image. */}
        <HeroCanvas />

        {/* Text legibility scrim — near-opaque directly behind the centered text column
            (roughly the middle third), fading to nothing at both the left and right edges.
            Full-height, so it holds all the way from the nav down through the trust line. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 34%, rgba(0,0,0,0.75) 66%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}

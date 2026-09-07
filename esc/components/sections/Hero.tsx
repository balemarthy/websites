import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Button from "@/components/ui/Button";
import HeroCanvas from "@/components/sections/HeroCanvas";

export default function Hero() {
  return (
    <section
      data-hero-scroll-track
      className="relative w-full overflow-hidden bg-esc-paper lg:h-[400vh] lg:overflow-visible"
    >
      {/* Pin point for the scroll-linked canvas: on mobile this wrapper is `contents` (invisible
          to layout, so Step 1's static mobile flow is untouched); at lg+ it becomes the sticky
          viewport that stays pinned while the 400vh section above scrolls past underneath it. */}
      <div className="contents lg:sticky lg:top-0 lg:z-0 lg:block lg:h-screen lg:overflow-hidden">
        <Nav />

      {/* Content block — normal flow above the image on mobile, absolute overlay anchored near the
          nav on desktop. Centered horizontally over the seam between Pagla and Pagli, rather than
          sitting entirely over either of them. */}
      <div className="relative z-10 px-6 py-10 sm:px-10 lg:absolute lg:inset-0 lg:flex lg:items-start lg:justify-center lg:px-16 lg:pb-0 lg:pt-[96px]">
        <div className="lg:max-w-[600px] lg:text-center">
          <h1
            className="font-display uppercase text-esc-dark-teal lg:text-esc-paper"
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
            className="mt-6 font-body text-base text-dt-600 sm:text-lg lg:text-esc-paper/75"
            style={{ maxWidth: "480px" }}
          >
            That gap is why interviews stall. Real engineering judgment, taught the way it&apos;s
            actually used — not another certificate.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:justify-center">
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
              className="font-body text-sm font-bold text-esc-dark-teal transition-colors duration-base ease-standard hover:text-esc-orange lg:text-esc-paper"
            >
              Not sure? Talk to Vamsi first →
            </a>
          </div>

          <p className="mt-6 font-body text-sm text-dt-600 lg:text-esc-paper/60">
            Alumni at AMD · Infineon · Mirafra · Bosch
          </p>
        </div>
      </div>

      {/* Hero image — two uncropped portraits side by side on mobile, single full-bleed combined image on desktop */}
      <div className="relative w-full lg:absolute lg:inset-0 lg:z-0 lg:h-auto">
        {/* Mobile / tablet: separate portraits, each column matches the image's own 1376:768
            aspect ratio exactly, so it fills the frame with zero cropping and zero letterboxing. */}
        <div className="lg:hidden">
          <div className="flex w-full gap-2 sm:gap-3">
            <div className="relative flex-1" style={{ aspectRatio: "1376 / 768" }}>
              <Image
                src="/images/hero/pagli-hero.png"
                alt="Pagli, working at her desk"
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative flex-1" style={{ aspectRatio: "1376 / 768" }}>
              <Image
                src="/images/hero/pagla-hero.png"
                alt="Pagla, working at his desk"
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>

        {/* Desktop: scroll-linked frame-sequence canvas, replacing the static combined image */}
        <div className="relative hidden lg:block lg:h-full lg:w-full">
          <HeroCanvas />

          {/* Text legibility scrim — near-opaque directly behind the centered text column
              (roughly the middle third), fading to nothing at both the left and right edges.
              Full-height (not vertically tapered), so it holds all the way from the nav down
              through the trust line, not just around the headline. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 34%, rgba(0,0,0,0.75) 66%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </div>
      </div>
    </section>
  );
}

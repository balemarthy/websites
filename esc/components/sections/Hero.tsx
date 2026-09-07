import type { CSSProperties } from "react";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Button from "@/components/ui/Button";
import HeroCanvas from "@/components/sections/HeroCanvas";

function StatCard({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`w-[180px] rounded-[12px] bg-esc-paper p-3 text-center shadow-esc-lg sm:w-[200px] sm:p-4 lg:w-[230px] ${className}`}
      style={style}
    >
      <span className="block whitespace-nowrap font-display uppercase leading-none text-esc-orange text-base sm:text-lg lg:text-xl">
        Stuck <span className="mx-1 sm:mx-1.5">→</span> Placed
      </span>
      <p className="mt-1.5 font-body text-[11px] text-esc-dark-teal sm:mt-2 sm:text-xs lg:text-sm">
        The work didn&apos;t change. The visibility did.
      </p>
    </div>
  );
}

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
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              maxWidth: "600px",
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

          {/* Same card used everywhere now — normal document flow below the images, no overlap */}
          <StatCard className="mx-auto mt-4" />
        </div>

        {/* Desktop: scroll-linked frame-sequence canvas, replacing the static combined image */}
        <div className="relative hidden lg:block lg:h-full lg:w-full">
          <HeroCanvas />

          {/* Legibility scrim — strongest behind the now horizontally-centered text, fading out
              toward both edges rather than favoring one side */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 45% 60% at 50% 30%, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 80%)",
            }}
          />

          {/* Card sits in the clear wall/nightstand gap above the desks — high enough to clear
              Pagli's papers/notebook clutter at the very bottom, but anchored from the bottom
              (not viewport-centered) so it can't drift up into the text block's row at narrower
              lg widths, where the right-aligned text sits closer to the horizontal center */}
          <StatCard className="absolute z-10 left-1/2 -translate-x-1/2" style={{ bottom: "22%" }} />
        </div>
      </div>
      </div>
    </section>
  );
}

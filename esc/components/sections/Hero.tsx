import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-esc-paper lg:min-h-screen">
      <Nav />

      {/* Content block — normal flow above the image on mobile, absolute overlay on desktop */}
      <div className="relative z-10 px-6 py-10 sm:px-10 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-16 lg:py-0">
        <div className="lg:max-w-[600px]">
          <h1
            className="font-display uppercase text-esc-dark-teal lg:text-esc-paper"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
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

          <div className="mt-8 flex flex-wrap items-center gap-4">
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

      {/* Full-bleed hero image — normal flow (below content) on mobile, full-bleed background on desktop */}
      <div className="relative h-[420px] w-full sm:h-[520px] lg:absolute lg:inset-0 lg:z-0 lg:h-auto">
        <Image
          src="/images/hero/pagla-pagli-divided-world.png"
          alt="Pagla and Pagli, working in parallel on either side of a divided workspace"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Legibility scrim — strongest over the left 10-25% of the image, fading to nothing by ~48% */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0) 48%)",
          }}
        />

        {/* Floating stat card — bottom-center, straddling the image's light seam, attached at every breakpoint */}
        <div
          className="absolute z-10 w-[260px] -translate-x-1/2 rounded-[12px] bg-esc-paper p-6 shadow-esc-lg sm:w-[300px]"
          style={{ left: "50%", bottom: "8%" }}
        >
          <span className="block font-display uppercase leading-none text-esc-orange" style={{ fontSize: "2.25rem" }}>
            59 days
          </span>
          <p className="mt-2 font-body text-sm text-esc-dark-teal">
            Stuck at ₹4.7L for 3 years — then placed.
          </p>
        </div>
      </div>
    </section>
  );
}

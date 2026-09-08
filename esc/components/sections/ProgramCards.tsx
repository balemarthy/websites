import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

type Variant = "design" | "architecture";

type ProgramCardProps = {
  variant: Variant;
  eyebrow: string;
  headline: string;
  format: string;
  price: string;
  pathSteps: string[];
  forYouIf: string[];
  ctaLabel: string;
  photoSrc: string;
  photoAlt: string;
  photoObjectPosition: string;
};

const VARIANT_STYLES: Record<
  Variant,
  { panelBg: string; ink: string; mutedInk: string; ruleColor: string }
> = {
  design: {
    panelBg: "bg-esc-dark-teal",
    ink: "text-esc-paper",
    mutedInk: "text-esc-paper/70",
    ruleColor: "bg-esc-paper/25",
  },
  architecture: {
    panelBg: "bg-esc-paper",
    ink: "text-esc-dark-teal",
    mutedInk: "text-dt-600",
    ruleColor: "bg-esc-dark-teal/15",
  },
};

function ProgramCard({
  variant,
  eyebrow,
  headline,
  format,
  price,
  pathSteps,
  forYouIf,
  ctaLabel,
  photoSrc,
  photoAlt,
  photoObjectPosition,
}: ProgramCardProps) {
  const s = VARIANT_STYLES[variant];

  return (
    <div className="flex flex-col overflow-hidden rounded-xl shadow-esc-lg lg:flex-row">
      {/* Photo — full-bleed, top on mobile, left/right on desktop. The desktop column is
          narrow but very tall (matches the panel's content height), so a landscape source
          photo gets cropped hard on both axes — object-position is tuned per photo so the
          face stays in frame instead of defaulting to dead-center. */}
      <div className="relative h-[320px] w-full shrink-0 sm:h-[380px] lg:h-auto lg:w-[42%]">
        <Image
          src={photoSrc}
          alt={photoAlt}
          fill
          className="object-cover"
          style={{ objectPosition: photoObjectPosition }}
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
      </div>

      {/* Info panel */}
      <div className={`flex flex-1 flex-col gap-6 p-6 sm:p-8 lg:p-10 ${s.panelBg}`}>
        <span
          className={`font-display text-xs font-extrabold uppercase tracking-[0.1em] ${s.mutedInk}`}
        >
          {eyebrow}
        </span>

        <h3
          className={`font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-3xl ${s.ink}`}
        >
          {headline}
        </h3>

        <p className={`font-body text-sm sm:text-base ${s.mutedInk}`}>{format}</p>

        <span className={`font-display text-3xl font-extrabold sm:text-4xl ${s.ink}`}>
          {price}
        </span>

        <div className={`h-px w-full ${s.ruleColor}`} aria-hidden />

        <ol className="flex flex-col gap-2">
          {pathSteps.map((step, i) => (
            <li key={step} className="flex items-baseline gap-3">
              <span className={`font-mono text-xs ${s.mutedInk}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`font-body text-sm ${s.ink}`}>{step}</span>
            </li>
          ))}
        </ol>

        <div className={`h-px w-full ${s.ruleColor}`} aria-hidden />

        <div className="flex flex-col gap-3">
          <span className={`font-display text-xs font-extrabold uppercase tracking-[0.1em] ${s.mutedInk}`}>
            For you if
          </span>
          {forYouIf.map((line) => (
            <p key={line} className={`font-body text-sm leading-relaxed ${s.ink}`}>
              {line}
            </p>
          ))}
        </div>

        <Button
          variant="primary"
          className="mt-2 self-start"
          style={{ boxShadow: "0 0 20px 4px rgba(240,120,57,.3), 0 4px 12px rgba(240,120,57,.3)" }}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

export default function ProgramCards(): ReactNode {
  return (
    <section id="programs" className="scroll-mt-20 bg-esc-paper px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row">
        <div className="lg:flex-1">
          <ProgramCard
            variant="design"
            eyebrow="Cohort One"
            headline="You can make it work. This is where you learn why it works."
            format="32 hours, over two months. Saturday and Sunday mornings, 2 hours each session."
            price="₹14,999"
            pathSteps={[
              "Starting Point",
              "Build & Debug Toolchain",
              "Hardware & Memory",
              "Peripherals & Device Drivers",
              "Operating Systems",
              "Integration & Optimization",
            ]}
            forYouIf={[
              "You can make embedded code work but go quiet when asked to explain why it was built that way.",
              "You're willing to sit with material that doesn't resolve in ten minutes.",
            ]}
            ctaLabel="Start with Design"
            photoSrc="/images/programs/design/pagli-design.png"
            photoAlt="Pagli, working through the Design cohort material"
            photoObjectPosition="38% 18%"
          />
        </div>
        <div className="lg:flex-1">
          <ProgramCard
            variant="architecture"
            eyebrow="Cohort Two"
            headline="You've shipped working code. Could you defend every decision in it?"
            format="10 hours, over 15 days. 5 sessions, 2 hours each, every 3rd day, evenings."
            price="₹8,999"
            pathSteps={[
              "Problem Definition & Object Model",
              "CRC Cards & Event Modelling",
              "Runtime Model & Module Catalog",
              "TDD & Interface Design",
              "Implementation & Design Review",
            ]}
            forYouIf={[
              "You've built and shipped something real — even something small — and know it could've been designed better.",
              "You want a portfolio project you can defend in an interview, not just show.",
            ]}
            ctaLabel="Start with Architecture"
            photoSrc="/images/programs/architecture/pagla-architecture.png"
            photoAlt="Pagla, working through the Architecture cohort material"
            photoObjectPosition="48% 18%"
          />
        </div>
      </div>
    </section>
  );
}

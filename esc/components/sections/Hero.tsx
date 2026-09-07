"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

// Hero entrance — one orchestrated moment, not scattered per-element effects.
// Spring config from the 3d-scroll-website skill's "Hero text" row
// (references/02-animation-techniques.md): stiffness 80 / damping 20, a
// softer entrance than the default 100/20 scroll-reveal spring.
const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-esc-paper px-6 pb-16 pt-12 lg:px-16 lg:pb-24 lg:pt-16">
      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={heroContainer}
        className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-10"
      >
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:w-[45%]">
          <motion.h1
            variants={heroItem}
            className="max-w-[19ch] font-display text-4xl uppercase leading-[1.05] tracking-tight text-esc-dark-teal sm:text-5xl lg:text-[3.25rem]"
          >
            You can make it work. Can you explain why you built it that way?
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="max-w-[52ch] font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg"
          >
            That gap is why interviews stall. Real engineering judgment, taught the way it&apos;s
            actually used — not another certificate.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button variant="primary">Enrol Now</Button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-esc-dark-teal underline-offset-4 transition-colors duration-base ease-standard hover:text-esc-orange hover:underline"
            >
              Not sure? Talk to Vamsi first
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </motion.div>

          <motion.p variants={heroItem} className="font-body text-xs text-dt-600 sm:text-sm">
            Alumni at AMD · Infineon · Mirafra · Bosch
          </motion.p>
        </div>

        {/* Right column */}
        <div className="relative lg:w-[55%]">
          <motion.div variants={heroItem} className="flex gap-3 sm:gap-4">
            <div className="relative h-[320px] flex-1 overflow-hidden rounded-lg sm:h-[420px] lg:h-[520px]">
              <Image
                src="/images/characters/pagli/hero/pagli-hero.png"
                alt="Pagli"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 27vw"
                priority
              />
            </div>
            <div className="relative h-[320px] flex-1 overflow-hidden rounded-lg sm:h-[420px] lg:h-[520px]">
              <Image
                src="/images/characters/pagla/hero/pagla-hero.png"
                alt="Pagla"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 27vw"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="absolute bottom-4 left-1/2 w-[190px] -translate-x-1/2 rounded-lg bg-white px-5 py-4 text-center shadow-esc-lg sm:bottom-6 sm:w-[220px] sm:px-6 sm:py-5"
          >
            <span className="block font-display text-3xl uppercase leading-none text-esc-orange sm:text-4xl">
              59 days
            </span>
            <p className="mt-2 font-body text-xs leading-snug text-esc-dark-teal sm:text-sm">
              Stuck at ₹4.7L for 3 years — then placed.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

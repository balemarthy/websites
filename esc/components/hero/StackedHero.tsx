"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DoorGraphic from "./DoorGraphic";
import CTAButton from "./CTAButton";

const TOTAL_BEATS = 4;
const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const },
};

function BeatLabel({ index }: { index: number }) {
  return (
    <span className="font-mono text-xs tracking-wide text-esc-teal">
      {String(index).padStart(2, "0")} / {String(TOTAL_BEATS).padStart(2, "0")}
    </span>
  );
}

export default function StackedHero() {
  return (
    <div className="flex flex-col gap-20 bg-esc-paper px-6 py-20 sm:px-10">
      {/* Beat 1 — Recognition */}
      <motion.div {...fadeIn} className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
        <BeatLabel index={1} />
        <div className="flex w-full flex-col overflow-hidden rounded-lg border-2 border-esc-dark-teal sm:flex-row">
          <div className="relative h-[220px] sm:h-[320px] sm:flex-1">
            <Image
              src="/images/characters/pagli/beats/pagli-01-pain.png"
              alt="Pagli"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative h-[220px] sm:h-[320px] sm:flex-1">
            <Image
              src="/images/characters/pagla/beats/pagla-01-pain.png"
              alt="Pagla"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="max-w-xl rounded-lg bg-esc-paper px-6 py-5 text-center shadow-esc-lg">
          <h1 className="font-display text-xl uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-2xl">
            You can make it work. Can you explain why you built it that way?
          </h1>
        </div>
      </motion.div>

      {/* Beat 2 — Proof */}
      <motion.div {...fadeIn} className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <BeatLabel index={2} />
        <div className="flex items-center justify-center gap-3">
          <div className="relative h-[200px] w-[150px]">
            <Image
              src="/images/characters/pagla/beats/pagla-01-pain.png"
              alt="Pagla — before"
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 text-esc-teal" strokeWidth={2} />
          <div className="relative h-[200px] w-[150px]">
            <Image
              src="/images/characters/pagla/beats/pagla-03-resolve.png"
              alt="Pagla — after"
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
        </div>
        <p className="text-center font-body text-lg text-esc-dark-teal">
          Same engineer. Same code. Different answer to &apos;why&apos;.
        </p>
      </motion.div>

      <motion.div {...fadeIn} className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
        <span className="text-center font-display text-6xl uppercase leading-none text-esc-orange sm:text-7xl">
          59 days
        </span>
        <p className="max-w-sm text-center font-body text-sm text-dt-600">
          From stuck at ₹4.7L for three years — to placed.
        </p>
      </motion.div>

      {/* Beat 3 — Certainty */}
      <motion.div {...fadeIn} className="mx-auto flex w-full max-w-xl flex-col items-center gap-8">
        <BeatLabel index={3} />
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="relative h-[200px] w-[160px]">
            <Image
              src="/images/characters/pagli/beats/pagli-03-resolve.png"
              alt="Pagli"
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
          <DoorGraphic />
          <div className="relative h-[200px] w-[160px]">
            <Image
              src="/images/characters/pagla/beats/pagla-03-resolve.png"
              alt="Pagla"
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </div>
        <p className="max-w-md text-center font-body text-base text-esc-dark-teal">
          No mastery, no magic, no fixed number of days. Real, consistent time — and it works.
        </p>
      </motion.div>

      {/* Beat 4 — Action */}
      <motion.div {...fadeIn} className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <BeatLabel index={4} />
        <p className="text-center font-body text-lg text-esc-dark-teal">
          Enrol now, or talk first. Either way, you don&apos;t have to decide alone.
        </p>
        <div className="flex w-full flex-col gap-4">
          <CTAButton variant="outline" className="w-full">
            Start with Design
          </CTAButton>
          <CTAButton variant="primary" className="w-full">
            Start with Architecture
          </CTAButton>
          <CTAButton variant="outline" className="w-full">
            Not sure — book a call
          </CTAButton>
        </div>
      </motion.div>
    </div>
  );
}

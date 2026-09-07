"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { cumulativeBoundaries, indexFromProgress, useWeightedOpacity } from "./scroll-utils";
import ProgressSegments from "./ProgressSegments";
import DoorGraphic from "./DoorGraphic";
import CTAButton from "./CTAButton";

// Recognition, Proof, Certainty, Action — Proof runs longer to carry its extra weight.
const BEAT_WEIGHTS = [1, 1.3, 1, 1];

type PanelProps = {
  scrollYProgress: MotionValue<number>;
  boundaries: number[];
};

function BeatRecognitionPanel({ scrollYProgress, boundaries }: PanelProps) {
  const opacity = useWeightedOpacity(scrollYProgress, boundaries, 0);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex">
      <div className="relative flex-1">
        <Image
          src="/images/characters/pagli/beats/pagli-01-pain.png"
          alt="Pagli"
          fill
          className="object-cover object-top"
          sizes="50vw"
          priority
        />
      </div>
      <div className="relative flex-1">
        <Image
          src="/images/characters/pagla/beats/pagla-01-pain.png"
          alt="Pagla"
          fill
          className="object-cover object-top"
          sizes="50vw"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-12 lg:px-24">
        <div className="max-w-xl rounded-lg bg-esc-paper px-10 py-8 text-center shadow-esc-lg">
          <h1 className="font-display text-3xl uppercase leading-tight tracking-tight text-esc-dark-teal lg:text-4xl">
            You can make it work. Can you explain why you built it that way?
          </h1>
        </div>
      </div>
    </motion.div>
  );
}

function BeatProofPanel({ scrollYProgress, boundaries }: PanelProps) {
  const opacity = useWeightedOpacity(scrollYProgress, boundaries, 1);
  const local = useTransform(scrollYProgress, [boundaries[1], boundaries[2]], [0, 1]);
  const subBoundaries = [0, 0.5, 1];
  const phaseCrossfade = useWeightedOpacity(local, subBoundaries, 0);
  const phaseNumeral = useWeightedOpacity(local, subBoundaries, 1);

  const imageProgress = useTransform(local, [0, 0.5], [0, 1]);
  const beforeOpacity = useTransform(imageProgress, [0, 1], [1, 0]);
  const afterOpacity = useTransform(imageProgress, [0, 1], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div
        style={{ opacity: phaseCrossfade }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-12 lg:px-24"
      >
        <div className="relative h-[300px] w-[240px] lg:h-[380px] lg:w-[300px]">
          <motion.div style={{ opacity: beforeOpacity }} className="absolute inset-0">
            <Image
              src="/images/characters/pagla/beats/pagla-01-pain.png"
              alt="Pagla — before"
              fill
              className="object-contain"
              sizes="300px"
            />
          </motion.div>
          <motion.div style={{ opacity: afterOpacity }} className="absolute inset-0">
            <Image
              src="/images/characters/pagla/beats/pagla-03-resolve.png"
              alt="Pagla — after"
              fill
              className="object-contain"
              sizes="300px"
            />
          </motion.div>
        </div>
        <p className="font-body text-lg text-esc-dark-teal sm:text-xl">
          Same engineer. Same code. Different answer to &apos;why&apos;.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: phaseNumeral }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-12 text-center lg:px-24"
      >
        <span className="font-display text-6xl uppercase leading-none text-esc-orange sm:text-8xl lg:text-9xl">
          59 days
        </span>
        <p className="max-w-md font-body text-base text-dt-600 sm:text-lg">
          From stuck at ₹4.7L for three years — to placed.
        </p>
      </motion.div>
    </motion.div>
  );
}

function BeatCertaintyPanel({ scrollYProgress, boundaries }: PanelProps) {
  const opacity = useWeightedOpacity(scrollYProgress, boundaries, 2);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-12 lg:px-24"
    >
      <div className="flex items-center justify-center gap-10 lg:gap-16">
        <div className="relative h-[260px] w-[210px] lg:h-[340px] lg:w-[270px]">
          <Image
            src="/images/characters/pagli/beats/pagli-03-resolve.png"
            alt="Pagli"
            fill
            className="object-contain"
            sizes="270px"
          />
        </div>
        <DoorGraphic />
        <div className="relative h-[260px] w-[210px] lg:h-[340px] lg:w-[270px]">
          <Image
            src="/images/characters/pagla/beats/pagla-03-resolve.png"
            alt="Pagla"
            fill
            className="object-contain"
            sizes="270px"
          />
        </div>
      </div>
      <p className="max-w-xl text-center font-body text-base text-esc-dark-teal sm:text-lg">
        No mastery, no magic, no fixed number of days. Real, consistent time — and it works.
      </p>
    </motion.div>
  );
}

function BeatActionPanel({ scrollYProgress, boundaries }: PanelProps) {
  const opacity = useWeightedOpacity(scrollYProgress, boundaries, 3);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center lg:px-24"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-24 opacity-30 lg:gap-40">
        <div className="relative h-[180px] w-[150px] lg:h-[220px] lg:w-[190px]">
          <Image
            src="/images/characters/pagli/beats/pagli-03-resolve.png"
            alt=""
            fill
            className="object-contain grayscale"
            sizes="190px"
          />
        </div>
        <div className="relative h-[180px] w-[150px] lg:h-[220px] lg:w-[190px]">
          <Image
            src="/images/characters/pagla/beats/pagla-03-resolve.png"
            alt=""
            fill
            className="object-contain grayscale"
            sizes="190px"
          />
        </div>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6">
        <p className="font-body text-lg text-esc-dark-teal sm:text-xl">
          Enrol now, or talk first. Either way, you don&apos;t have to decide alone.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <CTAButton variant="outline">Start with Design</CTAButton>
          <CTAButton variant="primary">Start with Architecture</CTAButton>
          <CTAButton variant="outline">Not sure — book a call</CTAButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function PinnedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boundaries = useMemo(() => cumulativeBoundaries(BEAT_WEIGHTS), []);
  const totalVh = useMemo(() => BEAT_WEIGHTS.reduce((a, b) => a + b, 0) * 100, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(indexFromProgress(v, boundaries));
  });

  return (
    <div ref={containerRef} style={{ height: `${totalVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-esc-paper">
        <BeatRecognitionPanel scrollYProgress={scrollYProgress} boundaries={boundaries} />
        <BeatProofPanel scrollYProgress={scrollYProgress} boundaries={boundaries} />
        <BeatCertaintyPanel scrollYProgress={scrollYProgress} boundaries={boundaries} />
        <BeatActionPanel scrollYProgress={scrollYProgress} boundaries={boundaries} />
        <ProgressSegments active={activeIndex} total={BEAT_WEIGHTS.length} />
      </div>
    </div>
  );
}

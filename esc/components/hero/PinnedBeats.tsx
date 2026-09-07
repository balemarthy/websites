"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { beats, imageSideFor, type Beat } from "./beats-data";
import DialogueCloud from "./DialogueCloud";
import ProgressSegments from "./ProgressSegments";

const TOTAL = beats.length;

function useBeatOpacity(scrollYProgress: MotionValue<number>, index: number) {
  const segment = 1 / TOTAL;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fade = segment * 0.3;

  const points: number[] = [];
  const values: number[] = [];

  if (index === 0) {
    points.push(0);
    values.push(1);
  } else {
    points.push(start - fade, start);
    values.push(0, 1);
  }

  if (index === TOTAL - 1) {
    points.push(1);
    values.push(1);
  } else {
    points.push(end - fade, end);
    values.push(1, 0);
  }

  return useTransform(scrollYProgress, points, values);
}

function BeatPanel({
  beat,
  index,
  scrollYProgress,
}: {
  beat: Beat;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useBeatOpacity(scrollYProgress, index);
  const side = imageSideFor(beat.character);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-24"
    >
      <div
        className={`flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:justify-between ${
          side === "left" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <DialogueCloud tail={side === "right" ? "left" : "right"} className="max-w-md">
          {beat.line}
        </DialogueCloud>
        <div className="relative h-[260px] w-[260px] shrink-0 sm:h-[340px] sm:w-[340px] lg:h-[440px] lg:w-[440px]">
          <Image
            src={beat.image}
            alt={`${beat.character === "pagla" ? "Pagla" : "Pagli"} — ${beat.phase}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 60vw, 440px"
            priority={index === 0}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function PinnedBeats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(v * TOTAL)));
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-esc-paper">
        {beats.map((beat, i) => (
          <BeatPanel key={beat.id} beat={beat} index={i} scrollYProgress={scrollYProgress} />
        ))}
        <ProgressSegments active={activeIndex} total={TOTAL} />
      </div>
    </div>
  );
}

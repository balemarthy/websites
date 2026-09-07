"use client";

import { useEffect, useState } from "react";

const ROW_1_ITEMS = ["EMBEDDED SOFTWARE DESIGN", "EMBEDDED SOFTWARE ARCHITECTURE"];
const ROW_2_ITEMS = [
  "32 HOURS OVER 2 MONTHS",
  "10 HOURS OVER 15 DAYS",
  "SIX MODULES, ZERO GUESSWORK",
  "FIVE SESSIONS, ONE REAL PROJECT",
];

// Repeat the base list a few times per half so a full loop cycle feels rich
// rather than looping every couple of words.
const REPEATS = 6;

function MarqueeRow({
  items,
  colorClass,
  direction,
  durationSeconds,
  reducedMotion,
}: {
  items: string[];
  colorClass: string;
  direction: "ltr" | "rtl";
  durationSeconds: number;
  reducedMotion: boolean;
}) {
  const repeated = Array.from({ length: REPEATS }, () => items).flat();

  const content = (
    <>
      {repeated.map((item, i) => (
        <span
          key={i}
          className={`whitespace-nowrap font-display text-lg font-extrabold uppercase tracking-[0.08em] sm:text-2xl ${colorClass}`}
        >
          {item}
          <span aria-hidden className="mx-6 sm:mx-8">
            ·
          </span>
        </span>
      ))}
    </>
  );

  if (reducedMotion) {
    return (
      <div className="flex overflow-hidden py-3 sm:py-4">
        <div className="flex shrink-0 gap-0">{content}</div>
      </div>
    );
  }

  return (
    <div
      className="group overflow-hidden py-3 sm:py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max shrink-0 group-hover:[animation-play-state:paused]"
        style={{
          // Longhand properties only — never the `animation` shorthand — so that
          // animation-play-state stays free for the group-hover class above to control.
          // An inline shorthand would win over any class with higher specificity, which
          // would make the pause-on-hover a no-op.
          animationName: "esc-marquee",
          animationDuration: `${durationSeconds}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          // The esc-marquee keyframe moves content from 0 -> -50%, i.e. rightward content
          // travelling toward the left (a "right to left" read) in its default direction.
          animationDirection: direction === "rtl" ? "normal" : "reverse",
        }}
      >
        <div className="flex shrink-0">{content}</div>
        <div aria-hidden className="flex shrink-0">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Marquee() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section aria-label="Programs at a glance" className="bg-esc-paper">
      <MarqueeRow
        items={ROW_1_ITEMS}
        colorClass="text-esc-dark-teal"
        direction="rtl"
        durationSeconds={42}
        reducedMotion={reducedMotion}
      />
      <MarqueeRow
        items={ROW_2_ITEMS}
        colorClass="text-esc-orange"
        direction="ltr"
        durationSeconds={38}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}

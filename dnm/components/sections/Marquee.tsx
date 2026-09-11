"use client";

import { useEffect, useState } from "react";

const ROW_1_ITEMS = ["FREEDOM", "SYSTEM", "CONSISTENCY", "OWNERSHIP", "LEVERAGE"];
const ROW_2_ITEMS = ["FREE WEBINAR", "DIGITAL INCOME SYSTEM", "NO MLM PITCH"];

// Repeat the base list a few times per half so a full loop cycle feels rich
// rather than looping every couple of words.
const REPEATS = 6;

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function MarqueeRow({
  items,
  itemClassName,
  direction,
  durationSeconds,
  reducedMotion,
}: {
  items: string[];
  itemClassName: string;
  direction: "ltr" | "rtl";
  durationSeconds: number;
  reducedMotion: boolean;
}) {
  const repeated = Array.from({ length: REPEATS }, () => items).flat();

  const content = (
    <>
      {repeated.map((item, i) => (
        <span key={i} className={`whitespace-nowrap ${itemClassName}`}>
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
          animationName: "dnm-marquee",
          animationDuration: `${durationSeconds}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
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
  const reducedMotion = useReducedMotionPreference();

  return (
    <section aria-label="What DNM stands for" className="bg-dnm-canvas">
      <MarqueeRow
        items={ROW_1_ITEMS}
        itemClassName="font-display text-lg font-extrabold uppercase tracking-[0.08em] sm:text-2xl text-dnm-ink"
        direction="rtl"
        durationSeconds={90}
        reducedMotion={reducedMotion}
      />
      <MarqueeRow
        items={ROW_2_ITEMS}
        itemClassName="font-display text-lg font-extrabold uppercase tracking-[0.08em] sm:text-2xl text-dnm-accent"
        direction="ltr"
        durationSeconds={80}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}

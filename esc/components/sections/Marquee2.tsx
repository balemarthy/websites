"use client";

import { MarqueeRow, useReducedMotionPreference } from "./Marquee";

const ITEMS = [
  "ALUMNI AT AMD",
  "INFINEON",
  "MIRAFRA",
  "BOSCH",
  "CONTINENTAL",
  "WIPRO",
  "CISCO",
  "DELL",
  "EMBEDDED SOFTWARE DESIGN — ₹14,999",
  "2 MONTHS",
  "EMBEDDED SOFTWARE ARCHITECTURE — ₹8,999",
  "15 DAYS",
];

export default function Marquee2() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section aria-label="Alumni and programs at a glance" className="bg-esc-paper">
      <MarqueeRow
        items={ITEMS}
        itemClassName="font-mono text-[13px] uppercase tracking-[0.04em] text-esc-dark-teal"
        direction="rtl"
        durationSeconds={90}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}

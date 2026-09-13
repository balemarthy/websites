"use client";

import { ShuffleStack } from "./ShuffleStack";
import styles from "./ProgramStacks.module.css";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

type StackItem = { tag: string; title: string; desc: string };

const DESIGN_ITEMS: StackItem[] = [
  {
    tag: "Hardware Reasoning",
    title: "THE REASONING FRAMEWORK",
    desc: "Hardware in three stages, software in four questions asked before a line gets written — what the chip needs, the core logic, what connectivity requires, what the customer-facing layer shows.",
  },
  {
    tag: "Build Infrastructure",
    title: "REAL-WORLD PROJECT",
    desc: "Modular design, Makefiles, and the same build infrastructure real production firmware runs on — not a toy demo.",
  },
  {
    tag: "Six Stages",
    title: "THE PATH",
    desc: "First real program on real hardware, the build-and-debug toolchain, datasheets and memory, peripherals and device drivers, a real RTOS, then a complete optimized application.",
  },
  {
    tag: "ARM Hardware",
    title: "THE HARDWARE",
    desc: "Popular ARM-based boards. You're never stuck waiting on a part nobody stocks.",
  },
  {
    tag: "The Shift",
    title: "BEFORE → AFTER",
    desc: "Before: you can make code work, but you can't always say why it's built that way. After two months: you design systems you can explain line by line — not instantly, the same way every real skill is actually built.",
  },
];

const ARCHITECTURE_ITEMS: StackItem[] = [
  {
    tag: "Design Discipline",
    title: "THE DISCIPLINE",
    desc: "CRC cards instead of guesswork. Event modelling instead of 'I think this triggers that.' A module catalog instead of a folder of files nobody can explain six months later.",
  },
  {
    tag: "One Real Project",
    title: "ONE REAL PROJECT",
    desc: "Derived from a genuine use case, not a toy demo. Built from scratch across five live sessions, spaced three days apart on purpose.",
  },
  {
    tag: "Five Sessions",
    title: "THE ROADMAP",
    desc: "Problem definition and object model, CRC cards and event modelling, runtime model and module catalog, TDD and interface design, implementation and design review.",
  },
  {
    tag: "Interview-Ready",
    title: "WHAT YOU WALK AWAY WITH",
    desc: "A project you can explain decision by decision in an interview, not just show.",
  },
  {
    tag: "The Shift",
    title: "DAY 1 → DAY 15",
    desc: "Day 1: you've shipped something real, but the reasoning behind it was mostly instinct. Day 15: you have a project you can walk anyone through, decision by decision.",
  },
];

function ProgramCard(item: StackItem) {
  return (
    <>
      <div className={`font-mono ${styles.tagPill}`}>{item.tag}</div>
      <div className={`font-display ${styles.cardTitle}`}>{item.title}</div>
      <div className={`font-body ${styles.cardDesc}`}>{item.desc}</div>
    </>
  );
}

export default function ProgramStacks() {
  return (
    <section className={styles.section}>
      <div aria-hidden className={styles.glow} />

      <AnimatedSection>
        <AnimatedItem className={styles.intro}>
          <p className={`font-mono ${styles.eyebrow}`}>HOW IT&apos;S BUILT</p>
          <h2 className={`font-display ${styles.heading}`}>TWO LAYERS, IN ORDER</h2>
          <p className={`font-body ${styles.subline}`}>
            Everything ESC teaches sits under one umbrella, Embedded Fluency — two programmes, each
            solving a different half of the same problem.
          </p>
        </AnimatedItem>
      </AnimatedSection>

      <div className={styles.stacksRow}>
        <ShuffleStack items={DESIGN_ITEMS} label="EMBEDDED SOFTWARE DESIGN" renderCard={ProgramCard} />
        <ShuffleStack
          items={ARCHITECTURE_ITEMS}
          label="EMBEDDED SOFTWARE ARCHITECTURE"
          renderCard={ProgramCard}
        />
      </div>
    </section>
  );
}

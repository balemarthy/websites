"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProgramStacks.module.css";

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
    title: "DAY 1 → DAY 15",
    desc: "Day 1: you can make code work, but you can't always say why it's built that way. Day 15: you design systems you can explain line by line.",
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

const ROLE_CLASSES = [styles.roleFront, styles.roleMiddle, styles.roleBack, styles.roleHidden];

function ShuffleStack({ items, label }: { items: StackItem[]; label: string }) {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [contentByCard, setContentByCard] = useState<Record<number, number>>({ 0: 0, 1: 1, 2: 2, 3: 3 });
  const [exitingId, setExitingId] = useState<number | null>(null);
  const nextContentRef = useRef(4);
  const [dotIdx, setDotIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(shuffle, 3700);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function shuffle() {
    setOrder((prev) => {
      const exiting = prev[0];
      setExitingId(exiting);
      const next = [prev[1], prev[2], prev[3], exiting];
      window.setTimeout(() => {
        setContentByCard((p) => ({ ...p, [exiting]: nextContentRef.current % items.length }));
        nextContentRef.current++;
        setExitingId(null);
      }, 720);
      return next;
    });
    setDotIdx((p) => (p + 1) % items.length);
  }

  function roleClass(cardId: number) {
    if (cardId === exitingId) return styles.roleExit;
    const pos = order.indexOf(cardId);
    return ROLE_CLASSES[pos];
  }

  return (
    <div className={styles.stackOuter}>
      <p className={`font-mono ${styles.stackLabel}`}>{label}</p>
      <div className={styles.stackWrap}>
        {[0, 1, 2, 3].map((cardId) => {
          const item = items[contentByCard[cardId]];
          return (
            <div key={cardId} className={`${styles.card} ${roleClass(cardId)}`}>
              <div className={`font-mono ${styles.tagPill}`}>{item.tag}</div>
              <div className={`font-display ${styles.cardTitle}`}>{item.title}</div>
              <div className={`font-body ${styles.cardDesc}`}>{item.desc}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.dots} aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === dotIdx ? styles.dotActive : ""}`} />
        ))}
      </div>
    </div>
  );
}

export default function ProgramStacks() {
  return (
    <section className={styles.section}>
      <div aria-hidden className={styles.glow} />

      <div className={styles.intro}>
        <p className={`font-mono ${styles.eyebrow}`}>HOW IT&apos;S BUILT</p>
        <h2 className={`font-display ${styles.heading}`}>TWO LAYERS, IN ORDER</h2>
        <p className={`font-body ${styles.subline}`}>
          Everything ESC teaches sits under one umbrella, Embedded Fluency — two programmes, each
          solving a different half of the same problem.
        </p>
      </div>

      <div className={styles.stacksRow}>
        <ShuffleStack items={DESIGN_ITEMS} label="EMBEDDED SOFTWARE DESIGN" />
        <ShuffleStack items={ARCHITECTURE_ITEMS} label="EMBEDDED SOFTWARE ARCHITECTURE" />
      </div>
    </section>
  );
}

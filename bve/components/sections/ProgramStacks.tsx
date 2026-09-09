"use client";

import { ShuffleStack } from "./ShuffleStack";
import styles from "./ProgramStacks.module.css";

type StackItem = { tag: string; title: string; desc: string };

// Placeholder filler — real methodology detail (framework steps, engagement
// structure) hasn't been drafted yet. These restate the program-card
// one-liners at slightly more length, not invented specifics.
const CAREER_ITEMS: StackItem[] = [
  {
    tag: "Resume & Clarity",
    title: "RESUME WRITING, REWRITTEN",
    desc: "Resume writing and career clarity — built so the document says clearly what you did and why it mattered, not just a pile of keywords.",
  },
  {
    tag: "The Hard Conversations",
    title: "NEGOTIATION & SALARY",
    desc: "The conversations most engineers put off — leveling, compensation, and asking for what the work is actually worth.",
  },
  {
    tag: "Who It's For",
    title: "SOLO, OR TOGETHER",
    desc: "For individuals working through their own career clarity — and for universities and colleges going through it as a group.",
  },
  {
    tag: "Format",
    title: "PLACEHOLDER — FRAMEWORK TBD",
    desc: "Placeholder — the real step-by-step framework hasn't been drafted yet.",
  },
];

const BRANDING_ITEMS: StackItem[] = [
  {
    tag: "Personal Brand",
    title: "THE VISIBILITY WORK",
    desc: "Personal brand building — the visibility work most engineers skip because the code was always supposed to speak for itself.",
  },
  {
    tag: "LinkedIn & Network",
    title: "LINKEDIN & NETWORKING AUTHORITY",
    desc: "Turning a quiet profile into one that reads as an authority — LinkedIn presence and the networking habits behind it.",
  },
  {
    tag: "Why It Matters",
    title: "SEEN, NOT JUST SKILLED",
    desc: "Being good at the work stops being enough once promotion and opportunity depend on being seen doing it.",
  },
  {
    tag: "Format",
    title: "PLACEHOLDER — FRAMEWORK TBD",
    desc: "Placeholder — the real step-by-step framework hasn't been drafted yet.",
  },
];

const CONSULTING_ITEMS: StackItem[] = [
  {
    tag: "Companies",
    title: "BROUGHT TO THE ROOM",
    desc: "Embedded, career, and interview topics — brought directly to the room for companies and university groups.",
  },
  {
    tag: "Engineering Colleges",
    title: "INTERNSHIP CONSULTING",
    desc: "Engineering-college internship consulting, grounded in two decades actually spent inside the embedded industry.",
  },
  {
    tag: "Format",
    title: "PLACEHOLDER — FORMAT TBD",
    desc: "Placeholder — the real engagement structure (format, duration, pricing) hasn't been drafted yet.",
  },
  {
    tag: "Who It's For",
    title: "COMPANIES & COLLEGES",
    desc: "For companies and university groups looking to bring real industry perspective into the room.",
  },
];

function StackCard(item: StackItem) {
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

      <div className={styles.intro}>
        <p className={`font-mono ${styles.eyebrow}`}>HOW IT&apos;S BUILT</p>
        <h2 className={`font-display ${styles.heading}`}>THREE PILLARS, ONE PRACTICE</h2>
        <p className={`font-body ${styles.subline}`}>
          Career fluency, technical branding, and consulting — each one solving a different half
          of the same problem: being good at the work isn&apos;t the same as being seen for it.
        </p>
      </div>

      <div className={styles.stacksRow}>
        <ShuffleStack items={CAREER_ITEMS} label="CAREER FLUENCY" renderCard={StackCard} />
        <ShuffleStack
          items={BRANDING_ITEMS}
          label="TECHNICAL BRANDING FLUENCY"
          renderCard={StackCard}
        />
        <ShuffleStack items={CONSULTING_ITEMS} label="BVE CONSULTING" renderCard={StackCard} />
      </div>
    </section>
  );
}

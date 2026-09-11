"use client";

import { ShuffleStack } from "./ShuffleStack";
import styles from "./Framework.module.css";

type StackItem = { tag: string; title: string; desc: string };

// DRAFT COPY, same convention as BVE's placeholder framework cards — these
// restate the feature-grid one-liners at slightly more length, not invented
// specifics. Swap for the real step-by-step framework once Vamsi drafts it.
const SETUP_ITEMS: StackItem[] = [
  {
    tag: "First Step",
    title: "ONE FREE SESSION",
    desc: "Everything starts with the free webinar — no commitment, just a clear look at how the system works.",
  },
  {
    tag: "Accounts",
    title: "WHAT YOU NEED, NOTHING MORE",
    desc: "A small set of digital tools set up once, so the system runs without adding another app to check daily.",
  },
  {
    tag: "Time",
    title: "BUILT AROUND YOUR JOB",
    desc: "Designed to run alongside an existing career or household schedule, not compete with it.",
  },
  {
    tag: "Format",
    title: "PLACEHOLDER — SETUP STEPS TBD",
    desc: "Placeholder — the real step-by-step setup sequence hasn't been drafted yet.",
  },
];

const VISIBILITY_ITEMS: StackItem[] = [
  {
    tag: "Personal Brand",
    title: "BEING FOUND, NOT CHASING",
    desc: "Personal-branding and digital-marketing basics, so people find your setup instead of you cold-messaging them.",
  },
  {
    tag: "Content",
    title: "A SIMPLE CONTENT RHYTHM",
    desc: "A small, repeatable posting routine — not a second full-time job in content creation.",
  },
  {
    tag: "Network",
    title: "GROWING IT ONLINE",
    desc: "Network-building skills built for digital reach, not door-to-door or catalogue selling.",
  },
  {
    tag: "Format",
    title: "PLACEHOLDER — CONTENT SYSTEM TBD",
    desc: "Placeholder — the real content system hasn't been drafted yet.",
  },
];

const CONSISTENCY_ITEMS: StackItem[] = [
  {
    tag: "Routine",
    title: "A FEW HOURS A WEEK",
    desc: "Consistency over hustle — a routine sized to fit around a job or family, not replace either.",
  },
  {
    tag: "Support",
    title: "NOT DOING IT ALONE",
    desc: "A system and a community around the process, so the routine has structure instead of guesswork.",
  },
  {
    tag: "Who It's For",
    title: "GURU & GOWRI",
    desc: "For the mid-career professional wanting a second income stream, and the working professional or homemaker wanting a flexible way to contribute financially.",
  },
  {
    tag: "Format",
    title: "PLACEHOLDER — MILESTONES TBD",
    desc: "Placeholder — the real progression milestones haven't been drafted yet.",
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

export default function Framework() {
  return (
    <section className={styles.section}>
      <div aria-hidden className={styles.glow} />

      <div className={styles.intro}>
        <p className={`font-mono ${styles.eyebrow}`}>HOW IT&apos;S BUILT</p>
        <h2 className={`font-display ${styles.heading}`}>ONE SYSTEM, THREE PARTS</h2>
        <p className={`font-body ${styles.subline}`}>
          Setup, visibility, and consistency — each one solving a different part of the same
          problem: a second income that runs alongside the life you already have, not instead of
          it.
        </p>
      </div>

      <div className={styles.stacksRow}>
        <ShuffleStack items={SETUP_ITEMS} label="THE SETUP" renderCard={StackCard} />
        <ShuffleStack
          items={VISIBILITY_ITEMS}
          label="VISIBILITY & CONTENT"
          renderCard={StackCard}
        />
        <ShuffleStack items={CONSISTENCY_ITEMS} label="CONSISTENCY SYSTEM" renderCard={StackCard} />
      </div>
    </section>
  );
}

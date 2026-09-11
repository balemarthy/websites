import styles from "./Battlefield.module.css";

// DRAFT COPY — the design skill (voice-copy.md) flags DNM's villain stack as
// "real open work, not yet brainstormed" and asks that it be flagged to
// Vamsi rather than invented from scratch. This is a starting scaffold built
// from the one locked constraint (the stagnation-mindset / job-only-income
// trap, never a specific employer or product) — treat it as a draft to
// review with Vamsi before shipping, not a finished villain stack.
const BEATS = [
  {
    tag: "Primary — The Trap",
    title: "ONE INCOME, ONE SWITCH",
    desc: "One paycheck means one point of failure — a layoff, a freeze, a slow year, and there's no second lever to pull.",
  },
  {
    tag: "Secondary — The Wait",
    title: "WAITING FOR THE RIGHT TIME",
    desc: "There's always a reason to wait — the timing, the workload, the energy. The system doesn't wait for that.",
  },
  {
    tag: "Shadow, Always Present — Comfort Of Stagnation",
    title: "ONE INCOME FEELS SAFE",
    desc: "It isn't.",
  },
];

export default function Battlefield() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={`font-mono ${styles.eyebrow}`}>THE REAL RISK</p>
        <h2 className={`font-display ${styles.heading}`}>
          ONE INCOME STREAM IS QUIETLY THE RISKIEST PLAN.
        </h2>

        <div className={styles.beats}>
          {BEATS.map((beat) => (
            <div key={beat.tag} className={styles.beat}>
              <p className={`font-mono ${styles.beatTag}`}>{beat.tag}</p>
              <p className={`font-display ${styles.beatTitle}`}>{beat.title}</p>
              <p className={`font-body ${styles.beatDesc}`}>{beat.desc}</p>
            </div>
          ))}
        </div>

        <p className={`font-body ${styles.closing}`}>
          None of this shows up on a payslip. It shows up later — in the month the one income
          stops, and there is nothing else running.
        </p>
      </div>
    </section>
  );
}

import styles from "./Battlefield.module.css";

const BEATS = [
  {
    tag: "Primary — Employee Mindset",
    title: "WAITING TO BE TOLD",
    desc: "Waiting to be told what's next, instead of building your own visibility.",
  },
  {
    tag: "Secondary — Upskill Loop",
    title: "MORE SKILLS, SAME SILENCE",
    desc: "Collecting more skills instead of translating the ones you already have.",
  },
  {
    tag: "Shadow, Always Present — Comfort of Invisibility",
    title: "STAYING UNSEEN FEELS SAFE",
    desc: "It isn't.",
  },
];

export default function Battlefield() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={`font-mono ${styles.eyebrow}`}>THE REAL ENEMY</p>
        <h2 className={`font-display ${styles.heading}`}>
          THREE THINGS ARE QUIETLY WORKING AGAINST YOU.
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
          None of these show up on a performance review. They show up later — in the offer that
          didn&apos;t come, the promotion that went to someone louder.
        </p>
      </div>
    </section>
  );
}

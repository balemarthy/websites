import styles from "./AboutAuthority.module.css";

const STATS = ["20+ YEARS", "WIPRO", "BOSCH", "CISCO", "DELL"];

export default function AboutAuthority() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <p className={`font-mono ${styles.eyebrow}`}>WHO&apos;S BEHIND THIS</p>
        <h2 className={`font-display ${styles.heading}`}>
          20+ YEARS INSIDE THE INDUSTRY, NOT AROUND IT.
        </h2>

        <div className={styles.statRow} aria-label="Companies">
          {STATS.map((s) => (
            <span key={s} className={`font-mono ${styles.stat}`}>
              {s}
            </span>
          ))}
        </div>

        <div className={styles.body}>
          <p className={`font-body ${styles.paragraph}`}>
            Two decades across Wipro, Bosch, Cisco, and Dell — inside embedded engineering teams,
            not adjacent to them. Not a course built from theory, or from watching the industry
            from a distance. The design reviews, the interview panels, the promotion cycles, the
            quiet politics of who gets noticed — seen from inside, for twenty years.
          </p>
          <p className={`font-body ${styles.paragraph}`}>
            Vamsi Media House runs on one discipline: build the work, then build the visibility
            around it — deliberately, not by accident. That same discipline is what BVE brings to
            your career.
          </p>
        </div>

        <p className={`font-display ${styles.reframe}`}>
          Your career is <span>not a job you show up to</span> — it&apos;s a one-person business
          you run.
        </p>
      </div>
    </section>
  );
}

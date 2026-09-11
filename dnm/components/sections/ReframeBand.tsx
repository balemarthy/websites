import styles from "./ReframeBand.module.css";

// Mandatory closing device per signature-devices.md — every DNM asset ends
// on this band. Statement is DRAFT COPY (see Hero.tsx note): the working
// reframe example from voice-copy.md, not yet confirmed with Vamsi.
export default function ReframeBand() {
  return (
    <section className={styles.band}>
      <p className={`font-mono ${styles.eyebrow}`}>DIGITAL NETWORK MARKETER</p>
      <p className={`font-display ${styles.statement}`}>
        A side income is not a second job. It&apos;s the first business you actually own.
      </p>
    </section>
  );
}

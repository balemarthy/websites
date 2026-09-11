import { ShieldCheck } from "lucide-react";
import styles from "./HowItWorks.module.css";

// DRAFT COPY — replaces the "about the founder" pattern used on ESC/BVE.
// DNM is fully faceless (see voice-copy.md), so this section describes the
// system, not a person — no name, likeness, or first-person "I" credibility
// claim belongs here.
export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <p className={`font-mono ${styles.eyebrow}`}>HOW THIS WORKS</p>
        <h2 className={`font-display ${styles.heading}`}>
          A SYSTEM, NOT A PERSONALITY.
        </h2>

        <div className={styles.badgeRow}>
          <div className={styles.badge}>
            <ShieldCheck size={20} strokeWidth={2} aria-hidden />
            <span className={`font-mono ${styles.badgeText}`}>NO PRESSURE, NO CHASING</span>
          </div>
        </div>

        <div className={styles.body}>
          <p className={`font-body ${styles.paragraph}`}>
            Digital Network Marketer teaches a system — digital marketing, personal branding,
            and network-building skills you run yourself, on your own time. There is no team to
            recruit, no product catalogue, and no pressure to convince friends and family to buy
            in.
          </p>
          <p className={`font-body ${styles.paragraph}`}>
            The free webinar walks through the system end to end before you decide anything.
            What you build afterward stays yours — a digital setup, a routine, and a growing
            network, run around the career or household you already have.
          </p>
        </div>

        <p className={`font-display ${styles.reframe}`}>
          This is <span>not a job you&apos;re joining</span> — it&apos;s a system you&apos;re
          learning to run.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import styles from "./ReframeBand.module.css";

type ReframeBandProps = {
  statement: string;
  variant?: "amber" | "navy";
  cta?: { label: string; href: string };
};

// Small, isolated port of DNM's ReframeBand pattern into BVE
// (bve-dnm-component-port-brief.md / bve-resume-review-build-prompt.md open
// item: "no dedicated reframe-band component exists in BVE yet"). No
// existing BVE call site to preserve, so statement is required, not
// defaulted.
export default function ReframeBand({ statement, variant = "amber", cta }: ReframeBandProps) {
  return (
    <section className={`${styles.band} ${variant === "navy" ? styles.bandNavy : ""}`}>
      <p className={`font-mono ${styles.eyebrow}`}>BALEMARTHY VAMSI</p>
      <p className={`font-display ${styles.statement}`}>{statement}</p>
      {cta && (
        <Link href={cta.href} className={`font-body ${styles.cta}`}>
          {cta.label}
        </Link>
      )}
    </section>
  );
}

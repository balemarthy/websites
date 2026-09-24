import Link from "next/link";
import styles from "./ReframeBand.module.css";

type ReframeBandProps = {
  statement?: string;
  variant?: "orange" | "teal";
  cta?: { label: string; href: string };
};

// Mandatory closing device per signature-devices.md — every DNM asset ends
// on this band. Default statement is DRAFT COPY (see Hero.tsx note): the
// working reframe example from voice-copy.md, not yet confirmed with Vamsi.
// Statement/variant/cta are now props (bve-dnm-component-port-brief.md
// follow-on) so child pages can carry their own reframe line without
// duplicating this component — the homepage call site (`<ReframeBand />`,
// no props) keeps rendering exactly what it did before.
export default function ReframeBand({
  statement = "A side income is not a second job. It's the first business you actually own.",
  variant = "orange",
  cta,
}: ReframeBandProps) {
  return (
    <section className={`${styles.band} ${variant === "teal" ? styles.bandTeal : ""}`}>
      <p className={`font-mono ${styles.eyebrow}`}>DIGITAL NETWORK MARKETER</p>
      <p className={`font-display ${styles.statement}`}>{statement}</p>
      {cta && (
        <Link href={cta.href} className={`font-body ${styles.cta}`}>
          {cta.label}
        </Link>
      )}
    </section>
  );
}

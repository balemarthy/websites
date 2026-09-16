import type { ReactNode } from "react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import styles from "./Callout.module.css";

type CalloutProps = {
  children: ReactNode;
  eyebrow?: string;
};

// Elevated "Dark Card" panel (per the design system's Card component spec —
// dark teal fill is the one large-surface use of Dark Teal the system
// permits) with a top orange rule. Reused for every "what we don't
// promise" / "no job guarantee" callout across both program pages.
export default function Callout({ children, eyebrow }: CalloutProps) {
  return (
    <AnimatedItem className={styles.card}>
      <div aria-hidden className={styles.rule} />
      {eyebrow && <span className={`font-display ${styles.eyebrow}`}>{eyebrow}</span>}
      <p className={`font-body ${styles.text}`}>{children}</p>
    </AnimatedItem>
  );
}

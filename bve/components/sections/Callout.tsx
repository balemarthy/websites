import type { ReactNode } from "react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import styles from "./Callout.module.css";

type CalloutProps = {
  children: ReactNode;
  eyebrow?: string;
};

// Ported from esc/components/sections/Callout.tsx (bve-dnm-component-port-brief.md
// Group 2) — dark elevated card with a top accent rule, repainted to BVE
// tokens. Used for the "nothing published yet" empty-state pattern.
export default function Callout({ children, eyebrow }: CalloutProps) {
  return (
    <AnimatedItem className={styles.card}>
      <div aria-hidden className={styles.rule} />
      {eyebrow && <span className={`font-display ${styles.eyebrow}`}>{eyebrow}</span>}
      <p className={`font-body ${styles.text}`}>{children}</p>
    </AnimatedItem>
  );
}

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import styles from "./RoadmapList.module.css";

export type RoadmapStep = {
  number: string;
  title: string;
  description: string;
};

type RoadmapListProps = {
  steps: RoadmapStep[];
};

// Ported from esc/components/sections/RoadmapList.tsx
// (bve-dnm-component-port-brief.md Group 2) — shared vertical numbered
// roadmap, repainted to BVE tokens. Numbered circles alternate
// accent/ink by index, connected by one vertical rule.
export default function RoadmapList({ steps }: RoadmapListProps) {
  return (
    <AnimatedSection className={styles.list}>
      <div aria-hidden className={styles.rule} />
      {steps.map((step, i) => (
        <AnimatedItem key={step.number} className={styles.row}>
          <span
            className={`font-display ${styles.marker} ${
              i % 2 === 0 ? styles.markerAccent : styles.markerInk
            }`}
          >
            {step.number}
          </span>
          <div className={styles.content}>
            <h3 className={`font-display ${styles.title}`}>{step.title}</h3>
            <p className={`font-body ${styles.description}`}>{step.description}</p>
          </div>
        </AnimatedItem>
      ))}
    </AnimatedSection>
  );
}

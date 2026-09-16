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

// Shared vertical numbered roadmap — used by both the Design page's "The
// Path" (6 steps) and the Architecture page's "The Roadmap" (5 sessions).
// Numbered circles alternate orange/teal by index, connected by one
// vertical rule, matching the existing source-PDF treatment.
export default function RoadmapList({ steps }: RoadmapListProps) {
  return (
    <AnimatedSection className={styles.list}>
      <div aria-hidden className={styles.rule} />
      {steps.map((step, i) => (
        <AnimatedItem key={step.number} className={styles.row}>
          <span
            className={`font-display ${styles.marker} ${
              i % 2 === 0 ? styles.markerOrange : styles.markerTeal
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

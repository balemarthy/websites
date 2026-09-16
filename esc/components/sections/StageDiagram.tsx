import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import styles from "./StageDiagram.module.css";

export type Stage = {
  marker: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

type StageDiagramProps = {
  stages: Stage[];
  intro?: string;
  closing?: string;
};

// Shared horizontal stage diagram — used by both the Design page's
// "Before We Begin: Hardware" (3 stages) and "...Software" (4 stages)
// blocks. Icon-line-drawing style (Lucide, 2px stroke) in a circle
// enclosure per the design system's IconTile spec, connected by a thin
// arrow rule — never photos.
export default function StageDiagram({ stages, intro, closing }: StageDiagramProps) {
  return (
    <AnimatedSection className={styles.wrap}>
      {intro && (
        <AnimatedItem>
          <p className={`font-body ${styles.intro}`}>{intro}</p>
        </AnimatedItem>
      )}

      <AnimatedItem className={styles.row}>
        {stages.map((stage, i) => (
          <div key={stage.label} className={styles.stageWrap}>
            <div className={styles.stage}>
              <div className={styles.iconRing}>
                <stage.icon size={26} strokeWidth={2} aria-hidden />
              </div>
              <span className={`font-mono ${styles.marker}`}>{stage.marker}</span>
              <h3 className={`font-display ${styles.label}`}>{stage.label}</h3>
              <p className={`font-body ${styles.description}`}>{stage.description}</p>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight aria-hidden className={styles.arrow} size={22} strokeWidth={2} />
            )}
          </div>
        ))}
      </AnimatedItem>

      {closing && (
        <AnimatedItem>
          <p className={`font-body ${styles.closing}`}>{closing}</p>
        </AnimatedItem>
      )}
    </AnimatedSection>
  );
}

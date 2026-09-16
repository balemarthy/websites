import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import styles from "./ProgramTestimonials.module.css";

export type ProgramTestimonial = {
  quote: string;
  nameRole: string;
};

type ProgramTestimonialsProps = {
  testimonials: ProgramTestimonial[];
};

// TODO(vamsi): replace with real testimonials for this cohort — placeholder content only
export default function ProgramTestimonials({ testimonials }: ProgramTestimonialsProps) {
  return (
    <AnimatedSection className={styles.wrap}>
      {process.env.NODE_ENV !== "production" && (
        <div className={styles.devBanner}>PLACEHOLDER TESTIMONIALS — replace before launch</div>
      )}

      <AnimatedItem>
        <span className={`font-display ${styles.eyebrow}`}>What People Say</span>
      </AnimatedItem>

      <div className={styles.grid}>
        {testimonials.map((t) => (
          <AnimatedItem key={t.nameRole} className={styles.card}>
            <p className={`font-body ${styles.quote}`}>&ldquo;{t.quote}&rdquo;</p>
            <p className={`font-mono ${styles.nameRole}`}>{t.nameRole}</p>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}

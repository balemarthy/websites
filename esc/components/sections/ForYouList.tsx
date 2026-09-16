import type { ReactNode } from "react";
import { X, Check } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import styles from "./ForYouList.module.css";

type ForYouListProps = {
  notForYou: ReactNode[];
  forYou: ReactNode[];
};

// "Who This Is Not For" / "For You If" — orange-marked "not for you" list
// beside a teal panel "for you" list, per the source PDF's two-column
// treatment. Items accept ReactNode (not just string) so the Architecture
// page's cross-link bullet to the Design program can embed a real <Link>.
export default function ForYouList({ notForYou, forYou }: ForYouListProps) {
  return (
    <AnimatedSection className={styles.grid}>
      <AnimatedItem className={styles.notForYouCol}>
        <span className={`font-display ${styles.heading} ${styles.notForYouHeading}`}>
          Not for you if…
        </span>
        <ul className={styles.list}>
          {notForYou.map((item, i) => (
            <li key={i} className={styles.notForYouItem}>
              <X aria-hidden size={18} strokeWidth={2} className={styles.notForYouIcon} />
              <span className={`font-body ${styles.itemText}`}>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedItem>

      <AnimatedItem className={styles.forYouCol}>
        <span className={`font-display ${styles.heading} ${styles.forYouHeading}`}>
          For you if…
        </span>
        <ul className={styles.list}>
          {forYou.map((item, i) => (
            <li key={i} className={styles.forYouItem}>
              <Check aria-hidden size={18} strokeWidth={2} className={styles.forYouIcon} />
              <span className={`font-body ${styles.itemText}`}>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedItem>
    </AnimatedSection>
  );
}

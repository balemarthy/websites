"use client";

import { ShuffleStack } from "./ShuffleStack";
import styles from "./Testimonials.module.css";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

type Testimonial = { quote: string; nameRole: string };

// Placeholder — clearly not real testimonials, swap once Vamsi provides
// actual mentee quotes.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real mentee quote once available.",
    nameRole: "Mentee Name 1 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real mentee quote once available.",
    nameRole: "Mentee Name 2 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real mentee quote once available.",
    nameRole: "Mentee Name 3 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 4 — swap with a real mentee quote once available.",
    nameRole: "Mentee Name 4 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 5 — swap with a real mentee quote once available.",
    nameRole: "Mentee Name 5 · Role, Company",
  },
];

function TestimonialCard(item: Testimonial) {
  return (
    <>
      <div aria-hidden className={styles.stars}>
        ★★★★★
      </div>
      <p className={`font-body ${styles.quote}`}>{item.quote}</p>
      <p className={`font-mono ${styles.nameRole}`}>{item.nameRole}</p>
    </>
  );
}

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <AnimatedSection>
        <AnimatedItem className={styles.intro}>
          <p className={`font-mono ${styles.eyebrow}`}>WHAT PEOPLE SAY</p>
          <h2 className={`font-display ${styles.heading}`}>AFTER THE PROGRAMME</h2>
        </AnimatedItem>
      </AnimatedSection>

      <div className={styles.stackCenter}>
        <ShuffleStack items={TESTIMONIALS} renderCard={TestimonialCard} />
      </div>
    </section>
  );
}

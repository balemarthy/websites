"use client";

import { ShuffleStack } from "./ShuffleStack";
import styles from "./Testimonials.module.css";

type Testimonial = { quote: string; nameRole: string };

// Placeholder — clearly not real testimonials, swap once Vamsi provides
// actual participant quotes. Names should stay first-name-and-initial or
// role-only unless the real participant has agreed to be identified.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real participant quote once available.",
    nameRole: "Participant Name 1 · Role / City",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real participant quote once available.",
    nameRole: "Participant Name 2 · Role / City",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real participant quote once available.",
    nameRole: "Participant Name 3 · Role / City",
  },
  {
    quote: "Placeholder testimonial quote 4 — swap with a real participant quote once available.",
    nameRole: "Participant Name 4 · Role / City",
  },
  {
    quote: "Placeholder testimonial quote 5 — swap with a real participant quote once available.",
    nameRole: "Participant Name 5 · Role / City",
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
    <section id="testimonials" className={styles.section}>
      <div className={styles.intro}>
        <p className={`font-mono ${styles.eyebrow}`}>WHAT PEOPLE SAY</p>
        <h2 className={`font-display ${styles.heading}`}>AFTER THE FREE WEBINAR</h2>
      </div>

      <div className={styles.stackCenter}>
        <ShuffleStack items={TESTIMONIALS} renderCard={TestimonialCard} />
      </div>
    </section>
  );
}

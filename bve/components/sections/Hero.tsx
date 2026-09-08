import styles from "./Hero.module.css";

// PLACEHOLDER animated hero — plain CSS keyframes (fade + rise), matching the
// compositor-driven animation approach established for this pipeline
// (framer-motion's rAF-driven AnimatePresence proved unreliable in headless
// test tooling; CSS transitions/keyframes did not). Swap copy/art once the
// real brand and messaging are ready.
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={`font-display ${styles.heading}`}>
          BVE — placeholder hero heading
        </h1>
        <p className={`font-body ${styles.subline}`}>
          Placeholder subline. Replace with real positioning copy once the brand is defined.
        </p>
      </div>
    </section>
  );
}

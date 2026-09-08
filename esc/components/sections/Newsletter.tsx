"use client";

import type { FormEvent } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up GHL (GoHighLevel) newsletter integration. This form does
    // not submit anywhere yet — markup and styling only.
  }

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={`font-display ${styles.heading}`}>STAY AHEAD OF THE CURVE</h2>

        <form className={styles.pill} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className={`font-body ${styles.input}`}
          />
          <button type="submit" className={`font-body ${styles.button}`}>
            Subscribe
          </button>
        </form>

        <p className={`font-body ${styles.microcopy}`}>No spam, unsubscribe anytime.</p>
      </div>
    </section>
  );
}

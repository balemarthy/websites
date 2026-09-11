"use client";

import type { FormEvent } from "react";
import styles from "./WebinarCTA.module.css";

export default function WebinarCTA() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this to the real webinar registration flow (GHL form embed
    // or similar — see landing-page-spec.md). This form does not submit
    // anywhere yet — markup and styling only.
  }

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={`font-display ${styles.heading}`}>Reserve Your Free Seat</h2>
        <p className={`font-body ${styles.subline}`}>
          One free webinar — walks through the full system before you decide anything.
        </p>

        <form className={styles.pill} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className={`font-body ${styles.input}`}
          />
          <button type="submit" className={`font-body ${styles.button}`}>
            Register Free
          </button>
        </form>

        <p className={`font-body ${styles.microcopy}`}>No pressure, no chasing — just the session.</p>
      </div>
    </section>
  );
}

"use client";

import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import styles from "./ApplyForm.module.css";

type ApplyFormProps = {
  programLabel: string;
  qualifyingQuestion: string;
};

// Ported from esc/components/sections/ApplyForm.tsx
// (bve-dnm-component-port-brief.md Group 2) — placeholder qualifying-question
// form, no backend wired (matches ESC's own current stub state), repainted
// to DNM tokens.
export default function ApplyForm({ programLabel, qualifyingQuestion }: ApplyFormProps) {
  // TODO(vamsi): wire to real backend — no submission handler yet
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.devBanner}>
        PLACEHOLDER FORM — not wired to a backend. Submitting does nothing yet.
      </div>

      <h1 className={`font-display ${styles.heading}`}>Apply — {programLabel}</h1>
      <p className={`font-body ${styles.subline}`}>
        Leave your details below. Once the real application flow is wired up, this form will route
        straight into it.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          <span className={`font-body ${styles.label}`}>Name</span>
          <input type="text" name="name" required className={`font-body ${styles.input}`} />
        </label>

        <label className={styles.field}>
          <span className={`font-body ${styles.label}`}>Email</span>
          <input type="email" name="email" required className={`font-body ${styles.input}`} />
        </label>

        <label className={styles.field}>
          <span className={`font-body ${styles.label}`}>{qualifyingQuestion}</span>
          <textarea name="qualifier" rows={4} required className={`font-body ${styles.textarea}`} />
        </label>

        <Button variant="primary" type="submit" className={styles.submit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

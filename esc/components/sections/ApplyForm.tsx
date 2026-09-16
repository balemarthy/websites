"use client";

import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import styles from "./ApplyForm.module.css";

type ApplyFormProps = {
  programLabel: string;
  qualifyingQuestion: string;
};

// Placeholder application form — no backend wired yet. See BACKEND-TODO.md
// at the repo root for the full list of stubbed forms/routes this build
// created.
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
          <input type="text" name="name" required className={styles.input} />
        </label>

        <label className={styles.field}>
          <span className={`font-body ${styles.label}`}>Email</span>
          <input type="email" name="email" required className={styles.input} />
        </label>

        <label className={styles.field}>
          <span className={`font-body ${styles.label}`}>{qualifyingQuestion}</span>
          <textarea name="qualifier" rows={4} required className={styles.textarea} />
        </label>

        <Button variant="primary" type="submit" className={styles.submit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

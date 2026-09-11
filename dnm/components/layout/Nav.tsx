"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "What's Inside", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

// Wordmark is the one DNM-specific visual element (see signature-devices.md):
// "Digital" and "Marketer" in ink, "Network" in orange, always as one word.
// TODO: once a real logo file exists, swap this for an <Image> here — keep
// it inside .logoChip with a max-height/width so it inherits the same
// shrink behavior on narrow screens (see .logoChip in Nav.module.css).
function Wordmark() {
  return (
    <span className={`font-display ${styles.wordmark}`}>
      Digital<span className={styles.wordmarkAccent}>Network</span>Marketer
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Single flex bar — logo and the right-hand CTA/hamburger group are
          flex siblings sharing one row, not two independently fixed
          elements. The logo shrinks (see .logoChip) before it can ever
          collide with the right group, at any viewport width. */}
      <div className={styles.bar}>
        <a href="/" className={styles.logoChip} aria-label="Digital Network Marketer — home">
          <Wordmark />
        </a>

        <div className={styles.rightGroup}>
          {/* Primary CTA — desktop only, scrolls to the webinar registration form */}
          <a href="#register" className={`font-body ${styles.cta}`}>
            Register Free
          </a>

          {/* Mobile: compact CTA + hamburger toggle, compact panel anchored below it */}
          <div className={styles.mobileWrap}>
            <a href="#register" className={`font-body ${styles.ctaMobile}`}>
              Register
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={styles.hamburger}
            >
              {open ? (
                <X size={20} strokeWidth={2} aria-hidden />
              ) : (
                <Menu size={20} strokeWidth={2} aria-hidden />
              )}
            </button>

            <div className={`font-body ${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.mobilePanelItem}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: floating Paper pill, centered — independent of the bar
          above, only ever visible at >=1024px where there's room for all
          three (logo, pill, CTA) without any collision. */}
      <nav className={`font-body ${styles.pill}`} aria-label="Primary">
        <div className={styles.desktopItems}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navItem}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

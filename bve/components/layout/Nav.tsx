"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "Career Fluency", href: "/career-fluency" },
  { label: "Technical Branding", href: "/technical-branding" },
  { label: "Consulting", href: "/consulting" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a href="/" className={styles.logoChip} aria-label="BVE — Balemarthy Vamsi Enterprises">
        <Image
          src="/logo/bve-logo-compact.png"
          alt="BVE"
          width={200}
          height={80}
          priority
          className={styles.logoImg}
        />
      </a>

      {/* Desktop: floating Paper pill, centered */}
      <nav className={`font-body ${styles.pill}`} aria-label="Primary">
        <div className={styles.desktopItems}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navItem}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile: hamburger toggle, compact panel anchored below it */}
      <div className={styles.mobileWrap}>
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
    </>
  );
}

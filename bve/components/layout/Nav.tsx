"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "Career Fluency", href: "/career-fluency" },
  { label: "Technical Branding", href: "/technical-branding" },
  { label: "Consulting", href: "/consulting" },
  { label: "Colleges", href: "/colleges" },
];

const SERVICES_LINKS = [
  { label: "Resume Review", href: "/resume-review" },
  { label: "LinkedIn Profile", href: "/linkedin-profile" },
];

const TRAILING_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Downloads", href: "/downloads" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
            <Link key={link.href} href={link.href} className={styles.navItem}>
              {link.label}
            </Link>
          ))}

          <div
            className={styles.servicesWrap}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={styles.navItem}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
            </button>
            <div className={`${styles.servicesPanel} ${servicesOpen ? styles.servicesPanelOpen : ""}`}>
              {SERVICES_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.servicesPanelItem}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {TRAILING_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navItem}>
              {link.label}
            </Link>
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
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobilePanelItem}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            className={styles.mobilePanelItem}
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen((v) => !v)}
          >
            Services
          </button>
          {mobileServicesOpen &&
            SERVICES_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobilePanelSubItem}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          {TRAILING_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobilePanelItem}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

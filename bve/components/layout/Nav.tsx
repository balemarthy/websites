"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./Nav.module.css";

const PRIMARY_LINK = { label: "Clarity & Visibility", href: "/clarity-visibility" };

const CONSULTING_LINKS = [
  { label: "Industry Consulting", href: "/industry-consulting" },
  { label: "Campus To Career", href: "/campus-to-career" },
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [consultingOpen, setConsultingOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileConsultingOpen, setMobileConsultingOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setConsultingOpen(false);
    setServicesOpen(false);
    setOpen(false);
    setMobileConsultingOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const consultingActive = CONSULTING_LINKS.some((link) => pathname === link.href);
  const servicesActive = SERVICES_LINKS.some((link) => pathname === link.href);
  const isHomeActive = pathname === "/";

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
          <Link href="/" className={`${styles.navItem} ${isHomeActive ? styles.navItemActive : ""}`}>
            Home
          </Link>
          <Link
            href={PRIMARY_LINK.href}
            className={`${styles.navItem} ${pathname === PRIMARY_LINK.href ? styles.navItemActive : ""}`}
          >
            {PRIMARY_LINK.label}
          </Link>

          <div
            className={styles.dropdownWrap}
            onMouseEnter={() => setConsultingOpen(true)}
            onMouseLeave={() => setConsultingOpen(false)}
          >
            <button
              type="button"
              className={`${styles.navItem} ${consultingOpen || consultingActive ? styles.navItemActive : ""}`}
              aria-haspopup="true"
              aria-expanded={consultingOpen}
              onClick={() => setConsultingOpen((v) => !v)}
            >
              Consulting
            </button>
            <div className={`${styles.dropdownPanel} ${consultingOpen ? styles.dropdownPanelOpen : ""}`}>
              {CONSULTING_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.dropdownPanelItem} ${pathname === link.href ? styles.dropdownPanelItemActive : ""}`}
                  onClick={() => setConsultingOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={styles.dropdownWrap}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`${styles.navItem} ${servicesOpen || servicesActive ? styles.navItemActive : ""}`}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
            </button>
            <div className={`${styles.dropdownPanel} ${servicesOpen ? styles.dropdownPanelOpen : ""}`}>
              {SERVICES_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.dropdownPanelItem} ${pathname === link.href ? styles.dropdownPanelItemActive : ""}`}
                  onClick={() => setServicesOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {TRAILING_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navItem} ${pathname === link.href ? styles.navItemActive : ""}`}
            >
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
          <Link
            href="/"
            className={`${styles.mobilePanelItem} ${isHomeActive ? styles.mobilePanelItemActive : ""}`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href={PRIMARY_LINK.href}
            className={`${styles.mobilePanelItem} ${pathname === PRIMARY_LINK.href ? styles.mobilePanelItemActive : ""}`}
            onClick={() => setOpen(false)}
          >
            {PRIMARY_LINK.label}
          </Link>

          <button
            type="button"
            className={`${styles.mobilePanelItem} ${consultingActive ? styles.mobilePanelItemActive : ""}`}
            aria-expanded={mobileConsultingOpen}
            onClick={() => setMobileConsultingOpen((v) => !v)}
          >
            Consulting
          </button>
          {mobileConsultingOpen &&
            CONSULTING_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobilePanelSubItem} ${pathname === link.href ? styles.mobilePanelSubItemActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          <button
            type="button"
            className={`${styles.mobilePanelItem} ${servicesActive ? styles.mobilePanelItemActive : ""}`}
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
                className={`${styles.mobilePanelSubItem} ${pathname === link.href ? styles.mobilePanelSubItemActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          {TRAILING_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobilePanelItem} ${pathname === link.href ? styles.mobilePanelItemActive : ""}`}
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

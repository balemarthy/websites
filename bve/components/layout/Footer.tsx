import styles from "./Footer.module.css";

// PLACEHOLDER footer — minimal/temporary, same convention as ESC's Footer.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={`font-mono ${styles.copyright}`}>© 2026 BVE</p>
    </footer>
  );
}

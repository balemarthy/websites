import { Linkedin, Youtube, Instagram } from "lucide-react";
import styles from "./Footer.module.css";

// Placeholder footer — not final, just enough so the page doesn't end
// abruptly. hrefs are "#" until real destinations exist.
const SOCIAL_LINKS: Array<{ label: string; href: string; Icon?: typeof Linkedin }> = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "Instagram", href: "#", Icon: Instagram },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={`font-display ${styles.wordmark}`}>
        Digital<span className={styles.wordmarkAccent}>Network</span>Marketer
      </p>

      <div className={styles.socialRow}>
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label} className={styles.socialLink}>
            {Icon ? <Icon size={22} strokeWidth={2} aria-hidden /> : label}
          </a>
        ))}
      </div>

      <p className={`font-mono ${styles.copyright}`}>© 2026 DigitalNetworkMarketer.in</p>
    </footer>
  );
}

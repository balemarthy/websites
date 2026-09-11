import { Smartphone, Share2, TrendingUp } from "lucide-react";
import styles from "./FeatureGrid.module.css";

// DRAFT COPY — see Hero.tsx note. These three cards describe the system at
// a high level; refine wording with Vamsi once DNM's framework specifics
// are locked.
const FEATURES = [
  {
    Icon: Smartphone,
    eyebrow: "Setup",
    title: "A Digital Setup, Not A Sales Pitch",
    desc: "The tools and accounts you need to run this alongside your job — set up once, not chased door to door.",
  },
  {
    Icon: Share2,
    eyebrow: "Growth",
    title: "Systems For Network Growth",
    desc: "Digital marketing and personal-branding skills that build a network online — no cold calls, no catalogue.",
  },
  {
    Icon: TrendingUp,
    eyebrow: "Practice",
    title: "Consistency Over Hustle",
    desc: "A small, repeatable weekly routine, built to run around an existing career — not replace your free time with a second job.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.intro}>
        <p className={`font-mono ${styles.eyebrow}`}>What&apos;s Inside</p>
        <h2 className={`font-display ${styles.heading}`}>The Framework at a Glance</h2>
        <div aria-hidden className={styles.rule} />
      </div>

      <div className={styles.grid}>
        {FEATURES.map(({ Icon, eyebrow, title, desc }) => (
          <div key={title} className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon size={24} strokeWidth={2} aria-hidden />
            </div>
            <span className={`font-mono ${styles.cardEyebrow}`}>{eyebrow}</span>
            <h3 className={`font-display ${styles.cardTitle}`}>{title}</h3>
            <p className={`font-body ${styles.desc}`}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

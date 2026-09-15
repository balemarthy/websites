import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";

const STATEMENTS = [
  "I shipped it. Could I defend every decision in it?",
  "Most of it was instinct. Not reasoning.",
  "A folder of files nobody can explain six months later.",
  "I did a project — mostly by copying and guessing.",
  "Real project experience isn't the same as real fundamentals.",
  "I know it works. I don't know why it's designed this way.",
];

export default function EmbeddedSoftwareArchitecturePage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero statements={STATEMENTS} />
      <Footer />
    </main>
  );
}

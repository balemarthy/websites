import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";

const STATEMENTS = [
  "I can make it work. I just can't explain why.",
  "A tutorial said configure this register. So I did.",
  "It works — until someone asks me to change it.",
  "Am I actually good at this?",
  "Is embedded even the right field for me?",
  "Years of experience. Still not fluent.",
];

export default function EmbeddedSoftwareDesignPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero statements={STATEMENTS} />
      <Footer />
    </main>
  );
}

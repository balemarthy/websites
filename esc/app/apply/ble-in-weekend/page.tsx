import Footer from "@/components/layout/Footer";
import ApplyForm from "@/components/sections/ApplyForm";

export default function ApplyBleInWeekendPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <ApplyForm
        programLabel="BLE In Weekend"
        qualifyingQuestion="What's a BLE connection you've shipped that you couldn't fully explain when someone asked how it actually works?"
      />
      <Footer />
    </main>
  );
}

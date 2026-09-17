import Footer from "@/components/layout/Footer";
import ApplyForm from "@/components/sections/ApplyForm";

export default function ApplyLm75DriverArchitecturePage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <ApplyForm
        programLabel="LM75 Driver Architecture"
        qualifyingQuestion="What's a driver you've written that you're not sure survives being moved to a different platform?"
      />
      <Footer />
    </main>
  );
}

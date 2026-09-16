import Footer from "@/components/layout/Footer";
import ApplyForm from "@/components/sections/ApplyForm";

export default function ApplyEmbeddedSoftwareArchitecturePage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <ApplyForm
        programLabel="Embedded Software Architecture"
        qualifyingQuestion="What's something you've shipped that you'd want to be able to defend, decision by decision?"
      />
      <Footer />
    </main>
  );
}

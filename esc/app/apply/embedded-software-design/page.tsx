import Footer from "@/components/layout/Footer";
import ApplyForm from "@/components/sections/ApplyForm";

export default function ApplyEmbeddedSoftwareDesignPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <ApplyForm
        programLabel="Embedded Software Design"
        qualifyingQuestion="What's one thing you've built that you can't fully explain the reasoning behind?"
      />
      <Footer />
    </main>
  );
}

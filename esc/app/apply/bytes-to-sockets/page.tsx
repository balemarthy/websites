import Footer from "@/components/layout/Footer";
import ApplyForm from "@/components/sections/ApplyForm";

export default function ApplyBytesToSocketsPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <ApplyForm
        programLabel="Bytes to Sockets"
        qualifyingQuestion="What's a networking issue you've hit that you couldn't debug because you didn't know what layer to look at?"
      />
      <Footer />
    </main>
  );
}

import Footer from "@/components/layout/Footer";

export default function BleInWeekendPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <h1
          className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl"
          style={{ color: "var(--teal-800)" }}
        >
          BLE IN WEEKEND
        </h1>
        <p className="font-body mt-4 text-base" style={{ color: "var(--teal-600)" }}>
          Content in progress. Check back soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}

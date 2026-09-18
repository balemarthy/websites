import { FileText, Radio, Layers } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Callout from "@/components/sections/Callout";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// No-hero listing tier (page-factory-system.md): thumbnails + light content,
// no big hero — this page's only job is to route the visitor onward.
//
// Content status, 2026-09-18: these three are real, confirmed-in-progress
// ESC deep-content pieces (esc-pdf-content.md), priced on the existing
// ₹99–₹299 lead-magnet band — but the actual PDF files weren't found in any
// connected folder while building this page, and the ₹ figures below are
// placeholders within that band, not confirmed per-title. TODO(vamsi):
// (1) locate/export the finished PDFs into esc/public/downloads/,
// (2) confirm or correct each price, (3) each "Get This" button below is a
// stub (no href) until its GHL landing page exists — per page-factory-
// system.md, each lead magnet's actual conversion page lives in GHL, not
// here; this index just lists and routes to it.
const DOWNLOADS = [
  {
    icon: Layers,
    title: "Embedded C Design Patterns",
    description:
      "Object, Opaque, Callback, and Singleton patterns — four ways experienced firmware engineers structure C without a class keyword.",
    price: "₹199",
  },
  {
    icon: Radio,
    title: "GET-SET Protocol Specification",
    description:
      "A worked protocol spec, written the way a real one gets documented — not a toy example.",
    price: "₹149",
  },
  {
    icon: FileText,
    title: "Zero-Copy UART Command Handler",
    description:
      "Requirements document for a zero-copy UART command handler — the constraints and decisions, not just the final code.",
    price: "₹149",
  },
];

export default function DownloadsPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <section className="bg-esc-paper px-6 pb-6 pt-20 text-center sm:px-10 sm:pt-28 lg:px-16">
        <AnimatedSection className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
          <AnimatedItem>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-esc-teal">
              Downloads
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-4xl">
              Deep content, not summaries
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Priced pieces that go deeper than a free post can — written the way the programs are
              built, evidence and reasoning first.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto grid max-w-[960px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOWNLOADS.map((item) => (
            <AnimatedItem
              key={item.title}
              className="flex flex-col gap-4 rounded-xl border border-esc-dark-teal/10 bg-white p-6 shadow-esc-sm"
            >
              <item.icon aria-hidden size={28} strokeWidth={2} className="text-esc-orange" />
              <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal">
                {item.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-esc-dark-teal">
                {item.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-mono text-sm text-esc-teal">{item.price}</span>
                <Button variant="outline" href="#">
                  Get This →
                </Button>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </section>

      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[640px]">
          <Callout eyebrow="More Coming">
            This list grows as new deep-content pieces get finished — each one built the same way
            the programs are, from what actually works, not repackaged theory.
          </Callout>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}

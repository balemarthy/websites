import { Layers, CircuitBoard, Radio, Terminal } from "lucide-react";
import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";
import ScrollStatement from "@/components/sections/ScrollStatement";
import StageDiagram from "@/components/sections/StageDiagram";
import ForYouList from "@/components/sections/ForYouList";
import Callout from "@/components/sections/Callout";
import ProgramTestimonials from "@/components/sections/ProgramTestimonials";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const STATEMENTS = [
  "ETHERNET FRAME — MAC / FCS",
  "IP PACKET — SRC/DST IP · TTL",
  "TCP SEGMENT — PORTS · SEQ/ACK",
  "PAYLOAD — SDU",
];

// Workflow D — the source material's own promise line, verbatim. Don't paraphrase.
const SCROLL_PHRASES = [
  "By the end of this weekend,",
  "you'll have captured real network traffic,",
  "read it byte by byte,",
  "and written the code behind it —",
  "yourself.",
];

const MECHANISM_STAGES = [
  {
    marker: "1",
    icon: Layers,
    label: "Protocol Theory",
    description:
      "Encapsulation as a shipping journey, then the naive-switch-statement vs. state-transition-table split that separates a demo from something maintainable.",
  },
  {
    marker: "2",
    icon: CircuitBoard,
    label: "Hardware Show & Tell",
    description:
      "Three real boards — W5500, STM32, nRF52840 — each answering differently: where does silicon end and your code begin.",
  },
  {
    marker: "3",
    icon: Radio,
    label: "Two Live Demos",
    description:
      "HTTP over TCP and TFTP over UDP, same Wireshark window, two completely different design philosophies, both visible in the packets.",
  },
  {
    marker: "4",
    icon: Terminal,
    label: "Socket Programming",
    description:
      "The Unix truth that a socket is just a file descriptor — then writing the exact call a browser makes, yourself, from scratch.",
  },
];

const NOT_FOR_YOU = [
  "You're looking for a certification — this is a rep, not a credential.",
  "You want someone to hand you notes instead of a packet you decoded yourself.",
  "\"I'll get to it later\" is where this goes after you buy it — the weekend only pays off if you actually run the demos.",
];

const FOR_YOU = [
  "You've shipped firmware but never opened Wireshark on purpose.",
  "You want to debug the network layer instead of escalating it to someone else.",
  "You're staring at a job description that suddenly wants \"networking fundamentals\" next to \"RTOS.\"",
];

// TODO(vamsi): replace with real testimonials once this has run as a paid product — placeholder content only
const TESTIMONIALS = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real Bytes to Sockets cohort quote once available.",
    nameRole: "Mentee Name 1 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real Bytes to Sockets cohort quote once available.",
    nameRole: "Mentee Name 2 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real Bytes to Sockets cohort quote once available.",
    nameRole: "Mentee Name 3 · Role, Company",
  },
];

function SectionHeading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <AnimatedItem className="mb-10 flex flex-col items-center gap-3 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-esc-teal">{eyebrow}</span>
      <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-esc-dark-teal sm:text-3xl">
        {heading}
      </h2>
    </AnimatedItem>
  );
}

export default function BytesToSocketsPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero
        statements={STATEMENTS}
        modelPath="/models/bytes-to-sockets-hero.glb"
        backgroundImage="/images/hero/bytes-to-sockets-hero-bg.jpg"
        pageTitle="Bytes to Sockets"
      />

      <ScrollStatement phrases={SCROLL_PHRASES} />

      {/* What's In It For You */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              There&apos;s a JD sitting somewhere in your feed right now that pairs &ldquo;RTOS&rdquo;
              with &ldquo;networking fundamentals&rdquo; in the same paragraph. You&apos;ve got the
              first half. This weekend gets you the second.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              You&apos;ve debugged registers. You&apos;ve traced interrupts. The moment a packet
              leaves your device, though, it turns into someone else&apos;s problem — a black box
              you send bytes into and hope. That gap costs you three ways: you can&apos;t debug a
              network issue without guessing, you can&apos;t hold a conversation about security or
              AI infrastructure without the protocol layer underneath it, and your resume reads
              &ldquo;embedded&rdquo; when the job increasingly wants &ldquo;embedded that also
              understands the wire.&rdquo;
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              This weekend closes that gap the same way you&apos;d learn any other layer of the
              stack — by opening it up and watching it work. You&apos;ll capture live traffic in
              Wireshark, read an HTTP request byte-by-byte through three protocol layers, watch a
              TCP handshake execute the exact state-transition table you built on paper, then write
              your own socket code from scratch — no requests library, no urllib, just{" "}
              <code>socket()</code>, <code>connect()</code>, <code>send()</code>,{" "}
              <code>recv()</code>.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What We Promise">
            The next time a device you built can&apos;t talk to something — a socket that
            won&apos;t connect, a request that times out, a packet that never arrives — you&apos;ll
            know exactly which layer to open first. Not because you memorized a diagram. Because
            you&apos;ve already opened one, live, and watched where it broke.
          </Callout>
        </AnimatedSection>
      </section>

      {/* Early CTA */}
      <section className="bg-esc-paper px-6 py-8 sm:px-10 lg:px-16">
        <AnimatedSection className="mx-auto max-w-[560px] text-center">
          <AnimatedItem>
            <Button variant="outline" href="/apply/bytes-to-sockets">
              See What&apos;s Inside the Weekend →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* Mechanism */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading eyebrow="How The Weekend Works" heading="The Mechanism" />
        <StageDiagram stages={MECHANISM_STAGES} />
      </section>

      {/* Qualifying block */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <ForYouList notForYou={NOT_FOR_YOU} forYou={FOR_YOU} />

        <AnimatedItem className="mt-8 flex justify-center">
          <Button variant="outline" href="/apply/bytes-to-sockets">
            Reserve Your Spot →
          </Button>
        </AnimatedItem>
      </section>

      {/* Testimonials */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <ProgramTestimonials testimonials={TESTIMONIALS} />
      </section>

      {/* What You Walk Away With */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading eyebrow="After This Weekend" heading="What You Walk Away With" />
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem>
            <p className="text-center font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              You walk away with a TCP client you wrote from raw sockets, a decoded HTTP and TFTP
              capture you can reference the next time something breaks, and the state-transition-table
              mental model applied to a protocol you watched execute live, not just read about.
            </p>
          </AnimatedItem>
          <Callout>
            No guarantee that you&apos;ll master networking in a weekend — nobody does, and anyone
            promising that is selling the certification, not the skill. What you get is the first
            real rep: the one that turns &ldquo;I read about sockets once&rdquo; into &ldquo;I&apos;ve
            written socket code and watched it hit the wire.&rdquo;
          </Callout>
        </AnimatedSection>
      </section>

      {/* Format / Price / Primary CTA */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <p className="font-body text-base text-esc-dark-teal">
              Live, cohort-style. One weekend session.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm leading-relaxed text-esc-teal">
              This isn&apos;t a slice of the multi-month Software Design or Architecture
              programmes — it&apos;s a focused, single-weekend rep on a skill most embedded
              engineers never open on purpose: the wire itself. That focus is exactly why it&apos;s
              priced as an entry point, not a fraction of a full programme.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <span className="font-display text-4xl font-extrabold text-esc-dark-teal">₹3,999</span>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              variant="primary"
              href="/apply/bytes-to-sockets"
              className="mt-2"
              style={{ boxShadow: "0 0 20px 4px rgba(240,120,57,.3), 0 4px 12px rgba(240,120,57,.3)" }}
            >
              Write The Code Yourself
            </Button>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm text-esc-teal">
              One weekend. ₹3,999 once. No prerequisites beyond basic C.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}

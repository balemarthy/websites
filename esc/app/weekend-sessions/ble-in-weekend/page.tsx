import { Radio, Waves, Bell, Terminal } from "lucide-react";
import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";
import ScrollStatement from "@/components/sections/ScrollStatement";
import StageDiagram from "@/components/sections/StageDiagram";
import ForYouList from "@/components/sections/ForYouList";
import Callout from "@/components/sections/Callout";
import ProgramTestimonials from "@/components/sections/ProgramTestimonials";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// Workflow D — the source material's own promise line, verbatim. Don't paraphrase.
const SCROLL_PHRASES = [
  "By the end of this weekend,",
  "you'll have watched a BLE connection form,",
  "widen, and move data —",
  "live, on both sides, at the packet level —",
  "yourself.",
];

const MECHANISM_STAGES = [
  {
    marker: "1",
    icon: Radio,
    label: "GAP Basics — Connection Forms",
    description:
      "A live central and peripheral, watched from both sides — advertising, connect, disconnect — the two-stage HCI dispatch and workqueue pattern every later stage reuses.",
  },
  {
    marker: "2",
    icon: Waves,
    label: "MTU Exchange — Channel Widens",
    description:
      "The deepest trace of the weekend. A prediction about Zephyr's own RX queue gets directly contradicted live — not a k_fifo, a spinlock-protected list — tied to a real ARM BASEPRI register manipulation, single-stepped.",
  },
  {
    marker: "3",
    icon: Bell,
    label: "GATT Notify — Data Moves Unprompted",
    description:
      "Active scanning captured live (SCAN_REQ/SCAN_RSP), then the notify path traced straight out of main()'s loop — and the TX semaphore actually controlling the flow.",
  },
  {
    marker: "4",
    icon: Terminal,
    label: "The Debug Rig — Two GDBs, One Truth",
    description:
      "The setup itself: Renode simulation, dual-GDB attach on both sides of the connection, Wireshark on the wire — the same rig, reusable on your own boards the day BLE does something you didn't ask for.",
  },
];

const NOT_FOR_YOU = [
  "You're looking for a certification — this is a rep, not a credential.",
  "You want a slide deck explaining BLE instead of a debugger attached to a real connection.",
  "You've never touched C or a debugger before — this assumes you already know your way around a breakpoint, just not around this stack.",
];

const FOR_YOU = [
  "You've shipped BLE firmware that works, but you've never traced what \"works\" means at the packet level.",
  "You want to debug a connection instead of restarting the peripheral and hoping.",
  "You're staring at a JD that puts \"BLE\" and \"RTOS\" in the same sentence, and only one of them is currently true about you.",
];

// TODO(vamsi): replace with real testimonials once this has run as a paid product — placeholder content only
const TESTIMONIALS = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real BLE In Weekend cohort quote once available.",
    nameRole: "Mentee Name 1 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real BLE In Weekend cohort quote once available.",
    nameRole: "Mentee Name 2 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real BLE In Weekend cohort quote once available.",
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

export default function BleInWeekendPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero
        statements={[]}
        modelPath="/models/ble-in-weekend-hero.glb"
        backgroundImage="/images/hero/ble-in-weekend-hero-bg.jpg"
        pageTitle="BLE In Weekend"
      />

      <ScrollStatement phrases={SCROLL_PHRASES} />

      {/* What's In It For You */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              You&apos;ve shipped firmware that pairs with an app over BLE. The connection just
              works — right up until a demo where it doesn&apos;t, and you&apos;re restarting the
              peripheral and hoping, because you&apos;ve never actually watched what happens
              between &ldquo;advertising&rdquo; and &ldquo;connected&rdquo; in the first place.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              That gap costs more than a bad demo. It&apos;s the interview question you can
              describe but can&apos;t defend under a follow-up. It&apos;s the production bug where
              BLE &ldquo;randomly disconnects&rdquo; and you have no trace to point to, only a
              support ticket. And it&apos;s the JD sitting in your feed that lists &ldquo;BLE&rdquo;
              next to &ldquo;RTOS&rdquo; like they&apos;re the same skill — they&apos;re not, and
              right now only one of them is actually yours.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              This weekend gets you the other one, the same way you&apos;d learn any layer you
              actually trust: by opening it with a debugger attached to both ends of the
              connection at once. Central and peripheral, two GDB sessions, one Wireshark capture,
              running against a real Zephyr BLE stack in Renode. You&apos;ll watch a connection
              form byte by byte, watch the MTU negotiate wider than either side started with, and
              watch a notification leave one device and land on the other — then step into the
              exact line of RTOS code that made each one happen.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What We Promise">
            The next time BLE on one of your boards does something you didn&apos;t expect —
            connects but won&apos;t notify, negotiates the wrong MTU, drops for no visible reason —
            you&apos;ll know which of three places to open first. Not because you read the spec.
            Because you&apos;ve already traced all three, live, and watched exactly where the
            stack does its own thing.
          </Callout>
        </AnimatedSection>
      </section>

      {/* Early CTA */}
      <section className="bg-esc-paper px-6 py-8 sm:px-10 lg:px-16">
        <AnimatedSection className="mx-auto max-w-[560px] text-center">
          <AnimatedItem>
            <Button variant="outline" href="/apply/ble-in-weekend">
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

        <AnimatedItem className="mx-auto mt-6 max-w-[640px]">
          <p className="text-center font-body text-sm italic leading-relaxed text-esc-teal">
            Not sure if that&apos;s you? If you&apos;ve set a breakpoint in GDB and read a
            register value, you&apos;re ready.
          </p>
        </AnimatedItem>

        <AnimatedItem className="mt-8 flex justify-center">
          <Button variant="outline" href="/apply/ble-in-weekend">
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
              You walk away with a live trace of a BLE connection forming, widening, and moving
              data — from both sides, at the packet and the register level — plus the exact debug
              rig (Renode, dual-GDB, Wireshark) to point at your own board the next time BLE does
              something you didn&apos;t ask for.
            </p>
          </AnimatedItem>
          <Callout>
            No guarantee you&apos;ll have BLE fully mastered in a weekend — nobody does in three
            scenarios, and anyone promising that is selling the credential, not the skill. What
            you get is the first real rep: the one that turns &ldquo;BLE just works, I think&rdquo;
            into &ldquo;I&apos;ve watched it work, live, at the packet level, and I know where to
            look when it doesn&apos;t.&rdquo;
          </Callout>
        </AnimatedSection>
      </section>

      {/* Format / Price / Primary CTA */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <p className="font-body text-base text-esc-dark-teal">
              Live, cohort-style. One weekend session, about two hours.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm leading-relaxed text-esc-teal">
              This isn&apos;t the full five-mechanism BLE stack — SMP pairing and L2CAP CoC are
              still being rebuilt into a demo worth teaching live, and they&apos;ll ship as their
              own session once they are. What you get here is the three mechanisms already proven
              end to end, live, on both sides of the connection — not a preview, the real trace.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <span className="font-display text-4xl font-extrabold text-esc-dark-teal">₹4,999</span>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              variant="primary"
              href="/apply/ble-in-weekend"
              className="mt-2"
              style={{ boxShadow: "0 0 20px 4px rgba(240,120,57,.3), 0 4px 12px rgba(240,120,57,.3)" }}
            >
              Trace The Connection Yourself
            </Button>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm text-esc-teal">
              One weekend. ₹4,999 once. No prerequisites beyond C and a debugger you&apos;ve
              already used.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}

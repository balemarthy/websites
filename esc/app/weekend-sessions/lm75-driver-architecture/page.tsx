import type { ReactNode } from "react";
import { Cpu, Layers, GitBranch, Server, Check } from "lucide-react";
import Footer from "@/components/layout/Footer";
import DoubtCloudHero from "@/components/sections/DoubtCloudHero";
import ScrollStatement from "@/components/sections/ScrollStatement";
import StageDiagram from "@/components/sections/StageDiagram";
import ForYouList from "@/components/sections/ForYouList";
import Callout from "@/components/sections/Callout";
import ProgramTestimonials from "@/components/sections/ProgramTestimonials";
import Button from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import forYouListStyles from "@/components/sections/ForYouList.module.css";

// Workflow D — Section 3.1's own promise line, verbatim. Don't paraphrase.
const SCROLL_PHRASES = [
  "One small, boring, unglamorous device,",
  "built six times, on six real environments,",
  "in one weekend,",
  "for one answer:",
  "who actually owns this driver?",
];

const MECHANISM_STAGES = [
  {
    marker: "1",
    icon: Cpu,
    label: "Bare Metal, Twice — AVR and STM32",
    description:
      "The same read_temperature() call, written first against AVR's TWI registers and state machine, then again against STM32's I²C peripheral. Same device contract, two completely different register maps — the fastest way to see what's actually device logic and what's just MCU wiring.",
  },
  {
    marker: "2",
    icon: Layers,
    label: "HAL — Whose Code Is This, Really?",
    description:
      "Swap the STM32 driver onto HAL_I2C_* calls and watch what changes: the driver logic doesn't move, but the peripheral control underneath it does. HAL abstracts the MCU. It was never the LM75 driver.",
  },
  {
    marker: "3",
    icon: GitBranch,
    label: "FreeRTOS — Someone Has To Own The Bus",
    description:
      "Put the same driver behind a temperature task and a mutex, and ownership stops being implicit. Concurrency forces the question every bare-metal driver gets to dodge: who's allowed to touch this peripheral right now, and what happens if two tasks ask at once?",
  },
  {
    marker: "4",
    icon: Server,
    label: "Zephyr and Linux — The Framework Takes Over",
    description:
      "In Zephyr, a devicetree entry and a device model instantiate the driver for you. In Linux, that same LM75 becomes a kernel citizen — probe(), an I²C client, and a hwmon interface userspace reads like a file. The driver stops being a library you call and becomes a participant in someone else's system.",
  },
];

const NOT_FOR_YOU = [
  "You're looking for a certification — this is a rep, not a credential.",
  "You want a slide deck comparing RTOS vs Linux instead of building the same driver six times yourself.",
  "You've never written a line of C or touched I2C before — this assumes you can already read a register map, just not across four platforms.",
];

const FOR_YOU = [
  "You can write a driver for one platform but freeze the moment someone asks how it'd look on another.",
  "You want the reflex — the questions to ask on sight — not another API to memorize.",
  "You're staring at a JD that lists bare metal, RTOS, and Linux drivers like one skill, and you know they're not, and you want to actually own all of them.",
];

const QUESTIONS_YOULL_ANSWER: ReactNode[] = [
  "Walk me through how this driver changes if we move it to Zephyr.",
  "In the HAL version, which part of the code is still yours?",
  "Under FreeRTOS, who owns the I²C bus, and what happens when two tasks want it?",
  <>
    What does <code className="font-mono text-esc-teal">probe()</code> do in Linux that your
    bare-metal init used to do?
  </>,
];

// TODO(vamsi): replace with real testimonials once this has run as a paid product — placeholder content only
const TESTIMONIALS = [
  {
    quote: "Placeholder testimonial quote 1 — swap with a real LM75 Driver Architecture cohort quote once available.",
    nameRole: "Mentee Name 1 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 2 — swap with a real LM75 Driver Architecture cohort quote once available.",
    nameRole: "Mentee Name 2 · Role, Company",
  },
  {
    quote: "Placeholder testimonial quote 3 — swap with a real LM75 Driver Architecture cohort quote once available.",
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

export default function Lm75DriverArchitecturePage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--paper)" }}>
      <DoubtCloudHero
        statements={[]}
        modelPath="/models/lm75-driver-architecture-hero.glb"
        backgroundImage="/images/hero/lm75-driver-architecture-hero-bg.jpg"
        pageTitle="LM75 Driver Architecture"
        overlayLine="The device stays small. The software model expands."
      />

      <ScrollStatement phrases={SCROLL_PHRASES} />

      {/* What's In It For You */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[760px] flex-col gap-10">
          <AnimatedItem className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              You&apos;ve written an I&sup2;C driver before. Maybe for a sensor, maybe for an
              EEPROM — it worked, it shipped, you moved on. Then someone hands you the same job on
              a different platform: same sensor, but now there&apos;s FreeRTOS running, or
              it&apos;s Zephyr with a devicetree you&apos;ve never seen, or it&apos;s a Linux port
              and suddenly there&apos;s a <code className="font-mono text-esc-teal">probe()</code>{" "}
              function you&apos;re supposed to write. And the honest answer, if you&apos;re being
              honest, is you&apos;re not sure where your old driver even goes anymore — some of
              it&apos;s still yours, some of it just isn&apos;t.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              That&apos;s not an edge case. That&apos;s the actual shape of embedded work above
              entry level — the same handful of responsibilities (read the device, own the state,
              handle the fault, register with whoever&apos;s asking) moving between four or five
              completely different software worlds, sometimes within one project. It&apos;s the
              interview question that starts with &ldquo;walk me through how this driver changes
              if we move it to Zephyr&rdquo; and ends with you realizing you&apos;ve never
              actually asked yourself that. It&apos;s the JD that lists &ldquo;bare metal, RTOS,
              Linux drivers&rdquo; as one bullet point, like they&apos;re the same skill in
              different clothes. They&apos;re not — and right now you can probably do one or two
              of them well, and the rest from memory of a tutorial.
            </p>
            <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg">
              Here&apos;s the thing — the fastest way to actually own this isn&apos;t six separate
              courses. It&apos;s one small, boring, unglamorous device, built six times, on six
              real environments, in one weekend, for one answer: who actually owns this driver?
              AVR bare metal. STM32 bare metal. STM32 HAL. STM32 with FreeRTOS. Zephyr with its
              own device model. Linux on a Raspberry Pi, all the way to hwmon. Same sensor every
              time. Same one operation — read the temperature.
            </p>
          </AnimatedItem>

          <Callout eyebrow="What We Promise">
            The next time you&apos;re handed a driver written for a world you don&apos;t know — a
            Zephyr binding, a Linux probe path, an RTOS task that owns a peripheral you thought
            was yours — you&apos;ll have a reflex for reading it, built from watching the same
            fifteen lines of logic get re-homed six times in one weekend: what&apos;s the device,
            who owns it, who registered it, who moves the bytes, who handles the event,
            where&apos;s the state, what are you standing on, and what&apos;s underneath you.
          </Callout>
        </AnimatedSection>
      </section>

      {/* Early CTA */}
      <section className="bg-esc-paper px-6 py-8 sm:px-10 lg:px-16">
        <AnimatedSection className="mx-auto max-w-[560px] text-center">
          <AnimatedItem>
            <Button variant="outline" href="/apply/lm75-driver-architecture">
              See What&apos;s Inside the Weekend →
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* Mechanism */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <SectionHeading eyebrow="How The Weekend Works" heading="The Mechanism" />
        <StageDiagram
          stages={MECHANISM_STAGES}
          intro="One driver, taken through every place it has to live: AVR, STM32, HAL, FreeRTOS, Zephyr and Linux. You're guided in order, from understanding one simple sensor to the way each framework takes over the driver."
        />
      </section>

      {/* Questions you'll be able to answer */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto max-w-[520px]">
          <AnimatedItem className={forYouListStyles.forYouCol}>
            <span
              className={`font-display ${forYouListStyles.heading} ${forYouListStyles.forYouHeading}`}
            >
              Questions you&apos;ll be able to answer
            </span>
            <ul className={forYouListStyles.list}>
              {QUESTIONS_YOULL_ANSWER.map((item, i) => (
                <li key={i} className={forYouListStyles.forYouItem}>
                  <Check
                    aria-hidden
                    size={18}
                    strokeWidth={2}
                    className={forYouListStyles.forYouIcon}
                  />
                  <span className={`font-body ${forYouListStyles.itemText}`}>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* Qualifying block */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <ForYouList notForYou={NOT_FOR_YOU} forYou={FOR_YOU} />

        <AnimatedItem className="mt-8 flex justify-center">
          <Button variant="outline" href="/apply/lm75-driver-architecture">
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
              You walk away having built and run the same LM75 driver on four real software
              worlds — AVR bare metal, STM32 (bare metal, HAL, and FreeRTOS), Zephyr, and Linux —
              plus the eight-question reflex for reading any driver you&apos;ve never seen
              before: what&apos;s the device, who owns it, who registered it, who moves the bytes,
              who handles the event, where&apos;s the state, what are you standing on, and
              what&apos;s underneath you.
            </p>
          </AnimatedItem>
          <Callout>
            No guarantee you&apos;ll be a kernel driver expert in a weekend — six architectures in
            four hours is a first real rep, not a mastery claim, and anyone promising mastery in a
            weekend is selling the credential, not the skill. What you get is the thing most
            engineers never build for themselves: a direct, felt comparison of the same fifteen
            lines of driver logic across four completely different environments, so the next
            unfamiliar stack stops looking like a foreign language.
          </Callout>
        </AnimatedSection>
      </section>

      {/* Format / Price / Primary CTA */}
      <section className="bg-esc-paper px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <AnimatedSection className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <p className="font-body text-base text-esc-dark-teal">
              Live, cohort-style. One weekend — Saturday and Sunday, two hours each, four hours
              total.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm leading-relaxed text-esc-teal">
              This is the compressed six-stage version: one small device, traced across bare
              metal, HAL, FreeRTOS, Zephyr, and Linux, session by session. You&apos;re not writing
              six production-grade drivers from scratch — you&apos;re building one deeply and
              re-deriving the same logic across the rest, so the architectural delta is what you
              actually walk away seeing.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <span className="font-display text-4xl font-extrabold text-esc-dark-teal">₹6,999</span>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              variant="primary"
              href="/apply/lm75-driver-architecture"
              className="mt-2"
              style={{ boxShadow: "0 0 20px 4px rgba(240,120,57,.3), 0 4px 12px rgba(240,120,57,.3)" }}
            >
              Trace The Driver Yourself
            </Button>
          </AnimatedItem>
          <AnimatedItem>
            <p className="font-body text-sm text-esc-teal">
              One weekend. ₹6,999 once. No prerequisites beyond C and a register map you&apos;re
              not afraid of.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}

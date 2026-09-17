# ESC Program Child Pages — Comprehensive Build Prompt

Paste this whole thing into Claude Code, running from `E:\websites\esc`. It covers both program child pages end to end: Workflow D, Workflow E, navigation testing, a refactor pass, and getting both pages plus the homepage ready for backend wiring.

Read `page-factory-system.md` and `cinematic-hero-workflow.md` at the repo root before starting if you haven't already this session — they define Workflow D and Workflow E mechanics referenced below. Also load the `esc-design-system` plugin skill before writing or touching any styling — do not guess at colors, spacing, or type rules.

---

## 0. Current state (verified, don't re-derive)

- Hero is done: `DoubtCloudHero` is live on both `/programs/embedded-software-design` and `/programs/embedded-software-architecture`, each with its own `STATEMENTS` array and (Architecture only) a `backgroundImage` override. Don't touch this component's mechanics — only its two page-level usages stay as they are.
- Both page files currently contain **only** `<DoubtCloudHero />` + `<Footer />`. There is no Workflow D section and no Workflow E content on either page yet — everything below is new.
- The homepage's `ProgramCards.tsx` already has a short "For you if" (2 lines each) per program. That is the *abbreviated* teaser version for the homepage card. The fuller "Who This Is Not For" / "For you if" content below is the *authoritative, complete* version and belongs on the child pages — it does not currently exist anywhere in the codebase. Don't shorten it to match the homepage; the homepage stays as-is.
- Explicitly excluded from this build (already decided, do not add back):
  - The discarded ₹4.7L / 59-days proof story, or any specific-numbers proof story.
  - Cohort-routing / "which program is right for me" / diagnostic-call content — the "for you if / not for you if" blocks below already do the qualifying job on their own page.
  - Full-Time Mentoring — never appears on the public site, anywhere, under any name.
  - Any generic shared objection-handling / universal-promise-formula block. Note: each program's own "what we promise / what we don't promise" line and "no job guarantee" line below *is* kept — that's page-specific language from the program's own source doc, not the generic shared block.

---

## 1. Workflow D — one scroll-scrubbed statement per page

Build this as a new sticky-pinned section immediately after the hero and before Workflow E, per the Workflow D pattern in `cinematic-hero-workflow.md` (RAF scroll-progress loop, per-phrase span color/opacity tweening, respects `prefers-reduced-motion` by just showing the full statement statically with no scrub). Plain type on `--paper`, no imagery. Use `--teal-800` for the resolved/active phrase state and a lower-opacity `--teal-800` (or `--dt-600` token, check the design system skill for the exact muted-ink token) for inactive phrases — no orange here, orange stays reserved for CTA/primary per the locked palette.

**Design page — phrase sequence (break into spans, one phrase lights up at a time as the section scrubs):**

> You can make it work. / That's not the same as knowing why it's built that way. / A register gets configured because a tutorial said so. / A startup sequence runs because it was copied from a reference project. / It works — until someone asks you to change it. / This is where you learn why it works.

**Architecture page — phrase sequence:**

> You shipped it. It works. / Ask you why you built it that way, and the answer comes out thinner than you'd like. / Most of it was instinct. / Some of it was guesswork that happened to land. / Could you defend every decision in it?

Both are drawn directly from each program's own "What's In It For You" opening paragraph — don't paraphrase further, use this wording.

---

## 2. Workflow E — Design page content blocks

Build these as scroll-reveal blocks (IntersectionObserver, one-shot class toggle, CSS transition, optional stagger within a block) per the Workflow E pattern. Use icon-line-drawing style (not photos) for the two diagram blocks — teal/orange stroke, matches the existing diagram look in the source PDF (circles with a simple line icon inside, connected by a thin arrow/rule). In order:

**2.1 — What's In It For You**
> You've spent time writing embedded code, and somewhere along the way you noticed the gap: you can make things work, but you can't always say why they're built the way they are. A register gets configured because a tutorial said so. A startup sequence runs because it was copied from a reference project. It works — until someone asks you to change it, or explain it, and the confidence disappears.
>
> This programme closes that gap. Not by teaching you more syntax. By teaching you the reasoning underneath the code: what belongs in hardware and what belongs in software, why a startup sequence exists at all, how a real-time operating system actually makes decisions, and how to read a datasheet like an engineer instead of guessing your way through it.
>
> Put in real, consistent time across this, and you stop assembling code that happens to work, and start designing systems you can explain line by line. Not instantly — the same way every real skill is actually built.

Callout box directly under it (elevated panel treatment, per design system):
> What we don't promise: mastery, magic, or a fixed number of days. What we promise is this — put in real, consistent time across two to three months, and it works. What you learn are enablers, not an endpoint. Nobody becomes an expert in a day, and we will never imply otherwise.

**2.2 — Before We Begin: Hardware** (3-stage diagram, left to right, connected by arrows)
Intro line: "This isn't a module you'll sit through. It's the lens we use throughout — the context that makes every register and peripheral make sense the moment it shows up, instead of feeling like an arbitrary line in a datasheet."

| Stage | Label | Description |
|---|---|---|
| 1 | Discrete | Resistors, capacitors, transistors — every function a separate, visible part. |
| 2 | Integrated Circuits | Adders, counters, timer ICs. Logic becomes reusable. |
| 3 | System on Chip | Everything once external now lives inside one chip. |

Closing line: "Once that progression is visible, nothing about the hardware feels like a black box."

**2.3 — Before We Begin: Software** (4-stage diagram)
Intro: "Same idea, the software side. Not a module — a habit. Before a single line gets written, four questions get asked about the system in front of you, every time, until asking them stops being a step and becomes how you think."

| Tag | Label | Description |
|---|---|---|
| C1 | Chip | Pins, clocks, timers, watchdog safety. |
| C2 | Core | Deterministic logic, states, error handling. |
| C3 | Connectivity | Lightweight telemetry and logging. |
| C4 | Customer-facing | Buttons, display, the human interface. |

Closing line: "Demonstrated on a real system — a sugarcane vending machine, mapped block by block — so it's never abstract."

**2.4 — The Path, Start to Finish** (6-step vertical roadmap, numbered circles alternating orange/teal per the existing PDF, connected by a vertical rule)
Intro: "Structured the way the discipline itself is structured — consolidated from the canon engineers have used for decades to actually learn this properly, not a syllabus invented for a cohort."

| # | Title | Description |
|---|---|---|
| 1 | Starting Point | What makes a system "embedded." Writing and structuring your first real program on real hardware. |
| 2 | Build & Debug Toolchain | How source code becomes a running image on a chip — and how to inspect it when it doesn't behave. |
| 3 | Hardware & Memory | Reading a datasheet properly. Testing and validating memory. Working with flash the right way. |
| 4 | Peripherals & Device Drivers | Control and status registers. The device driver philosophy — then writing a real one. |
| 5 | Operating Systems | Why operating systems exist. A real embedded OS, its real-time characteristics, and how to choose one. |
| 6 | Integration & Optimization | Putting a complete application together — then optimizing it for size, speed, and memory. |

**2.5 — Hardware note** (small text block, not a diagram)
> Popular, widely available ARM-based microcontroller boards — chosen so you're never stuck waiting on hardware or hunting for a part nobody stocks.

**2.6 — Who This Is Not For / For You If** (two-column or stacked, per the existing PDF's orange "Not for you if" / teal-panel "For you if" treatment)

*Not for you if…*
- You want interview answers by Tuesday. This rebuilds real understanding — if you have an interview next week, you need hacks, not this.
- You expect to be walked through every step. You learn by doing the work yourself. Nobody builds it for you.
- You won't read — real books, real source code, real documentation. If you want every concept delivered as a ten-minute video summary, this resists the method that makes it work.
- You're looking for a placement service. This builds fluency, not job referrals.
- You get defensive instead of curious when shown a gap. If "years of experience isn't the same as fluency" feels like an attack rather than a relief, this isn't the right room yet.
- You're a hobbyist with no professional stakes. Nothing wrong with tinkering for fun — it's a different pace and a different reason to push through the hard parts.
- You want the certificate more than the skill.

*For you if…*
- You can make embedded code work, but go quiet when asked to explain why it was built that way.
- You've felt a design review or interview question go deeper than you could answer.
- You're willing to read real source code and sit with material that doesn't resolve in ten minutes.
- You want to understand the hardware and software well enough to teach someone else, not just pass a test on it.

**2.7 — What You Walk Away With**
> The ability to open an unfamiliar embedded codebase and orient yourself immediately — what the hardware is doing, what the software structure is doing, what the operating system underneath is actually managing. Not a certificate. A way of seeing the system that doesn't go away.

Callout box:
> No job guarantee. Nobody honestly can promise one. What you get is fluency — and a bonus track on resume, LinkedIn, and GitHub presence to help put it in front of the right people once you have it.

**2.8 — Format / Price / CTA block**
- Format: "32 hours, over two months. Saturday and Sunday mornings, 2 hours each session."
- Price: ₹14,999
- CTA label: "Start with Design" — see Section 5 for how this should be wired.

**2.9 — Testimonials**
Placeholder block, clearly marked (see Section 4).

---

## 3. Workflow E — Architecture page content blocks

Same scroll-reveal mechanics. In order:

**3.1 — What's In It For You**
> You've built something real — it works, it shipped, maybe it's even in production. But sit across from someone who asks why you structured it the way you did, and the answer comes out thinner than you'd like. Most of it was instinct. Some of it was guesswork that happened to land.
>
> This programme is the layer almost nobody in this industry teaches at all: the thinking that has to happen before the code, and the discipline to defend it after. Class-responsibility-collaboration cards instead of guesswork. Event modelling instead of "I think this triggers that." A module catalog instead of a folder of files nobody can explain six months later.
>
> Fifteen days, fully engaged, and you don't just have a project. You have a project you can walk someone through, decision by decision — and a habit of thinking that doesn't switch off when the cohort ends. The habit is what actually takes the time to set; the project is just where it gets practiced first.

Callout box:
> What we don't promise: mastery, magic, or instant transformation in fifteen days. What we promise is a real habit of thinking, built through one real project — and a foundation you keep applying long after the cohort ends. Nobody becomes an expert in two weeks, and we will never imply otherwise.

**3.2 — Format**
Heading: "Fifteen Days. Five Sessions. One Real Project."
> Live sessions, three days apart on purpose — enough time to sit with the material and experiment, not binge it. A dedicated group for the cohort, for continuous support between sessions. One real project, built from scratch, derived from a genuine use case — not a toy demo.

**3.3 — The Roadmap: Five Sessions, in Order** (vertical numbered list, alternating orange/teal per existing PDF)

| # | Title | Description |
|---|---|---|
| S1 | Problem Definition & Object Model | Break the system into responsibilities. Define entities and behaviours. No coding yet. |
| S2 | CRC Cards & Event Modelling | Map collaborations. Identify triggers and flows. Replace guesswork with design. |
| S3 | Runtime Model & Module Catalog | Decide super loop vs RTOS. Build the module catalog. Document for clarity and interviews. |
| S4 | TDD & Interface Design | Write tests first. Design expressive interfaces. Readability before implementation. |
| S5 | Implementation & Design Review | Build and ship. Defend every design decision. Walk away with a portfolio-ready artifact. |

**3.4 — Key Philosophy** (callout box, elevated panel)
> Design before coding. Continuous feedback through test-driven development. Apply this process to a real project at work and you become interview-ready — because you know the design behind the code, not just the code itself.

**3.5 — Who This Is Not For / For You If**

*Not for you if…*
- You haven't shipped anything yet. This lives above implementation — CRC cards and architecture tradeoffs need something real to apply to, not a tutorial you followed once.
- You did a project, but mostly by copying and guessing. Real project experience and real fundamentals aren't always the same person. If you've never sat with structured fundamentals at all, the foundations programme comes first.
- You want better C syntax, not better design thinking. This is about the thinking that happens before and above the code.
- You want to collect frameworks passively. The shift happens through application — your own cards, your own catalog, your own decisions, defended out loud.
- You're hoping for a placement service. This builds design judgment, not job referrals.

*For you if…*
- You've built and shipped something real — even something small — and you know it could have been designed better.
- You're tired of decisions that were instinct rather than reasoning, and want a repeatable way to think it through.
- You want a portfolio project you can defend in an interview, not just show.
- You already have the fundamentals and you're ready for the layer above implementation.

Note the natural cross-link in the first "not for you" bullet ("the foundations programme comes first") — make this an actual `<Link>` to `/programs/embedded-software-design`, not just text. This is the one place cross-program reference belongs, since it's the source doc's own words, not new routing content.

**3.6 — No guarantee callout**
> No job guarantee. Nobody honestly can promise one. What you get is the habit of designing before you build, and a project that proves it — plus a bonus track on resume, LinkedIn, and GitHub presence to help put it in front of the right people.

**3.7 — Format / Price / CTA block**
- Format: "10 hours, over 15 days. 5 sessions, 2 hours each, every 3rd day, evenings."
- Price: ₹8,999
- CTA label: "Start with Architecture"

**3.8 — Testimonials**
Placeholder block, clearly marked (see Section 4).

---

## 4. Testimonials placeholders

Vamsi is supplying testimonials separately for both the homepage and these child pages — don't invent, don't reuse the discarded proof story, don't leave the section silently missing either. On both pages, build the testimonials block as a real component (`ProgramTestimonials` or similar, accepting a `testimonials` prop/array) so it's a one-line swap later, but render it now with 2–3 clearly-fake placeholder entries and an unmissable visual/dev marker, e.g.:

```tsx
// TODO(vamsi): replace with real testimonials for this cohort — placeholder content only
```

and a small on-page dev-only banner (`process.env.NODE_ENV !== "production"`) reading "PLACEHOLDER TESTIMONIALS — replace before launch" so it can never accidentally ship live.

---

## 5. CTA / backend-readiness

Both pages' final CTA buttons ("Start with Design" / "Start with Architecture") currently have nowhere real to go. For this build:

- Point each CTA at a dedicated route (`/apply/embedded-software-design`, `/apply/embedded-software-architecture`, or whatever matches existing routing conventions) rather than a bare `mailto:` or `#`.
- If that route doesn't exist yet, stub it as a simple page with a clearly marked placeholder form (name, email, one qualifying question) and a `// TODO(vamsi): wire to real backend — no submission handler yet` comment on the form's `onSubmit`. Don't fake a success state or console.log a submission as if it did something — leave the non-functional state visible in dev.
- Same treatment for the homepage's existing CTAs if they don't already point somewhere real — check `ProgramCards.tsx` and `Hero.tsx` while you're in there.
- Leave a short `BACKEND-TODO.md` at the repo root (or append to one if it exists) listing every stubbed form/route this pass created, so backend wiring later has a single checklist instead of a code hunt.

---

## 6. Navigation testing

Test every link `Nav.tsx` exposes, both desktop pill and mobile accordion, from multiple starting pages (home, each program page):

- Logo → `/`
- "The Program" label → `/#programs` (anchor scroll on homepage; from a child page, confirm it navigates home and then scrolls)
- "The Program" dropdown → both program pages
- "Weekend Sessions" dropdown → `/weekend-sessions/bytes-to-sockets`, `/weekend-sessions/ble-in-weekend`, `/weekend-sessions/lm75-driver-architecture` — confirm these routes exist; if any are missing, note it rather than silently 404ing, and stub a bare page rather than leaving a dead link live
- `/downloads`, `/about`, `/blog` — same check
- Active-state styling (`navItemActive` / `mobilePanelItemActive`) correctly reflects the current route on every page above
- The `overHero` dark/light logo and pill switching — confirm it still reads correctly now that both program pages have new sections between the hero and footer (the `data-dark-bg` sampling logic depends on what's actually stacked under the fixed top-left corner, and new Workflow D/E sections are `--paper` background, i.e. light — confirm the logic doesn't get confused by the transition zones)

Do this by actually running the dev server and clicking through, not just reading the code.

---

## 7. Refactor pass — call these skills

Before considering this done:

- Run the `esc-design-system` skill against every new component/file this build touches — token usage (`--teal-500` vs `--teal-800`, `--orange-500`), font classes (display/body/mono), no gradients, no emoji, no exclamation marks anywhere in copy (double-check the copy above got pasted in exactly, not paraphrased with an exclamation point slipped in).
- If Workflow D/E's mechanics overlap with patterns the `3d-scroll-website` skill already encodes (scroll-driven reveal, IntersectionObserver conventions, reduced-motion handling), check it and reuse its conventions rather than reinventing them ad hoc.
- General code-quality pass on the new files: extract repeated block-diagram markup (hardware stages, four-questions, roadmap steps) into one reusable component each takes a data array, rather than three near-duplicate JSX blocks — this also makes the Architecture roadmap and Design roadmap share one `RoadmapList` component instead of two.
- Run whatever lint/typecheck script `package.json` defines and fix anything it flags in touched files.

---

## 8. Acceptance checklist

- [ ] Both program pages have Hero → Workflow D → Workflow E in that order, nothing else added or skipped
- [ ] No mention anywhere of: the discarded proof story, cohort routing/diagnostic calls, Full-Time Mentoring, the generic shared objection-handling block
- [ ] All copy matches the wording in Sections 2–3 above verbatim (this is Vamsi's actual brand copy, not a paraphrase)
- [ ] Testimonials are real placeholder components with the TODO marker and dev banner, not silently omitted
- [ ] Every CTA points somewhere real (a route that exists, even if that route is itself a stubbed form) and stubbed forms are logged in `BACKEND-TODO.md`
- [ ] Every nav link, desktop and mobile, from home and from both program pages, was actually clicked in a running dev server and confirmed to go where it says
- [ ] `esc-design-system` skill run against all new/changed files
- [ ] Lint/typecheck clean on touched files
- [ ] `prefers-reduced-motion` respected in both Workflow D and Workflow E (static fallback, no scrub/stagger)

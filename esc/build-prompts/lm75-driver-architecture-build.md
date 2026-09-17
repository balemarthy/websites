# LM75 Driver Architecture — Weekend-Session Page Build Prompt

Paste this into Claude Code, running from `E:\websites\esc`.

Read `page-factory-system.md` and `cinematic-hero-workflow.md` at the repo root before starting. This page gets the full program-page template (3D hero + Workflow D + Workflow E), same as Embedded Software Design/Architecture, Bytes to Sockets, and BLE In Weekend. Also load the `esc-design-system` skill before touching any styling.

---

## 0. Current state (verified, don't re-derive)

- Route already exists as a placeholder: `app/weekend-sessions/lm75-driver-architecture/page.tsx` — currently just a "Content in progress" stub. This build replaces its contents entirely.
- Nav already links here correctly (`Nav.tsx` line ~32 → "Weekend Sessions" → "LM75 Driver Architecture" → `/weekend-sessions/lm75-driver-architecture`). No nav changes needed.
- Source content is two of Vamsi's own course-blueprint PDFs (`LM75_Driver_Architecture_Course_Blueprint_v2.pdf` and the earlier non-v2 version). **Scope decision, locked with Vamsi:** this product is the **compressed single-weekend version** (v2's "Saturday 2h + Sunday 2h = 4 hours total"), covering all six architectural stages — AVR bare metal, STM32 bare metal, STM32 HAL, STM32 + FreeRTOS, Zephyr, Linux/hwmon — condensed into one weekend. The non-v2 blueprint's alternative "10-week weekend curriculum" version is explicitly **out of scope** for this page — that would be a different, program-tier product, not this weekend session.
- **Important, and different from Bytes to Sockets / BLE In Weekend:** unlike those two pages, none of the six stages have actually been built or traced on real hardware yet as of this build. This is Vamsi's own informed call — he's launching the page first and building the six stages in sequence afterward, on the basis that this is less complex than the BLE workshop content he's already shipped. Because of that, the copy below is written entirely from the blueprint's own architectural framing (which is solid, real technical content) and contains **zero fabricated "here's what actually happened" proof moments** — no invented debugging surprises, no specific live-contradicted predictions like BLE In Weekend's MTU exchange story. Don't add any once you start building the real stages either, unless they actually happened — if you want to strengthen a mechanism card with a real specific moment after building a stage, that's a deliberate future edit, not something to backfill speculatively now.
- Price is confirmed by Vamsi at **₹6,999**. Format is one weekend — Saturday and Sunday, two hours each, four hours total (not the 2-hour single-session format of BLE In Weekend, and not the 10-week curriculum from the alternate blueprint).
- Copy below has already been through one `dr-copy-pipeline` copychief pass (7/10 conversion readiness — see flags inline in Section 8) — paste it as written, don't paraphrase.
- **Hero assets are both already in place and verified:**
  - `public/models/lm75-driver-architecture-hero.glb` — a real IC package (LM75 chip, "LM75" legible on the package) with a floating "25°C" digital readout beside it, surrounded by six flat rectangular plaques that are each fully disconnected from one another and from the chip (no rods, no rails, no staircase structure) but whose positions trace a continuous spiral climbing around the chip. Each plaque is rotated to face the camera despite its position in the spiral, with the six-stage labels baked into the mesh as embossed 3D typography (AVR · REGISTER → STM32 · PERIPHERAL → HAL · HANDLE → FREERTOS · RESOURCE → ZEPHYR · DEVICE → LINUX · HWMON, ascending). Same baked-mesh technique as BLE In Weekend's layer-name ring — **do not** pass a populated `statements` array to `DoubtCloudHero` for this page, the labels are already sculpted into the GLB. Pass `statements={[]}`.
  - `public/images/hero/lm75-driver-architecture-hero-bg.jpg` — a moody, heavily out-of-focus macro shot of an I²C connection (SDA/SCL wires, blurred), dark-teal ambient light with one warm-orange LED accent, 16:9. Matches the CSS fallback gradient tone.
  - Both were renamed this session to match the slug already wired into `Nav.tsx` (`lm75-driver-architecture`, not `lm75-in-a-weekend` — an earlier naming mismatch, corrected before this build, don't reintroduce the old filenames).
  - Both were placed and verified this session — don't re-generate or ask Vamsi for them again.
- **HTML overlay, separate from the baked spiral:** alongside the 3D hero, render a short line of live HTML text (not baked into the mesh) carrying project context. Use: **"The device stays small. The software model expands."** — Vamsi's own north star line from the blueprint, reused verbatim. Style it the same way `pageTitle`/subtitle text is already handled elsewhere in `DoubtCloudHero`'s overlay — check the component for the existing pattern rather than inventing new markup.

---

## 1. Hero

```tsx
<DoubtCloudHero
  statements={[]}
  modelPath="/models/lm75-driver-architecture-hero.glb"
  backgroundImage="/images/hero/lm75-driver-architecture-hero-bg.jpg"
  pageTitle="LM75 Driver Architecture"
  overlayLine="The device stays small. The software model expands."
/>
```

Check `DoubtCloudHero`'s actual prop signature before assuming `overlayLine` exists as-is — if there's no existing slot for a secondary overlay line, add one following the component's existing conventions (don't invent a parallel one-off component just for this page). Verify `statements={[]}` renders cleanly with no leftover placeholder ring, same as confirmed safe for BLE In Weekend.

---

## 2. Workflow D — one scroll-scrubbed statement

Sourced verbatim from Section 3.1 below, break into spans exactly at the slashes:

> One small, boring, unglamorous device, / built six times, on six real environments, / in one weekend, / for one answer: / who actually owns this driver?

Same RAF scroll-progress / `prefers-reduced-motion` mechanics as the other pages' Workflow D sections (`ScrollStatement` component, `phrases` prop).

---

## 3. Workflow E content blocks, in order

**3.1 — What's In It For You**

> You've written an I²C driver before. Maybe for a sensor, maybe for an EEPROM — it worked, it shipped, you moved on. Then someone hands you the same job on a different platform: same sensor, but now there's FreeRTOS running, or it's Zephyr with a devicetree you've never seen, or it's a Linux port and suddenly there's a `probe()` function you're supposed to write. And the honest answer, if you're being honest, is you're not sure where your old driver even goes anymore — some of it's still yours, some of it just isn't.
>
> That's not an edge case. That's the actual shape of embedded work above entry level — the same handful of responsibilities (read the device, own the state, handle the fault, register with whoever's asking) moving between four or five completely different software worlds, sometimes within one project. It's the interview question that starts with "walk me through how this driver changes if we move it to Zephyr" and ends with you realizing you've never actually asked yourself that. It's the JD that lists "bare metal, RTOS, Linux drivers" as one bullet point, like they're the same skill in different clothes. They're not — and right now you can probably do one or two of them well, and the rest from memory of a tutorial.
>
> Here's the thing — the fastest way to actually own this isn't six separate courses. It's one small, boring, unglamorous device, built six times, on six real environments, in one weekend, for one answer: who actually owns this driver? AVR bare metal. STM32 bare metal. STM32 HAL. STM32 with FreeRTOS. Zephyr with its own device model. Linux on a Raspberry Pi, all the way to hwmon. Same sensor every time. Same one operation — read the temperature.

Callout directly under it (`Callout` component):

> **What We Promise:** the next time you're handed a driver written for a world you don't know — a Zephyr binding, a Linux probe path, an RTOS task that owns a peripheral you thought was yours — you'll have a reflex for reading it, built from watching the same fifteen lines of logic get re-homed six times in one weekend: what's the device, who owns it, who registered it, who moves the bytes, who handles the event, where's the state, what are you standing on, and what's underneath you.

**3.2 — Early CTA** (`Button variant="outline"`, `href="/apply/lm75-driver-architecture"`)

> See What's Inside the Weekend →

**3.3 — Mechanism** (reuse `StageDiagram`, 4 stages, icons from `lucide-react`)

| Marker | Icon | Label | Description |
|---|---|---|---|
| 1 | `Cpu` | Bare Metal, Twice — AVR and STM32 | The same `read_temperature()` call, written first against AVR's TWI registers and state machine, then again against STM32's I²C peripheral. Same device contract, two completely different register maps — the fastest way to see what's actually device logic and what's just MCU wiring. |
| 2 | `Layers` | HAL — Whose Code Is This, Really? | Swap the STM32 driver onto `HAL_I2C_*` calls and watch what changes: the driver logic doesn't move, but the peripheral control underneath it does. HAL abstracts the MCU. It was never the LM75 driver. |
| 3 | `GitBranch` | FreeRTOS — Someone Has To Own The Bus | Put the same driver behind a temperature task and a mutex, and ownership stops being implicit. Concurrency forces the question every bare-metal driver gets to dodge: who's allowed to touch this peripheral right now, and what happens if two tasks ask at once? |
| 4 | `Server` | Zephyr and Linux — The Framework Takes Over | In Zephyr, a devicetree entry and a device model instantiate the driver for you. In Linux, that same LM75 becomes a kernel citizen — `probe()`, an I²C client, and a hwmon interface userspace reads like a file. The driver stops being a library you call and becomes a participant in someone else's system. |

No intro/closing lines needed — pass stages only.

**3.4 — Qualifying block** (`ForYouList`)

```
notForYou: [
  "You're looking for a certification — this is a rep, not a credential.",
  "You want a slide deck comparing RTOS vs Linux instead of building the same driver six times yourself.",
  "You've never written a line of C or touched I2C before — this assumes you can already read a register map, just not across four platforms.",
]
forYou: [
  "You can write a driver for one platform but freeze the moment someone asks how it'd look on another.",
  "You want the reflex — the questions to ask on sight — not another API to memorize.",
  "You're staring at a JD that lists bare metal, RTOS, and Linux drivers like one skill, and you know they're not, and you want to actually own all of them.",
]
```

**3.5 — Mid CTA** (`Button variant="outline"`, same href)

> Reserve Your Spot →

**3.6 — Testimonials** (`ProgramTestimonials`, placeholder array, same `TODO(vamsi)` + dev-banner pattern as the other pages)

```
testimonials: [
  { quote: "Placeholder testimonial quote 1 — swap with a real LM75 Driver Architecture cohort quote once available.", nameRole: "Mentee Name 1 · Role, Company" },
  { quote: "Placeholder testimonial quote 2 — swap with a real LM75 Driver Architecture cohort quote once available.", nameRole: "Mentee Name 2 · Role, Company" },
  { quote: "Placeholder testimonial quote 3 — swap with a real LM75 Driver Architecture cohort quote once available.", nameRole: "Mentee Name 3 · Role, Company" },
]
```

**3.7 — What You Walk Away With**

> You walk away having built and run the same LM75 driver on four real software worlds — AVR bare metal, STM32 (bare metal, HAL, and FreeRTOS), Zephyr, and Linux — plus the eight-question reflex for reading any driver you've never seen before: what's the device, who owns it, who registered it, who moves the bytes, who handles the event, where's the state, what are you standing on, and what's underneath you.

Callout directly under it:

> No guarantee you'll be a kernel driver expert in a weekend — six architectures in four hours is a first real rep, not a mastery claim, and anyone promising mastery in a weekend is selling the credential, not the skill. What you get is the thing most engineers never build for themselves: a direct, felt comparison of the same fifteen lines of driver logic across four completely different environments, so the next unfamiliar stack stops looking like a foreign language.

**3.8 — Format / Price**

> Live, cohort-style. One weekend — Saturday and Sunday, two hours each, four hours total.
>
> This is the compressed six-stage version: one small device, traced across bare metal, HAL, FreeRTOS, Zephyr, and Linux, session by session. You're not writing six production-grade drivers from scratch — you're building one deeply and re-deriving the same logic across the rest, so the architectural delta is what you actually walk away seeing.

Price display: `₹6,999`

**3.9 — Primary CTA** (`Button variant="primary"`, `href="/apply/lm75-driver-architecture"`)

> Trace The Driver Yourself

Friction-reducer line below it:

> One weekend. ₹6,999 once. No prerequisites beyond C and a register map you're not afraid of.

---

## 4. Apply stub + BACKEND-TODO update

`/apply/lm75-driver-architecture` doesn't exist yet. Create `app/apply/lm75-driver-architecture/page.tsx` following the exact pattern of `app/apply/ble-in-weekend/page.tsx` (same `ApplyForm` component, no new component needed):

```tsx
<ApplyForm
  programLabel="LM75 Driver Architecture"
  qualifyingQuestion="What's a driver you've written that you're not sure survives being moved to a different platform?"
/>
```

Add this stub to `BACKEND-TODO.md`'s "Stubbed application forms" list, same format as the existing entries. Also add this page's `TESTIMONIALS` array to the "Placeholder testimonials" list in the same file.

---

## 5. Nav testing

From home and from this page, click: Nav → Weekend Sessions → LM75 Driver Architecture (lands here); both CTA buttons → `/apply/lm75-driver-architecture` (lands on the stub form, not a 404); the `overHero` dark/light logo-switching behavior over the new 3D hero; confirm the hero renders with `statements={[]}` cleanly and the spiral of six plaques + floating "25°C" readout is visible and legible; confirm the HTML overlay line renders alongside the 3D canvas, not baked into it. Actually run the dev server for this, don't just read the code.

---

## 6. Refactor / quality pass

- Run the `esc-design-system` skill against every new file this touches.
- Reuse `StageDiagram`, `ForYouList`, `Callout`, `ProgramTestimonials`, `Button`, `ScrollStatement`, `DoubtCloudHero` as-is. The only possible new addition is a secondary overlay-line slot on `DoubtCloudHero` if one doesn't already exist (see Section 1) — check before adding, don't duplicate an existing mechanism.
- Lint/typecheck clean on touched files.
- `prefers-reduced-motion` respected in Workflow D (static fallback, no scrub).

---

## 7. Acceptance checklist

- [ ] Hero → Workflow D → Workflow E, same order as the other three pages, nothing skipped
- [ ] `lm75-driver-architecture-hero.glb` in place and rendering (not stuck on the loading fallback)
- [ ] Hero renders with `statements={[]}` cleanly — no leftover ring labels, no console error
- [ ] Background image resolves (`lm75-driver-architecture-hero-bg.jpg`)
- [ ] HTML overlay line ("The device stays small. The software model expands.") renders alongside the 3D canvas
- [ ] All copy matches Section 3 verbatim — no exclamation marks, no paraphrase
- [ ] Three CTA touchpoints present, escalating outline → outline → primary, all pointing at `/apply/lm75-driver-architecture`
- [ ] Testimonials are the real placeholder component with TODO + dev banner, not omitted
- [ ] `/apply/lm75-driver-architecture` stub created and logged in `BACKEND-TODO.md`
- [ ] Page copy does not claim any stage has already been built/traced/proven — forward-looking language only ("you'll build," "you walk away having built"), never past-tense proof claims
- [ ] Nav + both CTAs actually clicked in a running dev server, not just read in code
- [ ] `esc-design-system` skill run against all new/changed files
- [ ] Lint/typecheck clean

---

## 8. Open items — need Vamsi's call before/while building, don't guess

1. **Nothing has been built yet.** Unlike Bytes to Sockets and BLE In Weekend, this page ships ahead of any of the six stages actually being traced on hardware. Vamsi's explicit call — he's launching first and building in sequence. Don't add proof language, specific "here's what happened" moments, or anything implying a stage is already demoed. Once a stage is actually built, its mechanism card in Section 3.3 is the first thing that should get rewritten with a real specific moment — flag that to Vamsi when it happens, don't do it speculatively now.
2. **Copychief flag, not applied:** the "interview question" pain-proxy in Section 3.1 is now the third weekend-session page in a row to lean on that same rhetorical device (Bytes to Sockets and BLE In Weekend both used it). It's earned here, but the next weekend page after this one should find a different pain-proxy so the funnel doesn't read as formulaic to a repeat visitor. Not something to fix on this page — just don't repeat it a fourth time.
3. **No urgency/scarcity element** (cohort date, seat cap) on this page, consistent with the other two weekend pages. If Vamsi wants to introduce this, it should be a series-wide decision applied to all three at once, not a one-off on this page.
4. **`DoubtCloudHero` overlay line** — check whether the component already has a slot for a secondary text line alongside `pageTitle`. If not, this is the first page needing that addition; keep it minimal and consistent with the component's existing style rather than inventing new visual treatment.

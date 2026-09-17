# BLE In Weekend — Weekend-Session Page Build Prompt

Paste this into Claude Code, running from `E:\websites\esc`.

Read `page-factory-system.md` and `cinematic-hero-workflow.md` at the repo root before starting. This page gets the full program-page template (3D hero + Workflow D + Workflow E), same as Embedded Software Design/Architecture and Bytes to Sockets. Also load the `esc-design-system` skill before touching any styling.

---

## 0. Current state (verified, don't re-derive)

- Route already exists as a placeholder: `app/weekend-sessions/ble-in-weekend/page.tsx` — currently just a "Content in progress" stub. This build replaces its contents entirely.
- Nav already links here correctly (`Nav.tsx` → "Weekend Sessions" → "BLE In Weekend" → `/weekend-sessions/ble-in-weekend`). No nav changes needed for this route itself.
- Source content is Vamsi's own Zephyr BLE workshop project (5 traced scenarios: GAP Basics, MTU Exchange, GATT Notify, SMP Pairing, L2CAP CoC). **Scope decision, locked with Vamsi:** this product covers **Session 1 only** — GAP Basics, MTU Exchange, GATT Notify — the three scenarios that are fully proven (live trace + wire evidence, both sides). Session 2 (SMP Pairing, L2CAP CoC) is explicitly **out of scope** for this page — neither scenario has ever completed its own defining event in the source project (SMP dies before the pairing exchange every attempt; L2CAP CoC has zero wire evidence across 5+ attempts), so this is not a "the full BLE stack, lighter treatment" page, it's a single-session product built only from what's actually demo-ready today. Don't reintroduce SMP/L2CAP CoC content into this page — that's a separate future page once those scenarios are rebuilt.
- Price is confirmed by Vamsi at **₹4,999**. Format is one weekend session, about two hours (single session, not the 2-day/2-session format the source project's course-structure doc sketched — that was for the full 5-scenario version, which this page doesn't cover).
- Copy below has already been through one `dr-copy-pipeline` copychief pass (8/10 conversion readiness, two minor flags noted inline below) — paste it as written, don't paraphrase.
- **Hero assets are both already in place and verified:**
  - `public/models/ble-in-weekend-hero.glb` — an original abstract wireless-signal emblem (a rounded core node with three concentric arcs), **with the eight BLE protocol-stack layer names baked into the model itself as extruded 3D typography orbiting the emblem** (GAP, GATT, ATT, SM, L2CAP, LINK LAYER, HCI, PHY, arranged at varying heights/distances — a loose halo, not a flat ring). This is a deliberate departure from the Bytes to Sockets pattern: **do not** pass a populated `statements` array to `DoubtCloudHero` for this page — the ring text is already sculpted into the GLB, so passing additional floating HTML statement labels would duplicate it. Pass `statements={[]}`.
  - `public/images/hero/ble-in-weekend-hero-bg.jpg` — confirmed JPEG, 2304×1296 (16:9, same aspect ratio as the other hero-bg files though a higher source resolution than the 1672×941 convention — fine as-is, no action needed).
  - Both were placed and verified this session — don't re-generate or ask Vamsi for them again.
- **No PDU-style packet labels on this page** — unlike Bytes to Sockets' PDU ring, this page's hero communicates via the baked-in layer-name typography described above, not via `DoubtCloudHero`'s statement-ring prop.

---

## 1. Hero

```tsx
<DoubtCloudHero
  statements={[]}
  modelPath="/models/ble-in-weekend-hero.glb"
  backgroundImage="/images/hero/ble-in-weekend-hero-bg.jpg"
  pageTitle="BLE In Weekend"
/>
```

Verified safe against the current `DoubtCloudHero` source: `StatementRing`'s ring-position math divides by `statements.length`, but that division only ever executes inside the `.map` callback, which never runs on an empty array — so `statements={[]}` renders zero floating labels and throws nothing. Still worth a quick look at the running dev server to confirm no leftover placeholder ring renders, but this isn't an open risk.

---

## 2. Workflow D — one scroll-scrubbed statement

Sourced verbatim, break into spans exactly at the slashes:

> By the end of this weekend, / you'll have watched a BLE connection form, / widen, and move data — / live, on both sides, at the packet level — / yourself.

Same RAF scroll-progress / `prefers-reduced-motion` mechanics as the other pages' Workflow D sections (`ScrollStatement` component, `phrases` prop).

---

## 3. Workflow E content blocks, in order

**3.1 — What's In It For You**

> You've shipped firmware that pairs with an app over BLE. The connection just works — right up until a demo where it doesn't, and you're restarting the peripheral and hoping, because you've never actually watched what happens between "advertising" and "connected" in the first place.
>
> That gap costs more than a bad demo. It's the interview question you can describe but can't defend under a follow-up. It's the production bug where BLE "randomly disconnects" and you have no trace to point to, only a support ticket. And it's the JD sitting in your feed that lists "BLE" next to "RTOS" like they're the same skill — they're not, and right now only one of them is actually yours.
>
> This weekend gets you the other one, the same way you'd learn any layer you actually trust: by opening it with a debugger attached to both ends of the connection at once. Central and peripheral, two GDB sessions, one Wireshark capture, running against a real Zephyr BLE stack in Renode. You'll watch a connection form byte by byte, watch the MTU negotiate wider than either side started with, and watch a notification leave one device and land on the other — then step into the exact line of RTOS code that made each one happen.

Callout directly under it (`Callout` component):

> What We Promise: the next time BLE on one of your boards does something you didn't expect — connects but won't notify, negotiates the wrong MTU, drops for no visible reason — you'll know which of three places to open first. Not because you read the spec. Because you've already traced all three, live, and watched exactly where the stack does its own thing.

**3.2 — Early CTA** (`Button variant="outline"`, `href="/apply/ble-in-weekend"`)

> See What's Inside the Weekend →

**3.3 — Mechanism** (reuse `StageDiagram`, 4 stages, icons from `lucide-react`)

| Marker | Icon | Label | Description |
|---|---|---|---|
| 1 | `Radio` | GAP Basics — Connection Forms | A live central and peripheral, watched from both sides — advertising, connect, disconnect — the two-stage HCI dispatch and workqueue pattern every later stage reuses. |
| 2 | `Waves` | MTU Exchange — Channel Widens | The deepest trace of the weekend. A prediction about Zephyr's own RX queue gets directly contradicted live — not a `k_fifo`, a spinlock-protected list — tied to a real ARM `BASEPRI` register manipulation, single-stepped. |
| 3 | `Bell` | GATT Notify — Data Moves Unprompted | Active scanning captured live (`SCAN_REQ`/`SCAN_RSP`), then the notify path traced straight out of `main()`'s loop — and the TX semaphore actually controlling the flow. |
| 4 | `Terminal` | The Debug Rig — Two GDBs, One Truth | The setup itself: Renode simulation, dual-GDB attach on both sides of the connection, Wireshark on the wire — the same rig, reusable on your own boards the day BLE does something you didn't ask for. |

No intro/closing lines needed for this instance — pass stages only. **Build note:** stage 2 (MTU Exchange) carries the single strongest proof point on the page (the live-contradicted prediction) — make sure `StageDiagram`'s layout gives it equal visual weight to the other three cards, not compressed.

**3.4 — Qualifying block** (`ForYouList`)

```
notForYou: [
  "You're looking for a certification — this is a rep, not a credential.",
  "You want a slide deck explaining BLE instead of a debugger attached to a real connection.",
  "You've never touched C or a debugger before — this assumes you already know your way around a breakpoint, just not around this stack.",
]
forYou: [
  "You've shipped BLE firmware that works, but you've never traced what \"works\" means at the packet level.",
  "You want to debug a connection instead of restarting the peripheral and hoping.",
  "You're staring at a JD that puts \"BLE\" and \"RTOS\" in the same sentence, and only one of them is currently true about you.",
]
```

**3.5 — Mid CTA** (`Button variant="outline"`, same href)

> Reserve Your Spot →

**3.6 — Testimonials** (`ProgramTestimonials`, placeholder array, same `TODO(vamsi)` + dev-banner pattern as the other pages)

```
testimonials: [
  { quote: "Placeholder testimonial quote 1 — swap with a real BLE In Weekend cohort quote once available.", nameRole: "Mentee Name 1 · Role, Company" },
  { quote: "Placeholder testimonial quote 2 — swap with a real BLE In Weekend cohort quote once available.", nameRole: "Mentee Name 2 · Role, Company" },
  { quote: "Placeholder testimonial quote 3 — swap with a real BLE In Weekend cohort quote once available.", nameRole: "Mentee Name 3 · Role, Company" },
]
```

**3.7 — What You Walk Away With**

> You walk away with a live trace of a BLE connection forming, widening, and moving data — from both sides, at the packet and the register level — plus the exact debug rig (Renode, dual-GDB, Wireshark) to point at your own board the next time BLE does something you didn't ask for.

Callout directly under it:

> No guarantee you'll have BLE fully mastered in a weekend — nobody does in three scenarios, and anyone promising that is selling the credential, not the skill. What you get is the first real rep: the one that turns "BLE just works, I think" into "I've watched it work, live, at the packet level, and I know where to look when it doesn't."

**3.8 — Format / Price**

> Live, cohort-style. One weekend session, about two hours.
>
> This isn't the full five-mechanism BLE stack — SMP pairing and L2CAP CoC are still being rebuilt into a demo worth teaching live, and they'll ship as their own session once they are. What you get here is the three mechanisms already proven end to end, live, on both sides of the connection — not a preview, the real trace.

Price display: `₹4,999`

**Copychief flag, not yet applied — Vamsi's call whether to fix before shipping:** the Session-2 disclaimer in the second paragraph sits directly above the price display, which is the moment a buyer's eye should land on confidence, not a caveat. If Vamsi wants it moved, fold the SMP/L2CAP CoC acknowledgment into 3.1's JD paragraph or the mechanism intro instead — don't silently move it without asking, he said to ship as-is for speed.

**3.9 — Primary CTA** (`Button variant="primary"`, `href="/apply/ble-in-weekend"`)

> Trace The Connection Yourself

Friction-reducer line below it:

> One weekend. ₹4,999 once. No prerequisites beyond C and a debugger you've already used.

---

## 4. Apply stub + BACKEND-TODO update

`/apply/ble-in-weekend` doesn't exist yet. Create `app/apply/ble-in-weekend/page.tsx` following the exact pattern of `app/apply/bytes-to-sockets/page.tsx` (same `ApplyForm` component, no new component needed):

```tsx
<ApplyForm
  programLabel="BLE In Weekend"
  qualifyingQuestion="What's a BLE connection you've shipped that you couldn't fully explain when someone asked how it actually works?"
/>
```

Add this stub to `BACKEND-TODO.md`'s "Stubbed application forms" list, same format as the existing three entries. Also add this page's `TESTIMONIALS` array to the "Placeholder testimonials" list in the same file.

---

## 5. Nav testing

From home and from this new page, click: Nav → Weekend Sessions → BLE In Weekend (lands here); both CTA buttons → `/apply/ble-in-weekend` (lands on the stub form, not a 404); the `overHero` dark/light logo-switching behavior over the new 3D hero; confirm the hero renders with `statements={[]}` (no console errors, no leftover placeholder ring). Actually run the dev server for this, don't just read the code.

---

## 6. Refactor / quality pass

- Run the `esc-design-system` skill against every new file this touches.
- Reuse `StageDiagram`, `ForYouList`, `Callout`, `ProgramTestimonials`, `Button`, `ScrollStatement`, `DoubtCloudHero` as-is — this page introduces zero new components, only new data (and the empty-`statements` usage pattern) passed into existing ones.
- Lint/typecheck clean on touched files.
- `prefers-reduced-motion` respected in Workflow D (static fallback, no scrub).

---

## 7. Acceptance checklist

- [ ] Hero → Workflow D → Workflow E, same order as the other three pages, nothing skipped
- [ ] `ble-in-weekend-hero.glb` in place and rendering (not stuck on the loading fallback)
- [ ] Hero renders with `statements={[]}` cleanly — no floating labels, no console error
- [ ] Background image resolves (`ble-in-weekend-hero-bg.jpg`)
- [ ] All copy matches Section 3 verbatim — no exclamation marks, no paraphrase
- [ ] Three CTA touchpoints present, escalating outline → outline → primary, all pointing at `/apply/ble-in-weekend`
- [ ] Testimonials are the real placeholder component with TODO + dev banner, not omitted
- [ ] `/apply/ble-in-weekend` stub created and logged in `BACKEND-TODO.md`
- [ ] Page copy does not reference SMP Pairing or L2CAP CoC as something this session teaches or demos — Session 1 scope only
- [ ] Nav + both CTAs actually clicked in a running dev server, not just read in code
- [ ] `esc-design-system` skill run against all new/changed files
- [ ] Lint/typecheck clean

---

## 8. Open items — need Vamsi's call before/while building, don't guess

1. **Copychief flag on the price-line disclaimer (Section 3.8)** — not applied yet, Vamsi said ship as-is, flagging so it isn't silently changed.
2. **Session 2 (SMP Pairing, L2CAP CoC)** — explicitly out of scope for this build. A future page once those scenarios are rebuilt and actually complete live — not in scope now, don't add a "coming soon" teaser for it on this page unless Vamsi asks.
3. **`statements={[]}` on `DoubtCloudHero`** — first time this component's been used without a populated ring. Already checked against the current source (see Section 1) and it's safe, but still worth a visual confirmation in the dev server since it's a new usage pattern.

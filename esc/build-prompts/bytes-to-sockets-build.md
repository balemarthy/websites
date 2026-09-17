# Bytes to Sockets — Weekend-Session Page Build Prompt

Paste this into Claude Code, running from `E:\websites\esc`.

Read `page-factory-system.md` and `cinematic-hero-workflow.md` at the repo root before starting — note the **2026-09-16 correction** in `page-factory-system.md`: weekend-session pages are no longer in the no-hero tier. This page gets the full program-page template (3D hero + Workflow D + Workflow E), same as Embedded Software Design/Architecture. Also load the `esc-design-system` skill before touching any styling.

---

## 0. Current state (verified, don't re-derive)

- Route already exists as a placeholder: `app/weekend-sessions/bytes-to-sockets/page.tsx` — currently just a "Content in progress" stub. This build replaces its contents entirely.
- Nav already links here correctly (`Nav.tsx` → "Weekend Sessions" → "Bytes to Sockets" → `/weekend-sessions/bytes-to-sockets`). No nav changes needed for this route itself.
- Source content is the "From Bytes to Sockets" JIT college talk (17-slide deck + 8-page speaker script) — a free 1h50m talk given 17 Aug 2026 at Jyothy Institute of Technology. This build repackages that content as a paid, standalone weekend product for ESC's actual paying audience (early-career embedded engineers), not a recap of the college event.
- Price is confirmed by Vamsi at ₹3,999. Format is confirmed as live, cohort-style, one weekend session (not multi-week like the two big programs).
- Copy below has already been through one `dr-copy-pipeline` copychief pass — paste it as written, don't paraphrase.
- **Do not reuse `DoubtCloudHero`'s existing `STATEMENTS` pattern from the other two pages** (identity/doubt statements like "I can make it work, I just can't explain why"). This page's ring uses **PDU labels** instead — see Section 1. That's a deliberate content choice tied to this page's own hook (protocol encapsulation), not an oversight.

---

## 1. Hero

```tsx
<DoubtCloudHero
  statements={[
    "ETHERNET FRAME — MAC / FCS",
    "IP PACKET — SRC/DST IP · TTL",
    "TCP SEGMENT — PORTS · SEQ/ACK",
    "PAYLOAD — SDU",
  ]}
  modelPath="/models/bytes-to-sockets-hero.glb"
  backgroundImage="/images/hero/bytes-to-sockets-hero-bg.jpg"
  pageTitle="Bytes to Sockets"
/>
```

**Two assets this needs before it will render correctly — flagged in Section 8, don't fabricate placeholders for these:**
- `public/models/bytes-to-sockets-hero.glb` — Vamsi has this already (Tripo-exported RJ45-connector model). Needs to be copied into that path.
- `public/images/hero/bytes-to-sockets-hero-bg.jpg` — does not exist yet. Confirm with Vamsi whether this page gets a dedicated background photo (like `doubt-cloud-bg.jpg` / `architecture-hero-bg.jpg` on the other two pages) or should render against a plain `--paper`/dark-teal backdrop with no photo, since the hero object here is the visual, not a personal photo. Don't guess — ask, or omit the `backgroundImage` prop entirely and let it fall through to whatever `DoubtCloudHero`'s CSS does with no `--hero-bg-image` set, and flag that as a decision point in the PR/handoff.

---

## 2. Workflow D — one scroll-scrubbed statement

Sourced verbatim from the source material's own promise line — don't paraphrase:

> By the end of this weekend, / you'll have captured real network traffic, / read it byte by byte, / and written the code behind it — / yourself.

Break into spans exactly at those slashes, same RAF scroll-progress / `prefers-reduced-motion` mechanics as the other two pages' Workflow D sections.

---

## 3. Workflow E content blocks, in order

**3.1 — What's In It For You**

> There's a JD sitting somewhere in your feed right now that pairs "RTOS" with "networking fundamentals" in the same paragraph. You've got the first half. This weekend gets you the second.
>
> You've debugged registers. You've traced interrupts. The moment a packet leaves your device, though, it turns into someone else's problem — a black box you send bytes into and hope. That gap costs you three ways: you can't debug a network issue without guessing, you can't hold a conversation about security or AI infrastructure without the protocol layer underneath it, and your resume reads "embedded" when the job increasingly wants "embedded that also understands the wire."
>
> This weekend closes that gap the same way you'd learn any other layer of the stack — by opening it up and watching it work. You'll capture live traffic in Wireshark, read an HTTP request byte-by-byte through three protocol layers, watch a TCP handshake execute the exact state-transition table you built on paper, then write your own socket code from scratch — no requests library, no urllib, just `socket()`, `connect()`, `send()`, `recv()`.

Callout directly under it:

> What We Promise: the next time a device you built can't talk to something — a socket that won't connect, a request that times out, a packet that never arrives — you'll know exactly which layer to open first. Not because you memorized a diagram. Because you've already opened one, live, and watched where it broke.

**3.2 — Early CTA** (`Button variant="outline"`, `href="/apply/bytes-to-sockets"`)

> See What's Inside the Weekend →

**3.3 — Mechanism** (reuse `StageDiagram` component, 4 stages, icons from `lucide-react`)

| Marker | Icon | Label | Description |
|---|---|---|---|
| 1 | `Layers` | Protocol Theory | Encapsulation as a shipping journey, then the naive-switch-statement vs. state-transition-table split that separates a demo from something maintainable. |
| 2 | `CircuitBoard` | Hardware Show & Tell | Three real boards — W5500, STM32, nRF52840 — each answering differently: where does silicon end and your code begin. |
| 3 | `Radio` | Two Live Demos | HTTP over TCP and TFTP over UDP, same Wireshark window, two completely different design philosophies, both visible in the packets. |
| 4 | `Terminal` | Socket Programming | The Unix truth that a socket is just a file descriptor — then writing the exact call a browser makes, yourself, from scratch. |

No intro/closing lines needed for this instance — pass stages only.

**3.4 — Qualifying block** (`ForYouList`)

```
notForYou: [
  "You're looking for a certification — this is a rep, not a credential.",
  "You want someone to hand you notes instead of a packet you decoded yourself.",
  "\"I'll get to it later\" is where this goes after you buy it — the weekend only pays off if you actually run the demos.",
]
forYou: [
  "You've shipped firmware but never opened Wireshark on purpose.",
  "You want to debug the network layer instead of escalating it to someone else.",
  "You're staring at a job description that suddenly wants \"networking fundamentals\" next to \"RTOS.\"",
]
```

**3.5 — Mid CTA** (`Button variant="outline"`, same href)

> Reserve Your Spot →

**3.6 — Testimonials** (`ProgramTestimonials`, placeholder array, same `TODO(vamsi)` + dev-banner pattern as the other two pages — this has never run as a paid product before, so there is genuinely nothing real to slot in yet)

```
testimonials: [
  { quote: "Placeholder testimonial quote 1 — swap with a real Bytes to Sockets cohort quote once available.", nameRole: "Mentee Name 1 · Role, Company" },
  { quote: "Placeholder testimonial quote 2 — swap with a real Bytes to Sockets cohort quote once available.", nameRole: "Mentee Name 2 · Role, Company" },
  { quote: "Placeholder testimonial quote 3 — swap with a real Bytes to Sockets cohort quote once available.", nameRole: "Mentee Name 3 · Role, Company" },
]
```

**3.7 — What You Walk Away With**

> You walk away with a TCP client you wrote from raw sockets, a decoded HTTP and TFTP capture you can reference the next time something breaks, and the state-transition-table mental model applied to a protocol you watched execute live, not just read about.

Callout directly under it:

> No guarantee that you'll master networking in a weekend — nobody does, and anyone promising that is selling the certification, not the skill. What you get is the first real rep: the one that turns "I read about sockets once" into "I've written socket code and watched it hit the wire."

**3.8 — Format / Price**

> Live, cohort-style. One weekend session.
>
> This isn't a slice of the multi-month Software Design or Architecture programmes — it's a focused, single-weekend rep on a skill most embedded engineers never open on purpose: the wire itself. That focus is exactly why it's priced as an entry point, not a fraction of a full programme.

Price display: `₹3,999`

**3.9 — Primary CTA** (`Button variant="primary"`, same orange-glow inline `boxShadow` style as the Design/Architecture primary buttons, `href="/apply/bytes-to-sockets"`)

> Write The Code Yourself

Friction-reducer line below it:

> One weekend. ₹3,999 once. No prerequisites beyond basic C.

---

## 4. Apply stub + BACKEND-TODO update

Neither `/apply/bytes-to-sockets` nor `/apply/ble-in-weekend` nor `/apply/lm75-driver-architecture` exist yet — only the two program-page apply routes do. Create `app/apply/bytes-to-sockets/page.tsx` following the exact pattern of `app/apply/embedded-software-design/page.tsx` (same `ApplyForm` component, no new component needed):

```tsx
<ApplyForm
  programLabel="Bytes to Sockets"
  qualifyingQuestion="What's a networking issue you've hit that you couldn't debug because you didn't know what layer to look at?"
/>
```

Add this stub to `BACKEND-TODO.md`'s "Stubbed application forms" list, same format as the two existing entries.

---

## 5. Nav testing

From home and from this new page, click: Nav → Weekend Sessions → Bytes to Sockets (lands here); both CTA buttons → `/apply/bytes-to-sockets` (lands on the stub form, not a 404); the `overHero` dark/light logo-switching behavior over the new 3D hero, same check as was done for the two program pages. Actually run the dev server for this, don't just read the code.

---

## 6. Refactor / quality pass

- Run the `esc-design-system` skill against every new file this touches.
- Reuse `StageDiagram`, `ForYouList`, `Callout`, `ProgramTestimonials`, `Button`, `ScrollStatement`, `DoubtCloudHero` as-is — this page introduces zero new components, only new data passed into existing ones. If you find yourself wanting a new component, stop and check whether an existing one actually fits first.
- Lint/typecheck clean on touched files.
- `prefers-reduced-motion` respected in Workflow D (static fallback, no scrub).

---

## 7. Acceptance checklist

- [ ] Hero → Workflow D → Workflow E, same order as the two program pages, nothing skipped
- [ ] Hero ring shows the four PDU labels, not generic doubt statements
- [ ] `bytes-to-sockets-hero.glb` is in place and rendering (not the fallback loader stuck forever) — if the GLB file hasn't been handed off yet, stop here and flag it rather than shipping a broken hero
- [ ] Background-image decision (Section 1) resolved one way or the other, not silently defaulted
- [ ] All copy matches Section 3 verbatim — no exclamation marks, no paraphrase
- [ ] Three CTA touchpoints present, escalating outline → outline → primary, all pointing at `/apply/bytes-to-sockets`
- [ ] Testimonials are the real placeholder component with TODO + dev banner, not omitted
- [ ] `/apply/bytes-to-sockets` stub created and logged in `BACKEND-TODO.md`
- [ ] Nav + both CTAs actually clicked in a running dev server, not just read in code
- [ ] `esc-design-system` skill run against all new/changed files
- [ ] Lint/typecheck clean

---

## 8. Open items — need Vamsi's call before/while building, don't guess

1. **GLB file handoff** — Vamsi has the Tripo-exported model but it isn't in the repo yet. Needs to land at `public/models/bytes-to-sockets-hero.glb` before the hero will render (currently would hit `DoubtCloudHero`'s loading-fallback state forever).
2. **Hero background image** — dedicated photo (matching the other two pages' pattern) vs. plain backdrop with no photo. Not decided yet.
3. **BLE In Weekend and LM75 Driver Architecture** — this same page-factory correction (full hero treatment, not thumbnails-only) presumably applies to those two weekend-session pages too, once their source content and pricing are ready. Not in scope for this build, flagging so it isn't re-litigated as a surprise later.

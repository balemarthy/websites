# Backend TODO

Checklist of every stubbed form/route created during the ESC program child-page build
(2026-09-16), so backend wiring is a single checklist rather than a code hunt.

## Stubbed application forms

- [ ] `esc/app/apply/embedded-software-design/page.tsx` — `ApplyForm` (name, email, one
      qualifying question). `onSubmit` currently only calls `e.preventDefault()` — no
      submission handler, no success state, nothing sent anywhere.
- [ ] `esc/app/apply/embedded-software-architecture/page.tsx` — same `ApplyForm` component,
      different program label/qualifying question. Same non-functional `onSubmit`.
- [ ] `esc/app/apply/bytes-to-sockets/page.tsx` — same `ApplyForm` component, different program
      label/qualifying question. Same non-functional `onSubmit`.
- [ ] `esc/app/apply/ble-in-weekend/page.tsx` — same `ApplyForm` component, different program
      label/qualifying question. Same non-functional `onSubmit`.
- [ ] `esc/app/apply/lm75-driver-architecture/page.tsx` — same `ApplyForm` component, different
      program label/qualifying question. Same non-functional `onSubmit`.
- [ ] `esc/components/sections/ApplyForm.tsx` — the shared component all pages above render.
      Wire this file's `handleSubmit` once there's a real endpoint/automation to POST to
      (GHL, a Next.js API route, etc.) — all apply pages pick it up automatically.

## Placeholder testimonials (not a form, but also blocking launch)

- [ ] `esc/app/programs/embedded-software-design/page.tsx` — `TESTIMONIALS` array, passed to
      `ProgramTestimonials`. Marked with a `TODO(vamsi)` comment and a dev-only on-page banner
      ("PLACEHOLDER TESTIMONIALS — replace before launch") that only renders outside production.
- [ ] `esc/app/programs/embedded-software-architecture/page.tsx` — same, separate placeholder
      array for the Architecture cohort.
- [ ] `esc/app/weekend-sessions/bytes-to-sockets/page.tsx` — same, separate placeholder array;
      this product has never run before, so there's genuinely nothing real to slot in yet.
- [ ] `esc/app/weekend-sessions/ble-in-weekend/page.tsx` — same, separate placeholder array;
      this product has never run before, so there's genuinely nothing real to slot in yet.
- [ ] `esc/app/weekend-sessions/lm75-driver-architecture/page.tsx` — same, separate placeholder
      array; none of the six stages have been built/traced on hardware yet as of this page
      shipping, so there's genuinely nothing real to slot in yet.
- [ ] `esc/components/sections/ProgramTestimonials.tsx` — accepts a `testimonials` prop, so
      swapping in real quotes for each page is a one-line data change, no component edits
      needed.

## Downloads, About, Blog build-out (2026-09-18)

- [ ] `esc/app/downloads/page.tsx` — `DOWNLOADS` array lists three real, confirmed-in-progress
      pieces (Embedded C Design Patterns, GET-SET Protocol Specification, Zero-Copy UART Command
      Handler) at placeholder prices within the ₹99–₹299 lead-magnet band. Needs: (1) the actual
      PDF files exported into `esc/public/downloads/`, (2) each price confirmed or corrected,
      (3) each "Get This" `Button` currently has `href="#"` — wire to each title's real GHL
      landing page once it exists.
- [ ] `esc/app/about/page.tsx` — "Book Time With Me" `Button` has `href="#"` — no live booking
      destination yet. Point it at the Topmate link or GHL booking URL once that flow is built.

## Blog nav → GHL (2026-09-26)

- [ ] `esc/lib/links.ts` — `BLOG_URL` still `"#"`. Referenced from the Nav "Blog" item
      (desktop + mobile, `esc/components/layout/Nav.tsx`). `esc/app/blog/page.tsx` keeps
      its existing empty-state content only while `BLOG_URL` is `"#"`; once real, that
      route redirects straight to it.

## Already real, no action needed

- Homepage `ProgramCards.tsx` CTAs ("Start with Design" / "Start with Architecture") already
  point at the two program pages above (`/programs/embedded-software-design`,
  `/programs/embedded-software-architecture`) — real routes, not stubs.
- Homepage `Hero.tsx` CTA ("See the Programs") already points at `#programs`, a real anchor on
  the same page.
- `StickyCtaBar` ("Explore Programs", global on every page) already points at `/#programs`, a
  real route + anchor.
- `/weekend-sessions/bytes-to-sockets`, `/weekend-sessions/ble-in-weekend`, and
  `/weekend-sessions/lm75-driver-architecture` are now real, full-content pages (hero + Workflow D
  + Workflow E), no longer placeholders — see the stubbed application form and placeholder
  testimonials entries above for what's still outstanding on each.
- `/downloads`, `/about`, `/blog` are now real, full-content pages (2026-09-18 build), no longer
  "content in progress" placeholders — see the Downloads/About/Blog entry above for what's still
  outstanding on each.

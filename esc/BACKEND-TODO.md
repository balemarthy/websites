# Backend TODO

Checklist of every stubbed form/route created during the ESC program child-page build
(2026-09-16), so backend wiring is a single checklist rather than a code hunt.

## Stubbed application forms

- [ ] `esc/app/apply/embedded-software-design/page.tsx` — `ApplyForm` (name, email, one
      qualifying question). `onSubmit` currently only calls `e.preventDefault()` — no
      submission handler, no success state, nothing sent anywhere.
- [ ] `esc/app/apply/embedded-software-architecture/page.tsx` — same `ApplyForm` component,
      different program label/qualifying question. Same non-functional `onSubmit`.
- [ ] `esc/components/sections/ApplyForm.tsx` — the shared component both pages above render.
      Wire this file's `handleSubmit` once there's a real endpoint/automation to POST to
      (GHL, a Next.js API route, etc.) — both apply pages pick it up automatically.

## Placeholder testimonials (not a form, but also blocking launch)

- [ ] `esc/app/programs/embedded-software-design/page.tsx` — `TESTIMONIALS` array, passed to
      `ProgramTestimonials`. Marked with a `TODO(vamsi)` comment and a dev-only on-page banner
      ("PLACEHOLDER TESTIMONIALS — replace before launch") that only renders outside production.
- [ ] `esc/app/programs/embedded-software-architecture/page.tsx` — same, separate placeholder
      array for the Architecture cohort.
- [ ] `esc/components/sections/ProgramTestimonials.tsx` — accepts a `testimonials` prop, so
      swapping in real quotes for each page is a one-line data change, no component edits
      needed.

## Already real, no action needed

- Homepage `ProgramCards.tsx` CTAs ("Start with Design" / "Start with Architecture") already
  point at the two program pages above (`/programs/embedded-software-design`,
  `/programs/embedded-software-architecture`) — real routes, not stubs.
- Homepage `Hero.tsx` CTA ("See the Programs") already points at `#programs`, a real anchor on
  the same page.
- `StickyCtaBar` ("Explore Programs", global on every page) already points at `/#programs`, a
  real route + anchor.
- `/weekend-sessions/bytes-to-sockets`, `/weekend-sessions/ble-in-weekend`,
  `/weekend-sessions/lm75-driver-architecture`, `/downloads`, `/about`, `/blog` all exist as
  real routes (placeholder "content in progress" pages, not dead links).

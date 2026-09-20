# BVE — build status & backend TODO

Tracking file for balemarthyvamsi.com, mirroring the pattern in `esc/BACKEND-TODO.md`
and `dnm/IMAGES-NEEDED.md`. Created 2026-09-17 because BVE had no equivalent file —
flagged as the first gap to close in the ESC/BVE/DNM status audit.

## Where BVE stands

Homepage is real and fully coded: `Hero`, `Marquee`, `ProgramCards`, `ProgramStacks`,
`Battlefield`, `AboutAuthority`, `Testimonials`, `Newsletter`. Tagged `bve-v1.0.0`
(commit `49588ba`).

All five child-page routes exist but are literal stubs — heading + "Content in
progress. Check back soon." — no markup beyond that:

- `app/about/page.tsx`
- `app/career-fluency/page.tsx`
- `app/technical-branding/page.tsx`
- `app/consulting/page.tsx`
- `app/contact/page.tsx`

The routes, nav, and page-factory template (see `../page-factory-system.md`) are ready
to receive content the moment each page's content is decided — no structural work
blocks any of these, only content/business decisions.

## Per-page: what's needed before a build prompt can be written

- [ ] **Career Fluency** — program/service content: what it includes, format, price.
      Source material: the `Resume-System` worksheets (Value Proposition → Content
      Bank → Experience Bullets → Career Summary) are BVE's own confirmed product —
      natural raw material for this page's mechanism/methodology section, but still
      need format + price locked with Vamsi before writing sellable copy.
- [ ] **Technical Branding Fluency** — no source document has surfaced anywhere in the
      audit. From-scratch brief needed: what the service delivers, for whom, at what
      price.
- [ ] **Consulting** — Vamsi-as-himself territory (the one deliberate exception to the
      Arjun/Priya hero-logic on BVE pages). Needs: scope, engagement shape, price,
      proof/case examples from Vamsi directly.
- [ ] **About** — Vamsi's own story, positioned for a mid-career audience. Must not
      reuse ESC's About page framing (early-career) verbatim.
- [ ] **Contact** — lowest-effort page, but confirm the form posts to BVE's own domain.
      Live-site audit attempted 2026-09-17 — could not fetch balemarthyvamsi.com/contact (robots.txt blocked the fetch tool). Still needs a manual check by Vamsi (view page source or submit a test message and see where it lands) before this page ships.

## Hero-logic reminder (per the Architecture Brief)

Arjun and Priya carry all BVE pages above except Consulting (Vamsi-as-himself) and the
homepage. Don't default to Vamsi's own voice/image on Career Fluency or Technical
Branding — that's the one rule most likely to get missed by habit, since ESC and DNM
don't have this split.

## Once each page's content is locked

Build to the same locked template already proven 5x on ESC: 3D hero (or BVE's chosen
hero mechanic per `bve-hero-videos` decisions) → Workflow D scroll-scrubbed statement →
Workflow E content blocks → 3-CTA escalation (outline, outline, primary). Write a
build prompt to `bve/build-prompts/<page-slug>-build.md`, same convention as
`esc/build-prompts/`. Log any stubbed form/route here, same convention as
`esc/BACKEND-TODO.md`.

## Not yet started

- No `build-prompts/` folder exists yet for BVE — create on the first page that locks.
- No apply/registration form wiring exists for BVE yet — nothing to log until a page
  with a form is built.

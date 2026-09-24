# BVE — build status & backend TODO

Tracking file for balemarthyvamsi.com, mirroring the pattern in `esc/BACKEND-TODO.md`
and `dnm/IMAGES-NEEDED.md`. Created 2026-09-17; rewritten 2026-09-24 after the
ESC/BVE/DNM technical audit found the original route list (about, career-fluency,
technical-branding, consulting, contact) no longer matched the repo.

## Where BVE stands

Eight real routes. Every nav link resolves; no missing pages.

| Route | Status |
|---|---|
| `/` | Real — homepage (`Hero`, `Marquee`, `ProgramCards`, `ProgramStacks`, `Battlefield`, `AboutAuthority`, `Testimonials`, `Newsletter`). Tagged `bve-v1.0.0` (commit `49588ba`). |
| `/campus-to-career` | Real, shipped content — CTAs still dead, see below. |
| `/resume-review` | Real, shipped content — primary CTA still dead, see below. |
| `/linkedin-profile` | Real, shipped content — CTAs wired to Topmate (`PROFILE_SESSION_URL`). |
| `/blog` | Real, shipped content. |
| `/downloads` | Real, shipped content. |
| `/clarity-visibility` | Stub — "Content in progress. Check back soon." No copy yet. |
| `/industry-consulting` | Stub — "Content in progress. Check back soon." No copy yet. |

The routes, nav, and page-factory template (see `../page-factory-system.md`) are ready
to receive content the moment each stub page's content is decided — no structural work
blocks either one, only content/business decisions.

## Dead CTAs (no destination provided yet)

Every registration/booking CTA on the site will point at a GoHighLevel (GHL) page. The
GHL backend isn't built yet; Vamsi will supply all the links at once when it is. Until
then these stay `href="#"`, marked in code with a `TODO(vamsi)` comment. Wire the same way
`app/linkedin-profile/page.tsx` does: a named URL const near the top of the file,
referenced from both the hero CTA and the closing `ReframeBand` CTA.

- [ ] `bve/app/resume-review/page.tsx` — "Get Your Free Resume Audit →" primary `Button`
      has `href="#"`. Needs the real Resume Review booking/payment destination (Topmate,
      GHL, or similar). The closing `ReframeBand` CTA is already wired
      (`STRATEGY_SESSION_URL`).
- [ ] `bve/app/campus-to-career/page.tsx` — "Request a Session →" primary `Button` **and**
      the closing `ReframeBand` CTA ("Request a Session") both have `href="#"`. Needs the
      real Campus-to-Career booking/request destination. (Also flagged in
      `pending-items-master-list-2026-09-23.md`.)

## Per-page: what's needed before a build prompt can be written

- [ ] **Clarity & Visibility** (`/clarity-visibility`) — program/service content: what it
      includes, format, price. Waiting on research.
- [ ] **Industry Consulting** (`/industry-consulting`) — Vamsi-as-himself territory (the
      one deliberate exception to the Arjun/Priya hero-logic on BVE pages). Needs: scope,
      engagement shape, price, proof/case examples from Vamsi directly. Waiting on research.

## Hero-logic reminder (per the Architecture Brief)

Arjun and Priya carry all BVE pages except Consulting (Vamsi-as-himself) and the
homepage. Don't default to Vamsi's own voice/image on the other child pages — that's the
one rule most likely to get missed by habit, since ESC and DNM don't have this split.

## Once each stub page's content is locked

Build to the same locked template already proven 5x on ESC: 3D hero (or BVE's chosen
hero mechanic per `bve-hero-videos` decisions) → Workflow D scroll-scrubbed statement →
Workflow E content blocks → 3-CTA escalation (outline, outline, primary). Write a
build prompt to `bve/build-prompts/<page-slug>-build.md`, same convention as
`esc/build-prompts/`. Log any stubbed form/route or dead CTA here, same convention as
`esc/BACKEND-TODO.md`.

## Not yet started

- No `build-prompts/` folder exists yet for BVE — create on the first page that locks.

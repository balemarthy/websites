# BVE — build status & backend TODO

Tracking file for balemarthyvamsi.com, mirroring the pattern in `esc/BACKEND-TODO.md`
and `dnm/IMAGES-NEEDED.md`. Created 2026-09-17; rewritten 2026-09-24 after the
ESC/BVE/DNM technical audit found the original route list (about, career-fluency,
technical-branding, consulting, contact) no longer matched the repo.

## Where BVE stands

Eight real routes. Every nav link resolves; no missing pages, no stubs left.
Updated 2026-09-26: Clarity & Visibility and Industry Consulting shipped full content;
Blog nav now points at `BLOG_URL` (GHL) instead of the local `/blog` route.

| Route | Status |
|---|---|
| `/` | Real — homepage (`Hero`, `Marquee`, `ProgramCards`, `ProgramStacks`, `Battlefield`, `AboutAuthority`, `Testimonials`, `Newsletter`). Tagged `bve-v1.0.0` (commit `49588ba`). |
| `/campus-to-career` | Real, shipped content — CTAs still dead, see below. |
| `/resume-review` | Real, shipped content — primary CTA still dead, see below. |
| `/linkedin-profile` | Real, shipped content — CTAs wired to Topmate (`PROFILE_SESSION_URL`); "See how I do it" link still dead, see below. |
| `/blog` | Real, empty-state content. Nav "Blog" now points at `BLOG_URL` (`lib/links.ts`), not this route — this page only still renders while `BLOG_URL` is `"#"`; once real, it redirects here to there. |
| `/downloads` | Real, shipped content. |
| `/clarity-visibility` | Real, shipped content (2026-09-26) — CTAs still dead, see below. |
| `/industry-consulting` | Real, shipped content (2026-09-26) — CTAs still dead, see below. |

The routes, nav, and page-factory template (see `../page-factory-system.md`) are ready
to receive content the moment each stub page's content is decided — no structural work
blocks either one, only content/business decisions.

## Dead CTAs (no destination provided yet)

Every registration/booking CTA on the site will point at a GoHighLevel (GHL) page. The
GHL backend isn't built yet; Vamsi will supply all the links at once when it is. Until
then these stay `"#"`, centralized in `bve/lib/links.ts` (2026-09-26 — previously a
per-page named const, e.g. `PROFILE_SESSION_URL` in `app/linkedin-profile/page.tsx`;
new pending links go in `lib/links.ts` instead, each with a `TODO(Vamsi)` comment).

- [ ] `bve/lib/links.ts` — `BOOK_CALL_CLARITY`, `BOOK_CALL_CONSULTING`, `LINKEDIN_URL`,
      `BLOG_URL` all still `"#"`. Referenced from `/clarity-visibility`,
      `/industry-consulting`, the "See how I do it" link on `/linkedin-profile`, and the
      Blog nav item (desktop + mobile) respectively.
- [ ] `bve/app/resume-review/page.tsx` — "Get Your Free Resume Audit →" primary `Button`
      has `href="#"` (not yet moved to `lib/links.ts`). Needs the real Resume Review
      booking/payment destination (Topmate, GHL, or similar). The closing `ReframeBand`
      CTA is already wired (`STRATEGY_SESSION_URL`).
- [ ] `bve/app/campus-to-career/page.tsx` — "Request a Session →" primary `Button` **and**
      the closing `ReframeBand` CTA ("Request a Session") both have `href="#"`. Needs the
      real Campus-to-Career booking/request destination. (Also flagged in
      `pending-items-master-list-2026-09-23.md`.)

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

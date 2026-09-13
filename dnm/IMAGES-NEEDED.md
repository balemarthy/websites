# DNM — assets needed to finish the site

The site is fully coded and wired up. Everything below is a drop-in swap —
once a file lands at the given path, update the one line noted and the
placeholder disappears. No layout/component work should be needed for any
of these.

Reminder: DNM is faceless with respect to Vamsi specifically — no photo,
headshot, or likeness of Vamsi anywhere on this site. This does not mean
no human faces at all: other people (actors, illustrated characters) are
fine, and are exactly how the hero already tells the Guru/Gowri/Gaurav
story — see below.

## 1. Logo (optional — currently a text wordmark)

The nav and footer currently render "DigitalNetworkMarketer" as styled text
(Network in orange) — this is brand-compliant on its own and doesn't block
launch. If Vamsi wants an actual logo mark instead of the text wordmark:

- File: `public/logo/dnm-logo.svg` (SVG preferred) or `.png`
- Swap point: `components/layout/Nav.tsx` (`Wordmark()`) and
  `components/layout/Footer.tsx`

## 2. Hero visual — done, not a placeholder

This is no longer outstanding. `Hero.tsx` runs a real scroll-driven
frame sequence on desktop (`public/frames/`, 148 frames) and static
per-character images on mobile (`public/hero-mobile/`), cycling through
three real actors playing Guru, Gowri, and Gaurav. This satisfies the
faceless-re-Vamsi rule above (none of them are Vamsi) and needs no
further asset work.

## 3. Testimonials (content, not images)

No headshots needed — cards currently show name/role text only, no avatar.
If real testimonials should carry a small avatar later, a real headshot
of the testimonial-giver is fine (they're not Vamsi) provided they've
consented to appear — illustrated avatar or initials also work if that's
preferred instead. Flag the choice before adding.

- Swap point: `components/sections/Testimonials.tsx` (`TESTIMONIALS` array)

## Not image-blocked (already fully built)

These sections use Lucide icons (already wired, no image files needed) and
placeholder copy only — they need Vamsi's copy review, not artwork:

- `FeatureGrid.tsx` — "What's Inside" 3-card grid
- `Framework.tsx` — three shuffle-stacks (Setup / Visibility & Content /
  Consistency System)
- `Battlefield.tsx` — the villain/risk section. **Flagged separately below.**
- `HowItWorks.tsx` — faceless system-trust section
- `WebinarCTA.tsx` / `ReframeBand.tsx` — closing CTA + mandatory reframe band

## Copy still needs Vamsi, separately from images

The DNM design skill (`anthropic-skills:dnm-design-system`) explicitly flags
the villain/reframe stack as real open work that hasn't been brainstormed
yet — every headline, the `Battlefield.tsx` beats, and the `ReframeBand.tsx`
statement are draft scaffolding built from the skill's one worked example,
not locked copy. Review these with Vamsi before this goes live; swapping
images alone won't make the page launch-ready.

Also confirm before launch: the webinar-registration funnel mechanic (vs. a
lead-magnet download) is still current — the forms in `Hero.tsx` and
`WebinarCTA.tsx` are markup-only and need to be wired to the real
registration flow (GHL form embed or similar).

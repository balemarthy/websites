# DNM — assets needed to finish the site

The site is fully coded and wired up. Everything below is a drop-in swap —
once a file lands at the given path, update the one line noted and the
placeholder disappears. No layout/component work should be needed for any
of these.

Reminder: DNM is fully faceless — no photo, headshot, or likeness of Vamsi
anywhere on this site. Where a "person" is needed, use an illustrated
Guru/Gowri character or an abstract/icon-based visual instead.

## 1. Logo (optional — currently a text wordmark)

The nav and footer currently render "DigitalNetworkMarketer" as styled text
(Network in orange) — this is brand-compliant on its own and doesn't block
launch. If Vamsi wants an actual logo mark instead of the text wordmark:

- File: `public/logo/dnm-logo.svg` (SVG preferred) or `.png`
- Swap point: `components/layout/Nav.tsx` (`Wordmark()`) and
  `components/layout/Footer.tsx`

## 2. Hero visual (highest priority — most visible empty slot)

- File: `public/hero/hero-visual.png` (or `.svg`)
- Spec: roughly square, ~640×640px source, transparent background
- Content: a Guru/Gowri illustrated character, or an abstract
  digital-income visual (chart/network/device motif) — never a real photo
- Swap point: `components/sections/Hero.tsx` — replace the `.visualSlot`
  placeholder `<div>` with a `next/image` `<Image>` tag (the exact
  replacement snippet is left as a comment right above the placeholder)

## 3. Testimonials (content, not images)

No headshots needed — cards currently show name/role text only, no avatar.
If real testimonials should carry a small avatar later, that's a new
decision (illustrated avatar or initials, not a photo, to stay
faceless-consistent) — flag it before adding.

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

# Project Brief — Igloo-style Animated Website

Date: 2026-09-03

## Goal

Build a high-production, animated marketing/portfolio website similar in feel to
[igloo.inc](https://www.igloo.inc/) — full-bleed motion, custom typography,
generated video/image assets — using:

- **Coding**: this Claude Code session
- **Hosting**: Hostinger
- **AI images/video**: OpenArt credits
- **Time**: no hard deadline, iterate until it's right

This file is the record of the initial feasibility discussion, so it can be picked
up again from a different machine (laptop → desktop) without losing context.

## Reference site findings

Loaded https://www.igloo.inc/ directly in a browser and inspected it:

- The entire page is a **single full-bleed WebGL/canvas surface** — a soft,
  animated radial gradient (looks like Three.js or a raw fragment shader).
- The accessibility tree came back **completely empty** — no semantic HTML
  text nodes, meaning the visible content is canvas-rendered, not standard
  DOM/CSS layout.
- This is the signature look of an "AI creative studio" homepage: custom
  cursor behavior, scroll-triggered motion, GPU-driven background, video
  reels layered on top of it.

**Implication**: this is not a simple template site. It's a portfolio/agency-grade
build. Nothing in it is impossible to replicate, but the difficulty is concentrated
in *polish and asset iteration*, not in core coding logic.

## Feasibility breakdown

| Layer | Difficulty | Notes |
|---|---|---|
| Page structure/layout | Easy | Standard sections — hero, work, about, contact. |
| Typography & static design | Easy–Medium | Pick 1–2 strong fonts, get spacing/contrast right. Taste + iteration. |
| Scroll animation / motion | Medium | Framer Motion or GSAP ScrollTrigger covers most fade/slide/scale-on-scroll effects. Well-documented. |
| WebGL background/shader effects | Medium–Hard | The one real skill gap. Doable with Three.js + an adapted (not from-scratch) shader. |
| Video/image assets | Medium | OpenArt generates hero loops, textures, product shots. Expect a prompt → review → regenerate loop to land a consistent style. |
| Hosting | Easy | Next.js static export works on Hostinger shared hosting; SSR needs their VPS tier. |

**Bottom line**: buildable by one determined person. The real time sink is asset
iteration (getting AI-generated video/images to look cohesive) and animation feel
(motion that reads as expensive, not janky) — not a technical wall.

## Recommended build order (so nothing feels "fallen from the sky")

1. **Skeleton** — plain HTML/CSS structure, no animation, no fancy assets. Nail
   the information architecture first.
2. **Typography + static visual pass** — real fonts, spacing, a color system.
3. **Content** — generate images/video via OpenArt, slot in as plain `<img>`/`<video>`.
4. **Motion** — layer in scroll/entrance animation once the static version
   already looks right.
5. **WebGL flourish (optional, last)** — highest effort / lowest necessity;
   only tackle once everything else is solid.

## Suggested tech stack

- **Framework**: Next.js (React) — static export unless SSR is actually needed
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (component-level) + GSAP ScrollTrigger (scroll-driven)
- **3D/shader background**: Three.js, adapted from an existing open-source
  "fluid gradient" shader rather than written from scratch
- **Assets**: OpenArt for AI-generated hero video loops, background textures,
  product/portrait shots
- **Hosting**: Hostinger (static export → shared hosting; SSR → VPS plan)

## Repo layout plan (per user's intent)

- Top-level GitHub folder: `websites/` — holds every animated-website project
- Each project gets its own subfolder, named per-project (e.g. `websites/igloo-style-studio/`)
- Whole subfolder is checked out / checked in as a unit per project
- This brief (`PROJECT-BRIEF.md`) lives inside that project's subfolder so it
  travels with the repo across machines

## Status / next steps

- [ ] User creates `websites/` top-level folder in GitHub and a named subfolder
      for this specific site
- [ ] Move this file into that subfolder as `PROJECT-BRIEF.md`
- [ ] Resume with Claude Code from that folder to scaffold the actual project
      (Next.js app, Tailwind, folder structure) — step 1 of the build order above

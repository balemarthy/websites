# Cinematic Hero Build — Workflow Reference (v1)

**Scope of this doc:** the technical build workflows only — sourcing, generation, and code patterns for AI-driven hero sections. Which workflows get combined into which page templates, how that decision gets made, and the front-end (Next.js) vs. lead-capture (GHL) platform split are out of scope here — see [`page-factory-system.md`](page-factory-system.md).

---

## What counts as a "Workflow" here

A **workflow** is one atomic, self-contained technique — narrow enough to hand-hold someone through building *just that one effect*, step by step, with its own clear inputs and outputs. The test: could this stand alone as a Claude Code **Skill** (a `SKILL.md` plus its reference files) or a **Project** (an instructions doc plus supporting files) on its own, without needing the other workflows to make sense? If yes, it earns a letter (A, B, C, D...) in the table below.

Building an actual page by combining several workflows — e.g. a 3D hero + a text-highlight section + a scroll-reveal section, stacked into one child page — is **not itself a workflow**. It's a *composition*: an assembly that consumes two or more workflows as building blocks for one specific page. Compositions don't get a letter here; they get documented separately (per-page, or per-project) as "this page uses Workflow X for the hero, Workflow Y below it," referencing this doc rather than duplicating it.

---

## The Workflows, Cemented

| | Ambient Loop | Scroll-Driven Sequence | Mouse-Parallax Layer | Scroll-Scrubbed Text Highlight | Scroll-Reveal Content Blocks |
|---|---|---|---|---|---|
| Motion driver | Time (autoplay) | Scroll position | Cursor position | Scroll position | Viewport entry (one-shot trigger) |
| Source asset | 1 clip, trimmed to loop cleanly | Frame sequence (100–120 images), single continuous render or multi-state | None new — reuses existing layers/elements from A or B | None — pure text, no images/frames at all | None — reuses existing content blocks already on the page |
| Code pattern | `<video>` + scrim + rise-stagger entrance | `<canvas>` + RAF scroll handler + DPR scaling + preload/progress bar | Independent RAF loop + lerp toward pointer position → `translate3d` on 1–2 existing layers | Split heading into per-phrase `<span>`s + scroll-progress → tween each span's `color`/`opacity` | `IntersectionObserver` per block → toggle a class → CSS transition (opacity/translateY), then unobserve |
| Reference prompts | Nocturne, Orchid (Scrolltide — free tier) | 3d-scroll-website skill (Scrolltide gates this as Premium) | V3Code Design "Mythic Naturecore / Reverie" (`v3code.dev/design/plugins/_official/examples/mythic-naturecore/`) | zeuxinnovation.com/z-school/corporate-training/ (heading "Empower Teams for Design-First Execution at Scale.") | Standard pattern across most modern marketing sites — no single canonical reference, this is the common "fade/slide in as you scroll" seen everywhere |
| Tier | Baseline / commoditized | Premium — genuinely harder to fake | Additive polish — not a standalone workflow, bolts onto A or B | Lightest of the scroll-scrubbed workflows — no images, no canvas, no preload | Lightest overall — no RAF loop of any kind, browser-native trigger |
| Platform portability | Next.js — untested in GHL | Next.js — untested in GHL | Portable, likely — pure CSS/JS, no build step | Portable, likely — pure CSS/JS, no build step | Portable, likely — pure CSS/JS, no build step |

Workflows C, D, and E are not alternatives to choose between at intake alongside A/B — they're enhancements layered onto content that already exists (C bolts onto an existing hero's layers; D applies to any heading/section; E applies to any run of content blocks), added only when the brief wants that specific effect. None of them changes the scroll or autoplay logic already running underneath it.

---

## Workflow A — Ambient Video-Hero

1. **Intake** — brand basics, one core offer line, one mood reference (style only — never the literal source image).
2. **Asset gen** — base image → OpenArt (Kling or Seedance), image-to-video → 6–10s clip → trim/crossfade to a clean loop point.
3. **Prompt assembly** — reuse the Nocturne/Orchid skeleton for mechanics (scrim gradients, muted-loop autoplay, download-don't-hotlink, staggered rise-in); swap only palette, fonts, copy, nav, CTA.
4. **Build** — Claude Code locally, own GitHub repo.
5. **QA** — desktop + mobile before go-live.

## Workflow B — Scroll-Driven Frame Sequence

Same intake and asset-gen start, but the output is split into a frame sequence (via ffmpeg) instead of played as a loop, and built with a canvas + scroll-handler instead of a `<video>` tag. Use only where there's a real "reveal" worth scrolling for — a rotation, a transformation, a chaptered story — not as a default.

---

## Technical Primer — What the Scroll-Driven Build Actually Needs

These four things are what separate a real scroll-driven build from a slideshow that breaks the moment someone scrolls fast.

### Canvas
A `<canvas>` is a blank drawing surface controlled entirely by code — not a video file, just pixels that JavaScript draws on demand. The reason it's used instead of `<video>`: a video plays forward in time, but it can't jump to "exactly frame 47 of 120" the instant the user's scroll position says it should. A canvas can — code just tells it "draw this specific image right now," as many times a second as needed, in any order.

### RAF Scroll Handler
**RAF = `requestAnimationFrame`.** It's a browser instruction that means "run this function right before the screen's next redraw" — roughly 60 times a second, synced to the display, not synced to how fast the user is scrolling. Without it, a scroll event fires *hundreds* of times a second on a fast scroll, and if you redraw the canvas on every single one, the page chokes and stutters.

The **scroll handler** itself is the actual logic that runs each time: read how far down the page you've scrolled → convert that into a 0–1 "progress" number → pick the matching frame (`frame = progress × 120`) → draw it. RAF is just the pacing mechanism that keeps that logic running smoothly instead of frantically.

### DPR Scaling
**DPR = Device Pixel Ratio.** A retina phone or MacBook screen packs 2–3x more physical pixels into the same visible space than an older/cheaper screen. If you size a canvas only in normal ("CSS") pixels, it renders blurry on those high-density screens — like stretching a small image to fit a bigger frame. DPR scaling means: make the actual internal canvas buffer 2–3x larger than what's visually shown (`canvas.width = displayWidth × devicePixelRatio`), then let CSS shrink it back down to the right visible size. Net effect: crisp on retina, normal-sized everywhere else.

### Preload System with a Progress Bar
Because the scroll math needs to jump to *any* frame the instant it's needed, all 100–120 images must already be sitting in the browser's memory *before* scrolling starts — there's no time to fetch one mid-scroll without a visible blank flash. So the page loads every single frame up front, tracks how many have finished (`e.g. 74/120 loaded`), shows that as a real progress bar, and only unlocks scrolling once the count hits 100%. Skip this and the first few seconds of the experience look broken.

---

## Workflow C — Mouse-Parallax Layer (additive)

Distinct from A and B in one key way: it isn't driven by an asset pipeline at all. There's nothing new to generate or render — it's pure runtime behavior added on top of layers/elements that A or B already produced (a portrait image, a headline block, a background canvas).

**Mechanism:**
1. Track `pointermove`, normalize cursor position to `[-1, 1]` relative to viewport center. Store as a *target*, not applied directly.
2. Run a **second, independent `requestAnimationFrame` loop** (separate from the scroll RAF in Workflow B — the two must never be merged, since one reacts to scroll and the other to the cursor and they can't share a single progress variable) that lerps a *current* value toward that target each frame — a gentle chase (step ≈ 0.05–0.1/frame), not a snap.
3. Apply the lerped value as `translate3d(x, y, 0)` on 1–2 existing layers only — never the canvas/video element itself. Give each layer a different multiplier (e.g. foreground portrait 8px, background text 4px); the *differential* between layers is what reads as depth. Same offset on everything just looks like a pan.

**Guardrails this needs that the reference implementation skips:**
- Respect `prefers-reduced-motion: reduce` — disable the effect entirely.
- Disable on mobile/touch breakpoints — there's no persistent cursor, and it would fight whatever mobile fallback A/B already has.
- Cheap by construction: it's a `transform` on 1-2 elements, not a repaint, so it doesn't threaten the 60fps budget the RAF scroll handler in Workflow B already protects.

**When to reach for it:** only when the brief specifically wants a "reactive"/"alive" feel beyond what scroll alone gives — not a default addition to every hero. Source pattern and exact magnitudes (lerp step, per-layer px offsets) are documented in the Reverie reference above; treat its literal imagery and copy as reference-only, not something to reuse directly per-brand.

---

## Workflow D — Scroll-Scrubbed Text Highlight

The lightest of all four — no images, no canvas, no preload step. Confirmed by inspecting a live reference (`zeuxinnovation.com/z-school/corporate-training/`): its heading "Empower Teams for Design-First / Execution at Scale." is split into per-phrase `<span>`s, and as the page scrolls, each phrase's text color tweens from dim gray (`rgb(114,114,114)`) up to bright white (`rgb(250,250,250)`) and back down, one phrase at a time, tied 1:1 to scroll position — like a spotlight sweeping across the words. Their implementation uses GSAP ScrollTrigger (confirmed via the auto-generated `pin-spacer` wrapper class it leaves in the DOM when pinning a section), but the technique itself doesn't require that library.

**Mechanism:**
1. Split the target heading into one `<span>` per phrase/word (not per-letter unless the brief specifically wants that finer grain).
2. Pin the section for the duration of the effect (`position: sticky` on the containing block, same idea as the sticky stage in Workflow B — no separate library needed for the pin itself).
3. Reuse the same scroll-progress pattern already in `Hero.tsx` (read `section.getBoundingClientRect()` → convert to a 0–1 progress number in a scroll RAF loop) — but instead of picking a canvas frame index from it, map progress to *which span is "lit"* and tween that span's `color`/`opacity` between the dim and bright values. Adjacent spans stay dim; only the active one brightens, then dims back down as progress moves past its range.
4. No preload, no DPR scaling, no frame assets — this is CSS/JS-only against text already on the page.

**Where this differs from Workflow C:** C animates *position* (`translate3d`) in response to the *cursor*, independent of scroll. D animates *color/opacity* in response to *scroll progress*, the same driver as Workflow B — it's really a scroll-scrubbed effect like B, just applied to text properties instead of a frame index, which is exactly what makes it so much cheaper to build.

**When to reach for it:** any standalone heading/statement on a page — hero or a mid-page section — where the brief wants emphasis-through-motion without the cost of a full frame-sequence build. Good candidate for interior/child pages precisely because it needs no asset pipeline at all.

---

## Workflow E — Scroll-Reveal Content Blocks

The lightest workflow of all five — no RAF loop, no scroll-position math, no manual progress calculation whatsoever. This is the ordinary "content fades/slides in as you scroll down to it" pattern seen across most modern marketing sites — program details, feature cards, stat blocks, testimonials.

**Mechanism:**
1. Each content block starts in a hidden-but-present state via CSS (`opacity: 0; transform: translateY(24px);`) — never `display: none` or `visibility: hidden`, so it stays in the accessibility tree and doesn't break screen readers or "find on page."
2. Attach one `IntersectionObserver` (not a scroll listener — this is the key difference from B/D) watching all the blocks, with a threshold (e.g. `0.15`) for "how much of the block must be visible before it counts as entered."
3. When a block's callback fires as visible, toggle a class (e.g. `.is-visible`) that transitions it to its final state (`opacity: 1; transform: none;`) over ~0.5–0.8s ease-out.
4. **Unobserve that block immediately after it reveals.** This is a one-shot trigger, not a continuous scrub — once revealed, it stays revealed even if the visitor scrolls back up past it.
5. Optionally stagger multiple children within one block (`transition-delay` per child, e.g. 80ms apart) for a cascading feel rather than everything popping at once.

**Guardrails:**
- Respect `prefers-reduced-motion: reduce` — show blocks in their final state immediately, skip the transition.
- Content must already be real DOM content, not something injected only on reveal — the animation is cosmetic, not a loading mechanism.

**Why this is a genuinely different workflow, not a repeat of B or D:** B and D are *continuous scroll-scrubbing* — an exact scroll pixel maps to an exact frame/color, and scrolling back up reverses it in lockstep. E is a *binary, one-shot trigger* — "has this block been seen yet, yes or no" — driven by viewport entry, not by a live progress number, and it never reverses. Practically: B/D need a per-frame RAF loop reading `getBoundingClientRect()` every tick; E needs zero per-frame work — the browser's own `IntersectionObserver` fires only when something actually crosses the threshold, which is also why it's the cheapest of the five to run.

**When to reach for it:** the default choice for "everything below the hero" on a child/landing page — program details, curriculum lists, stat callouts, instructor bios, FAQ. It's what turns a static wall of content into something that feels alive without any of the asset-pipeline or RAF-loop cost the other workflows carry.

---

## Are these five actually distinct? (uniqueness check)

Run each workflow through three questions — what drives it, what it costs to build, and whether it repeats:

| | A — Ambient Loop | B — Scroll-Driven Sequence | C — Mouse-Parallax | D — Text Highlight | E — Scroll-Reveal |
|---|---|---|---|---|---|
| Driver | Time | Scroll (continuous) | Cursor (continuous) | Scroll (continuous) | Viewport entry (one-shot) |
| Per-frame work? | No (native video playback) | Yes — RAF loop every tick | Yes — separate RAF loop every tick | Yes — RAF loop every tick | No — event fires only on threshold cross |
| Needs new assets? | Yes — a video clip | Yes — a frame sequence | No — reuses A/B's layers | No — text only | No — reuses existing blocks |
| Reversible on scroll-up? | N/A (time-based) | Yes, in lockstep | N/A (cursor-based) | Yes, in lockstep | No — fires once, stays revealed |

No two rows are identical across all four columns, which is the actual test for whether a workflow earns its own letter rather than being a variant of another one. The closest pair is **B and D** (both scroll-scrubbed, both RAF-driven) — they're kept distinct because D needs no asset pipeline at all (text properties only, no canvas/preload/DPR concerns), which is a real difference in what you'd have to build, not just a cosmetic one. The pair most likely to be *confused in conversation* (not in mechanism) is **D and E** — both read as "stuff appearing as I scroll" to a viewer, but D is continuous and reversible, E is a one-time trigger — worth double-checking which one is meant whenever either comes up loosely.

---

## Multi-State Reveals — The Stitching Problem, and the Blender MCP Fix

A single OpenArt/Kling/Seedance clip, once split into frames, gives you **one continuous camera move** — good for a single scrubbable moment, but not the same as a true multi-state reveal (rotate → zoom → disassemble, like Apple's product pages), which needs several distinct states stitched together with matching lighting, angle, and subject position at every handoff. Gluing separate AI-generated clips together to fake this is fragile — lighting and camera rarely match cleanly across separate generations.

**Blender MCP solves this properly, not as a workaround.** It's a real, actively maintained tool (the most established version, `ahujasid/blender-mcp`, has 20k+ GitHub stars) that connects an AI agent directly to Blender's own Python API — so Claude can script an actual 3D scene (model, camera, lighting, keyframed animation) from natural-language instructions, inside one continuous scene. Because it's one scene with one camera and one lighting rig throughout, there's no handoff-matching problem at all — rotate, zoom, and disassemble all happen inside the same render, then export as an image sequence exactly like the frame-sequence pipeline expects.

This is also the more "correct" tool for the job per the 3d-scroll-website skill itself, which names Blender as the standard way to produce these frame sequences — Blender MCP just removes the requirement that Vamsi learn Blender's UI to do it; Claude drives it directly.

**Where this leaves the two source paths for Workflow B:**
- **AI video → frames** — fast, good for a single ambient scrubbable motion, no true multi-state capability.
- **Blender MCP → frames** — slower to set up per scene, but the only reliable path to a genuine multi-state chaptered reveal.

Which one a given build needs depends on whether the story is "one moment, scrubbed" or "several states, revealed" — a call to make per project, not a rule to fix in advance.

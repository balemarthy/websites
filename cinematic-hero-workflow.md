# Cinematic Hero Build — Workflow Reference (v1)

**Scope of this doc:** the technical build workflows only — sourcing, generation, and code patterns for AI-driven hero sections. Business model, pricing, and delivery (DNM + GHL, interns) are explicitly out of scope here — separate thread, separate document, later.

---

## The Two Workflows, Cemented

| | Ambient Loop | Scroll-Driven Sequence |
|---|---|---|
| Motion driver | Time (autoplay) | Scroll position |
| Source asset | 1 clip, trimmed to loop cleanly | Frame sequence (100–120 images), single continuous render or multi-state |
| Code pattern | `<video>` + scrim + rise-stagger entrance | `<canvas>` + RAF scroll handler + DPR scaling + preload/progress bar |
| Reference prompts | Nocturne, Orchid (Scrolltide — free tier) | 3d-scroll-website skill (Scrolltide gates this as Premium) |
| Tier | Baseline / commoditized | Premium — genuinely harder to fake |

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

## Multi-State Reveals — The Stitching Problem, and the Blender MCP Fix

A single OpenArt/Kling/Seedance clip, once split into frames, gives you **one continuous camera move** — good for a single scrubbable moment, but not the same as a true multi-state reveal (rotate → zoom → disassemble, like Apple's product pages), which needs several distinct states stitched together with matching lighting, angle, and subject position at every handoff. Gluing separate AI-generated clips together to fake this is fragile — lighting and camera rarely match cleanly across separate generations.

**Blender MCP solves this properly, not as a workaround.** It's a real, actively maintained tool (the most established version, `ahujasid/blender-mcp`, has 20k+ GitHub stars) that connects an AI agent directly to Blender's own Python API — so Claude can script an actual 3D scene (model, camera, lighting, keyframed animation) from natural-language instructions, inside one continuous scene. Because it's one scene with one camera and one lighting rig throughout, there's no handoff-matching problem at all — rotate, zoom, and disassemble all happen inside the same render, then export as an image sequence exactly like the frame-sequence pipeline expects.

This is also the more "correct" tool for the job per the 3d-scroll-website skill itself, which names Blender as the standard way to produce these frame sequences — Blender MCP just removes the requirement that Vamsi learn Blender's UI to do it; Claude drives it directly.

**Where this leaves the two source paths for Workflow B:**
- **AI video → frames** — fast, good for a single ambient scrubbable motion, no true multi-state capability.
- **Blender MCP → frames** — slower to set up per scene, but the only reliable path to a genuine multi-state chaptered reveal.

Which one a given build needs depends on whether the story is "one moment, scrubbed" or "several states, revealed" — a call to make per project, not a rule to fix in advance.

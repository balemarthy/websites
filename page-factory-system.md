# Page Factory System — Vision & Architecture (v1)

**Scope of this doc:** the higher-level system being designed on top of the workflow catalog — not the workflows themselves (see [`cinematic-hero-workflow.md`](cinematic-hero-workflow.md)), but how they get selected, assembled into templates, and deployed across two different platforms and three brands. This is a planning/vision document — nothing described here has been built yet, and no app code (`esc/`, `bve/`, `dnm/`) has been touched as part of it.

---

## Why this exists

This is not a one-off exercise for DNM. It's a shared system, applying equally to **ESC, BVE, and DNM** (and any future brand), whose goal is to churn out on-brand child pages and lead-magnet landing pages at scale — ideally site-ready in days, not weeks — by mixing and matching a fixed catalog of proven techniques instead of designing each page from scratch.

---

## The four layers

1. **Workflows** — atomic, self-contained techniques (see `cinematic-hero-workflow.md` for the full definition and the catalog: A–E documented so far, more to come — the 3D-object technique is still pending). Each one could stand alone as a Claude Code Skill or Project.
2. **Templates** — a fixed mix of workflows assigned to a page *type* (e.g. "Program page" = 3D hero + Workflow D + Workflow E; "Blog/Downloads index" = thumbnails + light D/E, no big hero). Templates should be extracted from real, shipped pages — not authored speculatively ahead of the first build.
3. **Design-decision layer** — the rules for which template/mix fits a given page type and brand ("programs get the 3D hero, blogs don't"). Deliberately deferred until at least one real template exists, so the rules come from actual decisions made, not guesses.
4. **Intake/brainstorming layer** — the client interview, asset/image collection, and brief-gathering that feeds the decision layer. Not started.

The end-to-end goal: interview → brainstorm → workflow/template selection → assembly → shipped page, repeatable across brands and clients, not just a bespoke build each time.

---

## Two platforms, one visual system

**Front end — Next.js (`esc/`, `bve/`, `dnm/`):** your own code, full control. The entire workflow catalog (A–E, plus the 3D technique once defined) is available without restriction here.

**Backend / lead capture — GHL:** hosts the dedicated landing page for each individual lead magnet — not a page in the Next.js sites. This is deliberately *not* using GHL's standard templates; the intent is to bring the same workflow/template system into GHL's page builder, which is a materially more restrictive environment (no build step, no npm packages, custom HTML/CSS/JS embeds only, drag-and-drop layer underneath whatever gets injected).

Portability isn't guaranteed uniformly across the catalog:
- **Likely portable as-is:** Workflow C (mouse-parallax), D (text-highlight), E (scroll-reveal) — pure CSS/vanilla JS, no asset pipeline, no build step required.
- **Needs validation before relying on it:** Workflow A (ambient video loop), Workflow B (canvas frame-sequence) — heavier JS plus hosted media assets; probably possible via a GHL custom-code block, but unconfirmed until actually tried once.

Because a lead-magnet landing page exists purely to convert (capture the lead, trigger the automation) rather than to showcase the brand, the recommended default composition for the GHL track is **D + E** — a headline highlight followed by scroll-revealing benefit blocks into the opt-in form, closer to the Zeux-style conversion page shape than to a flagship hero. Workflows A, B, and the 3D technique are reserved for front-end program pages, where dwell time and brand theater actually pay off.

---

## Site structure, clarified

- **`/downloads`** lives on the website itself (Next.js) — a catalog/index page listing available lead magnets. Lighter treatment: thumbnails plus Workflow D/E, no big hero, since its only job is to route the visitor onward.
- **Each individual lead magnet's dedicated landing page** lives in **GHL**, not on the website. This is the actual conversion page (opt-in form wired to GHL automation), and it's where the workflow/template system needs to prove itself outside its native Next.js environment — per Vamsi: "the framework application shines" here.

---

## Program/child pages (front end) — CONFIRMED template (locked 2026-09-16)

First real build: Embedded Software Design + Embedded Software Architecture (`esc/app/programs/*`). Confirmed shape for a program-type child page:

1. **Hero** — a 3D object, live-rendered in WebGL from a Tripo-generated GLB model (method locked 2026-09-15, see "Current status / open items" below).
2. **Workflow D** — the page's one statement, illuminated phrase-by-phrase as the visitor scrolls past it. Sourced verbatim from the program's own "What's In It For You" opening lines — not invented, not a repeat of the hero's own doubt-statements.
3. **Workflow E** — program-detail content blocks, revealing as they enter the viewport, in this locked order:
   1. What's In It For You (the gap narrative) + "What We Promise" callout
   2. **Early CTA** — `Button variant="outline"` (a real button, not a text link — see note below), placed right after step 1. Catches the reader who's already sold by the hook and the promise and doesn't need the rest of the page to say yes.
   3. Program-specific mechanism blocks — whatever makes this program's method distinct (hardware/software framing diagrams, format description, roadmap, etc. — varies per program)
   4. Qualifying block — Who This Is Not For / For You If, pulled from the program's own source doc in full, not the shortened homepage teaser version
   5. **Mid CTA** — same `Button variant="outline"` weight, placed immediately after the qualifying block. This is the page's peak-intent moment: a reader who just self-selected "yes, that's me" needs something to click before scrolling further, not eight more sections of silence.
   6. Testimonials / proof — real quotes structured as [before state] + [action taken] + [specific outcome] + [timeframe], placed *before* the final ask, never after it
   7. What You Walk Away With + no-guarantee callout
   8. Format / Price
   9. **Primary CTA** — `Button variant="primary"` (full orange fill + glow), benefit-forward copy tied back to the page's own hook/reframe line, not a generic verb+noun (e.g. "Start Learning Why It Works," not just "Start with Design")

Three CTA touchpoints total, escalating in weight: outline → outline → primary. The primary stays the single strongest ask, at the close, same "one signature moment" discipline as the motion — everything else supports it rather than competing with it.

**On CTA weight — corrected 2026-09-16, second pass.** The first correction (same day) specified the two earlier CTAs as bare underlined text links. That shipped, and it was wrong: a text link reads as decoration, not as a call to action, and is exactly the kind of thing a visitor scrolls past without registering. Use the codebase's existing `Button` component's `outline` variant instead (`border-2 border-esc-dark-teal`, a real button shape) for both non-primary CTAs — visually distinct from the primary button, but unmistakably a button, not a footnote.

This ordering is locked as of the `dr-copy-pipeline` copychief pass run against the Design/Architecture build (2026-09-16). The first version shipped with exactly one CTA, at the very end, with testimonials placed *after* it — the review's top finding was under-supplied CTAs and proof arriving after the ask instead of before it. Every program/child page from here forward starts from this corrected order; it is not optional per-page styling, it's the template.

Pages that are purely navigational or list-like (blog index, downloads index) skip the big hero and lean on thumbnails instead, but the same CTA-placement discipline (qualify → secondary CTA → proof → primary CTA) still applies to any page asking for a click, scaled to that page's length.

**Correction — 2026-09-16, weekend-session pages reclassified.** Originally grouped with blog/downloads as no-hero pages. That was wrong: a weekend-session page (Bytes to Sockets, BLE In Weekend, LM75 Driver Architecture) is a monetized, single-session product with its own price and CTA funnel — the same shape as a program page, just shorter in duration and scope. It gets the full program-page template (3D hero + Workflow D + Workflow E), not the thumbnails-only treatment. The no-hero tier is now scoped narrowly to pages that are genuinely just navigation/listing surfaces (blog index, downloads index) with no offer or price of their own.

---

## Current status / open items

- **3D-object hero technique** — LOCKED (2026-09-15): image -> Tripo (tripo3d.ai, AI 3D model generator) -> export GLB -> render live/interactive in-browser via WebGL (react-three-fiber or equivalent -- not yet a dependency in esc/ or bve/, add on first implementation). This is a genuine live-rendered 3D object, not a pre-rendered frame sequence -- supersedes the earlier "not defaulting to WebGL" caution, and is a different pipeline from Blender MCP (which remains the path for multi-state AI-video reveals elsewhere in the catalog, per cinematic-hero-workflow.md). Per-program generation mode is not fixed: try both Tripo modes (one-click "Best Quality" vs. "Smart Mesh" + Generate Multi Views + Texture) on each program'''s source image and keep whichever renders better. Source: a YouTube tutorial transcript Vamsi provided, walking the full Tripo image-to-GLB-to-WebGL pipeline.
- **Program/child page template is now built and shipped once** (Embedded Software Design + Embedded Software Architecture, 2026-09-16) - see the confirmed template section above. `cinematic-hero-workflow.md` remains the workflow-mechanics reference; this doc now also reflects one real, reviewed build rather than being purely speculative.
- **GHL portability** is an assumption, not a validated fact — worth testing with one workflow (likely D or E, the lightest) before treating the whole catalog as portable.
- **Design-decision layer and intake layer** are intentionally not started — they should be derived from the first real template, not designed ahead of it.

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

## Program/child pages (front end) — candidate template, pending confirmation

Discussed shape for a program-type child page:
1. **Hero** — a 3D object only (method not yet decided — explicitly not defaulting to WebGL; Vamsi will specify the approach).
2. **Below the hero** — Workflow D: the page's one static statement, illuminated phrase-by-phrase as the visitor scrolls past it.
3. **After that section is crossed** — Workflow E: program-detail content blocks reveal as they enter the viewport.

This composition is *not itself a workflow* (per the atomic-workflow definition) — it's a candidate template, and won't be confirmed as "the" program-page template until the 3D method is settled and a first real page is built end-to-end. Pages that aren't about a specific program (blog, downloads index) skip the big hero entirely and lean on thumbnails instead.

---

## Current status / open items

- **3D-object hero technique** — pending; Vamsi is providing the approach separately (explicitly not the drag-controlled-frame-sequence idea floated earlier — a different method, TBD).
- **Nothing has been built or tested yet.** This doc and `cinematic-hero-workflow.md` are both planning references; no workflow has been implemented in any of the three sites' actual code as of this writing.
- **GHL portability** is an assumption, not a validated fact — worth testing with one workflow (likely D or E, the lightest) before treating the whole catalog as portable.
- **Design-decision layer and intake layer** are intentionally not started — they should be derived from the first real template, not designed ahead of it.

# ESC Program Child Pages — CTA/Proof Reorder Fix

Paste this into Claude Code from `E:\websites\esc`. This is a targeted fix, not a rebuild — applies the copychief review findings from the Design/Architecture build to both existing pages, and locks the corrected order for every program page going forward (see the updated "CONFIRMED template" section in `page-factory-system.md` at the repo root — read it first, it's the spec this fix implements).

## What's wrong today

Both `app/programs/embedded-software-design/page.tsx` and `app/programs/embedded-software-architecture/page.tsx` currently have exactly one CTA, at the very end, with `ProgramTestimonials` placed *after* that CTA. Result: a reader convinced early has nothing to click until the bottom of the page, and the final ask fires before any social proof backs it up.

## The fix — both pages

**1. Add a secondary CTA immediately after the qualifying block** (`ForYouList` — section 2.6 on Design, 3.5 on Architecture). Lightweight weight, not the full `Button` component treatment — a text-link style call, e.g.:

```tsx
<AnimatedItem className="mt-6 text-center">
  <Link
    href="/apply/embedded-software-design"
    className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-esc-orange underline underline-offset-4"
  >
    Ready? Start with Design →
  </Link>
</AnimatedItem>
```
(Architecture page: same pattern, `/apply/embedded-software-architecture`, "Ready? Start with Architecture →".)

**2. Move `ProgramTestimonials` to sit between the secondary CTA and "What You Walk Away With."** New order for the back half of each page:

Qualifying block → Secondary CTA → Testimonials → What You Walk Away With + no-guarantee callout → Format/Price → Primary CTA

So testimonials move from section 2.9/3.8 (after everything) to right after the new secondary CTA — proof lands before the final ask, not after it.

**3. Sharpen both primary CTA button labels** to tie back to each page's own hook instead of a generic verb+noun:

- Design: `"Start with Design"` → `"Start Learning Why It Works"`
- Architecture: `"Start with Architecture"` → `"Start Defending Your Decisions"`

Keep the `href`s as they are (`/apply/embedded-software-design`, `/apply/embedded-software-architecture`) — only the visible label changes.

**4. Add one friction-reducer line under each primary CTA button** — small text, muted ink, directly below the button:

- Design: "32 hours. Two months. Saturdays and Sunday mornings."
- Architecture: "10 hours. 15 days. Five evening sessions."

## What NOT to change

Everything else stays exactly as built: Workflow D statement content and mechanics, the hardware/software diagram blocks, the roadmap, the qualifying copy itself, the "What We Promise" and "no job guarantee" callouts, pricing, and the testimonials' own content (still placeholder, still TODO-marked — only its position on the page moves).

## After the change

- Re-run the `esc-design-system` skill against the touched sections — the new secondary CTA link and friction-reducer text need to match token/type rules like everything else on the page (no exclamation marks, correct font classes, orange reserved for CTA emphasis).
- Confirm both pages still scroll-reveal correctly with the reordered sections (IntersectionObserver triggers, stagger, `prefers-reduced-motion` fallback) — reordering shouldn't change the mechanics, but verify in a running dev server, not just by reading the diff.
- Leave `BACKEND-TODO.md` as-is; nothing here changes what needs backend wiring, just where proof and asks sit on the page.

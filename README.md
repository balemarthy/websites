# websites

One git repo, several independent Next.js sites, each its own brand and its own sub-folder. There is no shared build tooling between them — every folder below is `git clone` + `cd` + `npm install` + `npm run dev` on its own.

```
websites/
├── esc/     embeddedsystemcoach.com   — Vamsi's embedded-systems coaching brand
├── bve/     balemarthyvamsi.com       — Vamsi's career-visibility coaching brand (BVE)
└── dnm/     digitalnetworkmarketer.in — Guru/Gowri faceless second-income brand (DNM)
```

`bve` and `dnm` were scaffolded as siblings of `esc` (commit `e3b284d`) — `bve` is a fresh build with `esc`'s *fonts and structural tokens* reused but its own Navy/Amber/Electric Blue palette; `dnm` is a closer clone that reuses `esc`'s palette and fonts almost exactly, with only its own wordmark as the distinguishing visual element.

## Which doc explains what

Three kinds of document live in this repo, and they're not interchangeable — worth knowing which is which before reading (or writing) any of them:

- **`README.md`** (this file) — orientation for the whole repo. How the three sites relate, how to clone and run each one, what's built so far.
- **`page-factory-system.md`** — the shared, cross-brand system for how child pages get built. Applies to ESC, BVE, and DNM equally, not just ESC — it defines which techniques combine into which page *type* (e.g. "a program page = hero + Workflow D + Workflow E, in this order, with CTAs placed at these specific points"). **Read this before building any child page, on any site**, before opening `cinematic-hero-workflow.md` or writing any code.
- **`cinematic-hero-workflow.md`** — the technique catalog that `page-factory-system.md` draws from. Each entry (Workflow A through E) is one self-contained mechanic — what a scroll-scrubbed statement actually does, how a scroll-reveal block is built, and so on — without any opinion about which page type uses which. Read this once `page-factory-system.md` has told you which workflow(s) a page needs, for the how-to-build-it detail.

Everything else — a build prompt for one specific page, a backend-wiring checklist, notes for one particular run — is **site-specific, not shared**, and lives inside that site's own folder instead of here at the root: see `esc/build-prompts/` for ESC's page-build prompts and `esc/BACKEND-TODO.md` for ESC's backend-wiring checklist. If `bve/` or `dnm/` need the same kind of prompt or checklist later, they get their own `build-prompts/` and `BACKEND-TODO.md` inside their own folder — never at the shared root, which stays reserved for the three docs above.

## Why this file exists

This repo has no per-project `CLAUDE.md`. If you (human or agent) are opening this folder cold on a different machine, this file is the only written record of what's here and why — read it before touching anything.

## What's present, and how far along each one is

| Project | Domain | Status |
|---|---|---|
| `esc` | embeddedsystemcoach.com | Homepage built: hero, marquees, program cards/stacks, Battlefield, Testimonials, Newsletter, Footer. Longest-running of the three — most of the shared component patterns (`ShuffleStack`, `Marquee`, the CSS-module + design-token approach) originated here and were ported to `bve`/`dnm`. |
| `bve` | balemarthyvamsi.com | Homepage built end-to-end: scroll-driven frame-sequence hero (desktop) with a lighter mobile-only path, Marquee, ProgramCards, ProgramStacks, Battlefield, AboutAuthority, Testimonials, Newsletter, floating-pill Nav. Tagged `bve-v1.0.0` (commit `49588ba`). Sub-pages (`/career-fluency`, `/about`, etc. — linked from the nav) don't exist yet; this is a homepage-only build. |
| `dnm` | digitalnetworkmarketer.in | Homepage built (commit `778d96d`, not yet tagged). **Placeholder art and draft-only copy** — see `dnm/IMAGES-NEEDED.md` for the exact list of what's still needed before this one can launch (hero visual, optional logo, Battlefield/reframe copy needs Vamsi's review, registration form isn't wired to a real backend). |

Tags on `main`, in case you need a known-good point to diff against or roll back to:

- `esc-v1.0.0` → `bc33ae0` (last commit touching `esc/` before the `bve`/`dnm` split)
- `bve-v1.0.0` → `49588ba`
- `v1.0.0-baseline` → `bc33ae0` (same commit as `esc-v1.0.0`; predates the project-scoped tag naming)

## Cloning and getting each site running

```bash
git clone https://github.com/balemarthy/websites.git
cd websites
```

Each project needs Node 18.17+ (this repo was built and tested on Node 24; any current LTS works fine — Next.js 14 is the floor requirement here). Per project:

```bash
cd esc   # or bve, or dnm
npm install
npm run dev
```

All three default to port 3000 — run only one at a time, or pass `-p <port>` to `npm run dev` if you need two side by side.

**Nothing else is required.** Every asset (frame sequences, portraits, logos, illustrations) is committed to git and tracked alongside the code — there is no external asset bucket, no `.env` file, no secret this repo depends on. `npm install` reconstructs `node_modules/` (gitignored, as normal); everything else you see on this desktop is already in the clone.

## Verifying you actually got the same thing

If you want to confirm a fresh clone matches this desktop exactly, rather than take it on faith:

```bash
git status              # should be clean on a fresh clone
git log --oneline -5    # should show the same commits as below
```

```
778d96d Build DNM homepage: full section stack, scroll hero, nav fix
49588ba Build BVE homepage hero and full section stack
e3b284d Scaffold dnm and bve as new Next.js projects
bc33ae0 Add placeholder Footer, directly after Newsletter
f88fc47 Add explicit "newsletter" sub-line to the Newsletter card
```

For any one project, `git ls-files <project>/public | wc -l` should match the number of files actually on disk under `<project>/public` — if it doesn't, something didn't clone or extract correctly.

## The part that does *not* travel with `git clone`

This is the honest answer to "why wouldn't a fresh clone already be at the same level" — two things live outside the repo entirely:

1. **Claude's memory files** (`~/.claude/projects/.../memory/` on this machine) — session-to-session notes like brand voice reminders, feedback on how Vamsi likes to work, and project context. These are local to this installation of Claude Code and are not part of the git repo. A fresh agent on another device starts without them.
2. **Design-system skills** (`esc-design-system`, `bve-design-system`, `dnm-design-system`, `3d-scroll-website`) — the locked color/type/voice rules and the frame-sequence-hero build pattern that shaped every section in these three sites. These are Claude Code **plugin skills**, installed at the Claude Code / Antigravity level, not files in this repo. If the other device's Claude Code install doesn't have the same plugins enabled, an agent working there won't automatically know BVE is Navy/Amber/Electric Blue or that DNM must stay faceless — it would have to be told, or the plugin would need installing there too.

Everything else — every color value, every component, every image — *is* checked into git specifically so that (1) and (2) not transferring doesn't actually block continuing the work. The code and assets are self-contained; only the "why we chose this" reasoning lives in those two places.

## Cinematic hero build workflows

See [`cinematic-hero-workflow.md`](cinematic-hero-workflow.md) at repo root — the technical reference for building hero sections (ambient video loop, scroll-driven frame sequence, and an additive mouse-parallax layer). Read it before starting any new hero build or reworking an existing one.

## Instructions for an agent (Claude Code / Antigravity) opening this folder fresh

If you're an AI agent that's just been pointed at this folder path with no other context, do this before making any changes:

1. **Read this file first.** It's the map.
2. **Confirm the clone is complete**: run `git status` (expect clean) and `git log --oneline -5` in the repo root, compare against the commit list above.
3. **Pick the project you've been asked to work on**, `cd` into it, `npm install`, then `npm run dev` and load it in a browser to confirm it renders before making changes — don't assume the code is correct just because it's there.
4. **Check whether the matching design-system skill is available** to you (`esc-design-system` / `bve-design-system` / `dnm-design-system`, plus `3d-scroll-website` for any frame-sequence hero work). If it's not listed as available, say so before making styling decisions — don't guess at colors or invent brand rules that happen to look plausible.
5. **For `dnm` specifically**, read `dnm/IMAGES-NEEDED.md` before assuming the site is finished — it isn't; the placeholders and draft copy are intentional and documented there.
6. **Don't assume you have prior context** this session doesn't show you. If something looks like a deliberate decision you don't understand the reasoning for (an odd color, a section that seems incomplete, a comment referencing "the brief"), that reasoning likely lived in a memory file or a conversation on the original machine — ask rather than "fixing" it.

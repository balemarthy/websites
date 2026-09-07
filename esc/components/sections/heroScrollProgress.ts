// Single source of truth for "how far through the hero scroll sequence are we" (0-1),
// used by both HeroCanvas (frame index) and HeroTextTiming (thought-text / headline
// opacity) — same DOM measurement, same formula, so the two never drift apart.
export function getHeroScrollProgress(): number {
  const track = document.querySelector("[data-hero-scroll-track]") as HTMLElement | null;
  if (!track) return 0;
  const rect = track.getBoundingClientRect();
  const scrollable = track.offsetHeight - window.innerHeight;
  return scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
}

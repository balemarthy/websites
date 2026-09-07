export type BeatPhase = "pain" | "reframe" | "resolve";
export type Character = "pagla" | "pagli";

export type Beat = {
  id: string;
  character: Character;
  beatNumber: 1 | 2 | 3;
  phase: BeatPhase;
  line: string;
  image: string;
};

export const beats: Beat[] = [
  {
    id: "pagla-1",
    character: "pagla",
    beatNumber: 1,
    phase: "pain",
    line: "I've shipped more than half my team. Nobody outside my team knows my name.",
    image: "/images/characters/pagla/beats/pagla-01-pain.png",
  },
  {
    id: "pagla-2",
    character: "pagla",
    beatNumber: 2,
    phase: "reframe",
    line: "Skill without visibility isn't a career — it's a hobby with a paycheck.",
    image: "/images/characters/pagla/beats/pagla-02-reframe.png",
  },
  {
    id: "pagla-3",
    character: "pagla",
    beatNumber: 3,
    phase: "resolve",
    line: "Fix the visibility problem, not the skill problem.",
    image: "/images/characters/pagla/beats/pagla-03-resolve.png",
  },
  {
    id: "pagli-1",
    character: "pagli",
    beatNumber: 1,
    phase: "pain",
    line: "Fourteen courses in. Still don't feel ready to apply.",
    image: "/images/characters/pagli/beats/pagli-01-pain.png",
  },
  {
    id: "pagli-2",
    character: "pagli",
    beatNumber: 2,
    phase: "reframe",
    line: "More courses isn't more skill — it's a system for feeling busy while you're afraid to build.",
    image: "/images/characters/pagli/beats/pagli-02-reframe.png",
  },
  {
    id: "pagli-3",
    character: "pagli",
    beatNumber: 3,
    phase: "resolve",
    line: "One real project beats another certificate.",
    image: "/images/characters/pagli/beats/pagli-03-resolve.png",
  },
];

// Pagla always speaks from the right, Pagli always from the left —
// keeps the crossfade the only thing moving within a character's arc.
export function imageSideFor(character: Character): "left" | "right" {
  return character === "pagla" ? "right" : "left";
}

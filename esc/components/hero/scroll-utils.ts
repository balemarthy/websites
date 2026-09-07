import { useTransform, type MotionValue } from "framer-motion";

/**
 * Crossfade opacity for beat `index` within a scroll progress track [0,1]
 * divided by `boundaries` (cumulative fractions, e.g. [0, 0.3, 0.6, 1]).
 * First/last beats hold instead of fading at the very ends of the track.
 */
export function useWeightedOpacity(
  progress: MotionValue<number>,
  boundaries: number[],
  index: number,
  fadeFraction = 0.3
) {
  const start = boundaries[index];
  const end = boundaries[index + 1];
  const segment = end - start;
  const fade = segment * fadeFraction;
  const isFirst = index === 0;
  const isLast = index === boundaries.length - 2;

  const points: number[] = [];
  const values: number[] = [];

  if (isFirst) {
    points.push(0);
    values.push(1);
  } else {
    points.push(start - fade, start);
    values.push(0, 1);
  }

  if (isLast) {
    points.push(1);
    values.push(1);
  } else {
    points.push(end - fade, end);
    values.push(1, 0);
  }

  return useTransform(progress, points, values);
}

export function indexFromProgress(v: number, boundaries: number[]) {
  for (let i = boundaries.length - 2; i >= 0; i--) {
    if (v >= boundaries[i]) return i;
  }
  return 0;
}

/** Turns relative weights (e.g. [1, 1.3, 1, 1]) into cumulative 0-1 boundaries. */
export function cumulativeBoundaries(weights: number[]) {
  const total = weights.reduce((a, b) => a + b, 0);
  const boundaries = [0];
  let acc = 0;
  for (const w of weights) {
    acc += w;
    boundaries.push(acc / total);
  }
  return boundaries;
}

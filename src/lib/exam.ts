export const WEIGHTS = [40, 30, 20, 10] as const;
export const PASS_THRESHOLD = 70;

export function scoreRubric(scores: number[]): number {
  if (scores.length !== 4 || scores.some((s) => !Number.isInteger(s) || s < 0 || s > 4)) {
    throw new RangeError("Skor harus bilangan bulat 0 sampai 4");
  }
  return scores.reduce((total, s, i) => total + (WEIGHTS[i] * s) / 4, 0);
}

export function isPass(score: number): boolean {
  return score >= PASS_THRESHOLD;
}

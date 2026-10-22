import { describe, expect, it } from "vitest";
import { isPass, scoreRubric, WEIGHTS, PASS_THRESHOLD } from "./exam";

// Test vector: docs/04 §7.3.
describe("scoreRubric", () => {
  it("bobot 40/30/20/10 dibagi skala 0..4", () => {
    expect(scoreRubric([4, 3, 3, 2])).toBe(82.5);
    expect(scoreRubric([2, 2, 3, 4])).toBe(60);
    expect(scoreRubric([4, 4, 4, 4])).toBe(100);
    expect(scoreRubric([0, 0, 0, 0])).toBe(0);
    expect(scoreRubric([3, 3, 3, 3])).toBe(75);
    expect(scoreRubric([4, 2, 3, 0])).toBe(70);
    expect(scoreRubric([4, 2, 2, 2])).toBe(70);
    expect(scoreRubric([4, 1, 3, 2])).toBe(67.5);
  });

  it("skor di luar 0..4 atau pecahan melempar RangeError", () => {
    expect(() => scoreRubric([5, 0, 0, 0])).toThrow(RangeError);
    expect(() => scoreRubric([2.5, 0, 0, 0])).toThrow(RangeError);
  });
});

describe("isPass", () => {
  it("ambang 70 termasuk batas tepat", () => {
    expect(PASS_THRESHOLD).toBe(70);
    expect(isPass(70)).toBe(true);
    expect(isPass(67.5)).toBe(false);
    expect(isPass(82.5)).toBe(true);
  });

  it("konstanta bobot dan ambang sesuai 04 §7.3", () => {
    expect(WEIGHTS).toEqual([40, 30, 20, 10]);
  });
});

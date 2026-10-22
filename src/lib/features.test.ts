import { describe, expect, it } from "vitest";
import { FEATURES } from "./features";

// Test vector: docs/05 §5.
describe("FEATURES", () => {
  it("berisi tepat 29 butir sub-fitur", () => {
    expect(FEATURES.flatMap((g) => g.items)).toHaveLength(29);
  });
});

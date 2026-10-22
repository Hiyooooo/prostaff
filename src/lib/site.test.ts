import { describe, expect, it } from "vitest";
import { SITE } from "./site";

// Test vector: docs/05 §1.
describe("SITE", () => {
  it("title 56 karakter dan description 103 karakter", () => {
    expect(SITE.title.length).toBe(56);
    expect(SITE.description.length).toBe(103);
  });
});

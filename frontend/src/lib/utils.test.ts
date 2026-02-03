import { cn } from "./utils";

describe("cn utility", () => {
  test("combines class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  test("handles conditional classes via clsx", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  test("merges conflicting Tailwind classes via tailwind-merge", () => {
    // tailwind-merge should keep the last conflicting utility
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("mt-2", "mt-2")).toBe("mt-2");
  });
});

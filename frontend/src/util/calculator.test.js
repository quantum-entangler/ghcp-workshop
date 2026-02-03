import { add, subtract, multiply, divide } from "./calculator";

describe("calculator", () => {
  test("adds numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-2, 5)).toBe(3);
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });

  test("subtracts numbers", () => {
    expect(subtract(5, 2)).toBe(3);
    expect(subtract(-2, -3)).toBe(1);
    expect(subtract(0.3, 0.1)).toBeCloseTo(0.2, 5);
  });

  test("multiplies numbers", () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0.2, 0.1)).toBeCloseTo(0.02, 10);
  });

  test("divides numbers", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(-9, 3)).toBe(-3);
    expect(divide(0.3, 0.1)).toBeCloseTo(3, 5);
  });

  test("throws on division by zero", () => {
    expect(() => divide(1, 0)).toThrow(/Division by zero/i);
  });
});

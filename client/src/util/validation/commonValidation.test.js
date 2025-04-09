import { describe, test, expect } from "vitest";
import { initialState, validationIsEmpty } from "./commonValidation";

describe("initialState", () => {
  test("creates an object with keys and empty string values", () => {
    const fields = { username: "username", password: "password" };
    const state = initialState(fields);
    expect(state).toEqual({ username: "", password: "" });
  });
});

describe("validationIsEmpty", () => {
  test("returns true when all error values are falsy", () => {
    const errors = { username: "", password: "", email: "" };
    expect(validationIsEmpty(errors)).toBe(true);
  });

  test("returns false if at least one error value is truthy", () => {
    const errors = { username: "", password: "test", email: "" };
    expect(validationIsEmpty(errors)).toBe(false);
  });
});

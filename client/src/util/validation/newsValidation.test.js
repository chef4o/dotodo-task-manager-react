import { describe, test, expect } from "vitest";
import { newsValidation } from "./newsValidation";
import { ValidationError } from "./validationErrorMessages";

describe("newsValidation.getValidationErrors", () => {
  test("returns error for short title", () => {
    const formValues = { title: "ab", content: "some content" };
    const errors = newsValidation.getValidationErrors(formValues);
    expect(errors.title).toBe(ValidationError.MIN_TITLE_LENGTH);
  });

  test("returns error for short content", () => {
    const formValues = { title: "Title", content: "abc" };
    const errors = newsValidation.getValidationErrors(formValues);
    expect(errors.content).toBe(ValidationError.MIN_CONTENT_LENGTH);
  });

  test("returns errors for both title and content if invalid", () => {
    const formValues = { title: "ab", content: "x" };
    const errors = newsValidation.getValidationErrors(formValues);
    expect(errors.title).toBe(ValidationError.MIN_TITLE_LENGTH);
    expect(errors.content).toBe(ValidationError.MIN_CONTENT_LENGTH);
  });

  test("returns no errors for valid news data", () => {
    const formValues = { title: "valid title", content: "long comment" };
    const errors = newsValidation.getValidationErrors(formValues);
    expect(errors).toEqual({});
  });
});

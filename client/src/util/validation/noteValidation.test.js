import { describe, test, expect } from "vitest";
import { noteValidation } from "./noteValidation";
import { ValidationError } from "./validationErrorMessages";

describe("noteValidation.getValidationErrors", () => {
  test("returns error for short title", () => {
    const formValues = { title: "ab", content: "Valid content" };
    const errors = noteValidation.getValidationErrors(formValues);
    expect(errors.title).toBe(ValidationError.MIN_TITLE_LENGTH);
  });

  test("returns error for short content", () => {
    const formValues = { title: "Title", content: "cont" };
    const errors = noteValidation.getValidationErrors(formValues);
    expect(errors.content).toBe(ValidationError.MIN_CONTENT_LENGTH);
  });

  test("returns TIME_WITHOUT_DATE error when dueTime exists but dueDate is missing", () => {
    const formValues = {
      title: "title",
      content: "valid content",
      dueTime: "12:00",
      dueDate: null,
    };
    const errors = noteValidation.getValidationErrors(formValues);
    expect(errors.dueTime).toBe(ValidationError.TIME_WITHOUT_DATE);
  });

  test("returns DATE_TIME_IN_PAST error when dueDate is in the past", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const formValues = {
      title: "Title",
      content: "valid content",
      dueDate: yesterday.toISOString().split("T")[0],
    };
    const errors = noteValidation.getValidationErrors(formValues);
    expect(errors.dueDate).toBe(ValidationError.DATE_TIME_IN_PAST);
  });

  test("returns no errors for valid note data", () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const formValues = {
      title: "title",
      content: "valid content",
      dueDate: tomorrow.toISOString().split("T")[0],
      dueTime: "12:00",
    };
    const errors = noteValidation.getValidationErrors(formValues);
    expect(errors).toEqual({});
  });
});

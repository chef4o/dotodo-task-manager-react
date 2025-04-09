import { describe, test, expect } from "vitest";
import { checklistValidation } from "./checklistValidation";
import { ValidationError } from "./validationErrorMessages";

describe("checklistValidation.getValidationErrors", () => {
  test("returns error for missing or short title", () => {
    const formValues = { title: "ab", elements: ["item"], dueDate: new Date(Date.now()) };
    const errors = checklistValidation.getValidationErrors(formValues);
    expect(errors.title).toBe(ValidationError.MIN_TITLE_LENGTH);
  });

  test("returns error when elements is missing or empty", () => {
    let formValues = { title: "Valid Title", dueDate: new Date(Date.now()) };
    let errors = checklistValidation.getValidationErrors(formValues);
    expect(errors.content).toBe(ValidationError.CHECKLIST_NO_ELEMENTS);

    formValues = { title: "Valid Title", elements: [], dueDate: new Date(Date.now()) };
    errors = checklistValidation.getValidationErrors(formValues);
    expect(errors.content).toBe(ValidationError.CHECKLIST_NO_ELEMENTS);
  });

  test("returns error when dueDate is in the past", () => {
    const pastDate = new Date("2024-01-01T00:00:00")
    const formValues = { title: "Valid Title", elements: ["item"], dueDate: pastDate };
    const errors = checklistValidation.getValidationErrors(formValues);
    expect(errors.dueDate).toBe(ValidationError.DATE_TIME_IN_PAST);
  });

  test("returns no errors for valid input", () => {
    const futureDate = new Date("2300-01-01T00:00:00")
    const formValues = { title: "Valid Title", elements: ["item"], dueDate: futureDate };
    const errors = checklistValidation.getValidationErrors(formValues);
    expect(errors).toEqual({});
  });
});
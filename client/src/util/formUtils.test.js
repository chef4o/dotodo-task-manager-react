import { vi, describe, test, expect } from "vitest";
import { formUtils } from "./formUtils";

// Tests for handleInputChange

describe("handleInputChange", () => {
  test("updates form values and clears validation error when input isn't empty", () => {
    const mockSetFormValues = vi.fn((updateFn) => updateFn({}));
    const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ email: "Required" }));

    const event = {
      target: { name: "email", value: "test@abv.bg" },
    };

    const handler = formUtils.handleInputChange(mockSetFormValues, mockSetValidationErrors);
    handler(event);

    const formUpdateFn = mockSetFormValues.mock.calls[0][0];
    const updatedForm = formUpdateFn({});
    expect(updatedForm).toEqual({ email: "test@abv.bg" });

    const validationUpdateFn = mockSetValidationErrors.mock.calls[0][0];
    const updatedValidation = validationUpdateFn({ email: "Required field" });
    expect(updatedValidation).toEqual({ email: "" });
  });

  test("updates form values and leaves validation error unchanged when input is empty or whitespace", () => {
    const initialValidation = { email: "Required field" };
    const mockSetFormValues = vi.fn((updateFn) => updateFn({}));
    const mockSetValidationErrors = vi.fn((updateFn) => updateFn(initialValidation));

    const event = {
      target: { name: "email", value: "   " },
    };

    const handler = formUtils.handleInputChange(mockSetFormValues, mockSetValidationErrors);
    handler(event);

    const formUpdateFn = mockSetFormValues.mock.calls[0][0];
    const updatedForm = formUpdateFn({});
    expect(updatedForm).toEqual({ email: "   " });

    const validationUpdateFn = mockSetValidationErrors.mock.calls[0][0];
    const updatedValidation = validationUpdateFn(initialValidation);
    expect(updatedValidation).toEqual({ email: "Required field" });
  });
});

// Tests for focusHandler

describe("focusHandler", () => {
  test("calls the given validation function with setValidationErrors and form values", () => {
    const mockSetValidationErrors = vi.fn();
    const mockValidationFn = vi.fn();
    formUtils.focusHandler(mockValidationFn, mockSetValidationErrors, "value1", "value2");
    expect(mockValidationFn).toHaveBeenCalledWith(mockSetValidationErrors, "value1", "value2");
  });
});

// Tests for capitalize
describe("capitalize", () => {
  test("capitalizes the first letter of the word", () => {
    expect(formUtils.capitalize("test")).toBe("Test");
  });
});

import { describe, test, expect } from "vitest";
import { profileValidation } from "./profileValidation";
import { ValidationError } from "./validationErrorMessages";

// Tests for profileValidation

describe("profileValidation", () => {
  test("returns errors for invalid username, email, and invalid phone", () => {
    const formValues = {
      username: "ab",
      email: "invalid@email",
      phoneNumber: "1",
    };
    const errors = profileValidation.getValidationErrors(formValues);
    expect(errors.username).toBe(ValidationError.MIN_USERNAME_LENGTH);
    expect(errors.email).toBe(ValidationError.INVALID_EMAIL);
    expect(errors.phoneNumber).toBe(ValidationError.INVALID_PHONE_NUM);
  });

  test("returns no errors for valid fields", () => {
    const formValues = {
      username: "validUser",
      email: "valid@example.com",
      phoneNumber: "+359888223344",
    };
    
    const errors = profileValidation.getValidationErrors(formValues);
    expect(errors.username).toBeUndefined();
    expect(errors.email).toBeUndefined();
    expect(errors.phoneNumber).toBeUndefined();
  });
});

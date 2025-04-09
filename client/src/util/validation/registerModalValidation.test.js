import { describe, test, expect, vi, beforeEach } from "vitest";
import { registerValidation } from "./registerModalValidation";
import { ValidationError } from "./validationErrorMessages";

vi.mock("./commonValidation", () => ({
  initialState: (fields = {}) => Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
}));

describe("registerValidation", () => {
  // validateEmail
  describe("validateEmail", () => {
    test("sets error when email is invalid", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ email: "" }));
      registerValidation.validateEmail(mockSetValidationErrors, "invalid@email");

      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ email: "" });
      expect(newState.email).toBe(ValidationError.INVALID_EMAIL);
    });

    test("clears error when email is valid", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ email: "Error" }));
      registerValidation.validateEmail(mockSetValidationErrors, "valid@mail.bg");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ email: "Error" });
      expect(newState.email).toBe("");
    });
  });

  // validateUsername
  describe("validateUsername", () => {
    test("sets error when username is too short", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ username: "" }));
      registerValidation.validateUsername(mockSetValidationErrors, "ab");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ username: "" });
      expect(newState.username).toBe(ValidationError.MIN_USERNAME_LENGTH);
    });
    test("clears error when username is valid", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ username: "Error" }));
      registerValidation.validateUsername(mockSetValidationErrors, "abc");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ username: "Error" });
      expect(newState.username).toBe("");
    });
  });

  // validatePassword
  describe("validatePassword", () => {
    test("sets error when password is too short", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ password: "" }));
      registerValidation.validatePassword(mockSetValidationErrors, "123");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ password: "" });
      expect(newState.password).toBe(ValidationError.MIN_PASSWORD_LENGTH);
    });
    test("clears error when password is valid", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ password: "Error" }));
      registerValidation.validatePassword(mockSetValidationErrors, "1234");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ password: "Error" });
      expect(newState.password).toBe("");
    });
  });

  // validatePasswordsMatch
  describe("validatePasswordsMatch", () => {
    test("sets error when passwords do not match", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ repass: "" }));
      registerValidation.validatePasswordsMatch(mockSetValidationErrors, "password", "no-match");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ repass: "" });
      expect(newState.repass).toBe(ValidationError.PASSWORD_NOT_MATCHING);
    });
    test("clears error when passwords match", () => {
      const mockSetValidationErrors = vi.fn((updateFn) => updateFn({ repass: "Error" }));
      registerValidation.validatePasswordsMatch(mockSetValidationErrors, "password", "password");
      const updater = mockSetValidationErrors.mock.calls[0][0];
      const newState = updater({ repass: "Error" });
      expect(newState.repass).toBe("");
    });
  });
});

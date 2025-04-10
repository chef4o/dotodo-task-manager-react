import { describe, it, expect, vi, beforeEach } from "vitest";
import { contactForm } from "./contactService";
import * as request from "../api/request";
import { url } from "../api/url";
import { ServiceError } from "./serviceErrorMessages";
import { ValidationError } from "../util/validation/validationErrorMessages";

vi.mock("../api/request", () => ({
  post: vi.fn(),
}));

describe("contactForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("isValid", () => {
    it("returns true and clears error when valid data is provided", () => {
      const formData = {
        name: "stef test",
        email: "test@abv.bg",
        phone: "",
        comment: "test message",
      };
      const setError = vi.fn();

      const valid = contactForm.isValid(formData, setError);
      expect(valid).toBe(true);
      expect(setError).toHaveBeenCalledWith("");
    });

    it("returns false and sets missing fields error when required fields are missing", () => {
      const formData = {
        name: "   ",
        email: "",
        phone: "",
        comment: "",
      };
      const setError = vi.fn();

      const valid = contactForm.isValid(formData, setError);
      expect(valid).toBe(false);
      expect(setError).toHaveBeenCalledWith(ServiceError.MISSING_CONTACT_FIELDS);
    });

    it("returns false and sets invalid email error when an invalid email is provided", () => {
      const formData = {
        name: "stef test",
        email: "invalid@email",
        phone: "",
        comment: "hi",
      };
      const setError = vi.fn();

      const valid = contactForm.isValid(formData, setError);
      expect(valid).toBe(false);
      expect(setError).toHaveBeenCalledWith(ValidationError.INVALID_EMAIL);
    });
  });

  describe("sendMessage", () => {
    it("calls request.post with correct URL and formData and returns response", async () => {
      const formData = {
        name: "stef test",
        email: "test@abv.bg",
        phone: "",
        comment: "Test message",
      };
      const responseData = { success: true };
      request.post.mockResolvedValue(responseData);

      const result = await contactForm.sendMessage(formData);
      expect(request.post).toHaveBeenCalledWith(url.sendSupportMessage, formData);
      expect(result).toEqual(responseData);
    });

    it("logs error and returns undefined when request.post fails", async () => {
      const formData = {
        name: "stef test",
        email: "test@abv.bg",
        phone: "",
        comment: "Test message",
      };
      const error = new Error("Network error");
      request.post.mockRejectedValue(error);
      
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const result = await contactForm.sendMessage(formData);
      expect(consoleSpy).toHaveBeenCalledWith(ServiceError.MESSAGE_NOT_SENT, error);
      consoleSpy.mockRestore();
      expect(result).toBeUndefined();
    });
  });
});

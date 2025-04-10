import { describe, it, expect, vi, beforeEach } from "vitest";
import { createToken, handleLogout } from "./authService";
import { url } from "../api/url";
import * as request from "../api/request";
import Cookies from "js-cookie";
import { ServiceError } from "./serviceErrorMessages";

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");
  return {
    __esModule: true,
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    signInWithCustomToken: vi.fn(),
    getAuth: vi.fn(() => ({})),
  };
});

vi.mock("js-cookie", () => ({
  __esModule: true,
  default: {
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("../api/request", () => ({
  post: vi.fn(),
}));

describe("authService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    sessionStorage.clear();
  });

  describe("createToken", () => {
    it("returns customToken when sign-in and token exchange succeed", async () => {
      const email = "test@abv.bg";
      const password = "test123";

      const fakeLoggedUser = {
        user: {
          getIdToken: vi.fn().mockResolvedValue("idToken123"),
        },
      };

      const { signInWithEmailAndPassword, signInWithCustomToken } = await import("firebase/auth");
      signInWithEmailAndPassword.mockResolvedValue(fakeLoggedUser);

      request.post.mockResolvedValue({ customToken: "customToken456" });
      signInWithCustomToken.mockResolvedValue();

      const token = await createToken(email, password);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), email, password);
      expect(fakeLoggedUser.user.getIdToken).toHaveBeenCalled();
      expect(request.post).toHaveBeenCalledWith(url.customToken, { idToken: "idToken123" });
      expect(signInWithCustomToken).toHaveBeenCalledWith(expect.any(Object), "customToken456");
      expect(Cookies.set).toHaveBeenCalledWith("authToken", "customToken456", {
        expires: 1,
        secure: false,
        sameSite: "Strict",
      });
      expect(token).toBe("customToken456");
    });

    it("throws an error if no customToken is returned", async () => {
      const email = "test@abv.bg";
      const password = "test123";
      const fakeLoggedUser = {
        user: { getIdToken: vi.fn().mockResolvedValue("idToken123") },
      };
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      signInWithEmailAndPassword.mockResolvedValue(fakeLoggedUser);

      request.post.mockResolvedValue({});
      await expect(createToken(email, password)).rejects.toThrow();
    });

    it("throws WRONG_USERNAME_OR_PASSWORD error when credentials are invalid", async () => {
      const email = "test@abv.bg";
      const password = "123";
      const error = new Error(ServiceError.WRONG_USERNAME_OR_PASSWORD);
      error.code = "auth/invalid-credential";
      const { signInWithEmailAndPassword } = await import("firebase/auth");

      signInWithEmailAndPassword.mockRejectedValue(error);
      await expect(createToken(email, password)).rejects.toThrow(ServiceError.WRONG_USERNAME_OR_PASSWORD);
    });
  });

  describe("handleLogout", () => {
    it("removes authToken cookie and clears sessionStorage", () => {

      sessionStorage.setItem("test", "value");

      handleLogout();

      expect(Cookies.remove).toHaveBeenCalledWith("authToken");
      expect(sessionStorage.getItem("test")).toBeNull();
    });
  });
});

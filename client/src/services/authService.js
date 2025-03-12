import { signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import * as request from "../api/request";
import { url } from "../api/url";
import Cookies from "js-cookie";

export const createToken = async (email, password) => {
  const auth = firebaseAuth;

  try {
    const loggedUser = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await loggedUser.user.getIdToken();
    const { customToken } = await request.post(url.customToken, { idToken });

    if (!customToken) {
      throw new Error("Failed to get custom token");
    }

    await signInWithCustomToken(firebaseAuth, customToken);

    Cookies.set("authToken", customToken, { expires: 1, secure: false, sameSite: "Strict" });

    return customToken;
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      throw new Error("Wrong username or password");
    }

    throw error;
  }
};

export const handleLogout = () => {
  Cookies.remove('authToken');
  sessionStorage.clear();
}
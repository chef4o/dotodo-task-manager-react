import Cookies from "js-cookie";
import * as request from "../api/request";
import { url } from "../api/url";
import { signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import { ServiceError } from "./serviceErrorMessages";

export const createToken = async (email, password) => {
  const auth = firebaseAuth;

  try {
    const loggedUser = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await loggedUser.user.getIdToken();
    const { customToken } = await request.post(url.customToken, { idToken });

    if (!customToken) {
      throw new Error(ServiceError.ERROR_CREATING_TOKEN);
    }

    await signInWithCustomToken(firebaseAuth, customToken);

    Cookies.set("authToken", customToken, { expires: 1, secure: false, sameSite: "Strict" });

    return customToken;
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      throw new Error(ServiceError.WRONG_USERNAME_OR_PASSWORD);
    }

    throw error;
  }
};

export const handleLogout = () => {
  Cookies.remove("authToken");
  sessionStorage.clear();
};

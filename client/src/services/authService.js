import { getAuth, signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import * as request from "../api/request";
import { url } from "../api/url";

export const createToken = async (email, password) => {
  const firebaseAuth = getAuth();
  const loggedUser = await signInWithEmailAndPassword(firebaseAuth, email, password);

  if (!loggedUser.user) {
    throw new Error("User not found in Firebase Authentication");
  } 

  const idToken = await loggedUser.user.getIdToken();

  const response = await request.post(url.customToken, {
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to get custom token");

  const customToken = data.customToken;
  
  await signInWithCustomToken(firebaseAuth, customToken);

  if (!response.ok) {
    throw new Error(data.error || "Failed to authenticate");
  }

  return customToken;
};

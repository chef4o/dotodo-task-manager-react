import { getUserByEmail, getUserByUsername } from "../controllers/firebaseController.js";

export const checkExistingUserInFirestore = async (username, email) => {
  try {
    const usernameExists = await getUserByUsername(username);
    const emailExists = await getUserByEmail(email);

    return {
      usernameExists: !!usernameExists,
      emailExists: !!emailExists,
    };
  } catch (error) {
    console.error("Error in checkUsernameInFirestore:", error);
    throw error;
  }
};
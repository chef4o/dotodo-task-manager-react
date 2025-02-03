import { db, auth } from "../configuration/firebaseConfig.js";
import { dbTables } from "../configuration/firebaseDb.js";
import { checkExistingUserInFirestore } from "./userService.js";

export const registerAuthUser = async (email, username, password) => {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: username,
      emailVerified: false,
    });

    await db.collection(dbTables.USERS.tableName).doc(userRecord.uid).set({
      username: username,
      email: email,
      createdAt: new Date().toISOString(),
    });

    const user = {
      id: userRecord.uid,
      username: username,
      email: email,
    };

    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

export const userExists = async (username, email) => {
  try {
    const user = await checkExistingUserInFirestore(username, email);

    return {
      withUsername: user.usernameExists,
      withEmail: user.emailExists,
    };
  } catch (error) {
    console.error("Error in userExists:", error);
    throw error;
  }
};

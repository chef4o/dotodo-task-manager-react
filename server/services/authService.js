import { db, auth } from "../configuration/firebaseConfig.js";
import { dbTables } from "../configuration/firebaseDb.js";
import { UserRole } from "../constraints/userRoles.js";
import { checkExistingUserInFirestore } from "./userService.js";

export const registerAuthUser = async (email, username, password, role) => {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: username,
      emailVerified: false,
      role: role,
    });

    await db.collection(dbTables.USERS.tableName).doc(userRecord.uid).set({
      username: username,
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
    });

    const user = {
      id: userRecord.uid,
      username: username,
      email: email,
      role: role
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

export const superAdminExists = async () => {
  const usersRef = db.collection(dbTables.USERS.tableName);

  const adminQuery = await usersRef
    .where("role", "==", UserRole.SUPER_ADMIN)
    .limit(1)
    .get();

  return !adminQuery.empty;
};

export const setRole = async () => {
  return await superAdminExists()
      ? UserRole.LIGHT
      : UserRole.SUPER_ADMIN;
}
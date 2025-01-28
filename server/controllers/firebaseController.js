import { dbTables } from "../configuration/firebaseDb.js";
import { db } from "../configuration/firebaseConfig.js";

export const getUserByEmail = async (email) => {
  try {
    const usersRef = db.collection(dbTables.USERS.tableName);
    const emailSnapshot = await usersRef
      .where(dbTables.USERS.fields.email, "==", email)
      .get();

    if (!emailSnapshot.empty) {
      return emailSnapshot.docs[0].data();
    }

    return null;
  } catch (error) {
    console.error("Error in getUserByEmail from Firestore: ", error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const usersRef = db.collection(dbTables.USERS.tableName); // Use db object from firebaseConfig
    const usernameSnapshot = await usersRef
      .where(dbTables.USERS.fields.username, "==", username)
      .get();

    if (!usernameSnapshot.empty) {
      return usernameSnapshot.docs[0].data();
    }

    return null;
  } catch (error) {
    console.error("Error in getUserByUsername from Firestore: ", error);
    throw error;
  }
};

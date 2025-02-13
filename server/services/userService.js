import { db } from "../configuration/firebaseConfig.js";
import { dbTables } from "../configuration/firebaseDb.js";

export const checkExistingUserInFirestore = async (username, email) => {
  try {
    const usernameExists = await findUserByUsername(username);
    const emailExists = await findUserByEmail(email);

    return {
      usernameExists: !!usernameExists,
      emailExists: !!emailExists,
    };
  } catch (error) {
    console.error("Error in checkUsernameInFirestore:", error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  if (!username) return null;

  const usersRef = db.collection(dbTables.USERS.tableName);
  const snapshot = await usersRef
    .where(dbTables.USERS.fields.username, "==", username)
    .get();

  return snapshot.empty ? null : snapshot.docs[0].data();
};

export const findUserById = async (id) => {
  if (!id) return null;

  const userDoc = await db.collection(dbTables.USERS.tableName).doc(id).get();

  return !userDoc.exists ? null : userDoc.data();
};

export const findUserByEmail = async (email) => {
  if (!email) return null;

  const usersRef = db.collection(dbTables.USERS.tableName);
  const snapshot = await usersRef
    .where(dbTables.USERS.fields.email, "==", email)
    .get();

  return snapshot.empty ? null : snapshot.docs[0].data();
};

export const findAllUsers = async () => {
  const usersRef = db.collection(dbTables.USERS.tableName);
  const snapshot = await usersRef.get();

  return snapshot.empty
    ? null
    : snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
};

export const deleteUser = async (id) => {
  const userDoc = db
    .collection(dbTables.USERS.tableName)
    .doc(id);

    const user = await userDoc.get();

  if (!user.exists) {
    return null;
  }

  await userDoc.delete();
  return user;
};

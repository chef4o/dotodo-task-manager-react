import { dbTables } from "../configuration/firebaseDb.js";
import { db } from "../configuration/firebaseConfig.js";

export const getAllUsers = async (req, res) => {
  try {
    const usersRef = db.collection(dbTables.USERS.tableName);
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No users found" });
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.json(users);
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const usersRef = db.collection(dbTables.USERS.tableName);
    const snapshot = await usersRef
      .where(dbTables.USERS.fields.email, "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = snapshot.docs[0].data();
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by email: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const usersRef = db.collection(dbTables.USERS.tableName);
    const snapshot = await usersRef
      .where(dbTables.USERS.fields.username, "==", username)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = snapshot.docs[0].data();
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by username: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userDoc = await db.collection(dbTables.USERS.tableName).doc(req.params.id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    return res.json(userData);
  } catch (error) {
    console.error("Error in getUserById from Firestore: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userDoc = await db.collection(dbTables.USERS.tableName).doc(req.params.id).get();

return null
  } catch (error) {
    console.error("Error in deleteUserById from Firestore: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}